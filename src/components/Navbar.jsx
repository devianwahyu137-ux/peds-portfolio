import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleProjectClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('the-builder');
    if (target) {
      target.scrollIntoView({ 
        behavior: 'auto', // Disables heavy cinematic smooth-lag, shifts to instant precise frame alignment
        block: 'start' 
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-base/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-display font-bold text-lg tracking-tight z-50">
          PEDS
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <NavItem href="#notion-journal">Journal</NavItem>
          <NavItem href="#the-builder" onClick={handleProjectClick}>Project</NavItem>
          <NavItem href="#market-briefs">Insights</NavItem>
          <NavItem href="#social-hub">Social</NavItem>
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
              <NavItem href="#market-briefs" onClick={() => setIsOpen(false)}>Insights</NavItem>
              <NavItem href="#social-hub" onClick={() => setIsOpen(false)}>Social</NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
