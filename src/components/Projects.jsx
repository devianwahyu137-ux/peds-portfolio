import React from 'react';

const projectsData = [
  {
    id: 'macroscope',
    title: 'Macroscope',
    features: [
      { badge: 'QUANT', title: 'RISK', desc: 'Pemodelan matriks risiko Modern Portfolio Theory (MPT) untuk simulasi alokasi portofolio makro.' },
      { badge: 'DATA', title: 'FEED', desc: 'Integrasi pipa data makroekonomi otomatis secara real-time untuk analisis skenario.' },
      { badge: 'UI', title: 'VIEW', desc: 'Visualisasi SBN Yield Curve berbasis SVG interaktif untuk keputusan investasi.' }
    ],
    techStack: ['React', 'Tailwind', 'Zustand', 'Gemini AI', 'Supabase'],
    image: '/sovereign_axis_dashboard.webp',
    link: 'https://peds-final.vercel.app/',
    isPriority: false,
  },
  {
    id: 'nemos-ecosystem',
    title: 'NEMOS Ecosystem',
    features: [
      { badge: 'CORE', title: 'DEPLOYMENT', desc: 'Fullstack server architecture with automated DevOps pipeline.' },
      { badge: 'AUTH', title: 'OPS_STATUS', desc: 'Secure authentication and real-time operational status monitoring.' }
    ],
    techStack: ['React', 'Blockchain', 'Figma', 'Tailwind'],
    image: '/nemos-ecosystem.webp',
    link: 'https://nemos-three.vercel.app/',
    isPriority: false,
  },
  {
    id: 'peds-terminal',
    title: 'PEDS Terminal DSS',
    features: [
      { badge: 'RISK', title: 'QUANT', desc: 'Automated portfolio allocation parameters.' },
      { badge: 'FEED', title: 'MACRO', desc: 'Institutional sentiment tracking mechanism.' },
      { badge: 'VIEW', title: 'LIVE_CHART', desc: 'Interactive TradingView interface deployment.' }
    ],
    techStack: ['TradingView Lightweight Charts', 'REST API', 'Vite'],
    image: '/peds-terminal.webp',
    link: 'https://peds-terminal.vercel.app/',
    isPriority: true,
  }
];

export default function Projects() {
  return (
    <section id="the-builder" className="relative w-full isolate overflow-visible min-h-screen bg-black py-12 px-3 sm:px-6 md:px-8 flex flex-col gap-10 items-center">
        
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

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Media Container */}
                  <div className={`col-span-1 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {project.image ? (
                      <a 
                        href={project.link} 
                        className={`block relative w-full aspect-video rounded-xl bg-neutral-950 ${project.id === 'macroscope' ? 'border border-gray-800/50' : 'border border-neutral-800/40'} overflow-hidden`}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className={`w-full h-full ${project.id === 'macroscope' ? 'object-cover' : 'object-cover'} rounded-xl`}
                          {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                        />
                      </a>
                    ) : (
                      <a 
                        href={project.link} 
                        className="block relative w-full aspect-video rounded-xl bg-neutral-950 border border-neutral-800/40 overflow-hidden flex items-center justify-center"
                      >
                        <img src="/sovereign_axis_dashboard.webp" alt="Sovereign Axis Dashboard" className="w-full h-auto rounded-xl object-contain" />
                      </a>
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

