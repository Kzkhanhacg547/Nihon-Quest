import { sampleStroke, type GlyphStroke, type Pt } from "./kana-strokes";
import { formatIssueMessage } from "./kana-i18n";
import { type NativeLanguage } from "@/lib/languages";

/* ---- Tham số độ khó và chuẩn mực nét viết ---- */
export const PASS_SCORE = 75;
const GRID = 80; // độ phân giải lưới raster
const TOL = 5; // bán kính dung sai giãn nở tensor (px trên lưới 80x80 ≈ ±6.25% khung chữ)
const LINE = 3; // độ dày nét khi raster

export interface StrokeIssue {
  index: number; // 0-based (-1 là lỗi tổng thể)
  kind: "order" | "direction" | "shape" | "count";
  message: string;
}

export interface ScoreResult {
  score: number; // 0..100
  passed: boolean;
  coverage: number; // % nét mẫu được phủ
  precision: number; // % nét viết nằm đúng vị trí
  expected: number;
  got: number;
  issues: StrokeIssue[];
  backend: string;
}

type TF = typeof import("@tensorflow/tfjs");
let tfPromise: Promise<TF> | null = null;

/** Tải TensorFlow.js một lần; gọi sớm (warmup) để lần chấm đầu không bị trễ. */
export function loadTf(): Promise<TF> {
  if (!tfPromise) {
    tfPromise = import("@tensorflow/tfjs").then(async (tf) => {
      await tf.ready();
      return tf;
    });
  }
  return tfPromise;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function bbox(strokes: Pt[][]) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const s of strokes) {
    for (const p of s) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
  }
  if (!isFinite(minX)) return { minX: 0, minY: 0, maxX: 1, maxY: 1, w: 1, h: 1, cx: 0.5, cy: 0.5 };
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

/** Căn chữ người viết vào đúng khung của chữ mẫu mà không bóp méo tỷ lệ khung hình */
function fit(user: Pt[][], ref: Pt[][]): Pt[][] {
  const u = bbox(user);
  const r = bbox(ref);
  const us = Math.max(u.w, u.h, 0.05);
  const rs = Math.max(r.w, r.h);
  const k = clamp(rs / us, 0.6, 1.8);
  return user.map((s) =>
    s.map((p) => ({
      x: clamp((p.x - u.cx) * k + r.cx, 0, 1),
      y: clamp((p.y - u.cy) * k + r.cy, 0, 1),
    }))
  );
}

