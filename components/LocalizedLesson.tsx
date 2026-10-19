"use client";

import React from "react";
import { useNativeLanguage } from "@/components/LanguageContext";
import {
  getLocalizedLessonTitle,
  getLocalizedLessonDesc,
  getLocalizedRoadmapLabel,
  getLocalizedUnitTitle,
  getLocalizedUnitDesc,
} from "@/lib/lessonLocalization";

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

export function LocalizedUnitTitle({
  level,
  unitNumber,
  fallback,
  className,
}: {
  level: string;
  unitNumber: number;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedUnitTitle(level, unitNumber, nativeLanguage, fallback)}
    </span>
  );
}

export function LocalizedUnitDesc({
  level,
  unitNumber,
  fallback,
  className,
}: {
  level: string;
  unitNumber: number;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedUnitDesc(level, unitNumber, nativeLanguage, fallback)}
    </span>
  );
}

