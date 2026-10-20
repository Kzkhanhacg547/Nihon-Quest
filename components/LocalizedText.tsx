"use client";

import React from "react";
import { useNativeLanguage, getLocalizedQuote } from "@/components/LanguageContext";

export function LocalizedText({
  k,
  fallback,
  params,
}: {
  k: string;
  fallback: string;
  params?: Record<string, string | number>;
}) {
  const { t } = useNativeLanguage();
  const val = t(k, params);
  return <span suppressHydrationWarning>{!val || val === k ? fallback : val}</span>;
}

export function LocalizedQuote({ kanji, fallback }: { kanji: string; fallback: string }) {
  const { nativeLanguage } = useNativeLanguage();
  const quote = getLocalizedQuote(kanji, fallback, nativeLanguage);
  return <span suppressHydrationWarning>{quote}</span>;
}
