"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Check, X, AlertTriangle, Sparkles, GitBranch, Zap, Brain } from "lucide-react";
import { Arrow, GREEN, INK, RED, TEAL } from "./ui";

/* ============================================================
   Блок 3 — вертикальный стек экранов «полёт в облаках».
   Блоки идут друг под другом; каждый при прокрутке плавно
   проявляется + разблюривается, на выходе слегка размывается
   (не исчезает полностью). Реализация: GSAP ScrollTrigger scrub.
   ============================================================ */

const PHOTO = "/talentmind-laptop.png"; // фото кандидата/HR (заменяемо)
const AMBER = "#E8A317";

/* логотипы интеграций из /public (новые SVG, без Zoom/Teams) */
const L = {
  kontur: "/logo-talk-24.svg",                       // Контур.Толк
  cyr: "/Logo Cyr.svg",                              // широкий вордмарк
  telfin: "/Логотип_Телфин.svg",                     // Телфин
  mango: "/Логотип_Mango_Office.svg",                // Mango Office
  telemost: "/250px-Yandex_Telemost_icon.svg.png",   // Яндекс Телемост
};
/* логотипы по краям (без повторов), ×2, с порядком фокуса (как «54 параметра») */
const LOGO_SCATTER: { src: string; pos: string; h: number; o: number; d: string; f: string }[] = [
  { src: L.kontur, pos: "lg:left-[4%] lg:top-[14%]", h: 60, o: 0.9, d: "0s", f: "0" },
  { src: L.mango, pos: "lg:right-[4%] lg:top-[16%]", h: 84, o: 0.9, d: "0.5s", f: "1" },
  { src: L.cyr, pos: "lg:left-[5%] lg:bottom-[16%]", h: 68, o: 0.85, d: "0.9s", f: "2" },
  { src: L.telemost, pos: "lg:right-[6%] lg:bottom-[16%]", h: 108, o: 0.85, d: "1.9s", f: "2" },
];

