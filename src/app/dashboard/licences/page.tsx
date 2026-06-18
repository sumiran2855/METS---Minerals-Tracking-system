"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  MapPin,
  Calendar,
  Building2,
  ChevronDown,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Ban,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  RefreshCw,
  BarChart2,
  Bell,
  Shield,
  ShieldAlert,
  Briefcase,
  ChevronRight,
  Layers,
  PlusCircle,
  Pickaxe,
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
  CartesianGrid,
} from "recharts";

const licences = [
  {
    id: "EL/2026/041/CB",
    company: "Zamcop Minerals Ltd",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Kitwe",
    area: "342 km²",
    issued: "10 Jan 2026",
    expiry: "09 Jan 2029",
    status: "Active",
    workProgramme: "On Track",
    expenditure: "USD 1,200,000",
    contact: "James Mwale",
  },
  {
    id: "EL/2026/039/NW",
    company: "Katanga Resources Plc",
    mineral: "Cobalt",
    province: "North-Western",
    district: "Solwezi",
    area: "218 km²",
    issued: "05 Jan 2026",
    expiry: "04 Jan 2028",
    status: "Active",
    workProgramme: "On Track",
    expenditure: "USD 890,000",
    contact: "Ruth Banda",
  },
  {
    id: "EL/2026/038/SO",
    company: "Southern Minerals Inc",
    mineral: "Lithium",
    province: "Southern",
    district: "Choma",
    area: "175 km²",
    issued: "02 Jan 2026",
    expiry: "01 Jan 2028",
    status: "Active",
    workProgramme: "Overdue",
    expenditure: "USD 430,000",
    contact: "Peter Zulu",
  },
  {
    id: "EL/2026/037/CB",
    company: "Copperbelt Ventures",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Ndola",
    area: "290 km²",
    issued: "15 Dec 2025",
    expiry: "14 Dec 2028",
    status: "Pending Review",
    workProgramme: "Not Started",
    expenditure: "—",
    contact: "Alice Tembo",
  },
  {
    id: "EL/2026/036/EA",
    company: "Eastern Gold Corp",
    mineral: "Gold",
    province: "Eastern",
    district: "Chipata",
    area: "130 km²",
    issued: "10 Dec 2025",
    expiry: "09 Dec 2027",
    status: "Suspended",
    workProgramme: "Suspended",
    expenditure: "USD 200,000",
    contact: "David Phiri",
  },
  {
    id: "EL/2025/112/LU",
    company: "Luapula Mining Group",
    mineral: "Emerald",
    province: "Luapula",
    district: "Mansa",
    area: "95 km²",
    issued: "01 Nov 2025",
    expiry: "31 Oct 2027",
    status: "Active",
    workProgramme: "On Track",
    expenditure: "USD 310,000",
    contact: "Grace Mutale",
  },
  {
    id: "EL/2025/108/NW",
    company: "NorthWest Exploration Ltd",
    mineral: "Manganese",
    province: "North-Western",
    district: "Zambezi",
    area: "408 km²",
    issued: "15 Oct 2025",
    expiry: "14 Oct 2028",
    status: "Under Review",
    workProgramme: "Not Started",
    expenditure: "—",
    contact: "Simon Lungu",
  },
  {
    id: "EL/2025/097/SO",
    company: "Zambezi Resources Ltd",
    mineral: "Nickel",
    province: "Southern",
    district: "Livingstone",
    area: "260 km²",
    issued: "01 Sep 2025",
    expiry: "31 Aug 2028",
    status: "Active",
    workProgramme: "On Track",
    expenditure: "USD 670,000",
    contact: "Mary Siakajozi",
  },
  {
    id: "EL/2025/085/CB",
    company: "Chibuluma Mining Co",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Kalulushi",
    area: "185 km²",
    issued: "15 Aug 2025",
    expiry: "14 Aug 2027",
    status: "Expired",
    workProgramme: "Completed",
    expenditure: "USD 2,100,000",
    contact: "Henry Kabwe",
  },
  {
    id: "EL/2025/074/EA",
    company: "Petauke Minerals Ltd",
    mineral: "Uranium",
    province: "Eastern",
    district: "Petauke",
    area: "312 km²",
    issued: "01 Jul 2025",
    expiry: "30 Jun 2028",
    status: "Active",
    workProgramme: "On Track",
    expenditure: "USD 980,000",
    contact: "Esther Nkonde",
  },
];

