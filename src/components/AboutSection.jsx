import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';

export default function AboutSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-7xl relative"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-bullish/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
        {/* Decorative corner grid background element */}
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none" />

        {/* Builder Avatar Container */}
        <div className="relative group/avatar flex-shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-bullish to-emerald-600 rounded-full blur opacity-30 group-hover/avatar:opacity-60 transition-opacity duration-300" />
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/10 bg-black flex items-center justify-center">
            <img 
              src="/builder_avatar.webp" 
              alt="Quantum Nanobanana Avatar of the Builder"
              className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-neutral-950 border border-bullish/30 p-1.5 rounded-full text-bullish shadow-[0_0_10px_rgba(80,250,123,0.2)]">
            <Cpu className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Narrative Content */}
        <div className="flex-1 space-y-4 text-center md:text-left z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-bullish bg-bullish/10 border border-bullish/20 px-2 py-0.5 rounded uppercase">
              <Terminal className="w-3 h-3" /> Core Identity // The Builder
            </span>
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
              Status: Operational
            </span>
          </div>

          <p className="text-sm font-mono text-neutral-400 leading-relaxed max-w-3xl">
            Pembangun situs ini dengan pendekatan teknologi yang unik. Pisang nanoteknologi kuantum (nanobanana) ini melambangkan fusi inovasi dan analisis saya, cara saya mendokumentasikan eksplorasi teknologi mutakhir.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
