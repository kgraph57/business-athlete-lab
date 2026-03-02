"use client";

interface QuizProgressProps {
  readonly current: number;
  readonly total: number;
  readonly accent: string;
  readonly categoryLabel: string;
}

export function QuizProgress({
  current,
  total,
  accent,
  categoryLabel,
}: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      {/* Category + Counter */}
      <div className="mb-3 flex items-center justify-between px-1">
        <span
          className="text-xs font-medium tracking-wider uppercase"
          style={{ color: accent }}
        >
          {categoryLabel}
        </span>
        <span className="text-xs tabular-nums text-stone">
          {current} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-sand/40">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: accent,
          }}
        />
      </div>
    </div>
  );
}
