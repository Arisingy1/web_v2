"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  ArrowUpRight,
  Moon,
  Check,
  Shirt,
  Square,
  CornerDownRight,
  TrendingUp,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS (matched to Amzigo screenshots)
   ============================================================ */
const C = {
  cream: "#ECE6DE",
  purple: "#6B2FE8", // vivid — H1, buttons
  lilac: "#D8D0FA", // pastel widgets / pills
  lilacSoft: "#E5DFFB",
  footer: "#AEA2F3", // soft purple footer
  ink: "#0C0A14", // near-black dark cards
};

/* ---------- tiny reusable bits ---------- */
function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i < n
              ? "fill-[#6B2FE8] text-[#6B2FE8]"
              : "fill-transparent text-[#6B2FE8]/40"
          }
        />
      ))}
    </span>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    />
  );
}

export default function AmzigoPage() {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  /* ---------- Lenis + GSAP orchestration ---------- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ scroll }: { scroll: number }) =>
      setScrolled(scroll > 80)
    );
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* Sticky bottom CTA entrance */
      gsap.fromTo(
        ctaRef.current,
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1 }
      );

      /* Hero multi-speed parallax */
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "1");
        gsap.to(el, {
          yPercent: -speed * 38,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* Generic fade-up reveals */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      /* Staggered groups (dark cards, pricing, etc.) */
      gsap.utils.toArray<HTMLElement>(".stagger").forEach((group) => {
        const ease = group.dataset.ease || "power3.out";
        gsap.from(group.children, {
          opacity: 0,
          y: 90,
          duration: 0.8,
          ease,
          stagger: parseFloat(group.dataset.stag || "0.18"),
          scrollTrigger: { trigger: group, start: "top 80%" },
        });
      });

      /* PINNED "Happy Sellers" split-reveal */
      if (pinRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "center center",
            end: "+=140%",
            pin: true,
            scrub: 1,
          },
        });
        tl.to(".word-happy", { xPercent: -130, ease: "none" }, 0)
          .to(".word-sellers", { xPercent: 130, ease: "none" }, 0)
          .to(".pin-eyebrow", { opacity: 0, ease: "none" }, 0)
          .fromTo(
            ".tcard",
            { yPercent: 70, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.06, ease: "power2.out" },
            0.15
          );
      }
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={root}
      className="relative w-full overflow-x-clip bg-[#ECE6DE] font-sans text-[#0C0A14] antialiased"
    >
      {/* ============================================================
          NAV — full bar that collapses into a square logo on scroll
          ============================================================ */}
      <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
        {/* full bar */}
        <nav
          className={`flex items-center gap-7 rounded-[1.6rem] border border-white/70 bg-white/80 px-6 py-3 shadow-[0_14px_40px_rgba(108,43,217,0.12)] backdrop-blur-md transition-all duration-500 ${
            scrolled
              ? "pointer-events-none scale-90 opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          <span className="text-xl font-extrabold tracking-[0.18em] text-[#6B2FE8]">
            AMZIGO
          </span>
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
            {["Request A Review", "Keyword Research", "All Features", "Pricing", "Articles"].map(
              (l) => (
                <a key={l} href="#" className="whitespace-nowrap transition-colors hover:text-[#6B2FE8]">
                  {l}
                </a>
              )
            )}
          </div>
          <a
            href="#"
            className="group hidden items-center gap-1 rounded-xl bg-[#D8D0FA] px-4 py-2 text-sm font-medium text-[#6B2FE8] sm:flex"
          >
            Try For Free <Arrow />
          </a>
          <a
            href="#"
            className="group flex items-center gap-1 rounded-xl bg-[#6B2FE8] px-4 py-2 text-sm font-medium text-white"
          >
            Login <Arrow className="text-white" />
          </a>
        </nav>
        {/* collapsed square */}
        <button
          aria-label="Amzigo"
          className={`absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-2xl border border-white/70 bg-white/80 shadow-[0_14px_40px_rgba(108,43,217,0.18)] backdrop-blur-md transition-all duration-500 ${
            scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
          }`}
        >
          <Square className="h-6 w-6 text-[#6B2FE8]" />
        </button>
      </div>

      {/* Moon — far right */}
      <button
        aria-label="Toggle theme"
        className="fixed top-7 right-7 z-50 text-[#0C0A14] transition-transform hover:scale-110"
      >
        <Moon className="h-6 w-6" />
      </button>

      {/* ============================================================
          1 · HERO
          ============================================================ */}
      <section
        ref={heroRef}
        className="relative mx-auto grid min-h-screen max-w-[1340px] grid-cols-1 items-center gap-10 px-6 pt-36 pb-16 lg:grid-cols-[1.05fr_1fr]"
      >
        {/* Left */}
        <div>
          <h1 className="text-[3.4rem] font-medium leading-[0.92] tracking-tight text-[#6B2FE8] sm:text-[5rem] lg:text-[6.2rem] lg:leading-[0.9]">
            Say Hello to Your Amazon Superpower
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-700">
            Meet Amzigo, the essential tool for Amazon Sellers. Start your 30 day
            free trial today with no credit card required.
          </p>
          <a
            href="#"
            className="group mt-9 inline-flex items-center gap-2 rounded-2xl bg-[#6B2FE8] px-7 py-4 text-base font-medium text-white shadow-[0_18px_40px_rgba(108,43,217,0.3)] transition-transform hover:-translate-y-1"
          >
            Start Your 30 Day Free Trial <Arrow className="h-5 w-5 text-white" />
          </a>
        </div>

        {/* Right composition */}
        <div className="relative h-[460px] w-full sm:h-[520px]">
          {/* laptop base */}
          <div
            data-speed="1"
            className="absolute right-0 top-6 h-[380px] w-[640px] max-w-[120%] overflow-hidden rounded-2xl bg-gradient-to-br from-[#cfc6e8] to-[#e9e3f6] shadow-[0_40px_90px_rgba(108,43,217,0.22)]"
          >
            {/* faux dashboard inside */}
            <div className="h-full w-full bg-[#0c0a14] p-4 text-white/80">
              <div className="mb-3 flex gap-4 text-[10px] text-white/40">
                <span>Units Sold</span>
                <span>Orders</span>
                <span>Conversion Rate</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["428", "4,972", "8%"].map((v) => (
                  <div key={v} className="rounded-lg bg-white/5 p-3">
                    <p className="text-lg font-semibold text-white">{v}</p>
                    <div className="mt-1 h-1 w-12 rounded bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-28 items-end gap-1">
                {Array.from({ length: 26 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-[#6B2FE8] to-[#9d7bf5]"
                    style={{ height: `${20 + ((i * 37) % 80)}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Total Units Sold pill */}
          <div
            data-speed="0.5"
            className="absolute left-2 top-0 z-20 flex w-[300px] items-center justify-between rounded-2xl bg-[#D8D0FA] px-5 py-4 shadow-[0_18px_40px_rgba(108,43,217,0.18)]"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-[#0C0A14]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B2FE8]" /> Total
              Units Sold
            </span>
            <span className="flex items-center gap-2 text-base font-semibold text-[#0C0A14]">
              428 <Arrow className="text-[#6B2FE8]" />
            </span>
          </div>

          {/* Sales Performance dark card */}
          <div
            data-speed="1.2"
            className="absolute bottom-2 left-0 z-30 w-[260px] rounded-2xl bg-[#0C0A14] p-5 text-white shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          >
            <p className="text-sm font-medium">Sales Performance</p>
            <svg viewBox="0 0 220 90" className="mt-3 h-24 w-full">
              <polyline
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                points="5,70 45,55 85,58 125,30 165,38 215,20"
              />
              <polyline
                fill="none"
                stroke="#9d7bf5"
                strokeWidth="2.5"
                points="5,80 45,62 85,40 125,48 165,25 215,42"
              />
            </svg>
            <div className="mt-3 flex gap-6">
              <div>
                <p className="text-2xl font-semibold">£4,130</p>
                <p className="text-[11px] text-white/50">Sales Revenue</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">373</p>
                <p className="text-[11px] text-white/50">Total Orders</p>
              </div>
            </div>
          </div>

          {/* Review Growth purple card */}
          <div
            data-speed="0.8"
            className="absolute right-2 top-32 z-30 w-[200px] rounded-2xl bg-[#6B2FE8] p-5 text-white shadow-[0_30px_60px_rgba(108,43,217,0.4)]"
          >
            <div className="flex items-center justify-between text-sm font-medium">
              Review Growth <Arrow className="text-white" />
            </div>
            <p className="mt-2 text-6xl font-semibold leading-none tracking-tighter">
              643
            </p>
            <p className="mt-2 text-sm text-white/70">Last 90 Days</p>
            <p className="mt-6 text-xs text-white/60">
              19% Increase from Last Quarter
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          2 · PURPLE SHOWCASE  ("Created to simplify…")
          ============================================================ */}
      <section className="relative mx-auto max-w-[1400px] px-4 pb-36 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-20 sm:px-14"
          style={{
            background:
              "linear-gradient(135deg,#6E47F2 0%,#7E5CF6 45%,#8E78F7 100%)",
          }}
        >
          <p className="reveal mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> Your Amazon
            Success Starts Here
          </p>
          <h2 className="reveal max-w-5xl text-3xl font-medium leading-snug tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.18]">
            Created to simplify and streamline the complexities of Amazon
            selling, Amzigo is built by Amazon sellers for Amazon sellers,
            helping them grow their business, boost sales and reviews, and create
            lasting success on Amazon.
          </h2>

          <div className="stagger mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Review Centre */}
            <div className="rounded-3xl bg-[#0C0A14] p-6 text-white">
              <h3 className="text-xl font-semibold">Review Centre</h3>
              <div className="mt-4 flex gap-5 border-b border-white/10 pb-2 text-sm">
                <span className="border-b-2 border-white pb-2 font-medium">
                  Product Reviews
                </span>
                <span className="text-white/40">Seller Reviews</span>
              </div>
              <div className="mt-3 grid grid-cols-[auto_1fr_auto] gap-x-3 text-[11px] text-white/40">
                <span>Rating</span>
                <span>Name &amp; Comments</span>
                <span>Date</span>
              </div>
              <ul className="mt-2 space-y-3">
                {[
                  [4, "Woodgate", "So far so good!", "23 Feb"],
                  [5, "Tiago Pinto", "Small and portable", "19 Feb"],
                  [4, "Alison", "Good for the price", "18 Feb"],
                  [5, "Jessica Bell", "Great quality!", "16 Feb"],
                  [5, "Andy", "Excellent value", "11 Feb"],
                  [4, "Ross J", "Works well", "05 Feb"],
                ].map(([r, name, txt, date], i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 border-b border-white/5 pb-3 text-xs last:border-0"
                  >
                    <Stars n={r as number} size={11} />
                    <span className="truncate">
                      <span className="font-medium">{name}</span>{" "}
                      <span className="text-white/50">{txt}</span>
                    </span>
                    <span className="text-white/40">{date}</span>
                    <CornerDownRight className="h-3.5 w-3.5 text-white/30" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Sales Insights */}
            <div className="rounded-3xl bg-[#0C0A14] p-6 text-white">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold">Sales Insights</h3>
                <div className="space-y-1 text-[10px] text-white/50">
                  <p className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-[#9d7bf5]" /> Current
                    Sales
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm border border-dashed border-white/50" />{" "}
                    Projected Sales
                  </p>
                </div>
              </div>
              <div className="relative mt-8 flex h-44 items-end justify-between gap-3">
                {/* February popup */}
                <div className="absolute left-1/2 top-0 z-10 w-28 -translate-x-1/2 rounded-xl border border-white/15 bg-[#1a1726]/90 p-2 text-center backdrop-blur">
                  <p className="text-[11px] text-white/60">February</p>
                  <p className="text-2xl font-semibold">468</p>
                  <p className="text-[9px] text-white/40">Total Sales</p>
                  <p className="mt-0.5 text-[8px] text-[#9d7bf5]">
                    59.7% ↑ from January
                  </p>
                </div>
                {[
                  { h: 42, dash: false, m: "Jan" },
                  { h: 66, dash: false, m: "Feb" },
                  { h: 50, dash: false, m: "Mar" },
                  { h: 60, dash: true, m: "Apr" },
                  { h: 70, dash: true, m: "May" },
                ].map((b, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={
                        b.dash
                          ? "w-full rounded-md border border-dashed border-white/40"
                          : "w-full rounded-md bg-gradient-to-t from-[#6B2FE8] to-[#9d7bf5]"
                      }
                      style={{ height: `${b.h}%` }}
                    />
                    <span className="text-[10px] text-white/40">{b.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <div className="rounded-3xl bg-[#0C0A14] p-6 text-white">
              <h3 className="text-xl font-semibold">Inventory</h3>
              <div className="mt-5 grid grid-cols-[auto_1fr_auto] gap-x-3 text-[11px] text-white/40">
                <span>SKU</span>
                <span>Product</span>
                <span>Stock</span>
              </div>
              <ul className="mt-3 space-y-4">
                {[
                  ["5631", "Women's Running Shorts (S)", "#34D399", "Restock"],
                  ["5632", "Women's Running Shorts (M)", "#F472B6", "09"],
                  ["5633", "Women's Running Shorts (L)", "#FBBF24", "Restock"],
                  ["6467", "Men's Cotton T-Shirt (S)", "#60A5FA", "12"],
                  ["6468", "Men's Cotton T-Shirt (M)", "#A78BFA", "03"],
                  ["6469", "Men's Cotton T-Shirt (L)", "#F87171", "Restock"],
                ].map(([sku, name, color, stock], i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 text-xs"
                  >
                    <span className="text-white/40">{sku}</span>
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                        style={{ background: color as string }}
                      >
                        <Shirt className="h-3.5 w-3.5 text-white/80" />
                      </span>
                      <span className="truncate">{name}</span>
                    </span>
                    {stock === "Restock" ? (
                      <span className="rounded-full bg-[#D8D0FA] px-2.5 py-1 text-[10px] font-semibold text-[#6B2FE8]">
                        Restock
                      </span>
                    ) : (
                      <span className="text-white/60">{stock}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Floating CTA */}
          <div className="absolute -bottom-9 left-1/2 z-20 flex w-[92%] max-w-3xl -translate-x-1/2 items-center justify-between gap-4 rounded-2xl bg-[#0C0A14] px-6 py-4 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
            <p className="text-sm font-medium text-white sm:text-base">
              Start Your 30 Day Free Trial, No Credit Card Required
            </p>
            <a
              href="#"
              className="group flex shrink-0 items-center gap-1 rounded-xl bg-[#D8D0FA] px-5 py-2.5 text-sm font-semibold text-[#6B2FE8]"
            >
              Try For free <Arrow className="text-[#6B2FE8]" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          3 · AUTOPILOT FEATURE
          ============================================================ */}
      <section className="relative mx-auto max-w-[1340px] px-6 py-28">
        <div className="relative h-[520px]">
          {/* center heading */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="reveal text-4xl font-medium tracking-tight text-[#0C0A14] sm:text-6xl">
              Amazon Review Requests
              <br />
              on Autopilot
            </h2>
            <a
              href="#"
              className="group reveal mt-6 inline-flex items-center gap-1.5 text-base font-medium text-[#6B2FE8]"
            >
              Automate Review Requests <Arrow className="text-[#6B2FE8]" />
            </a>
          </div>

          {/* Hello Tom card */}
          <div
            data-speed="0.6"
            className="absolute left-0 top-4 w-[280px] rounded-2xl bg-[#D8D0FA] p-6 shadow-[0_24px_50px_rgba(108,43,217,0.18)]"
          >
            <p className="text-3xl font-medium tracking-tight text-[#0C0A14]">
              Hello Tom!
            </p>
            <p className="group mt-1 flex items-center gap-1 text-sm text-[#6B2FE8]">
              Complete your Review <Arrow className="text-[#6B2FE8]" />
            </p>
            <div className="mt-6">
              <Stars n={4} size={22} />
            </div>
          </div>

          {/* Total Emails Sent */}
          <div
            data-speed="1.1"
            className="absolute left-24 top-44 z-20 flex w-[300px] items-center justify-between rounded-2xl bg-[#0C0A14] px-5 py-4 text-white shadow-xl"
          >
            <span className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9d7bf5]" /> Total
              Emails Sent
            </span>
            <span className="flex items-center gap-2 text-base font-semibold">
              932 <Arrow className="text-[#9d7bf5]" />
            </span>
          </div>

          {/* person portrait + floating product widgets */}
          <div
            data-speed="0.9"
            className="absolute right-0 top-0 h-[300px] w-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#8E78F7] via-[#b6a6f7] to-[#D8D0FA] shadow-[0_30px_60px_rgba(108,43,217,0.2)]"
          >
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-[#D8D0FA] px-3 py-1.5">
              <span className="h-4 w-4 rounded bg-[#6B2FE8]" />
              <Stars n={1} size={12} />
            </div>
            <div className="absolute left-3 top-20 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow">
              <span className="h-4 w-4 rounded bg-[#0C0A14]" />
              <Stars n={4} size={12} />
            </div>
            <div className="absolute bottom-3 left-3 w-32 rounded-xl bg-white p-2 shadow-lg">
              <div className="h-16 w-full rounded-lg bg-gradient-to-br from-[#0C0A14] to-[#3a3550]" />
              <div className="mt-1.5">
                <Stars n={5} size={11} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4 · PRICING
          ============================================================ */}
      <section className="relative mx-auto max-w-[1340px] px-6 py-16">
        <div className="reveal max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#6B2FE8]">
            ● Flexible Pricing Options
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
            Find the perfect plan for your store
          </h2>
        </div>

        <div
          className="stagger mt-14 grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-4"
          data-stag="0.1"
          data-ease="back.out(1.2)"
        >
          {[
            {
              name: "Starter",
              price: "15.99",
              feats: ["1 marketplace", "500 review requests", "Basic analytics", "Email support"],
              hot: false,
            },
            {
              name: "Growth",
              price: "29.99",
              feats: ["3 marketplaces", "Unlimited requests", "Advanced analytics", "Priority support", "Inventory alerts"],
              hot: true,
            },
            {
              name: "Business",
              price: "59.99",
              feats: ["10 marketplaces", "Custom reports", "API access", "Dedicated manager"],
              hot: false,
            },
            {
              name: "Enterprise",
              price: "119.99",
              feats: ["Unlimited stores", "White-glove setup", "SLA guarantee", "SSO & security"],
              hot: false,
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 ${
                p.hot
                  ? "z-10 scale-105 bg-[#6B2FE8] text-white shadow-[0_40px_80px_rgba(108,43,217,0.4)]"
                  : "bg-[#D8D0FA] text-[#0C0A14]"
              }`}
            >
              {p.hot && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0C0A14] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <p className={`text-sm font-medium ${p.hot ? "text-white/70" : "text-[#6B2FE8]"}`}>
                {p.name}
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-5xl font-semibold tracking-tighter">${p.price}</span>
                <span className={`mb-1 text-sm ${p.hot ? "text-white/60" : "text-gray-500"}`}>
                  /mo
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full ${
                        p.hot ? "bg-white/20" : "bg-[#6B2FE8]/15"
                      }`}
                    >
                      <Check className={`h-3 w-3 ${p.hot ? "text-white" : "text-[#6B2FE8]"}`} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`group mt-8 flex w-full items-center justify-center gap-1 rounded-xl py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                  p.hot ? "bg-white text-[#6B2FE8]" : "bg-[#6B2FE8] text-white"
                }`}
              >
                Choose {p.name} <Arrow className={p.hot ? "text-[#6B2FE8]" : "text-white"} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          5 · HAPPY SELLERS — pinned text split + masonry reveal
          ============================================================ */}
      <section ref={pinRef} className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* aurora behind */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-[#b6a6f7] blur-[140px]" />
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#c9bdf9] blur-[150px]" />
        </div>

        <p className="pin-eyebrow absolute top-[26%] left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-[#6B2FE8]/70">
          ● Customer Testimonials
        </p>

        {/* the splitting words */}
        <h2 className="pointer-events-none relative z-20 flex select-none gap-6 text-[14vw] font-semibold leading-none tracking-tighter text-[#6B2FE8] sm:text-[11rem]">
          <span className="word-happy">Happy</span>
          <span className="word-sellers">Sellers</span>
        </h2>

        {/* masonry testimonial cards */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-6xl grid-cols-2 gap-5 px-6 pb-16 md:grid-cols-4">
          {[
            { q: "Amzigo doubled our review volume in the first month.", n: "Sofia Hansen", c: "🇩🇰 Denmark", dark: false, t: "mt-0" },
            { q: "The inventory alerts saved me from three stockouts in Q4.", n: "Daniel Okafor", c: "🇬🇧 UK", dark: true, t: "mt-12" },
            { q: "Clean dashboard, real insights, zero fluff.", n: "Mei Tanaka", c: "🇯🇵 Japan", dark: false, t: "mt-4" },
            { q: "Set it once and the review requests just keep coming.", n: "Lucas Moreau", c: "🇫🇷 France", dark: true, t: "mt-16" },
          ].map((t, i) => (
            <div
              key={i}
              className={`tcard ${t.t} flex flex-col justify-between rounded-3xl p-6 ${
                t.dark ? "bg-[#0C0A14] text-white" : "bg-[#6B2FE8] text-white"
              }`}
            >
              <div>
                <Stars n={5} size={13} />
                <p className="mt-4 text-sm leading-relaxed">“{t.q}”</p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold">{t.n}</p>
                <p className="text-xs text-white/60">{t.c}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          6 · ARTICLES
          ============================================================ */}
      <section className="relative mx-auto max-w-[1340px] px-6 py-24">
        <div className="reveal mb-12 flex items-end justify-between">
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Pro Tips &amp; Articles
          </h2>
          <a href="#" className="group hidden items-center gap-1 text-sm font-medium text-[#6B2FE8] sm:flex">
            View all <Arrow className="text-[#6B2FE8]" />
          </a>
        </div>
        <div className="stagger grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            { from: "from-[#D8D0FA] to-[#b6a6f7]", tag: "Reviews", title: "Why Amazon Reviews Matter More Than Ever in 2026" },
            { from: "from-[#f0c9a8] to-[#D8D0FA]", tag: "Strategy", title: "Prime Day Is Not The Finish Line — It's The Start" },
          ].map((a, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(108,43,217,0.08)] transition-transform duration-300 hover:-translate-y-2"
            >
              <div className={`h-64 bg-gradient-to-br ${a.from}`} />
              <div className="p-8">
                <span className="rounded-full bg-[#D8D0FA] px-3 py-1 text-xs font-medium text-[#6B2FE8]">
                  {a.tag}
                </span>
                <h3 className="mt-4 text-2xl font-medium leading-snug tracking-tight">
                  {a.title}
                </h3>
                <p className="group mt-5 flex items-center gap-1 text-sm font-medium text-[#6B2FE8]">
                  Read article <Arrow className="text-[#6B2FE8]" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          7 · MARQUEE
          ============================================================ */}
      <div className="overflow-hidden border-y border-[#6B2FE8]/15 bg-[#ECE6DE] py-6">
        <div className="flex w-max animate-[amzmarquee_28s_linear_infinite] items-center">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-4 px-8 text-3xl font-semibold tracking-tight text-[#6B2FE8] sm:text-5xl"
                >
                  Start Your 30 Day Free Trial
                  <ArrowUpRight className="h-8 w-8" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          8 · FOOTER with giant wordmark
          ============================================================ */}
      <footer className="relative overflow-hidden bg-[#AEA2F3] pt-20">
        <div className="relative z-10 mx-auto grid max-w-[1340px] grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h3 className="max-w-xs text-2xl font-medium leading-snug tracking-tight text-[#0C0A14]">
              Sign up to receive the latest news and support articles
            </h3>
            <div className="mt-6 flex max-w-sm items-center gap-2 rounded-2xl bg-[#D8D0FA] p-1.5">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 text-sm text-[#0C0A14] placeholder:text-[#6B2FE8]/60 focus:outline-none"
              />
              <button className="group flex shrink-0 items-center gap-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0C0A14]">
                Sign Up Now <Arrow />
              </button>
            </div>
            <p className="mt-3 text-xs text-[#0C0A14]/70">
              By submitting this form, you agree to our{" "}
              <a href="#" className="underline">privacy policy.</a>
            </p>
          </div>

          {[
            { h: "Pages", links: ["Features", "Pricing", "Why Join", "Small Sellers", "Articles", "About"] },
            { h: "Legals", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Amazon Policy", "Data Policy", "Extension Privacy Policy"] },
            { h: "Follow Us", links: ["Instagram", "Facebook", "X (Twitter)", "YouTube"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="flex items-center gap-2 text-sm font-semibold text-[#0C0A14]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> {col.h}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[#0C0A14]/70 transition-colors hover:text-[#0C0A14]">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* giant wordmark */}
        <h2 className="pointer-events-none -mb-[2vw] select-none text-center text-[19vw] font-black uppercase leading-[0.75] tracking-tighter text-[#ECE6DE]">
          AMZIGO
        </h2>
      </footer>

      {/* ============================================================
          STICKY BOTTOM CTA
          ============================================================ */}
      <div
        ref={ctaRef}
        className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#0C0A14] px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      >
        <p className="hidden text-sm font-medium text-white sm:block">
          Start Your 30 Day Free Trial, No Credit Card Required
        </p>
        <a
          href="#"
          className="group flex items-center gap-1 rounded-xl bg-[#D8D0FA] px-4 py-2 text-sm font-semibold text-[#6B2FE8]"
        >
          Try For free <Arrow className="text-[#6B2FE8]" />
        </a>
      </div>
    </div>
  );
}
