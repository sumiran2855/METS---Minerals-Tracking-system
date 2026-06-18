"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  FileText,
  BarChart3,
  MapPin,
  ClipboardList,
  FlaskConical,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Lock,
  Clock,
  Zap,
  TrendingUp,
  Building2,
  UserCheck,
  Globe,
  Award,
  ChevronRight,
  Shield,
  Users,
  Database,
  Bell,
  Pickaxe,
  Search,
  LogIn,
} from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1587919968590-fbc98cea6c9a?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719411606465-5143b163b608?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600363503477-a8d1d6d57dfc?q=80&w=1122&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1662986817133-50e1e633d965?q=80&w=1216&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1709489662983-3674d790b224?q=80&w=1170&auto=format&fit=crop",
];

const MARQUEE_TEXT =
  "  ·  Official Government of all Country Portal — Authorised Users Only  ·  Ministry of Mines and Minerals Development  ·  Mineral Exploration Tracking System (METS)  ·  Secure & Monitored Access  ·  MMMD/GRZ/IRM/IT/200/2026  ";

const STATS = [
  { label: "Active Licences", value: "147", icon: FileText, color: "#f5a623" },
  { label: "Registered Companies", value: "93", icon: Building2, color: "#60a5fa" },
  { label: "Provinces Covered", value: "10", icon: MapPin, color: "#e2e8f0" },
  { label: "Minerals Tracked", value: "28+", icon: Pickaxe, color: "#f59e0b" },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Licence Management (ELT)",
    desc: "Full lifecycle management of exploration licences — from initial application and approval through renewals, transfers, and cancellations, all in one place.",
    accent: "#1a3a5c",
    tag: "Core Feature",
  },
  {
    icon: BarChart3,
    title: "Compliance Monitoring",
    desc: "Real-time regulatory compliance dashboards. Track work programme obligations, environmental conditions, and reporting deadlines with automated alerts.",
    accent: "#f5a623",
    tag: "Oversight",
  },
  {
    icon: MapPin,
    title: "Geospatial Mapping",
    desc: "Interactive maps of all Country's mineral licence blocks. Visualise exploration boundaries, overlap checks, and spatial distribution across all ten provinces.",
    accent: "#0ea5e9",
    tag: "Spatial",
  },
  {
    icon: ClipboardList,
    title: "Work Programmes",
    desc: "Create, submit, and review annual work programmes. Automated comparison of planned versus actual expenditure with deviation flagging.",
    accent: "#8b5cf6",
    tag: "Planning",
  },
  {
    icon: FlaskConical,
    title: "Geological Data Repository",
    desc: "Centralised storage for drill-hole data, assay results, geological maps, and mineralogical reports submitted by licence holders.",
    accent: "#6366f1",
    tag: "Data",
  },
  {
    icon: Leaf,
    title: "Environmental Compliance",
    desc: "Monitor environmental impact assessment conditions, site rehabilitation progress, and inspector field-visit reports tied to each licence.",
    accent: "#10b981",
    tag: "Environmental",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Register & Get Verified",
    desc: "Create your company account and submit the required KYC documentation for Ministry verification.",
    icon: UserCheck,
    color: "#93c5fd",
  },
  {
    num: "02",
    title: "Submit Your Application",
    desc: "Fill in the online licence application form, specify target mineral and blocks, and attach supporting technical documents.",
    icon: FileText,
    color: "#f5a623",
  },
  {
    num: "03",
    title: "Track Progress",
    desc: "Monitor application status in real time. Receive automated notifications at every review milestone — from technical evaluation to approval.",
    icon: Bell,
    color: "#3b82f6",
  },
  {
    num: "04",
    title: "Manage & Report",
    desc: "Once licenced, submit work programme reports, geological data, and environmental updates directly through your dashboard.",
    icon: BarChart3,
    color: "#8b5cf6",
  },
];

const ROLES = [
  {
    icon: Shield,
    title: "MMMD Executives",
    desc: "Strategic oversight dashboards, cross-province analytics, and high-level compliance summaries.",
    badge: "Government",
    color: "#1a3a5c",
  },
  {
    icon: Building2,
    title: "Licence Applicants",
    desc: "Apply for new licences, track application status, manage renewals, and submit statutory reports.",
    badge: "Industry",
    color: "#f5a623",
  },
  {
    icon: Search,
    title: "Environmental Inspectors",
    desc: "Conduct field inspections, log compliance findings, and flag licence conditions that require attention.",
    badge: "Regulatory",
    color: "#0ea5e9",
  },
  {
    icon: Database,
    title: "GSD Analysts",
    desc: "Access and analyse geological datasets, manage spatial block data, and validate submitted technical reports.",
    badge: "Technical",
    color: "#6366f1",
  },
  {
    icon: Globe,
    title: "General Public",
    desc: "Browse publicly available mineral exploration licence information and spatial block maps for all Country.",
    badge: "Public",
    color: "#64748b",
  },
];

