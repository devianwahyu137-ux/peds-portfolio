import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import BackgroundOverlay from './components/BackgroundOverlay';
import HeroSection from './components/HeroSection';
import MarketTerminal from './components/MarketTerminal';
import PriceTicker from './components/PriceTicker';
import RadicalTransparency from './components/RadicalTransparency';
import TrackRecord from './components/TrackRecord';
import ContentHub from './components/ContentHub';
import Milestones from './components/Milestones';
import SocialHub from './components/SocialHub';
import ContactForm from './components/ContactForm';
import CustomCursor from './components/CustomCursor';

const Projects = lazy(() => import('./components/Projects'));

function App() {
  const { scrollYProgress } = useScroll();
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black isolate overflow-visible text-text-primary selection:bg-bullish/30 selection:text-bullish cursor-default">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-500 to-emerald-900 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <BackgroundOverlay />
      {isLargeScreen && <PriceTicker />}
      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-3 md:px-6 py-12 md:py-24 space-y-32">
        <HeroSection />
        {isLargeScreen && <MarketTerminal />}
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

      <footer className="w-full py-12 mt-16 border-t border-white/5 bg-gradient-to-t from-emerald-900/5 to-transparent text-center relative z-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
           <span className="text-emerald-500 font-display font-bold text-xl leading-none">D</span>
        </div>
        <p className="text-neutral-500 font-mono text-[10px] tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Devian Wahyu Nugroho. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
