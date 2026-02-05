import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAI Research Ethics",
  description:
    "A vignette exercise about appropriate use of generative AI in research.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="header">
            <Link href="/" className="brand">
              <span className="logo">⚖️</span>
              <span className="brandTitle">GAI Research Ethics</span>
              <span className="brandSubtitle">Research AI Decisions</span>
            </Link>
            <nav className="nav">
              <Link href="/" className="navLink">
                Home
              </Link>
              <Link href="/play" className="navLink">
                Cases
              </Link>
              <Link href="/results" className="navLink">
                Results
              </Link>
            </nav>
          </header>

          <main className="main">{children}</main>

          <footer className="footer">
            Client-side only • No accounts • No data collection
          </footer>
        </div>
      </body>
    </html>
  );
}
