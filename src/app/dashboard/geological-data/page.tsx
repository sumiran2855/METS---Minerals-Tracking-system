"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FlaskConical,
  Search,
  Filter,
  Download,
  Eye,
  MapPin,
  Calendar,
  ChevronDown,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  RefreshCw,
  Layers,
  Database,
  Mountain,
  Microscope,
  Radio,
  Upload,
  FileText,
  Globe,
  Cpu,
  Pickaxe,
  BookOpen,
  ChevronRight,
  TrendingUp,
  ZoomIn,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const geoRecords = [
  {
    id: "GD/2026/041/CB",
    type: "Borehole Log",
    formation: "Katanga Supergroup",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Kitwe",
    depth: "420 m",
    date: "12 Mar 2026",
    status: "Published",
    analyst: "Dr. K. Mwansa",
    grade: "3.2% Cu",
    method: "Diamond Drilling",
  },
  {
    id: "GD/2026/039/NW",
    type: "Geochemical Survey",
    formation: "Muva Supergroup",
    mineral: "Cobalt",
    province: "North-Western",
    district: "Solwezi",
    depth: "—",
    date: "08 Mar 2026",
    status: "Under Review",
    analyst: "R. Banda",
    grade: "0.8% Co",
    method: "Stream Sediment",
  },
  {
    id: "GD/2026/037/SO",
    type: "Aeromagnetic Survey",
    formation: "Basement Complex",
    mineral: "Lithium",
    province: "Southern",
    district: "Choma",
    depth: "—",
    date: "01 Mar 2026",
    status: "Published",
    analyst: "P. Zulu",
    grade: "N/A",
    method: "Airborne Magnetic",
  },
  {
    id: "GD/2026/035/EA",
    type: "Rock Sample",
    formation: "Karoo Sequence",
    mineral: "Gold",
    province: "Eastern",
    district: "Chipata",
    depth: "Surface",
    date: "22 Feb 2026",
    status: "Pending Analysis",
    analyst: "E. Nkonde",
    grade: "1.4 g/t Au",
    method: "Grab Sampling",
  },
  {
    id: "GD/2026/030/LU",
    type: "Borehole Log",
    formation: "Katanga Supergroup",
    mineral: "Emerald",
    province: "Luapula",
    district: "Mansa",
    depth: "185 m",
    date: "14 Feb 2026",
    status: "Published",
    analyst: "G. Mutale",
    grade: "Gem Quality",
    method: "Core Drilling",
  },
  {
    id: "GD/2026/027/CB",
    type: "Gravity Survey",
    formation: "Muva Supergroup",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Ndola",
    depth: "—",
    date: "05 Feb 2026",
    status: "Published",
    analyst: "H. Kabwe",
    grade: "2.9% Cu",
    method: "Ground Gravity",
  },
  {
    id: "GD/2026/023/NW",
    type: "Geochemical Survey",
    formation: "Basement Complex",
    mineral: "Manganese",
    province: "North-Western",
    district: "Zambezi",
    depth: "—",
    date: "28 Jan 2026",
    status: "Under Review",
    analyst: "S. Lungu",
    grade: "18% Mn",
    method: "Soil Sampling",
  },
  {
    id: "GD/2025/198/SO",
    type: "Seismic Survey",
    formation: "Karoo Sequence",
    mineral: "Nickel",
    province: "Southern",
    district: "Livingstone",
    depth: "—",
    date: "10 Dec 2025",
    status: "Published",
    analyst: "M. Siakajozi",
    grade: "1.1% Ni",
    method: "Seismic Reflection",
  },
  {
    id: "GD/2025/185/EA",
    type: "Rock Sample",
    formation: "Basement Complex",
    mineral: "Uranium",
    province: "Eastern",
    district: "Petauke",
    depth: "Surface",
    date: "01 Nov 2025",
    status: "Restricted",
    analyst: "D. Phiri",
    grade: "320 ppm U",
    method: "Channel Sampling",
  },
  {
    id: "GD/2025/172/CB",
    type: "Borehole Log",
    formation: "Katanga Supergroup",
    mineral: "Copper",
    province: "Copperbelt",
    district: "Kalulushi",
    depth: "630 m",
    date: "15 Oct 2025",
    status: "Published",
    analyst: "A. Tembo",
    grade: "4.1% Cu",
    method: "Reverse Circulation",
  },
];

