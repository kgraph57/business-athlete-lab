"use client";

import Link from "next/link";
import { SITE } from "@/lib/config";
import { TOPICS } from "@/lib/topics";

const TOPIC_ENTRIES = Object.values(TOPICS);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-sand bg-cream-dark">
      <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
        <div className="grid gap-16 py-[var(--space-block)] md:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">
              Business Athlete Lab
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              予防医療を、自分の身体で証明する。
              <br />
              医師・{SITE.author}のエビデンスベースメディア。
            </p>
          </div>

          <div>
            <p className="text-label mb-6">Navigation</p>
            <ul className="space-y-3 text-sm text-charcoal">
              <li>
                <Link
                  href="/about/"
                  className="transition-colors hover:text-ink"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/"
                  className="transition-colors hover:text-ink"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/services/"
                  className="transition-colors hover:text-ink"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-label mb-6">Topics</p>
            <ul className="space-y-3 text-sm text-charcoal">
              {TOPIC_ENTRIES.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.id}/`}
                    className="transition-colors hover:text-ink"
                  >
                    {topic.labelEn}
                    <span className="ml-1.5 text-stone">{topic.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-6">Connect</p>
            <ul className="space-y-3 text-sm text-charcoal">
              <li>
                <a
                  href={SITE.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  Newsletter (Substack)
                </a>
              </li>
              <li>
                <a
                  href={SITE.noteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  note.com
                </a>
              </li>
              <li>
                <a
                  href={SITE.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-sand py-8 text-xs text-stone">
          <p>&copy; {new Date().getFullYear()} Business Athlete Lab</p>
          <div className="flex items-center gap-6">
            <p>Evidence-based preventive medicine</p>
            <button
              onClick={scrollToTop}
              className="transition-colors hover:text-ink"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
