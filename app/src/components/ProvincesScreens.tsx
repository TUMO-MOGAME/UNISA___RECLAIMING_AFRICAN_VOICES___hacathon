import React from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen, ScreenHeader, Icon } from "../ui";
import { provinces, Province, City, Stat, Leader } from "../content/provinces";
import { colors, spacing, radius, fonts, type } from "../theme/tokens";
import { PressScale } from "./Motion";

// Provinces → City history. Black & white + gold-for-emphasis, colour photography (never grayscaled).
// Content is grounded (src/content/provinces.ts); stats flagged "cited" (green) vs "to verify" (orange).

// ---------- 1 · Provinces grid ----------
export function ProvincesScreen({ onBack, onOpenProvince }: { onBack: () => void; onOpenProvince: (id: string) => void }) {
  return (
    <Screen tone="dark">
      <ScreenHeader kicker="South Africa" title="The Provinces" onBack={onBack} />
      <Text style={s.intro}>
        All nine provinces — each with its own founders, leaders and living history. Tap a province to
        explore its famous cities.
      </Text>
      <View style={s.grid}>
        {provinces.map((p) => (
          <PressScale key={p.id} style={s.provCard} onPress={() => onOpenProvince(p.id)} accessibilityLabel={`${p.name} — capital ${p.capital}`}>
            <Image source={p.hero} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
            <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]} style={StyleSheet.absoluteFill} />
            <View style={s.provCardText}>
              <Text style={s.provName}>{p.name}</Text>
              <Text style={s.provCap}>{p.capital}</Text>
            </View>
            <View style={s.provCount}><Text style={s.provCountText}>{p.cities.length} {p.cities.length === 1 ? "city" : "cities"}</Text></View>
          </PressScale>
        ))}
      </View>
    </Screen>
  );
}

// ---------- 2 · Province detail ----------
export function ProvinceScreen({ province, onBack, onOpenCity }: { province: Province; onBack: () => void; onOpenCity: (id: string) => void }) {
  return (
    <Screen tone="dark">
      <View style={s.provHero}>
        <Image source={province.hero} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.95)"]} style={StyleSheet.absoluteFill} />
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        <View style={s.provHeroText}>
          <Text style={s.kick}>Province</Text>
          <Text style={s.heroName}>{province.name}</Text>
        </View>
      </View>

      <View style={s.miniRow}>
        <Mini v={province.capital} l="Capital" />
        <Mini v={province.populationStat.value} l="People · 2022" />
        <Mini v={province.languages.split(" · ")[0] + "…"} l="Languages" />
      </View>

      <SectionLabel label="About the province" />
      <Text style={s.para}>{province.overview}</Text>

      <SectionLabel label="Famous cities" sub="Tap a city for its full history." />
      <View style={{ gap: spacing.md }}>
        {province.cities.map((c) => (
          <PressScale key={c.id} style={s.cityRow} onPress={() => onOpenCity(c.id)} accessibilityLabel={`${c.name} — founded ${c.founded}`}>
            <Image source={c.hero} style={s.cityThumb} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <Text style={s.cityRowName}>{c.name}</Text>
              <Text style={s.cityRowMeta}>Founded {c.founded}</Text>
              {c.subtitle ? <Text style={s.cityRowSub} numberOfLines={2}>{c.subtitle}</Text> : null}
            </View>
            <Icon.ChevronRight size={20} color="rgba(255,255,255,0.5)" />
          </PressScale>
        ))}
      </View>
    </Screen>
  );
}

