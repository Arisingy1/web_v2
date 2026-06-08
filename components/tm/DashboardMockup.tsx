"use client";

import { Maximize2, X, Plus, Search, Settings, Mic, ArrowRight, MessageSquare } from "lucide-react";
import { Candidate, GREEN, INK, RED, TEAL } from "./ui";

/* Soft-skills rose chart (deterministic → SSR-safe) */
export function Rose({ size = 120 }: { size?: number }) {
  const segs = [
    { v: 0.62, c: GREEN },
    { v: 0.92, c: GREEN },
    { v: 0.5, c: TEAL },
    { v: 0.4, c: TEAL },
    { v: 0.28, c: RED },
    { v: 0.55, c: "#bfe39a" },
    { v: 0.72, c: "#7fd6e6" },
    { v: 0.46, c: GREEN },
  ];
  const cx = 60, cy = 60, max = 50;
  const step = (Math.PI * 2) / segs.length;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx={cx} cy={cy} r="54" fill="#F4F7F6" />
      {segs.map((s, i) => {
        const a0 = i * step - Math.PI / 2;
        const a1 = a0 + step * 0.88;
        const r = max * s.v + 10;
        const x0 = (cx + r * Math.cos(a0)).toFixed(2);
        const y0 = (cy + r * Math.sin(a0)).toFixed(2);
        const x1 = (cx + r * Math.cos(a1)).toFixed(2);
        const y1 = (cy + r * Math.sin(a1)).toFixed(2);
        return (
          <path
            key={i}
            d={`M${cx} ${cy} L${x0} ${y0} A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x1} ${y1} Z`}
            fill={s.c}
            opacity={0.92}
          />
        );
      })}
      <circle cx={cx} cy={cy} r="9" fill="#fff" />
    </svg>
  );
}

/* The three Figma step cards (reused in hero mockup + features) */
export function StepCards({ compact = false }: { compact?: boolean }) {
  const pad = compact ? "p-4" : "p-7";
  const title = compact ? "text-base" : "text-xl";
  const sub = compact ? "text-[11px]" : "text-sm";
  const icon = compact ? "h-9 w-9" : "h-14 w-14";
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className={`rounded-[20px] ${pad} text-center text-white shadow-[0_10px_30px_rgba(122,184,0,0.25)]`} style={{ background: GREEN }}>
        <img src="/figma/cloud-upload.svg" alt="" className={`mx-auto ${icon}`} />
        <p className={`mt-3 ${title}`}>Load the interview</p>
        <p className={`mt-1.5 ${sub} text-white/85`}>Quick report on soft skills from audio or video</p>
      </div>
      <div className={`rounded-[20px] border border-[#11AFCC]/30 bg-gradient-to-br from-white via-[#eafaff] to-white ${pad} text-center shadow-[0_12px_40px_rgba(17,175,204,0.2)]`}>
        <img src="/figma/ai-orb.png" alt="" className={`mx-auto ${compact ? "h-12 w-12" : "h-16 w-16"} object-contain`} />
        <p className={`mt-2 ${title}`} style={{ color: TEAL }}>AI Assistant</p>
        <p className={`mt-1.5 ${sub}`} style={{ color: INK }}>Will help you understand at any stage of work</p>
      </div>
      <div className={`rounded-[20px] ${pad} text-center text-white shadow-[0_10px_30px_rgba(17,175,204,0.25)]`} style={{ background: TEAL }}>
        <img src="/figma/people.svg" alt="" className={`mx-auto ${icon}`} />
        <p className={`mt-3 ${title}`}>Compare candidates</p>
        <p className={`mt-1.5 ${sub} text-white/85`}>Choose the best candidate</p>
      </div>
    </div>
  );
}

const VACANCIES = [
  "UI Engineer",
  "Web Interface Developer",
  "Client-Side Developer",
  "Creative Visual Designer",
  "Artistic Development Co…",
  "Visual Experience Archit…",
];