const depthTrend = [
  { month: "Jan", boreholes: 8,  avgDepth: 312 },
  { month: "Feb", boreholes: 12, avgDepth: 387 },
  { month: "Mar", boreholes: 10, avgDepth: 420 },
  { month: "Apr", boreholes: 15, avgDepth: 445 },
  { month: "May", boreholes: 18, avgDepth: 398 },
  { month: "Jun", boreholes: 14, avgDepth: 463 },
];

const surveysByType = [
  { name: "Borehole Logs",       value: 38, color: "#1a3a5c" },
  { name: "Geochemical",         value: 27, color: "#f5a623" },
  { name: "Aeromagnetic",        value: 18, color: "#3b82f6" },
  { name: "Rock Samples",        value: 22, color: "#10b981" },
  { name: "Gravity / Seismic",   value: 12, color: "#8b5cf6" },
];

const gradeByMineral = [
  { mineral: "Copper",    avg: 3.2,  unit: "% Cu",   color: "#1a3a5c" },
  { mineral: "Cobalt",    avg: 0.8,  unit: "% Co",   color: "#f5a623" },
  { mineral: "Lithium",   avg: 1.4,  unit: "% Li₂O", color: "#3b82f6" },
  { mineral: "Gold",      avg: 2.1,  unit: "g/t",    color: "#10b981" },
  { mineral: "Manganese", avg: 18.4, unit: "% Mn",   color: "#8b5cf6" },
];

const recordsByProvince = [
  { province: "Copperbelt",    records: 58, published: 44, pending: 14 },
  { province: "North-Western", records: 47, published: 31, pending: 16 },
  { province: "Southern",      records: 32, published: 24, pending: 8  },
  { province: "Eastern",       records: 28, published: 19, pending: 9  },
  { province: "Luapula",       records: 21, published: 16, pending: 5  },
  { province: "Lusaka",        records: 14, published: 10, pending: 4  },
];

const geochemTrend = [
  { month: "Jan", samples: 42 },
  { month: "Feb", samples: 58 },
  { month: "Mar", samples: 51 },
  { month: "Apr", samples: 73 },
  { month: "May", samples: 89 },
  { month: "Jun", samples: 76 },
];

const recentActivity = [
  { id: "GD/2026/041/CB", type: "Borehole Log",      status: "Published",       mineral: "Copper",    date: "12 Mar 2026" },
  { id: "GD/2026/039/NW", type: "Geochemical Survey",status: "Under Review",    mineral: "Cobalt",    date: "08 Mar 2026" },
  { id: "GD/2026/037/SO", type: "Aeromagnetic Survey",status: "Published",      mineral: "Lithium",   date: "01 Mar 2026" },
  { id: "GD/2026/035/EA", type: "Rock Sample",        status: "Pending Analysis",mineral: "Gold",     date: "22 Feb 2026" },
  { id: "GD/2026/030/LU", type: "Borehole Log",       status: "Published",      mineral: "Emerald",   date: "14 Feb 2026" },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const statusConfig: Record<string, { color: string; dot: string }> = {
  Published:         { color: "bg-green-50 text-green-700 border-green-200",   dot: "bg-green-500"   },
  "Under Review":    { color: "bg-blue-50 text-blue-700 border-blue-200",      dot: "bg-blue-500"    },
  "Pending Analysis":{ color: "bg-amber-50 text-amber-700 border-amber-200",   dot: "bg-amber-500"   },
  Restricted:        { color: "bg-red-50 text-red-700 border-red-200",         dot: "bg-red-500"     },
  Archived:          { color: "bg-slate-100 text-slate-500 border-slate-200",  dot: "bg-slate-400"   },
};

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  "Borehole Log":         { icon: <Pickaxe size={11} />,    color: "text-[#1a3a5c] bg-blue-50 border-blue-200"    },
  "Geochemical Survey":   { icon: <FlaskConical size={11} />,color:"text-amber-700 bg-amber-50 border-amber-200"   },
  "Aeromagnetic Survey":  { icon: <Radio size={11} />,       color: "text-purple-700 bg-purple-50 border-purple-200"},
  "Rock Sample":          { icon: <Mountain size={11} />,    color: "text-green-700 bg-green-50 border-green-200"  },
  "Gravity Survey":       { icon: <Cpu size={11} />,         color: "text-teal-700 bg-teal-50 border-teal-200"     },
  "Seismic Survey":       { icon: <Activity size={11} />,    color: "text-rose-700 bg-rose-50 border-rose-200"     },
};

