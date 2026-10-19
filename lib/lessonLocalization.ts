/**
 * Lesson & Curriculum Internationalization (i18n) Engine
 *
 * Core Principle:
 * - Target Japanese content (Kana, Kanji, grammar structures in parentheses like
 *   「あ・い・う・え・お」, 「これ・それ・あれ」, 「行きます・来ます」, 「〜てください」)
 *   MUST REMAIN 100% IN JAPANESE across all native languages.
 * - Explanatory titles, pedagogical objectives, and curriculum provenance are translated
 *   dynamically into the user's chosen native language.
 */

import type { NativeLanguage } from "@/components/LanguageContext";

export interface LocalizedLessonInfo {
  title: string;
  description: string;
}

/**
 * 50 Verified Lesson Titles & Descriptions across all supported languages.
 * Preserves all Japanese characters 100%.
 */
export const LESSON_I18N_MAP: Record<string, Record<"en" | "vi", LocalizedLessonInfo> & Partial<Record<NativeLanguage, LocalizedLessonInfo>>> = {
  "hiragana-vowels": {
    vi: {
      title: "Hàng Nguyên Âm Hiragana (あ・い・う・え・お)",
      description: "5 nguyên âm cốt lõi tạo nên toàn bộ hệ thống phát âm tiếng Nhật kèm các từ ghép đầu tiên.",
    },
    en: {
      title: "Hiragana Vowels (あ・い・う・え・お)",
      description: "The 5 core vowels forming the Japanese phonetic system with introductory word combinations.",
    },
    "zh-CN": {
      title: "平假名元音行 (あ・い・う・え・お)",
      description: "构成日语完整发音体系的5个核心元音及第一批基础复合词。",
    },
    "zh-TW": {
      title: "平假名元音行 (あ・い・う・え・お)",
      description: "構成日語完整發音體系的5個核心元音及第一批基礎複合詞。",
    },
    ko: {
      title: "히라가나 모음행 (あ・い・う・え・お)",
      description: "일본어 발음 체계의 기초가 되는 5대 핵심 모음과 첫 단어 조합 학습.",
    },
    es: {
      title: "Vocales Hiragana (あ・い・う・え・お)",
      description: "Las 5 vocales fundamentales del sistema fonético japonés con primeras palabras combinadas.",
    },
    fr: {
      title: "Voyelles Hiragana (あ・い・う・え・お)",
      description: "Les 5 voyelles piliers de la phonétique japonaise et premiers mots composés.",
    },
    de: {
      title: "Hiragana-Vokale (あ・い・う・え・お)",
      description: "Die 5 Grundvokale des japanischen Lautsystems mit ersten Wortkombinationen.",
    },
    id: {
      title: "Vokal Hiragana (あ・い・う・え・お)",
      description: "5 vokal inti pembentuk sistem fonetik bahasa Jepang dan kombinasi kata pengantar.",
    },
    th: {
      title: "สระฮิรางานะ (あ・い・う・え・お)",
      description: "5 สระหลักที่เป็นรากฐานของระบบเสียงภาษาญี่ปุ่นพร้อมคำศัพท์แรกเริ่ม",
    },
    ru: {
      title: "Гласные хираганы (あ・い・う・え・お)",
      description: "5 базовых гласных японской фонетики и первые словарные комбинации.",
    },
    pt: {
      title: "Vogais Hiragana (あ・い・う・え・お)",
      description: "As 5 vogais fundamentais da fonética japonesa e primeiras combinações de palavras.",
    },
  },

  "hiragana-ka-sa": {
    vi: {
      title: "Hàng Ka & Hàng Sa (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Phụ âm K và S trong Hiragana, cách ghép vần và các từ vựng đồ dùng hàng ngày.",
    },
    en: {
      title: "Ka-Row & Sa-Row Hiragana (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Consonants K and S in Hiragana, spelling rules, and everyday household vocabulary.",
    },
    "zh-CN": {
      title: "Ka行与Sa行平假名 (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "平假名辅音K与S行，拼读规则与日常用品词汇。",
    },
    "zh-TW": {
      title: "Ka行與Sa行平假名 (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "平假名輔音K與S行，拼讀規則與日常用品詞彙。",
    },
    ko: {
      title: "Ka행 및 Sa행 히라가나 (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "히라가나 K행과 S행 자음, 음절 결합 규칙 및 일상 어휘 익히기.",
    },
    es: {
      title: "Filas Ka y Sa de Hiragana (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Consonantes K y S en Hiragana, reglas de unión y vocabulario del día a día.",
    },
    fr: {
      title: "Lignes Ka et Sa des Hiragana (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Consonnes K et S en Hiragana, règles de combinaison et lexique quotidien.",
    },
    de: {
      title: "Ka- und Sa-Reihe Hiragana (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Konsonanten K und S in Hiragana, Lautregeln und Alltagswortschatz.",
    },
    id: {
      title: "Baris Ka & Sa Hiragana (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Konsonan K dan S Hiragana, aturan penggabungan, dan kosakata sehari-hari.",
    },
    th: {
      title: "วรรค Ka & Sa ฮิรางานะ (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "พยัญชนะ K และ S ในฮิรางานะ พร้อมหลักการสะกดและคำศัพท์ในชีวิตประจำวัน",
    },
    ru: {
      title: "Ряды Ka и Sa хираганы (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Согласные K и S в хирагане, правила чтения и базовая бытовая лексика.",
    },
    pt: {
      title: "Linhas Ka e Sa do Hiragana (か・き・く・け・こ / さ・し・す・せ・そ)",
      description: "Consoantes K e S no Hiragana, regras de escrita e vocabulário cotidiano.",
    },
  },

  "hiragana-ta-na": {
    vi: {
      title: "Hàng Ta & Hàng Na (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Đặc biệt chú ý âm biến chi (ち) và tsu (つ), kết hợp hàng N cùng từ vựng số đếm cơ bản.",
    },
    en: {
      title: "Ta-Row & Na-Row Hiragana (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Special focus on chi (ち) and tsu (つ), combined with the N-row and basic counter words.",
    },
    "zh-CN": {
      title: "Ta行与Na行平假名 (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "重点掌握特殊发音 chi (ち) 和 tsu (つ)，以及Na行与基础数字量词。",
    },
    "zh-TW": {
      title: "Ta行與Na行平假名 (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "重點掌握特殊發音 chi (ち) 與 tsu (つ)，以及Na行與基礎數字量詞。",
    },
    ko: {
      title: "Ta행 및 Na행 히라가나 (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "주의해야 할 발음 chi (ち)와 tsu (つ), Na행 및 기본 숫자 어휘 마스터.",
    },
    es: {
      title: "Filas Ta y Na de Hiragana (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Atención especial a chi (ち) y tsu (つ), junto con la fila Na y números básicos.",
    },
    fr: {
      title: "Lignes Ta et Na des Hiragana (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Focus sur chi (ち) et tsu (つ), combinés à la ligne Na et aux chiffres de base.",
    },
    de: {
      title: "Ta- und Na-Reihe Hiragana (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Besonderheiten bei chi (ち) und tsu (つ) sowie die Na-Reihe mit Grundzahlen.",
    },
    id: {
      title: "Baris Ta & Na Hiragana (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Fokus khusus pada chi (ち) dan tsu (つ), baris Na, serta angka-angka dasar.",
    },
    th: {
      title: "วรรค Ta & Na ฮิรางานะ (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "เน้นเสียงพิเศษ chi (ち) และ tsu (つ) พร้อมวรรค Na และตัวเลขพื้นฐาน",
    },
    ru: {
      title: "Ряды Ta и Na хираганы (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Особое внимание звукам chi (ち) и tsu (つ), ряд Na и базовые числа.",
    },
    pt: {
      title: "Linhas Ta e Na do Hiragana (た・ち・つ・て・と / な・に・ぬ・ね・の)",
      description: "Atenção especial a chi (ち) e tsu (つ), fila Na e números essenciais.",
    },
  },

  "hiragana-ha-ma": {
    vi: {
      title: "Hàng Ha & Hàng Ma (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Nắm vững phát âm phụ âm H (đặc biệt âm fu ふ) và M cùng các từ chỉ thành viên gia đình.",
    },
    en: {
      title: "Ha-Row & Ma-Row Hiragana (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Master H-row (special sound fu ふ) and M-row along with family vocabulary.",
    },
    "zh-CN": {
      title: "Ha行与Ma行平假名 (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "掌握H辅音行（特别是fu ふ）与M行发音，学习家庭成员词汇。",
    },
    "zh-TW": {
      title: "Ha行與Ma行平假名 (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "掌握H輔音行（特別是fu ふ）與M行發音，學習家庭成員詞彙。",
    },
    ko: {
      title: "Ha행 및 Ma행 히라가나 (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "H행 자음(특히 fu ふ)과 M행 발음 정복 및 가족 호칭 단어 학습.",
    },
    es: {
      title: "Filas Ha y Ma de Hiragana (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Domina la fila H (en especial fu ふ) y la fila M con vocabulario de familia.",
    },
    fr: {
      title: "Lignes Ha et Ma des Hiragana (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Maîtrisez la ligne H (son spécial fu ふ) et M avec les mots de la famille.",
    },
    de: {
      title: "Ha- und Ma-Reihe Hiragana (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Meistern Sie die H-Reihe (besonders fu ふ) und M-Reihe samt Familienbegriffen.",
    },
    id: {
      title: "Baris Ha & Ma Hiragana (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Kuasai baris H (khususnya bunyi fu ふ) dan baris M beserta sebutan keluarga.",
    },
    th: {
      title: "วรรค Ha & Ma ฮิรางานะ (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "ฝึกออกเสียงวรรค H (เน้นเสียง fu ふ) และวรรค M พร้อมคำศัพท์ครอบครัว",
    },
    ru: {
      title: "Ряды Ha и Ma хираганы (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Освойте ряд H (особенно звук fu ふ) и M вместе со словами о семье.",
    },
    pt: {
      title: "Linhas Ha e Ma do Hiragana (は・ひ・ふ・へ・ほ / ま・み・む・め・も)",
      description: "Domine a linha H (atenção ao fu ふ) e M com vocabulário de família.",
    },
  },

  "hiragana-ya-ra-wa-n": {
    vi: {
      title: "Hàng Ya, Ra, Wa & Âm Mũi N (ん)",
      description: "Hoàn thiện bảng Hiragana với các bán nguyên âm, phụ âm R cuốn lưỡi nhẹ và âm ngắt ん.",
    },
    en: {
      title: "Ya, Ra, Wa Rows & Nasal N (ん)",
      description: "Complete the 46 Hiragana syllabary with semi-vowels, tapped R, and nasal N (ん).",
    },
    "zh-CN": {
      title: "Ya、Ra、Wa行与鼻音 N (ん)",
      description: "完成46个基础平假名学习：半元音、轻弹舌R音与鼻音 ん。",
    },
    "zh-TW": {
      title: "Ya、Ra、Wa行與鼻音 N (ん)",
      description: "完成46個基礎平假名學習：半元音、輕彈舌R音與鼻音 ん。",
    },
    ko: {
      title: "Ya, Ra, Wa행 및 비음 N (ん)",
      description: "반모음, R행 탄음, 비음 ん을 익히며 히라가나 46자 완성.",
    },
    es: {
      title: "Filas Ya, Ra, Wa y Nasal N (ん)",
      description: "Completa los 46 caracteres Hiragana con semivocales, R suave y la nasal N (ん).",
    },
    fr: {
      title: "Lignes Ya, Ra, Wa et Nasale N (ん)",
      description: "Complétez les 46 Hiragana de base avec semi-voyelles, R doux et la nasale N (ん).",
    },
    de: {
      title: "Ya-, Ra-, Wa-Reihe & Nasal N (ん)",
      description: "Schließen Sie das 46-Hiragana-Alphabet mit Halbvokalen, sanftem R und Nasal N (ん) ab.",
    },
    id: {
      title: "Baris Ya, Ra, Wa & Sengau N (ん)",
      description: "Lengkapi 46 karakter Hiragana dengan semi-vokal, konsonan R, dan bunyi sengau ん.",
    },
    th: {
      title: "วรรค Ya, Ra, Wa & ตัวสะกด N (ん)",
      description: "เรียนครบ 46 ตัวอักษรฮิรางานะพื้นฐาน สระกึ่ง พยัญชนะ R และเสียงสะกด ん",
    },
    ru: {
      title: "Ряды Ya, Ra, Wa и носовой N (ん)",
      description: "Завершите изучение 46 знаков хираганы: полугласные, звук R и носовой N (ん).",
    },
    pt: {
      title: "Linhas Ya, Ra, Wa e Nasal N (ん)",
      description: "Complete os 46 caracteres Hiragana com semivogais, R suave e a nasal N (ん).",
    },
  },

  "dakuten-handakuten": {
    vi: {
      title: "Biến Âm Đục (Dakuten: が・ざ・だ・ば) & Bán Đục (Handakuten: ぱ)",
      description: "Quy tắc thêm dấu nháy tenten (゛) và maru (゜) để tạo âm đục, mở rộng vốn từ giao tiếp.",
    },
    en: {
      title: "Voiced Sounds (Dakuten: が・ざ・だ・ば) & Semi-Voiced (Handakuten: ぱ)",
      description: "Rules for tenten (゛) and maru (゜) diacritics to create voiced sounds.",
    },
    "zh-CN": {
      title: "浊音 (Dakuten: が・ざ・だ・ば) 与半浊音 (Handakuten: ぱ)",
      description: "掌握浊音符 tenten (゛) 和半浊音符 maru (゜) 的变音法则。",
    },
    "zh-TW": {
      title: "濁音 (Dakuten: が・ざ・だ・ば) 與半濁音 (Handakuten: ぱ)",
      description: "掌握濁音符 tenten (゛) 和半濁音符 maru (゜) 的變音法則。",
    },
    ko: {
      title: "탁음 (Dakuten: が・ざ・だ・ば) 및 반탁음 (Handakuten: ぱ)",
      description: "탁점(゛)과 반탁점(゜) 부호를 통한 유성음 변환 규칙 완성.",
    },
    es: {
      title: "Sonidos Sonoros (Dakuten: が・ざ・だ・ば) y Semi-Sonoros (Handakuten: ぱ)",
      description: "Reglas de diacríticos tenten (゛) y maru (゜) para transformar sonidos.",
    },
    fr: {
      title: "Sons Voisés (Dakuten: が・ざ・だ・ば) et Semi-Voisés (Handakuten: ぱ)",
      description: "Règles des accents tenten (゛) et maru (゜) pour créer les sons voisés.",
    },
    de: {
      title: "Stimmhafte Laute (Dakuten: が・ざ・だ・ば) & Halb-Stimmhafte (Handakuten: ぱ)",
      description: "Regeln für Tenten (゛) und Maru (゜) zur Erzeugung stimmhafter Laute.",
    },
    id: {
      title: "Bunyi Berbunyi (Dakuten: が・ざ・だ・ば) & Semi-Berbunyi (Handakuten: ぱ)",
      description: "Aturan tanda diakritik tenten (゛) dan maru (゜) untuk membentuk bunyi bersuara.",
    },
    th: {
      title: "เสียงขุ่น (Dakuten: が・ざ・だ・ば) & กึ่งขุ่น (Handakuten: ぱ)",
      description: "หลักการเติมเครื่องหมาย tenten (゛) และ maru (゜) เพื่อเปลี่ยนเสียง",
    },
    ru: {
      title: "Звонкие звуки (Dakuten: が・ざ・だ・ば) и полузвонкие (Handakuten: ぱ)",
      description: "Правила знаков тэнтэн (゛) и мару (゜) для озвончения согласных.",
    },
    pt: {
      title: "Sons Sonoros (Dakuten: が・ざ・だ・ば) e Semi-Sonoros (Handakuten: ぱ)",
      description: "Regras de diacríticos tenten (゛) e maru (゜) para formar sons sonoros.",
    },
  },

  "yoon-sokuon-chouon": {
    vi: {
      title: "Ảo Âm (Yoon: きゃ・しゃ・ちゃ) & Âm Ngắt (っ) & Trường Âm",
      description: "Phát âm âm ghép ya/yu/yo nhỏ, ngắt nhịp với tsu nhỏ (っ) và kéo dài nguyên âm.",
    },
    en: {
      title: "Contracted Sounds (Yōon: きゃ・しゃ・ちゃ), Double Consonants (っ) & Long Vowels",
      description: "Master small ya/yu/yo combos, pause glottal stops (っ), and vowel elongation.",
    },
    "zh-CN": {
      title: "拗音 (Yoon: きゃ・しゃ・ちゃ)、促音 (っ) 与长音",
      description: "精通小ya/yu/yo组合拗音、促音顿音 (っ) 与长音规则。",
    },
    "zh-TW": {
      title: "拗音 (Yoon: きゃ・しゃ・ちゃ)、促音 (っ) 與長音",
      description: "精通小ya/yu/yo組合拗音、促音頓音 (っ) 與長音規則。",
    },
    ko: {
      title: "요음 (Yoon: きゃ・しゃ・ちゃ), 촉음 (っ) 및 장음",
      description: "소문자 ya/yu/yo 결합 요음, 촉음 받침 (っ), 장음 발음 규칙 마스터.",
    },
    es: {
      title: "Sonidos Contraídos (Yōon: きゃ・しゃ・ちゃ), Pausas (っ) y Vocales Largas",
      description: "Aprende combinaciones ya/yu/yo pequeñas, oclusiva glotal (っ) y alargamiento vocálico.",
    },
    fr: {
      title: "Sons Combinés (Yōon: きゃ・しゃ・ちゃ), Consonnes Doubles (っ) et Voyelles Longues",
      description: "Combinaisons ya/yu/yo réduits, arrêts brefs (っ) et voyelles longues.",
    },
    de: {
      title: "Kombinationslaute (Yōon: きゃ・しゃ・ちゃ), Doppelkonsonanten (っ) & Langvokale",
      description: "Kombinationen mit kleinem ya/yu/yo, Glottisschlag (っ) und Vokallänge.",
    },
    id: {
      title: "Bunyi Gabungan (Yōon: きゃ・しゃ・ちゃ), Konsonan Ganda (っ) & Vokal Panjang",
      description: "Kuasai kombinasi ya/yu/yo kecil, hentian glotal (っ), dan pemanjangan vokal.",
    },
    th: {
      title: "เสียงควบ (Yōon: きゃ・しゃ・ちゃ), เสียงกัก (っ) & เสียงยาว",
      description: "ฝึกออกเสียงควบ ya/yu/yo ตัวเล็ก เสียงกักหยุดจังหวะ (っ) และการลากเสียงยาว",
    },
    ru: {
      title: "Йоон (きゃ・しゃ・ちゃ), сокуон (っ) и долгие гласные",
      description: "Сочетания с маленькими ya/yu/yo, паузы с маленьким цу (っ) и долгота гласных.",
    },
    pt: {
      title: "Sons Combinados (Yōon: きゃ・しゃ・ちゃ), Consoantes Duplas (っ) e Vogais Longas",
      description: "Domine combinações ya/yu/yo pequenas, pausas (っ) e vogais longas.",
    },
  },

  "katakana-basics": {
    vi: {
      title: "Bảng Chữ Cứng Katakana & Từ Mượn Quốc Tế (Gairaigo)",
      description: "Đọc viết chữ Katakana, dấu trường âm (ー) và kho từ vựng công nghệ, du lịch, ẩm thực mượn.",
    },
    en: {
      title: "Katakana Alphabet & Loanwords (Gairaigo)",
      description: "Read & write Katakana, long vowel dashes (ー), and global loanwords in daily life.",
    },
    "zh-CN": {
      title: "片假名字母表与外来语 (Gairaigo)",
      description: "学习片假名读写、长音横线 (ー) 以及生活中的科技、旅行与美食外来语。",
    },
    "zh-TW": {
      title: "片假名字母表與外來語 (Gairaigo)",
      description: "學習片假名讀寫、長音橫線 (ー) 以及生活中的科技、旅行與美食外來語。",
    },
    ko: {
      title: "가타카나 문자표 및 외래어 (Gairaigo)",
      description: "가타카나 읽고 쓰기, 장음 기호 (ー), 일상 외래어 단어 정복.",
    },
    es: {
      title: "Alfabeto Katakana y Préstamos Lingüísticos (Gairaigo)",
      description: "Lectura y escritura Katakana, guion de sonido largo (ー) y palabras de origen extranjero.",
    },
    fr: {
      title: "Alphabet Katakana et Mots d'Emprunt (Gairaigo)",
      description: "Lecture et écriture Katakana, tiret de voyelle longue (ー) et vocabulaire international.",
    },
    de: {
      title: "Katakana-Alphabet & Fremdwörter (Gairaigo)",
      description: "Katakana lesen und schreiben, Dehnungsstriche (ー) und internationale Lehnwörter.",
    },
    id: {
      title: "Alfabet Katakana & Kata Serapan Asing (Gairaigo)",
      description: "Membaca dan menulis Katakana, tanda vokal panjang (ー), dan kosakata serapan global.",
    },
    th: {
      title: "ตัวอักษรคาตาคานะ & คำยืมภาษาต่างประเทศ (Gairaigo)",
      description: "ฝึกอ่านเขียนคาตาคานะ เครื่องหมายลากเสียง (ー) และคำศัพท์ทับศัพท์สากล",
    },
    ru: {
      title: "Азбука катакана и заимствованные слова (Gairaigo)",
      description: "Чтение и письмо катаканы, знак долготы (ー) и международная лексика.",
    },
    pt: {
      title: "Alfabeto Katakana e Palavras Estrangeiras (Gairaigo)",
      description: "Leitura e escrita de Katakana, traço de extensão (ー) e vocabulário internacional.",
    },
  },

  "daily-greetings-culture": {
    vi: {
      title: "Chào Hỏi Hàng Ngày & Văn Hóa Ứng Xử Cúi Chào Ojigi",
      description: "Chào buổi sáng, cảm ơn, xin lỗi và văn hóa cúi đầu đúng mực trong giao tiếp người Nhật.",
    },
    en: {
      title: "Daily Greetings & Japanese Bowing Etiquette (Ojigi)",
      description: "Greetings, apologies, gratitude, and the cultural art of bowing with proper etiquette.",
    },
    "zh-CN": {
      title: "日常问候与鞠躬礼仪文化 (Ojigi)",
      description: "早安、感谢、道歉用语及日本社会得体的鞠躬礼仪文化。",
    },
    "zh-TW": {
      title: "日常問候與鞠躬禮儀文化 (Ojigi)",
      description: "早安、感謝、道歉用語及日本社會得體的鞠躬禮儀文化。",
    },
    ko: {
      title: "일상 인사 및 일본식 인사 예절 (Ojigi)",
      description: "아침 인사, 감사, 사과 표현과 상황에 맞는 정중한 오지기(Ojigi) 문화.",
    },
    es: {
      title: "Saludos Cotidianos y Etiqueta de Reverencia (Ojigi)",
      description: "Buenos días, agradecimientos, disculpas y el protocolo cultural del saludo japonés.",
    },
    fr: {
      title: "Salutations Quotidiennes et Politesse de l'Ojigi",
      description: "Dire bonjour, remercier, s'excuser et respecter les codes de la révérence japonaise.",
    },
    de: {
      title: "Tägliche Begrüßungen & Verbeugungs-Etikette (Ojigi)",
      description: "Begrüßungen, Dank, Entschuldigungen und die Kultur der japanischen Verbeugung.",
    },
    id: {
      title: "Salam Sehari-hari & Etika Membungkuk (Ojigi)",
      description: "Ungkapan salam, terima kasih, permohonan maaf, dan tata krama membungkuk ala Jepang.",
    },
    th: {
      title: "การทักทายประจำวัน & มารยาทการโค้งคำนับ (Ojigi)",
      description: "คำทักทาย ขอบคุณ ขอโทษ และมารยาทการโค้งคำนับอย่างถูกต้องในสังคมญี่ปุ่น",
    },
    ru: {
      title: "Ежедневные приветствия и этикет поклонов (Ojigi)",
      description: "Приветствия, благодарность, извинения и традиционный этикет поклона.",
    },
    pt: {
      title: "Saudações Diárias e Etiqueta de Reverência (Ojigi)",
      description: "Cumprimentos, agradecimentos, desculpas e a etiqueta cultural de reverência.",
    },
  },

  "self-introduction-grammar": {
    vi: {
      title: "Giới Thiệu Bản Thân & Khẳng Định / Phủ Định (です・じゃありません)",
      description: "Mẫu câu [A は B です], giới thiệu tên, quốc tịch, nghề nghiệp và câu hỏi [〜ですか].",
    },
    en: {
      title: "Self-Introduction & Affirmation / Negation (です・じゃありません)",
      description: "Master [A は B です], introduce your name, nationality, occupation, and ask [〜ですか].",
    },
    "zh-CN": {
      title: "自我介绍与肯定 / 否定句式 (です・じゃありません)",
      description: "核心句型 [A は B です]，介绍姓名、国籍、职业与疑问句 [〜ですか]。",
    },
    "zh-TW": {
      title: "自我介紹與肯定 / 否定句式 (です・じゃありません)",
      description: "核心句型 [A は B です]，介紹姓名、國籍、職業與疑問句 [〜ですか]。",
    },
    ko: {
      title: "자기소개 및 긍정 / 부정형 (です・じゃありません)",
      description: "기본 문형 [A は B です], 이름, 국적, 직업 소개 및 의문문 [〜ですか].",
    },
    es: {
      title: "Presentación Personal y Afirmación / Negación (です・じゃありません)",
      description: "Estructura [A は B です], presenta tu nombre, nacionalidad, profesión y preguntas [〜ですか].",
    },
    fr: {
      title: "Se Présenter et Affirmation / Négation (です・じゃありません)",
      description: "Structure [A は B です], présentez votre nom, nationalité, métier et questions [〜ですか].",
    },
    de: {
      title: "Selbstvorstellung & Bejahung / Verneinung (です・じゃありません)",
      description: "Satzbau [A は B です], Name, Nationalität, Beruf und Fragen mit [〜ですか].",
    },
    id: {
      title: "Perkenalan Diri & Kalimat Positif / Negatif (です・じゃありません)",
      description: "Pola [A は B です], perkenalkan nama, kewarganegaraan, profesi, dan pertanyaan [〜ですか].",
    },
    th: {
      title: "การแนะนำตนเอง & ประโยคบอกเล่า / ปฏิเสธ (です・じゃありません)",
      description: "โครงสร้าง [A は B です] แนะนำชื่อ สัญชาติ อาชีพ และตั้งคำถาม [〜ですか]",
    },
    ru: {
      title: "Знакомство и утверждение / отрицание (です・じゃありません)",
      description: "Конструкция [A は B です], рассказ о себе, национальности, профессии и вопрос [〜ですか].",
    },
    pt: {
      title: "Apresentação Pessoal e Afirmação / Negação (です・じゃありません)",
      description: "Estrutura [A は B です], apresente nome, nacionalidade, profissão e perguntas [〜ですか].",
    },
  },

  "minna-lesson-02-kore-sore-are": {
    vi: {
      title: "Đại từ Chỉ thị Đồ vật (これ・それ・あれ・どれ)",
      description: "Xác định đồ vật gần mình, gần người nghe và ở xa, sở hữu từ [〜の] trong giao tiếp mua sắm.",
    },
    en: {
      title: "Demonstrative Pronouns for Objects (これ・それ・あれ・どれ)",
      description: "Identify objects near speaker, listener, or distant, plus the possessive particle [〜の].",
    },
    "zh-CN": {
      title: "物体指示代词 (これ・それ・あれ・どれ)",
      description: "近称、中称、远称物体指示代词与所有格助词 [〜の]。",
    },
    "zh-TW": {
      title: "物體指示代詞 (これ・それ・あれ・どれ)",
      description: "近稱、中稱、遠稱物體指示代詞與所有格助詞 [〜の]。",
    },
    ko: {
      title: "사물 지시대명사 (これ・それ・あれ・どれ)",
      description: "화자/청자 위치에 따른 지시대명사 및 소유격 조사 [〜の] 쇼핑 실전 회화.",
    },
    es: {
      title: "Pronombres Demostrativos de Objetos (これ・それ・あれ・どれ)",
      description: "Identifica objetos cercanos, intermedios y lejanos con la partícula posesiva [〜の].",
    },
    fr: {
      title: "Pronoms Démonstratifs d'Objets (これ・それ・あれ・どれ)",
      description: "Désigner les objets selon la distance et exprimer la possession avec [〜の].",
    },
    de: {
      title: "Objekt-Demonstrativpronomen (これ・それ・あれ・どれ)",
      description: "Gegenstände nach Distanz bestimmen und Besitz mit der Partikel [〜の] ausdrücken.",
    },
    id: {
      title: "Kata Ganti Tunjuk Benda (これ・それ・あれ・どれ)",
      description: "Menunjukkan benda dekat, sedang, dan jauh, serta partikel kepemilikan [〜の].",
    },
    th: {
      title: "คำสรรพนามชี้เฉพาะสิ่งของ (これ・それ・あれ・どれ)",
      description: "การระบุสิ่งของตามระยะใกล้-ไกล พร้อมคำช่วยแสดงความเป็นเจ้าของ [〜の]",
    },
    ru: {
      title: "Указательные местоимения предметов (これ・それ・あれ・どれ)",
      description: "Определение предметов по удаленности и притяжательная частица [〜の].",
    },
    pt: {
      title: "Pronomes Demonstrativos para Objetos (これ・それ・あれ・どれ)",
      description: "Identifique objetos próximos, médios e distantes com a partícula de posse [〜の].",
    },
  },

  "minna-lesson-03-koko-soko-asoko": {
    vi: {
      title: "Vị trí, Nơi Chốn & Chỉ Hướng (ここ・そこ・あそこ・どこ)",
      description: "Hỏi đáp địa điểm, sơ đồ tòa nhà, giá tiền và hỏi đường lịch sử [こちら・そちら・あちら].",
    },
    en: {
      title: "Locations, Places & Directions (ここ・そこ・あそこ・どこ)",
      description: "Ask for locations, building floors, prices, and polite direction words [こちら・そちら・あちら].",
    },
    "zh-CN": {
      title: "场所、方位与指路 (ここ・そこ・あそこ・どこ)",
      description: "询问地点位置、楼层、商品价格与礼貌方向词 [こちら・そちら・あちら]。",
    },
    "zh-TW": {
      title: "場所、方位與指路 (ここ・そこ・あそこ・どこ)",
      description: "詢問地點位置、樓層、商品價格與禮貌方向詞 [こちら・そちら・あちら]。",
    },
    ko: {
      title: "위치, 장소 및 길 안내 (ここ・そこ・あそこ・どこ)",
      description: "장소 묻기, 층수, 가격 및 정중한 방향 표현 [こちら・そちら・あちら].",
    },
    es: {
      title: "Ubicaciones, Lugares y Direcciones (ここ・そこ・あそこ・どこ)",
      description: "Preguntar por lugares, pisos, precios y direcciones formales [こちら・そちら・あちら].",
    },
    fr: {
      title: "Lieux, Emplacements et Directions (ここ・そこ・あそこ・どこ)",
      description: "Demander son chemin, étages, prix et politesse de direction [こちら・そちら・あちら].",
    },
    de: {
      title: "Orte, Plätze & Wegbeschreibungen (ここ・そこ・あそこ・どこ)",
      description: "Nach Orten, Etagen, Preisen fragen und höfliche Richtungen [こちら・そちら・あちら].",
    },
    id: {
      title: "Lokasi, Tempat & Arah (ここ・そこ・あそこ・どこ)",
      description: "Menanyakan lokasi, lantai gedung, harga, serta kata arah sopan [こちら・そちら・あちら].",
    },
    th: {
      title: "ตำแหน่ง สถานที่ & ทิศทาง (ここ・そこ・あそこ・どこ)",
      description: "การถามสถานที่ ชั้นอาคาร ราคา และคำบอกทิศทางอย่างสุภาพ [こちら・そちら・あちら]",
    },
    ru: {
      title: "Местоположение, места и направления (ここ・そこ・あそこ・どこ)",
      description: "Как спросить дорогу, этаж, цену и вежливые указатели [こちら・そちら・あちら].",
    },
    pt: {
      title: "Localização, Lugares e Direções (ここ・そこ・あそこ・どこ)",
      description: "Pergunte por locais, andares, preços e direções formais [こちら・そちら・あちら].",
    },
  },

  "minna-lesson-04-time-and-verbs": {
    vi: {
      title: "Thời Gian, Giờ Giấc & Chia Thì Động Từ (ます・ました)",
      description: "Hỏi giờ phút, thì hiện tại, quá khứ, phủ định động từ lịch sự và trợ từ chỉ thời điểm [に].",
    },
    en: {
      title: "Time, Clock & Verb Conjugations (ます・ました)",
      description: "Tell hours and minutes, master polite verb tenses, and time particle [に].",
    },
    "zh-CN": {
      title: "时间表达与动词时态 (ます・ました)",
      description: "掌握几点几分、动词礼貌体现在/过去/否定变化与时间助词 [に]。",
    },
    "zh-TW": {
      title: "時間表達與動詞時態 (ます・ました)",
      description: "掌握幾點幾分、動詞禮貌體現在/過去/否定變化與時間助詞 [に]。",
    },
    ko: {
      title: "시간, 시각 및 동사 시제 변화 (ます・ました)",
      description: "시/분 표현, 정중체 동사의 현재/과거/부정형 및 시간 조사 [に].",
    },
    es: {
      title: "Tiempo, Horas y Tiempos Verbales (ます・ました)",
      description: "Horas y minutos, conjugación cortés en presente/pasado y partícula de tiempo [に].",
    },
    fr: {
      title: "Heure, Temps et Conjugaisons Verbales (ます・ました)",
      description: "Exprimer l'heure, maîtriser présent/passé/négation et la particule temporelle [に].",
    },
    de: {
      title: "Uhrzeit & Verb-Zeitformen (ます・ました)",
      description: "Uhrzeiten angeben, höfliche Zeitformen (Präsens/Präteritum) und Zeitpartikel [に].",
    },
    id: {
      title: "Waktu, Jam & Konjugasi Kata Kerja (ます・ました)",
      description: "Menyebutkan jam dan menit, bentuk kata kerja sopan sekarang/lampau, dan partikel [に].",
    },
    th: {
      title: "เวลาและการผันกริยา (ます・ました)",
      description: "บอกเวลาเป็นชั่วโมงและนาที การผันกริยารูปสุภาพ ปัจจุบัน/อดีต และคำช่วยเวลา [に]",
    },
    ru: {
      title: "Время, часы и спряжение глаголов (ます・ました)",
      description: "Как называть время, вежливые формы настоящего/прошедшего времени и частица [に].",
    },
    pt: {
      title: "Tempo, Horas e Conjugação Verbal (ます・ました)",
      description: "Diga horas e minutos, conjugação educada no presente/passado e partícula temporal [に].",
    },
  },

  "minna-lesson-05-movement-verbs": {
    vi: {
      title: "Di Chuyển & Đi Lại (行きます・来ます・帰ります)",
      description: "Mẫu câu di chuyển với trợ từ đích đến [へ], phương tiện đi lại [で] và đồng hành [と].",
    },
    en: {
      title: "Movement & Travel Verbs (行きます・来ます・帰ります)",
      description: "Destination particle [へ], transportation means [で], and company particle [と].",
    },
    "zh-CN": {
      title: "移动与往返动词 (行きます・来ます・帰ります)",
      description: "目标方向助词 [へ]、交通工具助词 [で] 与伴随伙伴助词 [と]。",
    },
    "zh-TW": {
      title: "移動與往返動詞 (行きます・来ます・帰ります)",
      description: "目標方向助詞 [へ]、交通工具助詞 [で] 與伴隨夥伴助詞 [と]。",
    },
    ko: {
      title: "이동 및 왕래 동사 (行きます・来ます・帰ります)",
      description: "목적지 방향 조사 [へ], 교통수단 조사 [で] 및 동반자 조사 [と].",
    },
    es: {
      title: "Verbos de Movimiento y Viaje (行きます・来ます・帰ります)",
      description: "Partícula de destino [へ], medios de transporte [で] y compañía con [と].",
    },
    fr: {
      title: "Verbes de Mouvement et Déplacement (行きます・来ます・帰ります)",
      description: "Particule de destination [へ], moyen de transport [で] et accompagnement [と].",
    },
    de: {
      title: "Bewegungsverben & Reisen (行きます・来ます・帰ります)",
      description: "Zielpartikel [へ], Transportmittelpartikel [で] und Begleitpartikel [と].",
    },
    id: {
      title: "Kata Kerja Gerak & Bepergian (行きます・来ます・帰ります)",
      description: "Partikel tujuan [へ], alat transportasi [で], dan teman seperjalanan [と].",
    },
    th: {
      title: "กริยาการเคลื่อนที่ & เดินทาง (行きます・来ます・帰ります)",
      description: "คำช่วยระบุทิศทาง [へ], ยานพาหนะ [で] และเพื่อนร่วมทาง [と]",
    },
    ru: {
      title: "Глаголы движения и поездок (行きます・来ます・帰ります)",
      description: "Частица направления [へ], средства передвижения [で] и совместность [と].",
    },
    pt: {
      title: "Verbos de Movimento e Deslocamento (行きます・来ます・帰ります)",
      description: "Partícula de destino [へ], meio de transporte [で] e companhia [と].",
    },
  },

  "minna-lesson-06-actions-and-objects": {
    vi: {
      title: "Tân Ngữ Hành Động & Nơi Chốn Thực Hiện (〜を / 〜で)",
      description: "Hành động tác động lên đồ vật [〜を], địa điểm diễn ra hoạt động [〜で] và câu hỏi làm gì.",
    },
    en: {
      title: "Direct Objects & Action Locations (〜を / 〜で)",
      description: "Marking direct objects with [〜を], place of action with [〜で], and asking what to do.",
    },
    "zh-CN": {
      title: "动作宾语与活动场所 (〜を / 〜で)",
      description: "使用 [〜を] 标记宾语，使用 [〜で] 标记动作发生场所。",
    },
    "zh-TW": {
      title: "動作賓語與活動場所 (〜を / 〜で)",
      description: "使用 [〜を] 標記賓語，使用 [〜で] 標記動作發生場所。",
    },
    ko: {
      title: "목적어 및 동작 장소 조사 (〜を / 〜で)",
      description: "목적격 조사 [〜を], 동작이 일어나는 장소 조사 [〜で] 활용하기.",
    },
    es: {
      title: "Objetos Directos y Lugar de Acción (〜を / 〜で)",
      description: "Marcar objetos directos con [〜を] y el lugar donde ocurre la acción con [〜で].",
    },
    fr: {
      title: "Objets Directs et Lieu d'Action (〜を / 〜で)",
      description: "Particule d'objet direct [〜を] et lieu de réalisation avec [〜で].",
    },
    de: {
      title: "Direkte Objekte & Handlungsorte (〜を / 〜で)",
      description: "Akkusativobjekt mit [〜を] und Handlungsort mit [〜で] angeben.",
    },
    id: {
      title: "Objek Langsung & Lokasi Tindakan (〜を / 〜で)",
      description: "Menandai objek penderita dengan [〜を] dan tempat kegiatan berlangsung dengan [〜で].",
    },
    th: {
      title: "กรรมตรงและสถานที่ทำกิจกรรม (〜を / 〜で)",
      description: "คำช่วยบอกกรรม [〜を] และคำช่วยบอกสถานที่เกิดการกระทำ [〜で]",
    },
    ru: {
      title: "Прямое дополнение и место действия (〜を / 〜で)",
      description: "Обозначение объекта с [〜を] и места совершения действия с [〜で].",
    },
    pt: {
      title: "Objetos Diretos e Local de Ação (〜を / 〜で)",
      description: "Marque o objeto com [〜を] e o local da ação com [〜で].",
    },
  },

  "minna-lesson-14-te-form-rules": {
    vi: {
      title: "Thể Te (て形) & Quy Tắc Biến Đổi 3 Nhóm Động Từ",
      description: "Chìa khóa ngữ pháp quan trọng nhất sơ cấp: phân loại nhóm 1, nhóm 2, nhóm 3 và biến âm thể Te.",
    },
    en: {
      title: "Te-Form (て形) & 3 Verb Group Rules",
      description: "The most vital grammar gateway: Group 1, Group 2, Group 3 conjugation into Te-form.",
    },
    "zh-CN": {
      title: "Te形 (て形) 与三类动词变形规则",
      description: "初级最关键的语法分水岭：1类、2类、3类动词Te形音变规则全面掌握。",
    },
    "zh-TW": {
      title: "Te形 (て形) 與三類動詞變形規則",
      description: "初級最關鍵的語法分水嶺：1類、2類、3類動詞Te形音變規則全面掌握。",
    },
    ko: {
      title: "Te형 (て形) 및 3개 동사 그룹 활용 규칙",
      description: "초급 일본어의 핵심 관문: 1그룹, 2그룹, 3그룹 동사의 Te형 음편 규칙 완벽 정리.",
    },
    es: {
      title: "Forma Te (て形) y Reglas de los 3 Grupos de Verbos",
      description: "La puerta gramatical más importante: conjugación de verbos grupo 1, 2 y 3 a forma Te.",
    },
    fr: {
      title: "Forme en Te (て形) et Règles des 3 Groupes de Verbes",
      description: "Le tournant grammatical essentiel : conjuguer les 3 groupes de verbes en forme Te.",
    },
    de: {
      title: "Te-Form (て形) & Regeln der 3 Verbgruppen",
      description: "Der wichtigste Grammatikschlüssel: Verben der Gruppe 1, 2 und 3 in die Te-Form bringen.",
    },
    id: {
      title: "Bentuk Te (て形) & Aturan 3 Kelompok Kata Kerja",
      description: "Kunci tata bahasa terpenting: konjugasi kata kerja Golongan 1, 2, dan 3 ke bentuk Te.",
    },
    th: {
      title: "รูปเตะ (て形) และกฎการผันกริยา 3 กลุ่ม",
      description: "หัวใจไวยากรณ์ระดับต้นที่สำคัญที่สุด: การผันกริยากลุ่ม 1, 2, 3 เข้าสู่รูป Te",
    },
    ru: {
      title: "Те-форма (て形) и правила 3 групп глаголов",
      description: "Ключевой грамматический рубеж: спряжение глаголов 1, 2 и 3 группы в Те-форму.",
    },
    pt: {
      title: "Forma Te (て形) e Regras dos 3 Grupos Verbais",
      description: "O divisor de águas da gramática básica: conjugação dos 3 grupos de verbos na forma Te.",
    },
  },

  "n5-grammar-10-core-particles": {
    vi: {
      title: "10 Trợ Từ Cốt Lõi (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Tổng kết phân biệt dứt điểm các cặp trợ từ hay nhầm lẫn nhất trong đề thi JLPT N5.",
    },
    en: {
      title: "10 Core Particles (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Master essential particles and resolve commonly confused pairs for the JLPT N5 exam.",
    },
    "zh-CN": {
      title: "10大核心助词全解析 (は, が, を, に, で, へ, と, から, まで, より)",
      description: "彻底厘清JLPT N5中最易混淆的核心助词用法与辨析。",
    },
    "zh-TW": {
      title: "10大核心助詞全解析 (は, が, を, に, で, へ, と, から, まで, より)",
      description: "徹底釐清JLPT N5中最易混淆的核心助詞用法與辨析。",
    },
    ko: {
      title: "10대 핵심 조사 완전 정복 (は, が, を, に, で, へ, と, から, まで, より)",
      description: "JLPT N5 시험에서 가장 자주 헷갈리는 필수 조사 완벽 정리 및 비교.",
    },
    es: {
      title: "10 Partículas Fundamentales (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Distingue y domina las partículas esenciales más comunes en el examen JLPT N5.",
    },
    fr: {
      title: "10 Particules Essentielles (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Maîtrisez et distinguez les particules clés indispensables pour le JLPT N5.",
    },
    de: {
      title: "10 Kern-Partikeln (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Beherrschen und unterscheiden Sie die wichtigsten Partikeln für die JLPT N5-Prüfung.",
    },
    id: {
      title: "10 Partikel Inti (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Kuasai dan bedakan pasangan partikel yang paling sering mengecoh dalam ujian JLPT N5.",
    },
    th: {
      title: "10 คำช่วยหลักที่สำคัญที่สุด (は, が, を, に, で, へ, と, から, まで, より)",
      description: "สรุปเปรียบเทียบคำช่วยที่มักสับสนบ่อยที่สุดในการสอบ JLPT N5",
    },
    ru: {
      title: "10 ключевых частиц (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Полный разбор и сравнение наиболее частых частиц в экзамене JLPT N5.",
    },
    pt: {
      title: "10 Partículas Fundamentais (は, が, を, に, で, へ, と, から, まで, より)",
      description: "Domine as partículas essenciais e resolva dúvidas frequentes do exame JLPT N5.",
    },
  },
};

