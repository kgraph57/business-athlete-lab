import { Hero } from "@/components/Hero";
import { RevealSection } from "@/components/ui/RevealSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { SITE } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.author} — 医師・アスリート・予防医療`,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About"
        subtitle="医師・岡本賢について"
        variant="minimal"
      />

      <section className="mx-auto max-w-[var(--max-prose)] px-6 py-[var(--space-section)] md:px-0">
        <RevealSection>
          <h2 className="font-serif text-2xl font-medium text-ink">
            予防医療を、自分の身体で証明する。
          </h2>
          <div className="divider" />
          <div className="mt-8 space-y-8 text-base leading-[2] text-charcoal">
            <p>
              岡本賢。小児科医。
            </p>
            <p>
              臨床の傍ら、CrossFit、HYROX、トライアスロンに挑戦し続けている。
              診療室の外で自らの身体を実験台にし、
              国内外の最新論文が示すエビデンスを日々の生活で検証する。
            </p>
            <p>
              「予防医療」は概念ではなく実践であるべきだ——
              そう考え、忙しいビジネスパーソンが今日から取り入れられる
              運動・睡眠・栄養の戦略を、医師の視点で発信している。
            </p>
            <p>
              Business Athlete Labは、派手なダイエット法や根拠のないサプリメントの宣伝ではなく、
              一次文献に基づいた、信頼できる情報を届けるメディアです。
            </p>
          </div>
        </RevealSection>

        <RevealSection className="mt-[var(--space-section)]">
          <span className="text-label mb-6 block">Profile</span>
          <h3 className="font-serif text-xl font-medium text-ink">
            岡本 賢（おかもと けん）
          </h3>
          <div className="divider" />
          <div className="mt-6 space-y-4 text-sm leading-[2] text-stone">
            <p>
              小児科医。予防医療の実践者。
              CrossFit、HYROX、トライアスロンを通じて
              自らの身体でエビデンスを検証し、
              その知見をビジネスパーソン向けに発信。
            </p>
          </div>
        </RevealSection>

        <RevealSection className="mt-[var(--space-block)]">
          <span className="text-label mb-6 block">Content Policy</span>
          <ul className="space-y-6 text-sm leading-[2] text-charcoal">
            <li className="flex items-start gap-4">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-sage" />
              <span>
                <strong className="font-medium text-ink">論文ベース</strong> —
                毎回、最新の査読付き論文を紹介
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-terracotta" />
              <span>
                <strong className="font-medium text-ink">実践的</strong> —
                研究結果を「今日からできるアクション」に変換
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-indigo" />
              <span>
                <strong className="font-medium text-ink">医師が書く</strong> —
                臨床経験に基づくフィルタリングと解説
              </span>
            </li>
          </ul>
        </RevealSection>

        <RevealSection className="mt-[var(--space-block)]">
          <NewsletterCTA variant="inline" />
        </RevealSection>

        <RevealSection className="mt-[var(--space-block)]">
          <span className="text-label mb-6 block">Links</span>
          <ul className="space-y-3">
            <li>
              <a
                href={SITE.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal underline underline-offset-4 decoration-sand transition-colors hover:decoration-charcoal"
              >
                Substack (Newsletter) &rarr;
              </a>
            </li>
            <li>
              <a
                href={SITE.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal underline underline-offset-4 decoration-sand transition-colors hover:decoration-charcoal"
              >
                note.com &rarr;
              </a>
            </li>
            <li>
              <a
                href={SITE.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal underline underline-offset-4 decoration-sand transition-colors hover:decoration-charcoal"
              >
                X (Twitter) &rarr;
              </a>
            </li>
          </ul>
        </RevealSection>
      </section>
    </>
  );
}
