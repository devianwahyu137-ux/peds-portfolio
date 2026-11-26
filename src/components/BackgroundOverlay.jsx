import { useEffect, useRef, useState } from 'react';
import ParticleNetwork from './ParticleNetwork';

// Hybrid Quant-FinTech floating elements (responsive tiers: 'all' | 'md' | 'lg')
const FLOATING_ELEMENTS = [
  // ── Visible on Mobile, iPad, and Desktop ('all') ──
  {
    id: 'btc',
    type: 'crypto-btc',
    tier: 'all',
    pos: 'top-[6%] left-[3%] sm:left-[4%]',
    rotate: '-7deg',
    duration: '17s',
    delay: '0s',
  },
  {
    id: 'candle-card',
    type: 'candlestick-sketch',
    tier: 'all',
    pos: 'top-[12%] right-[3%] sm:right-[5%]',
    rotate: '6deg',
    duration: '20s',
    delay: '-3s',
  },
  {
    id: 'monte-carlo',
    type: 'pill',
    label: 'Monte Carlo N=1,000',
    accent: 'text-emerald-300/65 border-emerald-500/25 bg-emerald-950/25',
    tier: 'all',
    pos: 'bottom-[3%] left-[3%] sm:bottom-[14%] sm:left-[5%]',
    rotate: '-5deg',
    duration: '22s',
    delay: '-7s',
  },
  {
    id: 'ai-ml',
    type: 'pill',
    label: 'AI / ML • Quant',
    accent: 'text-sky-300/65 border-sky-500/25 bg-sky-950/25',
    tier: 'all',
    pos: 'bottom-[3%] right-[3%] sm:bottom-[10%] sm:right-[6%]',
    rotate: '5deg',
    duration: '19s',
    delay: '-5s',
  },

  // ── Visible on iPad & Desktop ('md') ──
  {
    id: 'eth',
    type: 'crypto-eth',
    tier: 'md',
    pos: 'top-[42%] right-[3%] lg:right-[4%]',
    rotate: '-6deg',
    duration: '23s',
    delay: '-9s',
  },
  {
    id: 'sharpe',
    type: 'formula',
    label: 'Sharpe = (Rp − Rf) / σp',
    accent: 'text-emerald-300/65 border-emerald-500/25 bg-neutral-950/45',
    tier: 'md',
    pos: 'top-[38%] left-[3%] lg:left-[4%]',
    rotate: '4deg',
    duration: '21s',
    delay: '-2s',
  },
  {
    id: 'equity-curve',
    type: 'trend-sketch',
    tier: 'md',
    pos: 'bottom-[32%] right-[3%] lg:right-[5%]',
    rotate: '-4deg',
    duration: '24s',
    delay: '-11s',
  },

  // ── Visible on Desktop ('lg') ──
  {
    id: 'dcf',
    type: 'formula',
    label: 'DCF = Σ CFt / (1 + WACC)^t',
    accent: 'text-sky-300/60 border-sky-500/25 bg-neutral-950/45',
    tier: 'lg',
    pos: 'top-[54%] left-[3%]',
    rotate: '-4deg',
    duration: '25s',
    delay: '-6s',
  },
  {
    id: 'var',
    type: 'formula',
    label: 'VaR(99%) = μ − 2.33σ',
    accent: 'text-teal-300/65 border-teal-500/25 bg-neutral-950/45',
    tier: 'lg',
    pos: 'top-[28%] right-[12%]',
    rotate: '4deg',
    duration: '18s',
    delay: '-4s',
  },
  {
    id: 'xau',
    type: 'pill',
    label: 'XAU/USD • Safe Haven',
    accent: 'text-amber-300/70 border-amber-500/30 bg-amber-950/30',
    tier: 'lg',
    pos: 'top-[68%] left-[5%]',
    rotate: '5deg',
    duration: '20s',
    delay: '-8s',
  },
  {
    id: 'python',
    type: 'pill',
    label: 'Python • FastAPI • Next.js',
    accent: 'text-sky-300/65 border-sky-500/25 bg-neutral-950/45',
    tier: 'lg',
    pos: 'top-[62%] right-[4%]',
    rotate: '-5deg',
    duration: '22s',
    delay: '-12s',
  },
  {
    id: 'sbn',
    type: 'pill',
    label: 'SBN 6.82% • Yield Curve',
    accent: 'text-emerald-300/65 border-emerald-500/25 bg-neutral-950/45',
    tier: 'lg',
    pos: 'bottom-[24%] left-[12%]',
    rotate: '3deg',
    duration: '19s',
    delay: '-1s',
  },
];

