"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  X,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  Building2,
  Pickaxe,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  Activity,
  Eye,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  FolderOpen,
  ChevronDown,
  CircleDot,
  Hourglass,
  BadgeCheck,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAGES = [
  { key: "all",         label: "All",              color: "#64748b", bg: "bg-slate-100",  text: "text-slate-600",  border: "border-slate-200" },
  { key: "submitted",   label: "Submitted",         color: "#3b82f6", bg: "bg-blue-50",    text: "text-blue-700",   border: "border-blue-200"  },
  { key: "under_review",label: "Under Review",      color: "#f5a623", bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200" },
  { key: "awaiting",    label: "Awaiting Documents",color: "#8b5cf6", bg: "bg-purple-50",  text: "text-purple-700", border: "border-purple-200"},
  { key: "committee",   label: "Committee Review",  color: "#0ea5e9", bg: "bg-sky-50",     text: "text-sky-700",    border: "border-sky-200"   },
  { key: "approved",    label: "Approved",          color: "#198A00", bg: "bg-green-50",   text: "text-green-700",  border: "border-green-200" },
  { key: "rejected",    label: "Rejected",          color: "#ef3340", bg: "bg-red-50",     text: "text-red-700",    border: "border-red-200"   },
] as const;

type StageKey = typeof STAGES[number]["key"];

const STEPS = ["Submission", "Document Check", "Technical Review", "Committee", "Decision"];

const applications = [
  {
    id: "APP/2026/0041/CB",
    company: "Zamcop Minerals Ltd",
    applicant: "James Mwale",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Kitwe",
    area: "342 km²",
    submitted: "10 Jan 2026",
    lastUpdated: "15 Jun 2026",
    stage: "under_review" as StageKey,
    stepIndex: 2,
    officer: "Dr. K. Mwansa",
    priority: "High",
    notes: 3,
    docs: 5,
    fee: "ZMW 12,400",
    duration: "3 Years",
  },
  {
    id: "APP/2026/0039/NW",
    company: "Katanga Resources Plc",
    applicant: "Ruth Banda",
    mineral: "Cobalt",
    province: "North-Western",
    district: "Solwezi",
    area: "218 km²",
    submitted: "05 Jan 2026",
    lastUpdated: "14 Jun 2026",
    stage: "committee" as StageKey,
    stepIndex: 3,
    officer: "R. Banda",
    priority: "Medium",
    notes: 5,
    docs: 7,
    fee: "ZMW 9,800",
    duration: "2 Years",
  },
  {
    id: "APP/2026/0038/SO",
    company: "Southern Minerals Inc",
    applicant: "Peter Zulu",
    mineral: "Lithium",
    province: "Southern",
    district: "Choma",
    area: "175 km²",
    submitted: "02 Jan 2026",
    lastUpdated: "12 Jun 2026",
    stage: "awaiting" as StageKey,
    stepIndex: 1,
    officer: "P. Zulu",
    priority: "High",
    notes: 2,
    docs: 3,
    fee: "ZMW 7,600",
    duration: "2 Years",
  },
  {
    id: "APP/2026/0037/CB",
    company: "Copperbelt Ventures",
    applicant: "Alice Tembo",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Ndola",
    area: "290 km²",
    submitted: "15 Dec 2025",
    lastUpdated: "10 Jun 2026",
    stage: "approved" as StageKey,
    stepIndex: 4,
    officer: "H. Kabwe",
    priority: "Low",
    notes: 8,
    docs: 9,
    fee: "ZMW 11,200",
    duration: "3 Years",
  },
  {
    id: "APP/2026/0036/EA",
    company: "Eastern Gold Corp",
    applicant: "David Phiri",
    mineral: "Gold",
    province: "Eastern",
    district: "Chipata",
    area: "130 km²",
    submitted: "10 Dec 2025",
    lastUpdated: "08 Jun 2026",
    stage: "rejected" as StageKey,
    stepIndex: 4,
    officer: "E. Nkonde",
    priority: "Medium",
    notes: 6,
    docs: 4,
    fee: "ZMW 5,800",
    duration: "1 Year",
  },
  {
    id: "APP/2026/0035/LU",
    company: "Luapula Mining Group",
    applicant: "Grace Mutale",
    mineral: "Emerald",
    province: "Luapula",
    district: "Mansa",
    area: "95 km²",
    submitted: "01 Nov 2025",
    lastUpdated: "17 Jun 2026",
    stage: "submitted" as StageKey,
    stepIndex: 0,
    officer: "G. Mutale",
    priority: "Low",
    notes: 1,
    docs: 2,
    fee: "ZMW 4,200",
    duration: "2 Years",
  },
  {
    id: "APP/2025/0108/NW",
    company: "NorthWest Exploration Ltd",
    applicant: "Simon Lungu",
    mineral: "Manganese",
    province: "North-Western",
    district: "Zambezi",
    area: "408 km²",
    submitted: "15 Oct 2025",
    lastUpdated: "06 Jun 2026",
    stage: "under_review" as StageKey,
    stepIndex: 2,
    officer: "S. Lungu",
    priority: "High",
    notes: 4,
    docs: 6,
    fee: "ZMW 16,300",
    duration: "3 Years",
  },
  {
    id: "APP/2025/0097/SO",
    company: "Zambezi Resources Ltd",
    applicant: "Mary Siakajozi",
    mineral: "Nickel",
    province: "Southern",
    district: "Livingstone",
    area: "260 km²",
    submitted: "01 Sep 2025",
    lastUpdated: "04 Jun 2026",
    stage: "committee" as StageKey,
    stepIndex: 3,
    officer: "M. Siakajozi",
    priority: "Medium",
    notes: 7,
    docs: 8,
    fee: "ZMW 10,600",
    duration: "3 Years",
  },
  {
    id: "APP/2025/0085/CB",
    company: "Chibuluma Mining Co",
    applicant: "Henry Kabwe",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Kalulushi",
    area: "185 km²",
    submitted: "15 Aug 2025",
    lastUpdated: "02 Jun 2026",
    stage: "approved" as StageKey,
    stepIndex: 4,
    officer: "Dr. K. Mwansa",
    priority: "High",
    notes: 9,
    docs: 11,
    fee: "ZMW 8,400",
    duration: "2 Years",
  },
];

const stageCounts: Record<StageKey, number> = {
  all:          applications.length,
  submitted:    applications.filter(a => a.stage === "submitted").length,
  under_review: applications.filter(a => a.stage === "under_review").length,
  awaiting:     applications.filter(a => a.stage === "awaiting").length,
  committee:    applications.filter(a => a.stage === "committee").length,
  approved:     applications.filter(a => a.stage === "approved").length,
  rejected:     applications.filter(a => a.stage === "rejected").length,
};

const kpis = [
  { label: "Total Applications", value: String(applications.length), change: "+6",  up: true,  sub: "this quarter",      icon: FolderOpen,   color: "text-blue-600",   bg: "bg-blue-50"   },
  { label: "Approved",           value: "2",  change: "+2",  up: true,  sub: "this month",        icon: BadgeCheck,   color: "text-green-600",  bg: "bg-green-50"  },
  { label: "Under Review",       value: "2",  change: "+1",  up: false, sub: "awaiting officers", icon: Hourglass,    color: "text-amber-600",  bg: "bg-amber-50"  },
  { label: "Rejected",           value: "1",  change: "0",   up: true,  sub: "this quarter",      icon: XCircle,      color: "text-red-500",    bg: "bg-red-50"    },
];

const priorityConfig: Record<string, string> = {
  High:   "bg-red-50 text-red-600 border-red-200",
  Medium: "bg-amber-50 text-amber-600 border-amber-200",
  Low:    "bg-slate-100 text-slate-500 border-slate-200",
};

type Application = typeof applications[0];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepTrail({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="flex items-center gap-0 w-full">
      {STEPS.map((step, i) => {
        const done    = i < stepIndex;
        const current = i === stepIndex;
        return (
          <div key={step} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                done    ? "bg-[#1a3a5c] border-[#1a3a5c]"
                : current ? "bg-white border-[#f5a623] shadow-[0_0_0_3px_rgba(245,166,35,0.18)]"
                : "bg-white border-slate-200"
              }`}>
                {done && <CheckCircle2 size={9} className="text-white" />}
                {current && <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-0.5 ${i < stepIndex ? "bg-[#1a3a5c]" : "bg-slate-100"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StageChip({ stageKey }: { stageKey: StageKey }) {
  const cfg = STAGES.find(s => s.key === stageKey)!;
  const icons: Record<StageKey, React.ReactNode> = {
    all:          <CircleDot size={10} />,
    submitted:    <FileText size={10} />,
    under_review: <Hourglass size={10} />,
    awaiting:     <Paperclip size={10} />,
    committee:    <User size={10} />,
    approved:     <BadgeCheck size={10} />,
    rejected:     <XCircle size={10} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {icons[stageKey]}
      {cfg.label}
    </span>
  );
}

function ApplicationCard({ app, onClick }: { app: Application; onClick: () => void }) {
  const stageColor = STAGES.find(s => s.key === app.stage)?.color ?? "#64748b";

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
    >
      <div className="pl-4 pr-4 pt-4 pb-3 flex flex-col gap-3 flex-1">

        {/* Top row: ID + priority + stage */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-mono text-[11px] font-bold text-[#1a3a5c]">{app.id}</span>
            <p className="text-xs font-semibold text-slate-700 mt-0.5 leading-snug">{app.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <StageChip stageKey={app.stage} />
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-semibold ${priorityConfig[app.priority]}`}>
              {app.priority}
            </Badge>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {[
            { icon: <Pickaxe size={10} className="text-slate-400" />,  value: app.mineral   },
            { icon: <MapPin size={10} className="text-slate-400" />,   value: app.province  },
            { icon: <User size={10} className="text-slate-400" />,     value: app.applicant },
            { icon: <Building2 size={10} className="text-slate-400" />,value: app.district  },
          ].map(({ icon, value }, i) => (
            <div key={i} className="flex items-center gap-1">
              {icon}
              <span className="text-[11px] text-slate-500 truncate">{value}</span>
            </div>
          ))}
        </div>

        {/* Step trail */}
        <div>
          <p className="text-[10px] text-slate-400 mb-1.5 font-medium">{STEPS[app.stepIndex]}</p>
          <StepTrail stepIndex={app.stepIndex} />
          <div className="flex justify-between mt-1">
            {STEPS.map((s, i) => (
              <span key={s} className={`text-[8px] ${i === app.stepIndex ? "text-[#f5a623] font-bold" : "text-slate-300"}`} style={{ width: `${100 / STEPS.length}%`, textAlign: "center" }}>
                {s.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span className="flex items-center gap-0.5"><Calendar size={9} /> {app.submitted}</span>
          <span className="flex items-center gap-0.5"><MessageSquare size={9} /> {app.notes}</span>
          <span className="flex items-center gap-0.5"><Paperclip size={9} /> {app.docs}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-[#1a3a5c] transition-colors">
            <Eye size={12} />
          </button>
          {app.stage !== "approved" && app.stage !== "rejected" && (
            <>
              <button className="p-1 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-600 transition-colors">
                <ThumbsUp size={12} />
              </button>
              <button className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                <ThumbsDown size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const [activeStage,    setActiveStage]    = useState<StageKey>("all");
  const [search,         setSearch]         = useState("");
  const [showFilters,    setShowFilters]    = useState(false);
  const [selectedApp,    setSelectedApp]    = useState<Application | null>(null);
  const [lastRefresh,    setLastRefresh]    = useState("Today, 09:15 WAT");
  const [mineralFilter,  setMineralFilter]  = useState("All Minerals");
  const [provinceFilter, setProvinceFilter] = useState("All Provinces");

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch   = a.id.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.applicant.toLowerCase().includes(q);
    const matchStage    = activeStage === "all" || a.stage === activeStage;
    const matchMineral  = mineralFilter  === "All Minerals"  || a.mineral  === mineralFilter;
    const matchProvince = provinceFilter === "All Provinces" || a.province === provinceFilter;
    return matchSearch && matchStage && matchMineral && matchProvince;
  });

  const hasFilters = mineralFilter !== "All Minerals" || provinceFilter !== "All Provinces";

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto bg-slate-50 min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 sm:p-6 text-white"
        style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 55%, #152e4d 100%)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.04] bg-white translate-x-24 -translate-y-24 pointer-events-none" />
        <div className="absolute bottom-0 right-40 w-40 h-40 rounded-full opacity-10 bg-[#f5a623] translate-y-20 pointer-events-none" />

        <div className="relative pl-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-semibold">Live Queue</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold">FY 2025/26</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              Licence Application Management
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Track, review, and process all mineral exploration applications across{" "}
              <span className="text-white/80 font-medium">all Country</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-white/40 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <Activity size={11} className="text-emerald-400" />
              <span>{lastRefresh}</span>
            </div>
            <Button size="sm" variant="outline" className="text-xs border-white/20 text-white/70 hover:text-white hover:bg-white/10 bg-transparent gap-1.5 h-8" onClick={() => setLastRefresh("Just now")}>
              <RefreshCw size={11} />Refresh
            </Button>
            <Badge className="bg-[#f5a623] text-[#1a3a5c] hover:bg-[#f5a623] text-xs px-3 py-1 font-bold">MMMD</Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="relative pl-3 mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { label: "Total Applications", value: String(applications.length), icon: FolderOpen   },
            { label: "Approved",           value: "2",                          icon: BadgeCheck   },
            { label: "Under Review",       value: "2",                          icon: Hourglass    },
            { label: "Awaiting Docs",      value: "1",                          icon: Paperclip    },
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

      {/* ── KPI Strip ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map(({ label, value, change, up, sub, icon: Icon, color, bg }) => (
          <Card key={label} className="border border-slate-200 shadow-sm bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`${bg} ${color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                  <Icon size={15} />
                </div>
                <div className="flex items-center gap-0.5">
                  {up ? <ArrowUpRight size={11} className="text-green-500" /> : <ArrowDownRight size={11} className="text-red-400" />}
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

      {/* ── Application Pipeline ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Application Pipeline</h3>
          <span className="text-[10px] text-slate-400">{applications.length} total applications</span>
        </div>

        {/* Pipeline flow — full-width responsive stage cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 w-full">
          {STAGES.filter(s => s.key !== "all").map(({ key, label, color, bg, text, border }) => {
            const count      = stageCounts[key];
            const isActive   = activeStage === key;
            const isApproved = key === "approved";
            const isRejected = key === "rejected";

            const stageIcons: Record<string, React.ReactNode> = {
              submitted:    <FileText   size={15} />,
              under_review: <Hourglass  size={15} />,
              awaiting:     <Paperclip  size={15} />,
              committee:    <User       size={15} />,
              approved:     <BadgeCheck size={15} />,
              rejected:     <XCircle    size={15} />,
            };

            return (
              <button
                key={key}
                onClick={() => setActiveStage(isActive ? "all" : key)}
                className={`
                  relative w-full flex flex-col justify-between
                  rounded-2xl px-4 py-4 text-left
                  border transition-all duration-200 focus:outline-none
                  ${isActive
                    ? isApproved ? "bg-green-600 border-green-600 shadow-lg scale-[1.02]"
                      : isRejected ? "bg-red-500 border-red-500 shadow-lg scale-[1.02]"
                      : "bg-[#1a3a5c] border-[#1a3a5c] shadow-lg scale-[1.02]"
                    : `${bg} ${border} hover:shadow-md hover:scale-[1.01]`
                  }
                `}
              >
                {/* Top: icon + count */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? "bg-white/15" : "bg-white shadow-sm"}`}
                    style={{ color: isActive ? "#fff" : color }}
                  >
                    {stageIcons[key]}
                  </div>
                  <span className={`text-3xl font-black leading-none tabular-nums ${isActive ? "text-white" : text}`}>
                    {count}
                  </span>
                </div>

                {/* Label */}
                <p className={`text-xs font-bold leading-snug ${isActive ? "text-white" : "text-slate-700"}`}>
                  {label}
                </p>

                {/* Mini progress strip */}
                <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: isActive ? "rgba(255,255,255,0.2)" : "#e2e8f0" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(4, Math.round((count / applications.length) * 100))}%`,
                      background: isActive ? "#fff" : color,
                    }}
                  />
                </div>
                <p className={`text-[9px] mt-1 font-medium ${isActive ? "text-white/60" : "text-slate-400"}`}>
                  {Math.round((count / applications.length) * 100)}% of total
                </p>

                {/* Active caret */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 border-b border-r border-slate-200 bg-slate-50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Show-all link */}
        {activeStage !== "all" && (
          <button
            onClick={() => setActiveStage("all")}
            className="mt-2 text-[11px] text-[#1a3a5c] font-semibold hover:underline flex items-center gap-1"
          >
            <X size={10} />Clear stage filter — show all {applications.length} applications
          </button>
        )}
      </div>

      {/* ── Search & Filters ─────────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <div className="relative flex-1 min-w-0">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by ID, company, or applicant name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c] bg-white"
          />
        </div>
        <Button size="sm" variant="outline" className="border-slate-300 gap-1.5 text-xs h-9 shrink-0" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={13} />Filters
          <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </Button>
        {hasFilters && (
          <Button size="sm" variant="ghost" className="text-xs text-red-500 gap-1 h-9 shrink-0" onClick={() => { setMineralFilter("All Minerals"); setProvinceFilter("All Provinces"); }}>
            <X size={12} />Clear
          </Button>
        )}
        <div className="ml-auto shrink-0 flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">{filtered.length} application{filtered.length !== 1 ? "s" : ""}</span>
          <Button size="sm" variant="ghost" className="h-9 text-xs text-slate-500 gap-1.5 px-2 border border-slate-200 hover:border-slate-300">
            <Download size={12} />Export
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 gap-3 -mt-3">
          {[
            { value: mineralFilter,  setter: setMineralFilter,  options: ["All Minerals","Copper","Cobalt","Lithium","Gold","Emerald","Manganese","Nickel","Uranium"] },
            { value: provinceFilter, setter: setProvinceFilter, options: ["All Provinces","Copperbelt","North-Western","Southern","Eastern","Luapula","Lusaka"] },
          ].map(({ value, setter, options }, i) => (
            <select key={i} value={value} onChange={(e) => setter(e.target.value)}
              className="h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
              {options.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}
        </div>
      )}

      {/* ── Application Cards Grid ───────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <FolderOpen size={28} className="text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-400">No applications match your filters</p>
          <p className="text-xs text-slate-300">Try a different stage or clear the search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-xs text-slate-400">
          Data shown is for prototype demonstration purposes only · Reference: MMMD/GRZ/IRM/IT/200/2026
        </p>
      </div>

      {/* ── Application Detail Modal ─────────────────────────────────────────── */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="sticky top-0 rounded-t-2xl px-6 py-5 flex items-start justify-between"
              style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 100%)" }}
            >
              <div>
                <p className="text-[#f5a623] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Application Detail</p>
                <h3 className="text-white font-bold text-lg font-mono leading-none">{selectedApp.id}</h3>
                <p className="text-white/60 text-sm mt-1">{selectedApp.company}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Status chips */}
              <div className="flex flex-wrap gap-2 items-center">
                <StageChip stageKey={selectedApp.stage} />
                <Badge variant="outline" className={`text-xs px-2.5 py-0.5 font-semibold ${priorityConfig[selectedApp.priority]}`}>
                  {selectedApp.priority} Priority
                </Badge>
                <Badge variant="outline" className="text-xs px-2.5 py-0.5 border-slate-200 text-slate-600">
                  <MapPin size={10} className="mr-1" />{selectedApp.province}
                </Badge>
              </div>

              {/* Progress trail */}
              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Application Progress</p>
                <StepTrail stepIndex={selectedApp.stepIndex} />
                <div className="flex justify-between mt-1.5">
                  {STEPS.map((s, i) => (
                    <span key={s} className={`text-[9px] text-center leading-tight ${i === selectedApp.stepIndex ? "text-[#f5a623] font-bold" : i < selectedApp.stepIndex ? "text-[#1a3a5c] font-semibold" : "text-slate-300"}`} style={{ width: `${100 / STEPS.length}%` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Applicant",       value: selectedApp.applicant,    icon: <User size={12} />       },
                  { label: "Company",         value: selectedApp.company,      icon: <Building2 size={12} />  },
                  { label: "Mineral Type",    value: selectedApp.mineral,      icon: <Pickaxe size={12} />    },
                  { label: "Province",        value: selectedApp.province,     icon: <MapPin size={12} />     },
                  { label: "District",        value: selectedApp.district,     icon: <MapPin size={12} />     },
                  { label: "Area Requested",  value: selectedApp.area,         icon: <FileText size={12} />   },
                  { label: "Duration",        value: selectedApp.duration,     icon: <Clock size={12} />      },
                  { label: "Application Fee", value: selectedApp.fee,          icon: <AlertTriangle size={12} />},
                  { label: "Submitted",       value: selectedApp.submitted,    icon: <Calendar size={12} />   },
                  { label: "Last Updated",    value: selectedApp.lastUpdated,  icon: <Calendar size={12} />   },
                  { label: "Assigned Officer",value: selectedApp.officer,      icon: <User size={12} />       },
                  { label: "Documents Filed", value: String(selectedApp.docs), icon: <Paperclip size={12} />  },
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

              {/* Notes count */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <MessageSquare size={16} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-700">{selectedApp.notes} Notes &amp; Comments</p>
                  <p className="text-[10px] text-blue-500">Internal review notes from assigned officers</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto text-xs border-blue-200 text-blue-600 hover:bg-blue-100 h-7 shrink-0">
                  View All
                </Button>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
                <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5">
                  <Eye size={12} />View Full Record
                </Button>
                {selectedApp.stage !== "approved" && selectedApp.stage !== "rejected" && (
                  <>
                    <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 text-white gap-1.5">
                      <ThumbsUp size={12} />Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-red-200 text-red-500 hover:bg-red-50 gap-1.5">
                      <ThumbsDown size={12} />Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5">
                  <Download size={12} />Download
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-slate-400 ml-auto" onClick={() => setSelectedApp(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
