"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSoundAndTheme } from "@/components/SoundAndThemeContext";
import { useNativeLanguage } from "@/components/LanguageContext";
import {
  LEVEL_LABELS,
  GOAL_LABELS,
  SKILL_LABELS,
  STYLE_LABELS,
  type LifecycleStage,
  type RemediationItem,
} from "@/lib/personalization";

export interface SkillProficiencyItem {
  key: "VOCAB" | "GRAMMAR" | "READING" | "LISTENING" | "PRACTICAL";
  label: string;
  jpLabel: string;
  glyph: string;
  score: number; // 0 - 100
  levelStatus: "MASTERED" | "GOOD" | "DEVELOPING" | "NEEDS_WORK";
  learnedCount: number;
  totalTarget: number;
  accuracyRate: number | null; // %
  assessmentNote: string;
  recommendation: string;
  actionHref: string;
  actionLabel: string;
}

export interface LifecycleProgressStage extends LifecycleStage {
  status: "COMPLETED" | "ACTIVE" | "PENDING";
  metricLabel?: string;
  metricValue?: string;
}

export interface AnalyticsClientProps {
  user: {
    displayName: string;
    level: number;
    currentLevelXP: number;
    nextLevelXP: number;
    levelProgressPercent: number;
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    learningLevel: string;
    learningGoal: string;
    focusSkill: string;
    learningStyle: string;
    dailyGoalMinutes: number;
  };
  readinessScore: number; // 0 - 100
  readinessTier: {
    label: string;
    color: string;
    tag: string;
    desc: string;
  };
  estDaysToTarget: number;
  estWeeksToTarget: number;
  learningVelocity: {
    dailyXpAverage: number;
    weeklyLessonsPace: number;
    adherencePercent: number;
  };
  skills: SkillProficiencyItem[];
  lifecycleStages: LifecycleProgressStage[];
  memoryRetention: {
    totalItems: number;
    masteredCount: number;
    reviewingCount: number;
    learningCount: number;
    dueCount: number;
    retentionRate: number | null; // %
    retentionTier: string;
  };
  pathSummary: {
    totalModules: number;
    completedModules: number;
    percentComplete: number;
    currentModuleTitle?: string;
    currentModuleHref?: string;
  };
  remediationItems: RemediationItem[];
  journeyProgress: {
    unlockedStations: number;
    totalStations: number;
    currentStationName: string;
    progressPercent: number;
  };
  achievements: {
    unlocked: number;
    total: number;
  };
}

