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
      // Throttle lerp calculations
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
          @keyframes orb-wander-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(100px, -150px) scale(1.15); }
            50% { transform: translate(-80px, -80px) scale(0.9); }
            75% { transform: translate(120px, 100px) scale(1.1); }
          }
          @keyframes orb-wander-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            30% { transform: translate(-150px, 120px) scale(1.1); }
            60% { transform: translate(100px, 50px) scale(0.85); }
          }
          @keyframes orb-wander-3 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.06; }
            40% { transform: translate(80px, -100px) scale(1.2); opacity: 0.1; }
            70% { transform: translate(-100px, 80px) scale(0.85); opacity: 0.04; }
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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, transparent 70%)',
          }}
        />
      ) : (
        <div
          ref={spotlightRef}
          className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full will-change-transform opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 70%)',
            filter: 'blur(30px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Interactive Micro Dot Pattern overlay illuminated near cursor */}
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

      {/* 4. Ambient Gradient Orbs */}
      <div 
        className="absolute top-[5%] left-[10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'orb-wander-1 18s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] sm:w-[550px] sm:h-[550px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 65%)',
          filter: 'blur(70px)',
          animation: 'orb-wander-2 22s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute top-[40%] left-[45%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'orb-wander-3 26s ease-in-out infinite',
        }}
      />

      {/* 5. Particle Network constellation system */}
      <ParticleNetwork />

      {/* 6. Noise Grain & Vignette */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0D0D0D_100%)]" />
    </div>
  );
}
