"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { useNativeLanguage } from "@/components/LanguageContext";
import { getLocalizedTutorialSlides } from "@/lib/yokai-dash/yokaiLocalization";

interface YokaiTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPlaying?: () => void;
}

export function YokaiTutorialModal({ isOpen, onClose, onStartPlaying }: YokaiTutorialModalProps) {
  const [step, setStep] = useState<number>(0);
  const { nativeLanguage } = useNativeLanguage();

  if (!isOpen) return null;

  const slides = getLocalizedTutorialSlides(nativeLanguage);
  const current = slides[step] || slides[0];

  const isEn = nativeLanguage === "en";
  const isZh = nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW";
  const isKo = nativeLanguage === "ko";

  const closeAria = isEn ? "Close tutorial" : isZh ? "关闭说明" : isKo ? "가이드 닫기" : "Đóng hướng dẫn";
  const prevLabel = isEn ? "← Back" : isZh ? "← 上一步" : isKo ? "← 이전" : "← Trước";
  const nextLabel = isEn ? "Next →" : isZh ? "下一步 →" : isKo ? "다음 →" : "Tiếp Theo →";
  const startLabel = isEn
    ? "🚀 Got It, Start Playing!"
    : isZh
    ? "🚀 明白，开始奔跑！"
    : isKo
    ? "🚀 준비 완료, 시작하기!"
    : "🚀 Đã Hiểu, Bắt Đầu Chơi!";

  return (
    <div className="fixed inset-0 z-50 yk-ui flex items-center justify-center p-4 bg-[#050310]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="yk-frame relative w-full max-w-lg max-h-[92dvh] overflow-y-auto bg-[linear-gradient(145deg,#12102a,#0a0818_58%,#2a0f24)] border border-amber-300/40 rounded-[1.75rem] shadow-[0_30px_100px_-25px_rgba(0,0,0,0.9)] ring-1 ring-white/10 text-white flex flex-col">
        <span className="yk-corner-bl" />
        <span className="yk-corner-br" />
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[linear-gradient(110deg,rgba(136,19,55,0.35),rgba(15,23,42,0.95),rgba(120,53,15,0.28))] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              {current.badge}
            </div>
            <h3 className="yk-display text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              <span>{current.icon}</span>
              <span>{current.title}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label={closeAria}
            className="text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{current.desc}</p>

          <div className="space-y-2">
            {current.controls.map((ctrl, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.045] border border-white/10 text-xs shadow-inner"
              >
                <span className="font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-lg border border-amber-500/30">
                  {ctrl.key}
                </span>
                <span className="text-slate-200 text-right">{ctrl.action}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
            <span>💡</span>
            <span>{current.tip}</span>
          </div>

          {/* Stepper Dots */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Step ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === step ? "w-8 bg-amber-400" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-slate-950/60 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="text-xs font-bold"
          >
            {prevLabel}
          </Button>

          {step < slides.length - 1 ? (
            <Button
              variant="torii"
              size="sm"
              onClick={() => setStep((s) => Math.min(slides.length - 1, s + 1))}
              className="text-xs font-bold"
            >
              {nextLabel}
            </Button>
          ) : (
            <Button
              variant="torii"
              size="sm"
              onClick={() => {
                onClose();
                if (onStartPlaying) onStartPlaying();
              }}
              className="text-xs font-black shadow-lg shadow-rose-600/30"
            >
              {startLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
