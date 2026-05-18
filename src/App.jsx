import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import BackgroundOverlay from './components/BackgroundOverlay';
import HeroSection from './components/HeroSection';
import MarketTerminal from './components/MarketTerminal';
import PriceTicker from './components/PriceTicker';
import RadicalTransparency from './components/RadicalTransparency';
import TrackRecord from './components/TrackRecord';
import Projects from './components/Projects';
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
    <div className="relative min-h-screen overflow-x-hidden text-text-primary selection:bg-bullish/30 selection:text-bullish cursor-default">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-500 to-emerald-900 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <BackgroundOverlay />
      {isLargeScreen && <PriceTicker />}
      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-32">
        <HeroSection />
        {isLargeScreen && <MarketTerminal />}
        <TrackRecord />
        <RadicalTransparency />
        <Projects />
        <ContentHub />
        <SocialHub />
      </main>

      <footer className="border-t border-border mt-32 py-12 text-center text-text-secondary text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Devian Wahyu Nugroho. Institutional Execution.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bullish animate-pulse"></span>
            <span>Systems Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
