"use client";

import { useState, useCallback } from "react";
import { ArticleMeta } from "@/types";
import { ArticleCard } from "./ArticleCard";

const ARTICLES_PER_PAGE = 24;

interface Props {
  readonly articles: ArticleMeta[];
}

export function TopicArticleList({ articles }: Props) {
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  }, []);

  const hasMore = articles.length > visibleCount;
  const featured = articles[0];
  const rest = articles.slice(1, visibleCount);

  if (articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-xl text-stone">
          このテーマの記事は準備中です。
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-sm text-stone">
        {articles.length.toLocaleString()} 件の記事
      </div>

      <div className="mb-[var(--space-block)]">
        <ArticleCard article={featured} variant="featured" />
      </div>

      {rest.length > 0 && (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-16 text-center">
          <button
            onClick={loadMore}
            className="group inline-flex items-center gap-3 rounded-full border border-sand bg-cream px-8 py-4 text-sm font-medium tracking-wide text-charcoal transition-all hover:border-ink hover:bg-ink hover:text-cream"
          >
            <span>もっと見る</span>
            <span className="text-xs text-stone group-hover:text-cream/70">
              ({Math.min(ARTICLES_PER_PAGE, articles.length - visibleCount)} 件)
            </span>
          </button>
          <p className="mt-4 text-xs text-stone">
            {Math.min(visibleCount, articles.length).toLocaleString()} / {articles.length.toLocaleString()} 件表示中
          </p>
        </div>
      )}
    </>
  );
}
