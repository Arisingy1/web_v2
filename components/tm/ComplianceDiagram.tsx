"use client";

import { useEffect, useState } from "react";
import { GREEN, INK } from "./ui";

/* ============================================================
   «Диаграмма соответствия» — живой превью-экран: роза-диаграмма
   навыков кандидата против требований профиля.
   ============================================================ */
const RADAR: { l: string; v: number; req: number }[] = [
  { l: "Управление", v: 35, req: 86 }, { l: "Лидерство", v: 90, req: 86 }, { l: "Коммуникация", v: 40, req: 80 },
  { l: "Планирование", v: 30, req: 80 }, { l: "Адаптивность", v: 72, req: 72 }, { l: "Стрессоустойчивость", v: 50, req: 84 },
  { l: "Командная работа", v: 18, req: 80 }, { l: "Эмпатия", v: 25, req: 85 }, { l: "Решение проблем", v: 62, req: 86 },
  { l: "Критическое мышление", v: 62, req: 80 },
];

export function ComplianceDiagram() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#e9efe6] bg-white shadow-[0_28px_60px_rgba(24,56,51,0.16)]">
      <div className="border-b border-[#eef0ee] px-5 py-3.5 text-center">
        <p className="text-base font-bold" style={{ color: INK }}>Диаграмма соответствия</p>
        <p className="mt-0.5 text-[11px] text-[#183833]/55">График показывает зоны отставания кандидата от требований профиля</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-start p-4">
        <RoseChart />
      </div>
    </div>
  );
}

function RoseChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const N = RADAR.length, cx = 280, cy = 220, R = 140, seg = 360 / N, pad = 1.6, labelR = R + 18;
  const lvl = (v: number) => (v >= 60 ? GREEN : v >= 40 ? "#bcdd93" : "#f2a0a0");
  const rad = (d: number) => (d * Math.PI) / 180;
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  return (
    <div className="flex w-full flex-col items-center">
      <svg viewBox="0 0 560 410" className="w-full max-w-[500px]" style={{ opacity: mounted ? 1 : 0, transition: "opacity .4s" }}>
        {RADAR.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {[0.25, 0.5, 0.75, 1].map((f) => RADAR.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {RADAR.map((d, i) => <path key={`req${i}`} d={sector((R * d.req) / 100, i)} fill="#bcd9ec" stroke="#ffffff" strokeWidth="1.5" />)}
        {RADAR.map((d, i) => <path key={`v${i}`} d={sector((R * d.v) / 100, i)} fill={lvl(d.v)} style={{ transformOrigin: `${cx}px ${cy}px`, animation: mounted ? `roseG .7s ease-out ${0.04 * i + 0.1}s both` : "none" }} />)}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.66;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="13" fontWeight="700" fill="#2b4a44" textAnchor="middle" dominantBaseline="middle">{d.v}%</text>;
        })}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const anchor = ca > 0.15 ? "start" : ca < -0.15 ? "end" : "middle";
          return <text key={`l${i}`} x={(cx + labelR * ca).toFixed(1)} y={(cy + labelR * Math.sin(a)).toFixed(1)} fontSize="12.5" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">{d.l}</text>;
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1.5 text-[11px] text-[#183833]/70">
        <Lg c="#bcd9ec" t="Требования профиля" /><Lg c="#f2a0a0" t="Низкий уровень навыка" /><Lg c="#bcdd93" t="Средний уровень навыка" /><Lg c={GREEN} t="Высокий уровень навыка" />
      </div>
    </div>
  );
}
function Lg({ c, t }: { c: string; t: string }) { return <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 rounded-sm border border-black/5" style={{ background: c }} /> {t}</span>; }
