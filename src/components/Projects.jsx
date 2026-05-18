import React from 'react';

const projectsData = [
  {
    id: 'peds-terminal',
    title: 'PEDS Terminal DSS',
    features: [
      '[📊] RISK_QUANT : Position sizing optimization parameters.',
      '[🔍] MACRO_FEED : Institutional sentiment tracking mechanism.',
      '[📈] LIVE_CHART : TradingView interface integration.'
    ],
    image: '/assets/peds-terminal.webp',
    link: '#peds-terminal',
    isPriority: true,
  },
  {
    id: 'nemos-ecosystem',
    title: 'NEMOS Ecosystem',
    features: [
      '[💻] DEPLOYMENT : Fullstack server architecture with automated DevOps pipeline.',
      '[🛡️] OPS_STATUS : Secure authentication and real-time operational status monitoring.'
    ],
    image: '/assets/nemos-ecosystem.webp',
    link: '#nemos-ecosystem',
    isPriority: false,
  },
  {
    id: 'future-project',
    title: 'Next-Gen Aggregator',
    features: [
      '[⚡] LOW_LATENCY : Sub-millisecond execution routing across fragmented liquidity pools.',
      '[🔗] CROSS_CHAIN : Seamless interoperability with traditional financial infrastructure.'
    ],
    image: '/assets/nemos-ecosystem.webp', // fallback for 3rd item
    link: '#future-project',
    isPriority: false,
  }
];

export default function Projects() {
  return (
    <section id="builder" className="w-full min-h-screen bg-black py-8 px-4 md:px-8 flex flex-col gap-12 items-center">
        
        {/* Tighter Compact Section Header */}
        <div className="w-full max-w-7xl border-b border-neutral-900 pb-2 mb-6">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
            <span className="w-4 h-px bg-emerald-900" />
            <span>02 // PORTFOLIO_ARCHIVE</span>
          </div>
          <h2 className="text-lg font-bold font-mono tracking-tight text-white mt-0.5">THE BUILDER DASHBOARD</h2>
        </div>

        <div className="w-full max-w-7xl flex flex-col gap-24">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={project.id}
                className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-center ${index > 0 ? '[content-visibility:auto]' : ''}`}
              >
                {/* Text Container */}
                <div className={`col-span-1 lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <a href={project.link} className="group block w-fit mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {project.title} <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </h3>
                  </a>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-[13px] text-neutral-400 font-mono leading-relaxed">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Media Container */}
                <div className={`col-span-1 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <a 
                    href={project.link} 
                    className="group block relative aspect-video rounded-xl bg-neutral-950 border border-neutral-800/60 p-0.5 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.04)] hover:-translate-y-0.5"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Directory Button */}
        <div className="w-full flex justify-center mt-6">
          <a href="#YOUR_FUTURE_DIRECTORY" className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase py-2.5 px-5 rounded-full bg-emerald-950/10 border border-emerald-500/20 hover:bg-emerald-950/30 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300">
            [ VIEW_GLOBAL_DIRECTORY_AND_PLATFORMS ↗ ]
          </a>
        </div>
      </section>
  );
}
