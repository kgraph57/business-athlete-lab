export interface ArticleMeta {
  slug: string;
  title: string;
  articleId: string;
  publishedAt: string;
  category: string;
  genre: string;
  readingTime: string;
  keywords: string[];
  sourceUrl: string;
  topic: Topic;
  subtopic: string;
  wordCount: string;
}

export type Topic =
  | "exercise"
  | "sleep"
  | "nutrition"
  | "mental"
  | "lifestyle"
  | "chronic"
  | "aging"
  | "integrative";

export interface TopicConfig {
  id: Topic;
  label: string;
  labelEn: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
}
