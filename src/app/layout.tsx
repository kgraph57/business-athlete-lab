import type { Metadata } from "next";
import { Noto_Serif_JP, Inter, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Business Athlete Lab",
    template: "%s | Business Athlete Lab",
  },
  description: "働く身体をアップデート。ランチタイムで読む健康戦略。",
  metadataBase: new URL("https://kgraph57.github.io/business-athlete-lab"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Business Athlete Lab",
    description: "働く身体をアップデート。ランチタイムで読む健康戦略。",
    type: "website",
    locale: "ja_JP",
    siteName: "Business Athlete Lab",
    url: "https://kgraph57.github.io/business-athlete-lab",
  },
  twitter: {
    card: "summary",
    title: "Business Athlete Lab",
    description: "働く身体をアップデート。ランチタイムで読む健康戦略。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSerifJp.variable} ${inter.variable} ${notoSansJp.variable}`}
    >
      <body className="bg-cream text-charcoal antialiased">
        <Header />
        <main className="min-h-screen pt-[var(--header-height)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
