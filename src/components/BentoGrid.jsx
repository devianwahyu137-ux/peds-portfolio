import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 auto-rows-auto',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  children,
  badge,
  title,
  subtitle,
  icon: Icon,
  spotlightColor = 'rgba(16, 185, 129, 0.18)',
  borderColor = 'rgba(16, 185, 129, 0.3)',
  glowColor = '#10b981',
  onClick,
}) {
  const cardRef = useRef(null);
  const rectRef = useRef(null);

  // Spotlight mouse position tracking
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;
    mouseX.set(e.clientX - rectRef.current.left);
    mouseY.set(e.clientY - rectRef.current.top);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(-500);
    mouseY.set(-500);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'group relative rounded-xl md:rounded-2xl overflow-hidden bg-neutral-950/92 border border-white/10',
        'transition-all duration-300 ease-out flex flex-col justify-between p-3.5 sm:p-5 md:p-7 shadow-lg min-h-0 md:min-h-[22rem]',
        'hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] hover:border-emerald-500/40',
        className
      )}
    >
      {/* ── Aceternity Dynamic Spotlight (Desktop only, cached rect) ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 hidden sm:block"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(500px circle at ${x}px ${y}px, ${spotlightColor}, transparent 65%)`
          ),
        }}
      />

      {/* ── Content Slots ── */}
      <div className="relative z-20 flex flex-col h-full justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {badge && (
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium shrink-0">
                {badge}
              </span>
            )}
            {subtitle && (
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 truncate hidden xs:inline-block" style={{ color: '#94A3B8' }}>
                {subtitle}
              </span>
            )}
          </div>
          {Icon && (
            <div className="p-1.5 sm:p-2 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:scale-105 transition-all shrink-0">
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          )}
        </div>

        {/* Dynamic Card Body */}
        <div className="flex-1 flex flex-col justify-between">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
