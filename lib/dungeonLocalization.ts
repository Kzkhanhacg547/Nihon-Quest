/**
 * Sensei Daily Dungeon Internationalization (i18n) Engine
 *
 * Core Principles:
 * 1. Japanese practice content (situationJa, furigana, textJa) remains 100% Authentic Japanese.
 * 2. Prompts, translations, and pedagogical explanations are dynamically localized
 *    into the user's native language (vi, zh-CN, zh-TW, en, etc.).
 */

export interface LocalizedThemeData {
  title: string;
  description: string;
}

export interface LocalizedQuestionData {
  situation: string;
  options: string[];
  explanation: string;
}

export const THEME_LOCALIZATIONS: Record<string, Record<string, LocalizedThemeData>> = {
  theme_travel_airport: {
    vi: {
      title: "✈️ Du Lịch & Sân Bay Narita",
      description: "Xử lý tình huống làm thủ tục check-in, hỏi đường và khai báo hải quan tại sân bay.",
    },
    "zh-CN": {
      title: "✈️ 旅游出行与成田机场",
      description: "应对在机场办理登机手续、问路和海关申报等真实场景。",
    },
    "zh-TW": {
      title: "✈️ 旅遊出行與成田機場",
      description: "應對在機場辦理登機手續、問路和海關申報等真實場景。",
    },
    en: {
      title: "✈️ Travel & Narita Airport",
      description: "Handle check-in procedures, asking for directions, and customs declarations at the airport.",
    },
  },
  theme_ramen_restaurant: {
    vi: {
      title: "🍜 Ẩm Thực & Gọi Món Tại Nhà Hàng",
      description: "Gọi đồ ăn, yêu cầu độ mềm của mì ramen và thanh toán tiền tại quán.",
    },
    "zh-CN": {
      title: "🍜 美食探店与拉面点餐",
      description: "在餐厅点餐、选择拉面硬度偏好并完成结账。",
    },
    "zh-TW": {
      title: "🍜 美食探店與拉麵點餐",
      description: "在餐廳點餐、選擇拉麵硬度偏好並完成結帳。",
    },
    en: {
      title: "🍜 Dining & Ordering at Ramen Shop",
      description: "Order food, customize ramen firmness, and pay the bill at the restaurant.",
    },
  },
  theme_office_business: {
    vi: {
      title: "🏢 Công Sở & Kính Ngữ Keigo N3",
      description: "Báo cáo tiến độ Horenso và sử dụng Tôn kính ngữ / Khiêm nhường ngữ với sếp.",
    },
    "zh-CN": {
      title: "🏢 职场沟通与商务敬语 N3",
      description: "遵循 Horenso 汇报进度，并在与上级交流时正确使用尊敬语和谦逊语。",
    },
    "zh-TW": {
      title: "🏢 職場溝通與商務敬語 N3",
      description: "遵循 Horenso 彙報進度，並在與上級交流時正確使用尊敬語和謙遜語。",
    },
    en: {
      title: "🏢 Business & Keigo Honorifics N3",
      description: "Report progress using Horenso and apply Sonkeigo/Kenjougo correctly with supervisors.",
    },
  },
  theme_station_transport: {
    vi: {
      title: "🚃 Giao Thông & Ga Shinjuku",
      description: "Mua vé tàu Shinkansen, hỏi ke tàu Yamanote và hỏi thông tin nhân viên ga.",
    },
    "zh-CN": {
      title: "🚃 交通出行与新宿站",
      description: "购买新干线车票、询问山手线月台并向站务员咨询换乘。",
    },
    "zh-TW": {
      title: "🚃 交通出行與新宿站",
      description: "購買新幹線車票、詢問山手線月台並向站務員諮詢換乘。",
    },
    en: {
      title: "🚃 Transit & Shinjuku Station",
      description: "Buy Shinkansen tickets, find Yamanote platforms, and ask station staff for transfer info.",
    },
  },
  theme_konbini_shopping: {
    vi: {
      title: "🛍️ Mua Sắm Konbini Lawson",
      description: "Thanh toán bằng thẻ IC, hâm nóng bento và xử lý thủ tục miễn thuế Tax-Free.",
    },
    "zh-CN": {
      title: "🛍️ 便利店罗森购物实操",
      description: "使用交通IC卡结账、加热便当并办理免税手续。",
    },
    "zh-TW": {
      title: "🛍️ 便利商店 Lawson 購物實操",
      description: "使用交通IC卡結帳、加熱便當並辦理免稅手續。",
    },
    en: {
      title: "🛍️ Konbini Shopping at Lawson",
      description: "Pay with IC cards, microwave bento meals, and process Tax-Free purchases.",
    },
  },
  theme_kyoto_culture: {
    vi: {
      title: "⛩️ Văn Hóa & Ngôi Chùa Kyoto",
      description: "Mua thẻ Omikuji, quy tắc rửa tay chōzuya và mua quà lưu niệm tại Kyoto.",
    },
    "zh-CN": {
      title: "⛩️ 京都文化与神社礼仪",
      description: "求御神签(Omikuji)、手水舍净手礼仪及在京都挑选伴手礼。",
    },
    "zh-TW": {
      title: "⛩️ 京都文化與神社禮儀",
      description: "求御神籤(Omikuji)、手水舍淨手禮儀及在京都挑選伴手禮。",
    },
    en: {
      title: "⛩️ Culture & Kyoto Temples",
      description: "Draw Omikuji fortunes, observe Chōzuya water etiquette, and buy souvenirs in Kyoto.",
    },
  },
  theme_pharmacy_health: {
    vi: {
      title: "🏥 Y Tế & Đi Bệnh Viện / Nhà Thuốc",
      description: "Diễn tả triệu chứng đau đầu/sốt nhẹ và hỏi liều lượng uống từ dược sĩ.",
    },
    "zh-CN": {
      title: "🏥 医疗健康与药妆店问药",
      description: "向药剂师描述头痛/低烧症状并咨询正确的服药剂量。",
    },
    "zh-TW": {
      title: "🏥 醫療健康與藥妝店問藥",
      description: "向藥劑師描述頭痛/低燒症狀並諮詢正確的服藥劑量。",
    },
    en: {
      title: "🏥 Healthcare & Pharmacy Visits",
      description: "Describe symptoms like headache or fever and ask the pharmacist about dosage.",
    },
  },
};

