import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Maximize2, 
  X, 
  LineChart, 
  Globe, 
  Activity, 
  Terminal,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { BentoGrid, BentoCard } from './BentoGrid';

export default function ProjectsBentoSection() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = (url, e) => {
    if (e) e.stopPropagation();
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewUrl(null);
  };

  return (
    <section id="the-builder" className="relative w-full py-8 scroll-mt-24">
      {/* ── Section Title & Ambient Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[400px] bg-emerald-500/5 blur-[160px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em]">
              Quantitative Architecture & Research
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            The Builder Archive
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline-block">
            ACETERNITY SPOTLIGHT • 6-COLUMN MATRIX
          </span>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs">
            5 NODES DEPLOYED
          </div>
        </div>
      </div>

      {/* ── Bento Grid Structure: 6-Column Layout ── */}
      <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-auto">
        
        {/* ── KARTU 1: KIRI ATAS (lg:col-span-3 - 50% width) ── */}
        <BentoCard
          className="col-span-1 md:col-span-1 lg:col-span-3 relative overflow-hidden"
          badge="EQUITY RESEARCH"
          subtitle="STATUTORY INTELLIGENCE"
          icon={LineChart}
          title="Meridian Market Intelligence"
          spotlightColor="rgba(16, 185, 129, 0.22)"
          borderColor="rgba(16, 185, 129, 0.5)"
        >
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Mobile Compact Landscape Row */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0 relative">
                <img
                  src="/meridian-dashboard.png"
                  alt="Meridian Market Intelligence"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="64"
                  className="w-full h-full object-cover object-top opacity-90"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <span className="font-mono text-[10px] text-emerald-400 truncate">
                  100% Primary Statutory Data
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                  Meridian Market Intelligence
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={(e) => openPreview('https://meridian-market-intelligence-ivory.vercel.app/', e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://meridian-market-intelligence-ivory.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Full Layout */}
            <div className="hidden md:flex flex-col justify-between w-full h-full">
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-white/10 bg-black group-hover:border-emerald-500/30 transition-all">
                <img
                  src="/meridian-dashboard.png"
                  alt="Meridian Market Intelligence"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                {/* Floating Action Chips */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(e) => openPreview('https://meridian-market-intelligence-ivory.vercel.app/', e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono hover:bg-emerald-500 hover:text-black transition-all"
                    title="Live In-App Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://meridian-market-intelligence-ivory.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Headline / Sub-badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/80 border border-emerald-500/30 font-mono text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>100% Primary Statutory Data • Stochastic DCF Engine</span>
                </div>
              </div>

              {/* Description & Tags */}
              <div className="mt-3 flex flex-col justify-end">
                <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-3">
                  Independent buy-side equity and macroeconomic research desk delivering institutional-grade rigor across Indonesian capital markets. Features 20 statutory publications, a 1,000-run Monte Carlo Stochastic DCF valuation engine, and Nelson-Siegel sovereign yield curve modeling with zero commercial bias.
                </p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                  {['TypeScript', 'Next.js', 'Monte Carlo DCF', 'Nelson-Siegel', 'Financial Forensics'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:border-emerald-500/20 group-hover:text-emerald-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── KARTU 2: KANAN ATAS (lg:col-span-3 - 50% width) ── */}
        <BentoCard
          className="col-span-1 md:col-span-1 lg:col-span-3 relative overflow-hidden"
          badge="FINTECH VENTURE"
          subtitle="ALTERNATIVE FINANCING"
          icon={Zap}
          title="NEMOS Ecosystem"
          spotlightColor="rgba(56, 189, 248, 0.22)"
          borderColor="rgba(56, 189, 248, 0.5)"
        >
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Mobile Compact Landscape Row */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0 relative">
                <img
                  src="/nemos-ecosystem.webp"
                  alt="NEMOS Ecosystem"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="64"
                  className="w-full h-full object-cover object-top opacity-90"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <span className="font-mono text-[10px] text-sky-400 truncate">
                  Top 4 BI Hackathon • AI Underwriting
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                  NEMOS Ecosystem
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={(e) => openPreview('https://nemos-three.vercel.app/', e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[10px] font-mono hover:bg-sky-400 hover:text-black transition-all"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://nemos-three.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-sky-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Full Layout */}
            <div className="hidden md:flex flex-col justify-between w-full h-full">
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-white/10 bg-black group-hover:border-sky-500/30 transition-all">
                <img
                  src="/nemos-ecosystem.webp"
                  alt="NEMOS Ecosystem"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                {/* Floating Action Chips */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(e) => openPreview('https://nemos-three.vercel.app/', e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono hover:bg-sky-400 hover:text-black transition-all"
                    title="Live In-App Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://nemos-three.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-sky-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Headline / Sub-badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/80 border border-sky-500/30 font-mono text-[10px] text-sky-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  <span>Top 4 BI Hackathon • AI Credit Scoring Pipeline</span>
                </div>
              </div>

              {/* Description & Tags */}
              <div className="mt-3 flex flex-col justify-end">
                <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-3">
                  Alternative revenue-based financing platform designed to bridge liquidity gaps for Indonesian MSMEs. Engineered an automated risk-adjusted credit underwriting engine with cash flow deconstruction, securing Top 4 National Finalist honors at PIDI Digdaya x Bank Indonesia Hackathon 2026.
                </p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                  {['React', 'Python / FastAPI', 'Fintech Lending', 'MindsDB', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:border-sky-500/20 group-hover:text-sky-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── KARTU 3: KIRI BAWAH (lg:col-span-2 - 1/3 width) ── */}
        <BentoCard
          className="col-span-1 md:col-span-1 lg:col-span-2 relative overflow-hidden"
          badge="MACRO QUANT"
          subtitle="PORTFOLIO INTELLIGENCE"
          icon={Activity}
          title="Macroscope Axis"
          spotlightColor="rgba(168, 85, 247, 0.2)"
          borderColor="rgba(168, 85, 247, 0.4)"
        >
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Mobile Compact Landscape Row */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-neutral-900 shrink-0 relative">
                <img
                  src="/sovereign_axis_dashboard.webp"
                  alt="Macroscope Dashboard"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="64"
                  className="w-full h-full object-cover opacity-85"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <span className="font-mono text-[10px] text-purple-400 truncate">
                  Econometrics • MPT Covariance
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                  Macroscope Axis
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={(e) => openPreview('https://peds-final.vercel.app/', e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono hover:bg-purple-400 hover:text-black transition-all"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://peds-final.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Full Layout */}
            <div className="hidden md:flex flex-col justify-between w-full h-full">
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group-hover:border-purple-500/30 transition-all">
                <img
                  src="/sovereign_axis_dashboard.webp"
                  alt="Macroscope Dashboard"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="340"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  <button
                    onClick={(e) => openPreview('https://peds-final.vercel.app/', e)}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-purple-400 transition-colors"
                    title="Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://peds-final.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-purple-500/30 font-mono text-[9px] text-purple-400 truncate max-w-[90%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping shrink-0" />
                  <span className="truncate">Econometric Transmission • MPT Covariance</span>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-neutral-300 leading-relaxed mb-3 line-clamp-3">
                  Macro-financial simulation terminal analyzing empirical policy transmissions between central bank rates, SBN sovereign yield durations, and equity performance. Integrates Modern Portfolio Theory (MPT) variance-covariance algorithms and tail-risk stress testing.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                  {['React', 'Python', 'Supabase', 'Zustand', 'Econometrics'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:border-purple-500/20 group-hover:text-purple-300 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── KARTU 4: TENGAH BAWAH (lg:col-span-2 - 1/3 width) ── */}
        <BentoCard
          className="col-span-1 md:col-span-1 lg:col-span-2 relative overflow-hidden"
          badge="FLAGSHIP DSS"
          subtitle="DECISION SUPPORT SYSTEM"
          icon={Terminal}
          title="PEDS Terminal DSS"
          spotlightColor="rgba(245, 158, 11, 0.2)"
          borderColor="rgba(245, 158, 11, 0.4)"
        >
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Mobile Compact Landscape Row */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-neutral-900 shrink-0 relative">
                <img
                  src="/peds-terminal.webp"
                  alt="PEDS Terminal DSS"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="64"
                  className="w-full h-full object-cover opacity-85"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <span className="font-mono text-[10px] text-amber-400 truncate">
                  TradingView Engine • MPT Risk
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                  PEDS Terminal DSS
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={(e) => openPreview('https://peds-terminal.vercel.app/', e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-400 hover:text-black transition-all"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://peds-terminal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Full Layout */}
            <div className="hidden md:flex flex-col justify-between w-full h-full">
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group-hover:border-amber-500/30 transition-all">
                <img
                  src="/peds-terminal.webp"
                  alt="PEDS Terminal DSS"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="340"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  <button
                    onClick={(e) => openPreview('https://peds-terminal.vercel.app/', e)}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-amber-400 transition-colors"
                    title="Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://peds-terminal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-amber-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-amber-500/30 font-mono text-[9px] text-amber-400 truncate max-w-[90%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                  <span className="truncate">TradingView Engine • Automated MPT Risk</span>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-neutral-300 leading-relaxed mb-3 line-clamp-3">
                  Proprietary institutional decision support system integrating real-time macroeconomic feeds, order book imbalance tracking, automated risk-budgeting parameters, and algorithmic execution analytics.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                  {['TradingView Lightweight', 'REST API', 'Vite', 'Macro Engine', 'Quantitative Risk'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:border-amber-500/20 group-hover:text-amber-300 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── KARTU 5: KANAN BAWAH (lg:col-span-2 - 1/3 width) ── */}
        <BentoCard
          className="col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden"
          badge="PUBLIC SECTOR"
          subtitle="REGIONAL GOVERNANCE"
          icon={Globe}
          title="Desa Surorejo Portal"
          spotlightColor="rgba(16, 185, 129, 0.2)"
          borderColor="rgba(16, 185, 129, 0.4)"
        >
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Mobile Compact Landscape Row */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-neutral-900 shrink-0 relative">
                <img
                  src="/beranda web surorejo.webp"
                  alt="Desa Surorejo Portal"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="64"
                  className="w-full h-full object-cover opacity-85"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <span className="font-mono text-[10px] text-emerald-400 truncate">
                  Public Sector • Governance GIS
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                  Desa Surorejo Portal
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    onClick={(e) => openPreview('https://beranda-surorejo.vercel.app/', e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview</span>
                  </button>
                  <a
                    href="https://beranda-surorejo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Full Layout */}
            <div className="hidden md:flex flex-col justify-between w-full h-full">
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group-hover:border-emerald-500/30 transition-all">
                <img
                  src="/beranda web surorejo.webp"
                  alt="Desa Surorejo Portal"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="340"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  <button
                    onClick={(e) => openPreview('https://beranda-surorejo.vercel.app/', e)}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-emerald-400 transition-colors"
                    title="Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://beranda-surorejo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-emerald-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/30 font-mono text-[9px] text-emerald-400 truncate max-w-[90%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="truncate">GIS Mapping • Civic Transparency Index</span>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-neutral-300 leading-relaxed mb-3 line-clamp-3">
                  Regional governance portal delivering public budget transparency, spatial GIS cadastral mapping, citizen administrative routing, and economic analytics for rural community empowerment.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                  {['React', 'Leaflet GIS', 'Tailwind', 'Public API', 'Open Government'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:border-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

      </BentoGrid>

      {/* ── Live Iframe Preview Modal (Native Bottom Sheet on Mobile, Modal on Desktop) ── */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePreview}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 120 }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 300) {
                  closePreview();
                }
              }}
              className="relative w-full md:max-w-6xl h-[90vh] md:h-[85vh] bg-neutral-950 border-t md:border border-emerald-500/30 rounded-t-3xl md:rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.18)] flex flex-col overflow-hidden z-10 touch-pan-y"
            >
              {/* Mobile Drag Handle Bar */}
              <div className="md:hidden w-full flex justify-center py-2.5 bg-neutral-900/90 border-b border-white/5 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full bg-neutral-600" />
              </div>

              {/* Browser Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 md:py-3 border-b border-emerald-500/20 bg-neutral-900/90 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={closePreview}
                    className="w-3.5 h-3.5 md:w-3 md:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group cursor-pointer"
                    aria-label="Close Preview"
                  >
                    <X className="w-2.5 h-2.5 md:w-2 md:h-2 text-black opacity-100 md:opacity-0 group-hover:opacity-100" />
                  </button>
                  <div className="hidden md:block w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="hidden md:block w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 md:ml-3 font-mono text-[10px] md:text-[11px] text-neutral-400 tracking-wider truncate max-w-[170px] sm:max-w-[220px] md:max-w-md">
                    Terminal Preview: {previewUrl}
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 font-mono text-[11px] md:text-xs text-emerald-400 hover:bg-emerald-500 hover:text-black flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold"
                  >
                    <span>Open in Tab</span>
                    <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </a>
                </div>
              </div>

              {/* Sub-header CSP Notice Bar */}
              <div className="px-4 py-2 bg-neutral-900/60 border-b border-white/5 flex items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-2 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    Deployment Vercel menerapkan proteksi X-Frame-Options / CSP. Jika layar kosong:
                  </span>
                </div>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline shrink-0 flex items-center gap-1 font-semibold"
                >
                  <span>Buka Langsung ↗</span>
                </a>
              </div>

              {/* Iframe Viewport with Fallback Card */}
              <div className="flex-grow bg-neutral-950 w-full h-full relative overflow-hidden">
                {/* Fallback Card (Visible if iframe is blank or fails) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <ExternalLink className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-2 tracking-tight">
                    Aplikasi Siap Diluncurkan
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
                    Aplikasi ini menerapkan proteksi keamanan CSP / X-Frame-Options tingkat institusi sehingga disarankan untuk dibuka langsung pada tab peramban mandiri.
                  </p>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold tracking-wider hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
                  >
                    <span>Buka Aplikasi di Tab Baru (Open Live Site)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Iframe Live Content */}
                <iframe
                  src={previewUrl}
                  className="absolute inset-0 w-full h-full border-0 z-10 bg-transparent"
                  title="Live Institutional Preview"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />

                {/* Floating Quick Action Button in bottom-right corner */}
                <div className="absolute bottom-4 right-4 z-20">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950/90 border border-emerald-500/40 backdrop-blur-md text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono text-xs font-semibold shadow-xl transition-all"
                  >
                    <span>Buka Aplikasi di Tab Baru (Open Live Site)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
