"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserProgress } from "@/components/UserProgressContext";
import { useNativeLanguage } from "@/components/LanguageContext";
import { useSoundAndTheme } from "@/components/SoundAndThemeContext";
import { BASE64_IMAGES } from "@/lib/assets/base64Images";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function KawaiiSenseiBubble() {
  const pathname = usePathname();
  const { progress } = useUserProgress();
  const { nativeLanguage, setNativeLanguage } = useNativeLanguage();
  const { playClick, speak, showToast } = useSoundAndTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [character, setCharacter] = useState<"aoi" | "ren">("aoi");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Initial greeting tailored to user progress
  useEffect(() => {
    if (messages.length === 0) {
      const isEn = nativeLanguage === "en";
      const streak = progress?.currentStreak ?? 0;
      const dueCards = progress?.stats?.dueReviewCount ?? 0;
      const level = progress?.learningLevel || "N5";

      let greetingContent = "";
      if (isEn) {
        greetingContent = `Konnichiwa! I'm Aoi Sensei, your personal Japanese learning assistant 🌸\n\nI see you are on **JLPT ${level}** with a **${streak}-day streak** 🔥\n${
          dueCards > 0
            ? `⏰ You have **${dueCards} SRS flashcards** ready for review today!`
            : "✨ Great job! No pending SRS cards today."
        }\n\nHow can I help you today? Ask me for study recommendations, grammar explanations, or practice conversation!`;
      } else {
        greetingContent = `Konnichiwa! Sensei chào bạn nhé 🌸 Mình là trợ lý học tập cá nhân của bạn tại Nihon Quest.\n\nSensei thấy bạn đang học **JLPT ${level}**, duy trì chuỗi **${streak} ngày Streak** 🔥\n${
          dueCards > 0
            ? `⏰ Hiện đang có **${dueCards} thẻ từ vựng SRS** đến hạn ôn tập hôm nay đấy!`
            : "✨ Tuyệt vời! Bạn không còn thẻ SRS nào bị nợ hôm nay."
        }\n\nBạn muốn Sensei hướng dẫn bài học hôm nay, giải thích ngữ pháp hay luyện phản xạ giao tiếp nào?`;
      }

      setMessages([
        {
          id: "welcome-1",
          role: "assistant",
          content: greetingContent,
          timestamp: new Date(),
        },
      ]);
    }
  }, [progress, nativeLanguage, messages.length]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    playClick();
    setInput("");
    setHasInteracted(true);

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          scenarioId: "assistant_guide",
          nativeLanguage,
          history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể kết nối tới Sensei");
      }

      const data = await res.json();
      const assistantText = data?.message?.content || data?.response || "Sensei đang bận một chút, bạn thử lại sau nhé!";

      setMessages((prev) => [
        ...prev,
        {
          id: "a-" + Date.now(),
          role: "assistant",
          content: assistantText,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content:
            nativeLanguage === "en"
              ? "Gomen ne! I had trouble connecting. Please try again!"
              : "Gomen ne! Sensei gặp chút trục trặc kết nối, bạn thử lại nhé!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionKey: string) => {
    const isEn = nativeLanguage === "en";
    let prompt = "";
    if (actionKey === "recommend") {
      prompt = isEn ? "What should I study today based on my progress?" : "Hôm nay tôi nên học gì dựa trên tiến trình của mình?";
    } else if (actionKey === "srs") {
      prompt = isEn ? "How many vocabulary cards do I need to review in SRS today?" : "Kiểm tra giúp tôi các thẻ từ vựng cần ôn tập SRS hôm nay.";
    } else if (actionKey === "grammar") {
      prompt = isEn ? "Explain the key grammar points for my level in Japanese." : "Giải thích giúp tôi cấu trúc ngữ pháp thông dụng cấp độ hiện tại.";
    } else if (actionKey === "conversation") {
      prompt = isEn ? "Let's practice a casual Japanese conversation!" : "Chúng ta cùng luyện phản xạ đối thoại tiếng Nhật nhé!";
    }
    handleSendMessage(prompt);
  };

  const handleSendReminderEmail = async () => {
    try {
      playClick();
      showToast({
        title: nativeLanguage === "en" ? "Sending email reminder..." : "Đang gửi email nhắc nhở...",
        type: "info",
      });

      const res = await fetch("/api/user/study-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nativeLanguage }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast({
          title: nativeLanguage === "en" ? "Reminder Sent! 🌸" : "Đã gửi email nhắc nhở! 🌸",
          description: data.message || "Kiểm tra hộp thư của bạn nhé!",
          type: "success",
        });
      } else {
        showToast({
          title: "Lỗi gửi email",
          description: data.error || "Chưa thể gửi email lúc này",
          type: "error",
        });
      }
    } catch {
      showToast({ title: "Lỗi kết nối máy chủ", type: "error" });
    }
  };

  const currentPortrait = character === "aoi" ? BASE64_IMAGES.aoiPortrait : BASE64_IMAGES.renPortrait;

  // Don't show the bubble when directly inside full screen sensei page to prevent redundancy
  const isFullSenseiPage = pathname === "/app/sensei";

  return (
    <>
      {/* ================= FLOATING CIRCULAR BUBBLE BUTTON ================= */}
      {!isFullSenseiPage && (
        <aside
          aria-label="Kawaii Sensei Assistant"
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 select-none flex flex-col items-end gap-2"
        >
          {/* Unread / Attention mini pill */}
          {!isOpen && !hasInteracted && (progress?.stats?.dueReviewCount ?? 0) > 0 && (
            <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20 animate-bounce flex items-center gap-1.5 pointer-events-none">
              <span>🌸</span>
              <span>{progress?.stats?.dueReviewCount} thẻ SRS cần ôn!</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
            aria-label="Mở trợ lý AI Kawaii Sensei"
            className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_8px_30px_rgba(225,29,72,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/50 ${
              isOpen
                ? "bg-slate-900 text-white rotate-90"
                : "bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 p-[2.5px]"
            }`}
          >
            {isOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900 p-0.5">
                <Image
                  src={currentPortrait}
                  alt="Kawaii Sensei"
                  fill
                  className="object-cover object-top rounded-full group-hover:scale-110 transition-transform duration-300"
                  sizes="64px"
                />
                {/* Active pulsating pulse indicator */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
            )}
          </button>
        </aside>
      )}

      {/* ================= FLOATING SENSEI ASSISTANT PANEL ================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kawaii Sensei Learning Assistant"
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[min(410px,calc(100vw-2rem))] h-[min(600px,calc(100dvh-7rem))] flex flex-col rounded-3xl bg-white/95 dark:bg-sumi-900/95 border border-red-200/60 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden shadow-sm shrink-0 bg-white">
                <Image
                  src={currentPortrait}
                  alt="Sensei"
                  fill
                  className="object-cover object-top"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm tracking-wide">
                    {character === "aoi" ? "Aoi Sensei 🌸" : "Ren Sensei 🦊"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCharacter(character === "aoi" ? "ren" : "aoi")}
                    className="text-[10px] bg-white/20 hover:bg-white/30 px-1.5 py-0.5 rounded font-bold transition"
                    title="Đổi nhân vật Sensei"
                  >
                    ⇄ Đổi
                  </button>
                </div>
                <p className="text-[11px] opacity-90 leading-tight">
                  {nativeLanguage === "en" ? "Personal Learning Assistant" : "Trợ lý học tập thông minh"}
                </p>
              </div>
            </div>

            {/* Language Switcher & Controls */}
            <div className="flex items-center gap-1.5">
              {/* Native Language Toggle */}
              <div className="flex bg-black/20 rounded-full p-0.5 border border-white/20">
                <button
                  type="button"
                  onClick={() => setNativeLanguage("vi")}
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full transition ${
                    nativeLanguage === "vi" ? "bg-white text-red-600 shadow-sm" : "text-white/80 hover:text-white"
                  }`}
                  title="Ngôn ngữ mẹ đẻ: Tiếng Việt"
                >
                  🇻🇳 VI
                </button>
                <button
                  type="button"
                  onClick={() => setNativeLanguage("en")}
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full transition ${
                    nativeLanguage === "en" ? "bg-white text-red-600 shadow-sm" : "text-white/80 hover:text-white"
                  }`}
                  title="Native Language: English"
                >
                  🇬🇧 EN
                </button>
              </div>

              <Link
                href="/app/sensei"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
                title="Mở toàn màn hình"
              >
                ⤢
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white font-bold transition"
                title="Thu nhỏ"
              >
                ✕
              </button>
            </div>
          </div>

          {/* User Progress Glance Strip */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-sumi-950/70 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">🎯</span>
              <span>{progress?.learningLevel || "N5"} (Lv {progress?.level || 1})</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🔥</span>
              <span>{progress?.currentStreak ?? 0} ngày</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-rose-500">⏰</span>
              <span>{(progress?.stats?.dueReviewCount ?? 0) > 0 ? `${progress?.stats?.dueReviewCount} thẻ SRS` : "0 thẻ nợ"}</span>
            </span>
            <button
              type="button"
              onClick={handleSendReminderEmail}
              className="text-[10px] text-red-600 hover:text-red-700 dark:text-red-400 font-extrabold flex items-center gap-0.5"
              title="Gửi email nhắc nhở học tập ngay"
            >
              <span>📧</span>
              <span>Gửi mail</span>
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-slate-100/50 dark:bg-sumi-900/50 border-b border-slate-200/50 dark:border-slate-800/50 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => handleQuickAction("recommend")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-sumi-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-red-400 font-semibold transition active:scale-95"
            >
              🎯 {nativeLanguage === "en" ? "Study Advice" : "Hôm nay học gì?"}
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction("srs")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-sumi-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-red-400 font-semibold transition active:scale-95"
            >
              ⏰ {nativeLanguage === "en" ? "Check SRS" : "Kiểm tra thẻ SRS"}
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction("grammar")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-sumi-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-red-400 font-semibold transition active:scale-95"
            >
              💡 {nativeLanguage === "en" ? "Grammar" : "Ngữ pháp"}
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction("conversation")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-sumi-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-red-400 font-semibold transition active:scale-95"
            >
              🗣️ {nativeLanguage === "en" ? "Chat" : "Luyện phản xạ"}
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-sm">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {!isUser && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-200 dark:border-slate-700 bg-white">
                      <Image
                        src={currentPortrait}
                        alt="Sensei"
                        fill
                        className="object-cover object-top"
                        sizes="28px"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm text-[13px] leading-relaxed ${
                      isUser
                        ? "bg-red-600 text-white rounded-tr-none font-medium"
                        : "bg-slate-100 dark:bg-sumi-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60 whitespace-pre-wrap"
                    }`}
                  >
                    <div>{m.content}</div>

                    {!isUser && (
                      <div className="mt-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                        <button
                          type="button"
                          onClick={() => {
                            const jaPart = m.content.split("\n\n*")[0] || m.content;
                            speak(jaPart);
                          }}
                          className="hover:text-red-500 font-bold flex items-center gap-1 transition"
                          title="Nghe phát âm tiếng Nhật"
                        >
                          <span>🔊</span>
                          <span>Nghe đọc</span>
                        </button>
                        <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                  <Image src={currentPortrait} alt="" fill className="object-cover" sizes="24px" />
                </div>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-sumi-800 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-75" />
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-150" />
                  <span className="text-[11px] font-bold ml-1 text-slate-500">Sensei đang suy nghĩ...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-slate-50 dark:bg-sumi-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                nativeLanguage === "en"
                  ? "Ask Sensei about lessons, grammar, tips..."
                  : "Hỏi Sensei về bài học, từ vựng hoặc xin gợi ý..."
              }
              className="flex-1 bg-white dark:bg-sumi-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-red-400 transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-sm shadow-md transition active:scale-95"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

