"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTabe } from "@/app/components/ThemeProvider";

const DEMO_TEXT = `Causal inference has fundamentally transformed how economists evaluate complex policies. When a government introduces a new minimum wage law, researchers must determine whether observed employment changes actually result from the policy itself, or whether they reflect broader economic trends that happened to coincide with the legislation.

Double Machine Learning addresses this challenge by using cross-fitting and regularised regression to partial out the influence of high-dimensional controls before estimating treatment effects. A single study using these methods can influence millions of policy decisions across dozens of jurisdictions.

The core insight is deceptively simple: correlation between two variables tells us nothing about causation unless we have carefully constructed the identification strategy. Economists who understand this distinction produce research that genuinely moves the needle.`;

type TaggedToken = { text: string; tag: "noun" | "verb" | "adj" | "num" | "plain"; space?: boolean };

async function tabeTag(text: string): Promise<TaggedToken[]> {
  const nlp = (await import("compromise")).default;
  const doc = nlp(text);
  const tokens: TaggedToken[] = [];

  doc.terms().forEach((term: { text: () => string; has: (t: string) => boolean }) => {
    const raw = term.text();
    if (!raw.trim()) { tokens.push({ text: raw, tag: "plain" }); return; }
    let tag: TaggedToken["tag"] = "plain";
    if (term.has("#Value") || term.has("#NumericValue") || /^\d[\d,\.%$]*$/.test(raw)) tag = "num";
    else if (term.has("#Noun") || term.has("#ProperNoun")) tag = "noun";
    else if (term.has("#Verb")) tag = "verb";
    else if (term.has("#Adjective") || term.has("#Adverb")) tag = "adj";
    tokens.push({ text: raw, tag });
  });
  return tokens;
}

function renderTagged(tokens: TaggedToken[]) {
  return tokens.map((tok, i) => {
    const after = " ";
    if (tok.tag === "plain") return tok.text + after;
    return (
      <span key={i} className={`tabe-${tok.tag}`}>
        {tok.text}
        {after}
      </span>
    );
  });
}

