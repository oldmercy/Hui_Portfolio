"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTabe } from "@/app/components/ThemeProvider";

type TaggedToken = { text: string; tag: "noun" | "verb" | "adj" | "num" | "plain" };

async function tagText(text: string): Promise<TaggedToken[]> {
  const nlp = (await import("compromise")).default;
  const doc = nlp(text);
  const tokens: TaggedToken[] = [];
  doc.terms().forEach((term: { text: () => string; has: (tag: string) => boolean }) => {
    const raw = term.text();
    if (!raw.trim()) { tokens.push({ text: raw, tag: "plain" }); return; }
    let tag: TaggedToken["tag"] = "plain";
    if (term.has("#Value") || term.has("#NumericValue") || /^\d[\d,\.%$]*$/.test(raw)) {
      tag = "num";
    } else if (term.has("#Noun") || term.has("#ProperNoun")) {
      tag = "noun";
    } else if (term.has("#Verb")) {
      tag = "verb";
    } else if (term.has("#Adjective") || term.has("#Adverb")) {
      tag = "adj";
    }
    tokens.push({ text: raw, tag });
  });
  return tokens;
}

function tokensToHTML(tokens: TaggedToken[]): string {
  return tokens
    .map((tok) =>
      tok.tag === "plain"
        ? tok.text + " "
        : `<span class="tabe-${tok.tag}">${tok.text} </span>`
    )
    .join("");
}

const SCAN_SELECTOR = "p, h1, h2, h3, h4, li, figcaption";
const ORIGINAL_ATTR = "data-tabe-orig";
const PROCESSED_ATTR = "data-tabe-global";

function getTargetElements(): Element[] {
  return Array.from(document.querySelectorAll(SCAN_SELECTOR)).filter((el) => {
    // Skip elements already managed by PaperReader
    if (el.closest("[data-tabe-reader]")) return false;
    // Skip empty nodes
    if (!el.textContent?.trim()) return false;
    // Skip elements that only contain other block elements (no direct text)
    const hasDirectText = Array.from(el.childNodes).some(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
    );
    if (!hasDirectText && el.children.length > 0) return false;
    return true;
  });
}

function restoreAll() {
  document.querySelectorAll(`[${PROCESSED_ATTR}]`).forEach((el) => {
    const orig = el.getAttribute(ORIGINAL_ATTR);
    if (orig !== null) (el as HTMLElement).innerHTML = orig;
    el.removeAttribute(ORIGINAL_ATTR);
    el.removeAttribute(PROCESSED_ATTR);
  });
}

async function processAll() {
  const elements = getTargetElements();
  // Process in batches to avoid blocking the main thread
  const BATCH = 10;
  for (let i = 0; i < elements.length; i += BATCH) {
    const batch = elements.slice(i, i + BATCH);
    await Promise.all(
      batch.map(async (el) => {
        const text = el.textContent ?? "";
        if (!text.trim()) return;
        const orig = (el as HTMLElement).innerHTML;
        const tokens = await tagText(text);
        el.setAttribute(ORIGINAL_ATTR, orig);
        el.setAttribute(PROCESSED_ATTR, "true");
        (el as HTMLElement).innerHTML = tokensToHTML(tokens);
      })
    );
    // Yield to browser between batches
    await new Promise((r) => setTimeout(r, 0));
  }
}

export default function GlobalTabe() {
  const { tabeActive } = useTabe();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // On pathname change: restore so stale elements don't linger, then re-process if active
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    restoreAll();
    if (tabeActive) {
      // Small delay for Next.js to finish rendering the new page
      const id = setTimeout(() => processAll(), 120);
      return () => clearTimeout(id);
    }
  }, [pathname, tabeActive]);

  // On tabeActive toggle
  useEffect(() => {
    if (tabeActive) {
      processAll();
    } else {
      restoreAll();
    }
  }, [tabeActive]);

  return null;
}
