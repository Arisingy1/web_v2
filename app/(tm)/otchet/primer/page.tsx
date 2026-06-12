"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X, Sparkles, Check, AlertTriangle, Flame, AudioLines, MessageSquareQuote,
  Briefcase, Building2, Wallet, Home, GitBranch, TrendingUp, TrendingDown,
  Dna, Target, ChevronDown,
} from "lucide-react";

/* ── палитра ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* ============================================================
   /otchet/primer — «Пример отчёта» (отдельная страница).
   Полностью свёрстанный отчёт по кандидату с анимациями.
   У каждого soft-skill кнопка «Подробнее» открывает модальное
   окно с детальным разбором. Добавлен блок «Корпоративная
   совместимость».
   ============================================================ */

const ARGS_FOR = [
  "Успешные кейсы запусков в крупных компаниях",
  "Развитые коммуникативные навыки, умение убеждать",
  "Опыт работы в продуктовой среде (e-commerce)",
  "Высокий уровень самоанализа и системное мышление",
];
const ARGS_AGAINST = ["Высокие зарплатные ожидания", "Мало опыта в заказной разработке"];

type Skill = { name: string; val: number; req: number; desc: string };
const SKILLS: Skill[] = [
  { name: "Управление", val: 78, req: 86, desc: "Сильные навыки в проектной работе — самостоятельно собрал и координировал команду из 12 человек. Опыт в фонде доказывает умение контролировать исполнение" },
  { name: "Лидерство", val: 72, req: 86, desc: "Проявляет лидерство через ответственность и инициативу. Стиль управления скорее функциональный, чем визионерский" },
  { name: "Коммуникация", val: 80, req: 80, desc: "Высокоразвитый навык. Ясно и структурно излагает мысли, внимательно слушает. Эффективно общается с тех. командой и клиентами" },
  { name: "Планирование", val: 85, req: 80, desc: "Одно из сильнейших качеств. Доказанный опыт построения систем с нуля в условиях неопределённости. Умеет декомпозировать задачи" },
  { name: "Адаптивность", val: 75, req: 72, desc: "Опыт работы в разных средах (фонд, EdTech, стартап) и с разными методологиями говорит о хорошей адаптивности к новым условиям" },
  { name: "Стрессоустойчивость", val: 68, req: 84, desc: "Демонстрирует спокойное и контролируемое поведение. Маркеры речи указывают на самоконтроль, но нет реальных кейсов работы в стрессе" },
  { name: "Командная работа", val: 46, req: 80, desc: "Понимает важность диалога, но предпочитает личный контакт (face-to-face). Успешно собирал и координировал команду" },
  { name: "Эмпатия", val: 70, req: 85, desc: "Проявляет эмпатию через ориентацию на пользу продукта для пользователя. Предпочитает обобщённый подход" },
  { name: "Решение проблем", val: 82, req: 86, desc: "Сильный навык. Умеет анализировать ситуации, находить и внедрять нестандартные решения (подтверждено кейсами)" },
  { name: "Критическое мышление", val: 80, req: 80, desc: "Оценивает не только «как» делать, но и «зачем» — ставит под сомнение ценность процессов и выбирает лучшие подходы" },
];

const RADAR: { l: string; v: number; req: number }[] = [
  { l: "Управление", v: 35, req: 86 }, { l: "Лидерство", v: 90, req: 86 }, { l: "Коммуникация", v: 40, req: 80 },
  { l: "Планирование", v: 30, req: 80 }, { l: "Адаптивность", v: 72, req: 72 }, { l: "Стрессоустойчивость", v: 50, req: 84 },
  { l: "Командная работа", v: 18, req: 80 }, { l: "Эмпатия", v: 25, req: 85 }, { l: "Решение проблем", v: 62, req: 86 },
  { l: "Критическое мышление", v: 62, req: 80 },
];