function raster(strokes: Pt[][]): Float32Array {
  const c = document.createElement("canvas");
  c.width = c.height = GRID;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.lineWidth = LINE;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = ctx.fillStyle = "#000";
  for (const s of strokes) {
    if (s.length === 0) continue;
    if (s.length === 1) {
      ctx.beginPath();
      ctx.arc(s[0].x * GRID, s[0].y * GRID, LINE / 2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(s[0].x * GRID, s[0].y * GRID);
    for (let i = 1; i < s.length; i++) ctx.lineTo(s[i].x * GRID, s[i].y * GRID);
    ctx.stroke();
  }
  const data = ctx.getImageData(0, 0, GRID, GRID).data;
  const out = new Float32Array(GRID * GRID);
  for (let i = 0; i < out.length; i++) out[i] = data[i * 4 + 3] / 255;
  return out;
}

/* ---------- Lấy mẫu đều điểm dọc theo nét (resampling) ---------- */
function resample(pts: Pt[], n = 24): Pt[] {
  if (pts.length === 0) return Array.from({ length: n }, () => ({ x: 0.5, y: 0.5 }));
  if (pts.length === 1) return Array.from({ length: n }, () => pts[0]);
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  const total = cum[cum.length - 1];
  if (total < 1e-6) return Array.from({ length: n }, () => pts[0]);
  const out: Pt[] = [];
  let j = 0;
  for (let k = 0; k < n; k++) {
    const target = (total * k) / (n - 1);
    while (j < cum.length - 2 && cum[j + 1] < target) j++;
    const seg = cum[j + 1] - cum[j] || 1;
    const t = clamp((target - cum[j]) / seg, 0, 1);
    out.push({
      x: pts[j].x + (pts[j + 1].x - pts[j].x) * t,
      y: pts[j].y + (pts[j + 1].y - pts[j].y) * t,
    });
  }
  return out;
}

const avgDist = (a: Pt[], b: Pt[]) =>
  a.reduce((s, p, i) => s + Math.hypot(p.x - b[i].x, p.y - b[i].y), 0) / a.length;

const strokeLength = (pts: Pt[]) =>
  pts.reduce((s, p, i) => (i ? s + Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) : 0), 0);

interface StrokeAnalysis {
  issues: StrokeIssue[];
  shapeScores: number[];
  dirScores: number[];
  orderScores: number[];
  hasDirectionIssue: boolean;
  hasOrderIssue: boolean;
  hasBadShape: boolean;
}

function analyzeStrokesStrict(
  userStrokes: Pt[][],
  refStrokes: Pt[][],
  lang: NativeLanguage = "en"
): StrokeAnalysis {
  const expected = refStrokes.length;
  const got = userStrokes.length;
  const issues: StrokeIssue[] = [];

  const U = userStrokes.map((s) => resample(s, 24));
  const R = refStrokes.map((s) => resample(s, 24));

  const shapeScores: number[] = [];
  const dirScores: number[] = [];
  const orderScores: number[] = [];

  let hasDirectionIssue = false;
  let hasOrderIssue = false;
  let hasBadShape = false;

  // 1. Kiểm tra số nét
  if (got < expected) {
    issues.push({
      index: -1,
      kind: "count",
      message: formatIssueMessage("missing", { diff: expected - got, expected, got }, lang),
    });
  } else if (got > expected) {
    issues.push({
      index: -1,
      kind: "count",
      message: formatIssueMessage("extra", { diff: got - expected, expected, got }, lang),
    });
  }

  const commonCount = Math.min(got, expected);

  // 2. Kiểm tra chi tiết từng nét theo đúng thứ tự
  for (let i = 0; i < commonCount; i++) {
    const u = U[i];
    const r = R[i];

    const fwdDist = avgDist(u, r);
    const rRev = [...r].reverse();
    const revDist = avgDist(u, rRev);

    const startErr = Math.hypot(u[0].x - r[0].x, u[0].y - r[0].y);
    const endErr = Math.hypot(u[u.length - 1].x - r[r.length - 1].x, u[u.length - 1].y - r[r.length - 1].y);
    const revStartErr = Math.hypot(u[0].x - r[r.length - 1].x, u[0].y - r[r.length - 1].y);
    const revEndErr = Math.hypot(u[u.length - 1].x - r[0].x, u[u.length - 1].y - r[0].y);

    const rLen = strokeLength(r);
    const uLen = strokeLength(u);

    // Vector hướng nét
    const uDx = u[u.length - 1].x - u[0].x;
    const uDy = u[u.length - 1].y - u[0].y;
    const rDx = r[r.length - 1].x - r[0].x;
    const rDy = r[r.length - 1].y - r[0].y;
    const uMag = Math.hypot(uDx, uDy);
    const rMag = Math.hypot(rDx, rDy);

    let isReversed = false;
    let dirScore = 1.0;

    if (rMag > 0.08 && uMag > 0.05) {
      const cosAngle = (uDx * rDx + uDy * rDy) / (uMag * rMag);
      if (cosAngle < -0.3 || (revDist + 0.04 < fwdDist && revStartErr < startErr)) {
        isReversed = true;
        dirScore = 0.0;
      } else {
        dirScore = clamp((cosAngle + 0.2) / 1.2, 0, 1);
      }
    } else if (rLen > 0.12 && revDist + 0.05 < fwdDist) {
      isReversed = true;
      dirScore = 0.0;
    }

    if (isReversed) {
      hasDirectionIssue = true;
      issues.push({
        index: i,
        kind: "direction",
        message: formatIssueMessage("direction", { userStroke: i + 1 }, lang),
      });
    }
    dirScores.push(dirScore);

    // Kiểm tra xem nét này có bị lẫn với nét khác không (sai thứ tự nét)
    let bestOtherIdx = i;
    let bestOtherDist = fwdDist;
    for (let j = 0; j < expected; j++) {
      if (j === i) continue;
      const d = Math.min(avgDist(u, R[j]), avgDist(u, [...R[j]].reverse()));
      if (d < bestOtherDist) {
        bestOtherDist = d;
        bestOtherIdx = j;
      }
    }

    let orderScore = 1.0;
    if (bestOtherIdx !== i && bestOtherDist < 0.10 && fwdDist > 0.16) {
      hasOrderIssue = true;
      orderScore = 0.0;
      issues.push({
        index: i,
        kind: "order",
        message: formatIssueMessage("order", { userStroke: i + 1, targetStroke: bestOtherIdx + 1 }, lang),
      });
    }
    orderScores.push(orderScore);

    // Đánh giá dáng nét (Shape fidelity & placement)
    const shapeTrajectory = clamp(1 - (fwdDist - 0.05) / 0.12, 0, 1);
    const shapeStart = clamp(1 - (startErr - 0.05) / 0.16, 0, 1);
    const shapeEnd = clamp(1 - (endErr - 0.05) / 0.16, 0, 1);
    const shapeScore = 0.7 * shapeTrajectory + 0.15 * shapeStart + 0.15 * shapeEnd;

    if (shapeScore < 0.38 || fwdDist > 0.18 || (startErr > 0.28 && endErr > 0.28)) {
      hasBadShape = true;
      if (!isReversed && bestOtherIdx === i) {
        issues.push({
          index: i,
          kind: "shape",
          message: formatIssueMessage("shape", { userStroke: i + 1 }, lang),
        });
      }
    }
    shapeScores.push(shapeScore);
  }

  // Điểm cho các nét còn thiếu
  for (let i = commonCount; i < expected; i++) {
    shapeScores.push(0);
    dirScores.push(0);
    orderScores.push(0);
  }

  return {
    issues,
    shapeScores,
    dirScores,
    orderScores,
    hasDirectionIssue,
    hasOrderIssue,
    hasBadShape,
  };
}

/**
 * Chấm điểm viết Kana:
 *  - Yêu cầu chuẩn số nét (thiếu hoặc thừa nét đều KHÔNG ĐẠT)
 *  - Yêu cầu chuẩn thứ tự từng nét
 *  - Yêu cầu chuẩn chiều viết của từng nét
 *  - Yêu cầu chuẩn dáng nét và vị trí
 *  - Phối hợp TensorFlow.js template-matching để đo diện tích phủ & độ chính xác
 */
export async function scoreKana(
  userStrokes: Pt[][],
  glyph: GlyphStroke[],
  lang: NativeLanguage = "en"
): Promise<ScoreResult> {
  const tf = await loadTf();
  const refStrokes = glyph.map((g) => sampleStroke(g));
  const expected = refStrokes.length;
  const got = userStrokes.length;

  const fitted = fit(userStrokes, refStrokes);

  const refData = raster(refStrokes);
  const usrData = raster(fitted);

  const stats = tf.tidy(() => {
    const ref = tf.tensor4d(refData, [1, GRID, GRID, 1]);
    const usr = tf.tensor4d(usrData, [1, GRID, GRID, 1]);
    const dil = (t: ReturnType<typeof tf.tensor4d>) => tf.maxPool(t, [TOL, TOL], [1, 1], "same");
    const coverage = ref.mul(dil(usr)).sum().div(ref.sum().add(1e-6));
    const precision = usr.mul(dil(ref)).sum().div(usr.sum().add(1e-6));
    return tf.stack([coverage, precision]);
  });
  const [coverage, precision] = Array.from(await stats.data());
  const backend = tf.getBackend();
  stats.dispose();

  const f1 = coverage + precision > 0 ? (2 * coverage * precision) / (coverage + precision) : 0;
  const rasterScore = clamp((f1 - 0.45) / 0.45, 0, 1);

  // Phân tích nét chuẩn mực
  const analysis = analyzeStrokesStrict(fitted, refStrokes, lang);

  const avgShape = analysis.shapeScores.reduce((s, v) => s + v, 0) / Math.max(1, expected);
  const avgDir = analysis.dirScores.reduce((s, v) => s + v, 0) / Math.max(1, expected);
  const avgOrder = analysis.orderScores.reduce((s, v) => s + v, 0) / Math.max(1, expected);

  // Tổng hợp điểm chuẩn: 35% dáng nét + 25% chiều bút + 20% thứ tự nét + 20% raster phủ
  const rawScore = 100 * (0.35 * avgShape + 0.25 * avgDir + 0.20 * avgOrder + 0.20 * rasterScore);

  let finalScore = Math.round(rawScore);
  let passed = true;

  // LỖI 1: Sai số nét (vẽ thiếu hoặc thừa nét) -> KHÔNG THỂ ĐẠT!
  if (got !== expected) {
    passed = false;
    const diff = Math.abs(got - expected);
    // Điểm bị giới hạn nghiêm ngặt, tối đa 40 điểm (Rớt)
    finalScore = Math.min(Math.round(rawScore * 0.35), Math.max(10, 45 - diff * 20));
  }

  // LỖI 2: Ngược hướng hoặc sai thứ tự nét -> Giới hạn dưới ngưỡng ĐẠT
  if (analysis.hasDirectionIssue || analysis.hasOrderIssue) {
    passed = false;
    finalScore = Math.min(finalScore, 65);
  }

  // LỖI 3: Dáng nét quá xấu hoặc vẽ bậy không khớp mẫu
  if (analysis.hasBadShape) {
    passed = false;
    finalScore = Math.min(finalScore, 68);
  }

  // Kiểm tra ngưỡng điểm đạt chuẩn
  if (finalScore < PASS_SCORE) {
    passed = false;
  }

  return {
    score: clamp(finalScore, 0, 100),
    passed,
    coverage: Math.round(coverage * 100),
    precision: Math.round(precision * 100),
    expected,
    got,
    issues: analysis.issues,
    backend,
  };
}