function Light({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-[#ededed] bg-white p-4 shadow-[0_22px_50px_rgba(24,56,51,0.14)] ${className}`}>{children}</div>;
}
function Dark({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl p-4 text-white shadow-[0_26px_55px_rgba(24,56,51,0.3)] ${className}`} style={{ background: INK }}>{children}</div>;
}
function Photo({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_60px_rgba(24,56,51,0.22)] ${className}`}>
      <img src={PHOTO} alt="Кандидат / HR" className="h-[210px] w-full object-cover object-top" />
    </div>
  );
}

/* ============================================================
   Анимированный диалог с ИИ: в поле «печатается» вопрос → отправляется →
   ИИ «печатает» ответ → следующий вопрос. Зациклено.
   ============================================================ */
const CHAT_SCRIPT = [
  { q: "Насколько кандидат соответствует профилю лидера?", a: "Совместимость 82%. Сильные лидерские качества и умение брать ответственность" },
  { q: "Какие основные риски?", a: "Зарплатные ожидания выше рынка и мало опыта в заказной разработке" },
  { q: "Стоит звать на финал?", a: "Да — рекомендую к переходу на следующий этап" },
];

function AnimatedChat() {
  const [messages, setMessages] = useState<{ role: "q" | "a"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  useEffect(() => {
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
          setMessages((m) => [...m.slice(-2), { role: "q", text: q }]);
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
  }, []);

  return (
    <div className="flex h-[306px] w-full flex-col overflow-hidden rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_28px_60px_rgba(24,56,51,0.16)]">
      <div className="flex items-center gap-2 border-b border-[#eef0ee] pb-3">
        <img src="/robot.png" alt="" className="h-7 w-7 object-contain" />
        <div className="leading-tight">
          <p className="text-xs font-semibold" style={{ color: INK }}>ИИ-Ассистент</p>
          <p className="flex items-center gap-1 text-[10px] text-[#183833]/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> HR-аналитика · онлайн</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden py-3">
        {messages.slice(-3).map((m, i) =>
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
          <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse align-middle" style={{ background: INK }} />
        </span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ background: GREEN }}><Arrow className="h-3.5 w-3.5 text-white" /></span>
      </div>
    </div>
  );
}

type Step = {
  key: string;
  head?: React.ReactNode;
  link?: string;
  href?: string;
  widgets?: React.ReactNode;
  full?: React.ReactNode;
};

const STEPS: Step[] = [
  {
    key: "fit",
    full: (
      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 lg:block lg:h-[920px]">
        {/* ЦЕНТР — заголовок (поверх блоков) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[56rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          {/* мягкий ореол — заголовок читается поверх блоков заднего фона */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[160%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.92),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: INK }}>
            Анализ <span style={{ color: GREEN }}>корпоративной совместимости</span> по 54 параметрам
          </h2>
          <a href="/culture" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            Узнать, как работает оценка ценностей <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* Ценностное предложение — слева сверху (средний) */}
        <div data-focus="0" className="report-card w-full max-w-md lg:absolute lg:left-[1%] lg:top-[1%] lg:w-[330px] lg:max-w-none">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${GREEN}1a`, color: GREEN }}>
              <Sparkles className="h-3.5 w-3.5" /> Ценностное предложение компании
            </span>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: INK }}>
              Высокая степень процессного управления, чёткие границы ролей и систематический учёт времени
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f4f7f2] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">Тип культуры</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">Процессно-ориентированная культура с элементами распределённого управления</p>
              </div>
              <div className="rounded-2xl bg-[#f4f7f2] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">Доминирующие ценности</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Исполнительность", "Честность", "Коллаборация"].map((v) => (
                    <span key={v} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium shadow-[0_4px_12px_rgba(24,56,51,0.08)]" style={{ color: INK }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Индекс уверенности — правый нижний угол (маленький) */}
        <div data-focus="2" className="report-card w-full max-w-[260px] lg:absolute lg:right-[1%] lg:bottom-[2%] lg:w-[210px] lg:max-w-none">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#e9efe6] bg-white/95 p-5 text-center shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <p className="text-sm font-semibold" style={{ color: INK }}>Процент соответствия</p>
            <div className="relative my-2.5 h-[112px] w-[112px]">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={TEAL} />
                    <stop offset="100%" stopColor={GREEN} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e9efe6" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#confGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="224.3 263.9" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: INK }}>85%</span>
              </div>
            </div>
            <p className="text-[11px] leading-snug text-[#183833]/55">Совпадение кандидата с ценностями и культурным кодом компании</p>
          </div>
        </div>

        {/* Инновационность + Ориентация — вместе в левом нижнем углу */}
        <div data-focus="2" className="report-card flex w-full flex-col gap-5 lg:absolute lg:bottom-[2%] lg:left-[-3%] lg:flex-row lg:items-end lg:gap-4">
          <div className="w-full lg:w-[300px]">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-4 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: INK }}><GitBranch className="h-4 w-4" style={{ color: TEAL }} /> Инновационность / Гибкость</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl p-2.5" style={{ background: `${GREEN}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}>Декларация</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">Заявленные ценности инноваций и гибких ролей</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: `${TEAL}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: TEAL }}>Операционная реальность</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">Строгий учёт времени и процедуры согласования</p>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] leading-snug text-[#183833]/65">Декларируется поиск инноваций, но требования к учёту времени увеличивают цикл внедрения</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 border-t border-[#eef0ee] pt-2.5">
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">Почему не ниже</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Есть выделенные роли для развития</p></div>
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">Почему не выше</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Согласования ограничивают скорость</p></div>
            </div>
          </div>
          </div>

          <div className="w-full lg:w-[300px]">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-4 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: INK }}><GitBranch className="h-4 w-4" style={{ color: TEAL }} /> Ориентация на команду / Неформальность</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl p-2.5" style={{ background: `${GREEN}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}>Декларация</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">Программа адаптации и наставничества</p>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: `${TEAL}12` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: TEAL }}>Операционная реальность</p>
                <p className="mt-1 text-[11px] leading-snug text-[#183833]/75">Регламентированные командные встречи</p>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] leading-snug text-[#183833]/65">Поддержка декларируется через наставничество, но встречи регламентированы правилами</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 border-t border-[#eef0ee] pt-2.5">
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">Почему не ниже</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Внедрена система адаптации</p></div>
              <div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/40">Почему не выше</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Регламенты формализуют общение</p></div>
            </div>
          </div>
          </div>
        </div>

        {/* Соответствие культурному коду — правый верхний угол (большой) */}
        <div data-focus="1" className="report-card w-full max-w-lg lg:absolute lg:right-[-3%] lg:top-[-62px] lg:w-[400px] lg:max-w-none">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_20px_50px_rgba(24,56,51,0.10)]">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 shrink-0" style={{ color: GREEN }} fill={GREEN} />
              <span className="text-[15px] font-bold" style={{ color: INK }}>Соответствие культурному коду</span>
              <span className="ml-auto rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: `${GREEN}1a`, color: GREEN }}>70%</span>
            </div>
            <div className="mt-2.5 rounded-2xl border border-[#eef0ee] bg-[#fafbf9] p-2.5 text-xs leading-snug text-[#183833]/75">
              Кандидат органично впишется в роль исполнителя с чёткими границами ответственности — не склонен к их нарушению. Однако высокая бюрократия процессов может стать блокером
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Точки совпадения</p>
                <div className="mt-2 space-y-2">
                  <div className="rounded-xl border border-[#e7f0d8] bg-[#f6faef] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>Уважение границ ответственности</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">«Чётко разграничивает свою и чужую зоны.»</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Не вторгается в чужие зоны без спроса</p>
                  </div>
                  <div className="rounded-xl border border-[#e7f0d8] bg-[#f6faef] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>Честность и прозрачность</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">«Открыто признаёт прошлые ошибки.»</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Соответствует требованию прозрачности</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: AMBER }}><X className="h-3.5 w-3.5" /> Точки трения</p>
                <div className="mt-2 space-y-2">
                  <div className="rounded-xl border border-[#f3e6c7] bg-[#fdf8ee] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>Пассивность в проактивности</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">«Ожидает наводящих вопросов.»</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Нужно самому формулировать задачи — не готов</p>
                  </div>
                  <div className="rounded-xl border border-[#f3e6c7] bg-[#fdf8ee] p-2.5">
                    <p className="text-xs font-semibold" style={{ color: INK }}>Слабое процессное мышление</p>
                    <p className="mt-1 text-[11px] italic leading-snug text-[#183833]/55">«Затрудняется структурировать задачи.»</p>
                    <p className="mt-1 text-[11px] leading-snug text-[#183833]/70">Трудности с многоуровневыми требованиями</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#ffd9d9] bg-[#fff5f5] px-3 py-2 text-[11px]" style={{ color: RED }}>
              <AlertTriangle className="h-4 w-4 shrink-0" /> Зависимость от внешнего управления — требует микроменеджмента на старте
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "report",
    full: (
      <div className="relative mx-auto flex w-full max-w-none flex-col items-center gap-5 lg:block lg:h-[760px]">
        {/* ЦЕНТР — заголовок (поверх блоков) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[46rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[170%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.94),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: INK }}>
            Готовый профиль кандидата с <span style={{ color: GREEN }}>объективной аргументацией</span>
          </h2>
          <a href="/otchet" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            Смотреть пример отчёта <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* modal — левый верхний угол */}
        <div data-focus="0" className="report-card w-full max-w-lg lg:absolute lg:left-[-12px] lg:top-[-45px] lg:w-[533px] lg:max-w-none">
          <img src="/Modal.png" alt="Отчёт — решение проблем" className="w-full rounded-2xl shadow-[0_24px_60px_rgba(24,56,51,0.16)]" />
        </div>

        {/* candidate — правый верхний угол */}
        <div data-focus="1" className="report-card w-full max-w-md lg:absolute lg:right-[-1%] lg:top-[3%] lg:w-[420px] lg:max-w-none">
          <img src="/Candidate Section.png" alt="Информация о кандидате" className="w-full rounded-2xl shadow-[0_24px_60px_rgba(24,56,51,0.16)]" />
        </div>

        {/* decision — правый нижний угол */}
        <div data-focus="2" className="report-card w-full max-w-md lg:absolute lg:right-[-1%] lg:bottom-[4%] lg:w-[420px] lg:max-w-none">
          <img src="/Decision Section.png" alt="Решение о переходе на следующий этап" className="w-full rounded-2xl shadow-[0_24px_60px_rgba(24,56,51,0.16)]" />
        </div>
      </div>
    ),
  },
  {
    key: "copilot",
    full: (
      <div className="relative mx-auto flex w-full max-w-none flex-col items-center gap-5 lg:block lg:h-[680px]">
        {/* ЦЕНТР — заголовок (поверх блоков) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[48rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[170%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.92),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: INK }}>
            ИИ-ассистент: <span style={{ color: GREEN }}>«пообщайтесь»</span> со своей воронкой кандидатов
          </h2>
          <a href="/product" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            Посмотреть пример диалога <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* робот — левый верхний угол (картинка) */}
        <div data-focus="0" className="report-card mx-auto w-2/3 max-w-[260px] lg:absolute lg:left-[1%] lg:top-[6%] lg:mx-0 lg:w-[260px] lg:max-w-none">
          <div className="relative">
            <div className="pointer-events-none absolute inset-[14%] -z-10 rounded-full bg-[#11AFCC]/30 blur-[55px]" />
            <img src="/robot.png" alt="ИИ-ассистент TalentMind" className="w-full drop-shadow-[0_24px_45px_rgba(17,175,204,0.28)]" />
          </div>
        </div>

        {/* анимированный чат — правый верхний угол */}
        <div data-focus="1" className="report-card w-full max-w-sm lg:absolute lg:right-[1%] lg:top-[6%] lg:w-[340px] lg:max-w-none">
          <AnimatedChat />
        </div>

        {/* блок про ИИ — левый нижний угол */}
        <div data-focus="2" className="report-card w-full max-w-sm lg:absolute lg:bottom-[7%] lg:left-[1%] lg:w-[320px] lg:max-w-none">
          <div className="rounded-3xl border border-[#e9efe6] bg-white/95 p-5 shadow-[0_22px_50px_rgba(24,56,51,0.12)]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${GREEN}1a` }}><Sparkles className="h-5 w-5" style={{ color: GREEN }} /></span>
              <p className="text-base font-semibold" style={{ color: INK }}>Контекст не теряется</p>
            </div>
            <p className="mt-2.5 text-sm leading-snug text-[#183833]/65">ИИ держит в памяти весь диалог и всю воронку — спрашивайте что угодно, без повторных вводных</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f7f2] px-3 py-1.5 text-xs font-medium" style={{ color: INK }}><Zap className="h-3.5 w-3.5" style={{ color: GREEN }} /> Ответ за секунды</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f7f2] px-3 py-1.5 text-xs font-medium" style={{ color: INK }}><Brain className="h-3.5 w-3.5" style={{ color: TEAL }} /> На основе интервью</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "integrations",
    full: (
      <div className="relative mx-auto flex w-full max-w-none flex-col items-center gap-5 lg:block lg:h-[600px]">
        {/* ЦЕНТР — заголовок (поверх логотипов) */}
        <div className="relative order-first text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:z-20 lg:w-[46rem] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[170%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,248,243,0.92),rgba(244,248,243,0.55)_55%,rgba(244,248,243,0))] lg:block" />
          <div className="report-head relative will-change-[filter,opacity,transform]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: INK }}>
            Встройте <span style={{ color: GREEN }}>ИИ-анализ</span> в ваш привычный процесс найма
          </h2>
          <a href="/api" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
            Смотреть все интеграции <Arrow style={{ color: GREEN }} />
          </a>
          </div>
        </div>

        {/* логотипы — focus-анимация (blur + scale) как на первом шаге */}
        {LOGO_SCATTER.map((g, i) => (
          <div key={i} data-focus={g.f} className={`report-card hidden lg:block lg:absolute ${g.pos}`}>
            <div className="animate-floaty" style={{ animationDelay: g.d }}>
              <img src={g.src} alt="" className="w-auto" style={{ height: g.h, opacity: g.o }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Automation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".auto-step").forEach((step) => {
        const tall = step.classList.contains("auto-step-report");

        if (tall) {
          // Заголовок остаётся в фокусе. Блоки вокруг при прокрутке сначала
          // появляются, затем по очереди теряют фокус: левый верхний → правый → нижние.
          const cards = gsap.utils.toArray<HTMLElement>(".report-card", step);
          const head = step.querySelector<HTMLElement>(".report-head");
          const grp = (o: string) => cards.filter((c) => c.dataset.focus === o);
          const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: "top 72%", end: "bottom 22%", scrub: 1 } });
          tl.fromTo(cards, { filter: "blur(12px)", opacity: 0.18, scale: 0.85 }, { filter: "blur(0px)", opacity: 1, scale: 1, ease: "none", stagger: 0.12, duration: 1 }, 0);
          // центральный заголовок: проявляется и слегка увеличивается, в конце размывается и уменьшается
          if (head) tl.fromTo(head, { filter: "blur(12px)", opacity: 0.2, scale: 0.86 }, { filter: "blur(0px)", opacity: 1, scale: 1, ease: "none", duration: 1 }, 0);
          tl.to(grp("0"), { filter: "blur(12px)", opacity: 0.18, scale: 0.85, ease: "none", duration: 1 }, 2.2)
            .to(grp("1"), { filter: "blur(12px)", opacity: 0.18, scale: 0.85, ease: "none", duration: 1 }, 3.0)
            .to(grp("2"), { filter: "blur(12px)", opacity: 0.18, scale: 0.85, ease: "none", duration: 1 }, 3.8);
          if (head) tl.to(head, { filter: "blur(12px)", opacity: 0.2, scale: 0.86, ease: "none", duration: 1 }, 4.2);
          return;
        }

        gsap.fromTo(
          step,
          { filter: "blur(14px)", opacity: 0.15 },
          { filter: "blur(0px)", opacity: 1, ease: "none", scrollTrigger: { trigger: step, start: "top 85%", end: "center 56%", scrub: 1 } }
        );
        gsap.fromTo(
          step,
          { filter: "blur(0px)", opacity: 1 },
          { filter: "blur(14px)", opacity: 0.15, ease: "none", scrollTrigger: { trigger: step, start: "center 44%", end: "bottom 20%", scrub: 1 } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      {STEPS.map((s, i) => (
        <div
          key={s.key}
          className={`auto-step relative flex w-full items-center justify-center px-6 will-change-[filter,opacity] md:px-12 ${i === STEPS.length - 1 ? "min-h-[64vh]" : i === STEPS.length - 2 ? "min-h-[84vh]" : "min-h-screen"} ${s.full ? (i === STEPS.length - 1 ? "auto-step-report pt-4 pb-16" : i === STEPS.length - 2 ? "auto-step-report pt-24 pb-6" : "auto-step-report py-24") : "overflow-hidden"}`}
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 top-[10%] h-[440px] w-[440px] rounded-full bg-[#7AB800]/16 blur-[140px]" />
            <div className="absolute right-[-10%] top-[22%] h-[500px] w-[500px] rounded-full bg-[#11AFCC]/14 blur-[150px]" />
          </div>

          {s.full ? (
            <div className="relative z-10 w-full">{s.full}</div>
          ) : (
            <>
              <div className="pointer-events-none absolute inset-0 hidden lg:block">{s.widgets}</div>
              <div className="relative z-10 max-w-[52rem] text-center">
                <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>{s.head}</h2>
                <a href={s.href} className="group mt-7 inline-flex items-center gap-1.5 text-base font-medium" style={{ color: GREEN }}>
                  {s.link} <Arrow style={{ color: GREEN }} />
                </a>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
