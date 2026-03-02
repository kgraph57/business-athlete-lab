/**
 * Quiz data & scoring for "ビジネスアスリートスコア診断"
 * Lasta-style multi-step health assessment
 */

export type QuizStepType = "single" | "multiple" | "slider" | "info";

export interface QuizOption {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly score: number;
  readonly accent?: string;
}

export interface QuizStepBase {
  readonly id: string;
  readonly category: string;
  readonly categoryLabel: string;
  readonly accent: string;
}

export interface QuizSingleStep extends QuizStepBase {
  readonly type: "single";
  readonly question: string;
  readonly subtitle?: string;
  readonly options: readonly QuizOption[];
}

export interface QuizMultipleStep extends QuizStepBase {
  readonly type: "multiple";
  readonly question: string;
  readonly subtitle?: string;
  readonly options: readonly QuizOption[];
  readonly maxSelections?: number;
}

export interface QuizSliderStep extends QuizStepBase {
  readonly type: "slider";
  readonly question: string;
  readonly subtitle?: string;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly unit: string;
  readonly labels: readonly string[];
  readonly scoreMap: (value: number) => number;
}

export interface QuizInfoStep extends QuizStepBase {
  readonly type: "info";
  readonly title: string;
  readonly body: string;
  readonly source?: string;
  readonly icon: string;
}

export type QuizStep =
  | QuizSingleStep
  | QuizMultipleStep
  | QuizSliderStep
  | QuizInfoStep;

export interface QuizAnswer {
  readonly stepId: string;
  readonly value: string | readonly string[] | number;
  readonly score: number;
}

export interface CategoryScore {
  readonly category: string;
  readonly label: string;
  readonly score: number;
  readonly maxScore: number;
  readonly accent: string;
}

export interface QuizResult {
  readonly totalScore: number;
  readonly maxScore: number;
  readonly percentage: number;
  readonly grade: string;
  readonly gradeLabel: string;
  readonly categories: readonly CategoryScore[];
  readonly recommendation: string;
}

// ──────── Question Data ────────

const ACCENTS = {
  exercise: "var(--color-sage)",
  sleep: "var(--color-indigo)",
  nutrition: "var(--color-terracotta)",
  mental: "var(--color-lavender)",
  lifestyle: "var(--color-moss)",
} as const;