// ---------- 3 · City detail ----------
export function CityScreen({ city, onBack, onArchive }: { city: City; onBack: () => void; onArchive?: () => void }) {
  return (
    <Screen tone="dark">
      <View style={s.cityHero}>
        <Image source={city.hero} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.96)"]} style={StyleSheet.absoluteFill} />
        <Pressable style={s.heroBack} onPress={onBack} hitSlop={12}><Icon.ChevronLeft size={22} color="#fff" strokeWidth={2.4} /></Pressable>
        <View style={s.est}><Text style={s.estText}>Est. {city.founded}</Text></View>
        <View style={s.cityHeroText}>
          <Text style={s.kick}>City</Text>
          <Text style={s.cityName}>{city.name}</Text>
          {city.subtitle ? <Text style={s.citySub}>{city.subtitle}</Text> : null}
        </View>
      </View>

      {city.beforeTheCity ? (
        <View style={s.band}>
          <Text style={s.bandLabel}>Before the city</Text>
          <Text style={s.bandText}>{city.beforeTheCity}</Text>
        </View>
      ) : null}

      <SectionLabel label="How it came to be" />
      <Text style={s.para}>{city.origins}</Text>

      <SectionLabel label="Those who led" sub="From when to when — traditional and civic." />
      <View style={{ marginTop: spacing.xs }}>
        {city.leaders.map((l, i) => (
          <Timeline key={i} item={l} last={i === city.leaders.length - 1} />
        ))}
      </View>

      <SectionLabel label="By the numbers" />
      <View style={s.statGrid}>
        {city.stats.map((st, i) => (
          <StatTile key={i} stat={st} />
        ))}
      </View>

      <SectionLabel label="Landmarks & heritage" />
      <View style={s.chipRow}>
        {city.landmarks.map((lm) => (
          <View key={lm} style={s.chip}><Text style={s.chipText}>{lm}</Text></View>
        ))}
      </View>

      {onArchive ? (
        <PressScale style={s.cityArchive} onPress={onArchive}>
          <View style={s.caMicWrap}><Icon.Mic size={19} color={colors.gold} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.caH}>Your {city.name}</Text>
            <Text style={s.caS}>Record a family memory of this place</Text>
          </View>
          <Icon.ChevronRight size={20} color={colors.gold} />
        </PressScale>
      ) : null}

      <View style={s.srcNote}>
        <Text style={s.srcH}>How we source this</Text>
        <Text style={s.srcT}>{city.sources}</Text>
      </View>
    </Screen>
  );
}

