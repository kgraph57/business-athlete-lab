import { getArticlesByTopic } from "@/lib/articles";
import { TOPICS, getAllTopics } from "@/lib/topics";
import { ArticleCard } from "@/components/ArticleCard";
import { Hero } from "@/components/Hero";
import { RevealSection } from "@/components/ui/RevealSection";
import { Topic } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return getAllTopics().map((topic) => ({ topic: topic.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = TOPICS[topicId];
  if (!topic) return {};
  return {
    title: `${topic.label} (${topic.labelEn})`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic: topicId } = await params;
  const topicConfig = TOPICS[topicId];

  if (!topicConfig) notFound();

  const articles = getArticlesByTopic(topicId as Topic);

  return (
    <>
      <Hero
        title={topicConfig.label}
        subtitle={topicConfig.description}
        variant="half"
      />

      <section className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-section)] md:px-12">
        {articles.length > 0 ? (
          <>
            <RevealSection className="mb-[var(--space-block)]">
              <ArticleCard article={articles[0]} variant="featured" />
            </RevealSection>

            {articles.length > 1 && (
              <RevealSection>
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.slice(1).map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </RevealSection>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-stone">
              このテーマの記事は準備中です。
            </p>
          </div>
        )}
      </section>
    </>
  );
}
