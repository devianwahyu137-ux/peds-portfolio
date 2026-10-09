import { useState } from 'react';
import { Menu, X, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ href, children, onClick }) => {
  return (
    <motion.a 
      href={href} 
      onClick={onClick}
      className="relative group text-text-secondary hover:text-white transition-colors duration-300 w-fit"
      initial="initial"
      whileHover="hover"
    >
      <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
        {children}
      </span>
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-bullish shadow-[0_0_5px_rgba(80,250,123,0.5)] mx-auto"
        variants={{
          initial: { width: "0%", opacity: 0 },
          hover: { width: "100%", opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.a>
  );
};

export default function Navbar({ onOpenCommand }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleProjectClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('the-builder');
    if (target) {
      target.scrollIntoView({ 
        behavior: 'auto',
        block: 'start' 
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-base/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-display font-bold text-lg tracking-tight z-50 text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>PEDS</span>
          </div>

          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-neutral-400 hover:text-emerald-300 transition-all font-mono text-xs cursor-pointer"
            title="Open Command Palette (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Command</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-black/60 border border-white/10 text-neutral-400">⌘K</kbd>
          </button>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <NavItem href="#notion-journal">Journal</NavItem>
          <NavItem href="#the-builder" onClick={handleProjectClick}>Project</NavItem>
          <NavItem href="#market-terminal-section">Terminal</NavItem>
          <NavItem href="#market-briefs">Insights</NavItem>
          <NavItem href="#social-hub">Social</NavItem>

          {/* CV / Résumé Download Link */}
          <a
            href="/CV%20Devian%20Wahyu%20Nugroho.pdf"
            download="CV_Devian_Wahyu_Nugroho.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-400 font-mono text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <span>CV</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 text-text-secondary hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-base/95 backdrop-blur-md border-b border-border shadow-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-6 text-base font-medium">
              <NavItem href="#notion-journal" onClick={() => setIsOpen(false)}>Journal</NavItem>
              <NavItem href="#the-builder" onClick={(e) => { handleProjectClick(e); setIsOpen(false); }}>Project</NavItem>
              <NavItem href="#market-terminal-section" onClick={() => setIsOpen(false)}>Terminal</NavItem>
              <NavItem href="#market-briefs" onClick={() => setIsOpen(false)}>Insights</NavItem>
              <NavItem href="#social-hub" onClick={() => setIsOpen(false)}>Social</NavItem>
              
              <a
                href="/CV%20Devian%20Wahyu%20Nugroho.pdf"
                download="CV_Devian_Wahyu_Nugroho.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2 text-emerald-400 font-mono text-sm border-t border-white/10 pt-4"
              >
                <span>Download CV / Résumé</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
