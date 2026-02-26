import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <span className="text-label mb-6 block">404</span>
        <h1 className="font-serif text-3xl font-medium text-ink md:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-stone">
          お探しのページが見つかりませんでした。
        </p>
        <div className="divider mx-auto mt-8" />
        <Link
          href="/"
          className="mt-8 inline-block text-label text-stone transition-colors hover:text-ink"
        >
          &larr; Back to Home
        </Link>
      </div>
    </section>
  );
}
