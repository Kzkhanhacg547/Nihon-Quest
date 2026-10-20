import type { NativeLanguage } from "@/components/LanguageContext";

export interface OnboardingText {
  navExperience: string;
  navJourney: string;
  navStudySpace: string;
  navLogin: string;
  navStart: string;
  heroTitle: string;
  heroTitleSub: string;
  heroDesc: string;
  calloutText: string;
  btnBack: string;
  btnNext: string;
  btnFinish: string;
  btnLoading: string;
  sideText: string;
  stepLabels: {
    language?: string;
    level: string;
    goal: string;
    time: string;
    focusSkill: string;
    learningStyle: string;
  };
  questions: Record<
    string,
    {
      title: string;
      subtitle: string;
    }
  >;
  options: {
    level: Record<string, { label: string; desc: string }>;
    goal: Record<string, { label: string; desc: string }>;
    time: Record<number, { label: string; desc: string }>;
    focusSkill: Record<string, { label: string; desc: string }>;
    learningStyle: Record<string, { label: string; desc: string }>;
  };
}

export const ONBOARDING_I18N: Record<NativeLanguage, OnboardingText> = {
  vi: {
    navExperience: "Trải nghiệm",
    navJourney: "Hành trình",
    navStudySpace: "Không gian học",
    navLogin: "Đăng nhập",
    navStart: "Bắt đầu",
    heroTitle: "Cá nhân hóa",
    heroTitleSub: "hành trình học của bạn.",
    heroDesc: "Chỉ với 5 bước đơn giản, chúng tôi sẽ thiết kế lộ trình học tiếng Nhật phù hợp nhất với trình độ, mục tiêu, thời gian và phong cách học của bạn.",
    calloutText: "Mỗi hành trình vĩ đại đều bắt đầu bằng một lựa chọn phù hợp.",
    btnBack: "Quay lại",
    btnNext: "Tiếp theo",
    btnFinish: "Xem lộ trình của bạn",
    btnLoading: "Đang thiết lập...",
    sideText: "HÀNH TRÌNH MỚI. MỘT PHIÊN BẢN MỚI.",
    stepLabels: {
      language: "Ngôn ngữ mẹ đẻ",
      level: "Trình độ hiện tại",
      goal: "Mục tiêu học",
      time: "Thời lượng mỗi ngày",
      focusSkill: "Kỹ năng trọng tâm",
      learningStyle: "Phong cách học",
    },
    questions: {
      language: {
        title: "Ngôn ngữ mẹ đẻ của bạn là gì?",
        subtitle: "Nihon Quest sẽ giải thích từ vựng, ngữ pháp và đàm thoại AI bằng ngôn ngữ này để bạn tiếp thu tự nhiên nhất.",
      },
      level: {
        title: "Trình độ hiện tại của bạn là gì?",
        subtitle: "Chọn trình độ phù hợp nhất. Đừng lo lắng, bạn luôn có thể thay đổi sau này.",
      },
      goal: {
        title: "Mục tiêu học của bạn là gì?",
        subtitle: "Chọn mục tiêu chính để Nihon Quest ưu tiên nội dung phù hợp với bạn.",
      },
      time: {
        title: "Bạn muốn học bao lâu mỗi ngày?",
        subtitle: "Một nhịp học vừa sức sẽ giúp bạn duy trì lâu dài và tiến bộ đều hơn.",
      },
      focusSkill: {
        title: "Kỹ năng nào bạn muốn giỏi nhất?",
        subtitle: "Chọn kỹ năng ưu tiên — lộ trình sẽ sắp xếp nội dung để kỹ năng đó tiến bộ nhanh nhất.",
      },
      learningStyle: {
        title: "Bạn thích học theo cách nào?",
        subtitle: "Mỗi phong cách tạo ra một lộ trình với nhịp độ và cách xen kẽ bài học khác nhau.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Người mới bắt đầu", desc: "Chưa từng học hoặc mới làm quen với tiếng Nhật." },
        N5: { label: "N5", desc: "Hiểu các câu cơ bản, tự giới thiệu, hội thoại hằng ngày đơn giản." },
        N4: { label: "N4", desc: "Hiểu tình huống quen thuộc, giao tiếp cơ bản trong cuộc sống, công việc." },
        N3: { label: "N3", desc: "Có thể hiểu nội dung phổ biến, giao tiếp tự tin hơn trong nhiều tình huống." },
      },
      goal: {
        TRAVEL: { label: "Du lịch Nhật Bản", desc: "Giao tiếp tại sân bay, khách sạn, nhà hàng và mua sắm." },
        JLPT: { label: "Thi JLPT", desc: "Học có hệ thống, bám sát cấp độ và dạng bài thi." },
        CONVERSATION: { label: "Giao tiếp hằng ngày", desc: "Tăng phản xạ nghe nói và dùng tiếng Nhật tự nhiên hơn." },
        CULTURE: { label: "Văn hóa & Anime", desc: "Hiểu tiếng Nhật qua phim, manga, âm nhạc và văn hóa." },
      },
      time: {
        10: { label: "10 phút", desc: "Nhẹ nhàng, dễ duy trì mỗi ngày." },
        15: { label: "15 phút", desc: "Nhịp học cân bằng, phù hợp phần lớn người học." },
        30: { label: "30 phút", desc: "Tiến bộ nhanh hơn với luyện tập đều." },
        60: { label: "60 phút", desc: "Cường độ cao cho mục tiêu rõ ràng." },
      },
      focusSkill: {
        BALANCED: { label: "Toàn diện", desc: "Nghe – nói – đọc – viết cân đối, không lệch pha." },
        LISTENING: { label: "Nghe", desc: "Hiểu tiếng Nhật khi bản xứ nói nhanh, nghe podcast & phim." },
        SPEAKING: { label: "Nói", desc: "Tự tin mở lời, phát chuẩn và giao tiếp trôi chảy." },
        READING: { label: "Đọc", desc: "Đọc báo, manga, email & tài liệu không cần tra từ điển." },
        WRITING: { label: "Viết", desc: "Viết đúng ngữ pháp, chữ đẹp, làm chủ Hán tự." },
      },
      learningStyle: {
        STRUCTURED: { label: "Học bài bản", desc: "Theo trình tự khoa học, có ôn tập SRS định kỳ." },
        IMMERSIVE: { label: "Nhập vai", desc: "Học như đang sống tại Nhật: tình huống thực + AI hội thoại." },
        GAMIFIED: { label: "Phiêu lưu", desc: "Mở khóa địa danh, streak & thử thách mỗi ngày." },
        PRACTICAL: { label: "Thực chiến", desc: "Học ngay kỹ năng sinh tồn, dùng được liền." },
      },
    },
  },

  "zh-CN": {
    navExperience: "产品体验",
    navJourney: "日本探索",
    navStudySpace: "学习空间",
    navLogin: "登录",
    navStart: "立即启程",
    heroTitle: "量身定制",
    heroTitleSub: "你的专属日语学习旅程。",
    heroDesc: "只需 5 个简单步骤，我们将为你量身打造契合当前水平、目标、时间与学习风格的高效路线。",
    calloutText: "每一次伟大的征途，都始于一次恰到好处的选择。",
    btnBack: "上一步",
    btnNext: "下一步",
    btnFinish: "查看你的定制路线",
    btnLoading: "正在生成路线...",
    sideText: "全新征程。成就全新自己。",
    stepLabels: {
      language: "母语设置",
      level: "当前水平",
      goal: "学习目标",
      time: "每日用时",
      focusSkill: "核心技能",
      learningStyle: "学习风格",
    },
    questions: {
      level: {
        title: "你的日语处于什么水平？",
        subtitle: "选择最贴近你现状的水平。不用担心，你随时可以在设置中调整。",
      },
      goal: {
        title: "你学习日语的主要目标是什么？",
        subtitle: "我们将根据你的核心目标定制优先推送的内容与实战场景。",
      },
      time: {
        title: "你计划每天学习多长时间？",
        subtitle: "舒适可持续的节奏能让你长久坚持，日积月累带来质的飞跃。",
      },
      focusSkill: {
        title: "你最希望优先突破哪项技能？",
        subtitle: "选择重点技能，系统将智能调配训练模块助你极速进阶。",
      },
      learningStyle: {
        title: "你更偏好哪种学习方式？",
        subtitle: "不同风格将生成专属的课程交替节奏与沉浸式实战训练体验。",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "零基础初学者", desc: "从未学过或刚开始接触五十音假名。" },
        N5: { label: "JLPT N5", desc: "掌握基础句型与日常简单对话，可做基础自我介绍。" },
        N4: { label: "JLPT N4", desc: "能理解熟悉场景，在日常生活和基础工作情境中交流。" },
        N3: { label: "JLPT N3", desc: "能理解常见内容，在更多日常和实际情境中自信交流。" },
      },
      goal: {
        TRAVEL: { label: "日本自由行", desc: "在机场、酒店、交通、餐厅与购物场景下从容交流。" },
        JLPT: { label: "考取 JLPT 证书", desc: "系统化进阶，紧扣能力考真实考点与各题型训练。" },
        CONVERSATION: { label: "地道日常口语", desc: "提高听说反应速度，像母语者一样自然流利交流。" },
        CULTURE: { label: "动漫影视与文化", desc: "摆脱字幕畅享动画、生肉漫画、日本音乐与流行文化。" },
      },
      time: {
        10: { label: "10 分钟", desc: "轻松无压力，易于每日坚持形成习惯。" },
        15: { label: "15 分钟", desc: "均衡适中，适合绝大多数学习者的黄金节奏。" },
        30: { label: "30 分钟", desc: "稳步冲刺，每日深度练习带来飞速进步。" },
        60: { label: "60 分钟", desc: "高强度沉浸，为明确目标全速前进。" },
      },
      focusSkill: {
        BALANCED: { label: "听说读写全面均衡", desc: "四项技能齐头并进，夯实全方位日语基石。" },
        LISTENING: { label: "听力优先突破", desc: "听懂母语者真实日常语速，畅听播客、影视与广播。" },
        SPEAKING: { label: "口语优先突破", desc: "自信开口，地道发音，告别哑巴日语，表达自如。" },
        READING: { label: "阅读优先突破", desc: "无障碍阅读日文漫画、新闻、小说与各类专业资料。" },
        WRITING: { label: "书写与汉字", desc: "掌握假名与常用汉字笔顺规范，书写地道优雅。" },
      },
      learningStyle: {
        STRUCTURED: { label: "系统严谨", desc: "按科学层级循序渐进，搭配严格的 SM-2 间隔记忆复习。" },
        IMMERSIVE: { label: "全景沉浸", desc: "如同置身日本：真实生活场景演练搭配 AI 导师实时对话。" },
        GAMIFIED: { label: "趣味冒险", desc: "打卡日本城市地标，收集专属徽章，趣味闯关每日挑战。" },
        PRACTICAL: { label: "生存实战", desc: "聚焦即学即用的高频表达与应急话术，快速派上用场。" },
      },
    },
  },

  "zh-TW": {
    navExperience: "產品體驗",
    navJourney: "日本探索",
    navStudySpace: "學習空間",
    navLogin: "登入",
    navStart: "立即啟程",
    heroTitle: "量身客製",
    heroTitleSub: "你的專屬日語學習旅程。",
    heroDesc: "只需 5 個簡單步驟，我們將為你量身打造契合目前水平、目標、時間與學習風格的高效路線。",
    calloutText: "每一次偉大的征途，都始於一次恰到好處的選擇。",
    btnBack: "上一步",
    btnNext: "下一步",
    btnFinish: "查看你的客製路線",
    btnLoading: "正在生成路線...",
    sideText: "全新征程。成就全新自己。",
    stepLabels: {
      level: "目前水平",
      goal: "學習目標",
      time: "每日用時",
      focusSkill: "核心技能",
      learningStyle: "學習風格",
    },
    questions: {
      level: {
        title: "你的日語處於什麼水平？",
        subtitle: "選擇最貼近你現狀的水平。不用擔心，你隨時可以在設定中調整。",
      },
      goal: {
        title: "你學習日語的主要目標是什麼？",
        subtitle: "我們將根據你的核心目標定制優先推送的內容與實戰場景。",
      },
      time: {
        title: "你計劃每天學習多長時間？",
        subtitle: "舒適可持續的節奏能讓你長久堅持，日積月累帶來質的飛躍。",
      },
      focusSkill: {
        title: "你最希望優先突破哪項技能？",
        subtitle: "選擇重點技能，系統將智慧調配訓練模組助你極速進階。",
      },
      learningStyle: {
        title: "你更偏好哪種學習方式？",
        subtitle: "不同風格將生成專屬的課程交替節奏與沉浸式實戰訓練體驗。",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "零基礎初學者", desc: "從未學過或剛開始接觸五十音假名。" },
        N5: { label: "JLPT N5", desc: "掌握基礎句型與日常簡單對話，可做基礎自我介紹。" },
        N4: { label: "JLPT N4", desc: "能理解熟悉場景，在日常生活和基礎工作情境中交流。" },
        N3: { label: "JLPT N3", desc: "能理解常見內容，在更多日常和實際情境中自信交流。" },
      },
      goal: {
        TRAVEL: { label: "日本自由行", desc: "在機場、飯店、交通、餐廳與購物場景下從容交流。" },
        JLPT: { label: "考取 JLPT 證書", desc: "系統化進階，緊扣能力考真實考點與各題型訓練。" },
        CONVERSATION: { label: "道地日常口語", desc: "提高聽說反應速度，像母語者一樣自然流利交流。" },
        CULTURE: { label: "動漫影視與文化", desc: "擺脫字幕暢享動畫、生肉漫畫、日本音樂與流行文化。" },
      },
      time: {
        10: { label: "10 分鐘", desc: "輕鬆無壓力，易於每日堅持形成習慣。" },
        15: { label: "15 分鐘", desc: "均衡適中，適合絕大多數學習者的黃金節奏。" },
        30: { label: "30 分鐘", desc: "穩步衝刺，每日深度練習帶來飛速進步。" },
        60: { label: "60 分鐘", desc: "高強度沉浸，為明確目標全速前進。" },
      },
      focusSkill: {
        BALANCED: { label: "聽說讀寫全面均衡", desc: "四項技能齊頭並進，夯實全方位日語基石。" },
        LISTENING: { label: "聽力優先突破", desc: "聽懂母語者真實日常語速，暢聽播客、影視與廣播。" },
        SPEAKING: { label: "口語優先突破", desc: "自信開口，道地發音，告別啞巴日語，表達自如。" },
        READING: { label: "閱讀優先突破", desc: "無障礙閱讀日文漫畫、新聞、小說與各類專業資料。" },
        WRITING: { label: "書寫與漢字", desc: "掌握假名與常用漢字筆順規範，書寫道地優雅。" },
      },
      learningStyle: {
        STRUCTURED: { label: "系統嚴謹", desc: "按科學層級循序漸進，搭配嚴格的 SM-2 間隔記憶複習。" },
        IMMERSIVE: { label: "全景沉浸", desc: "如同置身日本：真實生活場景演練搭配 AI 導師即時對話。" },
        GAMIFIED: { label: "趣味冒險", desc: "打卡日本城市地標，收集專屬徽章，趣味闖關每日挑戰。" },
        PRACTICAL: { label: "生存實戰", desc: "聚焦即學即用的高頻表達與應急話術，快速派上用場。" },
      },
    },
  },

  en: {
    navExperience: "Experience",
    navJourney: "Journey",
    navStudySpace: "Learning Space",
    navLogin: "Sign In",
    navStart: "Get Started",
    heroTitle: "Personalize",
    heroTitleSub: "your Japanese learning journey.",
    heroDesc: "In just 5 simple steps, we design a tailored path matching your level, goal, daily pace, and learning style.",
    calloutText: "Every great journey begins with the right choice.",
    btnBack: "Back",
    btnNext: "Next",
    btnFinish: "View Your Learning Path",
    btnLoading: "Setting up...",
    sideText: "NEW JOURNEY. A NEW YOU.",
    stepLabels: {
      language: "Native Language",
      level: "Current Level",
      goal: "Learning Goal",
      time: "Daily Pace",
      focusSkill: "Focus Skill",
      learningStyle: "Learning Style",
    },
    questions: {
      level: {
        title: "What is your current Japanese level?",
        subtitle: "Choose your closest match. Don't worry, you can always change it later in settings.",
      },
      goal: {
        title: "What is your primary learning goal?",
        subtitle: "We prioritize scenarios and lessons tailored directly to your main ambition.",
      },
      time: {
        title: "How much time can you commit daily?",
        subtitle: "A sustainable pace creates consistent habits that compound into fluency.",
      },
      focusSkill: {
        title: "Which skill do you want to excel at most?",
        subtitle: "Your path will emphasize targeted exercises to boost this skill first.",
      },
      learningStyle: {
        title: "How do you prefer to learn?",
        subtitle: "Each style shapes a unique rhythm, immersion balance, and challenge flow.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Complete Beginner", desc: "Never studied or just getting started with Kana syllabaries." },
        N5: { label: "JLPT N5", desc: "Understand basic sentences, introductions, and simple everyday dialogue." },
        N4: { label: "JLPT N4", desc: "Handle familiar situations, daily routines, and elementary workplace tasks." },
        N3: { label: "JLPT N3", desc: "Comprehend standard Japanese and converse with confidence across situations." },
      },
      goal: {
        TRAVEL: { label: "Travel in Japan", desc: "Navigate airports, hotels, transit, dining, and shopping with ease." },
        JLPT: { label: "Pass the JLPT", desc: "Structured progression aligned closely with official exam topics and formats." },
        CONVERSATION: { label: "Daily Conversation", desc: "Build quick listening reflexes and speak naturally like a native speaker." },
        CULTURE: { label: "Anime & Japanese Culture", desc: "Enjoy anime, raw manga, music, and media without relying on subtitles." },
      },
      time: {
        10: { label: "10 minutes", desc: "Light and effortless to maintain every single day." },
        15: { label: "15 minutes", desc: "Balanced sweet spot ideal for most learners." },
        30: { label: "30 minutes", desc: "Steady accelerator for noticeable weekly breakthroughs." },
        60: { label: "60 minutes", desc: "Intensive immersion for ambitious goals." },
      },
      focusSkill: {
        BALANCED: { label: "Balanced All-Around", desc: "Equal focus across listening, speaking, reading, and writing." },
        LISTENING: { label: "Listening Priority", desc: "Catch native-speed speech, podcasts, anime, and media clearly." },
        SPEAKING: { label: "Speaking & Pronunciation", desc: "Speak with natural accent, confidence, and real-time fluency." },
        READING: { label: "Reading & Comprehension", desc: "Read manga, news, menus, and documents without a dictionary." },
        WRITING: { label: "Writing & Kanji", desc: "Master kanji stroke orders, writing accuracy, and nuances." },
      },
      learningStyle: {
        STRUCTURED: { label: "Structured & Systematic", desc: "Clear scientific hierarchy backed by SM-2 spaced repetition." },
        IMMERSIVE: { label: "Immersive & Live", desc: "Learn through authentic real-life scenarios and live AI Sensei roleplay." },
        GAMIFIED: { label: "Gamified Adventure", desc: "Collect badges, conquer Shinkansen stops, and build daily streaks." },
        PRACTICAL: { label: "Survival First", desc: "High-utility phrases and actionable conversational survival tools." },
      },
    },
  },

  ko: {
    navExperience: "체험하기",
    navJourney: "일본 여정",
    navStudySpace: "학습 공간",
    navLogin: "로그인",
    navStart: "시작하기",
    heroTitle: "맞춤형",
    heroTitleSub: "일본어 학습 여정을 시작하세요.",
    heroDesc: "단 5가지 질문으로 현재 실력, 목표, 시간, 학습 스타일에 딱 맞춘 최적의 학습 로드맵을 설계해 드립니다.",
    calloutText: "위대한 여정은 언제나 나에게 꼭 맞는 첫 선택에서 시작됩니다.",
    btnBack: "이전",
    btnNext: "다음",
    btnFinish: "나의 맞춤 로드맵 확인하기",
    btnLoading: "설정 중...",
    sideText: "새로운 여정. 새로운 나.",
    stepLabels: {
      level: "현재 실력",
      goal: "학습 목표",
      time: "일일 학습 시간",
      focusSkill: "집중 영역",
      learningStyle: "학습 스타일",
    },
    questions: {
      level: {
        title: "현재 일본어 실력은 어느 정도인가요?",
        subtitle: "가장 알맞은 레벨을 선택하세요. 나중에 설정에서 언제든 변경할 수 있습니다.",
      },
      goal: {
        title: "일본어를 배우는 주된 목표는 무엇인가요?",
        subtitle: "선택하신 핵심 목표에 맞춰 우선순위 콘텐츠를 스마트하게 제공합니다.",
      },
      time: {
        title: "하루에 얼마 동안 공부하고 싶으신가요?",
        subtitle: "부담 없는 꾸준한 루틴이 장기적인 마스터의 지름길입니다.",
      },
      focusSkill: {
        title: "어떤 능력을 가장 집중적으로 키우고 싶으신가요?",
        subtitle: "선택한 핵심 영역의 역량을 가장 빠르게 향상시키는 학습을 배치합니다.",
      },
      learningStyle: {
        title: "어떤 방식으로 공부하는 것을 선호하시나요?",
        subtitle: "스타일에 따라 최적의 학습 템포와 실전 연습 방식을 제공합니다.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "완전 초보자", desc: "일본어를 처음 배우거나 히라가나를 막 시작한 단계." },
        N5: { label: "JLPT N5", desc: "기본 문장, 간단한 자기소개 및 기초 일상 대화 가능." },
        N4: { label: "JLPT N4", desc: "익숙한 상황과 일상 및 간단한 업무 대화 이해 가능." },
        N3: { label: "JLPT N3", desc: "폭넓은 일상 회화와 다양한 실전 상황에서 자신 있게 소통." },
      },
      goal: {
        TRAVEL: { label: "일본 여행", desc: "공항, 호텔, 교통, 식당, 쇼핑에서 막힘없는 실전 소통." },
        JLPT: { label: "JLPT 자격증 취득", desc: "시험 레벨별 핵심 문법과 기출 유형에 맞춘 체계적 학습." },
        CONVERSATION: { label: "일상 회화 마스터", desc: "자연스러운 청취 반응과 원어민처럼 유창한 스피킹." },
        CULTURE: { label: "애니메이션 & 일본 문화", desc: "자막 없이 애니, 만화, J-POP과 일본 대중문화를 즐기기." },
      },
      time: {
        10: { label: "10분", desc: "부담 없이 매일 가볍게 습관 만들기." },
        15: { label: "15분", desc: "대부분의 학습자에게 가장 이상적인 황금 밸런스." },
        30: { label: "30분", desc: "매주 실력이 쑥쑥 늘어나는 알찬 집중 연습." },
        60: { label: "60분", desc: "명확한 목표를 향한 전력 질주 몰입 학습." },
      },
      focusSkill: {
        BALANCED: { label: "듣기·말하기·읽기·쓰기 균형", desc: "모든 영역을 고루 다지는 탄탄한 종합 학습." },
        LISTENING: { label: "리스닝 집중", desc: "원어민의 빠른 자연 발음, 팟캐스트, 애니 완벽 청취." },
        SPEAKING: { label: "스피킹 & 발음 교정", desc: "정확한 억양과 발음으로 자신감 넘치는 실전 대화." },
        READING: { label: "독해 & 읽기 집중", desc: "사전 없이도 만화, 뉴스, 메뉴판을 술술 읽기." },
        WRITING: { label: "작문 & 상용한자", desc: "한자 획순을 마스터하고 올바른 문법으로 문장 쓰기." },
      },
      learningStyle: {
        STRUCTURED: { label: "체계적이고 과학적인 학습", desc: "SM-2 간격 반복 복습 알고리즘 기반의 단계별 커리큘럼." },
        IMMERSIVE: { label: "일본 현지 몰입형", desc: "실제 일본 생활 상황과 AI 센세와의 실시간 롤플레잉." },
        GAMIFIED: { label: "모험 & 게임형", desc: "도시 랜드마크를 열고 배지를 모으며 연속 스트릭 달성." },
        PRACTICAL: { label: "실전 생존형", desc: "바로 쓸 수 있는 고효율 필수 표현 중심의 즉각 실전 활용." },
      },
    },
  },

  es: {
    navExperience: "Experiencia",
    navJourney: "Ruta por Japón",
    navStudySpace: "Espacio de Estudio",
    navLogin: "Iniciar sesión",
    navStart: "Comenzar",
    heroTitle: "Personaliza",
    heroTitleSub: "tu ruta de aprendizaje de japonés.",
    heroDesc: "En solo 5 pasos sencillos, diseñamos una ruta a la medida de tu nivel, meta, tiempo y estilo de estudio.",
    calloutText: "Todo gran viaje comienza con la elección acertada.",
    btnBack: "Atrás",
    btnNext: "Siguiente",
    btnFinish: "Ver mi ruta personalizada",
    btnLoading: "Configurando...",
    sideText: "NUEVO VIAJE. UNA NUEVA VERSIÓN DE TI.",
    stepLabels: {
      level: "Nivel actual",
      goal: "Objetivo",
      time: "Tiempo diario",
      focusSkill: "Habilidad clave",
      learningStyle: "Estilo de estudio",
    },
    questions: {
      level: {
        title: "¿Cuál es tu nivel actual de japonés?",
        subtitle: "Elige la opción más cercana. Puedes cambiarla cuando quieras en ajustes.",
      },
      goal: {
        title: "¿Cuál es tu objetivo principal?",
        subtitle: "Priorizaremos contenidos y situaciones prácticas según tu meta.",
      },
      time: {
        title: "¿Cuánto tiempo puedes dedicar al día?",
        subtitle: "Un ritmo constante y cómodo construye fluidez a largo plazo.",
      },
      focusSkill: {
        title: "¿Qué habilidad deseas destacar más?",
        subtitle: "Tu ruta enfatizará ejercicios enfocados en potenciar esta área.",
      },
      learningStyle: {
        title: "¿Cómo prefieres aprender?",
        subtitle: "Cada estilo define el ritmo y la forma de combinar teoría y práctica.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Principiante absoluto", desc: "Nunca has estudiado o estás empezando con los silabarios kana." },
        N5: { label: "JLPT N5", desc: "Comprendes oraciones básicas, presentaciones y diálogos sencillos." },
        N4: { label: "JLPT N4", desc: "Te desenvuelves en situaciones cotidianas y rutinas laborales simples." },
        N3: { label: "JLPT N3", desc: "Comprendes contenido habitual y conversas con seguridad en varios contextos." },
      },
      goal: {
        TRAVEL: { label: "Viajar por Japón", desc: "Muévete con soltura en aeropuertos, hoteles, restaurantes y compras." },
        JLPT: { label: "Aprobar el JLPT", desc: "Ruta estructurada orientada al examen oficial y sus tipos de preguntas." },
        CONVERSATION: { label: "Conversación diaria", desc: "Desarrolla reflejos auditivos y habla con fluidez y naturalidad." },
        CULTURE: { label: "Anime y cultura japonesa", desc: "Disfruta de anime, manga sin traducir, música y cultura sin subtítulos." },
      },
      time: {
        10: { label: "10 minutos", desc: "Ligero y fácil de mantener cada día sin esfuerzo." },
        15: { label: "15 minutos", desc: "Equilibrado e ideal para la mayoría de estudiantes." },
        30: { label: "30 minutos", desc: "Avanza con paso firme y progresos notables cada semana." },
        60: { label: "60 minutos", desc: "Inmersión intensiva para metas ambiciosas." },
      },
      focusSkill: {
        BALANCED: { label: "Equilibrado integral", desc: "Atención pareja a comprensión auditiva, habla, lectura y escritura." },
        LISTENING: { label: "Prioridad escucha", desc: "Comprende el habla rápida de nativos, podcasts y series." },
        SPEAKING: { label: "Prioridad conversación", desc: "Habla con pronunciación clara, seguridad y soltura en tiempo real." },
        READING: { label: "Prioridad lectura", desc: "Lee manga, noticias y menús sin depender del diccionario." },
        WRITING: { label: "Escritura y kanji", desc: "Domina el orden de trazos y escribe con corrección gramatical." },
      },
      learningStyle: {
        STRUCTURED: { label: "Estructurado y metódico", desc: "Progresión científica paso a paso con repaso espaciado SM-2." },
        IMMERSIVE: { label: "Inmersión práctica", desc: "Como vivir en Japón: situaciones reales y diálogo con AI Sensei." },
        GAMIFIED: { label: "Aventura interactiva", desc: "Desbloquea ciudades, gana insignias y mantén tu racha diaria." },
        PRACTICAL: { label: "Supervivencia inmediata", desc: "Frases de alto impacto listas para usar desde el primer día." },
      },
    },
  },

  fr: {
    navExperience: "Expérience",
    navJourney: "Voyage",
    navStudySpace: "Espace d'étude",
    navLogin: "Connexion",
    navStart: "Commencer",
    heroTitle: "Personnalisez",
    heroTitleSub: "votre parcours d'apprentissage du japonais.",
    heroDesc: "En 5 étapes simples, nous concevons un parcours sur mesure selon votre niveau, vos objectifs, votre temps et votre méthode préférée.",
    calloutText: "Chaque grand voyage commence par un choix adapté.",
    btnBack: "Retour",
    btnNext: "Suivant",
    btnFinish: "Voir mon parcours personnalisé",
    btnLoading: "Configuration...",
    sideText: "NOUVEAU VOYAGE. UNE NOUVELLE VERSION DE VOUS.",
    stepLabels: {
      level: "Niveau actuel",
      goal: "Objectif",
      time: "Temps quotidien",
      focusSkill: "Compétence clé",
      learningStyle: "Style d'apprentissage",
    },
    questions: {
      level: {
        title: "Quel est votre niveau actuel en japonais ?",
        subtitle: "Choisissez l'option la plus proche. Vous pourrez la modifier plus tard.",
      },
      goal: {
        title: "Quel est votre objectif principal ?",
        subtitle: "Nous adapterons les scénarios et le contenu à votre priorité.",
      },
      time: {
        title: "Combien de temps pouvez-vous consacrer par jour ?",
        subtitle: "Une pratique régulière et modérée garantit une progression durable.",
      },
      focusSkill: {
        title: "Quelle compétence voulez-vous privilégier ?",
        subtitle: "Votre parcours mettra l'accent sur des exercices ciblés pour ce domaine.",
      },
      learningStyle: {
        title: "Comment préférez-vous apprendre ?",
        subtitle: "Chaque méthode façonne un rythme et une alternance d'activités adaptés.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Grand débutant", desc: "Jamais étudié ou commence tout juste les syllabaires kana." },
        N5: { label: "JLPT N5", desc: "Comprend les phrases simples, se présente et échange au quotidien." },
        N4: { label: "JLPT N4", desc: "Gère les situations courantes et les échanges simples de la vie courante." },
        N3: { label: "JLPT N3", desc: "Comprend les contenus variés et communique avec assurance." },
      },
      goal: {
        TRAVEL: { label: "Voyager au Japon", desc: "Échangez avec aisance aux aéroports, hôtels, restaurants et boutiques." },
        JLPT: { label: "Réussir le JLPT", desc: "Progression structurée et alignée sur les épreuves de l'examen." },
        CONVERSATION: { label: "Conversation du quotidien", desc: "Affûtez vos réflexes d'écoute et parlez avec naturel et fluidité." },
        CULTURE: { label: "Anime & Culture japonaise", desc: "Savourez animes, mangas originaux et musique sans sous-titres." },
      },
      time: {
        10: { label: "10 minutes", desc: "Léger et facile à maintenir tous les jours." },
        15: { label: "15 minutes", desc: "L'équilibre parfait pour la majorité des apprenants." },
        30: { label: "30 minutes", desc: "Progressez rapidement grâce à une pratique soutenue." },
        60: { label: "60 minutes", desc: "Immersion intensive pour des objectifs ambitieux." },
      },
      focusSkill: {
        BALANCED: { label: "Équilibré (4 compétences)", desc: "Écoute, expression orale, lecture et écriture travaillées harmonieusement." },
        LISTENING: { label: "Priorité écoute", desc: "Comprenez la voix naturelle des natifs, podcasts et émissions." },
        SPEAKING: { label: "Priorité expression orale", desc: "Gagnez en aisance, travaillez votre accent et osez parler." },
        READING: { label: "Priorité lecture", desc: "Lisez mangas, nouvelles et menus sans dictionnaire." },
        WRITING: { label: "Écriture et kanjis", desc: "Maîtrisez les traits des kanjis et composez des phrases justes." },
      },
      learningStyle: {
        STRUCTURED: { label: "Structuré et académique", desc: "Progression scientifique avec révision espacée SM-2." },
        IMMERSIVE: { label: "Immersion vivante", desc: "Comme au Japon : situations authentiques et dialogues avec l'IA Sensei." },
        GAMIFIED: { label: "Aventure ludique", desc: "Débloquez des étapes Shinkansen, gagnez des badges et entretenez vos séries." },
        PRACTICAL: { label: "Survie pratique", desc: "Expressions indispensables prêtes à l'emploi dès le premier jour." },
      },
    },
  },

  de: {
    navExperience: "Erlebnis",
    navJourney: "Japan-Reise",
    navStudySpace: "Lernraum",
    navLogin: "Anmelden",
    navStart: "Loslegen",
    heroTitle: "Personalisiere",
    heroTitleSub: "deinen Japanisch-Lernpfad.",
    heroDesc: "In nur 5 Schritten erstellen wir einen maßgeschneiderten Pfad passend zu deinem Niveau, Ziel, Zeitbudget und Lernstil.",
    calloutText: "Jede große Reise beginnt mit der richtigen Entscheidung.",
    btnBack: "Zurück",
    btnNext: "Weiter",
    btnFinish: "Meinen Lernpfad ansehen",
    btnLoading: "Wird eingerichtet...",
    sideText: "NEUE REISE. EIN NEUES DU.",
    stepLabels: {
      level: "Aktuelles Niveau",
      goal: "Lernziel",
      time: "Tägliche Zeit",
      focusSkill: "Schwerpunkt",
      learningStyle: "Lernstil",
    },
    questions: {
      level: {
        title: "Wie ist dein aktuelles Japanisch-Niveau?",
        subtitle: "Wähle die passendste Stufe. Du kannst sie jederzeit in den Einstellungen ändern.",
      },
      goal: {
        title: "Was ist dein wichtigstes Lernziel?",
        subtitle: "Wir priorisieren Inhalte und Alltagssituationen entsprechend deinen Wünschen.",
      },
      time: {
        title: "Wie viel Zeit möchtest du täglich investieren?",
        subtitle: "Ein ausgewogenes Tempo sichert langfristigen Lernerfolg.",
      },
      focusSkill: {
        title: "Welche Fertigkeit möchtest du besonders stärken?",
        subtitle: "Dein Pfad hebt gezielte Übungen für diesen Schwerpunkt hervor.",
      },
      learningStyle: {
        title: "Wie lernst du am liebsten?",
        subtitle: "Jeder Stil prägt die Mischung aus Theorie, Immersion und praktischem Training.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Absoluter Anfänger", desc: "Noch nie gelernt oder gerade erst mit Kana begonnen." },
        N5: { label: "JLPT N5", desc: "Einfache Sätze verstehen, sich vorstellen und alltägliche Gespräche führen." },
        N4: { label: "JLPT N4", desc: "Gewohnte Alltagssituationen und einfache Arbeitskontexte meistern." },
        N3: { label: "JLPT N3", desc: "Gängige Inhalte verstehen und selbstbewusst in vielen Situationen sprechen." },
      },
      goal: {
        TRAVEL: { label: "Reise nach Japan", desc: "Souverän an Flughäfen, Hotels, Restaurants und beim Einkaufen sprechen." },
        JLPT: { label: "JLPT-Zertifikat", desc: "Systematische Vorbereitung orientiert am offiziellen Prüfungsformat." },
        CONVERSATION: { label: "Alltagskonversation", desc: "Hörreflexe trainieren und natürlich wie ein Muttersprachler sprechen." },
        CULTURE: { label: "Anime & Popkultur", desc: "Anime, Manga und Musik ganz ohne Untertitel verstehen." },
      },
      time: {
        10: { label: "10 Minuten", desc: "Leicht und mühelos jeden Tag beizubehalten." },
        15: { label: "15 Minuten", desc: "Die ideale goldene Mitte für die meisten Lernenden." },
        30: { label: "30 Minuten", desc: "Stetiger Fortschritt mit sichtbaren wöchentlichen Sprüngen." },
        60: { label: "60 Minuten", desc: "Intensive Immersion für ehrgeizige Ziele." },
      },
      focusSkill: {
        BALANCED: { label: "Rundum ausgewogen", desc: "Hören, Sprechen, Lesen und Schreiben gleichermaßen trainieren." },
        LISTENING: { label: "Hörverstehen", desc: "Natürliches Sprachtempo, Podcasts und Serien sicher verstehen." },
        SPEAKING: { label: "Sprechen & Aussprache", desc: "Flüssig, selbstsicher und mit authentischer Betonung sprechen." },
        READING: { label: "Leseverstehen", desc: "Manga, Nachrichten und Speisekarten ohne Wörterbuch lesen." },
        WRITING: { label: "Schreiben & Kanji", desc: "Strichfolgen beherrschen und grammatisch exakt schreiben." },
      },
      learningStyle: {
        STRUCTURED: { label: "Strukturiert & Systematisch", desc: "Wissenschaftlicher Stufenplan mit SM-2 Intervallwiederholung." },
        IMMERSIVE: { label: "Lebendige Immersion", desc: "Wie in Japan leben: Reale Situationen und Dialoge mit KI-Sensei." },
        GAMIFIED: { label: "Gamified Adventure", desc: "Stationen freischalten, Abzeichen sammeln und Streaks halten." },
        PRACTICAL: { label: "Praktisches Überleben", desc: "Direkt anwendbare Redewendungen für sofortige Praxistauglichkeit." },
      },
    },
  },

  id: {
    navExperience: "Pengalaman",
    navJourney: "Jelajah Jepang",
    navStudySpace: "Ruang Belajar",
    navLogin: "Masuk",
    navStart: "Mulai",
    heroTitle: "Personalisasi",
    heroTitleSub: "perjalanan belajar bahasa Jepang Anda.",
    heroDesc: "Hanya dengan 5 langkah mudah, kami rancang jalur belajar khusus yang cocok dengan tingkat, tujuan, waktu, dan gaya belajar Anda.",
    calloutText: "Setiap perjalanan besar dimulai dari pilihan yang tepat.",
    btnBack: "Kembali",
    btnNext: "Lanjut",
    btnFinish: "Lihat Jalur Belajar Saya",
    btnLoading: "Menyiapkan...",
    sideText: "PERJALANAN BARU. VERSI BARU DIRI ANDA.",
    stepLabels: {
      level: "Tingkat Saat Ini",
      goal: "Tujuan Belajar",
      time: "Waktu Harian",
      focusSkill: "Keterampilan Utama",
      learningStyle: "Gaya Belajar",
    },
    questions: {
      level: {
        title: "Apa tingkat bahasa Jepang Anda saat ini?",
        subtitle: "Pilih yang paling sesuai. Anda dapat mengubahnya kapan saja di pengaturan.",
      },
      goal: {
        title: "Apa tujuan utama Anda belajar bahasa Jepang?",
        subtitle: "Kami akan memprioritaskan materi dan situasi nyata sesuai tujuan Anda.",
      },
      time: {
        title: "Berapa lama waktu belajar harian Anda?",
        subtitle: "Ritme yang pas memudahkan Anda konsisten setiap hari.",
      },
      focusSkill: {
        title: "Keterampilan apa yang ingin paling Anda kuasai?",
        subtitle: "Jalur belajar Anda akan memperbanyak latihan untuk keterampilan ini.",
      },
      learningStyle: {
        title: "Bagaimana gaya belajar yang paling Anda sukai?",
        subtitle: "Setiap gaya membentuk variasi materi dan tantangan yang berbeda.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Pemula Total", desc: "Belum pernah belajar atau baru mulai mengenal huruf kana." },
        N5: { label: "JLPT N5", desc: "Memahami kalimat dasar, perkenalan diri, dan percakapan sederhana." },
        N4: { label: "JLPT N4", desc: "Memahami situasi sehari-hari dan komunikasi dasar di lingkungan kerja." },
        N3: { label: "JLPT N3", desc: "Memahami ragam konten umum dan percaya diri berbicara di berbagai situasi." },
      },
      goal: {
        TRAVEL: { label: "Wisata ke Jepang", desc: "Lancar berkomunikasi di bandara, hotel, transportasi, resto & belanja." },
        JLPT: { label: "Lulus Ujian JLPT", desc: "Belajar terstruktur sesuai format dan kisi-kisi resmi ujian." },
        CONVERSATION: { label: "Percakapan Harian", desc: "Latih refleks mendengar dan berbicara natural seperti penutur asli." },
        CULTURE: { label: "Anime & Budaya Jepang", desc: "Nikmati anime, manga asli, dan musik tanpa perlu teks terjemahan." },
      },
      time: {
        10: { label: "10 menit", desc: "Ringan dan mudah dipertahankan setiap hari." },
        15: { label: "15 menit", desc: "Keseimbangan ideal untuk sebagian besar pelajar." },
        30: { label: "30 menit", desc: "Kemajuan pesat dengan latihan teratur dan mendalam." },
        60: { label: "60 menit", desc: "Imersi intensif untuk target ambisius." },
      },
      focusSkill: {
        BALANCED: { label: "Seimbang 4 Keterampilan", desc: "Fokus merata pada mendengar, berbicara, membaca, dan menulis." },
        LISTENING: { label: "Fokus Mendengar", desc: "Tangkap ucapan penutur asli berkecepatan natural dengan jelas." },
        SPEAKING: { label: "Fokus Berbicara", desc: "Bicara percaya diri dengan pelafalan tepat dan lancar seketika." },
        READING: { label: "Fokus Membaca", desc: "Baca manga, berita, dan menu tanpa perlu bolak-balik kamus." },
        WRITING: { label: "Menulis & Kanji", desc: "Kuasai urutan goresan kanji dan tulis kalimat tata bahasa rapi." },
      },
      learningStyle: {
        STRUCTURED: { label: "Terstruktur & Ilmiah", desc: "Kurikulum bertahap dengan pengulangan berjeda SM-2." },
        IMMERSIVE: { label: "Imersi Situasional", desc: "Seperti tinggal di Jepang: situasi nyata dan dialog dengan AI Sensei." },
        GAMIFIED: { label: "Petualangan Seru", desc: "Buka rute Shinkansen, kumpulkan lencana, dan pertahankan streak." },
        PRACTICAL: { label: "Praktis Siap Pakai", desc: "Ungkapan penting berfaedah tinggi yang bisa langsung digunakan." },
      },
    },
  },

  th: {
    navExperience: "ประสบการณ์",
    navJourney: "ท่องญี่ปุ่น",
    navStudySpace: "พื้นที่เรียนรู้",
    navLogin: "เข้าสู่ระบบ",
    navStart: "เริ่มต้นเลย",
    heroTitle: "ปรับแต่งเส้นทาง",
    heroTitleSub: "การเรียนภาษาญี่ปุ่นในแบบของคุณ",
    heroDesc: "เพียง 5 ขั้นตอนง่ายๆ เราจะออกแบบแผนการเรียนที่ตรงกับระดับ เป้าหมาย เวลา และสไตล์การเรียนของคุณมากที่สุด",
    calloutText: "การเดินทางที่ยิ่งใหญ่เริ่มต้นจากการเลือกเส้นทางที่ถูกต้องเสมอ",
    btnBack: "ย้อนกลับ",
    btnNext: "ถัดไป",
    btnFinish: "ดูแผนการเรียนของคุณ",
    btnLoading: "กำลังจัดเตรียม...",
    sideText: "การเดินทางครั้งใหม่ สู่ตัวตนใหม่ที่ดีกว่าเดิม",
    stepLabels: {
      level: "ระดับปัจจุบัน",
      goal: "เป้าหมายการเรียน",
      time: "เวลาเรียนต่อวัน",
      focusSkill: "ทักษะที่เน้น",
      learningStyle: "สไตล์การเรียน",
    },
    questions: {
      level: {
        title: "ระดับภาษาญี่ปุ่นปัจจุบันของคุณคือระดับใด?",
        subtitle: "เลือกระดับที่ตรงกับตัวคุณที่สุด คุณสามารถปรับเปลี่ยนได้ตลอดเวลาในการตั้งค่า",
      },
      goal: {
        title: "เป้าหมายหลักในการเรียนภาษาญี่ปุ่นของคุณคืออะไร?",
        subtitle: "เราจะจัดลำดับความสำคัญของเนื้อหาและสถานการณ์จำลองให้สอดคล้องกับคุณ",
      },
      time: {
        title: "คุณต้องการเรียนวันละกี่นาที?",
        subtitle: "จังหวะการเรียนที่พอดีช่วยให้คุณเรียนรู้อย่างต่อเนื่องและก้าวหน้าอย่างมั่นคง",
      },
      focusSkill: {
        title: "ทักษะใดที่คุณต้องการพัฒนาให้โดดเด่นที่สุด?",
        subtitle: "ระบบจะจัดสรรแบบฝึกหัดเฉพาะทางเพื่อเร่งพัฒนาทักษะนี้เป็นพิเศษ",
      },
      learningStyle: {
        title: "คุณชอบการเรียนรู้ในรูปแบบใด?",
        subtitle: "แต่ละรูปแบบจะสร้างจังหวะการเรียนและการฝึกฝนที่แตกต่างกัน",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "ผู้เริ่มต้นใหม่", desc: "ไม่เคยเรียนมาก่อนหรือเพิ่งเริ่มจำตัวอักษรคานะ" },
        N5: { label: "JLPT N5", desc: "เข้าใจประโยคพื้นฐาน แนะนำตัวเอง และสนทนาง่ายๆ ในชีวิตประจำวันได้" },
        N4: { label: "JLPT N4", desc: "เข้าใจสถานการณ์คุ้นเคยและสื่อสารพื้นฐานในชีวิตและการทำงานได้" },
        N3: { label: "JLPT N3", desc: "เข้าใจเนื้อหาทั่วไปและสื่อสารได้อย่างมั่นใจในหลากหลายสถานการณ์" },
      },
      goal: {
        TRAVEL: { label: "ท่องเที่ยวญี่ปุ่น", desc: "สื่อสารคล่องตัวที่สนามบิน โรงแรม ร้านอาหาร และการช้อปปิ้ง" },
        JLPT: { label: "สอบวัดระดับ JLPT", desc: "เรียนอย่างเป็นระบบ ตรงตามโครงสร้างข้อสอบและแนวทางจริง" },
        CONVERSATION: { label: "การสนทนาในชีวิตประจำวัน", desc: "สร้างปฏิกิริยาการฟังและพูดอย่างเป็นธรรมชาติเหมือนเจ้าของภาษา" },
        CULTURE: { label: "อนิเมะและวัฒนธรรมญี่ปุ่น", desc: "เพลิดเพลินกับอนิเมะ มังงะต้นฉบับ และดนตรีโดยไม่ต้องพึ่งซับไตเติล" },
      },
      time: {
        10: { label: "10 นาที", desc: "สบายๆ ทำได้ง่ายทุกวันไม่กดดัน" },
        15: { label: "15 นาที", desc: "จังหวะทองที่พอเหมาะสำหรับผู้เรียนส่วนใหญ่" },
        30: { label: "30 นาที", desc: "ก้าวหน้าอย่างรวดเร็วด้วยการฝึกฝนอย่างเข้มข้น" },
        60: { label: "60 นาที", desc: "เรียนรู้อย่างเต็มอิ่มเพื่อเป้าหมายที่จริงจัง" },
      },
      focusSkill: {
        BALANCED: { label: "ครอบคลุมครบ 4 ทักษะ", desc: "ฟัง พูด อ่าน เขียน อย่างสมดุลรอบด้าน" },
        LISTENING: { label: "เน้นการฟังเป็นพิเศษ", desc: "ฟังความเร็วปกติของคนญี่ปุ่น เข้าใจพอดแคสต์และซีรีส์ชัดเจน" },
        SPEAKING: { label: "เน้นการพูดและการออกเสียง", desc: "พูดด้วยสำเนียงที่ถูกต้อง มีความมั่นใจและลื่นไหลทันที" },
        READING: { label: "เน้นการอ่านและความเข้าใจ", desc: "อ่านมังงะ ข่าว และเมนูอาหารได้โดยไม่ต้องเปิดพจนานุกรม" },
        WRITING: { label: "เน้นการเขียนและคันจิ", desc: "จำลำดับขีดคันจิและเขียนประโยคได้ถูกต้องตามหลักไวยากรณ์" },
      },
      learningStyle: {
        STRUCTURED: { label: "เป็นระบบตามหลักวิชาการ", desc: "หลักสูตรทีละขั้นตอนพร้อมระบบทบทวนแบบเว้นระยะ SM-2" },
        IMMERSIVE: { label: "จำลองสถานการณ์จริง", desc: "เหมือนใช้ชีวิตที่ญี่ปุ่น: สถานการณ์จริงและสนทนากับ AI Sensei" },
        GAMIFIED: { label: "การผจญภัยแบบเกม", desc: "ปลดล็อกเมือง สะสมเหรียญรางวัล และรักษาสถิติเรียนต่อเนื่อง" },
        PRACTICAL: { label: "เน้นเอาตัวรอดใช้ได้ทันที", desc: "ประโยคพร้อมใช้ประโยชน์สูงที่นำไปใช้งานได้ทันที" },
      },
    },
  },

  ru: {
    navExperience: "О платформе",
    navJourney: "Маршрут",
    navStudySpace: "Кабинет",
    navLogin: "Войти",
    navStart: "Начать",
    heroTitle: "Индивидуальный",
    heroTitleSub: "маршрут изучения японского языка.",
    heroDesc: "Всего за 5 простых шагов мы составим персональный план, идеально подходящий под ваш уровень, цели, график и стиль обучения.",
    calloutText: "Любое великое путешествие начинается с правильного первого шага.",
    btnBack: "Назад",
    btnNext: "Далее",
    btnFinish: "Посмотреть мой маршрут",
    btnLoading: "Настройка...",
    sideText: "НОВЫЙ ПУТЬ. НОВАЯ ВЕРСИЯ ТЕБЯ.",
    stepLabels: {
      level: "Текущий уровень",
      goal: "Цель обучения",
      time: "Время в день",
      focusSkill: "Ключевой навык",
      learningStyle: "Стиль обучения",
    },
    questions: {
      level: {
        title: "Какой у вас текущий уровень японского языка?",
        subtitle: "Выберите наиболее подходящий вариант. Его всегда можно изменить в профиле.",
      },
      goal: {
        title: "Какова ваша главная цель изучения?",
        subtitle: "Мы настроим уроки и практические сценарии под вашу ключевую задачу.",
      },
      time: {
        title: "Сколько времени в день вы готовы уделять?",
        subtitle: "Умеренный ежедневный темп формирует устойчивую привычку и надежный результат.",
      },
      focusSkill: {
        title: "Какой навык вы хотите развить в первую очередь?",
        subtitle: "В вашем плане будут преобладать целевые упражнения для этого навыка.",
      },
      learningStyle: {
        title: "Какой формат обучения вам ближе всего?",
        subtitle: "Каждый стиль определяет баланс теории, практики и темп прохождения.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Полный новичок", desc: "Никогда не изучал или только начинает знакомиться с азбукой кана." },
        N5: { label: "JLPT N5", desc: "Понимает простые фразы, может представиться и вести базовый диалог." },
        N4: { label: "JLPT N4", desc: "Ориентируется в знакомых повседневных и простых рабочих ситуациях." },
        N3: { label: "JLPT N3", desc: "Понимает популярный контент и уверенно общается в большинстве ситуаций." },
      },
      goal: {
        TRAVEL: { label: "Путешествие по Японии", desc: "Уверенное общение в аэропорту, отеле, транспорте, кафе и магазинах." },
        JLPT: { label: "Сдача экзамена JLPT", desc: "Системное обучение в строгом соответствии с форматом и темами экзамена." },
        CONVERSATION: { label: "Разговорный японский", desc: "Быстрая слуховая реакция и естественная беглая речь без запинок." },
        CULTURE: { label: "Аниме и культура Японии", desc: "Просмотр аниме, чтение оригинальной манги и прослушивание музыки без субтитров." },
      },
      time: {
        10: { label: "10 минут", desc: "Легко и ненавязчиво встраивается в любой распорядок дня." },
        15: { label: "15 минут", desc: "Золотая середина, подходящая большинству учеников." },
        30: { label: "30 минут", desc: "Заметный прогресс и ощутимые результаты каждую неделю." },
        60: { label: "60 минут", desc: "Полное погружение для достижения амбициозных целей." },
      },
      focusSkill: {
        BALANCED: { label: "Гармонично (все 4 навыка)", desc: "Равномерное развитие аудирования, говорения, чтения и письма." },
        LISTENING: { label: "Акцент на аудирование", desc: "Понимание беглой речи носителей, подкастов и сериалов на слух." },
        SPEAKING: { label: "Акцент на разговор и произношение", desc: "Уверенная речь с естественной интонацией в режиме реального времени." },
        READING: { label: "Акцент на чтение", desc: "Чтение манги, новостей и вывесок без постоянного заглядывания в словарь." },
        WRITING: { label: "Письмо и иероглифы кандзи", desc: "Освоение порядка черт кандзи и грамотное построение предложений." },
      },
      learningStyle: {
        STRUCTURED: { label: "Академический и системный", desc: "Последовательная программа с интервальным повторением по алгоритму SM-2." },
        IMMERSIVE: { label: "Живое погружение", desc: "Эффект присутствия: реальные ситуации и диалоги с AI-сенсеем." },
        GAMIFIED: { label: "Игровое приключение", desc: "Открытие городов на карте Синкансэн, достижения и ежедневные серии." },
        PRACTICAL: { label: "Прикладной минимум", desc: "Практичные фразы с высокой отдачей, готовые к применению прямо сейчас." },
      },
    },
  },

  pt: {
    navExperience: "Experiência",
    navJourney: "Jornada pelo Japão",
    navStudySpace: "Espaço de Estudo",
    navLogin: "Entrar",
    navStart: "Começar",
    heroTitle: "Personalize",
    heroTitleSub: "sua jornada no aprendizado de japonês.",
    heroDesc: "Em apenas 5 passos simples, criamos uma trilha sob medida para o seu nível, objetivo, tempo disponível e estilo de aprendizagem.",
    calloutText: "Toda grande jornada começa com a escolha certa.",
    btnBack: "Voltar",
    btnNext: "Próximo",
    btnFinish: "Ver Minha Trilha Personalizada",
    btnLoading: "Configurando...",
    sideText: "NOVA JORNADA. UMA NOVA VERSÃO DE VOCÊ.",
    stepLabels: {
      level: "Nível Atual",
      goal: "Objetivo",
      time: "Tempo Diário",
      focusSkill: "Habilidade Principal",
      learningStyle: "Estilo de Estudo",
    },
    questions: {
      level: {
        title: "Qual é o seu nível atual de japonês?",
        subtitle: "Escolha a opção mais próxima. Você poderá alterar isso a qualquer momento nas configurações.",
      },
      goal: {
        title: "Qual é o seu principal objetivo?",
        subtitle: "Daremos prioridade aos conteúdos e cenários práticos mais relevantes para você.",
      },
      time: {
        title: "Quanto tempo você quer estudar por dia?",
        subtitle: "Um ritmo sustentável e confortável constrói consistência a longo prazo.",
      },
      focusSkill: {
        title: "Qual habilidade você deseja priorizar?",
        subtitle: "Sua trilha enfatizará exercícios direcionados para desenvolver esse ponto.",
      },
      learningStyle: {
        title: "Como você prefere aprender?",
        subtitle: "Cada estilo molda o ritmo de estudo e o equilíbrio entre teoria e prática.",
      },
    },
    options: {
      level: {
        BEGINNER: { label: "Iniciante Total", desc: "Nunca estudou ou está começando agora com os silabários kana." },
        N5: { label: "JLPT N5", desc: "Compreende frases básicas, sabe se apresentar e mantém diálogos simples." },
        N4: { label: "JLPT N4", desc: "Lida bem com situações cotidianas e conversas simples no trabalho." },
        N3: { label: "JLPT N3", desc: "Compreende conteúdos do dia a dia e se comunica com segurança." },
      },
      goal: {
        TRAVEL: { label: "Viagem ao Japão", desc: "Comunique-se com facilidade em aeroportos, hotéis, restaurantes e compras." },
        JLPT: { label: "Aprovação no JLPT", desc: "Estudo estruturado com foco nas provas oficiais e tipos de questões." },
        CONVERSATION: { label: "Conversação Diária", desc: "Desenvolva reflexos auditivos e converse com naturalidade e fluência." },
        CULTURE: { label: "Animes e Cultura Japonesa", desc: "Aproveite animes, mangás no original e músicas sem precisar de legendas." },
      },
      time: {
        10: { label: "10 minutos", desc: "Leve e fácil de manter todos os dias." },
        15: { label: "15 minutos", desc: "O equilíbrio perfeito para a maioria dos estudantes." },
        30: { label: "30 minutos", desc: "Progresso rápido e consistente semana após semana." },
        60: { label: "60 minutos", desc: "Imersão intensa para metas audaciosas." },
      },
      focusSkill: {
        BALANCED: { label: "Equilíbrio Total", desc: "Atenção equilibrada entre audição, fala, leitura e escrita." },
        LISTENING: { label: "Foco em Audição", desc: "Entenda nativos falando em velocidade natural, podcasts e séries." },
        SPEAKING: { label: "Foco em Fala e Pronúncia", desc: "Fale com segurança, boa pronúncia e desenvoltura em tempo real." },
        READING: { label: "Foco em Leitura", desc: "Leia mangás, notícias e cardápios sem depender de dicionário." },
        WRITING: { label: "Escrita e Kanji", desc: "Domine a ordem dos traços dos kanji e escreva com precisão gramatical." },
      },
      learningStyle: {
        STRUCTURED: { label: "Estruturado e Metódico", desc: "Currículo passo a passo apoiado em repetição espaçada SM-2." },
        IMMERSIVE: { label: "Imersão Situacional", desc: "Como morar no Japão: situações do dia a dia e diálogos com IA Sensei." },
        GAMIFIED: { label: "Aventura Interativa", desc: "Desbloqueie estações, ganhe emblemas e mantenha seus dias seguidos." },
        PRACTICAL: { label: "Sobrevivência Prática", desc: "Frases de alta utilidade prontas para usar imediatamente." },
      },
    },
  },
};

export function getOnboardingI18n(lang: NativeLanguage): OnboardingText {
  return ONBOARDING_I18N[lang] || ONBOARDING_I18N.en || ONBOARDING_I18N.vi;
}

