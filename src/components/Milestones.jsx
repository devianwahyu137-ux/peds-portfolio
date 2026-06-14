import React from 'react';
import { motion } from 'framer-motion';

const milestonesData = [
  {
    id: 1,
    category: 'FEB 2026 // MARKET SIMULATION',
    title: 'Silver Medalist - National Trading Competition',
    description: 'Secured the Silver Medal at TRACTION OU Festival 11. Demonstrated strict discipline in technical analysis and robust risk management strategies within a highly competitive real-market simulation.'
  },
  {
    id: 2,
    category: 'NOV 2025 // BUSINESS STRATEGY',
    title: '1st Place Winner - Business Model Canvas',
    description: 'Awarded first place by BEM FK-KMK UGM for developing a comprehensive strategic business model, excelling in value proposition mapping and market feasibility implementation.'
  },
  {
    id: 3,
    category: 'JUN 2026 // TECH INNOVATION',
    title: 'Qualifier - PIDI 4.0 Hackathon (Ongoing)',
    description: 'Successfully advanced through the initial proposal phase in the national digital industry hackathon by Pusat Industri Digital Indonesia 4.0, architecting a tech-driven solution.'
  },
  {
    id: 4,
    category: 'APR - MAY 2026 // FRAMEWORK DEVELOPMENT',
    title: 'Multi-Time National Finalist',
    description: 'Achieved national finalist status in "Beyond Business Plan" (UC) and "B-PRENEURSHIP" (Unsoed), securing a MEM UC scholarship for innovative business frameworks.'
  }
];

export default function Milestones() {
  return (
    <section id="milestones" className="relative w-full overflow-visible isolate py-12 scroll-mt-20 flex flex-col gap-8 items-center">
      {/* Section Header */}
      <div className="w-full max-w-7xl flex flex-col items-start mb-2">
        <h2 className="text-2xl font-bold text-white tracking-tight relative pb-2">
          Market Validation & Milestones
          <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-white rounded-full" />
        </h2>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestonesData.map((milestone) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            className="p-5 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <p className="text-[9px] font-mono text-emerald-500 mb-2 uppercase tracking-widest">
                {milestone.category}
              </p>
              <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                {milestone.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Action Button */}
      <div className="w-full flex justify-center mt-6">
        <a 
          href="https://www.linkedin.com/in/devianwahyu77"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.2em] text-neutral-400 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-full py-3 px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-emerald-500/40 hover:text-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 uppercase"
        >
          <span>Verify Full Track Record ↗</span>
        </a>
      </div>
    </section>
  );
}
