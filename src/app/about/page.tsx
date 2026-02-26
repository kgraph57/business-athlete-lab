import { Hero } from "@/components/Hero";
import { RevealSection } from "@/components/ui/RevealSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Business Athlete Labについて",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About"
        subtitle="Business Athlete Labについて"
        variant="minimal"
      />

      <section className="mx-auto max-w-[var(--max-prose)] px-6 py-[var(--space-section)] md:px-0">
        <RevealSection>
          <h2 className="font-serif text-2xl font-medium text-ink">
            働く身体を、科学で整える。
          </h2>
          <div className="divider" />
          <div className="mt-8 space-y-8 text-base leading-[2] text-charcoal">
            <p>
              Business Athlete Labは、忙しく働くビジネスパーソンのための
              エビデンスに基づく健康戦略マガジンです。
            </p>
            <p>
              最新の医学研究や栄養学、運動生理学の知見を、
              ランチタイムに読めるエッセイとしてお届けします。
              派手なダイエット法や根拠のないサプリメントの宣伝ではなく、
              一次文献に基づいた、信頼できる情報を厳選しています。
            </p>
            <p>
              運動、睡眠、栄養、メンタルヘルス、生活習慣、そして長寿 ——
              6つのテーマを軸に、あなたの「働く身体」をアップデートする知恵を、
              静かに、丁寧に綴っていきます。
            </p>
          </div>
        </RevealSection>

        <RevealSection className="mt-[var(--space-section)]">
          <span className="text-label mb-6 block">Author</span>
          <h3 className="font-serif text-xl font-medium text-ink">
            おかもん先生
          </h3>
          <div className="divider" />
          <div className="mt-4 space-y-4 text-sm leading-[2] text-stone">
            <p>
              小児科医。臨床に携わりながら CrossFit、HYROX、トライアスロンに挑戦。
              国内外の最新論文を読み解き、エビデンスベースの健康情報を発信。
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
          <span className="text-label mb-6 block">Links</span>
          <a
            href="https://note.com/kgraph_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-charcoal underline underline-offset-4 decoration-sand transition-colors hover:decoration-charcoal"
          >
            note.com/kgraph_ &rarr;
          </a>
        </RevealSection>
      </section>
    </>
  );
}
