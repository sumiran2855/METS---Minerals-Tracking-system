"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart, Bar, ComposedChart, PieChart as RechartsPieChart, Pie, Cell, LabelList, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  BarChart3, TrendingUp, TrendingDown, FileText, Download,
  RefreshCw, Activity, Calendar, Printer, Share2, Search,
  ChevronRight, MapPin, Pickaxe, ArrowUpRight, ArrowDownRight,
  Eye, Shield, Award, Zap, Globe, Clock, CheckCircle2, AlertCircle,
  Layers, Filter, ChevronDown, PieChart,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const licencesByMonth = [
  { month: "Jul",  issued: 12, expired: 3,  suspended: 1 },
  { month: "Aug",  issued: 9,  expired: 2,  suspended: 0 },
  { month: "Sep",  issued: 15, expired: 4,  suspended: 2 },
  { month: "Oct",  issued: 11, expired: 3,  suspended: 1 },
  { month: "Nov",  issued: 18, expired: 5,  suspended: 0 },
  { month: "Dec",  issued: 14, expired: 2,  suspended: 1 },
  { month: "Jan",  issued: 20, expired: 4,  suspended: 2 },
  { month: "Feb",  issued: 16, expired: 3,  suspended: 0 },
  { month: "Mar",  issued: 22, expired: 6,  suspended: 1 },
  { month: "Apr",  issued: 19, expired: 4,  suspended: 2 },
  { month: "May",  issued: 25, expired: 5,  suspended: 1 },
  { month: "Jun",  issued: 17, expired: 3,  suspended: 0 },
];

const applicationTrend = [
  { month: "Jul", submitted: 8,  approved: 5,  rejected: 1 },
  { month: "Aug", submitted: 10, approved: 7,  rejected: 2 },
  { month: "Sep", submitted: 13, approved: 9,  rejected: 1 },
  { month: "Oct", submitted: 9,  approved: 6,  rejected: 3 },
  { month: "Nov", submitted: 15, approved: 11, rejected: 2 },
  { month: "Dec", submitted: 12, approved: 8,  rejected: 1 },
  { month: "Jan", submitted: 18, approved: 13, rejected: 2 },
  { month: "Feb", submitted: 14, approved: 10, rejected: 1 },
  { month: "Mar", submitted: 20, approved: 15, rejected: 3 },
  { month: "Apr", submitted: 17, approved: 12, rejected: 2 },
  { month: "May", submitted: 22, approved: 16, rejected: 2 },
  { month: "Jun", submitted: 9,  approved: 7,  rejected: 1 },
];

const revenueData = [
  { month: "Jul", fees: 142000, penalties: 8400 },
  { month: "Aug", fees: 118000, penalties: 5200 },
  { month: "Sep", fees: 196000, penalties: 11000 },
  { month: "Oct", fees: 154000, penalties: 6800 },
  { month: "Nov", fees: 224000, penalties: 9600 },
  { month: "Dec", fees: 188000, penalties: 7200 },
  { month: "Jan", fees: 256000, penalties: 12400 },
  { month: "Feb", fees: 214000, penalties: 8800 },
  { month: "Mar", fees: 288000, penalties: 15200 },
  { month: "Apr", fees: 244000, penalties: 10400 },
  { month: "May", fees: 312000, penalties: 13600 },
  { month: "Jun", fees: 226000, penalties: 9200 },
];

const provinceCompliance = [
  { province: "Copperbelt",    licences: 42, compliant: 38, rate: 90 },
  { province: "North-Western", licences: 28, compliant: 24, rate: 86 },
  { province: "Southern",      licences: 19, compliant: 15, rate: 79 },
  { province: "Eastern",       licences: 14, compliant: 11, rate: 79 },
  { province: "Luapula",       licences: 11, compliant: 10, rate: 91 },
  { province: "Lusaka",        licences: 8,  compliant: 8,  rate: 100 },
  { province: "Central",       licences: 12, compliant: 9,  rate: 75 },
  { province: "Muchinga",      licences: 7,  compliant: 5,  rate: 71 },
  { province: "Western",       licences: 5,  compliant: 4,  rate: 80 },
  { province: "Northern",      licences: 9,  compliant: 7,  rate: 78 },
];

