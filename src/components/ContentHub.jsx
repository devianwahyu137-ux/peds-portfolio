import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, X, ExternalLink, BookOpen, Clock, ShieldCheck, Cpu, ArrowUpRight, MonitorPlay, BarChart3 } from 'lucide-react';
import BorderBeam from './BorderBeam';

// 3D Card Hover Container
function TiltCard({ children, className, isFeatured = false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function ContentHub() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: "qM3-fv5LukQ",
      title: "Trading Essentials Series: Part 1 - How to Read Any Market",
      thumbnail: "https://i.ytimg.com/vi/qM3-fv5LukQ/sddefault.jpg",
      tag: "PDS-001 | FOUNDATION",
      duration: "14:20",
      views: "Institutional Tape Reading",
      confidence: "98.2%"
    },
    {
      id: "8HEU5I7qRNM",
      title: "My First Trading Plan: Putting It All Together",
      thumbnail: "https://i.ytimg.com/vi/8HEU5I7qRNM/sddefault.jpg",
      tag: "PDS-002 | TACTICAL",
      duration: "18:45",
      views: "Risk Management Matrix",
      confidence: "96.5%"
    },
    {
      id: "rm8YgeCLcaI",
      title: "Unmasking the Whales: Tracking Institutional Moves with Arkham",
      thumbnail: "https://i.ytimg.com/vi/rm8YgeCLcaI/sddefault.jpg",
      tag: "PDS-003 | INTELLIGENCE",
      duration: "21:10",
      views: "On-Chain & Order Flow",
      confidence: "99.1%"
    }
  ];

  const reports = [
    {
      date: "Apr 18, 2026",
      category: "GEOPOLITICS // CURRENCY REGIME",
      title: "The Petrodollar Is Not Dying. But It Is Fracturing.",
      abstract: "Global trade is witnessing a structural shift as alternative settlement platforms like mBridge process billions in cross-border settlements. An institutional audit on dollar hegemony and multi-currency clearing architectures.",
      readingTime: "6 min read",
      platform: "Substack",
      label: "Institutional Deep-Dive (ENG)",
      link: "https://substack.com/@pedsanalysis/note/c-245342784?r=399xyt&utm_source=notes-share-action&utm_medium=web",
      isFeatured: true,
      confidence: "98.4%",
      macroDepth: "Tier-1 Sovereign",
      beamColorFrom: "#10b981",
      beamColorTo: "#38bdf8"
    },
    {
      date: "May 1, 2026",
      category: "MARKET STRUCTURE // QUANT ALPHA",
      title: "Why Bitcoin's Recovery Looks Different This Time",
      abstract: "Analyzing eight institutional liquidity metrics to differentiate whether current structural momentum represents sovereign-level spot accumulation or an engineered derivative short-squeeze trap.",
      readingTime: "10 min read",
      platform: "Substack",
      label: "Institutional Deep-Dive (ENG)",
      link: "https://substack.com/@pedsanalysis/note/c-251401558?r=399xyt&utm_source=notes-share-action&utm_medium=web",
      isFeatured: true,
      confidence: "95.8%",
      macroDepth: "On-Chain & Macro",
      beamColorFrom: "#a855f7",
      beamColorTo: "#10b981"
    },
    {
      date: "Mar 29, 2026",
      category: "MACRO ECONOMY // FX VALUATION",
      title: "Mengapa Rupiah Menyentuh Rp17.000?",
      abstract: "Dekomposisi tiga lapis tekanan makroekonomi: inflasi impor, defisit neraca pembayaran, dan disparitas yield SBN vs US Treasuries yang mendorong mata uang Garuda ke level psikologis baru.",
      readingTime: "5 min read",
      platform: "Medium",
      label: "Market Insights (IDN)",
      link: "https://medium.com/@devianwahyu137/mengapa-rupiah-menyentuh-rp17-000-d4942c191db9",
      isFeatured: false,
      confidence: "94.2%",
      macroDepth: "Domestic Fiscal & FX",
      beamColorFrom: "#10b981",
      beamColorTo: "#50fa7b"
    }
  ];

  return (
    <section className="relative w-full space-y-24 isolate overflow-visible scroll-mt-24">
      
      {/* ══ Area 1: Market Briefs (YouTube Intelligence) ══ */}
      <div id="market-briefs" className="scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-red-400 font-mono text-xs uppercase tracking-[0.25em]">
                Video Intelligence • 3D Card Architecture
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Market Briefs & Dispatches
            </h2>
          </div>

          <a
            href="https://youtube.com/@chastflash?si=XHy7taOhQFG25iiD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs hover:bg-red-500 hover:text-white transition-all w-fit"
          >
            <MonitorPlay className="w-4 h-4" />
            <span>ChastFlash YouTube Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {videos.map((video, idx) => (
            <TiltCard key={video.id} className="h-full">
              <div
                onClick={() => setActiveVideo(video.id)}
                className="group relative h-full rounded-xl md:rounded-2xl overflow-hidden bg-neutral-950/92 border border-white/10 shadow-lg transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_0_35px_rgba(239,68,68,0.15)] cursor-pointer flex flex-col justify-between"
              >
                {/* Media Thumbnail Container: Sleek 16:9 Widescreen */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[9px] text-white/90 uppercase tracking-wider">
                    {video.tag}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[9px] text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-red-600/90 backdrop-blur-md rounded-full border border-red-400 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 
                      className="font-display font-bold text-sm sm:text-base text-white group-hover:text-red-300 transition-colors line-clamp-2 leading-snug mb-2 sm:mb-3"
                      style={{ color: '#FFFFFF' }}
                    >
                      {video.title}
                    </h3>
                  </div>

                  {/* Terminal Metadata Footer */}
                  <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-neutral-300">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Confidence: {video.confidence}
                    </span>
                    <span className="text-neutral-400 uppercase">
                      {video.views}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* ══ Area 2: Research Reports (3D Tilt + Magic UI Border Beam) ══ */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em]">
                Institutional Research • Magic UI Border Beam
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Macro & Geopolitical Reports
            </h2>
          </div>

          <a
            href="https://substack.com/@pedsanalysis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs hover:bg-emerald-500 hover:text-black transition-all w-fit"
          >
            <BookOpen className="w-4 h-4" />
            <span>Visit Substack Publication</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, idx) => (
            <TiltCard key={idx} className="h-full">
              <a
                href={report.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-full rounded-2xl overflow-hidden bg-neutral-950/92 border border-white/10 shadow-lg transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] p-6 sm:p-7 flex flex-col justify-between block"
              >
                {/* Magic UI Border Beam on Featured Reports */}
                {report.isFeatured && (
                  <BorderBeam
                    duration={8}
                    colorFrom={report.beamColorFrom}
                    colorTo={report.beamColorTo}
                    borderWidth={1.5}
                  />
                )}

                <div>
                  {/* Top Header & Metadata Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-neutral-400">
                      {report.date}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-medium">
                      {report.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
                    {report.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-body mb-6">
                    {report.abstract}
                  </p>
                </div>

                {/* Bottom Institutional Terminal Badges */}
                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-neutral-400">
                      MACRO DEPTH: <strong className="text-white font-medium">{report.macroDepth}</strong>
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      CONFIDENCE: {report.confidence}
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${report.platform === 'Substack' ? 'bg-orange-500' : 'bg-emerald-400'}`} />
                      <span className="text-neutral-300">{report.label}</span>
                    </div>
                    <span className="text-neutral-400 flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                      {report.readingTime}
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* ══ Video Player Lightbox Modal ══ */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-neutral-950 border border-red-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.2)] z-10"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-white/10">
                <span className="font-mono text-xs text-neutral-300">Market Brief Dispatch</span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                  title="YouTube video player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
