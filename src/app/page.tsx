import Link from "next/link";
import { getCuratedArticles, getAllArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealSection } from "@/components/ui/RevealSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { TopicShowcase } from "@/components/TopicShowcase";
import { WebSiteJsonLd } from "@/components/JsonLd";
import { BASE_PATH } from "@/lib/config";

export default function HomePage() {
  const curated = getCuratedArticles();
  const allArticles = getAllArticles();
  const featured = curated[0];
  const recent = curated.slice(1, 7);

  return (
    <>
      <WebSiteJsonLd />
      <Hero
        title="予防医療を、自分の身体で証明する。"
        subtitle="医師・岡本賢が、最新の医学論文とアスリートとしての実践を掛け合わせて届ける、エビデンスベースの健康戦略。"
        variant="full"
        imageSrc={`${BASE_PATH}/images/hero-main.webp`}
      />

      {/* About Overview */}
      <RevealSection as="section" className="py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--max-prose)] px-6 text-center md:px-12">
          <span className="text-label mb-6 block">About</span>
          <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl">
            医師として臨床に立ちながら、
            <br className="hidden md:inline" />
            CrossFit・HYROX・トライアスロンに挑む。
          </p>
          <div className="divider mx-auto mt-8" />
          <p className="mt-8 text-sm leading-[2] text-stone">
            岡本賢 —
            小児科医。予防医療の価値を、論文だけでなく自らの身体で検証する。
            国内外の最新研究を読み解き、忙しいビジネスパーソンが今日から実践できる
            エビデンスベースの健康戦略を届けます。
          </p>
          <Link
            href="/about/"
            className="mt-6 inline-block text-label text-stone transition-colors hover:text-ink"
          >
            Read More &rarr;
          </Link>
        </div>
      </RevealSection>

      {/* Featured Article */}
      {featured && (
        <RevealSection
          as="section"
          className="bg-cream-dark py-[var(--space-section)]"
        >
          <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
            <SectionTitle label="Featured" title="注目の記事" />
            <ArticleCard article={featured} variant="featured" />
          </div>
        </RevealSection>
      )}

      {/* Curated Articles */}
      {recent.length > 0 && (
        <RevealSection as="section" className="py-[var(--space-section)]">
          <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
            <SectionTitle label="Selected" title="厳選記事" />
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

      {/* Health Score Quiz CTA */}
      <RevealSection
        as="section"
        className="bg-gradient-to-br from-sage-light via-cream to-indigo-light py-[var(--space-section)]"
      >
        <div className="mx-auto max-w-[var(--max-prose)] px-6 text-center md:px-12">
          <span className="text-5xl">🩺</span>
          <h2 className="mt-6 font-serif text-2xl font-semibold text-ink md:text-3xl">
            あなたの健康スコアを診断
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            約3分の質問に答えるだけ。運動・睡眠・栄養・メンタル・生活習慣の5軸で、
            エビデンスベースのパーソナライズドアドバイスをお届けします。
          </p>
          <Link
            href="/quiz/"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium tracking-wide text-cream transition-all hover:bg-charcoal"
          >
            無料で診断する &rarr;
          </Link>
        </div>
      </RevealSection>

      {/* Newsletter CTA */}
      <NewsletterCTA variant="banner" />

      {/* Topic Showcase - Browse by Category */}
      <RevealSection as="section" className="py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
          <SectionTitle label="Browse" title="テーマから読む" align="center" />
          <div className="mt-4 mb-16 text-center">
            <p className="text-sm text-stone">
              {allArticles.length.toLocaleString()} 本の記事を7つのテーマで探索
            </p>
          </div>
          <TopicShowcase articles={allArticles} />
          <div className="mt-[var(--space-block)] text-center">
            <Link
              href="/articles/"
              className="inline-flex items-center gap-3 rounded-full border border-sand bg-cream px-8 py-4 text-sm font-medium tracking-wide text-charcoal transition-all hover:border-ink hover:bg-ink hover:text-cream"
            >
              すべての記事を見る &rarr;
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* Services Overview */}
      <RevealSection
        as="section"
        className="bg-cream-dark py-[var(--space-section)]"
      >
        <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
          <SectionTitle
            label="Services"
            title="セミナー・講座・執筆"
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "セミナー・講演",
                description:
                  "企業の健康経営、チームのパフォーマンス向上をテーマに、エビデンスベースの講演を行います。",
              },
              {
                title: "オンライン講座",
                description:
                  "運動・睡眠・栄養の3軸から、ビジネスパーソンの身体マネジメントを体系的に学ぶプログラム。",
              },
              {
                title: "執筆・メディア出演",
                description:
                  "書籍の執筆、メディア掲載、ポッドキャスト出演など、予防医療の発信活動を行っています。",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-sm border border-sand/50 p-8"
              >
                <h3 className="font-serif text-lg font-medium text-ink">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-stone">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services/"
              className="text-label text-stone transition-colors hover:text-ink"
            >
              View Details &rarr;
            </Link>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
