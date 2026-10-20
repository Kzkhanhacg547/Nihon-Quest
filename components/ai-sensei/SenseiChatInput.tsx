"use client";

import type { RefObject } from "react";
import { useNativeLanguage } from "@/components/LanguageContext";
import { MicIcon, SendIcon, StopIcon } from "./SenseiIcons";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onToggleMic: () => void;
  isListening: boolean;
  loading: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null> | React.RefObject<HTMLInputElement> | any;
}

export function SenseiChatInput({ value, onChange, onSend, onToggleMic, isListening, loading, inputRef }: Props) {
  const { t, nativeLanguage } = useNativeLanguage();
  const isZh = nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW";
  const isEn = nativeLanguage === "en";

  const listeningHint = isZh
    ? "正在倾听… 再次点击麦克风停止"
    : isEn
    ? "Listening… Click mic to stop"
    : "Đang nghe… nhấn mic để dừng";

  const placeholderText = isListening
    ? isZh
      ? "正在聆听日语语音输入…"
      : isEn
      ? "Listening for Japanese speech…"
      : "Đang lắng nghe giọng nói tiếng Nhật…"
    : isZh
    ? "输入日语句子或点击麦克风说话…"
    : isEn
    ? "Type Japanese sentence or tap mic to speak…"
    : "Nhập câu tiếng Nhật hoặc bấm mic để nói…";

  const micTitle = isListening
    ? isZh
      ? "正在录音… 点击停止"
      : isEn
      ? "Recording… Click to stop"
      : "Đang thu âm… Nhấn để dừng"
    : isZh
    ? "点击使用麦克风说日语"
    : isEn
    ? "Click to speak Japanese (Microphone)"
    : "Nhấn để nói tiếng Nhật (Micro)";

  const sendLabel = isZh ? "发送" : isEn ? "Send" : "Gửi";

  return (
    <div className="ais-composer">
      <div className="ais-composer-hint" aria-live="polite">
        {isListening ? (
          <span className="ais-hint-live">
            <span className="ais-wave" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            {listeningHint}
          </span>
        ) : (
          <span className="ais-hint-keys">
            <kbd>Enter</kbd> {isZh ? "发送" : isEn ? "to send" : "để gửi"}
          </span>
        )}
      </div>

      <div className="ais-composer-box">
        <button
          type="button"
          className={`ais-mic${isListening ? " is-on" : ""}`}
          onClick={onToggleMic}
          aria-pressed={isListening}
          aria-label={isListening ? micTitle : micTitle}
          title={micTitle}
        >
          {isListening ? <StopIcon /> : <MicIcon />}
        </button>

        <input
          ref={inputRef}
          type="text"
          className="ais-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // Không gửi khi đang chọn chữ bằng bộ gõ tiếng Nhật (Enter dùng để xác nhận chữ).
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder={placeholderText}
          aria-label={isZh ? "您的回答" : isEn ? "Your reply" : "Câu trả lời của bạn"}
          enterKeyHint="send"
          autoComplete="off"
        />

        <button type="button" className="ais-send" onClick={onSend} disabled={!value.trim() || loading}>
          <span className="ais-send-label">{sendLabel}</span>
          <SendIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
