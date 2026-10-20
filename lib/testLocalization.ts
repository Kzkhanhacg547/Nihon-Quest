/**
 * Dynamic Test & Assessment Localization Engine
 *
 * Localizes JLPT placement, milestone, FPT curricula, and mock exams across all 12 supported locales:
 * vi, en, zh-CN, zh-TW, ko, es, fr, de, id, th, ru, pt.
 */

import React, { useState, useEffect } from "react";
import type { NativeLanguage } from "@/components/LanguageContext";
import { useNativeLanguage } from "@/components/LanguageContext";
import type { DynamicExamDto } from "./test-assessment";

export interface LocalizedExamMeta {
  title: string;
  kindLabel: string;
  description: string;
  badge: string;
}

export const TEST_MODE_LOCALIZATION: Record<string, Partial<Record<NativeLanguage, LocalizedExamMeta>>> = {
  DIAGNOSTIC: {
    en: {
      title: "4-Skill Placement Test",
      kindLabel: "Placement Test",
      description: "Classifies your proficiency from N5 to N3 across 4 skills: Conversation listening, reading in context, sentence writing, and reflex speaking.",
      badge: "4-Skill Placement",
    },
    "zh-CN": {
      title: "四项技能入学分班评测 (Placement Test)",
      kindLabel: "入学分班测评",
      description: "通过听力对话、语境阅读、句子书写及口语应答四项技能，精准定级 N5 → N3。",
      badge: "四项全能入学评测",
    },
    "zh-TW": {
      title: "四項技能入學分班評測 (Placement Test)",
      kindLabel: "入學分班測評",
      description: "透過聽力對話、語境閱讀、句子書寫及口語應答四項技能，精準定級 N5 → N3。",
      badge: "四項全能入學評測",
    },
    ko: {
      title: "4대 영역 진단 평가 (Placement Test)",
      kindLabel: "배치 평가",
      description: "회화 듣기, 문맥 독해, 문장 쓰기, 말하기 순발력 4가지 영역을 통해 N5에서 N3까지의 실력을 진단합니다.",
      badge: "4대 영역 진단",
    },
    es: {
      title: "Prueba de Nivel de 4 Habilidades",
      kindLabel: "Evaluación inicial",
      description: "Clasifica tu nivel de N5 a N3 en 4 destrezas: comprensión auditiva, lectura en contexto, redacción de oraciones y expresión oral.",
      badge: "Diagnóstico 4 Habilidades",
    },
    fr: {
      title: "Test de Positionnement 4 Compétences",
      kindLabel: "Évaluation initiale",
      description: "Évalue votre niveau de N5 à N3 à travers 4 compétences : écoute de dialogues, lecture en contexte, écriture et expression orale.",
      badge: "Positionnement 4 Compétences",
    },
    de: {
      title: "Einstufungstest mit 4 Fertigkeiten",
      kindLabel: "Einstufungstest",
      description: "Ermittelt Ihr Niveau von N5 bis N3 in 4 Fertigkeiten: Hörverstehen, Leseverstehen, Satzbau und mündliche Reaktion.",
      badge: "4-Fertigkeiten-Einstufung",
    },
    id: {
      title: "Tes Penempatan 4 Keterampilan",
      kindLabel: "Tes Penempatan",
      description: "Menentukan tingkat kemahiran Anda dari N5 hingga N3 melalui 4 keterampilan: mendengarkan, membaca, menulis kalimat, dan berbicara.",
      badge: "Penempatan 4 Keterampilan",
    },
    th: {
      title: "แบบทดสอบวัดระดับ 4 ทักษะ (Placement Test)",
      kindLabel: "การวัดระดับแรกเข้า",
      description: "ประเมินระดับตั้งแต่ N5 ถึง N3 ครอบคลุม 4 ทักษะ: ฟังบทสนทนา, อ่านจับใจความ, เขียนประโยค และการพูดโต้ตอบ",
      badge: "วัดระดับ 4 ทักษะ",
    },
    ru: {
      title: "Вступительный тест 4 навыков (Placement Test)",
      kindLabel: "Оценка уровня",
      description: "Определяет ваш уровень от N5 до N3 по 4 ключевым навыкам: аудирование, чтение, письмо и устная речь.",
      badge: "Оценка 4 навыков",
    },
    pt: {
      title: "Teste de Nivelamento de 4 Habilidades",
      kindLabel: "Avaliação inicial",
      description: "Classifica sua proficiência de N5 a N3 em 4 habilidades: audição, leitura contextual, escrita e conversação.",
      badge: "Nivelamento 4 Habilidades",
    },
  },
  N5_FULL: {
    en: {
      title: "JLPT N5 Milestone Assessment",
      kindLabel: "Milestone Test",
      description: "Tests completion criteria for N5: Train station/konbini listening, public notices, beginner sentence writing & self-introduction.",
      badge: "N5 Milestone",
    },
    "zh-CN": {
      title: "JLPT N5 阶段能力结业测评",
      kindLabel: "阶段测评",
      description: "考察 N5 结业核心：车站及便利店听力、告示阅读、初级句型书写与自我介绍。",
      badge: "N5 阶段通关",
    },
    "zh-TW": {
      title: "JLPT N5 階段能力結業測評",
      kindLabel: "階段測評",
      description: "考察 N5 結業核心：車站及便利店聽力、告示閱讀、初級句型書寫與自我介紹。",
      badge: "N5 階段通關",
    },
    ko: {
      title: "JLPT N5 종합 실력 평가",
      kindLabel: "단계별 평가",
      description: "N5 완성 요건 평가: 역·편의점 듣기, 안내문 독해, 초급 문장 쓰기 및 자기소개.",
      badge: "N5 단계 달성",
    },
    es: {
      title: "Evaluación de Nivel JLPT N5",
      kindLabel: "Prueba de etapa",
      description: "Evalúa los requisitos de N5: audios en estación/tienda, lectura de avisos, escritura básica y autopresentación.",
      badge: "Hito N5",
    },
    fr: {
      title: "Évaluation de Niveau JLPT N5",
      kindLabel: "Test d'étape",
      description: "Vérifie les critères du N5 : écoute gare/konbini, lecture d'avis, écriture de phrases de base et présentation personnelle.",
      badge: "Étape N5",
    },
    de: {
      title: "JLPT N5 Zwischenprüfung",
      kindLabel: "Etappenprüfung",
      description: "Prüft die N5-Kriterien: Bahnhof/Konbini-Hören, Aushänge lesen, einfache Sätze schreiben & Selbstvorstellung.",
      badge: "N5-Etappe",
    },
    id: {
      title: "Ujian Tahap Kemampuan JLPT N5",
      kindLabel: "Ujian Tahap",
      description: "Menguji kriteria kelulusan N5: mendengar di stasiun/minimarket, membaca pengumuman, menulis kalimat dasar & perkenalan diri.",
      badge: "Tahap N5",
    },
    th: {
      title: "แบบทดสอบวัดระดับช่วง JLPT N5",
      kindLabel: "การทดสอบตามช่วง",
      description: "ทดสอบเกณฑ์ผ่านระดับ N5: การฟังที่สถานีรถไฟ/ร้านสะดวกซื้อ, อ่านประกาศ, เขียนประโยคเบื้องต้น และแนะนำตัว",
      badge: "ช่วง N5",
    },
    ru: {
      title: "Тест завершения этапа JLPT N5",
      kindLabel: "Промежуточный тест",
      description: "Проверяет критерии уровня N5: аудирование на вокзале/в комбини, чтение объявлений, базовое письмо и самопрезентация.",
      badge: "Этап N5",
    },
    pt: {
      title: "Avaliação de Etapa JLPT N5",
      kindLabel: "Teste de etapa",
      description: "Avalia critérios do N5: audição na estação/konbini, leitura de avisos, escrita básica e apresentação pessoal.",
      badge: "Etapa N5",
    },
  },
  N4_FULL: {
    en: {
      title: "JLPT N4 Milestone Assessment",
      kindLabel: "Milestone Test",
      description: "Tests N4 skills: Compound sentences, daily conversation, directions, hotel booking, intentions, and conditional clauses.",
      badge: "N4 Milestone",
    },
    "zh-CN": {
      title: "JLPT N4 阶段能力进阶测评",
      kindLabel: "阶段测评",
      description: "检验 N4 核心能力：复合句连接、日常对话听解、问路、预订及表达意向与条件。",
      badge: "N4 阶段进阶",
    },
    "zh-TW": {
      title: "JLPT N4 階段能力進階測評",
      kindLabel: "階段測評",
      description: "檢驗 N4 核心能力：複合句連接、日常對話聽解、問路、預訂及表達意向與條件。",
      badge: "N4 階段進階",
    },
    ko: {
      title: "JLPT N4 종합 실력 평가",
      kindLabel: "단계별 평가",
      description: "N4 핵심 능력 점검: 복문 연결, 일상 대화 청해, 길 묻기, 예약, 의도 및 조건 표현.",
      badge: "N4 단계 달성",
    },
    es: {
      title: "Evaluación de Nivel JLPT N4",
      kindLabel: "Prueba de etapa",
      description: "Evalúa N4: oraciones compuestas, conversación cotidiana, direcciones, reservas, intenciones y condiciones.",
      badge: "Hito N4",
    },
    fr: {
      title: "Évaluation de Niveau JLPT N4",
      kindLabel: "Test d'étape",
      description: "Évalue le N4 : phrases complexes, conversation quotidienne, orientation, réservations, intentions et conditions.",
      badge: "Étape N4",
    },
    de: {
      title: "JLPT N4 Zwischenprüfung",
      kindLabel: "Etappenprüfung",
      description: "Prüft N4: Satzverbindungen, Alltagsgespräche, Wegbeschreibungen, Buchungen, Absichten und Bedingungen.",
      badge: "N4-Etappe",
    },
    id: {
      title: "Ujian Tahap Kemampuan JLPT N4",
      kindLabel: "Ujian Tahap",
      description: "Menguji keterampilan N4: kalimat majemuk, percakapan sehari-hari, petunjuk arah, reservasi, dan pengandaian.",
      badge: "Tahap N4",
    },
    th: {
      title: "แบบทดสอบวัดระดับช่วง JLPT N4",
      kindLabel: "การทดสอบตามช่วง",
      description: "ทดสอบระดับ N4: ประโยคความซ้อน, สนทนาชีวิตประจำวัน, บอกทาง, จองห้องพัก และการแสดงเจตนา/เงื่อนไข",
      badge: "ช่วง N4",
    },
    ru: {
      title: "Тест завершения этапа JLPT N4",
      kindLabel: "Промежуточный тест",
      description: "Проверяет уровень N4: сложные предложения, повседневные диалоги, ориентирование, бронирование, намерения и условия.",
      badge: "Этап N4",
    },
    pt: {
      title: "Avaliação de Etapa JLPT N4",
      kindLabel: "Teste de etapa",
      description: "Avalia o N4: orações compostas, diálogo diário, direções, reservas, intenções e orações condicionais.",
      badge: "Etapa N4",
    },
  },
  N3_FULL: {
    en: {
      title: "JLPT N3 Comprehensive Assessment",
      kindLabel: "Comprehensive Assessment",
      description: "Comprehensive N3 testing: Business honorifics, practical text analysis, interview listening, and situational problem-solving.",
      badge: "N3 Comprehensive",
    },
    "zh-CN": {
      title: "JLPT N3 综合实战能力评估",
      kindLabel: "综合评估",
      description: "全面评估 N3：商务敬语应用、实际长文分析、面试对话听解与生活实战应变能力。",
      badge: "N3 综合实战",
    },
    "zh-TW": {
      title: "JLPT N3 綜合實戰能力評估",
      kindLabel: "綜合評估",
      description: "全面評估 N3：商務敬語應用、實際長文分析、面試對話聽解與生活實戰應變能力。",
      badge: "N3 綜合實戰",
    },
    ko: {
      title: "JLPT N3 종합 실전 평가",
      kindLabel: "종합 평가",
      description: "N3 전반 평가: 비즈니스 경어, 실용 독해 분석, 면접 인터뷰 청해 및 일상 문제 해결 순발력.",
      badge: "N3 종합 실전",
    },
    es: {
      title: "Evaluación Integral JLPT N3",
      kindLabel: "Evaluación integral",
      description: "Evaluación N3: cortesía empresarial, análisis de textos reales, entrevistas y resolución de problemas prácticos.",
      badge: "Integral N3",
    },
    fr: {
      title: "Évaluation Complète JLPT N3",
      kindLabel: "Évaluation complète",
      description: "Évaluation globale N3 : langage honorifique d'affaires, analyse de textes réels, écoute d'entretiens et réactivité.",
      badge: "Global N3",
    },
    de: {
      title: "JLPT N3 Gesamtprüfung",
      kindLabel: "Umfassende Prüfung",
      description: "Umfassender N3-Test: Business-Höflichkeitssprache, Textanalysen, Interviews und situative Problemlösung.",
      badge: "N3-Gesamt",
    },
    id: {
      title: "Penilaian Komprehensif JLPT N3",
      kindLabel: "Penilaian Komprehensif",
      description: "Evaluasi lengkap N3: bahasa sopan bisnis, analisis teks praktis, wawancara, dan penyelesaian masalah situasional.",
      badge: "Komprehensif N3",
    },
    th: {
      title: "การประเมินความสามารถรอบด้าน JLPT N3",
      kindLabel: "การประเมินรอบด้าน",
      description: "ทดสอบ N3 รอบด้าน: ภาษาสุภาพทางธุรกิจ, วิเคราะห์บทความจริง, ฟังการสัมภาษณ์ และการแก้ปัญหาเฉพาะหน้า",
      badge: "รอบด้าน N3",
    },
    ru: {
      title: "Комплексный экзамен JLPT N3",
      kindLabel: "Комплексная оценка",
      description: "Всесторонняя проверка N3: деловой этикет (кэйго), анализ аутентичных текстов, интервью и быстрая реакция.",
      badge: "Комплексный N3",
    },
    pt: {
      title: "Avaliação Abrangente JLPT N3",
      kindLabel: "Avaliação abrangente",
      description: "Avaliação N3 completa: polidez nos negócios, análise de textos reais, entrevistas e resolução de problemas práticos.",
      badge: "Abrangente N3",
    },
  },
};

