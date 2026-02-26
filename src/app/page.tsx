import Link from "next/link";
import { getAllArticles, getTopicStats } from "@/lib/articles";
import { getAllTopics, getTopicAccent } from "@/lib/topics";
import { ArticleCard } from "@/components/ArticleCard";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealSection } from "@/components/ui/RevealSection";

export default function HomePage() {
  const articles = getAllArticles();
  const topics = getAllTopics();
  const stats = getTopicStats();
  const featured = articles[0];
  const recent = articles.slice(1, 7);

  return (
    <>
      <Hero
        title="働く身体をアップデート。"
        subtitle="エビデンスに基づく、ビジネスアスリートのための健康マガジン。ランチタイムで読める、運動・睡眠・栄養の最新戦略。"
        variant="full"
      />

      {featured && (
        <RevealSection
          as="section"
          className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-section)] md:px-12"
        >
          <SectionTitle label="Featured" title="注目の記事" />
          <ArticleCard article={featured} variant="featured" />
        </RevealSection>
      )}

      <RevealSection as="section" className="bg-cream-dark py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
          <SectionTitle label="Topics" title="テーマから探す" align="center" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}/`}
                className="group rounded-sm border border-sand/50 bg-cream p-8 transition-all hover:border-sand hover:shadow-[0_4px_20px_rgba(42,40,37,0.06)]"
              >
                <span
                  className="text-label"
                  style={{ color: getTopicAccent(topic.id) }}
                >
                  {topic.labelEn}
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-ink">
                  {topic.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {topic.description}
                </p>
                <span className="mt-4 block text-xs text-stone">
                  {stats[topic.id] ?? 0} articles
                </span>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection as="section" className="py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--max-prose)] px-6 text-center md:px-12">
          <span className="text-label mb-6 block">Philosophy</span>
          <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl">
            忙しい毎日の中にこそ、
            <br className="hidden md:inline" />
            身体と向き合う静かな時間を。
          </p>
          <div className="divider mx-auto mt-8" />
          <p className="mt-8 text-sm leading-[2] text-stone">
            Business Athlete Labは、医師として臨床に携わりながら
            CrossFit、HYROX、トライアスロンに挑戦する筆者が、
            国内外の最新論文を読み解き、エビデンスベース戦略を届けるメディアです。
          </p>
        </div>
      </RevealSection>

      {recent.length > 0 && (
        <RevealSection as="section" className="bg-cream-dark py-[var(--space-section)]">
          <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
            <SectionTitle label="Latest" title="最新の記事" />
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link
                href="/articles/"
                className="text-label text-stone transition-colors hover:text-ink"
              >
                View All Articles &rarr;
              </Link>
            </div>
          </div>
        </RevealSection>
      )}
    </>
  );
}
