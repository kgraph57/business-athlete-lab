interface Props {
  readonly title: string;
  readonly subtitle?: string;
  readonly variant?: "full" | "half" | "minimal";
}

export function Hero({
  title,
  subtitle,
  variant = "full",
}: Props) {
  const heightClass = {
    full: "min-h-[80vh]",
    half: "min-h-[50vh]",
    minimal: "min-h-[35vh]",
  }[variant];

  return (
    <section
      className={`relative flex items-end ${heightClass} overflow-hidden bg-gradient-to-br from-cream-dark via-parchment to-sand/30`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[var(--max-content)] px-6 pb-20 md:px-12 md:pb-28">
        <h1
          className="max-w-3xl font-serif font-semibold leading-tight text-ink"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