export const QUESTION_LOCALIZATIONS: Record<string, Record<string, LocalizedQuestionData>> = {
  // Theme 1: Airport
  "theme_travel_airport:q1": {
    "zh-CN": {
      situation: "在办理登机手续时，地勤人员问您「お荷物は預けますか？」(需要托运行李吗？)。您应该如何回答？",
      options: [
        "是的，麻烦托运这个行李箱。",
        "不，我想买车票。",
        "好的，我出示护照。",
        "不好意思，已经满员了。",
      ],
      explanation: "「荷物を預ける」意为托运行李。最得体准确的回答是「はい、このスーツケースをお願いします」。",
    },
    "zh-TW": {
      situation: "在辦理登機手續時，地勤人員詢問您「お荷物は預けますか？」(需要託運行李嗎？)。您應如何回答？",
      options: [
        "是的，麻煩託運這個行李箱。",
        "不，我想買車票。",
        "好的，我出示護照。",
        "不好意思，已經客滿了。",
      ],
      explanation: "「荷物を預ける」意為託運行李。最得體準確的回答是「はい、このスーツケースをお願いします」。",
    },
    en: {
      situation: "At check-in, the agent asks: 'お荷物は預けますか？' (Will you check any baggage?). How do you reply?",
      options: [
        "Yes, please check this suitcase.",
        "No, I want to buy a train ticket.",
        "Yes, I will show my passport.",
        "Sorry, it's already full.",
      ],
      explanation: "「荷物を預ける」means to check baggage. Answering 'はい、このスーツケースをお願いします' is the most natural and accurate.",
    },
  },
  "theme_travel_airport:q2": {
    "zh-CN": {
      situation: "入境审查时，审查官提问「滞在期間はどれくらいですか？」(停留多长时间？)。",
      options: [
        "目的是观光旅游。",
        "预计停留大约1周左右。",
        "我住在东京的酒店。",
        "我昨天就已经到了。",
      ],
      explanation: "「滞在期間」表示逗留/停留时间。回答具体天数或周数如「1週間ほどの予定です」最符合语境。",
    },
    "zh-TW": {
      situation: "入境審查時，審查官提問「滞在期間はどれくらいですか？」(停留多長時間？)。",
      options: [
        "目的是觀光旅遊。",
        "預計停留大約1週左右。",
        "我住在東京的飯店。",
        "我昨天就已經到了。",
      ],
      explanation: "「滞在期間」表示停留時間。回答具體天數或週數如「1週間ほどの予定です」最符合語境。",
    },
    en: {
      situation: "At immigration, the officer asks: '滞在期間はどれくらいですか？' (How long will you stay?).",
      options: [
        "The purpose is tourism.",
        "I plan to stay for about one week.",
        "I am staying at a Tokyo hotel.",
        "I arrived yesterday.",
      ],
      explanation: "「滞在期間」refers to the length of stay. Replying with a duration like '1週間ほどの予定です' is correct.",
    },
  },
  "theme_travel_airport:q3": {
    "zh-CN": {
      situation: "在安检口，工作人员提示「ポケットの中身をすべて出してください」(请把口袋里的所有物品拿出来)。",
      options: [
        "好的明白了。这是手机和钥匙。",
        "不，我不买任何东西。",
        "我预订了飞机航班。",
        "登机口在哪个方向？",
      ],
      explanation: "按照安检提示清空口袋金属物品并交给工作人员检查。",
    },
    "zh-TW": {
      situation: "在安檢處，工作人員提示「ポケットの中身をすべて出してください」(請把口袋裡的所有物品拿出來)。",
      options: [
        "好的明白了。這是手機和鑰匙。",
        "不，我不買任何東西。",
        "我預訂了飛機航班。",
        "登機門在什麼方向？",
      ],
      explanation: "按照安檢提示清空口袋金屬物品並交由工作人員檢查。",
    },
    en: {
      situation: "At security screening, you are told: 'ポケットの中身をすべて出してください' (Empty all your pockets).",
      options: [
        "Understood. Here are my smartphone and keys.",
        "No, I am not buying anything.",
        "I have booked a flight.",
        "Where is the boarding gate?",
      ],
      explanation: "Take items out of your pockets for metal detector screening.",
    },
  },
  "theme_travel_airport:q4": {
    "zh-CN": {
      situation: "机场广播提示登机口变更（ゲートの変更）。您应该采取什么行动？",
      options: [
        "在电子信息看板上确认新的登机口编号并前往。",
        "继续留在原来的登机口等待。",
        "前往行李转盘取回行李。",
        "叫一辆出租车。",
      ],
      explanation: "听到更换登机口广播时，应及时查看航显信息屏（案内板）确认最新登机口。",
    },
    "zh-TW": {
      situation: "機場廣播提示登機門變更（ゲートの変更）。您應該採取什麼行動？",
      options: [
        "在電子資訊看闆上確認新的登機門號碼並前往。",
        "繼續留在原本的登機門等待。",
        "前往行李轉盤取回行李。",
        "叫一輛計程車。",
      ],
      explanation: "聽到更換登機門廣播時，應及時查看資訊看板（案内板）確認最新登機門號碼。",
    },
    en: {
      situation: "You hear an announcement about a gate change (ゲートの変更). What should you do?",
      options: [
        "Check the departure display board for the new gate and proceed there.",
        "Stay at the previous gate.",
        "Go retrieve your checked luggage.",
        "Call a taxi.",
      ],
      explanation: "When a gate change is announced, check the flight display screens (案内板) to locate the new gate.",
    },
  },
  "theme_travel_airport:q5": {
    "zh-CN": {
      situation: "在外币兑换窗口希望将外币换成日元，以下哪句商务/礼貌表达最得体？",
      options: [
        "请问能帮我兑换成日元吗？（日本円への両替をお願いできますでしょうか？）",
        "给我换成日元。（円に変えてくれ。）",
        "我打算兑换外币。（両替するつもりだ。）",
        "我会付钱。（お金を払います。）",
      ],
      explanation: "「～をお願いできますでしょうか？」是 N3 级别标准的客气敬语请求表达。",
    },
    "zh-TW": {
      situation: "在外幣兌換窗口希望將外幣換成日圓，以下哪句禮貌表達最得體？",
      options: [
        "請問能幫我兌換成日圓嗎？（日本円への両替をお願いできますでしょうか？）",
        "給我換成日圓。（円に変えてくれ。）",
        "我打算換錢。（両替するつもりだ。）",
        "我會付錢。（お金を払います。）",
      ],
      explanation: "「～をお願いできますでしょうか？」是 N3 級別標準的客氣敬語請求表達。",
    },
    en: {
      situation: "At the currency exchange counter, which polite expression is best to ask for Japanese Yen?",
      options: [
        "Could I please exchange this into Japanese Yen? (日本円への両替をお願いできますでしょうか？)",
        "Change this to Yen for me.",
        "I intend to exchange money.",
        "I will pay money.",
      ],
      explanation: "「～をお願いできますでしょうか？」is standard N3 polite Keigo for making requests.",
    },
  },

  // Theme 2: Ramen restaurant
  "theme_ramen_restaurant:q1": {
    "zh-CN": {
      situation: "在自动售券机买好拉面券后，店员询问「麺のかたさはどうしますか？」(面条硬度有什么要求？)。",
      options: [
        "请帮我做偏硬口感（かため）。",
        "请不要放辣椒。",
        "请给我大份超大碗。",
        "请给我倒杯水。",
      ],
      explanation: "拉面面条硬度常见选项包括：かため (偏硬)、ふつう (适中)、やわらかめ (偏软)。",
    },
    "zh-TW": {
      situation: "在自動售券機買好拉麵券後，店員詢問「麺のかたさはどうしますか？」(麵條硬度有什麼要求？)。",
      options: [
        "請幫我做偏硬口感（かため）。",
        "請不要放辣椒。",
        "請給我大碗份量。",
        "請給我倒杯水。",
      ],
      explanation: "拉麵麵條硬度常見選項包括：かため (偏硬)、ふつう (適中)、やわらかめ (偏軟)。",
    },
    en: {
      situation: "After buying a meal ticket, the staff asks: '麺のかたさはどうしますか？' (How firm would you like your noodles?).",
      options: [
        "Firm noodles, please (かため).",
        "Please don't make it spicy.",
        "Please make it extra large.",
        "Water, please.",
      ],
      explanation: "Ramen noodle firmness choices include: かため (firm), ふつう (regular), やわらかめ (soft).",
    },
  },
  "theme_ramen_restaurant:q2": {
    "zh-CN": {
      situation: "吃拉面途中想要加一份叉烧（チャーシュー），向店员点单时怎样招呼最自然？",
      options: [
        "不好意思，请问可以追加叉烧配料吗？（チャーシューのトッピングを追加できますか？）",
        "我讨厌叉烧。",
        "我已经把汤全喝光了。",
        "多谢款待。",
      ],
      explanation: "追加点单使用「～を追加できますか？」(可以追加...吗？)。",
    },
    "zh-TW": {
      situation: "吃拉麵途中想要加一份叉燒（チャーシュー），向店員點餐時怎樣呼喚最自然？",
      options: [
        "不好意思，請問可以追加叉燒配料嗎？（チャーシューのトッピングを追加できますか？）",
        "我討厭叉燒。",
        "我已經把湯全喝光了。",
        "多謝款待。",
      ],
      explanation: "追加點餐使用「～を追加できますか？」(可以追加...嗎？)。",
    },
    en: {
      situation: "When you want to add extra chashu pork slices, what should you say to the staff?",
      options: [
        "Excuse me, could I add extra chashu topping? (チャーシューのトッピングを追加できますか？)",
        "I dislike chashu.",
        "I drank all the soup.",
        "Thank you for the meal.",
      ],
      explanation: "Use 「～を追加できますか？」 to request add-on toppings.",
    },
  },
  "theme_ramen_restaurant:q3": {
    "zh-CN": {
      situation: "拉面用餐完毕离开店铺时，表达感谢最地道礼貌的问候语是？",
      options: [
        "多谢款待，非常美味！（ごちそうさまでした。美味しかったです！）",
        "我开动了。（いただきます。）",
        "打扰了。（お邪魔しました。）",
        "请慢走。（いってらっしゃい。）",
      ],
      explanation: "用餐结束后向店家表示感谢一律使用「ごちそうさまでした」。",
    },
    "zh-TW": {
      situation: "拉麵用餐完畢離開店鋪時，表達感謝最地道禮貌的問候語是？",
      options: [
        "多謝款待，非常美味！（ごちそうさまでした。美味しかったです！）",
        "我開動了。（いただきます。）",
        "打擾了。（お邪魔しました。）",
        "請慢走。（いってらっしゃい。）",
      ],
      explanation: "用餐結束後向店家表示感謝一律使用「ごちそうさまでした」。",
    },
    en: {
      situation: "After finishing your meal, what is the most natural greeting to thank the restaurant?",
      options: [
        "Thank you for the delicious meal! (ごちそうさまでした。美味しかったです！)",
        "Bon appetit (いただきます).",
        "Sorry for intruding (お邪魔しました).",
        "Take care (いってらっしゃい).",
      ],
      explanation: "After finishing food in Japan, always say 「ごちそうさまでした」.",
    },
  },
  "theme_ramen_restaurant:q4": {
    "zh-CN": {
      situation: "拉面点单中的「スープの味を濃いめ（こいめ）にする」具体是什么意思？",
      options: [
        "汤头风味浓郁，盐分和醇厚度比普通更浓。（スープの味が濃く、塩分や旨味が強めになること。）",
        "汤头变清淡。",
        "在热汤里加冰块。",
        "汤头少油少脂。",
      ],
      explanation: "濃いめ (Koime) 表示汤底风味更加浓厚醇香。",
    },
    "zh-TW": {
      situation: "拉麵點單中的「スープの味を濃いめ（こいめ）にする」具體是什麼意思？",
      options: [
        "湯頭風味濃郁，鹽分和醇厚度比普通更濃。（スープの味が濃く、塩分や旨味が強めになること。）",
        "湯頭變清淡。",
        "在熱湯裡加冰塊。",
        "湯頭少油少脂。",
      ],
      explanation: "濃いめ (Koime) 表示湯底風味更加濃厚醇香。",
    },
    en: {
      situation: "What does 'スープの味を濃いめにする' mean in ramen ordering?",
      options: [
        "Making the soup richer, with bolder salt and umami flavors than standard.",
        "Making the soup milder/diluted.",
        "Adding ice cubes to the soup.",
        "Reducing fat content in soup.",
      ],
      explanation: "濃いめ (Koime) means richer, more intense ramen soup flavor.",
    },
  },
  "theme_ramen_restaurant:q5": {
    "zh-CN": {
      situation: "在博多等拉面店加替玉（替え玉，追加单份面条）的最佳时机是什么时候？",
      options: [
        "第一碗面快吃完，且碗中还保留足够汤汁的时候。",
        "进门还没入座的时候。",
        "已经把所有汤汁一口气喝完之后。",
        "结账买完单准备出门的时候。",
      ],
      explanation: "替え玉是将煮好的新面条加入原有剩余汤底中，因此必须保留碗中汤汁。",
    },
    "zh-TW": {
      situation: "在博多等拉麵店加替玉（替え玉，追加單份麵條）的最佳時機是什麼時候？",
      options: [
        "第一碗麵快吃完，且碗中還保留足夠湯汁的時候。",
        "進門還沒入座的時候。",
        "已經把所有湯汁一口氣喝完之後。",
        "結帳買完單準備出門的時候。",
      ],
      explanation: "替え玉是將煮好的新麵條加入原有剩餘湯底中，因此必須保留碗中湯汁。",
    },
    en: {
      situation: "When is the proper time to order Kaedama (替え玉, extra noodle refill)?",
      options: [
        "When noodles are almost finished and soup still remains in the bowl.",
        "Before entering the shop.",
        "After drinking every drop of soup.",
        "After paying the bill.",
      ],
      explanation: "Kaedama noodles are served directly into remaining soup, so you must keep soup in your bowl.",
    },
  },

  // Theme 3: Office
  "theme_office_business:q1": {
    "zh-CN": {
      situation: "因身体不适需要向上级汇报会迟到约30分钟，最得体规范的商务敬语是？",
      options: [
        "身体突发不适，需迟到约30分钟上班。非常抱歉。（体調を崩してしまい、30分ほど遅れて出社いたします。申し訳ございません。）",
        "感觉不舒服，等会儿再过去哈。",
        "我要迟到了。",
        "我请假了，拜托你。",
      ],
      explanation: "使用谦逊语「出社いたします」以及郑重致歉词「申し訳ございません」。",
    },
    "zh-TW": {
      situation: "因身體不適需要向上級彙報會遲到約30分鐘，最得體規範的商務敬語是？",
      options: [
        "身體突發不適，需遲到約30分鐘上班。非常抱歉。（体調を崩してしまい、30分ほど遅れて出社いたします。申し訳ございません。）",
        "感覺不舒服，等會兒再過去哈。",
        "我要遲到了。",
        "我請假了，拜託你。",
      ],
      explanation: "使用謙遜語「出社いたします」以及鄭重致歉詞「申し訳ございません」。",
    },
    en: {
      situation: "You are feeling sick and will be 30 minutes late. What is the most appropriate business Keigo message?",
      options: [
        "Due to feeling unwell, I will be arriving about 30 minutes late. I sincerely apologize. (体調を崩してしまい、30分ほど遅れて出社いたします。申し訳ございません。)",
        "I feel bad, I'll come later.",
        "I'll be late.",
        "Taking off today, take care of it.",
      ],
      explanation: "Use Kenjougo 「出社いたします」 and polite apology 「申し訳ございません」.",
    },
  },
  "theme_office_business:q2": {
    "zh-CN": {
      situation: "接听外部业务合作方电话，寻找您的上级田中部长，而部长恰好不在工位。您应如何应对？",
      options: [
        "不凑巧田中暂时离开了座位。待他返回后，可否安排他给您回电？（あいにく田中は席を外しております。戻りましたら折り返しお電話させましょうか？）",
        "田中先生现在出去玩了。",
        "田中部长大人不在这里。（田中部長様はいらっしゃいません。）",
        "请挂断电话。",
      ],
      explanation: "在日本商务礼仪中，向外部公司提及本公司人员（哪怕是领导）一律不加尊称「様」或职位「部長」，直接称呼姓氏「田中」。",
    },
    "zh-TW": {
      situation: "接聽外部業務合作方電話，尋找您的上級田中部長，而部長恰好不在工位。您應如何應對？",
      options: [
        "不湊巧田中暫時離開了座位。待他返回後，可否安排他給您回電？（あいにく田中は席を外しております。戻りましたら折り返しお電話させましょうか？）",
        "田中先生現在出去玩了。",
        "田中部長大人不在這裡。（田中部長様はいらっしゃいません。）",
        "請掛斷電話。",
      ],
      explanation: "在日本商務禮儀中，向外部公司提及本公司人員（哪怕是領導）一律不加尊稱「様」或職位「部長」，直接稱呼姓氏「田中」。",
    },
    en: {
      situation: "An external client calls asking for Manager Tanaka, who is away from his desk. How do you respond?",
      options: [
        "Unfortunately Tanaka has stepped away. Shall I have him call you back upon returning? (あいにく田中は席を外しております。戻りましたら折り返しお電話させましょうか？)",
        "Tanaka-san went out to play.",
        "Tanaka Bucho-sama is not here.",
        "Please hang up the phone.",
      ],
      explanation: "When speaking with outsiders about colleagues/managers, drop honorifics like 様/部長 and refer to them plainly as 田中.",
    },
  },
  "theme_office_business:q3": {
    "zh-CN": {
      situation: "日本企业职场文化中著名的高效协作法则「ほうれんそう（报联相）」由哪三项构成？",
      options: [
        "报告（ほうこく）・联络（れんらく）・商量探讨（そうだん）",
        "菠菜・西红柿・黄瓜",
        "广播・练习・探讨",
        "拜访・联络・大扫除",
      ],
      explanation: "Hō-Ren-Sō 谐音菠菜，实际代表 報告 (报告) + 連絡 (联络) + 相談 (商量探讨)。",
    },
    "zh-TW": {
      situation: "日本企業職場文化中著名的高效協作法則「ほうれんそう（報聯相）」由哪三項構成？",
      options: [
        "報告（ほうこく）・聯絡（れんらく）・商量探討（そうだん）",
        "菠菜・番茄・小黃瓜",
        "廣播・練習・探討",
        "拜訪・聯絡・大掃除",
      ],
      explanation: "Hō-Ren-Sō 諧音菠菜，實際代表 報告 (報告) + 連絡 (聯絡) + 相談 (商量探討)。",
    },
    en: {
      situation: "What does the Japanese business principle 'Horenso (報連相)' stand for?",
      options: [
        "Report (報告), Contact (連絡), Consult (相談)",
        "Spinach, Tomato, Cucumber",
        "Broadcasting, Practice, Discussion",
        "Visiting, Contacting, Cleaning",
      ],
      explanation: "Horenso = 報告 (Hōkoku) + 連絡 (Renraku) + 相談 (Sōdan).",
    },
  },
  "theme_office_business:q4": {
    "zh-CN": {
      situation: "领导委托您复核一份重要商业文件，完成核对后向领导汇报的最佳用语是？",
      options: [
        "按您的指示，文件核对工作已全部完成。请您过目批阅。（ご指示いただいた書類の確認が完了いたしました。ご確認をお願いいたします。）",
        "文件我看过了，没毛病。",
        "辛苦领导了。（ご苦労様でした — 上对下用词，不可对领导用）",
        "我自己擅自修改好啦。",
      ],
      explanation: "使用「ご指示いただいた」表达尊重指示，以及谦逊语「完了いたしました」。",
    },
    "zh-TW": {
      situation: "領導委託您覆核一份重要商業文件，完成核對後向領導彙報的最佳用語是？",
      options: [
        "按您的指示，文件核對工作已全部完成。請您過目批閱。（ご指示いただいた書類の確認が完了いたしました。ご確認をお願いいたします。）",
        "文件我看過了，沒毛病。",
        "辛苦領導了。（ご苦労様でした — 上對下用詞，不可對長官用）",
        "我自己擅自修改好啦。",
      ],
      explanation: "使用「ご指示いただいた」表達尊重指示，以及謙遜語「完了いたしました」。",
    },
    en: {
      situation: "Your supervisor asked you to review a document. How do you report that it is complete?",
      options: [
        "I have completed checking the document as instructed. Please review it at your convenience. (ご指示いただいた書類の確認が完了いたしました。ご確認をお願いいたします。)",
        "Looked at it. It's fine.",
        "Gokurousama deshita (used from superior to subordinate, inappropriate).",
        "I modified it on my own.",
      ],
      explanation: "Use 「ご指示いただいた」 and Kenjougo 「完了いたしました」.",
    },
  },
  "theme_office_business:q5": {
    "zh-CN": {
      situation: "下班准备离开公司时，向仍在加班的同事和领导打招呼，最标准规范的告别语是？",
      options: [
        "我先告辞了。大家辛苦了。（お先に失礼いたします。お疲れ様でした。）",
        "拜拜，明天见！",
        "多谢款待。",
        "我走啦！（いってきます — 用于离开家或外出办事）",
      ],
      explanation: "先行下班离开办公室时，规范礼貌用语始终是「お先に失礼いたします」。",
    },
    "zh-TW": {
      situation: "下班準備離開公司時，向仍在加班的同事和領導打招呼，最標準規範的告別語是？",
      options: [
        "我先告辭了。大家辛苦了。（お先に失礼いたします。お疲れ様でした。）",
        "拜拜，明天見！",
        "多謝款待。",
        "我出門了！（いってきます — 用於離開家或外出辦事）",
      ],
      explanation: "先行下班離開辦公室時，規範禮貌用語始終是「お先に失礼いたします」。",
    },
    en: {
      situation: "When leaving work while colleagues or bosses are still working overtime, what should you say?",
      options: [
        "I will be excusing myself first. Thank you for your hard work today. (お先に失礼いたします。お疲れ様でした。)",
        "Bye-bye, see ya tomorrow!",
        "Thank you for the meal.",
        "I'm going out! (Ittekimasu - used when leaving home/office temporarily)",
      ],
      explanation: "When leaving work before others, always say 「お先に失礼いたします」.",
    },
  },

  // Theme 4: Transport
  "theme_station_transport:q1": {
    "zh-CN": {
      situation: "在车站向站务员询问「山手线在几号月台乘车？」时，最自然准确的说法是？",
      options: [
        "不好意思，请问山手线乘车处在几号月台？（すみません、山手線の乗り場は何番ホームでしょうか？）",
        "山手线是开往哪里的？",
        "请帮我把车票打折。",
        "请把电车停下来。",
      ],
      explanation: "询问车站站台月台编号应使用「何番ホームでしょうか？」。",
    },
    "zh-TW": {
      situation: "在車站向站務員詢問「山手線在幾號月台乘車？」時，最自然準確的說法是？",
      options: [
        "不好意思，請問山手線乘車處在幾號月台？（すみません、山手線の乗り場は何番ホームでしょうか？）",
        "山手線是開往哪裡的？",
        "請幫我把車票打折。",
        "請把電車停下來。",
      ],
      explanation: "詢問車站站台月台號碼應使用「何番ホームでしょうか？」。",
    },
    en: {
      situation: "How do you ask station staff: 'Which platform is the Yamanote Line on?'",
      options: [
        "Excuse me, which platform does the Yamanote Line depart from? (すみません、山手線の乗り場は何番ホームでしょうか？)",
        "Where does the Yamanote line go?",
        "Please discount my ticket.",
        "Please stop the train.",
      ],
      explanation: "To ask for platform number, use 「何番ホームでしょうか？」.",
    },
  },
  "theme_station_transport:q2": {
    "zh-CN": {
      situation: "电车运行类型中的「各駅停車（各站停车）」与「特急（特急列车）」的核心区别是什么？",
      options: [
        "各站停车在沿途每一个站点都会停靠，特急只停靠少数主要枢纽大站。",
        "特急的速度更慢。",
        "各站停车是免费乘坐的。",
        "两者的运行速度完全相同。",
      ],
      explanation: "各駅停車逢站必停；特急则为大站特快列车。",
    },
    "zh-TW": {
      situation: "電車運行類型中的「各駅停車（各站停車）」與「特急（特急列車）」的核心區別是什麼？",
      options: [
        "各站停車在沿途每一個站點都會停靠，特急只停靠少數主要樞紐大站。",
        "特急的速度更慢。",
        "各站停車是免費乘坐的。",
        "兩者的運行速度完全相同。",
      ],
      explanation: "各駅停車每站皆停；特急則為大站特快列車。",
    },
    en: {
      situation: "What is the key difference between '各駅停車 (Local)' and '特急 (Limited Express)'?",
      options: [
        "Local trains stop at every single station, while Limited Express only stops at major stations.",
        "Limited Express is slower.",
        "Local trains are free of charge.",
        "Both travel at identical speeds.",
      ],
      explanation: "各駅停車 stops at every station; 特急 stops only at principal stations.",
    },
  },
  "theme_station_transport:q3": {
    "zh-CN": {
      situation: "交通IC卡余额不足导致通过检票口时亮起红灯并发出警报提示音，正确的解决办法是？",
      options: [
        "在检票闸机旁的精算机（补票/充值机）进行现金充值（チャージ）。",
        "直接从检票闸机栏杆翻过去。",
        "直接把交通卡扔掉。",
        "无视警报直接大步向前走。",
      ],
      explanation: "使用闸机内外的「精算機」(Seisanki) 进行补票或充值 (チャージ)。",
    },
    "zh-TW": {
      situation: "交通IC卡餘額不足導致通過檢票閘口時亮起紅燈並響起警報提示音，正確的解決辦法是？",
      options: [
        "在檢票閘門旁的精算機（補票/加值機）進行現金加值（チャージ）。",
        "直接從檢票閘門欄杆跳過去。",
        "直接把交通卡扔掉。",
        "無視警報直接大步向前走。",
      ],
      explanation: "使用閘門附近的「精算機」(Seisanki) 進行補票或加值 (チャージ)。",
    },
    en: {
      situation: "Your IC card balance is low and the ticket gate buzzes red. What should you do?",
      options: [
        "Top up (charge) cash at the fare adjustment machine (精算機).",
        "Jump over the turnstile gate.",
        "Throw away your card.",
        "Ignore the alarm and keep walking.",
      ],
      explanation: "Use the 精算機 (Seisanki) machine near gates to add funds (チャージ).",
    },
  },
  "theme_station_transport:q4": {
    "zh-CN": {
      situation: "在日本电车内部靠近「優先席（老弱病残孕专座）」区域时，应自觉遵守的公共礼仪是？",
      options: [
        "主动为年长者或孕妇让座，车厢拥挤时将手机调为静音模式或关机。",
        "大声开免提接打电话。",
        "把大件行李全部摊开放在座位上。",
        "用手机外放音响播放摇滚音乐。",
      ],
      explanation: "在日本电车优先席区域需主动礼让，并保持安静礼仪。",
    },
    "zh-TW": {
      situation: "在日本電車內部靠近「優先席（博愛座）」區域時，應自覺遵守的公共禮儀是？",
      options: [
        "主動為年長者或孕婦讓座，車廂擁擠時將手機調為靜音模式或關機。",
        "大聲開擴音接聽電話。",
        "把大件行李全部攤開放在座位上。",
        "用手機喇叭外放播放音樂。",
      ],
      explanation: "在日本電車優先席區域需主動禮讓，並維持安靜禮儀。",
    },
    en: {
      situation: "What is the proper etiquette near priority seating ('優先席') on Japanese trains?",
      options: [
        "Yield seats to elderly/pregnant riders, and switch phone to silent mode or turn off when crowded.",
        "Make loud voice calls on speakerphone.",
        "Spread luggage over empty seats.",
        "Play loud music on speakers.",
      ],
      explanation: "Priority seats require courteous yielding and silence etiquette.",
    },
  },
  "theme_station_transport:q5": {
    "zh-CN": {
      situation: "电车站公告屏上显示「振替輸送（换乘迂回运送）」，这代表处于何种运输状态？",
      options: [
        "因线路突发事故暂停运转，乘客可免费凭原车票迂回搭乘其他铁道公司的替代线路。",
        "正在举行全线免费乘车促销活动。",
        "末班车时间提前发车。",
        "新干线全面改为全车指定席。",
      ],
      explanation: "「振替輸送」指列车故障延误时，凭该车票免费转乘其他指定联运交通线路的应急保障机制。",
    },
    "zh-TW": {
      situation: "電車站公告螢幕上顯示「振替輸送（換乘迂迴運送）」，這代表處於何種運輸狀態？",
      options: [
        "因線路突發事故暫停運轉，乘客可免費憑原車票迂迴搭乘其他鐵道公司的替代線路。",
        "正在舉行全線免費乘車促銷活動。",
        "末班車時間提前發車。",
        "新幹線全面改為全車指定席。",
      ],
      explanation: "「振替輸送」指列車故障延誤時，憑原車票免費轉乘其他指定聯運交通線路的應急保障機制。",
    },
    en: {
      situation: "What does the station notice '振替輸送' (Alternative Transit) mean?",
      options: [
        "Due to accident/delays, passengers can use other railway company lines as detours without extra cost.",
        "All train lines are free for promotion.",
        "The last train departs earlier tonight.",
        "Shinkansen is now fully reserved seats.",
      ],
      explanation: "振替輸送 permits riders with tickets on delayed routes to transfer onto partner train networks.",
    },
  },

  // Theme 5: Konbini
  "theme_konbini_shopping:q1": {
    "zh-CN": {
      situation: "在便利店购买便当时，店员询问「温めますか？」(需要加热吗？)。您若想加热，应如何回答？",
      options: [
        "好的，麻烦帮我加热。（はい、お願いします。）",
        "不用，我不需要勺子。",
        "我有会员积分卡。",
        "我不需要塑料袋。",
      ],
      explanation: "「温めますか？」是询问是否需要在微波炉加热食品。",
    },
    "zh-TW": {
      situation: "在便利商店購買便當時，店員詢問「温めますか？」(需要加熱嗎？)。您若想加熱，應如何回答？",
      options: [
        "好的，麻煩幫我加熱。（はい、お願いします。）",
        "不用，我不需要湯匙。",
        "我有會員集點卡。",
        "我不需要塑膠袋。",
      ],
      explanation: "「温めますか？」是詢問是否需要在微波爐加熱食品。",
    },
    en: {
      situation: "When buying a bento at a konbini, staff asks: '温めますか？' (Would you like it heated?). How do you accept?",
      options: [
        "Yes, please. (はい、お願いします。)",
        "No, I don't need a spoon.",
        "I have a point card.",
        "I don't need a bag.",
      ],
      explanation: "「温めますか？」asks if you want food warmed in the microwave.",
    },
  },
  "theme_konbini_shopping:q2": {
    "zh-CN": {
      situation: "店员询问「レジ袋はご利用ですか？」(需要塑料袋吗？)，自己备有环保袋想婉拒时，怎么说最得体？",
      options: [
        "袋子就不用了，我自己有带。（袋は大丈夫です／結構です。持っています。）",
        "请给我3个塑料袋。",
        "塑料袋太贵了。",
        "请帮我加热。",
      ],
      explanation: "婉拒塑料袋常用礼貌表达「袋は結構です」或「大丈夫です」。",
    },
    "zh-TW": {
      situation: "店員詢問「レジ袋はご利用ですか？」(需要塑膠袋嗎？)，自己備有環保袋想婉拒時，怎麼說最得體？",
      options: [
        "袋子就不用了，我自己有帶。（袋は大丈夫です／結構です。持っています。）",
        "請給我3個塑膠袋。",
        "塑膠袋太貴了。",
        "請幫我加熱。",
      ],
      explanation: "婉拒塑膠袋常用禮貌表達「袋は結構です」或「大丈夫です」。",
    },
    en: {
      situation: "Staff asks: 'レジ袋はご利用ですか？' (Do you need a shopping bag?). How to decline politely since you brought your own?",
      options: [
        "I'm fine without a bag, I have one. (袋は大丈夫です / 結構です。持っています。)",
        "Give me 3 bags please.",
        "Shopping bags are too expensive.",
        "Please warm it up.",
      ],
      explanation: "Decline shopping bags politely with 「袋は結構です」 or 「大丈夫です」.",
    },
  },
  "theme_konbini_shopping:q3": {
    "zh-CN": {
      situation: "想要使用 Suica 或 PASMO 等交通IC卡无接触结账时，应该对收银员怎么表达？",
      options: [
        "说「交通系ICでお願いします」并在终端刷卡感应。",
        "说「我用现金付款」。",
        "直接把卡片摔在柜台上。",
        "什么也不说直接转身离开。",
      ],
      explanation: "Suica/Pasmo/ICOCA 在日本统一统称为「交通系IC」。",
    },
    "zh-TW": {
      situation: "想要使用 Suica 或 PASMO 等交通IC卡感應結帳時，應該對收銀員怎麼表達？",
      options: [
        "說「交通系ICでお願いします」並在終端感應刷卡。",
        "說「我用現金付款」。",
        "直接把卡片摔在櫃檯上。",
        "什麼也不說直接轉身離開。",
      ],
      explanation: "Suica/Pasmo/ICOCA 在日本統稱為「交通系IC」。",
    },
    en: {
      situation: "How do you tell the cashier you want to pay with Suica/Pasmo touch card?",
      options: [
        "Say '交通系ICでお願いします' (By Transit IC please) and tap your card on reader.",
        "Say 'I'll pay with cash'.",
        "Toss the card on the counter.",
        "Walk away without speaking.",
      ],
      explanation: "Suica and Pasmo belong to the '交通系IC' payment category.",
    },
  },
  "theme_konbini_shopping:q4": {
    "zh-CN": {
      situation: "在日本免税店或便利店办理退税「免税（Tax-Free）」手续时，必须出示的原件证件是？",
      options: [
        "有效护照原件（旅券／Passport）。",
        "日本驾照。",
        "中国学生证。",
        "名片。",
      ],
      explanation: "根据日本法例，办理免税手续必须现场出示本人护照原件（パスポート）。",
    },
    "zh-TW": {
      situation: "在日本免稅店或便利商店辦理退稅「免稅（Tax-Free）」手續時，必須出示的原件證件是？",
      options: [
        "有效護照原件（旅券／Passport）。",
        "日本駕照。",
        "學生證。",
        "名片。",
      ],
      explanation: "依據日本法例，辦理免稅手續必須現場出示本人護照原件（パスポート）。",
    },
    en: {
      situation: "What mandatory physical document must you present when processing Tax-Free purchases?",
      options: [
        "Original Passport (旅券 / Passport).",
        "Japanese driver's license.",
        "Student ID card.",
        "Business card.",
      ],
      explanation: "Tax-free shopping strictly requires presenting your physical Passport (パスポート).",
    },
  },
  "theme_konbini_shopping:q5": {
    "zh-CN": {
      situation: "日本食品包装上的「賞味期限」与「消費期限」有何关键区别？",
      options: [
        "賞味期限是指保证风味最佳的推荐赏味期；消費期限是安全食用截至期限，过期不可食用。",
        "两者完全是同一个意思。",
        "賞味期限的要求比消費期限更为严格严苛。",
        "消費期限是指衣服尺码。",
      ],
      explanation: "賞味期限 = Best Before (过此日期仍可能可食)；消費期限 = Expiration Date (过期有食品安全风险)。",
    },
    "zh-TW": {
      situation: "日本食品包裝上的「賞味期限」與「消費期限」有何關鍵區別？",
      options: [
        "賞味期限是指保證風味最佳的推薦賞味期；消費期限是安全食用截至期限，過期不可食用。",
        "兩者完全是同一個意思。",
        "賞味期限的要求比消費期限更為嚴格嚴苛。",
        "消費期限是指衣服尺碼。",
      ],
      explanation: "賞味期限 = Best Before (最佳賞味期)；消費期限 = Expiration Date (安全保存期限)。",
    },
    en: {
      situation: "What is the difference between '賞味期限' and '消費期限' on food packages in Japan?",
      options: [
        "賞味期限 is best flavor quality (Best Before); 消費期限 is strict safe consumption limit (Use By).",
        "Both mean exactly the same thing.",
        "賞味期限 is strictly more dangerous.",
        "消費期限 refers to clothing dimensions.",
      ],
      explanation: "賞味期限 = Best before flavor guarantee; 消費期限 = Strict expiration date.",
    },
  },

  // Theme 6: Kyoto Culture
  "theme_kyoto_culture:q1": {
    "zh-CN": {
      situation: "在神社参拜前，在手水舍（ちょうずや）净手的标准规矩顺序是什么？",
      options: [
        "用木勺舀一勺水，按顺序洗左手 → 洗右手 → 漱口 → 冲洗勺柄。",
        "跳进水池里游泳戏水。",
        "直接把嘴凑在木勺上喝水。",
        "把鞋脱了洗脚。",
      ],
      explanation: "手水舍标准步骤：先净左手，再净右手，倒水漱口，最后竖起木勺清洗勺柄。",
    },
    "zh-TW": {
      situation: "在神社參拜前，在手水舍（ちょうずや）淨手的標準規矩順序是什麼？",
      options: [
        "用木勺舀一勺水，按順序洗左手 → 洗右手 → 漱口 → 沖洗勺柄。",
        "跳進水池裡游泳戲水。",
        "直接把嘴湊在木勺上喝水。",
        "把鞋脫了洗腳。",
      ],
      explanation: "手水舍標準步驟：先淨左手，再淨右手，倒水漱口，最後豎起木勺清洗勺柄。",
    },
    en: {
      situation: "What is the proper purification sequence at the Chōzuya water pavilion before visiting a shrine?",
      options: [
        "Rinse left hand → rinse right hand → rinse mouth → tilt ladle to rinse the handle.",
        "Jump into the basin to swim.",
        "Drink directly from the ladle rim.",
        "Wash feet in the basin.",
      ],
      explanation: "Purification order: Left hand → Right hand → Mouth → Ladle handle.",
    },
  },
  "theme_kyoto_culture:q2": {
    "zh-CN": {
      situation: "在神社抽御神签（おみくじ）抽到了「大吉（だいきち）」，这代表什么运势？",
      options: [
        "代表运势极佳、最为吉利（Very good luck）。",
        "代表大凶运势（Bad luck）。",
        "代表运势普通平常。",
        "代表需要重新抽取。",
      ],
      explanation: "「大吉」在签文中代表最好最高级别的吉运。",
    },
    "zh-TW": {
      situation: "在神社抽御神籤（おみくじ）抽到了「大吉（だいきち）」，這代表什麼運勢？",
      options: [
        "代表運勢極佳、最為吉利（Very good luck）。",
        "代表大凶運勢（Bad luck）。",
        "代表運勢普通平常。",
        "代表需要重新抽取。",
      ],
      explanation: "「大吉」在籤文中代表最好最高級別的吉運。",
    },
    en: {
      situation: "You drew an Omikuji fortune and got '大吉 (Daikichi)'. What does this mean?",
      options: [
        "Outstanding good fortune (Very good luck).",
        "Great misfortune (Bad luck).",
        "Average ordinary state.",
        "Must redraw immediately.",
      ],
      explanation: "大吉 (Daikichi) signifies the highest level of good blessing.",
    },
  },
  "theme_kyoto_culture:q3": {
    "zh-CN": {
      situation: "进入寺院殿堂参观时看到提示「土足禁止（どそくきんし）」，代表什么规定？",
      options: [
        "必须脱下鞋子才能步入殿堂内。",
        "可以穿着鞋子直接走入。",
        "禁止拍照录像。",
        "禁止大声喧哗。",
      ],
      explanation: "「土足禁止」即禁止穿鞋入内，必须脱鞋置于鞋柜或装入袋中。",
    },
    "zh-TW": {
      situation: "進入寺院殿堂參觀時看到提示「土足禁止（どそくきんし）」，代表什麼規定？",
      options: [
        "必須脫下鞋子才能步入殿堂內。",
        "可以穿著鞋子直接走入。",
        "禁止拍照錄影。",
        "禁止大聲喧嘩。",
      ],
      explanation: "「土足禁止」即禁止穿鞋入內，必須脫鞋置於鞋櫃或裝入袋中。",
    },
    en: {
      situation: "What does the notice '土足禁止 (Dosoku kinshi)' at a temple hall indicate?",
      options: [
        "You must take off your outdoor footwear before stepping inside.",
        "You can enter wearing shoes.",
        "Photography is prohibited.",
        "Speaking loudly is forbidden.",
      ],
      explanation: "土足禁止 means outdoor shoes are forbidden inside.",
    },
  },
  "theme_kyoto_culture:q4": {
    "zh-CN": {
      situation: "在神社正殿参拜的经典礼仪「二礼二拍手一礼（两拜两拍手一拜）」的具体步骤是？",
      options: [
        "深深鞠躬2次 → 拍手2次 → 最后深鞠躬1次。",
        "拍手2次 → 鞠躬2次。",
        "唱一首祈愿歌曲。",
        "深鞠躬1次 → 拍手5次。",
      ],
      explanation: "神社标准参拜动作：二礼 (90度深躬两次) → 二拍手 (合掌错位拍手两次) → 一礼 (深鞠躬一次)。",
    },
    "zh-TW": {
      situation: "在神社正殿參拜的經典禮儀「二禮二拍手一禮（兩拜兩拍手一拜）」的具體步驟是？",
      options: [
        "深深鞠躬2次 → 拍手2次 → 最後深鞠躬1次。",
        "拍手2次 → 鞠躬2次。",
        "唱一首祈願歌曲。",
        "深鞠躬1次 → 拍手5次。",
      ],
      explanation: "神社標準參拜動作：二禮 (90度深躬兩次) → 二拍手 (合掌錯位拍手兩次) → 一禮 (深鞠躬一次)。",
    },
    en: {
      situation: "What is the procedure for '二礼二拍手一礼' (2 bows, 2 claps, 1 bow) at a Shinto shrine?",
      options: [
        "Bow deeply twice → Clap hands twice → Bow deeply once.",
        "Clap twice → Bow twice.",
        "Sing a prayer melody.",
        "Bow once → Clap five times.",
      ],
      explanation: "Two deep bows (二礼) → Two claps (二拍手) → One final bow (一礼).",
    },
  },
  "theme_kyoto_culture:q5": {
    "zh-CN": {
      situation: "在京都祇园花见小路等街头遇到赶路的舞妓（まいこ）或艺妓时，正确的文明礼仪是？",
      options: [
        "不要拉拽和服或阻拦去路，在安全距离静静目送欣赏（严禁未经许可贴身围堵拍摄）。",
        "冲上前去强行拉扯合影自拍。",
        "伸手拉住舞妓的和服衣袖。",
        "大声喊叫追赶。",
      ],
      explanation: "京都已立法保护艺妓舞妓个人隐私与工作通行，严禁拦路追拍与触碰和服。",
    },
    "zh-TW": {
      situation: "在京都祇園花見小路等街頭遇到趕路的舞妓（まいこ）或藝妓時，正確的文明禮儀是？",
      options: [
        "不要拉拽和服或阻攔去路，在安全距離靜靜目送欣賞（嚴禁未經許可貼身圍堵拍攝）。",
        "衝上前去強行拉扯合影自拍。",
        "伸手拉住舞妓的和服衣袖。",
        "大聲喊叫追趕。",
      ],
      explanation: "京都已立法保護藝妓舞妓個人隱私與工作通行，嚴禁攔路追拍與觸碰和服。",
    },
    en: {
      situation: "What is the respectful etiquette when encountering a Maiko or Geiko on Kyoto streets?",
      options: [
        "Do not block their path or touch kimono; observe quietly from a respectful distance (no unpermitted close photography).",
        "Chase them for a selfie.",
        "Pull their kimono sleeve.",
        "Shout loudly to stop them.",
      ],
      explanation: "Respect Maiko privacy and cultural etiquette without touching or obstructing streets.",
    },
  },

  // Theme 7: Pharmacy
  "theme_pharmacy_health:q1": {
    "zh-CN": {
      situation: "在药妆店向药剂师表达「我头痛，请给我拿一些头痛药」，最地道的日语是？",
      options: [
        "我头很痛，请问可以给我头痛药吗？（頭が痛いので、頭痛薬をいただけますか？）",
        "我肚子很痛。",
        "请给我眼药水。",
        "创口贴在什么地方？",
      ],
      explanation: "「頭痛薬（ずつうやく）」专门指治疗头痛的药品。",
    },
    "zh-TW": {
      situation: "在藥妝店向藥劑師表達「我頭痛，請給我拿一些頭痛藥」，最地道的日語是？",
      options: [
        "我頭很痛，請問可以給我頭痛藥嗎？（頭が痛いので、頭痛薬をいただけますか？）",
        "我肚子很痛。",
        "請給我眼藥水。",
        "OK繃在什麼地方？",
      ],
      explanation: "「頭痛薬（ずつうやく）」專門指治療頭痛的藥品。",
    },
    en: {
      situation: "How do you tell a pharmacist in Japanese: 'I have a headache, please give me headache medicine'?",
      options: [
        "My head hurts, could I please get headache medicine? (頭が痛いので、頭痛薬をいただけますか？)",
        "My stomach hurts.",
        "Please give me eye drops.",
        "Where are the band-aids?",
      ],
      explanation: "「頭痛薬 (Zutsūyaku)」specifically means headache medicine.",
    },
  },
  "theme_pharmacy_health:q2": {
    "zh-CN": {
      situation: "药品说明书上写有「食後（しょくご）に服用」，正确的服药时间点是什么时候？",
      options: [
        "吃完饭后（通常在饭后30分钟以内）。",
        "吃正餐之前。",
        "刚上床入睡前一刻。",
        "做完剧烈运动之后。",
      ],
      explanation: "「食後」明确指用餐完毕后约30分钟内服药。",
    },
    "zh-TW": {
      situation: "藥品說明書上寫有「食後（しょくご）に服用」，正確的服藥時間點是什麼時候？",
      options: [
        "吃完飯後（通常在飯後30分鐘以內）。",
        "吃正餐之前。",
        "剛上床入睡前一刻。",
        "做完劇烈運動之後。",
      ],
      explanation: "「食後」明確指用餐完畢後約30分鐘內服藥。",
    },
    en: {
      situation: "When should you take medicine marked with '食後に服用'?",
      options: [
        "After finishing a meal (usually within 30 minutes).",
        "Before eating meals.",
        "Right before sleeping.",
        "After heavy exercise.",
      ],
      explanation: "食後 (Shokugo) means after eating meals.",
    },
  },
  "theme_pharmacy_health:q3": {
    "zh-CN": {
      situation: "药剂师询问「アレルギーはありますか？」(您对药物或食物有过敏反应吗？)。您应该如何得体回答？",
      options: [
        "没有，我没有特别的过敏（或者：我对鸡蛋过敏）。（いいえ、特にありません／または、卵アレルギーがあります。）",
        "是的，我感冒了。",
        "我体温有38度。",
        "我有健康保险卡。",
      ],
      explanation: "清楚准确地说明具体过敏源，如无过敏则回答「特にありません」。",
    },
    "zh-TW": {
      situation: "藥劑師詢問「アレルギーはありますか？」(您對藥物或食物有過敏反應嗎？)。您應該如何得體回答？",
      options: [
        "沒有，我沒有特別的過敏（或者：我對雞蛋過敏）。（いいえ、特にありません／または、卵アレルギーがあります。）",
        "是的，我感冒了。",
        "我體溫有38度。",
        "我有健保卡。",
      ],
      explanation: "清楚準確地說明具體過敏源，如無過敏則回答「特にありません」。",
    },
    en: {
      situation: "The pharmacist asks: 'アレルギーはありますか？' (Do you have any allergies?). How do you respond?",
      options: [
        "No, nothing in particular (or: I have an egg allergy). (いいえ、特にありません / 卵アレルギーがあります。)",
        "Yes, I caught a cold.",
        "I have a 38-degree fever.",
        "I have health insurance.",
      ],
      explanation: "Answer whether you have any specific allergies or reply with 「特にありません」.",
    },
  },
  "theme_pharmacy_health:q4": {
    "zh-CN": {
      situation: "药盒包装上注明的服药规则「1日3回、1回2錠（じょう）」，正确的服用方式是？",
      options: [
        "每天服用3次，每次吃2片（粒）。",
        "每3天总共吃2片。",
        "一次性把6片药全部吃下去。",
        "每天服用2次，每次吃3片。",
      ],
      explanation: "1日3回 = 每天3次；1回2錠 = 每次2片。",
    },
    "zh-TW": {
      situation: "藥盒包裝上註明的服藥規則「1日3回、1回2錠（じょう）」，正確的服用方式是？",
      options: [
        "每天服用3次，每次吃2片（粒）。",
        "每3天總共吃2片。",
        "一次性把6片藥全部吃下去。",
        "每天服用2次，每次吃3片。",
      ],
      explanation: "1日3回 = 每天3次；1回2錠 = 每次2片。",
    },
    en: {
      situation: "What is the correct dosage indicated by '1日3回、1回2錠'?",
      options: [
        "3 times per day, 2 tablets each time.",
        "2 tablets every 3 days.",
        "Take all 6 tablets at once.",
        "2 times per day, 3 tablets each time.",
      ],
      explanation: "1日3回 = 3 times a day; 1回2錠 = 2 pills per dose.",
    },
  },
  "theme_pharmacy_health:q5": {
    "zh-CN": {
      situation: "在日本，凭医生开具的处方单（処方箋／しょほうせん）取调剂配药的地方是？",
      options: [
        "专业调剂药局（調剤薬局／ちょうざいやっきょく）。",
        "超市收银台。",
        "邮政局。",
        "交番（派出所警岗）。",
      ],
      explanation: "医院诊所开具的处方单需要前往拥有调剂资质的「調剤薬局」领取专属配药。",
    },
    "zh-TW": {
      situation: "在日本，憑醫生開具的處方單（処方箋／しょほうせん）取調劑配藥的地方是？",
      options: [
        "專業調劑藥局（調剤薬局／ちょうざいやっきょく）。",
        "超市收銀台。",
        "郵政局。",
        "交番（派出所警局）。",
      ],
      explanation: "醫院診所開具的處方單需要前往擁有調劑資質的「調剤薬局」領取專屬配藥。",
    },
    en: {
      situation: "Where do you bring a doctor's prescription (処方箋) to pick up prescription medicine?",
      options: [
        "Dispensing pharmacy (調剤薬局).",
        "Supermarket cashier.",
        "Post office.",
        "Police box (Kōban).",
      ],
      explanation: "Prescriptions (処方箋) must be brought to a certified dispensing pharmacy (調剤薬局).",
    },
  },
};

