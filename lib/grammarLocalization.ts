/**
 * Grammar Localization Engine for JLPT N5, N4, N3
 *
 * Provides accurate translations for grammar patterns, meanings, formulas,
 * common mistakes, and example sentences across all 12 supported languages:
 * vi, en, zh-CN, zh-TW, ko, es, fr, de, id, th, ru, pt.
 */

import React, { useState, useEffect } from "react";
import type { NativeLanguage } from "@/components/LanguageContext";
import { useNativeLanguage } from "@/components/LanguageContext";

export interface GrammarTranslationEntry {
  title?: Record<string, string>;
  meaning: Partial<Record<NativeLanguage, string>>;
  structure?: Partial<Record<NativeLanguage, string>>;
  commonMistakes?: Partial<Record<NativeLanguage, string>>;
}

/**
 * Curated dictionary for core JLPT N5/N4/N3 grammar patterns.
 */
export const CORE_GRAMMAR_MAP: Record<string, GrammarTranslationEntry> = {
  // N5 Patterns
  "〜時〜分 / 〜から〜まで (Thời gian)": {
    meaning: {
      en: "... o'clock ... minutes / From ... to ... (Time)",
      "zh-CN": "……点……分 / 从……到……（时间）",
      "zh-TW": "……點……分 / 從……到……（時間）",
      ko: "...시 ...분 / ...부터 ...까지 (시간)",
      es: "... hora(s) ... minuto(s) / Desde ... hasta ... (Tiempo)",
      fr: "... heure(s) ... minute(s) / De ... à ... (Temps)",
      de: "... Uhr ... Minuten / Von ... bis ... (Uhrzeit)",
      id: "Jam ... lewat ... menit / Dari ... sampai ... (Waktu)",
      th: "...โมง ...นาที / จาก...ถึง... (เวลา)",
      ru: "... часов ... минут / С ... до ... (Время)",
      pt: "... hora(s) ... minuto(s) / De ... até ... (Tempo)",
      vi: "... giờ ... phút / Từ ... đến ...",
    },
    structure: {
      en: "[Time] + から + [Time] + まで",
      "zh-CN": "[时间] + から + [时间] + まで",
      "zh-TW": "[時間] + から + [時間] + まで",
      ko: "[시간] + から + [시간] + まで",
      es: "[Hora] + から + [Hora] + まで",
      fr: "[Heure] + から + [Heure] + まで",
      de: "[Zeit] + から + [Zeit] + まで",
      id: "[Waktu] + から + [Waktu] + まで",
      th: "[เวลา] + から + [เวลา] + まで",
      ru: "[Время] + から + [Время] + まで",
      pt: "[Hora] + から + [Hora] + まで",
    },
    commonMistakes: {
      en: "Pay attention to irregular hours: 4:00 (よじ), 9:00 (くじ), 7:00 (しちじ). Minutes: 1 min (いっぷん), 3 min (さんぷん), 6 min (ろっぷん), 8 min (はっぷん), 10 min (じゅっぷん).",
      "zh-CN": "注意特殊发音：4点（よじ）、9点（くじ）、7点（しちじ）。分钟：1分（いっぷん）、3分（さんぷん）、6分（ろっぷん）、8分（はっぷん）、10分（じゅっぷん）。",
      "zh-TW": "注意特殊發音：4點（よじ）、9點（くじ）、7點（しちじ）。分鐘：1分（いっぷん）、3分（さんぷん）、6分（ろっぷん）、8分（はっぷん）、10分（じゅっぷん）。",
      ko: "시간 특수 발음에 주의하세요: 4시(よじ), 9시(くじ), 7시(しちじ). 분: 1분(いっぷん), 3분(さんぷん), 6분(ろっぷん), 8분(はっぷん), 10분(じゅっぷん).",
      es: "Atención a las horas irregulares: 4 en punto (よじ), 9 (くじ), 7 (しちじ). Minutos: 1 min (いっぷん), 3 min (さんぷん), 6 min (ろっぷん), 8 min (はっぷん), 10 min (じゅっぷん).",
      fr: "Attention aux heures irrégulières : 4h (よじ), 9h (くじ), 7h (しちじ). Minutes : 1 min (いっぷん), 3 min (さんぷん), 6 min (ろっぷん), 8 min (はっぷん), 10 min (じゅっぷん).",
      de: "Beachten Sie unregelmäßige Uhrzeiten: 4 Uhr (よじ), 9 Uhr (くじ), 7 Uhr (しちじ). Minuten: 1 Min (いっぷん), 3 Min (さんぷん), 6 Min (ろっぷん), 8 Min (はっぷん), 10 Min (じゅっぷん).",
      id: "Perhatikan jam khusus: jam 4 (よじ), jam 9 (くじ), jam 7 (しちじ). Menit: 1 mnt (いっぷん), 3 mnt (さんぷん), 6 mnt (ろっぷん), 8 mnt (はっぷん), 10 mnt (じゅっぷん).",
      th: "ระวังการออกเสียงเวลาพิเศษ: 4 โมง (よじ), 9 โมง (くじ), 7 โมง (しちじ) นาที: 1 นาที (いっぷん), 3 นาที (さんぷん), 6 นาที (ろっぷん), 8 นาที (はっぷん), 10 นาที (じゅっぷん)",
      ru: "Обратите внимание на особое чтение часов: 4 часа (よじ), 9 часов (くじ), 7 часов (しちじ). Минуты: 1 мин (いっぷん), 3 мин (さんぷん), 6 мин (ろっぷん), 8 мин (はっぷん), 10 мин (じゅっぷん).",
      pt: "Atenção às horas irregulares: 4 horas (よじ), 9 horas (くじ), 7 horas (しちじ). Minutos: 1 min (いっぷん), 3 min (さんぷん), 6 min (ろっぷん), 8 min (はっぷん), 10 min (じゅっぷん).",
    },
  },
  "Động từ các thì: 〜ます / 〜ません / 〜ました / 〜ませんでした": {
    meaning: {
      en: "Polite verb tenses: Affirmative, Negative, Past, Past Negative",
      "zh-CN": "动词礼貌体时态：肯定、否定、过去肯定、过去否定",
      "zh-TW": "動詞禮貌體時態：肯定、否定、過去肯定、過去否定",
      ko: "동사 정중형 시제: 긍정, 부정, 과거, 과거 부정",
      es: "Tiempos verbales formales: Afirmativo, Negativo, Pasado, Pasado negativo",
      fr: "Temps des verbes polis : Affirmatif, Négatif, Passé, Passé négatif",
      de: "Höfliche Verbformen: Bejahend, Verneinend, Vergangenheit, Verneinte Vergangenheit",
      id: "Bentuk kata kerja sopan: Positif, Negatif, Lampau, Lampau negatif",
      th: "กาลของคำกริยาสุภาพ: บอกเล่า, ปฏิเสธ, อดีต, อดีตปฏิเสธ",
      ru: "Вежливые формы глаголов: Утвердительная, Отрицательная, Прошедшее, Прошедшее отриц.",
      pt: "Tempos verbais formais: Afirmativo, Negativo, Passado, Passado negativo",
      vi: "Khẳng định, phủ định, quá khứ khẳng định, quá khứ phủ định dạng lịch sự",
    },
    structure: {
      en: "[Verb stem] + ます / ません / ました / ませんでした",
      "zh-CN": "[动词连用形] + ます / ません / ました / ませんでした",
      "zh-TW": "[動詞連用形] + ます / ません / ました / ませんでした",
      ko: "[동사 ます형 어간] + ます / ません / ました / ませんでした",
      es: "[Raíz verbal] + ます / ません / ました / ませんでした",
      fr: "[Base verbale] + ます / ません / ました / ませんでした",
      de: "[Verbstamm] + ます / ません / ました / ませんでした",
      id: "[Akar kata kerja] + ます / ません / ました / ませんでした",
      th: "[รากคำกริยา] + ます / ません / ました / ませんでした",
      ru: "[Основа глагола] + ます / ません / ました / ませんでした",
      pt: "[Raiz verbal] + ます / ません / ました / ませんでした",
    },
    commonMistakes: {
      en: "Verbs ending in ます always come at the very end of the predicate clause.",
      "zh-CN": "以 ます 结尾的动词总是位于句末谓语位置。",
      "zh-TW": "以 ます 結尾的動詞總是位於句末謂語位置。",
      ko: "ます로 끝나는 동사는 항상 서술어 문장 끝에 위치합니다.",
      es: "Los verbos que terminan en ます siempre van al final de la oración.",
      fr: "Les verbes en ます se placent toujours à la fin de la phrase.",
      de: "Verben mit der Endung ます stehen immer am Ende des Prädikatsatzes.",
      id: "Kata kerja yang berakhiran ます selalu ditempatkan di akhir kalimat.",
      th: "คำกริยาที่ลงท้ายด้วย ます จะอยู่ท้ายประโยคภาคแสดงเสมอ",
      ru: "Глаголы на ます всегда ставятся в самом конце предложения.",
      pt: "Verbos terminados em ます sempre ficam no final da oração.",
    },
  },
  "〜へ 行きます / 来ます / 帰ります (へ - Phương hướng)": {
    meaning: {
      en: "Go / Come / Return somewhere — Particle へ marks movement direction",
      "zh-CN": "去 / 来 / 回某处 — 助词 へ 表示移动方向",
      "zh-TW": "去 / 來 / 回某處 — 助詞 へ 表示移動方向",
      ko: "어딘가로 가다 / 오다 / 돌아가다 — 조사 へ는 이동 방향을 나타냄",
      es: "Ir / Venir / Regresar a algún lugar — La partícula へ indica dirección",
      fr: "Aller / Venir / Rentrer quelque part — La particule へ indique la direction",
      de: "Irgendwohin gehen / kommen / zurückkehren — Partikel へ markiert die Richtung",
      id: "Pergi / Datang / Pulang ke suatu tempat — Partikel へ menandai arah",
      th: "ไป / มา / กลับที่ไหนสักแห่ง — คำช่วย へ ระบุทิศทาง",
      ru: "Идти / Приходить / Возвращаться куда-либо — Частица へ указывает направление",
      pt: "Ir / Vir / Voltar para algum lugar — A partícula へ indica direção",
      vi: "Đi / Đến / Về đâu đó — Trợ từ へ đánh dấu hướng di chuyển",
    },
    structure: {
      en: "[Place] + へ (or に) + [行きます / 来ます / 帰ります]",
      "zh-CN": "[地点] + へ (或 に) + [行きます / 来ます / 帰ります]",
      "zh-TW": "[地點] + へ (或 に) + [行きます / 来ます / 帰ります]",
      ko: "[장소] + へ (또는 に) + [行きます / 来ます / 帰ります]",
      es: "[Lugar] + へ (o に) + [行きます / 来ます / 帰ります]",
      fr: "[Lieu] + へ (ou に) + [行きます / 来ます / 帰ります]",
      de: "[Ort] + へ (oder に) + [行きます / 来ます / 帰ります]",
      id: "[Tempat] + へ (atau に) + [行きます / 来ます / 帰ります]",
      th: "[สถานที่] + へ (หรือ に) + [行きます / 来ます / 帰ります]",
      ru: "[Место] + へ (или に) + [行きます / 来ます / 帰ります]",
      pt: "[Lugar] + へ (ou に) + [行きます / 来ます / 帰ります]",
    },
    commonMistakes: {
      en: "The character へ is pronounced 'e' when functioning as a direction particle.",
      "zh-CN": "字符 へ 作为方向助词时读作 /e/。",
      "zh-TW": "字符 へ 作為方向助詞時讀作 /e/。",
      ko: "문자 へ가 방향 조사로 쓰일 때는 /e/로 발음됩니다.",
      es: "El carácter へ se pronuncia 'e' cuando funciona como partícula de dirección.",
      fr: "Le caractère へ se prononce 'e' lorsqu'il sert de particule de direction.",
      de: "Das Zeichen へ wird als /e/ ausgesprochen, wenn es als Richtungspartikel dient.",
      id: "Karakter へ dilafalkan 'e' ketika berfungsi sebagai partikel arah.",
      th: "ตัวอักษร へ จะออกเสียงว่า 'เอะ' เมื่อทำหน้าที่เป็นคำช่วยบอกทิศทาง",
      ru: "Символ へ произносится как /э/, когда он выступает частицей направления.",
      pt: "O caractere へ é pronunciado como 'e' quando funciona como partícula de direção.",
    },
  },
  "〜で (Phương tiện giao thông / Công cụ)": {
    meaning: {
      en: "By means of (transportation, tool, language)",
      "zh-CN": "用、乘（交通工具、工具、语言）",
      "zh-TW": "用、乘（交通工具、工具、語言）",
      ko: "(교통수단, 도구, 언어)로",
      es: "Por medio de (transporte, herramienta, idioma)",
      fr: "En / Au moyen de (transport, outil, langue)",
      de: "Mittels / Mit (Verkehrsmittel, Werkzeug, Sprache)",
      id: "Dengan / Menggunakan (kendaraan, alat, bahasa)",
      th: "โดย / ด้วย (ยานพาหนะ, เครื่องมือ, ภาษา)",
      ru: "С помощью / На (транспорте, инструменте, языке)",
      pt: "Por meio de (transporte, ferramenta, idioma)",
      vi: "Bằng (phương tiện, công cụ, ngôn ngữ)",
    },
    structure: {
      en: "[Vehicle / Tool] + で + [Verb]",
      "zh-CN": "[交通工具 / 工具] + で + [动词]",
      "zh-TW": "[交通工具 / 工具] + で + [動詞]",
      ko: "[교통수단 / 도구] + で + [동사]",
      es: "[Vehículo / Herramienta] + で + [Verbo]",
      fr: "[Véhicule / Outil] + で + [Verbe]",
      de: "[Fahrzeug / Werkzeug] + で + [Verb]",
      id: "[Kendaraan / Alat] + で + [Kata kerja]",
      th: "[ยานพาหนะ / เครื่องมือ] + で + [คำกริยา]",
      ru: "[Транспорт / Инструмент] + で + [Глагол]",
      pt: "[Veículo / Ferramenta] + で + [Verbo]",
    },
    commonMistakes: {
      en: "Walking uses '歩いて (aruite)' without で: '歩いて行きます'.",
      "zh-CN": "步行使用「歩いて (aruite)」，无需加 で：「歩いて行きます」。",
      "zh-TW": "步行使用「歩いて (aruite)」，無需加 で：「歩いて行きます」。",
      ko: "걸어서 갈 때는 で 없이 '歩いて (aruite)'를 씁니다: '歩いて行きます'.",
      es: "Caminar usa '歩いて (aruite)' sin で: '歩いて行きます'.",
      fr: "Pour aller à pied, utilisez '歩いて (aruite)' sans で : '歩いて行きます'.",
      de: "Zu Fuß gehen heißt '歩いて (aruite)' ohne で: '歩いて行きます'.",
      id: "Berjalan kaki menggunakan '歩いて (aruite)' tanpa で: '歩いて行きます'.",
      th: "เดินเท้าจะใช้ '歩いて (aruite)' โดยไม่ต้องมี で: '歩いて行きます'",
      ru: "Пешком используется '歩いて (aruite)' без で: '歩いて行きます'.",
      pt: "A pé usa-se '歩いて (aruite)' sem で: '歩いて行きます'.",
    },
  },
  "〜を (wo) — Trợ từ tân ngữ trực tiếp": {
    meaning: {
      en: "Direct object particle (Eat what, drink what, read what)",
      "zh-CN": "直接宾语助词（吃什么、喝什么、读什么）",
      "zh-TW": "直接賓語助詞（吃什麼、喝什麼、讀什麼）",
      ko: "직접 목적어 조사 (무엇을 먹다, 마시다, 읽다)",
      es: "Partícula de objeto directo (qué comer, qué beber, qué leer)",
      fr: "Particule d'objet direct (manger quoi, boire quoi, lire quoi)",
      de: "Direktes Objekt-Partikel (was essen, was trinken, was lesen)",
      id: "Partikel objek langsung (makan apa, minum apa, baca apa)",
      th: "คำช่วยบอกกรรมตรง (กินอะไร, ดื่มอะไร, อ่านอะไร)",
      ru: "Частица прямого дополнения (что есть, что пить, что читать)",
      pt: "Partícula de objeto direto (o que comer, o que beber, o que ler)",
      vi: "Tác động hành động lên đối tượng (Ăn cái gì, uống cái gì, đọc cái gì)",
    },
    structure: {
      en: "[Object] + を + [Transitive Verb]",
      "zh-CN": "[宾语] + を + [他动词]",
      "zh-TW": "[賓語] + を + [他動詞]",
      ko: "[목적어] + を + [타동사]",
      es: "[Objeto] + を + [Verbo transitivo]",
      fr: "[Objet] + を + [Verbe transitif]",
      de: "[Objekt] + を + [Transitives Verb]",
      id: "[Objek] + を + [Kata kerja transitif]",
      th: "[กรรม] + を + [คำกริยาสกรรม]",
      ru: "[Объект] + を + [Переходный глагол]",
      pt: "[Objeto] + を + [Verbo transitivo]",
    },
    commonMistakes: {
      en: "Pronounced as 'o'. Do not use を with verbs of movement or state of existence.",
      "zh-CN": "发音为 /o/。不可在单纯移动动词或存在状态句中使用 を。",
      "zh-TW": "發音為 /o/。不可在單純移動動詞或存在狀態句中使用 を。",
      ko: "/o/로 발음됩니다. 이동 동사나 존재 상태 동사에는 を를 쓰지 않습니다.",
      es: "Se pronuncia /o/. No uses を con verbos de movimiento o de existencia.",
      fr: "Se prononce /o/. N'utilisez pas を avec des verbes de déplacement ou d'état d'existence.",
      de: "Wird als /o/ ausgesprochen. Nicht bei Bewegungsverben oder Existenzzuständen verwenden.",
      id: "Dilafalkan /o/. Jangan gunakan を dengan kata kerja gerak atau keberadaan.",
      th: "ออกเสียงว่า /o/ ไม่ใช้ を กับคำกริยาแสดงการเคลื่อนที่หรือการมีอยู่",
      ru: "Произносится как /о/. Не используйте を с глаголами движения или состояния бытия.",
      pt: "Pronuncia-se como /o/. Não use を com verbos de movimento ou estado de existência.",
    },
  },
  "〜で (Địa điểm diễn ra hành động)": {
    meaning: {
      en: "At, in (location where an action takes place)",
      "zh-CN": "在（动作发生的场所）",
      "zh-TW": "在（動作發生的場所）",
      ko: "에서 (행동이 일어나는 장소)",
      es: "En (lugar donde se realiza una acción)",
      fr: "À / Dans (lieu où se déroule une action)",
      de: "In / An (Ort, an dem eine Handlung stattfindet)",
      id: "Di (tempat dilakukannya tindakan)",
      th: "ที่ (สถานที่เกิดการกระทำ)",
      ru: "В / На (месте, где происходит действие)",
      pt: "Em (local onde uma ação ocorre)",
      vi: "Ở, tại nơi chốn thực hiện hành động",
    },
    structure: {
      en: "[Location] + で + [Action Verb]",
      "zh-CN": "[场所] + で + [动作动词]",
      "zh-TW": "[場所] + で + [動作動詞]",
      ko: "[장소] + で + [행동 동사]",
      es: "[Lugar] + で + [Verbo de acción]",
      fr: "[Lieu] + で + [Verbe d'action]",
      de: "[Ort] + で + [Aktionsverb]",
      id: "[Tempat] + で + [Kata kerja tindakan]",
      th: "[สถานที่] + で + [คำกริยาการกระทำ]",
      ru: "[Место] + で + [Глагол действия]",
      pt: "[Local] + で + [Verbo de ação]",
    },
    commonMistakes: {
      en: "Unlike に (which marks static presence with arimasu/imasu), で is used when dynamic activity takes place.",
      "zh-CN": "不同于 に（用于静态存在 arimasu/imasu），で 用于有具体活动发生的场所。",
      "zh-TW": "不同於 に（用於靜態存在 arimasu/imasu），で 用於有具體活動發生的場所。",
      ko: "정적 존재(arimasu/imasu)를 나타내는 に와 달리, で는 구체적인 활동이 일어날 때 씁니다.",
      es: "A diferencia de に (que indica presencia estática con arimasu/imasu), で se usa cuando ocurre una actividad dinámica.",
      fr: "Contrairement à に (qui indique une présence statique avec arimasu/imasu), で s'utilise lorsqu'une action dynamique a lieu.",
      de: "Anders als に (statisches Dasein mit arimasu/imasu) wird で verwendet, wenn eine Handlung stattfindet.",
      id: "Berbeda dengan に (keberadaan statis dengan arimasu/imasu), で digunakan saat terjadi kegiatan aktif.",
      th: "ต่างจาก に (ระบุการมีอยู่แบบนิ่ง arimasu/imasu) で จะใช้เมื่อมีการกระทำเกิดขึ้น",
      ru: "В отличие от に (статичное присутствие с arimasu/imasu), で используется, когда происходит активное действие.",
      pt: "Ao contrário de に (que indica presença estática com arimasu/imasu), で é usado quando uma atividade dinâmica ocorre.",
    },
  },
  "〜ませんか / 〜ましょう (Rủ rê & Đề nghị)": {
    meaning: {
      en: "Won't you do ... with me? / Let's do ... together! (Invitation & Suggestion)",
      "zh-CN": "要不要一起……？ / 让我们一起……吧！（邀请与提议）",
      "zh-TW": "要不要一起……？ / 讓我們一起……吧！（邀請與提議）",
      ko: "같이 ...하지 않을래요? / 함께 ...합시다! (권유 및 제안)",
      es: "¿No te gustaría hacer ... conmigo? / ¡Hagamos ... juntos! (Invitación y propuesta)",
      fr: "Voudriez-vous faire ... avec moi ? / Faisons ... ensemble ! (Invitation et proposition)",
      de: "Möchtest du nicht mit mir ... machen? / Lass uns ... zusammen tun! (Einladung & Vorschlag)",
      id: "Maukah Anda ... bersama saya? / Mari kita ... bersama! (Ajakan & Usulan)",
      th: "ไป...ด้วยกันไหม? / มา...กันเถอะ! (การชวนและเสนอแนะ)",
      ru: "Не хотите ли сделать ... вместе? / Давайте сделаем ... вместе! (Приглашение и предложение)",
      pt: "Você não quer fazer ... comigo? / Vamos fazer ... juntos! (Convite e sugestão)",
      vi: "Cùng làm gì với tôi nhé? / Cùng làm thôi nào!",
    },
    structure: {
      en: "[Verb stem] + ませんか (polite invitation) / ましょう (enthusiastic proposal)",
      "zh-CN": "[动词连用形] + ませんか（礼貌邀请） / ましょう（积极号召）",
      "zh-TW": "[動詞連用形] + ませんか（禮貌邀請） / ましょう（積極號召）",
      ko: "[동사 ます형 어간] + ませんか (정중한 권유) / ましょう (적극적인 제안)",
      es: "[Raíz verbal] + ませんか (invitación formal) / ましょう (propuesta entusiasta)",
      fr: "[Base verbale] + ませんか (invitation polie) / ましょう (proposition enthousiaste)",
      de: "[Verbstamm] + ませんか (höfliche Einladung) / ましょう (begeisterter Vorschlag)",
      id: "[Akar kata kerja] + ませんか (undangan sopan) / ましょう (ajakan bersama)",
      th: "[รากคำกริยา] + ませんか (ชวนอย่างสุภาพ) / ましょう (ชวนร่วมมือ)",
      ru: "[Основа глагола] + ませんか (вежливое приглашение) / ましょう (призыв сделать вместе)",
      pt: "[Raíz verbal] + ませんか (convite educado) / ましょう (proposta conjunta)",
    },
    commonMistakes: {
      en: "〜ませんか shows high respect and asks for the listener's opinion. 〜ましょう is proactive and assumes agreement.",
      "zh-CN": "〜ませんか 体现尊重并询问对方意见。〜ましょう 带有主动号召一起行动的语气。",
      "zh-TW": "〜ませんか 體現尊重並詢問對方意見。〜ましょう 帶有主動號召一起行動的語氣。",
      ko: "〜ませんか는 상대방의 의견을 묻는 정중한 표현이며, 〜ましょう는 주도적으로 함께하자고 이끄는 뉘앙스입니다.",
      es: "〜ませんか muestra cortesía y pide la opinión del oyente. 〜ましょう es proactivo y asume acuerdo.",
      fr: "〜ませんか témoigne du respect et demande l'avis de l'interlocuteur. 〜ましょう est plus direct et entraînant.",
      de: "〜ませんか zeigt Respekt und erfragt die Meinung. 〜ましょう ist proaktiv und setzt Zustimmung voraus.",
      id: "〜ませんか menunjukkan rasa hormat dan menanyakan pendapat lawan bicara. 〜ましょう bersifat proaktif.",
      th: "〜ませんか แสดงความสุภาพและถามความคิดเห็น 〜ましょう เป็นการชวนอย่างกระตือรือร้น",
      ru: "〜ませんか выражает вежливость и спрашивает мнение. 〜ましょう носит инициативный характер.",
      pt: "〜ませんか demonstra respeito e pergunta a opinião do ouvinte. 〜ましょう é proativo e convida diretamente.",
    },
  },
  "〜を あげます / もらいます (Tặng / Nhận)": {
    meaning: {
      en: "Give to someone (〜にあげます) / Receive from someone (〜にもらいます/からもらいます)",
      "zh-CN": "给某人（〜にあげます） / 从某人处得到（〜にもらいます/からもらいます）",
      "zh-TW": "給某人（〜にあげます） / 從某人處得到（〜にもらいます/からもらいます）",
      ko: "누군가에게 주다 (〜にあげます) / 누군가로부터 받다 (〜にもらいます/からもらいます)",
      es: "Dar a alguien (〜にあげます) / Recibir de alguien (〜にもらいます/からもらいます)",
      fr: "Donner à quelqu'un (〜にあげます) / Recevoir de quelqu'un (〜にもらいます/からもらいます)",
      de: "Jemandem geben (〜にあげます) / Von jemandem erhalten (〜にもらいます/からもらいます)",
      id: "Memberi kepada seseorang (〜にあげます) / Menerima dari seseorang (〜にもらいます/からもらいます)",
      th: "ให้ใครบางคน (〜にあげます) / ได้รับจากใครบางคน (〜にもらいます/からもらいます)",
      ru: "Давать кому-то (〜にあげます) / Получать от кого-то (〜にもらいます/からもらいます)",
      pt: "Dar a alguém (〜にあげます) / Receber de alguém (〜にもらいます/からもらいます)",
      vi: "Tặng quà cho ai (〜にあげます) / Nhận quà từ ai (〜にもらいます/からもらいます)",
    },
    structure: {
      en: "[Recipient] + に + [Item] + を + あげます / [Giver] + に/から + [Item] + を + もらいます",
      "zh-CN": "[接收者] + に + [物品] + を + あげます / [给予者] + に/から + [物品] + を + もらいます",
      "zh-TW": "[接收者] + に + [物品] + を + あげます / [給予者] + に/から + [物品] + を + もらいます",
      ko: "[받는 사람] + に + [물건] + を + あげます / [주는 사람] + に/から + [물건] + を + もらいます",
      es: "[Destinatario] + に + [Objeto] + を + あげます / [Donante] + に/から + [Objeto] + を + もらいます",
      fr: "[Bénéficiaire] + に + [Objet] + を + あげます / [Donateur] + に/から + [Objet] + を + もらいます",
      de: "[Empfänger] + に + [Gegenstand] + を + あげます / [Geber] + に/から + [Gegenstand] + を + もらいます",
      id: "[Penerima] + に + [Benda] + を + あげます / [Pemberi] + に/から + [Benda] + を + もらいます",
      th: "[ผู้รับ] + に + [สิ่งของ] + を + あげます / [ผู้ให้] + に/から + [สิ่งของ] + を + もらいます",
      ru: "[Получатель] + に + [Вещь] + を + あげます / [Даритель] + に/から + [Вещь] + を + もらいます",
      pt: "[Destinatário] + に + [Item] + を + あげます / [Doador] + に/から + [Item] + を + もらいます",
    },
    commonMistakes: {
      en: "Never use あげます when the receiver is oneself ('I/me'). Use くれる / くれます instead.",
      "zh-CN": "当接收者是自己（我）时，绝不能用 あげます。此时必须使用 くれる / くれます。",
      "zh-TW": "當接收者是自己（我）時，絕不能用 あげます。此時必須使用 くれる / くれます。",
      ko: "받는 사람이 자신(나)일 때는 절대로 あげます를 쓰지 않습니다. くれる / くれます를 써야 합니다.",
      es: "Nunca uses あげます cuando el receptor sea uno mismo (yo). Usa くれる / くれます.",
      fr: "N'utilisez jamais あげます quand le bénéficiaire est soi-même (moi). Utilisez くれる / くれます.",
      de: "Verwenden Sie niemals あげます, wenn der Empfänger man selbst ('ich') ist. Verwenden Sie くれる / くれます.",
      id: "Jangan gunakan あげます jika penerimanya adalah diri sendiri ('saya'). Gunakan くれる / くれます.",
      th: "อย่าใช้ あげます เมื่อผู้รับคือตนเอง (ฉัน) ให้ใช้ くれる / くれます แทน",
      ru: "Никогда не используйте あげます, если получатель — сам говорящий (я). Используйте くれる / くれます.",
      pt: "Nunca use あげます quando o receptor for você mesmo (eu). Use くれる / くれます.",
    },
  },
  "もう 〜ました / まだ 〜ていません": {
    meaning: {
      en: "Already did ... / Have not done ... yet",
      "zh-CN": "已经……了 / 还没……",
      "zh-TW": "已經……了 / 還沒……",
      ko: "이미 ...했습니다 / 아직 ...하지 않았습니다",
      es: "Ya he hecho ... / Todavía no he hecho ...",
      fr: "Déjà fait ... / Pas encore fait ...",
      de: "Schon gemacht / Noch nicht gemacht",
      id: "Sudah melakukan ... / Belum melakukan ...",
      th: "...แล้ว / ยังไม่ได้...",
      ru: "Уже сделал ... / Ещё не сделал ...",
      pt: "Já fiz ... / Ainda não fiz ...",
      vi: "Đã làm gì rồi / Chưa làm gì",
    },
    structure: {
      en: "Affirmative: もう + [V-ました] / Negative: まだ + [V-ていません] (or まだです)",
      "zh-CN": "肯定：もう + [动词-ました] / 否定：まだ + [动词-ていません]（或 まだです）",
      "zh-TW": "肯定：もう + [動詞-ました] / 否定：まだ + [動詞-ていません]（或 まだです）",
      ko: "긍정: もう + [동사-ました] / 부정: まだ + [동사-ていません] (또는 まだです)",
      es: "Afirmativo: もう + [V-ました] / Negativo: まだ + [V-ていません] (o まだです)",
      fr: "Affirmatif : もう + [V-ました] / Négatif : まだ + [V-ていません] (ou まだです)",
      de: "Bejahend: もう + [V-ました] / Verneinend: まだ + [V-ていません] (oder まだです)",
      id: "Positif: もう + [V-ました] / Negatif: まだ + [V-ていません] (atau まだです)",
      th: "บอกเล่า: もう + [V-ました] / ปฏิเสธ: まだ + [V-ていません] (หรือ まだです)",
      ru: "Утверждение: もう + [Глагол-ました] / Отрицание: まだ + [Глагол-ていません] (или まだです)",
      pt: "Afirmativo: もう + [V-ました] / Negativo: まだ + [V-ていません] (ou まだです)",
    },
    commonMistakes: {
      en: "To answer 'Not yet', do not say 'いいえ、しませんでした' (I did not do it), say 'いいえ、まだです'.",
      "zh-CN": "回答“还没做”时，不能说「いいえ、しませんでした」（表示主观没做），应回答「いいえ、まだです」。",
      "zh-TW": "回答“還沒做”時，不能說「いいえ、しませんでした」（表示主觀沒做），應回答「いいえ、まだです」。",
      ko: "'아직 안 했다'고 답할 때는 'いいえ、しませんでした'가 아니라 'いいえ、まだです'라고 말합니다.",
      es: "Para responder 'Todavía no', no digas 'いいえ、しませんでした', di 'いいえ、まだです'.",
      fr: "Pour répondre 'Pas encore', ne dites pas 'いいえ、しませんでした', dites 'いいえ、まだです'.",
      de: "Um mit 'Noch nicht' zu antworten, sagen Sie nicht 'いいえ、しませんでした', sondern 'いいえ、まだです'.",
      id: "Untuk menjawab 'Belum', jangan ucapkan 'いいえ、しませんでした', tetapi 'いいえ、まだです'.",
      th: "เมื่อตอบว่า 'ยัง' อย่าพูดว่า 'いいえ、しませんでした' ให้ตอบว่า 'いいえ、まだです'",
      ru: "Чтобы ответить «Ещё нет», не говорите «いいえ、しませんでした», используйте «いいえ、まだです».",
      pt: "Para responder 'Ainda não', não diga 'いいえ、しませんでした', diga 'いいえ、まだです'.",
    },
  },
  "Tính từ đuôi い (i-Adjective)": {
    meaning: {
      en: "i-Adjectives (ending in い: big, small, delicious, expensive, hot, cold...)",
      "zh-CN": "い形容词（以 い 结尾：大、小、好吃、贵、热、冷……）",
      "zh-TW": "い形容詞（以 い 結尾：大、小、好吃、貴、熱、冷……）",
      ko: "い형용사 (끝글자가 い인 형용사: 크다, 작다, 맛있다, 비싸다, 덥다, 춥다...)",
      es: "Adjetivos en -i (que terminan en い: grande, pequeño, delicioso, caro, caliente, frío...)",
      fr: "Adjectifs en -i (se terminant par い : grand, petit, délicieux, cher, chaud, froid...)",
      de: "i-Adjektive (enden auf い: groß, klein, lecker, teuer, heiß, kalt...)",
      id: "Kata sifat berakhiran -i (besar, kecil, enak, mahal, panas, dingin...)",
      th: "คำคุณศัพท์ลงท้ายด้วย い (ใหญ่, เล็ก, อร่อย, แพง, ร้อน, หนาว...)",
      ru: "i-прилагательные (оканчивающиеся на い: большой, маленький, вкусный, дорогой...)",
      pt: "Adjetivos terminados em -i (grande, pequeno, delicioso, caro, quente, frio...)",
      vi: "Tính từ có tận cùng là chữ い (Lớn, nhỏ, ngon, đắt, nóng, lạnh...)",
    },
    structure: {
      en: "Present: 〜いです / Negative: 〜くないです / Past: 〜かったです / Past Neg: 〜くなかったです",
      "zh-CN": "现在肯定：〜いです / 现在否定：〜くないです / 过去肯定：〜かったです / 过去否定：〜くなかったです",
      "zh-TW": "現在肯定：〜いです / 現在否定：〜くないです / 過去肯定：〜かったです / 過去否定：〜くなかったです",
      ko: "현재 긍정: 〜いです / 현재 부정: 〜くないです / 과거 긍정: 〜かったです / 과거 부정: 〜くなかったです",
      es: "Presente: 〜いです / Negativo: 〜くないです / Pasado: 〜かったです / Pasado neg: 〜くなかったです",
      fr: "Présent : 〜いです / Négatif : 〜くないです / Passé : 〜かったです / Passé négatif : 〜くなかったです",
      de: "Gegenwart: 〜いです / Verneinung: 〜くないです / Vergangenheit: 〜かったです / Vergang. Verneinung: 〜くなかったです",
      id: "Saat ini: 〜いです / Negatif: 〜くないです / Lampau: 〜かったです / Lampau negatif: 〜くなかったです",
      th: "ปัจจุบัน: 〜いです / ปฏิเสธ: 〜くないです / อดีต: 〜かったです / อดีตปฏิเสธ: 〜くなかったです",
      ru: "Наст. время: 〜いです / Отрицание: 〜くないです / Прошедшее: 〜かったです / Прош. отрицание: 〜くなかったです",
      pt: "Presente: 〜いです / Negativo: 〜くないです / Passado: 〜かったです / Passado neg: 〜くなかったです",
    },
    commonMistakes: {
      en: "The adjective 'いい' (good) conjugates based on 'よい': よくない, よかった, よくなかった.",
      "zh-CN": "特别注意「いい」（好）根据「よい」变形：よくない、よかった、よくなかった。",
      "zh-TW": "特別注意「いい」（好）根據「よい」變形：よくない、よかった、よくなかった。",
      ko: "'いい'(좋다)는 'よい'를 기준으로 활용됩니다: よくない, よかった, よくなかった.",
      es: "El adjetivo 'いい' (bueno) se conjuga a partir de 'よい': よくない, よかった, よくなかった.",
      fr: "L'adjectif 'いい' (bon) se conjugue sur la base de 'よい' : よくない, よかった, よくなかった.",
      de: "Das Adjektiv 'いい' (gut) wird anhand von 'よい' konjugiert: よくない, よかった, よくなかった.",
      id: "Kata sifat 'いい' (bagus) dikonjugasikan dari 'よい': よくない, よかった, よくなかった.",
      th: "คำคุณศัพท์ 'いい' (ดี) จะผันตามรูป 'よい': よくない, よかった, よくなかった",
      ru: "Прилагательное 'いい' (хороший) спрягается на основе 'よい': よくない, よかった, よくなかった.",
      pt: "O adjetivo 'いい' (bom) se conjuga com base em 'よい': よくない, よかった, よくなかった.",
    },
  },
};

