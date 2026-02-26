import Link from "next/link";
import { getAllTopics, getTopicAccent } from "@/lib/topics";
import { getTopicStats } from "@/lib/articles";
import { Hero } from "@/components/Hero";
import { RevealSection } from "@/components/ui/RevealSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics",
  description: "テーマから記事を探す。運動、睡眠、栄養、メンタル、生活習慣、長寿の6カテゴリ。",
};

export default function TopicsPage() {
  const topics = getAllTopics();
  const stats = getTopicStats();

  return (
    <>
      <Hero
        title="Topics"
        subtitle="テーマから探す"
        variant="minimal"
      />

      <section className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-section)] md:px-12">
        <RevealSection>
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
        </RevealSection>
      </section>
    </>
  );
}
