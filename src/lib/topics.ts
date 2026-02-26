import { TopicConfig } from "@/types";

export const TOPICS: Record<string, TopicConfig> = {
  exercise: {
    id: "exercise",
    label: "運動",
    labelEn: "Exercise",
    color: "text-sage",
    bgColor: "bg-sage-light",
    borderColor: "border-sage/20",
    description:
      "科学が示す最適な運動戦略。筋トレ、有酸素運動、リカバリーの最前線。",
  },
  sleep: {
    id: "sleep",
    label: "睡眠",
    labelEn: "Sleep",
    color: "text-indigo",
    bgColor: "bg-indigo-light",
    borderColor: "border-indigo/20",
    description: "パフォーマンスを最大化する眠りの科学。概日リズムと睡眠衛生。",
  },
  nutrition: {
    id: "nutrition",
    label: "栄養",
    labelEn: "Nutrition",
    color: "text-terracotta",
    bgColor: "bg-terracotta-light",
    borderColor: "border-terracotta/20",
    description: "エビデンスに基づく食事戦略。腸内環境からサプリメントまで。",
  },
  mental: {
    id: "mental",
    label: "メンタル",
    labelEn: "Mental",
    color: "text-lavender",
    bgColor: "bg-lavender-light",
    borderColor: "border-lavender/20",
    description: "ストレス管理と認知機能の最適化。マインドフルネスの実践。",
  },
  lifestyle: {
    id: "lifestyle",
    label: "生活習慣",
    labelEn: "Lifestyle",
    color: "text-moss",
    bgColor: "bg-moss-light",
    borderColor: "border-moss/20",
    description: "習慣化の科学、時間管理、予防医療。日常を整える知恵。",
  },
  aging: {
    id: "aging",
    label: "長寿",
    labelEn: "Longevity",
    color: "text-amber",
    bgColor: "bg-amber-light",
    borderColor: "border-amber/20",
    description: "健康寿命を延ばす最新研究。老化のメカニズムと介入戦略。",
  },
  integrative: {
    id: "integrative",
    label: "総合",
    labelEn: "Integrative",
    color: "text-stone",
    bgColor: "bg-parchment",
    borderColor: "border-stone/20",
    description: "分野横断的な健康科学。複数の領域にまたがるエビデンスを統合。",
  },
};

export function getTopicConfig(topicId: string): TopicConfig | undefined {
  return TOPICS[topicId];
}

export function getAllTopics(): TopicConfig[] {
  return Object.values(TOPICS);
}

const TOPIC_ACCENT: Record<string, string> = {
  exercise: "var(--color-sage)",
  sleep: "var(--color-indigo)",
  nutrition: "var(--color-terracotta)",
  mental: "var(--color-lavender)",
  lifestyle: "var(--color-moss)",
  aging: "var(--color-amber)",
  integrative: "var(--color-stone)",
};

export function getTopicAccent(topicId: string): string {
  return TOPIC_ACCENT[topicId] ?? "var(--color-stone)";
}
