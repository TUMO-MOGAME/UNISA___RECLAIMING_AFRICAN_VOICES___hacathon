import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, ScrollView, Pressable, Linking, Platform, useWindowDimensions } from "react-native";
import { Icon } from "../ui";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { PressScale } from "./Motion";
import { articlesForDay, orderedTimeline, type Article } from "../content/articles";

// Open the original article WITHOUT leaving our app. On web the source page can't be shown inside our
// own frame (publishers send X-Frame-Options/CSP that block cross-origin embedding), so we open it in
// a NEW browser tab — the reader reads it there and closes the tab, our site still sitting behind it.
// On native, Linking hands off to the system browser (or an in-app browser tab).
function openOriginal(url: string) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  Linking.openURL(url).catch(() => {});
}

// The live publisher page, framed inside our window (web only). Renders a real <iframe> — works only
// when the publisher doesn't send X-Frame-Options / CSP frame-ancestors that forbid it (we check per
// source before enabling `embedUrl`). RN web renders DOM elements natively.
function EmbedFrame({ url, title }: { url: string; title: string }) {
  if (Platform.OS !== "web") return null;
  return React.createElement("iframe" as any, {
    src: url,
    title,
    style: { width: "100%", height: "100%", border: "0", backgroundColor: "#fff" },
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
  });
}

// Perspectives — the adult "reading window" for grounded, attributed reviews of published articles
// about a day's history. Two pieces:
//   • ArticlesPanel — the list of article cards under a National Day (sorted oldest → newest).
//   • ArticleReader — the full-screen modal reading pane a card opens into.
// The body text is OUR review in OUR words (AGENTS.md integrity rule); the original is always one tap
// away via "Read the original".