export const SUBCATEGORY_LOCALIZATION: Record<string, Partial<Record<NativeLanguage, string>>> = {
  "Nghe hội thoại": {
    en: "Dialogue Listening",
    "zh-CN": "对话听解",
    "zh-TW": "對話聽解",
    ko: "대화 듣기",
    es: "Escucha de diálogos",
    fr: "Écoute de dialogues",
    de: "Dialog-Hören",
    id: "Mendengar Percakapan",
    th: "ฟังบทสนทนา",
    ru: "Аудирование диалога",
    pt: "Audição de diálogo",
    vi: "Nghe hội thoại",
  },
  "Đọc hiểu": {
    en: "Reading Comprehension",
    "zh-CN": "阅读理解",
    "zh-TW": "閱讀理解",
    ko: "독해",
    es: "Comprensión lectora",
    fr: "Compréhension écrite",
    de: "Leseverständnis",
    id: "Membaca Pemahaman",
    th: "การอ่านจับใจความ",
    ru: "Понимание прочитанного",
    pt: "Compreensão de leitura",
    vi: "Đọc hiểu",
  },
  "Từ vựng・Hán tự": {
    en: "Vocabulary & Kanji",
    "zh-CN": "文字・词汇",
    "zh-TW": "文字・詞彙",
    ko: "어휘 및 한자",
    es: "Vocabulario y Kanji",
    fr: "Vocabulaire et Kanji",
    de: "Wortschatz & Kanji",
    id: "Kosakata & Kanji",
    th: "คำศัพท์และคันจิ",
    ru: "Словарный запас и кандзи",
    pt: "Vocabulário e Kanji",
    vi: "Từ vựng・Hán tự",
  },
  "Ngữ pháp ngữ cảnh": {
    en: "Contextual Grammar",
    "zh-CN": "语境文法",
    "zh-TW": "語境文法",
    ko: "문맥 문법",
    es: "Gramática contextual",
    fr: "Grammaire en contexte",
    de: "Kontextuelle Grammatik",
    id: "Tata Bahasa Kontekstual",
    th: "ไวยากรณ์ตามบริบท",
    ru: "Контекстная грамматика",
    pt: "Gramática contextual",
    vi: "Ngữ pháp ngữ cảnh",
  },
  "Viết câu・Điền từ": {
    en: "Sentence Construction & Fill-in",
    "zh-CN": "句子构建与填空",
    "zh-TW": "句子構建與填空",
    ko: "문장 완성 및 빈칸 채우기",
    es: "Construcción de frases y rellenar",
    fr: "Construction de phrases et texte à trous",
    de: "Satzbau & Lückentext",
    id: "Menyusun Kalimat & Mengisi Kosong",
    th: "สร้างประโยคและเติมคำ",
    ru: "Построение предложений и пропуски",
    pt: "Construção de frases e preenchimento",
    vi: "Viết câu・Điền từ",
  },
  "Phản xạ nói": {
    en: "Speaking Reflex",
    "zh-CN": "口语应答反应",
    "zh-TW": "口語應答反應",
    ko: "말하기 순발력",
    es: "Reflejo oral",
    fr: "Réflexe d'expression orale",
    de: "Sprechreaktion",
    id: "Refleks Berbicara",
    th: "การพูดโต้ตอบอย่างรวดเร็ว",
    ru: "Разговорная реакция",
    pt: "Reflexo de fala",
    vi: "Phản xạ nói",
  },
};