// Client-side translation cache
const grammarClientCache = new Map<string, string>();

/**
 * Hook to translate grammar explanations, structures, and examples dynamically.
 */
export function useGrammarTranslation(
  sourceText: string,
  keyContext?: string
): string {
  const { nativeLanguage } = useNativeLanguage();

  const [translated, setTranslated] = useState<string>(() => {
    if (nativeLanguage === "vi" || !sourceText) return sourceText;

    // Check precompiled dictionary
    if (keyContext && CORE_GRAMMAR_MAP[keyContext]) {
      const entry = CORE_GRAMMAR_MAP[keyContext];
      if (entry.meaning && entry.meaning[nativeLanguage]) {
        return entry.meaning[nativeLanguage]!;
      }
    }

    const cacheKey = `g_${nativeLanguage}:${sourceText.trim()}`;
    if (grammarClientCache.has(cacheKey)) {
      return grammarClientCache.get(cacheKey)!;
    }
    return sourceText;
  });

  useEffect(() => {
    if (nativeLanguage === "vi" || !sourceText) {
      setTranslated(sourceText);
      return;
    }

    // Check precompiled dictionary
    if (keyContext && CORE_GRAMMAR_MAP[keyContext]) {
      const entry = CORE_GRAMMAR_MAP[keyContext];
      if (entry.meaning && entry.meaning[nativeLanguage]) {
        setTranslated(entry.meaning[nativeLanguage]!);
        return;
      }
    }

    const cacheKey = `g_${nativeLanguage}:${sourceText.trim()}`;
    if (grammarClientCache.has(cacheKey)) {
      setTranslated(grammarClientCache.get(cacheKey)!);
      return;
    }

    let isSubscribed = true;

    // Check localStorage cache
    try {
      const lsKey = `nq_gr_${cacheKey}`;
      const saved = localStorage.getItem(lsKey);
      if (saved) {
        grammarClientCache.set(cacheKey, saved);
        setTranslated(saved);
        return;
      }
    } catch {
      // Ignore
    }

    // Translate via API
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
          grammarClientCache.set(cacheKey, resText);
          try {
            localStorage.setItem(`nq_gr_${cacheKey}`, resText);
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
  }, [sourceText, keyContext, nativeLanguage]);

  return translated;
}

/**
 * Component to render a localized grammar text node.
 */
export function LocalizedGrammarText({
  text,
  keyContext,
  className,
}: {
  text: string;
  keyContext?: string;
  className?: string;
}) {
  const result = useGrammarTranslation(text, keyContext);
  return React.createElement("span", { className }, result);
}

