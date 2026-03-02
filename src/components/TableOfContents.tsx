"use client";

import { useState, useEffect, useCallback } from "react";

interface TocItem {
  readonly id: string;
  readonly text: string;
  readonly level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<readonly TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector(".prose-aman");
    if (!article) return;

    const headings = article.querySelectorAll("h2, h3");
    const tocItems: TocItem[] = [];

    headings.forEach((heading, i) => {
      const id = heading.id || `heading-${i}`;
      if (!heading.id) heading.id = id;
      tocItems.push({
        id,
        text: heading.textContent ?? "",
        level: heading.tagName === "H2" ? 2 : 3,
      });
    });

    setItems(tocItems);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      className="hidden xl:block sticky top-[calc(var(--header-height)+2rem)] max-h-[calc(100vh-var(--header-height)-4rem)] overflow-y-auto"
      aria-label="目次"
    >
      <p className="text-label mb-4">Contents</p>
      <ul className="space-y-2 border-l border-sand pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`block text-left text-sm leading-relaxed transition-colors duration-200 ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "text-ink font-medium"
                  : "text-stone hover:text-charcoal"
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
