import React from 'react';

const projectsData = [
  {
    id: 'peds-terminal',
    title: 'PEDS Terminal DSS',
    description: 'A sophisticated decision support system designed for institutional execution.',
    features: [
      '[📊] RISK_QUANT: Interactive position sizing and mathematical portfolio optimization.',
      '[🔍] MACRO_FEED: Aggregate institutional sentiment and real-time global economic events.'
    ],
    image: './src/assets/nemos-logo.png', // Keep fallback
    link: '#peds-terminal',
    isPriority: true,
  },
  {
    id: 'nemos-ecosystem',
    title: 'NEMOS Ecosystem',
    description: 'A state-of-the-art fintech infrastructure designed to empower MSMEs.',
    features: [
      '[💻] DEPLOYMENT: Fullstack server architecture with automated DevOps pipeline.',
      '[🛡️] SECURITY: Secure authentication and real-time operational status monitoring.'
    ],
    image: './src/assets/nemos-logo.png',
    link: '#nemos-ecosystem',
    isPriority: false,
  },
  {
    id: 'future-project',
    title: 'Next-Gen Aggregator',
    description: 'High-frequency liquidity aggregation platform bridging decentralized finance protocols.',
    features: [
      '[⚡] LOW_LATENCY: Sub-millisecond execution routing across fragmented liquidity pools.',
      '[🔗] CROSS_CHAIN: Seamless interoperability with traditional financial infrastructure.'
    ],
    image: './src/assets/nemos-logo.png',
    link: '#future-project',
    isPriority: false,
  }
];

export default function Projects() {
  return (
    <section id="builder" className="w-full min-h-screen bg-black py-20 px-4 md:px-8 flex flex-col gap-28 items-center">
        
        {/* Section Title */}
        <h2 className="text-sm font-mono tracking-[0.4em] text-neutral-500 uppercase flex items-center gap-3 w-full max-w-7xl">
          <span className="w-4 h-px bg-emerald-800" /> [ THE_BUILDER_DASHBOARD ]
        </h2>

        <div className="w-full max-w-7xl flex flex-col gap-24">
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
                  <h3 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    {project.title} <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </h3>
                  <p className="mt-4 text-neutral-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-neutral-400 group-hover:text-neutral-300 font-mono leading-relaxed transition-colors">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Media Container */}
                <div className={`col-span-1 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="group block relative w-full min-h-[350px] md:min-h-[450px] lg:min-h-[550px] h-auto object-cover rounded-2xl bg-neutral-900/30 border border-neutral-800/80 p-1 overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.08)] hover:-translate-y-1 aspect-[16/10]">
                    <div className="w-full h-full relative rounded-xl overflow-hidden bg-neutral-900">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Platform Directory Link */}
        <div className="w-full flex justify-center mt-20">
          <a href="#YOUR_FUTURE_DIRECTORY" className="font-mono text-xs tracking-widest text-emerald-400 uppercase py-3 px-6 rounded-full bg-emerald-950/20 border border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300">
            [ VIEW_GLOBAL_DIRECTORY_AND_PLATFORMS ↗ ]
          </a>
        </div>
      </section>
  );
}