const kpis = [
  { label: "Total Records",     value: "200",  change: "+24", up: true,  sub: "all data types",    icon: Database,     color: "text-blue-600",   bg: "bg-blue-50"   },
  { label: "Borehole Logs",     value: "77",   change: "+8",  up: true,  sub: "this quarter",      icon: Pickaxe,      color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Geochemical",       value: "54",   change: "+11", up: true,  sub: "survey records",    icon: FlaskConical, color: "text-amber-600",  bg: "bg-amber-50"  },
  { label: "Rock Samples",      value: "43",   change: "+6",  up: true,  sub: "analysed samples",  icon: Mountain,     color: "text-green-600",  bg: "bg-green-50"  },
  { label: "Published Reports", value: "144",  change: "+18", up: true,  sub: "publicly available",icon: BookOpen,     color: "text-teal-600",   bg: "bg-teal-50"   },
  { label: "Pending Analysis",  value: "23",   change: "+5",  up: false, sub: "awaiting results",  icon: Clock,        color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Survey Coverage",   value: "68%",  change: "+4%", up: true,  sub: "national territory",icon: Globe,        color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Restricted Files",  value: "9",    change: "-2",  up: true,  sub: "classified data",   icon: AlertTriangle,color: "text-red-500",    bg: "bg-red-50"    },
];

const provinces   = ["All Provinces", "Copperbelt", "North-Western", "Southern", "Eastern", "Luapula", "Lusaka"];
const dataTypes   = ["All Types", "Borehole Log", "Geochemical Survey", "Aeromagnetic Survey", "Rock Sample", "Gravity Survey", "Seismic Survey"];
const statuses    = ["All Statuses", "Published", "Under Review", "Pending Analysis", "Restricted", "Archived"];
const formations  = ["All Formations", "Katanga Supergroup", "Muva Supergroup", "Basement Complex", "Karoo Sequence"];

type GeoRecord = typeof geoRecords[0];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GeologicalDataPage() {
  const [search,          setSearch]          = useState("");
  const [provinceFilter,  setProvinceFilter]  = useState("All Provinces");
  const [typeFilter,      setTypeFilter]      = useState("All Types");
  const [statusFilter,    setStatusFilter]    = useState("All Statuses");
  const [formationFilter, setFormationFilter] = useState("All Formations");
  const [showFilters,     setShowFilters]     = useState(false);
  const [selectedRecord,  setSelectedRecord]  = useState<GeoRecord | null>(null);
  const [showUpload,      setShowUpload]      = useState(false);
  const [lastRefresh,     setLastRefresh]     = useState("Today, 09:15 WAT");

  const filtered = geoRecords.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch    = r.id.toLowerCase().includes(q) || r.formation.toLowerCase().includes(q) || r.district.toLowerCase().includes(q) || r.mineral.toLowerCase().includes(q);
    const matchProvince  = provinceFilter  === "All Provinces"   || r.province   === provinceFilter;
    const matchType      = typeFilter      === "All Types"        || r.type       === typeFilter;
    const matchStatus    = statusFilter    === "All Statuses"     || r.status     === statusFilter;
    const matchFormation = formationFilter === "All Formations"   || r.formation  === formationFilter;
    return matchSearch && matchProvince && matchType && matchStatus && matchFormation;
  });

  const clearFilters = () => {
    setSearch(""); setProvinceFilter("All Provinces"); setTypeFilter("All Types");
    setStatusFilter("All Statuses"); setFormationFilter("All Formations");
  };

  const hasFilters = search || provinceFilter !== "All Provinces" || typeFilter !== "All Types" || statusFilter !== "All Statuses" || formationFilter !== "All Formations";

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
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-semibold">Live Repository</span>
              </div>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold">FY 2025/26</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              Geological Data Repository
            </h2>
            <p className="text-white/50 text-sm mt-1">
              National geoscience data — boreholes, surveys, samples &amp; formations across{" "}
              <span className="text-white/80 font-medium">the Republic of Zambia</span>
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
              MMMD-GDR
            </Badge>
          </div>
        </div>

        {/* Headline stats */}
        <div
          className="relative pl-3 mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { label: "Total Records",     value: "200", icon: Database     },
            { label: "Borehole Logs",     value: "77",  icon: Pickaxe      },
            { label: "Geochemical",       value: "54",  icon: FlaskConical },
            { label: "Survey Coverage",   value: "68%", icon: Globe        },
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
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Data Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map(({ label, value, change, up, sub, icon: Icon, color, bg }) => (
            <Card
              key={label}
              className="border border-slate-200 shadow-sm bg-white group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
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
      </div>

      {/* ── Analytics Row ────────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Analytics &amp; Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Borehole Drilling Trend — Line Chart */}
          <Card className="lg:col-span-7 border border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-[#f5a623]" />
                  <CardTitle className="text-sm font-semibold text-slate-700">Borehole Depth &amp; Count Trends — 2026</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs border-slate-200 text-slate-500">Jan – Jun</Badge>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-4">
              {/* Summary row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Total Boreholes", value: "77",     color: "#1a3a5c", sub: "drilled YTD"     },
                  { label: "Max Depth",       value: "463 m",  color: "#f5a623", sub: "recorded in Jun" },
                  { label: "Avg Depth",       value: "404 m",  color: "#10b981", sub: "across all sites" },
                ].map(({ label, value, color, sub }) => (
                  <div key={label} className="bg-slate-50 rounded-xl border border-slate-100 px-3 py-2.5">
                    <p className="text-lg font-bold" style={{ color }}>{value}</p>
                    <p className="text-xs font-semibold text-slate-600 leading-tight">{label}</p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={175}>
                <LineChart data={depthTrend} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="depthLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f5a623" />
                      <stop offset="100%" stopColor="#1a3a5c" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={24} domain={[0, 25]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} domain={[250, 500]} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    labelStyle={{ fontWeight: 700, color: "#1e293b" }}
                  />
                  <ReferenceLine yAxisId="right" y={404} stroke="#10b981" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Avg", fontSize: 9, fill: "#10b981", position: "insideTopRight" }} />
                  <Line yAxisId="left"  type="monotone" dataKey="boreholes" stroke="#1a3a5c" strokeWidth={2.5} dot={{ r: 4, fill: "#1a3a5c", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} name="Boreholes" />
                  <Line yAxisId="right" type="monotone" dataKey="avgDepth"  stroke="#f5a623" strokeWidth={2.5} dot={{ r: 4, fill: "#f5a623", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} name="Avg Depth (m)" strokeDasharray="6 2" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-5 mt-2 justify-center">
                <div className="flex items-center gap-2">
                  <svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="#1a3a5c" strokeWidth="2.5" /><circle cx="11" cy="5" r="3.5" fill="#1a3a5c" stroke="#fff" strokeWidth="1.5" /></svg>
                  <span className="text-xs text-slate-500">Boreholes drilled</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="22" height="10"><line x1="0" y1="5" x2="6" y2="5" stroke="#f5a623" strokeWidth="2.5" /><line x1="8" y1="5" x2="14" y2="5" stroke="#f5a623" strokeWidth="2.5" /><line x1="16" y1="5" x2="22" y2="5" stroke="#f5a623" strokeWidth="2.5" /><circle cx="11" cy="5" r="3.5" fill="#f5a623" stroke="#fff" strokeWidth="1.5" /></svg>
                  <span className="text-xs text-slate-500">Avg depth (m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="22" height="10"><line x1="0" y1="5" x2="6" y2="5" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" /><line x1="10" y1="5" x2="16" y2="5" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" /></svg>
                  <span className="text-xs text-slate-500">Average baseline</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Trend + Grade — stacked right column */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Sample Collection Trend */}
            <Card className="border border-slate-200 shadow-sm bg-white flex-1">
              <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={13} className="text-[#f5a623]" />
                    <CardTitle className="text-sm font-semibold text-slate-700">Samples Collected — 2026</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight size={12} className="text-green-500" />
                    <span className="text-sm font-semibold text-green-600">+81%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 py-3">
                <p className="text-2xl font-bold text-slate-800 mb-1">389 <span className="text-xs font-normal text-slate-400">samples YTD</span></p>
                <ResponsiveContainer width="100%" height={75}>
                  <AreaChart data={geochemTrend}>
                    <defs>
                      <linearGradient id="geochem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a3a5c" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 10, borderRadius: 4, border: "1px solid #e2e8f0" }} />
                    <Area type="monotone" dataKey="samples" stroke="#1a3a5c" strokeWidth={2} fill="url(#geochem)" dot={false} name="Samples" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Average Grade Indicators */}
            <Card className="border border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Microscope size={13} className="text-[#f5a623]" />
                  <CardTitle className="text-sm font-semibold text-slate-700">Avg. Grade by Mineral</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-5 py-3">
                <div className="space-y-2.5">
                  {gradeByMineral.map(({ mineral, avg, unit, color }) => (
                    <div key={mineral}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                          <span className="text-xs font-medium text-slate-700">{mineral}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{avg} <span className="text-slate-400 font-normal">{unit}</span></span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min((avg / 20) * 100, 100)}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Province Coverage + Recent Activity ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Province Coverage — tile grid */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#f5a623]" />
                <CardTitle className="text-sm font-semibold text-slate-700">Records by Province</CardTitle>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">6 provinces covered</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {recordsByProvince.map(({ province, records, published, pending }, i) => {
                const rate = Math.round((published / records) * 100);
                const initial = province.charAt(0);
                const isTop = i === 0;
                return (
                  <div
                    key={province}
                    className={`relative rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default ${
                      isTop
                        ? "border-[#1a3a5c]/20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a44] text-white"
                        : "border-slate-200 bg-slate-50 hover:bg-white"
                    }`}
                  >
                    {/* Watermark initial */}
                    <span
                      className="absolute top-0 right-1 text-6xl font-black leading-none select-none pointer-events-none"
                      style={{ opacity: isTop ? 0.07 : 0.05, color: isTop ? "#fff" : "#1a3a5c" }}
                    >
                      {initial}
                    </span>

                    <div className="relative p-3">
                      {/* Rank + rate */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                          isTop ? "bg-[#f5a623] text-[#1a3a5c]" : "bg-slate-200 text-slate-500"
                        }`}>
                          {i + 1}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isTop
                            ? "bg-white/15 text-white"
                            : rate >= 80 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {rate}%
                        </span>
                      </div>

                      {/* Total */}
                      <p className={`text-2xl font-black leading-none ${isTop ? "text-white" : "text-slate-800"}`}>
                        {records}
                      </p>
                      <p className={`text-[10px] font-semibold mt-0.5 leading-tight truncate ${isTop ? "text-white/60" : "text-slate-500"}`}>
                        {province}
                      </p>

                      {/* Published / Pending */}
                      <div className="flex items-center gap-2 mt-2.5 pt-2" style={{ borderTop: isTop ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e2e8f0" }}>
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${isTop ? "bg-emerald-400" : "bg-green-500"}`} />
                          <span className={`text-[10px] font-semibold ${isTop ? "text-white/80" : "text-green-700"}`}>{published}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className={`text-[10px] font-semibold ${isTop ? "text-white/80" : "text-amber-700"}`}>{pending}</span>
                        </div>
                        <span className={`text-[10px] ml-auto ${isTop ? "text-white/40" : "text-slate-400"}`}>rec.</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-slate-400">Published</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs text-slate-400">Pending</span>
              </div>
              <span className="text-xs text-slate-400 ml-auto">% = publish rate</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2 pt-4 px-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={13} className="text-[#f5a623]" />
                <CardTitle className="text-sm font-semibold text-slate-700">Recent Submissions</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-[#1a3a5c] h-6 px-2 gap-1">
                View all <ChevronRight size={10} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div className="space-y-0.5 flex-1 min-w-0 mr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-[#1a3a5c] truncate">{item.id}</span>
                    <span className="text-[10px] text-slate-400 border border-slate-200 px-1 py-0.5 rounded shrink-0">{item.mineral}</span>
                  </div>
                  <p className="text-xs text-slate-600">{item.type}</p>
                  <p className="text-[10px] text-slate-400">{item.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0.5 font-medium shrink-0 ${statusConfig[item.status]?.color}`}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Records Table ────────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Geological Data Registry</h3>
        <Card className="border border-slate-200 shadow-sm bg-white">

          {/* Search & Filters */}
          <CardContent className="p-4 space-y-3 border-b border-slate-100">
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 min-w-0">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by record ID, mineral, formation, or district…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-7 text-sm"
                />
              </div>
              <Button size="sm" variant="outline" className="border-slate-300 gap-1.5 text-xs shrink-0" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={13} />Filters
                <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
              <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5 shrink-0" onClick={() => setShowUpload(true)}>
                <Upload size={13} />Upload Data
              </Button>
              {hasFilters && (
                <Button size="sm" variant="ghost" className="text-xs text-red-500 hover:text-red-600 gap-1 shrink-0" onClick={clearFilters}>
                  <X size={12} />Clear
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {[
                  { value: provinceFilter,  setter: setProvinceFilter,  options: provinces  },
                  { value: typeFilter,      setter: setTypeFilter,      options: dataTypes  },
                  { value: statusFilter,    setter: setStatusFilter,    options: statuses   },
                  { value: formationFilter, setter: setFormationFilter, options: formations },
                ].map(({ value, setter, options }, i) => (
                  <select key={i} value={value} onChange={(e) => setter(e.target.value)}
                    className="h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ))}
              </div>
            )}
          </CardContent>

          {/* Table meta */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Database size={13} className="text-[#f5a623]" />
              <span className="text-sm font-semibold text-slate-700">Data Records</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Showing {filtered.length} of {geoRecords.length} records</span>
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
                  {["Record ID", "Type", "Formation", "Mineral", "Province", "Depth / Surface", "Method", "Grade / Value", "Date", "Status", ""].map((h) => (
                    <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wide px-4 py-3 first:px-5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-16">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <FlaskConical size={20} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-medium text-slate-400">No records match your filters</p>
                        <p className="text-xs text-slate-300">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((record, idx) => (
                    <tr
                      key={record.id}
                      className={`border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer group ${idx % 2 === 0 ? "" : "bg-slate-50/40"}`}
                      onClick={() => setSelectedRecord(record)}
                    >
                      <td className="px-5 py-3">
                        <span className="font-mono text-xs font-bold text-[#1a3a5c]">{record.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 font-medium flex items-center gap-1 w-fit ${typeConfig[record.type]?.color}`}
                        >
                          {typeConfig[record.type]?.icon}
                          {record.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-slate-700 whitespace-nowrap">{record.formation}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{record.mineral}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap">
                          <MapPin size={10} className="text-slate-400" />{record.province}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{record.depth}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{record.method}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold text-[#1a3a5c]">{record.grade}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
                          <Calendar size={10} className="text-slate-400" />{record.date}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig[record.status]?.dot}`} />
                          <span className={`text-[10px] font-semibold ${statusConfig[record.status]?.color.split(" ")[1]}`}>
                            {record.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-slate-300 hover:text-[#1a3a5c] opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); setSelectedRecord(record); }}
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
          Data shown is for prototype demonstration purposes only · Reference: MMMD/GRZ/ICT/CS/002/2026
        </p>
      </div>

      {/* ── Record Detail Modal ──────────────────────────────────────────────── */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedRecord(null)}
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
                <p className="text-[#f5a623] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  Geological Record · Detail View
                </p>
                <h3 className="text-white font-bold text-lg font-mono leading-none">{selectedRecord.id}</h3>
                <p className="text-white/60 text-sm mt-1">{selectedRecord.type} · {selectedRecord.formation}</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Status badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={`text-xs px-3 py-1 font-medium ${statusConfig[selectedRecord.status]?.color}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusConfig[selectedRecord.status]?.dot}`} />
                  {selectedRecord.status}
                </Badge>
                <Badge variant="outline" className={`text-xs px-3 py-1 font-medium flex items-center gap-1 ${typeConfig[selectedRecord.type]?.color}`}>
                  {typeConfig[selectedRecord.type]?.icon}
                  {selectedRecord.type}
                </Badge>
                <Badge variant="outline" className="text-xs px-3 py-1 border-slate-200 text-slate-600">
                  <MapPin size={10} className="mr-1" />{selectedRecord.province}
                </Badge>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Geological Formation", value: selectedRecord.formation,  icon: <Mountain size={12} />    },
                  { label: "Primary Mineral",       value: selectedRecord.mineral,   icon: <Pickaxe size={12} />     },
                  { label: "Survey / Drill Method", value: selectedRecord.method,    icon: <Cpu size={12} />         },
                  { label: "Depth / Coverage",      value: selectedRecord.depth,     icon: <ArrowDownRight size={12} />},
                  { label: "Grade / Value",          value: selectedRecord.grade,    icon: <ZoomIn size={12} />      },
                  { label: "District",               value: selectedRecord.district, icon: <MapPin size={12} />      },
                  { label: "Date of Survey",         value: selectedRecord.date,     icon: <Calendar size={12} />    },
                  { label: "Analyst / Geologist",    value: selectedRecord.analyst,  icon: <FlaskConical size={12} />},
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

              {/* Sample / Grade Analysis */}
              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Analysis Summary</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Confidence", value: selectedRecord.status === "Published" ? "High" : "Pending", color: selectedRecord.status === "Published" ? "text-green-600" : "text-amber-600" },
                    { label: "Data Quality", value: "Grade A", color: "text-blue-600" },
                    { label: "Peer Reviewed", value: selectedRecord.status === "Published" ? "Yes" : "No", color: selectedRecord.status === "Published" ? "text-green-600" : "text-slate-400" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <p className={`text-sm font-bold ${color}`}>{value}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* GIS Placeholder */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">Survey Location — GIS Map</p>
                <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-2">
                  <Globe size={28} className="text-slate-300" />
                  <p className="text-sm text-slate-400 font-semibold">GIS Map View</p>
                  <p className="text-xs text-slate-400">{selectedRecord.province} — {selectedRecord.district}</p>
                  <Badge variant="outline" className="text-[10px] border-slate-300 text-slate-400 mt-1">
                    Leaflet.js integration — Phase 2
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-slate-100">
                <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5">
                  <FileText size={12} />View Full Report
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5">
                  <Download size={12} />Download Data
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-slate-400 hover:text-slate-600 ml-auto" onClick={() => setSelectedRecord(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Upload Data Modal ────────────────────────────────────────────────── */}
      {showUpload && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowUpload(false)}
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
                <p className="text-[#f5a623] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">New Submission</p>
                <h3 className="text-white font-bold text-base leading-none">Upload Geological Data</h3>
              </div>
              <button onClick={() => setShowUpload(false)} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Data Type</label>
                  <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                    {["Borehole Log","Geochemical Survey","Aeromagnetic Survey","Rock Sample","Gravity Survey","Seismic Survey"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Primary Mineral</label>
                  <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                    {["Copper","Cobalt","Lithium","Gold","Emerald","Manganese","Nickel","Uranium"].map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Province</label>
                  <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                    {["Copperbelt","North-Western","Lusaka","Southern","Eastern","Luapula"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Geological Formation</label>
                  <select className="w-full h-9 text-sm border border-slate-300 rounded-md px-3 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a3a5c]">
                    {["Katanga Supergroup","Muva Supergroup","Basement Complex","Karoo Sequence"].map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">District / Location</label>
                <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. Kitwe, Copperbelt Province" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Drill Depth (if applicable)</label>
                  <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. 420 m" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Grade / Assay Value</label>
                  <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="e.g. 3.2% Cu" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Analyst / Responsible Geologist</label>
                <Input className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" placeholder="Full name and designation" />
              </div>

              {/* File upload zone */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center gap-2 hover:border-[#1a3a5c]/30 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                  <Upload size={18} className="text-slate-400 group-hover:text-[#1a3a5c] transition-colors" />
                </div>
                <p className="text-sm font-semibold text-slate-600">Drop data files here or <span className="text-[#1a3a5c]">browse</span></p>
                <p className="text-xs text-slate-400">Supports CSV, Excel, PDF, LAS, SEG-Y · Max 50 MB</p>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5 flex-1" onClick={() => setShowUpload(false)}>
                  <CheckCircle2 size={12} />Submit Record
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 gap-1.5"
                  onClick={() => setShowUpload(false)}
                >
                  <X size={12} />Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
