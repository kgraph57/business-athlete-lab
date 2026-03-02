"use client";

import Link from "next/link";
import type { QuizResult as QuizResultType } from "@/lib/quiz-data";

interface QuizResultProps {
  readonly result: QuizResultType;
  readonly onRestart: () => void;
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  const gradeColor = getGradeColor(result.grade);

  return (
    <div className="mx-auto max-w-lg space-y-10">
      {/* Score circle */}
      <div className="flex flex-col items-center text-center">
        <div
          className="relative flex h-40 w-40 items-center justify-center rounded-full border-4"
          style={{ borderColor: gradeColor }}
        >
          <div className="text-center">
            <span
              className="block font-serif text-5xl font-bold"
              style={{ color: gradeColor }}
            >
              {result.grade}
            </span>
            <span className="block text-sm text-stone">
              {result.percentage}%
            </span>
          </div>
        </div>

        <h2 className="mt-6 font-serif text-2xl font-semibold text-ink md:text-3xl">
          {result.gradeLabel}
        </h2>
        <p className="mt-2 text-sm text-stone">
          {result.totalScore} / {result.maxScore} ポイント
        </p>
      </div>

      {/* Category breakdown */}
      <div className="space-y-4 rounded-2xl border border-sand/60 p-6">
        <h3 className="text-label mb-4">カテゴリー別スコア</h3>
        {result.categories.map((cat) => {
          const pct = cat.maxScore > 0 ? (cat.score / cat.maxScore) * 100 : 0;
          return (
            <div key={cat.category}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal">
                  {cat.label}
                </span>
                <span className="text-xs tabular-nums text-stone">
                  {cat.score}/{cat.maxScore}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-sand/30">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: cat.accent,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="rounded-2xl border border-sand/60 bg-cream-dark p-6">
        <h3 className="text-label mb-3">パーソナライズドアドバイス</h3>
        <p className="text-sm leading-relaxed text-charcoal">
          {result.recommendation}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onRestart}
          className="w-full rounded-full border border-sand bg-cream px-8 py-4 text-sm font-medium tracking-wide text-charcoal transition-all hover:border-ink hover:bg-ink hover:text-cream"
        >
          もう一度診断する
        </button>

        <Link
          href="/articles/"
          className="text-sm text-stone transition-colors hover:text-ink"
        >
          記事を読む &rarr;
        </Link>
      </div>
    </div>
  );
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case "S":
      return "var(--color-sage)";
    case "A":
      return "var(--color-indigo)";
    case "B":
      return "var(--color-amber)";
    case "C":
      return "var(--color-terracotta)";
    default:
      return "var(--color-stone)";
  }
}
