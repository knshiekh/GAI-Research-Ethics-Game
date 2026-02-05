import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAI Research Ethics Toy",
  description:
    "A Moral Machine-style vignette game about appropriate use of generative AI in research.",
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
            <a href="/" className="brand">
              <span className="logo">⚖️</span>
              <span className="brandTitle">GAI Ethics Toy</span>
              <span className="brandSubtitle">Research AI Decisions</span>
            </a>
            <nav className="nav">
              <a href="/" className="navLink">
                Home
              </a>
              <a href="/play" className="navLink">
                Play
              </a>
              <a href="/results" className="navLink">
                Results
              </a>
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