export function getLocalizedSubCategory(sub: string, lang: NativeLanguage): string {
  if (lang === "vi") return sub;
  return SUBCATEGORY_LOCALIZATION[sub]?.[lang] || SUBCATEGORY_LOCALIZATION[sub]?.en || sub;
}

export function getLocalizedExamMeta(exam: DynamicExamDto, lang: NativeLanguage): LocalizedExamMeta {
  if (lang === "vi") {
    return {
      title: exam.title,
      kindLabel: exam.kindLabel,
      description: exam.description,
      badge: exam.badge,
    };
  }

  const lookup = TEST_MODE_LOCALIZATION[exam.slug] || TEST_MODE_LOCALIZATION[exam.id];
  const item = lookup?.[lang] || lookup?.en;
  if (item) {
    return item;
  }

  // Dynamic pattern matching for all other exams
  let title = exam.title;
  let description = exam.description;
  let kindLabel = exam.kindLabel;
  let badge = exam.badge;

  if (exam.slug.startsWith("FPT_JPD") || exam.title.includes("FPT JPD")) {
    const partMatch = exam.title.match(/Part\s*(\d+[–-]\d+)/i);
    const partStr = partMatch ? ` (Part ${partMatch[1]})` : "";
    const moduleMatch = exam.slug.match(/JPD\d+/i) || exam.title.match(/JPD\d+/i);
    const modStr = moduleMatch ? moduleMatch[0].toUpperCase() : "JPD";

    const titleMap: Record<string, string> = {
      en: `FPT ${modStr} Curriculum Assessment${partStr}`,
      "zh-CN": `FPT ${modStr} 课程结业考核试卷${partStr}`,
      "zh-TW": `FPT ${modStr} 課程結業考核試卷${partStr}`,
      ko: `FPT ${modStr} 교재 학점 평가 시험${partStr}`,
      es: `Examen del Módulo FPT ${modStr}${partStr}`,
      fr: `Épreuve du Module FPT ${modStr}${partStr}`,
      de: `FPT ${modStr} Modulprüfung${partStr}`,
      id: `Ujian Modul FPT ${modStr}${partStr}`,
      th: `ข้อสอบหลักสูตร FPT ${modStr}${partStr}`,
      ru: `Экзамен по модулю FPT ${modStr}${partStr}`,
      pt: `Exame do Módulo FPT ${modStr}${partStr}`,
    };
    title = titleMap[lang] || titleMap.en;
    badge = "FPT JPD";
    kindLabel = lang === "zh-CN" || lang === "zh-TW" ? "课程考试" : lang === "ko" ? "교재 평가" : "Module Exam";
  } else if (exam.slug.includes("MOCK") || exam.title.toLowerCase().includes("thi thử")) {
    const lvMatch = exam.slug.match(/N[345]/i) || exam.title.match(/N[345]/i);
    const lv = lvMatch ? lvMatch[0].toUpperCase() : "JLPT";
    title = `${lv} Full Mock Exam`;
    badge = `${lv} Mock`;
    kindLabel = "Mock Exam";
  } else if (exam.slug.includes("CHOUKAI") || exam.title.toLowerCase().includes("nghe hiểu")) {
    const lvMatch = exam.slug.match(/N[345]/i) || exam.title.match(/N[345]/i);
    const lv = lvMatch ? lvMatch[0].toUpperCase() : "JLPT";
    title = `${lv} Intensive Listening Assessment (Authentic Audio)`;
    badge = `${lv} Listening`;
    kindLabel = "Listening Focus";
  } else if (exam.slug.includes("VOCAB") || exam.title.toLowerCase().includes("từ vựng")) {
    const lvMatch = exam.slug.match(/N[345]/i) || exam.title.match(/N[345]/i);
    const lv = lvMatch ? lvMatch[0].toUpperCase() : "JLPT";
    title = `${lv} Essential Vocabulary & Kanji Assessment`;
    badge = `${lv} Vocab`;
    kindLabel = "Vocab Focus";
  } else if (exam.slug.includes("GRAMMAR") || exam.title.toLowerCase().includes("ngữ pháp")) {
    const lvMatch = exam.slug.match(/N[345]/i) || exam.title.match(/N[345]/i);
    const lv = lvMatch ? lvMatch[0].toUpperCase() : "JLPT";
    title = `${lv} Core Grammar Patterns Assessment`;
    badge = `${lv} Grammar`;
    kindLabel = "Grammar Focus";
  } else if (exam.slug.includes("READING") || exam.title.toLowerCase().includes("đọc hiểu")) {
    const lvMatch = exam.slug.match(/N[345]/i) || exam.title.match(/N[345]/i);
    const lv = lvMatch ? lvMatch[0].toUpperCase() : "JLPT";
    title = `${lv} Reading Comprehension in Context`;
    badge = `${lv} Reading`;
    kindLabel = "Reading Focus";
  } else if (exam.title.toLowerCase().includes("chính thức")) {
    title = "Official JLPT Exam with Authentic Audio & Answer Key";
    badge = "Official JLPT";
    kindLabel = "Official Exam";
  }

  return { title, kindLabel, description, badge };
}