function getTierClass(tier) {
  if (tier === 'all') return 'block';
  if (tier === 'md') return 'hidden md:block';
  return 'hidden lg:block';
}

function FloatingItemVisual({ item }) {
  if (item.type === 'crypto-btc') {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-amber-500/25 bg-amber-950/20">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.22 11.45a2.65 2.65 0 0 1-1.93 2.41v1.64h-1.15v-1.56h-.92v1.56H10.1v-1.56H7.8v-1.22h.84c.31 0 .45-.18.45-.44V9.72c0-.26-.14-.44-.45-.44H7.8V8.06h2.3V6.5h1.12v1.56h.92V6.5h1.15v1.6a2.47 2.47 0 0 1 1.72 2.21 2 2 0 0 1-.82 1.69 2.2 2.2 0 0 1 1.03 1.45zm-3.95-4.18v2.2h1.26c.73 0 1.21-.39 1.21-1.1s-.48-1.1-1.21-1.1zm1.47 5.56c.82 0 1.35-.44 1.35-1.2s-.53-1.2-1.35-1.2h-1.47v2.4z" />
        </svg>
        <span className="font-mono text-[9px] sm:text-[10px] text-amber-300/75 font-semibold tracking-wider">
          BTC/USD
        </span>
      </div>
    );
  }

  if (item.type === 'crypto-eth') {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-sky-500/25 bg-sky-950/20">
        <svg className="w-4 h-4 text-sky-400/80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L5.5 12.2 12 16l6.5-3.8L12 2zm0 15.6L5.5 13.8 12 22l6.5-8.2-6.5 3.8z" />
        </svg>
        <span className="font-mono text-[10px] text-sky-300/75 font-semibold tracking-wider">
          ETH/USD
        </span>
      </div>
    );
  }

  if (item.type === 'candlestick-sketch') {
    return (
      <div className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/20 bg-neutral-950/30">
        <svg className="w-16 h-10 sm:w-20 sm:h-12" viewBox="0 0 80 48" fill="none">
          <line x1="12" y1="22" x2="12" y2="42" stroke="#10b981" strokeOpacity="0.6" strokeWidth="1.5" />
          <rect x="9" y="26" width="6" height="11" rx="1" fill="#10b981" fillOpacity="0.5" />
          <line x1="26" y1="16" x2="26" y2="38" stroke="#ef4444" strokeOpacity="0.55" strokeWidth="1.5" />
          <rect x="23" y="20" width="6" height="12" rx="1" fill="#ef4444" fillOpacity="0.45" />
          <line x1="40" y1="12" x2="40" y2="34" stroke="#10b981" strokeOpacity="0.65" strokeWidth="1.5" />
          <rect x="37" y="16" width="6" height="13" rx="1" fill="#10b981" fillOpacity="0.55" />
          <line x1="54" y1="6" x2="54" y2="26" stroke="#50fa7b" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="51" y="10" width="6" height="11" rx="1" fill="#50fa7b" fillOpacity="0.6" />
          <line x1="68" y1="3" x2="68" y2="20" stroke="#50fa7b" strokeOpacity="0.75" strokeWidth="1.5" />
          <rect x="65" y="6" width="6" height="9" rx="1" fill="#50fa7b" fillOpacity="0.65" />
        </svg>
      </div>
    );
  }

  if (item.type === 'trend-sketch') {
    return (
      <div className="px-2.5 py-2 rounded-xl border border-emerald-500/20 bg-neutral-950/30">
        <svg className="w-20 h-9" viewBox="0 0 80 36" fill="none">
          <path
            d="M2 30 L16 24 L28 27 L42 15 L56 18 L76 4"
            stroke="#34d399"
            strokeOpacity="0.65"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="76" cy="4" r="2.5" fill="#50fa7b" fillOpacity="0.8" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider ${item.accent}`}
    >
      {item.label}
    </div>
  );
}

export default function BackgroundOverlay() {
  const spotlightRef = useRef(null);
  const parallaxRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );

  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    const handleTouchChange = (e) => setIsTouchDevice(e.matches);
    touchQuery.addEventListener?.('change', handleTouchChange);

    let scrollRaf = null;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        if (parallaxRef.current) {
          const offset = -(window.scrollY * 0.06);
          parallaxRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    if (touchQuery.matches) {
      return () => {
        touchQuery.removeEventListener?.('change', handleTouchChange);
        window.removeEventListener('scroll', onScroll);
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
      };
    }

    let rafId = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 60;

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateSpotlight);
      }
    };

    const updateSpotlight = (timestamp) => {
      if (timestamp - lastTime >= FRAME_INTERVAL) {
        lastTime = timestamp;
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
      }

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateSpotlight);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      touchQuery.removeEventListener?.('change', handleTouchChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-base select-none">
      <style>
        {`
          @keyframes orb-wander-1 {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(55px, -55px, 0); }
          }
          @keyframes orb-wander-2 {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(-55px, 45px, 0); }
          }
          @keyframes candlestick-drift {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(-40px, -20px, 0); }
          }
          @keyframes float-quant {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -16px, 0); }
          }
        `}
      </style>

      {/* 1. Base Institutional Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.85) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.85) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px',
        }}
      />

      {/* 2. Pointer-Reactive Spotlight (Desktop) or Animated Emerald Ambient (Mobile/iPad) */}
      {isTouchDevice ? (
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 70%)',
            animation: 'orb-wander-1 14s ease-in-out infinite',
          }}
        />
      ) : (
        <div
          ref={spotlightRef}
          className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full pointer-events-none will-change-transform opacity-85"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.05) 40%, transparent 68%)',
          }}
        />
      )}

      {/* 3. Drifting Ghost Candlestick Matrix */}
      <svg
        className="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)] opacity-[0.065] will-change-transform"
        style={{ animation: 'candlestick-drift 26s ease-in-out infinite' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="candlesticks" width="120" height="200" patternUnits="userSpaceOnUse">
          <rect x="20" y="80" width="8" height="40" fill="none" stroke="#50FA7B" strokeWidth="1" />
          <line x1="24" y1="60" x2="24" y2="80" stroke="#50FA7B" strokeWidth="1" />
          <line x1="24" y1="120" x2="24" y2="135" stroke="#50FA7B" strokeWidth="1" />
          <rect x="60" y="40" width="8" height="60" fill="none" stroke="#FF5555" strokeWidth="1" />
          <line x1="64" y1="20" x2="64" y2="40" stroke="#FF5555" strokeWidth="1" />
          <line x1="64" y1="100" x2="64" y2="130" stroke="#FF5555" strokeWidth="1" />
          <rect x="100" y="90" width="8" height="2" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="104" y1="70" x2="104" y2="90" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="104" y1="92" x2="104" y2="110" stroke="#FFFFFF" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#candlesticks)" />
      </svg>

      {/* 4. Ambient Gradient Orbs */}
      <div
        className="absolute top-[6%] left-[8%] w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.13) 0%, rgba(16,185,129,0.03) 42%, transparent 70%)',
          animation: 'orb-wander-1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[8%] right-[4%] w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, rgba(20,184,166,0.03) 42%, transparent 70%)',
          animation: 'orb-wander-2 24s ease-in-out infinite',
        }}
      />

      {/* 5. Floating Hybrid Finance + Tech Elements with Scroll Parallax */}
      <div ref={parallaxRef} className="absolute inset-0 z-[1] overflow-visible will-change-transform">
        {FLOATING_ELEMENTS.map((item) => (
          <div
            key={item.id}
            className={`${getTierClass(item.tier)} absolute ${item.pos} opacity-35 sm:opacity-45`}
            style={{
              rotate: item.rotate,
              animation: `float-quant ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            <FloatingItemVisual item={item} />
          </div>
        ))}
      </div>

      {/* 6. Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#0D0D0D_100%)] pointer-events-none z-[1]" />

      {/* 7. Interactive Particle Constellation, Data Packets & Liquidity Waves */}
      <ParticleNetwork />
    </div>
  );
}
