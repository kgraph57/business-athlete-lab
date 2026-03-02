import Link from "next/link";
import { ArticleMeta } from "@/types";
import { TOPICS, getTopicAccent } from "@/lib/topics";
import { ArticleCard } from "./ArticleCard";

interface Props {
  readonly articles: ArticleMeta[];
}

const SHOWCASE_TOPICS = ["exercise", "sleep", "nutrition", "mental", "lifestyle", "aging"] as const;

export function TopicShowcase({ articles }: Props) {
  return (
    <div className="space-y-[var(--space-section)]">
      {SHOWCASE_TOPICS.map((topicId) => {
        const topic = TOPICS[topicId];
        const topicArticles = articles
          .filter((a) => a.topic === topicId)
          .slice(0, 4);
        const accent = getTopicAccent(topicId);

        if (topicArticles.length === 0) return null;

        return (
          <div key={topicId}>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span
                  className="text-label mb-2 block"
                  style={{ color: accent }}
                >
                  {topic.labelEn}
                </span>
                <h2 className="font-serif text-2xl font-medium text-ink md:text-3xl">
                  {topic.label}
                </h2>
                <p className="mt-2 text-sm text-stone">
                  {topic.description}
                </p>
              </div>
              <Link
                href={`/topics/${topicId}/`}
                className="hidden text-label text-stone transition-colors hover:text-ink sm:block"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {topicArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href={`/topics/${topicId}/`}
                className="text-label text-stone transition-colors hover:text-ink"
              >
                View All &rarr;
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