const UI = {
  section: {
    en: "Perspectives", tn: "Dikakanyo", af: "Perspektiewe", zu: "Imibono", xh: "Iimbono",
    nso: "Dikgopolo", st: "Maikutlo", ss: "Imibono", ts: "Mavonelo", nr: "Imibono", ve: "Mihumbulo",
  },
  sectionSub: {
    en: "In-depth reading — reviewed, with the record set in order",
    tn: "Go bala ka botlalo — go sekasekilwe, rekoto e beilwe ka thulaganyo",
    af: "Diepgaande leeswerk — nagegaan, met die rekord reggestel",
    zu: "Ukufunda okujulile — okubuyekeziwe, nomlando ohlelwe kahle",
    xh: "Ukufunda okunzulu — okuphononongiweyo, nembali ehlelwe ngokufanelekileyo",
    nso: "Go bala ka botlalo — go lekotšwe, le rekoto e beakantšwe ka thulaganyo",
    st: "Ho bala ka botebo — ho hlahlobilwe, le tlaleho e behilwe ka tatellano",
    ss: "Kufundza lokujulile — lokubuyeketiwe, nemlandvo lohleliwe kahle",
    ts: "Ku hlaya loku enteke — loku kamberiweke, ni rhekhodo yi vekiwe hi ndlela",
    nr: "Ukufunda okutjhingileko — okubuyekeziweko, nomtlolo obekwe kuhle",
    ve: "U vhala ho dzikaho — ho lingululwaho, na rekhodo yo vhewaho nga ndpowelo",
  },
  by: { en: "By", tn: "Ka", af: "Deur", zu: "Ngu", xh: "Ngu", nso: "Ka", st: "Ka", ss: "Ngu", ts: "Hi", nr: "Ngu", ve: "Nga" },
  inThisArticle: {
    en: "Who this article recovers", tn: "Batho ba setlhogo se ba busetsang", af: "Wie hierdie artikel herwin", zu: "Ubani lo mbhalo owubuyisayo", xh: "Ngubani eli nqaku elimbuyisayo",
    nso: "Bao sehlogo se se ba bušetšago", st: "Bao sehlooho sena se ba khutlisang", ss: "Bantfu lesihloko lesibabuyisako", ts: "Vanhu lava xihloko lexi xi va vuyisaka", nr: "Abantu lesi sihloko esibabuyisako", ve: "Vhathu vhane ino thero i vha vhuyisaho",
  },
  howItUnfolded: {
    en: "How it unfolded", tn: "Ka moo go diragetseng ka teng", af: "Hoe dit ontvou het", zu: "Indlela okwenzeka ngayo", xh: "Indlela okwenzeka ngayo",
    nso: "Ka moo go diregilego ka gona", st: "Kamoo ho etsahetseng kateng", ss: "Indlela lokwenteka ngayo", ts: "Ndlela leyi swi humeleleke ha yona", nr: "Indlela okwenzeka ngayo", ve: "Nḓila ye zwa itea ngayo",
  },
  keyPoints: {
    en: "The argument, in short", tn: "Kgang, ka bokhutshwane", af: "Die argument, in kort", zu: "Impikiswano, kafushane", xh: "Ingxoxo, ngokufutshane",
    nso: "Ngangišano, ka bokopana", st: "Khang, ka bokgutshwane", ss: "Imphikiswano, ngalokufishane", ts: "Kanelo, hi ku komisa", nr: "Ukuphikisana, kafitjhani", ve: "Khani, nga u pfufhifhadza",
  },
  readOriginal: {
    en: "Read the original", tn: "Bala setlhogo sa ntlha", af: "Lees die oorspronklike", zu: "Funda okwangempela", xh: "Funda eyoqobo",
    nso: "Bala sa mathomo", st: "Bala sa mantlha", ss: "Fundza lesekucala", ts: "Hlaya xa xisungu", nr: "Funda okwakuqala", ve: "Vhalani tsha u thoma",
  },
  opensNewTab: {
    en: "Opens on the publisher's site in a new tab", tn: "Se bulega mo saeteng ya mophasalatsi mo tebeng e ntšha", af: "Maak op die uitgewer se webwerf in 'n nuwe oortjie oop", zu: "Kuvuleka kusayithi yomshicileli ethebhulethi entsha", xh: "Kuvuleka kwisayithi yompapashi kwithebhu entsha",
    nso: "E bulega go saete ya mogatiši ka thepe ye mpsha", st: "E bulehang sebakeng sa mohatisi tepeng e ntjha", ss: "Kuvuleka kusayithi yemshicileli kuthebhu lensha", ts: "Swi pfuleka eka sayiti ya mukandziyisi eka theve leyintshwa", nr: "Kuvuleka kusayidi yomgadangisi kuthebhu etjha", ve: "Zwi vulea kha saiti ya mubveledzi kha thebe ntswa",
  },
  liveNote: {
    en: "Live from the publisher — all rights theirs. If it stays blank, switch to Summary or use the ↗ button.", tn: "Ka nako ya nnete go tswa go mophasalatsi — ditshwanelo tsotlhe ke tsa bone. Fa se sa tsene, fetolela go Tshobokanyo kgotsa o dirise konopo ya ↗.", af: "Regstreeks van die uitgewer — alle regte hulle s'n. As dit leeg bly, skakel na Opsomming of gebruik die ↗-knoppie.", zu: "Bukhoma kumshicileli — wonke amalungelo ngawakhe. Uma kuhlala kungenalutho, shintshela ku-Isifinyezo noma usebenzise inkinobho ethi ↗.", xh: "Bukho kumpapashi — onke amalungelo ngawakhe. Ukuba kuhlala kungenanto, tshintshela kwiSishwankathelo okanye usebenzise iqhosha elithi ↗.",
    nso: "Ka nako ya kgonthe go tšwa go mogatiši — ditokelo ka moka ke tša bona. Ge e dula e se na selo, fetolela go Kakaretšo goba o šomiše konopo ya ↗.", st: "Ka nako ya nnete ho tswa ho mohatisi — litokelo tsohle ke tsa bona. Haeba e lula e se na letho, fetolela ho Kakaretso kapa u sebedise konopo ya ↗.", ss: "Ngesikhatsi sangempela kusuka kumshicileli — onkhe emalungelo ngawakhe. Nangabe kuhlala kungenalutfo, tjintjela ku-Sifingcanetiso nome usebentise inkhinobho letsi ↗.", ts: "Hi nkarhi wa xiviri ku suka eka mukandziyisi — timfanelo hinkwato i ta vona. Loko swi tshama swi nga ri na nchumu, hundzula eka Nkatsakanyo kumbe u tirhisa xikhomo xa ↗.", nr: "Bukhona kumgadangisi — woke amalungelo ngawakhe. Nangabe kuhlala kunganalitho, tjhugululela ku-Isirhunyezo namkha usebenzise ibhethini elithi ↗.", ve: "Nga tshifhinga tsha ngoho u bva kha mubveledzi — pfanelo dzoṱhe ndi dzavho. Arali zwa dzula zwi si na tshithu, shandukiselani kha Manweledzo kana ni shumise bathoni ya ↗.",
  },
  tabLive: {
    en: "Live article", tn: "Setlhogo sa nnete", af: "Regstreekse artikel", zu: "Isihloko sabukhoma", xh: "Inqaku elibukhoma",
    nso: "Sehlogo sa nako ya kgonthe", st: "Sehlooho sa nako ya nnete", ss: "Sihloko sangempela", ts: "Xihloko xa nkarhi wa xiviri", nr: "Isihloko sabukhona", ve: "Thero ya tshifhinga tsha ngoho",
  },
  tabSummary: {
    en: "Summary", tn: "Tshobokanyo", af: "Opsomming", zu: "Isifinyezo", xh: "Isishwankathelo",
    nso: "Kakaretšo", st: "Kakaretso", ss: "Sifingcanetiso", ts: "Nkatsakanyo", nr: "Isirhunyezo", ve: "Manweledzo",
  },
  aboutSource: {
    en: "About this source", tn: "Ka ga motswedi ono", af: "Oor hierdie bron", zu: "Mayelana nalo mthombo", xh: "Malunga nalo mthombo",
    nso: "Ka ga mothopo wo", st: "Mabapi le mohlodi ona", ss: "Mayelana nalomtfombo", ts: "Mayelana ni xihlovo lexi", nr: "Malunga nalomthombo", ve: "Nga ha tshiko itshi",
  },
  close: { en: "Close", tn: "Tswala", af: "Maak toe", zu: "Vala", xh: "Vala", nso: "Tswalela", st: "Koala", ss: "Vala", ts: "Pfala", nr: "Vala", ve: "Vala" },
};

