"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface SiteCtxValue {
  theme: Theme;
  toggleTheme: () => void;
  tabeActive: boolean;
  toggleTabe: () => void;
}

const SiteCtx = createContext<SiteCtxValue>({
  theme: "light",
  toggleTheme: () => {},
  tabeActive: false,
  toggleTabe: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with defaults that match SSR output — prevents hydration mismatch.
  // Real values are read from localStorage after mount.
  const [theme, setTheme] = useState<Theme>("light");
  const [tabeActive, setTabeActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    const storedTabe = localStorage.getItem("tabe") === "1";
    setTabeActive(storedTabe);
    document.documentElement.classList.toggle("tabe-mode", storedTabe);

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  const toggleTabe = () => {
    setTabeActive((prev) => {
      const next = !prev;
      localStorage.setItem("tabe", next ? "1" : "0");
      document.documentElement.classList.toggle("tabe-mode", next);
      return next;
    });
  };

  // Before mount: expose defaults so every consumer renders identically
  // to the server — zero hydration mismatch.
  const ctxValue: SiteCtxValue = mounted
    ? { theme, toggleTheme, tabeActive, toggleTabe }
    : { theme: "light", toggleTheme, tabeActive: false, toggleTabe };

  return (
    <SiteCtx.Provider value={ctxValue}>
      {children}
    </SiteCtx.Provider>
  );
}

export function useTheme() {
  const { theme, toggleTheme } = useContext(SiteCtx);
  return { theme, toggle: toggleTheme };
}

export function useTabe() {
  const { tabeActive, toggleTabe } = useContext(SiteCtx);
  return { tabeActive, toggleTabe };
}
