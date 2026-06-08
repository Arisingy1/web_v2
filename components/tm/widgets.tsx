"use client";

import { Pause, TrendingUp, TrendingDown, Mic } from "lucide-react";
import { GREEN, INK, RED, TEAL, Tag, Badge } from "./ui";

/* deterministic bar arrays (SSR-safe, no Math at render) */
const WAVE = [34, 52, 70, 88, 96, 72, 50, 30, 58, 80, 94, 66, 44, 30, 52, 74, 90, 62, 40, 56, 36, 26, 48, 68];
const ACCENT_IDX = new Set([3, 11, 16]); // teal-highlighted bars

function Bars({ heights, base = GREEN }: { heights: number[]; base?: string }) {
  return (
    <div className="flex h-16 items-center gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[4px] rounded-full"
          style={{
            height: `${h}%`,
            background: ACCENT_IDX.has(i) ? "#7CC6F2" : base,
            opacity: ACCENT_IDX.has(i) ? 1 : 0.55 + (h / 100) * 0.45,
          }}
        />
      ))}
    </div>
  );
}

function MetricPill({
  label,
  val,
  up,
  className = "",
}: {
  label: string;
  val: string;
  up: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-[0_14px_30px_rgba(24,56,51,0.12)] ${className}`}>
      <span className="text-sm font-medium" style={{ color: INK }}>{label}</span>
      <span className="ml-auto flex items-center gap-1 text-sm font-semibold" style={{ color: up ? GREEN : RED }}>
        {val} {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      </span>
    </div>
  );
}

/* 1 · Soft-skills meter (Leadership / Empathy / Problem Solving) */
export function SoftSkillsWidget() {
  return (
    <div className="relative h-[260px] w-[380px]">
      <div className="absolute left-1/2 top-1/2 flex h-[150px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-[36px] bg-white px-5 shadow-[0_24px_60px_rgba(24,56,51,0.16)]">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ background: GREEN }}>
          <Pause className="h-4 w-4 fill-white" />
        </span>
        <Bars heights={WAVE} />
      </div>
      <MetricPill label="Leadership" val="88%" up className="absolute left-0 top-0 w-[170px]" />
      <MetricPill label="Empathy" val="75%" up className="absolute right-0 top-7 w-[160px]" />
      <MetricPill label="Problem Solving" val="68%" up={false} className="absolute bottom-0 left-1/2 w-[210px] -translate-x-1/2" />
    </div>
  );
}

/* 2 · Video-interview card (REC + PIP + mic waveform) */
export function VideoInterviewWidget() {
  return (
    <div className="w-[360px] rounded-2xl bg-white p-2 shadow-[0_24px_60px_rgba(24,56,51,0.18)]">
      <div className="relative h-[240px] overflow-hidden rounded-xl bg-gradient-to-br from-[#c8d3e2] via-[#aebccf] to-[#8fa3bb]">
        {/* candidate silhouette placeholder */}
        <div className="absolute bottom-0 left-1/2 h-[72%] w-[52%] -translate-x-1/2 rounded-t-[80px] bg-[#7588a1]" />
        <div className="absolute bottom-[52%] left-1/2 h-16 w-16 -translate-x-1/2 rounded-full" style={{ background: "#8295ad" }} />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-red-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> REC
        </span>
        {/* PIP */}
        <div className="absolute right-3 top-3 h-16 w-24 overflow-hidden rounded-lg border-2 border-white bg-gradient-to-br from-[#e6cdbb] to-[#c2a08a]">
          <div className="absolute bottom-0 left-1/2 h-[70%] w-[50%] -translate-x-1/2 rounded-t-full bg-[#b89177]" />
        </div>
        {/* mic + waveform pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-lg">
          <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: GREEN }}>
            <Mic className="h-3 w-3" />
          </span>
          <div className="flex h-5 items-center gap-[2px]">
            {WAVE.slice(0, 16).map((h, i) => (
              <span key={i} className="w-[2px] rounded-full" style={{ height: `${h}%`, background: GREEN, opacity: 0.5 + (h / 100) * 0.5 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3 · Candidate stack (overlapping cards, central highlighted) */
export function CandidateStack() {
  return (
    <div className="relative h-[240px] w-[380px]">
      {/* side peeking cards */}
      <div className="absolute left-0 top-10 w-[170px] -rotate-6 rounded-2xl bg-white p-3 opacity-90 shadow-[0_14px_30px_rgba(24,56,51,0.1)]">
        <div className="h-16 rounded-lg bg-gradient-to-br from-[#cfe0c2] to-[#a9c79a]" />
        <p className="mt-2 truncate text-sm font-semibold" style={{ color: INK }}>Michaela T</p>
        <p className="truncate text-[11px]" style={{ color: TEAL }}>Lead UI Eng</p>
        <div className="mt-2"><Tag kind="interview" /></div>
      </div>
      <div className="absolute right-0 top-10 w-[170px] rotate-6 rounded-2xl bg-white p-3 opacity-90 shadow-[0_14px_30px_rgba(24,56,51,0.1)]">
        <div className="h-16 rounded-lg bg-gradient-to-br from-[#cfe6ef] to-[#9bcfe0]" />
        <p className="mt-2 truncate text-sm font-semibold" style={{ color: INK }}>Samantha C</p>
        <p className="truncate text-[11px]" style={{ color: TEAL }}>Product Des</p>
        <div className="mt-2 flex items-center gap-2"><Tag kind="offer" /><Badge value="79%" /></div>
      </div>
      {/* central highlighted */}
      <div className="absolute left-1/2 top-0 w-[210px] -translate-x-1/2 rounded-2xl bg-white p-3 shadow-[0_28px_60px_rgba(24,56,51,0.2)]">
        <div className="h-28 rounded-xl bg-gradient-to-br from-[#d8c5b4] to-[#b0917b]" />
        <p className="mt-3 text-base font-semibold" style={{ color: INK }}>David Parker</p>
        <p className="text-xs" style={{ color: TEAL }}>Senior Frontend Developer</p>
        <div className="mt-3 flex items-center gap-2"><Tag kind="offer" /><Badge /></div>
      </div>
    </div>
  );
}
