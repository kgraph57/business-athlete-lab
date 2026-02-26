import { getAllArticles } from "@/lib/articles";
import { SearchBar } from "@/components/SearchBar";
import { Hero } from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Library",
  description: "エビデンスに基づく健康戦略の全記事一覧。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <Hero
        title="Article Library"
        subtitle={`${articles.length} 本のエビデンスベース記事`}
        variant="minimal"
      />
      <section className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-block)] md:px-12">
        <SearchBar articles={articles} />
      </section>
    </>
  );
}
