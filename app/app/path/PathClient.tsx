"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BASE64_IMAGES } from "@/lib/assets/base64Images";
import { AppNav } from "@/components/AppNav";
import { JapanBackdrop } from "@/components/JapanIllustration";
import { PathDecor, PathIcon, type DecorTheme, type PathIconName } from "@/components/Pathdecor";
import { LocalizedText } from "@/components/LocalizedText";
import { LocalizedLessonTitle, LocalizedLessonDesc } from "@/components/LocalizedLesson";
import { useNativeLanguage, type NativeLanguage } from "@/components/LanguageContext";
import {
  getLocalizedPathName,
  getLocalizedPathTagline,
  getLocalizedRoadmapLabel,
  getLocalizedKindLabel,
  getLocalizedSkillName,
  getLocalizedDailyMinutes,
  getLocalizedRationale,
  getLocalizedWhy,
  getLocalizedLessonTitle,
} from "@/lib/lessonLocalization";
import {
  LEVEL_LABELS,
  GOAL_LABELS,
  SKILL_LABELS,
  STYLE_LABELS,
  type LearningPath,
  type PathModule,
  type PersonalizationAnswers,
  type RemediationItem,
} from "@/lib/personalization";

type ModuleStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "AVAILABLE" | "LOCKED";

export interface EnrichedModule extends PathModule {
  status: ModuleStatus;
  score: number | null;
  exerciseCount: number | null;
  prerequisiteTitle?: string;
  prerequisiteSlug?: string;
}

const KIND_THEME: Record<PathModule["kind"], DecorTheme> = {
  KANA: "sakura",
  LESSON: "lantern",
  VOCAB: "lantern",
  GRAMMAR: "wave",
  REVIEW: "wave",
  SURVIVAL: "train",
  JOURNEY: "torii",
  SENSEI: "sakura",
  MOCK: "torii",
};

const KIND_GLYPH: Record<PathModule["kind"], string> = {
  KANA: "あ",
  LESSON: "学",
  VOCAB: "語",
  GRAMMAR: "文",
  REVIEW: "復",
  SURVIVAL: "旅",
  JOURNEY: "道",
  SENSEI: "師",
  MOCK: "試",
};

function pickTheme(m: PathModule): DecorTheme {
  const t = m.title.toLowerCase();
  if (/biến âm|dakuten|handakuten/.test(t)) return "sakura";
  if (/yoon|âm ghép|âm ngắt/.test(t)) return "lantern";
  if (/tàu|ga |konbini|nghe hiểu|sân bay|taxi/.test(t)) return "train";
  if (/lượng từ|đếm|đền|chùa/.test(t)) return "torii";
  return KIND_THEME[m.kind];
}

