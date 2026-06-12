import { Send } from "lucide-react";
import { INK } from "./ui";

export default function Footer() {
  const cols: { h: string; links: [string, string][] }[] = [
    { h: "Продукт", links: [["ИИ-ассистент", "/product"], ["Отчёт по кандидату", "/otchet"], ["Корп. культура", "/culture"]] },
    { h: "Платформа", links: [["API", "/api"], ["Тарифы", "/pricing"]] },
  ];
  return (
    <footer className="relative z-10 overflow-hidden pt-20 text-white" style={{ background: INK }}>
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-[1.8fr_1fr_1fr]">
        <div>
          <img
            src="/figma/logo.svg"
            alt="TalentMind"
            className="h-9 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="mt-4 max-w-xs text-sm text-white/55">
            Сделано для команд, которые нанимают лучших
          </p>
          <a
            href="https://t.me/talentmind"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <Send className="h-4 w-4" /> Telegram-канал
          </a>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <p className="text-sm font-semibold">{col.h}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map(([l, href]) => (
                <li key={l}>
                  <a href={href} className="text-sm text-white/55 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-8 text-sm text-white/40 sm:flex-row">
        <p>© 2026 ООО «Вебпрактик»</p>
        <a href="/privacy" className="transition-colors hover:text-white">Политика обработки персональных данных</a>
      </div>

      <h2 className="pointer-events-none block select-none text-center text-[15vw] font-black leading-none tracking-tight text-white/[0.05]" style={{ marginBottom: "-0.02em" }}>
        TalentMind
      </h2>
    </footer>
  );
}
