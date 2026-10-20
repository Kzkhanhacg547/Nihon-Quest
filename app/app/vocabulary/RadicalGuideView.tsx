"use client";

import { useState } from "react";
import {
  SIX_FORMATIONS,
  SEVEN_POSITIONS,
  FOUR_STEPS_HACKER,
  DECONSTRUCTION_EXAMPLES,
  RADICAL_QUIZ_QUESTIONS,
  type DeconstructionExample,
} from "@/lib/radical-guide-data";
import { useSoundAndTheme } from "@/components/SoundAndThemeContext";
import { useNativeLanguage } from "@/components/LanguageContext";
import { Icon } from "@/components/ui";

type GuideTab = "FORMATIONS" | "POSITIONS" | "STEPS" | "DECONSTRUCT" | "QUIZ";

export function RadicalGuideView() {
  const { playCorrect, playIncorrect, playFanfare } = useSoundAndTheme();
  const { nativeLanguage } = useNativeLanguage();
  const [activeTab, setActiveTab] = useState<GuideTab>("DECONSTRUCT");
  const [selectedExample, setSelectedExample] = useState<DeconstructionExample>(DECONSTRUCTION_EXAMPLES[0]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = RADICAL_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered
    const isCorrect = optionIndex === currentQ.correctIndex;
    if (isCorrect) playCorrect();
    else playIncorrect();

    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);

    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < RADICAL_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      playFanfare();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Hero Guide Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm dark:border-amber-900/50 dark:from-amber-950/30 dark:via-sumi-900 dark:to-orange-950/30">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/80 px-3.5 py-1 text-xs font-bold text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
          <span>
            {nativeLanguage === "vi"
              ? "💡 Bí Kíp Học Siêu Tốc"
              : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
              ? "💡 核心构字要诀"
              : nativeLanguage === "ko"
              ? "💡 핵심 한자 비법"
              : "💡 Essential Method"}
          </span>
          <span>•</span>
          <span>
            {nativeLanguage === "vi"
              ? "Giải Mã Cấu Trúc Hán Tự"
              : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
              ? "汉字结构解密"
              : nativeLanguage === "ko"
              ? "한자 구조 해독"
              : "Kanji Structure Decoded"}
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
          {nativeLanguage === "vi"
            ? "Phương Pháp Ghép Bộ Thủ Để Đoán Nghĩa Chữ Kanji Mới"
            : nativeLanguage === "zh-CN"
            ? "汉字部首拆分组合与字义推断法"
            : nativeLanguage === "zh-TW"
            ? "漢字部首拆分組合與字義推斷法"
            : nativeLanguage === "ko"
            ? "부수 조합 분석 및 신출 한자 의미 추론법"
            : "Radical Combinations & Kanji Meaning Deduction Guide"}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {nativeLanguage === "vi"
            ? "Đừng học vẹt từng nét chữ! Chữ Hán vốn là hệ thống tượng hình và hội ý logic được tạo dựng qua hàng nghìn năm. Bằng cách nắm vững Lục Thư, phân biệt Hình Bộ (xác định trường nghĩa) và Thanh Bộ (gợi ý âm đọc), bạn có thể dễ dàng suy đoán chính xác ý nghĩa của bất kỳ chữ Kanji mới lạ nào ngay từ lần đầu tiên bắt gặp."
            : nativeLanguage === "zh-CN"
            ? "告别机械死记硬背！汉字是历经数千年演进的象形与表意系统。熟练掌握“六书”构字法、分清“形旁”（决定字义范畴）与“声旁”（提示音读发音），即可在初次遇见陌生难字时瞬间准确推断其核心含义与读音！"
            : nativeLanguage === "zh-TW"
            ? "告別機械死記硬背！漢字是歷經數千年演進的象形與表意系統。熟練掌握「六書」構字法、分清「形旁」（決定字義範疇）與「聲旁」（提示音讀發音），即可在初次遇見陌生難字時瞬間準確推斷其核心含義與讀音！"
            : nativeLanguage === "ko"
            ? "무작정 획을 외우는 학습에서 벗어나세요! 한자는 수천 년에 걸쳐 정립된 논리적 표의 체계입니다. 육서(六書)의 원리를 익히고 형부(의미 영역)와 성부(음독 힌트)를 구별하면 낯선 한자를 마주해도 직관적으로 의미를 추론할 수 있습니다."
            : "Move beyond rote memorization! Kanji is a logical ideographic system. By understanding radical roles, distinguishing semantic components (meaning field) from phonetic components (pronunciation hint), you can intuitively deduce the meaning of unfamiliar characters on sight."}
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-amber-200/60 pt-4 dark:border-slate-800">
          {[
            {
              id: "DECONSTRUCT",
              label:
                nativeLanguage === "vi"
                  ? "🔍 12+ Ví dụ bẻ khóa thực chiến"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "🔍 12+ 实战拆解范例"
                  : nativeLanguage === "ko"
                  ? "🔍 12+ 실전 분해 분석 예시"
                  : "🔍 12+ Practical Deconstructions",
              icon: "sparkles",
            },
            {
              id: "STEPS",
              label:
                nativeLanguage === "vi"
                  ? "⚡ 4 Bước đoán nghĩa thần tốc"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "⚡ 4步神速推断字义"
                  : nativeLanguage === "ko"
                  ? "⚡ 초고속 4단계 의미 추론"
                  : "⚡ 4-Step Instant Deduction",
              icon: "lightning",
            },
            {
              id: "POSITIONS",
              label:
                nativeLanguage === "vi"
                  ? "📐 Thất Vị Trí (7 vị trí bộ thủ)"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "📐 七大位置 (部首结构)"
                  : nativeLanguage === "ko"
                  ? "📐 칠대 위치 (부수 배치)"
                  : "📐 Seven Positions",
              icon: "grid",
            },
            {
              id: "FORMATIONS",
              label:
                nativeLanguage === "vi"
                  ? "📜 Lục Thư (6 phép tạo chữ)"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "📜 六书构造 (造字六法)"
                  : nativeLanguage === "ko"
                  ? "📜 육서 (한자 조자 6법)"
                  : "📜 Six Formations (Rikushō)",
              icon: "book",
            },
            {
              id: "QUIZ",
              label:
                nativeLanguage === "vi"
                  ? "🎯 Thử tài đoán nghĩa (Quiz)"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "🎯 实战随堂测验 (Quiz)"
                  : nativeLanguage === "ko"
                  ? "🎯 퀴즈 챌린지 (Quiz)"
                  : "🎯 Deduction Quiz",
              icon: "star",
            },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as GuideTab)}
                className={`rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold transition active:scale-95 ${
                  active
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:text-amber-700 dark:border-slate-800 dark:bg-sumi-800 dark:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DECONSTRUCTION PLAYGROUND */}
      {activeTab === "DECONSTRUCT" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Kanji selector chips */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
              Chọn một chữ Kanji để xem phân rã:
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {DECONSTRUCTION_EXAMPLES.map((ex) => {
                const active = selectedExample.kanji === ex.kanji;
                return (
                  <button
                    key={ex.kanji}
                    type="button"
                    onClick={() => setSelectedExample(ex)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition active:scale-95 ${
                      active
                        ? "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/20"
                        : "border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/50 dark:border-slate-800 dark:bg-sumi-900 dark:text-white"
                    }`}
                  >
                    <span className="jp-text text-3xl font-black">{ex.kanji}</span>
                    <span className={`text-[11px] font-black mt-1 ${active ? "text-amber-100" : "text-red-600 dark:text-red-400"}`}>
                      {nativeLanguage === "vi" ? ex.hanViet : ex.onyomi || ex.meaning}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-xs text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/30 dark:text-indigo-300">
              💡 <strong>
                {nativeLanguage === "vi"
                  ? "Quy luật vàng: "
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "黄金法则: "
                  : nativeLanguage === "ko"
                  ? "황금 법칙: "
                  : "Golden Rule: "}
              </strong>
              {nativeLanguage === "vi"
                ? "Hơn 80% chữ Hán trong tiếng Nhật là chữ Hình Thanh (Keisei). Bạn chỉ cần nhìn phần bộ thủ (hình bộ) để biết chủ đề, và nhìn phần còn lại (thanh bộ) để đoán ngay cách phát âm Onyomi!"
                : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                ? "日语常用汉字中超过80%属于“形声字（Keisei）”。形旁表意，声旁表音，看懂部首即可洞察字义范畴，看另一半即可预判音读发音！"
                : nativeLanguage === "ko"
                ? "일본어 상용한자의 80% 이상은 '형성자(Keisei)'입니다. 부수(형부)를 보면 의미 범주를 알 수 있고, 나머지 성부를 보면 음독 발음을 바로 예측할 수 있습니다!"
                : "Over 80% of Japanese Kanji are Phono-semantic compounds (Keisei). Look at the radical to know the meaning field, and the remainder to predict the Onyomi pronunciation!"}
            </div>
          </div>

          {/* Right Column: Detailed Deconstruction View */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900 space-y-6">
              {/* Top Banner with Formula */}
              <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="text-center">
                  <div className="jp-text text-7xl font-black text-slate-900 dark:text-white">
                    {selectedExample.kanji}
                  </div>
                  <div className="mt-1 text-base font-black text-red-600 dark:text-red-400 tracking-wider">
                    {nativeLanguage === "vi" ? selectedExample.hanViet : selectedExample.onyomi || selectedExample.meaning}
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    Ý nghĩa: {selectedExample.meaning}
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                    <span className="rounded-lg bg-indigo-50 px-2 py-1 font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      On: {selectedExample.onyomi}
                    </span>
                    <span className="rounded-lg bg-emerald-50 px-2 py-1 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Kun: {selectedExample.kunyomi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visual Formula Decomposition */}
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-3">
                  Công thức ghép bộ thủ:
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedExample.formula.map((part, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/80 px-3.5 py-2.5 dark:border-amber-900/60 dark:bg-amber-950/40">
                        <span className="jp-text text-2xl font-black text-amber-900 dark:text-amber-200">
                          {part.part}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{part.name}</div>
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">{part.role}</div>
                        </div>
                      </div>
                      {index < selectedExample.formula.length - 1 && (
                        <span className="text-lg font-black text-slate-400">+</span>
                      )}
                    </div>
                  ))}
                  <span className="text-lg font-black text-slate-400">=</span>
                  <div className="rounded-2xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 dark:border-red-900/60 dark:bg-red-950/40">
                    <span className="jp-text text-2xl font-black text-red-600 dark:text-red-400">
                      {selectedExample.kanji}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mnemonic Story */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300 mb-1">
                  <span>🧠 Câu chuyện liên tưởng (Mnemonic):</span>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedExample.mnemonic}
                </p>
              </div>

              {/* Vocabulary Application */}
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-2">
                  Từ vựng ứng dụng phổ biến:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedExample.vocabulary.map((vocab, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-sumi-800"
                    >
                      <div className="jp-text text-base font-black text-slate-900 dark:text-white">
                        {vocab.word}
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                        {vocab.reading}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-300 mt-1">
                        {vocab.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOUR STEPS HACKER */}
      {activeTab === "STEPS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FOUR_STEPS_HACKER.map((s) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500 font-black text-white text-lg shadow-md shadow-amber-500/20">
                    {s.step}
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3 text-xs font-bold text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-200">
                  🎯 <strong>Bí quyết:</strong> {s.tip}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 dark:border-indigo-950 dark:from-indigo-950/30 dark:to-blue-950/30 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 space-y-2">
            <h4 className="font-black text-base">📌 Ví dụ ứng dụng thực tế 4 bước:</h4>
            <p>
              Gặp một chữ chưa học bao giờ: <strong>「誹」</strong>.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Bước 1:</strong> Nhìn sang bên trái thấy bộ Ngôn (言) → Biết ngay chữ này liên quan đến <em>lời nói, phát ngôn, chuyện trò</em>.</li>
              <li><strong>Bước 2:</strong> Nhìn sang bên phải thấy chữ Phi (非 - không phải, sai trái, âm HI) → Gợi ý âm đọc HI và mang nghĩa sai quấy.</li>
              <li><strong>Bước 3:</strong> Dệt câu chuyện: Dùng <em>lời nói (言)</em> để vu cáo điều <em>sai trái (非)</em> cho người khác → Nghĩa là <strong>phỉ báng, dèm pha</strong>!</li>
              <li><strong>Bước 4:</strong> Tra lại từ điển: 誹謗 (hibou) = Phỉ báng, bôi nhọ danh dự! Suy luận hoàn toàn chính xác 100%!</li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB 3: SEVEN POSITIONS */}
      {activeTab === "POSITIONS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEVEN_POSITIONS.map((pos) => (
              <div
                key={pos.code}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-sumi-900"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {pos.nameJa}
                    </span>
                    <pre className="font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-sumi-800 p-1 rounded-md">
                      {pos.diagram.split("\n")[0]}
                    </pre>
                  </div>
                  <h3 className="mt-2 text-base font-black text-slate-900 dark:text-white">
                    {pos.nameVi}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pos.desc}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">Các bộ tiêu biểu:</span>
                  <div className="space-y-1">
                    {pos.radicals.map((rad, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <span className="jp-text font-black text-base text-red-600 dark:text-red-400 w-6 text-center">
                          {rad.char}
                        </span>
                        <div className="truncate text-slate-700 dark:text-slate-200">
                          <span className="font-bold">{rad.name}</span>: <span className="text-slate-500 dark:text-slate-400">{rad.meaning}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SIX FORMATIONS (LỤC THƯ) */}
      {activeTab === "FORMATIONS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIX_FORMATIONS.map((f, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-sumi-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{f.name}</h3>
                  <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-black text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    Tỷ lệ: {f.percent}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {f.desc}
                </p>

                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-sumi-800/60 space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase text-slate-400">Ví dụ tiêu biểu:</div>
                  <div className="space-y-1">
                    {f.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="jp-text text-base font-black text-indigo-600 dark:text-indigo-400 shrink-0 w-6 text-center">
                          {ex.char}
                        </span>
                        <span className="text-slate-700 dark:text-slate-200 pt-0.5">{ex.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INTERACTIVE QUIZ */}
      {activeTab === "QUIZ" && (
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500">
                  Câu hỏi {currentQuestionIndex + 1} / {RADICAL_QUIZ_QUESTIONS.length}
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Điểm: {score} / {RADICAL_QUIZ_QUESTIONS.length}
                </div>
              </div>

              {/* Big Kanji Prompt */}
              <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-amber-50 p-6 text-center dark:from-indigo-950/40 dark:to-amber-950/40">
                <div className="jp-text text-8xl font-black text-slate-900 dark:text-white drop-shadow">
                  {currentQ.kanji}
                </div>
                <div className="mt-2 text-sm font-black text-red-600 dark:text-red-400 tracking-wider">
                  {currentQ.hanViet}
                </div>
                <div className="mt-1 text-xs text-slate-500 font-medium">
                  Cấu tạo: {currentQ.breakdown}
                </div>
              </div>

              <div className="text-base font-bold text-slate-900 dark:text-white text-center sm:text-left">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, optIndex) => {
                  const answered = selectedAnswers[currentQ.id] !== undefined;
                  const isSelected = selectedAnswers[currentQ.id] === optIndex;
                  const isCorrect = optIndex === currentQ.correctIndex;

                  let style = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-sumi-800";
                  if (answered) {
                    if (isCorrect) {
                      style = "border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20";
                    } else if (isSelected) {
                      style = "border-red-500 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-950/60 dark:text-red-200 font-bold ring-2 ring-red-500/20";
                    } else {
                      style = "opacity-40 border-slate-200 bg-white dark:border-slate-800 dark:bg-sumi-900";
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={answered}
                      onClick={() => handleSelectOption(currentQ.id, optIndex)}
                      className={`rounded-2xl border p-4 text-left text-sm transition active:scale-[0.98] ${style}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answering */}
              {selectedAnswers[currentQ.id] !== undefined && (
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 text-xs text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-200 animate-fadeIn space-y-1">
                  <div className="font-black">💡 Giải thích chi tiết:</div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {selectedAnswers[currentQ.id] !== undefined && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition active:scale-95"
                  >
                    {currentQuestionIndex < RADICAL_QUIZ_QUESTIONS.length - 1 ? "Câu tiếp theo ›" : "Xem kết quả »"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-4">
              <span className="text-6xl animate-bounce inline-block">🎉</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {nativeLanguage === "vi"
                  ? "Chúc Mừng Bạn Đã Hoàn Thành Thử Thách!"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "恭喜你完成随堂测验！"
                  : nativeLanguage === "ko"
                  ? "축하합니다! 퀴즈 도전을 완료하셨습니다!"
                  : "Congratulations on Completing the Challenge!"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {nativeLanguage === "vi" ? (
                  <>Bạn đã trả lời đúng <strong>{score}</strong> trên tổng số {RADICAL_QUIZ_QUESTIONS.length} câu hỏi.</>
                ) : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW" ? (
                  <>你在共 {RADICAL_QUIZ_QUESTIONS.length} 道题目中答对了 <strong>{score}</strong> 题。</>
                ) : nativeLanguage === "ko" ? (
                  <>총 {RADICAL_QUIZ_QUESTIONS.length}문제 중 <strong>{score}</strong>문제를 맞히셨습니다.</>
                ) : (
                  <>You answered <strong>{score}</strong> out of {RADICAL_QUIZ_QUESTIONS.length} questions correctly.</>
                )}
              </p>

              <div className="inline-block rounded-3xl border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                {score >= 8
                  ? nativeLanguage === "vi"
                    ? "🏆 Xuất sắc! Trực giác phân tích bộ thủ của bạn cực kỳ nhạy bén!"
                    : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                    ? "🏆 卓越出色！你的部首分析直觉非常敏锐！"
                    : nativeLanguage === "ko"
                    ? "🏆 훌륭합니다! 부수 분석 직관력이 매우 뛰어납니다!"
                    : "🏆 Excellent! Your radical analysis instincts are razor sharp!"
                  : score >= 5
                  ? nativeLanguage === "vi"
                    ? "👏 Khá tốt! Bạn đã nắm được cách ghép bộ thủ cơ bản, hãy luyện thêm nhé!"
                    : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                    ? "👏 表现不错！你已经掌握了基本的部首组合方法，继续加油！"
                    : nativeLanguage === "ko"
                    ? "👏 좋습니다! 기본적인 부수 조합 원리를 잘 이해하셨네요!"
                    : "👏 Great job! You grasp basic radical combinations well, keep practicing!"
                  : nativeLanguage === "vi"
                  ? "💪 Đừng nản lòng! Hãy ôn lại Thất vị trí và các bộ thủ tiêu biểu để nâng cao độ chính xác!"
                  : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                  ? "💪 不要气馁！多复习七大位置与典型部首，准确率会迅速提升！"
                  : nativeLanguage === "ko"
                  ? "💪 힘내세요! 칠대 위치와 대표 부수를 복습하면 정확도가 쑥쑥 올라갑니다!"
                  : "💪 Don't give up! Review the Seven Positions and key radicals to build accuracy!"}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 shadow"
                >
                  {nativeLanguage === "vi"
                    ? "Làm lại thử thách"
                    : nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW"
                    ? "重新测验"
                    : nativeLanguage === "ko"
                    ? "다시 도전하기"
                    : "Retake Challenge"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}