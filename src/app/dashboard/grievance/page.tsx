"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Search,
  Filter,
  RefreshCw,
  Activity,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageSquareText,
  ShieldAlert,
  MapPin,
  User,
  Calendar,
  Eye,
  MessageSquare,
  CircleDot,
  Hourglass,
  BadgeCheck,
  XCircle,
  Phone,
  Mail,
  Globe,
  Send,
  Building2,
  FileText,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATUSES = [
  { key: "all",          label: "All Cases",     color: "#64748b", bg: "bg-slate-100",   text: "text-slate-600",   border: "border-slate-200"  },
  { key: "open",         label: "Open",          color: "#ef3340", bg: "bg-red-50",      text: "text-red-700",     border: "border-red-200"    },
  { key: "under_review", label: "Under Review",  color: "#f5a623", bg: "bg-amber-50",    text: "text-amber-700",   border: "border-amber-200"  },
  { key: "acknowledged", label: "Acknowledged",  color: "#0ea5e9", bg: "bg-sky-50",      text: "text-sky-700",     border: "border-sky-200"    },
  { key: "escalated",    label: "Escalated",     color: "#7c3aed", bg: "bg-purple-50",   text: "text-purple-700",  border: "border-purple-200" },
  { key: "resolved",     label: "Resolved",      color: "#198A00", bg: "bg-green-50",    text: "text-green-700",   border: "border-green-200"  },
] as const;

type StatusKey = typeof STATUSES[number]["key"];

const grievances = [
  {
    id: "GRV/2026/014",
    subject: "Water access dispute near exploration site",
    complainant: "Community Liaison Committee",
    company: "Zamcop Minerals Ltd",
    province: "Copperbelt",
    district: "Kitwe",
    category: "Environmental",
    status: "under_review" as StatusKey,
    priority: "High",
    officer: "Dr. K. Mwansa",
    filed: "12 Jun 2026",
    updated: "2 hours ago",
    notes: 4,
  },
  {
    id: "GRV/2026/013",
    subject: "Noise and dust compliance complaint",
    complainant: "Mufulira Residents Association",
    company: "Copperbelt Ventures",
    province: "Copperbelt",
    district: "Mufulira",
    category: "Compliance",
    status: "acknowledged" as StatusKey,
    priority: "Medium",
    officer: "R. Banda",
    filed: "09 Jun 2026",
    updated: "Yesterday",
    notes: 2,
  },
  {
    id: "GRV/2026/010",
    subject: "Land compensation not paid after survey",
    complainant: "Ngoni Traditional Authority",
    company: "Eastern Gold Corp",
    province: "Eastern",
    district: "Chipata",
    category: "Land Rights",
    status: "escalated" as StatusKey,
    priority: "High",
    officer: "E. Nkonde",
    filed: "30 May 2026",
    updated: "3 days ago",
    notes: 7,
  },
  {
    id: "GRV/2026/008",
    subject: "Community consultation follow-up",
    complainant: "Traditional Leadership Office",
    company: "Katanga Resources Plc",
    province: "North-Western",
    district: "Solwezi",
    category: "Community",
    status: "resolved" as StatusKey,
    priority: "Low",
    officer: "P. Zulu",
    filed: "22 May 2026",
    updated: "5 Jun 2026",
    notes: 3,
  },
  {
    id: "GRV/2026/006",
    subject: "Incomplete environmental impact report",
    complainant: "Zambia Environmental Agency",
    company: "Southern Minerals Inc",
    province: "Southern",
    district: "Choma",
    category: "Environmental",
    status: "open" as StatusKey,
    priority: "High",
    officer: "Unassigned",
    filed: "14 May 2026",
    updated: "14 May 2026",
    notes: 1,
  },
  {
    id: "GRV/2026/003",
    subject: "Access road damage by mining vehicles",
    complainant: "District Roads Authority",
    company: "NorthWest Exploration Ltd",
    province: "North-Western",
    district: "Zambezi",
    category: "Infrastructure",
    status: "resolved" as StatusKey,
    priority: "Medium",
    officer: "H. Kabwe",
    filed: "05 May 2026",
    updated: "20 May 2026",
    notes: 5,
  },
];

const statusCounts: Record<StatusKey, number> = {
  all:          grievances.length,
  open:         grievances.filter(g => g.status === "open").length,
  under_review: grievances.filter(g => g.status === "under_review").length,
  acknowledged: grievances.filter(g => g.status === "acknowledged").length,
  escalated:    grievances.filter(g => g.status === "escalated").length,
  resolved:     grievances.filter(g => g.status === "resolved").length,
};

