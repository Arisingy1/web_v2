"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrowRight, IconClose } from "./icons";

/* Amzigo-style persistent floating trial CTA — appears after the user scrolls,
   dismissible, never blocks the footer interaction. */
export default function StickyTrialBar() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-ink-700 bg-ink/95 py-2 pl-5 pr-2 shadow-lift backdrop-blur md:gap-5">
        <span className="hidden text-sm font-medium text-lime-50/90 sm:inline">
          Первые 5 интервью — бесплатно, без банковской карты
        </span>
        <span className="text-sm font-medium text-lime-50/90 sm:hidden">5 интервью бесплатно</span>
        <Link
          href="/#upload"
          className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-white transition-[filter] hover:brightness-105"
        >
          Загрузить интервью
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Скрыть предложение"
          className="flex h-8 w-8 items-center justify-center rounded-full text-lime-50/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
