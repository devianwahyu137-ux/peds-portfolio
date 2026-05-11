import React from 'react';
import { Cpu, Server, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NemosProject() {
  return (
    <section id="nemos-project" className="relative">
      <div className="mb-12">
        <h2 className="text-3xl font-display font-bold tracking-tight mb-4">The Builder</h2>
        <div className="w-20 h-1 bg-market rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider text-market bg-market/10 border border-market/20 rounded-full">
            Fintech Infrastructure Case Study
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="./src/assets/nemos-logo.png" 
              alt="NEMOS Logo" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              onError={(e) => e.target.style.display = 'none'}
            />
            <h3 className="text-4xl font-display font-bold">
              NEMOS Ecosystem
            </h3>
          </div>
          
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            A state-of-the-art fintech infrastructure designed to empower MSMEs. 
            NEMOS integrates blockchain technology for immutable ledger transactions 
            and artificial intelligence for predictive risk modeling.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Network className="w-6 h-6 text-market" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Blockchain Integration</h4>
                <p className="text-text-secondary text-sm">Decentralized ledgers ensuring transparent, tamper-proof financial histories for micro-businesses.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Cpu className="w-6 h-6 text-bullish" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">AI Risk Assessment</h4>
                <p className="text-text-secondary text-sm">Machine learning models evaluating creditworthiness outside traditional banking paradigms.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] w-full glass-card overflow-hidden flex items-center justify-center border-market/20 group"
        >
          {/* Abstract Tech Representation */}
          <div className="absolute inset-0 bg-gradient-to-br from-market/10 to-transparent"></div>
          <Server className="w-32 h-32 text-market/40 group-hover:text-market transition-colors duration-500" />
          
          {/* Connecting Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-market to-transparent"></div>
             <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-market to-transparent"></div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
             <div className="glass-card bg-black/60 p-4 border-market/30 backdrop-blur-md">
               <div className="flex items-center justify-between font-mono text-xs text-market mb-2">
                 <span>SYSTEM_ARCHITECTURE</span>
                 <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-market animate-pulse"></span>ACTIVE</span>
               </div>
               <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-market w-3/4"></div>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