// Client-side translation cache for question prompts, options, explanations
const testTextCache = new Map<string, string>();

/**
 * Hook to translate any test text (question prompt, options, hint, explanation)
 * into the learner's native language.
 */
export function useLocalizedAssessmentText(sourceText: string): string {
  const { nativeLanguage } = useNativeLanguage();

  const [translated, setTranslated] = useState<string>(() => {
    if (nativeLanguage === "vi" || !sourceText) return sourceText;
    const cacheKey = `t_${nativeLanguage}:${sourceText.trim()}`;
    if (testTextCache.has(cacheKey)) return testTextCache.get(cacheKey)!;
    return sourceText;
  });

  useEffect(() => {
    if (nativeLanguage === "vi" || !sourceText) {
      setTranslated(sourceText);
      return;
    }

    const cacheKey = `t_${nativeLanguage}:${sourceText.trim()}`;
    if (testTextCache.has(cacheKey)) {
      setTranslated(testTextCache.get(cacheKey)!);
      return;
    }

    let isSubscribed = true;

    try {
      const lsKey = `nq_tt_${cacheKey}`;
      const saved = localStorage.getItem(lsKey);
      if (saved) {
        testTextCache.set(cacheKey, saved);
        setTranslated(saved);
        return;
      }
    } catch {}

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: sourceText,
        targetLang: nativeLanguage,
        sourceLang: "vi",
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!isSubscribed) return;
        const resText = data.translation;
        if (resText && typeof resText === "string") {
          testTextCache.set(cacheKey, resText);
          try {
            localStorage.setItem(`nq_tt_${cacheKey}`, resText);
          } catch {}
          setTranslated(resText);
        }
      })
      .catch(() => {
        if (isSubscribed) setTranslated(sourceText);
      });

    return () => {
      isSubscribed = false;
    };
  }, [sourceText, nativeLanguage]);

  return translated;
}

export function LocalizedAssessmentText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const result = useLocalizedAssessmentText(text);
  return React.createElement("span", { className }, result);
}
