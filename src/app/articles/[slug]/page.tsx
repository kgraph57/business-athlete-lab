import { getAllArticles, getArticleContent } from "@/lib/articles";
import { TOPICS, getTopicAccent } from "@/lib/topics";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { RevealSection } from "@/components/ui/RevealSection";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = getAllArticles();
  const meta = articles.find((a) => a.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: `${meta.title} — Business Athlete Lab`,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articles = getAllArticles();
  const meta = articles.find((a) => a.slug === slug);

  if (!meta) notFound();

  const content = getArticleContent(slug);
  const topic = TOPICS[meta.topic];
  const accent = getTopicAccent(meta.topic);

  const related = articles
    .filter((a) => a.topic === meta.topic && a.slug !== meta.slug)
    .slice(0, 3);

  return (
    <article>
      {/* Article Header */}
      <section className="bg-gradient-to-br from-cream-dark via-parchment to-sand/30 pb-16 pt-12">
        <div className="mx-auto max-w-[var(--max-prose)] px-6 md:px-0">
          <Link
            href="/articles/"
            className="text-label text-stone transition-colors hover:text-ink"
          >
            &larr; Library
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {topic && (
              <Link
                href={`/topics/${topic.id}/`}
                className="text-label transition-opacity hover:opacity-70"
                style={{ color: accent }}
              >
                {topic.labelEn}
              </Link>
            )}
            {meta.publishedAt && (
              <span className="text-xs text-stone">
                {meta.publishedAt.slice(0, 10)}
              </span>
            )}
            {meta.readingTime && (
              <span className="text-xs text-stone">{meta.readingTime}</span>
            )}
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {meta.title}
          </h1>

          {meta.keywords.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-sand px-3 py-1 text-xs text-stone"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      {content && (
        <div className="mx-auto max-w-[var(--max-prose)] px-6 py-[var(--space-block)] md:px-0">
          <div
            className="prose-aman"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>
      )}

      {/* Source link */}
      {meta.sourceUrl && (
        <div className="mx-auto max-w-[var(--max-prose)] px-6 pb-[var(--space-block)] md:px-0">
          <div className="border-t border-sand pt-8">
            <p className="text-sm text-stone">
              元記事:{" "}
              <a
                href={meta.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal underline underline-offset-4 decoration-sand transition-colors hover:decoration-charcoal"
              >
                note.com で読む &rarr;
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <RevealSection as="section" className="bg-cream-dark py-[var(--space-section)]">
          <div className="mx-auto max-w-[var(--max-content)] px-6 md:px-12">
            <h2 className="text-label mb-12">Related Articles</h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </RevealSection>
      )}
    </article>
  );
}

function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("- ")) {
      if (!inList) { html.push("<ul>"); inList = true; }
      html.push(`<li>${inlineFormat(trimmed.slice(2))}</li>`);
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<p>${inlineFormat(trimmed)}</p>`);
    }
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(text: string): string {
  return escapeHtml(text).replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>"
  );
}
