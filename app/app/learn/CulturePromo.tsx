"use client";

import Link from "next/link";
import { BASE64_IMAGES } from "@/lib/assets/base64Images";
import { useEffect, useState } from "react";
import { IcoArrow } from "@/components/LearnIcons";

import { useNativeLanguage } from "@/components/LanguageContext";

type Tone = "day" | "night";

/** 06:00–17:59 → ban ngày, còn lại → ban đêm (theo giờ máy người dùng). */
const toneAt = (d: Date = new Date()): Tone => {
  const h = d.getHours();
  return h >= 6 && h < 18 ? "day" : "night";
};

export function CulturePromo() {
  const [tone, setTone] = useState<Tone>("day");
  const { t } = useNativeLanguage();

  useEffect(() => {
    const sync = () => setTone(toneAt());
    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Link href="/app/journey" className="lp-promo" data-tone={tone}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lp-promo-img is-day" src={BASE64_IMAGES.promoDay} alt="" aria-hidden="true" loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lp-promo-img is-night" src={BASE64_IMAGES.promoNight} alt="" aria-hidden="true" loading="lazy" />
      <span className="lp-promo-tone" aria-hidden="true">{tone === "day" ? t("culturePromoToneDay") : t("culturePromoToneNight")}</span>
      <small>{t("culturePromoTag")}</small>
      <h3>{t("culturePromoTitle")}</h3>
      <p>{t("culturePromoDesc")}</p>
      <span className="lp-promo-btn">{t("culturePromoBtn")} <IcoArrow width={14} height={14} /></span>
    </Link>
  );
}