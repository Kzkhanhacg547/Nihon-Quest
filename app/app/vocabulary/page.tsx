import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { AppNav } from "@/components/AppNav";
import { JapanBackdrop } from "@/components/JapanIllustration";
import { resolveCanonicalUserLevel } from "@/lib/learning-level";
import { VocabKanjiClient } from "./VocabKanjiClient";

export default async function VocabularyPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;
  const uid = sessionUser?.id;
  if (!uid) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: { learningLevel: true, levelChoice: true },
  });
  const userLevel = resolveCanonicalUserLevel(user);
  const vocabulary = await prisma.vocabulary.findMany({ orderBy: { word: "asc" }, include: { examples: true } });
  const kanji = await prisma.kanji.findMany({ orderBy: { strokeCount: "asc" }, include: { readings: true } });
  const userReviews = await prisma.reviewItem.findMany({
    where: { userId: uid, contentType: { in: ["VOCAB", "KANJI"] } },
    select: { contentId: true },
  });
  const savedItemIds = userReviews.map((r) => r.contentId);

  return (
    <div className="nq-workspace">
      <JapanBackdrop />
      <AppNav userName={sessionUser?.name} userImage={sessionUser?.image} />

      <div className="relative z-10 mx-auto mt-3 max-w-[1320px] px-3 pb-28 sm:px-5 sm:pb-20">
        <VocabKanjiClient
          vocabulary={JSON.parse(JSON.stringify(vocabulary))}
          kanji={JSON.parse(JSON.stringify(kanji))}
          savedItemIds={savedItemIds}
          defaultLevel={userLevel}
        />
      </div>
    </div>
  );
}