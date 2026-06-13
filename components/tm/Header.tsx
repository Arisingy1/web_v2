"use client";

import { useEffect, useState } from "react";
import { Arrow, GREEN } from "./ui";

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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // блокируем прокрутку фона при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // collapse-морфинг — только десктоп (lg+); на мобиле пилюля всегда полноразмерная
  const collapsed = isScrolled && !isManuallyExpanded;

  const expand = () => {
    if (collapsed) setIsManuallyExpanded(true);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full pt-4 sm:pt-5">
      <div className="flex w-full justify-center px-4 sm:px-6">
        {/* единый морфящийся контейнер: max-width от 1280px до «точки» 72px (только lg+) */}
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
          className={`relative flex w-full max-w-[1280px] items-center overflow-hidden rounded-full border border-black/5 bg-white py-2.5 px-5 shadow-[0_14px_40px_rgba(24,56,51,0.10)] transition-all duration-500 ease-in-out sm:py-3 lg:px-7 ${
            collapsed ? "lg:max-w-[72px] lg:cursor-pointer lg:justify-center lg:px-5" : "2xl:max-w-[1440px] 3xl:max-w-[1600px]"
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
            className={`relative flex h-8 shrink-0 items-center transition-all duration-500 ease-in-out w-[104px] ${
              collapsed ? "lg:w-8" : ""
            }`}
          >
            {/* полный логотип (виден в развёрнутом виде) */}
            <img
              src="/figma/logo.svg"
              alt="TalentMind"
              className={`absolute left-0 top-1/2 h-8 w-auto max-w-none -translate-y-1/2 transition-opacity duration-300 ${
                collapsed ? "lg:opacity-0" : "opacity-100"
              }`}
            />
            {/* знак (виден в свёрнутом виде на десктопе, ровно по центру) */}
            <img
              src="/logo-sign.svg"
              alt="TalentMind"
              className={`absolute left-1/2 top-1/2 h-8 w-auto -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ${
                collapsed ? "lg:opacity-100" : ""
              }`}
            />
          </a>

          {/* НАВИГАЦИЯ + КНОПКА (десктоп) — растворяются и схлопывают ширину */}
          <div
            className={`hidden flex-1 items-center overflow-hidden transition-all duration-500 ease-in-out lg:flex ${
              collapsed ? "ml-0 max-w-0 opacity-0 pointer-events-none" : "ml-6 max-w-[1500px] opacity-100"
            }`}
          >
            <nav className="mx-auto flex items-center gap-6 text-sm font-medium text-[#183833]/80 xl:gap-7">
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

          {/* БУРГЕР (мобайл/планшет) — открывает выезжающее меню */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen((v) => !v);
            }}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#183833] transition-colors hover:bg-[#F4F7F6] lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* ===================== МОБИЛЬНОЕ МЕНЮ ===================== */}
      {/* затемнение */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-[#0c1c18]/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      {/* выезжающая панель */}
      <div
        className={`fixed left-3 right-3 top-[80px] z-50 origin-top rounded-3xl border border-black/5 bg-white p-4 shadow-[0_30px_70px_rgba(24,56,51,0.18)] transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? "scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {LINKS.map(([l, href], i) => (
            <a
              key={l}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="ease-smooth flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-[#183833] transition-colors duration-200 hover:bg-[#F4F7F6]"
              style={{ transitionDelay: mobileOpen ? `${i * 25}ms` : "0ms" }}
            >
              {l}
              <Arrow className="h-4 w-4 text-[#183833]/40" />
            </a>
          ))}
        </nav>
        <div className="mt-3 flex flex-col gap-2.5 border-t border-black/5 pt-4">
          <a
            href="https://app.talentmind.ru"
            className="ease-smooth flex items-center justify-center rounded-full border border-[#183833]/12 px-5 py-3.5 text-[15px] font-medium text-[#183833] transition-colors hover:bg-[#F4F7F6]"
          >
            Войти
          </a>
          <a
            href="https://app.talentmind.ru"
            className="ease-smooth group flex items-center justify-center gap-1.5 rounded-full px-5 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_28px_rgba(122,184,0,0.32)] transition-all"
            style={{ background: GREEN }}
          >
            Попробовать бесплатно <Arrow className="text-white" />
          </a>
        </div>
      </div>
    </header>
  );
}
