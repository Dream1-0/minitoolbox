import { useEffect, useState } from "react";
import { PRO_KEYS } from "./pro-keys";

export const PRO_STORAGE_KEY = "mtb-pro-license";
export const PRO_EVENT = "mtb-pro-change";

export function normalizeKey(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function isProKeyValid(key: string): boolean {
  return PRO_KEYS.has(normalizeKey(key));
}

/** Returns the stored license key if present and valid, else null. */
export function getStoredLicense(): string | null {
  if (typeof window === "undefined") return null;
  const key = localStorage.getItem(PRO_STORAGE_KEY);
  return key && isProKeyValid(key) ? key : null;
}

export function activatePro(raw: string): boolean {
  const key = normalizeKey(raw);
  if (!PRO_KEYS.has(key)) return false;
  localStorage.setItem(PRO_STORAGE_KEY, key);
  window.dispatchEvent(new Event(PRO_EVENT));
  return true;
}

export function deactivatePro(): void {
  localStorage.removeItem(PRO_STORAGE_KEY);
  window.dispatchEvent(new Event(PRO_EVENT));
}

/** React hook: true when a valid Pro license is activated in this browser. */
export function usePro(): boolean {
  const [pro, setPro] = useState(false);
  useEffect(() => {
    const sync = () => setPro(getStoredLicense() !== null);
    sync();
    window.addEventListener(PRO_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PRO_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return pro;
}
