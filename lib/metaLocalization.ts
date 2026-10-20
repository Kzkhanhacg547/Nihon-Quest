/**
 * Meta Progression Internationalization (i18n) Engine
 *
 * Covers:
 * 1. Journey Locations (Tokyo, Kyoto, Nara, Osaka, Nagoya, Fuji, Hiroshima, Hokkaido, Okinawa)
 * 2. Daily Missions (learn-5-kana, complete-1-lesson, review-10-srs)
 * 3. Master Achievements / Badges
 */

import type { NativeLanguage } from "@/components/LanguageContext";

export interface LocalizedJourneyLocation {
  name: string;
  description: string;
}

export const JOURNEY_LOCATIONS_I18N: Record<string, Record<"en" | "vi", LocalizedJourneyLocation> & Partial<Record<NativeLanguage, LocalizedJourneyLocation>>> = {
  tokyo: {
    vi: {
      name: "Tokyo",
      description: "Thủ đô hoa lệ — Trung tâm kinh tế, văn hóa hiện đại xen lẫn đền đài cổ kính.",
    },
    en: {
      name: "Tokyo",
      description: "Magnificent Capital — The modern economic and cultural hub blended with ancient temples.",
    },
    "zh-CN": {
      name: "东京",
      description: "繁华之都 — 现代经济文化核心，传统古刹与摩天大楼交相辉映。",
    },
    "zh-TW": {
      name: "東京",
      description: "繁華之都 — 現代經濟文化核心，傳統古剎與摩天大樓交相輝映。",
    },
    ko: {
      name: "도쿄",
      description: "화려한 수도 — 현대 경제와 문화의 중심이자 유서 깊은 사찰이 공존하는 도시.",
    },
    fr: {
      name: "Tokyo",
      description: "Capitale magnifique — Cœur économique et culturel où modernité et temples anciens se côtoient.",
    },
    es: {
      name: "Tokio",
      description: "Capital magnífica — Centro económico y cultural moderno donde conviven rascacielos y templos antiguos.",
    },
    de: {
      name: "Tokio",
      description: "Prachtvolle Hauptstadt — Modernes Wirtschafts- und Kulturzentrum im Einklang mit historischen Tempeln.",
    },
    id: {
      name: "Tokyo",
      description: "Ibu kota megah — Pusat ekonomi dan budaya modern yang berpadu dengan kuil bersejarah.",
    },
    th: {
      name: "โตเกียว",
      description: "มหานครหลวงอันงดงาม — ศูนย์กลางเศรษฐกิจและวัฒนธรรมสมัยใหม่ผสมผสานวัดโบราณ",
    },
    ru: {
      name: "Токио",
      description: "Величественная столица — Современный экономический и культурный центр, где соседствуют древние храмы.",
    },
    pt: {
      name: "Tóquio",
      description: "Capital magnífica — Centro econômico e cultural moderno que une tradição e templos antigos.",
    },
  },
  kyoto: {
    vi: {
      name: "Kyoto",
      description: "Cố đô ngàn năm — Trầm mặc với hàng ngàn ngôi chùa thiền tông và nghệ thuật trà đạo.",
    },
    en: {
      name: "Kyoto",
      description: "Thousand-Year Ancient Capital — Serene with thousands of Zen temples and the art of tea ceremony.",
    },
    "zh-CN": {
      name: "京都",
      description: "千年古都 — 拥有上千座禅宗寺院，沉淀深厚的茶道文化与历史风貌。",
    },
    "zh-TW": {
      name: "京都",
      description: "千年古都 — 擁有上千座禪宗寺院，沉澱深厚的茶道文化與歷史風貌。",
    },
    ko: {
      name: "교토",
      description: "천년의 고도 — 수천 개의 선종 사찰과 다도 예술이 깃든 고요한 도시.",
    },
    fr: {
      name: "Kyoto",
      description: "Capitale millénaire — Empreinte de sérénité avec ses milliers de temples zen et l'art du thé.",
    },
    es: {
      name: "Kioto",
      description: "Antigua capital milenaria — Serena y contemplativa con miles de templos zen y la ceremonia del té.",
    },
    de: {
      name: "Kyōto",
      description: "Jahrtausendealte Kaiserstadt — Ruhe und Gelassenheit mit tausenden Zen-Tempeln und Teekultur.",
    },
    id: {
      name: "Kyoto",
      description: "Kota kuno seribu tahun — Tenang dengan ribuan kuil Zen dan seni upacara minum teh.",
    },
    th: {
      name: "เกียวโต",
      description: "เมืองหลวงพันปี — เงียบสงบด้วยวัดเซนนับพันแห่งและศิลปะพิธีชงชาอันประณีต",
    },
    ru: {
      name: "Киото",
      description: "Древняя тысячелетняя столица — Умиротворённая обитель тысяч дзен-храмов и чайной церемонии.",
    },
    pt: {
      name: "Quioto",
      description: "Antiga capital milenar — Serena, com milhares de templos zen e a arte da cerimônia do chá.",
    },
  },
  nara: {
    vi: {
      name: "Nara",
      description: "Vùng đất thiêng — Nơi đàn hươu tự do dạo bước bên Đại Phật Todai-ji vĩ đại.",
    },
    en: {
      name: "Nara",
      description: "Sacred Land — Where deer roam freely beside the colossal Great Buddha of Todai-ji.",
    },
    "zh-CN": {
      name: "奈良",
      description: "神圣之地 — 灵鹿在宏伟的东大寺大佛旁悠然漫步。",
    },
    "zh-TW": {
      name: "奈良",
      description: "神聖之地 — 靈鹿在宏偉的東大寺大佛旁悠然漫步。",
    },
    ko: {
      name: "나라",
      description: "신성한 땅 — 도다이지 대불 곁에서 사슴들이 자유롭게 노니는 곳.",
    },
    fr: {
      name: "Nara",
      description: "Terre sacrée — Où les cerfs se promènent en liberté près du Grand Bouddha de Todai-ji.",
    },
    es: {
      name: "Nara",
      description: "Tierra sagrada — Donde ciervos libres pasean junto al Gran Buda de Todai-ji.",
    },
    de: {
      name: "Nara",
      description: "Heiliges Land — Wo Hirsche frei neben dem Großen Buddha des Todai-ji grasen.",
    },
    id: {
      name: "Nara",
      description: "Tanah suci — Tempat rusa berkeliaran bebas di samping Patung Buddha Raksasa Todai-ji.",
    },
    th: {
      name: "นารา",
      description: "ดินแดนศักดิ์สิทธิ์ — ฝูงกวางเดินเล่นอย่างอิสระเคียงข้างองค์พระใหญ่โทไดจิ",
    },
    ru: {
      name: "Нара",
      description: "Священная земля — Где священные олени свободно гуляют рядом с Великим Буддой Тодай-дзи.",
    },
    pt: {
      name: "Nara",
      description: "Terra sagrada — Onde os cervos caminham livremente ao lado do Grande Buda de Todai-ji.",
    },
  },
  osaka: {
    vi: {
      name: "Osaka",
      description: "Nhà bếp quốc dân — Thiên đường ẩm thực đường phố và con người phóng khoáng, hài hước.",
    },
    en: {
      name: "Osaka",
      description: "The Nation's Kitchen — A street-food paradise known for hearty, lively, and humor-loving people.",
    },
    "zh-CN": {
      name: "大阪",
      description: "天下厨房 — 街头美食的天堂，民风热情豪爽、风趣幽默。",
    },
    "zh-TW": {
      name: "大阪",
      description: "天下廚房 — 街頭美食的天堂，民風熱情豪爽、風趣幽默。",
    },
    ko: {
      name: "오사카",
      description: "천하의 부엌 — 활기 넘치는 길거리 음식과 유쾌하고 따뜻한 정이 넘치는 도시.",
    },
    fr: {
      name: "Osaka",
      description: "La cuisine du pays — Paradis de la street food, réputé pour la chaleur et la bonne humeur de ses habitants.",
    },
    es: {
      name: "Osaka",
      description: "La cocina de la nación — Paraíso de la comida callejera y gente cálida y divertida.",
    },
    de: {
      name: "Osaka",
      description: "Die Küche der Nation — Street-Food-Paradies mit herzlichen, humorvollen Menschen.",
    },
    id: {
      name: "Osaka",
      description: "Dapur nasional — Surga jajanan kaki lima dengan masyarakat ramah dan humoris.",
    },
    th: {
      name: "โอซาก้า",
      description: "ครัวของแผ่นดิน — สวรรค์ของอาหารริมทางและผู้คนที่เป็นมิตร อารมณ์ดี",
    },
    ru: {
      name: "Осака",
      description: "Кухня нации — Рай уличной еды и родина открытых, жизнерадостных людей.",
    },
    pt: {
      name: "Osaka",
      description: "A cozinha da nação — Paraíso da comida de rua com moradores calorosos e bem-humorados.",
    },
  },
  nagoya: {
    vi: {
      name: "Nagoya",
      description: "Cái nôi samurai — Thành phố lâu đài cá kình vàng và kỹ nghệ rèn gươm huyền thoại.",
    },
    en: {
      name: "Nagoya",
      description: "Cradle of Samurai — City of the golden kinshachi castle and legendary swordcraft.",
    },
    "zh-CN": {
      name: "名古屋",
      description: "武士之乡 — 拥有金鯱城郭与传奇锻刀工艺的历史重镇。",
    },
    "zh-TW": {
      name: "名古屋",
      description: "武士之鄉 — 擁有金鯱城郭與傳奇鍛刀工藝的歷史重鎮。",
    },
    ko: {
      name: "나고야",
      description: "사무라이의 요람 — 황금 샤치호코 성과 전설적인 도검 제작의 도시.",
    },
    fr: {
      name: "Nagoya",
      description: "Berceau des samouraïs — Ville du château aux dauphins d'or et de la forge de sabres légendaires.",
    },
    es: {
      name: "Nagoya",
      description: "Cuna de samuráis — Ciudad del castillo con kinshachi dorados y legendaria forja de espadas.",
    },
    de: {
      name: "Nagoya",
      description: "Wiege der Samurai — Stadt der goldenen Kinshachi-Burg und legendären Schmiedekunst.",
    },
    id: {
      name: "Nagoya",
      description: "Kota para samurai — Kota kastel ikan mas emas dan kerajinan pedang legendaris.",
    },
    th: {
      name: "นาโกย่า",
      description: "แหล่งกำเนิดซามูไร — เมืองแห่งปราสาทปลาคาร์ฟทองคำและศิลปะการตีดาบในตำนาน",
    },
    ru: {
      name: "Нагоя",
      description: "Колыбель самураев — Город замка с золотыми кинсяти и легендарных мастеров меча.",
    },
    pt: {
      name: "Nagoya",
      description: "Berço dos samurais — Cidade do castelo com kinshachi de ouro e forja lendária de espadas.",
    },
  },
  fuji: {
    vi: {
      name: "Fuji & Hakone",
      description: "Kỳ quan linh thiêng — Đỉnh núi tuyết biểu tượng nước Nhật soi bóng hồ Ashi và suối khoáng nóng.",
    },
    en: {
      name: "Fuji & Hakone",
      description: "Sacred Wonder — Japan's iconic snow-capped peak mirrored over Lake Ashi and hot springs.",
    },
    "zh-CN": {
      name: "富士与箱根",
      description: "灵峰奇观 — 日本象征性的白雪富士神山，倒映在芦之湖与温泉之中。",
    },
    "zh-TW": {
      name: "富士與箱根",
      description: "靈峰奇觀 — 日本象徵性的白雪富士神山，倒映在蘆之湖與溫泉之中。",
    },
    ko: {
      name: "후지 & 하코네",
      description: "신령한 기적 — 아시호와 온천에 비치는 일본의 상징적인 눈 덮인 후지산.",
    },
    fr: {
      name: "Fuji & Hakone",
      description: "Merveille sacrée — Le sommet enneigé emblématique du Japon se reflétant sur le lac Ashi et ses onsens.",
    },
    es: {
      name: "Fuji y Hakone",
      description: "Maravilla sagrada — La emblemática cumbre nevada de Japón reflejada en el lago Ashi y aguas termales.",
    },
    de: {
      name: "Fuji & Hakone",
      description: "Heiliges Naturwunder — Japans schneebedeckter Vulkanriese spiegelt sich im Ashi-See.",
    },
    id: {
      name: "Fuji & Hakone",
      description: "Keajaiban suci — Puncak bersalju ikonik Jepang yang terpantul di Danau Ashi dan pemandian air panas.",
    },
    th: {
      name: "ฟูจิ & ฮาโกเน่",
      description: "สิ่งมหัศจรรย์อันศักดิ์สิทธิ์ — ภูเขาไฟฟูจิยอดหิมะสัญลักษณ์แห่งญี่ปุ่นสะท้อนบนทะเลสาบอาชิ",
    },
    ru: {
      name: "Фудзи и Хаконе",
      description: "Священное чудо — Знаменитая заснеженная вершина Японии, отражающаяся в водах озера Аси.",
    },
    pt: {
      name: "Fuji & Hakone",
      description: "Maravilha sagrada — O pico nevado icônico do Japão refletido nas águas do Lago Ashi e fontes termais.",
    },
  },
  hiroshima: {
    vi: {
      name: "Hiroshima",
      description: "Thông điệp hòa bình — Cổng Torii đỏ rực rỡ nổi trên mặt biển vịnh đảo Miyajima.",
    },
    en: {
      name: "Hiroshima",
      description: "Message of Peace — Radiant vermilion Torii gate floating over the sea of Miyajima Bay.",
    },
    "zh-CN": {
      name: "广岛",
      description: "和平誓愿 — 浮于宫岛海湾之上的朱红大鸟居与和平纪念之声。",
    },
    "zh-TW": {
      name: "廣島",
      description: "和平誓願 — 浮於宮島海灣之上的朱紅大鳥居與和平紀念之聲。",
    },
    ko: {
      name: "히로시마",
      description: "평화의 메시지 — 미야지마 바다 위에 우뚝 솟은 선명한 붉은 도리이.",
    },
    fr: {
      name: "Hiroshima",
      description: "Message de paix — Le torii vermillon majestueux flottant sur les eaux de Miyajima.",
    },
    es: {
      name: "Hiroshima",
      description: "Mensaje de paz — La majestuosa puerta Torii bermellón flotando sobre la bahía de Miyajima.",
    },
    de: {
      name: "Hiroshima",
      description: "Botschaft des Friedens — Das leuchtend rote Torii-Tor, das über den Fluten von Miyajima schwebt.",
    },
    id: {
      name: "Hiroshima",
      description: "Pesan perdamaian — Gerbang Torii merah menyala yang mengapung di atas perairan Miyajima.",
    },
    th: {
      name: "ฮิโรชิม่า",
      description: "สารแห่งสันติภาพ — เสาโทริอิสีแดงชาดอันโดดเด่นลอยอยู่เหนือผืนน้ำอ่าวมิยาจิมะ",
    },
    ru: {
      name: "Хиросима",
      description: "Послание мира — Алые врата Тории, величественно парящие над водами залива Миядзима.",
    },
    pt: {
      name: "Hiroshima",
      description: "Mensagem de paz — O vibrante portal Torii vermelho flutuando sobre as águas de Miyajima.",
    },
  },
  hokkaido: {
    vi: {
      name: "Hokkaido",
      description: "Bắc hải băng tuyết — Xứ sở lễ hội tuyết Sapporo, cánh đồng hoa Furano và cua hoàng đế.",
    },
    en: {
      name: "Hokkaido",
      description: "Northern Snow Haven — Land of the Sapporo Snow Festival, Furano flower fields, and king crab.",
    },
    "zh-CN": {
      name: "北海道",
      description: "北海雪国 — 札幌冰雪祭、富良野浪漫花田与顶级帝王蟹的梦幻之地。",
    },
    "zh-TW": {
      name: "北海道",
      description: "北海雪國 — 札幌冰雪祭、富良野浪漫花田與頂級帝王蟹的夢幻之地。",
    },
    ko: {
      name: "홋카이도",
      description: "눈부신 북해 — 삿포로 눈축제, 후라노 꽃밭, 킹크랩이 반기는 설국.",
    },
    fr: {
      name: "Hokkaido",
      description: "Terre de neige du Nord — Royaume du festival de la neige de Sapporo, des champs de fleurs et du crabe royal.",
    },
    es: {
      name: "Hokkaido",
      description: "Tierra norteña de nieve — Festival de nieve de Sapporo, campos floridos de Furano y cangrejo real.",
    },
    de: {
      name: "Hokkaido",
      description: "Schneeparadies des Nordens — Heimat des Sapporo-Schneefestivals und der Furano-Blumenfelder.",
    },
    id: {
      name: "Hokkaido",
      description: "Negeri salju utara — Festival Salju Sapporo, hamparan bunga Furano, dan kepiting raja.",
    },
    th: {
      name: "ฮอกไกโด",
      description: "แดนหิมะตอนเหนือ — เทศกาลหิมะซัปโปโร ทุ่งดอกไม้ฟุราโนะ และปูยักษ์ทาระบะ",
    },
    ru: {
      name: "Хоккайдо",
      description: "Северный край снегов — Родина снежного фестиваля в Саппоро, лавандовых полей и камчатского краба.",
    },
    pt: {
      name: "Hokkaido",
      description: "Paraíso de neve do norte — Festival de neve de Sapporo, campos floridos de Furano e caranguejo real.",
    },
  },
  okinawa: {
    vi: {
      name: "Okinawa",
      description: "Thiên đường biển ngọc — Vương quốc Ryukyu nhiệt đới với điệu đàn Sanshin rộn rã.",
    },
    en: {
      name: "Okinawa",
      description: "Emerald Sea Paradise — Tropical Ryukyu kingdom alive with lively Sanshin melodies.",
    },
    "zh-CN": {
      name: "冲绳",
      description: "翡翠之海天堂 — 充满三线琴悠扬乐声的琉球热带王国。",
    },
    "zh-TW": {
      name: "沖繩",
      description: "翡翠之海天堂 — 充滿三線琴悠揚樂聲的琉球熱帶王國。",
    },
    ko: {
      name: "오키나와",
      description: "에메랄드빛 바다 — 산신 악기 선율이 울려 퍼지는 남국 류큐 왕국의 낙원.",
    },
    fr: {
      name: "Okinawa",
      description: "Paradis aux eaux émeraudes — Royaume tropical de Ryukyu bercé par les mélodies du sanshin.",
    },
    es: {
      name: "Okinawa",
      description: "Paraíso de mar esmeralda — Reino tropical de Ryukyu al son de las melodías de sanshin.",
    },
    de: {
      name: "Okinawa",
      description: "Smaragdgrünes Inselparadies — Tropisches Ryukyu-Königreich im Klang traditioneller Sanshin-Klänge.",
    },
    id: {
      name: "Okinawa",
      description: "Surga laut zamrud — Kerajaan tropis Ryukyu dengan alunan musik sanshin yang riang.",
    },
    th: {
      name: "โอกินาว่า",
      description: "สรวงสวรรค์ทะเลมรกต — อาณาจักรริวกิวเขตร้อนขับกล่อมด้วยเสียงดนตรีซันชิน",
    },
    ru: {
      name: "Окинава",
      description: "Изумрудный рай — Тропическое королевство Рюкю под жизнерадостные звуки сансина.",
    },
    pt: {
      name: "Okinawa",
      description: "Paraíso de mar esmeralda — Reino tropical de Ryukyu ao som alegre do sanshin.",
    },
  },
};

