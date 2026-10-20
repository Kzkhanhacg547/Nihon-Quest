"use client";

import React, { useEffect, useRef, useState } from "react";
import { SpiritBeast } from "@/lib/yokai-dash/types";
import { useNativeLanguage } from "@/components/LanguageContext";
import { getLocalizedTips } from "@/lib/yokai-dash/yokaiLocalization";

interface YokaiLoadingScreenProps {
  beast?: SpiritBeast;
  /** true khi dữ liệu câu hỏi đã tải xong -> thanh chạy nốt tới 100% */
  ready?: boolean;
  title?: string;
  subtitle?: string;
}

export function YokaiLoadingScreen({
  beast,
  ready = false,
  title,
  subtitle,
}: YokaiLoadingScreenProps) {
  const [progress, setProgress] = useState(6);
  const [tipIdx, setTipIdx] = useState(0);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  const { nativeLanguage } = useNativeLanguage();
  const tips = getLocalizedTips(nativeLanguage);

  // Tiến độ giả lập: chạy nhanh rồi chậm dần quanh 90%, vọt lên 100% khi ready
  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (readyRef.current) return Math.min(100, p + 9);
        if (p < 60) return p + 4;
        if (p < 90) return p + 1;
        return p;
      });
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 2600);
    return () => window.clearInterval(id);
  }, [tips.length]);

  const isEn = nativeLanguage === "en";
  const isZh = nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW";
  const isKo = nativeLanguage === "ko";
  const ariaLabel = isEn ? "Loading game stage" : isZh ? "正在加载关卡" : isKo ? "스테이지 로딩 중" : "Đang tải màn chơi";

  return (
    <div
      className="fixed inset-0 z-[70] overflow-hidden bg-[#07041a] text-white yk-ui flex flex-col justify-between items-center px-4 py-3 sm:px-8 sm:py-6"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.5rem))",
      }}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {/* 1. Ambient Glow Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/yokai-dash/loading-bg.png')" }}
      />

      {/* 2. Ảnh nền chính */}
      <div
        className="absolute inset-0 bg-contain sm:bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-300"
        style={{ backgroundImage: "url('/yokai-dash/loading-bg.png')" }}
      />

      {/* 3. Lớp gradient phủ nhẹ */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,4,20,.95)_0%,rgba(6,4,20,.35)_30%,transparent_60%,rgba(6,4,20,.7)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_55%,rgba(5,3,18,.6)_100%)] pointer-events-none" />

      {/* TOP: Floating Header Pill */}
      <div className="relative z-10 w-full flex justify-center shrink-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase bg-black/60 text-amber-200 border border-amber-300/40 backdrop-blur-md shadow-lg">
          <span className="text-amber-400">🌸</span>
          <span>Yōkai Dash • 妖怪ダッシュ</span>
        </div>
      </div>

      {/* CENTER: Giữ thông thoáng */}
      <div className="relative z-10 flex-1 w-full" aria-hidden />

      {/* BOTTOM: Compact Info & Progress Bar */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col gap-2.5 shrink-0 px-2">
        {/* Tip / Subtitle */}
        <div className="text-center rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-2 shadow-lg">
          {title ? (
            <h2 className="yk-display text-sm sm:text-base font-black text-amber-300 tracking-wide mb-0.5">
              {title}
            </h2>
          ) : null}
          <p className="text-[12px] sm:text-xs text-amber-100/90 leading-relaxed font-medium">
            {subtitle ? (
              <span>{subtitle}</span>
            ) : (
              <span>💡 {tips[tipIdx]}</span>
            )}
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="relative h-3 w-full rounded-full bg-slate-900/90 border border-amber-300/30 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#fbbf24,#f59e0b_45%,#f43f5e_85%,#e11d48)] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress % Indicator */}
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-bold text-amber-200/80 px-1">
          <span>{beast ? beast.name : "Nihon Quest"}</span>
          <span className="tabular-nums font-black text-amber-300">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
