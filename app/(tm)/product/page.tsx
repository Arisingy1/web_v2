"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessagesSquare, Brain, Zap, Users, Sparkles, ArrowRight } from "lucide-react";
import { Arrow, GREEN, INK, TEAL } from "@/components/tm/ui";

const AMBER = "#E8A317";

/* ============================================================
   /product — ИИ-ассистент TalentMind (светлая тема).
   Сцена: светящийся анимированный чат, парящий робот с параллаксом
   и смелый bento возможностей.
   ============================================================ */

const FEATURES: { n: string; title: string; text: string; color: string; icon: React.ReactNode; span: string }[] = [
  { n: "01", title: "Диалог с воронкой", text: "«Пообщайтесь» со всей воронкой кандидатов на естественном языке — без фильтров и таблиц", color: GREEN, icon: <MessagesSquare className="h-6 w-6" />, span: "lg:col-span-2" },
  { n: "02", title: "Контекст не теряется", text: "Ассистент помнит весь диалог и каждое интервью — спрашивайте без повторных вводных", color: TEAL, icon: <Brain className="h-6 w-6" />, span: "" },
  { n: "03", title: "Ответ за секунды", text: "Мгновенно — на основе анализа реальных интервью, а не общих фраз", color: AMBER, icon: <Zap className="h-6 w-6" />, span: "" },
  { n: "04", title: "Сравнение кандидатов", text: "Быстрое сравнение профилей — поручите ассистенту сопоставить кандидатов по вашим критериям", color: TEAL, icon: <Users className="h-6 w-6" />, span: "" },
  { n: "05", title: "Рекомендации к найму", text: "Поддержка в выборе — получайте структурированные выжимки из интервью, чтобы аргументированно рекомендовать кандидатов нанимающим менеджерам", color: GREEN, icon: <Sparkles className="h-6 w-6" />, span: "sm:col-span-2 lg:col-span-1" },
];