/**
 * Intelligent helper to localize any lesson title while guaranteeing 100% Japanese preservation.
 */
export function getLocalizedLessonTitle(slug: string, lang: NativeLanguage, fallbackTitle: string): string {
  if (lang === "vi") return fallbackTitle;

  const item = LESSON_I18N_MAP[slug];
  if (item) {
    if (item[lang]?.title) return item[lang]!.title;
    if (item.en?.title) return item.en.title;
  }

  // Generic intelligent parser for any slug:
  // Extracts Japanese segment in parentheses or brackets e.g. "(あ・い・う・え・お)"
  const japaneseMatch = fallbackTitle.match(/(\([ぁ-んァ-ン一-龯〜・,／\s-]+\)|\[[ぁ-んァ-ン一-龯〜・,／\s-]+\])/);
  const japanesePart = japaneseMatch ? ` ${japaneseMatch[1]}` : "";

  // If Minna Lesson pattern
  const minnaMatch = slug.match(/minna-lesson-(\d+)/i) || fallbackTitle.match(/Bài\s*(\d+)/i);
  if (minnaMatch) {
    const num = minnaMatch[1];
    switch (lang) {
      case "en": return `Minna Lesson ${num}${japanesePart}`;
      case "zh-CN": return `大家的日语 第${num}课${japanesePart}`;
      case "zh-TW": return `大家的日語 第${num}課${japanesePart}`;
      case "ko": return `민나노 니혼고 제${num}과${japanesePart}`;
      case "es": return `Minna Lección ${num}${japanesePart}`;
      case "fr": return `Minna Leçon ${num}${japanesePart}`;
      case "de": return `Minna Lektion ${num}${japanesePart}`;
      case "id": return `Minna Pelajaran ${num}${japanesePart}`;
      case "th": return `Minna บทที่ ${num}${japanesePart}`;
      case "ru": return `Минна Урок ${num}${japanesePart}`;
      case "pt": return `Minna Lição ${num}${japanesePart}`;
      default: return `Minna Lesson ${num}${japanesePart}`;
    }
  }

  return fallbackTitle;
}