export function getLocalizedJourneyDescription(slug: string, lang: NativeLanguage, fallback: string): string {
  const item = JOURNEY_LOCATIONS_I18N[slug];
  if (!item) return fallback;
  if (lang === "vi") return item.vi?.description || fallback;
  return item[lang]?.description || item.en?.description || fallback;
}

export function getLocalizedJourneyName(slug: string, lang: NativeLanguage, fallback: string): string {
  const item = JOURNEY_LOCATIONS_I18N[slug];
  if (!item) return fallback;
  if (lang === "vi") return item.vi?.name || fallback;
  return item[lang]?.name || item.en?.name || fallback;
}

export interface LocalizedDailyMission {
  title: string;
  description: string;
}

export const DAILY_MISSIONS_I18N: Record<string, Record<"en" | "vi", LocalizedDailyMission> & Partial<Record<NativeLanguage, LocalizedDailyMission>>> = {
  "learn-5-kana": {
    vi: {
      title: "Luyện 5 ký tự Kana",
      description: "Ôn tập hoặc học 5 ký tự Hiragana/Katakana.",
    },
    en: {
      title: "Practice 5 Kana Characters",
      description: "Review or master 5 Hiragana/Katakana characters.",
    },
    "zh-CN": {
      title: "练习 5 个假名字母",
      description: "复习或学习 5 个平假名/片假名。",
    },
    "zh-TW": {
      title: "練習 5 個假名字母",
      description: "複習或學習 5 個平假名/片假名。",
    },
    ko: {
      title: "가나 문자 5개 연습",
      description: "히라가나/가타카나 5자를 복습하거나 학습합니다.",
    },
    fr: {
      title: "Pratiquer 5 caractères Kana",
      description: "Révisez ou apprenez 5 caractères Hiragana/Katakana.",
    },
    es: {
      title: "Practica 5 caracteres Kana",
      description: "Repasa o aprende 5 caracteres Hiragana/Katakana.",
    },
    de: {
      title: "5 Kana-Zeichen üben",
      description: "Wiederhole oder lerne 5 Hiragana/Katakana-Zeichen.",
    },
    id: {
      title: "Latih 5 Karakter Kana",
      description: "Ulas atau pelajari 5 karakter Hiragana/Katakana.",
    },
    th: {
      title: "ฝึกคานะ 5 ตัวอักษร",
      description: "ทบทวนหรือเรียนรู้ตัวอักษรฮิรางานะ/คาตาคานะ 5 ตัว",
    },
    ru: {
      title: "Выучить 5 знаков Каны",
      description: "Повторите или выучите 5 знаков Хираганы или Катаканы.",
    },
    pt: {
      title: "Praticar 5 Caracteres Kana",
      description: "Revise ou aprenda 5 caracteres Hiragana/Katakana.",
    },
  },
  "complete-1-lesson": {
    vi: {
      title: "Hoàn thành 1 bài học",
      description: "Vượt qua thử thách một bài học bất kỳ.",
    },
    en: {
      title: "Complete 1 Lesson",
      description: "Pass all exercises and challenges in any lesson.",
    },
    "zh-CN": {
      title: "完成 1 堂课程",
      description: "通过任意一堂课程的所有练习与挑战。",
    },
    "zh-TW": {
      title: "完成 1 堂課程",
      description: "通過任意一堂課程的所有練習與挑戰。",
    },
    ko: {
      title: "레슨 1개 완료",
      description: "원하는 레슨의 연습과 챌린지를 완수합니다.",
    },
    fr: {
      title: "Terminer 1 leçon",
      description: "Réussissez tous les exercices d'une leçon.",
    },
    es: {
      title: "Completa 1 lección",
      description: "Supera todos los ejercicios y desafíos de una lección.",
    },
    de: {
      title: "1 Lektion abschließen",
      description: "Meistere alle Übungen einer beliebigen Lektion.",
    },
    id: {
      title: "Selesaikan 1 Pelajaran",
      description: "Selesaikan semua latihan dalam satu pelajaran pilihan.",
    },
    th: {
      title: "เรียนจบ 1 บทเรียน",
      description: "ผ่านแบบฝึกหัดและการทดสอบในบทเรียนใดก็ได้ 1 บท",
    },
    ru: {
      title: "Завершить 1 урок",
      description: "Пройдите все упражнения в любом выбранном уроке.",
    },
    pt: {
      title: "Concluir 1 Lição",
      description: "Supere todos os exercícios de qualquer lição.",
    },
  },
  "review-10-srs": {
    vi: {
      title: "Ôn tập 10 thẻ SRS",
      description: "Luyện trí nhớ dài hạn với flashcard thông minh.",
    },
    en: {
      title: "Review 10 SRS Flashcards",
      description: "Strengthen long-term memory with smart spaced repetition.",
    },
    "zh-CN": {
      title: "复习 10 张 SRS 卡片",
      description: "通过智能间隔重复强化长期记忆。",
    },
    "zh-TW": {
      title: "複習 10 張 SRS 卡片",
      description: "通過智能間隔重複強化長期記憶。",
    },
    ko: {
      title: "SRS 카드 10장 복습",
      description: "스마트 간격 반복으로 장기 기억을 강화합니다.",
    },
    fr: {
      title: "Révisez 10 cartes SRS",
      description: "Renforcez votre mémoire à long terme avec la répétition espacée.",
    },
    es: {
      title: "Repasa 10 tarjetas SRS",
      description: "Fortalece la memoria a largo plazo con repetición espaciada inteligente.",
    },
    de: {
      title: "10 SRS-Karten wiederholen",
      description: "Stärke das Langzeitgedächtnis mit intelligenter Spaced Repetition.",
    },
    id: {
      title: "Tinjau 10 Kartu SRS",
      description: "Perkuat memori jangka panjang dengan pengulangan berspasi pintar.",
    },
    th: {
      title: "ทบทวนการ์ด SRS 10 ใบ",
      description: "เสริมความจำระยะยาวด้วยระบบแฟลชการ์ดเว้นระยะอัจฉริยะ",
    },
    ru: {
      title: "Повторить 10 карточек SRS",
      description: "Укрепите долговременную память с умным интервальным повторением.",
    },
    pt: {
      title: "Revisar 10 Cartões SRS",
      description: "Fortaleça a memória de longo prazo com repetição espaçada inteligente.",
    },
  },
};

export function getLocalizedMissionTitle(key: string, lang: NativeLanguage, fallback: string): string {
  const item = DAILY_MISSIONS_I18N[key];
  if (!item) return fallback;
  if (lang === "vi") return item.vi?.title || fallback;
  return item[lang]?.title || item.en?.title || fallback;
}

export function getLocalizedMissionDesc(key: string, lang: NativeLanguage, fallback: string): string {
  const item = DAILY_MISSIONS_I18N[key];
  if (!item) return fallback;
  if (lang === "vi") return item.vi?.description || fallback;
  return item[lang]?.description || item.en?.description || fallback;
}

