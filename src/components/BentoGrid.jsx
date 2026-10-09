import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight mouse position tracking
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onTouchMove={(e) => {
        if (!cardRef.current || !e.touches[0]) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.touches[0].clientX - left);
        mouseY.set(e.touches[0].clientY - top);
        setIsHovered(true);
      }}
      onTouchEnd={() => setIsHovered(false)}
      className={cn(
        'group relative rounded-xl md:rounded-2xl overflow-hidden bg-neutral-950/92 border border-white/10',
        'transition-all duration-500 ease-out flex flex-col justify-between p-3.5 sm:p-5 md:p-7 shadow-lg min-h-0 md:min-h-[22rem]',
        'hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] hover:border-emerald-500/40',
        className
      )}
    >
      {/* ── Aceternity Dynamic Spotlight ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(550px circle at ${x}px ${y}px, ${spotlightColor}, transparent 65%)`
          ),
        }}
      />

      {/* ── Spotlight Border Glow ── */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(350px circle at ${x}px ${y}px, ${borderColor}, transparent 70%)`
          ),
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* ── Noise Overlay for Industrial Texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 truncate hidden xs:inline-block">
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

        {/* Middle / Visual Slot */}
        <div className="relative flex-1 w-full my-1 md:my-2 overflow-hidden rounded-xl">
          {children}
        </div>

        {/* Bottom Details (Desktop / Tablet only) */}
        {title && (
          <div className="hidden md:flex mt-4 pt-4 border-t border-white/5 items-center justify-between">
            <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-emerald-300 transition-colors">
              {title}
            </h3>
            <span className="text-neutral-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
              →
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
