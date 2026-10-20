"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { NihonQuestLogo } from "@/components/NihonQuestLogo";
import { JapanBackdrop, JapanScenicPanel, ChoiceArt, NQIcon, type ChoiceArtKind } from "@/components/JapanIllustration";
import { useNativeLanguage, SUPPORTED_LANGUAGES } from "@/components/LanguageContext";
import { getOnboardingI18n } from "@/lib/onboardingLocalization";
import {
  ONBOARDING_QUESTIONS,
  FOCUS_SKILL_OPTIONS,
  LEARNING_STYLE_OPTIONS,
} from "@/lib/personalization";
import "./onboarding.css";

const LANGUAGE_STEP = {
  id: "language",
  label: "Ngôn ngữ mẹ đẻ",
  title: "Ngôn ngữ mẹ đẻ của bạn là gì?",
  subtitle: "Nihon Quest sẽ giải thích từ vựng, ngữ pháp và đàm thoại AI bằng ngôn ngữ này.",
};

const STEPS = [LANGUAGE_STEP, ...ONBOARDING_QUESTIONS];

const LEVEL_OPTIONS = [
  { key: "BEGINNER", value: "N5", label: "Người mới bắt đầu", desc: "Chưa từng học hoặc mới làm quen với tiếng Nhật.", art: "torii" },
  { key: "N5", value: "N5", label: "N5", desc: "Hiểu các câu cơ bản, tự giới thiệu, hội thoại hằng ngày đơn giản.", art: "sprout" },
  { key: "N4", value: "N4", label: "N4", desc: "Hiểu tình huống quen thuộc, giao tiếp cơ bản trong cuộc sống, công việc.", art: "fuji" },
  { key: "N3", value: "N3", label: "N3", desc: "Có thể hiểu nội dung phổ biến, giao tiếp tự tin hơn trong nhiều tình huống.", art: "sakura" },
];

const GOAL_OPTIONS = [
  { value: "TRAVEL", label: "Du lịch Nhật Bản", desc: "Giao tiếp tại sân bay, khách sạn, nhà hàng và mua sắm.", art: "旅" },
  { value: "JLPT", label: "Thi JLPT", desc: "Học có hệ thống, bám sát cấp độ và dạng bài thi.", art: "試" },
  { value: "CONVERSATION", label: "Giao tiếp hằng ngày", desc: "Tăng phản xạ nghe nói và dùng tiếng Nhật tự nhiên hơn.", art: "話" },
  { value: "CULTURE", label: "Văn hóa & Anime", desc: "Hiểu tiếng Nhật qua phim, manga, âm nhạc và văn hóa.", art: "祭" },
];

const TIME_OPTIONS = [
  { value: 10, label: "10 phút", desc: "Nhẹ nhàng, dễ duy trì mỗi ngày.", art: "一" },
  { value: 15, label: "15 phút", desc: "Nhịp học cân bằng, phù hợp phần lớn người học.", art: "十五" },
  { value: 30, label: "30 phút", desc: "Tiến bộ nhanh hơn với luyện tập đều.", art: "三十" },
  { value: 60, label: "60 phút", desc: "Cường độ cao cho mục tiêu rõ ràng.", art: "一時" },
];

const SVG_ART = ["torii", "sprout", "fuji", "sakura"];

type StepId = (typeof STEPS)[number]["id"];

