import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate, animate } from 'framer-motion';
import { User } from 'lucide-react';

export default function Lanyard({ className = '' }) {
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cumulativeAngle = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pendulum Z rotation — LOW DAMPING = tuing-tuing oscillation
  const rotateZraw = useTransform(x, [-250, 250], [-30, 30]);
  const rotateZ = useSpring(rotateZraw, { stiffness: 180, damping: 7 });

  // 3D Y-axis rotation — continuous, velocity-based
  const cardRotateY = useMotionValue(0);
  const cardRotateYSpring = useSpring(cardRotateY, { stiffness: 120, damping: 14 });

  // JS-driven face visibility (replaces CSS backface-visibility which doesn't work with framer-motion)
  const frontOpacity = useTransform(cardRotateYSpring, (v) => {
    const norm = ((v % 360) + 360) % 360;
    return (norm > 90 && norm < 270) ? 0 : 1;
  });
  const backOpacity = useTransform(cardRotateYSpring, (v) => {
    const norm = ((v % 360) + 360) % 360;
    return (norm > 90 && norm < 270) ? 1 : 0;
  });

  // ─── Dual strap paths — realistic V-shape lanyard ───
  // Two straps from off-screen (around neck) converging at clasp eyelet
  const leftCpX = useTransform(x, (v) => 148 + v * 0.12);
  const rightCpX = useTransform(x, (v) => 202 + v * 0.12);
  const endX = useTransform(x, (v) => 175 + v);
  const endY = useTransform(y, (v) => 610 + v);
  const leftStrapD = useMotionTemplate`M 120 0 Q ${leftCpX} 310 ${endX} ${endY}`;
  const rightStrapD = useMotionTemplate`M 230 0 Q ${rightCpX} 310 ${endX} ${endY}`;

  const handleDrag = useCallback((event, info) => {
    // Map horizontal drag offset to Y-axis rotation
    // Moving 200px = 180° rotation (half flip)
    const rotationFromDrag = (info.offset.x / 200) * 180;
    cardRotateY.set(cumulativeAngle.current + rotationFromDrag);
  }, [cardRotateY]);

  const handleDragEnd = useCallback((event, info) => {
    // Commit the current rotation
    const rotationFromDrag = (info.offset.x / 200) * 180;
    cumulativeAngle.current += rotationFromDrag;

    // Add momentum: fast flick = extra spin
    const velocityBoost = (info.velocity.x / 800) * 180;
    if (Math.abs(info.velocity.x) > 200) {
      cumulativeAngle.current += velocityBoost;
    }

    // Snap to nearest 180° for clean front/back landing
    const snapped = Math.round(cumulativeAngle.current / 180) * 180;
    cumulativeAngle.current = snapped;

    // Animate to snapped position with spring
    animate(cardRotateY, snapped, {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    });

    setTimeout(() => setIsDragging(false), 120);
  }, [cardRotateY]);

  // ─── Idle swing animation ───
  // Gentle pendulum sway when card is at rest
  useEffect(() => {
    if (isDragging) return;
    let controls;
    const timeout = setTimeout(() => {
      controls = animate(x, [0, 6, 0, -6, 0], {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      });
    }, 1500);
    return () => {
      clearTimeout(timeout);
      if (controls) controls.stop();
    };
  }, [isDragging, x]);

  const barcodeW = [2,1,1,2,1,2,1,1,2,1,2,2,1,1,2,1,2,1,1,2,1,2,1,1,2,1,2,2,1,1];

  return (
    <div className={`relative overflow-visible ${className}`} style={{ width: '350px', height: '700px' }}>

      {/* ── Dual V-Shape Lanyard Straps (from off-screen → eyelet) ── */}
      <svg
        className="absolute left-0 z-10 pointer-events-none"
        style={{ top: '-400px', overflow: 'visible' }}
        width="350" height="1000" viewBox="0 0 350 1000"
      >
        <defs>
          <linearGradient id="strapFillL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="30%" stopColor="#047857" />
            <stop offset="60%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="strapFillR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="30%" stopColor="#065f46" />
            <stop offset="60%" stopColor="#047857" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="strapSh">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.55" />
          </filter>
          <filter id="strapGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10b981" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* ═══ LEFT STRAP ═══ */}
        <motion.path d={leftStrapD} stroke="#022c22" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.25" />
        <motion.path d={leftStrapD} stroke="url(#strapFillL)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#strapSh)" />
        <motion.path d={leftStrapD} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <motion.path d={leftStrapD} stroke="rgba(16,185,129,0.1)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
        <motion.path d={leftStrapD} stroke="rgba(255,255,255,0.03)" strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray="3 8" />
        <motion.path d={leftStrapD} stroke="rgba(16,185,129,0.06)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#strapGlow)" />

        {/* ═══ RIGHT STRAP ═══ */}
        <motion.path d={rightStrapD} stroke="#022c22" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.25" />
        <motion.path d={rightStrapD} stroke="url(#strapFillR)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#strapSh)" />
        <motion.path d={rightStrapD} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <motion.path d={rightStrapD} stroke="rgba(16,185,129,0.1)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
        <motion.path d={rightStrapD} stroke="rgba(255,255,255,0.03)" strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray="3 8" />
        <motion.path d={rightStrapD} stroke="rgba(16,185,129,0.06)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#strapGlow)" />
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
        whileTap={{ scale: 1.03 }}
        className="absolute top-[210px] left-[calc(50%-150px)] md:left-[calc(50%-160px)] z-20 cursor-grab active:cursor-grabbing select-none touch-none group"
      >
        <motion.div
          style={{ rotateZ, transformStyle: 'preserve-3d' }}
          whileHover={{ filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.25))' }}
          transition={{ duration: 0.3 }}
        >

          {/* ── Chrome Eyelet Clasp ── */}
          <div className="flex flex-col items-center mb-1">
            {/* Outer chrome ring with 3D depth */}
            <div className="relative w-9 h-9 rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.6),0_0_20px_rgba(0,0,0,0.15)]">
              {/* Chrome bezel */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-100 via-neutral-300 to-neutral-500 p-[3px]">
                {/* Inner dark hole */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]" />
              </div>
              {/* Specular highlight */}
              <div className="absolute top-[3px] left-[6px] w-3 h-1.5 bg-white/35 rounded-full blur-[1px]" />
            </div>
            {/* Short metal connector bar */}
            <div className="w-3 h-2.5 bg-gradient-to-b from-neutral-300 to-neutral-500 shadow-[0_2px_4px_rgba(0,0,0,0.4)] rounded-b-sm" />
          </div>

          {/* ── 3D Perspective Layer — continuous rotation ── */}
          <div style={{ perspective: '900px', transformStyle: 'preserve-3d' }}>
              <motion.div
                style={{ rotateY: cardRotateYSpring, transformStyle: 'preserve-3d' }}
                className="relative w-[300px] h-[370px] md:w-[320px] md:h-[395px]"
              >

                {/* ═══════ FRONT ═══════ */}
                <motion.div className="absolute inset-0" style={{ opacity: frontOpacity }}>
                  <div className="w-full h-full rounded-2xl p-[2px] bg-gradient-to-b from-emerald-400/80 via-emerald-700/15 to-emerald-400/80 shadow-[0_0_40px_rgba(16,185,129,0.2),0_12px_40px_rgba(0,0,0,0.7)]">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-gradient-to-br from-[#0f1a15] via-[#0a0f0d] to-[#0d1512] relative flex flex-col">
                      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                      <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-500/8 rounded-full blur-[80px] pointer-events-none" />

                      <div className="relative z-10 pt-4 text-center shrink-0">
                        <p className="text-[9px] font-mono text-emerald-400/60 tracking-[0.35em] uppercase">Analyst // Member</p>
                      </div>

                      <div className="relative z-10 flex justify-center px-5 pt-3 pb-2 shrink-0">
                        <div className="w-[175px] h-[175px] md:w-[190px] md:h-[190px] rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.25),inset_0_0_25px_rgba(16,185,129,0.05)]">
                          {!imageError ? (
                            <img src="/profile.webp" alt="Devian Wahyu Nugroho" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-900"><User className="w-16 h-16 text-neutral-600" /></div>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 text-center px-4 pt-2.5 shrink-0">
                        <h3 className="text-lg md:text-xl font-bold text-white tracking-wide leading-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.5)' }}>Devian Wahyu N.</h3>
                        <p className="text-xs md:text-sm font-mono text-emerald-300 mt-1" style={{ textShadow: '0 0 12px rgba(16,185,129,0.4)' }}>Market Analyst & Builder</p>
                      </div>

                      <div className="relative z-10 flex flex-wrap justify-center gap-2 px-4 pt-3 shrink-0">
                        {['FinTech', 'AI/ML', 'Trading'].map((tag) => (
                          <span key={tag} className="px-3 py-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full">{tag}</span>
                        ))}
                      </div>

                      <div className="relative z-10 px-4 py-3 border-t border-emerald-500/10 bg-black/40 shrink-0 mt-auto">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">PEDS Pass</span>
                          <span className="text-[8px] font-mono text-neutral-500">ID: PEDS-2026-DWN</span>
                        </div>
                        <div className="flex items-center justify-center gap-[1px]">
                          {barcodeW.map((w, i) => (
                            <div key={i} className="bg-neutral-600/70" style={{ width: `${w * 1.2}px`, height: `${8 + (i % 5)}px` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ═══════ BACK ═══════ */}
                <motion.div className="absolute inset-0" style={{ opacity: backOpacity, transform: 'rotateY(180deg)' }}>
                  <div className="w-full h-full rounded-2xl p-[2px] bg-gradient-to-b from-emerald-400/80 via-emerald-700/15 to-emerald-400/80 shadow-[0_0_40px_rgba(16,185,129,0.2),0_12px_40px_rgba(0,0,0,0.7)]">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-gradient-to-br from-[#0a1510] via-[#0d0d0d] to-[#0f1a15] relative flex flex-col justify-between p-5">
                      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-emerald-500/8 rounded-full blur-[80px] pointer-events-none" />

                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 mx-auto rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                          <span className="text-emerald-500 font-bold text-3xl leading-none">P</span>
                        </div>
                        <p className="text-xs font-mono text-emerald-500/60 tracking-[0.25em] uppercase">PEDS Network</p>
                      </div>

                      <div className="relative z-10 space-y-3.5 mt-5">
                        <div className="flex justify-between items-center border-b border-neutral-800/50 pb-2.5">
                          <span className="text-xs font-mono text-neutral-500 uppercase">Experience</span>
                          <span className="text-sm font-bold text-white">3+ Years</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-800/50 pb-2.5">
                          <span className="text-xs font-mono text-neutral-500 uppercase">Focus</span>
                          <span className="text-sm font-bold text-white">Quantitative</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-800/50 pb-2.5">
                          <span className="text-xs font-mono text-neutral-500 uppercase">Status</span>
                          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            Active
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-neutral-500 uppercase">Network</span>
                          <span className="text-sm font-bold text-white">Traders Family</span>
                        </div>
                      </div>

                      <p className="relative z-10 text-[9px] font-mono text-neutral-600 tracking-widest uppercase text-center mt-5">
                        Drag to flip back
                      </p>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
          </div>

        </motion.div>
      </motion.div>

      {/* ── Hint ── */}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-600 tracking-wider uppercase whitespace-nowrap">
        Drag to swing card
      </p>
    </div>
  );
}
