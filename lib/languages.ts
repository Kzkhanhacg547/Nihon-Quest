export type NativeLanguage =
  | "vi"
  | "en"
  | "zh-CN"
  | "zh-TW"
  | "ko"
  | "es"
  | "fr"
  | "de"
  | "id"
  | "th"
  | "ru"
  | "pt";

export interface NativeLanguageInfo {
  code: NativeLanguage;
  name: string;
  nativeName: string;
  flag: string;
  short: string;
  speechLang: string; // BCP 47 code for speech recognition and synthesis
}

export const SUPPORTED_LANGUAGES: NativeLanguageInfo[] = [
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", short: "VI", speechLang: "vi-VN" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", short: "EN", speechLang: "en-US" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", short: "简", speechLang: "zh-CN" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼", short: "繁", speechLang: "zh-TW" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", short: "KO", speechLang: "ko-KR" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", short: "ES", speechLang: "es-ES" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", short: "FR", speechLang: "fr-FR" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", short: "DE", speechLang: "de-DE" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", short: "ID", speechLang: "id-ID" },
  { code: "th", name: "Thai", nativeName: "ภาษาไทย", flag: "🇹🇭", short: "TH", speechLang: "th-TH" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", short: "RU", speechLang: "ru-RU" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", short: "PT", speechLang: "pt-BR" },
];

