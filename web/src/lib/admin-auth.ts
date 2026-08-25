import { createHash, timingSafeEqual } from "node:crypto";

const digest = (value: string) => createHash("sha256").update(value).digest();

const secureEqual = (left: string, right: string) => timingSafeEqual(digest(left), digest(right));

export const adminAuthConfigured = () => Boolean(process.env.AMSR_ADMIN_PASSWORD);

export const isAdminAuthorized = (authorization: string | null) => {
  const expectedPassword = process.env.AMSR_ADMIN_PASSWORD;
  const expectedUsername = process.env.AMSR_ADMIN_USERNAME ?? "admin";
  if (!expectedPassword || !authorization?.startsWith("Basic ")) return false;

  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 0) return false;

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    return secureEqual(username, expectedUsername) && secureEqual(password, expectedPassword);
  } catch {
    return false;
  }
};