export const QUIZ_STEPS: readonly QuizStep[] = [
  // ── Section 1: Exercise ──
  {
    id: "info-exercise",
    type: "info",
    category: "exercise",
    categoryLabel: "運動",
    accent: ACCENTS.exercise,
    title: "Section 1: 運動",
    body: "WHOは成人に週150分以上の中等度有酸素運動を推奨。定期的な運動は全死亡リスクを最大31%低下させます。",
    source: "WHO Physical Activity Guidelines, 2020",
    icon: "🏃",
  },
  {
    id: "ex-frequency",
    type: "single",
    category: "exercise",
    categoryLabel: "運動",
    accent: ACCENTS.exercise,
    question: "週に何日、30分以上の運動をしていますか？",
    options: [
      { id: "ex-0", label: "ほぼしない", icon: "🛋️", score: 0 },
      { id: "ex-1", label: "週1〜2日", icon: "🚶", score: 1 },
      { id: "ex-3", label: "週3〜4日", icon: "🏋️", score: 2 },
      { id: "ex-5", label: "週5日以上", icon: "🔥", score: 3 },
    ],
  },
  {
    id: "ex-type",
    type: "multiple",
    category: "exercise",
    categoryLabel: "運動",
    accent: ACCENTS.exercise,
    question: "普段どんな運動をしていますか？",
    subtitle: "複数選択可",
    maxSelections: 4,
    options: [
      { id: "run", label: "ランニング", icon: "👟", score: 1 },
      { id: "strength", label: "筋トレ", icon: "💪", score: 1 },
      { id: "yoga", label: "ヨガ・ストレッチ", icon: "🧘", score: 1 },
      { id: "swim", label: "水泳", icon: "🏊", score: 1 },
    ],
  },
  {
    id: "ex-steps",
    type: "slider",
    category: "exercise",
    categoryLabel: "運動",
    accent: ACCENTS.exercise,
    question: "1日の平均歩数はどれくらい？",
    min: 1000,
    max: 15000,
    step: 1000,
    unit: "歩",
    labels: ["1,000", "8,000", "15,000"],
    scoreMap: (v: number) => (v >= 10000 ? 3 : v >= 7000 ? 2 : v >= 4000 ? 1 : 0),
  },

  // ── Section 2: Sleep ──
  {
    id: "info-sleep",
    type: "info",
    category: "sleep",
    categoryLabel: "睡眠",
    accent: ACCENTS.sleep,
    title: "Section 2: 睡眠",
    body: "慢性的な睡眠不足は心血管疾患リスクを48%増加。7〜9時間の睡眠が認知機能と免疫力の維持に不可欠です。",
    source: "National Sleep Foundation, 2025",
    icon: "🌙",
  },
  {
    id: "sl-hours",
    type: "single",
    category: "sleep",
    categoryLabel: "睡眠",
    accent: ACCENTS.sleep,
    question: "平均的な睡眠時間は？",
    options: [
      { id: "sl-5", label: "5時間未満", icon: "😵", score: 0 },
      { id: "sl-6", label: "5〜6時間", icon: "😴", score: 1 },
      { id: "sl-7", label: "6〜7時間", icon: "😊", score: 2 },
      { id: "sl-8", label: "7時間以上", icon: "✨", score: 3 },
    ],
  },
  {
    id: "sl-quality",
    type: "single",
    category: "sleep",
    categoryLabel: "睡眠",
    accent: ACCENTS.sleep,
    question: "睡眠の質に満足していますか？",
    options: [
      { id: "sq-1", label: "全く満足していない", icon: "😞", score: 0 },
      { id: "sq-2", label: "あまり満足していない", icon: "🤔", score: 1 },
      { id: "sq-3", label: "まあまあ満足", icon: "🙂", score: 2 },
      { id: "sq-4", label: "とても満足", icon: "😄", score: 3 },
    ],
  },
  {
    id: "sl-routine",
    type: "single",
    category: "sleep",
    categoryLabel: "睡眠",
    accent: ACCENTS.sleep,
    question: "就寝前のルーティンはありますか？",
    subtitle: "例：ブルーライトカット、瞑想、入浴",
    options: [
      { id: "sr-0", label: "特にない", icon: "📱", score: 0 },
      { id: "sr-1", label: "たまに意識する", icon: "🔔", score: 1 },
      { id: "sr-2", label: "毎日実践している", icon: "🌿", score: 3 },
    ],
  },

  // ── Section 3: Nutrition ──
  {
    id: "info-nutrition",
    type: "info",
    category: "nutrition",
    categoryLabel: "栄養",
    accent: ACCENTS.nutrition,
    title: "Section 3: 栄養",
    body: "地中海食パターンの遵守は全死亡リスクを25%低下。腸内環境の多様性がメンタルヘルスにも直結します。",
    source: "PREDIMED Study, NEJM 2018",
    icon: "🥗",
  },
  {
    id: "nu-vegetables",
    type: "single",
    category: "nutrition",
    categoryLabel: "栄養",
    accent: ACCENTS.nutrition,
    question: "1日に野菜・果物をどれくらい食べますか？",
    options: [
      { id: "nv-0", label: "ほとんど食べない", icon: "🍔", score: 0 },
      { id: "nv-1", label: "1〜2品", icon: "🥕", score: 1 },
      { id: "nv-3", label: "3〜4品", icon: "🥗", score: 2 },
      { id: "nv-5", label: "5品以上", icon: "🌿", score: 3 },
    ],
  },
  {
    id: "nu-water",
    type: "slider",
    category: "nutrition",
    categoryLabel: "栄養",
    accent: ACCENTS.nutrition,
    question: "1日の水分摂取量は？（お茶・コーヒー含む）",
    min: 500,
    max: 3000,
    step: 250,
    unit: "mL",
    labels: ["500mL", "1.5L", "3L"],
    scoreMap: (v: number) => (v >= 2000 ? 3 : v >= 1500 ? 2 : v >= 1000 ? 1 : 0),
  },
  {
    id: "nu-processed",
    type: "single",
    category: "nutrition",
    categoryLabel: "栄養",
    accent: ACCENTS.nutrition,
    question: "加工食品・外食の頻度は？",
    options: [
      { id: "np-daily", label: "ほぼ毎日", icon: "🏪", score: 0 },
      { id: "np-often", label: "週3〜4回", icon: "🍱", score: 1 },
      { id: "np-some", label: "週1〜2回", icon: "🍳", score: 2 },
      { id: "np-rare", label: "ほとんどない", icon: "👨‍🍳", score: 3 },
    ],
  },

  // ── Section 4: Mental ──
  {
    id: "info-mental",
    type: "info",
    category: "mental",
    categoryLabel: "メンタル",
    accent: ACCENTS.mental,
    title: "Section 4: メンタル",
    body: "8週間のマインドフルネス実践で扁桃体の灰白質密度が減少し、ストレス反応が有意に低下することが示されています。",
    source: "Hölzel et al., Psychiatry Research 2011",
    icon: "🧠",
  },
  {
    id: "me-stress",
    type: "single",
    category: "mental",
    categoryLabel: "メンタル",
    accent: ACCENTS.mental,
    question: "日常のストレスレベルは？",
    options: [
      { id: "ms-high", label: "かなり高い", icon: "🔴", score: 0 },
      { id: "ms-mod", label: "やや高い", icon: "🟠", score: 1 },
      { id: "ms-low", label: "普通", icon: "🟡", score: 2 },
      { id: "ms-min", label: "低い", icon: "🟢", score: 3 },
    ],
  },
  {
    id: "me-mindfulness",
    type: "single",
    category: "mental",
    categoryLabel: "メンタル",
    accent: ACCENTS.mental,
    question: "瞑想やマインドフルネスの習慣は？",
    options: [
      { id: "mm-0", label: "全くない", icon: "❌", score: 0 },
      { id: "mm-1", label: "興味はある", icon: "💭", score: 1 },
      { id: "mm-2", label: "たまに実践", icon: "🧘", score: 2 },
      { id: "mm-3", label: "定期的に実践", icon: "🌸", score: 3 },
    ],
  },

  // ── Section 5: Lifestyle ──
  {
    id: "info-lifestyle",
    type: "info",
    category: "lifestyle",
    categoryLabel: "生活習慣",
    accent: ACCENTS.lifestyle,
    title: "Section 5: 生活習慣",
    body: "定期的な健康診断の受診と禁煙で、予防可能な死亡の最大40%を回避できると推定されています。",
    source: "Lancet Global Health, 2023",
    icon: "🏠",
  },
  {
    id: "ls-checkup",
    type: "single",
    category: "lifestyle",
    categoryLabel: "生活習慣",
    accent: ACCENTS.lifestyle,
    question: "直近1年以内に健康診断を受けましたか？",
    options: [
      { id: "lc-no", label: "受けていない", icon: "🚫", score: 0 },
      { id: "lc-basic", label: "基本健診のみ", icon: "📋", score: 1 },
      { id: "lc-full", label: "人間ドック受診", icon: "🏥", score: 3 },
    ],
  },
  {
    id: "ls-alcohol",
    type: "single",
    category: "lifestyle",
    categoryLabel: "生活習慣",
    accent: ACCENTS.lifestyle,
    question: "飲酒の頻度は？",
    options: [
      { id: "la-daily", label: "毎日", icon: "🍺", score: 0 },
      { id: "la-often", label: "週3〜4回", icon: "🍷", score: 1 },
      { id: "la-some", label: "週1〜2回", icon: "🥂", score: 2 },
      { id: "la-rare", label: "ほとんど飲まない", icon: "💧", score: 3 },
    ],
  },
  {
    id: "ls-screen",
    type: "slider",
    category: "lifestyle",
    categoryLabel: "生活習慣",
    accent: ACCENTS.lifestyle,
    question: "仕事以外のスクリーンタイムは1日何時間？",
    min: 0,
    max: 8,
    step: 1,
    unit: "時間",
    labels: ["0h", "4h", "8h"],
    scoreMap: (v: number) => (v <= 1 ? 3 : v <= 2 ? 2 : v <= 4 ? 1 : 0),
  },
];