/**
 * Returns localized theme data for the dungeon.
 */
export function getLocalizedDungeonTheme(
  theme: {
    id: string;
    title: string;
    japaneseTitle: string;
    description: string;
    icon: string;
    bgGradient: string;
  },
  lang: string
) {
  const loc = THEME_LOCALIZATIONS[theme.id]?.[lang] ||
              THEME_LOCALIZATIONS[theme.id]?.["zh-CN"] ||
              THEME_LOCALIZATIONS[theme.id]?.en;

  if (!loc || lang === "vi") return theme;

  return {
    ...theme,
    title: loc.title,
    description: loc.description,
  };
}

/**
 * Returns localized questions for the dungeon.
 */
export function getLocalizedDungeonQuestions(
  themeId: string,
  questions: Array<{
    id: string;
    situationJa: string;
    situationVi: string;
    furigana: string;
    options: Array<{ textJa: string; textVi: string }>;
    correctIndex: number;
    explanation: string;
  }>,
  lang: string
) {
  if (lang === "vi") return questions;

  return questions.map((q) => {
    const key = `${themeId}:${q.id}`;
    const loc = QUESTION_LOCALIZATIONS[key]?.[lang] ||
                QUESTION_LOCALIZATIONS[key]?.["zh-CN"] ||
                QUESTION_LOCALIZATIONS[key]?.en;

    if (!loc) return q;

    return {
      ...q,
      situationVi: loc.situation,
      options: q.options.map((opt, optIdx) => ({
        textJa: opt.textJa,
        textVi: loc.options[optIdx] ?? opt.textVi,
      })),
      explanation: loc.explanation,
    };
  });
}
