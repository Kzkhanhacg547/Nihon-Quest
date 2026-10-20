import { type NativeLanguage } from "@/lib/languages";

export interface KanaI18nDict {
  strokeGuide: string;
  ghostOutline: string;
  watchOrder: string;
  modelChar: string;
  drawHere: string;
  strokesUnit: string;
  undo: string;
  clear: string;
  check: string;
  checking: string;
  great: string;
  passed: string;
  almost: string;
  needPractice: string;
  coverageLabel: string;
  precisionLabel: string;
  allCorrect: string;
  passScoreHint: string;
  savedSuccess: string;
  learnedTitle: string;
  close: string;
  creditNote: string;
  noDataWarn: string;
  audioSpeak: string;
}

export const KANA_I18N: Record<NativeLanguage, KanaI18nDict> = {
  vi: {
    strokeGuide: "Hướng dẫn nét",
    ghostOutline: "Chữ mờ gợi ý",
    watchOrder: "▶ Xem thứ tự nét",
    modelChar: "Chữ mẫu",
    drawHere: "Viết tại đây",
    strokesUnit: "nét",
    undo: "↶ Hoàn tác nét",
    clear: "🗑 Xóa hết",
    check: "Chấm điểm →",
    checking: "Đang chấm…",
    great: "Tuyệt vời! Viết rất chuẩn và đẹp!",
    passed: "Đạt — chuẩn nét mẫu!",
    almost: "Chưa đạt — hãy thử lại",
    needPractice: "Cần luyện thêm nét",
    coverageLabel: "Độ khớp chữ mẫu",
    precisionLabel: "Chuẩn vị trí nét",
    allCorrect: "Số nét, thứ tự và chiều bút hoàn toàn chuẩn xác.",
    passScoreHint: "Cần từ {passScore} điểm, đúng đủ số nét và đúng thứ tự để đạt. Bấm “Xóa hết” và viết lại cẩn thận.",
    savedSuccess: "Đã lưu vào hệ thống ôn tập SRS!",
    learnedTitle: "Đã học: {char} ({romaji})!",
    close: "Đóng",
    creditNote: "Dữ liệu nét: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "Chưa có dữ liệu thứ tự nét cho “{char}”. Bạn vẫn có thể tập viết tự do.",
    audioSpeak: "Nghe phát âm",
  },
  en: {
    strokeGuide: "Stroke Guide",
    ghostOutline: "Ghost Outline",
    watchOrder: "▶ Watch Stroke Order",
    modelChar: "Model Glyph",
    drawHere: "Draw here",
    strokesUnit: "strokes",
    undo: "↶ Undo stroke",
    clear: "🗑 Clear all",
    check: "Check score →",
    checking: "Evaluating…",
    great: "Excellent! Standard and accurate strokes!",
    passed: "Passed — well drawn!",
    almost: "Not quite — please try again",
    needPractice: "Needs more practice",
    coverageLabel: "Glyph match",
    precisionLabel: "Stroke precision",
    allCorrect: "Stroke count, order, and directions are all accurate.",
    passScoreHint: "Requires ≥{passScore} points, exact stroke count, and proper order to pass. Clear and write carefully.",
    savedSuccess: "Saved to your SRS Spaced Repetition queue!",
    learnedTitle: "Mastered: {char} ({romaji})!",
    close: "Close",
    creditNote: "Stroke data: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "No stroke data available for “{char}”. You can still practice freely.",
    audioSpeak: "Listen to pronunciation",
  },
  "zh-CN": {
    strokeGuide: "笔顺引导",
    ghostOutline: "浅色字帖",
    watchOrder: "▶ 观看笔顺",
    modelChar: "范字字帖",
    drawHere: "在此书写",
    strokesUnit: "笔",
    undo: "↶ 撤销上一笔",
    clear: "🗑 全部清除",
    check: "评分 →",
    checking: "正在评分…",
    great: "太棒了！笔顺标准、字形优美！",
    passed: "通过 — 书写标准！",
    almost: "未通过 — 请再试一次",
    needPractice: "需加强字形练习",
    coverageLabel: "字形契合度",
    precisionLabel: "笔画精准度",
    allCorrect: "笔画数、笔顺及运笔方向完全标准。",
    passScoreHint: "需达到 {passScore} 分且笔画数与笔顺均正确方可保存。请清除后重新书写。",
    savedSuccess: "已保存至间隔重复复习库！",
    learnedTitle: "已掌握：{char} ({romaji})！",
    close: "关闭",
    creditNote: "笔顺数据：KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "暂无“{char}”的笔画数据，您仍可自由书写练习。",
    audioSpeak: "听发音",
  },
  "zh-TW": {
    strokeGuide: "筆順引導",
    ghostOutline: "淺色字帖",
    watchOrder: "▶ 觀看筆順",
    modelChar: "範字字帖",
    drawHere: "在此書寫",
    strokesUnit: "筆",
    undo: "↶ 撤銷上一筆",
    clear: "🗑 全部清除",
    check: "評分 →",
    checking: "正在評分…",
    great: "太棒了！筆順標準、字形優美！",
    passed: "通過 — 書寫標準！",
    almost: "未通過 — 請再試一次",
    needPractice: "需加強字形練習",
    coverageLabel: "字形契合度",
    precisionLabel: "筆畫精準度",
    allCorrect: "筆畫數、筆順及運筆方向完全標準。",
    passScoreHint: "需達到 {passScore} 分且筆畫數與筆順均正確方可保存。請清除後重新書寫。",
    savedSuccess: "已保存至間隔重複複習庫！",
    learnedTitle: "已掌握：{char} ({romaji})！",
    close: "關閉",
    creditNote: "筆順數據：KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "暫無「{char}」的筆畫數據，您仍可自由書寫練習。",
    audioSpeak: "聽發音",
  },
  ko: {
    strokeGuide: "획순 가이드",
    ghostOutline: "흐린 글씨",
    watchOrder: "▶ 획순 보기",
    modelChar: "모범 글씨",
    drawHere: "여기에 쓰기",
    strokesUnit: "획",
    undo: "↶ 획 취소",
    clear: "🗑 모두 지우기",
    check: "채점하기 →",
    checking: "채점 중…",
    great: "훌륭합니다! 획순과 글자 모양이 완벽해요!",
    passed: "합격 — 바르게 잘 썼습니다!",
    almost: "아쉬워요 — 다시 시도해보세요",
    needPractice: "더 연습이 필요합니다",
    coverageLabel: "글씨 일치도",
    precisionLabel: "획 위치 정확도",
    allCorrect: "획수, 획순, 획의 방향이 모두 정확합니다.",
    passScoreHint: "{passScore}점 이상 및 올바른 획수와 순서를 지켜야 합격합니다. 지우고 다시 써보세요.",
    savedSuccess: "간격 반복(SRS) 복습 목록에 저장되었습니다!",
    learnedTitle: "학습 완료: {char} ({romaji})!",
    close: "닫기",
    creditNote: "획 데이터: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "“{char}”의 획순 데이터가 없습니다. 자유 연습은 가능합니다.",
    audioSpeak: "발음 듣기",
  },
  fr: {
    strokeGuide: "Guide des traits",
    ghostOutline: "Modèle filigrane",
    watchOrder: "▶ Ordre des traits",
    modelChar: "Modèle",
    drawHere: "Écrivez ici",
    strokesUnit: "traits",
    undo: "↶ Annuler trait",
    clear: "🗑 Tout effacer",
    check: "Évaluer →",
    checking: "Évaluation…",
    great: "Excellent ! Traits nets et respectés !",
    passed: "Réussi — très bien tracé !",
    almost: "Non validé — réessayez",
    needPractice: "Pratique requise",
    coverageLabel: "Correspondance",
    precisionLabel: "Précision",
    allCorrect: "Nombre de traits, ordre et sens parfaitement respectés.",
    passScoreHint: "Exige ≥{passScore} points, bon nombre de traits et ordre exact. Effacez et recommencez.",
    savedSuccess: "Enregistré dans votre révision espacée (SRS) !",
    learnedTitle: "Maîtrisé : {char} ({romaji}) !",
    close: "Fermer",
    creditNote: "Données de traits : KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "Pas de données d'ordre de traits pour « {char} ». Écriture libre disponible.",
    audioSpeak: "Écouter la prononciation",
  },
  es: {
    strokeGuide: "Guía de trazos",
    ghostOutline: "Silueta guía",
    watchOrder: "▶ Ver orden",
    modelChar: "Muestra modelo",
    drawHere: "Dibuja aquí",
    strokesUnit: "trazos",
    undo: "↶ Deshacer trazo",
    clear: "🗑 Borrar todo",
    check: "Calificar →",
    checking: "Calificando…",
    great: "¡Excelente! Trazos precisos y elegantes.",
    passed: "Aprobado — ¡bien hecho!",
    almost: "No superado — inténtalo de nuevo",
    needPractice: "Necesita más práctica",
    coverageLabel: "Ajuste de forma",
    precisionLabel: "Precisión",
    allCorrect: "Número de trazos, orden y sentido totalmente correctos.",
    passScoreHint: "Requiere ≥{passScore} puntos, número de trazos y orden correctos. Borra y dibuja con cuidado.",
    savedSuccess: "¡Guardado en tu lista de repaso espaciado (SRS)!",
    learnedTitle: "¡Dominado: {char} ({romaji})!",
    close: "Cerrar",
    creditNote: "Datos de trazos: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "No hay guía de trazos para “{char}”. Puedes practicar libremente.",
    audioSpeak: "Escuchar pronunciación",
  },
  de: {
    strokeGuide: "Strichführung",
    ghostOutline: "Schattenschrift",
    watchOrder: "▶ Strichfolge ansehen",
    modelChar: "Musterzeichen",
    drawHere: "Hier schreiben",
    strokesUnit: "Striche",
    undo: "↶ Strich zurück",
    clear: "🗑 Alles löschen",
    check: "Bewerten →",
    checking: "Bewertung läuft…",
    great: "Ausgezeichnet! Saubere und exakte Striche!",
    passed: "Bestanden — sehr gut gezeichnet!",
    almost: "Nicht bestanden — bitte noch einmal",
    needPractice: "Mehr Übung erforderlich",
    coverageLabel: "Formtreue",
    precisionLabel: "Präzision",
    allCorrect: "Strichzahl, Reihenfolge und Richtung stimmen exakt.",
    passScoreHint: "Erfordert ≥{passScore} Punkte, korrekte Strichzahl und Reihenfolge. Lösche und zeichne sorgfältig.",
    savedSuccess: "In der SRS-Wiederholungsliste gespeichert!",
    learnedTitle: "Gelernt: {char} ({romaji})!",
    close: "Schließen",
    creditNote: "Strichdaten: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "Keine Strichfolge für „{char}“ verfügbar. Freies Zeichnen möglich.",
    audioSpeak: "Aussprache anhören",
  },
  id: {
    strokeGuide: "Panduan Goresan",
    ghostOutline: "Bayangan Huruf",
    watchOrder: "▶ Lihat Urutan",
    modelChar: "Huruf Contoh",
    drawHere: "Tulis di sini",
    strokesUnit: "goresan",
    undo: "↶ Urungkan goresan",
    clear: "🗑 Hapus semua",
    check: "Nilai tulisan →",
    checking: "Sedang menilai…",
    great: "Luar biasa! Goresan tepat dan rapi!",
    passed: "Lulus — tulisan sangat bagus!",
    almost: "Belum lulus — silakan coba lagi",
    needPractice: "Perlu latihan bentuk huruf",
    coverageLabel: "Kesesuaian bentuk",
    precisionLabel: "Ketepatan posisi",
    allCorrect: "Jumlah goresan, urutan, dan arah semuanya sudah tepat.",
    passScoreHint: "Butuh ≥{passScore} poin, jumlah dan urutan goresan benar untuk lulus. Hapus dan tulis kembali dengan teliti.",
    savedSuccess: "Tersimpan ke jadwal pengulangan SRS!",
    learnedTitle: "Telah dikuasai: {char} ({romaji})!",
    close: "Tutup",
    creditNote: "Data goresan: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "Data goresan belum tersedia untuk “{char}”. Anda tetap bisa latihan bebas.",
    audioSpeak: "Dengarkan pelafalan",
  },
  th: {
    strokeGuide: "แนะนำลำดับเส้น",
    ghostOutline: "ลายเส้นโปร่งใส",
    watchOrder: "▶ ดูลำดับการเขียน",
    modelChar: "ตัวอักษรตัวอย่าง",
    drawHere: "เขียนที่นี่",
    strokesUnit: "เส้น",
    undo: "↶ ย้อนกลับเส้น",
    clear: "🗑 ลบทั้งหมด",
    check: "ตรวจคะแนน →",
    checking: "กำลังตรวจ…",
    great: "ยอดเยี่ยมมาก! ลำดับเส้นสวยงามและถูกต้อง!",
    passed: "ผ่าน — เขียนได้ดีมาก!",
    almost: "ยังไม่ผ่าน — ลองใหม่อีกครั้ง",
    needPractice: "ต้องฝึกฝนเพิ่มเติม",
    coverageLabel: "ความตรงตามรูปทรง",
    precisionLabel: "ความแม่นยำของตำแหน่ง",
    allCorrect: "จำนวนเส้น ลำดับ และทิศทางถูกต้องสมบูรณ์แบบ",
    passScoreHint: "ต้องได้ ≥{passScore} คะแนน พร้อมจำนวนและลำดับเส้นที่ถูกต้องเพื่อบันทึก ลบแล้วเขียนใหม่อย่างตั้งใจ",
    savedSuccess: "บันทึกเข้าสู่ระบบทบทวน SRS แล้ว!",
    learnedTitle: "สำเร็จแล้ว: {char} ({romaji})!",
    close: "ปิด",
    creditNote: "ข้อมูลลำดับเส้น: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "ยังไม่มีข้อมูลลำดับเส้นสำหรับ “{char}” แต่ยังสามารถฝึกเขียนได้อย่างอิสระ",
    audioSpeak: "ฟังเสียงอ่าน",
  },
  ru: {
    strokeGuide: "Подсказка штрихов",
    ghostOutline: "Полупрозрачный контур",
    watchOrder: "▶ Порядок черт",
    modelChar: "Образец знака",
    drawHere: "Пишите здесь",
    strokesUnit: "штрихов",
    undo: "↶ Отменить штрих",
    clear: "🗑 Очистить всё",
    check: "Оценить →",
    checking: "Оценивание…",
    great: "Великолепно! Точные и красивые черты!",
    passed: "Зачёт — отлично написано!",
    almost: "Не совсем точно — попробуйте снова",
    needPractice: "Требуется потренироваться",
    coverageLabel: "Соответствие форме",
    precisionLabel: "Точность положения",
    allCorrect: "Число черт, порядок и направление соблюдены верно.",
    passScoreHint: "Нужно ≥{passScore} баллов, верное число черт и правильный порядок. Сотрите и напишите аккуратно.",
    savedSuccess: "Сохранено в интервальное повторение SRS!",
    learnedTitle: "Освоено: {char} ({romaji})!",
    close: "Закрыть",
    creditNote: "Данные черт: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "Для знака «{char}» нет данных о порядке черт. Доступно свободное рисование.",
    audioSpeak: "Прослушать произношение",
  },
  pt: {
    strokeGuide: "Guia de traços",
    ghostOutline: "Contorno suave",
    watchOrder: "▶ Ver ordem dos traços",
    modelChar: "Modelo",
    drawHere: "Escreva aqui",
    strokesUnit: "traços",
    undo: "↶ Desfazer traço",
    clear: "🗑 Limpar tudo",
    check: "Avaliar →",
    checking: "Avaliando…",
    great: "Excelente! Traços precisos e harmoniosos!",
    passed: "Aprovado — muito bem escrito!",
    almost: "Não aprovado — tente novamente",
    needPractice: "Necessita de mais treino",
    coverageLabel: "Fidelidade do traço",
    precisionLabel: "Precisão da posição",
    allCorrect: "Número de traços, ordem e sentido totalmente corretos.",
    passScoreHint: "Exige ≥{passScore} pts, número de traços e ordem corretos. Limpe e escreva com atenção.",
    savedSuccess: "Salvo no sistema de repetição espaçada (SRS)!",
    learnedTitle: "Dominado: {char} ({romaji})!",
    close: "Fechar",
    creditNote: "Dados de traços: KanjiVG (CC BY-SA 3.0)",
    noDataWarn: "Sem dados de traços para “{char}”. Você ainda pode praticar livremente.",
    audioSpeak: "Ouvir pronúncia",
  },
};

