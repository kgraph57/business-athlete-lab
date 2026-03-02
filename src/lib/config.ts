export const SITE = {
  title: "Business Athlete Lab",
  titleEn: "Business Athlete Lab",
  description:
    "医師・岡本賢が自らの身体で実践する、エビデンスベースの予防医療メディア。",
  url: "https://kgraph57.github.io/business-athlete-lab",
  author: "岡本賢",
  substackUrl: "https://businessathletelab.substack.com",
  noteUrl: "https://note.com/kgraph_",
  xUrl: "https://x.com/kgraph57",
  /** セミナー・講演・執筆依頼の問い合わせ先（Servicesページで使用） */
  contactEmail: "contact@businessathletelab.com",
} as const;

const isProd = process.env.NODE_ENV === "production";

export const BASE_PATH = isProd ? "/business-athlete-lab" : "";
