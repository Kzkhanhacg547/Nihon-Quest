"use client";

import { useState, useEffect, useMemo } from "react";
import type { NativeLanguage } from "@/components/LanguageContext";
import type { KanjiRadicalItem } from "@/lib/kanji-radicals-data";
import type { JouyouKanjiItem } from "@/lib/jouyou-kanji-data";

// In-memory cache for translations
const memoryCache = new Map<string, string>();

/**
 * Standard Chinese names for the 214 Kangxi Radicals (部首)
 */
export const CHINESE_RADICAL_NAMES: Record<number, { zh: string; pinyin: string }> = {
  1: { zh: "一字旁 (一)", pinyin: "yī" },
  2: { zh: "竖 (丨)", pinyin: "shù" },
  3: { zh: "点 (丶)", pinyin: "diǎn" },
  4: { zh: "撇 (丿)", pinyin: "piě" },
  5: { zh: "乙字旁 (乙)", pinyin: "yǐ" },
  6: { zh: "竖钩 (亅)", pinyin: "shù gōu" },
  7: { zh: "二字旁 (二)", pinyin: "èr" },
  8: { zh: "头 (亠)", pinyin: "tóu" },
  9: { zh: "单人旁 (人/亻)", pinyin: "dān rén páng" },
  10: { zh: "儿字旁 (儿)", pinyin: "ér" },
  11: { zh: "入字旁 (入)", pinyin: "rù" },
  12: { zh: "八字旁 (八)", pinyin: "bā" },
  13: { zh: "同字框 (冂)", pinyin: "tóng zì kuāng" },
  14: { zh: "秃宝盖 (冖)", pinyin: "tū bǎo gài" },
  15: { zh: "两点水 (冫)", pinyin: "liǎng diǎn shuǐ" },
  16: { zh: "几字旁 (几)", pinyin: "jī" },
  17: { zh: "凶字框 (凵)", pinyin: "xiōng zì kuāng" },
  18: { zh: "利刀旁 (刀/刂)", pinyin: "lì dāo páng" },
  19: { zh: "力字旁 (力)", pinyin: "lì" },
  20: { zh: "包字头 (勹)", pinyin: "bāo zì tóu" },
  21: { zh: "匕字旁 (匕)", pinyin: "bǐ" },
  22: { zh: "三匡栏 (匚)", pinyin: "sān kuāng lán" },
  23: { zh: "区字框 (匸)", pinyin: "qū zì kuāng" },
  24: { zh: "十字旁 (十)", pinyin: "shí" },
  25: { zh: "卜字旁 (卜)", pinyin: "bǔ" },
  26: { zh: "单耳旁 (卩)", pinyin: "dān ěr páng" },
  27: { zh: "厂字旁 (厂)", pinyin: "chǎng" },
  28: { zh: "私字旁 (厶)", pinyin: "sī" },
  29: { zh: "又字旁 (又)", pinyin: "yòu" },
  30: { zh: "口字旁 (口)", pinyin: "kǒu" },
  31: { zh: "大口框 (囗)", pinyin: "dà kǒu kuāng" },
  32: { zh: "提土旁 (土)", pinyin: "tí tǔ páng" },
  33: { zh: "士字旁 (士)", pinyin: "shì" },
  34: { zh: "折文 (夂)", pinyin: "zhé wén" },
  35: { zh: "反文 (夊)", pinyin: "fǎn wén" },
  36: { zh: "夕字旁 (夕)", pinyin: "xī" },
  37: { zh: "大字旁 (大)", pinyin: "dà" },
  38: { zh: "女字旁 (女)", pinyin: "nǚ" },
  39: { zh: "子字旁 (子)", pinyin: "zǐ" },
  40: { zh: "宝盖头 (宀)", pinyin: "bǎo gài tóu" },
  41: { zh: "寸字旁 (寸)", pinyin: "cùn" },
  42: { zh: "小字旁 (小)", pinyin: "xiǎo" },
  43: { zh: "尣字旁 (尣)", pinyin: "wāng" },
  44: { zh: "尸字头 (尸)", pinyin: "shī zì tóu" },
  45: { zh: "屮字旁 (屮)", pinyin: "chè" },
  46: { zh: "山字旁 (山)", pinyin: "shān" },
  47: { zh: "川字旁 (川/巛)", pinyin: "chuān" },
  48: { zh: "工字旁 (工)", pinyin: "gōng" },
  49: { zh: "己字旁 (己)", pinyin: "jǐ" },
  50: { zh: "巾字旁 (巾)", pinyin: "jīn" },
  51: { zh: "干字旁 (干)", pinyin: "gān" },
  52: { zh: "幺字旁 (幺)", pinyin: "yāo" },
  53: { zh: "广字旁 (广)", pinyin: "guǎng" },
  54: { zh: "廴字旁 (廴)", pinyin: "yǐn" },
  55: { zh: "弄字底 (廾)", pinyin: "gǒng" },
  56: { zh: "弋字旁 (弋)", pinyin: "yì" },
  57: { zh: "弓字旁 (弓)", pinyin: "gōng" },
  58: { zh: "当字头 (彐)", pinyin: "jì" },
  59: { zh: "三撇 (彡)", pinyin: "sān piě" },
  60: { zh: "双人旁 (彳)", pinyin: "shuāng rén páng" },
  61: { zh: "竖心旁 (心/忄)", pinyin: "shù xīn páng" },
  62: { zh: "戈字旁 (戈)", pinyin: "gē" },
  63: { zh: "户字头 (户)", pinyin: "hù" },
  64: { zh: "提手旁 (手/扌)", pinyin: "tí shǒu páng" },
  65: { zh: "支字旁 (支)", pinyin: "zhī" },
  66: { zh: "反文旁 (攴/攵)", pinyin: "fǎn wén páng" },
  67: { zh: "文字旁 (文)", pinyin: "wén" },
  68: { zh: "斗字旁 (斗)", pinyin: "dǒu" },
  69: { zh: "斤字旁 (斤)", pinyin: "jīn" },
  70: { zh: "方字旁 (方)", pinyin: "fāng" },
  71: { zh: "无字旁 (无)", pinyin: "wú" },
  72: { zh: "日字旁 (日)", pinyin: "rì" },
  73: { zh: "曰字旁 (曰)", pinyin: "yuē" },
  74: { zh: "月字旁 (月)", pinyin: "yuè" },
  75: { zh: "木字旁 (木)", pinyin: "mù" },
  76: { zh: "欠字旁 (欠)", pinyin: "qiàn" },
  77: { zh: "止字旁 (止)", pinyin: "zhǐ" },
  78: { zh: "歹字旁 (歹)", pinyin: "dǎi" },
  79: { zh: "殳字旁 (殳)", pinyin: "shū" },
  80: { zh: "毋字旁 (毋)", pinyin: "wú" },
  81: { zh: "比字旁 (比)", pinyin: "bǐ" },
  82: { zh: "毛字旁 (毛)", pinyin: "máo" },
  83: { zh: "氏字旁 (氏)", pinyin: "shì" },
  84: { zh: "气字头 (气)", pinyin: "qì" },
  85: { zh: "三点水 (水/氵)", pinyin: "sān diǎn shuǐ" },
  86: { zh: "四点底 (火/灬)", pinyin: "sì diǎn dǐ" },
  87: { zh: "抓字头 (爪)", pinyin: "zhuǎ" },
  88: { zh: "父字旁 (父)", pinyin: "fù" },
  89: { zh: "爻字旁 (爻)", pinyin: "yáo" },
  90: { zh: "爿字旁 (爿)", pinyin: "qiáng" },
  91: { zh: "片字旁 (片)", pinyin: "piàn" },
  92: { zh: "牙字旁 (牙)", pinyin: "yá" },
  93: { zh: "牛字旁 (牛/牜)", pinyin: "niú" },
  94: { zh: "反犬旁 (犬/犭)", pinyin: "fǎn quǎn páng" },
  95: { zh: "玄字旁 (玄)", pinyin: "xuán" },
  96: { zh: "王字旁 (玉/王)", pinyin: "wáng" },
  102: { zh: "田字旁 (田)", pinyin: "tián" },
  104: { zh: "病字旁 (疒)", pinyin: "bìng" },
  106: { zh: "白字旁 (白)", pinyin: "bái" },
  109: { zh: "目字旁 (目)", pinyin: "mù" },
  112: { zh: "石字旁 (石)", pinyin: "shí" },
  113: { zh: "示字旁 (示/礻)", pinyin: "shì" },
  115: { zh: "禾木旁 (禾)", pinyin: "hé" },
  116: { zh: "穴字头 (穴)", pinyin: "xué" },
  118: { zh: "竹字头 (竹/⺮)", pinyin: "zhú" },
  120: { zh: "绞丝旁 (糸/糹)", pinyin: "jiǎo sī páng" },
  130: { zh: "月字旁 (肉/⺼)", pinyin: "ròu" },
  140: { zh: "草字头 (艸/艹)", pinyin: "cǎo zì tóu" },
  142: { zh: "虫字旁 (虫)", pinyin: "chóng" },
  145: { zh: "衣字旁 (衣/衤)", pinyin: "yī" },
  149: { zh: "言字旁 (言/訁)", pinyin: "yán" },
  154: { zh: "贝字旁 (貝/贝)", pinyin: "bèi" },
  157: { zh: "足字旁 (足/𧾷)", pinyin: "zú" },
  159: { zh: "车字旁 (車/车)", pinyin: "chē" },
  162: { zh: "走之底 (辵/⻌)", pinyin: "zǒu zhī dǐ" },
  163: { zh: "右耳旁 (邑/阝)", pinyin: "yòu ěr páng" },
  167: { zh: "金字旁 (金/钅)", pinyin: "jīn" },
  169: { zh: "门字框 (門/门)", pinyin: "mén" },
  170: { zh: "左耳旁 (阜/阝)", pinyin: "zuǒ ěr páng" },
  173: { zh: "雨字头 (雨)", pinyin: "yǔ" },
  181: { zh: "页字旁 (頁/页)", pinyin: "yè" },
  184: { zh: "食字旁 (食/飠)", pinyin: "shí" },
};

