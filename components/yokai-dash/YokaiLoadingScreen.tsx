"use client";

import React, { useEffect, useRef, useState } from "react";
import { SpiritBeast } from "@/lib/yokai-dash/types";

interface YokaiLoadingScreenProps {
  beast?: SpiritBeast;
  /** true khi dữ liệu câu hỏi đã tải xong -> thanh chạy nốt tới 100% */
  ready?: boolean;
  title?: string;
  subtitle?: string;
}

const TIPS = [
  "Giữ mắt nhìn xa để thấy cổng Torii sớm nhất.",
  "Né sát vật cản đúng nhịp để nhận +100 điểm NÉ CHUẨN.",
  "Combo càng cao, Oni phía sau càng bị đẩy lùi.",
  "Cuối lượt chạy bạn sẽ xem lại giải thích từng câu hỏi.",
  "Bạn có thể chọn chế độ câu hỏi (Từ vựng, Câu, Ngữ pháp) tại Sảnh.",
  "Tốc độ di chuyển có thể đặt chế độ Dễ, Vừa sức hoặc Tự chọn.",
];

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
    const id = window.setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-[#0a0720] text-white yk-ui"
      role="status"
      aria-live="polite"
      aria-label="Đang tải màn chơi"
    >
      {/* Ảnh nền loading (public/yokai-dash/loading-bg.png) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/yokai-dash/loading-bg.png')" }}
      />
      {/* Làm tối đáy & hai bên để chữ luôn đọc được */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,4,20,.88)_0%,rgba(6,4,20,.25)_38%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_55%,rgba(5,3,18,.55)_100%)]" />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-14">
        <div className="text-center max-w-md min-h-[2.5rem] drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">
          {title ? (
            <h2 className="yk-display text-lg sm:text-xl font-black text-amber-300 tracking-wide mb-1">
              {title}
            </h2>
          ) : null}
          <p className="text-[13px] sm:text-sm text-amber-100/90 leading-relaxed">
            {subtitle ? (
              subtitle
            ) : beast ? (
              <>
                Cùng linh thú <b className="text-amber-300">{beast.name}</b> xuất trận. {TIPS[tipIdx]}
              </>
            ) : (
              TIPS[tipIdx]
            )}
          </p>
        </div>

        {/* Thanh tiến trình viền vàng */}
        <div className="mt-4 flex items-center gap-4 w-full max-w-xl">
          <div className="relative flex-1 h-5 rounded-full p-[3px] bg-[#120c2c]/90 border border-amber-300/70 shadow-[0_0_24px_-4px_rgba(245,185,66,.55),inset_0_2px_6px_rgba(0,0,0,.8)]">
            <div
              className="yk-load-fill h-full rounded-full transition-[width] duration-200 ease-out shadow-[0_0_14px_rgba(252,211,77,.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-amber-100 tabular-nums shrink-0 w-24">
            <span aria-hidden>🌸</span>
            <span>{progress >= 100 ? "Sẵn sàng" : `Đang tải ${Math.floor(progress)}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}