const kpis = [
  { label: "Total Cases",   value: String(grievances.length), change: "+3",  up: false, sub: "this quarter",      icon: MessageSquareText, color: "text-blue-600",   bg: "bg-blue-50"   },
  { label: "Open",          value: "1",                       change: "-2",  up: true,  sub: "require attention",  icon: ShieldAlert,       color: "text-red-500",    bg: "bg-red-50"    },
  { label: "Escalated",     value: "1",                       change: "+1",  up: false, sub: "priority review",   icon: AlertTriangle,     color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Resolved",      value: "2",                       change: "+2",  up: true,  sub: "closed this month", icon: CheckCircle2,      color: "text-green-600",  bg: "bg-green-50"  },
];

const priorityConfig: Record<string, string> = {
  High:   "bg-red-50 text-red-600 border-red-200",
  Medium: "bg-amber-50 text-amber-600 border-amber-200",
  Low:    "bg-slate-100 text-slate-500 border-slate-200",
};

const categoryConfig: Record<string, string> = {
  Environmental: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Compliance:    "bg-blue-50 text-blue-700 border-blue-200",
  "Land Rights": "bg-orange-50 text-orange-700 border-orange-200",
  Community:     "bg-purple-50 text-purple-700 border-purple-200",
  Infrastructure:"bg-slate-100 text-slate-600 border-slate-200",
};

type Grievance = typeof grievances[0];

// ─── Contact data ────────────────────────────────────────────────────────────

const contactChannels = [
  { icon: Phone,    label: "Toll-Free Hotline",      value: "0800 600 600",                      sub: "Mon–Fri, 08:00–17:00 CAT",   color: "text-blue-600",   bg: "bg-blue-50"   },
  { icon: Mail,     label: "Email — Grievances",     value: "grievances@mmmd.gov.zm",            sub: "Response within 2 working days", color: "text-amber-600",  bg: "bg-amber-50"  },
  { icon: Mail,     label: "Email — Fraud Reports",  value: "fraud@mmmd.gov.zm",                 sub: "Confidential & secure",         color: "text-red-600",    bg: "bg-red-50"    },
  { icon: Globe,    label: "Online Portal",           value: "www.mmmd.gov.zm/grievance",         sub: "Submit & track cases online",   color: "text-purple-600", bg: "bg-purple-50" },
];

// ─── Status Chip ──────────────────────────────────────────────────────────────

function StatusChip({ statusKey }: { statusKey: StatusKey }) {
  const cfg = STATUSES.find(s => s.key === statusKey)!;
  const icons: Record<StatusKey, React.ReactNode> = {
    all:          <CircleDot size={10} />,
    open:         <ShieldAlert size={10} />,
    under_review: <Hourglass size={10} />,
    acknowledged: <MessageSquare size={10} />,
    escalated:    <AlertTriangle size={10} />,
    resolved:     <BadgeCheck size={10} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {icons[statusKey]}
      {cfg.label}
    </span>
  );
}

// (GrievanceCard removed — cases now rendered in a table)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GrievancePage() {
  const [activeStatus, setActiveStatus] = useState<StatusKey>("all");
  const [search,       setSearch]       = useState("");
  const [showFilters,  setShowFilters]  = useState(false);
  const [selected,     setSelected]     = useState<Grievance | null>(null);
  const [lastRefresh,  setLastRefresh]  = useState("Today, 09:15 WAT");
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", description: "" });
  const [formSent, setFormSent]         = useState(false);

  const filtered = grievances.filter((g) => {
    const q = search.toLowerCase();
    const matchSearch = g.id.toLowerCase().includes(q) || g.subject.toLowerCase().includes(q) || g.complainant.toLowerCase().includes(q);
    const matchStatus = activeStatus === "all" || g.status === activeStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-5 space-y-6 max-w-[1600px] mx-auto bg-slate-50 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 sm:p-6 text-white"
        style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0f2a44 55%, #152e4d 100%)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.04] bg-white translate-x-24 -translate-y-24 pointer-events-none" />
        <div className="absolute bottom-0 right-40 w-40 h-40 rounded-full opacity-10 bg-[#f5a623] translate-y-20 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-semibold">Live Queue</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-semibold">FY 2025/26</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              Grievance Management
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Track complaints, assign reviews, and monitor resolution timelines across{" "}
              <span className="text-white/80 font-medium">the Republic of Zambia</span>
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

        {/* Hero stats */}
        <div className="relative mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { label: "Total Cases",  value: String(grievances.length),         icon: MessageSquareText },
            { label: "Open",         value: String(statusCounts.open),          icon: ShieldAlert       },
            { label: "Under Review", value: String(statusCounts.under_review),  icon: Hourglass         },
            { label: "Resolved",     value: String(statusCounts.resolved),      icon: CheckCircle2      },
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

      {/* ── KPI Strip ─────────────────────────────────────────────────────────── */}
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

      {/* ── Report / Contact Section ───────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">

        {/* Contact / Report Form */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a3a5c]/10 flex items-center justify-center">
                <Send size={14} className="text-[#1a3a5c]" />
              </div>
              <div>
                <CardTitle className="text-base text-slate-900">Report a Grievance or Fraud</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Complete the form and a compliance officer will respond within 48 hours.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            {formSent ? (
              <div className="flex flex-col items-center py-10 text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-green-600" />
                </div>
                <p className="font-semibold text-slate-800">Case submitted successfully</p>
                <p className="text-sm text-slate-500">Reference number will be emailed to you within 24 hours.</p>
                <Button size="sm" variant="outline" className="mt-2 text-xs" onClick={() => { setForm({ name: "", email: "", phone: "", category: "", description: "" }); setFormSent(false); }}>
                  Submit another case
                </Button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="grv-name" className="text-xs font-semibold text-slate-700">Full Name</Label>
                    <Input id="grv-name" placeholder="e.g. James Mwale" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="grv-email" className="text-xs font-semibold text-slate-700">Email Address</Label>
                    <Input id="grv-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="grv-phone" className="text-xs font-semibold text-slate-700">Phone Number</Label>
                    <Input id="grv-phone" placeholder="+260 97 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="h-9 text-sm border-slate-300 focus-visible:ring-[#1a3a5c]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="grv-cat" className="text-xs font-semibold text-slate-700">Category</Label>
                    <select
                      id="grv-cat"
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      required
                      className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:ring-offset-0"
                    >
                      <option value="">Select category…</option>
                      <option>Environmental</option>
                      <option>Compliance</option>
                      <option>Land Rights</option>
                      <option>Community</option>
                      <option>Infrastructure</option>
                      <option>Fraud / Corruption</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="grv-desc" className="text-xs font-semibold text-slate-700">Description</Label>
                  <textarea
                    id="grv-desc"
                    rows={4}
                    placeholder="Describe the issue in detail — include location, date, parties involved, and any evidence available…"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:ring-offset-0 resize-none"
                  />
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Button type="submit" className="bg-[#1a3a5c] hover:bg-[#16324f] text-white gap-2 text-sm">
                    <Send size={14} />Submit Case
                  </Button>
                  <p className="text-[11px] text-slate-400">All submissions are treated as confidential.</p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Contact Details Card */}
        <Card className="border border-slate-200 shadow-sm bg-white h-fit">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Phone size={14} className="text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-base text-slate-900">Contact Channels</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Report fraud or register a case directly.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {contactChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div key={ch.label} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${ch.bg}`}>
                    <Icon size={14} className={ch.color} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{ch.label}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">{ch.value}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{ch.sub}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Cases Table ────────────────────────────────────────────────── */}
      <Card className="border border-slate-200 shadow-sm bg-white">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base text-slate-900">Recent Grievance Cases</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">{filtered.length} case{filtered.length !== 1 ? "s" : ""} shown</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs w-44 border-slate-300 focus-visible:ring-[#1a3a5c] bg-white"
                />
              </div>
              <Button size="sm" variant="outline" className="border-slate-300 gap-1.5 text-xs h-8 shrink-0" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={12} />Filter
              </Button>
              <Button size="sm" variant="outline" className="border-slate-300 gap-1.5 text-xs h-8 shrink-0">
                <Download size={12} />Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto px-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide w-36">Case ID</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Subject</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Complainant</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Province</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Category</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Status</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Priority</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Filed</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wide w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((g) => (
                    <TableRow
                      key={g.id}
                      onClick={() => setSelected(selected?.id === g.id ? null : g)}
                      className={`cursor-pointer transition-colors ${
                        selected?.id === g.id ? "bg-[#1a3a5c]/5 border-l-2 border-[#1a3a5c]" : "hover:bg-slate-50"
                      }`}
                    >
                      <TableCell className="font-mono text-[11px] font-bold text-[#1a3a5c] py-3">{g.id}</TableCell>
                      <TableCell className="text-sm text-slate-700 max-w-[220px] truncate py-3">{g.subject}</TableCell>
                      <TableCell className="text-xs text-slate-600 py-3">{g.complainant}</TableCell>
                      <TableCell className="py-3">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                          <MapPin size={11} className="text-slate-400" />{g.province}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-semibold ${categoryConfig[g.category] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                          {g.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3"><StatusChip statusKey={g.status} /></TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-semibold ${priorityConfig[g.priority]}`}>
                          {g.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 py-3 whitespace-nowrap">{g.filed}</TableCell>
                      <TableCell className="py-3">
                        <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#1a3a5c] transition-colors">
                          <Eye size={13} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <MessageSquareText size={20} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium text-sm">No cases match your search</p>
              <p className="text-slate-400 text-xs mt-1">Try adjusting the filters or search term</p>
              <Button size="sm" variant="outline" className="mt-4 gap-1.5 text-xs" onClick={() => { setSearch(""); setActiveStatus("all"); }}>
                <X size={12} />Clear all filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Detail Modal ─────────────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
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
                <p className="text-[#f5a623] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Grievance Case · Detail Record</p>
                <h3 className="text-white font-bold text-lg font-mono leading-none">{selected.id}</h3>
                <p className="text-white/60 text-sm mt-1">{selected.company}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 mt-0.5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Status chips */}
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip statusKey={selected.status} />
                <Badge variant="outline" className={`text-xs px-3 py-1 font-medium ${priorityConfig[selected.priority]}`}>
                  {selected.priority} Priority
                </Badge>
                <Badge variant="outline" className={`text-xs px-3 py-1 font-medium ${categoryConfig[selected.category] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                  {selected.category}
                </Badge>
                <Badge variant="outline" className="text-xs px-3 py-1 border-slate-200 text-slate-600">
                  <MapPin size={10} className="mr-1" />{selected.province}
                </Badge>
              </div>

              {/* Subject */}
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                <p className="text-sm font-semibold text-slate-800">{selected.subject}</p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Complainant",   value: selected.complainant, icon: <User size={12} />          },
                  { label: "Company",       value: selected.company,     icon: <Building2 size={12} />     },
                  { label: "Province",      value: selected.province,    icon: <MapPin size={12} />        },
                  { label: "District",      value: selected.district,    icon: <MapPin size={12} />        },
                  { label: "Assigned To",   value: selected.officer,     icon: <User size={12} />          },
                  { label: "Case Notes",    value: `${selected.notes} note${selected.notes !== 1 ? "s" : ""}`, icon: <MessageSquare size={12} /> },
                  { label: "Date Filed",    value: selected.filed,       icon: <Calendar size={12} />      },
                  { label: "Last Updated",  value: selected.updated,     icon: <Clock size={12} />         },
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

              {/* Resolution progress */}
              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Case Resolution Progress</p>
                {(() => {
                  const stages: StatusKey[] = ["open", "acknowledged", "under_review", "escalated", "resolved"];
                  const idx = stages.indexOf(selected.status);
                  const pct = selected.status === "resolved" ? 100 : Math.round(((idx < 0 ? 0 : idx) / (stages.length - 1)) * 100);
                  return (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Current Stage</span>
                        <StatusChip statusKey={selected.status} />
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            selected.status === "resolved"     ? "bg-green-500"
                            : selected.status === "escalated"  ? "bg-purple-500"
                            : selected.status === "open"       ? "bg-red-400"
                            : "bg-[#f5a623]"
                          }`}
                          style={{ width: `${Math.max(6, pct)}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-[10px] text-slate-400">Filed</span>
                        <span className="text-[10px] text-slate-400">Resolved</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* GIS placeholder */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">Incident Location — GIS Reference</p>
                <div className="w-full h-36 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-2">
                  <MapPin size={26} className="text-slate-300" />
                  <p className="text-sm text-slate-400 font-semibold">GIS Map View</p>
                  <p className="text-xs text-slate-400">{selected.province} — {selected.district}</p>
                  <Badge variant="outline" className="text-[10px] border-slate-300 text-slate-400 mt-1">
                    Leaflet.js integration — Phase 2
                  </Badge>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex gap-2 pt-1 border-t border-slate-100">
                <Button size="sm" className="text-xs bg-[#1a3a5c] hover:bg-[#15304d] text-white gap-1.5">
                  <FileText size={12} />View Full Record
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5">
                  <MessageSquare size={12} />Add Note
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-slate-300 gap-1.5">
                  <Download size={12} />Download
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-slate-400 hover:text-slate-600 ml-auto" onClick={() => setSelected(null)}>
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