/**
 * Hook to translate an array of English strings into the user's native language.
 * Uses localStorage cache and fast server batch endpoint.
 */
export function useBatchTranslation(
  englishTexts: string[],
  nativeLanguage: NativeLanguage,
  sourceLang: string = "en"
) {
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // If language is English or Vietnamese, we don't need remote translation
    if (nativeLanguage === "en" || nativeLanguage === "vi") {
      return;
    }

    const missingTexts: string[] = [];
    const currentResolved: Record<string, string> = {};

    for (const text of englishTexts) {
      if (!text || !text.trim()) continue;
      const cacheKey = `${nativeLanguage}:${sourceLang}:${text.trim().toLowerCase()}`;

      if (memoryCache.has(cacheKey)) {
        currentResolved[text] = memoryCache.get(cacheKey)!;
      } else {
        try {
          const ls = localStorage.getItem(`nq_tr_${cacheKey}`);
          if (ls) {
            memoryCache.set(cacheKey, ls);
            currentResolved[text] = ls;
            continue;
          }
        } catch {}
        missingTexts.push(text);
      }
    }

    if (Object.keys(currentResolved).length > 0) {
      setTranslations((prev) => ({ ...prev, ...currentResolved }));
    }

    if (missingTexts.length === 0) return;

    let isSubscribed = true;

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        texts: missingTexts,
        targetLang: nativeLanguage,
        sourceLang,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!isSubscribed || !data.translations) return;
        const newResolved: Record<string, string> = {};

        for (const [orig, tr] of Object.entries(data.translations as Record<string, string>)) {
          if (tr && typeof tr === "string") {
            const cacheKey = `${nativeLanguage}:${sourceLang}:${orig.trim().toLowerCase()}`;
            memoryCache.set(cacheKey, tr);
            try {
              localStorage.setItem(`nq_tr_${cacheKey}`, tr);
            } catch {}
            newResolved[orig] = tr;
          }
        }

        setTranslations((prev) => ({ ...prev, ...newResolved }));
      })
      .catch(() => {
        // Fallback silently
      });

    return () => {
      isSubscribed = false;
    };
  }, [englishTexts, nativeLanguage, sourceLang]);

  return translations;
}

