import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Tự động bật AUTH_TRUST_HOST để NextAuth tự đọc request host header khi dùng ngrok / cloudflared / vercel / netlify / local IP
if (!process.env.AUTH_TRUST_HOST) {
  process.env.AUTH_TRUST_HOST = "true";
}

// Tự động nhận diện URL trên Netlify hoặc Vercel nếu người dùng chưa set NEXTAUTH_URL
if (!process.env.NEXTAUTH_URL) {
  if (process.env.URL) {
    process.env.NEXTAUTH_URL = process.env.URL.replace(/\/$/, "");
  } else if (process.env.DEPLOY_PRIME_URL) {
    process.env.NEXTAUTH_URL = process.env.DEPLOY_PRIME_URL.replace(/\/$/, "");
  } else if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
});

function requiredSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 32) {
    console.warn(
      "[NextAuth Warning] NEXTAUTH_SECRET is missing or shorter than 32 characters. Falling back to default secret to prevent crash.",
    );
    return process.env.NEXTAUTH_SECRET || "dev-only-change-me-min-32-chars-long-secret";
  }
  return secret;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: requiredSecret(),
  pages: { signIn: "/login", newUser: "/onboarding" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
            checks: ["state"],
            authorization: {
              params: {
                access_type: "offline",
                prompt: "consent",
              },
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 1. Cho phép các đường dẫn tương đối (vd: "/app", "/onboarding")
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // 2. Cho phép redirect nếu cùng origin/domain (kể cả ngrok, cloudflared, custom domain)
      try {
        const targetUrl = new URL(url);
        const baseObj = new URL(baseUrl);
        if (targetUrl.host === baseObj.host) {
          return url;
        }
      } catch {
        // url không hợp lệ
      }
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id: string }).id;
      }
      // Bảo vệ kích thước Cookie trên Vercel/Netlify:
      // Tuyệt đối không lưu avatar base64 hoặc dữ liệu lớn vào JWT để tránh lỗi 494 REQUEST_HEADER_TOO_LARGE
      if (typeof token.picture === "string" && (token.picture.startsWith("data:") || token.picture.length > 256)) {
        delete token.picture;
      }
      if ("image" in token && (typeof token.image !== "string" || (token.image as string).startsWith("data:") || (token.image as string).length > 256)) {
        delete (token as Record<string, unknown>).image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as { id?: string }).id = token.uid as string;
      }
      // Đảm bảo session không chứa base64
      if (
        session.user &&
        typeof session.user.image === "string" &&
        (session.user.image.startsWith("data:") || session.user.image.length > 256)
      ) {
        session.user.image = null;
      }
      return session;
    },
  },
  useSecureCookies:
    process.env.NODE_ENV === "production" &&
    Boolean(
      process.env.VERCEL ||
      process.env.NEXTAUTH_URL?.startsWith("https://") ||
      process.env.URL?.startsWith("https://") ||
      process.env.DEPLOY_PRIME_URL?.startsWith("https://")
    ),
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production" &&
        Boolean(
          process.env.VERCEL ||
          process.env.NEXTAUTH_URL?.startsWith("https://") ||
          process.env.URL?.startsWith("https://") ||
          process.env.DEPLOY_PRIME_URL?.startsWith("https://")
        )
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure:
          process.env.NODE_ENV === "production" &&
          Boolean(
            process.env.VERCEL ||
            process.env.NEXTAUTH_URL?.startsWith("https://") ||
            process.env.URL?.startsWith("https://") ||
            process.env.DEPLOY_PRIME_URL?.startsWith("https://")
          ),
      },
    },
    callbackUrl: {
      name:
        process.env.NODE_ENV === "production" &&
        Boolean(
          process.env.VERCEL ||
          process.env.NEXTAUTH_URL?.startsWith("https://") ||
          process.env.URL?.startsWith("https://") ||
          process.env.DEPLOY_PRIME_URL?.startsWith("https://")
        )
          ? "__Secure-next-auth.callback-url"
          : "next-auth.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure:
          process.env.NODE_ENV === "production" &&
          Boolean(
            process.env.VERCEL ||
            process.env.NEXTAUTH_URL?.startsWith("https://") ||
            process.env.URL?.startsWith("https://") ||
            process.env.DEPLOY_PRIME_URL?.startsWith("https://")
          ),
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === "production" &&
        Boolean(
          process.env.VERCEL ||
          process.env.NEXTAUTH_URL?.startsWith("https://") ||
          process.env.URL?.startsWith("https://") ||
          process.env.DEPLOY_PRIME_URL?.startsWith("https://")
        )
          ? "__Host-next-auth.csrf-token"
          : "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure:
          process.env.NODE_ENV === "production" &&
          Boolean(
            process.env.VERCEL ||
            process.env.NEXTAUTH_URL?.startsWith("https://") ||
            process.env.URL?.startsWith("https://") ||
            process.env.DEPLOY_PRIME_URL?.startsWith("https://")
          ),
      },
    },
    pkceCodeVerifier: {
      name:
        process.env.NODE_ENV === "production" &&
        Boolean(
          process.env.VERCEL ||
          process.env.NEXTAUTH_URL?.startsWith("https://") ||
          process.env.URL?.startsWith("https://") ||
          process.env.DEPLOY_PRIME_URL?.startsWith("https://")
        )
          ? "__Secure-next-auth.pkce.code_verifier"
          : "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure:
          process.env.NODE_ENV === "production" &&
          Boolean(
            process.env.VERCEL ||
            process.env.NEXTAUTH_URL?.startsWith("https://") ||
            process.env.URL?.startsWith("https://") ||
            process.env.DEPLOY_PRIME_URL?.startsWith("https://")
          ),
        maxAge: 60 * 15,
      },
    },
    state: {
      name:
        process.env.NODE_ENV === "production" &&
        Boolean(
          process.env.VERCEL ||
          process.env.NEXTAUTH_URL?.startsWith("https://") ||
          process.env.URL?.startsWith("https://") ||
          process.env.DEPLOY_PRIME_URL?.startsWith("https://")
        )
          ? "__Secure-next-auth.state"
          : "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure:
          process.env.NODE_ENV === "production" &&
          Boolean(
            process.env.VERCEL ||
            process.env.NEXTAUTH_URL?.startsWith("https://") ||
            process.env.URL?.startsWith("https://") ||
            process.env.DEPLOY_PRIME_URL?.startsWith("https://")
          ),
        maxAge: 60 * 15,
      },
    },
  },
  logger: {
    error(code, metadata) {
      console.error("[NextAuth Error]", code, metadata);
    },
    warn(code) {
      console.warn("[NextAuth Warning]", code);
    },
  },
};
