"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/ui";
import { useNativeLanguage } from "@/components/LanguageContext";
import type { KaiwaScenario } from "@/lib/n3KaiwaScenarios";
import { SenseiMessage } from "./SenseiMessage";
import type { SenseiMessageData } from "./types";

interface Props {
  scenario: KaiwaScenario;
  messages: SenseiMessageData[];
  loading: boolean;
  showFurigana: boolean;
  showRomaji: boolean;
  showTranslations: boolean;
  onSpeak: (text: string) => void;
  onRestart: () => void;
  /** Gợi ý đối đáp + ô nhập, đặt dưới vùng tin nhắn. */
  children: ReactNode;
}

export function SenseiChat({
  scenario,
  messages,
  loading,
  showFurigana,
  showRomaji,
  showTranslations,
  onSpeak,
  onRestart,
  children,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const { nativeLanguage } = useNativeLanguage();
  const isZh = nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW";
  const isEn = nativeLanguage === "en";

  const restartLabel = isZh ? "重新开始" : isEn ? "Restart" : "Bắt đầu lại";
  const typingLabel = isZh ? "Sensei 正在构思回复…" : isEn ? "Sensei is typing a response…" : "Sensei đang soạn câu trả lời…";

  // Cuộn bên trong khung chat. Không dùng scrollIntoView vì nó kéo cả trang.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, loading]);

  return (
    <section className="ais-chat" aria-label={isZh ? "与 Aoi Sensei 的日语对话" : isEn ? "Conversation with Aoi Sensei" : "Cuộc trò chuyện với Aoi Sensei"}>
      <div className="ais-chat-head">
        <div className="ais-chat-topic">
          <span className="ais-chat-ico" aria-hidden>
            {scenario.icon}
          </span>
          <div className="ais-chat-titles">
            <h2 className="ais-chat-title">{scenario.title}</h2>
            <p className="ais-chat-sub font-jp">{scenario.titleJa}</p>
          </div>
        </div>
        <div className="ais-chat-tools">
          <span className="ais-chip ais-chip--red ais-chat-badge">{scenario.badge}</span>
          <button type="button" className="ais-ghost" onClick={onRestart}>
            <Icon name="refresh" className="h-4 w-4" />
            <span>{restartLabel}</span>
          </button>
        </div>
      </div>

      <div ref={listRef} className="ais-messages" role="log" aria-live="polite" aria-label={isZh ? "消息列表" : isEn ? "Messages" : "Tin nhắn"}>
        {messages.map((msg) => (
          <SenseiMessage
            key={msg.id}
            msg={msg}
            showFurigana={showFurigana}
            showRomaji={showRomaji}
            showTranslations={showTranslations}
            onSpeak={onSpeak}
          />
        ))}

        {loading && (
          <div className="ais-msg is-sensei" role="status">
            <span className="ais-msg-avatar font-jp" aria-hidden>
              葵
            </span>
            <div className="ais-bubble ais-typing">
              <span className="ais-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span>{typingLabel}</span>
            </div>
          </div>
        )}
      </div>

      {children}
    </section>
  );
}
