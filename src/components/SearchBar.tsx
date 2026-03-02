"use client";

import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { ArticleMeta, Topic } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { getAllTopics } from "@/lib/topics";

const ARTICLES_PER_PAGE = 24;

interface Props {
  readonly articles: ArticleMeta[];
}

export function SearchBar({ articles }: Props) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<Topic | "all">("all");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const topics = getAllTopics();

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: ["title", "keywords", "category", "genre", "subtopic"],
        threshold: 0.4,
        includeScore: true,
      }),
    [articles]
  );

  const filtered = useMemo(() => {
    const searched = query.trim()
      ? fuse.search(query).map((r) => r.item)
      : articles;

    if (activeTopic === "all") return searched;
    return searched.filter((a) => a.topic === activeTopic);
  }, [query, activeTopic, articles, fuse]);

  const handleTopicChange = useCallback((topic: Topic | "all") => {
    setActiveTopic(topic);
    setVisibleCount(ARTICLES_PER_PAGE);
  }, []);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setVisibleCount(ARTICLES_PER_PAGE);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  }, []);

  const hasMore = filtered.length > visibleCount;

  return (
    <div>
      {/* Search Input */}
      <div className="mb-12">
        <input
          type="text"
          placeholder="キーワードで検索..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="w-full border-b border-sand bg-transparent py-4 text-lg text-ink placeholder-stone outline-none transition-colors focus:border-ink"
        />
      </div>

      {/* Topic Filters */}
      <div className="mb-12 flex flex-wrap gap-3">
        <button
          onClick={() => handleTopicChange("all")}
          className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all ${
            activeTopic === "all"
              ? "border-ink bg-ink text-cream"
              : "border-sand text-stone hover:border-ink hover:text-ink"
          }`}
        >
          All
        </button>
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicChange(topic.id)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all ${
              activeTopic === topic.id
                ? "border-ink bg-ink text-cream"
                : "border-sand text-stone hover:border-ink hover:text-ink"
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="mb-8 text-sm text-stone">
        {filtered.length.toLocaleString()} 件の記事
        {query && ` — 「${query}」`}
        {activeTopic !== "all" && ` — ${topics.find((t) => t.id === activeTopic)?.label}`}
      </p>

      {/* Article Grid */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, visibleCount).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-xl text-stone">
            該当する記事が見つかりませんでした。
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-16 text-center">
          <button
            onClick={loadMore}
            className="group inline-flex items-center gap-3 rounded-full border border-sand bg-cream px-8 py-4 text-sm font-medium tracking-wide text-charcoal transition-all hover:border-ink hover:bg-ink hover:text-cream"
          >
            <span>もっと見る</span>
            <span className="text-xs text-stone group-hover:text-cream/70">
              ({Math.min(ARTICLES_PER_PAGE, filtered.length - visibleCount)} 件)
            </span>
          </button>
          <p className="mt-4 text-xs text-stone">
            {visibleCount.toLocaleString()} / {filtered.length.toLocaleString()} 件表示中
          </p>
        </div>
      )}
    </div>
  );
}
