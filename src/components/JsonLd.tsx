import { ArticleMeta } from "@/types";

const SITE_URL = "https://kgraph57.github.io/business-athlete-lab";

interface ArticleJsonLdProps {
  readonly article: ArticleMeta;
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: "岡本賢",
      jobTitle: "小児科医",
    },
    publisher: {
      "@type": "Organization",
      name: "Business Athlete Lab",
      url: SITE_URL,
    },
    keywords: article.keywords.join(", "),
    url: `${SITE_URL}/articles/${article.slug}/`,
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}/`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Business Athlete Lab",
    url: SITE_URL,
    description:
      "医師・岡本賢が自らの身体で実践する、エビデンスベースの予防医療メディア。",
    author: {
      "@type": "Person",
      name: "岡本賢",
      jobTitle: "小児科医",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "岡本賢",
    jobTitle: "小児科医",
    description:
      "小児科医として臨床に立ちながら、CrossFit・HYROX・トライアスロンに挑む。予防医療の価値を、論文だけでなく自らの身体で検証する。",
    url: `${SITE_URL}/about/`,
    sameAs: ["https://note.com/kenokamoto"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