const BENEFITS = [
  {
    icon: Clock,
    title: "Save Time",
    desc: "Reduce licence processing from weeks to days with automated workflows and digital document management.",
    color: "#f5a623",
  },
  {
    icon: Lock,
    title: "Secure & Monitored",
    desc: "All access is encrypted, role-based, and logged in compliance with GRZ ICT Security Policy.",
    color: "#1a3a5c",
  },
  {
    icon: Zap,
    title: "Real-Time Insights",
    desc: "Live dashboards and instant notifications keep every stakeholder informed at every step.",
    color: "#0ea5e9",
  },
  {
    icon: TrendingUp,
    title: "Improve Transparency",
    desc: "Digital audit trails for every decision support accountability and reduce administrative disputes.",
    color: "#8b5cf6",
  },
  {
    icon: Globe,
    title: "Nationwide Coverage",
    desc: "Unified platform covering all ten provinces, eliminating fragmented paper-based processes.",
    color: "#6366f1",
  },
  {
    icon: Award,
    title: "Regulatory Confidence",
    desc: "Automated compliance checks and reminders help companies stay ahead of reporting obligations.",
    color: "#f5a623",
  },
];

// ── Intersection-observer hook for reveal animations ────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [currentBg, setCurrentBg] = useState(0);

  const statsReveal = useReveal();
  const featuresReveal = useReveal();
  const stepsReveal = useReveal();
  const rolesReveal = useReveal();
  const benefitsReveal = useReveal();
  const ctaReveal = useReveal();

  // Background image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BG_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Government Marquee Banner ─────────────────────────────────────── */}
      <div className="hidden sm:block bg-[#1a3a5c] text-white text-xs py-1.5 overflow-hidden border-b border-white/10">
        <div className="animate-marquee whitespace-nowrap">
          {MARQUEE_TEXT}{MARQUEE_TEXT}
        </div>
      </div>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="bg-[#1a3a5c] border-b-4 border-[#f5a623] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 border-2 border-[#f5a623]">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a3a5c]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[#f5a623] text-[10px] sm:text-xs font-medium tracking-widest uppercase leading-none">
              All Country
            </p>
            <h1 className="text-white text-sm sm:text-base font-bold leading-tight">
              Ministry of Mines and Minerals Development
            </h1>
            <p className="text-slate-300 text-[10px] tracking-wide hidden sm:block leading-none mt-0.5">
              Mineral Exploration Tracking System (METS)
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Badge className="hidden md:flex bg-[#f5a623]/20 text-[#f5d08b] border border-[#f5a623]/40 font-medium hover:bg-[#f5a623]/20">
              MMMD/GRZ/IRM/IT/200/2026
            </Badge>
            <Link href="/login">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1a3a5c] bg-[#f5a623] hover:bg-[#f0a020] px-3 py-1.5 rounded-lg transition-colors">
                <LogIn size={13} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Prototype Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5">
        <p className="text-center text-xs sm:text-sm text-amber-900 font-medium">
          ⚠️ Disclaimer: This website is a prototype/demo version developed for review and evaluation purposes only.
        </p>
      </div>

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background carousel */}
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-slide"
            style={{
              backgroundImage: `linear-gradient(160deg,rgba(15,23,42,0.78) 0%,rgba(26,58,92,0.72) 60%,rgba(15,23,42,0.60) 100%), url('${src}')`,
              opacity: i === currentBg ? 1 : 0,
            }}
          />
        ))}

        {/* Radial glow overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(245,166,35,0.22),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(45,138,78,0.14),transparent_40%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center">

          {/* System badge */}
          <div className="animate-fadein-up mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wide">
              Live Platform · Secure Government System
            </span>
          </div>

          {/* Headline */}
          <h2
            className="animate-fadein-up text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            Demo Country&apos;s Premier
            <span className="block text-[#f5a623] mt-1">Mineral Exploration</span>
            Management Platform
          </h2>

          {/* Sub-headline */}
          <p
            className="animate-fadein-up text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mt-5"
            style={{ animationDelay: "0.22s" }}
          >
            METS brings the Ministry of Mines and Minerals Development, exploration companies, environmental
            inspectors, and the public together on a single secure digital platform — streamlining
                licence management and driving transparent governance of All Country&apos;s mineral sector.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-fadein-up flex flex-col sm:flex-row gap-3 mt-8"
            style={{ animationDelay: "0.35s" }}
          >
            <Link href="/login">
              <button className="btn-shimmer group flex items-center justify-center gap-2.5 bg-[#f5a623] hover:bg-[#f0a020] text-[#1a3a5c] font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-[#f5a623]/30 transition-all hover:scale-[1.03] hover:shadow-[#f5a623]/50">
                Get Started
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/login">
              <button className="btn-shimmer flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-xl border border-white/25 backdrop-blur-sm transition-all hover:scale-[1.02]">
                <LogIn size={15} />
                Sign In to Your Account
              </button>
            </Link>
          </div>

          {/* Trust bar */}
          <div
            className="animate-fadein-up mt-10 flex flex-wrap justify-center gap-4 sm:gap-6"
            style={{ animationDelay: "0.48s" }}
          >
            {[
              { icon: ShieldCheck, text: "GRZ Certified System" },
              { icon: Lock, text: "End-to-End Encrypted" },
              { icon: Globe, text: "10 Provinces Covered" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-white/60 text-xs">
                <Icon size={13} className="text-[#f5a623]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 animate-ob-bounce">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronRight size={14} className="rotate-90" />
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section ref={statsReveal.ref} className="bg-[#1a3a5c] py-8 border-b-4 border-[#f5a623]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map(({ label, value, icon: Icon, color }, i) => (
              <div
                key={label}
                className="flex flex-col items-center text-center ob-reveal"
                style={{ animationDelay: `${i * 0.1}s`, animationPlayState: statsReveal.visible ? "running" : "paused" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${color}22`, border: `1.5px solid ${color}55` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">{value}</p>
                <p className="text-slate-400 text-xs mt-1 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <div>
              <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                About METS
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] leading-tight mb-5">
                Modernising All Country&apos;s<br />Mineral Governance
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                The <strong className="text-[#1a3a5c]">Mineral Exploration Tracking System (METS)</strong> is an
                official digital platform developed by the Ministry of Mines and Minerals Development under the
                Demo Country. It replaces fragmented paper-based processes with a unified, secure, and
                transparent digital workflow.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                METS enables end-to-end management of exploration licences, compliance monitoring, geological data
                management, and environmental oversight — ensuring All Country’s mineral sector operates with
                the highest standards of governance and accountability.
              </p>
              <div className="space-y-2.5">
                {[
                  "Aligned with the Mines and Minerals Development Act",
                  "Integrated with GRZ ICT Security Framework",
                  "Endorsed by the Ministry of Mines and Minerals Development",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-sky-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — METS dashboard preview card */}
            <div className="relative flex justify-center">
              {/* Decorative blobs */}
              <div className="absolute -bottom-6 -right-6 w-56 h-56 rounded-3xl bg-[#f5a623]/8 border border-[#f5a623]/12 pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-44 h-44 rounded-3xl bg-slate-100 border border-slate-200/60 pointer-events-none" />

              {/* Card */}
              <div className="relative z-10 bg-[#1a3a5c] rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm">

                {/* Card header */}
                <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#f5a623] flex items-center justify-center shadow-lg flex-shrink-0">
                        <ShieldCheck size={22} className="text-[#1a3a5c]" />
                      </div>
                      <div>
                        <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-widest leading-none">METS Platform</p>
                        <p className="text-white text-sm font-bold leading-snug mt-0.5">Mineral Exploration<br />Tracking System</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-2.5 py-1 flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-[10px] font-semibold">Live</span>
                    </div>
                  </div>
                </div>

                {/* Stats with progress bars */}
                <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
                  <p className="text-[10px] uppercase tracking-widest mb-4 font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>Platform Overview</p>
                  <div className="space-y-4">
                    {[
                      { label: "Active Licences", val: "147", pct: 78, color: "#f5a623" },
                      { label: "Pending Review", val: "23", pct: 24, color: "#60a5fa" },
                      { label: "Compliance Rate", val: "94%", pct: 94, color: "#34d399" },
                    ].map(({ label, val, pct, color }) => (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-slate-300 text-xs">{label}</span>
                          <span className="font-bold text-sm" style={{ color }}>{val}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
                  <p className="text-[10px] uppercase tracking-widest mb-3 font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>Recent Activity</p>
                  <div className="space-y-2">
                    {[
                      { id: "EL/2026/041/CB", action: "Application submitted", time: "2h ago", dot: "#f5a623" },
                      { id: "EL/2026/039/NW", action: "Renewal approved", time: "5h ago", dot: "#34d399" },
                      { id: "EL/2026/038/SO", action: "Compliance overdue", time: "8h ago", dot: "#f87171" },
                    ].map(({ id, action, time, dot }) => (
                      <div key={id} className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[11px] font-semibold truncate">{id}</p>
                          <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{action}</p>
                        </div>
                        <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-6 py-3 flex items-center justify-between">
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>MMMD/GRZ/IRM/IT/200/2026</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
                    <span className="text-[#f5a623] text-[10px] font-semibold">v1.0.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────────────────────── */}
      <section ref={featuresReveal.ref} className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Platform Features
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] leading-tight">
              Everything you need in one platform
            </h3>
            <p className="text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              METS consolidates all aspects of mineral exploration governance into a single, easy-to-use digital system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, accent, tag }, i) => (
              <div
                key={title}
                className="ob-reveal group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animationPlayState: featuresReveal.visible ? "running" : "paused",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}15`, border: `1.5px solid ${accent}30` }}
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: `${accent}12`, color: accent }}
                  >
                    {tag}
                  </span>
                </div>
                <h4 className="text-[#1a3a5c] font-bold text-base mb-2 leading-snug">{title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                <div
                  className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg,${accent},transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section ref={stepsReveal.ref} className="py-16 sm:py-24 bg-[#1a3a5c] relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#f5a623]/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/4 translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              How It Works
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Your journey on METS
            </h3>
            <p className="text-slate-300 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              From registration to active reporting — four simple steps.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop only) — sits behind icon islands */}
            <div className="hidden lg:block absolute top-10 left-[14%] right-[14%] h-px z-0" style={{ background: "rgba(255,255,255,0.12)" }} />

            {STEPS.map(({ num, title, desc, icon: Icon, color }, i) => (
              <div
                key={num}
                className="ob-reveal relative z-10 flex flex-col items-center text-center"
                style={{
                  animationDelay: `${i * 0.12}s`,
                  animationPlayState: stepsReveal.visible ? "running" : "paused",
                }}
              >
                {/* Opaque wrapper masks the connecting line */}
                <div className="relative mb-4" style={{ background: "#1a3a5c", borderRadius: "20px", padding: "6px" }}>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative"
                    style={{ background: `${color}22`, border: `1.5px solid ${color}50` }}
                  >
                    <Icon size={26} style={{ color }} />
                  </div>
                  <span
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: color, color: "#0f172a" }}
                  >
                    {i + 1}
                  </span>
                </div>
                <p className="text-[#f5a623] text-xs font-bold mb-1 tracking-widest">{num}</p>
                <h4 className="text-white font-bold text-base mb-2 leading-snug">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Uses METS ────────────────────────────────────────────────── */}
      <section ref={rolesReveal.ref} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              User Roles
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] leading-tight">
              Built for every stakeholder
            </h3>
            <p className="text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              METS provides tailored workspaces for all participants in All Country&apos;s mineral sector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {ROLES.map(({ icon: Icon, title, desc, badge, color }, i) => (
              <div
                key={title}
                className="ob-reveal bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animationPlayState: rolesReveal.visible ? "running" : "paused",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                  style={{ background: `${color}15`, border: `1.5px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full self-start"
                  style={{ background: `${color}12`, color }}
                >
                  {badge}
                </span>
                <h4 className="text-[#1a3a5c] font-bold text-sm mb-1.5 leading-snug">{title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Section ──────────────────────────────────────────────── */}
      <section ref={benefitsReveal.ref} className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Why METS?
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] leading-tight">
              The advantage of going digital
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                className="ob-reveal flex items-start gap-4"
                style={{
                  animationDelay: `${i * 0.09}s`,
                  animationPlayState: benefitsReveal.visible ? "running" : "paused",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${color}18`, border: `1.5px solid ${color}35` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h4 className="text-[#1a3a5c] font-bold text-sm mb-1 leading-snug">{title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <section ref={ctaReveal.ref} className="py-16 sm:py-24 bg-[#1a3a5c] relative overflow-hidden">
        {/* Background dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #f5a623 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#f5a623]/5 -translate-y-3/4 pointer-events-none" />

        <div
          className="ob-reveal relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
          style={{ animationPlayState: ctaReveal.visible ? "running" : "paused" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 bg-[#f5a623]/15 border border-[#f5a623]/30 rounded-full px-4 py-1.5">
            <Users size={13} className="text-[#f5a623]" />
            <span className="text-[#f5d08b] text-xs font-semibold tracking-wide">Join the Platform</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Ready to streamline<br className="hidden sm:block" />
            <span className="text-[#f5a623]"> mineral governance</span>?
          </h3>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Join METS today and experience transparent, efficient, and accountable mineral sector management
            across All Country.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <button className="btn-shimmer group flex items-center justify-center gap-2.5 bg-[#f5a623] hover:bg-[#f0a020] text-[#1a3a5c] font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-[#f5a623]/25 transition-all hover:scale-[1.03]">
                Get Started Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/login">
              <button className="btn-shimmer flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/18 text-white font-semibold text-base px-8 py-4 rounded-xl border border-white/25 backdrop-blur-sm transition-all hover:scale-[1.02]">
                <LogIn size={16} />
                Sign In
              </button>
            </Link>
          </div>

          <p className="text-white/30 text-xs mt-6">
            Access is restricted to authorised government personnel and registered entities only.
          </p>
        </div>
      </section>

      {/* ── Contact Us ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Contact Us
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c] leading-tight">
              Get in touch
            </h3>
            <p className="text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              For technical support, access requests, or general enquiries about METS, reach out to the
              Ministry of Mines and Minerals Development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
            {[
              {
                icon: "📍",
                title: "Physical Address",
                lines: ["Ministry of Mines and Minerals Development", "All Country", "Lusaka, All Country"],
              },
              {
                icon: "📞",
                title: "Phone & Fax",
                lines: ["+260 211 254 597", "+260 211 254 626", "Mon – Fri, 08:00 – 17:00 CAT"],
              },
              {
                icon: "✉️",
                title: "Email",
                lines: ["info@mmmd.gov.zm", "mets-support@mmmd.gov.zm", "ict@mmmd.gov.zm"],
              },
            ].map(({ icon, title, lines }) => (
              <div
                key={title}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a3a5c]/8 border border-[#1a3a5c]/12 flex items-center justify-center mb-4 text-xl">
                  {icon}
                </div>
                <h4 className="text-[#1a3a5c] font-bold text-sm mb-3">{title}</h4>
                <div className="space-y-1">
                  {lines.map((line) => (
                    <p key={line} className="text-slate-600 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder + quick contact form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Embedded map */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm" style={{ height: "360px" }}>
              <iframe
                title="Ministry of Mines and Minerals Development — Lusaka"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Ministry+of+Mines+and+Minerals+Development,+Independence+Avenue,+Lusaka,+Zambia&output=embed&z=15"
              />
            </div>

            {/* Quick contact form */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="text-[#1a3a5c] font-bold text-base mb-5">Send a Message</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/20 focus:border-[#1a3a5c]/40 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Organisation</label>
                    <input
                      type="text"
                      placeholder="Company / Ministry"
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/20 focus:border-[#1a3a5c]/40 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/20 focus:border-[#1a3a5c]/40 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">Subject</label>
                  <select className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/20 focus:border-[#1a3a5c]/40 transition-all text-slate-600">
                    <option value="">Select a topic…</option>
                    <option>Technical Support</option>
                    <option>Access / Login Request</option>
                    <option>Licence Application Enquiry</option>
                    <option>Compliance Question</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your enquiry…"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/20 focus:border-[#1a3a5c]/40 transition-all resize-none placeholder:text-slate-400"
                  />
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-[#1a3a5c] hover:bg-[#152e4d] text-white font-semibold text-sm py-3 rounded-xl transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f172a] text-slate-400 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center border border-white/15">
                <ShieldCheck size={14} className="text-[#f5a623]" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-none">Ministry of Mines and Minerals Development</p>
                <p className="text-slate-500 text-[10px] mt-0.5">All Country · METS © 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>MMMD/GRZ/IRM/IT/200/2026</span>
              <span className="text-white/10">·</span>
              <span>All rights reserved</span>
              <span className="text-white/10">·</span>
              <span>Secure Government System</span>
            </div>
          </div>
          <div className="mt-6 h-px bg-white/10 rounded-full" />
        </div>
      </footer>
    </div>
  );
}