function splitTitle(name: string): [string, string] {
  const m = name.match(/^(.*?[–—-])\s+(.+)$/);
  if (m) return [m[1], m[2]];
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return [name, ""];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

interface PathClientProps {
  displayName: string;
  answers: PersonalizationAnswers;
  path: LearningPath;
  modules: EnrichedModule[];
  remediationItems: RemediationItem[];
  currentIdx: number;
}

function getLocalizedUnlockCondition(prereqTitle: string, lang: NativeLanguage): { label: string; text: string } {
  switch (lang) {
    case "vi":
      return {
        label: "Điều kiện mở khóa: ",
        text: `Hoàn thành bài tiên quyết ${prereqTitle ? `「${prereqTitle}」` : "trước đó"} với điểm ≥ 60%.`,
      };
    case "zh-CN":
      return {
        label: "解锁条件：",
        text: `完成前置课程「${prereqTitle}」，且得分 ≥ 60%。`,
      };
    case "zh-TW":
      return {
        label: "解鎖條件：",
        text: `完成前置課程「${prereqTitle}」，且得分 ≥ 60%。`,
      };
    case "ko":
      return {
        label: "잠금 해제 조건: ",
        text: `선수 학습「${prereqTitle}」을(를) 60% 이상 완료해야 합니다.`,
      };
    case "es":
      return {
        label: "Condición de desbloqueo: ",
        text: `Completa la lección previa "${prereqTitle}" con una puntuación ≥ 60%.`,
      };
    case "fr":
      return {
        label: "Condition de déblocage : ",
        text: `Terminez la leçon prérequise « ${prereqTitle} » avec un score ≥ 60 %.`,
      };
    case "de":
      return {
        label: "Freischaltbedingung: ",
        text: `Schließen Sie die vorherige Lektion „${prereqTitle}“ mit mind. 60 % ab.`,
      };
    case "id":
      return {
        label: "Syarat membuka: ",
        text: `Selesaikan materi prasyarat "${prereqTitle}" dengan skor ≥ 60%.`,
      };
    case "th":
      return {
        label: "เงื่อนไขปลดล็อก: ",
        text: `เรียนบทเรียนก่อนหน้า "${prereqTitle}" ให้ได้คะแนน ≥ 60%`,
      };
    case "ru":
      return {
        label: "Условие открытия: ",
        text: `Пройдите предшествующий урок «${prereqTitle}» с результатом ≥ 60%.`,
      };
    case "pt":
      return {
        label: "Condição de desbloqueio: ",
        text: `Conclua a lição pré-requisito "${prereqTitle}" com pontuação ≥ 60%.`,
      };
    default:
      return {
        label: "Unlock requirement: ",
        text: `Complete prerequisite '${prereqTitle}' with score ≥ 60%.`,
      };
  }
}

function getLocalizedActionText(status: ModuleStatus, isCurrent: boolean, lang: NativeLanguage): string {
  if (status === "COMPLETED") {
    switch (lang) {
      case "vi": return "Ôn tập lại";
      case "zh-CN": return "重新复习";
      case "zh-TW": return "重新複習";
      case "ko": return "다시 복습";
      case "es": return "Repasar de nuevo";
      case "fr": return "Réviser à nouveau";
      case "de": return "Erneut wiederholen";
      case "id": return "Review ulang";
      case "th": return "ทบทวนอีกครั้ง";
      case "ru": return "Повторить снова";
      case "pt": return "Revisar novamente";
      default: return "Review again";
    }
  }
  if (isCurrent) {
    switch (lang) {
      case "vi": return "Tiếp tục ngay";
      case "zh-CN": return "继续学习";
      case "zh-TW": return "繼續學習";
      case "ko": return "지금 계속하기";
      case "es": return "Continuar ahora";
      case "fr": return "Continuer";
      case "de": return "Jetzt fortsetzen";
      case "id": return "Lanjutkan sekarang";
      case "th": return "เรียนต่อทันที";
      case "ru": return "Продолжить сейчас";
      case "pt": return "Continuar agora";
      default: return "Continue now";
    }
  }
  switch (lang) {
    case "vi": return "Mở mô-đun";
    case "zh-CN": return "开始模块";
    case "zh-TW": return "開始模組";
    case "ko": return "모듈 시작";
    case "es": return "Abrir módulo";
    case "fr": return "Ouvrir le module";
    case "de": return "Modul starten";
    case "id": return "Buka modul";
    case "th": return "เริ่มโมดูล";
    case "ru": return "Открыть модуль";
    case "pt": return "Abrir módulo";
    default: return "Open module";
  }
}

export function PathClient({
  displayName,
  answers,
  path,
  modules,
  remediationItems,
  currentIdx,
}: PathClientProps) {
  const { nativeLanguage, t } = useNativeLanguage();

  const completed = modules.filter((m) => m.status === "COMPLETED").length;
  const percent = Math.round((completed / Math.max(1, modules.length)) * 100);
  const current = currentIdx >= 0 ? modules[currentIdx] : null;

  const localizedPathName = getLocalizedPathName(answers.goal, answers.learningStyle, nativeLanguage, path.name);
  const [titleHead, titleTail] = splitTitle(localizedPathName);
  const localizedTagline = getLocalizedPathTagline(
    answers.goal,
    answers.learningStyle,
    answers.level,
    answers.focusSkill,
    nativeLanguage,
    path.tagline
  );

  const answerChips: { labelKey: string; defaultLabel: string; value: string; icon: PathIconName }[] = [
    {
      labelKey: "pathLevelLabel",
      defaultLabel: "Trình độ",
      value: getLocalizedRoadmapLabel(answers.level, nativeLanguage, LEVEL_LABELS[answers.level]),
      icon: "level",
    },
    {
      labelKey: "pathGoalLabel",
      defaultLabel: "Mục tiêu",
      value: getLocalizedRoadmapLabel(answers.goal, nativeLanguage, GOAL_LABELS[answers.goal]),
      icon: "goal",
    },
    {
      labelKey: "pathSkillLabel",
      defaultLabel: "Kỹ năng",
      value: getLocalizedRoadmapLabel(answers.focusSkill, nativeLanguage, SKILL_LABELS[answers.focusSkill]),
      icon: "skill",
    },
    {
      labelKey: "pathStyleLabel",
      defaultLabel: "Phong cách",
      value: getLocalizedRoadmapLabel(answers.learningStyle, nativeLanguage, STYLE_LABELS[answers.learningStyle]),
      icon: "style",
    },
    {
      labelKey: "pathTimeLabel",
      defaultLabel: "Thời gian",
      value: getLocalizedDailyMinutes(answers.dailyGoalMinutes, nativeLanguage),
      icon: "clock",
    },
  ];

  const weeksUnit =
    nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
      ? "周"
      : nativeLanguage === "vi"
      ? "tuần"
      : "weeks";

  const minutesUnit =
    nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
      ? "分钟"
      : nativeLanguage === "vi"
      ? "phút"
      : "min";

  const exercisesUnit =
    nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
      ? "道练习"
      : nativeLanguage === "vi"
      ? "bài tập"
      : "exercises";

  const scoreLabel =
    nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
      ? "得分"
      : nativeLanguage === "vi"
      ? "Điểm"
      : "Score";

  return (
    <div className="nqp">
      <JapanBackdrop />
      <div className="nqp-wrap">
        <AppNav userName={displayName} levelLabel={answers.level} />

        {/* ===== HERO ===== */}
        <section className="nqp-hero">
          <div className="nqp-hero-main">
            <div className="nqp-hero-scene" aria-hidden="true">
              <Image
                src={BASE64_IMAGES.fujiHero}
                unoptimized
                alt=""
                fill
                priority
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="nqp-hero-img"
              />
            </div>
            <div className="nqp-vtext" aria-hidden="true">
              <span>日本へ行こう</span>
              <i className="nqp-seal">旅</i>
            </div>

            <div className="nqp-hero-copy">
              <span className="nqp-eyebrow">
                <span className="nqp-eyebrow-ico"><PathIcon name="goal" /></span>
                <LocalizedText k="personalizedPathEyebrow" fallback="LỘ TRÌNH CÁ NHÂN HÓA · ĐỒNG BỘ BỀN VỮNG" />
              </span>
              <h1 className="nqp-title">
                {titleHead}
                {titleTail && <em>{titleTail}</em>}
              </h1>
              <p className="nqp-tagline">{localizedTagline}</p>

              {current && (
                <p className="nqp-next">
                  <small>
                    {current.status === "IN_PROGRESS" ? (
                      <LocalizedText k="inProgressLesson" fallback="Đang học dở" />
                    ) : (
                      <LocalizedText k="nextModule" fallback="Mô-đun tiếp theo" />
                    )}
                  </small>
                  <b>
                    <LocalizedLessonTitle slug={current.slug} fallback={current.title} />
                  </b>
                </p>
              )}

              <div className="nqp-hero-actions">
                {current ? (
                  <Link className="nqp-btn-red" href={current.target}>
                    <span className="nqp-btn-ico"><PathIcon name="flame" /></span>
                    {current.status === "IN_PROGRESS" ? (
                      <LocalizedText k="btnContinue" fallback="Tiếp tục học" />
                    ) : (
                      <LocalizedText k="btnStartLearn" fallback="Bắt đầu học" />
                    )}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <Link className="nqp-btn-red" href="/app/review">
                    <span className="nqp-btn-ico"><PathIcon name="flame" /></span>
                    <LocalizedText k="pathCompletedSrsReview" fallback="Hoàn thành lộ trình — Ôn tập SRS" />
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
                <Link className="nqp-btn-ghost" href="/app/test">
                  <span className="nqp-btn-ico"><PathIcon name="target" /></span>
                  <LocalizedText k="skillsTestBtn" fallback="Kiểm tra 4 kỹ năng / Miễn học phần" />
                </Link>
                <Link className="nqp-btn-ghost" href="/app/analytics">
                  <span className="nqp-btn-ico"><PathIcon name="cap" /></span>
                  <LocalizedText k="evalProgressBtn" fallback="Đánh giá tiến bộ" />
                </Link>
                <Link className="nqp-btn-ghost" href="/app/profile">
                  <span className="nqp-btn-ico"><PathIcon name="refresh" /></span>
                  <LocalizedText k="changePathBtn" fallback="Thay đổi lộ trình" />
                </Link>
              </div>
            </div>
          </div>

          <div className="nqp-summary" aria-label="Lựa chọn cá nhân hóa của bạn">
            {answerChips.map((c) => (
              <div key={c.labelKey} className="nqp-chip">
                <span className="nqp-chip-ico"><PathIcon name={c.icon} /></span>
                <span className="nqp-chip-txt">
                  <small><LocalizedText k={c.labelKey} fallback={c.defaultLabel} /></small>
                  <b>{c.value}</b>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CHU TRÌNH HỌC KHOA HỌC 8 BƯỚC ===== */}
        <section
          aria-label="Chu trình học tiếng Nhật khoa học 8 bước"
          className="mb-6 rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-sumi-900/90"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                🔄 <LocalizedText k="eightStepCycleTitle" fallback="Chu trình học khoa học 8 bước (N5 → N4 → N3)" />
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                <LocalizedText
                  k="eightStepCycleDesc"
                  fallback="Đánh giá đầu vào → Xác định trình độ → Lộ trình cá nhân → Học kiến thức → Luyện tập → Kiểm tra → Ôn tập cách quãng → Đánh giá tiến bộ"
                />
              </p>
            </div>
            <Link
              href="/app/test"
              className="inline-flex items-center gap-1 rounded-xl bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300"
            >
              ⚡ <LocalizedText k="testOutBtn" fallback="Thi vượt cấp / Miễn học phần" /> →
            </Link>
          </div>
        </section>

        {/* ===== TRẠM ÔN TẬP CỦNG CỐ (REMEDIATION) ===== */}
        {remediationItems.length > 0 && (
          <section
            aria-label="Trạm ôn tập củng cố kiến thức yếu"
            className="mb-6 rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-red-50/50 p-5 shadow-sm dark:border-amber-900/50 dark:bg-sumi-900/95"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-black text-amber-700 dark:text-amber-300">
                  ⚠️ Remediation Station
                </span>
                <h2 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
                  <LocalizedText k="remediationTitle" fallback="Trạm Ôn Tập Củng Cố (Remediation)" />
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <LocalizedText
                    k="remediationDesc"
                    fallback="Hệ thống phát hiện một số kiến thức bạn làm sai nhiều hoặc đã đến hạn ôn tập cách quãng."
                  />
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {remediationItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-xs transition hover:border-amber-400 dark:border-slate-800 dark:bg-sumi-950"
                >
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase ${
                          item.urgency === "HIGH"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        }`}
                      >
                        {item.urgency === "HIGH" ? (
                          <LocalizedText k="remediationUrgent" fallback="Cần ôn ngay" />
                        ) : (
                          <LocalizedText k="remediationRecommended" fallback="Khuyến nghị ôn tập" />
                        )}
                      </span>
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      <LocalizedLessonTitle slug={undefined} fallback={item.title} />
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      <LocalizedLessonDesc slug={undefined} fallback={item.reason} />
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-600 dark:bg-slate-800 dark:hover:bg-red-600"
                  >
                    {item.actionLabel || (nativeLanguage === "zh-CN" ? "立即学习" : nativeLanguage === "vi" ? "Khắc phục ngay" : "Review now")} →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== METRICS ===== */}
        <section className="nqp-stats" aria-label="Thống kê lộ trình">
          <div className="nqp-stat">
            <span className="nqp-stat-ico"><PathIcon name="cap" /></span>
            <div>
              <b>{modules.length}</b>
              <small><LocalizedText k="knowledgeModulesUnit" fallback="Mô-đun kiến thức" /></small>
            </div>
          </div>
          <div className="nqp-stat">
            <span className="nqp-stat-ico"><PathIcon name="clock" /></span>
            <div>
              <b>{path.totalMinutes}</b>
              <small><LocalizedText k="totalDurationUnit" fallback="Tổng thời lượng" /></small>
            </div>
          </div>
          <div className="nqp-stat">
            <span className="nqp-stat-ico"><PathIcon name="target" /></span>
            <div>
              <b>{path.modulesPerWeek} / tuần</b>
              <small>
                <LocalizedText k="studyPaceUnit" fallback="Nhịp học" /> ({path.answers.dailyMinutes}{" "}
                <LocalizedText k="minsPerDay" fallback="phút/ngày" />)
              </small>
            </div>
          </div>
          <div className="nqp-stat">
            <span className="nqp-stat-ico"><PathIcon name="target" /></span>
            <div>
              <b>~{path.estWeeks} {weeksUnit}</b>
              <small><LocalizedText k="estCompletionUnit" fallback="Hoàn thành dự kiến" /></small>
            </div>
          </div>
        </section>

        {/* ===== TIMELINE + SIDE ===== */}
        <div className="nqp-grid">
          <div className="nqp-main">
            <div className="nqp-sec-title">
              <h2>
                <span className="nqp-sakura" aria-hidden="true">✿</span>
                <LocalizedText k="yourKnowledgeBlocks" fallback="Khóa kiến thức của bạn" />
              </h2>
              <span>
                <LocalizedText
                  k="prerequisiteRuleNote"
                  fallback="Tuân thủ thứ tự tiên quyết (cần đạt ≥ 60% bài trước để mở khóa bài sau, hoặc thi miễn học phần)."
                />
              </span>
            </div>

            <ol className="nqp-timeline">
              {modules.map((m, i) => {
                const isCurrent = i === currentIdx;
                const isLocked = m.status === "LOCKED";
                const theme = pickTheme(m);
                const localizedWhy = getLocalizedWhy(
                  m.why,
                  answers.goal,
                  answers.learningStyle,
                  answers.focusSkill,
                  nativeLanguage
                );

                return (
                  <li
                    key={m.id}
                    className={[
                      "nqp-module",
                      `k-${m.kind.toLowerCase()}`,
                      m.status === "COMPLETED" ? "is-done" : "",
                      isCurrent ? "is-current" : "",
                      isLocked ? "opacity-80" : "",
                    ].join(" ")}
                  >
                    <span className="nqp-node" aria-hidden="true">
                      {m.status === "COMPLETED" ? "✓" : isLocked ? "🔒" : i + 1}
                    </span>

                    <div className="nqp-module-body">
                      <PathDecor theme={theme} />

                      <div className="nqp-module-content">
                        <div className="nqp-module-top">
                          <span className={`nqp-kind k-${m.kind.toLowerCase()}`}>
                            <i aria-hidden="true">{KIND_GLYPH[m.kind]}</i>
                            {getLocalizedKindLabel(m.kind, nativeLanguage)}
                          </span>
                          <span className="nqp-meta">
                            {m.minutes} {minutesUnit} • +{m.xp} XP
                            {m.exerciseCount != null ? ` • ${m.exerciseCount} ${exercisesUnit}` : ""}
                            {m.score != null ? ` • ${scoreLabel}: ${m.score}%` : ""}
                          </span>
                          {m.status === "COMPLETED" && (
                            <span className="nqp-done">
                              <LocalizedText k="statusCompleted" fallback="Đã hoàn thành" />
                            </span>
                          )}
                          {isCurrent && (
                            <span className="nqp-now">
                              <LocalizedText k="statusInProgress" fallback="Đang học" />
                            </span>
                          )}
                          {isLocked && (
                            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              🔒 <LocalizedText k="moduleLocked" fallback="Chưa mở khóa" />
                            </span>
                          )}
                        </div>

                        <h3><LocalizedLessonTitle slug={m.slug} fallback={m.title} /></h3>
                        <p><LocalizedLessonDesc slug={m.slug} fallback={m.description} /></p>

                        <div className="nqp-module-foot">
                          <span className="nqp-why" title="Lý do mô-đun này nằm trong lộ trình của bạn">
                            <span aria-hidden="true">💡</span> {localizedWhy}
                          </span>
                          <div className="nqp-skills">
                            {m.skills.map((s) => (
                              <span key={s} className="nqp-skill">
                                {getLocalizedSkillName(s, nativeLanguage)}
                              </span>
                            ))}
                          </div>
                        </div>

                        {isLocked ? (() => {
                          const prereqTitle = m.prerequisiteSlug
                            ? getLocalizedLessonTitle(m.prerequisiteSlug, nativeLanguage, m.prerequisiteTitle || "")
                            : (m.prerequisiteTitle || "");
                          const condition = getLocalizedUnlockCondition(prereqTitle, nativeLanguage);
                          return (
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200/80 bg-amber-50/70 px-3.5 py-2.5 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                              <span>
                                🔒 <b>{condition.label}</b>
                                {condition.text}
                              </span>
                              <Link
                                href="/app/test"
                                className="font-extrabold text-red-600 underline hover:text-red-700 dark:text-red-400"
                              >
                                <LocalizedText k="testOutBtn" fallback="Kiểm tra miễn học phần →" />
                              </Link>
                            </div>
                          );
                        })() : (
                          m.target && (
                            <Link className={`nqp-go ${isCurrent ? "is-current" : ""}`} href={m.target}>
                              {getLocalizedActionText(m.status, isCurrent, nativeLanguage)}
                              <span aria-hidden="true">→</span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ===== CỘT PHẢI ===== */}
          <aside className="nqp-side">
            <section className="nqp-card nqp-card-why">
              <div className="nqp-card-head">
                <span className="nqp-card-ico"><PathIcon name="torii" /></span>
                <h3>
                  {nativeLanguage === "zh-CN"
                    ? "为什么此路线适合你？"
                    : nativeLanguage === "zh-TW"
                    ? "為什麼此路線適合你？"
                    : nativeLanguage === "vi"
                    ? "Vì sao lộ trình này phù hợp bạn?"
                    : "Why is this path right for you?"}
                </h3>
              </div>
              <p className="nqp-side-note">
                {nativeLanguage === "zh-CN"
                  ? "个性化引擎分析你注册时的 5 项偏好，量身打造最优学习顺序。"
                  : nativeLanguage === "zh-TW"
                  ? "個性化引擎分析你註冊時的 5 項偏好，量身打造最優學習順序。"
                  : nativeLanguage === "vi"
                  ? "Engine cá nhân hóa phân tích 5 lựa chọn của bạn khi tạo tài khoản và xây dựng trình tự nội dung riêng."
                  : "Personalization engine analyzes your 5 preferences to craft your tailored curriculum."}
              </p>
              <ul className="nqp-rationale">
                {path.rationale.map((r, i) => {
                  const localizedRationale = getLocalizedRationale(
                    i,
                    answers.goal,
                    answers.learningStyle,
                    answers.level,
                    answers.focusSkill,
                    answers.dailyGoalMinutes,
                    path.modulesPerWeek,
                    nativeLanguage,
                    r
                  );
                  return (
                    <li key={i}>
                      <span className="nqp-r-ico" aria-hidden="true">
                        {["レ", "目", "技", "式", "時"][i] ?? "道"}
                      </span>
                      <p>{localizedRationale}</p>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="nqp-card nqp-card-now">
              <h3>
                {nativeLanguage === "zh-CN"
                  ? `正在学习：第 ${currentIdx >= 0 ? currentIdx + 1 : modules.length} / ${modules.length} 个模块`
                  : nativeLanguage === "zh-TW"
                  ? `正在學習：第 ${currentIdx >= 0 ? currentIdx + 1 : modules.length} / ${modules.length} 個模組`
                  : nativeLanguage === "vi"
                  ? `Đang học: mô-đun ${currentIdx >= 0 ? currentIdx + 1 : modules.length} / ${modules.length}`
                  : `Current: module ${currentIdx >= 0 ? currentIdx + 1 : modules.length} / ${modules.length}`}
              </h3>
              {current ? (
                <>
                  <p className="nqp-current-title">
                    <LocalizedLessonTitle slug={current.slug} fallback={current.title} />
                  </p>
                  <div className="nqp-progress-row">
                    <div className="nqp-bar"><span style={{ width: `${percent}%` }} /></div>
                    <small>{percent}% • {completed}/{modules.length}</small>
                  </div>
                  <Link className="nqp-btn-red nqp-btn-block" href={current.target}>
                    {nativeLanguage === "zh-CN"
                      ? "立即学习"
                      : nativeLanguage === "zh-TW"
                      ? "立即學習"
                      : nativeLanguage === "vi"
                      ? "Học ngay"
                      : "Learn now"}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </>
              ) : (
                <p>
                  {nativeLanguage === "zh-CN"
                    ? "你已完成全部路线！🎉 请坚持进行 SRS 间隔复习巩固记忆。"
                    : nativeLanguage === "zh-TW"
                    ? "你已完成全部路線！🎉 請堅持進行 SRS 間隔複習鞏固記憶。"
                    : nativeLanguage === "vi"
                    ? "Bạn đã hoàn thành toàn bộ lộ trình！🎉 Hãy ôn tập SRS để giữ kiến thức lâu dài."
                    : "You have completed your entire path! 🎉 Keep up with SRS reviews to retain your knowledge."}
                </p>
              )}
            </section>

            <section className="nqp-card nqp-card-plain">
              <div className="nqp-card-head">
                <span className="nqp-card-ico is-red"><PathIcon name="style" /></span>
                <h3>
                  {nativeLanguage === "zh-CN"
                    ? "路线体系与核心课程"
                    : nativeLanguage === "zh-TW"
                    ? "路線體系與核心課程"
                    : nativeLanguage === "vi"
                    ? "Lộ trình + Bài học"
                    : "Roadmap + Lessons"}
                </h3>
              </div>
              <p>
                {nativeLanguage === "zh-CN" ? (
                  <>
                    <b>核心课程</b>是按级别划分的系统知识库。<b>个人路线</b>则是为你量身打造的专属学习链——智能穿插课程、词汇、实战生存、AI会话与SRS复习。
                  </>
                ) : nativeLanguage === "zh-TW" ? (
                  <>
                    <b>核心課程</b>是按級別劃分的系統知識庫。<b>個人路線</b>則是為你量身打造的專屬學習鏈——智能穿插課程、詞彙、實戰生存、AI會話與SRS複習。
                  </>
                ) : nativeLanguage === "vi" ? (
                  <>
                    <b>Bài học</b> là kho nội dung chung theo cấp độ. <b>Lộ trình cá nhân</b> là chuỗi mô-đun được chọn và sắp xếp riêng cho bạn — xen kẽ bài học, từ vựng, sinh tồn, hội thoại AI và ôn tập SRS theo đúng mục tiêu của bạn.
                  </>
                ) : (
                  <>
                    <b>Lessons</b> are the general level-based curriculum. <b>Personal path</b> is a tailored sequence crafted just for you — alternating lessons, vocab, survival, AI dialogue, and SRS reviews.
                  </>
                )}
              </p>
              <Link className="nqp-link" href="/app/practice">
                {nativeLanguage === "zh-CN"
                  ? "查看全部核心课程"
                  : nativeLanguage === "zh-TW"
                  ? "查看全部核心課程"
                  : nativeLanguage === "vi"
                  ? "Xem toàn bộ Bài học"
                  : "View all Lessons"}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
