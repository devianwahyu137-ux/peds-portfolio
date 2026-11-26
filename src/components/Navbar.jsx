import { useState, useEffect } from 'react';
import { Menu, X, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ href, children, onClick, isActive }) => {
  return (
    <motion.a 
      href={href} 
      onClick={onClick}
      className={`relative group transition-colors duration-300 w-fit whitespace-nowrap ${
        isActive ? 'text-emerald-400 font-semibold' : 'text-text-secondary hover:text-white'
      }`}
      initial="initial"
      whileHover="hover"
    >
      <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
        {children}
      </span>
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-bullish shadow-[0_0_5px_rgba(80,250,123,0.5)] mx-auto"
        animate={isActive ? { width: '100%', opacity: 1 } : undefined}
        variants={{
          initial: { width: isActive ? '100%' : '0%', opacity: isActive ? 1 : 0 },
          hover: { width: '100%', opacity: 1 }
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </motion.a>
  );
};

const NAV_LINKS = [
  { id: 'notion-journal', label: 'Journal' },
  { id: 'the-builder', label: 'Projects' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'market-briefs', label: 'Insights' },
  { id: 'social-hub', label: 'Social' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onOpenCommand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.3, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-base/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display font-bold text-lg tracking-tight z-50 text-white flex items-center gap-2 hover:text-emerald-300 transition-colors"
            aria-label="Scroll to top"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>PEDS</span>
          </a>

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
        
        {/* Desktop Menu (lg+ so iPad portrait uses clean drawer) */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((item) => (
            <NavItem
              key={item.id}
              href={`#${item.id}`}
              isActive={activeSection === item.id}
              onClick={(e) => handleAnchorClick(e, item.id)}
            >
              {item.label}
            </NavItem>
          ))}

          {/* CV / Résumé Download Link */}
          <a
            href="/CV_Devian_Wahyu_Nugroho.pdf"
            download="CV_Devian_Wahyu_Nugroho.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-400 font-mono text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0"
          >
            <span>CV</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile & iPad Menu Toggle */}
        <button 
          className="lg:hidden z-50 text-text-secondary hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile & iPad Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-base/95 backdrop-blur-md border-b border-border shadow-2xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-5 text-base font-medium">
              {NAV_LINKS.map((item) => (
                <NavItem
                  key={item.id}
                  href={`#${item.id}`}
                  isActive={activeSection === item.id}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                >
                  {item.label}
                </NavItem>
              ))}
              
              <a
                href="/CV_Devian_Wahyu_Nugroho.pdf"
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
