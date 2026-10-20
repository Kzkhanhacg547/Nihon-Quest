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
  "kana-hiragana-vowels": {
      "vi": {
          "title": "Bảng Chữ Cái: Hàng Nguyên Âm (あ・い・う・え・お)",
          "description": "Nền tảng phát âm cốt lõi của toàn bộ hệ thống tiếng Nhật."
      },
      "en": {
          "title": "Kana: Hiragana Vowels (あ・い・う・え・お)",
          "description": "The foundational core vowels of the Japanese phonetic system."
      },
      "zh-CN": {
          "title": "五十音图：平假名元音行 (あ・い・う・え・お)",
          "description": "构成日语完整发音基石的核心元音。"
      },
      "zh-TW": {
          "title": "五十音圖：平假名元音行 (あ・い・う・え・お)",
          "description": "構成日語完整發音基石的核心元音。"
      },
      "ko": {
          "title": "히라가나 모음행 (あ・い・う・え・お)",
          "description": "일본어 발음 체계의 기초가 되는 5대 핵심 모음."
      },
      "es": {
          "title": "Vocales Hiragana (あ・い・う・え・お)",
          "description": "Las vocales fundamentales del sistema fonético japonés."
      },
      "fr": {
          "title": "Voyelles Hiragana (あ・い・う・え・お)",
          "description": "Les voyelles piliers de la phonétique japonaise."
      },
      "de": {
          "title": "Hiragana-Vokale (あ・い・う・え・お)",
          "description": "Die 5 Grundvokale des japanischen Lautsystems."
      },
      "id": {
          "title": "Vokal Hiragana (あ・い・う・え・お)",
          "description": "Vokal dasar fondasi pelafalan bahasa Jepang."
      },
      "th": {
          "title": "สระฮิรางานะ (あ・い・う・え・お)",
          "description": "สระพื้นฐานหลักของการออกเสียงภาษาญี่ปุ่นทั้งหมด"
      },
      "ru": {
          "title": "Гласные хираганы (あ・い・う・え・お)",
          "description": "Базовые гласные японской фонетической системы."
      },
      "pt": {
          "title": "Vogais Hiragana (あ・い・う・え・お)",
          "description": "As vogais fundamentais do sistema fonético japonês."
      }
  },
  "minna-lesson-04-weekdays-kara-made": {
      "vi": {
          "title": "Bài 4: Thời gian, Thứ Ngày & Cặp Giới Từ (から・まで)",
          "description": "Hỏi đáp giờ giấc sinh hoạt, lịch trình tàu điện và mốc thời gian bắt đầu — kết thúc."
      },
      "en": {
          "title": "Lesson 4: Time, Days & Boundaries (から・まで)",
          "description": "Ask about daily schedules, train timetables, and start/end time markers."
      },
      "zh-CN": {
          "title": "第4课：时间、星期与起止介词 (から・まで)",
          "description": "询问日常生活时刻、列车时刻表及起止时间节点。"
      },
      "zh-TW": {
          "title": "第4課：時間、星期與起止介詞 (から・まで)",
          "description": "詢問日常生活時刻、列車時刻表及起止時間節點。"
      },
      "ko": {
          "title": "제4과: 시간, 요일 및 기점·종점 (から・まで)",
          "description": "일과 시간, 열차 시각표 및 시작과 종료 시점을 표현합니다."
      },
      "es": {
          "title": "Lección 4: Horas, días y límites (から・まで)",
          "description": "Pregunta sobre horarios cotidianos, trenes y marcadores de inicio/fin."
      },
      "fr": {
          "title": "Leçon 4 : Heures, jours et bornes (から・まで)",
          "description": "Horaires quotidiens, trains et marqueurs de début et fin."
      },
      "de": {
          "title": "Lektion 4: Uhrzeiten, Wochentage & Grenzen (から・まで)",
          "description": "Tagesabläufe, Fahrpläne und Zeiträume von... bis..."
      },
      "id": {
          "title": "Pelajaran 4: Waktu, Hari & Batasan (から・まで)",
          "description": "Menanyakan jam, jadwal harian, dan rentang waktu dari... hingga..."
      },
      "th": {
          "title": "บทที่ 4: เวลา วัน และคำช่วยระบุช่วง (から・まで)",
          "description": "บอกเวลา ตารางเวลาประจำวัน และช่วงเวลาตั้งแต่...ถึง..."
      },
      "ru": {
          "title": "Урок 4: Время, дни недели и границы (から・まで)",
          "description": "Учимся называть время, расписания и временные рамки от и до."
      },
      "pt": {
          "title": "Lição 4: Horas, dias e limites (から・まで)",
          "description": "Pergunte sobre horários diários, trens e marcadores de início e fim."
      }
  },
  "minna-lesson-06-invitations": {
      "vi": {
          "title": "Bài 6: Lời Mời & Rủ Rê Thân Mật (〜ませんか・〜ましょう)",
          "description": "Mời bạn bè đi ăn uống, xem phim và phản hồi lịch sự bằng tiếng Nhật tự nhiên."
      },
      "en": {
          "title": "Lesson 6: Friendly Invitations (〜ませんか・〜ましょう)",
          "description": "Invite friends out for meals, movies, and respond naturally in polite Japanese."
      },
      "zh-CN": {
          "title": "第6课：邀请与提议 (〜ませんか・〜ましょう)",
          "description": "邀请朋友共进餐饮、观影，并用自然地道的日语礼貌应答。"
      },
      "zh-TW": {
          "title": "第6課：邀請與提議 (〜ませんか・〜ましょう)",
          "description": "邀請朋友共進餐飲、觀影，並用自然地道的日語禮貌應答。"
      },
      "ko": {
          "title": "제6과: 정중한 권유와 제안 (〜ませんか・〜ましょう)",
          "description": "식사나 영화 관람을 제안하고 자연스럽게 응답하는 표현."
      },
      "es": {
          "title": "Lección 6: Invitaciones cordiales (〜ませんか・〜ましょう)",
          "description": "Invita a amigos a comer, al cine y responde de forma natural y educada."
      },
      "fr": {
          "title": "Leçon 6 : Invitations amicales (〜ませんか・〜ましょう)",
          "description": "Inviter des amis à sortir et répondre poliment et naturellement."
      },
      "de": {
          "title": "Lektion 6: Höfliche Einladungen (〜ませんか・〜ましょう)",
          "description": "Gemeinsame Aktivitäten vorschlagen und freundlich darauf reagieren."
      },
      "id": {
          "title": "Pelajaran 6: Mengajak & Mengusulkan (〜ませんか・〜ましょう)",
          "description": "Mengajak teman makan, nonton film, dan merespons dengan sopan."
      },
      "th": {
          "title": "บทที่ 6: การชักชวนและการตอบรับ (〜ませんか・〜ましょう)",
          "description": "ชวนเพื่อนไปทานข้าว ดูหนัง และตอบรับอย่างสุภาพเป็นธรรมชาติ"
      },
      "ru": {
          "title": "Урок 6: Вежливые приглашения (〜ませんか・〜ましょう)",
          "description": "Приглашайте друзей на обед или в кино и отвечайте вежливо."
      },
      "pt": {
          "title": "Lição 6: Convites cordiais (〜ませんか・〜ましょう)",
          "description": "Convide amigos para refeições ou passeios e responda educadamente."
      }
  },
  "minna-lesson-07-tools-and-giving": {
      "vi": {
          "title": "Bài 7: Công Cụ, Phương Tiện & Trao Nhận Quà (で・あげます・もらいます)",
          "description": "Nói về việc ăn bằng đũa, viết bằng bút và văn hóa tặng quà trong đời sống."
      },
      "en": {
          "title": "Lesson 7: Tools, Means & Giving/Receiving (で・あげます・もらいます)",
          "description": "Talk about eating with chopsticks, tools used, and gift-giving etiquette."
      },
      "zh-CN": {
          "title": "第7课：工具、手段与授受关系 (で・あげます・もらいます)",
          "description": "表达使用筷子、工具及日常生活中的送礼与收礼礼仪。"
      },
      "zh-TW": {
          "title": "第7課：工具、手段與授受關係 (で・あげます・もらいます)",
          "description": "表達使用筷子、工具及日常生活中的送禮與收禮禮儀。"
      },
      "ko": {
          "title": "제7과: 수단·도구 및 수수 표현 (で・あげます・もらいます)",
          "description": "도구 사용법(젓가락 등)과 주고받는 선물 문화 표현."
      },
      "es": {
          "title": "Lección 7: Herramientas, medios y regalos (で・あげます・もらいます)",
          "description": "Hablar sobre usar palillos, medios y etiqueta de regalos."
      },
      "fr": {
          "title": "Leçon 7 : Outils, moyens et dons (で・あげます・もらいます)",
          "description": "Exprimer les moyens d'action et l'étiquette des cadeaux offerts/reçus."
      },
      "de": {
          "title": "Lektion 7: Werkzeuge, Mittel & Geben/Nehmen (で・あげます・もらいます)",
          "description": "Mittel und Werkzeuge ausdrücken sowie Geschenkkultur."
      },
      "id": {
          "title": "Pelajaran 7: Alat, Sarana & Memberi/Menerima (で・あげます・もらいます)",
          "description": "Berbicara tentang menggunakan sumpit, alat, dan etika memberi hadiah."
      },
      "th": {
          "title": "บทที่ 7: อุปกรณ์ วิธีการ และการให้-รับ (で・あげます・もらいます)",
          "description": "บอกวิธีการใช้เครื่องมือ และวัฒนธรรมการให้และการรับของขวัญ"
      },
      "ru": {
          "title": "Урок 7: Инструменты, средства и подарки (で・あげます・もらいます)",
          "description": "Как говорить об инструментах, средствах и подарках."
      },
      "pt": {
          "title": "Lição 7: Ferramentas, meios e presentes (で・あげます・もらいます)",
          "description": "Fale sobre ferramentas, meios e etiqueta ao presentear."
      }
  },
  "minna-lesson-08-i-adjectives": {
      "vi": {
          "title": "Bài 8 (Phần 1): Tính Từ Đuôi -i (い形容詞) & Miêu Tả Trạng Thái",
          "description": "Miêu tả đồ vật, thời tiết và hương vị món ăn (nóng, lạnh, ngon, đắt)."
      },
      "en": {
          "title": "Lesson 8 (Part 1): I-Adjectives (い形容詞) & Descriptions",
          "description": "Describe objects, weather, and food flavors (hot, cold, delicious, expensive)."
      },
      "zh-CN": {
          "title": "第8课(上)：一类形容词 / い形容词与状态描摹",
          "description": "描摹物品特质、天气及食物味道（冷暖、美味、价格高低）。"
      },
      "zh-TW": {
          "title": "第8課(上)：一類形容詞 / い形容詞與狀態描摹",
          "description": "描摹物品特質、天氣及食物味道（冷暖、美味、價格高低）。"
      },
      "ko": {
          "title": "제8과(상): 이형용사(い形容詞)와 상태 묘사",
          "description": "사물의 특징, 날씨 및 음식 맛을 풍부하게 묘사합니다."
      },
      "es": {
          "title": "Lección 8 (Parte 1): Adjetivos-i (い形容詞) y descripción",
          "description": "Describe objetos, el clima y los sabores de la comida."
      },
      "fr": {
          "title": "Leçon 8 (Partie 1) : Adjectifs en -i (い形容詞) & descriptions",
          "description": "Décrire des objets, la météo et la nourriture."
      },
      "de": {
          "title": "Lektion 8 (Teil 1): I-Adjektive (い形容詞) & Beschreibungen",
          "description": "Eigenschaften, Wetter und Geschmäcker treffend beschreiben."
      },
      "id": {
          "title": "Pelajaran 8 (Bagian 1): Kata Sifat -i (い形容詞) & Deskripsi",
          "description": "Mendeskripsikan benda, cuaca, dan rasa makanan."
      },
      "th": {
          "title": "บทที่ 8 (ตอนที่ 1): คำคุณศัพท์ลงท้าย -i (い形容詞) และการบอกลักษณะ",
          "description": "บรรยายสิ่งของ สภาพอากาศ และรสชาติอาหาร"
      },
      "ru": {
          "title": "Урок 8 (Часть 1): И-прилагательные (い形容詞) и описания",
          "description": "Описываем предметы, погоду и вкус блюд."
      },
      "pt": {
          "title": "Lição 8 (Parte 1): Adjetivos-i (い形容詞) e descrições",
          "description": "Descreva objetos, o clima e o sabor dos alimentos."
      }
  },
  "minna-lesson-08-09-na-adj-preferences": {
      "vi": {
          "title": "Bài 8-9: Tính Từ Đuôi -na (な形容詞) & Sở Thích (好き・上手)",
          "description": "Bày tỏ sở thích, năng khiếu và đánh giá không gian (yên tĩnh, náo nhiệt)."
      },
      "en": {
          "title": "Lessons 8-9: Na-Adjectives (な形容詞) & Preferences (好き・上手)",
          "description": "Express likes, talents, and describe environments (quiet, lively, convenient)."
      },
      "zh-CN": {
          "title": "第8-9课：二类形容词 / な形容词与喜好才能 (好き・上手)",
          "description": "表达喜好爱好、个人专长以及评价环境场所（安静、繁华、便利）。"
      },
      "zh-TW": {
          "title": "第8-9課：二類形容詞 / な形容詞與喜好才能 (好き・上手)",
          "description": "表達喜好愛好、個人專長以及評價環境場所（安靜、繁華、便利）。"
      },
      "ko": {
          "title": "제8-9과: 나형용사(な形容詞) 및 기호·능력 (好き・上手)",
          "description": "좋아하는 것, 잘하는 분야 및 장소의 분위기 표현."
      },
      "es": {
          "title": "Lecciones 8-9: Adjetivos-na (な形容詞) y preferencias (好き・上手)",
          "description": "Expresa gustos, talentos y describe ambientes (tranquilo, animado)."
      },
      "fr": {
          "title": "Leçons 8-9 : Adjectifs en -na (な形容詞) & préférences",
          "description": "Exprimer ses goûts, compétences et décrire des lieux."
      },
      "de": {
          "title": "Lektion 8-9: Na-Adjektive (な形容詞) & Vorlieben (好き・上手)",
          "description": "Vorlieben, Talente und Orte treffend beschreiben."
      },
      "id": {
          "title": "Pelajaran 8-9: Kata Sifat -na (な形容詞) & Kesukaan (好き・上手)",
          "description": "Mengungkapkan kesukaan, bakat, dan suasana tempat."
      },
      "th": {
          "title": "บทที่ 8-9: คำคุณศัพท์ลงท้าย -na (な形容詞) และความชอบ (好き・上手)",
          "description": "บอกความชอบ ความถนัด และบรรยายสถานที่"
      },
      "ru": {
          "title": "Уроки 8-9: На-прилагательные (な形容詞) и предпочтения",
          "description": "Говорим о том, что нравится, о талантах и атмосфере мест."
      },
      "pt": {
          "title": "Lições 8-9: Adjetivos-na (な形容詞) e preferências (好き・上手)",
          "description": "Expresse gostos, habilidades e descreva ambientes."
      }
  },
  "minna-lesson-10-arimasu-imasu": {
      "vi": {
          "title": "Bài 10: Tồn Tại Của Vật & Người (あります・います)",
          "description": "Phân biệt sự hiện diện của sinh vật sống và tĩnh vật kèm vị trí không gian."
      },
      "en": {
          "title": "Lesson 10: Existence of Things & Living Beings (あります・います)",
          "description": "Distinguish between animate and inanimate existence with spatial locations."
      },
      "zh-CN": {
          "title": "第10课：人与事物的存在表达 (あります・います)",
          "description": "准确区分有生命生物与无生命物体的存在，并结合空间方位说明。"
      },
      "zh-TW": {
          "title": "第10課：人與事物的存在表達 (あります・います)",
          "description": "準確區分有生命生物與無生命物體的存在，並結合空間方位說明。"
      },
      "ko": {
          "title": "제10과: 사물과 사람의 존재 표현 (あります・います)",
          "description": "생물과 무생물의 존재를 명확히 구별하고 위치 관계를 설명합니다."
      },
      "es": {
          "title": "Lección 10: Existencia de cosas y seres vivos (あります・います)",
          "description": "Distingue la presencia de seres vivos e inanimados con ubicación."
      },
      "fr": {
          "title": "Leçon 10 : Existence des êtres et objets (あります・います)",
          "description": "Distinguer la présence des êtres animés et inanimés dans l'espace."
      },
      "de": {
          "title": "Lektion 10: Existenz von Personen & Gegenständen (あります・います)",
          "description": "Unterscheidung zwischen belebter und unbelebter Existenz mit Ortsangaben."
      },
      "id": {
          "title": "Pelajaran 10: Keberadaan Benda & Makhluk Hidup (あります・います)",
          "description": "Membedakan keberadaan makhluk hidup dan benda mati beserta posisinya."
      },
      "th": {
          "title": "บทที่ 10: การบอกการมีอยู่ของสิ่งมีชีวิตและสิ่งของ (あります・います)",
          "description": "แยกแยะการมีอยู่ของสิ่งมีชีวิตและสิ่งไม่มีชีวิตพร้อมบอกตำแหน่ง"
      },
      "ru": {
          "title": "Урок 10: Существование предметов и одушевленных лиц (あります・います)",
          "description": "Различие между одушевленными и неодушевленными объектами."
      },
      "pt": {
          "title": "Lição 10: Existência de coisas e seres vivos (あります・います)",
          "description": "Distinga a presença de seres animados e objetos no espaço."
      }
  },
  "minna-lesson-11-counters-quantifiers": {
      "vi": {
          "title": "Bài 11: Lượng Từ & Đếm Số Trong Đời Sống (ひとつ・枚・本・杯)",
          "description": "Đếm đồ vật, gọi món tại quán ăn và diễn đạt tần suất thời gian."
      },
      "en": {
          "title": "Lesson 11: Counters & Quantifiers (ひとつ・枚・本・杯)",
          "description": "Count everyday items, order food portions, and express frequency."
      },
      "zh-CN": {
          "title": "第11课：量词与生活计数体系 (ひとつ・枚・本・杯)",
          "description": "熟练清点各类物品、餐厅点单份数以及表达动作频率。"
      },
      "zh-TW": {
          "title": "第11課：量詞與生活計數體系 (ひとつ・枚・本・杯)",
          "description": "熟練清點各類物品、餐廳點單份數以及表達動作頻率。"
      },
      "ko": {
          "title": "제11과: 수량사와 조수사 체계 (ひとつ・枚・本・杯)",
          "description": "사물 개수 세기, 식당 주문 및 시간 빈도 표현."
      },
      "es": {
          "title": "Lección 11: Contadores y cuantificadores (ひとつ・枚・本・杯)",
          "description": "Cuenta objetos cotidianos, pide platos y expresa frecuencia."
      },
      "fr": {
          "title": "Leçon 11 : Compteurs et quantités (ひとつ・枚・本・杯)",
          "description": "Compter les objets du quotidien, commander au restaurant et exprimer la fréquence."
      },
      "de": {
          "title": "Lektion 11: Zählwörter & Mengenangaben (ひとつ・枚・本・杯)",
          "description": "Gegenstände zählen, im Restaurant bestellen und Häufigkeit angeben."
      },
      "id": {
          "title": "Pelajaran 11: Kata Bantu Bilangan (ひとつ・枚・本・杯)",
          "description": "Menghitung berbagai benda, memesan makanan, dan menyatakan frekuensi."
      },
      "th": {
          "title": "บทที่ 11: ลักษณนามและการนับจำนวน (ひとつ・枚・本・杯)",
          "description": "นับสิ่งของ สั่งอาหาร และบอกความถี่ในชีวิตประจำวัน"
      },
      "ru": {
          "title": "Урок 11: Счетные суффиксы и количество (ひとつ・枚・本・杯)",
          "description": "Счет предметов, заказ блюд в ресторане и выражение частоты."
      },
      "pt": {
          "title": "Lição 11: Contadores e quantificadores (ひとつ・枚・本・杯)",
          "description": "Conte objetos diários, faça pedidos em restaurantes e expresse frequência."
      }
  },
  "minna-lesson-12-comparisons": {
      "vi": {
          "title": "Bài 12: So Sánh Hơn Nhất & Thì Quá Khứ Tính Từ (〜より・一番)",
          "description": "So sánh mức độ giữa 2 đối tượng hoặc trong một tập thể, kèm thì quá khứ tính từ."
      },
      "en": {
          "title": "Lesson 12: Comparisons & Past Adjectives (〜より・一番)",
          "description": "Compare two things, select the superlative in a group, and use past-tense adjectives."
      },
      "zh-CN": {
          "title": "第12课：比较句型与形容词过去时 (〜より・一番)",
          "description": "二者对比、群体中选最以及形容词过去时的准确变换。"
      },
      "zh-TW": {
          "title": "第12課：比較句型與形容詞過去時 (〜より・一番)",
          "description": "二者對比、群體中選最以及形容詞過去時的準確變換。"
      },
      "ko": {
          "title": "제12과: 비교 구문 및 형용사 과거형 (〜より・一番)",
          "description": "두 대상의 비교, 최상급 표현 및 형용사의 과거 시제."
      },
      "es": {
          "title": "Lección 12: Comparaciones y pasado de adjetivos (〜より・一番)",
          "description": "Compara dos elementos, superlativos y tiempo pasado de adjetivos."
      },
      "fr": {
          "title": "Leçon 12 : Comparaisons et adjectifs au passé (〜より・一番)",
          "description": "Comparer deux éléments, le superlatif et le passé des adjectifs."
      },
      "de": {
          "title": "Lektion 12: Vergleiche & Vergangenheitsform (〜より・一番)",
          "description": "Dinge vergleichen, Superlativ bilden und Adjektive in der Vergangenheit."
      },
      "id": {
          "title": "Pelajaran 12: Kalimat Perbandingan & Lampau (〜より・一番)",
          "description": "Membandingkan dua objek, paling unggul, dan bentuk lampau kata sifat."
      },
      "th": {
          "title": "บทที่ 12: การเปรียบเทียบและรูปอดีตของคำคุณศัพท์ (〜より・一番)",
          "description": "เปรียบเทียบสิ่งของ ขั้นสูงสุด และรูปอดีตของคำคุณศัพท์"
      },
      "ru": {
          "title": "Урок 12: Сравнения и прошедшее время прилагательных (〜より・一番)",
          "description": "Сравнение предметов, превосходная степень и прошедшее время."
      },
      "pt": {
          "title": "Lição 12: Comparações e passado de adjetivos (〜より・一番)",
          "description": "Compare itens, forme superlativos e use adjetivos no passado."
      }
  },
  "minna-lesson-13-desires-and-purposes": {
      "vi": {
          "title": "Bài 13: Mong Muốn & Mục Đích Di Chuyển (〜たい・〜に行く)",
          "description": "Bày tỏ nguyện vọng cá nhân và mục đích khi đi đến một địa điểm."
      },
      "en": {
          "title": "Lesson 13: Desires & Purpose of Movement (〜たい・〜に行く)",
          "description": "Express personal wishes and stating reasons for going somewhere."
      },
      "zh-CN": {
          "title": "第13课：愿望表达与移动目的 (〜たい・〜に行く)",
          "description": "表达个人意愿想法以及前往某处的具体行动目的。"
      },
      "zh-TW": {
          "title": "第13課：願望表達與移動目的 (〜たい・〜に行く)",
          "description": "表達個人意願想法以及前往某處的具體行動目的。"
      },
      "ko": {
          "title": "제13과: 희망 표현과 이동 목적 (〜たい・〜に行く)",
          "description": "하고 싶은 일(소망)과 어디에 무언가를 하러 가는 목적 표현."
      },
      "es": {
          "title": "Lección 13: Deseos y propósito de movimiento (〜たい・〜に行く)",
          "description": "Expresa deseos personales y el propósito de desplazarte a un lugar."
      },
      "fr": {
          "title": "Leçon 13 : Désirs et but du déplacement (〜たい・〜に行く)",
          "description": "Exprimer ses souhaits et le but d'un déplacement."
      },
      "de": {
          "title": "Lektion 13: Wünsche & Zweck einer Bewegung (〜たい・〜に行く)",
          "description": "Persönliche Wünsche äußern und den Zweck eines Ortswechsels nennen."
      },
      "id": {
          "title": "Pelajaran 13: Keinginan & Tujuan Perjalanan (〜たい・〜に行く)",
          "description": "Mengungkapkan keinginan pribadi dan tujuan pergi ke suatu tempat."
      },
      "th": {
          "title": "บทที่ 13: ความต้องการและจุดประสงค์ของการเดินทาง (〜たい・〜に行く)",
          "description": "บอกความต้องการของตนเองและบอกจุดประสงค์ในการเดินทางไปทำสิ่งต่างๆ"
      },
      "ru": {
          "title": "Урок 13: Желания и цель движения (〜たい・〜に行く)",
          "description": "Выражение собственных желаний и целей перемещения куда-либо."
      },
      "pt": {
          "title": "Lição 13: Desejos e propósito de movimento (〜たい・〜に行く)",
          "description": "Expresse desejos pessoais e a finalidade de se deslocar a algum lugar."
      }
  },
  "minna-lesson-14-requests-and-progressive": {
      "vi": {
          "title": "Bài 14: Thể Te, Nhờ Vả & Hành Động Đang Diễn Ra (〜てください・〜ています)",
          "description": "Cột mốc then chốt: Chuyển đổi thể Te, đưa ra lời nhờ vả lịch sự và nói về hiện tại tiếp diễn."
      },
      "en": {
          "title": "Lesson 14: Te-Form, Polite Requests & Ongoing Actions (〜てください・〜ています)",
          "description": "Mastering the Te-form, making polite requests, and expressing ongoing actions."
      },
      "zh-CN": {
          "title": "第14课：て形、礼貌请求与进行时 (〜てください・〜ています)",
          "description": "核心里程碑：掌握动词て形变形，发出礼貌请求与描述正在进行的动作。"
      },
      "zh-TW": {
          "title": "第14課：て形、禮貌請求與進行時 (〜てください・〜ています)",
          "description": "核心里程碑：掌握動詞て形變形，發出禮貌請求與描述正在進行的動作。"
      },
      "ko": {
          "title": "제14과: 테형(て形), 정중한 부탁과 진행형 (〜てください・〜ています)",
          "description": "핵심 문법: 동사 테형 변환, 정중한 요청 및 현재 진행 중인 동작."
      },
      "es": {
          "title": "Lección 14: Forma Te, peticiones y acciones en progreso (〜てください・〜ています)",
          "description": "Domina la forma Te, haz peticiones educadas y describe acciones continuas."
      },
      "fr": {
          "title": "Leçon 14 : Forme en Te, requêtes polies et actions en cours",
          "description": "Maîtriser la forme en Te, faire des demandes et exprimer l'action continue."
      },
      "de": {
          "title": "Lektion 14: Te-Form, Bitten & Verlaufsform (〜てください・〜ています)",
          "description": "Die Te-Form meistern, höflich bitten und Handlungen im Verlauf beschreiben."
      },
      "id": {
          "title": "Pelajaran 14: Bentuk Te, Permohonan & Sedang Berlangsung",
          "description": "Menguasai bentuk Te, meminta tolong dengan sopan, dan aksi yang sedang berlangsung."
      },
      "th": {
          "title": "บทที่ 14: รูป Te การขอร้องอย่างสุภาพ และการกระทำที่กำลังดำเนินอยู่",
          "description": "ผันกริยารูป Te ขอร้องอย่างสุภาพ และบอกการกระทำที่กำลังทำอยู่"
      },
      "ru": {
          "title": "Урок 14: Те-форма, вежливые просьбы и длительный вид",
          "description": "Освоение Те-формы глагола, формулирование просьб и длительные действия."
      },
      "pt": {
          "title": "Lição 14: Forma Te, pedidos educados e ações contínuas",
          "description": "Domine a forma Te, faça solicitações gentis e descreva ações em andamento."
      }
  },
  "minna-lesson-15-permission-prohibition": {
      "vi": {
          "title": "Bài 15 (Phần 1): Cho Phép & Cấm Đoán (〜てもいいです・〜てはいけません)",
          "description": "Hỏi xin phép làm điều gì đó và diễn đạt quy tắc cấm chỉ trong nơi công cộng."
      },
      "en": {
          "title": "Lesson 15 (Part 1): Permission & Prohibition (〜てもいいです・〜てはいけません)",
          "description": "Ask for permission and express rules or prohibitions in public spaces."
      },
      "zh-CN": {
          "title": "第15课(上)：许可与禁止规则 (〜てもいいです・〜てはいけません)",
          "description": "礼貌征询许可做某事，以及理解公共场所的规章与禁止要求。"
      },
      "zh-TW": {
          "title": "第15課(上)：許可與禁止規則 (〜てもいいです・〜てはいけません)",
          "description": "禮貌徵詢許可做某事，以及理解公共場所的規章與禁止要求。"
      },
      "ko": {
          "title": "제15과(상): 허가와 금지 규칙 (〜てもいいです・〜てはいけません)",
          "description": "허가를 구하는 질문과 공공장소에서의 금지 규정 표현."
      },
      "es": {
          "title": "Lección 15 (Parte 1): Permiso y prohibición (〜てもいいです・〜てはいけません)",
          "description": "Pide permiso y comprende normas o prohibiciones en lugares públicos."
      },
      "fr": {
          "title": "Leçon 15 (Partie 1) : Permission et interdiction",
          "description": "Demander la permission et exprimer les règles d'interdiction dans les lieux publics."
      },
      "de": {
          "title": "Lektion 15 (Teil 1): Erlaubnis & Verbot (〜てもいいです・〜てはいけません)",
          "description": "Um Erlaubnis bitten und Verbote im öffentlichen Raum verstehen."
      },
      "id": {
          "title": "Pelajaran 15 (Bagian 1): Izin & Larangan",
          "description": "Meminta izin dan memahami aturan larangan di tempat umum."
      },
      "th": {
          "title": "บทที่ 15 (ตอนที่ 1): การขออนุญาตและข้อห้าม",
          "description": "ขออนุญาตทำสิ่งต่างๆ และบอกกฎข้อห้ามในที่สาธารณะ"
      },
      "ru": {
          "title": "Урок 15 (Часть 1): Разрешение и запрет",
          "description": "Как спрашивать разрешение и выражать правила запрета в общественных местах."
      },
      "pt": {
          "title": "Lição 15 (Parte 1): Permissão e proibição",
          "description": "Peça permissão e compreenda proibições e regras em locais públicos."
      }
  },
  "minna-lesson-15-status-and-profession": {
      "vi": {
          "title": "Bài 15 (Phần 2): Trạng Thái Kéo Dài & Nghề Nghiệp (〜ています)",
          "description": "Nói về tình trạng hôn nhân, nơi cư trú, công việc và sản phẩm của công ty."
      },
      "en": {
          "title": "Lesson 15 (Part 2): Enduring States & Profession (〜ています)",
          "description": "Express marital status, residence, current occupation, and company products."
      },
      "zh-CN": {
          "title": "第15课(下)：持续状态与职业身份 (〜ています)",
          "description": "表达居住地、婚姻状况、当前职业以及公司生产销售的产品。"
      },
      "zh-TW": {
          "title": "第15課(下)：持續狀態與職業身份 (〜ています)",
          "description": "表達居住地、婚姻狀況、當前職業以及公司生產銷售的產品。"
      },
      "ko": {
          "title": "제15과(하): 지속 상태 및 직업·거주 (〜ています)",
          "description": "거주지, 결혼 여부, 현재 종사하는 직업과 기업 생산품 표현."
      },
      "es": {
          "title": "Lección 15 (Parte 2): Estados duraderos y profesión (〜ています)",
          "description": "Expresa estado civil, residencia, profesión y productos de empresas."
      },
      "fr": {
          "title": "Leçon 15 (Partie 2) : États durables et profession (〜ています)",
          "description": "Parler du statut marital, du lieu de résidence et du métier."
      },
      "de": {
          "title": "Lektion 15 (Teil 2): Dauerzustände & Beruf (〜ています)",
          "description": "Wohnort, Familienstand, Beruf und Unternehmensprodukte beschreiben."
      },
      "id": {
          "title": "Pelajaran 15 (Bagian 2): Status Berkelanjutan & Profesi",
          "description": "Menjelaskan tempat tinggal, status perkawinan, dan pekerjaan saat ini."
      },
      "th": {
          "title": "บทที่ 15 (ตอนที่ 2): สภาพต่อเนื่องและอาชีพการงาน",
          "description": "บอกสถานะ ที่อยู่อาศัย และอาชีพการงานปัจจุบัน"
      },
      "ru": {
          "title": "Урок 15 (Часть 2): Постоянные состояния и профессия",
          "description": "Место жительства, семейное положение и сфера занятости."
      },
      "pt": {
          "title": "Lição 15 (Parte 2): Estados duradouros e profissão",
          "description": "Fale sobre residência, estado civil, ocupação e profissão."
      }
  },
  "minna-lesson-16-connecting-clauses": {
      "vi": {
          "title": "Bài 16 (Phần 1): Nối Chuỗi Hành Động & Tính Chất (〜て、〜て)",
          "description": "Kết nối nhiều hành động tuần tự theo thời gian và kết hợp nhiều đặc tính của người/vật."
      },
      "en": {
          "title": "Lesson 16 (Part 1): Sequencing Actions & Linking Traits (〜て、〜て)",
          "description": "Chain multiple chronological actions and link descriptive adjectives."
      },
      "zh-CN": {
          "title": "第16课(上)：动作先后顺叙与特征并列 (〜て、〜て)",
          "description": "按时间顺序连接多个连续动作，并列描述人或事物的多项特征。"
      },
      "zh-TW": {
          "title": "第16課(上)：動作先後順敘與特徵並列 (〜て、〜て)",
          "description": "按時間順序連接多個連續動作，並列描述人或事物的多項特徵。"
      },
      "ko": {
          "title": "제16과(상): 순차 동작 연결 및 특성 병렬 (〜て、〜て)",
          "description": "시간 순서에 따른 연속 행동 나열과 여러 특징의 병렬 연결."
      },
      "es": {
          "title": "Lección 16 (Parte 1): Encadenar acciones y cualidades (〜て、〜て)",
          "description": "Conecta acciones cronológicas y combina características descriptivas."
      },
      "fr": {
          "title": "Leçon 16 (Partie 1) : Enchaînement d'actions et traits",
          "description": "Relier des actions chronologiques et associer des caractéristiques."
      },
      "de": {
          "title": "Lektion 16 (Teil 1): Handlungsfolgen & Eigenschaften verbinden",
          "description": "Chronologische Handlungsabläufe und Eigenschaften aneinanderreihen."
      },
      "id": {
          "title": "Pelajaran 16 (Bagian 1): Rangkaian Aksi & Karakteristik",
          "description": "Menghubungkan beberapa tindakan berurutan dan sifat deskriptif."
      },
      "th": {
          "title": "บทที่ 16 (ตอนที่ 1): การเชื่อมต่อการกระทำตามลำดับและคุณลักษณะ",
          "description": "เชื่อมประโยคการกระทำตามลำดับเวลา และบอกลักษณะหลายอย่างพร้อมกัน"
      },
      "ru": {
          "title": "Урок 16 (Часть 1): Последовательность действий и свойств",
          "description": "Связывание действий по порядку и соединение характеристик."
      },
      "pt": {
          "title": "Lição 16 (Parte 1): Encadeamento de ações e qualidades",
          "description": "Conecte ações cronológicas e combine traços descritivos."
      }
  },
  "minna-lesson-16-te-kara-body": {
      "vi": {
          "title": "Bài 16 (Phần 2): Sau Khi Làm Xong & Miêu Tả Cơ Thể (〜てから・〜は〜が)",
          "description": "Hành động chỉ diễn ra sau khi hoàn tất việc trước, và miêu tả đặc điểm ngoại hình."
      },
      "en": {
          "title": "Lesson 16 (Part 2): 'After Doing' & Physical Traits (〜てから・〜は〜が)",
          "description": "Express actions contingent on completing a prior task, and describe physical traits."
      },
      "zh-CN": {
          "title": "第16课(下)：完成前置动作后与身体特征描绘 (〜てから・〜は〜が)",
          "description": "说明必须先做完某事后再做后事，以及描绘人物外貌身材特征。"
      },
      "zh-TW": {
          "title": "第16課(下)：完成前置動作後與身體特徵描繪 (〜てから・〜は〜が)",
          "description": "說明必須先做完某事後再做後事，以及描繪人物外貌身材特徵。"
      },
      "ko": {
          "title": "제16과(하): 선행 동작 완료 후 및 신체 특징 묘사 (〜てから・〜は〜が)",
          "description": "어떤 일을 끝마친 뒤에 다음 일을 함을 나타내고 신체 특징 묘사."
      },
      "es": {
          "title": "Lección 16 (Parte 2): 'Después de' y rasgos físicos (〜てから・〜は〜が)",
          "description": "Expresa hacer algo tras completar una tarea previa y describe rasgos físicos."
      },
      "fr": {
          "title": "Leçon 16 (Partie 2) : 'Après avoir fait' & traits physiques",
          "description": "Exprimer une action consécutive et décrire l'apparence physique."
      },
      "de": {
          "title": "Lektion 16 (Teil 2): „Nachdem...“ & Aussehen beschreiben",
          "description": "Handlungen nach Abschluss einer vorherigen und Personen beschreiben."
      },
      "id": {
          "title": "Pelajaran 16 (Bagian 2): 'Setelah Melakukan' & Ciri Fisik",
          "description": "Menyatakan tindakan setelah hal sebelumnya selesai dan mendeskripsikan fisik."
      },
      "th": {
          "title": "บทที่ 16 (ตอนที่ 2): หลังจากทำสิ่งหนึ่งแล้ว และการบอกลักษณะทางกายภาพ",
          "description": "บอกการทำสิ่งหนึ่งหลังจากทำอีกสิ่งเสร็จ และบอกลักษณะรูปร่างภายนอก"
      },
      "ru": {
          "title": "Урок 16 (Часть 2): «После того как» и внешность",
          "description": "Действия после завершения предыдущего и описание внешности."
      },
      "pt": {
          "title": "Lição 16 (Parte 2): 'Depois de fazer' e traços físicos",
          "description": "Expresse ações após concluir outra tarefa e descreva a aparência física."
      }
  },
  "minna-lesson-17-nai-form-prohibition": {
      "vi": {
          "title": "Bài 17: Thể Nai & Lời Khuyên Không Nên Làm (〜ないでください)",
          "description": "Quy tắc chia thể Nai, căn dặn bảo vệ sức khỏe hoặc tuân thủ an toàn (đừng quên, đừng hút thuốc)."
      },
      "en": {
          "title": "Lesson 17: Nai-Form & Negative Requests (〜ないでください)",
          "description": "Conjugate the Nai-form, issue health advice and safety rules (please don't forget, don't smoke)."
      },
      "zh-CN": {
          "title": "第17课：ない形变形与请勿做某事 (〜ないでください)",
          "description": "动词ない形变形规则，提醒健康习惯及安全指引（请勿遗忘、请勿吸烟）。"
      },
      "zh-TW": {
          "title": "第17課：ない形變形與請勿做某事 (〜ないでください)",
          "description": "動詞ない形變形規則，提醒健康習慣及安全指引（請勿遺忘、請勿吸煙）。"
      },
      "ko": {
          "title": "제17과: 나이형(ない形)과 정중한 금지·요청 (〜ないでください)",
          "description": "나이형 활용 규칙, 건강 유의 사항 및 안전 수칙 당부 표현."
      },
      "es": {
          "title": "Lección 17: Forma Nai y ruegos negativos (〜ないでください)",
          "description": "Conjuga la forma Nai, da consejos de salud y seguridad (por favor no olvide)."
      },
      "fr": {
          "title": "Leçon 17 : Forme en Nai et conseils négatifs",
          "description": "Conjugaison en Nai et recommandations (veuillez ne pas oublier, interdiction)."
      },
      "de": {
          "title": "Lektion 17: Nai-Form & Bitte, etwas nicht zu tun (〜ないでください)",
          "description": "Verneinende Bitten, Gesundheits- und Sicherheitshinweise formulieren."
      },
      "id": {
          "title": "Pelajaran 17: Bentuk Nai & Permohonan Jangan (〜ないでください)",
          "description": "Konjugasi bentuk Nai, memberi nasihat kesehatan dan rambu keselamatan."
      },
      "th": {
          "title": "บทที่ 17: รูป Nai และการขอร้องไม่ให้ทำ (〜ないでください)",
          "description": "กฎการผันรูป Nai และการเตือนเรื่องสุขภาพหรือความปลอดภัยอย่างสุภาพ"
      },
      "ru": {
          "title": "Урок 17: Най-форма и просьбы не делать (〜ないでください)",
          "description": "Спряжение формы Nai, советы по здоровью и правила безопасности."
      },
      "pt": {
          "title": "Lição 17: Forma Nai e pedidos negativos (〜ないでください)",
          "description": "Conjuge a forma Nai, dê orientações de segurança e saúde (por favor, não esqueça)."
      }
  },
  "minna-lesson-17-obligation-permission": {
      "vi": {
          "title": "Bài 17 (Phần 2): Bắt Buộc & Không Cần Thiết Phải Làm (〜なければなりません・〜なくてもいいです)",
          "description": "Nói về nghĩa vụ phải uống thuốc, nộp bài, và việc linh hoạt không bắt buộc."
      },
      "en": {
          "title": "Lesson 17 (Part 2): Obligation & Lack of Necessity",
          "description": "Express obligation (must take medicine, submit documents) and lack of necessity (don't need to)."
      },
      "zh-CN": {
          "title": "第17课(下)：必须做与无需做某事 (〜なければなりません・〜なくてもいいです)",
          "description": "说明必须履行的义务（按时服药、提交报告）与无需强求的非必要事项。"
      },
      "zh-TW": {
          "title": "第17課(下)：必須做與無需做某事 (〜なければなりません・〜なくてもいいです)",
          "description": "說明必須履行的義務（按時服藥、提交報告）與無需強求的非必要事項。"
      },
      "ko": {
          "title": "제17과(하): 의무와 불필요 표현 (〜なければなりません・〜なくてもいいです)",
          "description": "꼭 해야 하는 의무(약 복용 등)와 굳이 하지 않아도 되는 상황 표현."
      },
      "es": {
          "title": "Lección 17 (Parte 2): Obligación y no necesidad",
          "description": "Expresa deberes obligatorios y situaciones donde no es necesario actuar."
      },
      "fr": {
          "title": "Leçon 17 (Partie 2) : Obligation et dispense",
          "description": "Exprimer l'obligation absolue et ce qui n'est pas nécessaire."
      },
      "de": {
          "title": "Lektion 17 (Teil 2): Pflicht & Keine Notwendigkeit",
          "description": "Ausdrücken, was man tun muss (Medizin nehmen) und was nicht nötig ist."
      },
      "id": {
          "title": "Pelajaran 17 (Bagian 2): Keharusan & Ketidakharusan",
          "description": "Menyatakan kewajiban harus dilakukan dan hal yang tidak wajib dilakukan."
      },
      "th": {
          "title": "บทที่ 17 (ตอนที่ 2): ความจำเป็นต้องทำและไม่ต้องทำก็ได้",
          "description": "บอกหน้าที่ที่จำเป็นต้องทำ และสิ่งที่ไม่จำเป็นต้องทำก็ได้"
      },
      "ru": {
          "title": "Урок 17 (Часть 2): Обязательство и необязательность",
          "description": "Выражение необходимости (нужно принять лекарство) и необязательности."
      },
      "pt": {
          "title": "Lição 17 (Parte 2): Obrigação e dispensa",
          "description": "Expresse tarefas obrigatórias e ações que não são necessárias."
      }
  },
  "minna-lesson-18-dictionary-form-ability": {
      "vi": {
          "title": "Bài 18: Thể Từ Điển & Năng Lực Bản Thân (〜ことができます)",
          "description": "Cách tra thể từ điển (Jisho-kei) và nói về năng lực cá nhân (biết bơi, nói được tiếng Nhật, lái xe)."
      },
      "en": {
          "title": "Lesson 18: Dictionary Form & Personal Abilities (〜ことができます)",
          "description": "Learn dictionary forms (Jisho-kei) and describe personal skills (can swim, speak Japanese, drive)."
      },
      "zh-CN": {
          "title": "第18课：辞书形与个人能力表达 (〜ことができます)",
          "description": "掌握动词原形（辞书形）及表达个人能力技能（会游泳、能说日语、驾车）。"
      },
      "zh-TW": {
          "title": "第18課：辭書形與個人能力表達 (〜ことができます)",
          "description": "掌握動詞原形（辭書形）及表達個人能力技能（會游泳、能說日語、駕車）。"
      },
      "ko": {
          "title": "제18과: 사전형(사전형)과 능력 표현 (〜ことができます)",
          "description": "동사 기본 사전형을 익히고 할 수 있는 능력(수영, 일본어 회화, 운전 등) 표현."
      },
      "es": {
          "title": "Lección 18: Forma diccionario y habilidades (〜ことができます)",
          "description": "Aprende la forma diccionario y describe habilidades (puedo nadar, hablar japonés)."
      },
      "fr": {
          "title": "Leçon 18 : Forme du dictionnaire et compétences",
          "description": "Forme du dictionnaire (Jisho-kei) et capacités (savoir nager, parler japonais)."
      },
      "de": {
          "title": "Lektion 18: Wörterbuchform & Fähigkeiten (〜ことができます)",
          "description": "Wörterbuchform und Fähigkeiten ausdrücken (schwimmen können, Japanisch sprechen)."
      },
      "id": {
          "title": "Pelajaran 18: Bentuk Kamus & Kemampuan (〜ことができます)",
          "description": "Mengenal bentuk kamus dan mengekspresikan kemampuan pribadi."
      },
      "th": {
          "title": "บทที่ 18: รูปพจนานุกรมและความสามารถ (〜ことができます)",
          "description": "เรียนรู้รูปพจนานุกรม และบอกความสามารถของตนเอง เช่น ว่ายน้ำได้ พูดภาษาญี่ปุ่นได้"
      },
      "ru": {
          "title": "Урок 18: Словарная форма и способности (〜ことができます)",
          "description": "Словарная форма глаголов и выражение способностей (умею плавать, говорить по-японски)."
      },
      "pt": {
          "title": "Lição 18: Forma de dicionário e habilidades (〜ことができます)",
          "description": "Aprenda a forma de dicionário e expresse habilidades pessoais (sei nadar, falar japonês)."
      }
  },
  "minna-lesson-18-hobbies-and-mae-ni": {
      "vi": {
          "title": "Bài 18 (Phần 2): Sở Thích & Trước Khi Làm Việc Gì (私の趣味は〜ことです・〜前に)",
          "description": "Trình bày sở thích cá nhân và mốc thời gian hành động diễn ra trước một sự kiện."
      },
      "en": {
          "title": "Lesson 18 (Part 2): Hobbies & 'Before Doing' (私の趣味は〜ことです・〜前に)",
          "description": "Describe personal hobbies and express actions occurring prior to another event."
      },
      "zh-CN": {
          "title": "第18课(下)：个人兴趣与前置时间点 (私の趣味は〜ことです・〜前に)",
          "description": "用动词名词化介绍个人业余爱好，以及在做某事前发生的动作。"
      },
      "zh-TW": {
          "title": "第18課(下)：個人興趣與前置時間點 (私の趣味は〜ことです・〜前に)",
          "description": "用動詞名詞化介紹個人業餘愛好，以及在做某事前發生的動作。"
      },
      "ko": {
          "title": "제18과(하): 취미 소개 및 이전 시점 표현 (私の趣味は〜ことです・〜前に)",
          "description": "동사 명사화를 통한 취미 소개 및 어떤 행동을 하기 전에 하는 일."
      },
      "es": {
          "title": "Lección 18 (Parte 2): Pasatiempos y 'antes de'",
          "description": "Describe aficiones personales y acciones previas a otro acontecimiento."
      },
      "fr": {
          "title": "Leçon 18 (Partie 2) : Loisirs et 'avant de'",
          "description": "Présenter ses passe-temps et exprimer ce qui se passe avant un événement."
      },
      "de": {
          "title": "Lektion 18 (Teil 2): Hobbys & „Bevor man...“",
          "description": "Eigene Hobbys vorstellen und Handlungen vor einem Ereignis beschreiben."
      },
      "id": {
          "title": "Pelajaran 18 (Bagian 2): Hobi & 'Sebelum Melakukan'",
          "description": "Menjelaskan hobi pribadi dan tindakan sebelum kegiatan lain dimulai."
      },
      "th": {
          "title": "บทที่ 18 (ตอนที่ 2): งานอดิเรกและ 'ก่อนที่จะทำ...'",
          "description": "แนะนำงานอดิเรกของตนเอง และบอกสิ่งที่ทำก่อนจะเริ่มอีกสิ่งหนึ่ง"
      },
      "ru": {
          "title": "Урок 18 (Часть 2): Хобби и «перед тем как»",
          "description": "Рассказ о хобби и действиях, совершаемых перед другим событием."
      },
      "pt": {
          "title": "Lição 18 (Parte 2): Hobbies e 'antes de fazer'",
          "description": "Apresente seus passatempos e descreva ações que acontecem antes de outro evento."
      }
  },
  "minna-lesson-19-ta-form-experience": {
      "vi": {
          "title": "Bài 19: Thể Ta & Trải Nghiệm Từng Làm (〜たことがあります)",
          "description": "Quy tắc chuyển thể Ta (quá khứ ngắn) và chia sẻ những trải nghiệm đáng nhớ từng có trong đời."
      },
      "en": {
          "title": "Lesson 19: Ta-Form & Past Experiences (〜たことがあります)",
          "description": "Master the Ta-form (past plain) and talk about memorable life experiences."
      },
      "zh-CN": {
          "title": "第19课：た形变形与过往经历 (〜たことがあります)",
          "description": "熟练掌握动词た形（过去简体），分享人生中难忘的经历与体验。"
      },
      "zh-TW": {
          "title": "第19課：た形變形與過往經歷 (〜たことがあります)",
          "description": "熟練掌握動詞た形（過去簡體），分享人生中難忘的經歷與體驗。"
      },
      "ko": {
          "title": "제19과: 타형(た形)과 과거 경험 표현 (〜たことがあります)",
          "description": "동사 타형(과거 반말형)을 익히고 기억에 남는 과거 경험 나누기."
      },
      "es": {
          "title": "Lección 19: Forma Ta y experiencias pasadas (〜たことがあります)",
          "description": "Domina la forma Ta y habla sobre experiencias vitales que has tenido."
      },
      "fr": {
          "title": "Leçon 19 : Forme en Ta et expériences passées",
          "description": "Maîtriser la forme en Ta et parler de ses expériences vécues."
      },
      "de": {
          "title": "Lektion 19: Ta-Form & Bisherige Erfahrungen (〜たことがあります)",
          "description": "Die Ta-Form beherrschen und über persönliche Erfahrungen sprechen."
      },
      "id": {
          "title": "Pelajaran 19: Bentuk Ta & Pengalaman Masa Lalu",
          "description": "Menguasai bentuk Ta dan menceritakan pengalaman hidup yang pernah dialami."
      },
      "th": {
          "title": "บทที่ 19: รูป Ta และการบอกประสบการณ์ที่เคยทำ (〜たことがあります)",
          "description": "ผันกริยารูป Ta และเล่าประสบการณ์ที่เคยทำในอดีต"
      },
      "ru": {
          "title": "Урок 19: Та-форма и личный опыт (〜たことがあります)",
          "description": "Та-форма глаголов и рассказ о жизненном опыте."
      },
      "pt": {
          "title": "Lição 19: Forma Ta e experiências passadas (〜たことがあります)",
          "description": "Domine a forma Ta e relate experiências memoráveis de vida."
      }
  },
  "minna-lesson-19-tari-tari-change": {
      "vi": {
          "title": "Bài 19 (Phần 2): Liệt Kê Hành Động Tiêu Biểu & Biến Đổi Trạng Thái (〜たり〜たり・〜になります)",
          "description": "Liệt kê vài việc làm mẫu trong ngày nghỉ và diễn đạt sự biến đổi trạng thái (trở nên giỏi, trời trở lạnh)."
      },
      "en": {
          "title": "Lesson 19 (Part 2): Non-Exhaustive Listing & State Change (〜たり〜たり・〜になります)",
          "description": "List representative activities on days off, and express transformations in states."
      },
      "zh-CN": {
          "title": "第19课(下)：典型动作列举与状态变化 (〜たり〜たり・〜になります)",
          "description": "列举休息日典型活动示例，以及表达状态或能力的演变（变冷、变熟练）。"
      },
      "zh-TW": {
          "title": "第19課(下)：典型動作列舉與狀態變化 (〜たり〜たり・〜になります)",
          "description": "列舉休息日典型活動示例，以及表達狀態或能力的演變（變冷、變熟練）。"
      },
      "ko": {
          "title": "제19과(하): 대표 행동 나열 및 상태 변화 (〜たり〜たり・〜になります)",
          "description": "휴일의 대표적 일과 나열과 변화(잘하게 되다, 날씨가 추워지다) 표현."
      },
      "es": {
          "title": "Lección 19 (Parte 2): Enumerar actividades y cambios de estado",
          "description": "Enumera actividades típicas y expresa cambios de estado."
      },
      "fr": {
          "title": "Leçon 19 (Partie 2) : Énumération d'activités et changements d'état",
          "description": "Énumérer des activités représentatives et exprimer un changement d'état."
      },
      "de": {
          "title": "Lektion 19 (Teil 2): Beispielhafte Aufzählung & Zustandsänderungen",
          "description": "Typische Wochenendaktivitäten aufzählen und Zustandsänderungen ausdrücken."
      },
      "id": {
          "title": "Pelajaran 19 (Bagian 2): Contoh Kegiatan & Perubahan Keadaan",
          "description": "Menyebutkan beberapa kegiatan dan menyatakan perubahan kondisi."
      },
      "th": {
          "title": "บทที่ 19 (ตอนที่ 2): การยกตัวอย่างการกระทำและการเปลี่ยนแปลงสภาพ",
          "description": "ยกตัวอย่างกิจกรรมในวันหยุด และบอกการเปลี่ยนแปลง เช่น อากาศเริ่มหนาวขึ้น"
      },
      "ru": {
          "title": "Урок 19 (Часть 2): Примеры занятий и изменение состояния",
          "description": "Перечисление типичных занятий на отдыхе и выражение изменений."
      },
      "pt": {
          "title": "Lição 19 (Parte 2): Atividades exemplares e mudança de estado",
          "description": "Liste atividades típicas de lazer e expresse transformações de estado."
      }
  },
  "minna-lesson-20-plain-form": {
      "vi": {
          "title": "Bài 20: Thể Thông Thường (Thể Ngắn Futsuukei) Trong Giao Tiếp Bạn Bè",
          "description": "Cột mốc giao tiếp tự nhiên: Chuyển đổi toàn bộ động từ, tính từ sang thể ngắn thân mật."
      },
      "en": {
          "title": "Lesson 20: Plain Form (Futsuukei) for Casual Conversation",
          "description": "Crucial conversational milestone: switch verbs and adjectives into casual plain form with peers."
      },
      "zh-CN": {
          "title": "第20课：普通体（简体 Futsuukei）与日常随意对话",
          "description": "关键交际里程碑：将动词与形容词全部转化为朋友间亲切随和的普通体。"
      },
      "zh-TW": {
          "title": "第20課：普通體（簡體 Futsuukei）與日常隨意對話",
          "description": "關鍵交際里程碑：將動詞與形容詞全部轉化為朋友間親切隨和的普通體。"
      },
      "ko": {
          "title": "제20과: 보통형(반말 Futsuukei)과 친밀한 일상 대화",
          "description": "자연스러운 일본어 회화 핵심: 동사와 형용사를 친구 사이 반말로 변환하기."
      },
      "es": {
          "title": "Lección 20: Forma coloquial (Futsuukei) entre amigos",
          "description": "Hito conversacional: cambia verbos y adjetivos a estilo informal para hablar con amigos."
      },
      "fr": {
          "title": "Leçon 20 : Style familier (Futsuukei) entre amis",
          "description": "Étape clé : passer verbes et adjectifs au style neutre/familier pour converser."
      },
      "de": {
          "title": "Lektion 20: Umgangssprachliche Normalform (Futsuukei)",
          "description": "Wichtiger Meilenstein: Verben und Adjektive in der vertrauten Umgangssprache."
      },
      "id": {
          "title": "Pelajaran 20: Bentuk Biasa (Futsuukei) dengan Teman",
          "description": "Tonggak percakapan: mengubah kata kerja dan kata sifat ke gaya akrab santai."
      },
      "th": {
          "title": "บทที่ 20: รูปธรรมดา (Futsuukei) ในการพูดคุยกับเพื่อนสนิท",
          "description": "ก้าวสำคัญ: เปลี่ยนรูปกริยาและคำคุณศัพท์เป็นรูปกันเองเพื่อคุยกับเพื่อน"
      },
      "ru": {
          "title": "Урок 20: Простая форма (Futsuukei) в дружеском общении",
          "description": "Переход на разговорный неофициальный стиль с друзьями и близкими."
      },
      "pt": {
          "title": "Lição 20: Forma casual (Futsuukei) para conversas amigáveis",
          "description": "Marco conversacional: use a forma casual com amigos e familiares."
      }
  },
  "minna-lesson-21-opinions-and-quotes": {
      "vi": {
          "title": "Bài 21: Bày Tỏ Ý Kiến & Trích Dẫn Lời Nói (〜と思います・〜と言いました)",
          "description": "Nêu quan điểm cá nhân 'tôi nghĩ rằng...' và trích dẫn trực tiếp/gián tiếp câu nói của người khác."
      },
      "en": {
          "title": "Lesson 21: Expressing Opinions & Quoting Speech (〜と思います・〜と言いました)",
          "description": "State personal viewpoints ('I think that...') and quote others directly or indirectly."
      },
      "zh-CN": {
          "title": "第21课：发表个人见解与引用转述 (〜と思います・〜と言いました)",
          "description": "表达个人看法观点（我认为……）并准确引用或转述他人的话语。"
      },
      "zh-TW": {
          "title": "第21課：發表個人見解與引用轉述 (〜と思います・〜と言いました)",
          "description": "表達個人看法觀點（我認為……）並準確引用或轉述他人的話語。"
      },
      "ko": {
          "title": "제21과: 개인 의견 표명 및 인용 표현 (〜と思います・〜と言いました)",
          "description": "'~라고 생각합니다' 의견 개진 및 타인의 말을 직접/간접 인용하기."
      },
      "es": {
          "title": "Lección 21: Expresar opiniones y citar dichos (〜と思います・〜と言いました)",
          "description": "Expresa tu parecer personal ('creo que...') y cita palabras de otros."
      },
      "fr": {
          "title": "Leçon 21 : Donner son avis et rapporter des paroles",
          "description": "Exprimer son point de vue (« je pense que... ») et citer autrui."
      },
      "de": {
          "title": "Lektion 21: Eigene Meinung äußern & Zitieren (〜と思います・〜と言いました)",
          "description": "Eigene Ansichten darlegen („Ich denke, dass...“) und Aussagen zitieren."
      },
      "id": {
          "title": "Pelajaran 21: Berpendapat & Mengutip Ucapan (〜と思います・〜と言いました)",
          "description": "Menyampaikan pendapat ('menurut saya...') dan mengutip perkataan orang lain."
      },
      "th": {
          "title": "บทที่ 21: การแสดงความคิดเห็นและการอ้างคำพูด (〜と思います・〜と言いました)",
          "description": "บอกความคิดเห็นส่วนตัว เช่น 'ฉันคิดว่า...' และการอ้างคำพูดของผู้อื่น"
      },
      "ru": {
          "title": "Урок 21: Выражение мнений и цитирование речи (〜と思います・〜と言いました)",
          "description": "Как высказывать личное мнение («я считаю, что...») и цитировать слова других."
      },
      "pt": {
          "title": "Lição 21: Expressar opiniões e citar falas (〜と思います・〜と言いました)",
          "description": "Expresse opiniões próprias ('acho que...') e cite declarações de outras pessoas."
      }
  },
  "minna-lesson-22-noun-modification": {
      "vi": {
          "title": "Bài 22: Mệnh Đề Bổ Nghĩa Danh Từ (Định Ngữ Trong Tiếng Nhật)",
          "description": "Kỹ năng tư duy cao cấp: Dùng cả một câu để bổ nghĩa và tạo danh từ phức tạp."
      },
      "en": {
          "title": "Lesson 22: Noun-Modifying Clauses (Relative Clauses in Japanese)",
          "description": "Advanced syntax skill: using full descriptive clauses to modify and qualify nouns."
      },
      "zh-CN": {
          "title": "第22课：定语从句与连体修饰 (日语从句修饰名词)",
          "description": "核心句法进阶：用完整从句作定语精准修饰后项名词。"
      },
      "zh-TW": {
          "title": "第22課：定語從句與連體修飾 (日語從句修飾名詞)",
          "description": "核心句法進階：用完整從句作定語精準修飾後項名詞。"
      },
      "ko": {
          "title": "제22과: 명사 수식절 (일본어 연체 수식 구문)",
          "description": "고급 문장 구성: 완전한 절을 이용해 뒤따르는 명사를 정밀하게 수식하기."
      },
      "es": {
          "title": "Lección 22: Proposiciones relativas que modifican sustantivos",
          "description": "Habilidad sintáctica clave: usar oraciones subordinadas completas para calificar sustantivos."
      },
      "fr": {
          "title": "Leçon 22 : Propositions subordonnées relatives",
          "description": "Compétence syntaxique majeure : utiliser des propositions complètes pour qualifier des noms."
      },
      "de": {
          "title": "Lektion 22: Relativsätze & Substantivmodifikation",
          "description": "Syntaktische Kernkompetenz: Ganze Nebensätze zur näheren Bestimmung von Nomen nutzen."
      },
      "id": {
          "title": "Pelajaran 22: Klausa Pemerinci Kata Benda (Relative Clauses)",
          "description": "Keterampilan sintaksis: menggunakan klausa utuh untuk menerangkan kata benda."
      },
      "th": {
          "title": "บทที่ 22: ประโยคขยายนาม (อนุประโยคในภาษาญี่ปุ่น)",
          "description": "ทักษะไวยากรณ์สำคัญ: ใช้ประโยคทั้งประโยคเพื่อขยายคำนามด้านหลัง"
      },
      "ru": {
          "title": "Урок 22: Придаточные определительные предложения",
          "description": "Использование целых предложений для определения существительных."
      },
      "pt": {
          "title": "Lição 22: Orações subordinadas adjetivas (Modificação de substantivos)",
          "description": "Habilidade sintática essencial: use orações completas para qualificar substantivos."
      }
  },
  "minna-lesson-23-25-conditionals": {
      "vi": {
          "title": "Bài 23-25: Khi Nào, Nếu Như & Mệnh Đề Điều Kiện (〜とき・〜たら・〜ても)",
          "description": "Tổng kết sơ cấp: Diễn đạt thời điểm, giả định điều kiện và sự nhượng bộ (dù thế nào chăng nữa)."
      },
      "en": {
          "title": "Lessons 23-25: Time, Conditions & Concessions (〜とき・〜たら・〜ても)",
          "description": "Elementary climax: express time points, hypothetical 'if' conditions, and concessions ('even if')."
      },
      "zh-CN": {
          "title": "第23-25课：时机、条件假定与让步连词 (〜とき・〜たら・〜ても)",
          "description": "初级大结业：表达'在……时'、假设条件'如果……'以及即使如此的让步转折。"
      },
      "zh-TW": {
          "title": "第23-25課：時機、條件假定與讓步連詞 (〜とき・〜たら・〜ても)",
          "description": "初級大結業：表達'在……時'、假設條件'如果……'以及即使如此的讓步轉折。"
      },
      "ko": {
          "title": "제23-25과: 때, 가정 조건 및 양보 표현 (〜とき・〜たら・〜ても)",
          "description": "초급 총정리: '~할 때', 가설 조건 '~한다면' 및 '~하더라도' 양보 구문."
      },
      "es": {
          "title": "Lecciones 23-25: Momento, condicionales y concesiones (〜とき・〜たら・〜ても)",
          "description": "Cierre de nivel inicial: expresa tiempo, hipótesis ('si...') y concesiones ('aunque...')."
      },
      "fr": {
          "title": "Leçons 23-25 : Temps, conditions et concessions",
          "description": "Bilan élémentaire : exprimer le moment, l'hypothèse (« si ») et la concession (« même si »)."
      },
      "de": {
          "title": "Lektion 23-25: Zeitpunkt, Bedingungen & Zugeständnisse",
          "description": "Abschluss der Grundstufe: Zeitangaben, Wenn-Bedingungen und Einräumungen."
      },
      "id": {
          "title": "Pelajaran 23-25: Saat, Pengandaian & Konsesi (〜とき・〜たら・〜ても)",
          "description": "Puncak tingkat dasar: menyatakan waktu kejadian, syarat pengandaian, dan pertentangan."
      },
      "th": {
          "title": "บทที่ 23-25: เวลา เงื่อนไขสมมติ และการยอมรับข้อแม้ (〜とき・〜たら・〜ても)",
          "description": "สรุประดับต้น: บอกช่วงเวลา การสมมติเงื่อนไข 'ถ้า...' และ 'แม้ว่าจะ...ก็ตาม'"
      },
      "ru": {
          "title": "Уроки 23-25: Момент времени, условия и уступки (〜とき・〜たら・〜ても)",
          "description": "Финал начального уровня: выражение времени, условий «если» и уступок «даже если»."
      },
      "pt": {
          "title": "Lições 23-25: Momento, condições e concessões (〜とき・〜たら・〜ても)",
          "description": "Fechamento do nível inicial: expresse momentos, hipóteses ('se...') e concessões ('mesmo que')."
      }
  },
  "n5-kanji-numbers-nature": {
      "vi": {
          "title": "Kanji N5: Chữ Số, Thời Gian & Tự Nhiên (一・二・三・日・月・木・水)",
          "description": "Các chữ Hán cơ bản nhất biểu thị số đếm, các ngày trong tuần và ngũ hành tự nhiên."
      },
      "en": {
          "title": "N5 Kanji: Numbers, Time & Nature (一・二・三・日・月・木・水)",
          "description": "The foundational Kanji for counting numbers, days of the week, and nature elements."
      },
      "zh-CN": {
          "title": "N5 核心汉字：数字、时间与自然五行 (一・二・三・日・月・木・水)",
          "description": "学习表示数字数序、每周星期以及自然万物的最基础核心汉字。"
      },
      "zh-TW": {
          "title": "N5 核心漢字：數字、時間與自然五行 (一・二・三・日・月・木・水)",
          "description": "學習表示數字數序、每周星期以及自然萬物的最基礎核心漢字。"
      },
      "ko": {
          "title": "N5 한자: 숫자, 시간 및 자연 원소 (一・二・三・日・月・木・水)",
          "description": "숫자 카운트, 요일 및 자연을 상징하는 가장 기초적인 필수 한자."
      },
      "es": {
          "title": "Kanji N5: Números, tiempo y naturaleza (一・二・三・日・月・木・水)",
          "description": "Los Kanji esenciales para contar, días de la semana y elementos naturales."
      },
      "fr": {
          "title": "Kanji N5 : Chiffres, temps et nature (一・二・三・日・月・木・水)",
          "description": "Les Kanji fondamentaux pour les chiffres, jours de la semaine et la nature."
      },
      "de": {
          "title": "N5-Kanji: Zahlen, Zeit & Natur (一・二・三・日・月・木・水)",
          "description": "Die wichtigsten Grundkanji für Zählen, Wochentage und Naturelemente."
      },
      "id": {
          "title": "Kanji N5: Angka, Waktu & Alam (一・二・三・日・月・木・水)",
          "description": "Kanji paling dasar untuk angka, hari dalam seminggu, dan unsur alam."
      },
      "th": {
          "title": "คันจิ N5: ตัวเลข เวลา และธรรมชาติ (一・二・三・日・月・木・水)",
          "description": "คันจิพื้นฐานสำหรับตัวเลข วันในสัปดาห์ และองค์ประกอบทางธรรมชาติ"
      },
      "ru": {
          "title": "Кандзи N5: Числа, время и природа (一・二・三・日・月・木・水)",
          "description": "Базовые кандзи для чисел, дней недели и природных элементов."
      },
      "pt": {
          "title": "Kanji N5: Números, tempo e natureza (一・二・三・日・月・木・水)",
          "description": "Kanji fundamentais para contagem, dias da semana e elementos da natureza."
      }
  },
  "n5-kanji-people-body": {
      "vi": {
          "title": "Kanji N5: Con Người, Gia Đình & Cơ Thể (人・子・女・男・目・口・手)",
          "description": "Chữ Hán chỉ các thành viên trong gia đình, các bộ phận cơ thể và con người."
      },
      "en": {
          "title": "N5 Kanji: People, Family & Body Parts (人・子・女・男・目・口・手)",
          "description": "Kanji for family relations, body parts, and individuals in society."
      },
      "zh-CN": {
          "title": "N5 核心汉字：人际、家庭与身体器官 (人・子・女・男・目・口・手)",
          "description": "掌握表示家庭成员、社会人际以及人体五官四肢的核心汉字。"
      },
      "zh-TW": {
          "title": "N5 核心漢字：人際、家庭與身體器官 (人・子・女・男・目・口・手)",
          "description": "掌握表示家庭成員、社會人際以及人體五官四肢的核心漢字。"
      },
      "ko": {
          "title": "N5 한자: 사람, 가족 및 신체 부위 (人・子・女・男・目・口・手)",
          "description": "가족 관계, 대인 관계 및 신체 부위를 나타내는 필수 한자."
      },
      "es": {
          "title": "Kanji N5: Personas, familia y cuerpo (人・子・女・男・目・口・手)",
          "description": "Kanji para relaciones familiares, partes del cuerpo e individuos."
      },
      "fr": {
          "title": "Kanji N5 : Personnes, famille et corps (人・子・女・男・目・口・手)",
          "description": "Kanji désignant les relations familiales, le corps et les personnes."
      },
      "de": {
          "title": "N5-Kanji: Menschen, Familie & Körper (人・子・女・男・目・口・手)",
          "description": "Kanji für Verwandtschaft, Körperteile und Personen."
      },
      "id": {
          "title": "Kanji N5: Orang, Keluarga & Tubuh (人・子・女・男・目・口・手)",
          "description": "Kanji untuk relasi keluarga, anggota tubuh, dan manusia."
      },
      "th": {
          "title": "คันจิ N5: ผู้คน ครอบครัว และอวัยวะในร่างกาย (人・子・女・男・目・口・手)",
          "description": "คันจิแสดงความสัมพันธ์ในครอบครัว และส่วนต่างๆ ของร่างกาย"
      },
      "ru": {
          "title": "Кандзи N5: Люди, семья и тело (人・子・女・男・目・口・手)",
          "description": "Кандзи для обозначения семьи, частей тела и человека."
      },
      "pt": {
          "title": "Kanji N5: Pessoas, família e corpo (人・子・女・男・目・口・手)",
          "description": "Kanji para relações familiares, membros do corpo e pessoas."
      }
  },
  "n5-kanji-verbs-places": {
      "vi": {
          "title": "Kanji N5: Hành Động, Địa Điểm & Phương Hướng (行・来・食・飲・東・西・校)",
          "description": "Chữ Hán chỉ các động từ thường gặp, 4 phương hướng và các địa danh trường học, nhà ga."
      },
      "en": {
          "title": "N5 Kanji: Actions, Places & Directions (行・来・食・飲・東・西・校)",
          "description": "Kanji for daily action verbs, cardinal directions, schools, and stations."
      },
      "zh-CN": {
          "title": "N5 核心汉字：日常动作、方位与场所 (行・来・食・飲・東・西・校)",
          "description": "掌握高频动词字根、东南西北方位以及学校与车站等场所汉字。"
      },
      "zh-TW": {
          "title": "N5 核心漢字：日常動作、方位與場所 (行・来・食・飲・東・西・校)",
          "description": "掌握高頻動詞字根、東南西北方位以及學校與車站等場所漢字。"
      },
      "ko": {
          "title": "N5 한자: 동작, 장소 및 동서남북 방위 (行・来・食・飲・東・西・校)",
          "description": "자주 쓰이는 기본 동사, 동서남북 4대 방위 및 장소 관련 필수 한자."
      },
      "es": {
          "title": "Kanji N5: Acciones, lugares y direcciones (行・来・食・飲・東・西・校)",
          "description": "Kanji de verbos comunes, puntos cardinales y lugares de la ciudad."
      },
      "fr": {
          "title": "Kanji N5 : Actions, lieux et directions (行・来・食・飲・東・西・校)",
          "description": "Kanji pour les verbes usuels, points cardinaux et lieux."
      },
      "de": {
          "title": "N5-Kanji: Aktionen, Orte & Richtungen (行・来・食・飲・東・西・校)",
          "description": "Kanji für Alltagstätigkeiten, Himmelsrichtungen und Orte."
      },
      "id": {
          "title": "Kanji N5: Aksi, Tempat & Arah (行・来・食・飲・東・西・校)",
          "description": "Kanji untuk kata kerja sehari-hari, arah mata angin, dan tempat."
      },
      "th": {
          "title": "คันจิ N5: การกระทำ สถานที่ และทิศทาง (行・来・食・飲・東・西・校)",
          "description": "คันจิกริยาในชีวิตประจำวัน ทิศทาง และสถานที่สำคัญ"
      },
      "ru": {
          "title": "Кандзи N5: Действия, места и стороны света (行・来・食・飲・東・西・校)",
          "description": "Кандзи для частых глаголов, направлений и общественных мест."
      },
      "pt": {
          "title": "Kanji N5: Ações, lugares e direções (行・来・食・飲・東・西・校)",
          "description": "Kanji para verbos do dia a dia, pontos cardeais e locais públicos."
      }
  },
  "n5-kanji-adjectives-opposites": {
      "vi": {
          "title": "Kanji N5: Tính Từ & Cặp Từ Trái Nghĩa (大・小・高・安・新・古・長・多)",
          "description": "Chữ Hán biểu thị tính chất, kích thước và các cặp từ tương phản kinh điển."
      },
      "en": {
          "title": "N5 Kanji: Adjectives & Opposites (大・小・高・安・新・古・長・多)",
          "description": "Kanji for qualities, dimensions, prices, and classic antonym pairs."
      },
      "zh-CN": {
          "title": "N5 核心汉字：特征属性与经典反义词 (大・小・高・安・新・古・長・多)",
          "description": "掌握描述大小、价格高低、新旧与长短的成对核心汉字。"
      },
      "zh-TW": {
          "title": "N5 核心漢字：特徵屬性與經典反義詞 (大・小・高・安・新・古・長・多)",
          "description": "掌握描述大小、價格高低、新舊與長短的成對核心漢字。"
      },
      "ko": {
          "title": "N5 한자: 형용사 및 반의어 쌍 (大・小・高・安・新・古・長・多)",
          "description": "크기, 가격, 신구, 길이 등 대조를 이루는 필수 형용사 한자."
      },
      "es": {
          "title": "Kanji N5: Adjetivos y opuestos (大・小・高・安・新・古・長・多)",
          "description": "Kanji para dimensiones, precios y pares de antónimos clásicos."
      },
      "fr": {
          "title": "Kanji N5 : Adjectifs et antonymes (大・小・高・安・新・古・長・多)",
          "description": "Kanji pour les qualités, tailles et paires d'antonymes usuelles."
      },
      "de": {
          "title": "N5-Kanji: Adjektive & Gegenteile (大・小・高・安・新・古・長・多)",
          "description": "Kanji für Eigenschaften, Größen, Preise und Antonympaare."
      },
      "id": {
          "title": "Kanji N5: Kata Sifat & Lawan Kata (大・小・高・安・新・古・長・多)",
          "description": "Kanji untuk ukuran, harga, dan pasangan lawan kata klasik."
      },
      "th": {
          "title": "คันจิ N5: คำคุณศัพท์และคำตรงข้าม (大・小・高・安・新・古・長・多)",
          "description": "คันจิบอกขนาด ราคา และคู่คำตรงข้ามที่พบบ่อย"
      },
      "ru": {
          "title": "Кандзи N5: Прилагательные и антонимы (大・小・高・安・新・古・長・多)",
          "description": "Кандзи для качеств, размеров, цен и пар антонимов."
      },
      "pt": {
          "title": "Kanji N5: Adjetivos e opostos (大・小・高・安・新・古・長・多)",
          "description": "Kanji para dimensões, preços e pares de antônimos clássicos."
      }
  },
  "n5-grammar-verb-conjugation-master": {
      "vi": {
          "title": "Bảng Chia 5 Thể Động Từ (Masu・Te・Nai・Ta・Jisho)",
          "description": "Tổng hợp 3 nhóm động từ tiếng Nhật và quy tắc chuyển đổi linh hoạt giữa các thể."
      },
      "en": {
          "title": "Mastering 5 Verb Conjugations (Masu・Te・Nai・Ta・Jisho)",
          "description": "Comprehensive guide to 3 Japanese verb groups and switching smoothly across forms."
      },
      "zh-CN": {
          "title": "动词5大形态变换精通 (Masu・Te・Nai・Ta・Jisho)",
          "description": "系统掌握日语三大动词分组及各形态间灵活切换的核心规则。"
      },
      "zh-TW": {
          "title": "動詞5大形態變換精通 (Masu・Te・Nai・Ta・Jisho)",
          "description": "系統掌握日語三大動詞分組及各形態間靈活切換的核心規則。"
      },
      "ko": {
          "title": "동사 5대 활용 마스터 (Masu・Te・Nai・Ta・Jisho)",
          "description": "일본어 동사 3개 그룹 분류와 형태 변환 규칙을 완벽 정리합니다."
      },
      "es": {
          "title": "Dominio de las 5 conjugaciones verbales (Masu・Te・Nai・Ta・Jisho)",
          "description": "Guía completa de los 3 grupos de verbos japoneses y sus formas."
      },
      "fr": {
          "title": "Maîtrise des 5 conjugaisons verbales (Masu・Te・Nai・Ta・Jisho)",
          "description": "Guide complet des 3 groupes de verbes et règles de transition fluide."
      },
      "de": {
          "title": "Beherrschung der 5 Verbformen (Masu・Te・Nai・Ta・Jisho)",
          "description": "Umfassender Leitfaden zu den 3 Verbgruppen und Formenwechseln."
      },
      "id": {
          "title": "Kuasai 5 Konjugasi Kata Kerja (Masu・Te・Nai・Ta・Jisho)",
          "description": "Panduan lengkap 3 kelompok kata kerja bahasa Jepang dan perubahan bentuknya."
      },
      "th": {
          "title": "ฝึกผันกริยา 5 รูปแบบ (Masu・Te・Nai・Ta・Jisho)",
          "description": "รวบรวมกลุ่มคำกริยา 3 กลุ่มและกฎการผันรูปอย่างคล่องแคล่ว"
      },
      "ru": {
          "title": "Мастер спряжения 5 форм глаголов (Masu・Te・Nai・Ta・Jisho)",
          "description": "Полный обзор 3 групп японских глаголов и правил перехода между формами."
      },
      "pt": {
          "title": "Domínio das 5 conjugações verbais (Masu・Te・Nai・Ta・Jisho)",
          "description": "Guia completo dos 3 grupos de verbos em japonês e regras de conjugação."
      }
  },
  "n5-reading-notices-signs": {
      "vi": {
          "title": "Đọc Hiểu: Bảng Tin, Thông Báo & Thực Đơn",
          "description": "Đọc biển hiệu công cộng, giờ mở cửa và gọi món thực đơn nhà hàng Nhật."
      },
      "en": {
          "title": "Reading: Public Signs, Notices & Menus",
          "description": "Read public signs, store hours, and restaurant menus in Japan with ease."
      },
      "zh-CN": {
          "title": "读解训练：公告栏、指示标牌与餐厅菜单",
          "description": "解读公共标志、营业时间通知以及日本餐厅点餐菜单。"
      },
      "zh-TW": {
          "title": "讀解訓練：公告欄、指示標牌與餐廳菜單",
          "description": "解讀公共標誌、營業時間通知以及日本餐廳點餐菜單。"
      },
      "ko": {
          "title": "독해 훈련: 안내판, 공지문 및 식당 메뉴",
          "description": "공공 표지판, 영업 시간 안내, 식당 메뉴판을 정확하게 읽는 연습."
      },
      "es": {
          "title": "Lectura: Avisos públicos, letreros y menús",
          "description": "Lee letreros públicos, horarios y menús de restaurantes en Japón."
      },
      "fr": {
          "title": "Lecture : Panneaux, avis publics et menus",
          "description": "Lisez les panneaux publics, horaires d'ouverture et menus au Japon."
      },
      "de": {
          "title": "Leseverstehen: Schilder, Aushänge & Speisekarten",
          "description": "Öffentliche Schilder, Öffnungszeiten und Speisekarten verstehen."
      },
      "id": {
          "title": "Membaca: Papan Pengumuman, Tanda & Menu",
          "description": "Membaca papan tanda umum, jam buka toko, dan menu restoran Jepang."
      },
      "th": {
          "title": "การอ่านเพื่อความเข้าใจ: ป้ายประกาศ ป้ายบอกทาง และเมนูอาหาร",
          "description": "อ่านป้ายสาธารณะ เวลาทำการ และสั่งอาหารจากเมนูภาษาญี่ปุ่น"
      },
      "ru": {
          "title": "Чтение: Вывески, объявления и меню ресторанов",
          "description": "Читайте указатели, расписания и меню в японских ресторанах."
      },
      "pt": {
          "title": "Leitura: Placas públicas, avisos e cardápios",
          "description": "Leia placas públicas, horários de funcionamento e cardápios no Japão."
      }
  },
  "n5-reading-emails-messages": {
      "vi": {
          "title": "Đọc Hiểu: Email, Tin Nhắn & Nhật Ký Ngắn",
          "description": "Đọc thư mời, trao đổi tin nhắn qua app và bài viết nhật ký thường nhật."
      },
      "en": {
          "title": "Reading: Emails, Chat Messages & Short Diaries",
          "description": "Read invitations, messaging chats, and simple personal diary entries."
      },
      "zh-CN": {
          "title": "读解训练：电子邮件、即时消息与简短日记",
          "description": "阅读聚会邀请、聊天软件消息与日常个人简短日记。"
      },
      "zh-TW": {
          "title": "讀解訓練：電子郵件、即時訊息與簡短日記",
          "description": "閱讀聚會邀請、通訊軟體訊息與日常個人簡短日記。"
      },
      "ko": {
          "title": "독해 훈련: 이메일, 메신저 메시지 및 짧은 일기",
          "description": "초대장, 모바일 메신저 대화 및 일상 짧은 일기 읽기."
      },
      "es": {
          "title": "Lectura: Correos, mensajes y diarios breves",
          "description": "Lee invitaciones, chats de mensajería y diarios personales sencillos."
      },
      "fr": {
          "title": "Lecture : E-mails, messages et journaux intimes",
          "description": "Lisez des invitations, messages de chat et courts journaux intimes."
      },
      "de": {
          "title": "Leseverstehen: E-Mails, Kurznachrichten & Tagebuch",
          "description": "Einladungen, Chat-Nachrichten und Tagebucheinträge verstehen."
      },
      "id": {
          "title": "Membaca: Email, Pesan Chat & Catatan Harian",
          "description": "Membaca undangan, percakapan chat, dan catatan harian singkat."
      },
      "th": {
          "title": "การอ่านเพื่อความเข้าใจ: อีเมล ข้อความแชท และไดอารี่สั้น",
          "description": "อ่านคำเชิญ ข้อความแชท และบันทึกประจำวันสั้นๆ"
      },
      "ru": {
          "title": "Чтение: Электронные письма, сообщения и дневники",
          "description": "Читайте приглашения, чаты в мессенджерах и короткие заметки."
      },
      "pt": {
          "title": "Leitura: E-mails, mensagens de chat e diários curtos",
          "description": "Leia convites, conversas de chat e pequenos diários pessoais."
      }
  },
  "n5-listening-conversations": {
      "vi": {
          "title": "Nghe Hiểu: Tình Huống Konbini, Ga Tàu & Phản Xạ Đời Sống",
          "description": "Luyện kỹ năng phán đoán hội thoại: nhân viên thu ngân hỏi túi bóng, hỏi đường, mua vé tàu điện."
      },
      "en": {
          "title": "Listening: Convenience Store, Train Stations & Daily Life Reflexes",
          "description": "Develop conversation prediction skills: cashiers asking about bags, asking directions, buying train tickets."
      },
      "zh-CN": {
          "title": "听力理解：便利店、车站与日常生活对话反应",
          "description": "培养会话预判技巧：便利店问袋、问路、购买电车票等日常实战情景。"
      },
      "zh-TW": {
          "title": "聽力理解：便利店、車站與日常生活對話反應",
          "description": "培養會話預判技巧：便利店問袋、問路、購買電車票等日常實戰情景。"
      },
      "ko": {
          "title": "청해 이해: 편의점, 기차역 및 일상생활 회화 반사",
          "description": "상황별 대화 예측 훈련: 편의점 봉투 질문, 길 묻기, 전철표 구매 등."
      },
      "es": {
          "title": "Comprensión auditiva: Tiendas, estaciones de tren y vida cotidiana",
          "description": "Desarrolla habilidades de comprensión rápida: tiendas de conveniencia, direcciones y billetes de tren."
      },
      "fr": {
          "title": "Compréhension orale : Konbini, gares et réflexes du quotidien",
          "description": "Entraînez vos réflexes d'écoute : questions en magasin, demander son chemin, acheter un billet de train."
      },
      "de": {
          "title": "Hörverstehen: Konbini, Bahnhöfe & Alltagsreaktionen",
          "description": "Gesprächsreaktionen trainieren: Einkauf im Konbini, nach dem Weg fragen, Zugtickets kaufen."
      },
      "id": {
          "title": "Pemahaman Mendengar: Konbini, Stasiun & Percakapan Sehari-hari",
          "description": "Latih respons percakapan: kasir menanyakan kantong plastik, tanya jalan, beli tiket kereta."
      },
      "th": {
          "title": "การฟังเพื่อความเข้าใจ: ร้านสะดวกซื้อ สถานีรถไฟ และการใช้ชีวิตประจำวัน",
          "description": "ฝึกทักษะการฟังตอบโต้: ซื้อของ ถามทาง ซื้อตั๋วรถไฟ"
      },
      "ru": {
          "title": "Аудирование: Комбини, вокзалы и разговорная практика",
          "description": "Развивайте навык восприятия речи на слух: касса магазина, вопросы о дороге, покупка билетов."
      },
      "pt": {
          "title": "Compreensão auditiva: Konbini, estações de trem e reflexos diários",
          "description": "Treine reflexos de conversação: caixa de loja, pedir direções e comprar passagens de trem."
      }
  },
  "n5-jlpt-mock-test-comprehensive": {
      "vi": {
          "title": "Đề Thi Thử Toàn Diện JLPT N5",
          "description": "Mô phỏng đầy đủ 4 kỹ năng Moji・Goi・Bunpou・Dokkai theo chuẩn đề thi thật."
      },
      "en": {
          "title": "Comprehensive JLPT N5 Mock Exam",
          "description": "Full simulation across Vocabulary, Grammar, Reading, and Listening under real exam conditions."
      },
      "zh-CN": {
          "title": "JLPT N5 全真模拟综合测试",
          "description": "全面模拟文字·词汇·语法·读解四大板块，完全还原真实考试体验。"
      },
      "zh-TW": {
          "title": "JLPT N5 全真模擬綜合測試",
          "description": "全面模擬文字·詞彙·語法·讀解四大板塊，完全還原真實考試體驗。"
      },
      "ko": {
          "title": "JLPT N5 종합 실전 모의고사",
          "description": "문자·어휘, 문법, 독해 전 영역을 실전 시험과 동일하게 시뮬레이션합니다."
      },
      "es": {
          "title": "Examen de prueba integral JLPT N5",
          "description": "Simulación completa de vocabulario, gramática, lectura y escucha estilo examen real."
      },
      "fr": {
          "title": "Examen blanc complet JLPT N5",
          "description": "Simulation complète : vocabulaire, grammaire, lecture et écoute selon le format officiel."
      },
      "de": {
          "title": "Umfassende JLPT N5 Probeprüfung",
          "description": "Vollständige Prüfungssimulation für Wortschatz, Grammatik und Leseverstehen."
      },
      "id": {
          "title": "Ujian Simulasi Komprehensif JLPT N5",
          "description": "Simulasi penuh 4 bagian: Moji, Goi, Bunpou, Dokkai sesuai standar ujian resmi."
      },
      "th": {
          "title": "ข้อสอบจำลองเสมือนจริง JLPT N5",
          "description": "จำลองข้อสอบครอบคลุมทั้งตัวอักษร คำศัพท์ ไวยากรณ์ และการอ่าน"
      },
      "ru": {
          "title": "Комплексный пробный экзамен JLPT N5",
          "description": "Полная симуляция лексики, грамматики и чтения по стандартам экзамена."
      },
      "pt": {
          "title": "Simulado completo do exame JLPT N5",
          "description": "Simulação completa cobrindo vocabulário, gramática e leitura no padrão oficial."
      }
  },
  "n4-lesson-26-ndesu": {
      "vi": {
          "title": "Bài 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "en": {
          "title": "Lesson 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "zh-CN": {
          "title": "第26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "zh-TW": {
          "title": "第26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "ko": {
          "title": "제26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "es": {
          "title": "Lección 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "fr": {
          "title": "Leçon 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "de": {
          "title": "Lektion 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "id": {
          "title": "Pelajaran 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "th": {
          "title": "บทที่ 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "ru": {
          "title": "Урок 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      },
      "pt": {
          "title": "Lição 26 (N4): Thể 〜んです — Giải Thích Lý Do & Bối Cảnh",
          "description": "Dùng 〜んです để trình bày lý do, giải thích tình huống và hỏi han tế nhị."
      }
  },
  "n4-lesson-27-potential": {
      "vi": {
          "title": "Bài 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "en": {
          "title": "Lesson 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "zh-CN": {
          "title": "第27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "zh-TW": {
          "title": "第27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "ko": {
          "title": "제27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "es": {
          "title": "Lección 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "fr": {
          "title": "Leçon 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "de": {
          "title": "Lektion 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "id": {
          "title": "Pelajaran 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "th": {
          "title": "บทที่ 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "ru": {
          "title": "Урок 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      },
      "pt": {
          "title": "Lição 27 (N4): Động Từ Khả Năng (可能形)",
          "description": "Chuyển đổi sang thể khả năng để nói về việc bản thân có thể làm gì."
      }
  },
  "n4-lesson-28-nagara": {
      "vi": {
          "title": "Bài 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "en": {
          "title": "Lesson 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "zh-CN": {
          "title": "第28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "zh-TW": {
          "title": "第28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "ko": {
          "title": "제28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "es": {
          "title": "Lección 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "fr": {
          "title": "Leçon 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "de": {
          "title": "Lektion 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "id": {
          "title": "Pelajaran 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "th": {
          "title": "บทที่ 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "ru": {
          "title": "Урок 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      },
      "pt": {
          "title": "Lição 28 (N4): Vừa Làm Này Vừa Làm Kia (〜ながら)",
          "description": "Diễn đạt hai hành động diễn ra song song cùng một lúc."
      }
  },
  "n4-lesson-32-advice-prediction": {
      "vi": {
          "title": "Bài 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "en": {
          "title": "Lesson 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "zh-CN": {
          "title": "第32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "zh-TW": {
          "title": "第32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "ko": {
          "title": "제32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "es": {
          "title": "Lección 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "fr": {
          "title": "Leçon 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "de": {
          "title": "Lektion 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "id": {
          "title": "Pelajaran 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "th": {
          "title": "บทที่ 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "ru": {
          "title": "Урок 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      },
      "pt": {
          "title": "Lição 32 (N4): Lời Khuyên & Phán Đoán (〜ほうがいい・〜でしょう)",
          "description": "Đưa ra lời khuyên chân thành và dự đoán thời tiết, sự việc."
      }
  },
  "n4-lesson-35-conditionals-ba": {
      "vi": {
          "title": "Bài 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "en": {
          "title": "Lesson 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "zh-CN": {
          "title": "第35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "zh-TW": {
          "title": "第35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "ko": {
          "title": "제35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "es": {
          "title": "Lección 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "fr": {
          "title": "Leçon 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "de": {
          "title": "Lektion 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "id": {
          "title": "Pelajaran 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "th": {
          "title": "บทที่ 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "ru": {
          "title": "Урок 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      },
      "pt": {
          "title": "Lição 35 (N4): Thể Điều Kiện 〜ば",
          "description": "Câu điều kiện giả định và gợi ý giải pháp tốt nhất."
      }
  },
  "n4-lesson-37-passive-ukemi": {
      "vi": {
          "title": "Bài 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "en": {
          "title": "Lesson 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "zh-CN": {
          "title": "第37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "zh-TW": {
          "title": "第37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "ko": {
          "title": "제37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "es": {
          "title": "Lección 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "fr": {
          "title": "Leçon 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "de": {
          "title": "Lektion 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "id": {
          "title": "Pelajaran 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "th": {
          "title": "บทที่ 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "ru": {
          "title": "Урок 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      },
      "pt": {
          "title": "Lição 37 (N4): Thể Bị Động (受身形 - Ukemi)",
          "description": "Biểu đạt tâm trạng khi bị tác động hoặc tôn vinh sự việc khách quan."
      }
  },
  "n4-lesson-39-node-te-causes": {
      "vi": {
          "title": "Bài 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "en": {
          "title": "Lesson 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "zh-CN": {
          "title": "第39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "zh-TW": {
          "title": "第39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "ko": {
          "title": "제39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "es": {
          "title": "Lección 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "fr": {
          "title": "Leçon 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "de": {
          "title": "Lektion 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "id": {
          "title": "Pelajaran 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "th": {
          "title": "บทที่ 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "ru": {
          "title": "Урок 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      },
      "pt": {
          "title": "Lição 39 (N4): Nguyên Nhân & Lý Do Khách Quan (〜ので・〜て)",
          "description": "Trình bày lý do một cách khách quan, nhẹ nhàng và lịch thiệp."
      }
  },
  "n4-lesson-40-embedded-questions": {
      "vi": {
          "title": "Bài 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "en": {
          "title": "Lesson 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "zh-CN": {
          "title": "第40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "zh-TW": {
          "title": "第40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "ko": {
          "title": "제40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "es": {
          "title": "Lección 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "fr": {
          "title": "Leçon 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "de": {
          "title": "Lektion 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "id": {
          "title": "Pelajaran 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "th": {
          "title": "บทที่ 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "ru": {
          "title": "Урок 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      },
      "pt": {
          "title": "Lição 40 (N4): Câu Hỏi Lồng (〜か・〜かどうか)",
          "description": "Lồng một câu hỏi vào trong một mệnh đề lớn."
      }
  },
  "n4-lesson-41-giving-receiving-keigo": {
      "vi": {
          "title": "Bài 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "en": {
          "title": "Lesson 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "zh-CN": {
          "title": "第41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "zh-TW": {
          "title": "第41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "ko": {
          "title": "제41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "es": {
          "title": "Lección 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "fr": {
          "title": "Leçon 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "de": {
          "title": "Lektion 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "id": {
          "title": "Pelajaran 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "th": {
          "title": "บทที่ 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "ru": {
          "title": "Урок 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      },
      "pt": {
          "title": "Lição 41 (N4): Kính Ngữ Trao Nhận (やる・いただく・くださる)",
          "description": "Văn hóa kính cẩn khi trao nhận với cấp trên, bề dưới và vật nuôi."
      }
  },
  "n4-lesson-42-tame-ni-noni": {
      "vi": {
          "title": "Bài 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "en": {
          "title": "Lesson 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "zh-CN": {
          "title": "第42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "zh-TW": {
          "title": "第42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "ko": {
          "title": "제42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "es": {
          "title": "Lección 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "fr": {
          "title": "Leçon 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "de": {
          "title": "Lektion 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "id": {
          "title": "Pelajaran 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "th": {
          "title": "บทที่ 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "ru": {
          "title": "Урок 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      },
      "pt": {
          "title": "Lição 42 (N4): Để / Vì Mục Đích & Công Dụng (〜ために・〜のに)",
          "description": "Nêu mục đích hành động và đánh giá công dụng của đồ vật."
      }
  },
  "n4-lesson-48-causative-shieki": {
      "vi": {
          "title": "Bài 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "en": {
          "title": "Lesson 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "zh-CN": {
          "title": "第48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "zh-TW": {
          "title": "第48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "ko": {
          "title": "제48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "es": {
          "title": "Lección 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "fr": {
          "title": "Leçon 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "de": {
          "title": "Lektion 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "id": {
          "title": "Pelajaran 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "th": {
          "title": "บทที่ 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "ru": {
          "title": "Урок 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      },
      "pt": {
          "title": "Lição 48 (N4): Thể Sai Khiến (使役形 - Shieki)",
          "description": "Cho phép hoặc yêu cầu cấp dưới, người khác làm việc gì."
      }
  },
  "n4-lesson-49-respectful-sonkeigo": {
      "vi": {
          "title": "Bài 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "en": {
          "title": "Lesson 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "zh-CN": {
          "title": "第49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "zh-TW": {
          "title": "第49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "ko": {
          "title": "제49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "es": {
          "title": "Lección 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "fr": {
          "title": "Leçon 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "de": {
          "title": "Lektion 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "id": {
          "title": "Pelajaran 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "th": {
          "title": "บทที่ 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "ru": {
          "title": "Урок 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      },
      "pt": {
          "title": "Lição 49 (N4): Tôn Kính Ngữ (尊敬語 - Sonkeigo)",
          "description": "Nâng cao vị thế đối phương, khách hàng và cấp trên trong giao tiếp."
      }
  },
  "n4-lesson-50-humble-kenjougo": {
      "vi": {
          "title": "Bài 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "en": {
          "title": "Lesson 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "zh-CN": {
          "title": "第50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "zh-TW": {
          "title": "第50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "ko": {
          "title": "제50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "es": {
          "title": "Lección 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "fr": {
          "title": "Leçon 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "de": {
          "title": "Lektion 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "id": {
          "title": "Pelajaran 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "th": {
          "title": "บทที่ 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "ru": {
          "title": "Урок 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      },
      "pt": {
          "title": "Lição 50 (N4): Khiêm Nhường Ngữ (謙譲語 - Kenjougo)",
          "description": "Hạ mình khiêm tốn khi nói về hành động của bản thân với khách hàng."
      }
  },
  "n4-hospital-visit": {
      "vi": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "en": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "zh-CN": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "zh-TW": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "ko": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "es": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "fr": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "de": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "id": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "th": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "ru": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      },
      "pt": {
          "title": "Khám Bệnh Tại Phòng Khám & Bệnh Viện Nhật (N4)",
          "description": "Mô tả triệu chứng, nghe chỉ định của bác sĩ và lấy đơn thuốc."
      }
  },
  "n4-apartment-leasing": {
      "vi": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "en": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "zh-CN": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "zh-TW": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "ko": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "es": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "fr": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "de": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "id": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "th": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "ru": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      },
      "pt": {
          "title": "Thuê Nhà & Hợp Đồng Bất Động Sản Nhật (N4)",
          "description": "Thuật ngữ tiền cọc, tiền lễ, phí quản lý và trao đổi với công ty môi giới."
      }
  },
  "n4-baito-interview": {
      "vi": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "en": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "zh-CN": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "zh-TW": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "ko": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "es": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "fr": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "de": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "id": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "th": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "ru": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      },
      "pt": {
          "title": "Phỏng Vấn Xin Việc Làm Thêm Baito (N4)",
          "description": "Phản xạ trả lời lý do ứng tuyển, lịch làm việc và phép lịch sự khi phỏng vấn."
      }
  },
  "n4-office-reporting": {
      "vi": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "en": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "zh-CN": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "zh-TW": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "ko": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "es": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "fr": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "de": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "id": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "th": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "ru": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      },
      "pt": {
          "title": "Báo Cáo Hō-Ren-Sō Trong Công Sở Nhật (N4)",
          "description": "Báo cáo tiến độ, liên lạc và thảo luận xin ý kiến cấp trên."
      }
  },
  "n3-lesson-1-grammar-foundations": {
      "vi": {
          "title": "Ngữ Pháp N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "en": {
          "title": "Grammar N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "zh-CN": {
          "title": "语法 N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "zh-TW": {
          "title": "語法 N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "ko": {
          "title": "문법 N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "es": {
          "title": "Gramática N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "fr": {
          "title": "Grammaire N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "de": {
          "title": "Grammatik N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "id": {
          "title": "Tata Bahasa N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "th": {
          "title": "ไวยากรณ์ N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "ru": {
          "title": "Грамматика N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      },
      "pt": {
          "title": "Gramática N3: Nền Tảng Chuyển Tiếp Trung Cấp",
          "description": "Làm quen với các cấu trúc diễn đạt sắc thái tinh tế của trình độ N3."
      }
  },
  "n3-lesson-4-grammar-logic-certainty": {
      "vi": {
          "title": "Ngữ Pháp N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "en": {
          "title": "Grammar N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "zh-CN": {
          "title": "语法 N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "zh-TW": {
          "title": "語法 N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "ko": {
          "title": "문법 N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "es": {
          "title": "Gramática N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "fr": {
          "title": "Grammaire N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "de": {
          "title": "Grammatik N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "id": {
          "title": "Tata Bahasa N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "th": {
          "title": "ไวยากรณ์ N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "ru": {
          "title": "Грамматика N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      },
      "pt": {
          "title": "Gramática N3: Lập Luận Logic & Phán Đoán Chắc Chắn (〜に違いない・〜はずだ)",
          "description": "Trình bày luận điểm chặt chẽ và nhận định xác thực."
      }
  },
  "n3-lesson-6-grammar-inability": {
      "vi": {
          "title": "Ngữ Pháp N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "en": {
          "title": "Grammar N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "zh-CN": {
          "title": "语法 N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "zh-TW": {
          "title": "語法 N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "ko": {
          "title": "문법 N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "es": {
          "title": "Gramática N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "fr": {
          "title": "Grammaire N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "de": {
          "title": "Grammatik N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "id": {
          "title": "Tata Bahasa N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "th": {
          "title": "ไวยากรณ์ N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "ru": {
          "title": "Грамматика N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      },
      "pt": {
          "title": "Gramática N3: Bất Khả Kháng & Không Thể (〜わけにはいかない)",
          "description": "Nói về những việc không thể làm do chuẩn mực đạo đức hoặc tình thế."
      }
  },
  "n3-lesson-7-grammar-moments": {
      "vi": {
          "title": "Ngữ Pháp N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "en": {
          "title": "Grammar N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "zh-CN": {
          "title": "语法 N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "zh-TW": {
          "title": "語法 N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "ko": {
          "title": "문법 N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "es": {
          "title": "Gramática N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "fr": {
          "title": "Grammaire N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "de": {
          "title": "Grammatik N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "id": {
          "title": "Tata Bahasa N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "th": {
          "title": "ไวยากรณ์ N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "ru": {
          "title": "Грамматика N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      },
      "pt": {
          "title": "Gramática N3: Khoảnh Khắc & Thời Điểm Tức Thì (〜たとたん・〜最中に)",
          "description": "Mô tả sự việc bất ngờ xảy ra đúng ngay thời điểm then chốt."
      }
  },
  "n3-lesson-10-grammar-keigo": {
      "vi": {
          "title": "Ngữ Pháp N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "en": {
          "title": "Grammar N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "zh-CN": {
          "title": "语法 N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "zh-TW": {
          "title": "語法 N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "ko": {
          "title": "문법 N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "es": {
          "title": "Gramática N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "fr": {
          "title": "Grammaire N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "de": {
          "title": "Grammatik N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "id": {
          "title": "Tata Bahasa N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "th": {
          "title": "ไวยากรณ์ N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "ru": {
          "title": "Грамматика N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      },
      "pt": {
          "title": "Gramática N3: Kính Ngữ Thương Mại & Nghi Thức Doanh Nghiệp",
          "description": "Kính ngữ chuyên sâu dùng trong đàm phán, trao đổi email thương mại."
      }
  },
  "n3-lesson-11-kanji-politics-economy": {
      "vi": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "en": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "zh-CN": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "zh-TW": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "ko": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "es": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "fr": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "de": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "id": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "th": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "ru": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      },
      "pt": {
          "title": "Kanji N3: Xã Hội, Chính Trị & Kinh Tế",
          "description": "Chữ Hán trung cấp thường xuất hiện trên báo chí và tin tức tài chính."
      }
  },
  "n3-lesson-15-kanji-daily-life": {
      "vi": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "en": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "zh-CN": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "zh-TW": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "ko": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "es": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "fr": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "de": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "id": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "th": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "ru": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      },
      "pt": {
          "title": "Kanji N3: Đời Sống Thực Tế & Môi Trường",
          "description": "Chữ Hán liên quan đến thủ tục hành chính, bảo hiểm và đô thị."
      }
  },
  "n3-lesson-16-vocab-frequent-verbs": {
      "vi": {
          "title": "Từ Vựng N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "en": {
          "title": "Vocabulary N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "zh-CN": {
          "title": "核心词汇 N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "zh-TW": {
          "title": "核心詞彙 N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "ko": {
          "title": "어휘 N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "es": {
          "title": "Vocabulario N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "fr": {
          "title": "Vocabulaire N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "de": {
          "title": "Wortschatz N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "id": {
          "title": "Kosakata N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "th": {
          "title": "คำศัพท์ N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "ru": {
          "title": "Лексика N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      },
      "pt": {
          "title": "Vocabulário N3: Động Từ Ghép & Động Từ Đa Nghĩa Tần Suất Cao",
          "description": "Mở rộng vốn từ vựng hành động sắc thái chuyên sâu."
      }
  },
  "n3-lesson-17-vocab-adjectives-adverbs": {
      "vi": {
          "title": "Từ Vựng N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "en": {
          "title": "Vocabulary N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "zh-CN": {
          "title": "核心词汇 N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "zh-TW": {
          "title": "核心詞彙 N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "ko": {
          "title": "어휘 N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "es": {
          "title": "Vocabulario N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "fr": {
          "title": "Vocabulaire N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "de": {
          "title": "Wortschatz N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "id": {
          "title": "Kosakata N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "th": {
          "title": "คำศัพท์ N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "ru": {
          "title": "Лексика N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      },
      "pt": {
          "title": "Vocabulário N3: Phó Từ & Từ Tượng Thanh, Tượng Hình",
          "description": "Sử dụng phó từ linh hoạt để câu văn tự nhiên như người bản xứ."
      }
  },
  "n3-lesson-19-reading-emails-notices": {
      "vi": {
          "title": "Đọc Hiểu N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "en": {
          "title": "Reading N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "zh-CN": {
          "title": "读解训练 N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "zh-TW": {
          "title": "讀解訓練 N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "ko": {
          "title": "독해 N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "es": {
          "title": "Lectura N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "fr": {
          "title": "Lecture N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "de": {
          "title": "Lesen N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "id": {
          "title": "Membaca N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "th": {
          "title": "การอ่าน N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "ru": {
          "title": "Чтение N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      },
      "pt": {
          "title": "Leitura N3: Email Thương Mại & Thông Báo Công Ty",
          "description": "Kỹ năng tìm ý chính và nắm bắt yêu cầu trong văn bản công sở."
      }
  },
  "n3-lesson-21-listening-school-hospital": {
      "vi": {
          "title": "Nghe Hiểu N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "en": {
          "title": "Listening N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "zh-CN": {
          "title": "听力理解 N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "zh-TW": {
          "title": "聽力理解 N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "ko": {
          "title": "청해 N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "es": {
          "title": "Escucha N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "fr": {
          "title": "Écoute N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "de": {
          "title": "Hören N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "id": {
          "title": "Mendengar N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "th": {
          "title": "การฟัง N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "ru": {
          "title": "Аудирование N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      },
      "pt": {
          "title": "Audição N3: Tình Huống Trường Học, Bệnh Viện & Đời Sống",
          "description": "Phán đoán nhanh thông tin chỉ dẫn trong các môi trường công cộng."
      }
  },
  "n3-lesson-22-listening-workplace-dialogue": {
      "vi": {
          "title": "Nghe Hiểu N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "en": {
          "title": "Listening N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "zh-CN": {
          "title": "听力理解 N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "zh-TW": {
          "title": "聽力理解 N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "ko": {
          "title": "청해 N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "es": {
          "title": "Escucha N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "fr": {
          "title": "Écoute N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "de": {
          "title": "Hören N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "id": {
          "title": "Mendengar N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "th": {
          "title": "การฟัง N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "ru": {
          "title": "Аудирование N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      },
      "pt": {
          "title": "Audição N3: Hội Thoại Công Sở & Chỉ Thị Công Việc",
          "description": "Luyện nghe chỉ thị của sếp và trao đổi với đồng nghiệp."
      }
  },
  "n3-lesson-23-jlpt-mock-test-1": {
      "vi": {
          "title": "Đề Thi Thử Toàn Diện JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "en": {
          "title": "Mock Exam JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "zh-CN": {
          "title": "全真模拟考试 JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "zh-TW": {
          "title": "全真模擬考試 JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "ko": {
          "title": "실전 모의고사 JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "es": {
          "title": "Examen de prueba JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "fr": {
          "title": "Examen blanc JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "de": {
          "title": "Probeprüfung JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "id": {
          "title": "Ujian Simulasi JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "th": {
          "title": "ข้อสอบจำลอง JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "ru": {
          "title": "Пробный экзамен JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      },
      "pt": {
          "title": "Simulado JLPT N3 (Đề số 1)",
          "description": "Kiểm tra tổng hợp 3 phần thi theo chuẩn thang điểm JLPT N3."
      }
  },
  "n3-lesson-24-jlpt-mock-test-2": {
      "vi": {
          "title": "Đề Thi Thử Toàn Diện JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "en": {
          "title": "Mock Exam JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "zh-CN": {
          "title": "全真模拟考试 JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "zh-TW": {
          "title": "全真模擬考試 JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "ko": {
          "title": "실전 모의고사 JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "es": {
          "title": "Examen de prueba JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "fr": {
          "title": "Examen blanc JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "de": {
          "title": "Probeprüfung JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "id": {
          "title": "Ujian Simulasi JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "th": {
          "title": "ข้อสอบจำลอง JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "ru": {
          "title": "Пробный экзамен JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      },
      "pt": {
          "title": "Simulado JLPT N3 (Đề số 2)",
          "description": "Rèn luyện áp lực thời gian và chiến thuật làm bài đọc hiểu dài."
      }
  },
  "n3-lesson-25-jlpt-mock-test-final": {
      "vi": {
          "title": "Đề Thi Thử Toàn Diện JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "en": {
          "title": "Mock Exam JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "zh-CN": {
          "title": "全真模拟考试 JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "zh-TW": {
          "title": "全真模擬考試 JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "ko": {
          "title": "실전 모의고사 JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "es": {
          "title": "Examen de prueba JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "fr": {
          "title": "Examen blanc JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "de": {
          "title": "Probeprüfung JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "id": {
          "title": "Ujian Simulasi JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "th": {
          "title": "ข้อสอบจำลอง JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "ru": {
          "title": "Пробный экзамен JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      },
      "pt": {
          "title": "Simulado JLPT N3 (Đề Tổng Kết)",
          "description": "Đánh giá toàn diện năng lực trước khi bước vào kỳ thi chính thức."
      }
  },
  "n3-workplace-reporting": {
      "vi": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "en": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "zh-CN": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "zh-TW": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "ko": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "es": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "fr": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "de": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "id": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "th": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "ru": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      },
      "pt": {
          "title": "Hội Thoại Công Sở N3: Thuyết Trình & Phản Hồi Dự Án",
          "description": "Kỹ năng trình bày ý tưởng và phản hồi trong buổi họp công ty."
      }
  },
  "n3-medical-clinic": {
      "vi": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "en": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "zh-CN": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "zh-TW": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "ko": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "es": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "fr": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "de": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "id": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "th": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "ru": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      },
      "pt": {
          "title": "Khám Chuyên Khoa Y Tế & Bảo Hiểm Y Tế N3",
          "description": "Trao đổi sâu với bác sĩ về tiền sử bệnh án và phác đồ điều trị."
      }
  },

  "survival-mode": {
    vi: { title: "Survival Mode — Sinh tồn thực chiến", description: "Test phản xạ từ vựng & xử lý tình huống giao tiếp có thời gian thực." },
    en: { title: "Survival Mode — Real-time Reflex", description: "Test your vocabulary reflexes and situational Japanese communication under time pressure." },
    "zh-CN": { title: "Survival Mode 生存实战模式", description: "限时测试日语词汇反应与实战交流应对能力。" },
    "zh-TW": { title: "Survival Mode 生存實戰模式", description: "限時測試日語詞彙反應與實戰交流應對能力。" },
    ko: { title: "서바이벌 모드 (Survival Mode)", description: "실시간 일본어 단어 반응 속도와 상황 대처 능력 훈련." },
    es: { title: "Modo Supervivencia (Survival Mode)", description: "Pon a prueba tus reflejos de vocabulario y situaciones comunicativas en tiempo real." },
  },
  "ai-sensei": {
    vi: { title: "AI Kaiwa Sensei — Hội thoại AI", description: "Luyện đối thoại 2 chiều với giáo viên AI, không sợ sai." },
    en: { title: "AI Kaiwa Sensei — AI Conversation", description: "Practice 2-way natural Japanese conversation with your AI teacher without fear of mistakes." },
    "zh-CN": { title: "AI Kaiwa Sensei 人工智能对话导师", description: "与 AI 导师进行无压力的双向日语会话练习。" },
    "zh-TW": { title: "AI Kaiwa Sensei 人工智能對話導師", description: "與 AI 導師進行無壓力的雙向日語會話練習。" },
    ko: { title: "AI 카이와 센세 (AI 회화)", description: "실수 걱정 없이 AI 선생님과 자유롭게 나누는 2방향 일본어 회화 훈련." },
    es: { title: "AI Kaiwa Sensei — Conversación con IA", description: "Practica conversación interactiva en japonés con tu profesor de IA sin miedo a equivocarte." },
  },
  "shinkansen-journey": {
    vi: { title: "Hành trình Shinkansen — Mở khóa địa danh", description: "Thuật XP mở khóa Tokyo → Kyoto → Osaka trên bản đồ Nhật Bản." },
    en: { title: "Shinkansen Journey — Explore Japan", description: "Earn XP to unlock Tokyo, Kyoto, Osaka and iconic Japanese landmarks on the map." },
    "zh-CN": { title: "新干线之旅 — 解锁日本名胜", description: "累积 XP 在日本地图上解锁东京、京都、大阪等名胜。" },
    "zh-TW": { title: "新幹線之旅 — 解鎖日本名勝", description: "累積 XP 在日本地圖上解鎖東京、京都、大阪等名勝。" },
    ko: { title: "신칸센 여정 — 일본 명소 탐험", description: "XP를 획득하여 일본 지도에서 도쿄, 교토, 오사카를 차례로 잠금 해제하세요." },
    es: { title: "Viaje Shinkansen — Explora Japón", description: "Gana XP para desbloquear Tokio, Kioto, Osaka y lugares emblemáticos de Japón." },
  },
  "srs-review": {
    vi: { title: "Ôn tập SRS SM-2", description: "Thuật toán lặp lại ngắt quãng — chống quên lâu dài." },
    en: { title: "SRS Spaced Repetition (SM-2)", description: "Scientific spaced repetition algorithm for long-term memory retention." },
    "zh-CN": { title: "SRS 间隔重复复习", description: "采用科学间隔重复算法，实现长久抗遗忘。" },
    "zh-TW": { title: "SRS 間隔重複複習", description: "採用科學間隔重複演算法，實現長久抗遺忘。" },
    ko: { title: "SRS 간격 반복 복습", description: "장기 기억 보존을 위한 과학적인 SM-2 간격 반복 알고리즘." },
    es: { title: "Repaso Espaciado SRS (SM-2)", description: "Algoritmo de repetición espaciada para una retención duradera en la memoria." },
  },
  "vocab-n5": {
    vi: { title: "Kho từ vựng N5 — Lưu thẻ SRS", description: "Tra cứu nghĩa, âm On/Kun, ví dụ ngữ cảnh; lưu thẻ ôn 1 chạm." },
    en: { title: "N5 Vocabulary Bank & SRS Cards", description: "Look up meanings, On/Kun readings, context examples, and save 1-click SRS cards." },
    "zh-CN": { title: "N5 核心词汇库 & SRS 卡片", description: "查询词义、音读训读及语境例句，一键保存至复习卡片。" },
    "zh-TW": { title: "N5 核心詞彙庫 & SRS 卡片", description: "查詢詞義、音讀訓讀及語境例句，一鍵保存至複習卡片。" },
    ko: { title: "N5 단어 저장소 및 SRS 카드", description: "단어 의미, 음독/훈독, 예문 검색 및 1클릭 SRS 카드 저장." },
    es: { title: "Banco de Vocabulario N5 y Tarjetas SRS", description: "Consulta significados, lecturas On/Kun, ejemplos y guarda tarjetas SRS con 1 clic." },
  },
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

export const UNIT_I18N_MAP: Record<string, Record<number, Record<"en" | "vi", { title: string; description: string }> & Partial<Record<NativeLanguage, { title: string; description: string }>>>> = {
  N5: {
    1: {
      vi: { title: "Unit 01: Nhập Môn, Kana & Chào Hỏi", description: "Bảng chữ cái Hiragana, Katakana, biến âm, ảo âm, văn hóa chào hỏi & làm quen giao tiếp" },
      en: { title: "Unit 01: Fundamentals, Kana & Greetings", description: "Hiragana, Katakana, voiced sounds, combined sounds, greetings & basic conversational Japanese" },
      "zh-CN": { title: "第1单元：假名入门、发音与问候", description: "平假名、片假名、浊音、拗音、问候礼仪与基础交流" },
      "zh-TW": { title: "第1單元：假名入門、發音與問候", description: "平假名、片假名、濁音、拗音、問候禮儀與基礎交流" },
      ko: { title: "1단원: 입문, 가나 & 기본 인사", description: "히라가나, 가타카나, 탁음, 요음, 인사 문화 및 기초 회화" },
      es: { title: "Unidad 01: Introducción, Kana y Saludos", description: "Alfabeto Hiragana, Katakana, sonidos modificados, saludos y primeras conversaciones" },
      fr: { title: "Unité 01 : Fondations, Kana & Salutations", description: "Hiragana, Katakana, sons voisés, diphtongues, salutations et politesse" },
      de: { title: "Einheit 01: Grundlagen, Kana & Begrüßung", description: "Hiragana, Katakana, Lautvarianten, Begrüßungen und einfache Gespräche" },
      id: { title: "Unit 01: Pengantar, Kana & Salam", description: "Alfabet Hiragana, Katakana, bunyi modifikasi, salam dan percakapan dasar" },
      th: { title: "ยูนิต 01: บทนำ, คานะ & คำทักทาย", description: "ฮิรางานะ คาตาคานะ เสียงขุ่น เสียงควบ การทักทายและบทสนทนาพื้นฐาน" },
      ru: { title: "Раздел 01: Введение, кана и приветствия", description: "Хирагана, катакана, звонкие звуки, приветствия и базовая коммуникация" },
      pt: { title: "Unidade 01: Introdução, Kana e Saudações", description: "Alfabeto Hiragana, Katakana, sons modificados, cumprimentos e conversação básica" },
    },
    2: {
      vi: { title: "Unit 02: Đồ Vật, Nơi Chốn & Hoạt Động", description: "Chỉ thị từ Kore/Sore/Are, địa điểm, thời gian, động từ di chuyển & các cặp tính từ sơ cấp" },
      en: { title: "Unit 02: Objects, Places & Daily Activities", description: "Demonstratives Kore/Sore/Are, locations, time, movement verbs & basic adjective pairs" },
      "zh-CN": { title: "第2单元：物品、场所与日常活动", description: "指示词 Kore/Sore/Are、地点、时间、移动动词与初级形容词" },
      "zh-TW": { title: "第2單元：物品、場所與日常活動", description: "指示詞 Kore/Sore/Are、地點、時間、移動動詞與初級形容詞" },
      ko: { title: "2단원: 사물, 장소 & 일상 활동", description: "지시대명사 Kore/Sore/Are, 장소, 시간, 이동 동사 및 기초 형용사" },
      es: { title: "Unidad 02: Objetos, Lugares y Actividades", description: "Demostrativos Kore/Sore/Are, lugares, horas, verbos de movimiento y adjetivos" },
      fr: { title: "Unité 02 : Objets, Lieux & Activités Quotidiennes", description: "Démonstratifs Kore/Sore/Are, lieux, heure, verbes de mouvement et adjectifs" },
      de: { title: "Einheit 02: Gegenstände, Orte & Tagesablauf", description: "Demonstrativpronomen Kore/Sore/Are, Orte, Uhrzeit, Bewegungsverben und Adjektive" },
      id: { title: "Unit 02: Benda, Tempat & Kegiatan Harian", description: "Kata tunjuk Kore/Sore/Are, tempat, waktu, kata kerja bergerak dan kata sifat dasar" },
      th: { title: "ยูนิต 02: สิ่งของ, สถานที่ & กิจวัตรประจำวัน", description: "คำชี้เฉพาะ Kore/Sore/Are สถานที่ เวลา กริยาการเคลื่อนที่และคำคุณศัพท์พื้นฐาน" },
      ru: { title: "Раздел 02: Предметы, места и повседневные действия", description: "Указательные местоимения Kore/Sore/Are, места, время, глаголы движения и прилагательные" },
      pt: { title: "Unidade 02: Objetos, Lugares e Atividades Diárias", description: "Pronomes demonstrativos Kore/Sore/Are, locais, horários, verbos de movimento e adjetivos" },
    },
    3: {
      vi: { title: "Unit 03: Tồn Tại, So Sánh & Thể Te", description: "Tồn tại Arimasu/Imasu, số đếm, so sánh hơn nhất, nguyện vọng & bí quyết chia Thể Te" },
      en: { title: "Unit 03: Existence, Comparisons & Te-Form", description: "Arimasu/Imasu existence, counters, comparisons, desires & Te-form verb conjugations" },
      "zh-CN": { title: "第3单元：存在句、比较级与Te形转换", description: "存在句 Arimasu/Imasu、量词、比较级、愿望与Te形动词活用秘诀" },
      "zh-TW": { title: "第3單元：存在句、比較級與Te形轉換", description: "存在句 Arimasu/Imasu、量詞、比較級、願望與Te形動詞活用秘訣" },
      ko: { title: "3단원: 존재문, 비교 & Te형 활용", description: "존재문 Arimasu/Imasu, 수사, 비교급, 희망 표현 및 Te형 동사 활용" },
      es: { title: "Unidad 03: Existencia, Comparaciones y Forma Te", description: "Existencia Arimasu/Imasu, contadores, comparativos, deseos y conjugación en forma Te" },
      fr: { title: "Unité 03 : Existence, Comparaisons & Forme en Te", description: "Existence Arimasu/Imasu, compteurs, comparatifs, souhaits et conjugaison en forme Te" },
      de: { title: "Einheit 03: Existenz, Vergleiche & Te-Form", description: "Existenz Arimasu/Imasu, Zählwörter, Vergleiche, Wünsche und Konjugation der Te-Form" },
      id: { title: "Unit 03: Keberadaan, Perbandingan & Bentuk Te", description: "Keberadaan Arimasu/Imasu, kata bantu bilangan, perbandingan, keinginan & konjugasi bentuk Te" },
      th: { title: "ยูนิต 03: การบอกการมีอยู่, การเปรียบเทียบ & รูปเตะ (Te-form)", description: "การมีอยู่ Arimasu/Imasu ลักษณนาม การเปรียบเทียบ ความต้องการและผันกริยารูปเตะ" },
      ru: { title: "Раздел 03: Наличие, сравнения и форма Te", description: "Конструкции наличия Arimasu/Imasu, счётные суффиксы, сравнения, желания и форма Te" },
      pt: { title: "Unidade 03: Existência, Comparações e Forma Te", description: "Existência Arimasu/Imasu, contadores, comparações, desejos e conjugação da forma Te" },
    },
    4: {
      vi: { title: "Unit 04: Thể Nai, Ta, Thể Thường & Định Ngữ", description: "Mẫu câu cấm đoán, bắt buộc làm, thể từ điển, kinh nghiệm từng trải & mệnh đề bổ ngữ danh từ" },
      en: { title: "Unit 04: Nai-form, Ta-form, Plain Form & Modifiers", description: "Prohibitions, obligations, dictionary form, past experiences & noun modification clauses" },
      "zh-CN": { title: "第4单元：Nai形、Ta形、简体与定语从句", description: "禁止、必须、辞书形、过去经历表达与名词修饰从句" },
      "zh-TW": { title: "第4單元：Nai形、Ta形、簡體與定語從句", description: "禁止、必須、辭書形、過去經歷表達與名詞修飾從句" },
      ko: { title: "4단원: Nai형, Ta형, 보통체 & 명사 수식절", description: "금지, 의무 표현, 사전형, 경험 표현 및 명사 수식절 마스터" },
      es: { title: "Unidad 04: Forma Nai, Forma Ta, Coloquial y Relativas", description: "Prohibiciones, obligaciones, forma diccionario, experiencias y oraciones de relativo" },
      fr: { title: "Unité 04 : Formes Nai, Ta, Neutre & Propositions Relatives", description: "Interdiction, obligation, forme du dictionnaire, passé d'expérience et subordonnées relatives" },
      de: { title: "Einheit 04: Nai-Form, Ta-Form, Grundform & Relativsätze", description: "Verbote, Pflichten, Wörterbuchform, Erfahrungen und attributive Nebensätze" },
      id: { title: "Unit 04: Bentuk Nai, Bentuk Ta, Bentuk Biasa & Frasa Modifikasi", description: "Larangan, keharusan, bentuk kamus, pengalaman masa lalu dan klausa penjelas kata benda" },
      th: { title: "ยูนิต 04: รูปไน, รูปตะ, รูปธรรมดา & ประโยคขยายคำนาม", description: "ประโยคห้าม ประโยคบังคับ รูปพจนานุกรม การบอกประสบการณ์และอนุประโยคขยายคำนาม" },
      ru: { title: "Раздел 04: Формы Nai, Ta, простой стиль и определительные придаточные", description: "Запреты, обязательства, словарная форма, опыт прошлого и придаточные определительные" },
      pt: { title: "Unidade 04: Forma Nai, Forma Ta, Modo Informal e Orações Relativas", description: "Proibições, obrigações, forma de dicionário, experiências passadas e orações relativas" },
    },
    5: {
      vi: { title: "Unit 05: Kanji Master & Mock Test JLPT N5", description: "100+ Kanji cốt lõi, 10 trợ từ then chốt, phản xạ 5 thể động từ, đọc hiểu & đề thi thử toàn diện" },
      en: { title: "Unit 05: Kanji Master & Mock Test JLPT N5", description: "100+ Core Kanji, 10 key particles, 5 verb form reflexes, reading comprehension & mock test" },
      "zh-CN": { title: "第5单元：汉字大师与JLPT N5全真模拟", description: "100+核心汉字、10大关键助词、5大动词变形反射、阅读理解与全真模拟考" },
      "zh-TW": { title: "第5單元：漢字大師與JLPT N5全真模擬", description: "100+核心漢字、10大關鍵助詞、5大動詞變形反射、閱讀理解與全真模擬考" },
      ko: { title: "5단원: 한자 마스터 & JLPT N5 모의고사", description: "핵심 한자 100선, 10대 조사, 5대 동사 변형 순발력 훈련, 독해 및 실전 모의고사" },
      es: { title: "Unidad 05: Maestro Kanji y Examen de Prueba JLPT N5", description: "100+ Kanji clave, 10 partículas esenciales, 5 formas verbales, comprensión de lectura y simulación" },
      fr: { title: "Unité 05 : Maître Kanji & Examen Blanc JLPT N5", description: "100+ Kanji clés, 10 particules majeures, réflexes des 5 formes verbales, lecture et examen blanc" },
      de: { title: "Einheit 05: Kanji-Meister & JLPT N5 Probetest", description: "100+ Kern-Kanji, 10 Schlüsselpartikeln, 5 Verbformen, Leseverstehen & Probetest" },
      id: { title: "Unit 05: Master Kanji & Simulasi Ujian JLPT N5", description: "100+ Kanji inti, 10 partikel kunci, refleks 5 bentuk kata kerja, pemahaman membaca & simulasi ujian" },
      th: { title: "ยูนิต 05: ปรมาจารย์คันจิ & ข้อสอบจำลอง JLPT N5", description: "คันจิหลัก 100+ ตัว 10 คำช่วยสำคัญ ผันกริยา 5 รูปแบบ การอ่านจับใจความและข้อสอบจำลอง" },
      ru: { title: "Раздел 05: Мастер Кандзи и Пробный Экзамен JLPT N5", description: "100+ базовых кандзи, 10 ключевых частиц, 5 глагольных форм, чтение и полный тест" },
      pt: { title: "Unidade 05: Mestre em Kanji e Simulado JLPT N5", description: "100+ Kanji essenciais, 10 partículas-chave, reflexos das 5 formas verbais, leitura e simulado completo" },
    },
    6: {
      vi: { title: "Unit 06: Chuyên Đề Bổ Trợ Giao Tiếp Sơ Cấp (Part 1–9)", description: "9 chuyên đề thực hành từ vựng, ngữ pháp và hội thoại giao tiếp sơ cấp mở rộng" },
      en: { title: "Unit 06: Practical Elementary Conversational Modules (Part 1–9)", description: "9 practical supplementary modules covering extended vocabulary, grammar & everyday dialogues" },
      "zh-CN": { title: "第6单元：初级实用会话强化专题 (Part 1–9)", description: "9大实用补充专题：涵盖拓展词汇、语法深化与日常生活会话" },
      "zh-TW": { title: "第6單元：初級實用會話強化專題 (Part 1–9)", description: "9大實用補充專題：涵蓋拓展詞彙、語法深化與日常生活會話" },
      ko: { title: "6단원: 초급 실전 회화 보충 특강 (Part 1–9)", description: "어휘, 문법 및 실생활 회화를 확장 학습하는 9개 실전 보충 모듈" },
      es: { title: "Unidad 06: Módulos Prácticos de Conversación Elemental (Parte 1–9)", description: "9 módulos complementarios de vocabulario extendido, gramática y situaciones cotidianas" },
      fr: { title: "Unité 06 : Modules Pratiques de Conversation Élémentaire (Parties 1–9)", description: "9 modules complémentaires axés sur le vocabulaire étendu, la grammaire et les échanges du quotidien" },
      de: { title: "Einheit 06: Praktische Konversationsmodule für Anfänger (Teil 1–9)", description: "9 vertiefende Ergänzungsmodule für Wortschatz, Grammatik und alltägliche Dialoge" },
      id: { title: "Unit 06: Modul Praktis Percakapan Dasar (Bagian 1–9)", description: "9 modul pendukung praktis meliputi kosakata lanjutan, tata bahasa dan percakapan harian" },
      th: { title: "ยูนิต 06: โมดูลเสริมการสนทนาขั้นต้นในชีวิตจริง (ตอนที่ 1–9)", description: "9 โมดูลเสริมคำศัพท์ ไวยากรณ์ และบทสนทนาสถานการณ์จริงในชีวิตประจำวัน" },
      ru: { title: "Раздел 06: Практические модули базовой разговорной речи (Части 1–9)", description: "9 дополнительных тем для расширения словаря, грамматики и диалогов на каждый день" },
      pt: { title: "Unidade 06: Módulos Práticos de Conversação Básica (Partes 1–9)", description: "9 módulos complementares com vocabulário estendido, gramática e conversação diária" },
    },
  },
  N4: {
    1: {
      vi: { title: "Unit 01: Biến Thể Động Từ & Thể Trạng Thái", description: "Thể てしまう, やすい/にくい, すぎる và các biến thể động từ sơ trung cấp" },
      en: { title: "Unit 01: Advanced Verb Variations & State Forms", description: "Expressing unintentional action (てしまう), ease/difficulty (やすい/にくい), excess (すぎる) & state" },
      "zh-CN": { title: "第1单元：动词衍生变化与状态表达", description: "てしまう、やすい/にくい、すぎる以及初中级复合动词衍生形式" },
      "zh-TW": { title: "第1單元：動詞衍生變化與狀態表達", description: "てしまう、やすい/にくい、すぎる以及初中級複合動詞衍生形式" },
      ko: { title: "1단원: 동사 파생 활용 & 상태 표현", description: "てしまう, やすい/にくい, すぎる 및 초중급 동사 복합 표현 완전 정복" },
      es: { title: "Unidad 01: Variaciones Verbales y Estados", description: "Acciones involuntarias (てしまう), facilidad/dificultad (やすい/にくい) y exceso (すぎる)" },
      fr: { title: "Unité 01 : Variations Verbales & Formes d'État", description: "Action involontaire (てしまう), facilité/difficulté (やすい/にくい) et excès (すぎる)" },
      de: { title: "Einheit 01: Erweiterte Verbformen & Zustände", description: "Unbeabsichtigte Handlungen (てしまう), Leichtigkeit/Schwierigkeit (やすい/にくい), Übermaß (すぎる)" },
      id: { title: "Unit 01: Variasi Kata Kerja & Bentuk Keadaan", description: "Tindakan tak sengaja (てしまう), mudah/sulit (やすい/にくい), berlebihan (すぎる)" },
      th: { title: "ยูนิต 01: การผันกริยาขั้นสูง & การบอกสภาพ", description: "การกระทำโดยไม่ตั้งใจ (てしまう), ความง่าย/ยาก (やすい/にくい), การกระทำเกินพอดี (すぎる)" },
      ru: { title: "Раздел 01: Вариации глаголов и формы состояния", description: "Непреднамеренные действия (てしまう), легко/сложно (やすい/にくい), избыток (すぎる)" },
      pt: { title: "Unidade 01: Variações Verbais e Formas de Estado", description: "Ações involuntárias (てしまう), facilidade/dificuldade (やすい/にくい) e excesso (すぎる)" },
    },
    2: {
      vi: { title: "Unit 02: Câu Điều Kiện & Giả Định", description: "Bốn dạng câu giả định: ば, たら, なら, と — phân biệt và sử dụng đúng ngữ cảnh" },
      en: { title: "Unit 02: Conditionals & Hypotheses (ば, たら, なら, と)", description: "Mastering the 4 conditional forms: distinctions, nuanced usage, and natural contexts" },
      "zh-CN": { title: "第2单元：条件句与假设判断 (ば, たら, なら, と)", description: "掌握四大经典假设条件形：辨析语境差异与自然表达" },
      "zh-TW": { title: "第2單元：條件句與假設判斷 (ば, たら, なら, と)", description: "掌握四大經典假設條件形：辨析語境差異與自然表達" },
      ko: { title: "2단원: 조건문 & 가정 표현 (ば, たら, なら, と)", description: "일본어 4대 조건형 완벽 비교: 문맥별 뉘앙스 차이와 자연스러운 활용" },
      es: { title: "Unidad 02: Condicionales e Hipótesis (ば, たら, なら, と)", description: "Las 4 formas condicionales: diferencias de matiz y uso natural en contexto" },
      fr: { title: "Unité 02 : Conditionnels & Hypothèses (ば, たら, なら, と)", description: "Maîtrise des 4 formes conditionnelles : nuances, contextes et distinctions clés" },
      de: { title: "Einheit 02: Konditionale & Hypothesen (ば, たら, なら, と)", description: "Die 4 Bedingungsformen: Nuancen, Unterschiede und authentische Anwendung" },
      id: { title: "Unit 02: Kalimat Pengandaian (ば, たら, なら, と)", description: "Menguasai 4 bentuk pengandaian: perbedaan nuansa dan penggunaan alami" },
      th: { title: "ยูนิต 02: ประโยคเงื่อนไขและสมมติ (ば, たら, なら, と)", description: "เจาะลึก 4 รูปแบบเงื่อนไข: ความแตกต่างของการใช้งานและบริบทที่เหมาะสม" },
      ru: { title: "Раздел 02: Условные конструкции (ば, たら, なら, と)", description: "4 формы условия: тонкие смысловые различия и естественные контексты" },
      pt: { title: "Unidade 02: Condicionais e Hipóteses (ば, たら, なら, と)", description: "As 4 formas condicionais: distinções de nuances e uso natural em conversas" },
    },
    3: {
      vi: { title: "Unit 03: Bị Động, Sai Khiến & Xin Phép", description: "Thể Bị động (受身), Thể Sai khiến và Mẫu câu xin phép nơi công sở" },
      en: { title: "Unit 03: Passive (受身), Causative & Permission", description: "Passive form (受身形), causative verbs, respectful permissions & polite requests" },
      "zh-CN": { title: "第3单元：被动形 (受身)、使役形与敬语请求", description: "被动句 (受身形)、使役动词、职场请假与礼貌请求句型" },
      "zh-TW": { title: "第3單元：被動形 (受身)、使役形與敬語請求", description: "被動句 (受身形)、使役動詞、職場請假與禮貌請求句型" },
      ko: { title: "3단원: 수동태 (受身), 사역형 & 정중한 허가 요청", description: "수동태 (受身形), 사역형 동사, 비즈니스 허가 및 정중한 부탁 표현" },
      es: { title: "Unidad 03: Pasiva (受身), Causativa y Permisos", description: "Forma pasiva (受身形), verbos causativos, permisos corteses y peticiones formales" },
      fr: { title: "Unité 03 : Passif (受身), Causatif & Demandes Polies", description: "Forme passive (受身形), verbes causatifs, autorisations et requêtes formelles" },
      de: { title: "Einheit 03: Passiv (受身), Kausativ & Höfliche Bitten", description: "Passivform (受身形), Kausativverben, höfliche Erlaubnisfragen und Bitten" },
      id: { title: "Unit 03: Bentuk Pasif (受身), Kausatif & Izin Sopan", description: "Bentuk pasif (受身形), kata kerja kausatif, memohon izin dan permintaan sopan" },
      th: { title: "ยูนิต 03: กริยาถูกกระทำ (受身), กริยาให้ทำ & การขออนุญาต", description: "รูปถูกกระทำ รูปให้ทำ การขออนุญาตอย่างสุภาพและการสื่อสารในที่ทำงาน" },
      ru: { title: "Раздел 03: Пассив (受身), каузатив и вежливые просьбы", description: "Пассивный залог (受身形), побудительный залог, испрашивание разрешения" },
      pt: { title: "Unidade 03: Voz Passiva (受身), Causativa e Permissões", description: "Forma passiva (受身形), verbos causativos, permissões corteses e solicitações formais" },
    },
    4: {
      vi: { title: "Unit 04: Cho Nhận & Diễn Đạt Ý Định", description: "Mẫu câu cho nhận あげる/もらう/くれる, khuyên nhủ ほうがいい và suy đoán" },
      en: { title: "Unit 04: Giving/Receiving (あげる/もらう/くれる) & Intentions", description: "Benefactive verbs (あげる/もらう/くれる), advice (〜ほうがいい), conjectures & intentions" },
      "zh-CN": { title: "第4单元：授受动词 (あげる/もらう/くれる) 与意图表达", description: "授受动词、建议句型 〜ほうがいい、推测判断与意志形表达" },
      "zh-TW": { title: "第4單元：授受動詞 (あげる/もらう/くれる) 與意圖表達", description: "授受動詞、建議句型 〜ほうがいい、推測判斷與意志形表達" },
      ko: { title: "4단원: 수수동사 (あげる/もらう/くれる) & 의도 표현", description: "주고받기 동사 표현, 조언 〜ほうがいい, 추측 및 의지형 활용" },
      es: { title: "Unidad 04: Dar/Recibir (あげる/もらう/くれる) e Intenciones", description: "Verbos de beneficio (あげる/もらう/くれる), consejos (〜ほうがいい) y conjeturas" },
      fr: { title: "Unité 04 : Donner/Recevoir (あげる/もらう/くれる) & Intentions", description: "Verbes de don/réception, conseils (〜ほうがいい), suppositions et intentions" },
      de: { title: "Einheit 04: Geben/Empfangen (あげる/もらう/くれる) & Absichten", description: "Geben und Nehmen, Ratschläge (〜ほうがいい), Vermutungen und Absichtsformen" },
      id: { title: "Unit 04: Memberi/Menerima (あげる/もらう/くれる) & Niat", description: "Kata kerja memberi/menerima, saran (〜ほうがいい), dugaan dan bentuk niat" },
      th: { title: "ยูนิต 04: การให้และการรับ (あげる/もらう/くれる) & การบอกความตั้งใจ", description: "กริยาการให้/รับ คำแนะนำ (〜ほうがいい) การคาดเดาและรูปตั้งใจ" },
      ru: { title: "Раздел 04: Давать/Получать (あげる/もらう/くれる) и намерения", description: "Глаголы благодеяния, советы (〜ほうがいい), предположения и форма намерения" },
      pt: { title: "Unidade 04: Dar/Receber (あげる/もらう/くれる) e Intenções", description: "Verbos de dar e receber, conselhos (〜ほうがいい), suposições e intenções" },
    },
    5: {
      vi: { title: "Unit 05: Kanji N4 & Đề Thi Thử JLPT N4", description: "Kanji sơ trung cấp, tổng hợp ngữ pháp N4, đọc hiểu & đề thi thử JLPT N4 toàn diện" },
      en: { title: "Unit 05: Kanji N4 & Comprehensive JLPT N4 Mock Test", description: "Intermediate Kanji, complete N4 grammar synthesis, reading & comprehensive mock test" },
      "zh-CN": { title: "第5单元：Kanji N4与JLPT N4全真模拟考", description: "中初级核心汉字、N4语法全面总复习、实战读解与全真模拟" },
      "zh-TW": { title: "第5單元：Kanji N4與JLPT N4全真模擬考", description: "中初級核心漢字、N4語法全面總複習、實戰讀解與全真模擬" },
      ko: { title: "5단원: Kanji N4 & JLPT N4 실전 모의고사", description: "N4 필수 한자, N4 문법 총정리, 실전 독해 및 완성형 모의고사" },
      es: { title: "Unidad 05: Kanji N4 y Examen de Simulación JLPT N4", description: "Kanji intermedio, síntesis gramatical N4, lectura y examen de prueba completo" },
      fr: { title: "Unité 05 : Kanji N4 & Examen Blanc Complet JLPT N4", description: "Kanji intermédiaire, révision générale N4, compréhension écrite et examen blanc" },
      de: { title: "Einheit 05: Kanji N4 & Umfassender JLPT N4 Probetest", description: "Mittelstufen-Kanji, N4-Grammatikkompendium, Leseverstehen & Probetest" },
      id: { title: "Unit 05: Kanji N4 & Simulasi Lengkap JLPT N4", description: "Kanji tingkat menengah, rangkuman tata bahasa N4, membaca & simulasi ujian lengkap" },
      th: { title: "ยูนิต 05: คันจิ N4 & ข้อสอบจำลอง JLPT N4 ฉบับสมบูรณ์", description: "คันจิ N4 สรุปไวยากรณ์ N4 ทั้งหมด การอ่านจับใจความและข้อสอบจำลองเต็มรูปแบบ" },
      ru: { title: "Раздел 05: Кандзи N4 и Полный Пробный Экзамен JLPT N4", description: "Кандзи N4, полный обзор грамматики N4, чтение текстов и симуляция экзамена" },
      pt: { title: "Unidade 05: Kanji N4 e Simulado Completo JLPT N4", description: "Kanji intermediário, síntese gramatical do N4, leitura e simulado preparatório" },
    },
  },
  N3: {
    1: {
      vi: { title: "Unit 01: Giao Tiếp Công Sở & Khẳng Định Logic", description: "Văn hóa Horenso công sở, に関して, わけがない, に違いない và khẳng định chắc chắn" },
      en: { title: "Unit 01: Workplace Communication & Logical Certainty", description: "Horenso workplace culture, に関して, わけがない, に違いない & logical inferences" },
      "zh-CN": { title: "第1单元：职场商务沟通与逻辑推断", description: "日本职场报联相 (Horenso) 文化、に関して、わけがない、に違いない 与必然推论" },
      "zh-TW": { title: "第1單元：職場商務溝通與邏輯推斷", description: "日本職場報聯相 (Horenso) 文化、に関して、わけがない、に違いない 與必然推論" },
      ko: { title: "1단원: 비즈니스 소통 & 논리적 확신 표현", description: "비즈니스 호렌소(報連相) 문화, に関して, わけがない, に違いない 및 강한 확신" },
      es: { title: "Unidad 01: Comunicación Laboral y Certeza Lógica", description: "Cultura Horenso en la oficina, に関して, わけがない, に違いない y certeza lógica" },
      fr: { title: "Unité 01 : Communication Professionnelle & Déduction", description: "Culture Horenso en entreprise, に関して, わけがない, に違いない et certitudes" },
      de: { title: "Einheit 01: Geschäftskommunikation & Logische Gewissheit", description: "Horenso-Arbeitskultur, に関して, わけがない, に違いない und logische Schlussfolgerungen" },
      id: { title: "Unit 01: Komunikasi Tempat Kerja & Kepastian Logis", description: "Budaya Horenso di kantor, に関して, わけがない, に違いない & kepastian mutlak" },
      th: { title: "ยูนิต 01: การสื่อสารในที่ทำงาน & การอนุมานเชิงตรรกะ", description: "วัฒนธรรมโฮเรนโซ に関して, わけがない, に違いない และการยืนยันอย่างมั่นใจ" },
      ru: { title: "Раздел 01: Деловое общение и логическая уверенность", description: "Корпоративная культура хорэнсо, に関して, わけがない, に違いない и строгие выводы" },
      pt: { title: "Unidade 01: Comunicação Corporativa e Certeza Lógica", description: "Cultura Horenso no trabalho, に関して, わけがない, に違いない e inferências lógicas" },
    },
    2: {
      vi: { title: "Unit 02: Thời Điểm, Nguyên Nhân & Mức Độ", description: "たとたん, うちに, おかげで, せいで, に比べて và diễn đạt mức độ so sánh" },
      en: { title: "Unit 02: Timing, Causes & Comparative Degrees", description: "Instant actions (たとたん), intervals (うちに), reasons (おかげで/せいで), comparisons (に比べて)" },
      "zh-CN": { title: "第2单元：时间节点、因果归因与程度比较", description: "即时动作 たとたん、时机 うちに、积极/消极因果 おかげで/せいで、比较 に比べて" },
      "zh-TW": { title: "第2單元：時間節點、因果歸因與程度比較", description: "即時動作 たとたん、時機 うちに、積極/消極因果 おかげで/せいで、比較 に比べて" },
      ko: { title: "2단원: 시점, 인과 관계 & 정도 비교", description: "즉각 동작 たとたん, 시기 うちに, 원인 おかげで/せいで, 상대 비교 に比べて" },
      es: { title: "Unidad 02: Momentos, Causas y Grados Comparativos", description: "Inmediatez (たとたん), lapsos (うちに), causas (おかげで/せいで), comparación (に比べて)" },
      fr: { title: "Unité 02 : Temporalité, Causes & Degrés Comparatifs", description: "Immédiateté (たとたん), intervalle (うちに), causes (おかげで/せいで), comparaison (に比べて)" },
      de: { title: "Einheit 02: Zeitpunkte, Ursachen & Vergleichsstufen", description: "Plötzlichkeit (たとたん), Zeitfenster (うちに), Gründe (おかげで/せいで), Vergleiche (に比べて)" },
      id: { title: "Unit 02: Waktu, Penyebab & Derajat Perbandingan", description: "Spontanitas (たとたん), kesempatan (うちに), sebab (おかげで/せいで), perbandingan (に比べて)" },
      th: { title: "ยูนิต 02: จุดเวลา, สาเหตุ & ระดับการเปรียบเทียบ", description: "การกระทำทันที たとたん, ช่วงเวลา うちに, สาเหตุ おかげで/せいで, การเปรียบเทียบ に比べて" },
      ru: { title: "Раздел 02: Моменты времени, причины и степени сравнения", description: "Мгновенность (たとたん), интервал (うちに), причины (おかげで/せいで), сравнение (に比べて)" },
      pt: { title: "Unidade 02: Momentos, Causas e Graus Comparativos", description: "Ações imediatas (たとたん), intervalos (うちに), causas (おかげで/せいで), comparações (に比べて)" },
    },
    3: {
      vi: { title: "Unit 03: Phủ Định, Trạng Thái & Kính Ngữ N3", description: "わけではない, つつある, っぱなし, thụ động sai khiến và kính ngữ giao tiếp N3" },
      en: { title: "Unit 03: Partial Negation, Ongoing States & N3 Keigo", description: "Partial negation (わけではない), evolving trends (つつある), leaving as-is (っぱなし) & N3 Keigo" },
      "zh-CN": { title: "第3单元：部分否定、动态状态与N3敬语进阶", description: "部分否定 わけではない、演变趋势 つつある、放置状态 っぱなし 与N3实战敬语" },
      "zh-TW": { title: "第3單元：部分否定、動態狀態與N3敬語進階", description: "部分否定 わけではない、演變趨勢 つつある、放置狀態 っぱなし 與N3實戰敬語" },
      ko: { title: "3단원: 부분 부정, 지속 상태 & N3 고급 경어", description: "부분 부정 わけではない, 추세 つつある, 방치 상태 っぱなし 및 N3 비즈니스 경어" },
      es: { title: "Unidad 03: Negación Parcial, Estados y Keigo N3", description: "Negación parcial (わけではない), evolución (つつある), descuido (っぱなし) y Keigo N3" },
      fr: { title: "Unité 03 : Négation Partielle, États & Keigo N3", description: "Négation partielle (わけではない), évolution (つつある), négligence (っぱなし) et Keigo N3" },
      de: { title: "Einheit 03: Teilweise Verneinung, Zustände & N3-Keigo", description: "Partielle Verneinung (わけではない), Trends (つつある), Verlassenheit (っぱなし) & N3-Keigo" },
      id: { title: "Unit 03: Negasi Parsial, Keadaan & Keigo N3", description: "Negasi sebagian (わけではない), tren (つつある), pembiaran (っぱなし) & Keigo N3" },
      th: { title: "ยูนิต 03: การปฏิเสธบางส่วน, สภาพต่อเนื่อง & คำสุภาพ N3", description: "การปฏิเสธบางส่วน わけではない, แนวโน้ม つつある, การปล่อยทิ้งไว้ っぱなし และคำสุภาพ N3" },
      ru: { title: "Раздел 03: Частичное отрицание, процессы и кэйго N3", description: "Частичное отрицание (わけではない), динамика (つつある), заброшенность (っぱなし) и кэйго N3" },
      pt: { title: "Unidade 03: Negação Parcial, Estados Contínuos e Keigo N3", description: "Negação parcial (わけではない), tendências (つつある), negligência (っぱなし) e Keigo N3" },
    },
    4: {
      vi: { title: "Unit 04: Kanji Master N3 (Xã Hội & Công Việc)", description: "Bộ Kanji N3 cốt lõi về chính trị, kinh tế, công sở, kỹ thuật và đăng ký" },
      en: { title: "Unit 04: N3 Kanji Master (Society, Business & Tech)", description: "Core intermediate Kanji covering politics, economy, workplace, technology & procedures" },
      "zh-CN": { title: "第4单元：N3汉字大师 (社会、商务与技术)", description: "中级核心汉字集训：政治、经济、企业办公、科技与手续流程" },
      "zh-TW": { title: "第4單元：N3漢字大師 (社會、商務與技術)", description: "中級核心漢字集訓：政治、經濟、企業辦公、科技與手續流程" },
      ko: { title: "4단원: N3 한자 마스터 (사회, 비즈니스 & 테크)", description: "중급 필수 한자: 정치, 경제, 회사 업무, 기술 및 행정 절차" },
      es: { title: "Unidad 04: Maestro Kanji N3 (Sociedad y Empresa)", description: "Kanji intermedio de política, economía, oficina, tecnología y trámites" },
      fr: { title: "Unité 04 : Maître Kanji N3 (Société, Affaires & Tech)", description: "Kanji intermédiaire : politique, économie, travail de bureau, technique et démarches" },
      de: { title: "Einheit 04: N3-Kanji-Meister (Gesellschaft & Beruf)", description: "Mittelstufen-Kanji für Politik, Wirtschaft, Büroalltag, Technik und Behörden" },
      id: { title: "Unit 04: Master Kanji N3 (Masyarakat & Bisnis)", description: "Kanji menengah inti seputar politik, ekonomi, kantor, teknologi & administrasi" },
      th: { title: "ยูนิต 04: ปรมาจารย์คันจิ N3 (สังคม ธุรกิจ & เทคโนโลยี)", description: "คันจิระดับกลางครอบคลุมเรื่องการเมือง เศรษฐกิจ การทำงานในออฟฟิศและเทคโนโลยี" },
      ru: { title: "Раздел 04: Мастер Кандзи N3 (Общество, бизнес и техника)", description: "Кандзи среднего уровня: политика, экономика, офисная работа, техника и процедуры" },
      pt: { title: "Unidade 04: Mestre em Kanji N3 (Sociedade e Negócios)", description: "Kanji intermediário de política, economia, escritório, tecnologia e procedimentos" },
    },
    5: {
      vi: { title: "Unit 05: Từ Vựng, Đọc Hiểu & Đề Thi Thử N3", description: "Động từ N3 tần suất cao, tính từ, đọc hiểu email công việc & đề thi thử JLPT N3" },
      en: { title: "Unit 05: N3 Vocabulary, Professional Reading & Full Mock Test", description: "High-frequency N3 verbs, nuanced adjectives, business emails & complete JLPT N3 mock test" },
      "zh-CN": { title: "第5单元：N3核心词汇、商务读解与全真模拟考", description: "高频动词、精细形容词、商务邮件读解与JLPT N3全真模拟测试" },
      "zh-TW": { title: "第5單元：N3核心詞彙、商務讀解與全真模擬考", description: "高頻動詞、精細形容詞、商務郵件讀解與JLPT N3全真模擬測試" },
      ko: { title: "5단원: N3 핵심 어휘, 실무 독해 & JLPT N3 종합 모의고사", description: "고빈도 동사, 미묘한 뉘앙스의 형용사, 비즈니스 이메일 독해 및 전과목 모의고사" },
      es: { title: "Unidad 05: Vocabulario N3, Lectura Profesional y Simulación", description: "Verbos N3 frecuentes, adjetivos sutiles, emails de trabajo y examen de prueba JLPT N3" },
      fr: { title: "Unité 05 : Vocabulaire N3, Lecture Pro & Examen Blanc", description: "Verbes fréquents N3, adjectifs nuancés, emails professionnels et examen blanc JLPT N3" },
      de: { title: "Einheit 05: N3-Wortschatz, Berufsleseverstehen & Probetest", description: "Häufige N3-Verben, differenzierte Adjektive, Geschäfts-E-Mails und kompletter N3-Probetest" },
      id: { title: "Unit 05: Kosakata N3, Membaca Dokumen & Simulasi Ujian", description: "Kata kerja frekuensi tinggi, kata sifat nuansa, email bisnis & simulasi ujian JLPT N3" },
      th: { title: "ยูนิต 05: คำศัพท์ N3, การอ่านเชิงธุรกิจ & ข้อสอบจำลอง JLPT N3", description: "กริยาความถี่สูง คำคุณศัพท์บอกเฉดอารมณ์ การอ่านอีเมลงานและข้อสอบจำลอง N3 เต็มรูปแบบ" },
      ru: { title: "Раздел 05: Словарь N3, деловое чтение и экзаменационный тест", description: "Частотные глаголы N3, тонкие прилагательные, деловые письма и полный пробный тест" },
      pt: { title: "Unidade 05: Vocabulário N3, Leitura Profissional e Simulado", description: "Verbos N3 de alta frequência, adjetivos refinados, e-mails de trabalho e simulado JLPT N3" },
    },
  },
};

/**
 * Localizes any Unit title across 12 languages.
 */
export function getLocalizedUnitTitle(level: string, unitNumber: number, lang: NativeLanguage, fallbackTitle: string): string {
  if (lang === "vi") return fallbackTitle;
  const match = UNIT_I18N_MAP[level]?.[unitNumber];
  if (match) {
    if (match[lang]?.title) return match[lang]!.title;
    if (match.en?.title) return match.en.title;
  }
  return fallbackTitle;
}

/**
 * Localizes any Unit description across 12 languages.
 */
export function getLocalizedUnitDesc(level: string, unitNumber: number, lang: NativeLanguage, fallbackDesc: string): string {
  if (lang === "vi") return fallbackDesc;
  const match = UNIT_I18N_MAP[level]?.[unitNumber];
  if (match) {
    if (match[lang]?.description) return match[lang]!.description;
    if (match.en?.description) return match.en.description;
  }
  return fallbackDesc;
}

export const TRACK_I18N_MAP: Record<string, Record<"en" | "vi", string> & Partial<Record<NativeLanguage, string>>> = {
  "minna-shokyuu-1": {
    vi: "Minna Sơ cấp 1",
    en: "Minna Elementary 1",
    "zh-CN": "大家日语 初级1",
    "zh-TW": "大家的日本語 初級1",
    ko: "민나노 니혼고 초급 1",
    es: "Minna Principiante 1",
    fr: "Minna Élémentaire 1",
    de: "Minna Grundstufe 1",
    id: "Minna Dasar 1",
    th: "มินนะ โนะ นิฮงโกะ 1",
    ru: "Minna Начальный 1",
    pt: "Minna Básico 1",
  },
  "dekiru-fpt-jpd": {
    vi: "Dekiru FPT (JPD)",
    en: "Dekiru FPT (JPD)",
    "zh-CN": "Dekiru FPT (JPD)",
    "zh-TW": "Dekiru FPT (JPD)",
    ko: "Dekiru FPT (JPD)",
    es: "Dekiru FPT (JPD)",
    fr: "Dekiru FPT (JPD)",
    de: "Dekiru FPT (JPD)",
    id: "Dekiru FPT (JPD)",
    th: "Dekiru FPT (JPD)",
    ru: "Dekiru FPT (JPD)",
    pt: "Dekiru FPT (JPD)",
  },
  "minna-shokyuu-2": {
    vi: "Minna Sơ cấp 2",
    en: "Minna Elementary 2",
    "zh-CN": "大家日语 初级2",
    "zh-TW": "大家的日本語 初級2",
    ko: "민나노 니혼고 초급 2",
    es: "Minna Principiante 2",
    fr: "Minna Élémentaire 2",
    de: "Minna Grundstufe 2",
    id: "Minna Dasar 2",
    th: "มินนะ โนะ นิฮงโกะ 2",
    ru: "Minna Начальный 2",
    pt: "Minna Básico 2",
  },
  "shinkanzen-n3": {
    vi: "Shinkanzen Master N3",
    en: "Shinkanzen Master N3",
    "zh-CN": "新完全掌握 N3",
    "zh-TW": "新完全掌握 N3",
    ko: "신칸젠 마스터 N3",
    es: "Shinkanzen Master N3",
    fr: "Shinkanzen Master N3",
    de: "Shinkanzen Master N3",
    id: "Shinkanzen Master N3",
    th: "ชินคันเซ็น มาสเตอร์ N3",
    ru: "Shinkanzen Master N3",
    pt: "Shinkanzen Master N3",
  },
  "jlpt-n5-skills": {
    vi: "Kỹ năng JLPT N5",
    en: "JLPT N5 Skills",
    "zh-CN": "JLPT N5 核心技能",
    "zh-TW": "JLPT N5 核心技能",
    ko: "JLPT N5 핵심 스킬",
    es: "Habilidades JLPT N5",
    fr: "Compétences JLPT N5",
    de: "JLPT N5 Fertigkeiten",
    id: "Keterampilan JLPT N5",
    th: "ทักษะ JLPT N5",
    ru: "Навыки JLPT N5",
    pt: "Habilidades JLPT N5",
  },
};

export function getLocalizedTrackTitle(trackId: string | null | undefined, lang: NativeLanguage, fallbackTitle: string): string {
  if (lang === "vi") return fallbackTitle;
  if (!trackId) return fallbackTitle;
  const match = TRACK_I18N_MAP[trackId];
  if (match) {
    if (match[lang]) return match[lang]!;
    if (match.en) return match.en;
  }
  return fallbackTitle;
}

/**
 * Localizes short track badge labels (e.g. "Minna I • Nhập môn Kana", "Minna I • Bài 1", "Chuyên đề N5").
 */
export function getLocalizedShortTrackLabel(
  label: string | undefined | null,
  lang: NativeLanguage
): string {
  if (!label) return "";
  if (lang === "vi") return label;

  // 1. Minna I • Nhập môn Kana
  if (/Nhập môn Kana/i.test(label)) {
    switch (lang) {
      case "zh-CN": return "大家日语 I • 假名入门";
      case "zh-TW": return "大家的日本語 I • 假名入門";
      case "ko": return "민나노 니혼고 I • 가나 입문";
      case "es": return "Minna I • Intro a Kana";
      case "fr": return "Minna I • Intro Kana";
      case "de": return "Minna I • Kana-Einführung";
      case "id": return "Minna I • Pengantar Kana";
      case "th": return "มินนะ I • พื้นฐานคะนะ";
      case "ru": return "Minna I • Введение в кану";
      case "pt": return "Minna I • Intro ao Kana";
      case "en":
      default:
        return "Minna I • Kana Foundations";
    }
  }

  // 2. Minna I / II • Bài X (e.g. Minna I • Bài 1, Minna II • Bài 26)
  const minnaMatch = label.match(/Minna\s+(I{1,2})\s*•\s*Bài\s*(\d+(?:[–-]\d+)?)/i);
  if (minnaMatch) {
    const vol = minnaMatch[1];
    const num = minnaMatch[2];
    switch (lang) {
      case "zh-CN": return `大家日语 ${vol} • 第${num}课`;
      case "zh-TW": return `大家的日本語 ${vol} • 第${num}課`;
      case "ko": return `민나노 니혼고 ${vol} • 제${num}과`;
      case "es": return `Minna ${vol} • Lección ${num}`;
      case "fr": return `Minna ${vol} • Leçon ${num}`;
      case "de": return `Minna ${vol} • Lektion ${num}`;
      case "id": return `Minna ${vol} • Bab ${num}`;
      case "th": return `มินนะ ${vol} • บทที่ ${num}`;
      case "ru": return `Minna ${vol} • Урок ${num}`;
      case "pt": return `Minna ${vol} • Lição ${num}`;
      case "en":
      default:
        return `Minna ${vol} • Lesson ${num}`;
    }
  }

  // 3. Chuyên đề N5
  if (/Chuyên đề N5/i.test(label)) {
    switch (lang) {
      case "zh-CN": return "N5 专项进阶";
      case "zh-TW": return "N5 專項進階";
      case "ko": return "N5 특강 모듈";
      case "es": return "N5 Temas Clave";
      case "fr": return "N5 Thématiques";
      case "de": return "N5 Schwerpunkte";
      case "id": return "Topik Khusus N5";
      case "th": return "โมดูลทักษะ N5";
      case "ru": return "N5 Спецмодули";
      case "pt": return "N5 Tópicos Especiais";
      case "en":
      default:
        return "N5 Skills Track";
    }
  }

  // 4. Shinkanzen N3 • Bài X
  const shinkanzenMatch = label.match(/Shinkanzen\s+N3\s*•\s*Bài\s*(\d+)/i);
  if (shinkanzenMatch) {
    const num = shinkanzenMatch[1];
    switch (lang) {
      case "zh-CN": return `新完全掌握 N3 • 第${num}课`;
      case "zh-TW": return `新完全掌握 N3 • 第${num}課`;
      case "ko": return `신칸젠 마스터 N3 • 제${num}과`;
      case "es": return `Shinkanzen N3 • Lección ${num}`;
      case "fr": return `Shinkanzen N3 • Leçon ${num}`;
      case "de": return `Shinkanzen N3 • Lektion ${num}`;
      case "id": return `Shinkanzen N3 • Bab ${num}`;
      case "th": return `ชินคันเซ็น N3 • บทที่ ${num}`;
      case "ru": return `Shinkanzen N3 • Урок ${num}`;
      case "pt": return `Shinkanzen N3 • Lição ${num}`;
      case "en":
      default:
        return `Shinkanzen N3 • Lesson ${num}`;
    }
  }

  return label;
}

/**
 * Localizes Genki archive cross-reference pills (e.g. "Đối chiếu: Genki I (2nd Ed., 2011) — Lesson 1").
 */
export function getLocalizedGenkiReference(
  refString: string | undefined | null,
  lang: NativeLanguage
): string {
  if (!refString) return "";
  if (lang === "vi") return refString;

  const m = refString.match(/Genki\s+(I{1,2})\s*\(([^)]+)\)\s*[—–-]\s*Lesson\s*(\d+)/i);
  if (!m) {
    return refString.replace(/^Đối chiếu:\s*/i, "");
  }

  const vol = m[1];
  const edition = m[2];
  const lessonNum = m[3];

  switch (lang) {
    case "zh-CN":
      return `对应参照: Genki ${vol} (${edition}) — 第${lessonNum}课`;
    case "zh-TW":
      return `對應參照: Genki ${vol} (${edition}) — 第${lessonNum}課`;
    case "ko":
      return `참조: Genki ${vol} (${edition}) — ${lessonNum}과`;
    case "es":
      return `Ref. cruzada: Genki ${vol} (${edition}) — Lección ${lessonNum}`;
    case "fr":
      return `Réf. croisée : Genki ${vol} (${edition}) — Leçon ${lessonNum}`;
    case "de":
      return `Querverweis: Genki ${vol} (${edition}) — Lektion ${lessonNum}`;
    case "id":
      return `Referensi: Genki ${vol} (${edition}) — Pelajaran ${lessonNum}`;
    case "th":
      return `อ้างอิง: Genki ${vol} (${edition}) — บทที่ ${lessonNum}`;
    case "ru":
      return `Сравнение: Genki ${vol} (${edition}) — Урок ${lessonNum}`;
    case "pt":
      return `Ref. cruzada: Genki ${vol} (${edition}) — Lição ${lessonNum}`;
    case "en":
    default:
      return `Cross-ref: Genki ${vol} (${edition}) — Lesson ${lessonNum}`;
  }
}

/**
 * Intelligent helper to localize any lesson title while guaranteeing 100% Japanese preservation.
 */
export function getLocalizedLessonTitle(slug: string | null | undefined, lang: NativeLanguage, fallbackTitle: string): string {
  if (lang === "vi") return fallbackTitle;

  if (slug) {
    const item = slug ? LESSON_I18N_MAP[slug] : undefined;
    if (item) {
      if (item[lang]?.title) return item[lang]!.title;
      if (item.en?.title) return item.en.title;
    }
  }

  // Fallback pattern matching for common titles across UI
  const fb = fallbackTitle || "";
  const isZh = lang === "zh-CN" || lang === "zh-TW";
  const isTw = lang === "zh-TW";

  if (/katakana/i.test(fb) && (/mượn/i.test(fb) || /loanword/i.test(fb) || /gairaigo/i.test(fb))) {
    if (isZh) return isTw ? "片假名字母表與外來語 (Gairaigo)" : "片假名字母表与外来语 (Gairaigo)";
    if (lang === "ko") return "가타카나 문자표 및 외래어 (Gairaigo)";
    if (lang === "es") return "Alfabeto Katakana y Préstamos (Gairaigo)";
    return "Katakana Alphabet & Loanwords (Gairaigo)";
  }

  if (/50 âm hiragana|hiragana goj/i.test(fb)) {
    if (isZh) return isTw ? "平假名五十音圖 (Gojūon)" : "平假名五十音图 (Gojūon)";
    if (lang === "ko") return "히라가나 50음도 (Gojūon)";
    if (lang === "es") return "Tabla de 50 sonidos Hiragana (Gojūon)";
    return "Hiragana 50-Sounds Chart (Gojūon)";
  }

  if (/survival/i.test(fb)) {
    if (isZh) return isTw ? "Survival Mode 生存實戰模式" : "Survival Mode 生存实战模式";
    return "Survival Mode — Real-time Reflex";
  }

  if (/kaiwa|sensei/i.test(fb)) {
    if (isZh) return isTw ? "AI Kaiwa Sensei 人工智能對話導師" : "AI Kaiwa Sensei 人工智能对话导师";
    return "AI Kaiwa Sensei — AI Conversation";
  }

  if (/shinkansen|hành trình/i.test(fb)) {
    if (isZh) return isTw ? "新幹線之旅 — 解鎖日本名勝" : "新干线之旅 — 解锁日本名胜";
    return "Shinkansen Journey — Explore Japan";
  }

  if (/srs|ôn tập/i.test(fb)) {
    if (isZh) return isTw ? "SRS 間隔重複複習" : "SRS 间隔重复复习";
    return "SRS Spaced Repetition (SM-2)";
  }

  if (/kho từ vựng/i.test(fb)) {
    if (isZh) return isTw ? "N5 核心詞彙庫 & SRS 卡片" : "N5 核心词汇库 & SRS 卡片";
    return "N5 Vocabulary Bank & SRS Cards";
  }

  if (/biến âm/i.test(fb)) {
    if (isZh) return isTw ? "濁音與半濁音 (Dakuten & Handakuten)" : "浊音与半浊音 (Dakuten & Handakuten)";
    return "Dakuten & Handakuten (が・ざ・だ・ば / ぱ)";
  }

  if (/ảo âm|âm ngắt/i.test(fb)) {
    if (isZh) return isTw ? "拗音、促音與長音 (Yōon & Sokuon)" : "拗音、促音与长音 (Yōon & Sokuon)";
    return "Contracted & Double Consonants (Yōon & Sokuon)";
  }
  const item = slug ? LESSON_I18N_MAP[slug] : undefined;
  if (item) {
    if (item[lang]?.title) return item[lang]!.title;
    if (item.en?.title) return item.en.title;
  }

  // Generic intelligent parser for any slug:
  // Extracts Japanese segment in parentheses or brackets e.g. "(あ・い・う・え・お)"
  const japaneseMatch = fallbackTitle.match(/(\([ぁ-んァ-ン一-龯〜・,／\s-]+\)|\[[ぁ-んァ-ン一-龯〜・,／\s-]+\])/);
  const japanesePart = japaneseMatch ? ` ${japaneseMatch[1]}` : "";

  // If Minna Lesson pattern
  const minnaMatch = (slug ? slug.match(/minna-lesson-(\d+)/i) : null) || fallbackTitle.match(/Bài\s*(\d+)/i);
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

  // If N4 Lesson pattern
  const n4Match = slug ? slug.match(/n4-lesson-(\d+)/i) : null;
  if (n4Match) {
    const num = n4Match[1];
    switch (lang) {
      case "en": return `JLPT N4 · Lesson ${num}${japanesePart}`;
      case "zh-CN": return `JLPT N4 · 第${num}课${japanesePart}`;
      case "zh-TW": return `JLPT N4 · 第${num}課${japanesePart}`;
      case "ko": return `JLPT N4 · 제${num}과${japanesePart}`;
      case "es": return `JLPT N4 · Lección ${num}${japanesePart}`;
      case "fr": return `JLPT N4 · Leçon ${num}${japanesePart}`;
      case "de": return `JLPT N4 · Lektion ${num}${japanesePart}`;
      case "id": return `JLPT N4 · Pelajaran ${num}${japanesePart}`;
      case "th": return `JLPT N4 · บทที่ ${num}${japanesePart}`;
      case "ru": return `JLPT N4 · Урок ${num}${japanesePart}`;
      case "pt": return `JLPT N4 · Lição ${num}${japanesePart}`;
      default: return `JLPT N4 · Lesson ${num}${japanesePart}`;
    }
  }

  // If N3 Lesson pattern
  const n3Match = slug ? slug.match(/n3-lesson-(\d+)/i) : null;
  if (n3Match) {
    const num = n3Match[1];
    switch (lang) {
      case "en": return `JLPT N3 · Lesson ${num}${japanesePart}`;
      case "zh-CN": return `JLPT N3 · 第${num}课${japanesePart}`;
      case "zh-TW": return `JLPT N3 · 第${num}課${japanesePart}`;
      case "ko": return `JLPT N3 · 제${num}과${japanesePart}`;
      case "es": return `JLPT N3 · Lección ${num}${japanesePart}`;
      case "fr": return `JLPT N3 · Leçon ${num}${japanesePart}`;
      case "de": return `JLPT N3 · Lektion ${num}${japanesePart}`;
      case "id": return `JLPT N3 · Pelajaran ${num}${japanesePart}`;
      case "th": return `JLPT N3 · บทที่ ${num}${japanesePart}`;
      case "ru": return `JLPT N3 · Урок ${num}${japanesePart}`;
      case "pt": return `JLPT N3 · Lição ${num}${japanesePart}`;
      default: return `JLPT N3 · Lesson ${num}${japanesePart}`;
    }
  }

  // If N5 Lesson pattern
  const n5Match = slug ? slug.match(/n5-lesson-(\d+)/i) : null;
  if (n5Match) {
    const num = n5Match[1];
    switch (lang) {
      case "en": return `JLPT N5 · Lesson ${num}${japanesePart}`;
      case "zh-CN": return `JLPT N5 · 第${num}课${japanesePart}`;
      case "zh-TW": return `JLPT N5 · 第${num}課${japanesePart}`;
      case "ko": return `JLPT N5 · 제${num}과${japanesePart}`;
      case "es": return `JLPT N5 · Lección ${num}${japanesePart}`;
      case "fr": return `JLPT N5 · Leçon ${num}${japanesePart}`;
      case "de": return `JLPT N5 · Lektion ${num}${japanesePart}`;
      case "id": return `JLPT N5 · Pelajaran ${num}${japanesePart}`;
      case "th": return `JLPT N5 · บทที่ ${num}${japanesePart}`;
      case "ru": return `JLPT N5 · Урок ${num}${japanesePart}`;
      case "pt": return `JLPT N5 · Lição ${num}${japanesePart}`;
      default: return `JLPT N5 · Lesson ${num}${japanesePart}`;
    }
  }

  return fallbackTitle;
}

/**
 * Intelligent helper to localize any lesson description.
 */
export function getLocalizedLessonDesc(slug: string | null | undefined, lang: NativeLanguage, fallbackDesc: string): string {
  if (lang === "vi") return fallbackDesc;

  if (slug) {
    const item = LESSON_I18N_MAP[slug];
    if (item) {
      if (item[lang]?.description) return item[lang]!.description;
      if (item.en?.description) return item.en.description;
    }
  }

  const fb = fallbackDesc || "";
  const isZh = lang === "zh-CN" || lang === "zh-TW";
  const isTw = lang === "zh-TW";

  if (/katakana/i.test(fb) && (/mượn/i.test(fb) || /gairaigo/i.test(fb))) {
    if (isZh) return isTw ? "學習片假名讀寫與日常生活中的外來語 (Gairaigo)。" : "学习片假名读写与日常生活中的外来语 (Gairaigo)。";
    if (lang === "ko") return "가타카나 읽고 쓰기와 일상 외래어(Gairaigo) 학습.";
    return "Identify Katakana characters and global loanwords (Gairaigo) in everyday life.";
  }

  if (/Katakana mở ra vốn từ mượn/i.test(fb)) {
    if (isZh) return isTw ? "掌握片假名將為你打開日常隨處可見的國際外來語大門。" : "掌握片假名将为你打开日常随处可见的国际外来语大门。";
    return "Katakana unlocks the international loanwords you encounter every day.";
  }

  if (/Hiragana.*canvas/i.test(fb) || /46 ký tự Hiragana/i.test(fb)) {
    if (isZh) return isTw ? "在畫布上練習 46 個基礎平假名的標準讀寫與發音。" : "在画布上练习 46 个基础平假名的标准读写与发音。";
    return "Practice reading and writing 46 basic Hiragana characters with native audio.";
  }

  if (/Test phản xạ/i.test(fb)) {
    if (isZh) return isTw ? "限時測試日語詞彙反應與實戰交流應對能力。" : "限时测试日语词汇反应与实战交流应对能力。";
    return "Test your Japanese reflexes and real-time situational communication.";
  }

  if (/Luyện đối thoại 2 chiều/i.test(fb)) {
    if (isZh) return isTw ? "與 AI 導師進行無壓力的雙向日語會話練習。" : "与 AI 导师进行无压力的双向日语会话练习。";
    return "Practice 2-way natural conversation with your AI teacher without fear of mistakes.";
  }

  if (/mở khóa Tokyo/i.test(fb)) {
    if (isZh) return isTw ? "賺取 XP 在日本地圖上解鎖東京、京都、大阪等名勝。" : "赚取 XP 在日本地图上解锁东京、京都、大阪等名胜。";
    return "Earn XP to unlock Tokyo, Kyoto, Osaka and iconic Japanese landmarks on the map.";
  }

  if (/chống quên/i.test(fb)) {
    if (isZh) return isTw ? "採用科學間隔重複演算法，實現長久抗遺忘。" : "采用科学间隔重复算法，实现长久抗遗忘。";
    return "Spaced repetition algorithm (SM-2) for long-term memory retention.";
  }

  if (/kho từ vựng/i.test(fb) || /Tra cứu nghĩa/i.test(fb)) {
    if (isZh) return isTw ? "查詢詞義、音讀訓讀及語境例句，一鍵保存至複習卡片。" : "查询词义、音读训读及语境例句，一键保存至复习卡片。";
    return "Look up meanings, On/Kun readings, examples, and save 1-click SRS cards.";
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
    LISTENING: {
      en: "Listening",
      "zh-CN": "听力",
      "zh-TW": "聽力",
      ko: "청해",
      es: "Comprensión auditiva",
      fr: "Écoute",
      de: "Hörverstehen",
      id: "Mendengar",
      th: "การฟัง",
      ru: "Аудирование",
      pt: "Audição",
    },
    SPEAKING: {
      en: "Speaking",
      "zh-CN": "口语",
      "zh-TW": "口語",
      ko: "말하기",
      es: "Expresión oral",
      fr: "Expression orale",
      de: "Sprechen",
      id: "Berbicara",
      th: "การพูด",
      ru: "Говорение",
      pt: "Conversação",
    },
    READING: {
      en: "Reading",
      "zh-CN": "阅读",
      "zh-TW": "閱讀",
      ko: "독해",
      es: "Lectura",
      fr: "Lecture",
      de: "Leseverstehen",
      id: "Membaca",
      th: "การอ่าน",
      ru: "Чтение",
      pt: "Leitura",
    },
    WRITING: {
      en: "Writing",
      "zh-CN": "书写",
      "zh-TW": "書寫",
      ko: "작문",
      es: "Escritura",
      fr: "Écriture",
      de: "Schreiben",
      id: "Menulis",
      th: "การเขียน",
      ru: "Письмо",
      pt: "Escrita",
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
    IMMERSIVE: {
      en: "Immersive",
      "zh-CN": "沉浸",
      "zh-TW": "沉浸",
      ko: "몰입형",
      es: "Inmersivo",
      fr: "Immersif",
      de: "Immersiv",
      id: "Imersif",
      th: "ดื่มด่ำ",
      ru: "Погружение",
      pt: "Imersivo",
    },
    GAMIFIED: {
      en: "Gamified",
      "zh-CN": "游戏化",
      "zh-TW": "遊戲化",
      ko: "게임화",
      es: "Gamificado",
      fr: "Ludifié",
      de: "Gamifiziert",
      id: "Bermain",
      th: "เกม",
      ru: "Геймификация",
      pt: "Gamificado",
    },
    PRACTICAL: {
      en: "Practical",
      "zh-CN": "实战",
      "zh-TW": "實戰",
      ko: "실전",
      es: "Práctico",
      fr: "Pratique",
      de: "Praktisch",
      id: "Praktis",
      th: "ใช้งานจริง",
      ru: "Практический",
      pt: "Prático",
    },
    BEGINNER: {
      en: "Beginner",
      "zh-CN": "零基础",
      "zh-TW": "零基礎",
      ko: "입문",
      es: "Principiante",
      fr: "Débutant",
      de: "Anfänger",
      id: "Pemula",
      th: "ผู้เริ่มต้น",
      ru: "Начинающий",
      pt: "Iniciante",
    },
    N5: {
      en: "JLPT N5",
      "zh-CN": "JLPT N5",
      "zh-TW": "JLPT N5",
      ko: "JLPT N5",
      es: "JLPT N5",
      fr: "JLPT N5",
      de: "JLPT N5",
      id: "JLPT N5",
      th: "JLPT N5",
      ru: "JLPT N5",
      pt: "JLPT N5",
    },
    N4: {
      en: "JLPT N4",
      "zh-CN": "JLPT N4",
      "zh-TW": "JLPT N4",
      ko: "JLPT N4",
      es: "JLPT N4",
      fr: "JLPT N4",
      de: "JLPT N4",
      id: "JLPT N4",
      th: "JLPT N4",
      ru: "JLPT N4",
      pt: "JLPT N4",
    },
    N3: {
      en: "JLPT N3",
      "zh-CN": "JLPT N3",
      "zh-TW": "JLPT N3",
      ko: "JLPT N3",
      es: "JLPT N3",
      fr: "JLPT N3",
      de: "JLPT N3",
      id: "JLPT N3",
      th: "JLPT N3",
      ru: "JLPT N3",
      pt: "JLPT N3",
    },
  };

  if (lang === "vi") return fallback;
  return MAP[key]?.[lang] || MAP[key]?.en || fallback;
}

export function getLocalizedPathName(
  goal: string,
  style: string,
  lang: NativeLanguage,
  fallback = "Lộ trình học – bài bản"
): string {
  if (lang === "vi") return fallback;

  const GOAL_NAMES: Record<string, Record<string, string>> = {
    TRAVEL: {
      en: "Travel Survival",
      "zh-CN": "旅游生存",
      "zh-TW": "旅遊生存",
      ko: "여행 서바이벌",
      ja: "旅行サバイバル",
      fr: "Survie en voyage",
      es: "Supervivencia de viaje",
      de: "Reise-Überleben",
      id: "Survival Wisata",
      th: "ภาษาญี่ปุ่นเอาตัวรอดท่องเที่ยว",
      ru: "Японский для путешествий",
      pt: "Sobrevivência em viagem",
    },
    JLPT: {
      en: "JLPT Mastery",
      "zh-CN": "攻克JLPT",
      "zh-TW": "攻克JLPT",
      ko: "JLPT 정복",
      ja: "JLPT合格攻略",
      fr: "Maîtrise du JLPT",
      es: "Dominio de JLPT",
      de: "JLPT-Erfolg",
      id: "Kuasai JLPT",
      th: "พิชิต JLPT",
      ru: "Покорение JLPT",
      pt: "Domínio do JLPT",
    },
    CONVERSATION: {
      en: "Confident Conversation",
      "zh-CN": "地道会话",
      "zh-TW": "地道會話",
      ko: "자신감 회화",
      ja: "実践会話力",
      fr: "Conversation fluide",
      es: "Conversación fluida",
      de: "Sichere Konversation",
      id: "Percakapan Percaya Diri",
      th: "สนทนาอย่างมั่นใจ",
      ru: "Уверенная беседа",
      pt: "Conversação confiante",
    },
    CULTURE: {
      en: "Cultural Immersion",
      "zh-CN": "文化沉浸",
      "zh-TW": "文化沉浸",
      ko: "문화 몰입",
      ja: "日本文化探訪",
      fr: "Immersion culturelle",
      es: "Inmersión cultural",
      de: "Kulturelle Vertiefung",
      id: "Pendalaman Budaya",
      th: "ซึมซับวัฒนธรรม",
      ru: "Погружение в культуру",
      pt: "Imersão cultural",
    },
  };

  const STYLE_NAMES: Record<string, Record<string, string>> = {
    STRUCTURED: {
      en: "Structured",
      "zh-CN": "循序渐进",
      "zh-TW": "循序漸進",
      ko: "체계적 과정",
      ja: "段階的習得",
      fr: "Méthodique",
      es: "Estructurado",
      de: "Strukturiert",
      id: "Terstruktur",
      th: "เป็นระบบ",
      ru: "Системный",
      pt: "Estruturado",
    },
    IMMERSIVE: {
      en: "Immersive",
      "zh-CN": "全景沉浸",
      "zh-TW": "全景沉浸",
      ko: "몰입형",
      ja: "没入型",
      fr: "Immersif",
      es: "Inmersivo",
      de: "Immersiv",
      id: "Imersif",
      th: "ดื่มด่ำ",
      ru: "Погружение",
      pt: "Imersivo",
    },
    GAMIFIED: {
      en: "Adventure",
      "zh-CN": "趣味闯关",
      "zh-TW": "趣味闖關",
      ko: "게임 모험",
      ja: "冒険クエスト",
      fr: "Aventure ludique",
      es: "Aventura gamificada",
      de: "Spielerisches Abenteuer",
      id: "Petualangan",
      th: "เกมผจญภัย",
      ru: "В форме игры",
      pt: "Aventura gamificada",
    },
    PRACTICAL: {
      en: "Action",
      "zh-CN": "实战演练",
      "zh-TW": "實戰演練",
      ko: "실전 적용",
      ja: "実践重視",
      fr: "Action pratique",
      es: "Práctico",
      de: "Praxisorientiert",
      id: "Praktis",
      th: "เน้นใช้งานจริง",
      ru: "На практике",
      pt: "Ação prática",
    },
  };

  const g = GOAL_NAMES[goal]?.[lang] || GOAL_NAMES[goal]?.en || goal;
  const s = STYLE_NAMES[style]?.[lang] || STYLE_NAMES[style]?.en || style;

  return `${g} – ${s}`;
}

export function getLocalizedPathTagline(
  goal: string,
  style: string,
  level: string,
  skill: string,
  lang: NativeLanguage,
  fallback = ""
): string {
  if (lang === "vi") return fallback;

  if (lang === "zh-CN" || lang === "zh-TW") {
    const isTrad = lang === "zh-TW";
    const lvlText =
      level === "BEGINNER"
        ? isTrad ? "零基礎路線：" : "零基础路线："
        : isTrad ? `JLPT ${level} 路線：` : `JLPT ${level} 路线：`;

    let goalText = "";
    if (goal === "TRAVEL") {
      goalText = isTrad
        ? "從機場落地到拉麵館點餐，從容自信地與當地人交際交流"
        : "从机场落地到拉面馆点餐，从容自信地与当地人交际交流";
    } else if (goal === "JLPT") {
      goalText = isTrad
        ? "緊扣考綱考點，系統突破聽力、閱讀與語法短板"
        : "紧扣考纲考点，系统突破听力、阅读与语法短板";
    } else if (goal === "CONVERSATION") {
      goalText = isTrad
        ? "建立母語級聽力與口語即時自然反射"
        : "建立母语级听力与口语即时自然反射";
    } else {
      goalText = isTrad
        ? "透過動漫、影視與傳統文化深度領悟日語"
        : "透过动漫、影视与传统文化深度领悟日语";
    }

    let styleText = "";
    if (style === "PRACTICAL") {
      styleText = isTrad ? "，並在高頻實戰場景中檢驗" : "，并在高频实战场景中检验";
    } else if (style === "IMMERSIVE") {
      styleText = isTrad ? "，完全沉浸於全日語環境" : "，完全沉浸于全日语环境";
    } else if (style === "GAMIFIED") {
      styleText = isTrad ? "，每節課都是一場趣味冒險" : "，每节课都是一场趣味冒险";
    } else {
      styleText = isTrad ? "，循序漸進打牢基礎" : "，循序渐进打牢基础";
    }

    let skillText = "";
    if (skill && skill !== "BALANCED") {
      const skName = getLocalizedRoadmapLabel(skill, lang, skill);
      skillText = isTrad ? `，重點強化「${skName}」能力` : `，重点强化「${skName}」能力`;
    }

    return `${lvlText}${goalText}${styleText}${skillText}。`;
  }

  // English & other language defaults
  const lvlText = level === "BEGINNER" ? "Beginner path: " : `JLPT ${level} path: `;
  let goalText = "communicate with confidence";
  if (goal === "TRAVEL") goalText = "from airport arrival to ramen shops, communicate with ease";
  else if (goal === "JLPT") goalText = "systematic study closely aligned with official exam objectives";
  else if (goal === "CONVERSATION") goalText = "build natural speaking and listening reflexes like a native";
  else if (goal === "CULTURE") goalText = "master Japanese through anime, media, and cultural depth";

  let styleText = " step-by-step with structured foundations";
  if (style === "PRACTICAL") styleText = " in practical real-life situations";
  else if (style === "IMMERSIVE") styleText = " fully immersed in a Japanese environment";
  else if (style === "GAMIFIED") styleText = " where every lesson is an exciting quest";

  let skillText = "";
  if (skill && skill !== "BALANCED") {
    skillText = `, focusing on ${getLocalizedRoadmapLabel(skill, lang, skill)} skills`;
  }

  return `${lvlText}${goalText}${styleText}${skillText}.`;
}

export function getLocalizedKindLabel(kind: string, lang: NativeLanguage): string {
  if (lang === "vi") {
    switch (kind) {
      case "KANA": return "Kana Lab";
      case "LESSON": return "Bài học";
      case "VOCAB": return "Từ vựng";
      case "GRAMMAR": return "Ngữ pháp";
      case "REVIEW": return "Ôn tập SRS";
      case "SURVIVAL": return "Sinh tồn";
      case "JOURNEY": return "Hành trình";
      case "SENSEI": return "AI Sensei";
      case "MOCK": return "Thi thử";
      default: return kind;
    }
  }

  const KINDS: Record<string, Record<string, string>> = {
    KANA: { en: "Kana Lab", "zh-CN": "假名工坊", "zh-TW": "假名工坊", ko: "가나 연구소", ja: "仮名ラボ" },
    LESSON: { en: "Core Lesson", "zh-CN": "核心课程", "zh-TW": "核心課程", ko: "핵심 레슨", ja: "基礎レッスン", fr: "Leçon", es: "Lección", de: "Lektion" },
    VOCAB: { en: "Vocabulary", "zh-CN": "词汇手册", "zh-TW": "詞彙手冊", ko: "어휘 단어장", ja: "語彙", fr: "Vocabulaire", es: "Vocabulario", de: "Wortschatz" },
    GRAMMAR: { en: "Grammar", "zh-CN": "语法精讲", "zh-TW": "語法精講", ko: "문법 집중", ja: "文法", fr: "Grammaire", es: "Gramática", de: "Grammatik" },
    REVIEW: { en: "SRS Review", "zh-CN": "间隔复习", "zh-TW": "間隔複習", ko: "SRS 복습", ja: "分散学習", fr: "Révision SRS", es: "Repaso SRS", de: "SRS-Wiederholung" },
    SURVIVAL: { en: "Survival", "zh-CN": "实战生存", "zh-TW": "實戰生存", ko: "서바이벌", ja: "サバイバル", fr: "Survie", es: "Supervivencia", de: "Überleben" },
    JOURNEY: { en: "Journey", "zh-CN": "文化漫游", "zh-TW": "文化漫遊", ko: "여정", ja: "探訪の旅", fr: "Voyage", es: "Viaje", de: "Reise" },
    SENSEI: { en: "AI Sensei", "zh-CN": "AI 导师", "zh-TW": "AI 導師", ko: "AI 센세", ja: "AI先生", fr: "AI Sensei", es: "AI Sensei", de: "AI Sensei" },
    MOCK: { en: "Mock Exam", "zh-CN": "模拟测试", "zh-TW": "模擬測試", ko: "모의고사", ja: "模擬試験", fr: "Examen blanc", es: "Examen de prueba", de: "Testprüfung" },
  };

  return KINDS[kind]?.[lang] || KINDS[kind]?.en || kind;
}

export function getLocalizedSkillName(skill: string, lang: NativeLanguage): string {
  if (lang === "vi") return skill;

  const MAP: Record<string, Record<string, string>> = {
    "Đọc": { en: "Reading", "zh-CN": "阅读", "zh-TW": "閱讀", ko: "읽기", ja: "読解", fr: "Lecture", es: "Lectura", de: "Lesen" },
    "Viết": { en: "Writing", "zh-CN": "书写", "zh-TW": "書寫", ko: "쓰기", ja: "表記", fr: "Écriture", es: "Escritura", de: "Schreiben" },
    "Nghe": { en: "Listening", "zh-CN": "听力", "zh-TW": "聽力", ko: "듣기", ja: "聴解", fr: "Écoute", es: "Escucha", de: "Hören" },
    "Nói": { en: "Speaking", "zh-CN": "口语", "zh-TW": "口語", ko: "말하기", ja: "会話", fr: "Oral", es: "Oral", de: "Sprechen" },
    "Phản xạ": { en: "Reflex", "zh-CN": "反应", "zh-TW": "反應", ko: "순발력", ja: "反射", fr: "Réflexe", es: "Reflejo", de: "Reflex" },
    "Văn hóa": { en: "Culture", "zh-CN": "文化", "zh-TW": "文化", ko: "문화", ja: "文化", fr: "Culture", es: "Cultura", de: "Kultur" },
    "Tổng hợp": { en: "General", "zh-CN": "综合", "zh-TW": "綜合", ko: "종합", ja: "総合", fr: "Général", es: "General", de: "Allgemein" },
  };

  return MAP[skill]?.[lang] || MAP[skill]?.en || skill;
}

export function getLocalizedDailyMinutes(minutes: number, lang: NativeLanguage): string {
  if (lang === "vi") return `${minutes} phút`;
  if (lang === "zh-CN" || lang === "zh-TW") return `${minutes} 分钟`;
  if (lang === "ko") return `${minutes}분`;
  if (lang === "th") return `${minutes} นาที`;
  if (lang === "ru") return `${minutes} мин`;
  return `${minutes} mins`;
}

export function getLocalizedRationale(
  index: number,
  goal: string,
  style: string,
  level: string,
  skill: string,
  daily: number,
  perWeek: number,
  lang: NativeLanguage,
  fallback = ""
): string {
  if (lang === "vi") return fallback;

  const isBeg = level === "BEGINNER";
  const lvlName = getLocalizedRoadmapLabel(level, lang, level);
  const goalName = getLocalizedRoadmapLabel(goal, lang, goal);
  const skillName = getLocalizedRoadmapLabel(skill, lang, skill);
  const styleName = getLocalizedRoadmapLabel(style, lang, style);

  if (lang === "zh-CN" || lang === "zh-TW") {
    const isTrad = lang === "zh-TW";
    switch (index) {
      case 0:
        return isBeg
          ? (isTrad ? "零基礎起點：從五十音圖與發音規則入門，無需任何前置知識。" : "零基础起点：从五十音图与发音规则入门，无需任何前置知识。")
          : (isTrad ? `跳過基礎假名，直入 ${lvlName} 核心語法與實用技巧。` : `跳过基础假名，直入 ${lvlName} 核心语法与实用技巧。`);
      case 1:
        return isTrad
          ? `以「${goalName}」為主要導向，優先排列契合場景的高頻知識模組。`
          : `以「${goalName}」为主要导向，优先排列契合场景的高频知识模块。`;
      case 2:
        return isTrad
          ? `重點攻堅「${skillName}」技能，各個學習階段均增加針對性練習。`
          : `重点攻坚「${skillName}」技能，各个学习阶段均增加针对性练习。`;
      case 3:
        return isTrad
          ? `結合「${styleName}」風格，合理穿插理論講解、情景實戰與 SRS 記憶。`
          : `结合「${styleName}」风格，合理穿插理论讲解、情景实战与 SRS 记忆。`;
      case 4:
        return isTrad
          ? `每日計劃 ${daily} 分鐘 → 每週約完成 ${perWeek} 個模組，循序漸進達成目標。`
          : `每日计划 ${daily} 分钟 → 每周约完成 ${perWeek} 个模块，循序渐进达成目标。`;
      default:
        return fallback;
    }
  }

  // English & other language defaults
  switch (index) {
    case 0:
      return isBeg
        ? "Beginner starting point: starts from Kana syllabaries without requiring prior knowledge."
        : `Skips basic kana and jumps directly into ${lvlName} core grammar and skills.`;
    case 1:
      return `Targeted towards "${goalName}" — high-impact matching modules are prioritized first.`;
    case 2:
      return `Focused on "${skillName}" skills, reinforced with extra exercises across all stages.`;
    case 3:
      return `Tailored for "${styleName}" learning, balancing theory, immersion, and SRS retention.`;
    case 4:
      return `Daily budget of ${daily} mins/day → approx. ${perWeek} modules/week for sustainable mastery.`;
    default:
      return fallback;
  }
}

export function getLocalizedWhy(
  why: string,
  goal: string,
  style: string,
  skill: string,
  lang: NativeLanguage
): string {
  if (lang === "vi") return why;

  const goalName = getLocalizedRoadmapLabel(goal, lang, goal);
  const skillName = getLocalizedRoadmapLabel(skill, lang, skill);
  const styleName = getLocalizedRoadmapLabel(style, lang, style);

  if (why.includes("Nằm trong lộ trình") || why.includes("lộ trình") || why.includes("trình tự khoa học")) {
    switch (lang) {
      case "zh-CN": return `包含在「${goalName}」学习路径规划中 — 遵循科学进阶序列。`;
      case "zh-TW": return `包含在「${goalName}」學習路徑規劃中 — 遵循科學進階序列。`;
      case "ko": return `"${goalName}" 학습 로드맵의 핵심 단계 — 과학적 커리큘럼 순서.`;
      case "es": return `Paso clave en tu ruta de "${goalName}" — progresión científica.`;
      case "fr": return `Étape clé du parcours « ${goalName} » — progression scientifique.`;
      case "de": return `Wichtiger Meilenstein im Lernpfad „${goalName}“ — strukturierter Aufbau.`;
      case "id": return `Bagian penting dari alur belajar "${goalName}" — kurikulum ilmiah.`;
      case "th": return `ส่วนสำคัญในแผนการเรียน "${goalName}" — ลำดับตามหลักสูตรมาตรฐาน`;
      case "ru": return `Ключевой этап программы «${goalName}» — научно выверенная последовательность.`;
      case "pt": return `Etapa chave no roteiro "${goalName}" — progressão científica.`;
      default: return `Core milestone in your "${goalName}" roadmap — structured progression.`;
    }
  }

  if (why.includes("Phù hợp mục tiêu")) {
    switch (lang) {
      case "zh-CN": return `契合你的「${goalName}」学习目标。`;
      case "zh-TW": return `契合你的「${goalName}」學習目標。`;
      case "ko": return `"${goalName}" 학습 목표에 최적화된 강의입니다.`;
      case "es": return `Alineado directamente con tu objetivo de "${goalName}".`;
      case "fr": return `Directement aligné avec votre objectif de « ${goalName} ».`;
      case "de": return `Direkt auf Ihr Lernziel „${goalName}“ abgestimmt.`;
      case "id": return `Sesuai langsung dengan target belajar "${goalName}" Anda.`;
      case "th": return `ตรงตามเป้าหมายการเรียน "${goalName}" ของคุณ`;
      case "ru": return `Полностью соответствует вашей цели «${goalName}».`;
      case "pt": return `Alinhado diretamente com sua meta de "${goalName}".`;
      default: return `Directly aligned with your "${goalName}" learning goal.`;
    }
  }
  if (why.includes("tập trung kỹ năng")) {
    switch (lang) {
      case "zh-CN": return `强化「${skillName}」核心能力模块。`;
      case "zh-TW": return `強化「${skillName}」核心能力模組。`;
      case "ko": return `"${skillName}" 핵심 역량을 강화하도록 맞춤 설계되었습니다.`;
      case "es": return `Diseñado especialmente para reforzar tus habilidades de "${skillName}".`;
      case "fr": return `Spécialement conçu pour renforcer vos compétences en « ${skillName} ».`;
      case "de": return `Speziell ausgewählt, um Ihre Fertigkeiten in „${skillName}“ zu stärken.`;
      case "id": return `Dirancang khusus untuk mengasah keterampilan "${skillName}" Anda.`;
      case "th": return `ออกแบบเพื่อเสริมทักษะ "${skillName}" โดยเฉพาะ`;
      case "ru": return `Специально добавлено для развития навыка «${skillName}».`;
      case "pt": return `Projetado especialmente para reforçar suas habilidades de "${skillName}".`;
      default: return `Specially added to reinforce your "${skillName}" skills.`;
    }
  }
  if (why.includes("Phong cách")) {
    switch (lang) {
      case "zh-CN": return `匹配你的「${styleName}」学习节奏与习惯。`;
      case "zh-TW": return `匹配你的「${styleName}」學習節奏與習慣。`;
      case "ko": return `"${styleName}" 학습 스타일과 템포에 최적화되었습니다.`;
      case "es": return `Adaptado a tu estilo de aprendizaje "${styleName}".`;
      case "fr": return `Adapté à votre style d'apprentissage « ${styleName} ».`;
      case "de": return `Maßgeschneidert für Ihren Lernstil „${styleName}“.`;
      case "id": return `Disesuaikan dengan gaya belajar "${styleName}" Anda.`;
      case "th": return `ปรับให้เหมาะกับรูปแบบการเรียน "${styleName}" ของคุณ`;
      case "ru": return `Адаптировано под ваш стиль обучения «${styleName}».`;
      case "pt": return `Adaptado ao seu estilo de aprendizagem "${styleName}".`;
      default: return `Tailored for your "${styleName}" learning style.`;
    }
  }
  if (why.includes("Hiragana")) {
    switch (lang) {
      case "zh-CN": return "平假名是日语一切听说读写的最基石。";
      case "zh-TW": return "平假名是日語一切聽說讀寫的最基石。";
      case "ko": return "히라가나는 일본어 모든 의사소통의 가장 핵심적인 기초입니다.";
      default: return "Hiragana is the foundation of all Japanese reading and writing.";
    }
  }
  if (why.includes("Katakana")) {
    switch (lang) {
      case "zh-CN": return "片假名帮助你快速掌握日常生活中的外来词汇。";
      case "zh-TW": return "片假名幫助你快速掌握日常生活中的外來詞彙。";
      case "ko": return "카타카나는 일상 속 외래어와 브랜드명을 읽는 열쇠입니다.";
      default: return "Katakana unlocks loanwords and foreign concepts encountered daily.";
    }
  }
  if (why.includes("SRS")) {
    switch (lang) {
      case "zh-CN": return "遵循 SM-2 科学遗忘曲线定时复习。";
      case "zh-TW": return "遵循 SM-2 科學遺忘曲線定時複習。";
      case "ko": return "SM-2 간격 반복 알고리즘을 통한 장기 기억 보존.";
      default: return "Scheduled with SM-2 spaced repetition to solidify memory.";
    }
  }
  if (why.includes("AI")) {
    switch (lang) {
      case "zh-CN": return "与 AI 导师进行情境式自由对话实践。";
      case "zh-TW": return "與 AI 導師進行情境式自由對話實踐。";
      case "ko": return "AI 선생님과 함께하는 부담 없는 인터랙티브 실전 회화.";
      default: return "Scenario-based speaking and conversation with AI Sensei.";
    }
  }

  return why;
}

export function getLocalizedRowLabel(
  rowKey: string,
  lang: NativeLanguage,
  fallback = ""
): string {
  if (lang === "vi") return fallback;

  const kanaPartMatch = fallback.match(/\(([^)]+)\)/);
  const kanaSuffix = kanaPartMatch ? ` (${kanaPartMatch[1]})` : "";

  if (lang === "zh-CN" || lang === "zh-TW") {
    if (rowKey === "n") {
      return (lang === "zh-TW" ? "撥音 / 鼻音 N" : "拨音 / 鼻音 N") + kanaSuffix;
    }
    const cap = rowKey.charAt(0).toUpperCase() + rowKey.slice(1);
    return `${cap}行${kanaSuffix}`;
  }

  // English & other language defaults
  if (rowKey === "n") {
    return `Nasal N${kanaSuffix}`;
  }
  const cap = rowKey.charAt(0).toUpperCase() + rowKey.slice(1);
  return `${cap}-Row${kanaSuffix}`;
}