export default function OnboardingPage() {
  const router = useRouter();
  const { nativeLanguage, setNativeLanguage } = useNativeLanguage();
  const t = getOnboardingI18n(nativeLanguage);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [levelChoice, setLevelChoice] = useState("BEGINNER");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const [selections, setSelections] = useState({
    learningLevel: "N5",
    levelChoice: "BEGINNER",
    learningGoal: "TRAVEL",
    dailyGoalMinutes: 15,
    focusSkill: "BALANCED",
    learningStyle: "STRUCTURED",
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = async () => {
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selections,
          nativeLanguage,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tokyo",
          onboardingCompleted: true,
        }),
      });
      if (res.ok) {
        router.push("/app/path");
        router.refresh();
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const optionsFor = (index: number): readonly any[] =>
    index === 0
      ? SUPPORTED_LANGUAGES
      : index === 1
        ? LEVEL_OPTIONS
        : index === 2
          ? GOAL_OPTIONS
          : index === 3
            ? TIME_OPTIONS
            : index === 4
              ? FOCUS_SKILL_OPTIONS
              : LEARNING_STYLE_OPTIONS;

  const isSelectedFor = (index: number, option: any): boolean => {
    const stepId = STEPS[index].id as StepId;
    if (stepId === "language") return nativeLanguage === option.code;
    if (stepId === "level") return levelChoice === option.key;
    if (stepId === "goal") return selections.learningGoal === option.value;
    if (stepId === "time") return selections.dailyGoalMinutes === option.value;
    if (stepId === "focusSkill") return selections.focusSkill === option.value;
    return selections.learningStyle === option.value;
  };

  const select = (option: any) => {
    const stepId = currentStep.id as StepId;
    if (stepId === "language") {
      setNativeLanguage(option.code);
    } else if (stepId === "level") {
      setLevelChoice(option.key);
      setSelections((s) => ({ ...s, levelChoice: option.key, learningLevel: option.value }));
    } else if (stepId === "goal") {
      setSelections((s) => ({ ...s, learningGoal: option.value }));
    } else if (stepId === "time") {
      setSelections((s) => ({ ...s, dailyGoalMinutes: option.value }));
    } else if (stepId === "focusSkill") {
      setSelections((s) => ({ ...s, focusSkill: option.value }));
    } else {
      setSelections((s) => ({ ...s, learningStyle: option.value }));
    }
  };

  const choices = optionsFor(step);

  const currentStepTitle = t.questions[currentStep.id]?.title || currentStep.title;
  const currentStepSubtitle = t.questions[currentStep.id]?.subtitle || currentStep.subtitle;

  const getOptionLabel = (option: any) => {
    const stepId = currentStep.id as StepId;
    if (stepId === "language") return option.nativeName;
    if (stepId === "level") return t.options.level[option.key]?.label || option.label;
    if (stepId === "goal") return t.options.goal[option.value]?.label || option.label;
    if (stepId === "time") return t.options.time[option.value]?.label || option.label;
    if (stepId === "focusSkill") return t.options.focusSkill[option.value]?.label || option.label;
    return t.options.learningStyle[option.value]?.label || option.label;
  };

  const getOptionDesc = (option: any) => {
    const stepId = currentStep.id as StepId;
    if (stepId === "language") return option.name;
    if (stepId === "level") return t.options.level[option.key]?.desc || option.desc;
    if (stepId === "goal") return t.options.goal[option.value]?.desc || option.desc;
    if (stepId === "time") return t.options.time[option.value]?.desc || option.desc;
    if (stepId === "focusSkill") return t.options.focusSkill[option.value]?.desc || option.desc;
    return t.options.learningStyle[option.value]?.desc || option.desc;
  };

  const currentLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === nativeLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="ob-page">
      <JapanBackdrop />

      <div className="ob-scene" aria-hidden="true">
        <JapanScenicPanel variant="fuji" showLabel={false} />
      </div>

      <div className="ob-shell">
        {/* ───────── Thanh đầu trang ───────── */}
        <header className="ob-top">
          <Link href="/" className="ob-top-logo" aria-label="Nihon Quest">
            <NihonQuestLogo size="sm" />
          </Link>
          <nav className="ob-top-nav" aria-label="Navigation" suppressHydrationWarning>
            <span suppressHydrationWarning>{t.navExperience}</span>
            <span suppressHydrationWarning>{t.navJourney}</span>
            <span suppressHydrationWarning>{t.navStudySpace}</span>
          </nav>
          <div className="ob-top-actions">
            {/* Native Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-white/90 px-3 py-1.5 text-xs font-black text-rose-700 shadow-sm backdrop-blur transition hover:border-rose-300 dark:border-slate-700 dark:bg-sumi-900/90 dark:text-rose-300"
                aria-label="Change native language"
              >
                <span>{currentLangInfo.flag}</span>
                <span className="hidden sm:inline">{currentLangInfo.nativeName}</span>
                <span className="text-[10px] opacity-60">▾</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-10 z-50 w-48 max-h-72 overflow-y-auto rounded-2xl border border-rose-100 bg-white/95 p-1.5 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-sumi-950">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setNativeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold transition text-left ${
                        nativeLanguage === lang.code
                          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-sumi-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      {nativeLanguage === lang.code && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/login" className="ob-top-login">{t.navLogin}</Link>
            <Link href="/register" className="ob-top-cta">
              <span>{t.navStart}</span>
              <i><NQIcon name="arrowUR" /></i>
            </Link>
          </div>
        </header>

        {/* ───────── Tiến trình ───────── */}
        <ol className="ob-stepper" aria-label="Progress">
          {STEPS.map((item, index) => {
            const stepLabel = t.stepLabels[item.id as keyof typeof t.stepLabels] || item.label;
            return (
              <li
                key={item.id}
                className={`ob-step ${step === index ? "is-active" : ""} ${index < step ? "is-done" : ""}`}
                aria-current={step === index ? "step" : undefined}
              >
                <span className="ob-step-dot">{index < step ? "✓" : index + 1}</span>
                <b>{stepLabel}</b>
              </li>
            );
          })}
        </ol>

        {/* ───────── Giới thiệu ───────── */}
        <section className="ob-hero">
          <div className="ob-hero-copy">
            <span className="ob-eyebrow">NIHON QUEST</span>
            <h1>
              {t.heroTitle}
              <em> {t.heroTitleSub}</em>
            </h1>
            <p>{t.heroDesc}</p>
          </div>

          <aside className="ob-callout" aria-hidden="true">
            <span className="jp-text">旅</span>
            <p>{t.calloutText}</p>
            <i />
          </aside>
        </section>

        {/* ───────── Thẻ câu hỏi ───────── */}
        <section className="ob-card" aria-labelledby="ob-question">
          <div className="ob-card-head">
            <small>
              <b>0{step + 1}</b> / 0{STEPS.length}
            </small>
            <h2 id="ob-question">{currentStepTitle}</h2>
            <p>{currentStepSubtitle}</p>
          </div>

          {currentStep.id === "language" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 w-full py-2" role="radiogroup" aria-label={currentStepTitle}>
              {SUPPORTED_LANGUAGES.map((lang) => {
                const selected = nativeLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 text-left transition-all ${
                      selected
                        ? "border-rose-500 bg-rose-50/90 dark:bg-rose-950/40 shadow-md shadow-rose-500/20 scale-[1.02]"
                        : "border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-sumi-900/80 hover:border-rose-300 dark:hover:border-rose-800"
                    }`}
                    onClick={() => select(lang)}
                  >
                    <span className="text-2xl leading-none shrink-0">{lang.flag}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                        {lang.nativeName}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                        {lang.name}
                      </p>
                    </div>
                    <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${selected ? "bg-rose-500 text-white" : "border border-slate-300 dark:border-slate-700"}`}>
                      {selected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div key={step} className="ob-choices" role="radiogroup" aria-label={currentStepTitle}>
              {choices.map((option: any) => {
                const selected = isSelectedFor(step, option);
                const label = getOptionLabel(option);
                const desc = getOptionDesc(option);
                return (
                  <button
                    key={currentStep.id === "level" ? option.key : option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`ob-choice ${selected ? "is-selected" : ""}`}
                    onClick={() => select(option)}
                  >
                    <span className="ob-choice-check" aria-hidden="true">{selected ? "✓" : ""}</span>
                    <span className="ob-choice-art">
                      {SVG_ART.includes(option.art) ? (
                        <ChoiceArt kind={option.art as ChoiceArtKind} />
                      ) : (
                        <span className="jp-text">{option.art}</span>
                      )}
                    </span>
                    <b>{label}</b>
                    <small>{desc}</small>
                  </button>
                );
              })}
            </div>
          )}

          <div className="ob-actions">
            <button className="ob-back" type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              <NQIcon name="back" /> {t.btnBack}
            </button>
            <div className="ob-dots" aria-hidden="true">
              {STEPS.map((_, i) => (
                <span key={i} className={i === step ? "is-active" : ""} />
              ))}
            </div>
            <button className="ob-next" type="button" onClick={handleNext} disabled={loading}>
              {loading ? t.btnLoading : isLast ? t.btnFinish : t.btnNext} <NQIcon name="arrow" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
