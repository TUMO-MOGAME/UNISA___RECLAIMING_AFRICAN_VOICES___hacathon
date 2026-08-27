import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import { askChatbot, chatbotHasKey, type ChatTurn } from "../services/chatbot";
import { loadChat, saveChat, clearChat } from "../services/chatbot/memory";
import { CHAT_UI } from "../services/chatbot/uiStrings";
import { onAsk } from "../services/chatbot/askBus";
import { t } from "../i18n";
import type { Lang } from "../content/types";

// A floating conversational guide that wraps the whole app. It answers ONLY from the site's own
// grounded content (RAG) and can navigate ("take me to the provinces"). Rendered once at the app root
// as an overlay; `onNavigate(pageId)` is handled by App to push the matching route. Its chrome is
// localized through the i18n layer, so it switches with the app-wide language picker.

type Msg = { role: "user" | "assistant"; text: string; sources?: string[] };

// Minimal **bold** renderer so the assistant's markdown-ish emphasis reads cleanly (no markdown lib).
function RichText({ text, style }: { text: string; style: any }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <Text key={i} style={{ fontFamily: fonts.bodyBold }}>
            {p.slice(2, -2)}
          </Text>
        ) : (
          <Text key={i}>{p}</Text>
        )
      )}
    </Text>
  );
}

