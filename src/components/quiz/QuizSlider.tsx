"use client";

import { useState, useCallback } from "react";

interface QuizSliderProps {
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly unit: string;
  readonly labels: readonly string[];
  readonly accent: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export function QuizSlider({
  min,
  max,
  step,
  unit,
  labels,
  accent,
  value,
  onChange,
}: QuizSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange],
  );

  return (
    <div className="w-full space-y-6">
      {/* Value display */}
      <div className="text-center">
        <span
          className="font-serif text-5xl font-semibold tabular-nums"
          style={{ color: accent }}
        >
          {value.toLocaleString()}
        </span>
        <span className="ml-2 text-lg text-stone">{unit}</span>
      </div>

      {/* Slider track */}
      <div className="relative px-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="quiz-slider w-full cursor-pointer"
          style={
            {
              "--slider-accent": accent,
              "--slider-percentage": `${percentage}%`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between px-2">
        {labels.map((label, i) => (
          <span key={label} className="text-xs text-stone">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
