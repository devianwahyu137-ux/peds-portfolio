import { useState, useRef, useEffect } from 'react';

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
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: container,
        threshold: 0.6, // Trigger when 60% of the card is visible in the container
      }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (index) => {
    if (containerRef.current && containerRef.current.children[index]) {
      containerRef.current.children[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="the-builder" className="relative w-full isolate overflow-hidden min-h-screen bg-black py-12 px-3 sm:px-6 md:px-8 flex flex-col gap-8 items-center justify-center">
        
        {/* Style util to hide scrollbar but keep functionality */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>

        {/* Uniform Section Header */}
        <div className="w-full max-w-7xl mb-4 flex flex-col items-center text-center relative z-20">
          <h2 className="text-3xl font-bold text-white tracking-tight relative pb-3 inline-block">
            The Builder Archive
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-emerald-500 rounded-full" />
          </h2>
          <p className="text-neutral-500 font-mono text-xs mt-4 uppercase tracking-widest flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-pulse text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Swipe or use dots to explore
          </p>
        </div>

        {/* Horizontal Slider Container */}
        <div 
          ref={containerRef}
          className="w-full md:max-w-7xl flex flex-row gap-6 lg:gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth pb-8 pt-10 px-4 sm:px-[5vw] lg:px-[10vw] relative isolate"
        >
          {projectsData.map((project, index) => {
            return (
              <div 
                key={project.id}
                data-index={index}
                // Compact standard card size with massive hover pop-up effects
                className="group flex-shrink-0 snap-center w-[85vw] sm:w-[380px] lg:w-[420px] relative z-10 transform-gpu will-change-transform bg-gradient-to-b from-neutral-900/40 to-neutral-950/80 backdrop-blur-sm border border-neutral-800/60 rounded-3xl p-5 transition-all duration-500 ease-out hover:z-[999] hover:-translate-y-4 hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]"
              >
                <div className="w-full flex flex-col gap-6 h-full">
                  
                  {/* Media Container */}
                  <div className="w-full overflow-hidden rounded-2xl border border-neutral-800/40 group-hover:border-neutral-700/60 transition-colors duration-500 shadow-inner">
                    {project.image ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-video bg-neutral-950 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                      </a>
                    ) : (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-video rounded-2xl bg-neutral-950 overflow-hidden flex items-center justify-center">
                        <img src="/sovereign_axis_dashboard.webp" alt="Fallback Dashboard" className="w-full h-auto rounded-2xl object-contain group-hover:scale-110 transition-transform duration-700" />
                      </a>
                    )}
                  </div>

                  {/* Text Container */}
                  <div className="w-full flex flex-col flex-grow justify-between px-1">
                    <div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                          {project.title}
                          <svg 
                            className="w-5 h-5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </h3>
                      </a>
                      
                      <div className="space-y-3">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 text-neutral-400">
                            <span className="flex-shrink-0 text-[9px] px-2 py-0.5 rounded font-mono bg-neutral-900 border border-neutral-800 text-neutral-500 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-colors uppercase tracking-widest mt-0.5">
                              {feature.badge}
                            </span>
                            <p className="text-xs leading-relaxed text-neutral-400">
                              <strong className="text-neutral-200 font-semibold">{feature.title} :</strong> {feature.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-3 mt-2 relative z-20">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-500 rounded-full ${
                activeIndex === index 
                  ? 'w-8 h-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                  : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Directory Footer */}
        <div className="w-full flex justify-center mt-10 relative z-20">
          <a 
            href="#YOUR_DIRECTORY_LINK" 
            className="group flex items-center gap-3 font-mono text-[10px] font-medium tracking-[0.2em] text-neutral-400 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-full py-3 px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-emerald-500/40 hover:text-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 uppercase"
          >
            <span>Explore Global Directory</span>
            <svg 
              className="w-3 h-3 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
  );
}
