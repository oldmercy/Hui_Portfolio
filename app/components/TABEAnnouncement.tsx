"use client";

import { useEffect, useState } from "react";

export function TABEAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check localStorage on client side only
    const dismissed = localStorage.getItem("tabe-announcement-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("tabe-announcement-dismissed", "true");
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div
      className="w-full px-6 py-3 md:py-4 border-b transition-all duration-200"
      style={{ borderColor: "var(--border)", backgroundColor: "color-mix(in srgb, var(--bg) 95%, var(--accent))" }}
    >
      <div className="max-w-5xl mx-auto flex items-start md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3 flex-1">
          <span className="text-lg md:text-xl" aria-hidden="true">📖</span>
          <div className="flex-1">
            <p className="text-xs md:text-sm font-sans font-medium" style={{ color: "var(--accent)" }}>
              Try TABE Reading Mode
            </p>
            <p className="text-xs md:text-sm font-sans leading-relaxed mt-0.5 md:mt-0" style={{ color: "var(--text-secondary)" }}>
              Color highlights nouns, verbs, and more to help you read faster. Click "Aa Reading" to try it.
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 p-1 text-lg hover:opacity-60 transition-opacity"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
