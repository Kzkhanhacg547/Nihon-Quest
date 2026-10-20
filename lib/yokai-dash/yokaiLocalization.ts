import type { NativeLanguage } from "@/components/LanguageContext";
import type {
  GameZone,
  SpiritBeast,
  DailyQuest,
  YokaiQuestionMode,
  YokaiSpeedDifficulty,
  ObstacleType,
  ObstacleAction,
  YokaiQuestion,
} from "./types";
import { SPIRIT_BEASTS, GAME_ZONES, INITIAL_DAILY_QUESTS } from "./constants";

/* =====================================================================
 * 1. SPIRIT BEASTS LOCALIZATION (12 LANGUAGES)
 * ===================================================================== */

interface BeastI18n {
  title: string;
  description: string;
  perk: string;
  unlockRequirement: string;
}

const BEAST_TRANSLATIONS: Record<NativeLanguage, Record<string, BeastI18n>> = {
  vi: {
    kitsune: {
      title: "Cáo Chín Đuôi Linh Hỏa",
      description: "Linh thú cổ xưa mang ngọn lửa hồ ly xanh biếc, dẫn đường cho các linh hồn.",
      perk: "+15% Điểm thưởng Combo khi duy trì chuỗi đúng liên tiếp",
      unlockRequirement: "Mặc định mở khóa cho mọi lãng khách",
    },
    neko_samurai: {
      title: "Miêu Kiếm Sĩ Đền Cổ",
      description: "Chiến binh mèo dũng cảm đeo chuông vàng, luôn sẵn sàng xông pha mọi hiểm nguy.",
      perk: "Kéo dài thêm 0.8 giây phản xạ nhận diện cổng Torii",
      unlockRequirement: "Mở khóa khi đạt cấp độ N5",
    },
    tanuki: {
      title: "Hồ Ly Biến Hình Thần Bí",
      description: "Đội chiếc lá sen ma thuật, mang lại may mắn và tài lộc trên mọi nẻo đường.",
      perk: "Tăng +25% điểm kinh nghiệm (XP) sau mỗi màn hoàn thành",
      unlockRequirement: "Đạt cấp độ 3 hoặc hoàn thành 3 màn Yōkai Dash",
    },
    yatagarasu: {
      title: "Thần Điểu Ba Chân Ánh Dương",
      description: "Sứ giả của thần Amaterasu, sải cánh xé toạc màn đêm và chở che linh hồn.",
      perk: "Miễn nhiễm 1 lần va chạm chướng ngại vật đầu tiên trong mỗi màn",
      unlockRequirement: "Đạt chuỗi combo 8x hoặc 500 XP Nihon Quest",
    },
    okami: {
      title: "Bạch Lang Núi Tuyết Phú Sĩ",
      description: "Thần lang bảo hộ vùng núi linh thiêng tuyết phủ, bước chạy thanh thoát như gió.",
      perk: "Tự động thu hút linh ngọc và tăng gấp đôi điểm khi máu đầy",
      unlockRequirement: "Vượt qua thử thách Cõi Núi Phú Sĩ (N3)",
    },
  },
  en: {
    kitsune: {
      title: "Nine-Tailed Fox Spirit",
      description: "Ancient spirit beast bearing azure foxfire, guiding souls through mystical realms.",
      perk: "+15% Combo bonus points when maintaining consecutive correct streaks",
      unlockRequirement: "Unlocked by default for all wanderers",
    },
    neko_samurai: {
      title: "Shrine Cat Swordsman",
      description: "Brave feline warrior adorned with a golden bell, fearless in every trial.",
      perk: "+0.8s extra reaction time to identify Torii gates",
      unlockRequirement: "Unlocked at N5 proficiency level",
    },
    tanuki: {
      title: "Mystic Shapeshifter Tanuki",
      description: "Wearing a sacred lotus leaf, bringing auspicious fortune on all journeys.",
      perk: "+25% XP bonus awarded after each completed run",
      unlockRequirement: "Reach Level 3 or complete 3 Yōkai Dash runs",
    },
    yatagarasu: {
      title: "Solar Three-Legged Crow",
      description: "Messenger of Amaterasu, rending shadows and shielding sacred spirits.",
      perk: "Immune to the first obstacle collision in every run",
      unlockRequirement: "Achieve an 8x combo streak or earn 500 Nihon Quest XP",
    },
    okami: {
      title: "Sacred White Wolf of Fuji",
      description: "Guardian wolf of the snow-clad holy mountain, swift as divine wind.",
      perk: "Magnetizes spirit orbs and doubles jewel points at full health",
      unlockRequirement: "Clear the Mount Fuji Summit realm (N3)",
    },
  },
  "zh-CN": {
    kitsune: {
      title: "九尾灵火天狐",
      description: "身负青色狐火的上古神兽，指引迷途灵魂穿行幽冥。",
      perk: "保持连续答对时获得 +15% 连击得分加成",
      unlockRequirement: "默认向所有旅人解锁",
    },
    neko_samurai: {
      title: "古社猫侍剑士",
      description: "佩戴金铃的英勇猫武士，无畏奔赴一切修行险阻。",
      perk: "鸟居辨识反应时间延长 0.8 秒",
      unlockRequirement: "达到 N5 水平即自动解锁",
    },
    tanuki: {
      title: "神秘幻化狸仙",
      description: "顶着神奇荷叶的化狸，为旅途带来祥瑞好运与丰厚收获。",
      perk: "每局通关结算时经验值（XP）额外增加 +25%",
      unlockRequirement: "达到 3 级或完成 3 局 Yōkai Dash",
    },
    yatagarasu: {
      title: "三足太阳神鸟",
      description: "天照大神的使者，金羽撕裂幽暗夜幕，守护灵魂。",
      perk: "每局首度碰撞障碍物时获得 1 次完全免伤护盾",
      unlockRequirement: "达成 8 连击或累计获得 500 XP",
    },
    okami: {
      title: "富士雪山白神狼",
      description: "镇守白雪圣山的古老神狼，步法如微风般飘逸迅疾。",
      perk: "满血时自动吸附灵玉且勾玉得分翻倍",
      unlockRequirement: "通关富士圣山之境（N3）",
    },
  },
  "zh-TW": {
    kitsune: {
      title: "九尾靈火天狐",
      description: "身負青色狐火的上古神獸，指引迷途靈魂穿行幽冥。",
      perk: "保持連續答對時獲得 +15% 連擊得分加成",
      unlockRequirement: "預設向所有旅人解鎖",
    },
    neko_samurai: {
      title: "古社貓侍劍士",
      description: "佩戴金鈴的英勇貓武士，無畏奔赴一切修行險阻。",
      perk: "鳥居辨識反應時間延長 0.8 秒",
      unlockRequirement: "達到 N5 水平即自動解鎖",
    },
    tanuki: {
      title: "神秘幻化狸仙",
      description: "頂著神奇荷葉的化狸，為旅途帶來祥瑞好運與豐厚收穫。",
      perk: "每局通關結算時經驗值（XP）額外增加 +25%",
      unlockRequirement: "達到 3 級或完成 3 局 Yōkai Dash",
    },
    yatagarasu: {
      title: "三足太陽神鳥",
      description: "天照大神的使者，金羽撕裂幽暗夜幕，守護靈魂。",
      perk: "每局首度碰撞障礙物時獲得 1 次完全免傷護盾",
      unlockRequirement: "達成 8 連擊或累計獲得 500 XP",
    },
    okami: {
      title: "富士雪山白神狼",
      description: "鎮守白雪聖山的古老神狼，步法如微風般飄逸迅疾。",
      perk: "滿血時自動吸附靈玉且勾玉得分翻倍",
      unlockRequirement: "通關富士聖山之境（N3）",
    },
  },
  ko: {
    kitsune: {
      title: "구미호 영화 천호",
      description: "푸른 여우불을 품은 고대 영수, 혼령들의 길을 비추어 인도합니다.",
      perk: "연속 정답 유지 시 콤보 보너스 +15% 획득",
      unlockRequirement: "모든 모험가에게 기본 해금",
    },
    neko_samurai: {
      title: "신사 네코 사무라이",
      description: "황금 방울을 단 용감한 고양이 검사, 어떤 위험도 두려워하지 않습니다.",
      perk: "토리이 문 인식 반응 시간 +0.8초 연장",
      unlockRequirement: "N5 등급 달성 시 해금",
    },
    tanuki: {
      title: "신비한 둔갑 너구리 타누키",
      description: "신비한 연잎을 머리에 얹고 행운과 풍요를 가져다줍니다.",
      perk: "달리기 완료 시 경험치(XP) +25% 추가 획득",
      unlockRequirement: "레벨 3 달성 또는 Yōkai Dash 3회 완주",
    },
    yatagarasu: {
      title: "태양의 삼족오 야타가라스",
      description: "아마테라스의 전령, 어둠을 가르고 영혼을 수호합니다.",
      perk: "매 게임 첫 장애물 충돌 1회 무효화 방패",
      unlockRequirement: "8x 콤보 달성 또는 500 XP 획득",
    },
    okami: {
      title: "후지산 설원 백신랑 오카미",
      description: "눈 덮인 영산을 지키는 신성한 늑대, 바람처럼 민첩하게 질주합니다.",
      perk: "체력 가득 시 영옥 자동 흡수 및 구슬 점수 2배",
      unlockRequirement: "후지산 정상 영지(N3) 돌파",
    },
  },
  es: {
    kitsune: {
      title: "Zorro Espiritual de Nueve Colas",
      description: "Antigua bestia portadora de fuego azul sagrado, guía de almas en el reino espiritual.",
      perk: "+15% de bonificación en combos al mantener rachas correctas",
      unlockRequirement: "Desbloqueado por defecto para todos los viajeros",
    },
    neko_samurai: {
      title: "Gato Samurái del Templo",
      description: "Valiente felino con campana dorada, listo para afrontar cualquier prueba.",
      perk: "+0.8s adicionales de reacción para reconocer puertas Torii",
      unlockRequirement: "Desbloqueado al alcanzar nivel N5",
    },
    tanuki: {
      title: "Tanuki Místico de Transformación",
      description: "Lleva una hoja de loto mágica y brinda fortuna en cada travesía.",
      perk: "+25% de experiencia (XP) al completar cada carrera",
      unlockRequirement: "Alcanza el nivel 3 o completa 3 partidas de Yōkai Dash",
    },
    yatagarasu: {
      title: "Cuervo Solar de Tres Patas",
      description: "Emisario divino de Amaterasu, rasga las sombras protegiendo las almas.",
      perk: "Inmune a la 1ª colisión de obstáculos en cada carrera",
      unlockRequirement: "Logra racha de combo 8x o suma 500 XP",
    },
    okami: {
      title: "Lobo Sagrado del Monte Fuji",
      description: "Guardián de la cumbre nevada sagrada, veloz y grácil como el viento.",
      perk: "Imán automático de gemas y doble puntuación con vida llena",
      unlockRequirement: "Supera la cumbre del Monte Fuji (N3)",
    },
  },
  fr: {
    kitsune: {
      title: "Renard Céleste à Neuf Queues",
      description: "Bête spirituelle ancienne porteuse de feu follet azur, guidant les âmes errantes.",
      perk: "+15% de bonus de combo en maintenant les séries correctes",
      unlockRequirement: "Débloqué par défaut pour tous les voyageurs",
    },
    neko_samurai: {
      title: "Chat Samouraï du Sanctuaire",
      description: "Brave guerrier félin à cloche d'or, toujours prêt à défier le danger.",
      perk: "+0,8s de temps de réaction pour identifier les portails Torii",
      unlockRequirement: "Débloqué au niveau N5",
    },
    tanuki: {
      title: "Tanuki Métamorphe Mystique",
      description: "Coiffé d'une feuille de lotus sacrée, apportant fortune et prospérité.",
      perk: "+25% de points d'expérience (XP) après chaque course",
      unlockRequirement: "Atteignez le niveau 3 ou terminez 3 courses Yōkai Dash",
    },
    yatagarasu: {
      title: "Corbeau Solaire à Trois Pattes",
      description: "Émissaire d'Amaterasu, fendant la nuit pour abriter les esprits.",
      perk: "Immunité contre la 1ère collision avec un obstacle",
      unlockRequirement: "Atteignez un combo 8x ou 500 XP Nihon Quest",
    },
    okami: {
      title: "Loup Blanc Sacré du Mont Fuji",
      description: "Protecteur divin des cimes enneigées, agile et rapide comme le vent.",
      perk: "Aimante les orbes et double les points quand la vie est pleine",
      unlockRequirement: "Triomphez du sommet du Mont Fuji (N3)",
    },
  },
  de: {
    kitsune: {
      title: "Neunschwänziger Geisterfuchs",
      description: "Uraltes Fabelwesen mit azurblauen Irrlichtern, Geleiter der Seelen.",
      perk: "+15% Kombo-Bonuspunkte bei fehlerfreien Antwortserien",
      unlockRequirement: "Standardmäßig für alle Wanderer freigeschaltet",
    },
    neko_samurai: {
      title: "Schrein-Katzen-Samurai",
      description: "Tapferer Katzenkrieger mit goldener Glocke, stets kampfbereit.",
      perk: "+0,8s zusätzliche Reaktionszeit zur Torii-Tor-Erkennung",
      unlockRequirement: "Freigeschaltet ab N5-Niveau",
    },
    tanuki: {
      title: "Mystischer Gestaltwandler-Tanuki",
      description: "Mit magischem Lotosblatt auf dem Kopf bringt er Glück und Reichtum.",
      perk: "+25% Erfahrungs-Bonus (XP) nach jedem Lauf",
      unlockRequirement: "Stufe 3 erreichen oder 3 Yōkai-Dash-Läufe abschließen",
    },
    yatagarasu: {
      title: "Dreibeinige Sonnenkrähe",
      description: "Bote von Amaterasu, teilt die Finsternis und schützt Seelen.",
      perk: "Immun gegen die 1. Hinderniskollision in jedem Lauf",
      unlockRequirement: "8er-Kombo erreichen oder 500 XP sammeln",
    },
    okami: {
      title: "Heiliger Weißer Wolf von Fuji",
      description: "Schutzwolf der schneebedeckten Gipfel, pfeilschnell wie der Wind.",
      perk: "Zieht Seelenperlen an & verdoppelt Punkte bei voller Gesundheit",
      unlockRequirement: "Bezwinge den Fuji-Gipfel (N3)",
    },
  },
  id: {
    kitsune: {
      title: "Rubah Sembilan Ekor Api Roh",
      description: "Makhluk mitis kuno pembawa api biru, pemandu jiwa di alam baka.",
      perk: "+15% bonus poin kombo saat mempertahankan jawaban benar berturut-turut",
      unlockRequirement: "Terbuka secara bawaan untuk semua pengelana",
    },
    neko_samurai: {
      title: "Pendekar Kucing Kuil Kuno",
      description: "Prajurit kucing pemberani berlonceng emas, siap menerjang mara bahaya.",
      perk: "+0,8 detik tambahan waktu bereaksi mengenali gerbang Torii",
      unlockRequirement: "Terbuka saat mencapai level N5",
    },
    tanuki: {
      title: "Tanuki Perubah Wujud Mistik",
      description: "Mengenakan daun teratai ajaib, membawa keberuntungan di setiap langkah.",
      perk: "+25% poin pengalaman (XP) setelah menyelesaikan ronde",
      unlockRequirement: "Capai Level 3 atau selesaikan 3 ronde Yōkai Dash",
    },
    yatagarasu: {
      title: "Gagak Surya Berkaki Tiga",
      description: "Utusan dewi Amaterasu, membelah kegelapan melindungi jiwa pengembara.",
      perk: "Kebal terhadap benturan rintangan pertama di setiap ronde",
      unlockRequirement: "Raih kombo 8x atau kumpulkan 500 XP",
    },
    okami: {
      title: "Serigala Suci Gunung Fuji",
      description: "Serigala pelindung puncak salju suci, berlari anggun seringan angin.",
      perk: "Menarik permata roh & melipatgandakan poin saat darah penuh",
      unlockRequirement: "Taklukkan Puncak Gunung Fuji (N3)",
    },
  },
  th: {
    kitsune: {
      title: "จิ้งจอกเก้าหางเพลิงวิญญาณ",
      description: "สัตว์เทพโบราณผู้พกพาเพลิงจิ้งจอกสีคราม นำทางดวงวิญญาณสู่ความสงบ",
      perk: "+15% คะแนนคอมโบเมื่อตอบถูกต่อเนื่อง",
      unlockRequirement: "ปลดล็อกเริ่มต้นสำหรับผู้พเนจรทุกคน",
    },
    neko_samurai: {
      title: "แมวซามูไรแห่งศาลเจ้าโบราณ",
      description: "นักรบแมวผู้กล้าหาญพร้อมกระดิ่งทอง พร้อมเผชิญทุกภยันตราย",
      perk: "เพิ่มเวลาสังเกตและตอบประตูโทริอิอีก 0.8 วินาที",
      unlockRequirement: "ปลดล็อกเมื่อถึงระดับ N5",
    },
    tanuki: {
      title: "ทานุกิแปลงกายลึกลับ",
      description: "สวมใบบัววิเศษ นำพาโชคลาภและความมั่งคั่งในทุกเส้นทาง",
      perk: "เพิ่มค่าประสบการณ์ (XP) +25% หลังจบแต่ละรอบ",
      unlockRequirement: "ถึงเลเวล 3 หรือเล่น Yōkai Dash ครบ 3 รอบ",
    },
    yatagarasu: {
      title: "อีกาสุริยันสามขา",
      description: "ผู้ส่งสารแห่งสุริยเทพี ฉีกความมืดมิดและปกป้องดวงวิญญาณ",
      perk: "ป้องกันการชนสิ่งกีดขวางครั้งแรกในแต่ละรอบ",
      unlockRequirement: "ทำคอมโบ 8x หรือสะสมครบ 500 XP",
    },
    okami: {
      title: "หมาป่าขาวศักดิ์สิทธิ์แห่งฟูจิ",
      description: "เทพหมาป่าพิทักษ์ยอดเขาหิมะศักดิ์สิทธิ์ วิ่งพลิ้วไหวดั่งสายลม",
      perk: "ดูดลูกแก้ววิญญาณอัตโนมัติและคะแนนคูณสองเมื่อหัวใจเต็ม",
      unlockRequirement: "ผ่านด่านยอดเขาฟูจิ (N3)",
    },
  },
  ru: {
    kitsune: {
      title: "Девятихвостая Лисица Китсунэ",
      description: "Древний дух с лазурным пламенем, ведущий заблудшие души.",
      perk: "+15% очков комбо при удержании серии правильных ответов",
      unlockRequirement: "Открыто по умолчанию для всех странников",
    },
    neko_samurai: {
      title: "Кот-Самурай Древнего Храма",
      description: "Бесстрашный воин-кот с золотым колокольчиком, готовый к любым вызовам.",
      perk: "+0,8 сек к времени реакции на вратах Тории",
      unlockRequirement: "Открывается на уровне N5",
    },
    tanuki: {
      title: "Тануки-Оборотень Мистик",
      description: "С волшебным листом лотоса на голове, приносит удачу и процветание.",
      perk: "+25% опыта (XP) после каждого завершённого забега",
      unlockRequirement: "Достигните 3 уровня или завершите 3 забега Yōkai Dash",
    },
    yatagarasu: {
      title: "Трехлапый Солнечный Ворон",
      description: "Посланник Аматэрасу, разгоняющий тьму и защищающий души.",
      perk: "Иммунитет к первому столкновению с препятствием в каждом забеге",
      unlockRequirement: "Серия комбо 8x или 500 XP Nihon Quest",
    },
    okami: {
      title: "Белый Волк Священной Фудзи",
      description: "Дух-хранитель заснеженной вершины, стремительный как божественный ветер.",
      perk: "Притягивает сферы духов и удваивает очки при полном здоровье",
      unlockRequirement: "Пройдите царство вершины Фудзи (N3)",
    },
  },
  pt: {
    kitsune: {
      title: "Raposa de Nove Caudas Celestial",
      description: "Besta espiritual ancestral com chamas azuis, guiando as almas errantes.",
      perk: "+15% de bônus de combo ao manter sequências corretas",
      unlockRequirement: "Desbloqueado por padrão para todos os viajantes",
    },
    neko_samurai: {
      title: "Gato Samurai do Santuário",
      description: "Gato guerreiro corajoso com sino dourado, pronto para qualquer desafio.",
      perk: "+0.8s de tempo de reação para identificar os portais Torii",
      unlockRequirement: "Desbloqueado no nível N5",
    },
    tanuki: {
      title: "Tanuki Metamorfo Místico",
      description: "Com uma folha mágica na cabeça, trazendo sorte e prosperidade pelo caminho.",
      perk: "+25% de experiência (XP) após cada corrida concluída",
      unlockRequirement: "Alcance o nível 3 ou complete 3 corridas de Yōkai Dash",
    },
    yatagarasu: {
      title: "Corvo Solar de Três Pernas",
      description: "Mensageiro de Amaterasu, rasgando as sombras e protegendo os espíritos.",
      perk: "Imunidade à 1ª colisão de obstáculos em cada corrida",
      unlockRequirement: "Atinja combo 8x ou ganhe 500 XP no Nihon Quest",
    },
    okami: {
      title: "Lobo Branco Sagrado do Monte Fuji",
      description: "Guardião da montanha sagrada coberta de neve, veloz como o vento.",
      perk: "Atrai esferas espirituais e dobra pontos com vida cheia",
      unlockRequirement: "Supere o reino do Cume do Fuji (N3)",
    },
  },
};