// ─── Chart & Analytics Data ───────────────────────────────────────────────────

const explorationTrend = [
  { month: "Jan", applications: 12, approved: 8,  rejected: 2 },
  { month: "Feb", applications: 18, approved: 13, rejected: 3 },
  { month: "Mar", applications: 15, approved: 11, rejected: 2 },
  { month: "Apr", applications: 22, approved: 17, rejected: 4 },
  { month: "May", applications: 28, approved: 21, rejected: 3 },
  { month: "Jun", applications: 24, approved: 19, rejected: 2 },
];

const mineralDistribution = [
  { name: "Copper",  value: 48, color: "#1a3a5c" },
  { name: "Cobalt",  value: 22, color: "#f5a623" },
  { name: "Lithium", value: 15, color: "#3b82f6" },
  { name: "Gold",    value: 9,  color: "#10b981" },
  { name: "Others",  value: 6,  color: "#94a3b8" },
];

const licencesByProvince = [
  { province: "Copperbelt",    active: 42, pending: 8,  suspended: 3 },
  { province: "North-Western", active: 35, pending: 12, suspended: 2 },
  { province: "Lusaka",        active: 18, pending: 5,  suspended: 1 },
  { province: "Southern",      active: 27, pending: 9,  suspended: 4 },
  { province: "Eastern",       active: 14, pending: 6,  suspended: 2 },
  { province: "Luapula",       active: 11, pending: 3,  suspended: 1 },
];

const expiryAlerts = [
  { id: "EL/2026/031/NW", company: "Zambezi Cobalt Ltd",    daysLeft: 7,  province: "North-Western", status: "Critical" },
  { id: "EL/2026/028/CB", company: "Copperbelt Gold Mines", daysLeft: 14, province: "Copperbelt",    status: "Warning"  },
  { id: "EL/2026/022/SO", company: "Kafue Basin Resources", daysLeft: 21, province: "Southern",      status: "Warning"  },
  { id: "EL/2025/099/EA", company: "Chipata Mineral Corp",  daysLeft: 29, province: "Eastern",       status: "Notice"   },
];

const complianceAlerts = [
  { severity: "high",   message: "3 environmental reports overdue — Copperbelt zone",  time: "2h ago" },
  { severity: "medium", message: "EL/2026/031/NW renewal deadline in 7 days",           time: "5h ago" },
  { severity: "medium", message: "Cobalt export quota revised — Q3 FY26 allocation",    time: "1d ago" },
  { severity: "low",    message: "New ESG compliance framework issued by MMMD",         time: "1d ago" },
];

// ─── Config maps ──────────────────────────────────────────────────────────────

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Active:          { color: "bg-green-50 text-green-700 border-green-200",   icon: <CheckCircle2 size={11} /> },
  "Pending Review":{ color: "bg-amber-50 text-amber-700 border-amber-200",   icon: <Clock size={11} /> },
  "Under Review":  { color: "bg-blue-50 text-blue-700 border-blue-200",      icon: <Clock size={11} /> },
  Suspended:       { color: "bg-red-50 text-red-700 border-red-200",         icon: <Ban size={11} /> },
  Expired:         { color: "bg-slate-100 text-slate-500 border-slate-200",  icon: <AlertTriangle size={11} /> },
};

const wpConfig: Record<string, string> = {
  "On Track":   "text-green-600",
  Overdue:      "text-red-500",
  "Not Started":"text-slate-400",
  Suspended:    "text-red-400",
  Completed:    "text-blue-600",
};

