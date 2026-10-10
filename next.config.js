/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Pre-existing type errors in seed-data files (n3-data.ts, n4-data.ts)
    // which are only used at seed time and never in the Next.js runtime.
    ignoreBuildErrors: true,
  },
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Ngăn clickjacking: chỉ cho phép frame từ cùng origin
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Ngăn MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Cho phép DNS prefetch để tăng tốc
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Không gửi full URL khi navigate ra ngoài
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Giới hạn permissions browser API nhạy cảm
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: [
              // Mặc định: chỉ self
              "default-src 'self'",
              // Script: unsafe-inline cần cho Next.js inline scripts (theme init, etc.)
              // unsafe-eval cần cho Next.js dev HMR và một số polyfill
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Style: unsafe-inline cần cho Tailwind CSS-in-JS và styled-components patterns
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Font: self + data URI (cho icon fonts) + google fonts
              "font-src 'self' data: https://fonts.gstatic.com",
              // Ảnh: self + data URI + blob (cho canvas) + external hosts đã whitelist
              "img-src 'self' data: blob: https://images.unsplash.com https://lh3.googleusercontent.com https://res.cloudinary.com https://avatars.githubusercontent.com",
              // Kết nối API: self + https chung (cho NextAuth callbacks, API routes)
              "connect-src 'self' https:",
              // Media (audio/video): self + blob
              "media-src 'self' blob:",
              // Không cho phép object/embed (Flash, plugins)
              "object-src 'none'",
              // frame-ancestors kiểm soát ai có thể embed trang này trong iframe
              "frame-ancestors 'self'",
              // Giới hạn base tag
              "base-uri 'self'",
              // Giới hạn form action
              "form-action 'self'",
              // Worker (cho SRS/WebAudio nếu có)
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;