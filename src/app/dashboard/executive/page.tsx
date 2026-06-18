"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  RefreshCw,
  TrendingUp,
  Globe,
  BarChart2,
  ShieldAlert,
  Bell,
  Users,
  DollarSign,
  Pickaxe,
  PlusCircle,
  Download,
  Search,
  Calendar,
  Shield,
  Briefcase,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const licencesByProvince = [
  { province: "Copperbelt", active: 42, pending: 8, suspended: 3 },
  { province: "North-Western", active: 35, pending: 12, suspended: 2 },
  { province: "Lusaka", active: 18, pending: 5, suspended: 1 },
  { province: "Southern", active: 27, pending: 9, suspended: 4 },
  { province: "Eastern", active: 14, pending: 6, suspended: 2 },
  { province: "Luapula", active: 11, pending: 3, suspended: 1 },
];

const explorationTrend = [
  { month: "Jan", applications: 12, approved: 8, rejected: 2 },
  { month: "Feb", applications: 18, approved: 13, rejected: 3 },
  { month: "Mar", applications: 15, approved: 11, rejected: 2 },
  { month: "Apr", applications: 22, approved: 17, rejected: 4 },
  { month: "May", applications: 28, approved: 21, rejected: 3 },
  { month: "Jun", applications: 24, approved: 19, rejected: 2 },
];

const mineralDistribution = [
  { name: "Copper", value: 48, color: "#1a3a5c" },
  { name: "Cobalt", value: 22, color: "#f5a623" },
  { name: "Lithium", value: 15, color: "#3b82f6" },
  { name: "Gold", value: 9, color: "#10b981" },
  { name: "Others", value: 6, color: "#94a3b8" },
];

const recentActivity = [
  { id: "EL/2026/041/CB", type: "Application", company: "Zamcop Minerals Ltd", status: "Pending Review", date: "15 Jun 2026", mineral: "Copper" },
  { id: "EL/2026/039/NW", type: "Renewal", company: "Katanga Resources Plc", status: "Approved", date: "14 Jun 2026", mineral: "Cobalt" },
  { id: "EL/2026/038/SO", type: "Compliance", company: "Southern Minerals Inc", status: "Overdue", date: "13 Jun 2026", mineral: "Lithium" },
  { id: "EL/2026/037/CB", type: "Application", company: "Copperbelt Ventures", status: "Under Review", date: "12 Jun 2026", mineral: "Copper" },
  { id: "EL/2026/036/EA", type: "Suspension", company: "Eastern Gold Corp", status: "Suspended", date: "11 Jun 2026", mineral: "Gold" },
];

const copperPriceTrend = [
  { day: "Mon", price: 9210 },
  { day: "Tue", price: 9185 },
  { day: "Wed", price: 9340 },
  { day: "Thu", price: 9290 },
  { day: "Fri", price: 9410 },
  { day: "Sat", price: 9380 },
  { day: "Sun", price: 9450 },
];

const royaltyRevenue = [
  { q: "Q1 FY24", revenue: 38.2 },
  { q: "Q2 FY24", revenue: 44.7 },
  { q: "Q3 FY24", revenue: 41.1 },
  { q: "Q4 FY24", revenue: 52.3 },
  { q: "Q1 FY25", revenue: 49.8 },
  { q: "Q2 FY25", revenue: 61.4 },
];

const alerts = [
  { id: 1, severity: "high", message: "3 environmental reports overdue — Copperbelt zone", time: "2h ago" },
  { id: 2, severity: "medium", message: "EL/2026/031/NW renewal deadline in 7 days", time: "5h ago" },
  { id: 3, severity: "low", message: "New ESG compliance framework issued by MMMD", time: "1d ago" },
  { id: 4, severity: "medium", message: "Cobalt export quota revised — Q3 FY26 allocation", time: "1d ago" },
];

