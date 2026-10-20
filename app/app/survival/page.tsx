import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { AppNav } from "@/components/AppNav";
import { JapanBackdrop } from "@/components/JapanIllustration";
import { SurvivalClient } from "./SurvivalClient";

export default async function SurvivalPage() {
  const session = await getServerSession(authOptions);
  const uid = (session?.user as { id?: string } | undefined)?.id;
  if (!uid) redirect("/login");

  const scenarios = await prisma.scenario.findMany({
    where: { isPublished: true },
    include: {
      messages: { orderBy: { order: "asc" } },
      choices: true,
      progress: { where: { userId: uid } },
    },
  });

  const formattedScenarios = scenarios.map((sc) => ({
    id: sc.id,
    slug: sc.slug,
    title: sc.title,
    description: sc.description,
    level: sc.level,
    xpReward: sc.xpReward,
    messages: sc.messages.map((m) => ({
      id: m.id,
      order: m.order,
      speaker: m.speaker,
      japanese: m.japanese,
      romaji: m.romaji,
      meaning: m.meaning,
    })),
    choices: sc.choices.map((c) => ({
      id: c.id,
      optionText: c.optionText,
      isIdeal: c.isIdeal,
      xpReward: c.xpReward,
    })),
    isCompleted: sc.progress.some((p) => p.status === "COMPLETED"),
  }));

  const totalXp = formattedScenarios.reduce((sum, s) => sum + s.xpReward, 0);
  const earnedXp = formattedScenarios.filter((s) => s.isCompleted).reduce((sum, s) => sum + s.xpReward, 0);
  const doneCount = formattedScenarios.filter((s) => s.isCompleted).length;

  return (
    <div className="nq-workspace">
      <JapanBackdrop />
      <AppNav />
      <SurvivalClient
        scenarios={formattedScenarios}
        initialEarnedXp={earnedXp}
        initialTotalXp={totalXp}
        doneCount={doneCount}
      />
    </div>
  );
}