const provinceColors = [
  "#1a3a5c", "#f5a623", "#198A00", "#0ea5e9", "#7c3aed", "#9333ea", "#fb7185", "#14b8a6", "#f97316", "#0f766e",
];

const mineralBreakdown = [
  { mineral: "Copper",    count: 54, pct: 37, color: "#b45309" },
  { mineral: "Cobalt",    count: 22, pct: 15, color: "#1d4ed8" },
  { mineral: "Gold",      count: 18, pct: 12, color: "#f5a623" },
  { mineral: "Lithium",   count: 14, pct: 10, color: "#7c3aed" },
  { mineral: "Manganese", count: 11, pct: 7,  color: "#0369a1" },
  { mineral: "Emerald",   count: 9,  pct: 6,  color: "#059669" },
  { mineral: "Nickel",    count: 8,  pct: 5,  color: "#9f1239" },
  { mineral: "Others",    count: 11, pct: 8,  color: "#64748b" },
];

const performanceRadar = [
  { subject: "Compliance",   A: 88, fullMark: 100 },
  { subject: "Processing",   A: 74, fullMark: 100 },
  { subject: "Revenue",      A: 92, fullMark: 100 },
  { subject: "Applications", A: 81, fullMark: 100 },
  { subject: "Renewals",     A: 67, fullMark: 100 },
  { subject: "Inspections",  A: 79, fullMark: 100 },
];

const savedReports = [
  { id: "RPT-001", title: "Q2 FY2026 Licence Status Report",          type: "Quarterly", date: "15 Jun 2026", status: "Published", size: "2.4 MB" },
  { id: "RPT-002", title: "Province Compliance Summary — May 2026",   type: "Monthly",   date: "01 Jun 2026", status: "Published", size: "1.1 MB" },
  { id: "RPT-003", title: "Mineral Revenue Report FY2025/26",         type: "Annual",    date: "30 May 2026", status: "Draft",     size: "3.8 MB" },
  { id: "RPT-004", title: "Application Processing Times Analysis",    type: "Ad Hoc",    date: "22 May 2026", status: "Published", size: "0.8 MB" },
  { id: "RPT-005", title: "Geological Data Coverage Report — Q2",     type: "Quarterly", date: "15 May 2026", status: "Review",    size: "5.2 MB" },
  { id: "RPT-006", title: "Copperbelt Province Licences Audit",       type: "Ad Hoc",    date: "10 May 2026", status: "Published", size: "1.6 MB" },
];

const TABS = ["Overview", "Licences", "Applications", "Revenue", "Compliance", "Reports Library"] as const;
type Tab = typeof TABS[number];

const statusStyle: Record<string, string> = {
  Published: "bg-green-50 text-green-700 border-green-200",
  Draft:     "bg-amber-50 text-amber-700 border-amber-200",
  Review:    "bg-blue-50 text-blue-700 border-blue-200",
};

