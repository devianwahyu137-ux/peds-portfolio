import React from 'react';
import { Activity, Globe, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center mt-8">
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Side (60% Width) */}
        <div className="w-full lg:w-[60%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-bullish bg-bullish/10 border border-bullish/20 rounded-full">
                Institutional
              </span>
              <span className="text-text-secondary text-sm font-medium">
                Analyst & Builder
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-4 md:mb-6">
              Devian Wahyu Nugroho
            </h1>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-text-secondary mb-8 leading-normal pb-2">
              3+ Years Navigating Market Volatility
            </h2>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 border-l-2 border-border pl-6">
              Bridging Management Science with Institutional Execution. 
              From quantitative risk modeling to high-frequency decision making at <span className="text-white font-medium">Traders Family</span> and <span className="text-white font-medium">FEB UGM</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#notion-journal" 
                className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-base font-semibold rounded-lg hover:bg-gray-100 transition-colors text-black"
              >
                <Activity className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View Trading Journal</span>
              </a>
              <a 
                href="#nemos-project" 
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface border border-white/20 text-white font-semibold rounded-lg overflow-hidden transition-all hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <Globe className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Explore FinTech Build</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side (40% Width) */}
        <div className="w-full lg:w-[40%] flex justify-center lg:justify-end relative mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Neo-modern Nametag / Visual Frame */}
            <div className="absolute -inset-4 border border-border/50 rounded-2xl z-0 pointer-events-none">
              {/* Scanline effect or glow border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-bullish/50 to-transparent animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-market/50 to-transparent animate-pulse delay-500"></div>
            </div>

            {/* Photo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative z-10 w-[280px] h-[350px] md:w-80 md:h-[400px] max-w-[300px] md:max-w-none bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl border border-peds-green/30 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.1)] group mx-auto lg:mx-0"
            >
              <img 
                src="/profile.jpg" 
                alt="Devian Wahyu Nugroho" 
                className="w-full h-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback Placeholder */}
              <div className="hidden absolute inset-0 flex-col items-center justify-center">
                <User className="w-20 h-20 text-white/10 mb-4" />
              </div>
            </motion.div>

            {/* Dynamic Text Label */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:-bottom-6 lg:-right-12 glass-card border border-bullish/30 p-3 md:p-4 shadow-[0_0_30px_rgba(80,250,123,0.1)] z-20 flex items-center gap-2 md:gap-3 w-max max-w-[90vw]"
            >
               <div className="w-2 h-2 rounded-full bg-bullish animate-pulse"></div>
               <div>
                 <p className="text-xs font-mono text-bullish mb-0.5 tracking-wider uppercase">Market Analyst</p>
                 <p className="text-sm font-bold text-white tracking-wide">Devian Wahyu Nugroho <span className="text-text-secondary font-normal">(PEDS)</span></p>
               </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
