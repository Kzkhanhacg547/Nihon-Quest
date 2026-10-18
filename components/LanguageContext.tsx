"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type NativeLanguage = "vi" | "en";

export interface NativeLanguageInfo {
  code: NativeLanguage;
  name: string;
  flag: string;
  short: string;
}

export const SUPPORTED_LANGUAGES: NativeLanguageInfo[] = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", short: "VI" },
  { code: "en", name: "English", flag: "🇬🇧", short: "EN" },
];

interface LanguageContextType {
  nativeLanguage: NativeLanguage;
  setNativeLanguage: (lang: NativeLanguage) => void;
  langInfo: NativeLanguageInfo;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const DICTIONARY: Record<NativeLanguage, Record<string, string>> = {
  vi: {
    nativeLangTitle: "Ngôn ngữ mẹ đẻ",
    nativeLangSubtitle: "Giải thích ngữ pháp và từ vựng sẽ theo ngôn ngữ này",
    aiAssistant: "Trợ lý AI Kawaii Sensei",
    todayStudyTip: "Hôm nay tôi nên học gì?",
    checkSrsCards: "Kiểm tra thẻ ôn tập SRS",
    explainGrammar: "Giải thích ngữ pháp",
    practiceSpeaking: "Luyện phản xạ giao tiếp",
    srsDueAlert: "thẻ từ vựng cần ôn tập hôm nay!",
    streakAlert: "Duy trì chuỗi học tập hôm nay để bảo toàn Streak!",
    sendReminderBtn: "Gửi nhắc nhở qua Email",
    reminderSent: "Đã gửi email nhắc nhở học tập đến hộp thư của bạn!",
    dailyGoal: "Mục tiêu ngày",
  },
  en: {
    nativeLangTitle: "Native Language",
    nativeLangSubtitle: "Grammar & vocabulary will be explained in this language",
    aiAssistant: "Kawaii Sensei AI Assistant",
    todayStudyTip: "What should I study today?",
    checkSrsCards: "Check SRS review cards",
    explainGrammar: "Explain grammar points",
    practiceSpeaking: "Practice conversational speaking",
    srsDueAlert: "SRS flashcard(s) due for review today!",
    streakAlert: "Keep your daily streak alive today!",
    sendReminderBtn: "Send study reminder via email",
    reminderSent: "Study reminder email sent to your inbox!",
    dailyGoal: "Daily Goal",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [nativeLanguage, setNativeLanguageState] = useState<NativeLanguage>("vi");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nq_native_language") as NativeLanguage | null;
      if (stored && (stored === "vi" || stored === "en")) {
        setNativeLanguageState(stored);
      }
    } catch {
      // Ignore
    }
  }, []);

  const setNativeLanguage = useCallback((lang: NativeLanguage) => {
    setNativeLanguageState(lang);
    try {
      localStorage.setItem("nq_native_language", lang);
    } catch {
      // Ignore
    }
  }, []);

  const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === nativeLanguage) || SUPPORTED_LANGUAGES[0];

  const t = useCallback(
    (key: string): string => {
      return DICTIONARY[nativeLanguage]?.[key] || DICTIONARY.vi[key] || key;
    },
    [nativeLanguage]
  );

  return (
    <LanguageContext.Provider value={{ nativeLanguage, setNativeLanguage, langInfo, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useNativeLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      nativeLanguage: "vi" as NativeLanguage,
      setNativeLanguage: () => {},
      langInfo: SUPPORTED_LANGUAGES[0],
      t: (key: string) => DICTIONARY.vi[key] || key,
    };
  }
  return ctx;
}

