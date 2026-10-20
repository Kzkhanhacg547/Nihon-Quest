"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { KanaStrokeGuide } from "@/components/KanaStrokeGuide";
import { useSoundAndTheme } from "@/components/SoundAndThemeContext";
import { useNativeLanguage } from "@/components/LanguageContext";
import { notifyProgressUpdated } from "@/components/UserProgressContext";
import { loadGlyph, type GlyphStroke, type Pt } from "@/lib/kana-strokes";
import { loadTf, PASS_SCORE, scoreKana, type ScoreResult } from "@/lib/kana-score";
import { getKanaI18n } from "@/lib/kana-i18n";

interface Props {
  character: string;
  romaji: string;
  script: string;
  /** Gọi khi chấm đạt và đã lưu SRS thành công */
  onPass?: () => void;
  onClose?: () => void;
}

const LS_GUIDE = "kana-writer:guide";
const LS_GHOST = "kana-writer:ghost";

function readFlag(key: string, fallback: boolean) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === "1";
  } catch {
    return fallback;
  }
}
function writeFlag(key: string, v: boolean) {
  try {
    localStorage.setItem(key, v ? "1" : "0");
  } catch {}
}

export function KanaWriter({ character, romaji, script, onPass, onClose }: Props) {
  const { playClick, playCorrect, showToast, speak } = useSoundAndTheme();
  const { nativeLanguage } = useNativeLanguage();
  const i18n = getKanaI18n(nativeLanguage);

  // undefined = đang tải · null = thiếu dữ liệu nét · mảng = sẵn sàng
  const [glyph, setGlyph] = useState<GlyphStroke[] | null | undefined>(undefined);
  const [guide, setGuide] = useState(true);
  const [ghost, setGhost] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [saved, setSaved] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokes = useRef<Pt[][]>([]);
  const drawing = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    setGuide(readFlag(LS_GUIDE, true));
    setGhost(readFlag(LS_GHOST, true));
    loadTf().catch(() => {}); // làm nóng TensorFlow để lần chấm đầu nhanh
  }, []);

  useEffect(() => {
    let off = false;
    setGlyph(undefined);
    setResult(null);
    setSaved(false);
    strokes.current = [];
    setStrokeCount(0);
    loadGlyph(character)
      .then((g) => !off && setGlyph(g))
      .catch(() => !off && setGlyph(null));
    return () => {
      off = true;
    };
  }, [character]);

  /* ---------- vẽ mượt: đường cong bậc 2 qua trung điểm + DPR ---------- */
  const redraw = useCallback(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = c.width * 0.05;
    const dark = document.documentElement.classList.contains("dark");
    ctx.strokeStyle = ctx.fillStyle = dark ? "#f1efe9" : "#191919";
    for (const s of strokes.current) {
      const P = s.map((p) => ({ x: p.x * c.width, y: p.y * c.height }));
      if (P.length === 1) {
        ctx.beginPath();
        ctx.arc(P[0].x, P[0].y, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(P[0].x, P[0].y);
      for (let i = 1; i < P.length - 1; i++) {
        const mx = (P[i].x + P[i + 1].x) / 2;
        const my = (P[i].y + P[i + 1].y) / 2;
        ctx.quadraticCurveTo(P[i].x, P[i].y, mx, my);
      }
      ctx.lineTo(P[P.length - 1].x, P[P.length - 1].y);
      ctx.stroke();
    }
  }, []);

  const schedule = useCallback(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(redraw);
  }, [redraw]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
      redraw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [redraw]);

  const pt = (e: { clientX: number; clientY: number }): Pt => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  const changed = (count: number) => {
    setStrokeCount(count);
    setResult(null);
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    drawing.current = true;
    strokes.current.push([pt(e)]);
    changed(strokes.current.length);
    schedule();
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const cur = strokes.current[strokes.current.length - 1];
    const native = e.nativeEvent as PointerEvent;
    const evs = typeof native.getCoalescedEvents === "function" ? native.getCoalescedEvents() : [];
    for (const ev of evs.length ? evs : [native]) {
      const p = pt(ev);
      const last = cur[cur.length - 1];
      if (Math.hypot(p.x - last.x, p.y - last.y) > 0.004) cur.push(p);
    }
    schedule();
  };

  const onUp = () => {
    drawing.current = false;
  };

  const undo = () => {
    playClick();
    strokes.current.pop();
    changed(strokes.current.length);
    schedule();
  };

  const clear = () => {
    playClick();
    strokes.current = [];
    changed(0);
    schedule();
  };

  const savePass = async () => {
    if (saved) return;
    try {
      const res = await fetch("/api/kana/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character, script }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSaved(true);
      playCorrect();
      notifyProgressUpdated();
      showToast({
        title: i18n.learnedTitle.replace("{char}", character).replace("{romaji}", romaji),
        description: i18n.savedSuccess,
        type: "xp",
      });
      onPass?.();
    } catch {
      showToast({
        title: "Chưa lưu được kết quả.",
        description: "Kiểm tra kết nối và thử lại.",
        type: "error",
      });
    }
  };

  const check = async () => {
    if (!glyph || strokes.current.length === 0) return;
    playClick();
    setChecking(true);
    try {
      const r = await scoreKana(strokes.current, glyph, nativeLanguage);
      setResult(r);
      if (r.passed) await savePass();
    } catch {
      showToast({
        title: "Không thể chấm điểm.",
        description: "Vui lòng thử lại sau giây lát.",
        type: "error",
      });
    } finally {
      setChecking(false);
    }
  };

  const tone = !result
    ? ""
    : result.score >= 90
      ? "is-great"
      : result.passed
        ? "is-ok"
        : result.score >= 50
          ? "is-near"
          : "is-low";

  const verdict = !result
    ? ""
    : result.score >= 90
      ? i18n.great
      : result.passed
        ? i18n.passed
        : result.score >= 50
          ? i18n.almost
          : i18n.needPractice;

  return (
    <div className="kw">
      <div className="kw-toolbar">
        <button
          type="button"
          className="kw-toggle"
          aria-pressed={guide}
          disabled={!glyph}
          onClick={() => {
            playClick();
            setGuide((v) => {
              writeFlag(LS_GUIDE, !v);
              return !v;
            });
          }}
        >
          <span className="kw-switch" aria-hidden="true" />
          {i18n.strokeGuide} <b>{guide ? "ON" : "OFF"}</b>
        </button>
        <button
          type="button"
          className="kw-toggle"
          aria-pressed={ghost}
          disabled={!glyph}
          onClick={() => {
            playClick();
            setGhost((v) => {
              writeFlag(LS_GHOST, !v);
              return !v;
            });
          }}
        >
          <span className="kw-switch" aria-hidden="true" />
          {i18n.ghostOutline} <b>{ghost ? "ON" : "OFF"}</b>
        </button>
        <button
          type="button"
          className="kw-btn"
          disabled={!glyph}
          onClick={() => {
            playClick();
            setAnimKey((k) => k + 1);
          }}
        >
          {i18n.watchOrder}
        </button>
      </div>

      {glyph === null && (
        <p className="kw-warn" role="status">
          {i18n.noDataWarn.replace("{char}", character)}
        </p>
      )}

      <div className="kw-boards">
        <figure className="kw-board is-model">
          <figcaption>
            {i18n.modelChar}
            {glyph ? ` · ${glyph.length} ${i18n.strokesUnit}` : ""}
          </figcaption>
          <div className="kw-surface">
            {glyph ? (
              <KanaStrokeGuide glyph={glyph} ink guide={guide} animateKey={animKey} className="kw-svg" />
            ) : (
              <span className="kw-fallback jp-text">{character}</span>
            )}
          </div>
          <span className="kw-reading">/{romaji}/</span>
        </figure>

        <figure className="kw-board is-draw">
          <figcaption>
            {i18n.drawHere} · {strokeCount} {i18n.strokesUnit}
          </figcaption>
          <div className="kw-surface">
            {glyph && ghost && <KanaStrokeGuide glyph={glyph} ghost className="kw-svg" />}
            <canvas
              ref={canvasRef}
              className="kw-canvas"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              aria-label={`${i18n.drawHere}: ${character}`}
            />
            {glyph && guide && <KanaStrokeGuide glyph={glyph} guide className="kw-svg kw-over" />}
          </div>
        </figure>
      </div>

      <div className="kw-actions">
        <button
          type="button"
          className="kw-icon"
          onClick={() => speak(character)}
          aria-label={i18n.audioSpeak}
        >
          🔊
        </button>
        <span className="kw-say">{romaji}</span>
        <button type="button" className="kw-btn" onClick={undo} disabled={strokeCount === 0}>
          {i18n.undo}
        </button>
        <button type="button" className="kw-btn" onClick={clear} disabled={strokeCount === 0}>
          {i18n.clear}
        </button>
        <button
          type="button"
          className="kw-primary"
          onClick={check}
          disabled={!glyph || strokeCount === 0 || checking}
        >
          {checking ? i18n.checking : i18n.check}
        </button>
      </div>

      <div aria-live="polite">
        {result && (
          <section className={`kw-result ${tone}`}>
            <div className="kw-ring" style={{ ["--p" as string]: result.score }}>
              <b>{result.score}</b>
            </div>
            <div className="kw-result-body">
              <h4>{verdict}</h4>
              <p>
                {i18n.coverageLabel} <b>{result.coverage}%</b> · {i18n.precisionLabel}{" "}
                <b>{result.precision}%</b> · {result.got}/{result.expected} {i18n.strokesUnit}
              </p>
              {result.issues.length > 0 ? (
                <ul>
                  {result.issues.slice(0, 4).map((item, idx) => (
                    <li key={idx}>{item.message}</li>
                  ))}
                </ul>
              ) : (
                <p className="kw-good">{i18n.allCorrect}</p>
              )}
              <small>
                {result.passed
                  ? saved
                    ? i18n.savedSuccess
                    : "..."
                  : i18n.passScoreHint.replace("{passScore}", String(PASS_SCORE))}
              </small>
            </div>
          </section>
        )}
      </div>

      {onClose && (
        <div className="kw-foot">
          <button type="button" className="kw-btn" onClick={onClose}>
            {i18n.close}
          </button>
          <small>{i18n.creditNote}</small>
        </div>
      )}
    </div>
  );
}
