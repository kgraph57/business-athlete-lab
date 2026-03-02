import type { Metadata } from "next";
import { Noto_Serif_JP, Inter, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  description:
    "医師・岡本賢が自らの身体で実践する、エビデンスベースの予防医療メディア。",
  metadataBase: new URL("https://kgraph57.github.io/business-athlete-lab"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Business Athlete Lab",
    description:
      "医師・岡本賢が自らの身体で実践する、エビデンスベースの予防医療メディア。",
    type: "website",
    locale: "ja_JP",
    siteName: "Business Athlete Lab",
    url: "https://kgraph57.github.io/business-athlete-lab",
    images: [
      {
        url: "/business-athlete-lab/images/og-main.webp",
        width: 1200,
        height: 630,
        alt: "Business Athlete Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Athlete Lab",
    description:
      "医師・岡本賢が自らの身体で実践する、エビデンスベースの予防医療メディア。",
    images: ["/business-athlete-lab/images/og-main.webp"],
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("bal-theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-cream text-charcoal antialiased">
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen pt-[var(--header-height)]">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
