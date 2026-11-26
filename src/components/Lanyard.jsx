import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate, animate } from 'framer-motion';
import { User, RotateCw, Wifi, ShieldCheck } from 'lucide-react';

// Deterministic 21x21 QR-style verification matrix SVG
const QR_MATRIX = [
  1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1,
  1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,
  1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,1,
  1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1,
  1,0,0,0,0,0,1,0,1,0,1,1,0,0,1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,
  0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,
  1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,
  0,1,0,1,1,0,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0,
  1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,1,1,1,0,1,1,
  0,1,0,1,0,0,0,1,1,0,0,1,0,1,1,0,0,1,1,0,0,
  1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,
  0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,
  1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,0,1,1,0,1,
  1,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,1,0,1,1,0,
  1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,0,0,1,
  1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,1,1,0,1,
  1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,1,0,0,1,1,0,
  1,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,1,
  1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,
];

export default function Lanyard({ className = '' }) {
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cumulativeAngle = useRef(0);
  const cardBoundsRef = useRef(null);

  // Drag & pendulum physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZraw = useTransform(x, [-250, 250], [-26, 26]);
  const rotateZ = useSpring(rotateZraw, { stiffness: 180, damping: 8 });

  // Continuous 3D Y-axis flip rotation
  const cardRotateY = useMotionValue(0);
  const cardRotateYSpring = useSpring(cardRotateY, { stiffness: 130, damping: 16 });

  // Pointer-reactive 3D tilt
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const tiltX = useSpring(tiltXRaw, { stiffness: 220, damping: 22 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 220, damping: 22 });

  // Dynamic specular glare position
  const glarePosX = useMotionValue(50);
  const glarePosY = useMotionValue(30);
  const glareBackground = useMotionTemplate`radial-gradient(circle 220px at ${glarePosX}% ${glarePosY}%, rgba(255,255,255,0.22), rgba(16,185,129,0.12) 40%, transparent 72%)`;

  // Face visibility
  const frontOpacity = useTransform(cardRotateYSpring, (v) => {
    const norm = ((v % 360) + 360) % 360;
    return norm > 90 && norm < 270 ? 0 : 1;
  });
  const backOpacity = useTransform(cardRotateYSpring, (v) => {
    const norm = ((v % 360) + 360) % 360;
    return norm > 90 && norm < 270 ? 1 : 0;
  });

  // Holographic sheen transforms
  const glareX = useTransform(x, [-160, 160], ['-60%', '120%']);
  const glareRotate = useTransform(x, [-160, 160], [-18, 18]);

  // ─── Branded Loop Lanyard Strap Path (anchored at top pin 175, 42) ───
  const endX = useTransform(x, (v) => 175 + v);
  const endY = useTransform(y, (v) => 165 + v);
  const leftCtrlX = useTransform(x, (v) => 122 + v * 0.45);
  const rightCtrlX = useTransform(x, (v) => 228 + v * 0.45);
  const midCtrlY = useTransform(y, (v) => 104 + v * 0.45);

  // Full closed loop path for the woven branded ribbon + textPath
  const loopRibbonD = useMotionTemplate`M 175 42 C ${leftCtrlX} 42, ${leftCtrlX} ${midCtrlY}, ${endX} ${endY} C ${rightCtrlX} ${midCtrlY}, ${rightCtrlX} 42, 175 42`;

  const handlePointerMove = (e) => {
    if (isDragging || !cardBoundsRef.current) return;
    const rect = cardBoundsRef.current;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    tiltXRaw.set((0.5 - py) * 14);
    tiltYRaw.set((px - 0.5) * 14);
    glarePosX.set(px * 100);
    glarePosY.set(py * 100);
  };

  const handlePointerEnter = (e) => {
    cardBoundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handlePointerLeave = () => {
    cardBoundsRef.current = null;
    tiltXRaw.set(0);
    tiltYRaw.set(0);
    glarePosX.set(50);
    glarePosY.set(30);
  };

  const handleFlipClick = (e) => {
    e.stopPropagation();
    const nextAngle = cumulativeAngle.current + 180;
    cumulativeAngle.current = nextAngle;
    setIsFlipped((Math.round(nextAngle / 180) % 2) !== 0);
    animate(cardRotateY, nextAngle, {
      type: 'spring',
      stiffness: 110,
      damping: 15,
    });
  };

  const handleDrag = useCallback(
    (_, info) => {
      const rotationFromDrag = (info.offset.x / 200) * 180;
      cardRotateY.set(cumulativeAngle.current + rotationFromDrag);
    },
    [cardRotateY]
  );

  const handleDragEnd = useCallback(
    (_, info) => {
      const rotationFromDrag = (info.offset.x / 200) * 180;
      cumulativeAngle.current += rotationFromDrag;

      const velocityBoost = (info.velocity.x / 800) * 180;
      if (Math.abs(info.velocity.x) > 200) {
        cumulativeAngle.current += velocityBoost;
      }

      const snapped = Math.round(cumulativeAngle.current / 180) * 180;
      cumulativeAngle.current = snapped;
      setIsFlipped((Math.abs(Math.round(snapped / 180)) % 2) !== 0);

      animate(cardRotateY, snapped, {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      });

      setTimeout(() => setIsDragging(false), 120);
    },
    [cardRotateY]
  );

  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDragging || !isIntersecting) return;
    let controls;
    const timeout = setTimeout(() => {
      controls = animate(x, [0, 5, 0, -5, 0], {
        duration: 5.5,
        repeat: Infinity,
        ease: 'easeInOut',
      });
    }, 1500);
    return () => {
      clearTimeout(timeout);
      if (controls) controls.stop();
    };
  }, [isDragging, isIntersecting, x]);

  const barcodeW = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1];

  return (
    <div ref={containerRef} className={`relative overflow-visible ${className}`} style={{ width: '350px', height: '650px' }}>
      {/* ── Branded Loop Lanyard Strap with Printed Typography & Metallic Pin ── */}
      <svg
        className="absolute inset-0 z-10 pointer-events-none overflow-visible"
        width="350"
        height="300"
        viewBox="0 0 350 300"
      >
        <defs>
          <linearGradient id="obsidianStrap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06281e" />
            <stop offset="50%" stopColor="#0d1f19" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="strapEdgeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="chromePin" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <filter id="strapDrop">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Outer edge piping */}
        <motion.path
          d={loopRibbonD}
          fill="none"
          stroke="url(#strapEdgeGlow)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#strapDrop)"
        />

        {/* Core dark woven nylon ribbon */}
        <motion.path
          id="pedsLanyardTrack"
          d={loopRibbonD}
          fill="none"
          stroke="url(#obsidianStrap)"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle woven nylon texture */}
        <motion.path
          d={loopRibbonD}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="15"
          strokeDasharray="1.5 2.5"
        />

        {/* Printed Branded Typography along the Strap */}
        <text
          fill="#6ee7b7"
          fontSize="6.8"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontWeight="700"
          letterSpacing="2.2"
          dominantBaseline="central"
          opacity="0.88"
        >
          <textPath href="#pedsLanyardTrack" startOffset="4%">
            PEDS • QUANT • FINTECH • ANALYST • PEDS • QUANT • FINTECH • ANALYST •
          </textPath>
        </text>

        {/* Top Metallic Anchor Pin / Stud */}
        <circle cx="175" cy="42" r="10.5" fill="#020617" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" />
        <circle cx="175" cy="42" r="7.5" fill="url(#chromePin)" filter="url(#strapDrop)" />
        <circle cx="173" cy="40" r="2" fill="rgba(255,255,255,0.8)" />
      </svg>

      {/* ── Draggable Card Assembly ── */}
      <motion.div
        drag
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.55}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 8 }}
        style={{ x, y }}
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.02 }}
        className="absolute top-[156px] left-[calc(50%-150px)] md:left-[calc(50%-160px)] z-20 cursor-grab active:cursor-grabbing select-none touch-none group"
      >
        <motion.div
          style={{ rotateZ, transformStyle: 'preserve-3d' }}
          whileHover={{ filter: 'drop-shadow(0 0 24px rgba(16,185,129,0.25))' }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Realistic Brushed-Steel Swivel Clasp Assembly ── */}
          <div className="flex flex-col items-center relative z-30 -mb-2">
            {/* Nylon collar clamp */}
            <div className="w-8 h-3 rounded-sm bg-gradient-to-b from-neutral-700 to-neutral-900 border border-emerald-400/35 shadow-md" />
            {/* Swivel ring */}
            <div className="w-4 h-4 rounded-full border-2 border-neutral-300 bg-neutral-900 shadow-[0_2px_6px_rgba(0,0,0,0.8)] -mt-0.5 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            </div>
            {/* Chrome clasp body */}
            <div className="w-3.5 h-4 rounded-b-md bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-600 border border-white/30 shadow-[0_4px_10px_rgba(0,0,0,0.75)] -mt-0.5 flex items-end justify-center pb-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/80" />
            </div>
          </div>

          {/* ── 3D Perspective Layer (Pointer Tilt + Continuous Flip) ── */}
          <div
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <motion.div
              style={{
                rotateY: cardRotateYSpring,
                rotateX: tiltX,
                skewY: useTransform(tiltY, (v) => v * 0.05),
                transformStyle: 'preserve-3d',
              }}
              className="relative w-[300px] h-[400px] md:w-[320px] md:h-[425px]"
            >
              {/* ═══════ FRONT FACE ═══════ */}
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: frontOpacity,
                  transform: 'translateZ(2px)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: isFlipped ? 'none' : 'auto',
                }}
              >
                <div className="w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-br from-emerald-400/80 via-emerald-700/20 to-teal-300/70 shadow-[0_0_45px_rgba(16,185,129,0.22),0_20px_50px_rgba(0,0,0,0.85)]">
                  <div className="w-full h-full rounded-[15px] overflow-hidden bg-gradient-to-br from-[#0b1612] via-[#070b09] to-[#0a1310] relative flex flex-col">
                    {/* Top Emerald Header Banner */}
                    <div className="relative h-20 w-full bg-gradient-to-br from-emerald-900/60 via-emerald-950/80 to-teal-900/40 border-b border-emerald-500/20 shrink-0">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            'radial-gradient(rgba(52,211,153,0.45) 1px, transparent 1px)',
                          backgroundSize: '10px 10px',
                        }}
                      />

                      {/* Die-cut Slot + Header Label + Flip Button */}
                      <div className="relative z-10 px-4 pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                          <span className="text-[9px] font-mono text-emerald-300 font-bold tracking-[0.22em] uppercase">
                            PEDS // QUANT
                          </span>
                        </div>

                        <div className="w-11 h-2.5 rounded-full bg-black border border-emerald-500/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)]" />

                        <button
                          type="button"
                          onClick={handleFlipClick}
                          onPointerDown={(e) => e.stopPropagation()}
                          className="p-1 rounded-md bg-black/40 border border-white/15 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
                          title="Flip Card"
                          aria-label="Flip ID Card to Back"
                        >
                          <RotateCw className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Pointer-reactive specular reflection */}
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: glareBackground }}
                    />

                    {/* Holographic Iridescent PVC Sheen */}
                    <motion.div
                      className="pointer-events-none absolute -inset-10 z-20 opacity-20 group-hover:opacity-50 transition-opacity duration-300 mix-blend-color-dodge"
                      style={{
                        background:
                          'linear-gradient(115deg, transparent 22%, rgba(255,255,255,0.28) 36%, rgba(56,189,248,0.22) 46%, rgba(80,250,123,0.28) 60%, rgba(255,255,255,0.3) 74%, transparent 88%)',
                        x: glareX,
                        rotate: glareRotate,
                      }}
                    />

                    {/* Centered Portrait Overlapping Header Band */}
                    <div className="relative z-10 flex justify-center -mt-9 px-4 shrink-0">
                      <div className="relative w-full h-[196px] md:h-[208px] rounded-xl overflow-hidden border-2 border-emerald-400/55 shadow-[0_10px_32px_rgba(0,0,0,0.85),0_0_28px_rgba(16,185,129,0.28)] bg-neutral-900">
                        {!imageError ? (
                          <img
                            src="/profile.webp"
                            alt="Devian Wahyu Nugroho"
                            width="288"
                            height="208"
                            decoding="async"
                            className="w-full h-full object-cover object-[center_60%]"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                            <User className="w-16 h-16 text-neutral-600" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-black/85 to-transparent" />
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="font-mono text-[8px] tracking-widest text-neutral-300 uppercase">
                            ANALYST // MEMBER
                          </span>
                          <span className="font-mono text-[8px] tracking-widest text-emerald-300 uppercase font-semibold">
                            ● VERIFIED
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Identity */}
                    <div className="relative z-10 text-center px-4 pt-2.5 shrink-0">
                      <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-tight leading-tight">
                        Devian Wahyu Nugroho
                      </h3>
                      <p className="text-[11px] md:text-xs font-mono text-emerald-300 mt-0.5">
                        Quantitative Analyst &amp; FinTech Builder
                      </p>
                    </div>

                    {/* Discipline Tags */}
                    <div className="relative z-10 flex flex-wrap justify-center gap-1.5 px-4 pt-2 shrink-0">
                      {['Quant', 'FinTech', 'AI/ML', 'Macro'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[9px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Compact Smart Chip + NFC Row */}
                    <div className="relative z-10 px-4 pt-2 pb-1.5 flex items-center justify-between shrink-0 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-5 rounded-[4px] bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 border border-amber-200/60 shadow-sm relative overflow-hidden">
                          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-900/50" />
                          <div className="absolute inset-y-0 left-1/3 w-[1px] bg-amber-900/50" />
                          <div className="absolute inset-y-0 right-1/3 w-[1px] bg-amber-900/50" />
                        </div>
                        <Wifi className="w-3.5 h-3.5 text-emerald-400/60 rotate-90" />
                      </div>
                      <span className="font-mono text-[8px] tracking-[0.2em] text-emerald-400/80 uppercase">
                        L4 ACCESS • TRADERS FAMILY
                      </span>
                    </div>

                    {/* Security Barcode Footer */}
                    <div className="relative z-10 px-4 py-2 border-t border-emerald-500/15 bg-black/50 shrink-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider">
                          PEDS PASS
                        </span>
                        <span className="text-[8px] font-mono text-emerald-400/80">ID: PEDS-2026-DWN</span>
                      </div>
                      <div className="flex items-center justify-center gap-[1px]">
                        {barcodeW.map((w, i) => (
                          <div key={i} className="bg-neutral-500/75" style={{ width: `${w * 1.25}px`, height: `${7 + (i % 4)}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ═══════ BACK FACE ═══════ */}
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: backOpacity,
                  transform: 'rotateY(180deg) translateZ(2px)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: isFlipped ? 'auto' : 'none',
                }}
              >
                <div className="w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-br from-emerald-400/80 via-emerald-700/20 to-teal-300/70 shadow-[0_0_45px_rgba(16,185,129,0.22),0_20px_50px_rgba(0,0,0,0.85)]">
                  <div className="w-full h-full rounded-[15px] overflow-hidden bg-gradient-to-br from-[#09130f] via-[#0b0d0c] to-[#0d1814] relative flex flex-col justify-between">
                    {/* Holographic Sheen on Back */}
                    <motion.div
                      className="pointer-events-none absolute -inset-10 z-20 opacity-20 group-hover:opacity-45 transition-opacity duration-300 mix-blend-color-dodge"
                      style={{
                        background:
                          'linear-gradient(115deg, transparent 22%, rgba(255,255,255,0.28) 36%, rgba(56,189,248,0.22) 46%, rgba(80,250,123,0.28) 60%, rgba(255,255,255,0.3) 74%, transparent 88%)',
                        x: glareX,
                        rotate: glareRotate,
                      }}
                    />

                    {/* Top Die-Cut Slot + Flip Button */}
                    <div className="relative z-10 px-4 pt-3 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-emerald-400/80 tracking-[0.2em] uppercase">
                        PEDS NETWORK
                      </span>
                      <div className="w-11 h-2.5 rounded-full bg-black border border-emerald-500/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)]" />
                      <button
                        type="button"
                        onClick={handleFlipClick}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="p-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
                        title="Flip to Front"
                        aria-label="Flip ID Card to Front"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Realistic Brushed Magnetic Stripe */}
                    <div className="relative z-10 w-full h-9 mt-2 bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-950 border-y border-white/10 flex items-center justify-between px-4">
                      <span className="font-mono text-[8px] tracking-[0.3em] text-neutral-500 uppercase">
                        MAG-STRIPE // ISO-7811
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/70" />
                    </div>

                    {/* Middle: QR Verification + Credentials */}
                    <div className="relative z-10 px-4 py-2 flex items-center gap-3.5">
                      <div className="p-1.5 rounded-lg bg-white shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <svg width="64" height="64" viewBox="0 0 21 21" shapeRendering="crispEdges">
                          {QR_MATRIX.map((cell, idx) =>
                            cell ? (
                              <rect
                                key={idx}
                                x={idx % 21}
                                y={Math.floor(idx / 21)}
                                width="1"
                                height="1"
                                fill="#064e3b"
                              />
                            ) : null
                          )}
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5 font-mono text-[10px]">
                        <div className="flex justify-between border-b border-white/10 pb-1">
                          <span className="text-neutral-400">ROLE</span>
                          <span className="text-white font-semibold truncate">Quant &amp; Builder</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-1">
                          <span className="text-neutral-400">DESK</span>
                          <span className="text-white font-semibold truncate">Traders Family</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-1">
                          <span className="text-neutral-400">ACADEMIC</span>
                          <span className="text-white font-semibold truncate">FEB UGM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">EXP</span>
                          <span className="text-emerald-400 font-semibold">3+ Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Authorized Signature & Hologram Strip */}
                    <div className="relative z-10 px-4 space-y-2">
                      <div className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1.5 flex items-center justify-between">
                        <div>
                          <p className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest">
                            Authorized Signature
                          </p>
                          <p className="text-sm italic font-serif text-emerald-200/90 tracking-wide">
                            Devian Wahyu N.
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 via-sky-400/15 to-emerald-500/25 flex items-center justify-center font-mono text-[9px] font-bold text-emerald-300">
                          PEDS
                        </div>
                      </div>

                      <p className="text-[8px] font-mono text-neutral-400 leading-relaxed text-center">
                        Issued for quantitative research, macro risk modeling, &amp; institutional FinTech architecture.
                      </p>
                    </div>

                    {/* Bottom Hint */}
                    <div className="relative z-10 px-4 py-2 border-t border-white/10 bg-black/50 text-center">
                      <p className="text-[9px] font-mono text-emerald-400/80 tracking-widest uppercase">
                        {isFlipped ? 'Drag or Tap ↻ to Flip Front' : 'Drag to Swing • Tap ↻ to Flip'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Hint (iPad & Desktop) ── */}
      <p className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-400 tracking-wider uppercase whitespace-nowrap">
        Drag to swing • Tap ↻ to flip
      </p>
    </div>
  );
}
