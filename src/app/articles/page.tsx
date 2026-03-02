import { getAllArticles } from "@/lib/articles";
import { SearchBar } from "@/components/SearchBar";
import { Hero } from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "1,000件以上のエビデンスベース健康記事ライブラリ。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <Hero
        title="Library"
        subtitle={`${articles.length.toLocaleString()} 本のエビデンスベース記事`}
        variant="minimal"
      />
      <section className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-block)] md:px-12">
        <SearchBar articles={articles} />
      </section>
    </>
  );
}