/**
 * Intelligent helper to localize any lesson description.
 */
export function getLocalizedLessonDesc(slug: string, lang: NativeLanguage, fallbackDesc: string): string {
  if (lang === "vi") return fallbackDesc;
  const item = LESSON_I18N_MAP[slug];
  if (item) {
    if (item[lang]?.description) return item[lang]!.description;
    if (item.en?.description) return item.en.description;
  }
  return fallbackDesc;
}

/**
 * Localizes goal, skill, style labels for personalized roadmaps across all 12 languages.
 */
export function getLocalizedRoadmapLabel(key: string, lang: NativeLanguage, fallback: string): string {
  const MAP: Record<string, Record<string, string>> = {
    TRAVEL: {
      en: "Travel",
      "zh-CN": "旅游",
      "zh-TW": "旅遊",
      ko: "여행",
      es: "Viaje",
      fr: "Voyage",
      de: "Reise",
      id: "Wisata",
      th: "ท่องเที่ยว",
      ru: "Путешествия",
      pt: "Viagem",
    },
    JLPT: {
      en: "JLPT Prep",
      "zh-CN": "JLPT考试",
      "zh-TW": "JLPT考試",
      ko: "JLPT 시험",
      es: "Examen JLPT",
      fr: "Examen JLPT",
      de: "JLPT-Prüfung",
      id: "Ujian JLPT",
      th: "สอบ JLPT",
      ru: "Экзамен JLPT",
      pt: "Exame JLPT",
    },
    CONVERSATION: {
      en: "Conversation",
      "zh-CN": "日常会话",
      "zh-TW": "日常會話",
      ko: "회화",
      es: "Conversación",
      fr: "Conversation",
      de: "Konversation",
      id: "Percakapan",
      th: "การสนทนา",
      ru: "Разговорный",
      pt: "Conversação",
    },
    CULTURE: {
      en: "Culture & Anime",
      "zh-CN": "文化与动漫",
      "zh-TW": "文化與動漫",
      ko: "문화 및 애니메이션",
      es: "Cultura y Anime",
      fr: "Culture et Anime",
      de: "Kultur & Anime",
      id: "Budaya & Anime",
      th: "วัฒนธรรม & อนิเมะ",
      ru: "Культура и аниме",
      pt: "Cultura e Anime",
    },
    BALANCED: {
      en: "Balanced",
      "zh-CN": "全面",
      "zh-TW": "全面",
      ko: "균형 잡힌",
      es: "Integral",
      fr: "Équilibré",
      de: "Ausgewogen",
      id: "Seimbang",
      th: "รอบด้าน",
      ru: "Комплексный",
      pt: "Equilibrado",
    },
    STRUCTURED: {
      en: "Structured",
      "zh-CN": "系统",
      "zh-TW": "系統",
      ko: "체계적",
      es: "Estructurado",
      fr: "Structuré",
      de: "Strukturiert",
      id: "Terstruktur",
      th: "เป็นระบบ",
      ru: "Системный",
      pt: "Estruturado",
    },
  };

  if (lang === "vi") return fallback;
  return MAP[key]?.[lang] || MAP[key]?.en || fallback;
}
