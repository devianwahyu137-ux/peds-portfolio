import MarketAnalyticsTerminal from './MarketAnalyticsTerminal';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketTerminal() {
  return (
    <section id="market-terminal-section" className="relative scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em]">
              Quantitative Intelligence & Execution
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
            Market Analytics Terminal
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 font-mono text-xs text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>NATIVE LIGHTWEIGHT CHARTS v5</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MarketAnalyticsTerminal />
      </motion.div>
    </section>
  );
}
