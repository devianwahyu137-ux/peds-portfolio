import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Activity, ShieldCheck, Zap, GitCommit, Layers } from 'lucide-react';

export default function HeroAnimatedBeam() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);
    const handler = (e) => setIsTouchDevice(e.matches);
    touchQuery.addEventListener?.('change', handler);
    return () => touchQuery.removeEventListener?.('change', handler);
  }, []);

  const nodes = [
    {
      id: 'macro',
      label: 'MACRO_FEED',
      sub: 'US10Y / SBN 6.8%',
      icon: Database,
      pos: 'top-4 -left-6 lg:top-2 lg:-left-12',
      color: 'emerald',
      delay: 0,
    },
    {
      id: 'quant',
      label: 'QUANT_ENGINE',
      sub: 'MPT / Risk Matrix',
      icon: Cpu,
      pos: 'top-32 -right-4 lg:top-28 lg:-right-10',
      color: 'emerald',
      delay: 0.8,
    },
    {
      id: 'execution',
      label: 'ORDER_FLOW',
      sub: 'Low Latency <4ms',
      icon: Activity,
      pos: 'bottom-24 -left-6 lg:bottom-20 lg:-left-10',
      color: 'emerald',
      delay: 1.6,
    },
    {
      id: 'audit',
      label: 'SYSTEM_AUDIT',
      sub: 'Audited PnL Log',
      icon: ShieldCheck,
      pos: 'bottom-6 -right-2 lg:bottom-4 lg:-right-8',
      color: 'emerald',
      delay: 2.4,
    },
  ];

  return (
    <div className="absolute inset-0 -m-8 pointer-events-none overflow-visible z-0 select-none">
      {/* ── Background Cyber Radar Circles ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] lg:w-[500px] h-[340px] sm:h-[440px] lg:h-[500px] pointer-events-none">
        {/* Outer dotted radar ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/15 animate-[spin_60s_linear_infinite]" />
        
        {/* Middle pulsing ring */}
        <div className="absolute inset-8 sm:inset-12 rounded-full border border-emerald-500/20 bg-emerald-500/[0.015] shadow-[0_0_50px_rgba(16,185,129,0.05)]" />
        
        {/* Inner radar sweep beam */}
        <div className="absolute inset-16 sm:inset-20 rounded-full border border-white/5 bg-[conic-gradient(from_0deg,transparent_0_310deg,rgba(16,185,129,0.22)_360deg)] animate-[spin_8s_linear_infinite]" />
        
        {/* Core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── SVG Animated Beams ── */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 600"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Linear gradient beams traveling along paths */}
          <linearGradient id="beamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#50fa7b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#50fa7b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          <filter id="beamGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static Base Curved Guides */}
        <path
          d="M 40 70 C 120 70, 140 220, 200 290"
          fill="none"
          stroke="rgba(16, 185, 129, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 360 170 C 280 170, 260 260, 200 300"
          fill="none"
          stroke="rgba(16, 185, 129, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 40 450 C 110 440, 150 360, 200 320"
          fill="none"
          stroke="rgba(16, 185, 129, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 360 520 C 290 510, 250 380, 200 330"
          fill="none"
          stroke="rgba(16, 185, 129, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Animated Beams (Magic UI Style Pulses along paths - Desktop Only to prevent mobile GPU throttling) */}
        {!isTouchDevice && (
          <>
            <motion.path
              d="M 40 70 C 120 70, 140 220, 200 290"
              fill="none"
              stroke="url(#beamGrad1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#beamGlow)"
              initial={{ pathLength: 0.25, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.path
              d="M 360 170 C 280 170, 260 260, 200 300"
              fill="none"
              stroke="url(#beamGrad2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#beamGlow)"
              initial={{ pathLength: 0.3, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'linear',
                delay: 1,
              }}
            />

            <motion.path
              d="M 40 450 C 110 440, 150 360, 200 320"
              fill="none"
              stroke="url(#beamGrad3)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#beamGlow)"
              initial={{ pathLength: 0.28, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 1.8,
              }}
            />

            <motion.path
              d="M 360 520 C 290 510, 250 380, 200 330"
              fill="none"
              stroke="url(#beamGrad1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#beamGlow)"
              initial={{ pathLength: 0.32, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: 4.1,
                repeat: Infinity,
                ease: 'linear',
                delay: 2.4,
              }}
            />
          </>
        )}
      </svg>

      {/* ── Institutional Node Badges (Framing the Identity Card) ── */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: node.delay, duration: 0.6 }}
              className={`absolute ${node.pos} z-10`}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/25 bg-neutral-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.12)] group hover:border-emerald-400/50 transition-colors">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[9px] font-bold tracking-wider text-emerald-400">
                    {node.label}
                  </span>
                  <span className="font-mono text-[8px] text-neutral-400 tracking-tight">
                    {node.sub}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Micro Status Chip (Desktop only to prevent mobile overlap) */}
      <div className="hidden lg:flex absolute -bottom-8 left-1/2 -translate-x-1/2 items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-neutral-950/70 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
          Neural Architecture: <span className="text-emerald-400 font-semibold">Active</span>
        </span>
      </div>
    </div>
  );
}