export function getKanaI18n(lang: NativeLanguage = "en"): KanaI18nDict {
  return KANA_I18N[lang] || KANA_I18N.en;
}

export function formatIssueMessage(
  kind: "missing" | "extra" | "order" | "direction" | "shape",
  params: {
    diff?: number;
    expected?: number;
    got?: number;
    userStroke?: number;
    targetStroke?: number;
  },
  lang: NativeLanguage = "en"
): string {
  const { diff = 1, expected = 1, got = 1, userStroke = 1, targetStroke = 1 } = params;

  switch (kind) {
    case "missing": {
      switch (lang) {
        case "vi": return `Còn thiếu ${diff} nét (chữ này cần đúng ${expected} nét, bạn mới vẽ ${got} nét).`;
        case "zh-CN": return `缺少 ${diff} 笔（此字共 ${expected} 笔，您仅写了 ${got} 笔）。`;
        case "zh-TW": return `缺少 ${diff} 筆（此字共 ${expected} 筆，您僅寫了 ${got} 筆）。`;
        case "ko": return `${diff}획이 부족합니다 (이 글자는 ${expected}획이며 현재 ${got}획입니다).`;
        case "fr": return `Il manque ${diff} trait(s) : ce caractère comporte ${expected} traits, vous en avez tracé ${got}.`;
        case "es": return `Faltan ${diff} trazo(s): este carácter tiene ${expected} trazos, dibujaste ${got}.`;
        case "de": return `Es fehlen ${diff} Strich(e): Dieses Zeichen hat ${expected} Striche, du hast ${got} gezeichnet.`;
        case "id": return `Kurang ${diff} goresan: karakter ini butuh ${expected} goresan, Anda baru membuat ${got}.`;
        case "th": return `ขาดอีก ${diff} เส้น (ตัวอักษรนี้มี ${expected} เส้น คุณเขียนไป ${got} เส้น)`;
        case "ru": return `Не хватает ${diff} штрих(ов): знак состоит из ${expected} штрихов, у вас ${got}.`;
        case "pt": return `Faltam ${diff} traço(s): este caractere tem ${expected} traços, você desenhou ${got}.`;
        default: return `Missing ${diff} stroke(s): this character has ${expected} strokes, you drew ${got}.`;
      }
    }
    case "extra": {
      switch (lang) {
        case "vi": return `Viết thừa ${diff} nét (chữ này chỉ có ${expected} nét, bạn đã vẽ ${got} nét).`;
        case "zh-CN": return `多写了 ${diff} 笔（此字仅有 ${expected} 笔，您写了 ${got} 笔）。`;
        case "zh-TW": return `多寫了 ${diff} 筆（此字僅有 ${expected} 筆，您寫了 ${got} 筆）。`;
        case "ko": return `${diff}획이 초과되었습니다 (이 글자는 ${expected}획입니다).`;
        case "fr": return `Trop de traits (+${diff}) : ce caractère ne compte que ${expected} traits.`;
        case "es": return `Demasiados trazos (+${diff}): este carácter solo tiene ${expected} trazos.`;
        case "de": return `Zu viele Striche (+${diff}): Dieses Zeichen hat nur ${expected} Striche.`;
        case "id": return `Kelebihan ${diff} goresan: karakter ini hanya memiliki ${expected} goresan.`;
        case "th": return `เกินมา ${diff} เส้น (ตัวอักษรนี้มีเพียง ${expected} เส้น)`;
        case "ru": return `Лишние черты (+${diff}): этот знак имеет только ${expected} штрихов.`;
        case "pt": return `Excesso de ${diff} traço(s): este caractere tem apenas ${expected} traços.`;
        default: return `Too many strokes (+${diff}): this character only has ${expected} strokes, you drew ${got}.`;
      }
    }
    case "order": {
      switch (lang) {
        case "vi": return `Nét ${userStroke} bạn vẽ giống nét ${targetStroke} của mẫu — hãy viết đúng thứ tự từng nét!`;
        case "zh-CN": return `第 ${userStroke} 笔与字帖的第 ${targetStroke} 笔相似 — 请按正确的笔画先后顺序书写！`;
        case "zh-TW": return `第 ${userStroke} 筆與字帖的第 ${targetStroke} 筆相似 — 請按正確的筆畫先後順序書寫！`;
        case "ko": return `${userStroke}번째 획이 ${targetStroke}번째 획과 일치합니다 — 올바른 획순에 맞춰 써주세요!`;
        case "fr": return `Le trait ${userStroke} ressemble au trait ${targetStroke} du modèle — respectez l'ordre des traits !`;
        case "es": return `El trazo ${userStroke} coincide con el trazo ${targetStroke} del modelo — ¡sigue el orden correcto!`;
        case "de": return `Strich ${userStroke} entspricht Strich ${targetStroke} der Vorlage — beachte die Strichfolge!`;
        case "id": return `Goresan ${userStroke} mirip goresan ${targetStroke} contoh — tulis sesuai urutan goresan!`;
        case "th": return `เส้นที่ ${userStroke} ตรงกับเส้นที่ ${targetStroke} ของตัวอย่าง — โปรดเขียนตามลำดับเส้นที่ถูกต้อง!`;
        case "ru": return `Штрих ${userStroke} совпадает со штрихом ${targetStroke} образца — пишите в правильном порядке!`;
        case "pt": return `O traço ${userStroke} parece o traço ${targetStroke} do modelo — siga a ordem correta dos traços!`;
        default: return `Stroke ${userStroke} resembles stroke ${targetStroke} of the model — please follow the correct stroke order!`;
      }
    }
    case "direction": {
      switch (lang) {
        case "vi": return `Nét ${userStroke} đang vẽ ngược hướng — hãy vẽ theo chiều mũi tên hướng dẫn!`;
        case "zh-CN": return `第 ${userStroke} 笔书写方向相反 — 请沿箭头指示方向运笔！`;
        case "zh-TW": return `第 ${userStroke} 筆書寫方向相反 — 請沿箭頭指示方向運筆！`;
        case "ko": return `${userStroke}번째 획의 방향이 반대입니다 — 화살표 방향을 따라 그어주세요!`;
        case "fr": return `Le trait ${userStroke} est tracé à l'envers — suivez le sens des flèches guides !`;
        case "es": return `El trazo ${userStroke} está invertido — sigue la dirección de las flechas guía!`;
        case "de": return `Strich ${userStroke} in falscher Richtung gezogen — folge den Richtungspfeilen!`;
        case "id": return `Goresan ${userStroke} terbalik arahnya — ikuti arah tanda panah panduan!`;
        case "th": return `เส้นที่ ${userStroke} ลากผิดทิศทาง — โปรดลากตามทิศทางลูกศรนำทาง!`;
        case "ru": return `Штрих ${userStroke} нарисован в обратном направлении — следуйте стрелкам-подсказкам!`;
        case "pt": return `O traço ${userStroke} foi desenhado no sentido inverso — siga as setas indicativas!`;
        default: return `Stroke ${userStroke} was drawn backwards — follow the guide arrows!`;
      }
    }
    case "shape": {
      switch (lang) {
        case "vi": return `Nét ${userStroke} chưa đúng hình dáng hoặc vị trí chữ mẫu.`;
        case "zh-CN": return `第 ${userStroke} 笔形状或起止位置与字帖不符。`;
        case "zh-TW": return `第 ${userStroke} 筆形狀或起止位置與字帖不符。`;
        case "ko": return `${userStroke}번째 획의 형태 또는 위치가 모범 글씨와 일치하지 않습니다.`;
        case "fr": return `Le trait ${userStroke} ne correspond pas à la forme ou la position du modèle.`;
        case "es": return `El trazo ${userStroke} no coincide con la forma o posición del modelo.`;
        case "de": return `Strich ${userStroke} weicht von Form oder Position der Vorlage ab.`;
        case "id": return `Goresan ${userStroke} belum sesuai dengan bentuk atau posisi contoh.`;
        case "th": return `เส้นที่ ${userStroke} ไม่ตรงกับรูปร่างหรือตำแหน่งของตัวอย่าง`;
        case "ru": return `Штрих ${userStroke} не соответствует форме или положению образца.`;
        case "pt": return `O traço ${userStroke} não corresponde à forma ou posição do modelo.`;
        default: return `Stroke ${userStroke} does not match the shape or position of the model.`;
      }
    }
  }
}

