"use client";

import { useEffect, useState } from "react";
import { useNativeLanguage } from "@/components/LanguageContext";

const LOCALIZED_LABELS: Record<string, Record<string, string>> = {
  "kho từ vựng": {
    vi: "kho từ vựng",
    en: "vocabulary library",
    ja: "単語ライブラリ",
    "zh-CN": "词汇宝库",
    "zh-TW": "詞彙寶庫",
    ko: "어휘 보관소",
    es: "biblioteca de vocabulario",
    fr: "bibliothèque de vocabulaire",
  },
  "kho ngữ pháp": {
    vi: "kho ngữ pháp",
    en: "grammar library",
    ja: "文法ライブラリ",
    "zh-CN": "语法宝库",
    "zh-TW": "語法寶庫",
    ko: "문법 보관소",
    es: "biblioteca de gramática",
    fr: "bibliothèque de grammaire",
  },
  "nội dung ôn tập SRS": {
    vi: "nội dung ôn tập SRS",
    en: "SRS review items",
    ja: "SRS復習カード",
    "zh-CN": "SRS复习内容",
    "zh-TW": "SRS複習內容",
    ko: "SRS 복습 항목",
    es: "tarjetas de repaso SRS",
    fr: "cartes de révision SRS",
  },
  "phòng hội thoại AI Sensei": {
    vi: "phòng hội thoại AI Sensei",
    en: "AI Sensei dojo",
    ja: "AI先生の道場",
    "zh-CN": "AI Sensei 交流道场",
    "zh-TW": "AI Sensei 交流道場",
    ko: "AI 센세 도장",
    es: "sala de conversación AI Sensei",
    fr: "dojo de conversation AI Sensei",
  },
  "nội dung": {
    vi: "nội dung",
    en: "content",
    ja: "コンテンツ",
    "zh-CN": "内容",
    "zh-TW": "內容",
    ko: "콘텐츠",
    es: "contenido",
    fr: "contenu",
  },
};

const MOTIVATIONAL_QUOTES: Record<string, Array<{ jp: string; text: string }>> = {
  vi: [
    { jp: "継続は力なり", text: "Kiên trì là sức mạnh. Từng bước nhỏ mỗi ngày sẽ tạo nên thành tựu lớn." },
    { jp: "一歩一歩", text: "Từng bước một vững vàng, bạn đang tiến gần hơn tới ước mơ tiếng Nhật." },
    { jp: "千里の道も一歩から", text: "Hành trình ngàn dặm bắt đầu từ một bước chân. Cố lên bạn nhé!" },
    { jp: "日進月歩", text: "Mỗi ngày một chút tiến bộ, kiến thức của bạn đang ngày càng vững chắc." },
  ],
  en: [
    { jp: "継続は力なり", text: "Continuity is power. Small daily efforts compound into great success." },
    { jp: "一歩一歩", text: "Step by step, you are getting closer to Japanese fluency." },
    { jp: "千里の道も一歩から", text: "A journey of a thousand miles begins with a single step." },
    { jp: "日進月歩", text: "Steady progress day by day leads to rapid mastery." },
  ],
  "zh-CN": [
    { jp: "継続は力なり", text: "坚持就是力量。每日微小的积累，终将成就日语梦想。" },
    { jp: "一歩一歩", text: "一步一个脚印，你离掌握日语更近了一步。" },
    { jp: "千里の道も一歩から", text: "千里之行，始于足下。加油！" },
    { jp: "日進月歩", text: "日新月异，每一天的努力都让你更加从容。" },
  ],
  "zh-TW": [
    { jp: "継続は力なり", text: "持之以恆，即是力量。每日點滴累積，終將成就日語夢想。" },
    { jp: "一歩一歩", text: "一步一個腳印，你離掌握日語更近了一步。" },
    { jp: "千里の道も一歩から", text: "千里之行，始於足下。加油！" },
    { jp: "日進月歩", text: "日新月異，每一天的努力都讓你更加從容。" },
  ],
  ko: [
    { jp: "継続は力なり", text: "계속하는 것이 힘이다. 매일의 작은 노력이 큰 결실을 맺습니다." },
    { jp: "一歩一歩", text: "한 걸음 한 걸음, 일본어 정복에 점점 더 가까워지고 있습니다." },
    { jp: "千里の道も一歩から", text: "천릿길도 한 걸음부터. 오늘도 힘내세요!" },
    { jp: "日進月歩", text: "날마다 새로워지고 진보하는 당신을 응원합니다." },
  ],
  ja: [
    { jp: "継続は力なり", text: "毎日の積み重ねが大きな力になります。" },
    { jp: "一歩一歩", text: "一歩ずつ、着実に夢へ近づいています。" },
    { jp: "千里の道も一歩から", text: "焦らず自分のペースで進みましょう。" },
    { jp: "日進月歩", text: "日々の努力が確かな実力へと結びつきます。" },
  ],
  es: [
    { jp: "継続は力なり", text: "La constancia es poder. El esfuerzo diario se traduce en un gran éxito." },
    { jp: "一歩一歩", text: "Paso a paso, estás más cerca de dominar el japonés." },
    { jp: "千里の道も一歩から", text: "Un viaje de mil millas comienza con un solo paso." },
  ],
  fr: [
    { jp: "継続は力なり", text: "La continuité est une force. Les petits efforts mènent au succès." },
    { jp: "一歩一歩", text: "Pas à pas, vous vous rapprochez de la maîtrise du japonais." },
    { jp: "千里の道も一歩から", text: "Un voyage de mille lieues commence par un premier pas." },
  ],
};

