import { Database, LockOpen, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RadicalTransparency() {
  return (
    <section id="notion-journal" className="relative">
      <div className="absolute inset-0 bg-bullish/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative glass-card p-5 sm:p-8 md:p-12 lg:p-16 border-bullish/20 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 rounded-xl md:rounded-2xl overflow-hidden">
        {/* Background graphic */}
        <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
          <Database className="w-96 h-96" />
        </div>

        <div className="max-w-2xl z-10 w-full">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-6">
            <LockOpen className="w-4 h-4 sm:w-5 sm:h-5 text-bullish shrink-0" />
            <span className="text-bullish font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold">
              Radical Transparency
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tight mb-2.5 sm:mb-4 md:mb-6 leading-tight">
            Real Traders <span className="text-transparent bg-clip-text bg-gradient-to-r from-bullish to-white">Don't Hide Data.</span>
          </h2>
          
          <p 
            className="text-neutral-300 text-xs sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 font-body"
            style={{ color: '#CBD5E1' }}
          >
            An auditable, institutional-grade trading journal built on Notion. 
            Every setup, execution, and PnL metric is logged with surgical precision. 
            No hindsight bias, just raw market data and quantitative reflection.
          </p>
          
          <a 
            href="https://vanilla-tin-877.notion.site/Financial-Market-Research-Portofolio-Devian-Wahyu-Nugroho-2f76900a9bdf8080844eebffdaafc170?source=copy_link" 
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-3.5 bg-bullish text-black font-bold text-xs sm:text-sm md:text-base rounded-lg hover:bg-[#3de069] transition-all duration-300 hover:shadow-[0_0_30px_rgba(80,250,123,0.3)]"
          >
            Access The Notion Log
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-sm rounded-xl overflow-hidden border border-border bg-black/50 shadow-2xl z-10"
        >
          <div className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-3 border-b border-border bg-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs text-text-secondary space-y-1.5 sm:space-y-2">
            <div className="flex justify-between">
              <span style={{ color: '#94A3B8' }}>WIN_RATE</span>
              <span className="text-bullish font-semibold" style={{ color: '#50FA7B' }}>68.4%</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#94A3B8' }}>PROFIT_FACTOR</span>
              <span className="text-white" style={{ color: '#FFFFFF' }}>2.14</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#94A3B8' }}>AVG_R_MULTIPLE</span>
              <span className="text-white" style={{ color: '#FFFFFF' }}>1.8R</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#94A3B8' }}>MAX_DRAWDOWN</span>
              <span className="text-red-400" style={{ color: '#F87171' }}>-4.2%</span>
            </div>
            <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-border/50" style={{ color: '#64748B' }}>
              {">"} SYSTEM_SYNC: ONLINE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
