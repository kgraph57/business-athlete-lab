import type { Metadata } from "next";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export const metadata: Metadata = {
  title: "ビジネスアスリートスコア診断",
  description:
    "運動・睡眠・栄養・メンタル・生活習慣の5カテゴリーであなたの健康パフォーマンスを科学的に診断。",
  openGraph: {
    title: "ビジネスアスリートスコア診断 | Business Athlete Lab",
    description:
      "約3分で完了。エビデンスベースの健康スコア診断であなたの改善ポイントを特定。",
    type: "website",
  },
};

export default function QuizPage() {
  return <QuizEngine />;
}
