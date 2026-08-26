import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { User } from 'lucide-react';

export default function Lanyard({ className = '' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Drag motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Card rotation follows horizontal drag like a pendulum
  const rotateRaw = useTransform(x, [-200, 200], [-25, 25]);
  const rotate = useSpring(rotateRaw, { stiffness: 150, damping: 15 });

  // Dynamic strap SVG path that follows the card
  const cpX = useTransform(x, (v) => 130 + v * 0.35);
  const endX = useTransform(x, (v) => 130 + v);
  const endY = useTransform(y, (v) => 220 + v);
  const strapD = useMotionTemplate`M 130 0 Q ${cpX} 110 ${endX} ${endY}`;

  const handleClick = () => {
    if (!isDragging) setIsFlipped((prev) => !prev);
  };

  // Deterministic barcode widths
  const barcodeWidths = [2,1,1,2,1,2,1,1,2,1,2,2,1,1,2,1,2,1,1,2,1,2,1,1,2,1,2,2,1,1];

  return (
    <div className={`relative ${className}`} style={{ width: '260px', height: '590px' }}>
      {/* ── Anchor Clip ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-500 border-2 border-neutral-400 shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-neutral-700 border border-neutral-500" />
        </div>
      </div>

      {/* ── Dynamic Strap SVG ── */}
      <svg
        className="absolute top-[28px] left-0 z-10 overflow-visible pointer-events-none"
        width="260"
        height="240"
        viewBox="0 0 260 240"
      >
        <defs>
          <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="40%" stopColor="#047857" />
            <stop offset="60%" stopColor="#047857" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Shadow layer */}
        <motion.path d={strapD} stroke="rgba(0,0,0,0.4)" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* Main strap */}
        <motion.path d={strapD} stroke="url(#strapGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* Center highlight */}
        <motion.path d={strapD} stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* PEDS text on strap */}
        <motion.text
          x={useTransform(x, (v) => 130 + v * 0.15)}
          y="50"
          textAnchor="middle"
          className="fill-emerald-200/20 text-[8px] font-mono"
          style={{ letterSpacing: '0.15em' }}
        >
          PEDS
        </motion.text>
      </svg>

      {/* ── Draggable Card ── */}
      <motion.div
        drag
        dragConstraints={{ top: -60, bottom: 60, left: -160, right: 160 }}
        dragElastic={0.06}
        dragTransition={{ bounceStiffness: 250, bounceDamping: 18, power: 0.3 }}
        style={{ x, y }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 120)}
        className="absolute top-[240px] left-[calc(50%-110px)] md:left-[calc(50%-125px)] z-20 cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div style={{ rotate }} onClick={handleClick}>
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-[220px] h-[310px] md:w-[250px] md:h-[340px]"
          >
            {/* ════════ FRONT SIDE ════════ */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              {/* Gradient border wrapper */}
              <div className="w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-br from-emerald-400/60 via-emerald-800/10 to-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.2),_0_8px_32px_rgba(0,0,0,0.6)]">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1a15] via-[#0a0f0d] to-[#0d1512] relative">
                  {/* Subtle grid */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '18px 18px'
                  }} />
                  {/* Corner glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

                  {/* Header */}
                  <div className="relative z-10 px-4 pt-4 pb-1">
                    <p className="text-[8px] font-mono text-emerald-500/60 tracking-[0.3em] uppercase text-center">
                      Analyst // Member
                    </p>
                  </div>

                  {/* Photo */}
                  <div className="relative z-10 flex justify-center px-4 py-2">
                    <div className="w-[105px] h-[105px] md:w-[115px] md:h-[115px] rounded-xl overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15),_inset_0_0_20px_rgba(16,185,129,0.05)]">
                      {!imageError ? (
                        <img src="/profile.webp" alt="Devian Wahyu Nugroho" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                          <User className="w-12 h-12 text-neutral-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="relative z-10 text-center px-4 pt-1">
                    <h3 className="text-sm md:text-base font-bold text-white tracking-wide leading-tight">Devian Wahyu N.</h3>
                    <p className="text-[10px] font-mono text-emerald-400 mt-0.5 tracking-wide">Market Analyst & Builder</p>
                  </div>

                  {/* Tags */}
                  <div className="relative z-10 flex flex-wrap justify-center gap-1 px-3 pt-2">
                    {['FinTech', 'AI/ML', 'Trading'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[8px] font-mono text-emerald-300/80 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2 border-t border-emerald-500/10 bg-black/40">
                    <div className="flex justify-between mb-1">
                      <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-wider">PEDS Pass</span>
                      <span className="text-[7px] font-mono text-neutral-500">ID: PEDS-2026-DWN</span>
                    </div>
                    <div className="flex items-center justify-center gap-[1px]">
                      {barcodeWidths.map((w, i) => (
                        <div key={i} className="bg-neutral-600/80" style={{ width: `${w}px`, height: `${7 + (i % 5)}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ════════ BACK SIDE ════════ */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-br from-emerald-400/60 via-emerald-800/10 to-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.2),_0_8px_32px_rgba(0,0,0,0.6)]">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1510] via-[#0d0d0d] to-[#0f1a15] relative flex flex-col justify-between p-5">
                  {/* Corner glow */}
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

                  {/* Logo */}
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <span className="text-emerald-500 font-bold text-xl">P</span>
                    </div>
                    <p className="text-[10px] font-mono text-emerald-500/70 tracking-[0.25em] uppercase">PEDS Network</p>
                  </div>

                  {/* Stats */}
                  <div className="relative z-10 space-y-2.5 mt-3">
                    <div className="flex justify-between items-center border-b border-neutral-800/60 pb-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Experience</span>
                      <span className="text-xs font-bold text-white">3+ Years</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-neutral-800/60 pb-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Focus</span>
                      <span className="text-xs font-bold text-white">Quantitative</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-neutral-800/60 pb-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Status</span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Network</span>
                      <span className="text-xs font-bold text-white">Traders Family</span>
                    </div>
                  </div>

                  {/* Bottom hint */}
                  <p className="relative z-10 text-[8px] font-mono text-neutral-600 tracking-widest uppercase text-center mt-3">
                    Tap to flip back
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Interaction Hint ── */}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-600 tracking-wider uppercase whitespace-nowrap">
        Drag to swing · Tap to flip
      </p>
    </div>
  );
}
