import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import MarketTicker from './components/MarketTicker';
import CommandMenu from './components/CommandMenu';
import BackgroundOverlay from './components/BackgroundOverlay';
import HeroSection from './components/HeroSection';
import RadicalTransparency from './components/RadicalTransparency';
import TrackRecord from './components/TrackRecord';
import ContentHub from './components/ContentHub';
import Milestones from './components/Milestones';
import SocialHub from './components/SocialHub';
import ContactForm from './components/ContactForm';
import CustomCursor from './components/CustomCursor';

const MarketTerminal = lazy(() => import('./components/MarketTerminal'));
const Projects = lazy(() => import('./components/Projects'));

function App() {
  const { scrollYProgress } = useScroll();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    // On touch devices, preserve 120Hz native hardware momentum physics with zero JS overhead
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // High-performance smooth scroll configuration for desktop mouse wheels
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 0.9,
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div id="top" className="relative w-full min-h-screen bg-black isolate overflow-x-hidden text-text-primary selection:bg-bullish selection:text-black cursor-default md:cursor-none">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-500 to-emerald-900 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <BackgroundOverlay />
      
      {/* Navbar with Command Palette Trigger */}
      <Navbar onOpenCommand={() => setIsCommandOpen(true)} />
      
      {/* Running Market Ticker Marquee */}
      <MarketTicker />

      {/* Global Terminal Command Palette (Cmd + K) */}
      <CommandMenu isOpen={isCommandOpen} setIsOpen={setIsCommandOpen} />
      
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-16 md:py-24 space-y-20 sm:space-y-28 md:space-y-32">
        <HeroSection />
        <Suspense fallback={<div className="w-full h-[460px] rounded-2xl bg-neutral-950/60 border border-white/10 animate-pulse" />}>
          <MarketTerminal />
        </Suspense>
        <TrackRecord />
        <RadicalTransparency />
        <Suspense fallback={<div className="w-full min-h-screen bg-black" />}>
          <Projects />
        </Suspense>
        <Milestones />
        <ContentHub />
        <SocialHub />
        <ContactForm />
      </main>

      <footer className="w-full py-10 sm:py-12 mt-16 border-t border-white/10 bg-gradient-to-t from-emerald-900/10 to-transparent relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.18)] shrink-0">
              <img
                src="/avatar-logo.webp"
                alt="Devian Wahyu Nugroho Avatar"
                width="40"
                height="40"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-white font-display font-semibold text-sm tracking-tight">
                Devian Wahyu Nugroho <span className="text-emerald-400 font-mono text-xs">// PEDS</span>
              </p>
              <p className="text-neutral-400 font-mono text-[10px] tracking-wider uppercase">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-neutral-400">
            <a href="https://www.linkedin.com/in/devianwahyu77" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/devianwahyu137-ux" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              GitHub
            </a>
            <a href="https://substack.com/@pedsanalysis" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              Substack
            </a>
            <a href="/CV_Devian_Wahyu_Nugroho.pdf" download="CV_Devian_Wahyu_Nugroho.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              CV / Résumé
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-emerald-500/40 hover:text-emerald-400 text-neutral-300 font-mono text-[11px] transition-all cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
