import { getAllArticles } from "@/lib/articles";
import { SITE } from "@/lib/config";
import { TOPICS } from "@/lib/topics";

export const dynamic = "force-static";

export function GET() {
  const articles = getAllArticles().slice(0, 50);

  const items = articles
    .map((article) => {
      const topic = TOPICS[article.topic];
      const pubDate = article.publishedAt
        ? new Date(article.publishedAt).toUTCString()
        : new Date().toUTCString();

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE.url}/articles/${article.slug}/</link>
      <guid isPermaLink="true">${SITE.url}/articles/${article.slug}/</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(topic?.label ?? article.topic)}</category>
      <description>${escapeXml(article.title)} — ${escapeXml(topic?.label ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.title)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
