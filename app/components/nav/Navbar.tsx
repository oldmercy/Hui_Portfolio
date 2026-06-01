"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme, useTabe } from "../ThemeProvider";

const links = [
  { label: "Writing", href: "/writing" },
  { label: "Teaching", href: "/teaching" },
  { label: "Tools",   href: "/tools"   },
  { label: "About",   href: "/about"   },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/** 书法印章 logo — light/dark 各用不同图片 */
function SealLogo({ theme }: { theme: string }) {
  // _light 版适合浅色背景（深色印章），_dark 版适合深色背景（浅色印章）
  const src = theme === "dark"
    ? "/hui_calligraphy_CDW_logo_dark.png"
    : "/hui_calligraphy_CDW_logo_light.png";

  return (
    <img
      src={src}
      alt="Hwei seal"
      width={30}
      height={30}
      className="transition-opacity duration-200 group-hover:opacity-60"
      style={{ objectFit: "contain" }}
    />
  );
}

/** 全站 TABE 开关 — 常驻 Navbar */
function TabeToggle() {
  const { tabeActive, toggleTabe } = useTabe();

  return (
    <button
      onClick={toggleTabe}
      title={tabeActive ? "Reading mode ON — click to turn off" : "Enable TABE reading mode"}
      aria-label="Toggle TABE reading mode"
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans tracking-wide border transition-all duration-200 select-none"
      style={{
        borderColor:     tabeActive ? "var(--accent)" : "var(--border)",
        color:           tabeActive ? "var(--accent)" : "var(--text-tertiary)",
        backgroundColor: tabeActive
          ? "color-mix(in srgb, var(--accent) 10%, transparent)"
          : "transparent",
      }}
    >
      {/* Simple "Aa" glyph icon */}
      <span
        className="font-serif leading-none"
        style={{ fontSize: "0.85rem", fontWeight: tabeActive ? 700 : 400 }}
        aria-hidden="true"
      >
        Aa
      </span>
      <span className="hidden sm:inline">
        {tabeActive ? "Reading" : "Reading"}
      </span>
      {/* Active dot */}
      {tabeActive && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: "var(--accent)" }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "var(--bg)",
        borderBottom: "0.5px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* ── Left: logo + wordmark ──────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Home">
          <SealLogo theme={theme} />
          <span
            className="font-serif text-base tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Wenhui Xu
          </span>
        </Link>

        {/* ── Desktop nav ────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm tracking-wide transition-colors duration-150 relative group"
                style={{ color: active ? "var(--accent)" : "var(--text-secondary)" }}
              >
                {l.label}
                {/* Underline indicator */}
                <span
                  className="absolute -bottom-0.5 left-0 h-px transition-all duration-200 group-hover:w-full"
                  style={{
                    width: active ? "100%" : "0%",
                    backgroundColor: "var(--accent)",
                  }}
                />
              </Link>
            );
          })}

          {/* Divider */}
          <span className="w-px h-4" style={{ backgroundColor: "var(--border)" }} aria-hidden="true" />

          {/* TABE toggle — always visible */}
          <TabeToggle />

          {/* Dark mode */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-1.5 rounded-sm transition-colors duration-150 hover:bg-[var(--bg-hover)]"
            style={{ color: "var(--text-secondary)" }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>

        {/* ── Mobile: TABE + theme + hamburger ──────────── */}
        <div className="flex md:hidden items-center gap-2">
          <TabeToggle />
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="p-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        >
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-base py-1"
                style={{ color: active ? "var(--accent)" : "var(--text-primary)" }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
