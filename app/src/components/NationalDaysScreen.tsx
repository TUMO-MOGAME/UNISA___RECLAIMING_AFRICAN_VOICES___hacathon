import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Platform } from "react-native";
import { Image } from "expo-image";
import { Screen, ScreenHeader, Icon } from "../ui";
import { nationalDays } from "../content/national-days";
import { colors, spacing, radius, fonts, type } from "../theme/tokens";
import { t } from "../i18n";
import type { LangCode } from "../i18n";
import { SideIndexScroll } from "./SideIndexScroll";
import { PlayOnceRow } from "./PlayOnceRow";

// National Days — the commemorative days that carry South Africa's history, in calendar order.
// Same editorial index layout as the Atlas/Provinces/Presidents. Each day shows its grounded story
// now; the media panel is an HONEST placeholder (labelled as coming) until Emma's photos, video and
// audio land in assets/days/ and are wired in content/national-days.ts.

const BLUE = "#1A85A7";
const numOf = (i: number) => (i + 1).toString().padStart(2, "0");

const UI = {
  kicker: {
    en: "Days we remember", tn: "Malatsi a re a gakologelwang", af: "Dae wat ons onthou", zu: "Izinsuku esizikhumbulayo", xh: "Iintsuku esizikhumbulayo",
    nso: "Matšatši ao re a gopolago", st: "Matsatsi ao re a hopolang", ss: "Emalanga lesiwakhumbulako", ts: "Masiku lawa hi ma tsundzukaka", nr: "Amalanga esiwakhumbulako", ve: "Maḓuvha ane ra a humbula",
  },
  title: {
    en: "National Days", tn: "Malatsi a Bosetšhaba", af: "Nasionale Dae", zu: "Izinsuku Zikazwelonke", xh: "Iintsuku Zesizwe",
    nso: "Matšatši a Setšhaba", st: "Matsatsi a Naha", ss: "Emalanga Esive", ts: "Masiku ya Rixaka", nr: "Amalanga Wesitjhaba", ve: "Maḓuvha a Lushaka",
  },
  intro: {
    en: "The days that carry our history — what happened, why it matters, and the people who paid for it. Photos, film and sound for each day are being added.",
    tn: "Malatsi a a rweleng hisitori ya rona — se se diragetseng, goreng se le botlhokwa, le batho ba ba se duetseng. Ditshwantsho, difilimi le modumo di a tla.",
  },
  contents: {
    en: "Days", tn: "Malatsi", af: "Dae", zu: "Izinsuku", xh: "Iintsuku",
    nso: "Matšatši", st: "Matsatsi", ss: "Emalanga", ts: "Masiku", nr: "Amalanga", ve: "Maḓuvha",
  },
  mediaSoon: {
    en: "Photos, film & sound coming", tn: "Ditshwantsho, filimi le modumo di e tla",
  },
  interpretation: {
    en: "Illustrated interpretation", tn: "Setshwantsho sa botaki", af: "Geïllustreerde interpretasie", zu: "Ukudweba okuhunyushiwe", xh: "Umzobo oguqulweyo",
    nso: "Seswantšho sa tlhathollo", st: "Setshwantsho sa tlhaloso", ss: "Umdvwebo lohunyushiwe", ts: "Xifaniso xo hlamuseriwa", nr: "Umdwebo ohlathululiweko", ve: "Tshifanyiso tsha ṱhalutshedzo",
  },
  notHoliday: {
    en: "Commemorative — not a public holiday", tn: "Segopotso — ga se letsatsi la boikhutso",
  },
  poem: {
    en: "Poem", tn: "Poko", af: "Gedig", zu: "Inkondlo", xh: "Umbongo",
    nso: "Theto", st: "Thothokiso", ss: "Inkondlo", ts: "Xiphato", nr: "Inkondlo", ve: "Vhurendi",
  },
};