/** The list of article cards for a day (oldest publication first). Renders nothing when a day has
 *  no articles yet. */
export function ArticlesPanel({ dayId, lang, hideHeader }: { dayId: string; lang: LangCode; hideHeader?: boolean }) {
  const items = articlesForDay(dayId);
  const [open, setOpen] = useState<Article | null>(null);
  if (items.length === 0) return null;

  return (
    <View style={hideHeader ? undefined : s.panel}>
      {hideHeader ? null : (
        <>
          <View style={s.panelHead}>
            <Icon.Newspaper size={16} color={colors.gold} />
            <Text style={s.panelTitle}>{t(UI.section, lang)}</Text>
          </View>
          <Text style={s.panelSub}>{t(UI.sectionSub, lang)}</Text>
        </>
      )}

      <View style={{ gap: spacing.sm, marginTop: hideHeader ? 0 : spacing.md }}>
        {items.map((a) => (
          <PressScale key={a.id} style={s.card} onPress={() => setOpen(a)} accessibilityLabel={a.title}>
            <View style={{ flex: 1 }}>
              <View style={s.cardMetaRow}>
                <Text style={s.cardMeta}>{a.source.toUpperCase()} · {a.publishedLabel.toUpperCase()}</Text>
                {a.embedUrl && Platform.OS === "web" ? (
                  <View style={s.liveBadge}><Text style={s.liveBadgeText}>LIVE</Text></View>
                ) : null}
              </View>
              <Text style={s.cardTitle}>{a.title}</Text>
              <Text style={s.cardStand}>{a.standfirst}</Text>
              <Text style={s.cardBy}>{t(UI.by, lang)} {a.author}</Text>
            </View>
            <View style={s.cardArrow}>
              <Icon.BookOpen size={18} color={colors.gold} />
            </View>
          </PressScale>
        ))}
      </View>

      <ArticleReader article={open} lang={lang} onClose={() => setOpen(null)} />
    </View>
  );
}

