import { SITE } from "@/lib/config";

interface Props {
  readonly variant?: "inline" | "banner";
}

export function NewsletterCTA({ variant = "inline" }: Props) {
  if (variant === "banner") {
    return (
      <section className="bg-ink py-[var(--space-block)]">
        <div className="mx-auto max-w-[var(--max-prose)] px-6 text-center md:px-12">
          <span className="text-label mb-6 block text-sand">Newsletter</span>
          <p className="font-serif text-2xl leading-relaxed text-cream md:text-3xl">
            毎週月曜、エビデンスを1本。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            最新の医学論文から厳選した知見を、週1回お届けします。
          </p>
          <a
            href={SITE.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm border border-cream/20 bg-cream px-8 py-3 text-sm font-medium tracking-wide text-ink transition-all hover:bg-cream/90"
          >
            Subscribe on Substack &rarr;
          </a>
        </div>
      </section>
    );
  }

  return (
    <div className="border-t border-sand pt-8">
      <span className="text-label mb-4 block">Newsletter</span>
      <p className="text-sm leading-relaxed text-charcoal">
        エビデンスベースの健康戦略を、週1回お届け。
      </p>
      <a
        href={SITE.substackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm text-charcoal underline underline-offset-4 decoration-sand transition-colors hover:decoration-charcoal"
      >
        Substack で購読する &rarr;
      </a>
    </div>
  );
}
