"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ---------- Scroll reveal ---------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 50,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Infinitely levitating glass pill ---------- */

export function FloatPill({
  children,
  className = "",
  delay = 0,
  amplitude = 12,
  duration = 4,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -amplitude, 0] }
      }
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay, type: "spring", bounce: 0.4 },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero headline: line-by-line mask reveal ---------- */

const lineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const lineChild: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { type: "spring", bounce: 0.4, duration: 1.1 },
  },
};

export function MaskedHeadline({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <h1 className={className}>
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </h1>
    );
  }
  return (
    <motion.h1
      className={className}
      variants={lineContainer}
      initial="hidden"
      animate="show"
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span variants={lineChild} className="block">
            {l}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/* ---------- Magnetic hover wrapper ---------- */

export function MagneticCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Breathing aurora background (animated blurred blobs) ---------- */

const BLOBS = [
  { c: "bg-lime/25", s: "h-[34rem] w-[34rem]", pos: "-left-40 -top-32", a: { x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.18, 1] }, d: 16 },
  { c: "bg-[#bfe0d4]/50", s: "h-[30rem] w-[30rem]", pos: "right-[-12rem] top-10", a: { x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.22, 1] }, d: 20 },
  { c: "bg-[#cfe8a8]/50", s: "h-[26rem] w-[26rem]", pos: "bottom-[-10rem] left-1/3", a: { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }, d: 24 },
];

export function Aurora({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[150px] ${b.c} ${b.s} ${b.pos}`}
          animate={reduce ? undefined : b.a}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- Headline: word-by-word mask reveal with spring ---------- */

const wordsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const wordChild: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { type: "spring", bounce: 0.35, duration: 1 } },
};

export function MaskedWords({
  segments,
  className = "",
}: {
  segments: { text: string; className?: string }[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = segments.flatMap((seg) =>
    seg.text.split(" ").map((w) => ({ w, className: seg.className }))
  );

  if (reduce) {
    return (
      <h1 className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}{" "}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      variants={wordsContainer}
      initial="hidden"
      animate="show"
    >
      {words.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span variants={wordChild} className={`inline-block ${item.className ?? ""}`}>
            {item.w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
