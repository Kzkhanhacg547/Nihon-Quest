"use client";

import React from "react";
import { useNativeLanguage } from "@/components/LanguageContext";

export function LocalizedText({ k, fallback }: { k: string; fallback: string }) {
  const { t } = useNativeLanguage();
  return <span suppressHydrationWarning>{t(k) || fallback}</span>;
}

