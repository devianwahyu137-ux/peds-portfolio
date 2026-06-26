import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projectsData = [
  {
    id: 'macroscope',
    title: 'Macroscope',
    subtitle: 'Macro Portfolio Intelligence',
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
    subtitle: 'Decentralized Operations Platform',
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
    subtitle: 'Decision Support System',
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
      { root: container, threshold: 0.6 }
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

  const goPrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const goNext = () => scrollTo(Math.min(projectsData.length - 1, activeIndex + 1));

  return (
    <section id="the-builder" className="relative w-full isolate overflow-hidden min-h-screen bg-black py-16 flex flex-col gap-6 items-center justify-center">
        
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

        {/* Section Header */}
        <div className="w-full max-w-7xl px-6 mb-2 flex flex-col items-center text-center relative z-20">
          <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight relative pb-3 inline-block">
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

        {/* Counter + Navigation Arrows */}
        <div className="w-full max-w-7xl px-6 flex items-center justify-between relative z-20">
          {/* Project Counter */}
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-2xl font-bold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-neutral-600 text-sm">/</span>
            <span className="text-neutral-600 text-sm">{String(projectsData.length).padStart(2, '0')}</span>
          </div>

          {/* Arrow Buttons (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-30 disabled:hover:border-neutral-800 disabled:hover:text-neutral-500"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={goNext}
              disabled={activeIndex === projectsData.length - 1}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-30 disabled:hover:border-neutral-800 disabled:hover:text-neutral-500"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div 
          ref={containerRef}
          className="w-full md:max-w-7xl flex flex-row gap-6 lg:gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth pb-8 pt-4 px-4 sm:px-[5vw] lg:px-[10vw] relative isolate"
        >
          {projectsData.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={project.id}
                data-index={index}
                className={`group flex-shrink-0 snap-center w-[85vw] sm:w-[380px] lg:w-[420px] relative z-10 transform-gpu will-change-transform backdrop-blur-sm rounded-3xl p-5 transition-all duration-500 ease-out hover:z-[999] hover:-translate-y-4 hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] ${
                  isActive 
                    ? 'bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 border border-emerald-500/25 shadow-[0_0_50px_rgba(16,185,129,0.08)]' 
                    : 'bg-gradient-to-b from-neutral-900/30 to-neutral-950/60 border border-neutral-800/40'
                }`}
              >
                <div className="w-full flex flex-col gap-5 h-full">
                  
                  {/* Project Number Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                      isActive ? 'text-emerald-500' : 'text-neutral-700'
                    }`}>
                      Project {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-neutral-800'
                    }`} />
                  </div>

                  {/* Media Container */}
                  <div className="w-full overflow-hidden rounded-2xl border border-neutral-800/40 group-hover:border-neutral-700/60 transition-colors duration-500 shadow-inner">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-video bg-neutral-950 overflow-hidden">
                      <img 
                        src={project.image || '/sovereign_axis_dashboard.webp'} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        {...(project.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </a>
                  </div>

                  {/* Text Container */}
                  <div className="w-full flex flex-col flex-grow justify-between px-1">
                    <div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit mb-1">
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
                      <p className="text-[11px] text-neutral-500 font-mono tracking-wider mb-4">{project.subtitle}</p>
                      
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

        {/* Dots Indicator — each dot sits in a fixed-width cell so total width never shifts */}
        <div className="flex items-center justify-center relative z-20">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="w-8 h-8 flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`transition-all duration-500 rounded-full ${
                activeIndex === index 
                  ? 'w-6 h-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                  : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
              }`} />
            </button>
          ))}
        </div>

        {/* Directory Footer */}
        <div className="w-full flex justify-center mt-6 relative z-20">
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
