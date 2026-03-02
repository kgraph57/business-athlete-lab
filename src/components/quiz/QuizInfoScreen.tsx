"use client";

interface QuizInfoScreenProps {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
  readonly source?: string;
  readonly accent: string;
}

export function QuizInfoScreen({
  icon,
  title,
  body,
  source,
  accent,
}: QuizInfoScreenProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Decorative icon circle */}
      <div
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          background: `color-mix(in srgb, ${accent} 12%, var(--color-cream))`,
        }}
      >
        <span className="text-5xl" role="img" aria-hidden>
          {icon}
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-serif text-2xl font-semibold md:text-3xl"
        style={{ color: accent }}
      >
        {title}
      </h2>

      {/* Divider */}
      <div
        className="mx-auto my-6 h-px w-12"
        style={{ background: accent }}
      />

      {/* Body */}
      <p className="max-w-md text-base leading-relaxed text-charcoal">
        {body}
      </p>

      {/* Source citation */}
      {source && (
        <p className="mt-6 text-xs tracking-wide text-stone">
          {source}
        </p>
      )}
    </div>
  );
}