export function getLocalizedBeast(beast: SpiritBeast, lang: NativeLanguage): SpiritBeast {
  const trans = BEAST_TRANSLATIONS[lang]?.[beast.id] || BEAST_TRANSLATIONS.vi[beast.id];
  if (!trans) return beast;
  return {
    ...beast,
    title: trans.title,
    description: trans.description,
    perk: trans.perk,
    unlockRequirement: trans.unlockRequirement,
  };
}

/* =====================================================================
 * 2. GAME REALMS / ZONES LOCALIZATION (12 LANGUAGES)
 * ===================================================================== */

interface ZoneI18n {
  name: string;
  description: string;
}

const ZONE_TRANSLATIONS: Record<NativeLanguage, Record<string, ZoneI18n>> = {
  vi: {
    torii_path: {
      name: "Con Đường Nghìn Cổng Torii",
      description: "Lối vào linh giới rực rỡ với hàng ngàn cổng Torii đỏ son và đèn lồng đung đưa.",
    },
    sakura_grove: {
      name: "Rừng Hoa Anh Đào Cổ Thụ",
      description: "Cánh hoa Sakura bay lượn ngập trời, dòng suối phát quang uốn lượn dưới đền thờ.",
    },
    moonlight_shrine: {
      name: "Ngôi Đền Dưới Ánh Trăng",
      description: "Ánh trăng huyền ảo rọi xuống mái đền rêu phong cùng những đốm lửa ma trơi xanh biếc.",
    },
    fuji_summit: {
      name: "Đỉnh Núi Thiêng Phú Sĩ",
      description: "Đỉnh núi tuyết trắng vĩnh hằng giữa biển mây bồng bềnh, nơi thần linh ngự trị.",
    },
    listening_realm: {
      name: "Cõi Âm Vang Nghe Hiểu",
      description: "Thung lũng của những thanh âm kỳ diệu, rèn luyện đôi tai phản xạ câu từ cực nhanh.",
    },
    kansai_festival: {
      name: "Đêm Hội Đèn Lồng Kansai & Cố Đô",
      description: "Phố hội rực ánh đèn lồng đỏ, thử thách phản xạ kính ngữ, quán ngữ và phương ngữ vùng miền.",
    },
  },
  en: {
    torii_path: {
      name: "Thousand Torii Gates Path",
      description: "A vibrant gateway to the spirit world with crimson gates and swaying lanterns.",
    },
    sakura_grove: {
      name: "Ancient Cherry Blossom Grove",
      description: "Sakura petals dance in the wind along glowing streams beneath the ancient shrine.",
    },
    moonlight_shrine: {
      name: "Shrine Beneath the Moonlight",
      description: "Ethereal moonlight illuminates mossy shrine roofs and dancing azure will-o'-the-wisps.",
    },
    fuji_summit: {
      name: "Sacred Mount Fuji Summit",
      description: "An eternal snowbound sanctuary perched above floating seas of clouds.",
    },
    listening_realm: {
      name: "Echoing Listening Realm",
      description: "A valley of melodious echoes honing your ears for lightning-fast comprehension.",
    },
    kansai_festival: {
      name: "Kansai Lantern Festival Night",
      description: "Festive lanterns glow through historical streets, testing honorifics and regional dialects.",
    },
  },
  "zh-CN": {
    torii_path: {
      name: "千本鸟居神道",
      description: "通往幽玄灵界的朱红长廊，千门林立，神灯摇曳。",
    },
    sakura_grove: {
      name: "悠久樱林古社",
      description: "樱花漫天纷飞，幽光溪流环绕古老神殿蜿蜒而过。",
    },
    moonlight_shrine: {
      name: "月光隐秘幽社",
      description: "皎洁月色笼罩青苔古瓦，幽蓝狐火在林间若隐若现。",
    },
    fuji_summit: {
      name: "灵峰富士天道",
      description: "万年白雪皑皑，神明栖居的云海至高仙境。",
    },
    listening_realm: {
      name: "音灵回响之谷",
      description: "奇妙音律环绕的幽谷，锤炼极速听辨与日常交流本能。",
    },
    kansai_festival: {
      name: "关西古都灯会之夜",
      description: "红灯笼照亮繁华祭典，挑战关西方言、敬语与日常惯用句。",
    },
  },
  "zh-TW": {
    torii_path: {
      name: "千本鳥居神道",
      description: "通往幽玄靈界的朱紅長廊，千門林立，神燈搖曳。",
    },
    sakura_grove: {
      name: "悠久櫻林古社",
      description: "櫻花漫天紛飛，幽光溪流環繞古老神殿蜿蜒而過。",
    },
    moonlight_shrine: {
      name: "月光隱秘幽社",
      description: "皎潔月色籠罩青苔古瓦，幽藍狐火在林間若隱若現。",
    },
    fuji_summit: {
      name: "靈峰富士天道",
      description: "萬年白雪皚皚，神明棲居的雲海至高仙境。",
    },
    listening_realm: {
      name: "音靈迴響之谷",
      description: "奇妙音律環繞的幽谷，錘鍊極速聽辨與日常交流本能。",
    },
    kansai_festival: {
      name: "關西古都燈會之夜",
      description: "紅燈籠照亮繁華祭典，挑戰關西方言、敬語與日常慣用句。",
    },
  },
  ko: {
    torii_path: {
      name: "천 개의 토리이 참배길",
      description: "붉은 토리이 문과 흔들리는 등불이 영계로 안내하는 신성한 길.",
    },
    sakura_grove: {
      name: "고목 벚꽃 숲",
      description: "벚꽃 잎이 흩날리고, 빛나는 시냇물이 신사 아래로 흐르는 곳.",
    },
    moonlight_shrine: {
      name: "달빛 아래 숨은 신사",
      description: "이끼 낀 신사 지붕 위로 달빛이 비추고 도깨비불이 춤추는 밤.",
    },
    fuji_summit: {
      name: "후지산 영봉 정상",
      description: "구름바다 위 만년설이 펼쳐진 신들이 머무는 성스러운 정상.",
    },
    listening_realm: {
      name: "음령이 울리는 골짜기",
      description: "신비로운 소리가 메아리치며 빠른 청취 순발력을 기르는 골짜기.",
    },
    kansai_festival: {
      name: "간사이 고도 등불 축제",
      description: "붉은 제등이 밝히는 축제 거리, 경어와 방언 순발력을 시험합니다.",
    },
  },
  es: {
    torii_path: {
      name: "Senda de los Mil Torii",
      description: "Entrada radiante al mundo espiritual repleta de puertas bermellón y faroles.",
    },
    sakura_grove: {
      name: "Arboleda de Cerezos Milenarios",
      description: "Pétalos de sakura flotan en el aire junto a arroyos luminosos bajo el santuario.",
    },
    moonlight_shrine: {
      name: "Santuario a la Luz de la Luna",
      description: "La luz lunar baña tejados musgosos mientras destellan fuegos fatuos azulados.",
    },
    fuji_summit: {
      name: "Cumbre Sagrada del Monte Fuji",
      description: "Eterna nieve entre mares de nubes donde moran los antiguos espíritus.",
    },
    listening_realm: {
      name: "Valle de los Ecos de Escucha",
      description: "Un valle sonoro místico para agudizar el oído y reaccionar al instante.",
    },
    kansai_festival: {
      name: "Noche de Faroles de Kansai",
      description: "Calles festivas iluminadas para poner a prueba honoríficos y dialectos.",
    },
  },
  fr: {
    torii_path: {
      name: "Sentier des Mille Torii",
      description: "Voie sacrée éclatante vers le monde spirituel jalonnée de portiques écarlates.",
    },
    sakura_grove: {
      name: "Bosquet de Cerisiers Millénaires",
      description: "Pluie de pétales de sakura et ruisseaux phosphorescents sous le temple.",
    },
    moonlight_shrine: {
      name: "Sanctuaire sous la Lune",
      description: "Lumière sélénite caressant les toits de mousse au milieu des feux follets.",
    },
    fuji_summit: {
      name: "Sommet Sacré du Mont Fuji",
      description: "Refuge de neiges éternelles trônant au-dessus des mers de nuages divines.",
    },
    listening_realm: {
      name: "Vallée des Échos de l'Écoute",
      description: "Un vallon mélodieux forgeant une compréhension auditive ultra-rapide.",
    },
    kansai_festival: {
      name: "Festival des Lanternes du Kansai",
      description: "Lanternes chatoyantes testant votre réflexe sur les expressions et le keigo.",
    },
  },
  de: {
    torii_path: {
      name: "Pfad der Tausend Torii",
      description: "Pforte zur Geisterwelt mit unzähligen scharlachroten Toren und Laternen.",
    },
    sakura_grove: {
      name: "Uralter Kirschblütenhain",
      description: "Sakura-Blüten tanzen im Wind über leuchtenden Bächen am Schrein.",
    },
    moonlight_shrine: {
      name: "Mondschein-Schrein",
      description: "Geheimnisvoller Mondschein erhellt moosige Dächer und zuckende Irrlichter.",
    },
    fuji_summit: {
      name: "Heiliger Fuji-Gipfel",
      description: "Ewiger Schnee über weiten Wolkenmeeren, Heimat alter Gottheiten.",
    },
    listening_realm: {
      name: "Tal der Hör-Echos",
      description: "Klangvolles Tal für blitzschnelles Gehör- und Sprachverständnis.",
    },
    kansai_festival: {
      name: "Kansai-Laternenfest der alten Hauptstadt",
      description: "Leuchtende Festlaternen fordern Höflichkeitssprache und Dialekte heraus.",
    },
  },
  id: {
    torii_path: {
      name: "Jalan Seribu Gerbang Torii",
      description: "Pintu masuk alam roh yang memukau dengan ribuan gerbang merah dan lentera.",
    },
    sakura_grove: {
      name: "Hutan Pohon Sakura Kuno",
      description: "Kelopak sakura bertebaran di udara dengan aliran sungai bercahaya di bawah kuil.",
    },
    moonlight_shrine: {
      name: "Kuil di Bawah Sinar Rembulan",
      description: "Cahaya bulan mistis menyinari atap berlumut dan percikan api biru roh.",
    },
    fuji_summit: {
      name: "Puncak Suci Gunung Fuji",
      description: "Puncak salju abadi di atas samudra awan, tempat bersemayamnya para dewa.",
    },
    listening_realm: {
      name: "Lembah Gema Menyimak",
      description: "Lembah penuh bebunyian merdu untuk melatih refleks pendengaran kilat.",
    },
    kansai_festival: {
      name: "Malam Festival Lentera Kansai",
      description: "Lentera merah festival menguji refleks bahasa sopan dan dialek setempat.",
    },
  },
  th: {
    torii_path: {
      name: "เส้นทางพันเสาโทริอิ",
      description: "ทางเข้าสู่โลกวิญญาณอันงดงามด้วยเสาโทริอิสีชาดและโคมไฟแกว่งไกว",
    },
    sakura_grove: {
      name: "ป่าซากุระโบราณ",
      description: "กลีบซากุระปลิวไสวไปตามสายน้ำเรืองแสงใต้ศาลเจ้าโบราณ",
    },
    moonlight_shrine: {
      name: "ศาลเจ้าใต้แสงจันทร์",
      description: "แสงจันทร์นวลส่องหลังคาปกคลุมด้วยมอส พร้อมลูกไฟวิญญาณสีคราม",
    },
    fuji_summit: {
      name: "ยอดเขาศักดิ์สิทธิ์ฟูจิ",
      description: "ยอดเขาหิมะขาวนิรันดร์เหนือทะเลหมอก ที่สถิตของเหล่าทวยเทพ",
    },
    listening_realm: {
      name: "หุบเขาเสียงสะท้อนแห่งการฟัง",
      description: "หุบเขาแห่งเสียงสะท้อน ช่วยฝึกฝนโสตประสาทและปฏิกิริยาตอบสนองอย่างรวดเร็ว",
    },
    kansai_festival: {
      name: "ค่ำคืนเทศกาลโคมไฟคันไซ",
      description: "ถนนเทศกาลสว่างไสวด้วยโคมแดง ท้าทายคำสุภาพ สำนวน และสำเนียงท้องถิ่น",
    },
  },
  ru: {
    torii_path: {
      name: "Путь Тысячи Ворот Тории",
      description: "Живописная тропа в мир духов с алыми воротами и покачивающимися фонарями.",
    },
    sakura_grove: {
      name: "Древняя Сакуровая Роща",
      description: "Лепестки сакуры кружатся над светящимся ручьем у старинного святилища.",
    },
    moonlight_shrine: {
      name: "Святилище под Лунным Светом",
      description: "Призрачный свет луны озаряет замшелые крыши и пляшущие синие огни.",
    },
    fuji_summit: {
      name: "Священная Вершина Фудзи",
      description: "Вечные снега над морем облаков, где обитают великие ками.",
    },
    listening_realm: {
      name: "Долина Звучащего Эха",
      description: "Долина мелодичных звуков для тренировки мгновенного восприятия на слух.",
    },
    kansai_festival: {
      name: "Ночь Фонарей в Кансае",
      description: "Праздничные огни старой столицы испытывают знание кейго и диалектов.",
    },
  },
  pt: {
    torii_path: {
      name: "Caminho dos Mil Portais Torii",
      description: "Entrada vibrante para o reino espiritual repleta de portais vermelhos e lanternas.",
    },
    sakura_grove: {
      name: "Bosque das Cerejeiras Antigas",
      description: "Pétalas de sakura dançam no ar sobre riachos luminosos sob o santuário.",
    },
    moonlight_shrine: {
      name: "Santuário ao Luar",
      description: "O luar místico banha telhados de musgo enquanto fogos-fátuos azuis cintilam.",
    },
    fuji_summit: {
      name: "Cume Sagrado do Monte Fuji",
      description: "Neves eternas sobre um mar de nuvens onde habitam os espíritos divinos.",
    },
    listening_realm: {
      name: "Vale dos Ecos da Audição",
      description: "Um vale de melodias mágicas para afiar seus reflexos de compreensão auditiva.",
    },
    kansai_festival: {
      name: "Noite dos Lanternas de Kansai",
      description: "Ruas iluminadas por lanternas festivas para testar honoríficos e dialetos.",
    },
  },
};

