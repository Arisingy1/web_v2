"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Arrow, GREEN, INK } from "./ui";

/* ============================================================
   Анимированный диалог с ИИ-ассистентом: в поле «печатается»
   вопрос → отправляется → ИИ «печатает» ответ → следующий вопрос.
   Зациклено. Используется на главной (BusinessValue + Automation).
   ============================================================ */
const CHAT_SCRIPT = [
  { q: "Насколько кандидат соответствует профилю лидера?", a: "Совместимость 82%. Сильные лидерские качества и умение брать ответственность" },
  { q: "Какие основные риски?", a: "Зарплатные ожидания выше рынка и мало опыта в заказной разработке" },
  { q: "Чем выделяется среди других?", a: "Системным мышлением и опытом запуска продуктов с нуля" },
  { q: "Стоит звать на финал?", a: "Да — рекомендую к переходу на следующий этап" },
];

/* статичный диалог целиком — для превью на лендинге (без анимации печати) */
const FULL: { role: "q" | "a"; text: string }[] = CHAT_SCRIPT.flatMap(({ q, a }) => [
  { role: "q" as const, text: q }, { role: "a" as const, text: a },
]);

export function AnimatedChat({ className = "h-[306px]", frozen = false }: { className?: string; frozen?: boolean }) {
  const [messages, setMessages] = useState<{ role: "q" | "a"; text: string }[]>(frozen ? FULL : []);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  useEffect(() => {
    if (frozen) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sleep = (ms: number) => new Promise<void>((res) => { const t = setTimeout(res, ms); timers.push(t); });

    const run = async () => {
      while (!cancelled) {
        setMessages([]); setInput(""); setAiTyping(false);
        await sleep(700);
        for (const { q, a } of CHAT_SCRIPT) {
          if (cancelled) return;
          for (let i = 1; i <= q.length; i++) { if (cancelled) return; setInput(q.slice(0, i)); await sleep(26); }
          await sleep(420);
          setInput("");
          setMessages((m) => [...m, { role: "q", text: q }]);
          await sleep(450);
          setAiTyping(true); await sleep(950); setAiTyping(false);
          setMessages((m) => [...m, { role: "a", text: "" }]);
          for (let i = 1; i <= a.length; i++) { if (cancelled) return; setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "a", text: a.slice(0, i) }; return c; }); await sleep(18); }
          await sleep(1500);
        }
        await sleep(1200);
      }
    };
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [frozen]);

  return (
    <div className={`flex w-full flex-col overflow-hidden rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_28px_60px_rgba(24,56,51,0.16)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-[#eef0ee] pb-3">
        <img src="/robot.png" alt="" className="h-7 w-7 object-contain" />
        <div className="leading-tight">
          <p className="text-xs font-semibold" style={{ color: INK }}>ИИ-Ассистент</p>
          <p className="flex items-center gap-1 text-[10px] text-[#183833]/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> HR-аналитика · онлайн</p>
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-2.5 overflow-hidden py-3 ${frozen ? "justify-start" : "justify-end"}`}>
        {messages.map((m, i) =>
          m.role === "q" ? (
            <div key={i} className="flex justify-end">
              <span className="max-w-[86%] rounded-2xl rounded-br-sm bg-[#eef2ec] px-3 py-2 text-xs leading-snug" style={{ color: INK }}>{m.text}</span>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-1.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: GREEN }}><Sparkles className="h-3 w-3 text-white" /></span>
              <span className="max-w-[86%] rounded-2xl rounded-bl-sm border border-[#e7f0d8] px-3 py-2 text-xs leading-snug" style={{ background: `${GREEN}14`, color: INK }}>{m.text}</span>
            </div>
          )
        )}
        {aiTyping && (
          <div className="flex items-center gap-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: GREEN }}><Sparkles className="h-3 w-3 text-white" /></span>
            <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-[#e7f0d8] px-3 py-2.5" style={{ background: `${GREEN}14` }}>
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" style={{ animationDelay: "0.15s" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" style={{ animationDelay: "0.3s" }} />
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-[#f4f7f2] px-3 py-2">
        <span className="flex-1 truncate text-xs">
          {input ? <span style={{ color: INK }}>{input}</span> : <span className="text-[#183833]/35">Спросите про кандидата…</span>}
          {!frozen && <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse align-middle" style={{ background: INK }} />}
        </span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ background: GREEN }}><Arrow className="h-3.5 w-3.5 text-white" /></span>
      </div>
    </div>
  );
}