const topOperators = [
  { name: "First Quantum Minerals", licences: 14, compliance: 96, mineral: "Copper" },
  { name: "Konkola Copper Mines", licences: 11, compliance: 88, mineral: "Copper" },
  { name: "Cobalt 27 Capital", licences: 8, compliance: 92, mineral: "Cobalt" },
  { name: "Ivanhoe Mines Demo Country", licences: 7, compliance: 97, mineral: "Copper/Cobalt" },
  { name: "Gryphon Gold Demo Country", licences: 5, compliance: 84, mineral: "Gold" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusColor: Record<string, string> = {
  "Pending Review": "bg-amber-50 text-amber-700 border-amber-200",
  "Approved": "bg-green-50 text-green-700 border-green-200",
  "Overdue": "bg-red-50 text-red-700 border-red-200",
  "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
  "Suspended": "bg-slate-100 text-slate-600 border-slate-200",
};

const alertSeverityStyles: Record<string, { dot: string; pill: string; label: string }> = {
  high: {
    dot: "bg-red-500",
    pill: "bg-red-50 text-red-700 border border-red-200",
    label: "High",
  },
  medium: {
    dot: "bg-amber-500",
    pill: "bg-amber-50 text-amber-700 border border-amber-200",
    label: "Medium",
  },
  low: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    label: "Low",
  },
  info: {
    dot: "bg-slate-400",
    pill: "bg-slate-100 text-slate-700 border border-slate-200",
    label: "Info",
  },
};

const kpis = [
  {
    label: "Total Active Licences",
    value: "147",
    change: "+12",
    up: true,
    sub: "vs last quarter",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
    accent: "#22c55e",
  },
  {
    label: "Pending Applications",
    value: "43",
    change: "+5",
    up: false,
    sub: "awaiting review",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    accent: "#f5a623",
  },
  {
    label: "Compliance Rate",
    value: "84%",
    change: "+3%",
    up: true,
    sub: "this quarter",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    accent: "#22c55e",
  },
  {
    label: "Overdue Reports",
    value: "18",
    change: "-4",
    up: true,
    sub: "from last month",
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-50",
    accent: "#ef3340",
  },
  {
    label: "Royalty Revenue",
    value: "K61.4M",
    change: "+23%",
    up: true,
    sub: "Q2 FY25/26",
    icon: DollarSign,
    color: "text-purple-600",
    bg: "bg-purple-50",
    accent: "#6366f1",
  },
  {
    label: "Active Operators",
    value: "89",
    change: "+7",
    up: true,
    sub: "licensed entities",
    icon: Users,
    color: "text-teal-600",
    bg: "bg-teal-50",
    accent: "#0ea5e9",
  },
  {
    label: "New Applications",
    value: "24",
    change: "+6",
    up: true,
    sub: "this month",
    icon: Pickaxe,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    accent: "#1a3a5c",
  },
  {
    label: "Alerts / Flags",
    value: "11",
    change: "-2",
    up: true,
    sub: "open items",
    icon: ShieldAlert,
    color: "text-rose-500",
    bg: "bg-rose-50",
    accent: "#ef3340",
  },
];

const quickActions = [
  { label: "New Application", icon: PlusCircle, color: "#198A00", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "Generate Report",  icon: Download,    color: "#1a3a5c", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Search Licences",  icon: Search,      color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  { label: "Schedule Review",  icon: Calendar,    color: "#f5a623", bg: "#fffbeb", border: "#fde68a" },
  { label: "Compliance Check", icon: Shield,      color: "#ef3340", bg: "#fef2f2", border: "#fecaca" },
  { label: "Export Data",      icon: Briefcase,   color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
];

const govServices = [
  { label: "Exploration Licence Portal",   status: "Operational" },
  { label: "Royalty Payment Gateway",      status: "Operational" },
  { label: "Environmental Reporting",      status: "Maintenance" },
  { label: "Geological Data Repository",   status: "Operational" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExecutiveDashboard() {
  const [user, setUser] = useState<{ label: string; email: string } | null>(null);
  const [lastRefresh, setLastRefresh] = useState("Today, 09:15 WAT");

  useEffect(() => {
    const stored = localStorage.getItem("mets_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="p-5 space-y-5 max-w-[1600px] mx-auto bg-slate-50 min-h-screen">

      {/* ── Welcome Hero ── */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 sm:p-6 text-white"
        style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 55%, #152e4d 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.04] bg-white translate-x-24 -translate-y-24 pointer-events-none" />
        <div className="absolute bottom-0 right-40 w-40 h-40 rounded-full opacity-10 bg-[#f5a623] translate-y-20 pointer-events-none" />

        <div className="relative pl-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-semibold">Live Data</span>
              </div>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold">FY 2025/26</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              Executive Command Centre
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Welcome back,{" "}
              <span className="text-white/80 font-medium">{user?.label ?? "Executive"}</span>
              {" "}— Demo Country mineral exploration sector overview
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-white/40 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <Activity size={11} className="text-emerald-400" />
              <span>{lastRefresh}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-white/20 text-white/70 hover:text-white hover:bg-white/10 bg-transparent gap-1.5 h-8"
              onClick={() => setLastRefresh("Just now")}
            >
              <RefreshCw size={11} />
              Refresh
            </Button>
            <Badge className="bg-[#f5a623] text-[#1a3a5c] hover:bg-[#f5a623] text-xs px-3 py-1 font-bold">
              FY 2025/26
            </Badge>
          </div>
        </div>

        {/* Headline stats bar */}
        <div
          className="relative pl-3 mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { label: "Active Licences", value: "147", icon: FileText },
            { label: "Compliance Rate", value: "84%",  icon: CheckCircle2 },
            { label: "Royalty (Q2)",    value: "K61.4M", icon: DollarSign },
            { label: "Open Alerts",     value: "11",  icon: Bell },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                <Icon size={14} className="text-[#f5a623]" />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">{value}</p>
                <p className="text-[11px] text-white/45 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickActions.map(({ label, icon: Icon, color, bg, border }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 p-3 sm:p-3.5 rounded-xl border transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 text-center group cursor-pointer"
              style={{ background: bg, borderColor: border }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
                style={{ background: color + "18" }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Cards — 4×2 on desktop ── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map(({ label, value, change, up, sub, icon: Icon, color, bg, accent }) => (
            <Card
              key={label}
              className="border border-slate-200 shadow-sm bg-white group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${bg} ${color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex items-center gap-0.5">
                    {up
                      ? <ArrowUpRight size={11} className="text-green-500" />
                      : <ArrowDownRight size={11} className="text-red-400" />
                    }
                    <span className={`text-xs font-bold ${up ? "text-green-600" : "text-red-500"}`}>
                      {change}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-tight">{label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1 leading-none">{value}</p>
                <p className="text-xs text-slate-400 mt-1.5">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Row 2: Trend Chart + Mineral Pie + Copper Price ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Applications Trend */}
        <Card className="lg:col-span-5 border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 size={14} className="text-[#f5a623]" />
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Licence Applications — 2026
                </CardTitle>
              </div>
              <Badge variant="outline" className="text-xs border-slate-200 text-slate-500">Jan – Jun</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-4">
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={explorationTrend} barSize={16} barGap={3}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }} />
                <Bar dataKey="applications" fill="#1a3a5c" radius={[3, 3, 0, 0]} name="Applications" />
                <Bar dataKey="approved" fill="#f5a623" radius={[3, 3, 0, 0]} name="Approved" />
                <Bar dataKey="rejected" fill="#fca5a5" radius={[3, 3, 0, 0]} name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-1 justify-center">
              {[{ color: "#1a3a5c", label: "Applications" }, { color: "#f5a623", label: "Approved" }, { color: "#fca5a5", label: "Rejected" }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2 rounded-sm" style={{ background: color }} />
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mineral Distribution */}
        <Card className="lg:col-span-3 border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold text-slate-700">Licences by Mineral</CardTitle>
          </CardHeader>
          <CardContent className="px-5 py-4">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={mineralDistribution} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                  {mineralDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #e2e8f0" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {mineralDistribution.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-slate-600">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
                    </div>
                    <span className="font-semibold text-slate-700 w-7 text-right">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Copper Spot Price + Royalty Revenue */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Copper LME Price */}
          <Card className="border border-slate-200 shadow-sm bg-white flex-1">
            <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-[#f5a623]" />
                  <CardTitle className="text-sm font-semibold text-slate-700">LME Copper — 7-day</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-green-500" />
                  <span className="text-sm font-semibold text-green-600">+2.6%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-3">
              <p className="text-2xl font-bold text-slate-800 mb-1">$9,450 <span className="text-xs font-normal text-slate-400">/tonne</span></p>
              <ResponsiveContainer width="100%" height={70}>
                <AreaChart data={copperPriceTrend}>
                  <defs>
                    <linearGradient id="copperGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a3a5c" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 4, border: "1px solid #e2e8f0" }} />
                  <Area type="monotone" dataKey="price" stroke="#1a3a5c" strokeWidth={2} fill="url(#copperGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-400 mt-1">Source: LME via public market data · Updated daily</p>
            </CardContent>
          </Card>

          {/* Royalty Revenue Trend */}
          <Card className="border border-slate-200 shadow-sm bg-white flex-1">
            <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={13} className="text-[#f5a623]" />
                  <CardTitle className="text-sm font-semibold text-slate-700">Royalty Revenue (ZMW M)</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-3">
              <ResponsiveContainer width="100%" height={90}>
                <BarChart data={royaltyRevenue} barSize={14}>
                  <XAxis dataKey="q" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 10, borderRadius: 4, border: "1px solid #e2e8f0" }}
                    formatter={(v) => {
                      const amount = typeof v === "number" ? v : Number(v ?? 0);
                      return [`K${amount}M`, "Revenue"];
                    }}
                  />
                  <Bar dataKey="revenue" fill="#f5a623" radius={[3, 3, 0, 0]}>
                    {royaltyRevenue.map((_, i) => (
                      <Cell key={i} fill={i === royaltyRevenue.length - 1 ? "#1a3a5c" : "#f5a623"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Row 3: Province + Top Operators ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Licences by Province */}
        <Card className="lg:col-span-4 border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#f5a623]" />
              <CardTitle className="text-sm font-semibold text-slate-700">Licences by Province</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-4">
            <div className="space-y-3.5">
              {licencesByProvince.map(({ province, active, pending, suspended }) => {
                const total = active + pending + suspended;
                return (
                  <div key={province}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-slate-700">{province}</span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-600 font-semibold">{active}</span>
                        <span className="text-amber-500">{pending}</span>
                        <span className="text-red-400">{suspended}</span>
                      </div>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-slate-100 gap-px">
                      <div style={{ width: `${(active / total) * 100}%`, background: "#198A00" }} />
                      <div style={{ width: `${(pending / total) * 100}%`, background: "#f5a623" }} />
                      <div style={{ width: `${(suspended / total) * 100}%`, background: "#ef3340" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
              {[{ color: "#198A00", label: "Active" }, { color: "#f5a623", label: "Pending" }, { color: "#ef3340", label: "Suspended" }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Operators */}
        <Card className="lg:col-span-8 border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users size={13} className="text-[#f5a623]" />
              <CardTitle className="text-sm font-semibold text-slate-700">Top Operators by Licences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-3">
            <div className="space-y-1">
              {topOperators.map((op, i) => (
                <div key={op.name} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                  <span className="text-sm font-bold text-slate-300 w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{op.name}</p>
                    <p className="text-xs text-slate-400">{op.mineral}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-4 shrink-0">
                    <div className="w-14 text-right">
                      <p className="text-xs font-bold text-[#1a3a5c]">{op.licences}</p>
                      <p className="text-xs text-slate-400">licences</p>
                    </div>
                    <div className="w-28">
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="text-slate-400">Compliance</span>
                        <span className={op.compliance >= 90 ? "text-green-600 font-semibold" : "text-amber-500 font-semibold"}>{op.compliance}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${op.compliance}%`,
                            background: op.compliance >= 90 ? "#198A00" : "#f5a623",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ── Row 4: Recent Activity + Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Recent Activity */}
        <Card className="lg:col-span-8 border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={13} className="text-[#f5a623]" />
                <CardTitle className="text-sm font-semibold text-slate-700">Recent Activity</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-[#1a3a5c] h-6 px-2 gap-1">
                View all <ChevronRight size={10} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-3">
            <div className="space-y-0">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start justify-between py-2.5 border-b border-slate-50 last:border-0">
                  <div className="space-y-0.5 flex-1 min-w-0 mr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-mono font-bold text-[#1a3a5c] truncate">{item.id}</span>
                      <span className="text-xs text-slate-400 border border-slate-200 px-1 py-0.5 rounded shrink-0">{item.type}</span>
                    </div>
                    <p className="text-sm text-slate-600 truncate">{item.company}</p>
                    <p className="text-xs text-slate-400">{item.mineral} · {item.date}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs px-1.5 py-0.5 font-medium shrink-0 ${statusColor[item.status]}`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="lg:col-span-4 border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#1a3a5c]/10 flex items-center justify-center">
                  <Bell size={13} className="text-[#1a3a5c]" />
                </div>
                <CardTitle className="text-sm font-semibold text-slate-700">Alerts & Flags</CardTitle>
              </div>
              <Badge className="bg-[#ef3340] text-white text-xs h-5 px-2 rounded-full hover:bg-[#ef3340]">
                {alerts.length} Open
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-3">
            <div className="relative pl-4">
              <div className="absolute left-[4px] top-1 bottom-1 w-px bg-slate-200" />
              <div className="space-y-2.5">
                {alerts.map((alert) => {
                  const severityMeta = alertSeverityStyles[alert.severity] ?? alertSeverityStyles.info;
                  const [headline, ...details] = alert.message.split(" — ");

                  return (
                    <div key={alert.id} className="relative border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                      <span className={`absolute -left-4 top-2 h-2.5 w-2.5 rounded-full ring-4 ring-white ${severityMeta.dot}`} />
                      <div className="pl-2 pr-1">
                        <p className="text-sm leading-snug text-slate-700">
                          <span className="font-semibold">{headline}</span>
                          {details.length > 0 && <span className="text-slate-500"> · {details.join(" — ")}</span>}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${severityMeta.pill}`}>
                            {severityMeta.label}
                          </span>
                          <span className="text-xs uppercase tracking-wide text-slate-400">{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Government Services Status ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#f5a623]" />
            <h3 className="text-sm font-semibold text-slate-700">Government Services Status</h3>
          </div>
          <span className="text-xs text-slate-400">Updated: {lastRefresh}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {govServices.map(({ label, status }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: status === "Operational" ? "#198A00" : "#f5a623" }}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{label}</p>
                <p
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: status === "Operational" ? "#198A00" : "#b45309" }}
                >
                  {status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 pb-4 border-t border-slate-200">
        <p className="text-xs text-slate-400">
          Data shown is for prototype demonstration purposes only · Ref: MMMD/GRZ/IRM/IT/200/2026
        </p>
        <p className="text-xs text-slate-400 shrink-0">METS v2.1 · Ministry of Mines and Minerals Development, GRZ</p>
      </div>

    </div>
  );
}