import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { generateNaturalJapaneseResponse, getLanguageName } from "@/lib/naturalSenseiEngine";
import { getUserProgress } from "@/lib/progress-service";
import { getUserLearningMistakes, formatMistakesForAiPrompt } from "@/lib/learningMistakes";
import { rateLimitAsync, rateLimited } from "@/lib/rateLimit";
import type { NativeLanguage } from "@/components/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/components/LanguageContext";

const VALID_KEY_PATTERN =
  /^(gsk_[A-Za-z0-9_-]{16,128}|sk-or-[A-Za-z0-9_.-]{16,128}|sk-[A-Za-z0-9_.-]{16,128}|xai-[A-Za-z0-9_-]{16,128}|AIza[A-Za-z0-9_-]{20,80}|AQ\.[A-Za-z0-9_.-]{16,128})$/;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const uid = (session?.user as { id?: string } | undefined)?.id;
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const convId = searchParams.get("conversationId");

  if (convId) {
    const conv = await prisma.aiConversation.findFirst({
      where: { id: convId, userId: uid },
      include: { messages: { orderBy: { createdAt: "desc" }, take: 200 } },
    });
    if (!conv) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...conv, messages: [...conv.messages].reverse() });
  }

  const conversations = await prisma.aiConversation.findMany({
    where: { userId: uid },
    include: { messages: { take: 1, orderBy: { createdAt: "desc" } } },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  return NextResponse.json({ conversations });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions).catch(() => null);
    const uid = (session?.user as { id?: string } | undefined)?.id;

    const body = await req.json().catch(() => ({}));
    const {
      message,
      conversationId,
      apiKey,
      scenarioId,
      history: clientHistory,
      nativeLanguage: clientLang,
      userProgress: clientProgress,
    } = body as {
      message?: string;
      conversationId?: string;
      apiKey?: string;
      scenarioId?: string;
      history?: { role: "user" | "assistant"; content: string }[];
      nativeLanguage?: NativeLanguage;
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
      };
    };

    const isSupportedLang = clientLang && SUPPORTED_LANGUAGES.some((l) => l.code === clientLang);
    const nativeLanguage: NativeLanguage = isSupportedLang ? (clientLang as NativeLanguage) : "vi";

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 4000) {
      return NextResponse.json({ error: "Message quá dài (tối đa 4000 ký tự)." }, { status: 400 });
    }

    const [dbProgress, userMistakes] = await Promise.all([
      uid ? getUserProgress(uid).catch(() => null) : Promise.resolve(null),
      uid ? getUserLearningMistakes(uid).catch(() => null) : Promise.resolve(null),
    ]);

    const effectiveProgress = dbProgress
      ? {
          userLevel: dbProgress.learningLevel,
          level: dbProgress.level,
          totalXP: dbProgress.totalXP,
          currentStreak: dbProgress.currentStreak,
          completedLessonsCount: dbProgress.stats?.completedLessonsCount,
          totalLessonsInLevel: dbProgress.stats?.totalLessonsInLevel,
          dueReviewCount: dbProgress.stats?.dueReviewCount,
          accuracyPercent: dbProgress.stats?.reviewAccuracy ?? 100,
          stats: dbProgress.stats,
        }
      : clientProgress && typeof clientProgress === "object"
        ? {
            userLevel: clientProgress.userLevel || "N5",
            level: clientProgress.level || 1,
            totalXP: clientProgress.totalXP ?? 0,
            currentStreak: clientProgress.currentStreak ?? 0,
            completedLessonsCount:
              clientProgress.completedLessonsCount ?? clientProgress.stats?.completedLessonsCount ?? 0,
            totalLessonsInLevel:
              clientProgress.totalLessonsInLevel ?? clientProgress.stats?.totalLessonsInLevel ?? 50,
            dueReviewCount:
              clientProgress.dueReviewCount ?? clientProgress.stats?.dueReviewCount ?? 0,
            accuracyPercent:
              clientProgress.accuracyPercent ?? clientProgress.stats?.reviewAccuracy ?? 100,
            stats: clientProgress.stats,
          }
        : null;

    // Guest / unauthenticated fallback
    if (!uid) {
      const guestResponse = generateNaturalJapaneseResponse({
        scenarioId: scenarioId || "free_kaiwa",
        userMessage: message,
        userProgress: effectiveProgress,
        nativeLanguage,
      });
      return NextResponse.json({
        conversationId: "guest-" + Date.now(),
        message: {
          id: "guest-msg-" + Date.now(),
          role: "assistant",
          content: guestResponse,
          createdAt: new Date().toISOString(),
        },
        isGuest: true,
      });
    }

    const limit = await rateLimitAsync(`ai-chat:${uid}`, 30, 60_000).catch(() => ({ ok: true as const, remaining: 30 }));
    if (!limit.ok) return rateLimited(limit.retryAfterSeconds);

    let convId: string = conversationId || "conv-" + Date.now();
    try {
      let conv = conversationId
        ? await prisma.aiConversation.findFirst({ where: { id: conversationId, userId: uid } })
        : null;

      if (!conv) {
        conv = await prisma.aiConversation.create({
          data: {
            userId: uid,
            title: message.slice(0, 60),
            provider: "NATURAL_KAIWA_ENGINE",
            model: "aoi-sensei-n3",
          },
        });
      }
      convId = conv.id;

      await prisma.aiMessage.create({
        data: { conversationId: conv.id, role: "user", content: message.trim() },
      });
    } catch (dbErr) {
      console.warn("[AI Chat DB Warning - Continuing with AI response]:", dbErr);
    }

    let aiResponse = "";

  // Only accept client-supplied API keys when explicitly enabled or in dev/test,
  // and never mix unvalidated strings into server key pools.
  const allowClientKeys =
    process.env.ALLOW_CLIENT_AI_KEYS === "true" || process.env.NODE_ENV !== "production";

  const rawKeySources = [
    process.env.GEMINI_API_KEY,
    process.env.GROQ_API_KEY,
    process.env.OPENROUTER_API_KEY,
    process.env.GROK_API_KEY,
    process.env.XAI_API_KEY,
    ...(allowClientKeys
      ? [req.headers.get("x-gemini-key"), req.headers.get("x-groq-key"), apiKey, req.headers.get("x-grok-key")]
      : []),
  ]
    .filter(Boolean)
    .join("\n");

  const getKeyPriority = (k: string): number => {
    if (k.startsWith("AIza") || k.startsWith("AQ.")) return 1; // 1. Gemini
    if (k.startsWith("gsk_")) return 2;                       // 2. Groq
    if (k.startsWith("sk-or-")) return 3;                     // 3. OpenRouter
    if (k.startsWith("xai-")) return 4;                       // 4. xAI Grok
    return 5;
  };

  // Sort strictly by priority: Gemini (1) -> Groq (2) -> OpenRouter (3) -> Grok (4)
  const keyList = Array.from(
    new Set(
      rawKeySources
        .split(/[\s,;\n]+/)
        .map((k) => k.trim().replace(/^["']|["']$/g, ""))
        .filter((k) => VALID_KEY_PATTERN.test(k)),
    ),
  )
    .sort((a, b) => getKeyPriority(a) - getKeyPriority(b))
    .slice(0, 6);

  if (keyList.length > 0) {
    try {
      const dbHistory = await prisma.aiMessage
        .findMany({
          where: { conversationId: convId },
          orderBy: { createdAt: "desc" },
          take: 20,
        })
        .catch(() => []);
      dbHistory.reverse();

      const trustedClientHistory = Array.isArray(clientHistory)
        ? clientHistory
            .slice(-20)
            .filter((m) => typeof m?.content === "string" && m.content.length <= 4000)
        : [];

      const history: { role: string; content: string }[] =
        trustedClientHistory.length > 0
          ? [...trustedClientHistory, { role: "user", content: message.trim() }]
          : [
              ...dbHistory.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: message.trim() },
            ];

      const nativeLangName = getLanguageName(nativeLanguage);
      const mistakesSnippet = userMistakes
        ? formatMistakesForAiPrompt(userMistakes, nativeLangName)
        : "";

      const progressLevel = effectiveProgress?.userLevel || "N5";
      const progressTier = effectiveProgress?.level || 1;
      const progressXP = effectiveProgress?.totalXP ?? 0;
      const progressStreak = effectiveProgress?.currentStreak ?? 0;
      const progressDone =
        effectiveProgress?.stats?.completedLessonsCount ??
        effectiveProgress?.completedLessonsCount ??
        0;
      const progressTotal =
        effectiveProgress?.stats?.totalLessonsInLevel ??
        effectiveProgress?.totalLessonsInLevel ??
        50;
      const progressDue =
        effectiveProgress?.stats?.dueReviewCount ??
        effectiveProgress?.dueReviewCount ??
        0;
      const progressAccuracy =
        effectiveProgress?.stats?.reviewAccuracy ??
        effectiveProgress?.accuracyPercent ??
        100;

      const progressSnippet = effectiveProgress
        ? `\nTHÔNG TIN TIẾN TRÌNH HỌC TẬP THỰC TẾ CỦA HỌC VIÊN:
- Trình độ JLPT hiện tại: ${progressLevel} (Cấp độ Level ${progressTier})
- Tổng tích lũy XP: ${progressXP} XP
- Chuỗi Streak học tập: ${progressStreak} ngày liên tiếp
- Bài học đã hoàn thành: ${progressDone}/${progressTotal} bài học
- Thẻ từ vựng SRS cần ôn tập hôm nay: ${progressDue} thẻ
- Tỷ lệ làm bài chính xác: ${progressAccuracy}%
- Ngôn ngữ mẹ đẻ (Native Language) của học viên: ${nativeLangName} (${nativeLanguage}).`
        : `\nNgôn ngữ mẹ đẻ của học viên: ${nativeLangName} (${nativeLanguage}).`;

      const baseInstruction =
        scenarioId === "business_horenso"
          ? `Bạn là Tanaka Senpai (hoặc Aoi Sensei) tại công ty Nhật Bản. Hãy trò chuyện trực tiếp bằng tiếng Nhật lịch sự công sở N3 (Keigo/Desu/Masu). Luôn trả lời tự nhiên như người thật (2-3 câu), kèm giải thích và dịch nghĩa bằng ${nativeLangName} súc tích bên dưới.`
          : scenarioId === "casual_friends"
            ? `Bạn là Aoi-chan, bạn thân người Nhật. Hãy trò chuyện như người thật bằng tiếng Nhật thể ngắn (タメ口), dùng thán từ tự nhiên (マジで？, そうなんだ, やばい, めっちゃ). Kèm dịch nghĩa bằng ${nativeLangName} bên dưới.`
            : scenarioId === "travel_restaurant"
              ? `Bạn là nhân viên nhà hàng / hướng dẫn viên du lịch Nhật Bản. Hãy trò chuyện nhã nhặn, tự nhiên kèm dịch nghĩa bằng ${nativeLangName}.`
              : `Bạn là Kawaii AI Sensei (Aoi Sensei 🌸 / Ren Sensei 🦊) - trợ lý học tập cá nhân tận tâm, thấu hiểu tiến trình và sư phạm thông minh tại Nihon Quest.`;

      const systemPrompt = `${baseInstruction}${progressSnippet}${mistakesSnippet}
VAI TRÒ VÀ NGUYÊN TẮC CỦA TRỢ LÝ HỌC TẬP (AI SENSEI):
1. Bạn là TRỢ LÝ ĐỒNG HÀNH THÔNG MINH, KHÔNG PHẢI chatbot vô hồn:
   - Hãy quan tâm đến tiến trình học tập của học viên: khen ngợi khi có streak tốt, nhắc nhở nhẹ nhàng nếu có thẻ SRS đang đến hạn ôn tập (${progressDue} thẻ).
   - Khi học viên hỏi "hôm nay học gì", "gợi ý học", "tiến độ thế nào", hãy đưa ra lời khuyên cụ thể, thực tế theo đúng dữ liệu học tập bên trên.
   - Khi học viên hỏi về "lỗi sai", "tại sao sai", "khắc phục", hoặc cần ôn luyện, hãy trực tiếp dựa vào THÔNG TIN CHI TIẾT VỀ LỖI SAI VÀ ĐIỂM YẾU ở trên để chỉ dẫn cặn kẽ, giải thích cội nguồn nhầm lẫn và cho bài tập thực hành sửa sai ngay!
   - Giải thích từ vựng, ngữ pháp, trợ từ cặn kẽ và dịch nghĩa rõ ràng bằng ngôn ngữ mẹ đẻ của học viên (${nativeLangName}).
2. Phong cách:
   - Thân thiện, đáng yêu, ấm áp (Kawaii Sensei), dùng emoji phù hợp 🌸✨🎌.
   - Luôn kèm câu thoại tiếng Nhật tự nhiên (có Kanji + Hiragana) và bản dịch ${nativeLangName} bên dưới.`;

      let aiSuccess = false;

      for (const currentKey of keyList) {
        if (aiSuccess) break;

        if (currentKey.startsWith("xai-")) {
          const grokMessages = [
            { role: "system", content: systemPrompt },
            ...history.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          ];

          const grokModels = ["grok-2-latest", "grok-beta"];

          for (const grModel of grokModels) {
            if (aiSuccess) break;
            try {
              const grRes = await fetch("https://api.x.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${currentKey}`,
                },
                body: JSON.stringify({
                  model: grModel,
                  messages: grokMessages,
                  temperature: 0.85,
                  max_tokens: 1024,
                }),
                signal: AbortSignal.timeout(9000),
              });

              if (grRes.ok) {
                const grData = await grRes.json();
                const textResult = grData?.choices?.[0]?.message?.content;
                if (textResult && textResult.trim().length > 0) {
                  aiResponse = textResult.trim();
                  aiSuccess = true;
                  await prisma.aiConversation
                    .update({
                      where: { id: convId },
                      data: { provider: "XAI_GROK", model: grModel },
                    })
                    .catch(() => {});
                  break;
                }
              }
            } catch {
              // Fall through to next model
            }
          }
        } else if (currentKey.startsWith("gsk_")) {
          const groqMessages = [
            { role: "system", content: systemPrompt },
            ...history.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          ];

          const groqModels = ["qwen/qwen3.8-27b", "openai/gpt-oss-120b"];

          for (const gModel of groqModels) {
            if (aiSuccess) break;
            try {
              const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${currentKey}`,
                },
                body: JSON.stringify({
                  model: gModel,
                  messages: groqMessages,
                  temperature: 0.85,
                  max_tokens: 512,
                }),
                signal: AbortSignal.timeout(9000),
              });

              if (groqRes.ok) {
                const groqData = await groqRes.json();
                const textResult = groqData?.choices?.[0]?.message?.content;
                if (textResult && textResult.trim().length > 0) {
                  aiResponse = textResult.trim();
                  aiSuccess = true;
                  await prisma.aiConversation
                    .update({
                      where: { id: convId },
                      data: { provider: "GROQ", model: gModel },
                    })
                    .catch(() => {});
                  break;
                }
              }
            } catch {
              // Fall through to next model/provider
            }
          }
        } else if (currentKey.startsWith("sk-or-")) {
          const orModels = [
            "deepseek/deepseek-chat",
            "meta-llama/llama-3.3-70b-instruct:free",
            "google/gemini-2.0-flash-exp:free",
            "qwen/qwen-2.5-72b-instruct:free",
          ];

          const orMessages = [
            { role: "system", content: systemPrompt },
            ...history.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          ];

          for (const orModel of orModels) {
            if (aiSuccess) break;
            try {
              const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${currentKey}`,
                },
                body: JSON.stringify({
                  model: orModel,
                  messages: orMessages,
                  temperature: 0.85,
                  max_tokens: 1024,
                }),
                signal: AbortSignal.timeout(9000),
              });

              if (orRes.ok) {
                const orData = await orRes.json();
                const textResult = orData?.choices?.[0]?.message?.content;
                if (textResult && textResult.trim().length > 0) {
                  aiResponse = textResult.trim();
                  aiSuccess = true;
                  await prisma.aiConversation
                    .update({
                      where: { id: convId },
                      data: { provider: "OPENROUTER", model: orModel },
                    })
                    .catch(() => {});
                  break;
                }
              }
            } catch {
              // Fall through to next model
            }
          }
        } else {
          const geminiContents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
          for (const m of history) {
            const role = m.role === "assistant" ? "model" : "user";
            if (geminiContents.length > 0 && geminiContents[geminiContents.length - 1].role === role) {
              geminiContents[geminiContents.length - 1].parts[0].text += `\n${m.content}`;
            } else {
              geminiContents.push({ role, parts: [{ text: m.content }] });
            }
          }

          while (geminiContents.length > 0 && geminiContents[0].role !== "user") {
            geminiContents.shift();
          }

          if (geminiContents.length === 0) {
            geminiContents.push({ role: "user", parts: [{ text: message }] });
          }

          const payload = {
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: geminiContents,
            generationConfig: { temperature: 0.85, maxOutputTokens: 1024 },
          };

          const requestedModel =
            typeof (body as { model?: unknown }).model === "string"
              ? (body as { model: string }).model.trim()
              : "";
          const isValidGeminiModel = /^gemini-[a-zA-Z0-9.-]+$/.test(requestedModel);
          const clientModel = isValidGeminiModel ? requestedModel : undefined;

          const modelsToTry = Array.from(
            new Set([clientModel, "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b"].filter(Boolean) as string[]),
          );

          for (const modelName of modelsToTry) {
            if (aiSuccess) break;
            try {
              const geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${currentKey}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                  signal: AbortSignal.timeout(9000),
                },
              );

              if (geminiRes.ok) {
                const geminiData = await geminiRes.json();
                const textResult = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (textResult && textResult.trim().length > 0) {
                  aiResponse = textResult.trim();
                  aiSuccess = true;
                  await prisma.aiConversation
                    .update({
                      where: { id: convId },
                      data: { provider: "GOOGLE_GEMINI", model: modelName },
                    })
                    .catch(() => {});
                  break;
                }
              }
            } catch {
              // Fall through to next model
            }
          }
        }
      }

      if (!aiSuccess) {
        aiResponse = generateNaturalJapaneseResponse({
          scenarioId,
          userMessage: message,
          userProgress: effectiveProgress,
          mistakes: userMistakes,
          nativeLanguage,
        });
      }
    } catch (err) {
      console.error("[AI Chat Route Error]:", (err as Error)?.message || err);
      aiResponse = generateNaturalJapaneseResponse({
        scenarioId,
        userMessage: message,
        userProgress: effectiveProgress,
        mistakes: userMistakes,
        nativeLanguage,
      });
    }
  } else {
    aiResponse = generateNaturalJapaneseResponse({
      scenarioId,
      userMessage: message,
      userProgress: effectiveProgress,
      mistakes: userMistakes,
      nativeLanguage,
    });
  }

    let savedMsgId = "msg-" + Date.now();
    try {
      const aiMsg = await prisma.aiMessage.create({
        data: { conversationId: convId, role: "assistant", content: aiResponse },
      });
      savedMsgId = aiMsg.id;

      await prisma.aiConversation.update({
        where: { id: convId },
        data: { updatedAt: new Date() },
      });
    } catch (dbSaveErr) {
      console.warn("[AI Chat DB Save Warning]:", dbSaveErr);
    }

    return NextResponse.json({
      conversationId: convId,
      message: {
        id: savedMsgId,
        role: "assistant",
        content: aiResponse,
        createdAt: new Date().toISOString(),
      },
      aiDisclaimer: "Phản hồi được tạo bởi AI hỗ trợ luyện hội thoại — hãy đối chiếu với bài học chuẩn khi ôn thi JLPT.",
    });
  } catch (globalErr) {
    console.error("[AI Chat Global Fallback]:", globalErr);
    const fallbackText = generateNaturalJapaneseResponse({
      scenarioId: "assistant_guide",
      userMessage: "Konnichiwa",
      nativeLanguage: "vi",
    });
    return NextResponse.json({
      conversationId: "fallback-" + Date.now(),
      message: {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: fallbackText,
        createdAt: new Date().toISOString(),
      },
      aiDisclaimer: "Phản hồi dự phòng từ trợ lý AI Kawaii Sensei.",
    });
  }
}
