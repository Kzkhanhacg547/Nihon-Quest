"use client";

import { useState } from "react";
import Link from "next/link";
import { useSoundAndTheme } from "@/components/SoundAndThemeContext";
import { useNativeLanguage } from "@/components/LanguageContext";

export interface DbAchievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: string;
}

export interface DbUserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
  achievement?: DbAchievement;
}

interface MasterBadge {
  key: string;
  title: string;
  description: string;
  category: "JOURNEY" | "LEARNING" | "CHALLENGE" | "SPECIAL";
  categoryLabel: string;
  icon: string;
  xpReward: number;
  requirementHint: string;
  actionHref?: string;
  actionLabel?: string;
}

interface DisplayBadge extends MasterBadge {
  isUnlocked: boolean;
  unlockedAt: string | null;
}

const MASTER_BADGES: MasterBadge[] = [
  {
    key: "first-steps",
    title: "First Steps",
    description: "Hoàn tất bước khởi đầu onboarding và sẵn sàng chinh phục tiếng Nhật.",
    category: "LEARNING",
    categoryLabel: "Bài học & Kỹ năng",
    icon: "👟",
    xpReward: 20,
    requirementHint: "Hoàn thành quy trình nhập môn (Onboarding).",
    actionHref: "/app/practice",
    actionLabel: "Đến Bài Học",
  },
  {
    key: "kana-starter",
    title: "Kana Starter",
    description: "Học thuộc 5 ký tự Hiragana / Katakana đầu tiên.",
    category: "LEARNING",
    categoryLabel: "Bài học & Kỹ năng",
    icon: "あ",
    xpReward: 30,
    requirementHint: "Luyện tập và làm chủ 5 ký tự Bảng chữ cái.",
    actionHref: "/app/learn",
    actionLabel: "Vào Kana Lab",
  },
  {
    key: "lesson-complete-1",
    title: "Lesson Master",
    description: "Hoàn thành bài học đầu tiên trong chương trình Nihon Quest.",
    category: "LEARNING",
    categoryLabel: "Bài học & Kỹ năng",
    icon: "📖",
    xpReward: 40,
    requirementHint: "Hoàn thành 1 bài học bất kỳ trong phần Bài Học.",
    actionHref: "/app/practice",
    actionLabel: "Học Bài Đầu Tiên",
  },
  {
    key: "xp-500",
    title: "Rising Explorer",
    description: "Đạt mốc 500 tổng điểm kinh nghiệm XP tích lũy.",
    category: "CHALLENGE",
    categoryLabel: "Thách thức & XP",
    icon: "⭐",
    xpReward: 50,
    requirementHint: "Tích lũy tối thiểu 500 XP từ các hoạt động học tập.",
    actionHref: "/app/journey",
    actionLabel: "Khám Phá Bản Đồ",
  },
  {
    key: "tokyo-unlocked",
    title: "Tokyo Explorer",
    description: "Hoàn thành đóng dấu chặng dừng chân đầu tiên tại thủ đô Tokyo.",
    category: "JOURNEY",
    categoryLabel: "Hành trình Shinkansen",
    icon: "⛩️",
    xpReward: 50,
    requirementHint: "Khám phá và vượt qua thử thách tại trạm Tokyo.",
    actionHref: "/app/journey",
    actionLabel: "Xem Bản Đồ Shinkansen",
  },
  {
    key: "kyoto-temple",
    title: "Kyoto Pilgrim",
    description: "Khám phá cố đô Kyoto trầm mặc với hàng ngàn ngôi chùa thiền tông.",
    category: "JOURNEY",
    categoryLabel: "Hành trình Shinkansen",
    icon: "⛩️",
    xpReward: 60,
    requirementHint: "Đạt 180 XP và hoàn thành chặng Kyoto.",
    actionHref: "/app/journey",
    actionLabel: "Đến Kyoto",
  },
  {
    key: "nara-deer",
    title: "Nara Friend",
    description: "Khám phá di sản cố đô Nara và giao lưu cùng những chú hươu thiêng.",
    category: "JOURNEY",
    categoryLabel: "Hành trình Shinkansen",
    icon: "🦌",
    xpReward: 60,
    requirementHint: "Đạt 380 XP và hoàn thành chặng Nara.",
    actionHref: "/app/journey",
    actionLabel: "Đến Nara",
  },
  {
    key: "osaka-foodie",
    title: "Osaka Gourmet",
    description: "Thưởng thức ẩm thực đường phố Takoyaki rực rỡ tại nhà bếp quốc dân Osaka.",
    category: "JOURNEY",
    categoryLabel: "Hành trình Shinkansen",
    icon: "🍡",
    xpReward: 70,
    requirementHint: "Mở khóa chặng Osaka trên bản đồ Shinkansen.",
    actionHref: "/app/journey",
    actionLabel: "Đến Osaka",
  },
  {
    key: "fuji-conqueror",
    title: "Fuji Conqueror",
    description: "Chiêm ngưỡng đỉnh thiêng núi Phú Sĩ soi bóng bên hồ Ashi.",
    category: "JOURNEY",
    categoryLabel: "Hành trình Shinkansen",
    icon: "🗻",
    xpReward: 80,
    requirementHint: "Mở khóa chặng Fuji & Hakone trên hành trình.",
    actionHref: "/app/journey",
    actionLabel: "Đến Núi Phú Sĩ",
  },
  {
    key: "all-japan",
    title: "Nihon Master",
    description: "Chinh phục toàn bộ các địa danh nổi tiếng trên bản đồ Nhật Bản.",
    category: "JOURNEY",
    categoryLabel: "Hành trình Shinkansen",
    icon: "👑",
    xpReward: 150,
    requirementHint: "Hoàn thành tất cả 9 địa danh Shinkansen.",
    actionHref: "/app/journey",
    actionLabel: "Trở Thành Huyền Thoại",
  },
  {
    key: "streak-7",
    title: "Streak Warrior",
    description: "Duy trì chuỗi ngày học tập liên tục trong 7 ngày.",
    category: "CHALLENGE",
    categoryLabel: "Thách thức & XP",
    icon: "🔥",
    xpReward: 50,
    requirementHint: "Học tập mỗi ngày liên tiếp không ngắt quãng trong 7 ngày.",
    actionHref: "/app/stats",
    actionLabel: "Xem Chuỗi Streak",
  },
  {
    key: "sensei-chat",
    title: "Sensei Companion",
    description: "Trò chuyện và thực hành giao tiếp tiếng Nhật cùng AI Sensei.",
    category: "SPECIAL",
    categoryLabel: "Đặc biệt & Giao tiếp",
    icon: "🗣️",
    xpReward: 40,
    requirementHint: "Hoàn thành 1 lượt đàm thoại Kaiwa cùng AI Sensei.",
    actionHref: "/app/sensei",
    actionLabel: "Trò Chuyện Với Sensei",
  },
  {
    key: "survival-survivor",
    title: "Survival Legend",
    description: "Vượt qua thử thách sinh tồn giao tiếp trong Survival Mode.",
    category: "SPECIAL",
    categoryLabel: "Đặc biệt & Giao tiếp",
    icon: "🍱",
    xpReward: 60,
    requirementHint: "Hoàn thành 1 màn sinh tồn thực chiến thành công.",
    actionHref: "/app/survival",
    actionLabel: "Vào Survival Mode",
  },
  {
    key: "test-champion",
    title: "Test Champion",
    description: "Hoàn thành bài kiểm tra năng lực tiếng Nhật JLPT.",
    category: "SPECIAL",
    categoryLabel: "Đặc biệt & Giao tiếp",
    icon: "★",
    xpReward: 50,
    requirementHint: "Hoàn thành 1 bài test năng lực tại trang Kiểm tra.",
    actionHref: "/app/test",
    actionLabel: "Làm Bài Kiểm Tra",
  },
];

