// Countries & national anthems. The home masthead carries a country selector (mirroring the language
// picker) — South Africa is the default, shown with its flag, and its anthem plays from a bundled
// recording. All 54 African countries are listed with their flags; anthems are added over time.
// Only countries with an `anthem` can play; the rest show "anthem coming" until their audio lands.
//
// Flags: public-domain PNGs from flagcdn.com, bundled at assets/flags/<code>.png (ISO 3166-1 alpha-2).
// To add an anthem: drop the mp3 in assets/anthems/, then set `anthem: require(...)` + `anthemBy`.

export type Country = {
  /** ISO 3166-1 alpha-2, lowercase (e.g. "za"). */
  code: string;
  /** English country name. */
  name: string;
  /** Flag image — require("../../assets/flags/<code>.png"). */
  flag: number;
  /** Bundled national-anthem recording — require(...). Omit until the audio is added. */
  anthem?: number;
  /** Attribution for the anthem recording (performer / choir). */
  anthemBy?: string;
};

// Alphabetical by English name. South Africa is the default (see DEFAULT_COUNTRY) and is the only
// entry with an anthem so far.
export const countries: Country[] = [
  { code: "dz", name: "Algeria", flag: require("../../assets/flags/dz.png") },
  { code: "ao", name: "Angola", flag: require("../../assets/flags/ao.png") },
  { code: "bj", name: "Benin", flag: require("../../assets/flags/bj.png") },
  { code: "bw", name: "Botswana", flag: require("../../assets/flags/bw.png") },
  { code: "bf", name: "Burkina Faso", flag: require("../../assets/flags/bf.png") },
  { code: "bi", name: "Burundi", flag: require("../../assets/flags/bi.png") },
  { code: "cv", name: "Cabo Verde", flag: require("../../assets/flags/cv.png") },
  { code: "cm", name: "Cameroon", flag: require("../../assets/flags/cm.png") },
  { code: "cf", name: "Central African Republic", flag: require("../../assets/flags/cf.png") },
  { code: "td", name: "Chad", flag: require("../../assets/flags/td.png") },
  { code: "km", name: "Comoros", flag: require("../../assets/flags/km.png") },
  { code: "cg", name: "Congo (Republic)", flag: require("../../assets/flags/cg.png") },
  { code: "cd", name: "Congo (DRC)", flag: require("../../assets/flags/cd.png") },
  { code: "ci", name: "Côte d'Ivoire", flag: require("../../assets/flags/ci.png") },
  { code: "dj", name: "Djibouti", flag: require("../../assets/flags/dj.png") },
  { code: "eg", name: "Egypt", flag: require("../../assets/flags/eg.png") },
  { code: "gq", name: "Equatorial Guinea", flag: require("../../assets/flags/gq.png") },
  { code: "er", name: "Eritrea", flag: require("../../assets/flags/er.png") },
  { code: "sz", name: "Eswatini", flag: require("../../assets/flags/sz.png") },
  { code: "et", name: "Ethiopia", flag: require("../../assets/flags/et.png") },
  { code: "ga", name: "Gabon", flag: require("../../assets/flags/ga.png") },
  { code: "gm", name: "Gambia", flag: require("../../assets/flags/gm.png") },
  { code: "gh", name: "Ghana", flag: require("../../assets/flags/gh.png") },
  { code: "gn", name: "Guinea", flag: require("../../assets/flags/gn.png") },
  { code: "gw", name: "Guinea-Bissau", flag: require("../../assets/flags/gw.png") },
  { code: "ke", name: "Kenya", flag: require("../../assets/flags/ke.png") },
  { code: "ls", name: "Lesotho", flag: require("../../assets/flags/ls.png") },
  { code: "lr", name: "Liberia", flag: require("../../assets/flags/lr.png") },
  { code: "ly", name: "Libya", flag: require("../../assets/flags/ly.png") },
  { code: "mg", name: "Madagascar", flag: require("../../assets/flags/mg.png") },
  { code: "mw", name: "Malawi", flag: require("../../assets/flags/mw.png") },
  { code: "ml", name: "Mali", flag: require("../../assets/flags/ml.png") },
  { code: "mr", name: "Mauritania", flag: require("../../assets/flags/mr.png") },
  { code: "mu", name: "Mauritius", flag: require("../../assets/flags/mu.png") },
  { code: "ma", name: "Morocco", flag: require("../../assets/flags/ma.png") },
  { code: "mz", name: "Mozambique", flag: require("../../assets/flags/mz.png") },
  { code: "na", name: "Namibia", flag: require("../../assets/flags/na.png") },
  { code: "ne", name: "Niger", flag: require("../../assets/flags/ne.png") },
  { code: "ng", name: "Nigeria", flag: require("../../assets/flags/ng.png") },
  { code: "rw", name: "Rwanda", flag: require("../../assets/flags/rw.png") },
  { code: "st", name: "São Tomé and Príncipe", flag: require("../../assets/flags/st.png") },
  { code: "sn", name: "Senegal", flag: require("../../assets/flags/sn.png") },
  { code: "sc", name: "Seychelles", flag: require("../../assets/flags/sc.png") },
  { code: "sl", name: "Sierra Leone", flag: require("../../assets/flags/sl.png") },
  { code: "so", name: "Somalia", flag: require("../../assets/flags/so.png") },
  {
    code: "za",
    name: "South Africa",
    flag: require("../../assets/flags/za.png"),
    anthem: require("../../assets/anthems/south-africa.mp3"),
    anthemBy: "Stellenbosch University Choir",
  },
  { code: "ss", name: "South Sudan", flag: require("../../assets/flags/ss.png") },
  { code: "sd", name: "Sudan", flag: require("../../assets/flags/sd.png") },
  { code: "tz", name: "Tanzania", flag: require("../../assets/flags/tz.png") },
  { code: "tg", name: "Togo", flag: require("../../assets/flags/tg.png") },
  { code: "tn", name: "Tunisia", flag: require("../../assets/flags/tn.png") },
  { code: "ug", name: "Uganda", flag: require("../../assets/flags/ug.png") },
  { code: "zm", name: "Zambia", flag: require("../../assets/flags/zm.png") },
  { code: "zw", name: "Zimbabwe", flag: require("../../assets/flags/zw.png") },
];

/** Default country on first load. */
export const DEFAULT_COUNTRY = "za";

export const countryByCode = (code: string): Country =>
  countries.find((c) => c.code === code) ?? countries.find((c) => c.code === DEFAULT_COUNTRY) ?? countries[0];