export default function ProductPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /* параллакс слоёв сцены по курсору */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>(".depth"));
    layers.forEach((l) => { l.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)"; l.style.willChange = "transform"; });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      layers.forEach((l) => { const d = parseFloat(l.dataset.depth || "14"); l.style.transform = `translate3d(${(nx * d).toFixed(1)}px, ${(ny * d).toFixed(1)}px, 0)`; });
    };
    const onLeave = () => layers.forEach((l) => (l.style.transform = "translate3d(0,0,0)"));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* входная анимация + reveal */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".pd-rise", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });
      gsap.fromTo(".pd-stage", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.2, clearProps: "opacity,transform" });
      gsap.utils.toArray<HTMLElement>(".pd-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 60, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>
      <style>{`
        @keyframes pd-drift { 0%,100%{ transform: translate(0,0) scale(1) } 50%{ transform: translate(46px,-34px) scale(1.08) } }
        @keyframes pd-pulse { 0%,100%{ opacity:.45 } 50%{ opacity:.9 } }
        .pd-grid { background-image: radial-gradient(rgba(24,56,51,0.05) 1px, transparent 1px); background-size: 30px 30px; }
      `}</style>


      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto grid max-w-[1340px] grid-cols-1 items-center gap-12 px-6 pt-36 pb-16 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:pt-44">
        {/* ЛЕВО */}
        <div className="relative z-10">
          <h1 className="pd-rise text-[clamp(2rem,4.2vw,4rem)] font-bold leading-[1.05] tracking-tight" style={{ color: INK }}>
            Ваш <span style={{ color: GREEN }}>персональный</span>
            <br />
            <span className="relative inline-block whitespace-nowrap pb-[0.26em] -mb-[0.26em] align-top">
              <span style={{ color: GREEN }}>аналитик</span>
              <svg className="absolute bottom-[0.05em] left-0 w-full overflow-visible" height="18" viewBox="0 0 300 18" fill="none" preserveAspectRatio="none">
                <path d="M5 9 Q 42 3.5 78 9 T 152 9 T 226 9 T 296 8" stroke={GREEN} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>{" "}
            по всем
            <br />кандидатам
          </h1>
          <p className="pd-rise mt-7 max-w-lg text-lg leading-relaxed text-[#183833]/65">
            Не отчёты и таблицы, а живой диалог. Ассистент держит в памяти все интервью вашей
            воронки и отвечает на любой вопрос за секунды
          </p>
          <div className="pd-rise mt-9 flex flex-wrap items-center gap-3">
            <a href="/pricing" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN, boxShadow: `0 18px 45px ${GREEN}40` }}>
              Начать бесплатно <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#caps" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/60 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
              Что умеет
            </a>
          </div>
        </div>

        {/* ПРАВО — сцена: робот + светящийся чат + параллакс */}
        <div ref={stageRef} className="pd-stage relative z-10 h-[520px] w-full sm:h-[560px]">
          <div className="pointer-events-none absolute left-1/2 top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `radial-gradient(closest-side, ${TEAL}33, transparent 70%)` }} />
          {/* робот */}
          <div className="depth absolute left-1/2 top-[2%] z-20 h-[230px] w-[230px] -translate-x-1/2" data-depth="30">
            <div className="animate-floaty relative h-full w-full">
              <div className="pointer-events-none absolute inset-[16%] -z-10 rounded-full bg-[#11AFCC]/35 blur-[55px]" />
              <img src="/robot.png" alt="ИИ-ассистент TalentMind" className="h-full w-full object-contain drop-shadow-[0_26px_50px_rgba(17,175,204,0.28)]" />
            </div>
          </div>
          {/* чат-консоль */}
          <div className="depth absolute bottom-0 left-1/2 z-30 w-[360px] max-w-[92%] -translate-x-1/2" data-depth="14">
            <AssistantChat />
          </div>
          {/* плавающие чипы */}
          <div className="depth absolute right-0 top-[6%] z-30 lg:right-[2%] lg:top-[26%]" data-depth="40">
            <div className="animate-floaty rounded-2xl border border-[#e6ece4] bg-white px-4 py-2.5 shadow-[0_18px_44px_rgba(24,56,51,0.12)]" style={{ animationDelay: "0.6s" }}>
              <p className="text-xs text-[#183833]/55">Совместимость</p>
              <p className="text-xl font-bold" style={{ color: GREEN }}>88%</p>
            </div>
          </div>
          <div className="depth absolute left-0 top-[19%] z-30 lg:left-[1%] lg:top-[40%]" data-depth="34">
            <div className="animate-floaty flex items-center gap-2 rounded-2xl border border-[#e6ece4] bg-white px-4 py-2.5 shadow-[0_18px_44px_rgba(24,56,51,0.12)]" style={{ animationDelay: "1.2s" }}>
              <Users className="h-4 w-4" style={{ color: TEAL }} />
              <p className="text-sm font-semibold" style={{ color: INK }}>3 кандидата</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== BENTO ВОЗМОЖНОСТЕЙ ============================== */}
      <section id="caps" className="relative mx-auto max-w-[1340px] px-6 py-16 md:px-10">
        <div className="pd-reveal mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[16ch] text-[clamp(2rem,3.6vw,3.6rem)] font-bold leading-[1.05] tracking-tight" style={{ color: INK }}>
            Что умеет <span style={{ color: GREEN }}>ассистент</span>
          </h2>
          <p className="max-w-sm text-[#183833]/55">Пять способностей, которые превращают воронку в собеседника</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.n}
              className={`pd-reveal group relative overflow-hidden rounded-[28px] border border-[#e8efe6] bg-white p-7 shadow-[0_22px_55px_rgba(24,56,51,0.07)] transition-all duration-500 hover:-translate-y-1.5 ${f.span}`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-30" style={{ background: f.color }} />
              <div className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${f.color}1a`, color: f.color }}>{f.icon}</span>
                <span className="font-mono text-5xl font-black leading-none" style={{ color: `${f.color}26` }}>{f.n}</span>
              </div>
              <h3 className="relative mt-6 text-2xl font-bold tracking-tight" style={{ color: INK }}>{f.title}</h3>
              <p className="relative mt-2.5 max-w-md leading-relaxed text-[#183833]/60">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="relative mx-auto mb-24 max-w-[1200px] px-6 md:px-10">
        <div className="pd-reveal relative overflow-hidden rounded-[2.75rem] p-10 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:p-16" style={{ background: `linear-gradient(135deg, ${GREEN}, #5e9400)` }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Спросите ассистента о своих кандидатах</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">5 разборов бесплатно, без банковской карты. Первый ответ — через минуту</p>
          <a href="/pricing" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            Начать бесплатно <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   Анимированный чат с ассистентом (печать вопроса → ответ ИИ)
   ============================================================ */
const CHAT_SCRIPT = [
  { q: "Кто лучше всех подходит на роль тимлида?", a: "Дмитрий Смирнов — совместимость 88%. Сильное лидерство и системное мышление" },
  { q: "А какие у него риски?", a: "Зарплатные ожидания выше рынка. В остальном — уверенный кандидат" },
  { q: "Сравни его с Софией Ковалёвой", a: "У Софии выше эмпатия, у Дмитрия — стратегия. Оба прошли порог найма" },
];

function AssistantChat() {
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
    <div className="flex h-[330px] w-full flex-col overflow-hidden rounded-[26px] border border-[#e9efe6] bg-white/95 p-5 shadow-[0_34px_80px_rgba(24,56,51,0.2)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-[#eef0ee] pb-3">
        <img src="/robot.png" alt="" className="h-8 w-8 object-contain" />
        <div className="leading-tight">
          <p className="text-sm font-semibold" style={{ color: INK }}>ИИ-Ассистент</p>
          <p className="flex items-center gap-1 text-[11px] text-[#183833]/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> анализ воронки · онлайн</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden py-3">
        {messages.slice(-3).map((m, i) =>
          m.role === "q" ? (
            <div key={i} className="flex justify-end">
              <span className="max-w-[86%] rounded-2xl rounded-br-sm bg-[#eef2ec] px-3.5 py-2 text-[13px] leading-snug" style={{ color: INK }}>{m.text}</span>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: GREEN }}><Sparkles className="h-3.5 w-3.5 text-white" /></span>
              <span className="max-w-[86%] rounded-2xl rounded-bl-sm border border-[#e7f0d8] px-3.5 py-2 text-[13px] leading-snug" style={{ background: `${GREEN}14`, color: INK }}>{m.text}</span>
            </div>
          )
        )}
        {aiTyping && (
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: GREEN }}><Sparkles className="h-3.5 w-3.5 text-white" /></span>
            <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-[#e7f0d8] px-3 py-2.5" style={{ background: `${GREEN}14` }}>
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" style={{ animationDelay: "0.15s" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9fbca3]" style={{ animationDelay: "0.3s" }} />
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-[#f4f7f2] px-3.5 py-2.5">
        <span className="flex-1 truncate text-[13px]">
          {input ? <span style={{ color: INK }}>{input}</span> : <span className="text-[#183833]/35">Спросите про кандидата…</span>}
          <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse align-middle" style={{ background: INK }} />
        </span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: GREEN }}><Arrow className="h-4 w-4 text-white" /></span>
      </div>
    </div>
  );
}
