/**
 * ビルド前に content/articles/*.md をスキャンして
 * content/index.json を生成するスクリプト
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const INDEX_PATH = path.join(ROOT, "content", "index.json");

function slugify(filename) {
  return filename
    .replace(/\.md$/, "")
    .replace(/[^\w\u3000-\u9FFF\u30A0-\u30FF\u3040-\u309F-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function inferTopic(category, genre, keywords) {
  const all = `${category} ${genre} ${keywords.join(" ")}`.toLowerCase();
  if (all.includes("睡眠") || all.includes("sleep") || genre === "睡眠") return "sleep";
  if (all.includes("運動") || all.includes("フィットネス") || all.includes("筋トレ") || all.includes("サウナ") || genre === "運動") return "exercise";
  if (all.includes("栄養") || all.includes("食事") || all.includes("タンパク質") || all.includes("腸内") || genre === "食事") return "nutrition";
  if (all.includes("メンタル") || all.includes("ストレス") || all.includes("認知")) return "mental";
  if (all.includes("老化") || all.includes("長寿") || all.includes("アンチエイジング")) return "aging";
  if (all.includes("生活") || all.includes("習慣") || all.includes("予防")) return "lifestyle";
  return "integrative";
}

function parseArticle(raw, filename) {
  const lines = raw.split("\n");
  const title = (lines[0] ?? "").replace(/^#\s*/, "").trim();
  if (!title) return null;

  const extract = (label) => {
    const line = lines.find((l) => l.startsWith(`**${label}:**`));
    if (!line) return "";
    return line.replace(`**${label}:**`, "").trim();
  };

  const keywordsRaw = extract("キーワード");
  const keywords = keywordsRaw
    ? keywordsRaw.split(",").map((k) => k.trim().replace(/^#/, ""))
    : [];

  const category = extract("カテゴリ");
  const genre = extract("ジャンル");
  const wordMatch = raw.match(/\*文字数:\s*(\d+)文字\*/);

  return {
    slug: slugify(filename),
    filename,
    title,
    articleId: extract("記事ID"),
    publishedAt: extract("公開日"),
    category,
    genre,
    readingTime: extract("推定読書時間"),
    keywords,
    sourceUrl: extract("元記事URL"),
    topic: inferTopic(category, genre, keywords),
    subtopic: genre,
    wordCount: wordMatch ? wordMatch[1] : "",
  };
}

// Main
const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
console.log(`Scanning ${files.length} articles...`);

const articles = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
  const meta = parseArticle(raw, file);
  if (meta) articles.push(meta);
}

articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

// Stats
const stats = {};
for (const a of articles) {
  stats[a.topic] = (stats[a.topic] ?? 0) + 1;
}

fs.writeFileSync(INDEX_PATH, JSON.stringify({ articles, stats }, null, 0));
console.log(`Generated index.json: ${articles.length} articles`);
console.log("Topic stats:", stats);
