import { getArticlesByTopic } from "@/lib/articles";
import { TOPICS, getAllTopics } from "@/lib/topics";
import { Hero } from "@/components/Hero";
import { TopicArticleList } from "@/components/TopicArticleList";
import { Topic } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BASE_PATH } from "@/lib/config";

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
        imageSrc={`${BASE_PATH}/images/topic-${topicId}.webp`}
      />

      <section className="mx-auto max-w-[var(--max-content)] px-6 py-[var(--space-section)] md:px-12">
        <TopicArticleList articles={articles} />
      </section>
    </>
  );
}
