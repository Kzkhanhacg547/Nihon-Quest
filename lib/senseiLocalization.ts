/**
 * AI Sensei & Kaiwa Scenarios Localization Engine
 *
 * Localizes Sensei characters, greetings, scenario prompts, suggested replies,
 * and key grammar goals across all 12 supported languages:
 * vi, en, zh-CN, zh-TW, ko, es, fr, de, id, th, ru, pt.
 */

import type { NativeLanguage } from "@/components/LanguageContext";
import type { KaiwaScenario } from "./n3KaiwaScenarios";
import type { SenseiCharacter } from "./senseiCharacters";

export interface LocalizedScenarioMeta {
  title: string;
  badge: string;
  description: string;
  initialMeaning: string;
  suggestedReplies: { ja: string; furigana: string; meaning: string }[];
  keyGrammar: { pattern: string; meaning: string; example: string }[];
}

export const SENSEI_GREETINGS: Record<string, Partial<Record<NativeLanguage, string>>> = {
  aoi: {
    en: "Hello, I am Aoi. I look forward to studying Japanese with you!",
    "zh-CN": "你好，我是葵。很高兴能陪伴你一起学习日语！",
    "zh-TW": "你好，我是葵。很高興能陪伴你一起學習日語！",
    ko: "안녕하세요, 아오이입니다. 여러분과 함께 일본어를 공부하게 되어 기뻐요!",
    es: "¡Hola, soy Aoi! ¡Será un placer ayudarte a aprender japonés!",
    fr: "Bonjour, je suis Aoi. Je suis ravie de vous accompagner en japonais !",
    de: "Hallo, ich bin Aoi. Ich freue mich darauf, mit Ihnen Japanisch zu lernen!",
    id: "Halo, saya Aoi. Senang bisa menemani Anda belajar bahasa Jepang!",
    th: "สวัสดีค่ะ ฉันคืออาโออิ ยินดีเป็นอย่างยิ่งที่จะได้ช่วยฝึกภาษาญี่ปุ่นนะคะ!",
    ru: "Здравствуйте, я Аои. Буду рада помочь вам в изучении японского языка!",
    pt: "Olá, sou a Aoi. É um grande prazer ajudar você a estudar japonês!",
    vi: "Xin chào, cô là Aoi. Rất mong được giúp em.",
  },
  ren: {
    en: "Hello, I am Ren. Let's master practical Japanese together!",
    "zh-CN": "你好，我是莲。让我们一起攻克实战日语吧！",
    "zh-TW": "你好，我是蓮。讓我們一起攻克實戰日語吧！",
    ko: "안녕하세요, 렌입니다. 함께 실전 일본어를 마스터해 봅시다!",
    es: "¡Hola, soy Ren! ¡Dominemos el japonés práctico juntos!",
    fr: "Bonjour, je suis Ren. Maîtrisons ensemble le japonais pratique !",
    de: "Hallo, ich bin Ren. Lassen Sie uns gemeinsam praktisches Japanisch meistern!",
    id: "Halo, saya Ren. Mari kita kuasai bahasa Jepang praktis bersama!",
    th: "สวัสดีครับ ผมคือเร็น มาฝึกภาษาญี่ปุ่นเชิงปฏิบัติไปด้วยกันนะครับ!",
    ru: "Здравствуйте, я Рэн. Давайте вместе освоим практический японский язык!",
    pt: "Olá, sou o Ren. Vamos dominar o japonês prático juntos!",
    vi: "Xin chào, thầy là Ren. Rất mong được giúp em.",
  },
};

