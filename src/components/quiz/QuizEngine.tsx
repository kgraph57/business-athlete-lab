"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  QUIZ_STEPS,
  computeResult,
  type QuizStep,
  type QuizAnswer,
  type QuizResult as QuizResultType,
  type QuizSingleStep,
  type QuizMultipleStep,
  type QuizSliderStep,
  type QuizInfoStep,
} from "@/lib/quiz-data";
import { QuizProgress } from "./QuizProgress";
import { QuizOptionCard } from "./QuizOptionCard";
import { QuizSlider } from "./QuizSlider";
import { QuizInfoScreen } from "./QuizInfoScreen";
import { QuizResult } from "./QuizResult";

type Phase = "intro" | "quiz" | "result";
type SlideDirection = "enter-right" | "exit-left" | "enter-left" | "exit-right" | "idle";

export function QuizEngine() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<readonly QuizAnswer[]>([]);
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [slide, setSlide] = useState<SlideDirection>("idle");
  const [result, setResult] = useState<QuizResultType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep: QuizStep | undefined = QUIZ_STEPS[stepIndex];
  const totalSteps = QUIZ_STEPS.length;

  // Reset selection state when step changes
  useEffect(() => {
    if (!currentStep) return;
    setSelectedIds([]);
    if (currentStep.type === "slider") {
      const mid = Math.round((currentStep.min + currentStep.max) / 2);
      setSliderValue(mid);
    }
  }, [stepIndex, currentStep]);

  const animateTransition = useCallback(
    (direction: "forward" | "backward", callback: () => void) => {
      setSlide(direction === "forward" ? "exit-left" : "exit-right");
      setTimeout(() => {
        callback();
        setSlide(direction === "forward" ? "enter-right" : "enter-left");
        setTimeout(() => setSlide("idle"), 50);
      }, 300);
    },
    [],
  );

  const goNext = useCallback(() => {
    if (!currentStep) return;

    // Record answer for question steps
    if (currentStep.type !== "info") {
      let score = 0;
      let value: string | readonly string[] | number = "";

      if (currentStep.type === "single") {
        const opt = currentStep.options.find((o) => o.id === selectedIds[0]);
        score = opt?.score ?? 0;
        value = selectedIds[0] ?? "";
      } else if (currentStep.type === "multiple") {
        score = currentStep.options
          .filter((o) => selectedIds.includes(o.id))
          .reduce((sum, o) => sum + o.score, 0);
        value = selectedIds;
      } else if (currentStep.type === "slider") {
        score = currentStep.scoreMap(sliderValue);
        value = sliderValue;
      }

      setAnswers((prev) => [
        ...prev,
        { stepId: currentStep.id, value, score },
      ]);
    }

    // Last step → compute results
    if (stepIndex >= totalSteps - 1) {
      // Need to include the current answer in computation
      const finalAnswers =
        currentStep.type !== "info"
          ? [
              ...answers,
              {
                stepId: currentStep.id,
                value: currentStep.type === "slider" ? sliderValue : selectedIds,
                score:
                  currentStep.type === "slider"
                    ? currentStep.scoreMap(sliderValue)
                    : currentStep.type === "single"
                      ? (currentStep.options.find((o) => o.id === selectedIds[0])
                          ?.score ?? 0)
                      : currentStep.options
                          .filter((o) => selectedIds.includes(o.id))
                          .reduce((sum, o) => sum + o.score, 0),
              },
            ]
          : answers;

      animateTransition("forward", () => {
        setResult(computeResult(finalAnswers));
        setPhase("result");
      });
      return;
    }

    animateTransition("forward", () => {
      setStepIndex((i) => i + 1);
    });
  }, [currentStep, stepIndex, totalSteps, selectedIds, sliderValue, answers, animateTransition]);

  const goBack = useCallback(() => {
    if (stepIndex <= 0) return;
    animateTransition("backward", () => {
      setStepIndex((i) => i - 1);
      // Remove the last answer if going back from a question step
      setAnswers((prev) => {
        const prevStep = QUIZ_STEPS[stepIndex - 1];
        if (prevStep && prevStep.type !== "info") {
          return prev.filter((a) => a.stepId !== prevStep.id);
        }
        return prev;
      });
    });
  }, [stepIndex, animateTransition]);

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setStepIndex(0);
    setAnswers([]);
    setSelectedIds([]);
    setSliderValue(0);
    setResult(null);
    setSlide("idle");
  }, []);

  const handleSingleSelect = useCallback((optionId: string) => {
    setSelectedIds([optionId]);
  }, []);

  const handleMultiSelect = useCallback(
    (optionId: string, maxSelections?: number) => {
      setSelectedIds((prev) => {
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        }
        if (maxSelections && prev.length >= maxSelections) {
          return prev;
        }
        return [...prev, optionId];
      });
    },
    [],
  );

  const canProceed = (() => {
    if (!currentStep) return false;
    if (currentStep.type === "info") return true;
    if (currentStep.type === "slider") return true;
    return selectedIds.length > 0;
  })();

  // ─── Intro Screen ───
  if (phase === "intro") {
    return (
      <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-md space-y-8">
          {/* Icon */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-sage-light">
            <span className="text-6xl">🩺</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-3xl font-semibold text-ink md:text-4xl">
              ビジネスアスリート
              <br />
              スコア診断
            </h1>
            <p className="text-sm leading-relaxed text-stone">
              運動・睡眠・栄養・メンタル・生活習慣の5カテゴリーで、
              あなたの健康パフォーマンスを科学的に診断します。
            </p>
          </div>

          <div className="space-y-3 text-left">
            {[
              { icon: "⏱️", text: "所要時間：約3分" },
              { icon: "📊", text: "5カテゴリー × 質問" },
              { icon: "🔬", text: "エビデンスベースの解説付き" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 rounded-xl border border-sand/50 px-4 py-3"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-charcoal">{item.text}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPhase("quiz")}
            className="w-full rounded-full bg-ink px-8 py-4 text-sm font-medium tracking-wide text-cream transition-all hover:bg-charcoal"
          >
            診断をはじめる
          </button>
        </div>
      </div>
    );
  }

  // ─── Result Screen ───
  if (phase === "result" && result) {
    return (
      <div className="min-h-[calc(100vh-var(--header-height))] px-6 py-16">
        <QuizResult result={result} onRestart={handleRestart} />
      </div>
    );
  }

  // ─── Quiz Steps ───
  if (!currentStep) return null;

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col">
      {/* Top bar: progress + back */}
      <div className="sticky top-[var(--header-height)] z-30 border-b border-sand/30 bg-cream/95 px-6 pb-4 pt-4 backdrop-blur-sm">
        <div className="mx-auto max-w-lg">
          <QuizProgress
            current={stepIndex + 1}
            total={totalSteps}
            accent={currentStep.accent}
            categoryLabel={currentStep.categoryLabel}
          />
        </div>
      </div>

      {/* Content area with slide animation */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div
          ref={containerRef}
          className={`mx-auto w-full max-w-lg transition-all duration-300 ${getSlideClass(slide)}`}
        >
          {currentStep.type === "info" && (
            <QuizInfoScreen
              icon={(currentStep as QuizInfoStep).icon}
              title={(currentStep as QuizInfoStep).title}
              body={(currentStep as QuizInfoStep).body}
              source={(currentStep as QuizInfoStep).source}
              accent={currentStep.accent}
            />
          )}

          {currentStep.type === "single" && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                  {(currentStep as QuizSingleStep).question}
                </h2>
                {(currentStep as QuizSingleStep).subtitle && (
                  <p className="mt-2 text-sm text-stone">
                    {(currentStep as QuizSingleStep).subtitle}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                {(currentStep as QuizSingleStep).options.map((opt, i) => (
                  <QuizOptionCard
                    key={opt.id}
                    icon={opt.icon}
                    label={opt.label}
                    selected={selectedIds.includes(opt.id)}
                    accent={currentStep.accent}
                    onSelect={() => handleSingleSelect(opt.id)}
                    animationDelay={i * 60}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep.type === "multiple" && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                  {(currentStep as QuizMultipleStep).question}
                </h2>
                {(currentStep as QuizMultipleStep).subtitle && (
                  <p className="mt-2 text-sm text-stone">
                    {(currentStep as QuizMultipleStep).subtitle}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                {(currentStep as QuizMultipleStep).options.map((opt, i) => (
                  <QuizOptionCard
                    key={opt.id}
                    icon={opt.icon}
                    label={opt.label}
                    selected={selectedIds.includes(opt.id)}
                    accent={currentStep.accent}
                    onSelect={() =>
                      handleMultiSelect(
                        opt.id,
                        (currentStep as QuizMultipleStep).maxSelections,
                      )
                    }
                    animationDelay={i * 60}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep.type === "slider" && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                  {(currentStep as QuizSliderStep).question}
                </h2>
                {(currentStep as QuizSliderStep).subtitle && (
                  <p className="mt-2 text-sm text-stone">
                    {(currentStep as QuizSliderStep).subtitle}
                  </p>
                )}
              </div>
              <QuizSlider
                min={(currentStep as QuizSliderStep).min}
                max={(currentStep as QuizSliderStep).max}
                step={(currentStep as QuizSliderStep).step}
                unit={(currentStep as QuizSliderStep).unit}
                labels={(currentStep as QuizSliderStep).labels}
                accent={currentStep.accent}
                value={sliderValue}
                onChange={setSliderValue}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 border-t border-sand/30 bg-cream/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-4">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sand text-stone transition-colors hover:border-ink hover:text-ink"
              aria-label="前の質問へ"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed}
            className="flex-1 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: canProceed ? currentStep.accent : "var(--color-sand)",
              color: canProceed ? "var(--color-cream)" : "var(--color-stone)",
            }}
          >
            {stepIndex >= totalSteps - 1 ? "結果を見る" : "次へ"}
          </button>
        </div>
      </div>
    </div>
  );
}

function getSlideClass(direction: SlideDirection): string {
  switch (direction) {
    case "exit-left":
      return "opacity-0 -translate-x-8";
    case "exit-right":
      return "opacity-0 translate-x-8";
    case "enter-right":
      return "opacity-0 translate-x-8";
    case "enter-left":
      return "opacity-0 -translate-x-8";
    default:
      return "opacity-100 translate-x-0";
  }
}
