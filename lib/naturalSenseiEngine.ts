// Natural Japanese Conversational Dialogue Engine (Context-Aware Kaiwa Simulator & Learning Assistant)
// Speaks authentic, warm Japanese with personalized learning recommendations, mistakes remediation, and multi-language translations.

import type { NativeLanguage } from "@/lib/languages";
import type { UserMistakeSummary } from "@/lib/learningMistakes";

export interface DialogueContext {
  scenarioId?: string;
  userMessage: string;
  userProgress?: {
    userLevel?: string;
    level?: number;
    totalXP?: number;
    currentStreak?: number;
    completedLessonsCount?: number;
    totalLessonsInLevel?: number;
    dueReviewCount?: number;
    accuracyPercent?: number;
    stats?: {
      completedLessonsCount?: number;
      totalLessonsInLevel?: number;
      dueReviewCount?: number;
      reviewAccuracy?: number | null;
    };
  } | null;
  mistakes?: UserMistakeSummary | null;
  nativeLanguage?: NativeLanguage;
}

const LANGUAGE_NAMES: Record<NativeLanguage, string> = {
  vi: "Tiếng Việt",
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  id: "Bahasa Indonesia",
  th: "ภาษาไทย",
  ru: "Русский",
  pt: "Português",
};

export function getLanguageName(lang?: NativeLanguage): string {
  if (!lang) return "Tiếng Việt";
  return LANGUAGE_NAMES[lang] || "Tiếng Việt";
}