/**
 * Format localized radical display
 */
export function getLocalizedRadicalInfo(
  radical: KanjiRadicalItem,
  nativeLanguage: NativeLanguage,
  translationMap?: Record<string, string>
) {
  let meaning = radical.meaningVi;
  let subText = radical.hanViet;

  if (nativeLanguage === "vi") {
    meaning = radical.meaningVi;
    subText = radical.hanViet;
  } else if (nativeLanguage === "en") {
    meaning = radical.meaningEn || radical.meaningVi;
    subText = `${radical.jaName} (${radical.romaji})`;
  } else if (nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW") {
    const zhInfo = CHINESE_RADICAL_NAMES[radical.num];
    if (zhInfo) {
      meaning = zhInfo.zh;
      subText = zhInfo.pinyin;
    } else {
      meaning = radical.meaningEn;
      subText = radical.hanViet;
    }
  } else {
    // Other mother tongues: use batch translation or fallback to English
    const tr = translationMap?.[radical.meaningEn];
    meaning = tr || radical.meaningEn || radical.meaningVi;
    subText = `${radical.jaName} (${radical.romaji})`;
  }

  return { meaning, subText };
}

/**
 * Format localized Jouyou Kanji display
 */
export function getLocalizedJouyouInfo(
  kanji: JouyouKanjiItem,
  nativeLanguage: NativeLanguage,
  translationMap?: Record<string, string>
) {
  let meaning = kanji.meaningVi;
  let subText = kanji.hanViet;

  if (nativeLanguage === "vi") {
    meaning = kanji.meaningVi || kanji.meaningEn;
    subText = kanji.hanViet;
  } else if (nativeLanguage === "en") {
    meaning = kanji.meaningEn || kanji.meaningVi;
    subText = kanji.onyomi[0] || kanji.kunyomi[0] || kanji.hanViet;
  } else if (nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW") {
    // In Chinese, the character is self-explanatory, show readings & English/meaning
    meaning = kanji.meaningEn;
    subText = kanji.onyomi[0] || kanji.character;
  } else {
    // Other mother tongues (es, fr, de, ko, id, th, ru, pt)
    const tr = translationMap?.[kanji.meaningEn];
    meaning = tr || kanji.meaningEn || kanji.meaningVi;
    subText = kanji.onyomi[0] || kanji.kunyomi[0] || kanji.hanViet;
  }

  return { meaning, subText };
}