/* оценка корпоративной совместимости — кандидат против эталонного профиля культуры */
type CDim = { name: string; val: number; ref: number };
const COMPAT_SCORE = 74;
const COMPAT_DIMS: CDim[] = [
  { name: "Стабильность и процессы", val: 82, ref: 78 },
  { name: "Ориентация на результат", val: 80, ref: 78 },
  { name: "Внимание к деталям", val: 76, ref: 74 },
  { name: "Ориентация на людей", val: 70, ref: 68 },
  { name: "Командная работа", val: 64, ref: 78 },
  { name: "Инновационность / гибкость", val: 58, ref: 60 },
  { name: "Конкурентность", val: 55, ref: 58 },
];
const COMPAT_MATCHES: [string, string][] = [
  ["Системно ведёт задачи", "Планирует, держит сроки и доводит работу до результата — так, как принято в команде."],
  ["Внимателен к деталям", "Проверяет результат и не упускает мелочи — меньше ошибок на запуске продукта."],
  ["Отвечает за результат", "Берёт ответственность на себя и не перекладывает на других — удобен в управлении."],
];
const COMPAT_ATTENTION: [string, string][] = [
  ["Командное взаимодействие", "Предпочитает решать вопросы один на один. На старте стоит договориться о регулярных встречах команды."],
  ["Реакция на изменения", "Осторожен к резким сменам планов. Лучше давать чёткие приоритеты и время на адаптацию."],
];
const dimTone = (g: number) => (g >= 0 ? { c: GREEN, l: "Соответствует" } : g >= -8 ? { c: AMBER, l: "Близко" } : { c: RED, l: "Ниже эталона" });