export function getLocalizedZone(zone: GameZone, lang: NativeLanguage): GameZone {
  const trans = ZONE_TRANSLATIONS[lang]?.[zone.id] || ZONE_TRANSLATIONS.vi[zone.id];
  if (!trans) return zone;
  return {
    ...zone,
    nameVi: trans.name,
    description: trans.description,
  };
}

/* =====================================================================
 * 3. DAILY QUESTS LOCALIZATION (12 LANGUAGES)
 * ===================================================================== */

const QUEST_TRANSLATIONS: Record<NativeLanguage, Record<string, { title: string; desc: string }>> = {
  vi: {
    quest_1: { title: "Bước Chạy Đầu Tiên", desc: "Hoàn thành 1 màn chạy bất kỳ trong ngày hôm nay" },
    quest_2: { title: "Bậc Thầy Chuỗi Combo", desc: "Đạt chuỗi combo từ 5 câu trả lời đúng liên tiếp" },
    quest_3: { title: "Chinh Phục 10 Cổng Torii", desc: "Chọn chính xác 10 cánh cổng tri thức tiếng Nhật" },
  },
  en: {
    quest_1: { title: "First Stride", desc: "Complete any 1 running stage today" },
    quest_2: { title: "Combo Master", desc: "Reach a streak of 5 consecutive correct answers" },
    quest_3: { title: "Conquer 10 Torii Gates", desc: "Select 10 correct Japanese knowledge gates" },
  },
  "zh-CN": {
    quest_1: { title: "修行初启", desc: "今日内完成任意 1 局跑酷挑战" },
    quest_2: { title: "连击宗师", desc: "达成连续 5 次答对的连击纪录" },
    quest_3: { title: "征服 10 座鸟居", desc: "准确穿越 10 座日语知识鸟居" },
  },
  "zh-TW": {
    quest_1: { title: "修行初啟", desc: "今日內完成任意 1 局跑酷挑戰" },
    quest_2: { title: "連擊宗師", desc: "達成連續 5 次答對的連擊紀錄" },
    quest_3: { title: "征服 10 座鳥居", desc: "準確穿越 10 座日語知識鳥居" },
  },
  ko: {
    quest_1: { title: "첫 번째 발걸음", desc: "오늘 아무 러닝 스테이지 1회 완주" },
    quest_2: { title: "콤보의 달인", desc: "5회 연속 정답 콤보 달성" },
    quest_3: { title: "10개의 토리이 정복", desc: "일본어 지식의 문 10개 정확히 통과" },
  },
  es: {
    quest_1: { title: "Primer Paso", desc: "Completa 1 carrera cualquiera hoy" },
    quest_2: { title: "Maestro del Combo", desc: "Logra una racha de 5 respuestas correctas seguidas" },
    quest_3: { title: "Conquista 10 Torii", desc: "Cruza correctamente 10 puertas del saber" },
  },
  fr: {
    quest_1: { title: "Première Foulée", desc: "Terminez 1 course de votre choix aujourd'hui" },
    quest_2: { title: "Maître du Combo", desc: "Atteignez une série de 5 réponses correctes d'affilée" },
    quest_3: { title: "Conquérir 10 Portails", desc: "Traversez avec succès 10 portails Torii du savoir" },
  },
  de: {
    quest_1: { title: "Erster Schritt", desc: "Schließe heute 1 beliebigen Lauf ab" },
    quest_2: { title: "Kombo-Meister", desc: "Erreiche eine Serie von 5 richtigen Antworten" },
    quest_3: { title: "10 Torii-Tore bezwingen", desc: "Wähle 10 Tore des Wissens fehlerfrei" },
  },
  id: {
    quest_1: { title: "Langkah Pertama", desc: "Selesaikan 1 ronde lari hari ini" },
    quest_2: { title: "Master Kombo", desc: "Capai rentetan 5 jawaban benar berturut-turut" },
    quest_3: { title: "Taklukkan 10 Gerbang Torii", desc: "Pilih 10 gerbang ilmu bahasa Jepang dengan tepat" },
  },
  th: {
    quest_1: { title: "ก้าวแรกแห่งการวิ่ง", desc: "วิ่งจบด่านใดก็ได้ 1 รอบในวันนี้" },
    quest_2: { title: "ปรมาจารย์คอมโบ", desc: "ทำคอมโบตอบถูกต่อเนื่อง 5 ข้อ" },
    quest_3: { title: "พิชิต 10 เสาโทริอิ", desc: "เลือกประตูความรู้ภาษาญี่ปุ่นถูกต้อง 10 ประตู" },
  },
  ru: {
    quest_1: { title: "Первый шаг", desc: "Завершите 1 любой забег сегодня" },
    quest_2: { title: "Мастер комбо", desc: "Достигните серии из 5 правильных ответов подряд" },
    quest_3: { title: "Покорите 10 Тории", desc: "Правильно выберите 10 врат знаний" },
  },
  pt: {
    quest_1: { title: "Primeiro Passo", desc: "Complete 1 corrida qualquer hoje" },
    quest_2: { title: "Mestre do Combo", desc: "Alcance uma sequência de 5 respostas certas" },
    quest_3: { title: "Conquiste 10 Portais Torii", desc: "Atravesse corretamente 10 portais do saber" },
  },
};

export function getLocalizedQuest(quest: DailyQuest, lang: NativeLanguage): DailyQuest {
  const trans = QUEST_TRANSLATIONS[lang]?.[quest.id] || QUEST_TRANSLATIONS.vi[quest.id];
  if (!trans) return quest;
  return {
    ...quest,
    title: trans.title,
    description: trans.desc,
  };
}

/* =====================================================================
 * 4. ELEMENT META LOCALIZATION (12 LANGUAGES)
 * ===================================================================== */

export interface ElementMeta {
  label: string;
  rewardTag: string;
  badgeClass: string;
}

const ELEMENT_LABELS: Record<NativeLanguage, Record<SpiritBeast["element"], { label: string; reward: string }>> = {
  vi: {
    FIRE: { label: "Hỏa Linh", reward: "+15% Điểm Combo" },
    WIND: { label: "Phong Linh", reward: "+0.8s Phản Xạ Cổng" },
    SPIRIT: { label: "Mộc Linh", reward: "+25% Thưởng XP" },
    THUNDER: { label: "Lôi Linh", reward: "Khiên Chắn 1 Va Chạm" },
    WATER: { label: "Băng Linh", reward: "Hút Ngọc & x2 Điểm Ngọc" },
  },
  en: {
    FIRE: { label: "Fire Spirit", reward: "+15% Combo Score" },
    WIND: { label: "Wind Spirit", reward: "+0.8s Gate Reflex" },
    SPIRIT: { label: "Wood Spirit", reward: "+25% XP Boost" },
    THUNDER: { label: "Thunder Spirit", reward: "1-Hit Shield" },
    WATER: { label: "Water Spirit", reward: "Magnet & 2x Jewels" },
  },
  "zh-CN": {
    FIRE: { label: "火灵", reward: "+15% 连击得分" },
    WIND: { label: "风灵", reward: "+0.8秒 鸟居反应" },
    SPIRIT: { label: "木灵", reward: "+25% 经验加成" },
    THUNDER: { label: "雷灵", reward: "抵挡1次碰撞护盾" },
    WATER: { label: "水灵", reward: "灵玉磁吸 & 2倍勾玉" },
  },
  "zh-TW": {
    FIRE: { label: "火靈", reward: "+15% 連擊得分" },
    WIND: { label: "風靈", reward: "+0.8秒 鳥居反應" },
    SPIRIT: { label: "木靈", reward: "+25% 經驗加成" },
    THUNDER: { label: "雷靈", reward: "抵擋1次碰撞護盾" },
    WATER: { label: "水靈", reward: "靈玉磁吸 & 2倍勾玉" },
  },
  ko: {
    FIRE: { label: "화령", reward: "+15% 콤보 점수" },
    WIND: { label: "풍령", reward: "+0.8초 게이트 반응" },
    SPIRIT: { label: "목령", reward: "+25% XP 부스트" },
    THUNDER: { label: "뇌령", reward: "1회 충돌 방패" },
    WATER: { label: "빙령", reward: "구슬 자석 & 2배 점수" },
  },
  es: {
    FIRE: { label: "Espíritu Fuego", reward: "+15% Puntos Combo" },
    WIND: { label: "Espíritu Viento", reward: "+0.8s Reacción Torii" },
    SPIRIT: { label: "Espíritu Madera", reward: "+25% Bono de XP" },
    THUNDER: { label: "Espíritu Trueno", reward: "Escudo 1 Choque" },
    WATER: { label: "Espíritu Agua", reward: "Imán & x2 Gemas" },
  },
  fr: {
    FIRE: { label: "Esprit Feu", reward: "+15% Points Combo" },
    WIND: { label: "Esprit Vent", reward: "+0,8s Réflexe Torii" },
    SPIRIT: { label: "Esprit Bois", reward: "+25% Bonus XP" },
    THUNDER: { label: "Esprit Foudre", reward: "Bouclier 1 Choc" },
    WATER: { label: "Esprit Eau", reward: "Aimant & x2 Orbes" },
  },
  de: {
    FIRE: { label: "Feuergeist", reward: "+15% Kombo-Punkte" },
    WIND: { label: "Windgeist", reward: "+0,8s Tor-Reaktion" },
    SPIRIT: { label: "Holzgeist", reward: "+25% XP-Bonus" },
    THUNDER: { label: "Donnergeist", reward: "1-Treffer-Schild" },
    WATER: { label: "Wassergeist", reward: "Magnet & 2x Perlen" },
  },
  id: {
    FIRE: { label: "Roh Api", reward: "+15% Poin Kombo" },
    WIND: { label: "Roh Angin", reward: "+0,8d Refleks Gerbang" },
    SPIRIT: { label: "Roh Kayu", reward: "+25% Bonus XP" },
    THUNDER: { label: "Roh Petir", reward: "Perisai 1 Tabrakan" },
    WATER: { label: "Roh Air", reward: "Magnet & 2x Permata" },
  },
  th: {
    FIRE: { label: "ภูตอัคคี", reward: "+15% คะแนนคอมโบ" },
    WIND: { label: "ภูตวายุ", reward: "+0.8วิ เวลาสังเกตประตู" },
    SPIRIT: { label: "ภูตพฤกษา", reward: "+25% โบนัส XP" },
    THUNDER: { label: "ภูตอสุนี", reward: "โล่ป้องกันการชน 1 ครั้ง" },
    WATER: { label: "ภูตวารี", reward: "แม่เหล็ก & คะแนนลูกแก้ว x2" },
  },
  ru: {
    FIRE: { label: "Дух Огня", reward: "+15% очков комбо" },
    WIND: { label: "Дух Ветра", reward: "+0,8 сек реакция" },
    SPIRIT: { label: "Дух Дерева", reward: "+25% бонус XP" },
    THUNDER: { label: "Дух Грома", reward: "Щит от 1 удара" },
    WATER: { label: "Дух Воды", reward: "Магнит & 2x очки" },
  },
  pt: {
    FIRE: { label: "Espírito Fogo", reward: "+15% Pontos Combo" },
    WIND: { label: "Espírito Vento", reward: "+0.8s Reflexo Portal" },
    SPIRIT: { label: "Espírito Madeira", reward: "+25% Bônus XP" },
    THUNDER: { label: "Espírito Trovão", reward: "Escudo de 1 Impacto" },
    WATER: { label: "Espírito Água", reward: "Ímã & x2 Gemas" },
  },
};

const ELEMENT_BADGES: Record<SpiritBeast["element"], string> = {
  FIRE: "bg-amber-500/20 text-amber-300 border-amber-400/50",
  WIND: "bg-teal-500/20 text-teal-200 border-teal-400/50",
  SPIRIT: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
  THUNDER: "bg-yellow-500/20 text-yellow-200 border-yellow-400/50",
  WATER: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/50",
};

export function getLocalizedElementMeta(element: SpiritBeast["element"], lang: NativeLanguage): ElementMeta {
  const meta = ELEMENT_LABELS[lang]?.[element] || ELEMENT_LABELS.vi[element];
  return {
    label: meta.label,
    rewardTag: meta.reward,
    badgeClass: ELEMENT_BADGES[element],
  };
}

/* =====================================================================
 * 5. QUESTION MODES & SPEED MODES (12 LANGUAGES)
 * ===================================================================== */

export interface QuestionModeMeta {
  id: YokaiQuestionMode;
  icon: string;
  kanji: string;
  label: string;
  desc: string;
}

