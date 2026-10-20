import type { NativeLanguage } from "@/components/LanguageContext";

export interface BadgeLocalizationEntry {
  desc: string;
  hint: string;
  action: string;
}

export const BADGE_I18N: Record<string, Partial<Record<string, BadgeLocalizationEntry>>> = {
  "first-steps": {
    fr: {
      desc: "Complétez l'intégration et préparez-vous à conquérir le japonais.",
      hint: "Terminez le processus d'intégration initiale (Onboarding).",
      action: "Aller aux leçons",
    },
    "zh-CN": {
      desc: "完成新手入门引导，准备开启日语征程。",
      hint: "完成新手入门引导流程 (Onboarding)。",
      action: "前往课程",
    },
    "zh-TW": {
      desc: "完成新手入門引導，準備開啟日語征程。",
      hint: "完成新手入門引導流程 (Onboarding)。",
      action: "前往課程",
    },
    en: {
      desc: "Complete onboarding and prepare to conquer Japanese.",
      hint: "Complete the onboarding process.",
      action: "Go to Lessons",
    },
    ko: {
      desc: "온보딩을 완료하고 일본어 정복을 준비하세요.",
      hint: "초기 온보딩 과정을 완료합니다.",
      action: "레슨으로 이동",
    },
    es: {
      desc: "Completa la incorporación y prepárate para conquistar el japonés.",
      hint: "Completa el proceso de incorporación.",
      action: "Ir a lecciones",
    },
    de: {
      desc: "Schließe das Onboarding ab und mache dich bereit für Japanisch.",
      hint: "Schließe den Onboarding-Prozess ab.",
      action: "Zu den Lektionen",
    },
    id: {
      desc: "Selesaikan orientasi awal dan bersiap taklukkan bahasa Jepang.",
      hint: "Selesaikan proses orientasi.",
      action: "Ke Pelajaran",
    },
    th: {
      desc: "เสร็จสิ้นการเริ่มต้นใช้งานและเตรียมพร้อมพิชิตภาษาญี่ปุ่น",
      hint: "เสร็จสิ้นขั้นตอนการเริ่มต้นใช้งาน (Onboarding)",
      action: "ไปยังบทเรียน",
    },
    ru: {
      desc: "Завершите вводный курс и приготовьтесь покорять японский язык.",
      hint: "Пройдите процесс адаптации.",
      action: "К урокам",
    },
    pt: {
      desc: "Conclua a integração e prepare-se para dominar o japonês.",
      hint: "Conclua o processo de integração.",
      action: "Ir para Lições",
    },
  },
  "kana-starter": {
    fr: {
      desc: "Maîtrisez les 5 premiers caractères Hiragana / Katakana.",
      hint: "Pratiquez et maîtrisez 5 caractères dans le Labo Kana.",
      action: "Entrer dans le Labo Kana",
    },
    "zh-CN": {
      desc: "掌握最初的 5 个平假名/片假名。",
      hint: "在假名实验室掌握 5 个假名字母。",
      action: "进入假名实验室",
    },
    "zh-TW": {
      desc: "掌握最初的 5 個平假名/片假名。",
      hint: "在假名實驗室掌握 5 個假名字母。",
      action: "進入假名實驗室",
    },
    en: {
      desc: "Master the first 5 Hiragana / Katakana characters.",
      hint: "Practice and master 5 characters in Kana Lab.",
      action: "Go to Kana Lab",
    },
    ko: {
      desc: "처음 5개의 히라가나/가타카나 문자를 마스터하세요.",
      hint: "가나 연구소에서 5개의 문자를 마스터하세요.",
      action: "가나 랩으로 이동",
    },
    es: {
      desc: "Domina los primeros 5 caracteres Hiragana / Katakana.",
      hint: "Practica y domina 5 caracteres en el Laboratorio Kana.",
      action: "Ir a Laboratorio Kana",
    },
    de: {
      desc: "Meistere die ersten 5 Hiragana- / Katakana-Zeichen.",
      hint: "Übe und meistere 5 Zeichen im Kana-Labor.",
      action: "Zum Kana-Labor",
    },
    id: {
      desc: "Kuasai 5 karakter Hiragana / Katakana pertama.",
      hint: "Latih dan kuasai 5 karakter di Lab Kana.",
      action: "Ke Kana Lab",
    },
    th: {
      desc: "ฝึกฝนตัวอักษรฮิรางานะ / คาตาคานะ 5 ตัวแรกให้เชี่ยวชาญ",
      hint: "ฝึกฝนและทำความคุ้นเคยกับตัวอักษร 5 ตัวในแล็บคานะ",
      action: "เข้าสู่คานะแล็บ",
    },
    ru: {
      desc: "Освойте первые 5 знаков Хираганы или Катаканы.",
      hint: "Выучите 5 знаков в Лаборатории Каны.",
      action: "В Лабораторию Каны",
    },
    pt: {
      desc: "Domine os primeiros 5 caracteres Hiragana / Katakana.",
      hint: "Pratique e domine 5 caracteres no Laboratório Kana.",
      action: "Ir para o Laboratório Kana",
    },
  },
  "lesson-complete-1": {
    fr: {
      desc: "Terminez votre première leçon dans le parcours Nihon Quest.",
      hint: "Complétez 1 leçon quelconque dans la section Leçons.",
      action: "Commencer la 1re leçon",
    },
    "zh-CN": {
      desc: "完成 Nihon Quest 学习路线中的第一堂课。",
      hint: "在课程库中完成任意 1 节课。",
      action: "开始第一课",
    },
    "zh-TW": {
      desc: "完成 Nihon Quest 學習路線中的第一堂課。",
      hint: "在課程庫中完成任意 1 節課。",
      action: "開始第一課",
    },
    en: {
      desc: "Complete the first lesson in Nihon Quest.",
      hint: "Complete any 1 lesson in the Lessons section.",
      action: "Start First Lesson",
    },
    ko: {
      desc: "Nihon Quest의 첫 번째 레슨을 완료하세요.",
      hint: "레슨 섹션에서 1개의 레슨을 완료하세요.",
      action: "첫 레슨 시작",
    },
    es: {
      desc: "Completa la primera lección en Nihon Quest.",
      hint: "Completa 1 lección cualquiera en la sección de Lecciones.",
      action: "Empezar primera lección",
    },
    de: {
      desc: "Schließe die erste Lektion in Nihon Quest ab.",
      hint: "Schließe 1 beliebige Lektion im Lektionen-Bereich ab.",
      action: "Erste Lektion starten",
    },
    id: {
      desc: "Selesaikan pelajaran pertama Anda di Nihon Quest.",
      hint: "Selesaikan 1 pelajaran apa pun di bagian Pelajaran.",
      action: "Mulai Pelajaran Pertama",
    },
    th: {
      desc: "เรียนจบบทเรียนแรกในหลักสูตร Nihon Quest",
      hint: "เรียนจบ 1 บทเรียนใดก็ได้ในหมวดบทเรียน",
      action: "เริ่มบทเรียนแรก",
    },
    ru: {
      desc: "Завершите свой первый урок в Nihon Quest.",
      hint: "Пройдите 1 любой урок в разделе уроков.",
      action: "Начать первый урок",
    },
    pt: {
      desc: "Conclua a primeira lição no Nihon Quest.",
      hint: "Conclua 1 lição qualquer na seção de Lições.",
      action: "Começar primeira lição",
    },
  },
  "xp-500": {
    fr: {
      desc: "Atteignez 500 points d'expérience totale (XP).",
      hint: "Cumulez au moins 500 XP grâce à vos activités d'apprentissage.",
      action: "Explorer la carte",
    },
    "zh-CN": {
      desc: "累计获得 500 点总经验值 (XP)。",
      hint: "通过各项学习活动累计至少 500 XP。",
      action: "探索新干线地图",
    },
    "zh-TW": {
      desc: "累計獲得 500 點總經驗值 (XP)。",
      hint: "通過各項學習活動累計至少 500 XP。",
      action: "探索新幹線地圖",
    },
    en: {
      desc: "Reach 500 total accumulated XP.",
      hint: "Accumulate at least 500 XP from learning activities.",
      action: "Explore Map",
    },
    ko: {
      desc: "누적 500 XP를 달성하세요.",
      hint: "다양한 학습 활동으로 최소 500 XP를 모으세요.",
      action: "지도 탐험하기",
    },
    es: {
      desc: "Alcanza 500 puntos de experiencia (XP) acumulados.",
      hint: "Acumula al menos 500 XP con actividades de estudio.",
      action: "Explorar mapa",
    },
    de: {
      desc: "Erreiche 500 gesammelte Erfahrungspunkte (XP).",
      hint: "Sammle mindestens 500 XP durch Lernaktivitäten.",
      action: "Karte erkunden",
    },
    id: {
      desc: "Capai total 500 XP yang terkumpul.",
      hint: "Kumpulkan setidaknya 500 XP dari aktivitas belajar.",
      action: "Jelajahi Peta",
    },
    th: {
      desc: "สะสมคะแนนประสบการณ์รวมครบ 500 XP",
      hint: "สะสมอย่างน้อย 500 XP จากกิจกรรมการเรียนรู้",
      action: "สำรวจแผนที่",
    },
    ru: {
      desc: "Наберите 500 очков опыта (XP).",
      hint: "Накопите не менее 500 XP в процессе обучения.",
      action: "Исследовать карту",
    },
    pt: {
      desc: "Alcance 500 pontos de experiência (XP) acumulados.",
      hint: "Acumule pelo menos 500 XP com atividades de estudo.",
      action: "Explorar mapa",
    },
  },
  "tokyo-unlocked": {
    fr: {
      desc: "Tamponnez votre première étape dans la capitale Tokyo.",
      hint: "Explorez et réussissez le défi de la station de Tokyo.",
      action: "Explorer Tokyo",
    },
    "zh-CN": {
      desc: "在首都东京完成第一站打卡盖章。",
      hint: "在新干线地图上探索并攻克东京站挑战。",
      action: "探索东京站",
    },
    "zh-TW": {
      desc: "在首都東京完成第一站打卡蓋章。",
      hint: "在新幹線地圖上探索並攻克東京站挑戰。",
      action: "探索東京站",
    },
    en: {
      desc: "Stamp your first stop in Tokyo.",
      hint: "Explore and pass the Tokyo station challenge.",
      action: "Explore Tokyo",
    },
    ko: {
      desc: "수도 도쿄에서 첫 번째 스탬프를 찍으세요.",
      hint: "도쿄 역 챌린지를 탐험하고 완료하세요.",
      action: "도쿄 탐험하기",
    },
    es: {
      desc: "Sella tu primera parada en Tokio.",
      hint: "Explora y supera el desafío de la estación de Tokio.",
      action: "Explorar Tokio",
    },
    de: {
      desc: "Setze deinen ersten Stempel in Tokio.",
      hint: "Erkunde und bestehe die Herausforderung der Tokio-Station.",
      action: "Tokio erkunden",
    },
    id: {
      desc: "Cap stempel perhentian pertama Anda di Tokyo.",
      hint: "Jelajahi dan lewati tantangan stasiun Tokyo.",
      action: "Jelajahi Tokyo",
    },
    th: {
      desc: "ประทับตราสถานีแรก ณ กรุงโตเกียว",
      hint: "สำรวจและผ่านการทดสอบของสถานีโตเกียว",
      action: "สำรวจโตเกียว",
    },
    ru: {
      desc: "Поставьте первую печать на остановке в Токио.",
      hint: "Исследуйте и пройдите испытание станции Токио.",
      action: "Исследовать Токио",
    },
    pt: {
      desc: "Carimbe sua primeira parada em Tóquio.",
      hint: "Explore e supere o desafio da estação de Tóquio.",
      action: "Explorar Tóquio",
    },
  },
  "kyoto-temple": {
    fr: {
      desc: "Explorez l'ancienne capitale Kyoto et ses temples zen millénaires.",
      hint: "Atteignez 180 XP et complétez l'étape de Kyoto.",
      action: "Aller à Kyoto",
    },
    "zh-CN": {
      desc: "探索千寺沉静的千年古都京都。",
      hint: "达到 180 XP 并完成京都站任务。",
      action: "前往京都",
    },
    "zh-TW": {
      desc: "探索千寺沉靜的千年古都京都。",
      hint: "達到 180 XP 並完成京都站任務。",
      action: "前往京都",
    },
    en: {
      desc: "Explore historic Kyoto with its timeless Zen temples.",
      hint: "Reach 180 XP and complete the Kyoto station.",
      action: "Go to Kyoto",
    },
    ko: {
      desc: "수천 개의 사찰이 있는 천년 고도 교토를 탐험하세요.",
      hint: "180 XP를 획득하고 교토 스테이지를 완료하세요.",
      action: "교토로 이동",
    },
    es: {
      desc: "Explora la histórica Kioto y sus templos zen milenarios.",
      hint: "Alcanza 180 XP y completa la parada de Kioto.",
      action: "Ir a Kioto",
    },
    de: {
      desc: "Erkunde das historische Kyōto mit seinen jahrhundertealten Tempeln.",
      hint: "Erreiche 180 XP und schließe die Kyōto-Station ab.",
      action: "Nach Kyōto",
    },
    id: {
      desc: "Jelajahi kota kuno Kyoto dengan ribuan kuil Zen bersejarah.",
      hint: "Capai 180 XP dan selesaikan stasiun Kyoto.",
      action: "Ke Kyoto",
    },
    th: {
      desc: "สำรวจเมืองเก่าเกียวโตที่มีวัดเซนอันเงียบสงบนับพันแห่ง",
      hint: "สะสม 180 XP และผ่านสถานีเกียวโต",
      action: "ไปเกียวโต",
    },
    ru: {
      desc: "Исследуйте древний Киото с его тысячелетними дзен-храмами.",
      hint: "Наберите 180 XP и пройдите станцию Киото.",
      action: "В Киото",
    },
    pt: {
      desc: "Explore a histórica Quioto com seus templos zen milenares.",
      hint: "Alcance 180 XP e conclua a parada de Quioto.",
      action: "Ir para Quioto",
    },
  },
  "nara-deer": {
    fr: {
      desc: "Découvrez le patrimoine historique de Nara et ses cerfs sacrés.",
      hint: "Atteignez 380 XP et complétez l'étape de Nara.",
      action: "Aller à Nara",
    },
    "zh-CN": {
      desc: "探索世界遗产奈良，与神鹿亲密互动。",
      hint: "达到 380 XP 并完成奈良站任务。",
      action: "前往奈良",
    },
    "zh-TW": {
      desc: "探索世界遺產奈良，與神鹿親密互動。",
      hint: "達到 380 XP 並完成奈良站任務。",
      action: "前往奈良",
    },
    en: {
      desc: "Explore historic Nara and meet the sacred deer.",
      hint: "Reach 380 XP and complete the Nara station.",
      action: "Go to Nara",
    },
    ko: {
      desc: "역사적인 나라를 탐험하고 신성한 사슴들을 만나보세요.",
      hint: "380 XP를 획득하고 나라 스테이지를 완료하세요.",
      action: "나라로 이동",
    },
    es: {
      desc: "Explora la histórica Nara y conoce a los ciervos sagrados.",
      hint: "Alcanza 380 XP y completa la parada de Nara.",
      action: "Ir a Nara",
    },
    de: {
      desc: "Erkunde das historische Nara und triff die heiligen Hirsche.",
      hint: "Erreiche 380 XP und schließe die Nara-Station ab.",
      action: "Nach Nara",
    },
    id: {
      desc: "Jelajahi situs bersejarah Nara dan jumpai rusa suci.",
      hint: "Capai 380 XP dan selesaikan stasiun Nara.",
      action: "Ke Nara",
    },
    th: {
      desc: "สำรวจเมืองประวัติศาสตร์นาราและพบกับฝูงกวางศักดิ์สิทธิ์",
      hint: "สะสม 380 XP และผ่านสถานีนารา",
      action: "ไปนารา",
    },
    ru: {
      desc: "Исследуйте древнюю Нару и познакомьтесь со священными оленями.",
      hint: "Наберите 380 XP и пройдите станцию Нара.",
      action: "В Нару",
    },
    pt: {
      desc: "Explore a histórica Nara e conheça os cervos sagrados.",
      hint: "Alcance 380 XP e conclua a parada de Nara.",
      action: "Ir para Nara",
    },
  },
  "osaka-foodie": {
    fr: {
      desc: "Savourez la street food d'Osaka et ses takoyaki authentiques.",
      hint: "Débloquez l'étape d'Osaka sur la carte Shinkansen.",
      action: "Aller à Osaka",
    },
    "zh-CN": {
      desc: "在日本美食厨房大阪品尝章鱼烧地道风味。",
      hint: "在新干线地图上解锁大阪站。",
      action: "前往大阪",
    },
    "zh-TW": {
      desc: "在日本美食廚房大阪品嚐章魚燒道地風味。",
      hint: "在新幹線地圖上解鎖大阪站。",
      action: "前往大阪",
    },
    en: {
      desc: "Savor vibrant street food in Osaka's culinary kitchen.",
      hint: "Unlock the Osaka station on the Shinkansen journey.",
      action: "Go to Osaka",
    },
    ko: {
      desc: "오사카의 부엌에서 타코야키 등 길거리 음식을 즐기세요.",
      hint: "신칸센 지도에서 오사카 역을 잠금 해제하세요.",
      action: "오사카로 이동",
    },
    es: {
      desc: "Saborea la comida callejera en la cocina culinaria de Osaka.",
      hint: "Desbloquea la parada de Osaka en el viaje del Shinkansen.",
      action: "Ir a Osaka",
    },
    de: {
      desc: "Genieße lebendige Street-Food-Kultur in der Küche Osakas.",
      hint: "Schalte die Osaka-Station auf der Shinkansen-Karte frei.",
      action: "Nach Osaka",
    },
    id: {
      desc: "Nikmati kelezatan jajanan kaki lima khas Osaka.",
      hint: "Buka kunci stasiun Osaka pada rute Shinkansen.",
      action: "Ke Osaka",
    },
    th: {
      desc: "ลิ้มลองอาหารริมทางอันเลื่องชื่อ ณ ครัวโอซาก้า",
      hint: "ปลดล็อกสถานีโอซาก้าบนแผนที่ชินคันเซ็น",
      action: "ไปโอซาก้า",
    },
    ru: {
      desc: "Попробуйте уличную еду в кулинарной столице Осаки.",
      hint: "Разблокируйте станцию Осака на карте Синкансэн.",
      action: "В Осаку",
    },
    pt: {
      desc: "Saboreie a comida de rua na capital gastronômica de Osaka.",
      hint: "Desbloqueie a estação de Osaka no Shinkansen.",
      action: "Ir para Osaka",
    },
  },
  "fuji-conqueror": {
    fr: {
      desc: "Admirez le mont Fuji sacré se reflétant sur le lac Ashi.",
      hint: "Débloquez l'étape Fuji & Hakone dans votre périple.",
      action: "Aller au mont Fuji",
    },
    "zh-CN": {
      desc: "在芦之湖畔远眺富士神山的壮美倒影。",
      hint: "在学习旅途中解锁富士与箱根站。",
      action: "前往富士山",
    },
    "zh-TW": {
      desc: "在蘆之湖畔遠眺富士神山的壯美倒影。",
      hint: "在學習旅途中解鎖富士與箱根站。",
      action: "前往富士山",
    },
    en: {
      desc: "Admire sacred Mt. Fuji mirrored over Lake Ashi.",
      hint: "Unlock the Fuji & Hakone stop on your journey.",
      action: "Go to Mt. Fuji",
    },
    ko: {
      desc: "아시호에 비친 신성한 후지산의 절경을 감상하세요.",
      hint: "여정에서 후지 & 하코네 역을 잠금 해제하세요.",
      action: "후지산으로 이동",
    },
    es: {
      desc: "Admira el sagrado Monte Fuji reflejado en el lago Ashi.",
      hint: "Desbloquea la parada de Fuji y Hakone en tu viaje.",
      action: "Ir al Monte Fuji",
    },
    de: {
      desc: "Bewundere den heiligen Fuji über dem Ashi-See.",
      hint: "Schalte die Fuji- & Hakone-Station auf deiner Reise frei.",
      action: "Zum Fuji",
    },
    id: {
      desc: "Kagumi keindahan Gunung Fuji suci di Danau Ashi.",
      hint: "Buka kunci perhentian Fuji & Hakone dalam perjalanan Anda.",
      action: "Ke Gunung Fuji",
    },
    th: {
      desc: "ชื่นชมภูเขาไฟฟูจิอันศักดิ์สิทธิ์ที่สะท้อนบนผืนน้ำทะเลสาบอาชิ",
      hint: "ปลดล็อกสถานีฟูจิ & ฮาโกเน่บนเส้นทางท่องเที่ยว",
      action: "ไปภูเขาไฟฟูจิ",
    },
    ru: {
      desc: "Полюбуйтесь священной горой Фудзи над озером Аси.",
      hint: "Разблокируйте остановку Фудзи и Хаконе на маршруте.",
      action: "К горе Фудзи",
    },
    pt: {
      desc: "Admire o sagrado Monte Fuji refletido sobre o Lago Ashi.",
      hint: "Desbloqueie a parada de Fuji & Hakone em sua jornada.",
      action: "Ir para o Monte Fuji",
    },
  },
  "all-japan": {
    fr: {
      desc: "Conquérez toutes les destinations emblématiques du Japon.",
      hint: "Complétez l'ensemble des 9 étapes du Shinkansen.",
      action: "Devenir une légende",
    },
    "zh-CN": {
      desc: "征服新干线地图上的全部日本名胜地标。",
      hint: "完成全部 9 个新干线打卡站点。",
      action: "成为传奇大师",
    },
    "zh-TW": {
      desc: "征服新幹線地圖上的全部日本名勝地標。",
      hint: "完成全部 9 個新幹線打卡站點。",
      action: "成為傳奇大師",
    },
    en: {
      desc: "Conquer all iconic destinations across Japan.",
      hint: "Complete all 9 Shinkansen route stops.",
      action: "Become a Legend",
    },
    ko: {
      desc: "일본의 모든 대표 명소를 정복하세요.",
      hint: "신칸센 9개 정거장을 모두 완료하세요.",
      action: "전설이 되기",
    },
    es: {
      desc: "Conquista todos los destinos emblemáticos de Japón.",
      hint: "Completa las 9 paradas de la ruta Shinkansen.",
      action: "Ser una leyenda",
    },
    de: {
      desc: "Erobere alle berühmten Reiseziele in Japan.",
      hint: "Schließe alle 9 Shinkansen-Stationen ab.",
      action: "Werde zur Legende",
    },
    id: {
      desc: "Taklukkan semua destinasi ikonis di seluruh penjuru Jepang.",
      hint: "Selesaikan kesembilan stasiun rute Shinkansen.",
      action: "Menjadi Legenda",
    },
    th: {
      desc: "พิชิตจุดหมายปลายทางยอดนิยมทั้งหมดในญี่ปุ่น",
      hint: "ผ่านทั้ง 9 สถานีบนเส้นทางรถไฟชินคันเซ็น",
      action: "ก้าวสู่ตำนาน",
    },
    ru: {
      desc: "Покорите все главные достопримечательности Японии.",
      hint: "Пройдите все 9 остановок маршрута Синкансэн.",
      action: "Стать легендой",
    },
    pt: {
      desc: "Conquiste todos os destinos emblemáticos do Japão.",
      hint: "Complete todas as 9 paradas da rota Shinkansen.",
      action: "Tornar-se uma Lenda",
    },
  },
  "streak-7": {
    fr: {
      desc: "Maintenez une série continue de 7 jours d'apprentissage.",
      hint: "Étudiez chaque jour sans interruption pendant 7 jours.",
      action: "Voir ma série",
    },
    "zh-CN": {
      desc: "保持连续 7 天不间断的学习打卡。",
      hint: "连续 7 天每天完成学习任务。",
      action: "查看连胜统计",
    },
    "zh-TW": {
      desc: "保持連續 7 天不間斷的學習打卡。",
      hint: "連續 7 天每天完成學習任務。",
      action: "查看連勝統計",
    },
    en: {
      desc: "Maintain an uninterrupted 7-day study streak.",
      hint: "Study consecutively every day for 7 days.",
      action: "View Study Streak",
    },
    ko: {
      desc: "7일 연속 학습 스트릭을 달성하세요.",
      hint: "7일 동안 하루도 빠짐없이 매일 학습합니다.",
      action: "스트릭 보기",
    },
    es: {
      desc: "Mantén una racha ininterrumpida de 7 días de estudio.",
      hint: "Estudia consecutivamente todos los días durante 7 días.",
      action: "Ver mi racha",
    },
    de: {
      desc: "Halte eine 7-Tage-Lernserie ohne Unterbrechung aufrecht.",
      hint: "Lerne 7 Tage hintereinander jeden Tag.",
      action: "Serie ansehen",
    },
    id: {
      desc: "Pertahankan runtutan belajar tanpa putus selama 7 hari.",
      hint: "Belajar setiap hari berturut-turut selama 7 hari.",
      action: "Lihat Runtutan",
    },
    th: {
      desc: "รักษาสถิติการเรียนรู้ต่อเนื่อง 7 วันติดต่อกัน",
      hint: "เข้าเรียนอย่างต่อเนื่องทุกวันเป็นเวลา 7 วัน",
      action: "ดูสถิติต่อเนื่อง",
    },
    ru: {
      desc: "Поддерживайте 7-дневную непрерывную серию занятий.",
      hint: "Занимайтесь каждый день подряд в течение недели.",
      action: "Моя серия",
    },
    pt: {
      desc: "Mantenha uma sequência de estudos de 7 dias ininterruptos.",
      hint: "Estude consecutivamente todos os dias por 7 dias.",
      action: "Ver minha sequência",
    },
  },
  "sensei-chat": {
    fr: {
      desc: "Pratiquez la conversation japonaise avec AI Sensei.",
      hint: "Complétez 1 séance de conversation avec AI Sensei.",
      action: "Parler avec Sensei",
    },
    "zh-CN": {
      desc: "与 AI Sensei 进行日语对话会话练习。",
      hint: "完成 1 次与 AI Sensei 的会话口语互动。",
      action: "与老师对话",
    },
    "zh-TW": {
      desc: "與 AI Sensei 進行日語對話會話練習。",
      hint: "完成 1 次與 AI Sensei 的會話口語互動。",
      action: "與老師對話",
    },
    en: {
      desc: "Practice Japanese conversation with AI Sensei.",
      hint: "Complete 1 conversational session with AI Sensei.",
      action: "Chat with Sensei",
    },
    ko: {
      desc: "AI Sensei와 일본어 회화를 연습하세요.",
      hint: "AI Sensei와 회화 세션 1회를 완료합니다.",
      action: "Sensei와 대화하기",
    },
    es: {
      desc: "Practica conversación en japonés con AI Sensei.",
      hint: "Completa 1 sesión de conversación con AI Sensei.",
      action: "Hablar con Sensei",
    },
    de: {
      desc: "Übe japanische Konversation mit AI Sensei.",
      hint: "Schließe 1 Gesprächssitzung mit AI Sensei ab.",
      action: "Mit Sensei chatten",
    },
    id: {
      desc: "Latih percakapan bahasa Jepang dengan AI Sensei.",
      hint: "Selesaikan 1 sesi percakapan dengan AI Sensei.",
      action: "Bicara dengan Sensei",
    },
    th: {
      desc: "ฝึกสนทนาภาษาญี่ปุ่นร่วมกับ AI Sensei",
      hint: "ฝึกสนทนาภาษาญี่ปุ่นกับ AI Sensei ให้เสร็จสิ้น 1 ครั้ง",
      action: "คุยกับ Sensei",
    },
    ru: {
      desc: "Практикуйте разговорный японский с AI Sensei.",
      hint: "Проведите 1 диалог с AI Sensei.",
      action: "Диалог с Sensei",
    },
    pt: {
      desc: "Pratique conversação em japonês com o AI Sensei.",
      hint: "Conclua 1 sessão de conversa com o AI Sensei.",
      action: "Falar com o Sensei",
    },
  },
  "survival-survivor": {
    fr: {
      desc: "Survivez aux mises en situation réelles en Mode Survie.",
      hint: "Réussissez avec succès 1 scénario de survie.",
      action: "Entrer en Mode Survie",
    },
    "zh-CN": {
      desc: "在生存模式中成功应对突发日语情景挑战。",
      hint: "顺利通关 1 场实战情景生存挑战。",
      action: "进入生存挑战",
    },
    "zh-TW": {
      desc: "在生存模式中成功應對突發日語情景挑戰。",
      hint: "順利通關 1 場實戰情景生存挑戰。",
      action: "進入生存挑戰",
    },
    en: {
      desc: "Survive real-time Japanese scenario challenges.",
      hint: "Successfully clear 1 survival scenario stage.",
      action: "Start Survival Mode",
    },
    ko: {
      desc: "서바이벌 모드에서 실전 일본어 상황을 극복하세요.",
      hint: "서바이벌 시나리오 1개를 성공적으로 클리어하세요.",
      action: "서바이벌 모드 입장",
    },
    es: {
      desc: "Supera situaciones reales en el Modo Supervivencia.",
      hint: "Supera con éxito 1 escenario de supervivencia.",
      action: "Entrar en Supervivencia",
    },
    de: {
      desc: "Meistere reale Situationen im Survival-Modus.",
      hint: "Bestehe 1 Survival-Szenario erfolgreich.",
      action: "Survival-Modus starten",
    },
    id: {
      desc: "Taklukkan simulasi kehidupan nyata di Mode Survival.",
      hint: "Berhasil menyelesaikan 1 skenario survival.",
      action: "Masuk Mode Survival",
    },
    th: {
      desc: "เอาตัวรอดจากสถานการณ์จำลองในโหมด Survival",
      hint: "ผ่านด่านสถานการณ์เอาตัวรอดสำเร็จ 1 ด่าน",
      action: "เข้าสู่โหมดเอาตัวรอด",
    },
    ru: {
      desc: "Справляйтесь с реальными ситуациями в Режиме Выживания.",
      hint: "Успешно пройдите 1 сценарий выживания.",
      action: "В Режим Выживания",
    },
    pt: {
      desc: "Supere situações reais no Modo Sobrevivência.",
      hint: "Supere com sucesso 1 cenário de sobrevivência.",
      action: "Entrar no Modo Sobrevivência",
    },
  },
  "test-champion": {
    fr: {
      desc: "Passez une évaluation de compétence JLPT complète.",
      hint: "Complétez 1 test d'évaluation dans le Centre d'examen.",
      action: "Passer un test",
    },
    "zh-CN": {
      desc: "在模考中心完成日语能力 JLPT 评估。",
      hint: "在测评中心完成任意 1 套能力测试题。",
      action: "参加能力自测",
    },
    "zh-TW": {
      desc: "在模考中心完成日語能力 JLPT 評估。",
      hint: "在測評中心完成任意 1 套能力測試題。",
      action: "參加能力自測",
    },
    en: {
      desc: "Complete a JLPT proficiency assessment.",
      hint: "Complete 1 proficiency exam in the Test Center.",
      action: "Take Proficiency Test",
    },
    ko: {
      desc: "시험 센터에서 JLPT 능력 평가를 완료하세요.",
      hint: "평가 센터에서 테스트 1회를 완수하세요.",
      action: "능력 평가 치르기",
    },
    es: {
      desc: "Realiza una evaluación completa de competencia JLPT.",
      hint: "Completa 1 examen de nivel en el Centro de pruebas.",
      action: "Hacer examen de nivel",
    },
    de: {
      desc: "Absolviere einen vollständigen JLPT-Einstufungstest.",
      hint: "Schließe 1 Prüfung im Testcenter ab.",
      action: "Test ablegen",
    },
    id: {
      desc: "Selesaikan tes kemahiran JLPT di Pusat Ujian.",
      hint: "Selesaikan 1 tes kemahiran di Pusat Tes.",
      action: "Ikuti Tes Kemampuan",
    },
    th: {
      desc: "ทำแบบประเมินความสามารถภาษาญี่ปุ่น JLPT ครบถ้วน",
      hint: "ทำแบบทดสอบวัดระดับในศูนย์สอบให้เสร็จ 1 ชุด",
      action: "เริ่มทำแบบทดสอบ",
    },
    ru: {
      desc: "Пройдите комплексное тестирование уровня JLPT.",
      hint: "Завершите 1 экзамен в Центре тестирования.",
      action: "Сдать тест",
    },
    pt: {
      desc: "Conclua uma avaliação completa de proficiência JLPT.",
      hint: "Conclua 1 exame de proficiência no Centro de Testes.",
      action: "Fazer Teste de Nível",
    },
  },
};

export function getLocalizedBadgeDesc(key: string, lang: NativeLanguage, fallback: string): string {
  if (lang === "vi") return fallback;
  return BADGE_I18N[key]?.[lang]?.desc || BADGE_I18N[key]?.en?.desc || fallback;
}

export function getLocalizedBadgeHint(key: string, lang: NativeLanguage, fallback: string): string {
  if (lang === "vi") return fallback;
  return BADGE_I18N[key]?.[lang]?.hint || BADGE_I18N[key]?.en?.hint || fallback;
}

export function getLocalizedBadgeAction(key: string, lang: NativeLanguage, fallback?: string): string | undefined {
  if (lang === "vi") return fallback;
  return BADGE_I18N[key]?.[lang]?.action || BADGE_I18N[key]?.en?.action || fallback;
}

