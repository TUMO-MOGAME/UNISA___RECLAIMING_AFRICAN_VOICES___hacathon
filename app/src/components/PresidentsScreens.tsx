import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Screen, ScreenHeader, Icon } from "../ui";
import { democraticPresidents, pre1994Leaders, President, LifeEvent } from "../content/presidents";
import { colors, spacing, radius, fonts, type } from "../theme/tokens";
import { PressScale } from "./Motion";

// The Presidents. Democratic era (gold) + pre-1994 heads of state (neutral grey — documented, not
// celebrated). Grounded content in src/content/presidents.ts; hard chapters stated factually.

// ---------- Overview ----------
export function PresidentsScreen({ onBack, onOpen }: { onBack: () => void; onOpen: (id: string) => void }) {
  return (
    <Screen tone="dark">
      <ScreenHeader kicker="Democratic South Africa" title="The Presidents" onBack={onBack} />
      <Text style={s.intro}>
        Since the first free election in 1994, five presidents have led South Africa — each through a
        different chapter, from liberation to the work still unfinished.
      </Text>
      <View style={{ gap: spacing.md }}>
        {democraticPresidents.map((p) => (
          <Row key={p.id} p={p} onPress={() => onOpen(p.id)} />
        ))}
      </View>

      <View style={s.sectionHead}>
        <View style={s.sectionRow}><View style={s.tick} /><Text style={s.sectionLabel}>Before democracy</Text></View>
        <Text style={s.sectionSub}>
          Leaders of the Union and the apartheid state, 1910–1994. Recorded honestly — neither erased nor celebrated.
        </Text>
      </View>
      <View style={{ gap: spacing.md }}>
        {pre1994Leaders.map((p) => (
          <Row key={p.id} p={p} onPress={() => onOpen(p.id)} />
        ))}
      </View>
    </Screen>
  );
}

function Row({ p, onPress }: { p: President; onPress: () => void }) {
  const hist = p.era === "pre1994";
  return (
    <PressScale style={s.row} onPress={onPress}>
      <View style={[s.portrait, hist && s.portraitHist]}>
        <Text style={[s.mono, hist && s.monoHist]}>{p.mono}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.name}>{p.name}</Text>
        <Text style={[s.term, hist && s.termHist]}>{p.term}</Text>
        <Text style={s.role}>{p.role}</Text>
      </View>
      <Icon.ChevronRight size={20} color={hist ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.5)"} />
    </PressScale>
  );
}

