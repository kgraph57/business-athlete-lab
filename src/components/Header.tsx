"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/topics/", label: "Topics" },
  { href: "/articles/", label: "Library" },
  { href: "/about/", label: "About" },
] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/90 shadow-[0_1px_3px_rgba(42,40,37,0.04)]"
            : "bg-transparent"
        }`}
        style={{
          height: "var(--header-height)",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="mx-auto flex h-full max-w-[var(--max-wide)] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-wide text-ink"
          >
            Business Athlete Lab
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-label text-stone transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 text-stone md:hidden"
            aria-label="メニューを開く"
          >
            <span className="text-label">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span className="block h-px w-full bg-stone" />
              <span className="block h-px w-full bg-stone" />
            </div>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ナビゲーションメニュー"
          className="fixed inset-0 z-[100] flex flex-col bg-cream"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-serif text-lg font-semibold text-ink">
              Business Athlete Lab
            </span>
            <button
              onClick={closeMenu}
              className="text-label text-stone"
              aria-label="メニューを閉じる"
              autoFocus
            >
              Close
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="font-serif text-2xl text-ink transition-colors hover:text-stone"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
