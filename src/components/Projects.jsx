import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projectsData = [
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
    id: 'desa-surorejo',
    title: 'Desa Surorejo',
    subtitle: 'Official Village Information System',
    features: [
      { badge: 'GOV', title: 'PROFILE', desc: 'Platform profil desa resmi untuk digitalisasi administrasi dan informasi publik.' },
      { badge: 'INFO', title: 'PORTAL', desc: 'Pusat informasi terpadu yang memajukan desa dengan transparansi data.' },
      { badge: 'WEB', title: 'SERVICE', desc: 'Meningkatkan layanan masyarakat dengan UI/UX yang modern dan aksesibel.' }
    ],
    techStack: ['React', 'Tailwind', 'Vite'],
    image: '/public/beranda%20web%20surorejo.webp',
    link: 'https://beranda-surorejo.vercel.app/',
    isPriority: false,
  },
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
      { root: container, threshold: 0.5 }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(projectsData.length - 1, index));
    if (containerRef.current && containerRef.current.children[clamped]) {
      containerRef.current.children[clamped].scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
    }
  }, []);

  const goPrev = () => scrollTo(activeIndex - 1);
  const goNext = () => scrollTo(activeIndex + 1);

  return (
    <section id="the-builder" className="relative w-full isolate overflow-hidden bg-black py-12 md:py-16 scroll-mt-20">
      <div className="w-full max-w-[95vw] lg:max-w-7xl mx-auto px-2 sm:px-6 md:px-8">

        {/* ── Header Row ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 px-2">
          <div>
            <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Portfolio</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              The Builder Archive
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            {/* Counter */}
            <div className="flex items-baseline gap-1 font-mono md:mr-2">
              <span className="text-xl md:text-2xl font-bold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-neutral-600 text-sm">/</span>
              <span className="text-neutral-600 text-sm">{String(projectsData.length).padStart(2, '0')}</span>
            </div>

            {/* Arrow Buttons (desktop + mobile) */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-25 disabled:cursor-not-allowed bg-neutral-900/50 backdrop-blur-sm"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={goNext}
                disabled={activeIndex === projectsData.length - 1}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-25 disabled:cursor-not-allowed bg-neutral-900/50 backdrop-blur-sm"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Project Display ────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900/50 to-neutral-950/80 backdrop-blur-sm shadow-2xl">
          
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}
          </style>

          {/* Native Scroll Track */}
          <div
            ref={containerRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth"
          >
            {projectsData.map((proj, index) => (
              <div
                key={proj.id}
                data-index={index}
                className="w-full flex-shrink-0 snap-start flex flex-col lg:flex-row"
              >
                {/* Image — left side on desktop, top on mobile */}
                <div className="w-full lg:w-[55%] relative overflow-hidden bg-[#0A0A0A] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-800/50 p-4 sm:p-8">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full aspect-[16/10] lg:aspect-auto overflow-hidden group rounded-xl">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                      {...(proj.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
                    />
                    {/* Subtle glow behind image */}
                    <div className="absolute inset-0 bg-emerald-500/5 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                  </a>
                </div>

                {/* Info — right side on desktop, bottom on mobile */}
                <div className="w-full lg:w-[45%] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-gradient-to-b lg:bg-gradient-to-r from-neutral-900/20 to-transparent">
                  
                  {/* Project label */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-emerald-500 font-mono text-[10px] tracking-[0.2em] uppercase">
                      Project {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                  </div>

                  {/* Title */}
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="group inline-flex w-fit mb-1">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center gap-3 group-hover:text-emerald-400 transition-colors">
                      {proj.title}
                      <svg
                        className="w-6 h-6 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </h3>
                  </a>
                  <p className="text-xs sm:text-sm text-neutral-500 font-mono tracking-wider mb-8">{proj.subtitle}</p>

                  {/* Features */}
                  <div className="space-y-5 mb-10 flex-grow">
                    {proj.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 text-[10px] px-2 py-1 rounded font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-widest mt-0.5">
                          {feature.badge}
                        </span>
                        <p className="text-sm leading-relaxed text-neutral-400">
                          <strong className="text-neutral-200 font-semibold">{feature.title}:</strong> {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-2 w-fit px-6 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-mono text-xs uppercase tracking-widest hover:bg-emerald-500/15 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
                    >
                      <span>View Live Protocol</span>
                      <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dots ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="w-8 h-8 flex items-center justify-center p-2"
                aria-label={`Go to project ${index + 1}`}
              >
                <div className={`transition-all duration-500 rounded-full ${
                  activeIndex === index
                    ? 'w-8 h-2 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                    : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
