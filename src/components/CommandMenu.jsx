import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Activity, 
  FileText, 
  ExternalLink, 
  Compass, 
  Layers, 
  Mail, 
  X,
  ArrowRight
} from 'lucide-react';

export default function CommandMenu({ isOpen, setIsOpen }) {
  const [search, setSearch] = useState('');

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);

  const handleAction = (callback) => {
    setIsOpen(false);
    callback();
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Terminal Command Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl bg-neutral-950/95 border border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.18)] overflow-hidden z-10"
          >
            <Command
              value={search}
              onValueChange={setSearch}
              className="w-full flex flex-col font-mono text-xs"
            >
              {/* Top Search Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
                <Search className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <Command.Input
                  placeholder="Type a command or jump to section..."
                  className="w-full bg-transparent text-sm font-mono text-white placeholder-neutral-400 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Command Items List */}
              <Command.List className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                <Command.Empty className="px-4 py-8 text-center text-neutral-400 font-mono text-xs">
                  No institutional results found for "{search}".
                </Command.Empty>

                {/* Group: Navigation */}
                <Command.Group
                  heading="NAVIGATION & SECTIONS"
                  className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-emerald-500/80 font-semibold"
                >
                  <Command.Item
                    onSelect={() => handleAction(() => scrollTo('the-builder'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>Projects & Bento Matrix</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Jump to #the-builder</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => handleAction(() => scrollTo('market-terminal-section'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>TradingView Market Terminal</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Jump to Live Charts</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => handleAction(() => scrollTo('notion-journal'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Audited Trading Journal & Radical Transparency</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Jump to #notion-journal</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => handleAction(() => scrollTo('contact'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <span>Contact & Collaboration Inquiries</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Jump to #contact</span>
                  </Command.Item>
                </Command.Group>

                {/* Group: Institutional Resources & Downloads */}
                <Command.Group
                  heading="DOCUMENTS & EXTERNAL LINKS"
                  className="px-2 pt-3 pb-1.5 text-[10px] uppercase tracking-wider text-emerald-500/80 font-semibold"
                >
                  <Command.Item
                    onSelect={() => handleAction(() => window.open('/CV%20Devian%20Wahyu%20Nugroho.pdf', '_blank'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Download Devian's CV / Résumé</span>
                    </div>
                    <span className="text-[10px] text-emerald-400/90 font-mono">PDF [Direct]</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => handleAction(() => window.open('https://vanilla-tin-877.notion.site/Financial-Market-Research-Portofolio-Devian-Wahyu-Nugroho-2f76900a9bdf8080844eebffdaafc170?source=copy_link', '_blank'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Inspect Audited Notion Research Log</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Command.Item>

                  <Command.Item
                    onSelect={() => handleAction(() => window.open('https://peds-terminal.vercel.app/', '_blank'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Open PEDS Terminal DSS Live Protocol</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Command.Item>

                  <Command.Item
                    onSelect={() => handleAction(() => window.open('https://peds-final.vercel.app/', '_blank'))}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-200 cursor-pointer hover:bg-emerald-500/15 hover:text-emerald-300 aria-selected:bg-emerald-500/15 aria-selected:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Open Macroscope Axis Dashboard</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Bottom Footer Hotkeys */}
              <div className="px-4 py-2.5 border-t border-white/10 bg-black/70 flex items-center justify-between text-[10px] text-neutral-400">
                <div className="flex items-center gap-3">
                  <span>Navigation: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200">↓</kbd></span>
                  <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200">↵</kbd></span>
                </div>
                <div>
                  <span>Close: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200">ESC</kbd></span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
