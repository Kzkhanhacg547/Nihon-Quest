"use client";

import { useMemo, useState } from "react";
import { Modal } from "@/components/ui";
import { KanaWriter } from "@/components/KanaWriter";
import { useSoundAndTheme } from "@/components/SoundAndThemeContext";
import { useNativeLanguage } from "@/components/LanguageContext";
import { IcoArrow, IcoSpeaker } from "@/components/LearnIcons";
import type { KanaRow } from "./KanaLab";

type Tab = "HIRAGANA" | "KATAKANA" | "DAKUTEN" | "COMBO";

const MAIN: { id: Tab; label: string }[] = [
  { id: "HIRAGANA", label: "Hiragana" },
  { id: "KATAKANA", label: "Katakana" },
];
const EXTRA: { id: Tab; labelKey: string; fallback: string }[] = [
  { id: "DAKUTEN", labelKey: "tabDakutenLabel", fallback: "Biến âm が・ぱ" },
  { id: "COMBO", labelKey: "tabComboLabel", fallback: "Âm ghép きゃ" },
];
const LABEL: Record<Tab, string> = { HIRAGANA: "Hiragana", KATAKANA: "Katakana", DAKUTEN: "Biến âm", COMBO: "Âm ghép Yōon" };
const BLURB: Record<Tab, string> = {
  HIRAGANA: "Bắt đầu từ những điều cơ bản nhất.",
  KATAKANA: "Dùng cho từ mượn và tên nước ngoài.",
  DAKUTEN: "Thêm dấu ゛ ゜ để đổi âm.",
  COMBO: "Ghép chữ lớn với ゃ ゅ ょ nhỏ.",
};

const ROWS: Record<Tab, string[]> = {
  HIRAGANA: ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"],
  KATAKANA: ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"],
  DAKUTEN: ["ga", "za", "da", "ba", "pa"],
  COMBO: ["kya", "sha", "cha", "nya", "hya", "mya", "rya", "gya", "ja", "bya", "pya"],
};
const COLS: Record<Tab, string[]> = {
  HIRAGANA: ["a", "i", "u", "e", "o"],
  KATAKANA: ["a", "i", "u", "e", "o"],
  DAKUTEN: ["a", "i", "u", "e", "o"],
  COMBO: ["a", "u", "o"],
};

function pickSamples(kana: KanaRow[], tab: Tab): KanaRow[] {
  const size = tab === "COMBO" ? 9 : 10; // 5x2 như thiết kế, âm ghép 3x3
  const pool = kana.filter((k) => {
    if (tab === "COMBO") return k.kind === "COMBO";
    if (tab === "DAKUTEN") return (k.kind === "DAKUTEN" || k.kind === "HANDAKUTEN") && k.script === "HIRAGANA";
    return k.script === tab && k.kind === "BASIC";
  });
  const out: KanaRow[] = [];
  for (const rowKey of ROWS[tab]) {
    for (const colKey of COLS[tab]) {
      const hit = rowKey === "n" ? pool.find((k) => k.row === "n") : pool.find((k) => k.row === rowKey && k.column === colKey);
      if (hit && !out.includes(hit)) out.push(hit);
    }
    if (out.length >= size) break;
  }
  return out.slice(0, size);
}

export function LearnKanaPanel({ kana, practiced }: { kana: KanaRow[]; practiced: string[] }) {
  const [tab, setTab] = useState<Tab>("HIRAGANA");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [writing, setWriting] = useState(false);
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set(practiced));
  const { playClick, speak } = useSoundAndTheme();
  const { t } = useNativeLanguage();

  const samples = useMemo(() => pickSamples(kana, tab), [kana, tab]);
  const selected = samples.find((k) => k.id === selectedId) ?? samples[0] ?? null;
  const cols = COLS[tab].length;

  const pick = (id: Tab) => {
    playClick();
    setTab(id);
    setSelectedId(null);
  };
  const tabBtn = (id: Tab, label: string, cls: string) => (
    <button key={id} type="button" aria-pressed={tab === id} className={`${cls} ${tab === id ? "is-active" : ""}`} onClick={() => pick(id)}>
      {label}
    </button>
  );

  return (
    <div className="lp-pane" data-reveal>
      <div className="lp-title">
        <span className="lp-title-ico t-red jp-text">あ</span>
        <div>
          <h2>{t("learnKanaPanelTitle")}</h2>
          <p>{t("learnKanaPanelDesc")}</p>
        </div>
      </div>

      <div role="group" aria-label="Chọn bảng kana">
        <div className="lp-tabs">{MAIN.map((item) => tabBtn(item.id, item.label, "lp-tab"))}</div>
        <div className="lp-subtabs">{EXTRA.map((item) => tabBtn(item.id, t(item.labelKey) || item.fallback, "lp-subtab"))}</div>
      </div>

      <div className="lp-kana-grid" data-cols={cols}>
        {samples.map((k) => (
          <button
            key={k.id}
            type="button"
            className={`lp-kana-cell ${Array.from(k.character).length > 1 ? "is-combo" : ""} ${selected?.id === k.id ? "is-active" : ""} ${doneSet.has(`${k.script}:${k.character}`) ? "is-done" : ""}`}
            onClick={() => {
              setSelectedId(k.id);
              speak(k.character);
            }}
            aria-pressed={selected?.id === k.id}
            aria-label={`${k.character} (${k.romaji})`}
          >
            <b className="jp-text">{k.character}</b>
            <small>{k.romaji}</small>
          </button>
        ))}
      </div>

      <a href="#kana-full" className="lp-more">{t("viewFullKanaTable")} {LABEL[tab]} <IcoArrow width={12} height={12} /></a>

      {selected && (
        <div className="lp-preview">
          <div className="lp-preview-glyph jp-text" aria-hidden="true" data-long={Array.from(selected.character).length > 1}>
            {selected.character}
          </div>
          <div className="lp-preview-copy">
            <b>{LABEL[tab]}</b>
            <span className="lp-preview-romaji">{selected.character} · /{selected.romaji}/</span>
            <small>{BLURB[tab]}</small>
            <div className="lp-preview-actions">
              <button type="button" className="lp-btn-red lp-btn-sm" onClick={() => { playClick(); setWriting(true); }}>
                {t("practiceWritingKana")} <IcoArrow width={13} height={13} />
              </button>
              <button type="button" className="lp-speaker" onClick={() => speak(selected.character)} aria-label={t("listenPronunciation")}>
                <IcoSpeaker width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {writing && selected && (
        <Modal isOpen onClose={() => setWriting(false)} title={`${t("practiceWritingKana")} — ${selected.character}`} maxWidth="2xl" closeOnBackdrop={false}>
          <KanaWriter
            key={selected.id}
            character={selected.character}
            romaji={selected.romaji}
            script={selected.script}
            onPass={() => setDoneSet((prev) => new Set(prev).add(`${selected.script}:${selected.character}`))}
            onClose={() => setWriting(false)}
          />
        </Modal>
      )}
    </div>
  );
}