// ---------- Detail ----------
export function PresidentScreen({ president, onBack, onArchive }: { president: President; onBack: () => void; onArchive?: () => void }) {
  const p = president;
  const hist = p.era === "pre1994";
  const tiles: { label: string; value: string }[] = [];
  if (p.born) tiles.push({ label: "Born", value: p.born });
  if (p.died) tiles.push({ label: "Died", value: p.died });
  if (p.term) tiles.push({ label: "In office", value: p.term.replace("PM · ", "").replace("State President · ", "") });
  if (p.party) tiles.push({ label: "Party", value: p.party });

  return (
    <Screen tone="dark">
      <View style={s.hero}>
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        <View style={[s.heroMono, hist && s.portraitHist]}>
          <Text style={[s.heroMonoText, hist && s.monoHist]}>{p.mono}</Text>
        </View>
        <Text style={s.heroName}>{p.name}</Text>
        {p.clan ? <Text style={s.heroClan}>{p.clan}</Text> : null}
        <View style={[s.heroTerm, hist && { borderColor: "rgba(255,255,255,0.3)" }]}>
          <Text style={[s.heroTermText, hist && { color: "rgba(255,255,255,0.7)" }]}>{p.term}</Text>
        </View>
      </View>

      {tiles.length > 0 && (
        <View style={s.tileGrid}>
          {tiles.map((t, i) => (
            <View key={i} style={s.tile}>
              <Text style={s.tileV}>{t.value}</Text>
              <Text style={s.tileL}>{t.label}</Text>
            </View>
          ))}
        </View>
      )}

      {p.struggle ? (<><Label text={hist ? "The record" : "The struggle"} /><Text style={s.para}>{p.struggle}</Text></>) : (
        <><Label text="What to know" /><Text style={s.para}>{p.role}</Text></>
      )}

      {p.life && p.life.length > 0 && (
        <>
          <Label text="A life" />
          <View style={{ marginTop: spacing.xs }}>
            {p.life.map((l, i) => (<Timeline key={i} item={l} last={i === p.life!.length - 1} />))}
          </View>
        </>
      )}

      {p.family && p.family.length > 0 && (
        <>
          <Label text="Family" />
          <View style={s.chipRow}>
            {p.family.map((f, i) => (
              <View key={i} style={s.famChip}>
                <Text style={s.famRel}>{f.rel}</Text>
                <Text style={s.famName}>{f.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {p.know && p.know.length > 0 && (
        <>
          <Label text={hist ? "In context" : "What every South African should know"} />
          <View style={{ gap: spacing.sm }}>
            {p.know.map((k, i) => (
              <View key={i} style={s.knRow}>
                <View style={s.knDot} />
                <Text style={s.knText}>{k}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {p.quote ? (
        <View style={s.quote}>
          <Text style={s.quoteText}>&ldquo;{p.quote.text}&rdquo;</Text>
          <Text style={s.quoteAttr}>— {p.quote.attr}</Text>
        </View>
      ) : null}

      {!hist && onArchive ? (
        <PressScale style={s.archive} onPress={onArchive}>
          <View style={s.archiveMicWrap}><Icon.Mic size={19} color={colors.gold} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.archiveH}>Your memory of {p.name.split(" ").slice(-1)[0]}</Text>
            <Text style={s.archiveS}>Record where you were, what it meant to your family</Text>
          </View>
          <Icon.ChevronRight size={20} color={colors.gold} />
        </PressScale>
      ) : null}

      {p.sources ? (
        <View style={s.srcNote}>
          <Text style={s.srcH}>How we source this</Text>
          <Text style={s.srcT}>{p.sources}</Text>
        </View>
      ) : null}
    </Screen>
  );
}

function Label({ text }: { text: string }) {
  return (
    <View style={s.sectionHead}>
      <View style={s.sectionRow}><View style={s.tick} /><Text style={s.sectionLabel}>{text}</Text></View>
    </View>
  );
}
function Timeline({ item, last }: { item: LifeEvent; last: boolean }) {
  const dotColor = item.era === "now" ? "#3FBF6A" : item.era === "past" ? "rgba(255,255,255,0.4)" : colors.orange;
  return (
    <View style={s.tlItem}>
      <View style={s.tlRail}>
        <View style={[s.tlDot, { backgroundColor: dotColor }]} />
        {!last && <View style={s.tlLine} />}
      </View>
      <View style={{ flex: 1, paddingBottom: spacing.md }}>
        <Text style={[s.tlWhen, item.era === "past" && { color: "rgba(255,255,255,0.5)" }]}>{item.when}</Text>
        <Text style={s.tlName}>{item.name}</Text>
        {item.role ? <Text style={s.tlRole}>{item.role}</Text> : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg },

  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.sm + 2 },
  portrait: { width: 56, height: 68, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c0c", borderWidth: 1, borderColor: "rgba(235,164,60,0.5)" },
  portraitHist: { borderColor: "rgba(255,255,255,0.22)" },
  mono: { fontFamily: fonts.display, fontSize: 22, color: colors.gold },
  monoHist: { color: "rgba(255,255,255,0.66)" },
  name: { color: "#fff", fontFamily: fonts.serif, fontSize: 16 },
  term: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 4 },
  termHist: { color: "rgba(255,255,255,0.5)" },
  role: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, lineHeight: 17, marginTop: 4 },
  chev: { color: "rgba(255,255,255,0.5)", fontSize: 22 },

  sectionHead: { marginTop: spacing.xl, marginBottom: spacing.md },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  tick: { width: 15, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  sectionSub: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: type.small, lineHeight: 18, marginTop: 6 },
  para: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: type.body, lineHeight: 25 },

  hero: { alignItems: "center", justifyContent: "center", paddingVertical: spacing.xl, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: radius.lg, marginBottom: spacing.md },
  heroBack: { position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: radius.pill, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroBackText: { color: "#fff", fontSize: 24, lineHeight: 26, marginTop: -2 },
  heroMono: { width: 92, height: 92, borderRadius: 46, alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c0c", borderWidth: 2, borderColor: "rgba(235,164,60,0.6)" },
  heroMonoText: { fontFamily: fonts.display, fontSize: 40, color: colors.gold },
  heroName: { color: "#fff", fontFamily: fonts.display, fontSize: 30, textTransform: "uppercase", marginTop: spacing.md, textAlign: "center", paddingHorizontal: spacing.md },
  heroClan: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.serifItalic, fontSize: 14, marginTop: 4 },
  heroTerm: { marginTop: spacing.md, borderWidth: 1, borderColor: "rgba(235,164,60,0.5)", borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 14 },
  heroTermText: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },

  tileGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: spacing.xs },
  tile: { width: "48.5%", backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  tileV: { color: "#fff", fontFamily: fonts.serif, fontSize: 15 },
  tileL: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4, textTransform: "uppercase", marginTop: 5 },

  tlItem: { flexDirection: "row", gap: spacing.md },
  tlRail: { alignItems: "center" },
  tlDot: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  tlLine: { width: 2, flex: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 2 },
  tlWhen: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 11 },
  tlName: { color: "#fff", fontFamily: fonts.serif, fontSize: 15, marginTop: 1 },
  tlRole: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, lineHeight: 17, marginTop: 2 },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  famChip: { backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, paddingVertical: 9, paddingHorizontal: 13 },
  famRel: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 0.4, textTransform: "uppercase" },
  famName: { color: "#fff", fontFamily: fonts.body, fontSize: 13, marginTop: 2 },

  knRow: { flexDirection: "row", gap: spacing.sm },
  knDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold, marginTop: 7 },
  knText: { flex: 1, color: "rgba(255,255,255,0.82)", fontFamily: fonts.body, fontSize: 13, lineHeight: 20 },

  quote: { marginTop: spacing.lg, borderLeftWidth: 3, borderLeftColor: colors.gold, paddingLeft: spacing.md },
  quoteText: { color: "#fff", fontFamily: fonts.serifItalic, fontSize: 18, lineHeight: 25 },
  quoteAttr: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 10 },

  archive: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.lg, backgroundColor: "#0a0a0a", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md },
  archiveMicWrap: { width: 42, height: 42, borderRadius: 12, backgroundColor: "rgba(217,106,28,0.18)", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)", alignItems: "center", justifyContent: "center" },
  archiveH: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 14 },
  archiveS: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 12, marginTop: 2 },
  archiveChev: { color: colors.gold, fontSize: 24 },

  srcNote: { marginTop: spacing.lg, backgroundColor: "rgba(217,106,28,0.07)", borderLeftWidth: 3, borderLeftColor: colors.orange, borderRadius: 8, padding: spacing.md },
  srcH: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  srcT: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