const MODE_LOCALIZED: Record<NativeLanguage, Record<YokaiQuestionMode, { label: string; desc: string }>> = {
  vi: {
    ALL: { label: "Tất cả", desc: "Hỗn hợp tất cả dạng bài ôn luyện" },
    WORD_BOTH: { label: "Từ ⇄ Nghĩa", desc: "Từ vựng hai chiều (Nhật ⇄ Bản ngữ)" },
    WORD_TO_MEANING: { label: "Từ → Nghĩa", desc: "Nhìn từ tiếng Nhật chọn nghĩa tiếng Việt" },
    MEANING_TO_WORD: { label: "Nghĩa → Từ", desc: "Nhìn nghĩa / âm đọc chọn mặt chữ đúng" },
    SENTENCE_BOTH: { label: "Câu ⇄ Nghĩa", desc: "Mẫu câu văn hai chiều linh hoạt" },
    SENTENCE_TO_MEANING: { label: "Câu → Nghĩa", desc: "Dịch nhanh câu văn tiếng Nhật" },
    MEANING_TO_SENTENCE: { label: "Nghĩa → Câu", desc: "Chọn mẫu câu tiếng Nhật tương ứng" },
    LESSON_GRAMMAR: { label: "Ngữ pháp", desc: "Cấu trúc & ngữ pháp JLPT theo bài" },
  },
  en: {
    ALL: { label: "All Modes", desc: "Mix of all practice formats" },
    WORD_BOTH: { label: "Word ⇄ Meaning", desc: "Bi-directional vocabulary practice" },
    WORD_TO_MEANING: { label: "Word → Meaning", desc: "Look at Japanese word, pick English meaning" },
    MEANING_TO_WORD: { label: "Meaning → Word", desc: "Look at meaning / romaji, pick correct kanji/kana" },
    SENTENCE_BOTH: { label: "Sentence ⇄ Meaning", desc: "Bi-directional sentence translation reflex" },
    SENTENCE_TO_MEANING: { label: "Sentence → Meaning", desc: "Translate Japanese sentences quickly" },
    MEANING_TO_SENTENCE: { label: "Meaning → Sentence", desc: "Pick the matching Japanese sentence" },
    LESSON_GRAMMAR: { label: "Grammar", desc: "JLPT patterns & grammar by lesson" },
  },
  "zh-CN": {
    ALL: { label: "全模式", desc: "混合所有类型的练习题" },
    WORD_BOTH: { label: "词 ⇄ 意", desc: "双向词汇辨析（日 ⇄ 中）" },
    WORD_TO_MEANING: { label: "词 → 意", desc: "看日语词汇选择中文释义" },
    MEANING_TO_WORD: { label: "意 → 词", desc: "看中文释义选择正确日语字词" },
    SENTENCE_BOTH: { label: "句 ⇄ 意", desc: "双向例句翻译反应训练" },
    SENTENCE_TO_MEANING: { label: "句 → 意", desc: "快速理解日语例句含义" },
    MEANING_TO_SENTENCE: { label: "意 → 句", desc: "根据释义选择对应日语例句" },
    LESSON_GRAMMAR: { label: "文法", desc: "按课时与 JLPT 句型考点练习" },
  },
  "zh-TW": {
    ALL: { label: "全模式", desc: "混合所有類型的練習題" },
    WORD_BOTH: { label: "詞 ⇄ 意", desc: "雙向詞彙辨析（日 ⇄ 中）" },
    WORD_TO_MEANING: { label: "詞 → 意", desc: "看日語詞彙選擇繁體中文釋義" },
    MEANING_TO_WORD: { label: "意 → 詞", desc: "看中文釋義選擇正確日語字詞" },
    SENTENCE_BOTH: { label: "句 ⇄ 意", desc: "雙向例句翻譯反應訓練" },
    SENTENCE_TO_MEANING: { label: "句 → 意", desc: "快速理解日語例句含義" },
    MEANING_TO_SENTENCE: { label: "意 → 句", desc: "根據釋義選擇對應日語例句" },
    LESSON_GRAMMAR: { label: "文法", desc: "按課時與 JLPT 句型考點練習" },
  },
  ko: {
    ALL: { label: "전체", desc: "모든 연습 유형 혼합" },
    WORD_BOTH: { label: "단어 ⇄ 뜻", desc: "양방향 어휘 순발력 연습" },
    WORD_TO_MEANING: { label: "단어 → 뜻", desc: "일본어 단어를 보고 한국어 뜻 선택" },
    MEANING_TO_WORD: { label: "뜻 → 단어", desc: "뜻/발음을 보고 올바른 글자 선택" },
    SENTENCE_BOTH: { label: "문장 ⇄ 뜻", desc: "양방향 문장 번역 순발력" },
    SENTENCE_TO_MEANING: { label: "문장 → 뜻", desc: "일본어 문장 빠르게 해석하기" },
    MEANING_TO_SENTENCE: { label: "뜻 → 문장", desc: "뜻에 맞는 일본어 문장 선택" },
    LESSON_GRAMMAR: { label: "문법", desc: "JLPT 급수별 핵심 문법 패턴" },
  },
  es: {
    ALL: { label: "Todos", desc: "Mezcla de todos los formatos de práctica" },
    WORD_BOTH: { label: "Palabra ⇄ Significado", desc: "Vocabulario bidireccional" },
    WORD_TO_MEANING: { label: "Palabra → Significado", desc: "Mira la palabra japonesa y elige el significado" },
    MEANING_TO_WORD: { label: "Significado → Palabra", desc: "Mira el significado y elige la palabra correcta" },
    SENTENCE_BOTH: { label: "Frase ⇄ Significado", desc: "Traducción bidireccional de frases" },
    SENTENCE_TO_MEANING: { label: "Frase → Significado", desc: "Traduce frases japonesas rápidamente" },
    MEANING_TO_SENTENCE: { label: "Significado → Frase", desc: "Elige la frase japonesa adecuada" },
    LESSON_GRAMMAR: { label: "Gramática", desc: "Estructuras JLPT según lección" },
  },
  fr: {
    ALL: { label: "Tous", desc: "Mélange de tous les modes d'exercice" },
    WORD_BOTH: { label: "Mot ⇄ Sens", desc: "Vocabulaire bidirectionnel" },
    WORD_TO_MEANING: { label: "Mot → Sens", desc: "Voyez le mot japonais, choisissez le sens" },
    MEANING_TO_WORD: { label: "Sens → Mot", desc: "Voyez le sens, choisissez le bon mot japonais" },
    SENTENCE_BOTH: { label: "Phrase ⇄ Sens", desc: "Traduction bidirectionnelle de phrases" },
    SENTENCE_TO_MEANING: { label: "Phrase → Sens", desc: "Traduisez rapidement la phrase japonaise" },
    MEANING_TO_SENTENCE: { label: "Sens → Phrase", desc: "Choisissez la phrase japonaise correspondante" },
    LESSON_GRAMMAR: { label: "Grammaire", desc: "Structures et grammaire JLPT par leçon" },
  },
  de: {
    ALL: { label: "Alle", desc: "Mischung aller Übungsformen" },
    WORD_BOTH: { label: "Wort ⇄ Bedeutung", desc: "Zwei-Wege-Wortschatzübung" },
    WORD_TO_MEANING: { label: "Wort → Bedeutung", desc: "Japanisches Wort sehen, Bedeutung wählen" },
    MEANING_TO_WORD: { label: "Bedeutung → Wort", desc: "Bedeutung sehen, passendes Wort wählen" },
    SENTENCE_BOTH: { label: "Satz ⇄ Bedeutung", desc: "Zwei-Wege-Satzübersetzung" },
    SENTENCE_TO_MEANING: { label: "Satz → Bedeutung", desc: "Japanischen Beispielsatz schnell erfassen" },
    MEANING_TO_SENTENCE: { label: "Bedeutung → Satz", desc: "Passenden japanischen Satz auswählen" },
    LESSON_GRAMMAR: { label: "Grammatik", desc: "JLPT-Grammatikstrukturen nach Lektion" },
  },
  id: {
    ALL: { label: "Semua", desc: "Campuran semua bentuk latihan" },
    WORD_BOTH: { label: "Kata ⇄ Arti", desc: "Latihan kosakata dua arah" },
    WORD_TO_MEANING: { label: "Kata → Arti", desc: "Lihat kata Jepang, pilih arti yang tepat" },
    MEANING_TO_WORD: { label: "Arti → Kata", desc: "Lihat arti/bunyi, pilih huruf yang tepat" },
    SENTENCE_BOTH: { label: "Kalimat ⇄ Arti", desc: "Refleks terjemahan kalimat dua arah" },
    SENTENCE_TO_MEANING: { label: "Kalimat → Arti", desc: "Terjemahkan kalimat Jepang dengan cepat" },
    MEANING_TO_SENTENCE: { label: "Arti → Kalimat", desc: "Pilih kalimat Jepang yang sesuai" },
    LESSON_GRAMMAR: { label: "Tata Bahasa", desc: "Pola & tata bahasa JLPT sesuai bab" },
  },
  th: {
    ALL: { label: "ทั้งหมด", desc: "รวมข้อสอบทุกรูปแบบ" },
    WORD_BOTH: { label: "คำศัพท์ ⇄ ความหมาย", desc: "ฝึกคำศัพท์แบบไป-กลับ" },
    WORD_TO_MEANING: { label: "คำศัพท์ → ความหมาย", desc: "ดูคำศัพท์ภาษาญี่ปุ่นแล้วเลือกความหมาย" },
    MEANING_TO_WORD: { label: "ความหมาย → คำศัพท์", desc: "ดูความหมายแล้วเลือกตัวอักษรที่ถูกต้อง" },
    SENTENCE_BOTH: { label: "ประโยค ⇄ ความหมาย", desc: "ฝึกแปลประโยคแบบสองทาง" },
    SENTENCE_TO_MEANING: { label: "ประโยค → ความหมาย", desc: "แปลประโยคภาษาญี่ปุ่นอย่างรวดเร็ว" },
    MEANING_TO_SENTENCE: { label: "ความหมาย → ประโยค", desc: "เลือกประโยคภาษาญี่ปุ่นที่ตรงกับความหมาย" },
    LESSON_GRAMMAR: { label: "ไวยากรณ์", desc: "โครงสร้างและไวยากรณ์ JLPT ตามบทเรียน" },
  },
  ru: {
    ALL: { label: "Все", desc: "Смешанный режим всех заданий" },
    WORD_BOTH: { label: "Слово ⇄ Значение", desc: "Двусторонняя тренировка лексики" },
    WORD_TO_MEANING: { label: "Слово → Значение", desc: "Японское слово ➔ Выберите значение" },
    MEANING_TO_WORD: { label: "Значение → Слово", desc: "Значение ➔ Выберите правильное слово" },
    SENTENCE_BOTH: { label: "Предложение ⇄ Значение", desc: "Двусторонний перевод предложений" },
    SENTENCE_TO_MEANING: { label: "Предложение → Значение", desc: "Быстрый перевод предложений" },
    MEANING_TO_SENTENCE: { label: "Значение → Предложение", desc: "Подберите предложение по смыслу" },
    LESSON_GRAMMAR: { label: "Грамматика", desc: "Конструкции JLPT по урокам" },
  },
  pt: {
    ALL: { label: "Todos", desc: "Mistura de todos os formatos de treino" },
    WORD_BOTH: { label: "Palavra ⇄ Significado", desc: "Vocabulário bidirecional" },
    WORD_TO_MEANING: { label: "Palavra → Significado", desc: "Veja a palavra japonesa e escolha o sentido" },
    MEANING_TO_WORD: { label: "Significado → Palavra", desc: "Veja o significado e escolha a escrita correta" },
    SENTENCE_BOTH: { label: "Frase ⇄ Significado", desc: "Tradução bidirecional de frases" },
    SENTENCE_TO_MEANING: { label: "Frase → Significado", desc: "Traduza frases em japonês rapidamente" },
    MEANING_TO_SENTENCE: { label: "Significado → Frase", desc: "Escolha a frase correspondente em japonês" },
    LESSON_GRAMMAR: { label: "Gramática", desc: "Estruturas e gramática JLPT por lição" },
  },
};

export function getLocalizedQuestionModes(lang: NativeLanguage): QuestionModeMeta[] {
  const modes: { id: YokaiQuestionMode; icon: string; kanji: string }[] = [
    { id: "ALL", icon: "🔮", kanji: "全" },
    { id: "WORD_BOTH", icon: "🈳", kanji: "語" },
    { id: "WORD_TO_MEANING", icon: "📖", kanji: "訳" },
    { id: "MEANING_TO_WORD", icon: "✍️", kanji: "字" },
    { id: "SENTENCE_BOTH", icon: "📜", kanji: "文" },
    { id: "SENTENCE_TO_MEANING", icon: "💬", kanji: "解" },
    { id: "MEANING_TO_SENTENCE", icon: "🎯", kanji: "選" },
    { id: "LESSON_GRAMMAR", icon: "⛩️", kanji: "法" },
  ];
  return modes.map((m) => {
    const text = MODE_LOCALIZED[lang]?.[m.id] || MODE_LOCALIZED.vi[m.id];
    return {
      ...m,
      label: text.label,
      desc: text.desc,
    };
  });
}

export interface SpeedModeMeta {
  id: YokaiSpeedDifficulty;
  icon: string;
  kanji: string;
  label: string;
  speedDesc: string;
  desc: string;
}

const SPEED_LOCALIZED: Record<NativeLanguage, Record<YokaiSpeedDifficulty, { label: string; speedDesc: string; desc: string }>> = {
  vi: {
    EASY: { label: "Dễ", speedDesc: "10.5 m/s", desc: "Gia tốc êm ái, thích hợp vừa học vừa thư giãn" },
    MEDIUM: { label: "Vừa sức", speedDesc: "14.0 m/s", desc: "Tốc độ chuẩn kích thích phản xạ lướt cổng" },
    CUSTOM: { label: "Tự chọn", speedDesc: "Tuỳ chỉnh", desc: "Tự tay điều chỉnh vận tốc chạy theo ý muốn" },
  },
  en: {
    EASY: { label: "Easy", speedDesc: "10.5 m/s", desc: "Gentle pace, perfect for relaxed studying" },
    MEDIUM: { label: "Normal", speedDesc: "14.0 m/s", desc: "Balanced speed stimulating quick reflex" },
    CUSTOM: { label: "Custom", speedDesc: "Custom", desc: "Manually adjust running velocity to your liking" },
  },
  "zh-CN": {
    EASY: { label: "简单", speedDesc: "10.5 m/s", desc: "节奏温和，适合轻松记忆与巩固" },
    MEDIUM: { label: "适中", speedDesc: "14.0 m/s", desc: "标准速度，激发快速反应能力" },
    CUSTOM: { label: "自选", speedDesc: "自定义", desc: "随心手动调节跑酷滑行速度" },
  },
  "zh-TW": {
    EASY: { label: "簡單", speedDesc: "10.5 m/s", desc: "節奏溫和，適合輕鬆記憶與鞏固" },
    MEDIUM: { label: "適中", speedDesc: "14.0 m/s", desc: "標準速度，激發快速反應能力" },
    CUSTOM: { label: "自選", speedDesc: "自訂", desc: "隨心手動調節跑酷滑行速度" },
  },
  ko: {
    EASY: { label: "쉬움", speedDesc: "10.5 m/s", desc: "부드러운 속도, 편안한 학습에 적합" },
    MEDIUM: { label: "보통", speedDesc: "14.0 m/s", desc: "표준 속도, 순발력을 자극하는 러닝" },
    CUSTOM: { label: "사용자 설정", speedDesc: "직접 설정", desc: "원하는 속도를 자유롭게 조절" },
  },
  es: {
    EASY: { label: "Fácil", speedDesc: "10.5 m/s", desc: "Ritmo suave, ideal para repasar relajadamente" },
    MEDIUM: { label: "Normal", speedDesc: "14.0 m/s", desc: "Velocidad estándar para reflejos rápidos" },
    CUSTOM: { label: "Personalizado", speedDesc: "Ajustable", desc: "Ajusta la velocidad a tu preferencia" },
  },
  fr: {
    EASY: { label: "Facile", speedDesc: "10.5 m/s", desc: "Rythme doux, idéal pour réviser détendu" },
    MEDIUM: { label: "Normal", speedDesc: "14.0 m/s", desc: "Vitesse standard stimulant les réflexes" },
    CUSTOM: { label: "Personnalisé", speedDesc: "Réglable", desc: "Ajustez manuellement la vitesse" },
  },
  de: {
    EASY: { label: "Leicht", speedDesc: "10.5 m/s", desc: "Sanftes Tempo, ideal zum entspannten Lernen" },
    MEDIUM: { label: "Normal", speedDesc: "14.0 m/s", desc: "Standardtempo für schnelle Reflexe" },
    CUSTOM: { label: "Benutzerdefiniert", speedDesc: "Einstellbar", desc: "Laufgeschwindigkeit manuell anpassen" },
  },
  id: {
    EASY: { label: "Mudah", speedDesc: "10.5 m/s", desc: "Tempo santai, cocok untuk belajar tenang" },
    MEDIUM: { label: "Sedang", speedDesc: "14.0 m/s", desc: "Kecepatan standar untuk memicu refleks" },
    CUSTOM: { label: "Kustom", speedDesc: "Sesuaikan", desc: "Atur kecepatan lari sesuka Anda" },
  },
  th: {
    EASY: { label: "ง่าย", speedDesc: "10.5 m/s", desc: "ความเร็วพอเหมาะ ผ่อนคลายกับการเรียนรู้" },
    MEDIUM: { label: "ปานกลาง", speedDesc: "14.0 m/s", desc: "ความเร็วมาตรฐาน กระตุ้นปฏิกิริยาตอบสนอง" },
    CUSTOM: { label: "กำหนดเอง", speedDesc: "ปรับแต่ง", desc: "ปรับความเร็วในการวิ่งได้ตามต้องการ" },
  },
  ru: {
    EASY: { label: "Легко", speedDesc: "10.5 м/с", desc: "Плавный темп для спокойного изучения" },
    MEDIUM: { label: "Нормально", speedDesc: "14.0 м/с", desc: "Стандартная скорость для быстрых реакций" },
    CUSTOM: { label: "Свой выбор", speedDesc: "Настройка", desc: "Установите желаемую скорость забега" },
  },
  pt: {
    EASY: { label: "Fácil", speedDesc: "10.5 m/s", desc: "Ritmo suave, ideal para estudar com calma" },
    MEDIUM: { label: "Normal", speedDesc: "14.0 m/s", desc: "Velocidade padrão que estimula reflexos" },
    CUSTOM: { label: "Personalizado", speedDesc: "Ajustável", desc: "Ajuste a velocidade de corrida como preferir" },
  },
};