const BADGE_I18N: Record<string, Partial<Record<string, { desc: string; hint: string; action: string }>>> = {
  "first-steps": {
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
  },
  "kana-starter": {
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
  },
  "lesson-complete-1": {
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
  },
  "xp-500": {
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
  },
  "tokyo-unlocked": {
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
  },
  "kyoto-temple": {
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
  },
  "nara-deer": {
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
  },
  "osaka-foodie": {
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
  },
  "fuji-conqueror": {
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
  },
  "all-japan": {
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
  },
  "streak-7": {
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
  },
  "sensei-chat": {
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
  },
  "survival-survivor": {
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
  },
  "test-champion": {
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
  },
};

interface AchievementsClientProps {
  dbAll: DbAchievement[];
  dbOwned: DbUserAchievement[];
  totalXP: number;
  currentStreak: number;
}

export function AchievementsClient({
  dbAll,
  dbOwned: initialOwned,
  totalXP,
  currentStreak,
}: AchievementsClientProps) {
  const { playClick, playCorrect, showToast } = useSoundAndTheme();
  const { t, nativeLanguage } = useNativeLanguage();

  const [ownedList, setOwnedList] = useState<DbUserAchievement[]>(initialOwned);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<DisplayBadge | null>(null);
  const [activeTab, setActiveTab] = useState<"ALL" | "UNLOCKED" | "LOCKED">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryLabel = (category: string, defaultLabel: string) => {
    switch (category) {
      case "JOURNEY": return t("catJourney");
      case "LEARNING": return t("catLearning");
      case "CHALLENGE": return t("catChallenge");
      case "SPECIAL": return t("catSpecial");
      default: return defaultLabel;
    }
  };

  // Map owned achievements by key for fast lookup
  const ownedKeyMap = new Map<string, DbUserAchievement>();
  ownedList.forEach((ua) => {
    const key = ua.achievement?.key;
    if (key) ownedKeyMap.set(key, ua);
  });

  // Sync and Evaluate Achievements via API
  const handleSyncAchievements = async () => {
    playClick();
    setIsSyncing(true);
    try {
      const res = await fetch("/api/achievements", { method: "POST" });
      const data = await res.json();

      // Refetch current list
      const freshRes = await fetch("/api/achievements");
      if (freshRes.ok) {
        const freshData = await freshRes.json();
        setOwnedList(freshData.owned || []);
      }

      if (data.unlocked && data.unlocked.length > 0) {
        playCorrect();
        showToast({
          title: t("badgeSyncSuccessCount", { count: data.unlocked.length }),
          type: "success",
        });
      } else {
        showToast({
          title: t("badgeSyncSuccessNoNew"),
          type: "info",
        });
      }
    } catch {
      showToast({ title: t("badgeSyncError"), type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  // Combine master badge list with db achievements
  const allDisplayBadges: DisplayBadge[] = MASTER_BADGES.map((b) => {
    const ownedInfo = ownedKeyMap.get(b.key);
    return {
      ...b,
      description: (BADGE_I18N[b.key]?.[nativeLanguage] || (nativeLanguage !== "vi" ? BADGE_I18N[b.key]?.en : undefined))?.desc || b.description,
      requirementHint: (BADGE_I18N[b.key]?.[nativeLanguage] || (nativeLanguage !== "vi" ? BADGE_I18N[b.key]?.en : undefined))?.hint || b.requirementHint,
      actionLabel: (BADGE_I18N[b.key]?.[nativeLanguage] || (nativeLanguage !== "vi" ? BADGE_I18N[b.key]?.en : undefined))?.action || b.actionLabel,
      isUnlocked: !!ownedInfo,
      unlockedAt: ownedInfo?.unlockedAt ? new Date(ownedInfo.unlockedAt).toLocaleDateString(nativeLanguage === "vi" ? "vi-VN" : nativeLanguage.startsWith("zh") ? "zh-CN" : "en-US") : null,
    };
  });

  // Filtering
  const filteredBadges = allDisplayBadges.filter((b) => {
    // Tab filter
    if (activeTab === "UNLOCKED" && !b.isUnlocked) return false;
    if (activeTab === "LOCKED" && b.isUnlocked) return false;

    // Category filter
    if (selectedCategory !== "ALL" && b.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unlockedCount = allDisplayBadges.filter((b) => b.isUnlocked).length;
  const totalBadgesCount = allDisplayBadges.length;
  const progressPercent = Math.round((unlockedCount / totalBadgesCount) * 100);
  const totalEarnedXP = allDisplayBadges
    .filter((b) => b.isUnlocked)
    .reduce((sum, b) => sum + b.xpReward, 0);

  return (
    <div className="space-y-8">
      {/* STAT CARDS HEADER */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* CARD 1: UNLOCKED COUNT */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 dark:bg-sumi-900 dark:ring-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">{t("badgeUnlockedCount")}</span>
            <span className="text-xl">🏆</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">{unlockedCount}</span>
              <span className="text-sm font-bold text-slate-400">/ {totalBadgesCount}</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-sumi-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* CARD 2: TOTAL XP FROM BADGES */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 dark:bg-sumi-900 dark:ring-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">{t("badgeTotalXpHeader")}</span>
            <span className="text-xl">⭐</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-amber-500">+{totalEarnedXP} XP</span>
            <p className="mt-1 text-xs text-slate-400">{t("badgeEarnedFromTitles")}</p>
          </div>
        </div>

        {/* CARD 3: STREAK */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 dark:bg-sumi-900 dark:ring-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">{t("badgeStreakHeader")}</span>
            <span className="text-xl">🔥</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-orange-600 dark:text-orange-400">{currentStreak} {t("statsDaySuffix")}</span>
            <p className="mt-1 text-xs text-slate-400">{t("badgeContinuousStudy")}</p>
          </div>
        </div>

        {/* CARD 4: SYNC ACTION */}
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900 to-sumi-900 p-6 text-white shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">{t("badgeSyncTitle")}</span>
            <span className="text-xl">✨</span>
          </div>
          <div className="mt-4 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              {t("badgeSyncDesc")}
            </p>
            <button
              type="button"
              disabled={isSyncing}
              onClick={handleSyncAchievements}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-xs font-extrabold text-white shadow hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {isSyncing ? <span>{t("badgeSyncing")}</span> : <span>{t("badgeCheckAndClaim")}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80 dark:bg-sumi-900 dark:ring-slate-800">
        {/* TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-2xl dark:bg-sumi-800">
          <button
            type="button"
            onClick={() => { playClick(); setActiveTab("ALL"); }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
              activeTab === "ALL"
                ? "bg-white text-slate-900 shadow dark:bg-sumi-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {t("filterAll")} ({totalBadgesCount})
          </button>
          <button
            type="button"
            onClick={() => { playClick(); setActiveTab("UNLOCKED"); }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
              activeTab === "UNLOCKED"
                ? "bg-white text-emerald-600 shadow dark:bg-sumi-900 dark:text-emerald-400"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {t("filterUnlocked")} ({unlockedCount})
          </button>
          <button
            type="button"
            onClick={() => { playClick(); setActiveTab("LOCKED"); }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
              activeTab === "LOCKED"
                ? "bg-white text-slate-900 shadow dark:bg-sumi-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {t("filterLocked")} ({totalBadgesCount - unlockedCount})
          </button>
        </div>

        {/* CATEGORY & SEARCH */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-red-400 dark:border-slate-700 dark:bg-sumi-850 dark:text-slate-200"
          >
            <option value="ALL">{t("catAll")}</option>
            <option value="JOURNEY">{t("catJourney")}</option>
            <option value="LEARNING">{t("catLearning")}</option>
            <option value="CHALLENGE">{t("catChallenge")}</option>
            <option value="SPECIAL">{t("catSpecial")}</option>
          </select>

          <input
            type="text"
            placeholder={t("searchBadges")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-48 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-red-400 dark:border-slate-700 dark:bg-sumi-850 dark:text-slate-200"
          />
        </div>
      </div>

      {/* BADGES GRID */}
      {filteredBadges.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBadges.map((badge) => (
            <div
              key={badge.key}
              onClick={() => { playClick(); setSelectedBadge(badge); }}
              className={`group relative flex cursor-pointer items-start gap-4 rounded-3xl p-5 transition-all duration-200 ${
                badge.isUnlocked
                  ? "bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/5 shadow-sm ring-1 ring-amber-400/40 hover:shadow-md hover:ring-amber-500 dark:from-amber-950/20 dark:via-sumi-900 dark:to-emerald-950/10 dark:ring-amber-500/30"
                  : "bg-white/80 opacity-70 ring-1 ring-slate-200/80 hover:opacity-100 dark:bg-sumi-900/60 dark:ring-slate-800"
              }`}
            >
              {/* BADGE ICON CONTAINER */}
              <div
                className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-inner transition group-hover:scale-105 ${
                  badge.isUnlocked
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30 ring-2 ring-amber-300"
                    : "bg-slate-100 text-slate-400 dark:bg-sumi-800 grayscale"
                }`}
              >
                <span>{badge.icon}</span>
                {!badge.isUnlocked && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[10px] text-white">
                    🔒
                  </span>
                )}
              </div>

              {/* BADGE INFO */}
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-400 truncate">
                    {getCategoryLabel(badge.category, badge.categoryLabel)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0">
                    +{badge.xpReward} XP
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 transition truncate text-base">
                  {badge.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 dark:text-slate-400">
                  {badge.description}
                </p>

                <div className="pt-1 text-[11px] font-semibold">
                  {badge.isUnlocked ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {t("badgeStatusUnlocked")} ({badge.unlockedAt || ""})
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      {t("badgeStatusNotAchieved")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200/80 dark:bg-sumi-900 dark:ring-slate-800 space-y-3">
          <span className="text-4xl">🔍</span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t("noBadgesFound")}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {t("tryDifferentBadgeSearch")}
          </p>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="w-full max-w-md space-y-6 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 dark:bg-sumi-900 dark:ring-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow ${
                    selectedBadge.isUnlocked
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-2 ring-amber-300"
                      : "bg-slate-100 text-slate-400 dark:bg-sumi-800 grayscale"
                  }`}
                >
                  {selectedBadge.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400">{getCategoryLabel(selectedBadge.category, selectedBadge.categoryLabel)}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedBadge.title}</h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-sumi-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <b className="text-slate-900 dark:text-white block mb-1">{t("badgeDetailDesc")}</b>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {selectedBadge.description}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-sumi-850 space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">{t("badgeRewardXp")}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">+{selectedBadge.xpReward} XP</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">{t("badgeStatus")}</span>
                  <span className={selectedBadge.isUnlocked ? "text-emerald-600 font-bold" : "text-slate-400"}>
                    {selectedBadge.isUnlocked ? t("badgeStatusUnlocked") : t("badgeStatusLocked")}
                  </span>
                </div>
                <div>
                  <b className="text-slate-700 dark:text-slate-300 block mt-1">{t("badgeRequirement")}</b>
                  <p className="text-slate-500 mt-0.5">{selectedBadge.requirementHint}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              {selectedBadge.actionHref && (
                <Link
                  href={selectedBadge.actionHref}
                  onClick={() => setSelectedBadge(null)}
                  className="rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow hover:brightness-110 transition"
                >
                  {selectedBadge.actionLabel || t("badgeGoDoAction")}
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-sumi-800"
              >
                {t("badgeClose")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

