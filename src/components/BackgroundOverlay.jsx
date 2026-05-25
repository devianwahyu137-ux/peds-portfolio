import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-base">
      
      {/* 1. Mathematical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Ghost Candlesticks Pattern (Abstract) */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <pattern id="candlesticks" width="120" height="200" patternUnits="userSpaceOnUse">
          {/* Bullish Candle */}
          <rect x="20" y="80" width="8" height="40" fill="none" stroke="#50FA7B" strokeWidth="1" />
          <line x1="24" y1="60" x2="24" y2="80" stroke="#50FA7B" strokeWidth="1" />
          <line x1="24" y1="120" x2="24" y2="135" stroke="#50FA7B" strokeWidth="1" />
          
          {/* Bearish Candle */}
          <rect x="60" y="40" width="8" height="60" fill="none" stroke="#FF5555" strokeWidth="1" />
          <line x1="64" y1="20" x2="64" y2="40" stroke="#FF5555" strokeWidth="1" />
          <line x1="64" y1="100" x2="64" y2="130" stroke="#FF5555" strokeWidth="1" />

          {/* Doji */}
          <rect x="100" y="90" width="8" height="2" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="104" y1="70" x2="104" y2="90" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="104" y1="92" x2="104" y2="110" stroke="#FFFFFF" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#candlesticks)" />
      </svg>

      {/* 3. Ambient Light Orbs (Animated) */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, -100, 50, 0] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-bullish/10 rounded-full blur-[150px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 100, 0], 
          y: [0, 100, -50, 0] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-[#FF5555]/10 rounded-full blur-[150px] mix-blend-screen"
      />

      {/* 4. Fine Digital Noise / Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* 5. Vignette Overlay to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0D0D0D_100%)]" />
    </div>
  );
}
