import Link from "next/link";

/** Placeholder home page — Phase 3 will replace this with the full start screen. */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-32 text-center">
      <h1 className="text-[56px] font-bold text-text-primary tracking-tight leading-none">
        DEG&<br />DESIGN
      </h1>
      <p className="text-base text-text-secondary max-w-sm">
        Lokala råvaror, 74% hydrering, minst 24 timmars jäsning.
      </p>
      <Link
        href="/kitchen-sink"
        className="inline-flex items-center px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity"
      >
        View component kitchen sink →
      </Link>
    </main>
  );
}
