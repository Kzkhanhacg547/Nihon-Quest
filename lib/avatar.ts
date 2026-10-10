/**
 * Helper to determine whether an avatar string represents an image URL or data URI
 * (e.g. http://, https://, /, or data:image/... base64 data URLs)
 * vs an emoji or fallback text character.
 */
export function isImageAvatar(avatar?: string | null): boolean {
  if (!avatar || typeof avatar !== "string") return false;
  const trimmed = avatar.trim();
  return (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:image/") || (trimmed.length > 100 && !trimmed.includes(" "))
  );
}


