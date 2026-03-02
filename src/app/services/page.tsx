import { Hero } from "@/components/Hero";
import { RevealSection } from "@/components/ui/RevealSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { SITE } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "セミナー・講座・執筆依頼について",
};

const SERVICES = [
  {
    title: "セミナー・講演",
    labelEn: "Speaking",
    description:
      "企業の健康経営やチームのパフォーマンス向上をテーマに、エビデンスベースの講演を行います。対面・オンラインいずれも対応可能。",
    topics: [
      "健康経営セミナー",
      "運動・睡眠・栄養の最適化",
      "ストレスマネジメント",
    ],
  },
  {
    title: "オンライン講座",
    labelEn: "Courses",
    description:
      "運動・睡眠・栄養の3軸から、ビジネスパーソンの身体マネジメントを体系的に学ぶプログラムを準備中です。",
    topics: ["ビジネスアスリート基礎講座", "エビデンスベース健康戦略"],
  },
  {
    title: "執筆・メディア出演",
    labelEn: "Writing & Media",
    description:
      "書籍の執筆、雑誌・Webメディアへの寄稿、ポッドキャスト・YouTube出演など、予防医療に関する発信活動全般をお受けします。",
    topics: ["書籍執筆", "メディア寄稿", "ポッドキャスト出演"],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Services"
        subtitle="セミナー・講座・執筆"
        variant="minimal"
      />

      <section className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-section)] md:px-12">
        <div className="grid gap-12 md:gap-16">
          {SERVICES.map((service) => (
            <RevealSection
              key={service.title}
              className="border-b border-sand pb-12 last:border-0 md:pb-16"
            >
              <span className="text-label mb-4 block text-stone">
                {service.labelEn}
              </span>
              <h2 className="font-serif text-2xl font-medium text-ink">
                {service.title}
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-[2] text-charcoal">
                {service.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-sand px-3 py-1 text-xs text-stone"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection className="mt-[var(--space-section)]">
          <div className="rounded-sm border border-sand/50 bg-cream-dark p-8 text-center md:p-12">
            <span className="text-label mb-4 block text-stone">Contact</span>
            <p className="font-serif text-xl font-medium text-ink">
              各サービスの詳細は準備中です
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              セミナー・講演のご依頼、取材・執筆のご相談は、
              下記よりお問い合わせください。
            </p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-6 inline-block rounded-sm border border-ink/10 px-8 py-3 text-sm font-medium tracking-wide text-ink transition-all hover:bg-ink hover:text-cream"
            >
              お問い合わせ &rarr;
            </a>
          </div>
        </RevealSection>

        <RevealSection className="mt-[var(--space-block)]">
          <NewsletterCTA variant="inline" />
        </RevealSection>
      </section>
    </>
  );
}
