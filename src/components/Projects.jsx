import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

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
    glowColor: '#38bdf8'
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
    glowColor: '#10b981'
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
    glowColor: '#a855f7'
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
    glowColor: '#f59e0b'
  }
];

const playBeep = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    
    // Very short, quiet beep
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore if audio fails or is blocked by browser policies
  }
};

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if(index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(""));
      
      if(iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3; // speed of scramble
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const TiltImage = ({ proj }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center p-0" style={{ perspective: 1200 }}>
      <motion.a 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        href={proj.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block relative w-full h-full group will-change-transform"
      >
        <img
          src={proj.image}
          alt={proj.title}
          className="w-full h-full object-cover md:object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] opacity-60 md:opacity-100"
          style={{ transform: "translateZ(30px)" }}
          data-cursor="view"
          {...(proj.isPriority ? { fetchpriority: "high" } : { loading: "lazy" })}
        />
        <div className="absolute inset-0 bg-emerald-500/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none" style={{ transform: "translateZ(10px)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
      </motion.a>
    </div>
  );
};

const PreviewModal = ({ isOpen, onClose, url }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-neutral-950 border border-emerald-500/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/20 bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group/btn">
                  <X className="w-2 h-2 text-black opacity-0 group-hover/btn:opacity-100" />
                </button>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-[10px] text-neutral-400 tracking-widest uppercase hidden sm:block truncate max-w-[200px] md:max-w-md">Preview: {url}</span>
              </div>
              <div className="flex items-center gap-4">
                <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                  Open in New Tab
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>
            <div className="flex-grow bg-white w-full h-full relative">
              <iframe 
                src={url} 
                className="absolute inset-0 w-full h-full border-0 bg-white" 
                title="Live Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  const goPrev = useCallback(() => {
    playBeep();
    scrollTo(activeIndex - 1);
  }, [activeIndex, scrollTo]);
  
  const goNext = useCallback(() => {
    playBeep();
    scrollTo(activeIndex + 1);
  }, [activeIndex, scrollTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ensure we're not typing in an input
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="the-builder" className="relative w-full isolate overflow-hidden bg-black py-12 md:py-20 scroll-mt-20 min-h-[90vh] flex flex-col justify-center">
      
      {/* --- Visual Decor: Ambilight Glow --- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 z-0"
        style={{ backgroundColor: projectsData[activeIndex].glowColor }}
      />
      
      {/* --- Visual Decor: Animated Grid --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)'
      }} />

      {/* --- Visual Decor: Radar Sweep --- */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(16,185,129,0.3)_360deg)] rounded-full blur-3xl animate-[spin_10s_linear_infinite] pointer-events-none z-0" />
      
      {/* --- Visual Decor: CRT Scanlines & Noise --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay z-[150]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 pointer-events-none z-[150] mix-blend-overlay opacity-30" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3))',
        backgroundSize: '100% 4px'
      }} />

      <motion.div 
        className="w-full max-w-[95vw] lg:max-w-7xl mx-auto px-2 sm:px-6 md:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* ── Header Row ─────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 px-2">
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
        </motion.div>

        {/* ── Project Display ────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="relative overflow-visible w-full mt-4">
          
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}
          </style>

          {/* Native Scroll Track */}
          <div
            ref={containerRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth pb-8"
          >
            {projectsData.map((proj, index) => (
              <div
                key={proj.id}
                data-index={index}
                className="w-full flex-shrink-0 snap-center flex flex-col items-center justify-center relative px-2 md:px-0"
              >
                <div className="relative w-full max-w-6xl h-[60vh] md:h-[75vh] flex items-center justify-center">
                  
                  {/* Backdrop Image - Full Size */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-black">
                    <TiltImage proj={proj} />
                  </div>

                  {/* Floating Glass Card (Asymmetric) */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:right-10 md:left-auto md:w-[480px] lg:w-[550px] p-6 sm:p-8 bg-neutral-950/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] flex flex-col z-20">
                    
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
                      {activeIndex === index ? <ScrambleText text={proj.title} /> : proj.title}
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
                    {proj.techStack.map((tech) => {
                      const techColors = {
                        'React': '#61dafb',
                        'Tailwind': '#38bdf8',
                        'Vite': '#bd34fe',
                        'Blockchain': '#f3ba2f',
                        'Figma': '#f24e1e',
                        'Zustand': '#ea4c89',
                        'Gemini AI': '#10b981',
                        'Supabase': '#3ecf8e',
                        'TradingView Lightweight Charts': '#2962ff',
                        'REST API': '#f87171'
                      };
                      const color = techColors[tech] || '#10b981';
                      return (
                        <span 
                          key={tech} 
                          className="text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 transition-all duration-300 cursor-default"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = color;
                            e.currentTarget.style.color = color;
                            e.currentTarget.style.boxShadow = `0 0 12px ${color}30`;
                            e.currentTarget.style.backgroundColor = `${color}10`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = '#a3a3a3'; // text-neutral-400
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; // bg-white/5
                          }}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setPreviewUrl(proj.link);
                        setIsPreviewOpen(true);
                      }}
                      className="group/cta inline-flex items-center gap-2 w-fit px-6 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-mono text-xs uppercase tracking-widest hover:bg-emerald-500/15 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
                    >
                      <span>View Live Protocol</span>
                      <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </motion.div>

        {/* ── Dots ────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex items-center justify-center mt-6">
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
        </motion.div>
      </motion.div>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        url={previewUrl} 
      />
    </section>
  );
}