// ──────── Scoring ────────

export function computeResult(answers: readonly QuizAnswer[]): QuizResult {
  const categoryMap = new Map<
    string,
    { label: string; total: number; maxTotal: number; accent: string }
  >();

  for (const step of QUIZ_STEPS) {
    if (step.type === "info") continue;
    const existing = categoryMap.get(step.category);
    const maxForStep = step.type === "slider" ? 3 : Math.max(...(step.type === "single" || step.type === "multiple" ? step.options.map((o) => o.score) : [3]));
    if (existing) {
      categoryMap.set(step.category, {
        ...existing,
        maxTotal: existing.maxTotal + maxForStep,
      });
    } else {
      categoryMap.set(step.category, {
        label: step.categoryLabel,
        total: 0,
        maxTotal: maxForStep,
        accent: step.accent,
      });
    }
  }

  for (const answer of answers) {
    const step = QUIZ_STEPS.find((s) => s.id === answer.stepId);
    if (!step) continue;
    const existing = categoryMap.get(step.category);
    if (existing) {
      categoryMap.set(step.category, {
        ...existing,
        total: existing.total + answer.score,
      });
    }
  }

  const categories: CategoryScore[] = Array.from(categoryMap.entries()).map(
    ([category, data]) => ({
      category,
      label: data.label,
      score: data.total,
      maxScore: data.maxTotal,
      accent: data.accent,
    }),
  );

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  const maxScore = categories.reduce((sum, c) => sum + c.maxScore, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const { grade, gradeLabel, recommendation } = getGradeInfo(percentage);

  return {
    totalScore,
    maxScore,
    percentage,
    grade,
    gradeLabel,
    categories,
    recommendation,
  };
}

function getGradeInfo(pct: number): {
  grade: string;
  gradeLabel: string;
  recommendation: string;
} {
  if (pct >= 85)
    return {
      grade: "S",
      gradeLabel: "エリートアスリート級",
      recommendation:
        "素晴らしい健康管理です。この水準を維持しつつ、さらに高度な予防医療（遺伝子検査、バイオマーカー追跡など）を検討してみてください。",
    };
  if (pct >= 70)
    return {
      grade: "A",
      gradeLabel: "ビジネスアスリート",
      recommendation:
        "高い健康意識をお持ちです。弱点カテゴリーを1つ選んで重点的に改善すると、さらに大きな変化が期待できます。",
    };
  if (pct >= 50)
    return {
      grade: "B",
      gradeLabel: "健康意識の芽生え",
      recommendation:
        "基盤はできています。まず睡眠の質と運動頻度の2つに絞って、週単位の小さな目標を設定しましょう。",
    };
  if (pct >= 30)
    return {
      grade: "C",
      gradeLabel: "改善の余地あり",
      recommendation:
        "生活習慣の見直しで大きく改善できます。まずは毎日の歩数を+2,000歩、就寝時間を30分早めることから始めましょう。",
    };
  return {
    grade: "D",
    gradeLabel: "要注意",
    recommendation:
      "健康リスクが高まっている可能性があります。まず健康診断の受診と、1つだけ生活習慣を変えることから。小さな一歩が大きな変化を生みます。",
  };
}

export function getQuestionSteps(): readonly QuizStep[] {
  return QUIZ_STEPS.filter((s) => s.type !== "info");
}

export function getTotalQuestionCount(): number {
  return getQuestionSteps().length;
}
