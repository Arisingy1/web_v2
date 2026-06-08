import Link from "next/link";
import Marquee from "./Marquee";
import { IconArrowRight, IconUpload } from "./icons";

const NAV_COLS = [
  {
    title: "Продукт",
    links: [
      { label: "Возможности", href: "/product" },
      { label: "Отчёты", href: "/reports" },
      { label: "Культурный код", href: "/culture" },
      { label: "ИИ-Ассистент", href: "/#assistant" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "Безопасность", href: "/security" },
      { label: "Тарифы", href: "/pricing" },
      { label: "Интеграции", href: "/product" },
      { label: "Демо", href: "/#demo" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-paper">
      {/* Scrolling marquee band (Amzigo-style) */}
      <Marquee tone="ink" />

      {/* CTA band (Block 7) */}
      <div className="container-x pb-16 pt-12">
        <div className="relative overflow-hidden rounded-[28px] border border-ink-700 bg-ink px-7 py-14 text-white md:px-16 md:py-24">
          {/* atmosphere */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-lime/10 blur-3xl"
            aria-hidden
          />
          {/* giant outlined wordmark */}
          <span
            className="wordmark-outline pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[20vw] md:text-[15rem]"
            aria-hidden
          >
            TalentMind
          </span>
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-5">
              <h2 className="text-balance text-3xl font-semibold leading-[1.1] md:text-[2.6rem]">
                Начните нанимать лучших с первого дня
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-lime-50/80">
                Ответим на все вопросы о продукте, условиях интеграции и проведём
                демо-презентацию.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end" id="demo">
              <Link href="/#upload" className="btn-primary w-full justify-center sm:w-auto">
                <IconUpload className="h-4 w-4" />
                Загрузить тестовое интервью
              </Link>
              <Link
                href="/#demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Записаться на демо
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Links + contacts */}
      <div className="relative overflow-hidden border-t border-line">
        {/* giant background wordmark */}
        <span
          className="pointer-events-none absolute -bottom-4 left-0 right-0 select-none text-center font-display text-[15vw] font-bold uppercase leading-none tracking-tighter text-ink/[0.04]"
          aria-hidden
        >
          TalentMind
        </span>
        <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink">
                <span className="h-3.5 w-3.5 rounded-[5px] bg-lime" />
              </span>
              <span className="font-display text-lg font-semibold text-ink">
                Talent<span className="text-lime-700">Mind</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-500">
              ИИ-анализ собеседований, soft skills и корпоративной совместимости по
              ДНК вашей компании.
            </p>
          </div>

          {NAV_COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-ink">{col.title}</span>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-ink-500 transition-colors hover:text-lime-700"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-ink">Контакты</span>
            <a
              href="mailto:info@talentmind.ru"
              className="text-sm text-ink-500 transition-colors hover:text-lime-700"
            >
              info@talentmind.ru
            </a>
            <a
              href="https://t.me/TalentMind_bot"
              className="text-sm text-ink-500 transition-colors hover:text-lime-700"
            >
              Telegram: @TalentMind_bot
            </a>
            <a
              href="tel:+74955405179"
              className="text-sm text-ink-500 transition-colors hover:text-lime-700"
            >
              +7 (495) 540-51-79
            </a>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center">
          <p>© 2026 ООО «Вебпрактик».</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="#" className="transition-colors hover:text-ink">
              Политика обработки персональных данных
            </Link>
            <Link href="#" className="transition-colors hover:text-ink">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
