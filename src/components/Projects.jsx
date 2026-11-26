import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  LayoutGrid,
  SlidersHorizontal,
  ExternalLink,
  Maximize2,
  Terminal,
  Activity,
  ShieldCheck,
  Globe,
  Zap,
  LineChart,
  Cpu
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { BentoGrid, BentoCard } from './BentoGrid';

const projectsData = [
  {
    id: 'meridian',
    title: 'Meridian Market Intelligence',
    subtitle: '100% Primary Statutory Data • Stochastic DCF Engine',
    mobileSubtitle: '100% Primary Statutory Data',
    badge: 'EQUITY RESEARCH',
    cardSubtitle: 'STATUTORY INTELLIGENCE',
    icon: LineChart,
    description:
      'Independent buy-side equity and macroeconomic research desk delivering institutional-grade rigor across Indonesian capital markets. Features 20 statutory publications, a 1,000-run Monte Carlo Stochastic DCF valuation engine, and Nelson-Siegel sovereign yield curve modeling with zero commercial bias.',
    features: [
      { badge: 'DCF', title: 'STOCHASTIC_ENGINE', desc: '1,000-run Monte Carlo valuation engine with probabilistic distribution.' },
      { badge: 'YIELD', title: 'NELSON_SIEGEL', desc: 'Nelson-Siegel sovereign yield curve modeling for policy transmissions.' },
      { badge: 'DATA', title: 'STATUTORY_REPORTS', desc: '100% primary audited data with zero commercial sell-side bias.' }
    ],
    techStack: ['TypeScript', 'Next.js', 'Monte Carlo DCF', 'Nelson-Siegel', 'Financial Forensics'],
    image: '/meridian-dashboard.webp',
    link: 'https://meridian-market-intelligence-ivory.vercel.app/',
    isPriority: true,
    glowColor: '#10b981',
    spotlightColor: 'rgba(16, 185, 129, 0.22)',
    accentText: 'text-emerald-400',
    accentBorder: 'group-hover:border-emerald-500/30',
    accentTag: 'group-hover:border-emerald-500/20 group-hover:text-emerald-300',
    accentBadgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500',
    accentPill: 'border-emerald-500/30 text-emerald-400',
    accentDot: 'bg-emerald-400',
    accentHoverBtn: 'hover:bg-emerald-500 hover:text-black',
    accentHoverIcon: 'hover:text-emerald-400',
    imageFit: 'object-cover object-top'
  },
  {
    id: 'tesislab',
    title: 'TesisLab Audit Engine',
    subtitle: 'Anti-Yes-Man Financial Audit • 1,000-Run Monte Carlo',
    mobileSubtitle: 'Anti-Yes-Man Audit • Monte Carlo',
    badge: 'QUANT AUDIT',
    cardSubtitle: 'PRE-MORTEM ENGINE',
    icon: Cpu,
    description:
      'Anti-Yes-Man financial audit engine combining deterministic mathematical calculations (BEP, ATR-14, SMA-50), daily macro context radar, and a 3-division Pre-Mortem simulation to expose bankruptcy and drawdown risks across Trading, MSME, and Cashflow plans with zero number hallucination.',
    features: [
      { badge: 'RISK', title: 'PRE_MORTEM_3D', desc: '3-division adversarial audit stress-testing assumptions before capital deployment.' },
      { badge: 'MATH', title: 'ZERO_HALLUCINATION', desc: 'Deterministic BEP, ATR-14, and 1,000-scenario Monte Carlo ruin modeling.' },
      { badge: 'MACRO', title: 'DAILY_RADAR', desc: 'Live IHSG, BTC, and USD/IDR macro regime context integration.' }
    ],
    techStack: ['Next.js', 'TypeScript', 'Monte Carlo', '3D Pre-Mortem', 'Deterministic Math'],
    image: '/tesislab-dashboard.webp',
    link: 'https://tesislab-rho.vercel.app/',
    isPriority: true,
    glowColor: '#14b8a6',
    spotlightColor: 'rgba(20, 184, 166, 0.22)',
    accentText: 'text-teal-400',
    accentBorder: 'group-hover:border-teal-500/30',
    accentTag: 'group-hover:border-teal-500/20 group-hover:text-teal-300',
    accentBadgeBg: 'bg-teal-500/20 border-teal-500/40 text-teal-300 hover:bg-teal-400',
    accentPill: 'border-teal-500/30 text-teal-400',
    accentDot: 'bg-teal-400',
    accentHoverBtn: 'hover:bg-teal-400 hover:text-black',
    accentHoverIcon: 'hover:text-teal-400',
    imageFit: 'object-cover object-top'
  },
  {
    id: 'nemos-ecosystem',
    title: 'NEMOS Ecosystem',
    subtitle: 'Top 4 BI Hackathon • AI Credit Scoring Pipeline',
    mobileSubtitle: 'Top 4 BI Hackathon • AI Underwriting',
    badge: 'FINTECH VENTURE',
    cardSubtitle: 'ALTERNATIVE FINANCING',
    icon: Zap,
    description:
      'Alternative revenue-based financing platform designed to bridge liquidity gaps for Indonesian MSMEs. Engineered an automated risk-adjusted credit underwriting engine with cash flow deconstruction, securing Top 4 National Finalist honors at PIDI Digdaya x Bank Indonesia Hackathon 2026.',
    features: [
      { badge: 'FINTECH', title: 'REVENUE_FINANCING', desc: 'Alternative capital liquidity and automated credit assessment.' },
      { badge: 'AI/ML', title: 'UNDERWRITING', desc: 'Algorithmic cash flow deconstruction and risk profiling.' },
      { badge: 'AWARD', title: 'BI_FEKDI_2026', desc: 'Top 4 national standing out of 800+ proposals at Bank Indonesia Hackathon.' }
    ],
    techStack: ['React', 'Python / FastAPI', 'Fintech Lending', 'MindsDB', 'Tailwind CSS'],
    image: '/nemos-ecosystem.webp',
    link: 'https://nemos-three.vercel.app/',
    isPriority: false,
    glowColor: '#38bdf8',
    spotlightColor: 'rgba(56, 189, 248, 0.22)',
    accentText: 'text-sky-400',
    accentBorder: 'group-hover:border-sky-500/30',
    accentTag: 'group-hover:border-sky-500/20 group-hover:text-sky-300',
    accentBadgeBg: 'bg-sky-500/20 border-sky-500/40 text-sky-300 hover:bg-sky-400',
    accentPill: 'border-sky-500/30 text-sky-400',
    accentDot: 'bg-sky-400',
    accentHoverBtn: 'hover:bg-sky-400 hover:text-black',
    accentHoverIcon: 'hover:text-sky-400',
    imageFit: 'object-cover object-top'
  },
  {
    id: 'macroscope',
    title: 'Macroscope Axis',
    subtitle: 'Econometric Transmission • MPT Covariance Engine',
    mobileSubtitle: 'Econometrics • MPT Covariance',
    badge: 'MACRO QUANT',
    cardSubtitle: 'PORTFOLIO INTELLIGENCE',
    icon: Activity,
    description:
      'Macro-financial simulation terminal analyzing empirical policy transmissions between central bank rates, SBN sovereign yield durations, and equity performance. Integrates Modern Portfolio Theory (MPT) variance-covariance algorithms and tail-risk stress testing.',
    features: [
      { badge: 'QUANT', title: 'MPT_COVARIANCE', desc: 'Modern Portfolio Theory variance-covariance risk modeling matrix.' },
      { badge: 'DATA', title: 'POLICY_FEED', desc: 'Empirical macroeconomic policy transmission analysis in real-time.' },
      { badge: 'UI', title: 'SBN_CURVE', desc: 'Interactive SBN Sovereign Yield Curve simulation for asset allocation.' }
    ],
    techStack: ['React', 'Python', 'Supabase', 'Zustand', 'Econometrics'],
    image: '/sovereign_axis_dashboard.webp',
    link: 'https://peds-final.vercel.app/',
    isPriority: false,
    glowColor: '#a855f7',
    spotlightColor: 'rgba(168, 85, 247, 0.2)',
    accentText: 'text-purple-400',
    accentBorder: 'group-hover:border-purple-500/30',
    accentTag: 'group-hover:border-purple-500/20 group-hover:text-purple-300',
    accentBadgeBg: 'bg-purple-500/20 border-purple-500/40 text-purple-300 hover:bg-purple-400',
    accentPill: 'border-purple-500/30 text-purple-400',
    accentDot: 'bg-purple-400',
    accentHoverBtn: 'hover:bg-purple-400 hover:text-black',
    accentHoverIcon: 'hover:text-purple-400',
    imageFit: 'object-cover'
  },
  {
    id: 'peds-terminal',
    title: 'PEDS Terminal DSS',
    subtitle: 'TradingView Engine • Automated MPT Risk',
    mobileSubtitle: 'TradingView Engine • MPT Risk',
    badge: 'FLAGSHIP DSS',
    cardSubtitle: 'DECISION SUPPORT SYSTEM',
    icon: Terminal,
    description:
      'Proprietary institutional decision support system integrating real-time macroeconomic feeds, order book imbalance tracking, automated risk-budgeting parameters, and algorithmic execution analytics.',
    features: [
      { badge: 'RISK', title: 'ORDER_IMBALANCE', desc: 'Automated quantitative risk budgeting and imbalance tracking.' },
      { badge: 'FEED', title: 'MACRO_REGIME', desc: 'Institutional macroeconomic sentiment tracking mechanism.' },
      { badge: 'VIEW', title: 'TRADINGVIEW_V5', desc: 'Interactive native TradingView lightweight charting interface.' }
    ],
    techStack: ['TradingView Lightweight', 'REST API', 'Vite', 'Macro Engine', 'Quantitative Risk'],
    image: '/peds-terminal.webp',
    link: 'https://peds-terminal.vercel.app/',
    isPriority: false,
    glowColor: '#f59e0b',
    spotlightColor: 'rgba(245, 158, 11, 0.2)',
    accentText: 'text-amber-400',
    accentBorder: 'group-hover:border-amber-500/30',
    accentTag: 'group-hover:border-amber-500/20 group-hover:text-amber-300',
    accentBadgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-400',
    accentPill: 'border-amber-500/30 text-amber-400',
    accentDot: 'bg-amber-400',
    accentHoverBtn: 'hover:bg-amber-400 hover:text-black',
    accentHoverIcon: 'hover:text-amber-400',
    imageFit: 'object-cover'
  },
  {
    id: 'desa-surorejo',
    title: 'Desa Surorejo Portal',
    subtitle: 'GIS Mapping • Civic Transparency Index',
    mobileSubtitle: 'Public Sector • Governance GIS',
    badge: 'PUBLIC SECTOR',
    cardSubtitle: 'REGIONAL GOVERNANCE',
    icon: Globe,
    description:
      'Regional governance portal delivering public budget transparency, spatial GIS cadastral mapping, citizen administrative routing, and economic analytics for rural community empowerment.',
    features: [
      { badge: 'GOV', title: 'PUBLIC_SERVICES', desc: 'Digital administration portal streamlining village citizen workflows.' },
      { badge: 'INFO', title: 'BUDGET_AUDIT', desc: 'Integrated regional public infrastructure and budget transparency.' },
      { badge: 'GIS', title: 'SPATIAL_MAPPING', desc: 'Interactive Leaflet GIS cadastral mapping with zero-latency delivery.' }
    ],
    techStack: ['React', 'Leaflet GIS', 'Tailwind CSS', 'Public API', 'Open Government'],
    image: '/beranda-web-surorejo.webp',
    link: 'https://beranda-surorejo.vercel.app/',
    isPriority: false,
    glowColor: '#10b981',
    spotlightColor: 'rgba(16, 185, 129, 0.2)',
    accentText: 'text-emerald-400',
    accentBorder: 'group-hover:border-emerald-500/30',
    accentTag: 'group-hover:border-emerald-500/20 group-hover:text-emerald-300',
    accentBadgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500',
    accentPill: 'border-emerald-500/30 text-emerald-400',
    accentDot: 'bg-emerald-400',
    accentHoverBtn: 'hover:bg-emerald-500 hover:text-black',
    accentHoverIcon: 'hover:text-emerald-400',
    imageFit: 'object-cover'
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
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Ignore if audio fails or is blocked by browser policies
  }
};

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const TiltImage = ({ proj }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseEnter = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;
    const xPct = (e.clientX - rectRef.current.left) / rectRef.current.width - 0.5;
    const yPct = (e.clientY - rectRef.current.top) / rectRef.current.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center p-0">
      <motion.a
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        href={proj.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full group will-change-transform"
      >
        <img
          src={proj.image}
          alt={proj.title}
          width="900"
          height="600"
          decoding="async"
          className="w-full h-full object-cover md:object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] opacity-60 md:opacity-100"
          style={{ transform: 'translateZ(30px)' }}
          data-cursor="view"
          {...(proj.isPriority ? { fetchPriority: 'high' } : { loading: 'lazy' })}
        />
        <div
          className="absolute inset-0 bg-emerald-500/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
          style={{ transform: 'translateZ(10px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
      </motion.a>
    </div>
  );
};

const PreviewModal = ({ isOpen, onClose, project }) => {
  const url = project?.link;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 120 }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 300) {
                onClose();
              }
            }}
            className="relative w-full md:max-w-6xl h-[90vh] md:h-[85vh] bg-neutral-950 border-t md:border border-emerald-500/30 rounded-t-3xl md:rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.18)] flex flex-col overflow-hidden z-10 touch-pan-y"
          >
            {/* Mobile Drag Handle Bar */}
            <div className="md:hidden w-full flex justify-center py-2.5 bg-neutral-900/90 border-b border-white/5 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-neutral-600" />
            </div>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 md:py-3 border-b border-emerald-500/20 bg-neutral-900/90 backdrop-blur-md">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={onClose}
                  className="w-3.5 h-3.5 md:w-3 md:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group/btn cursor-pointer shrink-0"
                  aria-label="Close Preview"
                >
                  <X className="w-2.5 h-2.5 md:w-2 md:h-2 text-black opacity-100 md:opacity-0 group-hover/btn:opacity-100" />
                </button>
                <div className="hidden md:block w-3 h-3 rounded-full bg-yellow-500/80 shrink-0" />
                <div className="hidden md:block w-3 h-3 rounded-full bg-green-500/80 shrink-0" />
                <span className="ml-2 md:ml-3 font-mono text-[10px] md:text-[11px] text-neutral-400 tracking-wider truncate">
                  {project.title} — {url}
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 font-mono text-[11px] md:text-xs text-emerald-400 hover:bg-emerald-500 hover:text-black flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold"
                >
                  <span>Open in Tab</span>
                  <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </a>
              </div>
            </div>

            {/* Sub-header CSP Notice Bar */}
            <div className="px-4 py-2 bg-neutral-900/60 border-b border-white/5 flex items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">
                  Live deployment may enforce X-Frame-Options / CSP. If embedded view is restricted, launch directly:
                </span>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline shrink-0 flex items-center gap-1 font-semibold"
              >
                <span>Open Directly ↗</span>
              </a>
            </div>

            {/* Preview Body: Live Iframe with Clean Project Briefing */}
            <div className="flex-grow bg-neutral-950 w-full h-full relative overflow-hidden">
              <iframe
                src={url}
                className="relative w-full h-full border-0 z-10 bg-transparent"
                title={`Live Preview - ${project.title}`}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />

              {/* Floating Quick Action Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 z-20 pointer-events-none">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950/90 border border-white/10 backdrop-blur-md text-[11px] font-mono text-neutral-300 pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{project.subtitle}</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950/90 border border-emerald-500/40 backdrop-blur-md text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono text-xs font-semibold shadow-xl transition-all pointer-events-auto"
                >
                  <span>Open Live Site in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
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
  const [previewProject, setPreviewProject] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('bento');

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
  }, [viewMode]);

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

  useEffect(() => {
    if (viewMode !== 'carousel' || isPreviewOpen) return;
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, viewMode, isPreviewOpen]);

  const openPreview = (proj) => {
    playBeep();
    setPreviewProject(proj);
    setIsPreviewOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 110, damping: 20 }
    }
  };

  const techColors = {
    'React': '#61dafb',
    'Next.js': '#ffffff',
    'TypeScript': '#3178c6',
    'Tailwind CSS': '#38bdf8',
    'Vite': '#bd34fe',
    'Python / FastAPI': '#10b981',
    'Python': '#3776ab',
    'MindsDB': '#00a67e',
    'Zustand': '#ea4c89',
    'Supabase': '#3ecf8e',
    'TradingView Lightweight': '#2962ff',
    'Leaflet GIS': '#199900',
    'REST API': '#f87171',
    'Monte Carlo': '#14b8a6',
    'Monte Carlo DCF': '#10b981',
    '3D Pre-Mortem': '#38bdf8'
  };

  return (
    <section id="the-builder" className="relative w-full isolate overflow-hidden bg-black py-12 md:py-20 scroll-mt-20 min-h-[90vh] flex flex-col justify-center">
      {/* --- Visual Decor: Ambilight Glow --- */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 z-0"
        style={{ backgroundColor: projectsData[activeIndex].glowColor }}
      />

      {/* --- Visual Decor: Animated Grid --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)'
        }}
      />

      {/* --- Visual Decor: Radar Sweep --- */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(16,185,129,0.2)_360deg)] rounded-full blur-3xl animate-[spin_10s_linear_infinite] pointer-events-none z-0" />

      <motion.div
        className="w-full max-w-[95vw] lg:max-w-7xl mx-auto px-2 sm:px-6 md:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* ── Header Row with View Mode Switcher ─────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 px-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                Portfolio Archive & Quantitative Systems ({projectsData.length} Deployments)
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              The Builder Archive
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900/90 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => {
                  playBeep();
                  setViewMode('bento');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  viewMode === 'bento'
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Matrix</span>
              </button>
              <button
                onClick={() => {
                  playBeep();
                  setViewMode('carousel');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Carousel Flow</span>
              </button>
            </div>

            {viewMode === 'carousel' && (
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1 font-mono md:mr-2">
                  <span className="text-xl md:text-2xl font-bold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="text-neutral-400 text-sm">/</span>
                  <span className="text-neutral-400 text-sm">{String(projectsData.length).padStart(2, '0')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-25 disabled:cursor-not-allowed bg-neutral-900/50 backdrop-blur-sm cursor-pointer"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={activeIndex === projectsData.length - 1}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-25 disabled:cursor-not-allowed bg-neutral-900/50 backdrop-blur-sm cursor-pointer"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── View Mode: Bento Matrix (Balanced 2-col iPad & Desktop Grid) ── */}
        {viewMode === 'bento' && (
          <motion.div
            key="bento-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full mt-4"
          >
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 auto-rows-auto">
              {projectsData.map((proj) => (
                <BentoCard
                  key={proj.id}
                  className="col-span-1 md:col-span-1 lg:col-span-3 relative overflow-hidden"
                  badge={proj.badge}
                  subtitle={proj.cardSubtitle}
                  icon={proj.icon}
                  spotlightColor={proj.spotlightColor}
                >
                  <div className="relative w-full h-full flex flex-col justify-between">
                    {/* Mobile Compact Landscape Row (< md) */}
                    <div className="flex md:hidden items-center gap-3.5 w-full">
                      <div className="w-28 h-20 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shrink-0 relative shadow-md">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          loading="lazy"
                          decoding="async"
                          width="112"
                          height="80"
                          className={`w-full h-full ${proj.imageFit} opacity-95`}
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                        <span className={`font-mono text-[10px] ${proj.accentText} font-medium truncate`}>
                          {proj.mobileSubtitle}
                        </span>
                        <h3 className="text-sm font-semibold text-white truncate">
                          {proj.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openPreview(proj);
                            }}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-medium transition-all shadow-sm cursor-pointer ${proj.accentBadgeBg} hover:text-black`}
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Preview</span>
                          </button>
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/15 text-neutral-200 hover:text-white hover:bg-white/10 text-[11px] font-mono transition-all"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* iPad & Desktop Full Layout (md+) */}
                    <div className="hidden md:flex flex-col justify-between w-full h-full">
                      <div className={`relative w-full h-44 lg:h-48 rounded-xl overflow-hidden border border-white/10 bg-black ${proj.accentBorder} transition-all`}>
                        <img
                          src={proj.image}
                          alt={proj.title}
                          loading={proj.isPriority ? 'eager' : 'lazy'}
                          decoding="async"
                          width="800"
                          height="450"
                          className={`w-full h-full ${proj.imageFit} opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-transparent" />

                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openPreview(proj);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono transition-all cursor-pointer ${proj.accentHoverBtn}`}
                            title="Live In-App Preview"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 transition-colors ${proj.accentHoverIcon}`}
                            aria-label={`Open ${proj.title} in new tab`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        <div className={`absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/80 border font-mono text-[10px] max-w-[90%] truncate ${proj.accentPill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${proj.accentDot} shrink-0`} />
                          <span className="truncate">{proj.subtitle}</span>
                        </div>
                      </div>

                      <div className="mt-3.5 flex flex-col justify-end">
                        <h3 className="text-base lg:text-lg font-display font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs lg:text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-3">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 lg:gap-2 font-mono text-[10px]">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 transition-colors ${proj.accentTag}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </BentoGrid>
          </motion.div>
        )}

        {/* ── View Mode: Cinematic Carousel Track ────────────────── */}
        {viewMode === 'carousel' && (
          <motion.div
            key="carousel-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            variants={itemVariants}
            className="relative overflow-visible w-full mt-4"
          >
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}
            </style>

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
                    <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-black">
                      <TiltImage proj={proj} />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 md:bottom-10 md:right-10 md:left-auto md:w-[480px] lg:w-[550px] p-3.5 sm:p-6 md:p-8 bg-neutral-950/85 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] flex flex-col z-20 max-h-[78%] overflow-y-auto hide-scrollbar">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                        <span className="text-emerald-500 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                          Project {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                      </div>

                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="group inline-flex w-fit mb-0.5 md:mb-1">
                        <h3 className="text-base sm:text-2xl md:text-4xl font-bold text-white flex items-center gap-2 md:gap-3 group-hover:text-emerald-400 transition-colors">
                          {activeIndex === index ? <ScrambleText text={proj.title} /> : proj.title}
                          <svg
                            className="w-4 h-4 md:w-6 md:h-6 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </h3>
                      </a>
                      <p className="text-[10px] sm:text-xs md:text-sm text-neutral-400 font-mono tracking-wider mb-2 sm:mb-4 md:mb-8">
                        {proj.subtitle}
                      </p>

                      <div className="space-y-1.5 sm:space-y-3 md:space-y-5 mb-2.5 sm:mb-5 md:mb-10 flex-grow">
                        {proj.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 md:gap-4">
                            <span className="flex-shrink-0 text-[8px] md:text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 rounded font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-widest mt-0.5">
                              {feature.badge}
                            </span>
                            <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-neutral-400 line-clamp-2 md:line-clamp-none">
                              <strong className="text-neutral-200 font-semibold">{feature.title}:</strong> {feature.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-2.5 sm:mb-5 md:mb-8">
                        {proj.techStack.map((tech) => {
                          const color = techColors[tech] || '#10b981';
                          return (
                            <span
                              key={tech}
                              className="text-[9px] md:text-[10px] font-mono tracking-wider px-2 py-0.5 md:px-3 md:py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 transition-all duration-300 cursor-default"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = color;
                                e.currentTarget.style.color = color;
                                e.currentTarget.style.boxShadow = `0 0 12px ${color}30`;
                                e.currentTarget.style.backgroundColor = `${color}10`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = '#a3a3a3';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                              }}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>

                      <div className="pt-1 md:pt-2">
                        <button
                          onClick={() => openPreview(proj)}
                          className="group/cta inline-flex items-center gap-1.5 md:gap-2 w-fit px-3.5 py-1.5 md:px-6 md:py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-mono text-[10px] md:text-xs uppercase tracking-widest hover:bg-emerald-500/15 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer"
                        >
                          <span>View Live Protocol</span>
                          <svg
                            className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/cta:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center gap-2">
                {projectsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className="w-8 h-8 flex items-center justify-center p-2 cursor-pointer"
                    aria-label={`Go to project ${index + 1}`}
                  >
                    <div
                      className={`transition-all duration-500 rounded-full ${
                        activeIndex === index
                          ? 'w-8 h-2 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                          : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        project={previewProject}
      />
    </section>
  );
}
