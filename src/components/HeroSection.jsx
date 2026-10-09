import { Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Lanyard from './Lanyard';
import HeroAnimatedBeam from './HeroAnimatedBeam';

export default function HeroSection() {
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center mt-8 overflow-visible">
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-0 overflow-visible">
        
        {/* Left Side - Lanyard with Magic UI Animated Beam */}
        <div className="relative w-full lg:w-[38%] flex justify-center lg:justify-start overflow-visible lg:-mt-40 h-[360px] sm:h-[420px] lg:h-auto items-start shrink-0 mb-6 sm:mb-8 lg:mb-0">
          <HeroAnimatedBeam />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 overflow-visible scale-[0.62] sm:scale-[0.75] lg:scale-100 origin-top -mt-16 sm:-mt-10 lg:mt-0"
          >
            <Lanyard />
          </motion.div>
        </div>

        {/* Right Side - Text (right-aligned, fills space) */}
        <div className="w-full lg:w-[64%] lg:pl-4 mt-2 sm:mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-4 justify-center lg:justify-end">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full font-mono">
                Institutional
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-200" style={{ color: '#E2E8F0' }}>
                Analyst & Builder
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold tracking-tight text-white leading-[1.1] mb-2 sm:mb-3">
              Devian Wahyu Nugroho
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-teal-300 mb-3 sm:mb-5 leading-snug">
              3+ Years Navigating Market Volatility
            </h2>

            <p 
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-8 border-l-2 lg:border-l-0 lg:border-r-2 border-emerald-500/40 pl-3.5 sm:pl-5 lg:pl-0 lg:pr-5 max-w-xl mx-auto lg:ml-auto lg:mr-0 font-normal"
              style={{ color: '#E2E8F0' }}
            >
              Bridging Management Science with Institutional Execution. From executing high-probability trades at <strong className="font-bold text-white tracking-wide" style={{ color: '#FFFFFF' }}>Traders Family</strong> to architecting my own proprietary AI-driven macro dashboards for precise quantitative research.
            </p>

            <div className="flex flex-col gap-2.5 sm:gap-3 w-full sm:w-fit mx-auto lg:ml-auto lg:mr-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
                <a 
                  href="#the-builder" 
                  onClick={(e) => handleAnchorClick(e, 'the-builder')}
                  className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 py-2 px-3 sm:px-5 sm:py-3 md:px-7 md:py-3.5 bg-white text-black text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:bg-neutral-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Explore FinTech Architectures</span>
                </a>
                <a 
                  href="#notion-journal" 
                  onClick={(e) => handleAnchorClick(e, 'notion-journal')}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 py-2 px-3 sm:px-5 sm:py-3 md:px-7 md:py-3.5 bg-neutral-900/80 border border-white/20 hover:border-emerald-500/50 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  style={{ color: '#FFFFFF' }}
                >
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 text-emerald-400 shrink-0" />
                  <span className="relative z-10 text-white font-semibold" style={{ color: '#FFFFFF' }}>View Trading Journal</span>
                </a>
              </div>
              
              <a 
                href="/CV%20Devian%20Wahyu%20Nugroho.pdf" 
                download="CV_Devian_Wahyu_Nugroho.pdf"
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full group relative flex items-center justify-center gap-2 py-2 px-3 sm:px-5 sm:py-3 md:px-7 md:py-3.5 font-mono text-[11px] sm:text-xs md:text-sm tracking-widest uppercase bg-neutral-900/50 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/50 text-white transition-all duration-300"
                style={{ color: '#FFFFFF' }}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-mono text-white" style={{ color: '#FFFFFF' }}>View Résumé / CV</span>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