const alertSeverityStyles: Record<string, { dot: string; pill: string; label: string }> = {
  high:   { dot: "bg-red-500",     pill: "bg-red-50 text-red-700 border border-red-200",             label: "High"   },
  medium: { dot: "bg-amber-500",   pill: "bg-amber-50 text-amber-700 border border-amber-200",       label: "Medium" },
  low:    { dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", label: "Low"    },
};

const kpis = [
  { label: "Total Licences",     value: "147", change: "+12", up: true,  sub: "vs last quarter",  icon: FileText,     color: "text-blue-600",   bg: "bg-blue-50"   },
  { label: "Active Licences",    value: "112", change: "+8",  up: true,  sub: "currently active", icon: CheckCircle2, color: "text-green-600",  bg: "bg-green-50"  },
  { label: "Pending Review",     value: "21",  change: "+5",  up: false, sub: "awaiting decision",icon: Clock,        color: "text-amber-600",  bg: "bg-amber-50"  },
  { label: "Expiring (30 days)", value: "8",   change: "+3",  up: false, sub: "require renewal",  icon: AlertTriangle,color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Suspended",          value: "5",   change: "-2",  up: true,  sub: "from last month",  icon: Ban,          color: "text-red-500",    bg: "bg-red-50"    },
  { label: "Expired",            value: "14",  change: "+1",  up: false, sub: "no longer valid",  icon: ShieldAlert,  color: "text-rose-500",   bg: "bg-rose-50"   },
  { label: "Compliance Rate",    value: "84%", change: "+3%", up: true,  sub: "this quarter",     icon: Shield,       color: "text-teal-600",   bg: "bg-teal-50"   },
  { label: "New Applications",   value: "24",  change: "+6",  up: true,  sub: "this month",       icon: Pickaxe,      color: "text-indigo-600", bg: "bg-indigo-50" },
];

const quickActions = [
  { label: "New Application",  icon: PlusCircle, color: "#198A00", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "Generate Report",  icon: Download,   color: "#1a3a5c", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Search Licences",  icon: Search,     color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  { label: "Schedule Review",  icon: Calendar,   color: "#f5a623", bg: "#fffbeb", border: "#fde68a" },
  { label: "Compliance Check", icon: Shield,     color: "#ef3340", bg: "#fef2f2", border: "#fecaca" },
  { label: "Export Registry",  icon: Briefcase,  color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
];

const provinces = ["All Provinces", "Copperbelt", "North-Western", "Lusaka", "Southern", "Eastern", "Luapula"];
const statuses  = ["All Statuses", "Active", "Pending Review", "Under Review", "Suspended", "Expired"];
const minerals  = ["All Minerals", "Copper", "Cobalt", "Lithium", "Gold", "Emerald", "Manganese", "Nickel", "Uranium"];

type Licence = typeof licences[0];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LicencesPage() {
  const [search,          setSearch]          = useState("");
  const [provinceFilter,  setProvinceFilter]  = useState("All Provinces");
  const [statusFilter,    setStatusFilter]    = useState("All Statuses");
  const [mineralFilter,   setMineralFilter]   = useState("All Minerals");
  const [selectedLicence, setSelectedLicence] = useState<Licence | null>(null);
  const [showFilters,     setShowFilters]     = useState(false);
  const [showNewForm,     setShowNewForm]     = useState(false);
  const [formStep,        setFormStep]        = useState(0);
  const [lastRefresh,     setLastRefresh]     = useState("Today, 09:15 WAT");

  const filtered = licences.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch   = l.id.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.district.toLowerCase().includes(q);
    const matchProvince = provinceFilter === "All Provinces" || l.province === provinceFilter;
    const matchStatus   = statusFilter   === "All Statuses"  || l.status   === statusFilter;
    const matchMineral  = mineralFilter  === "All Minerals"  || l.mineral  === mineralFilter;
    return matchSearch && matchProvince && matchStatus && matchMineral;
  });

  const clearFilters = () => {
    setSearch(""); setProvinceFilter("All Provinces"); setStatusFilter("All Statuses"); setMineralFilter("All Minerals");
  };

  const hasFilters = search || provinceFilter !== "All Provinces" || statusFilter !== "All Statuses" || mineralFilter !== "All Minerals";

  return (
    <div className="p-5 space-y-5 max-w-[1600px] mx-auto bg-slate-50 min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 sm:p-6 text-white"
        style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 55%, #152e4d 100%)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.04] bg-white translate-x-24 -translate-y-24 pointer-events-none" />
        <div className="absolute bottom-0 right-40 w-40 h-40 rounded-full opacity-10 bg-[#f5a623] translate-y-20 pointer-events-none" />

        <div className="relative pl-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-semibold">Live Registry</span>
              </div>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold">FY 2025/26</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              Exploration Licence Tracking (ELT)
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Manage and monitor all mineral exploration licences across{" "}
              <span className="text-white/80 font-medium">all Country</span>
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
              MMMD
            </Badge>
          </div>
        </div>

        {/* Headline stats */}
        <div
          className="relative pl-3 mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { label: "Total Licences", value: "147", icon: FileText      },
            { label: "Active",         value: "112", icon: CheckCircle2  },
            { label: "Pending Review", value: "21",  icon: Clock         },
            { label: "Expiring (30d)", value: "8",   icon: AlertTriangle },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
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

      {/* ── KPI Cards ────────────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map(({ label, value, change, up, sub, icon: Icon, color, bg }) => (
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
                    <span className={`text-xs font-bold ${up ? "text-green-600" : "text-red-500"}`}>{change}</span>
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

      {/* ── Expiry & Compliance ──────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Expiry &amp; Compliance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Expiring Soon */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center">
                    <Calendar size={13} className="text-orange-500" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-700">Expiring within 30 Days</CardTitle>
                </div>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs px-2 border border-orange-200">
                  {expiryAlerts.length} licences
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-3">
              {expiryAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                  <div className="space-y-0.5 flex-1 min-w-0 mr-3">
                    <span className="font-mono text-xs font-bold text-[#1a3a5c]">{alert.id}</span>
                    <p className="text-xs text-slate-600 truncate">{alert.company}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <MapPin size={9} />{alert.province}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0.5 font-semibold ${
                        alert.status === "Critical" ? "bg-red-50 text-red-700 border-red-200"
                        : alert.status === "Warning"  ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {alert.status}
                    </Badge>
                    <span className={`text-xs font-bold ${
                      alert.daysLeft <= 7 ? "text-red-600" : alert.daysLeft <= 14 ? "text-amber-600" : "text-slate-500"
                    }`}>
                      {alert.daysLeft}d left
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Alerts */}
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#1a3a5c]/10 flex items-center justify-center">
                    <Bell size={13} className="text-[#1a3a5c]" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-700">Compliance Alerts</CardTitle>
                </div>
                <Badge className="bg-[#ef3340] text-white hover:bg-[#ef3340] text-xs h-5 px-2 rounded-full">
                  {complianceAlerts.length} Open
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <div className="relative pl-4">
                <div className="absolute left-[4px] top-1 bottom-1 w-px bg-slate-200" />
                <div className="space-y-2.5">
                  {complianceAlerts.map((alert, i) => {
                    const s = alertSeverityStyles[alert.severity];
                    return (
                      <div key={i} className="relative border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                        <span className={`absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${s.dot}`} />
                        <div className="pl-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs text-slate-700 leading-snug flex-1">{alert.message}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${s.pill}`}>{s.label}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{alert.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Licence Registry ─────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Licence Registry</h3>
        <Card className="border border-slate-200 shadow-sm bg-white">

          {/* Search & filter bar */}
          <CardContent className="p-4 space-y-3 border-b border-slate-100">
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 min-w-0">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by licence ID, company, or district…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-7 text-sm"
                />
              </div>
              <Button size="sm" variant="outline" className="border-slate-300 gap-1.5 text-xs shrink-0" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={13} />
                Filters
                <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
              <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5 shrink-0" onClick={() => setShowNewForm(true)}>
                <Plus size={13} />
                New Application
              </Button>
              {hasFilters && (
                <Button size="sm" variant="ghost" className="text-xs text-red-500 hover:text-red-600 gap-1 shrink-0" onClick={clearFilters}>
                  <X size={12} />Clear
                </Button>
              )}
            </div>
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[
                  { value: provinceFilter, setter: setProvinceFilter, options: provinces },
                  { value: statusFilter,   setter: setStatusFilter,   options: statuses  },
                  { value: mineralFilter,  setter: setMineralFilter,  options: minerals  },
                ].map(({ value, setter, options }, i) => (
                  <select key={i} value={value} onChange={(e) => setter(e.target.value)}
                    className="h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ))}
              </div>
            )}
          </CardContent>

          {/* Table header meta */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers size={13} className="text-[#f5a623]" />
              <span className="text-sm font-semibold text-slate-700">Licence Directory</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Showing {filtered.length} of {licences.length} licences</span>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-500 gap-1.5 px-2">
                <Download size={12} />Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  {["Licence ID", "Company", "Mineral", "Province", "Area", "Expiry", "Status", "Work Programme", ""].map((h) => (
                    <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wide px-4 py-3 first:px-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <FileText size={20} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-medium text-slate-400">No licences match your filters</p>
                        <p className="text-xs text-slate-300">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((licence, idx) => (
                    <tr
                      key={licence.id}
                      className={`border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer group ${idx % 2 === 0 ? "" : "bg-slate-50/40"}`}
                      onClick={() => setSelectedLicence(licence)}
                    >
                      <td className="px-5 py-3">
                        <span className="font-mono text-xs font-bold text-[#1a3a5c]">{licence.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold text-slate-700">{licence.company}</p>
                        <p className="text-[10px] text-slate-400">{licence.district}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{licence.mineral}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <MapPin size={10} className="text-slate-400" />{licence.province}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{licence.area}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Calendar size={10} className="text-slate-400" />{licence.expiry}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 font-medium flex items-center gap-1 w-fit ${statusConfig[licence.status]?.color}`}
                        >
                          {statusConfig[licence.status]?.icon}
                          {licence.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold ${wpConfig[licence.workProgramme]}`}>
                          {licence.workProgramme}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-slate-300 hover:text-[#1a3a5c] opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); setSelectedLicence(licence); }}
                        >
                          <Eye size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">Page 1 of 1</span>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs border-slate-200" disabled>Previous</Button>
              <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs border-[#1a3a5c] bg-[#1a3a5c] text-white hover:bg-[#15304d]">1</Button>
              <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs border-slate-200" disabled>Next</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-xs text-slate-400">
          Data shown is for prototype demonstration purposes only · Reference: MMMD/GRZ/IRM/IT/200/2026
        </p>
      </div>

      {/* ── Licence Detail Modal ─────────────────────────────────────────────── */}
      {selectedLicence && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedLicence(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="sticky top-0 rounded-t-2xl px-6 py-5 flex items-start justify-between"
              style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 100%)" }}
            >
              <div>
                <p className="text-[#f5a623] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Exploration Licence · Detail Record</p>
                <h3 className="text-white font-bold text-lg font-mono leading-none">{selectedLicence.id}</h3>
                <p className="text-white/60 text-sm mt-1">{selectedLicence.company}</p>
              </div>
              <button
                onClick={() => setSelectedLicence(null)}
                className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 mt-0.5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`text-xs px-3 py-1 font-medium flex items-center gap-1.5 ${statusConfig[selectedLicence.status]?.color}`}>
                  {statusConfig[selectedLicence.status]?.icon}
                  {selectedLicence.status}
                </Badge>
                <Badge variant="outline" className="text-xs px-3 py-1 border-slate-200 text-slate-600">{selectedLicence.mineral}</Badge>
                <Badge variant="outline" className="text-xs px-3 py-1 border-slate-200 text-slate-600">
                  <MapPin size={10} className="mr-1" />{selectedLicence.province}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Licence Area",      value: selectedLicence.area,        icon: <MapPin size={12} />      },
                  { label: "District",          value: selectedLicence.district,    icon: <MapPin size={12} />      },
                  { label: "Date Issued",       value: selectedLicence.issued,      icon: <Calendar size={12} />    },
                  { label: "Expiry Date",       value: selectedLicence.expiry,      icon: <Calendar size={12} />    },
                  { label: "Contact Person",    value: selectedLicence.contact,     icon: <Building2 size={12} />   },
                  { label: "Expenditure (YTD)", value: selectedLicence.expenditure, icon: <ArrowUpRight size={12} />},
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                      {icon}
                      <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Work Programme Status</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Annual Target Progress</span>
                  <span className={`text-sm font-bold ${wpConfig[selectedLicence.workProgramme]}`}>{selectedLicence.workProgramme}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all ${
                    selectedLicence.workProgramme === "On Track"    ? "bg-green-500 w-[72%]"
                    : selectedLicence.workProgramme === "Overdue"   ? "bg-red-400 w-[35%]"
                    : selectedLicence.workProgramme === "Completed" ? "bg-blue-500 w-full"
                    : "bg-slate-300 w-0"
                  }`} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-slate-400">0%</span>
                  <span className="text-[10px] text-slate-400">Target: 100%</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">Licence Boundary — GIS Map</p>
                <div className="w-full h-44 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-2">
                  <MapPin size={28} className="text-slate-300" />
                  <p className="text-sm text-slate-400 font-semibold">GIS Map View</p>
                  <p className="text-xs text-slate-400">{selectedLicence.province} — {selectedLicence.district}</p>
                  <Badge variant="outline" className="text-[10px] border-slate-300 text-slate-400 mt-1">
                    Leaflet.js integration — Phase 2
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-1 border-t border-slate-100">
                <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5">
                  <FileText size={12} />View Full Record
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5">
                  <Download size={12} />Download
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-slate-400 hover:text-slate-600 ml-auto" onClick={() => setSelectedLicence(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── New Application Modal ────────────────────────────────────────────── */}
      {showNewForm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowNewForm(false)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="sticky top-0 rounded-t-2xl px-6 py-5 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 100%)" }}
            >
              <div>
                <p className="text-[#f5a623] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">New Application</p>
                <h3 className="text-white font-bold text-base leading-none">Exploration Licence Application</h3>
              </div>
              <button onClick={() => { setShowNewForm(false); setFormStep(0); }} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Step indicator */}
              <div className="flex items-center gap-0">
                {["Basic Info", "Area Details", "Documents", "Submit"].map((step, i) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        i < formStep
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : i === formStep
                          ? "bg-[#1a3a5c] border-[#1a3a5c] text-white"
                          : "border-slate-200 text-slate-400"
                      }`}>
                        {i < formStep ? "✓" : i + 1}
                      </div>
                      <span className={`text-[9px] whitespace-nowrap ${
                        i === formStep ? "text-[#1a3a5c] font-semibold" : "text-slate-400"
                      }`}>{step}</span>
                    </div>
                    {i < 3 && <div className={`flex-1 h-0.5 mb-4 ${i < formStep ? "bg-[#1a3a5c]" : "bg-slate-200"}`} />}
                  </div>
                ))}
              </div>

              {/* Step 0 — Basic Info */}
              {formStep === 0 && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Company Name</label>
                    <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. Zamcop Minerals Ltd" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Mineral Type</label>
                      <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                        {["Copper","Cobalt","Lithium","Gold","Emerald","Manganese","Nickel","Uranium"].map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Province</label>
                      <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                        {["Copperbelt","North-Western","Lusaka","Southern","Eastern","Luapula"].map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">District</label>
                    <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. Kitwe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Contact Person</label>
                    <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="Full name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Contact Email</label>
                    <Input type="email" className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="contact@company.com" />
                  </div>
                </div>
              )}

              {/* Step 1 — Area Details */}
              {formStep === 1 && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Licence Area (km²)</label>
                    <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. 250" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Grid Reference / Block Number</label>
                    <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. Block 14-NW" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Latitude</label>
                      <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. -12.8000" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Longitude</label>
                      <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. 28.2000" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Proposed Licence Duration</label>
                    <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                      {["1 Year","2 Years","3 Years","4 Years","5 Years"].map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Proposed Work Programme Summary</label>
                    <textarea
                      rows={3}
                      className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c] resize-none"
                      placeholder="Briefly describe planned exploration activities…"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 — Documents */}
              {formStep === 2 && (
                <div className="space-y-3">
                  {[
                    { label: "Certificate of Incorporation", required: true  },
                    { label: "Environmental Impact Assessment (EIA)", required: true  },
                    { label: "Work Programme Document", required: true  },
                    { label: "Proof of Financial Capacity", required: false },
                    { label: "Technical Competence Certificate", required: false },
                  ].map(({ label, required }) => (
                    <div key={label} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{required ? "Required" : "Optional"}</p>
                      </div>
                      <label className="cursor-pointer">
                        <span className="text-xs text-[#1a3a5c] font-semibold border border-[#1a3a5c]/30 rounded-lg px-3 py-1.5 hover:bg-[#1a3a5c]/5 transition-colors">
                          Upload
                        </span>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3 — Review & Submit */}
              {formStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Review Summary</p>
                    {[
                      { label: "Company",  value: "— not entered —" },
                      { label: "Mineral",  value: "Copper"           },
                      { label: "Province", value: "Copperbelt"       },
                      { label: "Area",     value: "— not entered —" },
                      { label: "Duration", value: "3 Years"          },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">{label}</span>
                        <span className="font-semibold text-slate-700">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-700">By submitting, you confirm that all information provided is accurate and complete. False declarations may result in licence rejection.</p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                {formStep > 0 && (
                  <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5" onClick={() => setFormStep((s) => s - 1)}>
                    Back
                  </Button>
                )}
                {formStep < 3 ? (
                  <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5 flex-1" onClick={() => setFormStep((s) => s + 1)}>
                    {formStep === 0 ? "Next: Area Details" : formStep === 1 ? "Next: Documents" : "Next: Review"}
                    <ChevronRight size={12} />
                  </Button>
                ) : (
                  <Button size="sm" className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 flex-1" onClick={() => { setShowNewForm(false); setFormStep(0); }}>
                    <CheckCircle2 size={12} />
                    Submit Application
                  </Button>
                )}
                <Button size="sm" variant="outline" className="text-xs text-slate-400" onClick={() => { setShowNewForm(false); setFormStep(0); }}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}