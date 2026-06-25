import { Database, LockOpen, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RadicalTransparency() {
  return (
    <section id="notion-journal" className="relative">
      <div className="absolute inset-0 bg-bullish/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative glass-card p-8 md:p-12 lg:p-16 border-bullish/20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        {/* Background graphic */}
        <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
          <Database className="w-96 h-96" />
        </div>

        <div className="max-w-2xl z-10">
          <div className="flex items-center gap-2 mb-6">
            <LockOpen className="w-5 h-5 text-bullish" />
            <span className="text-bullish font-mono text-sm uppercase tracking-widest font-semibold">
              Radical Transparency
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Real Traders <span className="text-transparent bg-clip-text bg-gradient-to-r from-bullish to-white">Don't Hide Data.</span>
          </h2>
          
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            An auditable, institutional-grade trading journal built on Notion. 
            Every setup, execution, and PnL metric is logged with surgical precision. 
            No hindsight bias, just raw market data and quantitative reflection.
          </p>
          
          <a 
            href="https://vanilla-tin-877.notion.site/Financial-Market-Research-Portofolio-Devian-Wahyu-Nugroho-2f76900a9bdf8080844eebffdaafc170?source=copy_link" 
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-bullish text-black font-bold rounded-lg hover:bg-[#3de069] transition-all duration-300 hover:shadow-[0_0_30px_rgba(80,250,123,0.3)]"
          >
            Access The Notion Log
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-sm rounded-xl overflow-hidden border border-border bg-black/50 shadow-2xl z-10"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6 font-mono text-xs text-text-secondary space-y-2">
            <div className="flex justify-between">
              <span>WIN_RATE</span>
              <span className="text-bullish">68.4%</span>
            </div>
            <div className="flex justify-between">
              <span>PROFIT_FACTOR</span>
              <span className="text-white">2.14</span>
            </div>
            <div className="flex justify-between">
              <span>AVG_R_MULTIPLE</span>
              <span className="text-white">1.8R</span>
            </div>
            <div className="flex justify-between">
              <span>MAX_DRAWDOWN</span>
              <span className="text-red-400">-4.2%</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-white/40">
              {">"} SYSTEM_SYNC: ONLINE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
