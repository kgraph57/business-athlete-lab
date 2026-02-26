export const SITE = {
  title: "Business Athlete Lab",
  titleEn: "Business Athlete Lab",
  description: "働く身体をアップデート。ランチタイムで読む健康戦略。",
  url: "https://kgraph57.github.io/business-athlete-lab",
  author: "おかもん先生",
} as const;

const isProd = process.env.NODE_ENV === "production";

export const BASE_PATH = isProd ? "/business-athlete-lab" : "";
