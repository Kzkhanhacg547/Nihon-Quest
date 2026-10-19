"use client";

import React from "react";
import { useNativeLanguage } from "@/components/LanguageContext";
import { getLocalizedLessonTitle, getLocalizedLessonDesc, getLocalizedRoadmapLabel } from "@/lib/lessonLocalization";

export function LocalizedLessonTitle({
  slug,
  fallback,
  className,
}: {
  slug?: string | null;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  const text = slug ? getLocalizedLessonTitle(slug, nativeLanguage, fallback) : fallback;
  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}

export function LocalizedLessonDesc({
  slug,
  fallback,
  className,
}: {
  slug?: string | null;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  const text = slug ? getLocalizedLessonDesc(slug, nativeLanguage, fallback) : fallback;
  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}

export function LocalizedRoadmapTag({
  tagKey,
  fallback,
  className,
}: {
  tagKey: string;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedRoadmapLabel(tagKey, nativeLanguage, fallback)}
    </span>
  );
}
