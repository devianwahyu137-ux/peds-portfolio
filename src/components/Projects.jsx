import React from 'react';

const projectsData = [
  {
    id: 'peds-terminal',
    title: 'PEDS Terminal DSS',
    features: [
      { badge: 'RISK', title: 'QUANT', desc: 'Automated portfolio allocation parameters.' },
      { badge: 'FEED', title: 'MACRO', desc: 'Institutional sentiment tracking mechanism.' },
      { badge: 'VIEW', title: 'LIVE_CHART', desc: 'Interactive TradingView interface deployment.' }
    ],
    image: '/peds-terminal.webp',
    link: 'https://peds-terminal.vercel.app/',
    isPriority: true,
  },
  {
    id: 'nemos-ecosystem',
    title: 'NEMOS Ecosystem',
    features: [
      { badge: 'CORE', title: 'DEPLOYMENT', desc: 'Fullstack server architecture with automated DevOps pipeline.' },
      { badge: 'AUTH', title: 'OPS_STATUS', desc: 'Secure authentication and real-time operational status monitoring.' }
    ],
    image: '/nemos-ecosystem.webp',
    link: 'https://nemos-three.vercel.app/',
    isPriority: false,
  },
  {
    id: 'future-project',
    title: 'Next-Gen Aggregator',
    features: [
      { badge: 'SYNC', title: 'LOW_LATENCY', desc: 'Sub-millisecond execution routing across fragmented liquidity pools.' },
      { badge: 'SWAP', title: 'CROSS_CHAIN', desc: 'Seamless interoperability with traditional financial infrastructure.' }
    ],
    image: '',
    link: '#',
    isPriority: false,
  }
];

export default function Projects() {
  return (
    <section id="builder" className="relative w-full isolate overflow-visible min-h-screen bg-black py-12 px-3 sm:px-6 md:px-8 flex flex-col gap-10 items-center">
        
        {/* Uniform Section Header */}
        <div className="w-full max-w-7xl mb-10 flex flex-col items-start">
          <h2 className="text-2xl font-bold text-white tracking-tight relative pb-2">
            The Builder Archive
            <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-white rounded-full" />
          </h2>
        </div>

        <div className="w-full max-w-7xl flex flex-col gap-12 p-12 -m-12 relative overflow-visible isolate">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={project.id}
                className={`group w-full relative z-10 transform-gpu will-change-transform bg-gradient-to-b from-neutral-900/30 to-neutral-950/60 border border-neutral-800/60 rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-out hover:z-[999] hover:border-emerald-500/20 hover:shadow-[0_0_40px_rgba(16,185,129,0.02)] ${index > 0 ? '[content-visibility:auto]' : ''}`}
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
                  {/* Text Container */}
                  <div className={`col-span-1 lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <a href={project.link} className="block w-fit mb-2">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                        <svg 
                          className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </h3>
                    </a>
                    <div className="space-y-1 mt-2">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 font-mono text-neutral-400 mt-2">
                          <span className="flex-shrink-0 text-[9px] px-2 py-0.5 rounded font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors uppercase tracking-wider mt-0.5">
                            {feature.badge}
                          </span>
                          <p className="text-xs sm:text-sm leading-relaxed text-neutral-400">
                            <strong className="text-neutral-200 font-semibold">{feature.title} :</strong> {feature.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Media Container */}
                  <div className={`col-span-1 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {project.image ? (
                      <a 
                        href={project.link} 
                        className="block relative w-full aspect-video rounded-xl bg-neutral-950 border border-neutral-800/40 overflow-hidden"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover rounded-xl"
                          {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                        />
                      </a>
                    ) : (
                      <div className="relative w-full aspect-video rounded-xl bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
                        <div className="text-center space-y-1.5 relative z-10 font-mono">
                          <p className="text-[10px] text-amber-500/80 tracking-[0.2em] uppercase flex items-center gap-1.5 justify-center">
                            <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" /> [ DEV_PHASE ]
                          </p>
                          <p className="text-xs text-neutral-500 uppercase">ARCHITECTING LIQUIDITY ENGINE</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory Footer */}
        <div className="w-full flex justify-center mt-12">
          <a 
            href="#YOUR_DIRECTORY_LINK" 
            className="group flex items-center gap-3 font-mono text-[10px] font-medium tracking-[0.2em] text-neutral-400 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-full py-3 px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-emerald-500/40 hover:text-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 uppercase"
          >
            <span>Explore Global Directory</span>
            <svg 
              className="w-3 h-3 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </section>
  );
}
