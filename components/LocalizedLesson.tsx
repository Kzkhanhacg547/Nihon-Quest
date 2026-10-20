"use client";

import React from "react";
import { useNativeLanguage } from "@/components/LanguageContext";
import {
  getLocalizedLessonTitle,
  getLocalizedLessonDesc,
  getLocalizedRoadmapLabel,
  getLocalizedUnitTitle,
  getLocalizedUnitDesc,
  getLocalizedTrackTitle,
  getLocalizedShortTrackLabel,
  getLocalizedGenkiReference,
  getLocalizedPathName,
  getLocalizedPathTagline,
  getLocalizedDailyMinutes,
} from "@/lib/lessonLocalization";

export { getLocalizedTrackTitle, getLocalizedShortTrackLabel, getLocalizedGenkiReference };
import {
  getLocalizedMissionTitle,
  getLocalizedJourneyDescription,
  getLocalizedJourneyName,
} from "@/lib/metaLocalization";

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
  const text = getLocalizedLessonTitle(slug, nativeLanguage, fallback);
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
  const text = getLocalizedLessonDesc(slug, nativeLanguage, fallback);
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

export function LocalizedTrackTitle({
  trackId,
  fallback,
  className,
}: {
  trackId?: string | null;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedTrackTitle(trackId, nativeLanguage, fallback)}
    </span>
  );
}

export function LocalizedShortTrackLabel({
  label,
  className,
}: {
  label?: string | null;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedShortTrackLabel(label, nativeLanguage)}
    </span>
  );
}

export function LocalizedGenkiRef({
  refString,
  className,
}: {
  refString?: string | null;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedGenkiReference(refString, nativeLanguage)}
    </span>
  );
}

export function LocalizedPathName({
  goal,
  style,
  fallback,
  className,
}: {
  goal: string;
  style: string;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedPathName(goal, style, nativeLanguage, fallback)}
    </span>
  );
}

export function LocalizedPathTagline({
  goal,
  style,
  level,
  skill,
  fallback,
  className,
}: {
  goal: string;
  style: string;
  level: string;
  skill: string;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedPathTagline(goal, style, level, skill, nativeLanguage, fallback)}
    </span>
  );
}

export function LocalizedDailyMinutes({
  minutes,
  className,
}: {
  minutes: number;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  return (
    <span className={className} suppressHydrationWarning>
      {getLocalizedDailyMinutes(minutes, nativeLanguage)}
    </span>
  );
}

export function LocalizedMissionTitle({
  missionKey,
  fallback,
  className,
}: {
  missionKey: string;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  const text = getLocalizedMissionTitle(missionKey, nativeLanguage, fallback);
  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}

export function LocalizedJourneyDesc({
  slug,
  fallback,
  className,
}: {
  slug: string;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  const text = getLocalizedJourneyDescription(slug, nativeLanguage, fallback);
  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}

export function LocalizedJourneyName({
  slug,
  fallback,
  className,
}: {
  slug: string;
  fallback: string;
  className?: string;
}) {
  const { nativeLanguage } = useNativeLanguage();
  const text = getLocalizedJourneyName(slug, nativeLanguage, fallback);
  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}

