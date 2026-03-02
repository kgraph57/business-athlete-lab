"use client";

interface QuizOptionCardProps {
  readonly icon: string;
  readonly label: string;
  readonly selected: boolean;
  readonly accent: string;
  readonly onSelect: () => void;
  readonly animationDelay?: number;
}

export function QuizOptionCard({
  icon,
  label,
  selected,
  accent,
  onSelect,
  animationDelay = 0,
}: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative w-full rounded-2xl border-2 p-5 text-left transition-all duration-300 hover:shadow-card"
      style={{
        borderColor: selected ? accent : "var(--color-sand)",
        background: selected ? `color-mix(in srgb, ${accent} 6%, var(--color-cream))` : "var(--color-cream)",
        animationDelay: `${animationDelay}ms`,
      }}
    >
      {/* Selected indicator */}
      <div
        className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300"
        style={{
          borderColor: selected ? accent : "var(--color-sand)",
          background: selected ? accent : "transparent",
        }}
      >
        {selected && (
          <svg
            className="h-3.5 w-3.5 text-cream"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {/* Icon + Label */}
      <div className="flex items-center gap-4 pr-8">
        <span className="text-2xl" role="img" aria-hidden>
          {icon}
        </span>
        <span
          className="text-base font-medium transition-colors duration-200"
          style={{ color: selected ? "var(--color-ink)" : "var(--color-charcoal)" }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
