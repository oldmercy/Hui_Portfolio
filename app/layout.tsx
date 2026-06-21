import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { getSiteContent } from "@/lib/site-content";

const { metadata: meta, footer } = getSiteContent("en");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: applies dark/tabe classes before first paint.
            Runs synchronously so there's zero FOUC and no hydration mismatch —
            the HTML the browser paints matches what React expects on mount. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var t = localStorage.getItem('theme');
    var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
    if (localStorage.getItem('tabe') === '1') document.documentElement.classList.add('tabe-mode');
  } catch(e) {}
})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>

          <footer
            className="border-t py-10 px-6 mt-24"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-4">
              {/* Left: copyright + credits */}
              <div>
                <p className="font-serif text-sm" style={{ color: "var(--text-secondary)" }}>
                  {footer.copyright}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                  Reading experience powered by{" "}
                  <a
                    href="https://github.com/chenglou/pretext"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    style={{ color: "var(--accent)" }}
                  >
                    @chenglou/pretext
                  </a>
                  {" "}· Accessibility by{" "}
                  <a
                    href="https://github.com/oldmercy/CantRead"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    style={{ color: "var(--accent)" }}
                  >
                    CantRead
                  </a>
                </p>
              </div>

              {/* Right: social links from content */}
              <div className="flex gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
                {footer.links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="link-underline hover:text-[var(--accent)] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
