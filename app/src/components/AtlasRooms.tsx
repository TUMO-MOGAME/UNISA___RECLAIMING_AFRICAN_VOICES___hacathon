import React from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon, type IconProps } from "../ui";
import { provinces } from "../content/provinces";
import { presidents } from "../content/presidents";
import { heroes } from "../content/heroes";
import { totems } from "../content/totems";
import { nationalDays } from "../content/national-days";

// The Atlas hub band (v2 V2-10). Under D1 the nav has six items, so Provinces, Presidents, Heroes,
// Totems and National Days no longer each get a top-level slot — they live under Atlas. This band
// sits above the Atlas module list and is how you reach them.
//
// The screens themselves are untouched; this only gathers them.

const UI = {
  rooms: {
    en: "Explore the Atlas", tn: "Sekaseka Atlase", af: "Verken die Atlas", zu: "Hlola i-Athulasi", xh: "Phonononga i-Atlasi",
    nso: "Sekaseka Atlase", st: "Hlahloba Atlase", ss: "Hlola i-Athilasi", ts: "Kambisisa Atlasi", nr: "Hlola i-Athulasi", ve: "Sengulusani Atlasi",
  },
  provinces: {
    en: "The Nine Provinces", tn: "Diporofense tse Robong", af: "Die Nege Provinsies", zu: "Izifundazwe Eziyisishiyagalolunye", xh: "Amaphondo Alithoba",
    nso: "Diprofense tše Senyane", st: "Diprofinse tse Robong", ss: "Tifundza Letiyimfica", ts: "Swifundzankulu swa Nkaye", nr: "Iimfunda Ezilithoba", ve: "Mavundu a Tahe",
  },
  presidents: {
    en: "The Presidents", tn: "Ditautona", af: "Die Presidente", zu: "Abongameli", xh: "Oomongameli",
    nso: "Dipresidente", st: "Dipresidente", ss: "Bomengameli", ts: "Vapresidente", nr: "Abarholi", ve: "Vhapresidennde",
  },
  heroes: {
    en: "Heroes of the Nation", tn: "Bagaka ba Setšhaba", af: "Helde van die Nasie", zu: "Amaqhawe Esizwe", xh: "Amagorha Esizwe",
    nso: "Bagale ba Setšhaba", st: "Bahale ba Setjhaba", ss: "Emacocotela Esive", ts: "Tinhenha ta Rixaka", nr: "Amaqhawe Wesitjhaba", ve: "Vhahali vha Lushaka",
  },
  totems: {
    en: "Totems & Clans", tn: "Diboko", af: "Totems en Stamme", zu: "Izithakazelo Nezibongo", xh: "Iziduko",
    nso: "Direto le Meloko", st: "Diboko", ss: "Titfakatelo", ts: "Xivongo", nr: "Iimbongo", ve: "Mitupo",
  },
  days: {
    en: "National Days", tn: "Malatsi a Bosetšhaba", af: "Nasionale Dae", zu: "Izinsuku Zesizwe", xh: "Iintsuku Zesizwe",
    nso: "Matšatši a Setšhaba", st: "Matsatsi a Setjhaba", ss: "Emalanga Esive", ts: "Masiku ya Rixaka", nr: "Amalanga Wesitjhaba", ve: "Maḓuvha a Lushaka",
  },
  entries: {
    en: "entries", tn: "ditsenyo", af: "inskrywings", zu: "amagama", xh: "amagama",
    nso: "ditsenyo", st: "dikenyo", ss: "emagama", ts: "swikombiso", nr: "amagama", ve: "zwiṅwalwa",
  },
};

type Room = {
  key: string;
  label: Record<Lang, string>;
  count: number;
  Glyph: React.ComponentType<IconProps>;
  onPress: () => void;
};

export function AtlasRooms({
  lang,
  onProvinces,
  onPresidents,
  onHeroes,
  onTotems,
  onDays,
}: {
  lang: Lang;
  onProvinces: () => void;
  onPresidents: () => void;
  onHeroes: () => void;
  onTotems: () => void;
  onDays: () => void;
}) {
  const { width } = useWindowDimensions();
  const cols = width >= 1080 ? 5 : width >= 760 ? 3 : 2;

  const rooms: Room[] = [
    { key: "provinces", label: UI.provinces, count: provinces.length, Glyph: Icon.Map, onPress: onProvinces },
    { key: "presidents", label: UI.presidents, count: presidents.length, Glyph: Icon.Crown, onPress: onPresidents },
    { key: "heroes", label: UI.heroes, count: heroes.length, Glyph: Icon.Award, onPress: onHeroes },
    { key: "totems", label: UI.totems, count: totems.length, Glyph: Icon.PawPrint, onPress: onTotems },
    { key: "days", label: UI.days, count: nationalDays.length, Glyph: Icon.CalendarDays, onPress: onDays },
  ];

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{t(UI.rooms, lang)}</Text>
      <View style={styles.grid}>
        {rooms.map((r) => (
          <Pressable
            key={r.key}
            onPress={r.onPress}
            accessibilityRole="link"
            accessibilityLabel={t(r.label, lang)}
            style={({ hovered, pressed }: any) => [
              styles.card,
              { width: `${100 / cols}%` },
              hovered && styles.cardHover,
              pressed && styles.cardPressed,
            ]}
          >
            <r.Glyph size={20} color={colors.dsBlue} />
            <Text style={styles.cardTitle} numberOfLines={2}>
              {t(r.label, lang)}
            </Text>
            <Text style={styles.cardMeta}>
              {r.count} {t(UI.entries, lang)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.md, marginTop: spacing.lg },
  label: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  // Percentage widths + a negative gutter give an even grid without a dependency.
  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -spacing.xs },
  card: {
    gap: 7,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.sm,
    minWidth: 132,
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.sm,
  },
  cardHover: { borderColor: colors.dsBlue, backgroundColor: "rgba(26,133,167,0.08)" },
  cardPressed: { opacity: 0.85 },
  cardTitle: { color: "#FFFFFF", fontFamily: fonts.heading, fontSize: 14, lineHeight: 19 },
  cardMeta: { color: "rgba(255,255,255,0.45)", fontFamily: fonts.body, fontSize: 12 },
});
