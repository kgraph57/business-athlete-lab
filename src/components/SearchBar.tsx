"use client";

import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { ArticleMeta, Topic } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { getAllTopics } from "@/lib/topics";

const PAGE_SIZE = 30;

interface Props {
  readonly articles: ArticleMeta[];
}

export function SearchBar({ articles }: Props) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<Topic | "all">("all");
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
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
    setDisplayCount(PAGE_SIZE);
  }, []);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + PAGE_SIZE);
  }, []);

  return (
    <div>
      <div className="mb-12">
        <input
          type="text"
          placeholder="キーワードで検索..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="w-full border-b border-sand bg-transparent py-4 text-lg text-ink placeholder-stone outline-none transition-colors focus:border-ink"
        />
      </div>

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

      <p className="mb-8 text-sm text-stone">
        {filtered.length} 件の記事
        {query && ` — 「${query}」`}
      </p>

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, displayCount).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-xl text-stone">
            該当する記事が見つかりませんでした。
          </p>
        </div>
      )}

      {filtered.length > displayCount && (
        <div className="mt-16 text-center">
          <button
            onClick={loadMore}
            className="rounded-full border border-sand px-8 py-3 text-xs font-medium uppercase tracking-widest text-stone transition-all hover:border-ink hover:text-ink"
          >
            もっと見る ({filtered.length - displayCount} 件)
          </button>
        </div>
      )}
    </div>
  );
}