const typeStyle: Record<string, string> = {
  Quarterly: "bg-sky-50 text-sky-700 border-sky-200",
  Monthly:   "bg-purple-50 text-purple-700 border-purple-200",
  Annual:    "bg-slate-100 text-slate-600 border-slate-200",
  "Ad Hoc":  "bg-orange-50 text-orange-700 border-orange-200",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a3a5c] text-white text-xs rounded-xl shadow-xl px-3 py-2 border border-white/10">
      <p className="font-bold mb-1 text-white/70">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}: <span className="font-bold">{typeof p.value === "number" && p.value > 1000 ? `ZMW ${(p.value / 1000).toFixed(0)}k` : p.value}</span></span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [activeTab,   setActiveTab]   = useState<Tab>("Overview");
  const [reportSearch, setReportSearch] = useState("");

  const filteredReports = savedReports.filter(r =>
    r.title.toLowerCase().includes(reportSearch.toLowerCase()) ||
    r.type.toLowerCase().includes(reportSearch.toLowerCase())
  );

  const totalRevenue = revenueData.reduce((s, r) => s + r.fees + r.penalties, 0);
  const totalLicences = provinceCompliance.reduce((s, p) => s + p.licences, 0);
  const avgCompliance = Math.round(provinceCompliance.reduce((s, p) => s + p.rate, 0) / provinceCompliance.length);

  return (
    <div className="p-5 space-y-5 max-w-[1600px] mx-auto bg-slate-50 min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 sm:p-6 text-white"
        style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 55%, #152e4d 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] bg-white translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 right-56 w-48 h-48 rounded-full opacity-10 bg-[#f5a623] translate-y-24" />
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-semibold">Live Data</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold">FY 2025/26</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              Reports &amp; Analytics
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Performance intelligence for{" "}
              <span className="text-white/80 font-medium">Mineral Exploration Tracking System</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="outline" className="text-xs border-white/20 text-white/70 hover:text-white hover:bg-white/10 bg-transparent gap-1.5 h-8">
              <Calendar size={11} />FY 2025/26
              <ChevronDown size={10} />
            </Button>
            <Button size="sm" variant="outline" className="text-xs border-white/20 text-white/70 hover:text-white hover:bg-white/10 bg-transparent gap-1.5 h-8">
              <Download size={11} />Export All
            </Button>
            <Badge className="bg-[#f5a623] text-[#1a3a5c] hover:bg-[#f5a623] text-xs px-3 py-1 font-bold">MMMD</Badge>
          </div>
        </div>

        {/* Headline stats */}
        <div className="relative mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { label: "Active Licences",   value: totalLicences, suffix: "",   icon: FileText,   change: "+14%", up: true  },
            { label: "Avg Compliance",    value: avgCompliance, suffix: "%",  icon: Shield,     change: "+3%",  up: true  },
            { label: "Total Revenue",     value: "ZMW 2.6M",    suffix: "",   icon: TrendingUp, change: "+22%", up: true  },
            { label: "Reports Published", value: savedReports.filter(r => r.status === "Published").length, suffix: "", icon: BarChart3, change: "+2", up: true },
          ].map(({ label, value, suffix, icon: Icon, change, up }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                <Icon size={15} className="text-[#f5a623]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-lg font-bold text-white leading-none">{value}{suffix}</p>
                  <span className={`text-[10px] font-bold ${up ? "text-emerald-400" : "text-red-400"}`}>{change}</span>
                </div>
                <p className="text-[11px] text-white/45 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab Bar ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-max px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              activeTab === tab
                ? "bg-[#1a3a5c] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* OVERVIEW TAB */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "Overview" && (
        <div className="space-y-5">

          {/* Performance Scorecard — 3 column stat cards */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">System Performance Scorecard</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Licence Issuance",    value: "178",  sub: "this FY",       pct: 85, icon: FileText,    color: "#1a3a5c", up: true,  delta: "+14" },
                { label: "Apps Processed",       value: "146",  sub: "this FY",       pct: 73, icon: Layers,      color: "#f5a623", up: true,  delta: "+9"  },
                { label: "Compliance Rate",      value: "82%",  sub: "avg all zones", pct: 82, icon: Shield,      color: "#198A00", up: true,  delta: "+3%" },
                { label: "Avg. Process Days",    value: "18d",  sub: "per application",pct: 60, icon: Clock,      color: "#0ea5e9", up: false, delta: "+2d" },
                { label: "Revenue Collected",    value: "2.6M", sub: "ZMW total",     pct: 92, icon: TrendingUp,  color: "#7c3aed", up: true,  delta: "+22%" },
                { label: "Inspections Done",     value: "64",   sub: "site visits",   pct: 55, icon: Eye,         color: "#f59e0b", up: true,  delta: "+7"  },
              ].map(({ label, value, sub, pct, icon: Icon, color, up, delta }) => (
                <Card key={label} className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, color }}>
                        <Icon size={14} />
                      </div>
                      <div className={`flex items-center gap-0.5 text-[10px] font-bold ${up ? "text-green-600" : "text-red-500"}`}>
                        {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {delta}
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800 leading-none mt-2">{value}</p>
                    <p className="text-[11px] font-semibold text-slate-500 mt-1">{label}</p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                    <div className="mt-2.5 h-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Charts row — Licence trend + Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Licence activity area chart */}
            <Card className="lg:col-span-2 border border-slate-200 bg-white shadow-sm">
              <CardHeader className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Licence Activity — FY 2025/26</h3>
                    <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Issued vs Expired vs Suspended</CardTitle>
                  </div>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-400 gap-1 px-2">
                    <Download size={11} />CSV
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {[{ label: "Issued", color: "#1a3a5c" }, { label: "Expired", color: "#f5a623" }, { label: "Suspended", color: "#ef3340" }].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                      <span className="text-[11px] text-slate-500">{label}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={licencesByMonth} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradIssued" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a3a5c" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradExpired" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f5a623" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="issued"    stroke="#1a3a5c" strokeWidth={2} fill="url(#gradIssued)"  dot={false} />
                    <Area type="monotone" dataKey="expired"   stroke="#f5a623" strokeWidth={2} fill="url(#gradExpired)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Radar — performance */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="px-5 pt-5 pb-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Performance Index</h3>
                <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Operational Radar</CardTitle>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={performanceRadar} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#64748b" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="A" stroke="#1a3a5c" fill="#1a3a5c" fillOpacity={0.18} strokeWidth={2} dot={{ r: 3, fill: "#f5a623", strokeWidth: 0 }} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-2 px-3">
                  {performanceRadar.map(({ subject, A }) => (
                    <div key={subject} className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{subject}</span>
                      <span className={`text-[10px] font-bold ${A >= 80 ? "text-green-600" : A >= 70 ? "text-amber-600" : "text-red-500"}`}>{A}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mineral breakdown — waffle chart */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Licence Distribution by Mineral Type</h3>
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-6 items-start">

                  {/* Legend + stats */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-400 mb-3 font-medium uppercase tracking-[0.12em]">Breakdown</p>
                    <div className="space-y-2.5">
                      {mineralBreakdown.map(({ mineral, count, pct, color }) => (
                        <div key={mineral} className="flex items-center gap-3 group">
                          <div className="w-3 h-3 rounded-[3px] shrink-0" style={{ background: color }} />
                          <span className="text-xs font-semibold text-slate-700 w-24 shrink-0">{mineral}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, background: color }}
                            />
                          </div>
                          <span className="text-[11px] font-bold w-8 text-right shrink-0" style={{ color }}>{pct}%</span>
                          <span className="text-[11px] text-slate-400 w-6 text-right shrink-0">{count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-6">
                      <div>
                        <p className="text-[10px] text-slate-400">Total Licences</p>
                        <p className="text-lg font-black text-slate-800">{mineralBreakdown.reduce((s, m) => s + m.count, 0)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Dominant Mineral</p>
                        <p className="text-sm font-bold" style={{ color: mineralBreakdown[0].color }}>{mineralBreakdown[0].mineral} ({mineralBreakdown[0].pct}%)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* LICENCES TAB */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "Licences" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly licence activity */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="px-5 pt-5 pb-3 ">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Monthly Licence Activity</h3>
                    <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Issuance composition and suspension trend</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[{ label: "Issued", color: "#1a3a5c" }, { label: "Expired", color: "#f5a623" }, { label: "Suspended", color: "#ef3340" }].map(({ label, color }) => (
                      <span key={label} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: color, color }}>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr] items-center">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <ResponsiveContainer width="100%" height={260}>
                      <ComposedChart data={licencesByMonth} margin={{ top: 10, right: 0, left: -14, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="issued" stackId="a" fill="#1a3a5c" radius={[8,8,0,0]} barSize={18}>
                          <LabelList dataKey="issued" position="top" style={{ fill: "#1a3a5c", fontSize: 10, fontWeight: 700 }} />
                        </Bar>
                        <Bar dataKey="expired" stackId="a" fill="#f5a623" radius={[0,0,8,8]} barSize={18}>
                          <LabelList dataKey="expired" position="top" style={{ fill: "#f5a623", fontSize: 10, fontWeight: 700 }} />
                        </Bar>
                        <Line type="monotone" dataKey="suspended" stroke="#ef3340" strokeWidth={3} dot={{ r: 4, fill: "#ef3340" }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Peak issuance month</p>
                      <p className="text-lg font-black text-slate-900">May 2026</p>
                      <p className="text-[11px] text-slate-500">25 licences issued</p>
                    </div>
                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Yearly average</p>
                      <p className="text-lg font-black text-slate-900">16 licences / month</p>
                      <p className="text-[11px] text-slate-500">Based on FY 2025/26 totals</p>
                    </div>
                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Suspension trend</p>
                      <p className="text-lg font-black text-slate-900">Low and stable</p>
                      <p className="text-[11px] text-slate-500">1–2 suspensions per month on average</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Province donut breakdown */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="px-5 pt-5 pb-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Province Breakdown</h3>
                <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Licence share by province</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex justify-center">
                  <div className="relative h-[320px] w-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={provinceCompliance}
                          dataKey="licences"
                          nameKey="province"
                          cx="50%"
                          cy="50%"
                          innerRadius={72}
                          outerRadius={120}
                          paddingAngle={3}
                        >
                          {provinceCompliance.map((entry, index) => (
                            <Cell key={entry.province} fill={provinceColors[index % provinceColors.length]} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Licence share</span>
                      <span className="text-3xl font-black text-slate-900">{provinceCompliance.reduce((sum, item) => sum + item.licences, 0)}</span>
                      <span className="text-[11px] text-slate-500">Total licences</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* APPLICATIONS TAB */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "Applications" && (
        <div className="space-y-5">
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="px-5 pt-5 pb-3">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">FY 2025/26 Monthly Trend</h3>
              <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Applications Submitted, Approved &amp; Rejected</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                {[{ label: "Submitted", color: "#1a3a5c" }, { label: "Approved", color: "#198A00" }, { label: "Rejected", color: "#ef3340" }].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="text-[11px] text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={applicationTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="submitted" stroke="#1a3a5c" strokeWidth={2.5} dot={{ r: 3.5, fill: "#1a3a5c", strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="approved"  stroke="#198A00" strokeWidth={2.5} dot={{ r: 3.5, fill: "#198A00", strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="rejected"  stroke="#ef3340" strokeWidth={2}   dot={{ r: 3, fill: "#ef3340", strokeWidth: 0 }} strokeDasharray="4 3" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Submitted",    value: applicationTrend.reduce((s,r) => s + r.submitted, 0), color: "#1a3a5c", icon: FileText    },
              { label: "Total Approved",     value: applicationTrend.reduce((s,r) => s + r.approved, 0),  color: "#198A00", icon: CheckCircle2 },
              { label: "Total Rejected",     value: applicationTrend.reduce((s,r) => s + r.rejected, 0),  color: "#ef3340", icon: AlertCircle  },
              { label: "Approval Rate",      value: `${Math.round(applicationTrend.reduce((s,r) => s + r.approved,0) / applicationTrend.reduce((s,r) => s + r.submitted,0) * 100)}%`, color: "#f5a623", icon: Award },
            ].map(({ label, value, color, icon: Icon }) => (
              <Card key={label} className="bg-white border border-slate-200 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, color }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-800 leading-none">{value}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* REVENUE TAB */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "Revenue" && (
        <div className="space-y-5">
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="px-5 pt-5 pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">FY 2025/26 Revenue</h3>
                  <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Licence Fees &amp; Penalty Revenue (ZMW)</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#1a3a5c]">ZMW {(totalRevenue / 1000000).toFixed(2)}M</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 justify-end"><TrendingUp size={11} className="text-green-500" />+22% vs prior FY</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                {[{ label: "Licence Fees", color: "#1a3a5c" }, { label: "Penalties", color: "#f5a623" }].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="text-[11px] text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={revenueData} barGap={3} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="fees"      fill="#1a3a5c" radius={[4,4,0,0]} barSize={16} />
                  <Bar dataKey="penalties" fill="#f5a623" radius={[4,4,0,0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Licence Fees",    value: `ZMW ${(revenueData.reduce((s,r) => s + r.fees, 0) / 1000000).toFixed(2)}M`,   pct: 92, color: "#1a3a5c" },
              { label: "Total Penalties",       value: `ZMW ${(revenueData.reduce((s,r) => s + r.penalties, 0) / 1000).toFixed(0)}k`,  pct: 55, color: "#f5a623" },
              { label: "Best Revenue Month",    value: "March 2026",                                                                    pct: 100, color: "#198A00" },
            ].map(({ label, value, pct, color }) => (
              <Card key={label} className="bg-white border border-slate-200 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-[11px] text-slate-400 font-semibold mb-1">{label}</p>
                  <p className="text-lg font-black text-slate-800">{value}</p>
                  <div className="mt-2 h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* COMPLIANCE TAB */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "Compliance" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="px-5 pt-5 pb-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Compliance by Province</h3>
                <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Rate vs Active Licences</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={provinceCompliance} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="province" width={90} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="rate" radius={[0,4,4,0]} barSize={14} fill="#198A00">
                      <LabelList dataKey="rate" position="right" formatter={(value) => `${value}%`} style={{ fill: "#64748b", fontSize: 10 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="px-5 pt-5 pb-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Compliance Bands</h3>
                <CardTitle className="text-base font-bold text-slate-800 mt-0.5">Province Risk Classification</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-4">
                <div className="space-y-2.5">
                  {[
                    { band: "Excellent (≥90%)",  color: "#198A00", bg: "bg-green-50",  border: "border-green-200",  items: provinceCompliance.filter(p => p.rate >= 90) },
                    { band: "Good (80–89%)",      color: "#f5a623", bg: "bg-amber-50",  border: "border-amber-200",  items: provinceCompliance.filter(p => p.rate >= 80 && p.rate < 90) },
                    { band: "At Risk (70–79%)",   color: "#0ea5e9", bg: "bg-sky-50",    border: "border-sky-200",    items: provinceCompliance.filter(p => p.rate >= 70 && p.rate < 80) },
                    { band: "Non-Compliant (<70%)",color:"#ef3340", bg: "bg-red-50",    border: "border-red-200",    items: provinceCompliance.filter(p => p.rate < 70) },
                  ].map(({ band, color, bg, border, items }) => (
                    <div key={band} className={`rounded-xl p-3 border ${bg} ${border}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold" style={{ color }}>{band}</span>
                        <span className="text-[10px] font-bold text-slate-500">{items.length} province{items.length !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.length === 0
                          ? <span className="text-[10px] text-slate-400 italic">None</span>
                          : items.map(p => (
                            <span key={p.province} className="text-[10px] font-semibold px-2 py-0.5 bg-white rounded-full border border-white/80 text-slate-600">
                              {p.province} ({p.rate}%)
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* REPORTS LIBRARY TAB */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "Reports Library" && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap items-center">
            <div className="relative flex-1 min-w-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search reports by title or type…"
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
                className="pl-9 h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c] bg-white"
              />
            </div>
            <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5 h-9 shrink-0">
              <FileText size={12} />Generate Report
            </Button>
            <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5 h-9 shrink-0">
              <Download size={12} />Export All
            </Button>
          </div>

          {/* Report cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredReports.map((r) => (
              <div key={r.id} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-[#1a3a5c]" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 font-semibold ${statusStyle[r.status]}`}>{r.status}</Badge>
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 font-semibold ${typeStyle[r.type]}`}>{r.type}</Badge>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] text-slate-400 mb-0.5">{r.id}</p>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{r.title}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-0.5"><Calendar size={9} />{r.date}</span>
                    <span>{r.size}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#1a3a5c] transition-colors"><Eye size={12} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#1a3a5c] transition-colors"><Download size={12} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#1a3a5c] transition-colors"><Printer size={12} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="flex flex-col items-center py-20 gap-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <BarChart3 size={28} className="text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-400">No reports match your search</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-xs text-slate-400">
          Data shown is for prototype demonstration purposes only · Reference: MMMD/GRZ/IRM/IT/200/2026
        </p>
      </div>
    </div>
  );
}
