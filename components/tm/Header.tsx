"use client";

import { useEffect, useState } from "react";
import { Arrow, GREEN, INK } from "./ui";

const LINKS: [string, string][] = [
  ["Отчёт", "/otchet"],
  ["Корп. культура", "/culture"],
  ["ИИ-ассистент", "/product"],
  ["API", "/api"],
  ["Безопасность", "/security"],
  ["Тарифы", "/pricing"],
  ["Контакты", "/contacts"],
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      // любой скролл сбрасывает ручное раскрытие → шапка снова свернётся
      setIsManuallyExpanded(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collapsed = isScrolled && !isManuallyExpanded;

  const expand = () => {
    if (collapsed) setIsManuallyExpanded(true);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full pt-5">
      <div className="flex w-full justify-center px-6">
        {/* единый морфящийся контейнер: max-width от 1280px до «точки» 72px */}
        <div
          onClick={collapsed ? expand : undefined}
          onKeyDown={(e) => {
            if (collapsed && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              expand();
            }
          }}
          role={collapsed ? "button" : undefined}
          tabIndex={collapsed ? 0 : -1}
          aria-label={collapsed ? "Развернуть меню" : undefined}
          className={`relative flex w-full items-center overflow-hidden rounded-full border border-black/5 bg-white py-3 shadow-[0_14px_40px_rgba(24,56,51,0.10)] transition-all duration-500 ease-in-out ${
            collapsed ? "max-w-[72px] cursor-pointer px-5" : "max-w-[1280px] px-7"
          }`}
        >
          {/* ЛОГОТИП-ССЫЛКА на главную; в свёрнутом виде клик разворачивает шапку */}
          <a
            href="/"
            onClick={(e) => {
              // свёрнут → не переходим, а разворачиваем (клик всплывёт к контейнеру)
              if (collapsed) e.preventDefault();
            }}
            aria-label="TalentMind — на главную"
            className={`relative flex h-8 shrink-0 items-center transition-all duration-500 ease-in-out ${
              collapsed ? "w-8" : "w-[104px]"
            }`}
          >
            {/* полный логотип (виден в развёрнутом виде) */}
            <img
              src="/figma/logo.svg"
              alt="TalentMind"
              className={`absolute left-0 top-1/2 h-8 w-auto max-w-none -translate-y-1/2 transition-opacity duration-300 ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* знак (виден в свёрнутом виде, ровно по центру) */}
            <img
              src="/logo-sign.svg"
              alt="TalentMind"
              className={`absolute left-1/2 top-1/2 h-8 w-auto -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                collapsed ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>

          {/* НАВИГАЦИЯ + КНОПКА — растворяются и схлопывают ширину */}
          <div
            className={`flex flex-1 items-center overflow-hidden transition-all duration-500 ease-in-out ${
              collapsed ? "ml-0 max-w-0 opacity-0" : "ml-6 max-w-[1100px] opacity-100"
            } ${collapsed ? "pointer-events-none" : ""}`}
          >
            <nav className="mx-auto hidden items-center gap-7 text-sm font-medium text-[#183833]/80 lg:flex">
              {LINKS.map(([l, href]) => (
                <a key={l} href={href} className="ease-smooth whitespace-nowrap transition-colors duration-300 hover:text-[#7AB800]">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href="https://app.talentmind.ru"
                className="ease-smooth whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium text-[#183833] transition-all duration-300 hover:bg-[#F4F7F6]"
              >
                Войти
              </a>
              <a
                href="https://app.talentmind.ru"
                className="ease-smooth group flex items-center gap-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(122,184,0,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Попробовать бесплатно <Arrow className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
