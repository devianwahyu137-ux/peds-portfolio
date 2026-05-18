import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 'peds-terminal',
    title: 'PEDS Terminal DSS',
    description: 'A sophisticated decision support system designed for institutional execution, featuring real-time market data visualization and predictive risk modeling.',
    image: './src/assets/nemos-logo.png', // Fallback to existing asset for now
    link: '#peds-terminal',
    isPriority: true,
  },
  {
    id: 'nemos-ecosystem',
    title: 'NEMOS Ecosystem',
    description: 'A state-of-the-art fintech infrastructure designed to empower MSMEs. Integrating blockchain technology for immutable ledger transactions.',
    image: './src/assets/nemos-logo.png',
    link: '#nemos-ecosystem',
    isPriority: false,
  },
  {
    id: 'future-project',
    title: 'Next-Gen Aggregator',
    description: 'High-frequency liquidity aggregation platform bridging decentralized finance protocols with traditional financial infrastructure.',
    image: './src/assets/nemos-logo.png',
    link: '#future-project',
    isPriority: false,
  }
];

export default function Projects() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-black flex items-center justify-center text-emerald-500">Loading Projects...</div>}>
      <section id="builder" className="w-full min-h-screen bg-black py-20 px-4 lg:px-8 flex flex-col gap-24">
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <a 
              key={project.id}
              href={project.link}
              className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${index > 0 ? '[content-visibility:auto]' : ''}`}
            >
              {/* Text Container */}
              <div className={`col-span-1 lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <h3 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors">
                  {project.title} <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </h3>
                <p className="mt-4 text-neutral-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Media Container */}
              <div className={`col-span-1 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="group block relative w-full aspect-[16/10] rounded-2xl bg-neutral-900/30 border border-neutral-800/80 p-1 overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.08)] hover:-translate-y-1">
                  <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center overflow-hidden relative">
                     {/* Image Placeholder */}
                     <img 
                       src={project.image} 
                       alt={project.title}
                       className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                       {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {/* Bottom Platform Directory Link */}
        <div className="w-full flex justify-center mt-12">
          <a href="#YOUR_FUTURE_DIRECTORY_LINK" className="font-mono text-xs tracking-widest text-neutral-500 hover:text-emerald-400 transition-colors duration-300 uppercase">
            [ EXTENDED_DIRECTORY_AND_PLATFORMS ↗ ]
          </a>
        </div>
      </section>
    </Suspense>
  );
}