export default function ReportPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Skill | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* появление секций из блюра + лёгкое увеличение */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 46, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* блокируем скролл фона при открытой модалке */
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <div ref={rootRef} className="relative w-full" style={{ color: INK }}>
      {/* HERO */}
      <section className="mx-auto max-w-[1100px] px-6 pt-36 pb-8 text-center md:px-8 lg:pt-40">
        <h1 className="rv mx-auto mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.04] tracking-tight">Результат анализа</h1>
        <p className="rv mx-auto mt-4 max-w-2xl text-lg text-[#183833]/65">Детальный разбор soft skills и корпоративной совместимости на основе реального интервью</p>
      </section>

      <div className="mx-auto max-w-[1100px] space-y-5 px-5 pb-24 md:px-8">
        {/* 0 · шапка кандидата + соответствие */}
        <div className="rv flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#e6ece4] bg-white p-6 shadow-[0_16px_44px_rgba(24,56,51,0.06)] sm:flex-row sm:items-center md:px-8">
          <div>
            <h2 className="text-[1.7rem] font-bold leading-tight tracking-tight" style={{ color: INK }}>Дмитрий Соколов</h2>
            <p className="mt-1.5 text-sm font-semibold leading-snug" style={{ color: TEAL }}>Старший менеджер проектов</p>
            <p className="text-sm font-medium leading-snug" style={{ color: `${TEAL}b3` }}>IT · e-commerce</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <p className="text-xs font-medium uppercase tracking-wide text-[#183833]/50">Соответствие</p>
            <ComplianceRing value={77} />
          </div>
        </div>

        {/* 1 · кандидат + решение */}
        <div className="rv grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold">Информация о кандидате</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Info icon={<Briefcase className="h-4 w-4" />} t="Опыт" v="9 лет" />
              <Info icon={<Building2 className="h-4 w-4" />} t="Компании" v="Ozon, Яндекс, финтех" />
              <Info icon={<Wallet className="h-4 w-4" />} t="Ожидания" v="$2 800 (на руки)" />
              <Info icon={<Home className="h-4 w-4" />} t="Формат" v="гибрид / удалённо" />
            </div>
            <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
              Опытный руководитель ИТ-проектов в e-commerce и финтехе. Управлял распределёнными командами до 15 человек,
              запускал продукты с нуля и развивал существующие
            </p>
          </Card>

          <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-bold"><Check className="h-5 w-5" style={{ color: GREEN }} /> Решение о переходе на следующий этап</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Рекомендован</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold" style={{ color: GREEN }}>Аргументы «За»</p>
                <ul className="mt-2 space-y-1.5">{ARGS_FOR.map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {a}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: RED }}>Аргументы «Против»</p>
                <ul className="mt-2 space-y-1.5">{ARGS_AGAINST.map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><X className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: RED }} /> {a}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>

        {/* 2 · оценка корпоративной совместимости */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Оценка корпоративной совместимости</h2>
          <p className="mx-auto mt-1 max-w-xl text-center text-xs text-[#183833]/55">Насколько ценности и поведение кандидата совпадают с ДНК и культурным кодом компании</p>

          <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            {/* индекс совместимости */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] via-white to-[#eef7e0] p-6 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
              <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-[#7AB800]/12 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-[-30%] h-32 w-32 rounded-full bg-[#11AFCC]/8 blur-3xl" />
              <p className="relative flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#183833]/45"><Dna className="h-4 w-4" style={{ color: GREEN }} /> Индекс совместимости</p>
              <div className="relative mt-1 flex justify-center"><FitGauge value={COMPAT_SCORE} /></div>
              <div className="relative -mt-1 flex justify-center"><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Высокая совместимость</span></div>
              <p className="relative mt-4 text-center text-[13px] leading-relaxed text-[#183833]/75">Кандидат хорошо подойдёт команде, где важны <b style={{ color: INK }}>процессы, сроки и качество</b>: его сильные стороны совпадают с требованиями позиции. Главное, на что обратить внимание при адаптации, — командное взаимодействие.</p>
              <div className="relative mt-auto grid grid-cols-2 gap-3 pt-5">
                <div className="rounded-2xl bg-white/70 p-3 text-center"><p className="text-2xl font-bold" style={{ color: GREEN }}>{COMPAT_DIMS.filter((d) => d.val >= d.ref).length}</p><p className="mt-0.5 text-[10px] text-[#183833]/55">сильных совпадения</p></div>
                <div className="rounded-2xl bg-white/70 p-3 text-center"><p className="text-2xl font-bold" style={{ color: AMBER }}>{COMPAT_DIMS.filter((d) => d.val < d.ref).length}</p><p className="mt-0.5 text-[10px] text-[#183833]/55">зоны внимания</p></div>
              </div>
            </div>

            {/* совпадение по измерениям культуры */}
            <Card className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${GREEN}1a` }}><Target className="h-4 w-4" style={{ color: GREEN }} /></span> Совпадение по измерениям</p>
                <span className="flex items-center gap-1.5 text-[10px] text-[#183833]/45"><span className="inline-block h-2.5 w-4 rounded-full border border-[#cfd6ce]" style={{ background: "#e0e5df" }} /> разрыв до эталона</span>
              </div>
              <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
                {COMPAT_DIMS.map((d) => <DimRow key={d.name} d={d} mounted={mounted} />)}
              </div>
            </Card>
          </div>

          {/* сильные совпадения / зоны внимания */}
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#d8ecc4] bg-[#f3faea] p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Сильные совпадения</p>
              <div className="mt-3 space-y-2.5">{COMPAT_MATCHES.map(([t, x]) => <div key={t} className="rounded-2xl bg-white/70 p-3.5"><p className="text-[13px] font-bold" style={{ color: INK }}>{t}</p><p className="mt-0.5 text-xs leading-snug text-[#183833]/65">{x}</p></div>)}</div>
            </div>
            <div className="rounded-3xl border border-[#f1d9a8] bg-[#fdf6e9] p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: AMBER }}><AlertTriangle className="h-4 w-4" /> Зоны внимания</p>
              <div className="mt-3 space-y-2.5">{COMPAT_ATTENTION.map(([t, x]) => <div key={t} className="rounded-2xl bg-white/70 p-3.5"><p className="text-[13px] font-bold" style={{ color: INK }}>{t}</p><p className="mt-0.5 text-xs leading-snug text-[#183833]/65">{x}</p></div>)}</div>
            </div>
          </div>
        </section>

        {/* 3 · риски / сильные / психолингвистика */}
        <div className="rv grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> Риски</h3>
            <Block t="Риск ухода" badge="Критично" bc={RED} text="Кандидат прямо говорит, что текущая компания — способ получить аккредитацию и отсрочку" />
            <Block t="Мало опыта в классической роли" badge="Важно" bc={AMBER} text="Основной релевантный опыт — один проект, похожий на фриланс. Может не хватать навыков в крупной ИТ-компании" />
            <Block t="Фокус на процессах" badge="Заметка" bc={AMBER} text="В кейсах упор на организацию и запуски, но почти нет работы с данными и метриками (LTV, конверсия)" />
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Сильные стороны</h3>
            <Block t="Системное мышление" text="Умеет выстраивать процессы с нуля, декомпозировать задачи и доводить продукт до запуска" />
            <Block t="Полный цикл проекта" text="Уверенно ведёт проект на всех этапах — от идеи и сборки команды до запуска и развития" />
            <Block t="Рефлексивность" text="Анализирует ценность работы и решает, исходя из реального эффекта, а не «героизма»" />
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: TEAL }}><AudioLines className="h-4 w-4" /> Психолингвистика</h3>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs font-semibold"><span style={{ color: INK }}>Мы</span><span style={{ color: INK }}>Я</span></div>
              <div className="relative mt-1.5 h-1.5 rounded-full bg-[#eef2ec]">
                <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000" style={{ width: mounted ? "62%" : "0%", background: `linear-gradient(90deg,${TEAL},${GREEN})` }} />
                <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-[left] duration-1000" style={{ left: mounted ? "62%" : "0%", background: GREEN }} />
              </div>
            </div>
            <Block t="Баланс «Я» / «Мы»" text="Балансирует «Я» при личной ответственности и «Мы» при командных процессах — зрелое распределение фокуса" />
            <Block t="Тон" text="Спокойный, размеренный, контролируемый. Говорит неспешно, тембр низкий, ровный" />
            <Block t="Локус контроля" text="Берёт ответственность на себя, анализирует и делает выводы, не перекладывая на внешние обстоятельства" />
          </Card>
        </div>

        {/* 3 · диаграмма соответствия */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Диаграмма соответствия</h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-[#183833]/55">График показывает зоны отставания кандидата от требований профиля</p>
          <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Card><RoseChart /></Card>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-[#e6ece4] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(24,56,51,0.05)]"><span className="text-base font-bold">Среднее отклонение</span><span className="flex items-center gap-1 text-base font-bold" style={{ color: AMBER }}>9% <ChevronDown className="h-4 w-4" /></span></div>
              <Card className="flex flex-1 flex-col">
                <p className="flex items-center gap-2 text-base font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> Главные риски</p>
                <div className="mt-3 space-y-3">
                  {([
                    ["Стрессоустойчивость", "16%", "Оценка базируется на спокойном поведении кандидата, без реальных примеров работы в стрессовых ситуациях"],
                    ["Эмпатия", "15%", "Есть косвенные признаки, но нет прямых примеров того, как эмпатия влияет на продуктовые решения"],
                    ["Лидерство", "14%", "Проявлено в основном через управление проектами; не хватает примеров визионерства и мотивации команды в сложных условиях"],
                  ] as [string, string, string][]).map(([k, v, dsc], i) => (
                    <div key={k} className={i ? "border-t border-[#eef0ee] pt-3" : ""}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{k}</span>
                        <span className="flex items-center gap-1 text-sm font-bold" style={{ color: RED }}>{v} <ChevronDown className="h-3.5 w-3.5" /></span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#183833]/65">{dsc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-[#eef0ee] pt-4">
                  <p className="flex items-center gap-2 text-base font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Наибольшее соответствие</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#183833]/75">Профиль кандидата максимально близок к требованиям по навыкам «Планирование» и «Решение проблем»</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 4 · карта soft skills */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Карта soft skills</h2>
          <p className="mx-auto mt-1 max-w-lg text-center text-xs text-[#183833]/55">Подробный gap-анализ, мини-диаграмма и цитаты открываются в модальном окне</p>
          <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
            {SKILLS.map((s) => <SkillCard key={s.name} s={s} mounted={mounted} onOpen={() => setActive(s)} />)}
          </div>
        </section>

        {/* 5 · кейсы STAR */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Кейсы (модель STAR)</h2>
          <div className="mt-4 space-y-4">
            <StarCase title="Кейс 1: Разработка игровой платформы для агентства недвижимости"
              s="Агентство в ОАЭ столкнулось с трудностями в привлечении инвесторов из-за высокого порога входа и непонимания рынка"
              t="Создать маркетинговый продукт, который знакомит инвесторов с рынком в игровой форме и повышает вовлечённость"
              a="Выступил в роли PM/PO. Собрал команду из 12 человек (разработчики, ML, маркетинг). Управлял всем: от геймдизайна до релиза"
              r="Проект успешно сдан клиенту. Конкретные бизнес-метрики (ROI, число инвесторов) не раскрыты"
              note="Сильный кейс полного цикла управления. Проявил инициативу и организаторские навыки. Слабое место — отсутствие бизнес-результатов в цифрах" />
            <StarCase title="Кейс 2: Построение системы управления в венчурном фонде"
              s="На старте у фонда не было процессов оценки стартапов (due diligence) и трекинга, что создавало хаос"
              t="Внедрить внутреннюю систему управления для структурирования работы со стартапами (CRM и трекинг)"
              a="Внедрил инструмент. Выстроил процессы контроля и обратной связи от портфельных проектов"
              r="Создана система для адекватного проведения due diligence. Снижены операционные риски"
              note="Отлично иллюстрирует навыки планирования и построения процессов в неопределённости. Однако роль здесь скорее процессная, чем продуктовая" />
          </div>
        </section>

        {/* 7 · рекомендации */}
        <section className="rv">
          <h2 className="text-center text-lg font-bold md:text-2xl">Рекомендации для следующих этапов</h2>
          <div className="mt-4 space-y-3">
            <Reco title="Опыт работы с продуктовой аналитикой" text="В кейсах нет работы с метриками (A/B-тесты, Retention, LTV, воронки). Это критично для data-driven продакта"
              qs={["Приведите пример, когда вы использовали данные для принятия важного решения. Какие метрики смотрели?", "Как определяли ключевые метрики успеха в игровом проекте? Как их трекали?", "Сталкивались ли вы с ситуацией, когда данные противоречили гипотезе? Что делали?"]} />
            <Reco title="Управление стейкхолдерами в корпоративной среде" text="Весь опыт — либо с одним клиентом, либо мониторинг фонда. Неясно, как справится в среде с конфликтующими интересами"
              qs={["Опишите самую сложную ситуацию в управлении ожиданиями. В чём был конфликт и как вы его решили?", "Как вы выстраивали процесс согласования роадмапа с разными отделами?", "Что будете делать, если продажи требуют фичу «вчера», а разработка оценивает её в 3 месяца?"]} />
            <Reco title="Опыт проведения user research (CustDev)" text="Кандидат говорит о важности аудитории, но не приводит реальных примеров глубинных интервью, опросов или анализа поведения"
              qs={["Как исследования пользователей влияли на бэклог или роадмап вашего продукта?", "Какие методы исследований (research) вы применяли на практике?", "Как вы отделяете то, что пользователи говорят, от того, что им действительно нужно?"]} />
          </div>
        </section>

        <p className="rv text-center text-[11px] text-[#183833]/40">TalentMind · автоматически сгенерированный отчёт · демо-данные</p>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ДЕТАЛИ НАВЫКА */}
      {active && <SkillModal s={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* ============================================================
   Модальное окно — детальный разбор навыка
   ============================================================ */
function SkillModal({ s, onClose }: { s: Skill; onClose: () => void }) {
  const gap = s.val - s.req;
  const lc = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <style>{`@keyframes skillFade{from{opacity:0}to{opacity:1}}
        @keyframes skillPop{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes coneGrow{from{transform:scaleX(0);opacity:.2}to{transform:scaleX(1);opacity:1}}
        @keyframes legendIn{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div className="absolute inset-0 bg-[#0d1b17]/45 backdrop-blur-sm" style={{ animation: "skillFade .28s ease both" }} onClick={onClose} />
      <div className="relative z-10 w-[min(1080px,94vw)] max-h-[90vh] overflow-y-auto rounded-[26px] border border-[#e6ece4] bg-white p-6 shadow-[0_60px_140px_rgba(13,27,23,0.5)] md:p-9" data-lenis-prevent style={{ animation: "skillPop .36s cubic-bezier(.22,1,.36,1) both" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>{s.name}</h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#183833]/65">{s.desc}</p>
          </div>
          <button onClick={onClose} aria-label="Закрыть" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e6ece4] text-[#183833]/55 transition-colors hover:bg-[#f4f7f2] hover:text-[#183833]"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* ожидания + разрыв */}
          <div className="space-y-4">
            <SoftCard t="Ожидания от роли" text="Требуется уверенное владение навыком на всех этапах жизненного цикла продукта — от постановки задачи до внедрения решения" />
            <SoftCard t="Разрыв" text={gap < 0 ? "Небольшой разрыв. Кандидат уверенно решает вопросы организации и запуска. Для более высокой оценки не хватило кейсов на основе данных (data-driven)" : "Разрыва нет — кандидат соответствует требованиям профиля или превосходит их по этому навыку"} />
          </div>
          {/* диаграмма */}
          <div className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[#e6ece4] bg-gradient-to-br from-[#f7fbf0] via-white to-[#eef7e0] p-6">
            <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#7AB800]/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-[-30%] h-32 w-32 rounded-full bg-[#11AFCC]/8 blur-3xl" />
            <ConeChart val={s.val} req={s.req} color={lc} />
            <div className="relative flex-1">
              <p className="text-sm font-semibold" style={{ color: INK }}>{s.name} <span className="ml-1 text-2xl font-bold" style={{ color: lc }}>{s.val}%</span></p>
              <div className="mt-4 space-y-2.5 text-xs">
                <LegendRow c="#bfe3ec" t="Разрыв" v={`${gap > 0 ? "+" : ""}${gap}%`} vc={gap < 0 ? RED : GREEN} d={0.5} />
                <LegendRow c={lc} t="Уровень кандидата" v={`${s.val}%`} d={0.62} />
                <LegendRow c="#d6ebf2" t="Требования профиля" v={`${s.req}%`} d={0.74} />
              </div>
            </div>
          </div>
        </div>

        {/* почему не выше / ниже */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#fff5f5] p-5">
            <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: RED }}><TrendingDown className="h-4 w-4" /> Почему не выше</p>
            <p className="mt-2 text-sm leading-snug text-[#183833]/70">Показаны решения организационных и концептуальных задач, но не аналитических (например, «почему падает конверсия» или «как повысить retention»)</p>
          </div>
          <div className="rounded-2xl bg-[#f3faea] p-5">
            <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}><TrendingUp className="h-4 w-4" /> Почему не ниже</p>
            <p className="mt-2 text-sm leading-snug text-[#183833]/70">Сильная проактивность и нацеленность на результат. Кандидат умеет брать ответственность за сложные решения и доводить их до внедрения</p>
          </div>
        </div>

        {/* аудиомаркеры */}
        <div className="mt-4 rounded-2xl bg-[#f6faef] p-5">
          <p className="text-sm font-bold" style={{ color: INK }}>Аудиомаркеры</p>
          <p className="mt-1 text-xs text-[#183833]/55">Говоря о решениях, звучит уверенно и прямо, фокусируясь на действиях и результатах</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["Сохраняет ровный, деловой темп при описании проблемы и решения, показывая прагматичный подход", "Быстро переходит от описания проблемы к её решению — признак развитого навыка"].map((m) => (
              <div key={m} className="flex items-start gap-2"><AudioLines className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs leading-snug text-[#183833]/65">{m}</span></div>
            ))}
          </div>
        </div>

        {/* цитаты */}
        <div className="mt-4 rounded-2xl bg-[#f6faef] p-5">
          <p className="text-sm font-bold" style={{ color: INK }}>Цитаты</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["У неё была проблема: она не понимала, как аккумулировать маркетинговые ресурсы на этом рынке", "Идея заключалась в создании игры для снижения стресса у людей, готовых инвестировать из другого региона", "Я настоял на изменении концепции"].map((q) => (
              <div key={q} className="flex items-start gap-2"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><span className="text-xs italic leading-snug text-[#183833]/60">{q}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* оттенки конуса по уровню (светлый · базовый · тёмный) */
const CONE_SHADES: Record<string, [string, string, string]> = {
  [GREEN]: ["#a4d44a", "#7AB800", "#5f9b00"],
  [AMBER]: ["#f6cf63", "#E8A317", "#bd840c"],
  [RED]: ["#ff8f8f", "#FF5252", "#dd3b3b"],
};
/* конусная диаграмма уровня (анимированная, цвет и длина по проценту) */
function ConeChart({ val, req, color }: { val: number; req: number; color: string }) {
  const W = 196, H = 132, cy = H / 2, x0 = 16, x1 = W - 16, maxH = H - 26;
  const Lfull = x1 - x0, half = maxH / 2;
  const [c0, c1, c2] = CONE_SHADES[color] ?? CONE_SHADES[GREEN];
  /* конус занимает val% длины шкалы, толщина растёт пропорционально */
  const xv = x0 + (val / 100) * Lfull, hv = (val / 100) * half;
  const xr = x0 + (req / 100) * Lfull, hr = (req / 100) * half;
  const gid = "coneFill", fid = "coneGlow";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[124px] w-[186px] shrink-0 overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c0} />
          <stop offset="55%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id={fid} x="-30%" y="-40%" width="160%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={c1} floodOpacity="0.34" />
        </filter>
      </defs>

      {/* требования профиля — пунктирный контур до req% */}
      <polygon points={`${x0},${cy} ${xr},${cy - hr} ${xr},${cy + hr}`} fill="#bfe3ec" fillOpacity="0.16" stroke="#a9d8e6" strokeWidth="1.8" strokeDasharray="4 4" strokeLinejoin="round" style={{ animation: "skillFade .4s ease .15s both" }} />
      <line x1={xr} y1={cy - hr} x2={xr} y2={cy + hr} stroke="#a9d8e6" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 4" style={{ animation: "skillFade .4s ease .15s both" }} />

      {/* уровень кандидата — растущий конус до val% */}
      <g style={{ transformOrigin: `${x0}px ${cy}px`, animation: "coneGrow 1s cubic-bezier(.22,1,.36,1) .12s both" }}>
        <polygon points={`${x0},${cy} ${xv},${cy - hv} ${xv},${cy + hv}`} fill={`url(#${gid})`} filter={`url(#${fid})`} strokeLinejoin="round" />
        <line x1={xv} y1={cy - hv} x2={xv} y2={cy + hv} stroke={c2} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* вершина */}
      <circle cx={x0} cy={cy} r="3.4" fill={c2} style={{ animation: "skillFade .4s ease .35s both" }} />
    </svg>
  );
}
function LegendRow({ c, t, v, vc, d = 0 }: { c: string; t: string; v: string; vc?: string; d?: number }) {
  return (
    <div className="flex items-center justify-between" style={{ animation: `legendIn .5s ease ${d}s both` }}>
      <span className="flex items-center gap-2 text-[#183833]/70"><span className="h-3 w-3 rounded-sm" style={{ background: c }} /> {t}</span>
      <span className="font-bold tabular-nums" style={{ color: vc || INK }}>{v}</span>
    </div>
  );
}
function SoftCard({ t, text }: { t: string; text: string }) {
  return <div className="rounded-2xl bg-[#f6faef] p-5"><p className="text-sm font-bold" style={{ color: INK }}>{t}</p><p className="mt-2 text-sm leading-snug text-[#183833]/70">{text}</p></div>;
}
/* карточка «точка совпадения / трения» */
/* кольцо соответствия в шапке кандидата */
function ComplianceRing({ value }: { value: number }) {
  const r = 36, circ = 2 * Math.PI * r, off = circ - (value / 100) * circ;
  return (
    <div className="relative h-[96px] w-[96px]">
      <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
        <defs><linearGradient id="compG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a4d44a" /><stop offset="100%" stopColor="#5f9b00" /></linearGradient></defs>
        <style>{`@keyframes compDraw{from{stroke-dashoffset:${circ.toFixed(1)}}to{stroke-dashoffset:${off.toFixed(1)}}}`}</style>
        <circle cx="48" cy="48" r={r} fill="none" stroke="#eef2ec" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke="url(#compG)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circ.toFixed(1)} style={{ strokeDashoffset: off.toFixed(1), animation: "compDraw 1.2s cubic-bezier(.22,1,.36,1) .2s both" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold" style={{ color: "#5f9b00" }}>{value}%</span></div>
    </div>
  );
}
/* полукруглый гейдж индекса совместимости */
function FitGauge({ value }: { value: number }) {
  const circ = Math.PI * 64, off = circ - (value / 100) * circ;
  return (
    <svg viewBox="0 0 168 100" className="w-full max-w-[200px] overflow-visible">
      <defs>
        <linearGradient id="fitG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#11AFCC" /><stop offset="100%" stopColor="#7AB800" /></linearGradient>
      </defs>
      <style>{`@keyframes gaugeDraw{from{stroke-dashoffset:${circ.toFixed(1)}}to{stroke-dashoffset:${off.toFixed(1)}}}`}</style>
      <path d="M20,88 A64,64 0 0 1 148,88" fill="none" stroke="#e7eee4" strokeWidth="13" strokeLinecap="round" />
      <path d="M20,88 A64,64 0 0 1 148,88" fill="none" stroke="url(#fitG)" strokeWidth="13" strokeLinecap="round" strokeDasharray={circ.toFixed(1)} style={{ strokeDashoffset: off.toFixed(1), animation: "gaugeDraw 1.2s cubic-bezier(.22,1,.36,1) .2s both" }} />
      <text x="84" y="80" textAnchor="middle" fontSize="34" fontWeight="800" fill={INK}>{value}<tspan fontSize="17" dy="-2">%</tspan></text>
    </svg>
  );
}
/* строка измерения культуры: кандидат vs эталон (bullet-полоса) */
function DimRow({ d, mounted }: { d: CDim; mounted: boolean }) {
  const g = d.val - d.ref, t = dimTone(g);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium" style={{ color: INK }}>{d.name}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: `${t.c}1a`, color: t.c }}>{t.l}</span>
          <span className="text-xs font-bold tabular-nums" style={{ color: t.c }}>{d.val}<span className="font-medium text-[#183833]/35"> / {d.ref}</span></span>
        </span>
      </div>
      <div className="relative mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#eef2ec]">
        {/* разрыв до требуемого уровня (эталона) */}
        {g < 0 && (
          <div className="absolute inset-y-0 rounded-r-full" style={{ left: mounted ? `${d.val}%` : "0%", width: mounted ? `${-g}%` : "0%", background: "repeating-linear-gradient(-45deg,#dfe4de,#dfe4de 3px,#eceff0 3px,#eceff0 6px)", transition: "left 1.1s cubic-bezier(.22,1,.36,1), width 1.1s cubic-bezier(.22,1,.36,1)" }} />
        )}
        {/* уровень кандидата */}
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: mounted ? `${d.val}%` : "0%", background: t.c, transition: "width 1.1s cubic-bezier(.22,1,.36,1)" }} />
      </div>
    </div>
  );
}

/* ============================================================
   Мелкие компоненты
   ============================================================ */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_16px_44px_rgba(24,56,51,0.06)] ${className}`}>{children}</div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function Block({ t, text, badge, bc }: { t: string; text: string; badge?: string; bc?: string }) {
  return <div className="mt-3 border-t border-[#eef0ee] pt-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">{t}</p>{badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase" style={{ background: `${bc}1a`, color: bc }}>{badge}</span>}</div><p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{text}</p></div>;
}
function SkillCard({ s, mounted, onOpen }: { s: Skill; mounted: boolean; onOpen: () => void }) {
  const c = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">{s.name}</p><span className="text-sm font-bold" style={{ color: c }}>{s.val}%</span></div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${s.val}%` : "0%", background: c }} /></div>
      <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">{s.desc}</p>
      <button onClick={onOpen} className="ease-smooth mt-auto inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-[#d8ecc4] px-3.5 py-1.5 text-[11px] font-semibold transition-all hover:-translate-y-0.5 hover:bg-[#f3faea]" style={{ color: GREEN, marginTop: "auto" }}>Подробнее →</button>
    </Card>
  );
}
function StarCase({ title, s, t, a, r, note }: { title: string; s: string; t: string; a: string; r: string; note: string }) {
  const rows: [string, string, string][] = [["Ситуация", s, TEAL], ["Задача", t, GREEN], ["Действие", a, AMBER], ["Результат", r, GREEN]];
  return (
    <Card>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([k, v, c]) => <div key={k} className="rounded-2xl bg-[#f6faef] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {k}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{v}</p></div>)}
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#d8ecc4] bg-[#f3faea] p-3.5"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><div><p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}>Оценка</p><p className="mt-0.5 text-[11px] leading-snug text-[#183833]/70">{note}</p></div></div>
    </Card>
  );
}
function Reco({ title, text, qs }: { title: string; text: string; qs: string[] }) {
  return (
    <Card>
      <p className="flex items-center gap-2 text-base font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${TEAL}1a`, color: TEAL }}><GitBranch className="h-4 w-4" /></span> {title}</p>
      <p className="mt-2 text-sm leading-snug text-[#183833]/65">{text}</p>
      <ul className="mt-3 space-y-2">{qs.map((q) => <li key={q} className="flex items-start gap-2 rounded-xl bg-[#f6faef] px-3 py-2 text-xs text-[#183833]/75"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {q}</li>)}</ul>
    </Card>
  );
}
/* роза-диаграмма (полярные сектора) */
function RoseChart() {
  const N = RADAR.length, cx = 280, cy = 220, R = 140, seg = 360 / N, pad = 1.6, labelR = R + 18;
  const lvl = (v: number) => (v >= 60 ? GREEN : v >= 40 ? "#bcdd93" : "#f2a0a0");
  const rad = (d: number) => (d * Math.PI) / 180;
  /* пирог-сектор от центра до радиуса r */
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  /* направляющая дуга на радиусе r */
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 560 480" className="w-full max-w-[520px]">
        {/* вся шкала 0–100% — нейтральная подложка сектора */}
        {RADAR.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {/* тонкие концентрические направляющие шкалы */}
        {[0.25, 0.5, 0.75, 1].map((f) => RADAR.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {/* требования профиля — светло-голубой сектор до уровня req */}
        {RADAR.map((d, i) => <path key={`req${i}`} d={sector((R * d.req) / 100, i)} fill="#bcd9ec" stroke="#ffffff" strokeWidth="1.5" />)}
        {/* уровень кандидата — закрашенный сектор по значению */}
        {RADAR.map((d, i) => <path key={`v${i}`} d={sector((R * d.v) / 100, i)} fill={lvl(d.v)} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.04 * i + 0.1}s both` }} />)}
        {/* значения % кандидата внутри сектора */}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.66;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="13" fontWeight="700" fill="#2b4a44" textAnchor="middle" dominantBaseline="middle">{d.v}%</text>;
        })}
        {/* подписи навыков снаружи */}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const anchor = ca > 0.15 ? "start" : ca < -0.15 ? "end" : "middle";
          return <text key={`l${i}`} x={(cx + labelR * ca).toFixed(1)} y={(cy + labelR * Math.sin(a)).toFixed(1)} fontSize="12.5" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">{d.l}</text>;
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-[#183833]/70 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4">
        <Lg c="#bcd9ec" t="Требования профиля" /><Lg c="#f2a0a0" t="Низкий уровень навыка" /><Lg c="#bcdd93" t="Средний уровень навыка" /><Lg c={GREEN} t="Высокий уровень навыка" />
      </div>
    </div>
  );
}
function Lg({ c, t }: { c: string; t: string }) { return <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm border border-black/5" style={{ background: c }} /> {t}</span>; }