export const SCENARIO_TRANSLATIONS: Record<string, Partial<Record<NativeLanguage, LocalizedScenarioMeta>>> = {
  business_horenso: {
    en: {
      title: "Office Workplace & Horenso",
      badge: "Keigo & Business N3",
      description: "Report project progress, consult senior colleagues, and master polite office Keigo.",
      initialMeaning: "Good work today! How is the project progressing? Is there any issue you need help with?",
      suggestedReplies: [
        {
          ja: "予定通り進んでおりますが、一点だけご相談したいことがございます。",
          furigana: "よていどおりすすんでおりますが、いってんだけごそうだんしたいことがございます。",
          meaning: "It is proceeding on schedule, but there is one matter I would like to consult with you about.",
        },
        {
          ja: "資料の作成が終わったので、一度確認していただけますでしょうか？",
          furigana: "しりょうのさくせいがおわったので、いちどかくにんしていただけますでしょうか？",
          meaning: "I have finished preparing the documents. Could you please take a look at them once?",
        },
        {
          ja: "システムのエラーが発生してしまい、少し遅れております。",
          furigana: "システムのえらーがはっせいしてしまい、すこしおくれております。",
          meaning: "A system error occurred, so the progress is slightly delayed.",
        },
      ],
      keyGrammar: [
        { pattern: "〜に関して (Ni kanshite)", meaning: "Regarding / Concerning...", example: "この件に関して、ご相談があります。" },
        { pattern: "〜ていただけないでしょうか", meaning: "Could you please do me the favor of...", example: "ご確認していただけないでしょうか。" },
        { pattern: "〜うちに (Uchi ni)", meaning: "While / Before...", example: "明るいうちに作業を終わらせましょう。" },
      ],
    },
    "zh-CN": {
      title: "职场商务沟通与联络汇报 (Horenso)",
      badge: "商务敬语 N3",
      description: "向职场前辈汇报项目进度、征求意见，熟练运用日本职场商务敬语与委婉表达。",
      initialMeaning: "辛苦了！今天的项目进展得怎么样？遇到什么困难了吗？",
      suggestedReplies: [
        {
          ja: "予定通り進んでおりますが、一点だけご相談したいことがございます。",
          furigana: "よていどおりすすんでおりますが、いってんだけごそうだんしたいことがございます。",
          meaning: "目前按计划顺利进行，但有一点想向前辈请教商量。",
        },
        {
          ja: "資料の作成が終わったので、一度確認していただけますでしょうか？",
          furigana: "しりょうのさくせいがおわったので、いちどかくにんしていただけますでしょうか？",
          meaning: "材料已经整理好了，能否劳烦您帮我过目确认一下？",
        },
        {
          ja: "システムのエラーが発生してしまい、少し遅れております。",
          furigana: "システムのえらーがはっせいしてしまい、すこしおくれております。",
          meaning: "因为系统出现故障，进度稍微有些延迟。",
        },
      ],
      keyGrammar: [
        { pattern: "〜に関して (Ni kanshite)", meaning: "关于……", example: "この件に関して、ご相談があります。" },
        { pattern: "〜ていただけないでしょうか", meaning: "能否劳烦您……", example: "ご確認していただけないでしょうか。" },
        { pattern: "〜うちに (Uchi ni)", meaning: "趁着…… / 在……期间", example: "明るいうちに作業を終わらせましょう。" },
      ],
    },
    "zh-TW": {
      title: "職場商務溝通與聯絡匯報 (Horenso)",
      badge: "商務敬語 N3",
      description: "向職場前輩匯報專案進度、徵求意見，熟練運用日本職場商務敬語與委婉表達。",
      initialMeaning: "辛苦了！今天的專案進展得怎麼樣？遇到什麼困難了嗎？",
      suggestedReplies: [
        {
          ja: "予定通り進んでおりますが、一点だけご相談したいことがございます。",
          furigana: "よていどおりすすんでおりますが、いってんだけごそうだんしたいことがございます。",
          meaning: "目前按計劃順利進行，但有一點想向前輩請教商量。",
        },
        {
          ja: "資料の作成が終わったので、一度確認していただけますでしょうか？",
          furigana: "しりょうのさくせいがおわったので、いちどかくにんしていただけますでしょうか？",
          meaning: "資料已經整理好了，能否勞煩您幫我過目確認一下？",
        },
        {
          ja: "システムのエラーが発生してしまい、少し遅れております。",
          furigana: "システムのえらーがはっせいしてしまい、すこしおくれております。",
          meaning: "因為系統出現故障，進度稍微有些延遲。",
        },
      ],
      keyGrammar: [
        { pattern: "〜に関して (Ni kanshite)", meaning: "關於……", example: "この件に関して、ご相談があります。" },
        { pattern: "〜ていただけないでしょうか", meaning: "能否勞煩您……", example: "ご確認していただけないでしょうか。" },
        { pattern: "〜うちに (Uchi ni)", meaning: "趁著…… / 在……期間", example: "明るいうちに作業を終わらせましょう。" },
      ],
    },
    ko: {
      title: "직장 비즈니스 소통 & 호렌소 (보고·연락·상담)",
      badge: "비즈니스 경어 N3",
      description: "프로젝트 진행 상황 보고, 선배에게 조언 구하기 및 정중한 비즈니스 경어 구사 훈련.",
      initialMeaning: "수고하셨습니다! 오늘 프로젝트 진행은 어떠신가요? 혹시 곤란한 점이 있으신가요?",
      suggestedReplies: [
        {
          ja: "予定通り進んでおりますが、一点だけご相談したいことがございます。",
          furigana: "よていどおりすすんでおりますが、いってんだけごそうだんしたいことがございます。",
          meaning: "예정대로 진행되고 있습니다만, 한 가지 상의드리고 싶은 점이 있습니다.",
        },
        {
          ja: "資料の作成が終わったので、一度確認していただけますでしょうか？",
          furigana: "しりょうのさくせいがおわったので、いちどかくにんしていただけますでしょうか？",
          meaning: "자료 작성을 마쳤는데, 한 번 확인해 주실 수 있으실까요?",
        },
        {
          ja: "システムのエラーが発生してしまい、少し遅れております。",
          furigana: "システムのえらーがはっせいしてしまい、すこしおくれております。",
          meaning: "시스템 오류가 발생하여 일정이 조금 지연되고 있습니다.",
        },
      ],
      keyGrammar: [
        { pattern: "〜に関して (Ni kanshite)", meaning: "...에 관하여", example: "この件に関して、ご相談があります。" },
        { pattern: "〜ていただけないでしょうか", meaning: "...해 주실 수 있으실까요?", example: "ご確認していただけないでしょうか。" },
        { pattern: "〜うちに (Uchi ni)", meaning: "...하는 동안에 / ...하기 전에", example: "明るいうちに作業を終わらせましょう。" },
      ],
    },
  },
  casual_friends: {
    en: {
      title: "Casual Chat with Friends (Plain Form)",
      badge: "Plain Form & Slang",
      description: "Train real-life natural Japanese reflex with close friends: interjections, plain forms, and casual slang.",
      initialMeaning: "Hey there! What did you do over the weekend? Anything fun happen?",
      suggestedReplies: [
        {
          ja: "特に何もしてないよ。家でアニメ観てゴロゴロしてた（笑）",
          furigana: "とくになにもしてないよ。いえであにめみてごろごろしてた",
          meaning: "Not much really. Just chilled at home watching anime (haha).",
        },
        {
          ja: "友達と渋谷で新しいカフェに行ってきた！めっちゃ美味しかったよ！",
          furigana: "ともだちとしぶやであたらしいかふぇにいってきた！めっちゃおいしかったよ！",
          meaning: "Went to a new cafe in Shibuya with friends! It was super delicious!",
        },
        {
          ja: "日本語の勉強に追われてて、どこにも行けなかったんだよね…",
          furigana: "にほんごのべんきょうにおわれてて、どこにもいけなかったんだよね…",
          meaning: "I was buried in Japanese studies so I couldn't go anywhere...",
        },
      ],
      keyGrammar: [
        { pattern: "〜に違いない (Ni chigainai)", meaning: "Must certainly be...", example: "美味しいに違いない！" },
        { pattern: "〜わけがない (Wake ga nai)", meaning: "There is no way that...", example: "嘘をつくわけがないよ。" },
        { pattern: "〜てたまらない (Te tamaranai)", meaning: "Cannot help but / Dying to...", example: "日本に行きたくてたまらない！" },
      ],
    },
    "zh-CN": {
      title: "朋友闲聊（简体与口语）",
      badge: "口语简体 & 流行俚语",
      description: "与同龄日本好友零距离日常畅聊：感叹词、动词简体与自然口语俚语训练。",
      initialMeaning: "哈喽！周末都做啥啦？有什么好玩的事吗？",
      suggestedReplies: [
        {
          ja: "特に何もしてないよ。家でアニメ観てゴロゴロしてた（笑）",
          furigana: "とくになにもしてないよ。いえであにめみてごろごろしてた",
          meaning: "没特别干啥，就在家看动漫摆烂躺平啦（笑）。",
        },
        {
          ja: "友達と渋谷で新しいカフェに行ってきた！めっちゃ美味しかったよ！",
          furigana: "ともだちとしぶやであたらしいかふぇにいってきた！めっちゃおいしかったよ！",
          meaning: "跟朋友去了涩谷新开的咖啡馆！超级好吃！",
        },
        {
          ja: "日本語の勉強に追われてて、どこにも行けなかったんだよね…",
          furigana: "にほんごのべんきょうにおわれてて、どこにもいけなかったんだよね…",
          meaning: "忙着学日语抽不出时间，哪儿都没去成呢……",
        },
      ],
      keyGrammar: [
        { pattern: "〜に違いない (Ni chigainai)", meaning: "一定…… / 肯定……", example: "美味しいに違いない！" },
        { pattern: "〜わけがない (Wake ga nai)", meaning: "绝不可能……", example: "嘘をつくわけがないよ。" },
        { pattern: "〜てたまらない (Te tamaranai)", meaning: "……得不得了", example: "日本に行きたくてたまらない！" },
      ],
    },
    "zh-TW": {
      title: "朋友閒聊（簡體與口語）",
      badge: "口語簡體 & 流行俚語",
      description: "與同齡日本好友零距離日常暢聊：感嘆詞、動詞簡體與自然口語俚語訓練。",
      initialMeaning: "哈囉！週末都做啥啦？有什麼好玩的事嗎？",
      suggestedReplies: [
        {
          ja: "特に何もしてないよ。家でアニメ観てゴロゴロしてた（笑）",
          furigana: "とくになにもしてないよ。いえであにめみてごろごろしてた",
          meaning: "沒特別幹啥，就在家看動漫擺爛躺平啦（笑）。",
        },
        {
          ja: "友達と渋谷で新しいカフェに行ってきた！めっちゃ美味しかったよ！",
          furigana: "ともだちとしぶやであたらしいかふぇにいってきた！めっちゃおいしかったよ！",
          meaning: "跟朋友去了澀谷新開的咖啡館！超級好吃！",
        },
        {
          ja: "日本語の勉強に追われてて、どこにも行けなかったんだよね…",
          furigana: "にほんごのべんきょうにおわれてて、どこにもいけなかったんだよね…",
          meaning: "忙著學日語抽不出時間，哪兒都沒去成呢……",
        },
      ],
      keyGrammar: [
        { pattern: "〜に違いない (Ni chigainai)", meaning: "一定…… / 肯定……", example: "美味しいに違いない！" },
        { pattern: "〜わけがない (Wake ga nai)", meaning: "絕不可能……", example: "嘘をつくわけがないよ。" },
        { pattern: "〜てたまらない (Te tamaranai)", meaning: "……得不得了", example: "日本に行きたくてたまらない！" },
      ],
    },
    ko: {
      title: "친구와의 편안한 대화 (반말 & 일상 구어)",
      badge: "반말 & 실전 슬랭",
      description: "일본인 친구와 격식 없이 나누는 일상 대화: 감탄사, 반말 표현, 자연스러운 유행어 훈련.",
      initialMeaning: "안녕! 주말엔 뭐 했어? 무슨 재미있는 일 있었어?",
      suggestedReplies: [
        {
          ja: "特に何もしてないよ。家でアニメ観てゴロゴロしてた（笑）",
          furigana: "とくになにもしてないよ。いえであにめみてごろごろしてた",
          meaning: "딱히 별거 안 했어. 집에서 애니 보면서 뒹굴뒹굴했지 (웃음).",
        },
        {
          ja: "友達と渋谷で新しいカフェに行ってきた！めっちゃ美味しかったよ！",
          furigana: "ともだちとしぶやであたらしいかふぇにいってきた！めっちゃおいしかったよ！",
          meaning: "친구랑 시부야에 새로 생긴 카페 다녀왔어! 진짜 맛있었어!",
        },
        {
          ja: "日本語の勉強に追われてて、どこにも行けなかったんだよね…",
          furigana: "にほんごのべんきょうにおわれてて、どこにもいけなかったんだよね…",
          meaning: "일본어 공부하느라 바빠서 아무 데도 못 갔어...",
        },
      ],
      keyGrammar: [
        { pattern: "〜に違いない (Ni chigainai)", meaning: "틀림없이 ...일 것이다", example: "美味しいに違いない！" },
        { pattern: "〜わけがない (Wake ga nai)", meaning: "...할 리가 없다", example: "嘘をつくわけがないよ。" },
        { pattern: "〜てたまらない (Te tamaranai)", meaning: "...해서 견딜 수 없다", example: "日本に行きたくてたまらない！" },
      ],
    },
  },
  travel_restaurant: {
    en: {
      title: "Japan Travel & Restaurant Dining",
      badge: "Travel Survival",
      description: "Roleplay ordering food, asking for local specials, dish adjustments, or asking for directions.",
      initialMeaning: "Welcome! Our recommendation is the special Tonkotsu Ramen. Is there anything on the menu you'd like to try?",
      suggestedReplies: [
        {
          ja: "一番人気の特製豚骨ラーメンを麺硬めでお願いします！",
          furigana: "いちばんにんきのとくせいとんこつらーめんをめんかためでおねがいします！",
          meaning: "I'll have your most popular special Tonkotsu Ramen with firm noodles, please!",
        },
        {
          ja: "すみません、卵アレルギーがあるのですが、卵を抜いていただくことは可能ですか？",
          furigana: "すみません、たまごあれるぎーがあるのですが、たまごをぬいていただくことはかのうですか？",
          meaning: "Excuse me, I have an egg allergy. Would it be possible to prepare it without egg?",
        },
        {
          ja: "替え玉はいくらですか？後からでも追加注文できますか？",
          furigana: "かえだまはいくらですか？あとからでもついかちゅうもんできますか？",
          meaning: "How much is an extra noodle refill (Kaedama)? Can I order it later as well?",
        },
      ],
      keyGrammar: [
        { pattern: "〜たとたん (Ta totan)", meaning: "As soon as / Just when...", example: "スープを飲んだとたん、感動しました！" },
        { pattern: "〜ことにする (Koto ni suru)", meaning: "Decide to...", example: "このセットにすることにします。" },
      ],
    },
    "zh-CN": {
      title: "日本旅行与餐厅实战点单",
      badge: "实战旅行",
      description: "模拟点餐、询问招牌菜、忌口调整以及在东京/京都问路等真实情境。",
      initialMeaning: "欢迎光临！本店招牌是特制豚骨拉面，请问有什么想尝试的餐品吗？",
      suggestedReplies: [
        {
          ja: "一番人気の特製豚骨ラーメンを麺硬めでお願いします！",
          furigana: "いちばんにんきのとくせいとんこつらーめんをめんかためでおねがいします！",
          meaning: "请给我来一份最受欢迎的特制豚骨拉面，面条要偏硬一点！",
        },
        {
          ja: "すみません、卵アレルギーがあるのですが、卵を抜いていただくことは可能ですか？",
          furigana: "すみません、たまごあれるぎーがあるのですが、たまごをぬいていただくことはかのうですか？",
          meaning: "不好意思，我对鸡蛋过敏，请问可以不放鸡蛋吗？",
        },
        {
          ja: "替え玉はいくらですか？後からでも追加注文できますか？",
          furigana: "かえだまはいくらですか？あとからでもついかちゅうもんできますか？",
          meaning: "加一份面（Kaedama）多少钱？待会儿还能再加点吗？",
        },
      ],
      keyGrammar: [
        { pattern: "〜たとたん (Ta totan)", meaning: "刚一……就立刻……", example: "スープを飲んだとたん、感動しました！" },
        { pattern: "〜ことにする (Koto ni suru)", meaning: "决定……", example: "このセットにすることにします。" },
      ],
    },
    "zh-TW": {
      title: "日本旅行與餐廳實戰點單",
      badge: "實戰旅行",
      description: "模擬點餐、詢問招牌菜、忌口調整以及在東京/京都問路等真實情境。",
      initialMeaning: "歡迎光臨！本店招牌是特製豚骨拉麵，請問有什麼想嘗試的餐點嗎？",
      suggestedReplies: [
        {
          ja: "一番人気の特製豚骨ラーメンを麺硬めでお願いします！",
          furigana: "いちばんにんきのとくせいとんこつらーめんをめんかためでおねがいします！",
          meaning: "請給我來一份最受歡迎的特製豚骨拉麵，麵條要偏硬一點！",
        },
        {
          ja: "すみません、卵アレルギーがあるのですが、卵を抜いていただくことは可能ですか？",
          furigana: "すみません、たまごあれるぎーがあるのですが、たまごをぬいていただくことはかのうですか？",
          meaning: "不好意思，我對雞蛋過敏，請問可以不放雞蛋嗎？",
        },
        {
          ja: "替え玉はいくらですか？後からでも追加注文できますか？",
          furigana: "かえだまはいくらですか？あとからでもついかちゅうもんできますか？",
          meaning: "加一份麵（Kaedama）多少錢？待會兒還能再加點嗎？",
        },
      ],
      keyGrammar: [
        { pattern: "〜たとたん (Ta totan)", meaning: "剛一……就立刻……", example: "スープを飲んだとたん、感動しました！" },
        { pattern: "〜ことにする (Koto ni suru)", meaning: "決定……", example: "このセットにすることにします。" },
      ],
    },
    ko: {
      title: "일본 여행 & 맛집 실전 회화",
      badge: "실전 여행",
      description: "식당 주문, 추천 메뉴 문의, 알레르기 요청 및 도쿄/교토 길 찾기 롤플레잉.",
      initialMeaning: "어서 오세요! 저희 가게의 추천 메뉴는 특제 돈코츠 라멘입니다. 마음에 드는 메뉴가 있으신가요?",
      suggestedReplies: [
        {
          ja: "一番人気の特製豚骨ラーメンを麺硬めでお願いします！",
          furigana: "いちばんにんきのとくせいとんこつらーめんをめんかためでおねがいします！",
          meaning: "가장 인기 있는 특제 돈코츠 라멘으로, 면은 꼬들하게 부탁드립니다!",
        },
        {
          ja: "すみません、卵アレルギーがあるのですが、卵を抜いていただくことは可能ですか？",
          furigana: "すみません、たまごあれるぎーがあるのですが、たまごをぬいていただくことはかのうですか？",
          meaning: "죄송하지만 달걀 알레르기가 있어서 그런데, 달걀을 빼 주실 수 있나요?",
        },
        {
          ja: "替え玉はいくらですか？後からでも追加注文できますか？",
          furigana: "かえだまはいくらですか？あとからでもついかちゅうもんできますか？",
          meaning: "면 추가(카에다마)는 얼마인가요? 나중에 추가 주문도 가능한가요?",
        },
      ],
      keyGrammar: [
        { pattern: "〜たとたん (Ta totan)", meaning: "...하자마자 바로", example: "スープを飲んだとたん、感動しました！" },
        { pattern: "〜ことにする (Koto ni suru)", meaning: "...하기로 결정하다", example: "このセットにすることにします。" },
      ],
    },
  },
  n3_grammar_lab: {
    en: {
      title: "Intensive N3 Grammar Lab",
      badge: "N3 Grammar Focus",
      description: "Practice key N3 grammar in spontaneous conversation and receive instant error correction.",
      initialMeaning: "Hello! Let's practice N3 grammar together. Today, how about making a sentence using '〜わけがない' or '〜に違いない'?",
      suggestedReplies: [
        {
          ja: "毎日しっかり復習しているんだから、合格できないわけがない！",
          furigana: "まいにちしっかりふくしゅうしているんだから、ごうかくできないわけがない！",
          meaning: "Since I review thoroughly every day, there is no way I won't pass!",
        },
        {
          ja: "田中さんは日本に10年も住んでいるから、日本語がペラペラに違いない。",
          furigana: "たなかさんはにほんにじゅうねんもすんでいるから、にほんごがぺらぺらにちがいない。",
          meaning: "Tanaka-san has lived in Japan for 10 years, so he must surely be fluent in Japanese.",
        },
        {
          ja: "「わけがない」と「はずがない」の使い分けを詳しく教えてください。",
          furigana: "「わけがない」と「はずがない」のつかいわけをくわしくおしえてください。",
          meaning: "Could you please explain in detail the difference in usage between 'wake ga nai' and 'hazu ga nai'?",
        },
      ],
      keyGrammar: [
        { pattern: "〜わけがない", meaning: "There is no reason that / Impossible that...", example: "そんな嘘を信じるわけがない。" },
        { pattern: "〜に違いない", meaning: "Must certainly be...", example: "彼は犯人に違いない。" },
        { pattern: "〜をはじめ (O hajime)", meaning: "Starting with / Not to mention...", example: "東京をはじめ、大都市を巡る。" },
      ],
    },
    "zh-CN": {
      title: "N3 核心文法精练特训",
      badge: "N3 文法重点",
      description: "在真实交际中运用关键 N3 句型，即时获得语病修正与地道表达指导。",
      initialMeaning: "你好！一起来特训 N3 文法吧。今天想试着用「〜わけがない」或者「〜に違いない」造个句子吗？",
      suggestedReplies: [
        {
          ja: "毎日しっかり復習しているんだから、合格できないわけがない！",
          furigana: "まいにちしっかりふくしゅうしているんだから、ごうかくできないわけがない！",
          meaning: "每天都这么认真复习，怎么可能考不过呢！",
        },
        {
          ja: "田中さんは日本に10年も住んでいるから、日本語がペラペラに違いない。",
          furigana: "たなかさんはにほんにじゅうねんもすんでいるから、にほんごがぺらぺらにちがいない。",
          meaning: "田中先生都在日本住了10年了，日语肯定非常流利。",
        },
        {
          ja: "「わけがない」と「はずがない」の使い分けを詳しく教えてください。",
          furigana: "「わけがない」と「はずがない」のつかいわけをくわしくおしえてください。",
          meaning: "请 Sensei 详细讲解一下「わけがない」和「はずがない」的区别。",
        },
      ],
      keyGrammar: [
        { pattern: "〜わけがない", meaning: "绝无可能 / 毫无理由……", example: "そんな嘘を信じるわけがない。" },
        { pattern: "〜に違いない", meaning: "一定 / 肯定……", example: "彼は犯人に違いない。" },
        { pattern: "〜をはじめ (O hajime)", meaning: "以……为首 / 首先是……", example: "東京をはじめ、大都市を巡る。" },
      ],
    },
    "zh-TW": {
      title: "N3 核心文法精練特訓",
      badge: "N3 文法重點",
      description: "在真實交際中運用關鍵 N3 句型，即時獲得語病修正與道地表達指導。",
      initialMeaning: "你好！一起來特訓 N3 文法吧。今天想試著用「〜わけがない」或者「〜に違いない」造個句子嗎？",
      suggestedReplies: [
        {
          ja: "毎日しっかり復習しているんだから、合格できないわけがない！",
          furigana: "まいにちしっかりふくしゅうしているんだから、ごうかくできないわけがない！",
          meaning: "每天都這麼認真複習，怎麼可能考不過呢！",
        },
        {
          ja: "田中さんは日本に10年も住んでいるから、日本語がペラペラに違いない。",
          furigana: "たなかさんはにほんにじゅうねんもすんでいるから、にほんごがぺらぺらにちがいない。",
          meaning: "田中先生都在日本住了10年了，日語肯定非常流利。",
        },
        {
          ja: "「わけがない」と「はずがない」の使い分けを詳しく教えてください。",
          furigana: "「わけがない」と「はずがない」のつかいわけをくわしくおしえてください。",
          meaning: "請 Sensei 詳細講解一下「わけがない」和「はずがない」的區別。",
        },
      ],
      keyGrammar: [
        { pattern: "〜わけがない", meaning: "絕無可能 / 毫無理由……", example: "そんな嘘を信じるわけがない。" },
        { pattern: "〜に違いない", meaning: "一定 / 肯定……", example: "彼は犯人に違いない。" },
        { pattern: "〜をはじめ (O hajime)", meaning: "以……為首 / 首先是……", example: "東京をはじめ、大都市を巡る。" },
      ],
    },
    ko: {
      title: "N3 핵심 문법 집중 훈련실",
      badge: "N3 문법 집중",
      description: "주요 N3 문법 패턴을 실전 회화에 적용해 보고 실시간으로 피드백을 받아보세요.",
      initialMeaning: "안녕하세요! 함께 N3 문법을 연습해 봐요. 오늘은 '〜わけがない'나 '〜に違いない'를 사용해서 문장을 만들어 볼까요?",
      suggestedReplies: [
        {
          ja: "毎日しっかり復習しているんだから、合格できないわけがない！",
          furigana: "まいにちしっかりふくしゅうしているんだから、ごうかくできないわけがない！",
          meaning: "매일 확실하게 복습하고 있으니 합격 못 할 리가 없죠!",
        },
        {
          ja: "田中さんは日本に10年も住んでいるから、日本語がペラペラに違いない。",
          furigana: "たなかさんはにほんにじゅうねんもすんでいるから、にほんごがぺらぺらにちがいない。",
          meaning: "다나카 씨는 일본에 10년이나 살았으니 일본어가 유창함에 틀림없어요.",
        },
        {
          ja: "「わけがない」と「はずがない」の使い分けを詳しく教えてください。",
          furigana: "「わけがない」と「はずがない」のつかいわけをくわしくおしえてください。",
          meaning: "'わけがない'와 'はずがない'의 뉘앙스 차이를 자세히 알려주세요.",
        },
      ],
      keyGrammar: [
        { pattern: "〜わけがない", meaning: "...할 리가 없다", example: "そんな嘘を信じるわけがない。" },
        { pattern: "〜に違いない", meaning: "틀림없이 ...일 것이다", example: "彼は犯人に違いない。" },
        { pattern: "〜をはじめ (O hajime)", meaning: "...을 비롯하여", example: "東京をはじめ、大都市を巡る。" },
      ],
    },
  },
  free_kaiwa: {
    en: {
      title: "Free Conversation (Free Kaiwa)",
      badge: "Open Dialogue",
      description: "Chat freely about any topic you like: Anime, Japanese culture, recent stories, or study tips.",
      initialMeaning: "Hello! What would you like to talk about today? Favorite anime, Japanese culture, or recent events—feel free to share anything! 🌸",
      suggestedReplies: [
        {
          ja: "最近『葬送のフリーレン』というアニメにハマっていて、セリフがとても感動的でした。",
          furigana: "さいきん『そうそうのふりーれん』というあにめにはまっていて、せりふがとてもかんどうてきでした。",
          meaning: "Recently I've been hooked on the anime 'Frieren', and the lines were truly touching.",
        },
        {
          ja: "日本で一番おすすめの旅行先はどこですか？",
          furigana: "にほんでいちばんおすすめのりょこうさきはどこですか？",
          meaning: "What is your most recommended travel destination in Japan?",
        },
        {
          ja: "漢字を覚えるのが苦手なんですが、何か良いコツはありますか？",
          furigana: "かんじをおぼえるのがにがてなんですが、なにかよいこつはありますか？",
          meaning: "I struggle with memorizing Kanji. Do you have any good tips?",
        },
      ],
      keyGrammar: [
        { pattern: "〜にハマる (Ni hamaru)", meaning: "Be obsessed with / Addicted to...", example: "日本のラーメンにハマっている。" },
        { pattern: "〜にとって (Ni totte)", meaning: "For / To (someone)...", example: "私にとって、日本語は宝物です。" },
      ],
    },
    "zh-CN": {
      title: "自由主题日常随聊 (Free Kaiwa)",
      badge: "开放漫聊",
      description: "围绕你感兴趣的任何话题轻松畅聊：动漫、日本文化、近期日常或日语备考心得。",
      initialMeaning: "你好！今天想聊聊什么呢？喜欢的动漫、日本文化、最近的趣事……什么都可以畅所欲言哦！🌸",
      suggestedReplies: [
        {
          ja: "最近『葬送のフリーレン』というアニメにハマっていて、セリフがとても感動的でした。",
          furigana: "さいきん『そうそうのふりーれん』というあにめにはまっていて、せりふがとてもかんどうてきでした。",
          meaning: "最近沉迷于动漫《葬送的芙莉莲》，里面的台词真的很让人感动。",
        },
        {
          ja: "日本で一番おすすめの旅行先はどこですか？",
          furigana: "にほんでいちばんおすすめのりょこうさきはどこですか？",
          meaning: "在日本，Sensei 最推荐的旅游胜地是哪里呢？",
        },
        {
          ja: "漢字を覚えるのが苦手なんですが、何か良いコツはありますか？",
          furigana: "かんじをおぼえるのがにがてなんですが、なにかよいこつはありますか？",
          meaning: "我不太擅长背汉字，Sensei 有什么好的诀窍吗？",
        },
      ],
      keyGrammar: [
        { pattern: "〜にハマる (Ni hamaru)", meaning: "迷上…… / 对……上瘾", example: "日本のラーメンにハマっている。" },
        { pattern: "〜にとって (Ni totte)", meaning: "对……而言", example: "私にとって、日本語は宝物です。" },
      ],
    },
    "zh-TW": {
      title: "自由主題日常隨聊 (Free Kaiwa)",
      badge: "開放漫聊",
      description: "圍繞你感興趣的任何話題輕鬆暢聊：動漫、日本文化、近期日常或日語備考心得。",
      initialMeaning: "你好！今天想聊聊什麼呢？喜歡的動漫、日本文化、最近的趣事……什麼都可以暢所欲言哦！🌸",
      suggestedReplies: [
        {
          ja: "最近『葬送のフリーレン』というアニメにハマっていて、セリフがとても感動的でした。",
          furigana: "さいきん『そうそうのふりーれん』というあにめにはまっていて、せりふがとてもかんどうてきでした。",
          meaning: "最近沉迷於動漫《葬送的芙莉蓮》，裡面的台詞真的很讓人感動。",
        },
        {
          ja: "日本で一番おすすめの旅行先はどこですか？",
          furigana: "にほんでいちばんおすすめのりょこうさきはどこですか？",
          meaning: "在日本，Sensei 最推薦的旅遊勝地是哪裡呢？",
        },
        {
          ja: "漢字を覚えるのが苦手なんですが、何か良いコツはありますか？",
          furigana: "かんじをおぼえるのがにがてなんですが、なにかよいこつはありますか？",
          meaning: "我不太擅長背漢字，Sensei 有什麼好的訣竅嗎？",
        },
      ],
      keyGrammar: [
        { pattern: "〜にハマる (Ni hamaru)", meaning: "迷上…… / 對……上癮", example: "日本のラーメンにハマっている。" },
        { pattern: "〜にとって (Ni totte)", meaning: "對……而言", example: "私にとって、日本語は宝物です。" },
      ],
    },
    ko: {
      title: "자유 일상 회화 (Free Kaiwa)",
      badge: "열린 대화",
      description: "애니메이션, 일본 문화, 최근 일상, 공부 노하우 등 좋아하는 주제로 편하게 대화해 보세요.",
      initialMeaning: "안녕하세요! 오늘은 어떤 이야기를 나눠볼까요? 좋아하는 애니메이션이나 일본 문화, 최근 있었던 일 등 무엇이든 편하게 들려주세요! 🌸",
      suggestedReplies: [
        {
          ja: "最近『葬送のフリーレン』というアニメにハマっていて、セリフがとても感動的でした。",
          furigana: "さいきん『そうそうのふりーれん』というあにめにはまっていて、せりふがとてもかんどうてきでした。",
          meaning: "요즘 '장송의 프리렌'이라는 애니에 푹 빠져 있는데 대사가 정말 감동적이었어요.",
        },
        {
          ja: "日本で一番おすすめの旅行先はどこですか？",
          furigana: "にほんでいちばんおすすめのりょこうさきはどこですか？",
          meaning: "일본에서 선생님이 가장 추천하는 여행지는 어디인가요?",
        },
        {
          ja: "漢字を覚えるのが苦手なんですが、何か良いコツはありますか？",
          furigana: "かんじをおぼえるのがにがてなんですが、なにかよいこつはありますか？",
          meaning: "한자 암기가 조금 어려운데 좋은 요령이 있을까요?",
        },
      ],
      keyGrammar: [
        { pattern: "〜にハマる (Ni hamaru)", meaning: "...에 푹 빠지다 / 몰두하다", example: "日本のラーメンにハマっている。" },
        { pattern: "〜にとって (Ni totte)", meaning: "...에게 있어서", example: "私にとって、日本語は宝物です。" },
      ],
    },
  },
};

export function getLocalizedScenario(scenario: KaiwaScenario, lang: NativeLanguage): KaiwaScenario {
  if (lang === "vi") return scenario;

  const translation = SCENARIO_TRANSLATIONS[scenario.id]?.[lang] || SCENARIO_TRANSLATIONS[scenario.id]?.en;
  if (!translation) return scenario;

  return {
    ...scenario,
    title: translation.title,
    badge: translation.badge,
    description: translation.description,
    initialMeaning: translation.initialMeaning,
    suggestedReplies: scenario.suggestedReplies.map((r, i) => ({
      ...r,
      vi: translation.suggestedReplies[i]?.meaning || r.vi,
    })),
    keyGrammar: scenario.keyGrammar.map((g, i) => ({
      ...g,
      meaning: translation.keyGrammar[i]?.meaning || g.meaning,
    })),
  };
}

export function getLocalizedSenseiGreeting(char: SenseiCharacter, lang: NativeLanguage): string {
  if (lang === "vi") return char.greeting.vi;
  return SENSEI_GREETINGS[char.id]?.[lang] || SENSEI_GREETINGS[char.id]?.en || char.greeting.vi;
}