export function getLocalizedSpeedModes(lang: NativeLanguage): SpeedModeMeta[] {
  const modes: { id: YokaiSpeedDifficulty; icon: string; kanji: string }[] = [
    { id: "EASY", icon: "🍃", kanji: "易" },
    { id: "MEDIUM", icon: "⚔️", kanji: "中" },
    { id: "CUSTOM", icon: "⚙️", kanji: "自" },
  ];
  return modes.map((m) => {
    const text = SPEED_LOCALIZED[lang]?.[m.id] || SPEED_LOCALIZED.vi[m.id];
    return {
      ...m,
      label: text.label,
      speedDesc: text.speedDesc,
      desc: text.desc,
    };
  });
}

/* =====================================================================
 * 6. TUTORIAL SLIDES (12 LANGUAGES)
 * ===================================================================== */

export interface TutorialSlide {
  badge: string;
  title: string;
  desc: string;
  icon: string;
  controls: { key: string; action: string }[];
  tip: string;
}

export function getLocalizedTutorialSlides(lang: NativeLanguage): TutorialSlide[] {
  if (lang === "en") {
    return [
      {
        badge: "STEP 1 • 3-LANE RUNNING SYSTEM",
        title: "Endless Run & Rapid Lane Switching",
        desc: "Your spirit beast runs across 3 shrine lanes (Left - Center - Right). Switch lanes at any time to dodge hazards and align with the correct answer gate.",
        icon: "⛩️",
        controls: [
          { key: "A / D or ◀ / ▶", action: "Switch to Left / Right Lane" },
          { key: "Swipe Left / Right", action: "For mobile touchscreen" },
        ],
        tip: "Tip: Keep your eyes focused ahead to spot Torii gates as early as possible!",
      },
      {
        badge: "STEP 2 • EVADING 3 OBSTACLE TYPES",
        title: "Jump • Slide • Lane Switch",
        desc: "Each hazard requires the right counteraction. Timing your dodge right before impact triggers a PERFECT DODGE (+100 PTS & combo increase)!",
        icon: "⚡",
        controls: [
          { key: "🏮 Lantern / Bamboo / Void Pit", action: "JUMP OVER (W / Space / Swipe Up)" },
          { key: "🪵 Wooden Beam / Low Gate / Rope", action: "SLIDE UNDER (S / Swipe Down)" },
          { key: "🪨 Seal Rock / Fallen Tree / Pit", action: "MUST SWITCH LANE (A/D or ◀/▶)" },
        ],
        tip: "Collect Magatama Jewels 🟢 and Spirit Orbs ✨ along the track for +50 PTS!",
      },
      {
        badge: "STEP 3 • CHOOSE THE KNOWLEDGE GATE",
        title: "3 Torii Gates Corresponding to 3 Options",
        desc: "Every question presents 3 choices across the 3 running lanes [Gate A - Gate B - Gate C]. Read the prompt at the top and dash into the correct lane!",
        icon: "💮",
        controls: [
          { key: "Gate A (Left)", action: "Corresponds to Option 1" },
          { key: "Gate B (Center)", action: "Corresponds to Option 2" },
          { key: "Gate C (Right)", action: "Corresponds to Option 3" },
        ],
        tip: "The HUD at the top highlights your current lane so you never make a mistake!",
      },
      {
        badge: "STEP 4 • HEARTS & PURSUING ONI",
        title: "Protect Your Hearts & Repel Yōkai",
        desc: "An Oni demon relentlessly pursues you from behind! Maintaining high combos pushes it back, while losing hearts brings it dangerously close.",
        icon: "🔥",
        controls: [
          { key: "❤️ 3 Spirit Hearts", action: "Losing all 3 hearts ends the run" },
          { key: "🛡️ Yatagarasu Shield", action: "Nullifies first collision" },
          { key: "🐺 Okami White Wolf", action: "Auto-attracts orbs & 2x points at full HP" },
        ],
        tip: "After the run, review detailed explanations for every answered question!",
      },
    ];
  }

  if (lang === "zh-TW") {
    return [
      {
        badge: "第 1 步 • 3 賽道奔跑機制",
        title: "無盡神道 & 極速變道",
        desc: "靈獸在 3 條神道賽道（左 - 中 - 右）上奔跑。隨時變道規避障礙，並準確穿入正確答案鳥居。",
        icon: "⛩️",
        controls: [
          { key: "A / D 或 ◀ / ▶", action: "切換至左 / 右賽道" },
          { key: "左右滑動螢幕", action: "觸控螢幕專用手勢" },
        ],
        tip: "小提示：視線看向前方遠處，儘早發現鳥居並預判正確車道！",
      },
      {
        badge: "第 2 步 • 破解 3 類阻礙",
        title: "跳躍 • 鏟滑 • 緊急變道",
        desc: "不同障礙需要對應的克制動作。在臨近障礙物瞬間做出極限閃避將觸發【完美閃避】(+100 分並提升連擊)！",
        icon: "⚡",
        controls: [
          { key: "🏮 燈籠 / 竹柵 / 陷坑", action: "跳躍躲避 (W / 空白鍵 / 上滑)" },
          { key: "🪵 橫木 / 低門 / 注連繩", action: "俯身滑行 (S / 下滑)" },
          { key: "🪨 封印石 / 倒木 / 斷路", action: "必須變道 (A/D 或 ◀/▶)" },
        ],
        tip: "沿途收集勾玉 🟢 與靈玉 ✨ 可額外獲得 +50 分！",
      },
      {
        badge: "第 3 步 • 抉擇知識鳥居",
        title: "3 座鳥居對應 3 個答案選項",
        desc: "每道試題在 3 條賽道上分別對應 [鳥居 A - 鳥居 B - 鳥居 C]。看清螢幕上方的題目並衝入正確的賽道！",
        icon: "💮",
        controls: [
          { key: "鳥居 A (左道)", action: "對應選項 1" },
          { key: "鳥居 B (中道)", action: "對應選項 2" },
          { key: "鳥居 C (右道)", action: "對應選項 3" },
        ],
        tip: "頂部儀表盤會高亮顯示你當前所處賽道，確保操作清晰不混淆！",
      },
      {
        badge: "第 4 步 • 生命守護與鬼怪追逐",
        title: "護持生命心數 & 擊退追襲赤鬼",
        desc: "身後有惡鬼緊追不舍！保持高連擊可將惡鬼擊退至遠方，失去愛心則會使其逼近險境。",
        icon: "🔥",
        controls: [
          { key: "❤️ 3 顆靈火紅心", action: "耗盡 3 顆心後本次奔跑結束" },
          { key: "🛡️ 八咫烏神盾", action: "免疫首度障礙碰撞" },
          { key: "🐺 白神狼奧義", action: "滿血時自動吸附靈玉且勾玉得分翻倍" },
        ],
        tip: "賽後可隨時在結算面板查看每道題目的精細解析與例句！",
      },
    ];
  }

  if (lang === "ko") {
    return [
      {
        badge: "1단계 • 3개 레인 러닝 시스템",
        title: "끝없는 신사 길 & 신속한 레인 변경",
        desc: "영수가 3개 레인(왼쪽 - 중앙 - 오른쪽)을 질주합니다. 장애물을 피하고 정답 토리이로 진입하세요.",
        icon: "⛩️",
        controls: [
          { key: "A / D 또는 ◀ / ▶", action: "좌 / 우 레인으로 변경" },
          { key: "화면 좌우 스와이프", action: "모바일 터치스크린 전용" },
        ],
        tip: "팁: 시선을 멀리 두면 토리이를 더 일찍 발견할 수 있습니다!",
      },
      {
        badge: "2단계 • 3가지 유형 장애물 회피",
        title: "점프 • 슬라이딩 • 긴급 차선 변경",
        desc: "장애물마다 알맞은 회피 동작이 필요합니다. 아슬아슬하게 피하면 퍼펙트 회피(+100점)가 발동합니다!",
        icon: "⚡",
        controls: [
          { key: "🏮 제등 / 대나무 울타리 / 함정", action: "점프하여 넘기 (W / Space / 위로 스와이프)" },
          { key: "🪵 통나무 / 낮은 문 / 금줄", action: "슬라이딩 숙이기 (S / 아래로 스와이프)" },
          { key: "🪨 봉인석 / 쓰러진 나무 / 끊긴 길", action: "반드시 레인 변경 (A/D 또는 ◀/▶)" },
        ],
        tip: "트랙 위의 곡옥 🟢과 영옥 ✨을 모아 추가 점수(+50점)를 얻으세요!",
      },
      {
        badge: "3단계 • 지식의 토리이 선택",
        title: "3개 토리이와 3개 정답 보기",
        desc: "각 질문마다 3개 레인에 [토리이 A - B - C]가 나타납니다. 상단 문제를 읽고 올바른 레인으로 돌진하세요!",
        icon: "💮",
        controls: [
          { key: "토리이 A (왼쪽)", action: "보기 1번에 해당" },
          { key: "토리이 B (중앙)", action: "보기 2번에 해당" },
          { key: "토리이 C (오른쪽)", action: "보기 3번에 해당" },
        ],
        tip: "상단 HUD에서 현재 위치한 레인을 하이라이트하여 보여줍니다!",
      },
      {
        badge: "4단계 • 하트 수호와 오니 추격",
        title: "생명 하트 지키기 & 쫓아오는 오니 밀어내기",
        desc: "뒤에서 오니가 끈질기게 추격합니다! 콤보를 높게 유지하면 오니를 뒤로 밀어낼 수 있습니다.",
        icon: "🔥",
        controls: [
          { key: "❤️ 영혼 하트 3개", action: "하트 3개를 모두 잃으면 런 종료" },
          { key: "🛡️ 야타가라스 쉴드", action: "첫 번째 충돌 무효화" },
          { key: "🐺 오카미 하얀 늑대", action: "최대 체력 시 구슬 자동 흡수 및 점수 2배" },
        ],
        tip: "런이 끝난 후 모든 문제에 대한 상세 해설을 복습할 수 있습니다!",
      },
    ];
  }

  if (lang === "zh-CN") {
    return [
      {
        badge: "第 1 步 • 3 赛道奔跑机制",
        title: "无尽神道 & 极速变道",
        desc: "灵兽在 3 条神道赛道（左 - 中 - 右）上奔跑。随时变道规避障碍，并准确穿入正确答案鸟居。",
        icon: "⛩️",
        controls: [
          { key: "A / D 或 ◀ / ▶", action: "切换至左 / 右赛道" },
          { key: "左右滑动屏幕", action: "触屏手机专用手势" },
        ],
        tip: "小提示：视线看向前方远处，尽早发现鸟居并预判正确车道！",
      },
      {
        badge: "第 2 步 • 破解 3 类阻碍",
        title: "跳跃 • 铲滑 • 紧急变道",
        desc: "不同障碍需要对应的克制动作。在临近障碍物瞬间做出极限闪避将触发【完美闪避】(+100 分并提升连击)！",
        icon: "⚡",
        controls: [
          { key: "🏮 灯笼 / 竹栅 / 陷坑", action: "跳跃躲避 (W / 空格 / 上滑)" },
          { key: "🪵 横木 / 低门 / 注连绳", action: "俯身滑行 (S / 下滑)" },
          { key: "🪨 封印石 / 倒木 / 断路", action: "必须变道 (A/D 或 ◀/▶)" },
        ],
        tip: "沿途收集勾玉 🟢 与灵玉 ✨ 可额外获得 +50 分！",
      },
      {
        badge: "第 3 步 • 抉择知识鸟居",
        title: "3 座鸟居对应 3 个答案选项",
        desc: "每道试题在 3 条赛道上分别对应 [鸟居 A - 鸟居 B - 鸟居 C]。看清屏幕上方的题目并冲入正确的赛道！",
        icon: "💮",
        controls: [
          { key: "鸟居 A (左道)", action: "对应选项 1" },
          { key: "鸟居 B (中道)", action: "对应选项 2" },
          { key: "鸟居 C (右道)", action: "对应选项 3" },
        ],
        tip: "顶部仪表盘会高亮显示你当前所处赛道，确保操作清晰不混淆！",
      },
      {
        badge: "第 4 步 • 生命守护与鬼怪追逐",
        title: "护持生命心数 & 击退追袭赤鬼",
        desc: "身后有恶鬼紧追不舍！保持高连击可将恶鬼击退至远方，失去爱心则会使其逼近险境。",
        icon: "🔥",
        controls: [
          { key: "❤️ 3 颗灵火红心", action: "耗尽 3 颗心后本次奔跑结束" },
          { key: "🛡️ 八咫乌神盾", action: "免疫首度障碍碰撞" },
          { key: "🐺 白神狼奥义", action: "满血时自动吸附灵玉且勾玉得分翻倍" },
        ],
        tip: "赛后可随时在结算面板查看每道题目的精细解析与例句！",
      },
    ];
  }

  // Default Vietnamese slides
  return [
    {
      badge: "BƯỚC 1 • CƠ CHẾ CHẠY 3 LÀN",
      title: "Chạy Vô Tận & Đổi Làn Thần Tốc",
      desc: "Linh thú sẽ chạy theo 3 làn đường đền thờ (Trái - Giữa - Phải). Bạn có thể đổi làn bất cứ lúc nào để né chướng ngại và tiến vào đúng cổng đáp án.",
      icon: "⛩️",
      controls: [
        { key: "A / D hoặc ◀ / ▶", action: "Đổi sang làn Trái / Phải" },
        { key: "Vuốt màn hình Trái / Phải", action: "Dành cho điện thoại cảm ứng" },
      ],
      tip: "Mẹo: Giữ mắt nhìn xa phía trước để phát hiện cổng Torii sớm nhất có thể!",
    },
    {
      badge: "BƯỚC 2 • CHIẾN THUẬT NÉ 3 LOẠI VẬT CẢN",
      title: "Nhảy • Trượt • Đổi Làn Chuẩn Xác",
      desc: "Mỗi nhóm chướng ngại vật đòi hỏi đúng hành động khắc chế. Căn đúng nhịp sát vật cản sẽ kích hoạt NÉ CHUẨN (+100 PTS & tăng Combo)!",
      icon: "⚡",
      controls: [
        { key: "🏮 Đèn lồng / Rào tre / Hố sụt", action: "NHẢY QUA (W / Space / Vuốt Lên)" },
        { key: "🪵 Xà gỗ / Cổng thấp / Dây thừng", action: "TRƯỢT CÚI NGƯỜI (S / Vuốt Xuống)" },
        { key: "🪨 Đá phong ấn / Cây đổ / Đường sập", action: "BẮT BUỘC ĐỔI LÀN (A/D hoặc ◀/▶)" },
      ],
      tip: "Thu thập Ngọc Magatama 🟢 và Linh Ngọc ✨ trên đường chạy để nhận thêm +50 PTS!",
    },
    {
      badge: "BƯỚC 3 • CHỌN CỔNG TRI THỨC",
      title: "3 Cổng Torii Tương Ứng 3 Đáp Án",
      desc: "Mỗi câu hỏi sẽ hiện 3 đáp án tương ứng trên 3 làn chạy [Cổng A - Cổng B - Cổng C]. Hãy đọc câu hỏi trên đầu màn hình và chạy vào làn có đáp án đúng!",
      icon: "💮",
      controls: [
        { key: "Cổng A (Trái)", action: "Tương ứng với Đáp án số 1" },
        { key: "Cổng B (Giữa)", action: "Tương ứng với Đáp án số 2" },
        { key: "Cổng C (Phải)", action: "Tương ứng với Đáp án số 3" },
      ],
      tip: "Thanh hiển thị phụ trên đầu màn hình cũng sẽ highlight theo làn bạn đang đứng, giúp không bao giờ nhầm lẫn!",
    },
    {
      badge: "BƯỚC 4 • SINH MỆNH & YŌKAI TRUY ĐUỔI",
      title: "Giữ Vững Sinh Mệnh & Đẩy Lùi Yêu Quái",
      desc: "Phía sau bạn luôn có Ác Quỷ Oni truy đuổi! Duy trì Combo cao sẽ đẩy lùi yêu quái ra xa, trong khi mất Tim sẽ khiến chúng áp sát sát nút.",
      icon: "🔥",
      controls: [
        { key: "❤️ 3 Tim Sinh Mệnh", action: "Mất hết 3 tim màn chạy kết thúc" },
        { key: "🛡️ Khiên Thần Yatagarasu", action: "Miễn nhiễm 1 lần va chạm đầu tiên" },
        { key: "🐺 Bạch Lang Okami", action: "Tự động hút Ngọc Magatama & x2 điểm ngọc khi đầy tim" },
      ],
      tip: "Sau trận đấu, bạn sẽ được xem lại giải thích chi tiết cho từng câu hỏi đã qua!",
    },
  ];
}

