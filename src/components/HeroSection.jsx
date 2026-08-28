import { Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Lanyard from './Lanyard';

export default function HeroSection() {
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center mt-8 overflow-visible" style={{ willChange: 'transform, opacity' }}>
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-0 overflow-visible">
        
        {/* Left Side - Lanyard */}
        <div className="w-full lg:w-[36%] flex justify-center lg:justify-start overflow-visible lg:-mt-40">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-visible"
          >
            <Lanyard />
          </motion.div>
        </div>

        {/* Right Side - Text (right-aligned, fills space) */}
        <div className="w-full lg:w-[64%] lg:pl-4">
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-end">
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-bullish bg-bullish/10 border border-bullish/20 rounded-full">
                Institutional
              </span>
              <span className="text-sm font-medium" style={{ color: '#A0AEC0' }}>
                Analyst & Builder
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold tracking-tight leading-[1.1] mb-4 md:mb-5">
              Devian Wahyu Nugroho
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A0AEC0] mb-6 lg:mb-8 leading-normal pb-1">
              3+ Years Navigating Market Volatility
            </h2>

            <p className="text-sm md:text-base lg:text-lg leading-relaxed mb-8 lg:mb-10 border-r-0 lg:border-r-2 border-l-2 lg:border-l-0 border-white/20 pl-5 lg:pl-0 lg:pr-5 max-w-xl mx-auto lg:ml-auto lg:mr-0" style={{ color: '#A0AEC0' }}>
              Bridging Management Science with Institutional Execution. From executing high-probability trades at <span className="font-medium" style={{ color: 'white' }}>Traders Family</span> to architecting my own proprietary AI-driven macro dashboards for precise quantitative research.
            </p>

            <div className="flex flex-col gap-3 w-full sm:w-fit mx-auto lg:ml-auto lg:mr-0">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <a 
                  href="#the-builder" 
                  onClick={(e) => handleAnchorClick(e, 'the-builder')}
                  className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-sm md:text-base font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: 'black' }}
                >
                  <Globe className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Explore FinTech Architectures</span>
                </a>
                <a 
                  href="#notion-journal" 
                  onClick={(e) => handleAnchorClick(e, 'notion-journal')}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface border border-white/20 text-sm md:text-base font-semibold rounded-lg overflow-hidden transition-all hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  style={{ color: 'white' }}
                >
                  <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <Activity className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">View Trading Journal</span>
                </a>
              </div>
              
              <a 
                href="/CV_Devian_Wahyu_Nugroho.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full group relative flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-xs md:text-sm tracking-widest uppercase bg-transparent border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                style={{ color: '#A0AEC0' }}
              >
                <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Résumé / CV</span>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