export function generateNaturalJapaneseResponse({
  scenarioId = "free_kaiwa",
  userMessage,
  userProgress,
  mistakes,
  nativeLanguage = "vi",
}: DialogueContext): string {
  const msg = userMessage.trim();
  const isVi = nativeLanguage === "vi";
  const isZh = nativeLanguage === "zh-CN" || nativeLanguage === "zh-TW";

  // 0. MISTAKES & WEAK POINTS REMEDIATION
  if (
    /(?:lỗi sai|sửa sai|sửa lỗi|làm sai|chỗ sai|chữa lỗi|sai sót|điểm yếu|khắc phục|sai chỗ nào|hay sai|tại sao sai|mistake|wrong|weak point|weakness|error|fix|错题|错在哪里|弱项|做错|틀린|오답|erro|fehle)/i.test(
      msg
    ) ||
    scenarioId === "mistakes_remedy"
  ) {
    if (mistakes && mistakes.totalMistakesCount > 0) {
      const vocabList = mistakes.weakVocab
        .slice(0, 3)
        .map(
          (v) =>
            `• **${v.word}** (${v.kana}) [${v.romaji}]: ${
              isVi
                ? `nghĩa là "${v.meaning}"`
                : isZh
                ? `释义为「${v.meaning}」`
                : `means "${v.meaning}"`
            }`
        )
        .join("\n");

      const failedEx = mistakes.failedExercises[0];
      const exSample = failedEx
        ? isVi
          ? `\n\n📌 **Câu bài tập bạn vừa làm sai gần đây:**\n- *Câu hỏi:* "${failedEx.question}"\n- *Bạn đã chọn:* ~~"${failedEx.userAnswer}"~~ ❌\n- *Đáp án chuẩn xác:* **"${failedEx.correctAnswer}"** ✔️\n*(Sensei giải thích: Hãy chú ý cấu trúc và ngữ cảnh của câu để không bị nhầm lẫn nhé!)*`
          : isZh
          ? `\n\n📌 **近期易错练习题回顾：**\n- *题目：* "${failedEx.question}"\n- *你的选择：* ~~"${failedEx.userAnswer}"~~ ❌\n- *正确答案：* **"${failedEx.correctAnswer}"** ✔️\n*(Sensei 解析：注意句式接续与语境呼应，避免混淆哦！)*`
          : `\n\n📌 **Recent exercise with a mistake:**\n- *Question:* "${failedEx.question}"\n- *Your answer:* ~~"${failedEx.userAnswer}"~~ ❌\n- *Correct answer:* **"${failedEx.correctAnswer}"** ✔️\n*(Sensei explanation: Pay close attention to sentence structure and context!)*`
        : "";

      if (isVi) {
        return `Sensei đã rà soát các bài tập và thẻ ôn gần đây của bạn nè: 🌸\n\n${
          vocabList ? `**Các từ vựng bạn hay nhầm hoặc quên:**\n${vocabList}\n` : ""
        }${exSample}\n\n**Mẹo khắc phục từ Sensei:**\nKhi gặp từ khó, hãy đặt câu với từ đó trong ngữ cảnh đời thường để nhớ lâu hơn! Bạn có muốn cùng Sensei làm 1 câu đố nhỏ để ôn lại ngay các điểm trên không? Hãy trả lời Sensei nhé! ✨`;
      }

      if (isZh) {
        return `Sensei 帮你复查了最近的练习记录与错题库：🌸\n\n${
          vocabList ? `**近期易混淆或遗忘的高频词汇：**\n${vocabList}\n` : ""
        }${exSample}\n\n**Sensei 的巩固建议：**\n遇到容易遗忘的词句，可以尝试将其代入日常生活场景造句，记忆会深刻得多！想和 Sensei 一起来做一道小练习加深印象吗？随时回复我哦！✨`;
      }

      return `Sensei noticed a few weak spots in your recent reviews: 🌸\n\n${
        vocabList ? `**Words that need reinforcement:**\n${vocabList}\n` : ""
      }${exSample}\n\n**Sensei's Tip:** Repetition right before you forget is the key! Let's try 1 quick practice: What is the meaning or reading of one of these words? Reply right here and I'll grade it for you!`;
    }

    if (isVi) {
      return `Tin vui đây! Sensei đã kiểm tra và thấy **bạn không có lỗi sai nào chưa xử lý**! ✨ Tỷ lệ làm bài của bạn đang rất chuẩn xác. Hãy tiếp tục giữ vững phong độ bằng bài học tiếp theo trên [Lộ trình](/app/path) nhé!`;
    }
    if (isZh) {
      return `太棒了！Sensei 检查了你的学习记录，发现**最近没有未掌握的错题或薄弱卡片**！✨ 你的做题正确率非常扎实。请继续在[个人学习路径](/app/path)开启新一课吧！`;
    }
    return `Awesome news! Sensei checked your records and found **no recent critical mistakes or weak cards**! ✨ Your accuracy is solid. Keep moving forward on your [Learning Path](/app/path)!`;
  }

  // 1. PROGRESS, STUDY ADVICE & TUTOR ASSISTANCE
  if (
    /(?:hôm nay học gì|học gì|tiến độ|tiến trình|srs|thẻ ôn|lời khuyên|gợi ý|thống kê|kế hoạch|bắt đầu|what should i study|study advice|my progress|review cards|今天学什么|学什么|进度|复习卡片|学习建议|学习规划|오늘 뭐 공부해)/i.test(
      msg
    )
  ) {
    const level = userProgress?.userLevel || "N5";
    const pLevel = userProgress?.level || 1;
    const xp = userProgress?.totalXP ?? 0;
    const streak = userProgress?.currentStreak ?? 0;
    const due = userProgress?.dueReviewCount ?? userProgress?.stats?.dueReviewCount ?? 0;
    const completed = userProgress?.completedLessonsCount ?? userProgress?.stats?.completedLessonsCount ?? 0;
    const totalLessons = userProgress?.totalLessonsInLevel ?? userProgress?.stats?.totalLessonsInLevel ?? 50;

    if (isVi) {
      return `Konnichiwa! Sensei đã kiểm tra hồ sơ học tập của bạn rồi nè: 🌸✨
- **Cấp độ JLPT:** Trình độ ${level} (Level ${pLevel})
- **Điểm tích lũy:** ${xp.toLocaleString("vi-VN")} XP | **Chuỗi Streak:** 🔥 ${streak} ngày
- **Bài học giáo trình:** Đã hoàn thành ${completed}/${totalLessons} bài
- **Ôn tập SRS:** ${due > 0 ? `⏰ Đang có **${due} thẻ từ vựng** đến hạn ôn tập hôm nay!` : "✨ Bạn đã ôn tập sạch sẽ các thẻ hôm nay rồi!"}

**Lời khuyên học tập từ Sensei hôm nay:**
${
  due > 0
    ? `1. Dành ngay 5-10 phút vào mục [Ôn tập Flashcard SRS](/app/review) để giải quyết ${due} thẻ đến hạn, giúp từ vựng ghi nhớ sâu vào tiềm thức!\n2. Học tiếp 1 bài học mới trong [Lộ trình](/app/path).\n3. Nếu có lỗi sai hay mẫu câu nào chưa hiểu, hãy bấm nút "Khắc phục lỗi sai" hoặc gõ câu hỏi để Sensei phân tích cặn kẽ cho bạn nhé!`
    : `1. Không có thẻ từ vựng nào bị nợ—tinh thần học của bạn quá tuyệt vời! Hãy duy trì chuỗi Streak bằng cách học 1 bài mới trong [Lộ trình](/app/path).\n2. Luyện phản xạ đối thoại tiếng Nhật ngay tại đây cùng Sensei nhé!`
}
*(一緒に頑張りましょう！ Hãy cùng nhau cố gắng nhé! 🎌)*`;
    }

    if (isZh) {
      return `Konnichiwa！Sensei 已经为你调取了学习档案：🌸✨
- **JLPT 等级：** 当前 ${level}（Level ${pLevel}）
- **累计经验：** ${xp.toLocaleString()} XP | **连续打卡：** 🔥 ${streak} 天
- **大纲课程进度：** 已完成 ${completed}/${totalLessons} 课
- **SRS 间隔复习：** ${due > 0 ? `⏰ 今天有 **${due} 张单词卡片** 到期需要复习！` : "✨ 今天的复习卡片已经全部清空！"}

**Sensei 的今日学习建议：**
${
  due > 0
    ? `1. 建议先花 5-10 分钟在 [SRS 间隔重复复习](/app/review) 清空这 ${due} 张卡片，在记忆临界点强化认知！\n2. 接着前往 [个人学习路径](/app/path) 攻克下一课新知识。\n3. 如果对语法点有疑问或想练习会话，随时回复我，Sensei 为你详细解答！`
    : `1. 当前没有积压的复习卡片，你的自律习惯非常棒！在 [个人学习路径](/app/path) 开启新课程来保持连续打卡吧。\n2. 也可以直接用日语回复我，在这里练习口语和打字反应！`
}
*(一緒に頑張りましょう！ 我们一起加油吧！ 🎌)*`;
    }

    return `Konnichiwa! Sensei has reviewed your Nihon Quest learning profile: 🌸✨
- **Current JLPT:** Level ${level} (Tier ${pLevel})
- **Total XP:** ${xp} XP | **Daily Streak:** 🔥 ${streak} days
- **Curriculum Lessons:** ${completed}/${totalLessons} completed
- **SRS Flashcards:** ${due > 0 ? `⏰ **${due} cards** due for review today!` : "✨ All caught up for today!"}

**Sensei's Personal Recommendation:**
${
  due > 0
    ? `1. First, spend 5-10 minutes on [Spaced Repetition Review](/app/review) to clear your ${due} due cards so they lock into long-term memory!\n2. Next, tackle the next lesson on your [Learning Path](/app/path)!\n3. Ask me if you want me to explain any grammar point, check mistakes, or test your Japanese.`
    : `1. You have zero review backlog—fantastic discipline! Keep up the momentum with a new lesson in your [Learning Path](/app/path).\n2. Practice conversational fluency with me right here by replying in Japanese!`
}
*(Keep going! Ganbatte kudasai! 🎌)*`;
  }

  // 2. GREETINGS & TIME OF DAY
  if (/^(?:こんばんは|こんばんわ|konbanwa|chào buổi tối|good evening|晚上好|안녕)/i.test(msg)) {
    if (scenarioId === "business_horenso") {
      return isVi
        ? "こんばんは！遅くまでお疲れ様です。今日の業務の進捗状況はどうですか？何か報告や相談があればいつでもどうぞ！💼\n\n*(Chào buổi tối! Làm việc đến muộn thế này vất vả cho bạn quá. Tiến độ công việc hôm nay thế nào rồi? Nếu có báo cáo hay thảo luận gì bạn cứ nói nhé!)*"
        : isZh
        ? "こんばんは！遅くまでお疲れ様です。今日の業務の進捗状況はどうですか？何か報告や相談があればいつでもどうぞ！💼\n\n*(晚上好！工作到这么晚辛苦了。今天的业务进度如何？若有汇报、联络或商谈，请随时告诉我！)*"
        : "こんばんは！遅くまでお疲れ様です。今日の業務の進捗状況はどうですか？何か報告や相談があればいつでもどうぞ！💼\n\n*(Good evening! Thank you for working late. How is today's progress? Feel free to report or consult anytime!)*";
    }
    if (scenarioId === "casual_friends") {
      return isVi
        ? "こんばんは〜！今日も一日お疲れ！夜遅くまで日本語の勉強えらいね〜。今日はどんな一日だった？✨\n\n*(Chào buổi tối nè~! Hôm nay vất vả cả ngày rồi nhỉ! Đêm muộn thế này mà vẫn chăm học tiếng Nhật, đỉnh thật đấy. Hôm nay ngày của cậu thế nào?)*"
        : isZh
        ? "こんばんは〜！今日も一日お疲れ！夜遅くまで日本語の勉強えらいね〜。今日はどんな一日だった？✨\n\n*(晚上好呀～！今天一天辛苦啦！这么晚还在用功学日语真了不起呢。今天过得怎么样？)*"
        : "こんばんは〜！今日も一日お疲れ！夜遅くまで日本語の勉強えらいね〜。今日はどんな一日だった？✨\n\n*(Good evening~! Great job today! Studying Japanese late at night is really impressive. How was your day?)*";
    }
    return isVi
      ? "こんばんは！今日も一日お疲れ様でした。夜の日本語練習、素晴らしいですね！🌙\n今日はどんな一日でしたか？何か楽しいことはありましたか？🌸\n\n*(Chào buổi tối! Hôm nay bạn đã vất vả cả ngày rồi. Luyện tập tiếng Nhật vào buổi tối thật tuyệt vời! Hôm nay ngày của bạn thế nào? Có chuyện gì vui không?)*"
      : isZh
      ? "こんばんは！今日も一日お疲れ様でした。夜の日本語練習、素晴らしいですね！🌙\n今日はどんな一日でしたか？何か楽しいことはありましたか？🌸\n\n*(晚上好！今天一天辛苦啦。在夜晚静心练习日语真棒！今天过得如何？有什么开心的事情吗？)*"
      : "こんばんは！今日も一日お疲れ様でした。夜の日本語練習、素晴らしいですね！🌙\n今日はどんな一日でしたか？何か楽しいことはありましたか？🌸\n\n*(Good evening! Great effort today. Practicing Japanese in the evening is wonderful! How was your day? Anything fun happen?)*";
  }

  if (/^(?:こんにちは|こんにちわ|konnichiwa|chào|xin chào|hello|hi|你好|您好)/i.test(msg)) {
    if (scenarioId === "casual_friends") {
      return isVi
        ? "やっほー！こんにちは！今日も会えて嬉しいよ〜。最近なんか面白いことあった？☕\n\n*(Hé lô! Chào cậu nhé! Hôm nay lại được gặp cậu vui quá. Dạo gần đây có chuyện gì vui hay ho không?)*"
        : isZh
        ? "やっほー！こんにちは！今日も会えて嬉しいよ〜。最近なんか面白いことあった？☕\n\n*(哈喽！你好呀！今天又能见到你真开心。最近有什么好玩的事情吗？)*"
        : "やっほー！こんにちは！今日も会えて嬉しいよ〜。最近なんか面白いことあった？☕\n\n*(Yahoo! Hello! So happy to see you today. Anything interesting lately?)*";
    }
    if (scenarioId === "business_horenso") {
      return isVi
        ? "こんにちは！お疲れ様です。お忙しいところ恐れ入りますが、本日の進捗についてお聞かせいただけますでしょうか？💼\n\n*(Xin chào bạn! Hôm nay bạn vất vả rồi. Xin phép làm phiền lúc bạn đang bận, bạn có thể chia sẻ về tiến độ công việc hôm nay được không ạ?)*"
        : isZh
        ? "こんにちは！お疲れ様です。お忙しいところ恐れ入りますが、本日の進捗についてお聞かせいただけますでしょうか？💼\n\n*(您好！辛苦了。百忙之中打扰，请问方便告知一下今天的业务进展吗？)*"
        : "こんにちは！お疲れ様です。お忙しいところ恐れ入りますが、本日の進捗についてお聞かせいただけますでしょうか？💼\n\n*(Hello! Thank you for your hard work. May I ask about today's progress when you have a moment?)*";
    }
    return isVi
      ? "こんにちは！お会いできて嬉しいです。今日も一緒に楽しく日本語を話しましょう！🌸\n今、何をしていますか？\n\n*(Xin chào bạn! Rất vui được gặp bạn. Hôm nay chúng ta hãy cùng nhau trò chuyện tiếng Nhật thật vui nhé! Bây giờ bạn đang làm gì đấy?)*"
      : isZh
      ? "こんにちは！お会いできて嬉しいです。今日も一緒に楽しく日本語を話しましょう！🌸\n今、何をしていますか？\n\n*(你好！很高兴遇见你。今天也和我一起开心地用日语交流吧！你现在正在做什么呢？)*"
      : "こんにちは！お会いできて嬉しいです。今日も一緒に楽しく日本語を話しましょう！🌸\n今、何をしていますか？\n\n*(Hello! Glad to see you. Let's enjoy practicing Japanese together today! What are you doing right now?)*";
  }

  if (/^(?:おはよう|おはようございます|ohayou|chào buổi sáng|good morning|早上好|早安)/i.test(msg)) {
    return isVi
      ? "おはようございます！🌅 朝から日本語の練習を始めるなんて、本当に素晴らしい向上心ですね！今日もいい一日にしましょうね。朝ごはんはもう食べましたか？\n\n*(Chào buổi sáng! Bắt đầu luyện tiếng Nhật ngay từ sáng sớm thế này, tinh thần học tập của bạn thật tuyệt vời! Chúc bạn một ngày tốt lành nhé. Bạn đã ăn sáng chưa?)*"
      : isZh
      ? "おはようございます！🌅 朝から日本語の練習を始めるなんて、本当に素晴らしい向上心ですね！今日もいい一日にしましょうね。朝ごはんはもう食べましたか？\n\n*(早上好！一大早就开始练习日语，求知若渴的精神太让人钦佩了！今天也要元气满满度过哦。吃过早餐了吗？)*"
      : "おはようございます！🌅 朝から日本語の練習を始めるなんて、本当に素晴らしい向上心ですね！今日もいい一日にしましょうね。朝ごはんはもう食べましたか？\n\n*(Good morning! Starting Japanese practice early in the morning shows such great dedication! Have a great day. Have you eaten breakfast yet?)*";
  }

  if (/(?:おやすみ|お休みなさい|oyasumi|ngủ ngon|đi ngủ|good night|晚安)/i.test(msg)) {
    return isVi
      ? "今日もたくさん練習しましたね！本当にお疲れ様でした。ゆっくり休んで、いい夢を見てくださいね。おやすみなさい〜！⭐💤\n\n*(Hôm nay bạn đã luyện tập rất nhiều rồi! Vất vả cho bạn rồi. Hãy nghỉ ngơi thật thoải mái và có những giấc mơ đẹp nhé. Chúc bạn ngủ ngon~!)*"
      : isZh
      ? "今日もたくさん練習しましたね！本当にお疲れ様でした。ゆっくり休んで、いい夢を見てくださいね。おやすみなさい〜！⭐💤\n\n*(今天完成了很充实的练习，真的辛苦啦！好好放松休息，做个好梦吧。晚安〜！)*"
      : "今日もたくさん練習しましたね！本当にお疲れ様でした。ゆっくり休んで、いい夢を見てくださいね。おやすみなさい〜！⭐💤\n\n*(You practiced so much today! Rest well and have sweet dreams. Good night~!)*";
  }

  // 3. GRATITUDE & POLITE SOCIAL RESPONSES
  if (/(?:ありがとう|感謝|cảm ơn|thank|谢谢|多谢)/i.test(msg)) {
    return isVi
      ? "どういたしまして！こちらこそ、いつも一生懸命練習してくれて嬉しいです。😊 他にも気になるフレーズや話したいことがあれば、何でも気軽に言ってくださいね！🌸\n\n*(Không có chi! Sensei mới là người phải cảm ơn vì bạn luôn chăm chỉ luyện tập. Nếu còn cụm từ nào thắc mắc hay muốn trò chuyện đề tài gì, cứ tự nhiên nói nhé!)*"
      : isZh
      ? "どういたしまして！こちらこそ、いつも一生懸命練習してくれて嬉しいです。😊 他にも気になるフレーズや話したいことがあれば、何でも気軽に言ってくださいね！🌸\n\n*(不客气！我也非常感谢你每次都如此全情投入地练习。如果有其他想了解的句型或者话题，随时随地告诉我哦！)*"
      : "どういたしまして！こちらこそ、いつも一生懸命練習してくれて嬉しいです。😊 他にも気になるフレーズや話したいことがあれば、何でも気軽に言ってくださいね！🌸\n\n*(You're welcome! I'm glad you're always practicing so hard. Feel free to ask about any other phrases or topics!)*";
  }

  if (/(?:お疲れ様|おつかれ|vất vả rồi|辛苦了)/i.test(msg)) {
    return isVi
      ? "お疲れ様です！優しいお言葉をありがとうございます。あなたも毎日のお仕事や勉強、本当にお疲れ様です！お茶でも飲んで一息つきましょうね。🍵\n\n*(Bạn cũng vất vả rồi! Cảm ơn lời hỏi thăm ấm áp của bạn. Bạn học tập và làm việc mỗi ngày cũng vất vả lắm rồi! Hãy uống chút trà nghỉ ngơi nhé.)*"
      : isZh
      ? "お疲れ様です！優しいお言葉をありがとうございます。あなたも毎日のお仕事や勉強、本当にお疲れ様です！お茶でも飲んで一息つきましょうね。🍵\n\n*(辛苦啦！非常感谢你贴心温暖的问候。你在日常工作与学业中也辛苦啦！喝杯热茶稍作小憩吧。)*"
      : "お疲れ様です！優しいお言葉をありがとうございます。あなたも毎日のお仕事や勉強、本当にお疲れ様です！お茶でも飲んで一息つきましょうね。🍵\n\n*(Thank you for your kind words! You work so hard every day too. Have some tea and take a nice breath.)*";
  }

  // 4. EMOTIONS & PHYSICAL STATES
  if (/(?:疲れた|つかれた|mệt|mệt mỏi|tired|累|好累)/i.test(msg)) {
    return isVi
      ? "お疲れ様です！今日はいろいろ大変だったんですね… 無理をしないでくださいね。少し肩の力を抜いて、リラックスしながらお話ししましょう。今日は何が一番大変でしたか？🍀\n\n*(Vất vả cho bạn quá! Hôm nay chắc có nhiều việc mệt mỏi lắm nhỉ... Đừng gượng ép quá nhé. Thả lỏng vai một chút và trò chuyện thư giãn cùng tôi nào. Hôm nay điều gì làm bạn vất vả nhất?)*"
      : isZh
      ? "お疲れ様です！今日はいろいろ大変だったんですね… 無理をしないでくださいね。少し肩の力を抜いて、リラックスしながらお話ししましょう。今日は何が一番大変でしたか？🍀\n\n*(辛苦啦！今天一定经历了不少疲惫的事吧... 千万不要太勉强自己。稍稍放松肩膀，轻松地和我聊几句吧。今天最让你感到辛苦的是什么呢？)*"
      : "お疲れ様です！今日はいろいろ大変だったんですね… 無理をしないでくださいね。少し肩の力を抜いて、リラックスしながらお話ししましょう。今日は何が一番大変でしたか？🍀\n\n*(You must have had a tough day... Please don't push yourself too hard. Relax your shoulders and let's have a gentle chat. What was the most exhausting thing today?)*";
  }

  if (/(?:お腹|おなかすいた|腹減った|đói bụng|hungry|饿|肚子饿)/i.test(msg)) {
    return isVi
      ? "お腹が空きましたか！美味しいご飯を食べてエネルギーを補給してくださいね。今夜は何が食べたいですか？ラーメン、お寿司、それとも美味しい料理？🍜🍣\n\n*(Bạn đói bụng rồi à! Hãy ăn món gì thật ngon để nạp lại năng lượng nhé. Tối nay bạn muốn ăn món gì nào? Ramen, Sushi hay món ăn truyền thống quê bạn?)*"
      : isZh
      ? "お腹が空きましたか！美味しいご飯を食べてエネルギーを補給してくださいね。今夜は何が食べたいですか？ラーメン、お寿司、それとも美味しい料理？🍜🍣\n\n*(肚子饿了吗！一定要吃点美味佳肴好好补充元气哦。今晚想吃点什么呢？拉面、寿司还是其他可口的美食？)*"
      : "お腹が空きましたか！美味しいご飯を食べてエネルギーを補給してくださいね。今夜は何が食べたいですか？ラーメン、お寿司、それとも美味しい料理？🍜🍣\n\n*(You're hungry! Please eat something tasty and recharge your energy. What would you like to eat tonight? Ramen, Sushi, or a hometown dish?)*";
  }

  // 5. RESTAURANT & TRAVEL
  if (/(?:寿司|すし|sushi)/i.test(msg)) {
    return isVi
      ? "お寿司、最高ですよね！🍣 私もサーモンやマグロ、いくらが大好きです。ワサビは入れても大丈夫ですか？日本の回転寿司にも行ってみたいですか？😋\n\n*(Sushi ngon tuyệt cú mèo luôn nhỉ! Tôi cũng cực kỳ thích cá hồi (salmon), cá ngừ và trứng cá hồi đấy. Bạn ăn kèm mù tạt (wasabi) được không? Bạn có muốn đi thử các quán sushi băng chuyền ở Nhật không?)*"
      : isZh
      ? "お寿司、最高ですよね！🍣 私もサーモンやマグロ、いくらが大好きです。ワサビは入れても大丈夫ですか？日本の回転寿司にも行ってみたいですか？😋\n\n*(寿司真是太棒了！我也超喜欢三文鱼、金枪鱼和鲑鱼籽。你可以接受加芥末吗？想不想去日本尝尝地道的回转寿司？)*"
      : "お寿司、最高ですよね！🍣 私もサーモンやマグロ、いくらが大好きです。ワサビは入れても大丈夫ですか？日本の回転寿司にも行ってみたいですか？😋\n\n*(Sushi is fantastic, isn't it! I love salmon, tuna, and salmon roe too. Can you eat wasabi? Would you like to try conveyor belt sushi in Japan?)*";
  }

  if (/(?:ラーメン|らーめん|ramen|拉面)/i.test(msg)) {
    return isVi
      ? "ラーメン、いいですね！🍜 豚骨（とんこつ）、醤油（しょうゆ）、味噌（みそ）、どれが一番好きですか？日本のラーメン屋さんはスープや麺の硬さも選べるんですよ！😋\n\n*(Ramen thích quá đi chứ! Giữa nước dùng xương heo (Tonkotsu), nước tương (Shoyu) và tương Miso, bạn mê vị nào nhất? Ở quán ramen bên Nhật mình còn được tự chọn độ đậm của nước súp và độ dai của sợi mì nữa đấy!)*"
      : isZh
      ? "ラーメン、いいですね！🍜 豚骨（とんこつ）、醤油（しょうゆ）、味噌（みそ）、どれが一番好きですか？日本のラーメン屋さんはスープや麺の硬さも選べるんですよ！😋\n\n*(拉面太赞了！豚骨、酱油、味噌，你最中意哪一种口味？在日本的拉面店里，连汤头浓淡和面条软硬程度都能按个人喜好定制哦！)*"
      : "ラーメン、いいですね！🍜 豚骨（とんこつ）、醤油（しょうゆ）、味噌（みそ）、どれが一番好きですか？日本のラーメン屋さんはスープや麺の硬さも選べるんですよ！😋\n\n*(Ramen is so delicious! Which flavor do you like best: tonkotsu (pork bone), shoyu (soy sauce), or miso? In Japan, you can even customize broth richness and noodle firmness!)*";
  }

  // 6. GENERAL JAPANESE NATURAL CONVERSATION FALLBACK
  if (isVi) {
    return `なるほど、「${msg}」ですね！🌸\n\nとても自然で気持ちの伝わる表現ですね。あなたの日本語のセンス、とても素晴らしいと思います！✨\n\nもっと色んなお話がしたいので、最近あった楽しかったことや、気になっていることについて教えてくれますか？😊\n\n*(Sensei hiểu rồi, là chuyện "${msg}" nhỉ! Cách diễn đạt của bạn rất tự nhiên và truyền cảm xúc rất tốt. Hãy tiếp tục trò chuyện cùng Sensei nhé!)*`;
  }

  if (isZh) {
    return `なるほど、「${msg}」ですね！🌸\n\n表达得非常自然且富有感染力呢！你的日语语感非常棒！✨\n\nSensei 很想听你聊更多，能告诉我最近发生了什么有趣的事，或者有什么想交流的话题吗？😊\n\n*(Sensei 领会啦，是关于“${msg}”的事情呢！表达很生动，请继续和 Sensei 愉快地练习日语吧！)*`;
  }

  return `なるほど、「${msg}」ですね！🌸\n\nとても自然で気持ちの伝わる表現ですね。あなたの日本語のセンス、とても素晴らしいと思います！✨\n\nもっと色んなお話がしたいので、最近あった楽しかったことや、気になっていることについて教えてくれますか？😊\n\n*(I see, about "${msg}"! Your expression was so natural and communicative. Tell me more about recent fun things or what's on your mind!)*`;
}