// A muted YouTube embed shown in the media panel WHILE a day's poem plays (the poem carries the
// audio; the film carries the picture). Web only — RN web renders DOM elements natively; native
// keeps the photograph.
function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  if (Platform.OS !== "web") return null;
  return React.createElement("iframe" as any, {
    src: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${youtubeId}`,
    style: { width: "100%", height: "100%", border: "0" },
    allow: "autoplay; encrypted-media; picture-in-picture",
    allowFullScreen: true,
    title,
  });
}

export function NationalDaysScreen({ onBack, lang }: { onBack: () => void; lang: LangCode }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  // which day's poem is sounding right now — that day's panel shows its film instead of its photo
  const [playingDay, setPlayingDay] = useState<string | null>(null);

  const masthead = (
    <View style={s.pad}>
      <ScreenHeader kicker={t(UI.kicker, lang)} title={t(UI.title, lang)} lang={lang} onBack={onBack} />
      <Text style={s.intro}>{t(UI.intro, lang)}</Text>
    </View>
  );

  const renderDay = (_item: { key: string; label: string }, i: number) => {
    const d = nationalDays[i];
    return (
      <View style={s.pad}>
        <View style={s.entry}>
          <View style={s.top}>
            <Text style={s.num}>{numOf(i)}</Text>
            <View style={s.rule} />
          </View>

          <Text style={s.cat}>{d.date.toUpperCase()} · {d.commemorates.toUpperCase()}</Text>
          <Text style={[s.title, wide && s.titleWide]}>{d.name}</Text>

          {/* media panel — the day's film while its poem plays; otherwise the photograph
              (letterboxed + credited when it's a real archival photo, never labelled as AI) */}
          <View style={[s.mediaWrap, { height: wide ? (d.imageCredit ? 380 : 260) : (d.imageCredit ? 280 : 180) }]}>
            {d.videoEmbed && playingDay === d.id && Platform.OS === "web" ? (
              <VideoEmbed youtubeId={d.videoEmbed} title={d.name} />
            ) : d.image ? (
              <>
                <Image
                  source={d.image}
                  style={s.mediaImg}
                  contentFit={d.imageCredit ? "contain" : "cover"}
                  transition={200}
                  cachePolicy="disk"
                  accessibilityLabel={`${d.name} — ${d.imageCredit ?? t(UI.interpretation, lang)}`}
                />
                <Text style={s.interpretTag}>{d.imageCredit ?? t(UI.interpretation, lang)}</Text>
              </>
            ) : (
              <View style={s.placeholder}>
                <Text style={s.phDate}>{d.date.toUpperCase()}</Text>
                <View style={s.phChips}>
                  <View style={s.phChip}><Icon.ImageIcon size={15} color="rgba(255,255,255,0.55)" /></View>
                  <View style={s.phChip}><Icon.Film size={15} color="rgba(255,255,255,0.55)" /></View>
                  <View style={s.phChip}><Icon.Music size={15} color="rgba(255,255,255,0.55)" /></View>
                </View>
                <Text style={s.phNote}>{t(UI.mediaSoon, lang)}</Text>
              </View>
            )}
          </View>

          <Text style={[s.lead, wide && s.leadWide]}>{d.history}</Text>

          {d.audio ? (
            <View style={{ marginTop: spacing.md }}>
              <PlayOnceRow
                source={d.audio}
                title={t(UI.poem, lang)}
                by={d.audioBy}
                lang={lang}
                onPhase={(phase) =>
                  setPlayingDay((cur) =>
                    phase === "playing" || phase === "paused" ? d.id : cur === d.id ? null : cur
                  )
                }
              />
            </View>
          ) : null}

          {d.notPublicHoliday ? (
            <View style={s.flagRow}>
              <Icon.CalendarDays size={14} color={colors.gold} />
              <Text style={s.flagText}>{t(UI.notHoliday, lang)}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <Screen tone="dark" scroll={false} padded={false} contentStyle={s.flexFill}>
      <SideIndexScroll
        contentsLabel={t(UI.contents, lang)}
        masthead={masthead}
        items={nationalDays.map((d) => ({ key: d.id, label: `${d.date} — ${d.name}` }))}
        renderItem={renderDay}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  flexFill: { flex: 1 },
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  intro: { color: "rgba(255,255,255,0.62)", fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22, marginBottom: spacing.md },

  entry: { marginTop: spacing.xl, marginBottom: spacing.md },
  top: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  num: { color: BLUE, fontFamily: fonts.display, fontSize: 34, lineHeight: 34, letterSpacing: -1 },
  rule: { flex: 1, height: 2, backgroundColor: "rgba(255,255,255,0.14)" },
  cat: { color: "rgba(255,255,255,0.55)", fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: spacing.sm },
  title: { color: "#FFFFFF", fontFamily: fonts.display, fontSize: 30, lineHeight: 33, letterSpacing: -0.5, marginBottom: spacing.lg },
  titleWide: { fontSize: 44, lineHeight: 46 },

  mediaWrap: { width: "100%", borderRadius: radius.md, overflow: "hidden", backgroundColor: "#0b0b0b", marginBottom: spacing.lg },
  mediaImg: { width: "100%", height: "100%" },
  interpretTag: { position: "absolute", bottom: 8, right: 10, color: "rgba(255,255,255,0.65)", backgroundColor: "rgba(0,0,0,0.45)", fontFamily: fonts.body, fontSize: 10, letterSpacing: 0.4, paddingVertical: 3, paddingHorizontal: 8, borderRadius: radius.pill, overflow: "hidden" },
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", borderRadius: radius.md, borderStyle: "dashed" },
  phDate: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.display, fontSize: 30, letterSpacing: 2 },
  phChips: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  phChip: { width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.16)", alignItems: "center", justifyContent: "center" },
  phNote: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.body, fontSize: 12, marginTop: spacing.md, letterSpacing: 0.4 },

  lead: { color: "rgba(255,255,255,0.74)", fontFamily: fonts.body, fontSize: type.body, lineHeight: 26 },
  // full column width — the text's right edge aligns with the media card above it
  leadWide: { fontSize: 17, lineHeight: 28 },

  flagRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md },
  flagText: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase" },

});