// ---------- shared bits ----------
function Mini({ v, l }: { v: string; l: string }) {
  return (
    <View style={s.mini}>
      <Text style={s.miniV}>{v}</Text>
      <Text style={s.miniL}>{l}</Text>
    </View>
  );
}
function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <View style={s.sectionHead}>
      <View style={s.sectionRow}>
        <View style={s.tick} />
        <Text style={s.sectionLabel}>{label}</Text>
      </View>
      {sub ? <Text style={s.sectionSub}>{sub}</Text> : null}
    </View>
  );
}
function Timeline({ item, last }: { item: Leader; last: boolean }) {
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
        <Text style={s.tlRole}>{item.role}</Text>
      </View>
    </View>
  );
}
function StatTile({ stat }: { stat: Stat }) {
  return (
    <View style={s.statTile}>
      <Text style={s.statVal}>{stat.value}</Text>
      <Text style={s.statLabel}>{stat.label}</Text>
      <View style={[s.pill, stat.status === "cited" ? s.pillCited : s.pillVerify]}>
        <Text style={[s.pillText, { color: stat.status === "cited" ? "#3fbf6a" : colors.orange }]}>
          {stat.status === "cited" ? "cited" : "to verify"}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg },
  grid: { gap: spacing.md },
  provCard: { width: "100%", height: 128, borderRadius: radius.md, overflow: "hidden", justifyContent: "flex-end", padding: spacing.md, backgroundColor: "#111" },
  provCardText: {},
  provName: { color: "#fff", fontFamily: fonts.serifSemi, fontSize: 26, letterSpacing: -0.3 },
  provCap: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 },
  provCount: { position: "absolute", top: 12, right: 12, backgroundColor: colors.orange, paddingVertical: 4, paddingHorizontal: 9, borderRadius: radius.pill },
  provCountText: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.3, textTransform: "uppercase" },

  provHero: { height: 172, borderRadius: radius.lg, overflow: "hidden", marginBottom: spacing.md, justifyContent: "flex-end", padding: spacing.md },
  provHeroText: {},
  cityHero: { height: 216, borderRadius: radius.lg, overflow: "hidden", marginBottom: spacing.md, justifyContent: "flex-end", padding: spacing.md },
  cityHeroText: {},
  heroBack: { position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: radius.pill, backgroundColor: "rgba(0,0,0,0.5)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", zIndex: 3 },
  heroBackText: { color: "#fff", fontSize: 24, lineHeight: 26, marginTop: -2 },
  kick: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase" },
  heroName: { color: "#fff", fontFamily: fonts.display, fontSize: 34, textTransform: "uppercase", marginTop: 4 },
  cityName: { color: "#fff", fontFamily: fonts.display, fontSize: 40, textTransform: "uppercase", marginTop: 4 },
  citySub: { color: "rgba(255,255,255,0.88)", fontFamily: fonts.serifItalic, fontSize: 14, marginTop: 4 },
  est: { position: "absolute", top: 14, right: 14, zIndex: 3, backgroundColor: "rgba(0,0,0,0.55)", borderWidth: 1, borderColor: "rgba(235,164,60,0.5)", paddingVertical: 5, paddingHorizontal: 10, borderRadius: radius.pill },
  estText: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase" },

  miniRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm },
  mini: { flex: 1, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.sm, alignItems: "center" },
  miniV: { color: "#fff", fontFamily: fonts.serif, fontSize: 14, textAlign: "center" },
  miniL: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: 9, letterSpacing: 0.4, textTransform: "uppercase", marginTop: 4, textAlign: "center" },

  sectionHead: { marginTop: spacing.lg, marginBottom: spacing.sm },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  tick: { width: 15, height: 3, borderRadius: 2, backgroundColor: colors.orange },
  sectionLabel: { color: "#fff", fontFamily: fonts.displaySemi, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  sectionSub: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.body, fontSize: type.small, lineHeight: 18, marginTop: 6 },
  para: { color: "rgba(255,255,255,0.72)", fontFamily: fonts.body, fontSize: type.body, lineHeight: 25 },

  cityRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.sm + 2 },
  cityThumb: { width: 60, height: 60, borderRadius: radius.sm, backgroundColor: "#111" },
  cityRowName: { color: "#fff", fontFamily: fonts.serif, fontSize: 16 },
  cityRowMeta: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", marginTop: 4 },
  cityRowSub: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, marginTop: 4 },
  chev: { color: "rgba(255,255,255,0.5)", fontSize: 24 },

  band: { marginTop: spacing.md, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(235,164,60,0.3)", borderRadius: radius.md, padding: spacing.md },
  bandLabel: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase" },
  bandText: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.serif, fontSize: 14, lineHeight: 22, marginTop: 7 },

  tlItem: { flexDirection: "row", gap: spacing.md },
  tlRail: { alignItems: "center" },
  tlDot: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  tlLine: { width: 2, flex: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 2 },
  tlWhen: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.4 },
  tlName: { color: "#fff", fontFamily: fonts.serif, fontSize: 15, marginTop: 1 },
  tlRole: { color: "rgba(255,255,255,0.58)", fontFamily: fonts.body, fontSize: 12, lineHeight: 17, marginTop: 2 },

  statGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  statTile: { flexGrow: 1, flexBasis: 150, minWidth: 140, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md },
  statVal: { color: "#fff", fontFamily: fonts.display, fontSize: 24 },
  statLabel: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4, textTransform: "uppercase", marginTop: 6 },
  pill: { alignSelf: "flex-start", borderWidth: 1, borderRadius: radius.pill, paddingVertical: 1, paddingHorizontal: 7, marginTop: 7 },
  pillCited: { borderColor: "rgba(63,191,106,0.4)" },
  pillVerify: { borderColor: "rgba(217,106,28,0.4)" },
  pillText: { fontFamily: fonts.bodyBold, fontSize: 8, letterSpacing: 0.4, textTransform: "uppercase" },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 13 },
  chipText: { color: "#fff", fontFamily: fonts.bodyMedium, fontSize: 12 },

  cityArchive: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.lg, backgroundColor: "#0a0a0a", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: radius.md, padding: spacing.md },
  caMicWrap: { width: 42, height: 42, borderRadius: 12, backgroundColor: "rgba(217,106,28,0.18)", borderWidth: 1, borderColor: "rgba(235,164,60,0.4)", alignItems: "center", justifyContent: "center" },
  caH: { color: "#fff", fontFamily: fonts.bodyBold, fontSize: 14 },
  caS: { color: "rgba(255,255,255,0.6)", fontFamily: fonts.body, fontSize: 12, marginTop: 2 },
  caChev: { color: colors.gold, fontSize: 24 },

  srcNote: { marginTop: spacing.lg, backgroundColor: "rgba(217,106,28,0.07)", borderLeftWidth: 3, borderLeftColor: colors.orange, borderRadius: 8, padding: spacing.md },
  srcH: { color: colors.orange, fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" },
  srcT: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.body, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
