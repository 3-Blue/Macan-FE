/**
 * Client-side cookie-consent store.
 *
 * Consent lives in a first-party cookie and is read entirely on the client, so
 * pages stay statically renderable (no cookies() in the server layout). The
 * banner and the analytics loader both subscribe here, so accepting/declining
 * updates the UI immediately — no page reload.
 */

export const CONSENT_COOKIE_NAME = "cookie-consent";
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 365 days

export type ConsentValue = "accepted" | "declined";

const listeners = new Set<() => void>();

export function getConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`),
  );
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === "accepted" || value === "declined" ? value : null;
}

export function setConsent(value: ConsentValue): void {
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax`;
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  // Sync across tabs.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
