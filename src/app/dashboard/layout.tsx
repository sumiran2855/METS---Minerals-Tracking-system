"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  FlaskConical,
  BarChart3,
  MessageSquareWarning,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard",          href: "/dashboard/executive",      icon: LayoutDashboard },
  { label: "Licences (ELT)",     href: "/dashboard/licences",       icon: FileText        },
  { label: "Applications",       href: "/dashboard/applications",   icon: FolderOpen      },
  { label: "Grievance",          href: "/dashboard/grievance",      icon: MessageSquareWarning },
  { label: "Geological Data",    href: "/dashboard/geological-data",icon: FlaskConical    },
  { label: "Reports & Analytics",href: "/dashboard/reports",        icon: BarChart3       },
];

const MARQUEE_TEXT =
  "  ·  Official Government of All Country Portal — Authorised Users Only  ·  Ministry of Mines and Minerals Development  ·  Mineral Exploration Tracking System (METS)  ·  Secure & Monitored Access  ·  MMMD/GRZ/IRM/IT/200/2026  ";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; role: string; label: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mets_user");
    if (!stored) {
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("mets_user");
    router.push("/");
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col">

      {/* ── Government Marquee Banner ── */}
      <div className="hidden sm:block bg-[#1a3a5c] text-white text-xs py-1.5 overflow-hidden border-b border-white/10 shrink-0">
        <div className="animate-marquee whitespace-nowrap">
          {MARQUEE_TEXT}{MARQUEE_TEXT}
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#1a3a5c] border-b-[3px] border-[#f5a623] sticky top-0 z-40 shadow-lg shrink-0">
        <div className="px-4 sm:px-6 py-3 flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border-2 border-[#f5a623]">
              <ShieldCheck size={20} className="text-[#1a3a5c]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[#f5a623] text-[10px] font-medium tracking-widest uppercase">
                All Country
              </p>
              <h1 className="text-white text-sm font-bold leading-tight">
                Ministry of Mines and Minerals Development — METS
              </h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-white text-sm font-bold">METS</h1>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative text-white/70 hover:text-white">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f5a623] text-[#1a3a5c] text-[9px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            {user && (
              <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e09210] flex items-center justify-center text-[#1a3a5c] text-xs font-black shadow-sm">
                  {user.label.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <p className="text-white text-xs font-medium">{user.label}</p>
                  <p className="text-slate-400 text-[10px]">{user.email}</p>
                </div>
              </div>
            )}
            <Button
              onClick={handleLogout}
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 gap-1.5 text-xs"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Prototype Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5 shrink-0">
        <p className="text-center text-xs sm:text-sm text-amber-900 font-medium">
          ⚠️ Disclaimer: This website is a prototype/demo version developed for review and evaluation purposes only.
        </p>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            flex flex-col pt-4 mt-[67px] md:mt-0
          `}
        >
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
            {navItems.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-150 group overflow-hidden
                    ${active
                      ? "bg-[#1a3a5c] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#f5a623] rounded-r-full" />
                  )}
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-150
                      ${active ? "bg-white/10" : "bg-slate-100 group-hover:bg-slate-200"}
                    `}
                  >
                    <Icon
                      size={14}
                      className={active ? "text-[#f5a623]" : "text-slate-400 group-hover:text-slate-600"}
                    />
                  </div>
                  <span className="flex-1 truncate">{label}</span>
                  {active && (
                    <ChevronRight size={12} className="ml-auto text-[#f5a623]/60 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-3 border-t border-slate-100 space-y-2 shrink-0">
            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.12em] font-bold">Reference</p>
              <p className="text-[11px] text-slate-600 font-mono mt-0.5 truncate">MMMD/GRZ/IRM/IT/200/2026</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Page content */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