/** The reading window — a full-screen modal with editorial typography. */
export function ArticleReader({ article, lang, onClose }: { article: Article | null; lang: LangCode; onClose: () => void }) {
  const { width } = useWindowDimensions();
  const wide = width >= 760;
  const a = article;
  const canEmbed = !!a?.embedUrl && Platform.OS === "web";

  // Device-aware default, reset each time a different article opens: phones handle the live frame well
  // (mobile site), so default to Live there; desktops often blank the frame (frame-busting / consent
  // walls), so default to our always-works Summary and let the reader opt into Live.
  const [mode, setMode] = useState<"live" | "read">("read");
  useEffect(() => {
    setMode(canEmbed && !wide ? "live" : "read");
  }, [a?.id, canEmbed, wide]);
  const showLive = canEmbed && mode === "live";

  return (
    <Modal visible={!!a} animationType="slide" transparent onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={[s.window, wide && s.windowWide]}>
          {/* top bar — close always reachable; embedded articles also get an open-in-new-tab escape */}
          <View style={s.topBar}>
            <Text style={s.topKicker} numberOfLines={1}>{a ? `${a.source} · ${a.publishedLabel}` : ""}</Text>
            {canEmbed && a ? (
              <Pressable onPress={() => openOriginal(a.url)} style={s.topBtn} accessibilityLabel={t(UI.readOriginal, lang)} hitSlop={10}>
                <Icon.ExternalLink size={17} color="#fff" />
              </Pressable>
            ) : null}
            <Pressable onPress={onClose} style={s.closeBtn} accessibilityLabel={t(UI.close, lang)} hitSlop={10}>
              <Icon.X size={20} color="#fff" />
            </Pressable>
          </View>

          {/* Live / Summary toggle — only for embeddable articles. Summary is the always-works fallback
              if the live frame is blocked/blank on a given device. */}
          {canEmbed ? (
            <View style={s.segRow}>
              <Pressable onPress={() => setMode("live")} style={[s.seg, mode === "live" && s.segOn]}>
                <Text style={[s.segText, mode === "live" && s.segTextOn]}>{t(UI.tabLive, lang)}</Text>
              </Pressable>
              <Pressable onPress={() => setMode("read")} style={[s.seg, mode === "read" && s.segOn]}>
                <Text style={[s.segText, mode === "read" && s.segTextOn]}>{t(UI.tabSummary, lang)}</Text>
              </Pressable>
            </View>
          ) : null}

          {a && showLive ? (
            // Live publisher page, framed in our window — the reader never leaves the app.
            <View style={s.embedWrap}>
              <Text style={s.embedHint}>{t(UI.liveNote, lang)}</Text>
              <View style={s.embedFrame}>
                <EmbedFrame url={a.embedUrl!} title={a.title} />
              </View>
            </View>
          ) : a ? (
            <ScrollView style={s.scroll} contentContainerStyle={[s.readCol, wide && s.readColWide]} showsVerticalScrollIndicator={false}>
              <Text style={[s.title, wide && s.titleWide]}>{a.title}</Text>
              <Text style={s.byline}>{t(UI.by, lang)} {a.author} · {a.source}</Text>
              <View style={s.hr} />

              <Text style={s.stand}>{a.standfirst}</Text>

              {a.summary.split("\n\n").map((para, i) => (
                <Text key={i} style={s.para}>{para}</Text>
              ))}

              {a.figures && a.figures.length > 0 ? (
                <View style={s.block}>
                  <Text style={s.blockLabel}>{t(UI.inThisArticle, lang)}</Text>
                  {a.figures.map((f, i) => (
                    <View key={i} style={s.figRow}>
                      <Text style={s.figName}>{f.name}</Text>
                      <Text style={s.figNote}>{f.note}</Text>
                    </View>
                  ))}
                </View>
              ) : null}

              {a.timeline && a.timeline.length > 0 ? (
                <View style={s.block}>
                  <Text style={s.blockLabel}>{t(UI.howItUnfolded, lang)}</Text>
                  {orderedTimeline(a).map((e, i) => (
                    <View key={i} style={s.tlRow}>
                      <View style={s.tlDot} />
                      <View style={{ flex: 1 }}>
                        <Text style={s.tlDate}>{e.date}</Text>
                        <Text style={s.tlEvent}>{e.event}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}

              {a.keyPoints && a.keyPoints.length > 0 ? (
                <View style={s.block}>
                  <Text style={s.blockLabel}>{t(UI.keyPoints, lang)}</Text>
                  {a.keyPoints.map((p, i) => (
                    <View key={i} style={s.bulletRow}>
                      <Text style={s.bulletDot}>—</Text>
                      <Text style={s.bulletText}>{p}</Text>
                    </View>
                  ))}
                </View>
              ) : null}

              <View style={s.block}>
                <Text style={s.blockLabel}>{t(UI.aboutSource, lang)}</Text>
                <Text style={s.rights}>{a.rights}</Text>
              </View>

              <PressScale style={s.readBtn} onPress={() => openOriginal(a.url)} accessibilityLabel={t(UI.readOriginal, lang)}>
                <Icon.ExternalLink size={17} color={colors.night} />
                <Text style={s.readBtnText}>{t(UI.readOriginal, lang)}</Text>
              </PressScale>
              <Text style={s.readHint}>{t(UI.opensNewTab, lang)}</Text>

              <View style={{ height: spacing.xl }} />
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  // ── panel + cards ──
  panel: { marginTop: spacing.lg },
  panelHead: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  panelTitle: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2.5, textTransform: "uppercase" },
  panelSub: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.serifItalic, fontSize: 13, marginTop: 4 },

  card: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: "#141414", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", borderRadius: radius.md, padding: spacing.md },
  cardMetaRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: 5 },
  cardMeta: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.6 },
  liveBadge: { backgroundColor: "rgba(63,191,106,0.16)", borderWidth: 1, borderColor: "rgba(63,191,106,0.6)", borderRadius: radius.pill, paddingHorizontal: 7, paddingVertical: 1 },
  liveBadgeText: { color: colors.live, fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1 },
  cardTitle: { color: "#fff", fontFamily: fonts.heading, fontSize: 16, lineHeight: 21 },
  cardStand: { color: "rgba(255,255,255,0.66)", fontFamily: fonts.body, fontSize: 13, lineHeight: 19, marginTop: 5 },
  cardBy: { color: colors.gold, fontFamily: fonts.bodyMedium, fontSize: 12, marginTop: 8 },
  cardArrow: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(26,133,167,0.12)", borderWidth: 1, borderColor: "rgba(26,133,167,0.5)", alignItems: "center", justifyContent: "center" },

  // ── reading window ──
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.72)", justifyContent: "center", alignItems: "center" },
  window: { flex: 1, width: "100%", backgroundColor: "#0b0b0b" },
  windowWide: { flex: 0, maxWidth: 820, height: "92%", marginVertical: "4%", borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },

  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.1)" },
  topKicker: { flex: 1, color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase" },
  topBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.16)", alignItems: "center", justifyContent: "center", marginRight: spacing.sm },
  closeBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.16)", alignItems: "center", justifyContent: "center" },

  segRow: { flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  seg: { paddingVertical: 7, paddingHorizontal: spacing.md, borderRadius: radius.pill, borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
  segOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  segText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 0.4 },
  segTextOn: { color: colors.night },

  embedWrap: { flex: 1, backgroundColor: "#0b0b0b" },
  embedHint: { color: "rgba(255,255,255,0.5)", fontFamily: fonts.body, fontSize: 12, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  embedFrame: { flex: 1, backgroundColor: "#fff", overflow: "hidden" },

  scroll: { flex: 1 },
  readCol: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  readColWide: { paddingHorizontal: 56, alignSelf: "center", width: "100%", maxWidth: 720 },

  title: { color: "#fff", fontFamily: fonts.display, fontSize: 27, lineHeight: 32, letterSpacing: -0.6 },
  titleWide: { fontSize: 36, lineHeight: 41 },
  byline: { color: colors.gold, fontFamily: fonts.bodyMedium, fontSize: 14, marginTop: spacing.md },
  hr: { height: 1, backgroundColor: "rgba(255,255,255,0.14)", marginVertical: spacing.lg },

  stand: { color: "#fff", fontFamily: fonts.serifItalic, fontSize: 18, lineHeight: 27, marginBottom: spacing.lg },
  para: { color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 16, lineHeight: 27, marginBottom: spacing.md },

  block: { marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  blockLabel: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: spacing.md },

  figRow: { marginBottom: spacing.md },
  figName: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 21 },
  figNote: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginTop: 2 },

  tlRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.md },
  tlDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.gold, marginTop: 5 },
  tlDate: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.3 },
  tlEvent: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: 14, lineHeight: 21, marginTop: 2 },

  bulletRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm },
  bulletDot: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 22 },
  bulletText: { flex: 1, color: "rgba(255,255,255,0.8)", fontFamily: fonts.body, fontSize: 15, lineHeight: 22 },

  rights: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 13, lineHeight: 20 },

  readBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, backgroundColor: colors.gold, borderRadius: radius.pill, paddingVertical: 14, marginTop: spacing.xl },
  readBtnText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },
  readHint: { color: "rgba(255,255,255,0.42)", fontFamily: fonts.body, fontSize: 12, textAlign: "center", marginTop: spacing.sm },
});
