import { useEffect, useRef, useState } from 'react';
import ParticleNetwork from './ParticleNetwork';

export default function BackgroundOverlay() {
  const spotlightRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);

    // If mobile/touch screen, bypass all pointermove events & continuous lerp computations
    if (touchQuery.matches) {
      const handler = (e) => setIsTouchDevice(e.matches);
      touchQuery.addEventListener?.('change', handler);
      return () => touchQuery.removeEventListener?.('change', handler);
    }

    let rafId = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 60; // Throttled to 60fps cap on high-refresh desktop (120Hz/240Hz)

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
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-base select-none">
      <style>
        {`
          @media (min-width: 768px) {
            @keyframes orb-wander-1 {
              0%, 100% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(60px, -60px, 0); }
            }
            @keyframes orb-wander-2 {
              0%, 100% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(-60px, 50px, 0); }
            }
          }
        `}
      </style>

      {/* 1. Base Static Institutional Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Pointer-Reactive Spotlight (Desktop) or Static Lightweight Emerald Ambient (Mobile) */}
      {isTouchDevice ? (
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.03) 45%, transparent 70%)',
          }}
        />
      ) : (
        <div
          ref={spotlightRef}
          className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full pointer-events-none will-change-transform opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.04) 40%, transparent 68%)',
          }}
        />
      )}

      {/* Interactive Micro Dot Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridDots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#10b981" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridDots)" />
      </svg>

      {/* 3. Ghost Candlestick Matrix */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
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

      {/* 4. Ambient Gradient Orbs (Optimized with pure radial-gradients, no heavy filter:blur) */}
      <div 
        className="hidden sm:block absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.11) 0%, rgba(16,185,129,0.03) 40%, transparent 68%)',
          animation: 'orb-wander-1 20s ease-in-out infinite',
        }}
      />
      <div 
        className="hidden sm:block absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.09) 0%, rgba(20,184,166,0.02) 40%, transparent 68%)',
          animation: 'orb-wander-2 24s ease-in-out infinite',
        }}
      />

      {/* 5. Particle Network constellation system */}
      <ParticleNetwork />

      {/* 6. Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0D0D0D_100%)] pointer-events-none" />
    </div>
  );
}
