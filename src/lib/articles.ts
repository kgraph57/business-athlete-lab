import fs from "fs";
import path from "path";
import { ArticleMeta, Topic } from "@/types";

// ビルド前に scripts/build-index.mjs で生成される
const INDEX_PATH = path.join(process.cwd(), "content", "index.json");
const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

interface IndexData {
  articles: (ArticleMeta & { filename: string })[];
  stats: Record<string, number>;
}

let _cache: IndexData | null = null;

function loadIndex(): IndexData {
  if (_cache) return _cache;

  if (!fs.existsSync(INDEX_PATH)) {
    return { articles: [], stats: {} };
  }

  const raw = fs.readFileSync(INDEX_PATH, "utf-8");
  _cache = JSON.parse(raw) as IndexData;
  return _cache;
}

export function getAllArticles(): ArticleMeta[] {
  return loadIndex().articles;
}

export function getArticlesByTopic(topic: Topic): ArticleMeta[] {
  return getAllArticles().filter((a) => a.topic === topic);
}

export function getArticleContent(slug: string): string | null {
  const index = loadIndex();
  const entry = index.articles.find((a) => a.slug === slug);
  if (!entry) return null;

  const filePath = path.join(CONTENT_DIR, entry.filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  const contentStart = raw.indexOf("## 記事内容");
  const contentEnd = raw.lastIndexOf("---");

  if (contentStart === -1) return raw;

  const content = raw.slice(
    contentStart + "## 記事内容".length,
    contentEnd > contentStart ? contentEnd : undefined
  );

  return content.trim();
}

export function getTopicStats(): Record<string, number> {
  return loadIndex().stats;
}
