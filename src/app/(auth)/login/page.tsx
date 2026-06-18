"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, ShieldCheck, AlertCircle, FileCheck, BarChart3, MapPin, Mail, Lock, ArrowRight } from "lucide-react";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1587919968590-fbc98cea6c9a?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719411606465-5143b163b608?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600363503477-a8d1d6d57dfc?q=80&w=1122&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1662986817133-50e1e633d965?q=80&w=1216&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1709489662983-3674d790b224?q=80&w=1170&auto=format&fit=crop",
];

const MARQUEE_TEXT =
  "  ·  Official Government of All Country Portal — Authorised Users Only  ·  Ministry of Mines and Minerals Development  ·  Mineral Exploration Tracking System (METS)  ·  Secure & Monitored Access  ·  MMMD/GRZ/IRM/IT/200/2026  "; 
const DISCLAIMER_TEXT = "Disclaimer: This website is a prototype/demo version developed for review and evaluation purposes only.";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@mmmd.gov.zm");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BG_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const DEMO_USERS = [
    { email: "admin@mmmd.gov.zm", password: "admin123", role: "executive", label: "MMMD Executive" },
    { email: "applicant@mets.gov.zm", password: "applicant123", role: "applicant", label: "Licence Applicant" },
    { email: "inspector@mmmd.gov.zm", password: "inspector123", role: "inspector", label: "Env. Inspector" },
    { email: "analyst@gsd.gov.zm", password: "analyst123", role: "analyst", label: "GSD Analyst" },
    { email: "public@mets.gov.zm", password: "public123", role: "public", label: "General Public" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("mets_user", JSON.stringify(user));
      if (user.role === "executive") {
        router.push("/dashboard/executive");
      } else if (user.role === "applicant") {
        router.push("/dashboard/applicant");
      } else if (user.role === "inspector") {
        router.push("/dashboard/inspector");
      } else if (user.role === "analyst") {
        router.push("/dashboard/analyst");
      } else {
        router.push("/portal");
      }
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }

    setLoading(false);
  };

  const handleDemoLogin = (user: (typeof DEMO_USERS)[0]) => {
    setEmail(user.email);
    setPassword(user.password);
    setError("");
  };

  const features = [
    { icon: FileCheck, label: "Licence Management", desc: "Track and manage exploration licences end-to-end" },
    { icon: BarChart3, label: "Compliance Monitoring", desc: "Real-time dashboards for regulatory oversight" },
    { icon: MapPin, label: "Geospatial Mapping", desc: "Integrated mapping of All Country's mineral blocks" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Government Banner — Animated Marquee */}
      <div className="hidden sm:block bg-[#1a3a5c] text-white text-xs py-1.5 overflow-hidden border-b border-white/10">
        <div className="animate-marquee">
          {MARQUEE_TEXT}{MARQUEE_TEXT}
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#1a3a5c] border-b-4 border-[#f5a623]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 border-2 border-[#f5a623]">
            <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7 text-[#1a3a5c]" />
          </div>
          <div className="min-w-0">
            <p className="text-[#f5a623] text-[10px] sm:text-xs font-medium tracking-widest uppercase">All Country</p>
            <h1 className="text-white text-sm sm:text-lg font-bold leading-tight">Ministry of Mines and Minerals Development</h1>
            <p className="text-slate-300 text-[10px] sm:text-xs tracking-wide hidden sm:block">Mineral Exploration Tracking System (METS)</p>
          </div>
          <div className="ml-auto hidden md:block">
            <Badge className="bg-[#f5a623] text-[#1a3a5c] font-semibold hover:bg-[#f5a623]">MMMD/GRZ/IRM/IT/200/2026</Badge>
          </div>
        </div>
      </header>

      {/* Prototype Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5">
        <p className="text-center text-xs sm:text-sm text-amber-900 font-medium">
          ⚠️ Disclaimer: This website is a prototype/demo version developed for review and evaluation purposes only.
        </p>
      </div>

      {/* Main Content */}
      <main className="relative flex-1">
        {/* Background image carousel — crossfade */}
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(15,23,42,0.62), rgba(26,58,92,0.66)), url('${src}')`,
              opacity: i === currentBg ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,166,35,0.24),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.14),transparent_35%)]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center min-h-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center sm:mt-20">

            {/* LEFT — Descriptive content (hidden on mobile) */}
            <div className="hidden lg:block text-white space-y-5 animate-fadein-left">
              <div>
                <p className="text-[#f5d08b] text-xs font-semibold uppercase tracking-[0.18em] mb-2">
                  Mineral Exploration Tracking System
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                  Secure digital access for All Country&apos;s mining governance.
                </h2>
                <p className="text-slate-200 text-sm mt-3 leading-relaxed">
                  Sign in to manage licences, monitor compliance, and support transparent mineral sector operations across All Country.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="space-y-3">
                {features.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="feature-item feature-hover flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20 animate-fadein-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f5a623]/20 border border-[#f5a623]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={15} className="text-[#f5d08b]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-xs text-slate-300 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="h-[3px] w-12 rounded-full bg-[#f5a623]" />
                <p className="text-white/40 text-[10px] tracking-widest uppercase">All Country</p>
              </div>
            </div>

            {/* RIGHT — Login form */}
            <div className="w-full card-entrance">
              <Card className="border-0 overflow-hidden rounded-2xl pt-0 gap-0" style={{ boxShadow: '0 32px 64px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12)' }}>

                {/* Dark navy card header */}
                <div className="bg-[#1a3a5c] px-5 pt-6 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#f5a623] flex items-center justify-center shadow-lg flex-shrink-0">
                      <ShieldCheck size={22} className="text-[#1a3a5c]" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold leading-tight">Sign In to METS</h3>
                      <p className="text-slate-400 text-xs mt-0.5">Government-issued credentials required</p>
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-white/10" />
                  <p className="text-slate-400 text-[11px] mt-3 leading-relaxed">
                    Authorised personnel only. All access is monitored and logged in accordance with GRZ ICT Policy.
                  </p>
                </div>

                {/* Form body */}
                <CardContent className="px-6 pt-6 pb-6 bg-white">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg animate-fadein-up">
                        <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Email Address
                      </Label>
                      <div className="relative input-glow">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@mmmd.gov.zm"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 pl-10 border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]/10 text-sm rounded-lg transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Password
                        </Label>
                        <a
                          href="/forgot-password"
                          className="text-xs text-[#1a3a5c] hover:text-[#f5a623] font-semibold transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative input-glow">
                        <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-11 pl-10 pr-10 border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]/10 text-sm rounded-lg transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-11 bg-[#1a3a5c] hover:bg-[#15304d] active:scale-[0.98] text-white font-semibold text-sm rounded-lg shadow-md shadow-[#1a3a5c]/30 hover:shadow-lg hover:shadow-[#1a3a5c]/40 transition-all duration-200 mt-2 btn-shimmer"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Signing in…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Sign In to Dashboard
                        </span>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <ShieldCheck size={11} className="text-slate-300" />
                      <p className="text-[10px] text-slate-400 tracking-wide">256-bit encrypted · Secure Government Portal</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-slate-400">
            © 2026 Ministry of Mines and Minerals Development, All Country. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            For technical support, contact:{" "}
            <a href="mailto:ict@mmmd.gov.zm" className="text-[#1a3a5c] hover:underline">
              ict@mmmd.gov.zm
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
