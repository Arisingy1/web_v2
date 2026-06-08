"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconClose, IconMenu, IconUpload } from "./icons";

const NAV = [
  { label: "Продукт", href: "/product" },
  { label: "Отчёты", href: "/reports" },
  { label: "Культурный код", href: "/culture" },
  { label: "Безопасность", href: "/security" },
];

function DiagArrow({ light }: { light?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
        light ? "text-white" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="TalentMind — на главную">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink">
        <span className="h-3.5 w-3.5 rounded-[5px] bg-lime" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-lime-50" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-ink">
        Talent<span className="text-lime-700">Mind</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`container-x relative flex h-14 items-center justify-between gap-4 rounded-full border px-3 pl-5 transition-all duration-300 md:h-16 ${
          scrolled
            ? "border-line bg-white/90 shadow-soft backdrop-blur-xl"
            : "border-line-green/70 bg-white/70 backdrop-blur-md"
        }`}
      >
        <Logo />

        {/* center nav (flex-1 keeps it centered without overlapping the buttons) */}
        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          aria-label="Основная навигация"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-lime-50 text-ink" : "text-ink-500 hover:bg-lime-50/60 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* right buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/reports"
            className="group hidden items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink xl:inline-flex"
          >
            Посмотреть отчёт
            <DiagArrow />
          </Link>
          <Link href="/#upload" className="group btn-primary hidden md:inline-flex">
            <IconUpload className="h-4 w-4" />
            Загрузить интервью
            <DiagArrow light />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="container-x mt-3 rounded-3xl border border-line bg-white p-2 shadow-lift lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-lime-50"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-lime-50">
              Тарифы
            </Link>
            <Link href="/#upload" className="btn-primary mt-2">
              <IconUpload className="h-4 w-4" />
              Загрузить интервью
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