/* Full "Desktop 53" composition — fixed design width, scale to fit */
export default function DashboardMockup() {
  return (
    <div className="w-[1180px] overflow-hidden rounded-[28px] border border-[#e6ece4] bg-[#F4F7F6] shadow-[0_40px_100px_rgba(24,56,51,0.18)]">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="flex w-[230px] shrink-0 flex-col gap-4 bg-white px-4 py-5">
          <img src="/figma/logo.svg" alt="TalentMind" className="h-7 w-auto" />
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 rounded-xl bg-[#11AFCC]/10 px-3 py-2 text-sm font-medium" style={{ color: TEAL }}>
              <img src="/figma/ai-orb.png" alt="" className="h-5 w-5 object-contain" /> AI Assistant
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#183833]/70">
              <span className="grid h-5 w-5 place-items-center rounded bg-[#183833]/10 text-[10px]">⌂</span> Главная
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between px-3 text-sm font-medium" style={{ color: INK }}>
              <span className="flex items-center gap-2">🗂 Вакансии</span>
            </div>
            <button className="mt-2 flex items-center gap-1.5 px-3 text-xs font-medium" style={{ color: GREEN }}>
              <Plus className="h-3.5 w-3.5" /> Добавить вакансию
            </button>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#ededed] px-3 py-1.5 text-xs text-gray-400">
              <Search className="h-3.5 w-3.5" /> Поиск
            </div>
            <ul className="mt-2 space-y-0.5">
              {VACANCIES.map((v) => (
                <li key={v} className="truncate rounded-lg px-3 py-1.5 text-[13px] text-[#183833]/75 hover:bg-[#F4F7F6]">
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex items-center gap-2 px-3 py-2 text-sm text-[#183833]/70">
            <Settings className="h-4 w-4" /> Настройки
          </div>
          <div className="flex items-center gap-3 border-t border-[#ededed] px-2 pt-3">
            <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: TEAL }}>AK</span>
            <div>
              <p className="text-sm font-medium" style={{ color: INK }}>Alexander Kozlov</p>
              <p className="text-xs" style={{ color: TEAL }}>Recruiter</p>
            </div>
          </div>
        </aside>

        {/* CHAT PANEL */}
        <section className="w-[330px] shrink-0 border-x border-[#e6ece4] bg-white">
          <div className="m-3 rounded-2xl border border-[#11AFCC]/30 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-base font-semibold" style={{ color: INK }}>
                <img src="/figma/ai-orb.png" alt="" className="h-6 w-6 object-contain" /> AI Assistant
              </span>
              <span className="flex items-center gap-2 text-[#183833]/40">
                <Maximize2 className="h-4 w-4" /> <X className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#183833]/40" />
              <div className="flex-1 rounded-full border border-[#ededed] py-1.5 text-center text-xs font-medium" style={{ color: INK }}>
                HR Insights Chat
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <span className="rounded-full border border-[#ededed] px-3 py-1 text-[11px] text-[#183833]/70">
                What&apos;s my current location?
              </span>
            </div>
            {/* waveform */}
            <div className="mt-3 flex items-center gap-2 rounded-full bg-[#F4F7F6] px-3 py-2">
              <span className="text-[#183833]/50">❚❚</span>
              <div className="flex h-4 flex-1 items-center gap-[2px]">
                {Array.from({ length: 34 }).map((_, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-[#183833]/30" style={{ height: `${(20 + ((i * 53) % 80)).toFixed(0)}%` }} />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-[#183833]/65">
              Ready to analyze your soft skills? Just upload your video or audio
              interview: 1. Launch the interface. 2. Navigate to “Media Upload”. 3.
              Hit “Choose File” and pick your interview. 4. Click “Upload”. 5. The
              bot will start analyzing
            </p>

            {/* rose chart bubble */}
            <div className="mt-3 grid place-items-center rounded-2xl bg-[#F4F7F6] py-3">
              <Rose size={130} />
            </div>
            <p className="mt-2 text-[11px] text-[#183833]/60">Could you help me figure out where I am?</p>

            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#ededed] px-3 py-2">
              <span className="text-xs text-gray-400">Ask your question</span>
              <span className="ml-auto flex items-center gap-2 text-[#183833]/50">
                <Mic className="h-4 w-4" /> <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="flex-1 px-7 py-6">
          <h3 className="text-2xl" style={{ color: INK }}>
            Welcome to <span className="font-bold">TALENT MIND</span>
          </h3>
          <div className="mt-5">
            <StepCards />
          </div>
          <p className="mt-7 text-xl" style={{ color: INK }}>New Reports</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Candidate name="David Parker" note="Strong T-shape, good communication" noteColor={GREEN} tag="interview" />
            <Candidate name="Michaela Thompson" note="Offer sent" noteColor={GREEN} tag="offer" />
            <Candidate name="Samantha Carter" note="Salary negotiation" noteColor={GREEN} tag="offer" />
            <Candidate name="Alex Johnson" note="Exit in 2 weeks" noteColor={GREEN} tag="hired" />
            <Candidate name="Natalia Lebedeva" note="Strong T-shape, good communication" noteColor={RED} tag="reject" />
            <Candidate name="Roman Kim" note="" noteColor={TEAL} tag="interview" />
          </div>
        </section>
      </div>
    </div>
  );
}
