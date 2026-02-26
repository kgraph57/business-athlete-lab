import Link from "next/link";
import { getAllTopics } from "@/lib/topics";

export function Footer() {
  const topics = getAllTopics();

  return (
    <footer className="border-t border-sand bg-cream-dark">
      <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
        <div className="grid gap-16 py-[var(--space-block)] md:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">
              Business Athlete Lab
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              働く身体をアップデート。
              <br />
              ランチタイムで読む健康戦略。
            </p>
          </div>

          <div>
            <p className="text-label mb-6">Topics</p>
            <ul className="space-y-3">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`/topics/${topic.id}/`}
                    className="text-sm text-charcoal transition-colors hover:text-ink"
                  >
                    {topic.label}
                    <span className="ml-2 text-stone">{topic.labelEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-6">Information</p>
            <ul className="space-y-3 text-sm text-charcoal">
              <li>
                <Link href="/about/" className="transition-colors hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/articles/" className="transition-colors hover:text-ink">
                  Article Library
                </Link>
              </li>
              <li>
                <a
                  href="https://note.com/kgraph_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  note.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-sand py-8 text-xs text-stone">
          <p>&copy; {new Date().getFullYear()} Business Athlete Lab</p>
          <p>Evidence-based wellness</p>
        </div>
      </div>
    </footer>
  );
}
