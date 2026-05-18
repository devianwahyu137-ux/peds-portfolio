import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import BackgroundOverlay from './components/BackgroundOverlay';
import HeroSection from './components/HeroSection';
import MarketTerminal from './components/MarketTerminal';
import PriceTicker from './components/PriceTicker';
import RadicalTransparency from './components/RadicalTransparency';
import TrackRecord from './components/TrackRecord';
const Projects = React.lazy(() => import('./components/Projects'));
import ContentHub from './components/ContentHub';
import SocialHub from './components/SocialHub';
import CustomCursor from './components/CustomCursor';

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
        <React.Suspense fallback={<div className="w-full min-h-screen bg-black" />}>
          <Projects />
        </React.Suspense>
        <ContentHub />
        <SocialHub />
      </main>

      <footer className="w-full py-10 mt-16 border-t border-neutral-900 text-center relative z-20">
        <p className="text-neutral-600 font-mono text-[10px] tracking-[0.3em] uppercase">
          © 2026 Devian Wahyu Nugroho. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
