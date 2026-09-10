import * as React from "react";

// Minimal next-themes replacement.
//
// Contract shared with the pre-paint inline script in Layout.astro:
// - localStorage key "theme" holds "light" | "dark" | "system" (missing = default "dark")
// - the resolved theme is applied as a "dark" class on <html>
export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";

const listeners = new Set<() => void>();

function systemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : DEFAULT_THEME;
}

export function resolveTheme(theme: Theme = getTheme()): "light" | "dark" {
  return theme === "system" ? systemTheme() : theme;
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

export function setTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMedia = () => {
    if (getTheme() === "system") {
      applyTheme("system");
      fn();
    }
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      applyTheme(getTheme());
      fn();
    }
  };
  media.addEventListener("change", onMedia);
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(fn);
    media.removeEventListener("change", onMedia);
    window.removeEventListener("storage", onStorage);
  };
}

export function useTheme() {
  const theme = React.useSyncExternalStore(
    subscribe,
    () => getTheme(),
    () => DEFAULT_THEME
  );
  const resolvedTheme = React.useSyncExternalStore(
    subscribe,
    () => resolveTheme(),
    () => "dark" as const
  );

  return { theme, resolvedTheme, setTheme };
}
