"use client";

import { useReveal } from "@/hooks/useReveal";
import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly as?: "div" | "section" | "article";
}

export function RevealSection({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: Props) {
  const { ref, isVisible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