function getLoadingText(lang: string, localizedLabel: string): string {
  switch (lang) {
    case "en":
      return `Loading ${localizedLabel}...`;
    case "zh-CN":
      return `正在加载 ${localizedLabel}...`;
    case "zh-TW":
      return `正在加載 ${localizedLabel}...`;
    case "ko":
      return `${localizedLabel} 로딩 중...`;
    case "ja":
      return `${localizedLabel} を読み込み中...`;
    case "es":
      return `Cargando ${localizedLabel}...`;
    case "fr":
      return `Chargement de ${localizedLabel}...`;
    default:
      return `Đang tải ${localizedLabel}...`;
  }
}

/**
 * In-module loading placeholder with full multi-language synchronization.
 */
export function ModuleLoading({ label = "nội dung" }: { label?: string }) {
  const { nativeLanguage } = useNativeLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lang = mounted ? nativeLanguage || "vi" : "vi";
  const localizedLabel =
    LOCALIZED_LABELS[label]?.[lang] ||
    LOCALIZED_LABELS[label]?.en ||
    label;

  const quotes = MOTIVATIONAL_QUOTES[lang] || MOTIVATIONAL_QUOTES.vi;
  // Deterministic quote based on label length
  const quoteIdx = label.length % quotes.length;
  const quote = quotes[quoteIdx];
  const loadingText = getLoadingText(lang, localizedLabel);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={loadingText}
      className="mx-auto flex min-h-[55vh] w-full max-w-[1320px] flex-col items-center justify-center gap-6 px-4 py-12 animate-fadeIn"
    >
      <div className="relative">
        {/* Glow backdrop */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500/20 via-pink-400/20 to-amber-400/20 blur-xl animate-pulse" />

        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-2 border-sakura-400/60 bg-white/95 shadow-xl shadow-sakura-500/20 backdrop-blur transition-all duration-300 hover:scale-105 dark:border-sakura-500/50 dark:bg-sumi-900/95 sm:h-28 sm:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.ico"
            alt="Nihon Quest"
            width={112}
            height={112}
            className="h-full w-full object-contain p-2"
            draggable={false}
          />
        </div>
        <div
          className="absolute -inset-3 rounded-[36px] border-2 border-sakura-400/60 motion-safe:animate-spin dark:border-sakura-500/60"
          style={{ animationDuration: "4s" }}
          aria-hidden="true"
        />
        <div
          className="absolute -inset-5 rounded-[44px] border border-amber-400/40 motion-safe:animate-spin dark:border-amber-500/40"
          style={{ animationDuration: "7s", animationDirection: "reverse" }}
          aria-hidden="true"
        />
      </div>

      <div className="space-y-1.5 text-center">
        <h2 className="bg-gradient-to-r from-sakura-600 via-rose-600 to-amber-500 bg-clip-text text-2xl font-black tracking-tight text-transparent">
          Nihon Quest
        </h2>
        <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          🇯🇵 {loadingText}
        </p>
      </div>

      {/* Sleek loading shimmer progress bar */}
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-100 dark:bg-sumi-800">
        <div className="h-full w-full origin-left bg-gradient-to-r from-red-500 via-sakura-500 to-amber-400 motion-safe:animate-indeterminate" />
      </div>

      {/* Localized proverb */}
      <div className="max-w-md rounded-2xl border border-sakura-200/80 bg-white/90 px-5 py-3.5 text-center shadow-xs backdrop-blur dark:border-sakura-900/60 dark:bg-sumi-900/90">
        <p className="jp-text text-xs font-black text-sakura-600 dark:text-sakura-400">
          🌸 「{quote.jp}」
        </p>
        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
          {quote.text}
        </p>
      </div>

      <div className="flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-sakura-500 motion-safe:animate-bounce"
            style={{ animationDelay: `${i * 180}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ModuleLoadingBoundary({ label, children }: { label: string; children: React.ReactNode }) {
  return <>{children}</>;
}