/* =====================================================================
 * 7. LOADING TIPS (12 LANGUAGES)
 * ===================================================================== */

const LOADING_TIPS: Record<NativeLanguage, string[]> = {
  vi: [
    "Giữ mắt nhìn xa để thấy cổng Torii sớm nhất.",
    "Né sát vật cản đúng nhịp để nhận +100 điểm NÉ CHUẨN.",
    "Combo càng cao, Oni phía sau càng bị đẩy lùi.",
    "Cuối lượt chạy bạn sẽ xem lại giải thích từng câu hỏi.",
    "Bạn có thể chọn chế độ câu hỏi (Từ vựng, Câu, Ngữ pháp) tại Sảnh.",
    "Tốc độ di chuyển có thể đặt chế độ Dễ, Vừa sức hoặc Tự chọn.",
  ],
  en: [
    "Keep your eyes ahead to spot Torii gates as early as possible.",
    "Dodge obstacles at the last second for +100 PERFECT DODGE points.",
    "The higher your combo, the further the pursuing Oni is pushed back.",
    "Review detailed explanations for each question at the end of the run.",
    "Select your preferred practice mode (Vocab, Sentence, Grammar) in the Hub.",
    "Choose Easy, Normal, or Custom running speed anytime.",
  ],
  "zh-CN": [
    "视线放远，尽早发现前方的鸟居与答题赛道。",
    "临界贴身闪避障碍可触发 +100 分【完美闪避】奖励。",
    "连击数越高，身后追赶的恶鬼越会被推至远处。",
    "奔跑结束后可在结算页查看每道题目的精细解析。",
    "在大厅可自由切换词汇、例句或文法等练习模式。",
    "可在简单、适中或自定义速度之间自由选择。",
  ],
  "zh-TW": [
    "視線放遠，儘早發現前方的鳥居與答題賽道。",
    "臨界貼身閃避障礙可觸發 +100 分【完美閃避】獎勵。",
    "連擊數越高，身後追趕的惡鬼越會被推至遠處。",
    "奔跑結束後可在結算頁查看每道題目的精細解析。",
    "在大廳可自由切換詞彙、例句或文法等練習模式。",
    "可在簡單、適中或自訂速度之間自由選擇。",
  ],
  ko: [
    "시선을 멀리 두면 토리이 문을 더 일찍 발견할 수 있습니다.",
    "장애물 바로 앞에서 피하면 +100점 완벽 회피 보너스를 받습니다.",
    "콤보가 높을수록 뒤쫓아오는 오니가 멀리 밀려납니다.",
    "달리기가 끝난 뒤 각 문제의 상세한 해설을 확인할 수 있습니다.",
    "로비에서 어휘, 문장, 문법 모드를 자유롭게 선택할 수 있습니다.",
    "쉬움, 보통 또는 맞춤 속도를 언제든 변경할 수 있습니다.",
  ],
  es: [
    "Mira hacia adelante para ver las puertas Torii lo antes posible.",
    "Esquiva en el último segundo para obtener +100 pts de ESQUIVE PERFECTO.",
    "Cuanto mayor sea tu combo, más lejos quedará el Oni perseguidor.",
    "Al terminar la carrera, revisa las explicaciones detalladas.",
    "Elige el modo de práctica (Vocabulario, Frases, Gramática) en la Sala.",
    "Ajusta la velocidad a Fácil, Normal o Personalizada en cualquier momento.",
  ],
  fr: [
    "Gardez les yeux vers l'avant pour repérer les portails Torii au plus tôt.",
    "Esquivez au dernier moment pour gagner +100 pts d'ESQUIVE PARFAITE.",
    "Plus votre combo est élevé, plus l'Oni poursuivant est repoussé.",
    "Consultez les explications détaillées à la fin de chaque course.",
    "Choisissez votre mode d'exercice (Vocabulaire, Phrases, Grammaire) au Hub.",
    "Ajustez la vitesse en Facile, Normal ou Personnalisé selon vos envies.",
  ],
  de: [
    "Blicke nach vorn, um Torii-Tore frühzeitig zu erkennen.",
    "Weiche im letzten Moment aus für +100 Punkte PERFEKTES AUSWEICHEN.",
    "Je höher die Kombo, desto weiter wird der verfolgende Oni zurückgedrängt.",
    "Prüfe am Ende jedes Laufs detaillierte Erklärungen zu den Fragen.",
    "Wähle im Hub deinen gewünschten Modus (Wortschatz, Sätze, Grammatik).",
    "Passe die Geschwindigkeit auf Leicht, Normal oder Eigenes Tempo an.",
  ],
  id: [
    "Arahkan pandangan ke depan agar gerbang Torii terlihat lebih awal.",
    "Hindari rintangan di saat terakhir untuk +100 poin HINDARAN SEMPURNA.",
    "Semakin tinggi kombo Anda, semakin jauh Oni pengejar terdorong mundur.",
    "Lihat penjelasan lengkap setiap pertanyaan di akhir ronde lari.",
    "Pilih mode latihan (Kosakata, Kalimat, Tata Bahasa) di Lobi.",
    "Atur kecepatan lari ke Mudah, Sedang, atau Kustom sesuka Anda.",
  ],
  th: [
    "มองไปข้างหน้าเพื่อสังเกตเห็นเสาโทริอิให้เร็วที่สุด",
    "หลบสิ่งกีดขวางในจังหวะกระชั้นชิดเพื่อรับ +100 คะแนนหลบสมบูรณ์แบบ",
    "ยิ่งคอมโบสูง อสูรโอนิที่ตามหลังจะยิ่งถูกผลักออกไปไกลขึ้น",
    "ดูคำอธิบายอย่างละเอียดของทุกข้อได้หลังจบการวิ่ง",
    "เลือกโหมดฝึกฝน (คำศัพท์ ประโยค ไวยากรณ์) ได้ที่ห้องโถง",
    "ปรับความเร็วเป็น ง่าย ปานกลาง หรือ กำหนดเอง ได้ทุกเมื่อ",
  ],
  ru: [
    "Смотрите вперед, чтобы вовремя заметить врата Тории.",
    "Уклоняйтесь в последний миг для бонуса +100 ИДЕАЛЬНОЕ УКЛОНЕНИЕ.",
    "Чем выше комбо, тем дальше отступает преследующий Они.",
    "В конце забега изучите подробные объяснения к каждому вопросу.",
    "Выбирайте режим (Слова, Предложения, Грамматика) в главном зале.",
    "Настройте скорость: Легко, Нормально или Своя скорость.",
  ],
  pt: [
    "Olhe para frente para avistar os portais Torii o quanto antes.",
    "Desvie no último segundo para ganhar +100 pts de ESQUIVA PERFEITA.",
    "Quanto maior o seu combo, mais para trás o Oni perseguidor é empurrado.",
    "Reveja as explicações detalhadas de cada questão ao final da corrida.",
    "Escolha o modo de prática (Vocabulário, Frases, Gramática) no Saguoão.",
    "Defina a velocidade como Fácil, Normal ou Personalizada quando quiser.",
  ],
};

export function getLocalizedTips(lang: NativeLanguage): string[] {
  return LOADING_TIPS[lang] || LOADING_TIPS.vi;
}

/* =====================================================================
 * 8. DYNAMIC QUESTION LOCALIZATION
 * ===================================================================== */

export function localizeYokaiQuestion(q: YokaiQuestion, lang: NativeLanguage): YokaiQuestion {
  if (lang === "vi") return q;

  let prompt = q.prompt;
  let subPrompt = q.subPrompt;

  // Kana questions pattern
  const kanaMatch = prompt.match(/Chữ cái (Hiragana|Katakana):\s*['"„]([^'"“]+)['"”]\s*đọc là gì\?/i);
  if (kanaMatch) {
    const script = kanaMatch[1];
    const char = kanaMatch[2];
    if (lang === "en") prompt = `How is the ${script} character '${char}' read?`;
    else if (lang === "zh-CN") prompt = `${script === "Hiragana" ? "平假名" : "片假名"}字符 '${char}' 读作什么？`;
    else if (lang === "zh-TW") prompt = `${script === "Hiragana" ? "平假名" : "片假名"}字符 '${char}' 讀作什麼？`;
    else if (lang === "ko") prompt = `${script === "Hiragana" ? "히라가나" : "가타카나"} '${char}'의 발음은?`;
    else if (lang === "es") prompt = `¿Cómo se lee el carácter ${script} '${char}'?`;
    else if (lang === "fr") prompt = `Comment se lit le caractère ${script} '${char}' ?`;
    else if (lang === "de") prompt = `Wie wird das ${script}-Zeichen '${char}' gelesen?`;
    else if (lang === "id") prompt = `Bagaimana karakter ${script} '${char}' dibaca?`;
    else if (lang === "th") prompt = `ตัวอักษร ${script === "Hiragana" ? "ฮิรางานะ" : "คาตากานะ"} '${char}' อ่านว่าอย่างไร?`;
    else if (lang === "ru") prompt = `Как читается знак ${script} '${char}'?`;
    else if (lang === "pt") prompt = `Como se lê o caractere ${script} '${char}'?`;
  }

  const whichKanaMatch = prompt.match(/Chữ (Hiragana|Katakana) nào sau đây đọc là\s*['"„]([^'"“]+)['"”]\?/i);
  if (whichKanaMatch) {
    const script = whichKanaMatch[1];
    const romaji = whichKanaMatch[2];
    if (lang === "en") prompt = `Which ${script} character is read as '${romaji}'?`;
    else if (lang === "zh-CN") prompt = `哪个${script === "Hiragana" ? "平假名" : "片假名"}读作 '${romaji}'？`;
    else if (lang === "zh-TW") prompt = `哪個${script === "Hiragana" ? "平假名" : "片假名"}讀作 '${romaji}'？`;
    else if (lang === "ko") prompt = `'${romaji}'(으)로 발음되는 ${script === "Hiragana" ? "히라가나" : "가타카나"}는?`;
    else if (lang === "es") prompt = `¿Qué carácter ${script} se lee como '${romaji}'?`;
    else if (lang === "fr") prompt = `Quel caractère ${script} se lit '${romaji}' ?`;
    else if (lang === "de") prompt = `Welches ${script}-Zeichen wird als '${romaji}' gelesen?`;
    else if (lang === "id") prompt = `Karakter ${script} manakah yang dibaca '${romaji}'?`;
    else if (lang === "th") prompt = `ตัวอักษร ${script === "Hiragana" ? "ฮิรางานะ" : "คาตากานะ"} ตัวใดอ่านว่า '${romaji}'?`;
    else if (lang === "ru") prompt = `Какой знак ${script} читается как '${romaji}'?`;
    else if (lang === "pt") prompt = `Qual caractere ${script} é lido como '${romaji}'?`;
  }

  // Vocab pattern: "Từ vựng 'X' có nghĩa là gì?"
  const vocabMatch = prompt.match(/Từ vựng\s*['"„]([^'"“]+)['"”]\s*có nghĩa là gì\?/i);
  if (vocabMatch) {
    const word = vocabMatch[1];
    if (lang === "en") prompt = `What is the meaning of '${word}'?`;
    else if (lang === "zh-CN") prompt = `词汇 '${word}' 是什么意思？`;
    else if (lang === "zh-TW") prompt = `詞彙 '${word}' 是什麼意思？`;
    else if (lang === "ko") prompt = `단어 '${word}'의 의미는 무엇인가요?`;
    else if (lang === "es") prompt = `¿Qué significa la palabra '${word}'?`;
    else if (lang === "fr") prompt = `Que signifie le mot '${word}' ?`;
    else if (lang === "de") prompt = `Was bedeutet das Wort '${word}'?`;
    else if (lang === "id") prompt = `Apa arti kata '${word}'?`;
    else if (lang === "th") prompt = `คำศัพท์ '${word}' มีความหมายว่าอย่างไร?`;
    else if (lang === "ru") prompt = `Что означает слово '${word}'?`;
    else if (lang === "pt") prompt = `Qual é o significado da palavra '${word}'?`;
  }

  // Meaning pattern: "Từ tiếng Nhật nào có nghĩa là: 'X'?"
  const meaningMatch = prompt.match(/Từ tiếng Nhật nào có nghĩa là:\s*['"„]([^'"“]+)['"”]\?/i);
  if (meaningMatch) {
    const meaning = meaningMatch[1];
    if (lang === "en") prompt = `Which Japanese word means: '${meaning}'?`;
    else if (lang === "zh-CN") prompt = `哪个日语词汇表示：'${meaning}'？`;
    else if (lang === "zh-TW") prompt = `哪個日語詞彙表示：'${meaning}'？`;
    else if (lang === "ko") prompt = `'${meaning}'을(를) 뜻하는 일본어 단어는?`;
    else if (lang === "es") prompt = `¿Qué palabra japonesa significa: '${meaning}'?`;
    else if (lang === "fr") prompt = `Quel mot japonais signifie : '${meaning}' ?`;
    else if (lang === "de") prompt = `Welches japanische Wort bedeutet: '${meaning}'?`;
    else if (lang === "id") prompt = `Kata bahasa Jepang manakah yang berarti: '${meaning}'?`;
    else if (lang === "th") prompt = `คำศัพท์ภาษาญี่ปุ่นใดหมายถึง: '${meaning}'?`;
    else if (lang === "ru") prompt = `Какое японское слово означает: '${meaning}'?`;
    else if (lang === "pt") prompt = `Qual palavra em japonês significa: '${meaning}'?`;
  }

  // Listening prompt
  if (prompt.includes("Nghe câu:") || prompt.includes("Nghe phát âm:")) {
    if (lang === "en") prompt = prompt.replace("Nghe câu:", "Listen to the sentence:").replace("Nghe phát âm:", "Listen to pronunciation:");
    else if (lang === "zh-CN") prompt = prompt.replace("Nghe câu:", "听录音例句：").replace("Nghe phát âm:", "听发音：");
    else if (lang === "zh-TW") prompt = prompt.replace("Nghe câu:", "聽錄音例句：").replace("Nghe phát âm:", "聽發音：");
    else if (lang === "ko") prompt = prompt.replace("Nghe câu:", "문장 듣기:").replace("Nghe phát âm:", "발음 듣기:");
  }

  if (subPrompt && subPrompt.includes("Chọn chữ Hiragana đúng")) {
    if (lang === "en") subPrompt = "Choose the correct Hiragana character";
    else if (lang === "zh-CN") subPrompt = "选择正确的平假名字形";
    else if (lang === "zh-TW") subPrompt = "選擇正確的平假名字形";
    else if (lang === "ko") subPrompt = "올바른 히라가나 글자 선택";
  }

  return {
    ...q,
    prompt,
    subPrompt,
  };
}


