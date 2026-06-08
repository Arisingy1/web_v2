"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroVisual from "@/components/HeroVisual";
import Marquee from "@/components/Marquee";
import {
  Aurora,
  FloatPill,
  MagneticCard,
  MaskedWords,
  Reveal,
} from "@/components/Motion";
import {
  IconArrowRight,
  IconChart,
  IconChat,
  IconCheck,
  IconCloud,
  IconDna,
  IconScale,
  IconSearch,
  IconServer,
  IconStar,
  IconTarget,
  IconUpload,
  IconUsers,
} from "@/components/icons";

/* ============================================================
   TalentMind — Home · 1:1 Amzigo structural clone
   Lime / Teal palette · Framer Motion · aurora · glass pills
   ============================================================ */

export default function Home() {
  return (
    <>
      <Hero />
      <SoftSkills />
      <DarkShowcase />
      <Marquee tone="lime" />
      <Testimonials />
      <Pricing />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="upload" className="relative overflow-hidden bg-paper">
      <Aurora />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-x relative grid items-center gap-16 py-20 md:py-28 lg:grid-cols-[1.04fr_0.96fr]">
        {/* left copy */}
        <div className="flex flex-col gap-7">
          <Reveal y={16}>
            <span className="mono-label">ИИ-анализ soft skills и корпоративной совместимости</span>
          </Reveal>

          <MaskedWords
            className="text-[2.7rem] font-bold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl md:text-[4.8rem]"
            segments={[
              { text: "Анализируйте собеседования. " },
              { text: "Нанимайте по ДНК", className: "text-lime-700" },
              { text: " компании." },
            ]}
          />

          <Reveal delay={0.55} y={16}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-500">
              TalentMind автоматически переводит аудио- и видеозаписи реальных диалогов
              в оцифрованный профиль кандидата. Оцените компетенции и культурную
              совместимость на основе данных, а не интуиции.
            </p>
          </Reveal>

          <Reveal delay={0.66} y={16}>
            <div className="flex flex-wrap items-center gap-3">
              <ArrowButton href="#upload" variant="primary">
                <IconUpload className="h-4 w-4" />
                Загрузить интервью
              </ArrowButton>
              <ArrowButton href="/reports" variant="ghost">
                Посмотреть пример отчёта
              </ArrowButton>
            </div>
          </Reveal>

          <Reveal delay={0.76} y={16}>
            <p className="flex items-center gap-2 text-sm font-medium text-ink-500">
              <IconCheck className="h-4 w-4 text-lime-700" />
              Первые 5 интервью — бесплатно, сразу после регистрации.
            </p>
          </Reveal>
        </div>

        {/* right composition */}
        <Reveal delay={0.25} y={40}>
          <HeroVisual />
        </Reveal>
      </div>

      {/* logo strip */}
      <div className="relative border-y border-line bg-white/50 backdrop-blur">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6">
          <span className="mono-label">Интеграции с ВКС и ATS</span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {["Zoom", "MS Teams", "Контур.Толк", "Huntflow", "E-Staff", "1С"].map((l) => (
              <span key={l} className="font-display text-sm font-semibold text-ink-400">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · SOFT SKILLS (light bento)                                       */
/* ------------------------------------------------------------------ */

function SoftSkills() {
  const cards = [
    {
      icon: <IconChart className="h-5 w-5" />,
      title: "Детальная карта компетенций",
      text: "Оценка от 1 до 10 по ключевым софт-скиллам: лидерство, коммуникация, критическое мышление.",
    },
    {
      icon: <IconStar className="h-5 w-5" />,
      title: "Методология STAR",
      text: "ИИ находит в речи, как кандидат действовал в реальных рабочих ситуациях, игнорируя пустые формулировки.",
    },
    {
      icon: <IconScale className="h-5 w-5" />,
      title: "Аргументация «За и Против»",
      text: "Объективный список преимуществ и выявленных рисков со ссылками на конкретные цитаты из диалога.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-cream">
      <Aurora className="opacity-70" />
      <div className="container-x relative py-20 md:py-28">
        <Reveal>
          <SectionHead
            decision="Решение 1 / 3"
            eyebrow="Отчёт по soft skills"
            title="Глубокий профиль soft skills после каждого интервью"
            text="Больше никакой субъективности. Загрузите запись или настройте автоимпорт из ВКС, и ИИ разберёт живой диалог кандидата, превратив его в чёткую карту навыков."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className={i === 1 ? "md:-mt-6" : ""}>
              <MagneticCard className="h-full">
                <article className="group flex h-full flex-col gap-4 rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-soft backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_30px_60px_-12px_rgba(122,184,0,0.25)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime-50 transition-colors group-hover:bg-lime group-hover:text-white">
                    {c.icon}
                  </span>
                  <h3 className="text-xl font-semibold leading-snug text-ink">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-500">{c.text}</p>
                  <Link
                    href="/reports"
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-lime-700"
                  >
                    Открыть демо-отчёт <DiagArrow />
                  </Link>
                </article>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · DARK SHOWCASE — Culture DNA + AI (Amzigo dark dashboards)       */
/* ------------------------------------------------------------------ */

function DarkShowcase() {
  const cultureCards = [
    { icon: <IconTarget className="h-5 w-5" />, title: "Уникальный профиль компании", text: "Настройка эталона под конкретные роли, команды и управленческие ожидания." },
    { icon: <IconDna className="h-5 w-5" />, title: "Индекс совместимости", text: "Наглядный процент совпадения (Match %) культурного кода соискателя и бизнеса." },
    { icon: <IconUsers className="h-5 w-5" />, title: "Прогнозирование адаптации", text: "Выявление зон потенциального трения (friction) до выхода человека на работу." },
  ];
  const aiCards = [
    { icon: <IconSearch className="h-5 w-5" />, title: "Мгновенные ответы по базе", text: "Задайте любой вопрос по кандидату — получите ответ за секунды." },
    { icon: <IconScale className="h-5 w-5" />, title: "Сравнение соискателей", text: "Кто из финалистов лучше справится с кросс-функциональными задачами? Ассистент сравнит их в единой таблице." },
    { icon: <IconChat className="h-5 w-5" />, title: "Автогенерация вопросов", text: "ИИ подготовит список уточняющих вопросов для нанимающего менеджера на финальное интервью." },
  ];

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-lime/20 blur-[150px]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-lime/10 blur-[150px]" aria-hidden />

      <div className="container-x relative">
        {/* Culture intro */}
        <Reveal>
          <SectionHead
            dark
            decision="Решение 2 / 3"
            eyebrow="Оцифровка корпоративной культуры"
            title="Оценка через призму вашей, а не шаблонной корпоративной культуры"
            text="У каждой компании свой ДНК. Мы оцифровываем вашу корпоративную культуру по 54 психолингвистическим параметрам и сравниваем с ней кандидатов до подписания оффера."
          />
        </Reveal>

        {/* Amzigo-style dark dashboard strip */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <DashFeed />
          </Reveal>
          <Reveal delay={0.08}>
            <DashMatch />
          </Reveal>
          <Reveal delay={0.16}>
            <DashTrend />
          </Reveal>
        </div>

        {/* culture bento */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {cultureCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <DarkCard {...c} />
            </Reveal>
          ))}
        </div>

        {/* AI assistant */}
        <div id="assistant" className="mt-24 scroll-mt-28">
          <Reveal>
            <SectionHead
              dark
              decision="Решение 3 / 3"
              eyebrow="ИИ-Ассистент"
              title="ИИ-ассистент: «пообщайтесь» со своей воронкой кандидатов"
              text="Интерактивный инструмент для мгновенного извлечения контекста. Больше не нужно переслушивать записи и искать разрозненные заметки в ATS."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <DashChat />
            </Reveal>
            <div className="grid gap-6">
              {aiCards.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <DarkCard {...c} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- dark dashboard widgets --- */

function DashFeed() {
  const rows = [
    { n: "Алексей К.", r: "Senior Frontend", m: 92 },
    { n: "Мария Д.", r: "Product Manager", m: 86 },
    { n: "Игорь В.", r: "Data Engineer", m: 78 },
    { n: "Ольга С.", r: "UX Designer", m: 71 },
  ];
  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <p className="font-display text-lg font-semibold">Лента анализа</p>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-lime-50/40">
        последние кандидаты
      </p>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.n} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/15 font-mono text-xs font-semibold text-lime">
                {row.n.charAt(0)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-white">{row.n}</p>
                <p className="font-mono text-[11px] text-lime-50/50">{row.r}</p>
              </div>
            </div>
            <span className={`font-mono text-sm font-semibold ${row.m >= 80 ? "text-lime" : "text-amber-300"}`}>
              {row.m}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashMatch() {
  const rows = [
    { label: "Инновации vs стабильность", v: 88, friction: false },
    { label: "Командность vs автономия", v: 94, friction: false },
    { label: "Скорость vs тщательность", v: 71, friction: true },
  ];
  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold">DNA Match</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-lime-50/40">Алексей К.</p>
        </div>
        <MatchRing value={92} />
      </div>
      <div className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-white/90">{r.label}</span>
              <span className={`font-mono ${r.friction ? "text-amber-300" : "text-lime"}`}>{r.v}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${r.friction ? "bg-amber-300" : "bg-gradient-to-r from-lime to-lime-600"}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${r.v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ boxShadow: r.friction ? "none" : "0 0 16px rgba(122,184,0,0.5)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashTrend() {
  const bars = [44, 60, 52, 74, 66, 88, 80, 95];
  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Динамика найма</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-lime-50/40">за квартал</p>
        </div>
        <span className="rounded-full bg-lime/15 px-3 py-1 font-mono text-xs font-semibold text-lime">+38%</span>
      </div>
      <div className="mt-auto flex h-40 items-end gap-2 pt-6">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-lime/30 to-lime"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
            style={{ boxShadow: "0 0 18px rgba(122,184,0,0.25)" }}
          />
        ))}
      </div>
    </div>
  );
}

function DashChat() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime text-white">
          <IconChat className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold">Ассистент по воронке</p>
      </div>
      <div className="space-y-4">
        <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-lime px-4 py-3 text-sm font-medium text-white">
          Кто из финалистов сильнее в кросс-функциональных задачах?
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-lime-50/90">
          <span className="font-semibold text-white">Алексей</span> опережает по координации команд
          (9/10) и инициативе. У <span className="font-semibold text-white">Марии</span> выше глубина
          анализа, но меньше опыта стейкхолдер-менеджмента.
          <span className="mt-2 block font-mono text-xs text-lime">↳ 3 цитаты из интервью</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5">
        <IconSearch className="h-4 w-4 text-lime-50/40" />
        <span className="text-sm text-lime-50/40">Спросите что-нибудь о кандидате…</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const items = [
    { quote: "Сократили время на разбор интервью почти втрое. Решение о найме принимаем по карте навыков, а не по ощущениям.", name: "Ирина М.", role: "HR-директор, IT", offset: "md:mt-0" },
    { quote: "Индекс совместимости по нашему ДНК реально работает: текучка на испытательном сроке заметно снизилась.", name: "Дмитрий К.", role: "Head of Talent, ритейл", offset: "md:mt-10" },
    { quote: "ИИ-ассистент экономит часы: вместо переслушивания записей задаю вопрос по кандидату и получаю цитаты.", name: "Анна С.", role: "Нанимающий менеджер, финтех", offset: "md:mt-4" },
  ];
  return (
    <section className="bg-paper">
      <div className="container-x py-20 md:py-28">
        <Reveal>
          <SectionHead eyebrow="Нам доверяют" title="HR-команды нанимают увереннее" text="Что говорят директора по персоналу, перешедшие на оценку по данным." />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className={t.offset}>
              <MagneticCard>
                <figure className="flex flex-col gap-5 rounded-[2rem] border border-line bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-[0_30px_60px_-12px_rgba(122,184,0,0.22)]">
                  <span className="font-display text-5xl leading-none text-lime">“</span>
                  <blockquote className="-mt-6 text-[15px] leading-relaxed text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream font-display text-sm font-semibold text-ink">
                      {t.name.charAt(0)}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-500">
                      {t.name} · {t.role}
                    </span>
                  </figcaption>
                </figure>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · PRICING (Amzigo grid)                                           */
/* ------------------------------------------------------------------ */

function Pricing() {
  const plans = [
    { name: "Starter", price: "14 900 ₽", cap: "до 30 интервью / мес.", feats: ["Стандартные модели", "Карта soft skills", "Базовая поддержка"], hot: false },
    { name: "Growth", price: "44 900 ₽", cap: "до 100 интервью / мес.", feats: ["Интеграции с ATS", "Расширенное сравнение", "Приоритетная поддержка"], hot: true },
    { name: "Scale", price: "169 900 ₽", cap: "до 400 интервью / мес.", feats: ["Кастомная модель культуры", "API для разработчиков", "Персональный менеджер"], hot: false },
    { name: "Enterprise", price: "Индивидуально", cap: "безлимит интервью", feats: ["Кастомные модели", "Интеграции ATS и 1С", "On-Premise"], hot: false },
  ];
  return (
    <section className="relative overflow-hidden bg-cream">
      <Aurora className="opacity-70" />
      <div className="container-x relative py-20 md:py-28">
        <Reveal>
          <SectionHead center eyebrow="Тарифы" title="Прозрачные тарифы под масштаб вашего бизнеса" text="Платите за объём интервью, а не за количество пользователей." />
        </Reveal>
        <div className="mt-16 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className={p.hot ? "lg:-mt-6" : ""}>
              <MagneticCard className="h-full">
                <div
                  className={`relative flex h-full flex-col gap-5 rounded-[2rem] border p-7 transition-shadow duration-300 ${
                    p.hot
                      ? "border-lime/40 bg-ink text-white shadow-[0_30px_70px_-15px_rgba(24,56,51,0.5)] lg:py-10"
                      : "border-line bg-white shadow-soft hover:shadow-[0_30px_60px_-12px_rgba(122,184,0,0.22)]"
                  }`}
                >
                  {p.hot ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                      Популярный
                    </span>
                  ) : null}
                  <div>
                    <p className={`font-mono text-xs uppercase tracking-widest ${p.hot ? "text-lime" : "text-ink-400"}`}>{p.name}</p>
                    <p className={`mt-2 text-sm ${p.hot ? "text-lime-50/80" : "text-ink-500"}`}>{p.cap}</p>
                    <p className="mt-4 font-display text-3xl font-semibold">
                      {p.price}
                      {p.price.includes("₽") ? (
                        <span className={`text-base font-medium ${p.hot ? "text-lime-50/70" : "text-ink-400"}`}> /мес.</span>
                      ) : null}
                    </p>
                  </div>
                  <div className={`h-px w-full ${p.hot ? "bg-white/10" : "bg-line"}`} />
                  <ul className="flex flex-col gap-3">
                    {p.feats.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <IconCheck className={`mt-0.5 h-4 w-4 flex-none ${p.hot ? "text-lime" : "text-lime-700"}`} />
                        <span className={p.hot ? "text-lime-50/90" : "text-ink-500"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/pricing"
                    className={`group mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      p.hot ? "bg-lime text-white hover:brightness-105" : "border border-line bg-white text-ink hover:border-ink"
                    }`}
                  >
                    Выбрать <DiagArrow light={p.hot} />
                  </Link>
                </div>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ArrowButton href="/pricing" variant="primary">
            Тарифы и ROI-калькулятор
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Shared primitives                                                   */
/* ================================================================== */

function SectionHead({
  eyebrow,
  title,
  text,
  decision,
  center,
  dark,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  decision?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-5 ${center ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl"}`}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className={`mono-label ${dark ? "!text-lime-50/70" : ""}`}>{eyebrow}</span>
        {decision ? (
          <span className={`font-mono text-xs uppercase tracking-widest ${dark ? "text-lime-50/40" : "text-ink-400"}`}>
            {decision}
          </span>
        ) : null}
      </div>
      <h2
        className={`text-balance text-3xl font-bold leading-[1.04] tracking-[-0.02em] md:text-[2.9rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`text-pretty text-base leading-relaxed md:text-lg ${dark ? "text-lime-50/70" : "text-ink-500"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

function DarkCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <MagneticCard className="h-full">
      <article className="group flex h-full flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-colors hover:border-lime/30">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime/15 text-lime transition-colors group-hover:bg-lime group-hover:text-white">
          {icon}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-lime-50/65">{text}</p>
      </article>
    </MagneticCard>
  );
}

function ArrowButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "ghost";
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`group ${variant === "primary" ? "btn-primary" : "btn-ghost"}`}>
      {children}
      <DiagArrow light={variant === "primary"} />
    </Link>
  );
}

function DiagArrow({ light }: { light?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${light ? "text-white" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function MatchRing({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#7ab800"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 6px rgba(122,184,0,0.7))" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-sm font-semibold text-white">{value}%</span>
      </div>
    </div>
  );
}