export function ChatbotWidget({ lang, onNavigate }: { lang: Lang; onNavigate: (pageId: string) => void }) {
  const { width, height } = useWindowDimensions();
  const wide = width >= 768;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  // Memory: restore the prior conversation on mount (device-local; survives a refresh on web).
  const [messages, setMessages] = useState<Msg[]>(() => loadChat());
  const scrollRef = useRef<ScrollView>(null);

  // Persist the conversation whenever it changes (never uploaded — POPIA: device-local only).
  useEffect(() => {
    saveChat(messages);
  }, [messages]);

  const newChat = () => {
    clearChat();
    setMessages([]);
  };

  const SUGGESTIONS = [CHAT_UI.chip1, CHAT_UI.chip2, CHAT_UI.chip3, CHAT_UI.chip4].map((s) => t(s, lang));

  const scrollDown = () => requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    const history: ChatTurn[] = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    scrollDown();
    try {
      const res = await askChatbot(q, history, lang);
      if (res.type === "navigate") {
        const opening = t(CHAT_UI.opening, lang).replace("%s", res.label);
        setMessages((m) => [...m, { role: "assistant", text: opening }]);
        scrollDown();
        // Give the user a beat to read "Opening …", then navigate + tuck the panel away.
        setTimeout(() => {
          onNavigate(res.pageId);
          setOpen(false);
        }, 500);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: res.text, sources: res.sources }]);
        scrollDown();
      }
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", text: t(CHAT_UI.error, lang) }]);
    } finally {
      setBusy(false);
      scrollDown();
    }
  }

  // Let a screen hand the guide a question (services/chatbot/askBus). `send` closes over the
  // conversation, so the listener reads it through a ref instead of re-subscribing on every message.
  const sendRef = useRef(send);
  sendRef.current = send;
  useEffect(
    () =>
      onAsk((q) => {
        setOpen(true);
        void sendRef.current(q);
      }),
    []
  );

  // Collapsed: floating action button.
  if (!open) {
    return (
      <Pressable
        nativeID="ask-ubuntu-fab"
        style={[styles.fab, { bottom: spacing.lg, right: spacing.lg }]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={t(CHAT_UI.openGuide, lang)}
      >
        <Icon.MessageCircle size={22} color="#000000" />
        {wide && <Text style={styles.fabLabel}>{t(CHAT_UI.ask, lang)}</Text>}
      </Pressable>
    );
  }

  const panelW = wide ? 380 : Math.min(width - spacing.md * 2, 420);
  const panelH = wide ? Math.min(560, height - 120) : height - 120;

  return (
    <View style={[styles.panelWrap, { bottom: spacing.lg, right: wide ? spacing.lg : spacing.md, left: wide ? undefined : spacing.md }]}>
      <View style={[styles.panel, { width: wide ? panelW : undefined, height: panelH }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Icon.Sparkles size={15} color="#000000" />
            </View>
            <View>
              <Text style={styles.headerTitle}>{t(CHAT_UI.ask, lang)}</Text>
              <Text style={styles.headerSub}>{t(CHAT_UI.guide, lang)}</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            {messages.length > 0 && (
              <Pressable onPress={newChat} accessibilityLabel={t(CHAT_UI.newChat, lang)} hitSlop={8} style={styles.headerClose}>
                <Icon.RotateCcw size={16} color={colors.dsGray} />
              </Pressable>
            )}
            <Pressable onPress={() => setOpen(false)} accessibilityLabel={t(CHAT_UI.close, lang)} hitSlop={8} style={styles.headerClose}>
              <Icon.X size={18} color={colors.dsGray} />
            </Pressable>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollInner}
          onContentSizeChange={scrollDown}
        >
          {messages.length === 0 ? (
            <View style={styles.intro}>
              <Text style={styles.introText}>{t(CHAT_UI.intro, lang)}</Text>
              <View style={styles.chips}>
                {SUGGESTIONS.map((s) => (
                  <Pressable key={s} style={styles.chip} onPress={() => send(s)}>
                    <Text style={styles.chipText}>{s}</Text>
                  </Pressable>
                ))}
              </View>
              {!chatbotHasKey() && <Text style={styles.offlineNote}>{t(CHAT_UI.offline, lang)}</Text>}
            </View>
          ) : (
            messages.map((m, i) => (
              <View key={i} style={[styles.row, m.role === "user" ? styles.rowUser : styles.rowBot]}>
                <View style={[styles.bubble, m.role === "user" ? styles.bubbleUser : styles.bubbleBot]}>
                  <RichText text={m.text} style={m.role === "user" ? styles.bubbleTextUser : styles.bubbleTextBot} />
                  {m.sources && m.sources.length > 0 && (
                    <Text style={styles.sources}>{t(CHAT_UI.from, lang)} {m.sources.slice(0, 3).join(" · ")}</Text>
                  )}
                </View>
              </View>
            ))
          )}
          {busy && (
            <View style={[styles.row, styles.rowBot]}>
              <View style={[styles.bubble, styles.bubbleBot, styles.typing]}>
                <ActivityIndicator size="small" color={colors.dsBlue} />
                <Text style={styles.typingText}>{t(CHAT_UI.thinking, lang)}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder={t(CHAT_UI.placeholder, lang)}
            placeholderTextColor={colors.dsGray}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
            editable={!busy}
            // @ts-ignore web-only: submit on Enter
            {...(Platform.OS === "web" ? { onKeyPress: (e: any) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault?.(); send(input); } } } : {})}
          />
          <Pressable
            style={[styles.sendBtn, (!input.trim() || busy) && styles.sendBtnOff]}
            onPress={() => send(input)}
            disabled={!input.trim() || busy}
            accessibilityLabel={t(CHAT_UI.send, lang)}
          >
            <Icon.Send size={18} color="#000000" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // FAB
  fab: {
    position: "absolute",
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.dsBlue,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  fabLabel: { color: "#000000", fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.2 },

  // Panel
  panelWrap: { position: "absolute", zIndex: 50 },
  panel: {
    backgroundColor: "#0B0B0B",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#000000",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.dsBlue, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 15 },
  headerSub: { color: colors.dsGray, fontFamily: fonts.body, fontSize: 11 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  headerClose: { padding: 4 },

  scroll: { flex: 1, backgroundColor: "#0B0B0B" },
  scrollInner: { padding: spacing.md, gap: spacing.sm },

  intro: { gap: spacing.md },
  introText: { color: colors.creamDim, fontFamily: fonts.body, fontSize: 14, lineHeight: 21 },
  chips: { gap: spacing.sm },
  chip: {
    backgroundColor: "rgba(26,133,167,0.14)",
    borderWidth: 1,
    borderColor: "rgba(26,133,167,0.4)",
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  chipText: { color: colors.dsBlue, fontFamily: fonts.bodySemi, fontSize: 13 },
  offlineNote: { color: colors.dsGray, fontFamily: fonts.body, fontSize: 11, lineHeight: 16, fontStyle: "italic" },

  row: { flexDirection: "row" },
  rowUser: { justifyContent: "flex-end" },
  rowBot: { justifyContent: "flex-start" },
  bubble: { maxWidth: "86%", paddingVertical: 10, paddingHorizontal: 13, borderRadius: radius.md },
  bubbleUser: { backgroundColor: colors.dsBlue, borderBottomRightRadius: 4 },
  bubbleBot: { backgroundColor: "#181818", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderBottomLeftRadius: 4 },
  bubbleTextUser: { color: "#000000", fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20 },
  bubbleTextBot: { color: "#F2F2F2", fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },
  sources: { color: colors.dsGray, fontFamily: fonts.body, fontSize: 11, marginTop: 6, fontStyle: "italic" },

  typing: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  typingText: { color: colors.dsGray, fontFamily: fonts.body, fontSize: 13 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#000000",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: fonts.body,
    fontSize: 14,
    backgroundColor: "#141414",
    borderRadius: radius.pill,
    paddingVertical: Platform.OS === "web" ? 12 : 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.dsBlue, alignItems: "center", justifyContent: "center" },
  sendBtnOff: { opacity: 0.4 },
});