/* =====================================================================
 * 9. OBSTACLE METADATA LOCALIZATION
 * ===================================================================== */

export function getObstacleMetaLocalized(type: ObstacleType, lang: NativeLanguage = "vi"): {
  name: string;
  dodgeTip: string;
  action: ObstacleAction;
} {
  const isEn = lang === "en";
  const isZh = lang === "zh-CN" || lang === "zh-TW";
  const isKo = lang === "ko";

  switch (type) {
    case "LANTERN_LOW":
      return {
        name: isEn ? "Low Lantern" : isZh ? "低位提灯" : isKo ? "낮은 제등" : "Đèn lồng thấp",
        dodgeTip: isEn ? "Jump Over (W / Space / Swipe Up)" : isZh ? "跳跃跨过 (W / 空格 / 上滑)" : isKo ? "점프하기 (W / Space / 위로 스와이프)" : "Nhảy lên (W / Space / Vuốt lên)",
        action: "JUMP",
      };
    case "BAMBOO_HURDLE":
      return {
        name: isEn ? "Bamboo Hurdle" : isZh ? "低位竹栅" : isKo ? "낮은 대나무 울타리" : "Rào chắn tre thấp",
        dodgeTip: isEn ? "Jump Over (W / Space / Swipe Up)" : isZh ? "跳跃跨过 (W / 空格 / 上滑)" : isKo ? "점프하기 (W / Space / 위로 스와이프)" : "Nhảy lên (W / Space / Vuốt lên)",
        action: "JUMP",
      };
    case "VOID_PIT":
      return {
        name: isEn ? "Spirit Void Pit" : isZh ? "幽冥陷坑" : isKo ? "영계 함정 구덩이" : "Hố sụt linh giới",
        dodgeTip: isEn ? "Leap Over Pit (W / Space / Swipe Up)" : isZh ? "飞跃陷坑 (W / 空格 / 上滑)" : isKo ? "뛰어넘기 (W / Space / 위로 스와이프)" : "Nhảy vọt qua hố (W / Space / Vuốt lên)",
        action: "JUMP",
      };
    case "SHIMENAWA_HIGH":
      return {
        name: isEn ? "Shimenawa Rope" : isZh ? "高位注连绳" : isKo ? "시메나와 금줄" : "Dây thừng Shimenawa",
        dodgeTip: isEn ? "Slide Under (S / Swipe Down)" : isZh ? "俯身滑行 (S / 下滑)" : isKo ? "슬라이딩 (S / 아래로 스와이프)" : "Trượt cúi người (S / Vuốt xuống)",
        action: "SLIDE",
      };
    case "WOODEN_BEAM":
      return {
        name: isEn ? "Shrine Wooden Beam" : isZh ? "古社横木" : isKo ? "신사 대들보" : "Xà gỗ đền cổ",
        dodgeTip: isEn ? "Slide Under Beam (S / Swipe Down)" : isZh ? "低头滑行 (S / 下滑)" : isKo ? "숙여서 슬라이딩 (S / 아래로 스와이프)" : "Trượt cúi dưới xà (S / Vuốt xuống)",
        action: "SLIDE",
      };
    case "LOW_GATE":
      return {
        name: isEn ? "Low Barrier Gate" : isZh ? "低位横门" : isKo ? "낮은 차단문" : "Cổng chắn tầm thấp",
        dodgeTip: isEn ? "Slide Under Gate (S / Swipe Down)" : isZh ? "俯身滑入 (S / 下滑)" : isKo ? "낮게 슬라이딩 (S / 아래로 스와이프)" : "Trượt cúi qua cổng (S / Vuốt xuống)",
        action: "SLIDE",
      };
    case "SEAL_ROCK":
      return {
        name: isEn ? "Sealed Sacred Rock" : isZh ? "封印灵石" : isKo ? "봉인된 바위" : "Tảng đá phong ấn",
        dodgeTip: isEn ? "Switch Lane (A/D or ◀/▶)" : isZh ? "紧急变道 (A/D 或 ◀/▶)" : isKo ? "차선 변경 (A/D 또는 ◀/▶)" : "Đổi làn sang bên (A/D hoặc ◀/▶)",
        action: "SWITCH_LANE",
      };
    case "FALLEN_TREE":
      return {
        name: isEn ? "Fallen Ancient Tree" : isZh ? "倒伏古木" : isKo ? "쓰러진 고목" : "Thân cây cổ thụ đổ",
        dodgeTip: isEn ? "Switch to Clear Lane (A/D or ◀/▶)" : isZh ? "变入空道 (A/D 或 ◀/▶)" : isKo ? "빈 차선으로 이동 (A/D 또는 ◀/▶)" : "Đổi sang làn trống (A/D hoặc ◀/▶)",
        action: "SWITCH_LANE",
      };
    case "COLLAPSED_ROAD":
      return {
        name: isEn ? "Collapsed Road" : isZh ? "断损路段" : isKo ? "무너진 길" : "Đoạn đường sập chắn lối",
        dodgeTip: isEn ? "Switch to Safe Lane (A/D or ◀/▶)" : isZh ? "切至安全道 (A/D 或 ◀/▶)" : isKo ? "안전한 길로 이동 (A/D 또는 ◀/▶)" : "Đổi sang làn an toàn (A/D hoặc ◀/▶)",
        action: "SWITCH_LANE",
      };
    default:
      return {
        name: isEn ? "Spirit Realm Hazard" : isZh ? "灵界障碍" : isKo ? "영계 장애물" : "Chướng ngại linh giới",
        dodgeTip: isEn ? "Switch Lane to Dodge" : isZh ? "迅速变道规避" : isKo ? "차선 변경하여 회피" : "Đổi làn sang bên",
        action: "SWITCH_LANE",
      };
  }
}



/* =====================================================================
 * 10. MODE PREVIEW INFO LOCALIZATION
 * ===================================================================== */

export interface ModePreviewInfo {
  tag: string;
  desc: string;
  sampleQuestion: string;
  sampleSub: string;
  sampleOptions: [string, string, string];
  correctIndex: number;
}

