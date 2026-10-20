"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSoundAndTheme, SPEECH_RATES } from "@/components/SoundAndThemeContext";
import { notifyProgressUpdated } from "@/components/UserProgressContext";
import { useNativeLanguage, SUPPORTED_LANGUAGES } from "@/components/LanguageContext";
import { guessVoiceGender, voiceGenderLabel } from "@/lib/voiceGender";
import { AvatarEditor } from "../profile/AvatarEditor";

export interface SettingsInitialData {
  displayName: string;
  email: string;
  avatar: string | null;
  bio: string;
  timezone: string;
  learningLevel: string;
  learningGoal: string;
  dailyGoalMinutes: number;
  focusSkill: string;
  learningStyle: string;
  theme: "light" | "dark" | "system";
  soundEnabled: boolean;
  registeredDate: string;
}

export function SettingsClient({ initial }: { initial: SettingsInitialData }) {
  const router = useRouter();
  const {
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    speechRate,
    setSpeechRate,
    speechVoiceURI,
    setSpeechVoiceURI,
    availableVoices,
    speak,
    playClick,
    playCorrect,
    showToast,
  } = useSoundAndTheme();

  const [activeTab, setActiveTab] = useState<
    "profile" | "appearance" | "learning" | "audio" | "notifications" | "privacy" | "account"
  >("profile");

  // Form states
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [bio, setBio] = useState(initial.bio);
  const [timezone, setTimezone] = useState(initial.timezone);
  const [learningLevel, setLearningLevel] = useState(initial.learningLevel);
  const [learningGoal, setLearningGoal] = useState(initial.learningGoal);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(initial.dailyGoalMinutes);
  const [focusSkill, setFocusSkill] = useState(initial.focusSkill);
  const [learningStyle, setLearningStyle] = useState(initial.learningStyle);

  const { nativeLanguage, setNativeLanguage, t } = useNativeLanguage();
  const [notifDaily, setNotifDaily] = useState(true);
  const [notifReview, setNotifReview] = useState(true);
  const [notifAchievement, setNotifAchievement] = useState(true);
  const [notifLevelUp, setNotifLevelUp] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);

  // Privacy toggles
  const [privacyPublicLeaderboard, setPrivacyPublicLeaderboard] = useState(true);
  const [privacyPublicStats, setPrivacyPublicStats] = useState(true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdBusy, setPwdBusy] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);

  // Saving states
  const [isSaving, setIsSaving] = useState(false);

  const initialAvatarChar = (displayName || initial.email || "N").slice(0, 1).toUpperCase();

  // Save general settings
  async function handleSaveSettings(e?: React.FormEvent) {
    if (e) e.preventDefault();
    playClick();
    setIsSaving(true);

    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          bio,
          timezone,
          learningLevel,
          learningGoal,
          dailyGoalMinutes,
          focusSkill,
          learningStyle,
          theme,
          soundEnabled,
          nativeLanguage,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast({ title: json.error || "Không thể lưu cài đặt", type: "error" });
        return;
      }

      notifyProgressUpdated();
      playCorrect();
      showToast({
        title: t("saveSuccess"),
        type: "success",
      });
      router.refresh();
    } catch {
      showToast({ title: "Đã có lỗi xảy ra. Vui lòng thử lại.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  }

  // Change password
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      showToast({ title: "Mật khẩu mới phải có ít nhất 8 ký tự.", type: "error" });
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast({ title: "Mật khẩu xác nhận không khớp.", type: "error" });
      return;
    }

    playClick();
    setPwdBusy(true);

    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast({ title: json.error || "Đổi mật khẩu thất bại", type: "error" });
        return;
      }

      playCorrect();
      showToast({ title: "Đã đổi mật khẩu thành công!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      showToast({ title: "Không thể đổi mật khẩu.", type: "error" });
    } finally {
      setPwdBusy(false);
    }
  }

  // Delete account
  async function handleDeleteAccount() {
    if (deleteConfirmText.trim().toLowerCase() !== "xóa tài khoản") {
      showToast({ title: "Vui lòng nhập chính xác 'xóa tài khoản' để xác nhận.", type: "error" });
      return;
    }

    setDeleteBusy(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) throw new Error();

      showToast({ title: "Đã xóa tài khoản vĩnh viễn.", type: "info" });
      await signOut({ redirect: false });
      router.push("/register");
    } catch {
      showToast({ title: "Xóa tài khoản thất bại. Vui lòng thử lại.", type: "error" });
      setDeleteBusy(false);
    }
  }

  const TABS = [
    { id: "profile", label: t("tabProfile"), icon: "👤" },
    { id: "appearance", label: t("tabAppearance"), icon: "🎨" },
    { id: "learning", label: t("tabLearning"), icon: "⛩️" },
    { id: "audio", label: t("tabAudio"), icon: "🔊" },
    { id: "notifications", label: t("tabNotifications"), icon: "🔔" },
    { id: "privacy", label: t("tabPrivacy"), icon: "🛡️" },
    { id: "account", label: t("tabAccount"), icon: "⚙️" },
  ] as const;

  return (
    <div className="space-y-6 pb-24 sm:pb-16">
      {/* Unified Account & Settings Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-sumi-900/90">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">人</span>
          <span>{t("navProfile")} &amp; {t("navSettings")}</span>
        </div>
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-sumi-950">
          <Link
            href="/app/profile"
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            👤 {t("navProfile")}
          </Link>
          <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-extrabold text-rose-600 shadow-xs dark:bg-sumi-800 dark:text-rose-400">
            ⚙️ {t("navSettings")}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {t("navProfile")} &amp; {t("navSettings")}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("learningGoalsSubtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSaveSettings()}
          disabled={isSaving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 text-sm font-bold text-white shadow-md shadow-rose-600/30 transition hover:bg-rose-700 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? t("saving") : `💾 ${t("saveChanges")}`}
        </button>
      </div>

      {/* Main Settings Grid: Sidebar Navigation + Content Area */}
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        {/* Navigation Tabs (Sidebar on Desktop, Horizontal Scroll on Mobile) */}
        <nav
          aria-label="Cài đặt danh mục"
          className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-sumi-900 lg:flex-col lg:overflow-visible"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                className={`flex min-h-[46px] items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-sm font-bold transition whitespace-nowrap lg:whitespace-normal ${
                  isActive
                    ? "bg-rose-50 text-rose-700 shadow-sm dark:bg-rose-950/60 dark:text-rose-300"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-sumi-800 dark:hover:text-white"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="flex-1">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings Sections Container */}
        <div className="space-y-6">
          {/* ================= SECTION 1: PROFILE ================= */}
          {activeTab === "profile" && (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-lg dark:bg-rose-950/60">
                  👤
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("tabProfileTitle")}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("tabProfileSubtitle")}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {/* Avatar upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    {t("avatarSectionLabel")}
                  </label>
                  <div className="flex items-center gap-5">
                    <AvatarEditor src={initial.avatar} initial={initialAvatarChar} />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t("avatarPortraitTitle")}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{t("avatarPortraitHint")}</p>
                      <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                        {t("avatarNotice")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    {t("displayNameField")}
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t("displayNamePlaceholder")}
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                  />
                </div>

                {/* Email (Readonly) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t("emailField")}
                    </label>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {t("verifiedStatus")}
                    </span>
                  </div>
                  <input
                    type="email"
                    value={initial.email}
                    disabled
                    readOnly
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-500 outline-none cursor-not-allowed dark:border-slate-800 dark:bg-sumi-950/60 dark:text-slate-400"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{t("emailNotice")}</p>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    {t("bioField")}
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={t("bioPlaceholder")}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                  />
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    {t("timezoneField")}
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                  >
                    <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                    <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                    <option value="Asia/Seoul">Asia/Seoul (GMT+9)</option>
                    <option value="UTC">UTC (GMT+0)</option>
                  </select>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{t("timezoneNotice")}</p>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 2: APPEARANCE ================= */}
          {activeTab === "appearance" && (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-lg dark:bg-amber-950/60">
                  🎨
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("appearanceTitle")}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("appearanceSubtitle")}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                    {t("themeSectionLabel")}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light" as const, title: t("themeLightTitle"), icon: "☀️", desc: t("themeLightDesc") },
                      { id: "dark" as const, title: t("themeDarkTitle"), icon: "🌙", desc: t("themeDarkDesc") },
                      { id: "system" as const, title: t("themeSystemTitle"), icon: "💻", desc: t("themeSystemDesc") },
                    ].map((mode) => {
                      const on = theme === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            playClick();
                            setTheme(mode.id);
                          }}
                          className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition ${
                            on
                              ? "border-rose-500 bg-rose-50/70 text-rose-700 ring-2 ring-rose-500/20 dark:bg-rose-950/40 dark:text-rose-300"
                              : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-sumi-950 dark:hover:border-slate-600"
                          }`}
                        >
                          <span className="text-2xl">{mode.icon}</span>
                          <span className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{mode.title}</span>
                          <span className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{mode.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 3: LEARNING ================= */}
          {activeTab === "learning" && (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-lg dark:bg-indigo-950/60">
                  ⛩️
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("learningGoalsTitle")}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("learningGoalsSubtitle")}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {/* Daily Goal Minutes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t("dailyGoalMinutesLabel")}
                    </label>
                    <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                      {dailyGoalMinutes} {t("minsPerDay")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[10, 15, 20, 30, 45, 60].map((min) => (
                      <button
                        key={min}
                        type="button"
                        onClick={() => {
                          playClick();
                          setDailyGoalMinutes(min);
                        }}
                        className={`min-h-10 rounded-xl px-4 text-xs font-bold transition ${
                          dailyGoalMinutes === min
                            ? "bg-rose-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-rose-300 dark:border-slate-700 dark:bg-sumi-950 dark:text-slate-300"
                        }`}
                      >
                        {min} {t("minsPerDay")}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    {t("syncWithDashboardDesc")}
                  </p>
                </div>

                {/* Native Language / Ngôn ngữ mẹ đẻ */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-sumi-950/60">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        🌐 {t("nativeLangTitle")}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t("nativeLangDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          playClick();
                          setNativeLanguage(lang.code);
                          showToast({
                            title: `${t("langSwitchedToast")}${lang.nativeName} ${lang.flag}`,
                            type: "info",
                          });
                        }}
                        className={`min-h-11 rounded-xl p-2.5 text-xs font-bold transition flex items-center justify-between gap-1.5 ${
                          nativeLanguage === lang.code
                            ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-400"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-rose-300 dark:border-slate-700 dark:bg-sumi-950 dark:text-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="text-base">{lang.flag}</span>
                          <span className="truncate">{lang.nativeName}</span>
                        </span>
                        {nativeLanguage === lang.code && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* JLPT Level */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t("jlptFocusLevel")}
                    </label>
                    <select
                      value={learningLevel}
                      onChange={(e) => setLearningLevel(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                    >
                      <option value="N5">{t("optN5")}</option>
                      <option value="N4">{t("optN4")}</option>
                      <option value="N3">{t("optN3")}</option>
                    </select>
                  </div>

                  {/* Primary Goal */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t("primaryGoal")}
                    </label>
                    <select
                      value={learningGoal}
                      onChange={(e) => setLearningGoal(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                    >
                      <option value="JLPT">{t("optGoalJlpt")}</option>
                      <option value="TRAVEL">{t("optGoalTravel")}</option>
                      <option value="CONVERSATION">{t("optGoalConversation")}</option>
                      <option value="CULTURE">{t("optGoalCulture")}</option>
                    </select>
                  </div>
                </div>

                {/* Skill & Style */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t("focusSkillLabel")}
                    </label>
                    <select
                      value={focusSkill}
                      onChange={(e) => setFocusSkill(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                    >
                      <option value="BALANCED">{t("optSkillBalanced")}</option>
                      <option value="LISTENING">{t("optSkillListening")}</option>
                      <option value="SPEAKING">{t("optSkillSpeaking")}</option>
                      <option value="READING">{t("optSkillReading")}</option>
                      <option value="WRITING">{t("optSkillWriting")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t("learningStyleLabel")}
                    </label>
                    <select
                      value={learningStyle}
                      onChange={(e) => setLearningStyle(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                    >
                      <option value="STRUCTURED">{t("optStyleStructured")}</option>
                      <option value="IMMERSIVE">{t("optStyleImmersive")}</option>
                      <option value="GAMIFIED">{t("optStyleGamified")}</option>
                      <option value="PRACTICAL">{t("optStylePractical")}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 4: AUDIO & VOICE ================= */}
          {activeTab === "audio" && (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-lg dark:bg-teal-950/60">
                  🔊
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("audioTitle")}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("audioSubtitle")}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {/* Sound Effects Toggle */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-sumi-950">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t("soundFxTitle")}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("soundFxDesc")}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={soundEnabled}
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      if (!soundEnabled) playClick();
                    }}
                    className={`relative h-7 w-12 rounded-full transition ${
                      soundEnabled ? "bg-rose-600" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                        soundEnabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Speech Rate */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                    {t("voiceSpeedLabel")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPEECH_RATES.map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => {
                          setSpeechRate(rate);
                          speak("こんにちは！日本語の練習です。", rate);
                        }}
                        className={`min-h-10 rounded-xl px-4 text-xs font-bold transition ${
                          speechRate === rate
                            ? "bg-rose-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-rose-300 dark:border-slate-700 dark:bg-sumi-950 dark:text-slate-300"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Japanese Voice Selector */}
                {availableVoices.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t("japaneseVoiceLabel")}
                    </label>
                    <select
                      value={speechVoiceURI}
                      onChange={(e) => setSpeechVoiceURI(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                    >
                      <option value="">{t("autoVoiceOpt")}</option>
                      {availableVoices.map((voice) => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang}) · {voiceGenderLabel(guessVoiceGender(voice.name))}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Test Voice Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => speak("こんにちは！日本クエストへようこそ！")}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:bg-sumi-950 dark:text-slate-300"
                  >
                    <span>{t("testVoiceBtn")}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">(こんにちは！日本クエストへようこそ！)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 5: NOTIFICATIONS ================= */}
          {activeTab === "notifications" && (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-lg dark:bg-amber-950/60">
                  🔔
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("notifSectionTitle")}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("notifSectionSubtitle")}</p>
                </div>
              </div>

              <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t("notifDailyTitle")}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("notifDailySub")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifDaily}
                    onChange={(e) => setNotifDaily(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t("notifReviewLabel") || "Nhắc nhở ôn tập SRS"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("notifSrsSub")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifReview}
                    onChange={(e) => setNotifReview(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t("notifAchievementLabel") || "Thông báo thành tựu"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("notifAchievementSub")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifAchievement}
                    onChange={(e) => setNotifAchievement(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t("notifLevelUpTitle")}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("notifLevelUpSub")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifLevelUp}
                    onChange={(e) => setNotifLevelUp(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t("notifEmailTitle")}</p>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                        {t("notifEmailAutoBadge")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {t("notifEmailSub")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <input
                      type="checkbox"
                      checked={notifEmail}
                      onChange={(e) => setNotifEmail(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 6: PRIVACY ================= */}
          {activeTab === "privacy" && (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-lg dark:bg-emerald-950/60">
                  🛡️
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("privacySectionTitle")}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("privacySectionSubtitle")}</p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t("privacyLeaderboardTitle")}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("privacyLeaderboardSub")}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacyPublicLeaderboard}
                      onChange={(e) => setPrivacyPublicLeaderboard(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t("privacyStatsTitle")}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("privacyStatsSub")}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacyPublicStats}
                      onChange={(e) => setPrivacyPublicStats(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-sumi-950">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("accountInfoTitle")}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("joinDateLabel")}: <strong className="text-slate-700 dark:text-slate-300">{initial.registeredDate}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= SECTION 7: ACCOUNT & SECURITY ================= */}
          {activeTab === "account" && (
            <div className="space-y-6">
              {/* Password Change */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sumi-900">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-lg dark:bg-rose-950/60">
                    🔒
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("accountSectionTitle")}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("accountSectionSubtitle")}</p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t("currentPasswordLabel")}
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                        {t("newPasswordLabel")}
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={t("newPasswordPlaceholder")}
                        required
                        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                        {t("confirmPasswordLabel")}
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t("confirmPasswordPlaceholder")}
                        required
                        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-rose-500 dark:border-slate-700 dark:bg-sumi-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={pwdBusy}
                    className="mt-2 inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-900 px-5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                  >
                    {pwdBusy ? t("updatePasswordUpdating") : t("updatePasswordBtn")}
                  </button>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="rounded-3xl border border-red-200/80 bg-white p-6 shadow-sm dark:border-red-900/60 dark:bg-sumi-900">
                <div className="flex items-center gap-3 border-b border-red-100 pb-4 dark:border-red-900/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-lg text-red-600 dark:bg-red-950/60">
                    ⚠️
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-red-700 dark:text-red-400">{t("dangerZoneTitle")}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("dangerZoneSubtitle")}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl bg-slate-50 dark:bg-sumi-950">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t("logoutTitle")}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("logoutDesc")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-sumi-900 dark:text-slate-200"
                    >
                      {t("logoutBtn")}
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border border-red-100 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20">
                    <div>
                      <p className="text-sm font-bold text-red-700 dark:text-red-400">{t("deleteAccountTitle")}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t("deleteAccountDesc")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-xs font-bold text-white transition hover:bg-red-700"
                    >
                      {t("deleteAccountBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Delete Account */}
      {showDeleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-sumi-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-2xl dark:bg-red-950/60">
              ⚠️
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-900 dark:text-white">
              {t("deleteModalTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t("deleteModalDesc")}
            </p>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                {t("deleteModalInputLabel")}
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="xóa tài khoản / delete account"
                className="min-h-11 w-full rounded-xl border border-red-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-600/15 dark:border-red-800 dark:bg-sumi-950 dark:text-white"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleteBusy}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
              >
                {t("deleteModalCancelBtn")}
              </button>
              <button
                type="button"
                disabled={
                  deleteBusy ||
                  (deleteConfirmText.trim().toLowerCase() !== "xóa tài khoản" &&
                    deleteConfirmText.trim().toLowerCase() !== "delete account")
                }
                onClick={handleDeleteAccount}
                className="min-h-11 rounded-xl bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleteBusy ? t("deleteModalDeleting") : t("deleteModalConfirmBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
