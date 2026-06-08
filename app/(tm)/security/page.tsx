"use client";

import { ShieldCheck, Lock, Server, FileCheck, Eye, KeyRound } from "lucide-react";
import { Arrow, CTA, Eyebrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

const PILLARS = [
  { icon: <Lock className="h-6 w-6" />, t: "Надежное шифрование", d: "Данные шифруются в состоянии покоя и при передаче с использованием современных криптографических стандартов. Данные клиентов и записи интервью строго изолированы друг от друга", a: GREEN },
  { icon: <FileCheck className="h-6 w-6" />, t: "Конфиденциальность данных", d: "Мы обеспечиваем полную защиту информации о кандидатах. Поддерживаем процессы получения согласий, гарантируем право на удаление и безопасный экспорт данных по запросу", a: TEAL },
  { icon: <ShieldCheck className="h-6 w-6" />, t: "Защищенный контур", d: "Инфраструктура защищена от несанкционированного доступа и DDoS-атак. Мы регулярно проводим внутренний аудит безопасности и мониторинг уязвимостей (Vulnerability Management)", a: GREEN },
  { icon: <KeyRound className="h-6 w-6" />, t: "Безопасная передача данных", d: "Весь обмен данными между пользователями, интеграциями и ядром искусственного интеллекта происходит по защищенным протоколам (TLS/HTTPS), исключая перехват трафика", a: TEAL },
  { icon: <Server className="h-6 w-6" />, t: "Локализация данных в РФ", d: "Платформа размещена в надежных дата-центрах (Tier III) на территории России. Обеспечено непрерывное резервное копирование. Для Enterprise-клиентов доступно локальное on-premise развертывание", a: GREEN },
  { icon: <Eye className="h-6 w-6" />, t: "Ролевая модель и аудит", d: "Гибкая настройка прав доступа (RBAC) для разных ролей в команде. Платформа ведет подробные журналы аудита (логирование) всех действий для прозрачности и предотвращения инцидентов", a: TEAL },
];

export default function SecurityPage() {
  const root = useReveals();
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <div className="reveal flex justify-center"><Eyebrow>Безопасность</Eyebrow></div>
        <h1 className="reveal mx-auto mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          Корпоративная <span style={{ color: GREEN }}>безопасность</span> по умолчанию
        </h1>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-[#183833]/70">
          Надежное шифрование, защита персональных данных, хранение на серверах в России и контроль
          доступа — чтобы данные кандидатов оставались под защитой на каждом этапе работы ИИ
        </p>
        <div className="reveal mt-9 flex justify-center"><CTA>Запросить демо безопасности</CTA></div>
      </section>

      {/* badges row */}
      <section className="mx-auto max-w-[1000px] px-6 pb-10">
        <div className="stagger grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["Защита персональных данных", "Надежное шифрование", "Хранение данных в РФ", "Защищенная инфраструктура"].map((b) => (
            <div key={b} className="flex items-center justify-center rounded-2xl border border-[#ededed] bg-white px-4 py-6 text-center text-sm font-semibold leading-snug shadow-[0_12px_30px_rgba(24,56,51,0.05)] sm:text-base" style={{ color: INK }}>
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.t} className="flex h-full flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: p.a }}>{p.icon}</span>
              <h3 className="mt-5 text-xl font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="reveal flex flex-col items-center gap-4 rounded-3xl p-10 text-center text-white" style={{ background: INK }}>
          <ShieldCheck className="h-10 w-10" style={{ color: GREEN }} />
          <p className="text-2xl font-semibold">Нужен security-обзор для вашей команды?</p>
          <p className="max-w-md text-white/70">Пришлём документацию по безопасности, соглашение об обработке ПДн и ответим на вопросы вашего ИБ-отдела</p>
          <a href="/contacts" className="group mt-2 flex items-center gap-1 rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ background: GREEN }}>
            Связаться с нами <Arrow className="text-white" />
          </a>
        </div>
      </section>
    </div>
  );
}