export function getModePreviewInfoLocalized(
  mode: YokaiQuestionMode,
  level: string,
  lang: NativeLanguage = "vi"
): ModePreviewInfo {
  const isEn = lang === "en";
  const isZhTW = lang === "zh-TW";
  const isZhCN = lang === "zh-CN";
  const isKo = lang === "ko";

  if (level === "KANA") {
    switch (mode) {
      case "MEANING_TO_WORD":
        if (isZhTW) {
          return {
            tag: "看羅馬字 ➔ 選假名文字",
            desc: "題目顯示 Romaji 拼音，驅動靈獸衝入對應假名文字的鳥居！",
            sampleQuestion: "哪個平假名發音為「KA」？",
            sampleSub: "鳥居將顯示平假名 / 片假名文字",
            sampleOptions: ["さ (SA)", "か (KA)", "た (TA)"],
            correctIndex: 1,
          };
        }
        if (isZhCN) {
          return {
            tag: "看罗马字 ➔ 选假名文字",
            desc: "题目显示 Romaji 拼音，驱动灵兽冲入对应假名文字的鸟居！",
            sampleQuestion: "哪个平假名发音为「KA」？",
            sampleSub: "鸟居将显示平假名 / 片假名文字",
            sampleOptions: ["さ (SA)", "か (KA)", "た (TA)"],
            correctIndex: 1,
          };
        }
        if (isEn) {
          return {
            tag: "Romaji ➔ Select Kana Character",
            desc: "Prompt shows Romaji pronunciation. Steer into the Torii gate bearing the matching Kana!",
            sampleQuestion: "Which Hiragana character is read as 'KA'?",
            sampleSub: "Torii gate shows Hiragana / Katakana character",
            sampleOptions: ["さ (SA)", "か (KA)", "た (TA)"],
            correctIndex: 1,
          };
        }
        if (isKo) {
          return {
            tag: "로마자 발음 ➔ 가나 문자 선택",
            desc: "로마자 발음이 주어집니다. 해당하는 가나 문자가 적힌 토리이로 질주하세요!",
            sampleQuestion: "어느 히라가나 글자가 'KA'로 발음되나요?",
            sampleSub: "토리이 문에 히라가나/가타카나 글자가 표시됩니다",
            sampleOptions: ["さ (SA)", "か (KA)", "た (TA)"],
            correctIndex: 1,
          };
        }
        return {
          tag: "Nhìn âm Romaji ➔ Chọn mặt chữ Kana",
          desc: "Đề bài hiện âm đọc Romaji. Hãy lái Linh thú lướt vào Cổng Torii mang mặt chữ Kana tương ứng!",
          sampleQuestion: "Chữ Hiragana nào phát âm là 'KA'?",
          sampleSub: "Cổng Torii sẽ hiển thị mặt chữ Hiragana / Katakana",
          sampleOptions: ["さ (SA)", "か (KA)", "た (TA)"],
          correctIndex: 1,
        };

      case "WORD_TO_MEANING":
        if (isZhTW) {
          return {
            tag: "看假名文字 ➔ 選羅馬字拼音",
            desc: "題目顯示假名文字，衝入包含精確 Romaji 拼音的鳥居！",
            sampleQuestion: "平假名「き」讀作什麼？",
            sampleSub: "鳥居將顯示 Romaji 羅馬拼音",
            sampleOptions: ["SA", "KI", "KU"],
            correctIndex: 1,
          };
        }
        if (isZhCN) {
          return {
            tag: "看假名文字 ➔ 选罗马字拼音",
            desc: "题目显示假名文字，冲入包含精确 Romaji 拼音的鸟居！",
            sampleQuestion: "平假名「き」读作什么？",
            sampleSub: "鸟居将显示 Romaji 罗马拼音",
            sampleOptions: ["SA", "KI", "KU"],
            correctIndex: 1,
          };
        }
        if (isEn) {
          return {
            tag: "Kana Character ➔ Select Romaji",
            desc: "Prompt shows Kana. Dash into the Torii gate with the exact Romaji reading!",
            sampleQuestion: "How is the Hiragana character 'き' pronounced?",
            sampleSub: "Torii gate displays Romaji reading",
            sampleOptions: ["SA", "KI", "KU"],
            correctIndex: 1,
          };
        }
        if (isKo) {
          return {
            tag: "가나 문자 ➔ 로마자 발음 선택",
            desc: "가나 문자가 주어집니다. 정확한 로마자 발음이 적힌 토리이로 돌진하세요!",
            sampleQuestion: "히라가나 'き'의 올바른 발음은?",
            sampleSub: "토리이 문에 로마자 발음이 표시됩니다",
            sampleOptions: ["SA", "KI", "KU"],
            correctIndex: 1,
          };
        }
        return {
          tag: "Nhìn mặt chữ Kana ➔ Chọn âm đọc Romaji",
          desc: "Đề bài hiện mặt chữ Kana. Hãy lướt vào Cổng Torii có phiên âm Romaji chính xác!",
          sampleQuestion: "Chữ Hiragana: 'き' phát âm là gì?",
          sampleSub: "Cổng Torii sẽ hiển thị phiên âm Romaji",
          sampleOptions: ["SA", "KI", "KU"],
          correctIndex: 1,
        };

      case "WORD_BOTH":
        if (isZhTW) {
          return {
            tag: "假名雙向 (字形 ⇄ 拼音)",
            desc: "靈活反應：交替在辨識假名字形與選擇 Romaji 拼音之間訓練。",
            sampleQuestion: "「さ」讀作什麼？ ⇄ 「SA」是哪個字？",
            sampleSub: "在假名字形與 Romaji 間快速切換",
            sampleOptions: ["SA", "TA", "NA"],
            correctIndex: 0,
          };
        }
        if (isZhCN) {
          return {
            tag: "假名双向 (字形 ⇄ 拼音)",
            desc: "灵活反应：交替在辨识假名字形与选择 Romaji 拼音之间训练。",
            sampleQuestion: "「さ」读作什么？ ⇄ 「SA」是哪个字？",
            sampleSub: "在假名字形与 Romaji 间快速切换",
            sampleOptions: ["SA", "TA", "NA"],
            correctIndex: 0,
          };
        }
        if (isEn) {
          return {
            tag: "Bi-directional Kana (Symbol ⇄ Reading)",
            desc: "Train flexible reflex: alternating between symbol identification and Romaji selection.",
            sampleQuestion: "How to read 'さ'? ⇄ Which letter is 'SA'?",
            sampleSub: "Alternating between Kana and Romaji",
            sampleOptions: ["SA", "TA", "NA"],
            correctIndex: 0,
          };
        }
        if (isKo) {
          return {
            tag: "양방향 가나 (글자 ⇄ 발음)",
            desc: "문자 식별과 로마자 발음 선택을 번갈아 연습하여 빠른 반사신경을 기릅니다.",
            sampleQuestion: "'さ'는 어떻게 읽나요? ⇄ 'SA'는 어느 글자?",
            sampleSub: "문자와 로마자 교차 훈련",
            sampleOptions: ["SA", "TA", "NA"],
            correctIndex: 0,
          };
        }
        return {
          tag: "Kana 2 chiều (Mặt chữ ⇄ Âm đọc)",
          desc: "Luyện phản xạ linh hoạt: xen kẽ giữa nhận diện mặt chữ Kana và chọn phiên âm Romaji.",
          sampleQuestion: "Chữ 'さ' đọc là gì? ⇄ 'SA' là chữ nào?",
          sampleSub: "Đổi qua lại giữa mặt chữ và phiên âm Romaji",
          sampleOptions: ["SA", "TA", "NA"],
          correctIndex: 0,
        };

      case "SENTENCE_TO_MEANING":
      case "SENTENCE_BOTH":
      case "MEANING_TO_SENTENCE":
      case "LESSON_GRAMMAR":
        if (isZhTW) {
          return {
            tag: "假名複合詞彙應用",
            desc: "應用五十音表辨識常用複合詞與基本音拍 (Mora)。",
            sampleQuestion: "詞彙「さくら」讀作什麼？意思是？",
            sampleSub: "假名拼詞生活應用",
            sampleOptions: ["Sakura (櫻花)", "Neko (貓咪)", "Inu (狗狗)"],
            correctIndex: 0,
          };
        }
        if (isZhCN) {
          return {
            tag: "假名复合词汇应用",
            desc: "应用五十音表辨识常用复合词与基本音拍 (Mora)。",
            sampleQuestion: "词汇「さくら」读作什么？意思是？",
            sampleSub: "假名拼词生活应用",
            sampleOptions: ["Sakura (樱花)", "Neko (猫咪)", "Inu (狗狗)"],
            correctIndex: 0,
          };
        }
        if (isEn) {
          return {
            tag: "Basic Kana Compound Words",
            desc: "Apply basic Kana alphabet to recognize common words and mora rhythm units.",
            sampleQuestion: "How is 'さくら' read and what does it mean?",
            sampleSub: "Kana word application",
            sampleOptions: ["Sakura (Cherry Blossom)", "Neko (Cat)", "Inu (Dog)"],
            correctIndex: 0,
          };
        }
        if (isKo) {
          return {
            tag: "기초 가나 복합 단어",
            desc: "가나 문자를 활용하여 기본 단어와 모라(Mora) 단위를 인식합니다.",
            sampleQuestion: "'さくら'는 어떻게 읽고 무슨 뜻일까요?",
            sampleSub: "가나 조합 단어 실전 응용",
            sampleOptions: ["Sakura (벚꽃)", "Neko (고양이)", "Inu (개)"],
            correctIndex: 0,
          };
        }
        return {
          tag: "Từ ghép Kana cơ bản",
          desc: "Áp dụng bảng chữ cái Kana vào nhận diện từ ghép thông dụng & đơn vị âm (Mora).",
          sampleQuestion: "Từ ghép 'さくら' đọc là gì và có nghĩa là gì?",
          sampleSub: "Ứng dụng ghép chữ Kana",
          sampleOptions: ["Sakura (Hoa anh đào)", "Neko (Con mèo)", "Inu (Con chó)"],
          correctIndex: 0,
        };

      case "ALL":
      default:
        if (isZhTW) {
          return {
            tag: "五十音全方位挑戰",
            desc: "混合所有假名字形辨析、Romaji 拼音及基礎生活單詞。",
            sampleQuestion: "平假名「あ」讀作什麼？ / 「KA」怎麼寫？",
            sampleSub: "字形辨識與讀音綜合考驗",
            sampleOptions: ["A", "I", "U"],
            correctIndex: 0,
          };
        }
        if (isZhCN) {
          return {
            tag: "五十音全方位挑战",
            desc: "混合所有假名字形辨析、Romaji 拼音及基础生活单词。",
            sampleQuestion: "平假名「あ」读作什么？ / 「KA」怎么写？",
            sampleSub: "字形辨识与读音综合考验",
            sampleOptions: ["A", "I", "U"],
            correctIndex: 0,
          };
        }
        if (isEn) {
          return {
            tag: "Comprehensive Kana Mastery",
            desc: "Mix of all Kana character recognition, Romaji readings, and basic vocabulary.",
            sampleQuestion: "How is 'あ' read? / How is 'KA' written?",
            sampleSub: "Mixed character recognition & phonics",
            sampleOptions: ["A", "I", "U"],
            correctIndex: 0,
          };
        }
        if (isKo) {
          return {
            tag: "가나 문자 종합 마스터",
            desc: "가나 문자 식별, 로마자 표기 및 기초 단어 문제가 골고루 출제됩니다.",
            sampleQuestion: "히라가나 'あ'의 발음은? / 'KA'는 어떻게 쓰나요?",
            sampleSub: "문자 인식 및 발음 혼합 훈련",
            sampleOptions: ["A", "I", "U"],
            correctIndex: 0,
          };
        }
        return {
          tag: "Tổng hợp Bảng chữ cái Kana",
          desc: "Hỗn hợp tất cả câu hỏi nhận diện mặt chữ Kana, phiên âm Romaji và từ ghép cơ bản.",
          sampleQuestion: "Chữ Hiragana: 'あ' đọc là gì? / 'KA' viết thế nào?",
          sampleSub: "Hỗn hợp nhận diện chữ & phát âm",
          sampleOptions: ["A", "I", "U"],
          correctIndex: 0,
        };
    }
  }

  // Listening Realm
  if (level === "LISTENING") {
    if (isZhTW) {
      return {
        tag: "聽力會話極速反應",
        desc: "聆聽問候語、購物情境、車站廣播 ➔ 衝入含正確中文涵義的鳥居！",
        sampleQuestion: "聆聽語音「ありがとうございます」是什麼意思？",
        sampleSub: "點擊 🔊 重新聆聽發音",
        sampleOptions: ["對不起 / 抱歉", "非常感謝您", "再見 / 告辭"],
        correctIndex: 1,
      };
    }
    if (isZhCN) {
      return {
        tag: "听力会话极速反应",
        desc: "聆听问候语、购物情境、车站广播 ➔ 冲入含正确中文涵义的鸟居！",
        sampleQuestion: "聆听语音「ありがとうございます」是什么意思？",
        sampleSub: "点击 🔊 重新聆听发音",
        sampleOptions: ["对不起 / 抱歉", "非常感谢您", "再见 / 告辞"],
        correctIndex: 1,
      };
    }
    if (isEn) {
      return {
        tag: "Audio Dialogue Reflex",
        desc: "Listen to natural Japanese greetings and train transit announcements ➔ Pick English meaning!",
        sampleQuestion: "Listen: What does 'ありがとうございます' mean?",
        sampleSub: "Tap 🔊 to replay audio",
        sampleOptions: ["Excuse me", "Thank you very much", "Goodbye"],
        correctIndex: 1,
      };
    }
    if (isKo) {
      return {
        tag: "청취 회화 순발력",
        desc: "자연스러운 일본어 인사와 안내 방송을 듣고 정확한 한국어 뜻을 고르세요!",
        sampleQuestion: "듣기: 'ありがとうございます'의 의미는?",
        sampleSub: "🔊 아이콘을 눌러 다시 듣기",
        sampleOptions: ["죄송합니다", "대단히 감사합니다", "안녕히 계세요"],
        correctIndex: 1,
      };
    }
    return {
      tag: "Nghe câu đàm thoại",
      desc: "Lắng nghe câu chào, câu hỏi mua hàng, thông báo tàu điện ➔ Chọn ý nghĩa tiếng Việt đúng.",
      sampleQuestion: "Nghe câu: 'ありがとうございます' nghĩa là gì?",
      sampleSub: "Nhấn 🔊 để nghe lại âm thanh",
      sampleOptions: ["Xin lỗi", "Cảm ơn rất nhiều", "Tạm biệt"],
      correctIndex: 1,
    };
  }

  // Cấp độ N5, N4, N3
  switch (mode) {
    case "WORD_TO_MEANING":
      if (isZhTW) {
        return {
          tag: "日語單詞 ➔ 繁體中文釋義",
          desc: "題目顯示日語詞彙/漢字。衝入包含標準繁體中文釋義的鳥居！",
          sampleQuestion: "單詞「たべる (食べる)」是什麼意思？",
          sampleSub: "鳥居將顯示中文釋義",
          sampleOptions: ["吃東西 / 用餐", "行走 / 移動", "休息 / 睡覺"],
          correctIndex: 0,
        };
      }
      if (isZhCN) {
        return {
          tag: "日语单词 ➔ 简体中文释义",
          desc: "题目显示日语词汇/汉字。冲入包含标准简体中文释义的鸟居！",
          sampleQuestion: "单词「たべる (食べる)」是什么意思？",
          sampleSub: "鸟居将显示中文释义",
          sampleOptions: ["吃东西 / 用餐", "行走 / 移动", "休息 / 睡觉"],
          correctIndex: 0,
        };
      }
      if (isEn) {
        return {
          tag: "Japanese Word ➔ Meaning",
          desc: "Prompt shows Japanese vocab / Kanji. Dash into the Torii gate with accurate meaning!",
          sampleQuestion: "What is the meaning of 'たべる (食べる)'?",
          sampleSub: "Torii gates show meaning",
          sampleOptions: ["To eat", "To walk", "To sleep"],
          correctIndex: 0,
        };
      }
      if (isKo) {
        return {
          tag: "일본어 단어 ➔ 한국어 뜻",
          desc: "일본어 어휘/한자가 주어집니다. 올바른 한국어 뜻의 토리이 문으로 통과하세요!",
          sampleQuestion: "단어 'たべる (食べる)'의 뜻은 무엇인가요?",
          sampleSub: "토리이에 한국어 뜻이 표시됩니다",
          sampleOptions: ["먹다 / 식사하다", "가다 / 걷다", "자다 / 쉬다"],
          correctIndex: 0,
        };
      }
      return {
        tag: "Từ tiếng Nhật ➔ Nghĩa tiếng Việt",
        desc: "Đề bài hiện từ vựng / Hán tự tiếng Nhật. Lướt vào Cổng Torii mang nghĩa tiếng Việt chuẩn!",
        sampleQuestion: "Từ vựng 'たべる (食べる)' có nghĩa là gì?",
        sampleSub: "Cổng Torii sẽ hiển thị nghĩa tiếng Việt",
        sampleOptions: ["Ăn uống", "Đi lại", "Ngủ nghỉ"],
        correctIndex: 0,
      };

    case "MEANING_TO_WORD":
      if (isZhTW) {
        return {
          tag: "中文釋義 ➔ 日語詞彙",
          desc: "題目顯示中文釋義。衝入包含對應日語詞彙/漢字的鳥居！",
          sampleQuestion: "哪個日語單詞表示：「空閒時間」？",
          sampleSub: "鳥居將顯示日語漢字與詞彙",
          sampleOptions: ["ひま (暇)", "いそがしい (忙しい)", "べんきょう (勉強)"],
          correctIndex: 0,
        };
      }
      if (isZhCN) {
        return {
          tag: "中文释义 ➔ 日语词汇",
          desc: "题目显示中文释义。冲入包含对应日语词汇/汉字的鸟居！",
          sampleQuestion: "哪个日语单词表示：「空闲时间」？",
          sampleSub: "鸟居将显示日语汉字与词汇",
          sampleOptions: ["ひま (暇)", "いそがしい (忙しい)", "べんきょう (勉強)"],
          correctIndex: 0,
        };
      }
      if (isEn) {
        return {
          tag: "Meaning ➔ Japanese Word",
          desc: "Prompt shows meaning. Dash into the Torii gate containing the matching Japanese word!",
          sampleQuestion: "Which Japanese word means: 'Free time'?",
          sampleSub: "Torii gates show Japanese Kanji / Vocab",
          sampleOptions: ["ひま (暇)", "いそがしい (忙しい)", "べんきょう (勉強)"],
          correctIndex: 0,
        };
      }
      if (isKo) {
        return {
          tag: "한국어 뜻 ➔ 일본어 단어",
          desc: "한국어 의미가 주어집니다. 해당하는 일본어 어휘/한자가 적힌 토리이를 통과하세요!",
          sampleQuestion: "'한가한 시간(여가)'을 뜻하는 일본어 단어는?",
          sampleSub: "토리이에 일본어 단어가 표시됩니다",
          sampleOptions: ["ひま (暇)", "いそがしい (忙しい)", "べんきょう (勉強)"],
          correctIndex: 0,
        };
      }
      return {
        tag: "Nghĩa tiếng Việt ➔ Từ tiếng Nhật",
        desc: "Đề bài hiện nghĩa tiếng Việt. Lướt vào Cổng Torii chứa từ vựng / Hán tự tiếng Nhật tương ứng!",
        sampleQuestion: "Từ tiếng Nhật nào có nghĩa là: 'Thời gian rảnh'?",
        sampleSub: "Cổng Torii sẽ hiển thị từ vựng / Kanji tiếng Nhật",
        sampleOptions: ["ひま (暇)", "いそがしい (忙しい)", "べんきょう (勉強)"],
        correctIndex: 0,
      };

    case "SENTENCE_TO_MEANING":
      if (isZhTW) {
        return {
          tag: "日語例句 ➔ 中文翻譯",
          desc: "題目顯示日語完整句子。衝入包含標準翻譯的鳥居！",
          sampleQuestion: "句子「毎日 日本語を 勉強します」是什麼意思？",
          sampleSub: "鳥居將顯示中文精準譯文",
          sampleOptions: ["我每天都學日語", "今天天氣很晴朗", "我去超市採買東西"],
          correctIndex: 0,
        };
      }
      if (isZhCN) {
        return {
          tag: "日语例句 ➔ 中文翻译",
          desc: "题目显示日语完整句子。冲入包含标准翻译的鸟居！",
          sampleQuestion: "句子「毎日 日本語を 勉強します」是什么意思？",
          sampleSub: "鸟居将显示中文精准译文",
          sampleOptions: ["我每天都学日语", "今天天气很晴朗", "我去超市采购东西"],
          correctIndex: 0,
        };
      }
      if (isEn) {
        return {
          tag: "Japanese Sentence ➔ Meaning",
          desc: "Prompt shows Japanese sentence. Dash into the Torii gate with accurate translation!",
          sampleQuestion: "What does '毎日 日本語を 勉強します' mean?",
          sampleSub: "Torii gate displays translation",
          sampleOptions: ["I study Japanese every day", "The weather is nice today", "I went shopping"],
          correctIndex: 0,
        };
      }
      if (isKo) {
        return {
          tag: "일본어 문장 ➔ 한국어 해석",
          desc: "일본어 문장이 주어집니다. 정확한 한국어 번역이 적힌 토리이를 통과하세요!",
          sampleQuestion: "'毎日 日本語を 勉強します' 문장의 의미는?",
          sampleSub: "토리이에 한국어 해석이 표시됩니다",
          sampleOptions: ["매일 일본어를 공부합니다", "오늘 날씨가 매우 좋습니다", "슈퍼마켓에 장을 보러 갑니다"],
          correctIndex: 0,
        };
      }
      return {
        tag: "Câu tiếng Nhật ➔ Nghĩa tiếng Việt",
        desc: "Đề bài hiện câu văn tiếng Nhật. Lướt vào Cổng Torii chứa bản dịch tiếng Việt chuẩn xác!",
        sampleQuestion: "Câu '毎日 日本語を 勉強します' có nghĩa là gì?",
        sampleSub: "Cổng Torii sẽ hiển thị bản dịch tiếng Việt",
        sampleOptions: ["Mỗi ngày tôi học tiếng Nhật", "Hôm nay trời rất đẹp", "Tôi đi siêu thị mua đồ"],
        correctIndex: 0,
      };

    case "ALL":
    default:
      if (isZhTW) {
        return {
          tag: "全方位綜合挑戰",
          desc: "頂級試煉：隨機融合詞彙、漢字、例句以及 JLPT 重點句型文法結構。",
          sampleQuestion: "綜合測驗：詞彙、漢字與語法真題",
          sampleSub: "各類題型隨機突襲",
          sampleOptions: ["選項 A", "選項 B", "選項 C"],
          correctIndex: 0,
        };
      }
      if (isZhCN) {
        return {
          tag: "全方位综合挑战",
          desc: "顶级试炼：随机融合词汇、汉字、例句以及 JLPT 重点句型文法结构。",
          sampleQuestion: "综合测验：词汇、汉字与语法真题",
          sampleSub: "各类题型随机突袭",
          sampleOptions: ["选项 A", "选项 B", "选项 C"],
          correctIndex: 0,
        };
      }
      if (isEn) {
        return {
          tag: "Comprehensive Mixed Mode",
          desc: "Ultimate challenge: random mix of vocabulary, kanji, sentences, and JLPT grammar.",
          sampleQuestion: "Comprehensive test: Vocabulary, Kanji, and Grammar",
          sampleSub: "All formats appear unpredictably",
          sampleOptions: ["Option A", "Option B", "Option C"],
          correctIndex: 0,
        };
      }
      if (isKo) {
        return {
          tag: "종합 실전 챌린지",
          desc: "단어, 한자, 예문 및 JLPT 문법 패턴이 무작위로 혼합 출제됩니다.",
          sampleQuestion: "어휘, 한자, 문법 종합 테스트",
          sampleSub: "모든 문제 유형이 무작위로 등장",
          sampleOptions: ["선택지 A", "선택지 B", "선택지 C"],
          correctIndex: 0,
        };
      }
      return {
        tag: "Hỗn hợp toàn diện",
        desc: "Thử thách đỉnh cao: kết hợp ngẫu nhiên cả từ vựng, Hán tự, câu ví dụ và các cấu trúc ngữ pháp JLPT.",
        sampleQuestion: "Tổng hợp từ vựng, Kanji và ngữ pháp theo đề thi",
        sampleSub: "Mọi dạng bài xuất hiện bất ngờ",
        sampleOptions: ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C"],
        correctIndex: 0,
      };
  }
}