export default function ToolsPage() {
  const { tabeActive, toggleTabe } = useTabe();
  const [tagged, setTagged] = useState<TaggedToken[] | null>(null);
  const [processing, setProcessing] = useState(false);
  const [userText, setUserText] = useState(DEMO_TEXT);
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasTaggedRef = useRef(false);

  const processText = useCallback(async (text: string) => {
    setProcessing(true);
    setTagged(null);
    hasTaggedRef.current = false;
    try {
      const result = await tabeTag(text);
      setTagged(result);
      hasTaggedRef.current = true;
    } finally {
      setProcessing(false);
    }
  }, []);

  // When tabeActive turns on for the first time, kick off NLP
  useEffect(() => {
    if (tabeActive && !hasTaggedRef.current && !processing) {
      processText(userText);
    }
  }, [tabeActive, userText, processing, processText]);

  // handleToggle: just flip the global state — useEffect above handles NLP
  const handleToggle = () => {
    toggleTabe();
  };

  const handleApply = () => {
    // Re-process with new text; ensure TABE is on
    processText(userText);
    if (!tabeActive) toggleTabe();
    setEditMode(false);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
          Open Source · Accessibility
        </p>
        <h1
          className="font-serif font-light mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
        >
          CantRead
        </h1>
        <p className="font-serif text-lg" style={{ color: "var(--text-secondary)", maxWidth: "52ch" }}>
          For brains that bounce off walls of text. TABE (Type-Annotated Body of Evidence) colour-codes language
          so readers can navigate dense academic prose at a glance.
        </p>
      </div>

      {/* ── What is TABE ──────────────────────────────────────── */}
      <div className="py-16 grid md:grid-cols-2 gap-12 border-b" style={{ borderColor: "var(--border)" }}>
        <div>
          <h2 className="font-serif font-light mb-4" style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>
            The TABE system
          </h2>
          <p className="font-serif leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            I developed this format while taking networking notes during job hunting. Turns out it works for
            anyone who finds dense text hard to parse — including people with ADHD, dyslexia, or just too
            many browser tabs open.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            One consistent annotation format, applied anywhere: documents, papers, RSS feeds, PDFs.
            The brain learns the visual grammar fast, then stops having to re-read sentences.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4">
          {[
            { cls: "tabe-noun", label: "Bold", desc: "Nouns — the things, entities, concepts that carry the argument" },
            { cls: "tabe-verb", label: "Yellow highlight", desc: "Verbs — the actions, states, changes that drive the sentence" },
            { cls: "tabe-adj",  label: "Italic green", desc: "Adjectives / adverbs — modifiers you can often skim first" },
            { cls: "tabe-num", label: "Orange", desc: "Numbers, statistics, dates — instantly scannable at a glance" },
          ].map(({ cls, label, desc }) => (
            <div key={cls} className="flex items-start gap-4">
              <div
                className="shrink-0 w-8 h-8 flex items-center justify-center text-sm font-serif tabe-mode"
                style={{ backgroundColor: "var(--bg-subtle)", border: "0.5px solid var(--border)" }}
              >
                <span className={cls}>Aa</span>
              </div>
              <div>
                <p className="text-sm font-sans font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Live demo ─────────────────────────────────────────── */}
      <div ref={scrollRef} className="scroll-reveal pt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif font-light" style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>
            Try it live
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditMode((v) => !v)}
              className="text-xs font-sans px-3 py-1.5 border transition-colors duration-150"
              style={{
                borderColor: editMode ? "var(--accent)" : "var(--border)",
                color: editMode ? "var(--accent)" : "var(--text-tertiary)",
              }}
            >
              {editMode ? "Cancel" : "Paste your own text"}
            </button>

            {/* Main toggle */}
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 text-xs font-sans px-4 py-1.5 border transition-all duration-200"
              style={{
                borderColor: tabeActive ? "var(--accent)" : "var(--border-strong)",
                backgroundColor: tabeActive ? "var(--accent)" : "transparent",
                color: tabeActive ? "#fff" : "var(--text-secondary)",
              }}
            >
              {processing ? (
                <><SpinnerIcon /> Processing…</>
              ) : (
                <>{tabeActive ? "TABE On" : "Enable TABE"}</>
              )}
            </button>
          </div>
        </div>

        {/* Edit panel */}
        {editMode && (
          <div className="mb-4">
            <textarea
              ref={textareaRef}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              rows={8}
              className="w-full p-4 font-serif text-sm leading-relaxed resize-y border focus:outline-none focus:border-[var(--accent)] transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              placeholder="Paste any English text here…"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleApply}
                className="text-xs font-sans px-4 py-2 transition-colors duration-150"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                Apply TABE →
              </button>
            </div>
          </div>
        )}

        {/* Text display — tabe-mode class is also on html, CSS handles colours */}
        <div
          className="p-8 md:p-10 border font-serif leading-[1.85] transition-all duration-300 tabe-mode"
          style={{
            borderColor: tabeActive ? "var(--accent)" : "var(--border)",
            backgroundColor: "var(--surface)",
            fontSize: "1.0625rem",
          }}
        >
          {/* TABE legend strip — visible when tabeActive */}
          {tabeActive && (
            <div
              className="flex flex-wrap gap-x-5 gap-y-1 items-center text-2xs font-sans mb-6 pb-4 border-b"
              style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}
            >
              <span>Legend:</span>
              <span className="tabe-noun">Bold = noun</span>
              <span className="tabe-verb">Yellow = verb</span>
              <span className="tabe-adj">Italic green = adj</span>
              <span className="tabe-num">Orange = number</span>
            </div>
          )}

          {/* Paragraphs — always render tagged spans once available;
              html.tabe-mode CSS drives whether colours show */}
          {userText.split("\n\n").map((para, pi) => {
            if (!tagged) {
              return (
                <p key={pi} className={pi > 0 ? "mt-6" : ""}>
                  {processing ? <span style={{ opacity: 0.5 }}>{para}</span> : para}
                </p>
              );
            }
            const total = tagged.length;
            const paras = userText.split("\n\n").length;
            const perPara = Math.ceil(total / paras);
            const slice = tagged.filter((_, i) => i >= pi * perPara && i < (pi + 1) * perPara);
            return (
              <p key={pi} className={pi > 0 ? "mt-6" : ""}>
                {renderTagged(slice)}
              </p>
            );
          })}
        </div>

        <p className="text-xs font-sans mt-3" style={{ color: "var(--text-tertiary)" }}>
          Powered by{" "}
          <a href="https://github.com/spencermountain/compromise" target="_blank" rel="noopener noreferrer" className="link-underline" style={{ color: "var(--accent)" }}>
            compromise.js
          </a>{" "}
          — NLP runs entirely in your browser, nothing is sent to a server.
        </p>
      </div>

      {/* ── Integration in papers ─────────────────────────────── */}
      <div className="mt-20 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>
          Integrated throughout this site
        </p>
        <p className="font-serif" style={{ color: "var(--text-secondary)", maxWidth: "52ch" }}>
          Every paper on this site has a{" "}
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Reading mode</span> button in the header.
          Toggle it on any paper to activate TABE — the NLP runs locally in your browser.
        </p>
        <div className="mt-4">
          <a
            href="/writing"
            className="text-sm link-underline"
            style={{ color: "var(--accent)" }}
          >
            Browse papers →
          </a>
        </div>
      </div>

      {/* ── GitHub / open source ──────────────────────────────── */}
      <div
        className="mt-16 p-8 border"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 shrink-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
          >
            <GitHubIcon />
          </div>
          <div>
            <p className="font-serif text-lg mb-1" style={{ color: "var(--text-primary)" }}>Open source</p>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              CantRead is open source. Contributions especially welcome for non-English language support
              and dictionary expansions.
            </p>
            <a
              href="https://github.com/oldmercy/CantRead"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm link-underline"
              style={{ color: "var(--accent)" }}
            >
              github.com/oldmercy/CantRead →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" className="animate-spin"
    >
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
