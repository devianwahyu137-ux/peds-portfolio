import { Briefcase, TrendingUp, GraduationCap, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackRecord() {
  const credentials = [
    {
      icon: Briefcase,
      title: "Analyst @ Traders Family",
      subtitle: "Institutional-Grade Market Analysis",
      stats: "20+ Research Papers • Daily Alpha",
      description: "Executing quantitative scenario frameworks, tracking intermarket liquidity, and delivering actionable intelligence for discretionary & automated portfolios.",
      badge: "ACTIVE ROLE",
      accent: "#10b981"
    },
    {
      icon: TrendingUp,
      title: "3+ Years Navigating Cross-Asset Volatility",
      subtitle: "Forex, Crypto & Macro Yields",
      stats: "68.4% Win Rate • Max DD -4.2%",
      description: "Managing risk parameters through systematic position sizing, Modern Portfolio Theory (MPT) asset allocation, and strict stop-loss protocols across volatility regimes.",
      badge: "PROVEN TRACK RECORD",
      accent: "#38bdf8"
    },
    {
      icon: GraduationCap,
      title: "Management Science @ FEB UGM",
      subtitle: "6th Semester Quantitative Track",
      stats: "Top Tier Academic Rigor",
      description: "Synthesizing econometric modeling, business model feasibility, and algorithmic decision systems to bridge academic financial theory with real-market execution.",
      badge: "ACADEMIC RIGOR",
      accent: "#a855f7"
    }
  ];

  return (
    <section className="relative scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
              Executive Credentials & Authority
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
            Professional Track Record
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-neutral-400">
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            AUDITED INSTITUTIONAL PEDIGREE
          </span>
        </div>
      </div>

      {/* Modern 3-Column Glass Card Array */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {credentials.map((cred, idx) => {
          const Icon = cred.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative p-4 sm:p-5 md:p-7 rounded-xl md:rounded-2xl bg-neutral-950/92 border border-white/10 transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] flex flex-col justify-between overflow-hidden"
            >
              {/* Top Ambient Glow on Hover */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: `${cred.accent}25` }}
              />

              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3.5 md:mb-5">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl group-hover:scale-105 group-hover:border-emerald-500/30 transition-all text-emerald-400">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 sm:px-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold">
                    {cred.badge}
                  </span>
                </div>

                <h3 
                  className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 sm:mb-1 group-hover:text-emerald-300 transition-colors"
                  style={{ color: '#FFFFFF' }}
                >
                  {cred.title}
                </h3>
                <h4 
                  className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4"
                  style={{ color: '#94A3B8' }}
                >
                  {cred.subtitle}
                </h4>

                <p 
                  className="text-[11px] sm:text-xs md:text-sm text-neutral-300 leading-relaxed font-body mb-3 sm:mb-4 md:mb-6"
                  style={{ color: '#CBD5E1' }}
                >
                  {cred.description}
                </p>
              </div>

              {/* Bottom Micro Stat Footer */}
              <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] sm:text-xs">
                <span className="text-emerald-400 font-medium" style={{ color: '#34D399' }}>
                  {cred.stats}
                </span>
                <span className="text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" style={{ color: '#94A3B8' }}>
                  →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
