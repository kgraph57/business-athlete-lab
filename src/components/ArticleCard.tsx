import Link from "next/link";
import { ArticleMeta } from "@/types";
import { TOPICS, getTopicAccent } from "@/lib/topics";

interface Props {
  readonly article: ArticleMeta;
  readonly variant?: "standard" | "featured" | "compact";
}

export function ArticleCard({ article, variant = "standard" }: Props) {
  const topic = TOPICS[article.topic];
  const accent = getTopicAccent(article.topic);

  if (variant === "featured") {
    return (
      <Link href={`/articles/${article.slug}/`} className="group block">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div
            className="aspect-[4/3] overflow-hidden rounded-sm"
            style={{ background: `${accent}20` }}
          />
          <div className="flex flex-col justify-center">
            {topic && (
              <span className="text-label mb-4" style={{ color: accent }}>
                {topic.labelEn}
              </span>
            )}
            <h3 className="font-serif text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-stone md:text-3xl">
              {article.title}
            </h3>
            <div className="mt-6 flex items-center gap-4 text-xs text-stone">
              {article.publishedAt && (
                <time>{article.publishedAt.slice(0, 10)}</time>
              )}
              {article.readingTime && <span>{article.readingTime}</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/articles/${article.slug}/`}
        className="group flex items-start gap-4 border-b border-sand/50 py-6"
      >
        <div className="flex-1">
          {topic && (
            <span className="text-label mb-2 block" style={{ color: accent }}>
              {topic.labelEn}
            </span>
          )}
          <h3 className="font-serif text-base font-medium text-ink transition-colors group-hover:text-stone">
            {article.title}
          </h3>
          <time className="mt-2 block text-xs text-stone">
            {article.publishedAt?.slice(0, 10)}
          </time>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}/`} className="group block">
      <div
        className="mb-5 aspect-[3/2] overflow-hidden rounded-sm"
        style={{ background: `${accent}15` }}
      />
      {topic && (
        <span className="text-label mb-3 block" style={{ color: accent }}>
          {topic.labelEn}
        </span>
      )}
      <h3 className="font-serif text-lg font-medium leading-snug text-ink transition-colors group-hover:text-stone">
        {article.title}
      </h3>
      <div className="mt-4 flex items-center gap-3 text-xs text-stone">
        {article.publishedAt && (
          <time>{article.publishedAt.slice(0, 10)}</time>
        )}
        {article.readingTime && <span>{article.readingTime}</span>}
      </div>
    </Link>
  );
}