export function AnalyticsClient({
  user,
  readinessScore,
  readinessTier,
  estDaysToTarget,
  estWeeksToTarget,
  learningVelocity,
  skills,
  lifecycleStages,
  memoryRetention,
  pathSummary,
  remediationItems,
  journeyProgress,
  achievements,
}: AnalyticsClientProps) {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "SKILLS" | "LIFECYCLE" | "MEMORY" | "REMEDIATION">("OVERVIEW");
  const { playClick } = useSoundAndTheme();
  const { t } = useNativeLanguage();

  const getBadgeText = (status: SkillProficiencyItem["levelStatus"]) => {
    if (status === "MASTERED") return t("analyticsStatusMastered") || "Mastered";
    if (status === "GOOD") return t("analyticsStatusGood") || "Good";
    if (status === "DEVELOPING") return t("analyticsStatusDeveloping") || "Developing";
    return t("analyticsStatusNeedsWork") || "Needs Urgent Work";
  };

  const getLocalizedGoal = (val: string) => t("goal_" + val) || GOAL_LABELS[val] || val;
  const getLocalizedSkill = (val: string) => t("skill_" + val) || SKILL_LABELS[val] || val;
  const getLocalizedStyle = (val: string) => t("style_" + val) || STYLE_LABELS[val] || val;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ================= 1. HERO BANNER ================= */}
      <section className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-900 via-sumi-900 to-red-950 p-5 text-white shadow-xl sm:p-8">
        {/* Japanese Calligraphy / Kanji Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-10 select-none text-[130px] font-black leading-none text-white/[0.04] sm:text-[220px]"
        >
          進歩
        </div>

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              <span>{t("analyticsStepBadge") || "STEP 8 · SCIENTIFIC LEARNING CYCLE"}</span>
              <span>•</span>
              <span>JLPT {user.learningLevel}</span>
            </div>

            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {t("analyticsHeroTitle") || "Progress"}{" "}
              <span className="text-red-400">{t("analyticsHeroTitleSub") || "Evaluation"}</span>
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm lg:text-base">
              {t("analyticsHeroDesc", { name: user.displayName }) ||
                `Multi-dimensional Japanese competency analysis: Measure JLPT readiness, diagnose knowledge gaps, and sync personalized learning path for ${user.displayName}.`}
            </p>

            {/* User Strategy Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">
                🎯 {t("analyticsGoalLabel") || "Goal:"} <b className="text-white">{getLocalizedGoal(user.learningGoal)}</b>
              </span>
              <span className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">
                ⚡ {t("analyticsFocusLabel") || "Focus:"} <b className="text-white">{getLocalizedSkill(user.focusSkill)}</b>
              </span>
              <span className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">
                🧭 {t("analyticsStyleLabel") || "Style:"} <b className="text-white">{getLocalizedStyle(user.learningStyle)}</b>
              </span>
              <span className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">
                ⏱️ {t("analyticsPaceLabel") || "Pace:"} <b className="text-white">{user.dailyGoalMinutes} {t("analyticsPaceUnit") || "min/day"}</b>
              </span>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/app/test"
              onClick={playClick}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:brightness-110 active:scale-95"
            >
              <span>{t("analyticsActionTest") || "🎯 4-Skill Mock Exam"}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/app/path"
              onClick={playClick}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              <span>{t("analyticsActionPath") || "🧭 Personal Roadmap"}</span>
            </Link>
            <Link
              href="/app/stats"
              onClick={playClick}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              <span>{t("analyticsActionStats") || "📊 Charts & Stats"}</span>
            </Link>
          </div>
        </div>

        {/* Highlight Score Cards */}
        <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4 sm:gap-4">
          {/* JLPT Readiness */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-slate-400">
              {t("analyticsReadinessLabel", { level: user.learningLevel }) || `Readiness ${user.learningLevel}`}
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-rose-400 sm:text-3xl">{readinessScore}%</span>
              <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300">
                {readinessTier.tag}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-300 truncate">{readinessTier.label}</p>
          </div>

          {/* Time to Target */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-slate-400">
              {t("analyticsForecastCompletion") || "Estimated Completion"}
            </p>
            <p className="mt-1 text-2xl font-black text-amber-400 sm:text-3xl">
              ~{estWeeksToTarget} {t("weeks") || "weeks"}
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              ~{estDaysToTarget} {t("daysUnit") || "days"}
            </p>
          </div>

          {/* Path Completion */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-slate-400">
              {t("analyticsPathProgress") || "Roadmap Progress"}
            </p>
            <p className="mt-1 text-2xl font-black text-emerald-400 sm:text-3xl">
              {pathSummary.percentComplete}%
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              {pathSummary.completedModules}/{pathSummary.totalModules} {t("topics") || "modules"}
            </p>
          </div>

          {/* Habit Adherence */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-slate-400">
              {t("analyticsAdherence") || "Habit Adherence"}
            </p>
            <p className="mt-1 text-2xl font-black text-orange-400 sm:text-3xl">
              🔥 {user.currentStreak} {t("streakUnit") || "days"}
            </p>
            <p className="mt-1 text-[11px] text-slate-300">{learningVelocity.adherencePercent}%</p>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-slate-800 overflow-x-auto no-scrollbar py-1">
        {[
          { key: "OVERVIEW", label: t("analyticsTabOverview") || "Overview & JLPT Forecast", glyph: "進" },
          { key: "SKILLS", label: t("analyticsTabSkills") || "5 Skills Matrix", glyph: "技" },
          { key: "LIFECYCLE", label: t("analyticsTabLifecycle") || "8-Step Cycle", glyph: "環" },
          { key: "MEMORY", label: t("analyticsTabMemory") || "SRS Memory & Forgetting", glyph: "記" },
          { key: "REMEDIATION", label: `${t("analyticsTabRemediation") || "Remediation Station"} (${remediationItems.length})`, glyph: "🩺" },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                playClick();
                setActiveTab(tab.key as any);
              }}
              className={`flex items-center gap-2 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-extrabold transition shrink-0 ${
                isActive
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-sumi-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <span className="jp-text text-sm">{tab.glyph}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= 3. TAB CONTENT: OVERVIEW ================= */}
      {activeTab === "OVERVIEW" && (
        <div className="space-y-6">
          {/* Main Evaluation Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* JLPT Readiness Meter */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {t("analyticsReadinessTitle", { level: user.learningLevel }) ||
                        `🎯 JLPT ${user.learningLevel} Readiness Competency Index`}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t("analyticsReadinessDesc") ||
                        "Automatically calculated from: Lesson completion, quiz accuracy, SRS flashcards, and study discipline."}
                    </p>
                  </div>
                  <span className="text-2xl shrink-0 ml-2">🇯🇵</span>
                </div>

                {/* Big Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t("analyticsReadinessLevel") || "Readiness level"}
                    </span>
                    <span className="text-2xl font-black text-red-600 dark:text-red-400">{readinessScore}/100</span>
                  </div>
                  <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 transition-all duration-700"
                      style={{ width: `${Math.max(4, readinessScore)}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] text-slate-400 flex-wrap gap-1">
                    <span>{t("analyticsLvlWarmup") || "Warm-up (0-39)"}</span>
                    <span>{t("analyticsLvlAccelerating") || "Accelerating (40-69)"}</span>
                    <span>{t("analyticsLvlApproaching") || "Approaching (70-84)"}</span>
                    <span>{t("analyticsLvlExamReady") || "Exam Ready (85-100)"}</span>
                  </div>
                </div>

                {/* Evaluation Tier Box */}
                <div className="mt-6 rounded-2xl border border-red-200/70 bg-rose-50/70 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📢</span>
                    <b className="text-sm text-red-900 dark:text-red-200">{readinessTier.label}</b>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {readinessTier.desc}
                  </p>
                </div>

                {/* Sub-components of readiness */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
                    <small className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {t("analyticsPathCoverage") || "Path Coverage"}
                    </small>
                    <b className="mt-1 block text-base font-black text-slate-900 dark:text-white">
                      {pathSummary.percentComplete}%
                    </b>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
                    <small className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {t("analyticsSrsMemory") || "SRS Memory"}
                    </small>
                    <b className="mt-1 block text-base font-black text-slate-900 dark:text-white">
                      {memoryRetention.retentionRate != null ? `${memoryRetention.retentionRate}%` : (t("analyticsInsufficientData") || "Insufficient data")}
                    </b>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
                    <small className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {t("analyticsVelocity") || "Study Velocity"}
                    </small>
                    <b className="mt-1 block text-base font-black text-slate-900 dark:text-white">
                      {learningVelocity.dailyXpAverage} {t("analyticsVelocityUnit") || "XP/day"}
                    </b>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
                    <small className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {t("analyticsHabit") || "Study Habit"}
                    </small>
                    <b className="mt-1 block text-base font-black text-slate-900 dark:text-white">
                      {t("analyticsConsecutiveDays", { days: user.currentStreak }) || `${user.currentStreak} days streak`}
                    </b>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("analyticsShortenTip") || "💡 Want to accelerate? Take a placement test to test out of mastered modules."}
                </span>
                <Link
                  href="/app/test"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  {t("analyticsSkipBtn") || "Placement Test / Skip Module →"}
                </Link>
              </div>
            </div>

            {/* Shinkansen & Milestones Journey */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {t("analyticsShinkansenTitle") || "🚅 Shinkansen Journey"}
                  </h2>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {t("analyticsStationUnit", { current: journeyProgress.unlockedStations, total: journeyProgress.totalStations }) ||
                      `Station ${journeyProgress.unlockedStations}/${journeyProgress.totalStations}`}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t("analyticsShinkansenDesc") || "Each XP and completed lesson moves you further across the map of Japan (Tokyo → Osaka)."}
                </p>

                <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                  <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                    {t("analyticsCurrentStation") || "Current Station"}
                  </span>
                  <p className="mt-1 text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    🗾 {journeyProgress.currentStationName}
                  </p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <span>{t("analyticsJourneyProgress") || "Journey Progress"}</span>
                      <span>{journeyProgress.progressPercent}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${journeyProgress.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {t("analyticsAchievements") || "Achievements"}
                      </span>
                      <p className="mt-0.5 text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        🏆 {achievements.unlocked} / {achievements.total}
                      </p>
                    </div>
                    <Link
                      href="/app/achievements"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-sumi-800 dark:text-slate-200"
                    >
                      {t("analyticsBadgeVault") || "Badge Vault →"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/app/journey"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-xs font-extrabold text-white transition hover:bg-emerald-700 active:scale-95 min-h-11"
                >
                  <span>{t("analyticsOpen3dMap") || "Open 3D Journey Map"}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Skill Glance in Overview */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {t("analyticsCore5Skills") || "⚡ 5 Core Skills Competency (Summary)"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("analyticsCore5Desc") || "Track balance across Vocabulary, Grammar, Reading, Listening, and Practical application."}
                </p>
              </div>
              <button
                onClick={() => setActiveTab("SKILLS")}
                className="text-xs font-extrabold text-red-600 hover:text-red-700 dark:text-red-400"
              >
                {t("analyticsViewSkillsMatrix") || "View skills matrix →"}
              </button>
            </div>

            <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {skills.map((s) => (
                <div
                  key={s.key}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-slate-50/50 p-3.5 sm:p-4 transition hover:border-red-200 dark:border-slate-800 dark:bg-slate-800/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="jp-text text-lg font-black text-red-600 dark:text-red-400">{s.glyph}</span>
                      <span className="text-xs font-black text-slate-900 dark:text-white">{s.score}%</span>
                    </div>
                    <h4 className="mt-2 text-xs font-black text-slate-900 dark:text-white truncate">
                      {getLocalizedSkill(s.key)}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {t("analyticsLearnedCount", { learned: s.learnedCount, total: s.totalTarget }) ||
                        `${s.learnedCount} / ${s.totalTarget} learned`}
                    </p>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-red-600 transition-all duration-500"
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ================= 4. TAB CONTENT: 5 SKILLS MATRIX ================= */}
      {activeTab === "SKILLS" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {t("analyticsMatrixTitle") || "🥋 5 Skills Competency Matrix (Vocab · Grammar · Reading · Listening · Practical)"}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {t("analyticsMatrixDesc") || "Detailed breakdown of your strengths and improvement areas with AI Sensei recommendations."}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((s) => {
                const badgeColor =
                  s.levelStatus === "MASTERED"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : s.levelStatus === "GOOD"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                    : s.levelStatus === "DEVELOPING"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300";

                const badgeText = getBadgeText(s.levelStatus);

                return (
                  <div
                    key={s.key}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-sumi-800/70"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-base font-black text-red-600 dark:bg-red-950/40 dark:text-red-400 shrink-0">
                            {s.glyph}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                              {getLocalizedSkill(s.key)}
                            </h3>
                            <small className="text-[10px] text-slate-400 truncate block">{s.jpLabel}</small>
                          </div>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shrink-0 ${badgeColor}`}>
                          {badgeText}
                        </span>
                      </div>

                      {/* Score row */}
                      <div className="mt-4">
                        <div className="flex items-baseline justify-between text-xs font-bold">
                          <span className="text-slate-500 dark:text-slate-400">
                            {t("analyticsCompetencyScore") || "Competency Score:"}
                          </span>
                          <span className="text-lg font-black text-red-600 dark:text-red-400">{s.score}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-600"
                            style={{ width: `${s.score}%` }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span>
                            {t("analyticsLearnedRatio", { learned: s.learnedCount, total: s.totalTarget }) ||
                              `Learned: ${s.learnedCount}/${s.totalTarget}`}
                          </span>
                          <span>
                            {t("analyticsAccuracyLabel", { accuracy: s.accuracyRate != null ? `${s.accuracyRate}%` : "—" }) ||
                              `Accuracy: ${s.accuracyRate != null ? `${s.accuracyRate}%` : "—"}`}
                          </span>
                        </div>
                      </div>

                      {/* AI Assessment Note */}
                      <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                        <b className="block text-[11px] font-extrabold text-slate-900 dark:text-white">
                          {t("analyticsSenseiVerdict") || "💡 Sensei's Assessment:"}
                        </b>
                        <p className="mt-0.5">{s.assessmentNote}</p>
                      </div>

                      <div className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        <b>{t("analyticsRecommendation") || "Recommendation:"}</b> {s.recommendation}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={s.actionHref}
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-red-600 dark:bg-slate-700 dark:hover:bg-red-600 min-h-10"
                      >
                        <span>{s.actionLabel}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. TAB CONTENT: 8 LIFECYCLE STAGES ================= */}
      {activeTab === "LIFECYCLE" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {t("analyticsLifecycleTitle") || "🔄 8-Stage Scientific Learning Cycle (N5 → N4 → N3)"}
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t("analyticsLifecycleDesc") ||
                    "A proven 8-step cycle that helps learners avoid interruptions, retain knowledge longer, and succeed in JLPT."}
                </p>
              </div>
              <Link
                href="/app/test"
                className="rounded-xl border border-red-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-red-600 transition hover:bg-rose-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
              >
                {t("analyticsSkipBtn") || "⚡ Placement Test / Skip Module →"}
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {lifecycleStages.map((st) => {
                const isCompleted = st.status === "COMPLETED";
                const isActive = st.status === "ACTIVE";

                return (
                  <Link
                    key={st.key}
                    href={st.href}
                    className={`flex flex-col justify-between rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                      isActive
                        ? "border-red-500 bg-rose-50/90 shadow-md ring-2 ring-red-500/20 dark:border-red-500 dark:bg-red-950/30"
                        : isCompleted
                        ? "border-emerald-200/80 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                        : "border-slate-200/80 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-sumi-800/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                            isActive
                              ? "bg-red-600 text-white"
                              : isCompleted
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {isCompleted ? "✓" : st.step}
                        </span>
                        <span className="jp-text text-base font-black text-red-600 dark:text-red-400">{st.glyph}</span>
                      </div>

                      <h3 className="mt-3 text-sm font-black text-slate-900 dark:text-white">{st.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{st.subtitle}</p>

                      {st.metricLabel && (
                        <div className="mt-3 rounded-lg bg-black/5 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:bg-white/5 dark:text-slate-300">
                          {st.metricLabel}: <span className="text-red-600 dark:text-red-400">{st.metricValue}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold">
                      <span
                        className={
                          isActive
                            ? "text-red-600 dark:text-red-400"
                            : isCompleted
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400"
                        }
                      >
                        {isActive
                          ? (t("analyticsStageActive") || "In Progress")
                          : isCompleted
                          ? (t("analyticsStageCompleted") || "Completed")
                          : (t("analyticsStagePending") || "Upcoming")}
                      </span>
                      <span>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= 6. TAB CONTENT: MEMORY RETENTION ================= */}
      {activeTab === "MEMORY" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {t("analyticsMemoryTitle") || "🧠 Memory Health & SRS SM-2 Spaced Repetition"}
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t("analyticsMemoryDesc") ||
                    "Based on the Ebbinghaus Forgetting Curve: Timely review transfers knowledge into long-term memory."}
                </p>
              </div>
              <Link
                href="/app/review"
                className="rounded-2xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-red-700 active:scale-95"
              >
                {t("analyticsEnterReview") || "Enter SRS Review Room Now →"}
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-3.5 sm:p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {t("analyticsSrsMastered") || "Mastered"}
                </span>
                <p className="mt-1 text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  {t("analyticsCardsUnit", { count: memoryRetention.masteredCount }) || `${memoryRetention.masteredCount} cards`}
                </p>
                <small className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("analyticsIntervalGt21") || "Review interval > 21 days"}
                </small>
              </div>

              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-3.5 sm:p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                  {t("analyticsSrsReviewing") || "Reviewing"}
                </span>
                <p className="mt-1 text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300">
                  {t("analyticsCardsUnit", { count: memoryRetention.reviewingCount }) || `${memoryRetention.reviewingCount} cards`}
                </p>
                <small className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("analyticsInterval3to21") || "Review interval 3 - 21 days"}
                </small>
              </div>

              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-3.5 sm:p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  {t("analyticsSrsLearning") || "Learning / Need Work"}
                </span>
                <p className="mt-1 text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-300">
                  {t("analyticsCardsUnit", { count: memoryRetention.learningCount }) || `${memoryRetention.learningCount} cards`}
                </p>
                <small className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("analyticsInterval0to1") || "Repeated 0 - 1 times"}
                </small>
              </div>

              <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-3.5 sm:p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                  {t("analyticsSrsDue") || "Due Today"}
                </span>
                <p className="mt-1 text-xl sm:text-2xl font-black text-rose-700 dark:text-rose-300">
                  {t("analyticsCardsUnit", { count: memoryRetention.dueCount }) || `${memoryRetention.dueCount} cards`}
                </p>
                <small className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t("analyticsReviewBeforeForget") || "Review before forgetting"}
                </small>
              </div>
            </div>

            {/* Retention Rate Box */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {t("analyticsRetentionRate") || "Memory Retention Rate:"}{" "}
                    <span className="text-red-600 dark:text-red-400">
                      {memoryRetention.retentionRate != null ? `${memoryRetention.retentionRate}%` : "100%"}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {memoryRetention.retentionTier}
                  </p>
                </div>
                <Link
                  href="/app/vocabulary"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-sumi-800 dark:text-slate-200 self-start sm:self-auto min-h-10 flex items-center justify-center"
                >
                  {t("analyticsExploreMoreVocab") || "Explore New Vocabulary →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. TAB CONTENT: REMEDIATION ================= */}
      {activeTab === "REMEDIATION" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-xl text-white shadow-sm shrink-0">
                🩺
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {t("analyticsRemediationTitle") || "Remediation & Gap Diagnosis Station"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("analyticsRemediationDesc") ||
                    "Automatically detects lessons scored < 75% or frequently forgotten SRS cards for timely review."}
                </p>
              </div>
            </div>

            {remediationItems.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <span className="text-3xl">🎉</span>
                <h3 className="mt-2 text-base font-black text-emerald-900 dark:text-emerald-200">
                  {t("analyticsNoGapsTitle") || "No critical knowledge gaps!"}
                </h3>
                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                  {t("analyticsNoGapsDesc") ||
                    "All completed lessons scored high (≥ 75%) and no SRS cards are severely forgotten. Keep up the great work!"}
                </p>
                <div className="mt-4">
                  <Link
                    href="/app/practice"
                    className="inline-flex rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 min-h-10 items-center justify-center"
                  >
                    {t("analyticsContinueNewLesson") || "Continue to Next Lesson →"}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {remediationItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-white p-4 sm:p-5 shadow-sm dark:border-amber-900/50 dark:bg-sumi-800/70"
                  >
                    <div>
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                          item.urgency === "HIGH"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                        }`}
                      >
                        {item.urgency === "HIGH"
                          ? (t("analyticsUrgent") || "Urgent · Review Now")
                          : (t("analyticsRecommended") || "Recommended Review")}
                      </span>
                      <h3 className="mt-2.5 text-sm font-black text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{item.reason}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={item.href}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white transition hover:bg-amber-700 min-h-10"
                      >
                        {item.actionLabel} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
