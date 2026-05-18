import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink } from 'lucide-react';

export default function ContentHub() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: "qM3-fv5LukQ",
      title: "Trading Essentials Series: Part 1 - How to Read Any Market",
      thumbnail: "https://i.ytimg.com/vi/qM3-fv5LukQ/sddefault.jpg",
      tag: "PDS-001 | FOUNDATION"
    },
    {
      id: "8HEU5I7qRNM",
      title: "My First Trading Plan: Putting It All Together",
      thumbnail: "https://i.ytimg.com/vi/8HEU5I7qRNM/sddefault.jpg",
      tag: "PDS-002 | TACTICAL"
    },
    {
      id: "rm8YgeCLcaI",
      title: "Unmasking the Whales: Tracking Institutional Moves with Arkham",
      thumbnail: "https://i.ytimg.com/vi/rm8YgeCLcaI/sddefault.jpg",
      tag: "PDS-003 | INTELLIGENCE"
    }
  ];

  const reports = [
    {
      date: "Apr 18, 2026",
      category: "GEOPOLITICS",
      title: "The Petrodollar Is Not Dying. But It Is Fracturing.",
      abstract: "Global trade is witnessing a structural shift as alternative settlement platforms like mBridge process billions in cross-border transactions. This report explores the fracturing of dollar dominance and the emergence of a multi-polar financial system.",
      readingTime: "6 min read",
      platform: "Substack",
      label: "Institutional Deep-Dive (ENG)",
      link: "https://substack.com/@pedsanalysis/note/c-245342784?r=399xyt&utm_source=notes-share-action&utm_medium=web"
    },
    {
      date: "Mar 29, 2026",
      category: "MACRO ECONOMY",
      title: "Mengapa Rupiah Menyentuh Rp17.000?",
      abstract: "Pelemahan Rupiah bukan hanya soal penguatan Dolar, melainkan gabungan tekanan inflasi domestik dan sentimen investor. Artikel tersebut mengupas tiga lapisan masalah utama yang memicu mata uang Garuda menembus level psikologis baru pada Maret 2026.",
      readingTime: "4 min read",
      platform: "Medium",
      label: "Market Insights (IDN)",
      link: "https://medium.com/@devianwahyu137/mengapa-rupiah-menyentuh-rp17-000-d4942c191db9"
    },
    {
      date: "May 1, 2026",
      category: "MARKET STRUCTURE",
      title: "Why Bitcoin's Recovery Looks Different This Time",
      abstract: "Bitcoin has recovered nearly 22% from its early 2026 lows, but is this a genuine trend reversal? This analysis utilizes eight critical data points to determine if the market is entering a new accumulation phase or a sophisticated bull trap.",
      readingTime: "10 min read",
      platform: "Substack",
      label: "Institutional Deep-Dive (ENG)",
      link: "https://substack.com/@pedsanalysis/note/c-251401558?r=399xyt&utm_source=notes-share-action&utm_medium=web"
    }
  ];

  return (
    <section className="relative space-y-24" style={{ willChange: 'transform, opacity', contain: 'content' }}>
      
      {/* Area 1: Market Briefs */}
      <div id="market-briefs" className="scroll-mt-24">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Market Briefs</h2>
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01, margin: "100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveVideo(video.id)}
              className="relative rounded-xl overflow-hidden cursor-pointer group shadow-[0_0_20px_rgba(34,197,94,0.15)] aspect-video bg-[#1A1A1A] border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/30 transition-all duration-300"
            >
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                loading="lazy"
                width="640"
                height="360"
                className="w-full h-full object-cover transition-all duration-500 ease-in-out aspect-video"
              />
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                <span className="self-start px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono tracking-widest text-white/80">
                  {video.tag}
                </span>
                
                <h3 className="font-bold text-white text-lg leading-tight group-hover:text-bullish transition-colors">
                  {video.title}
                </h3>
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 bg-black/60 backdrop-blur-md rounded-full border border-bullish/50 flex items-center justify-center shadow-[0_0_20px_rgba(80,250,123,0.3)]">
                  <Play className="w-6 h-6 text-bullish ml-1" fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube Gateway */}
        <div className="w-full flex justify-center mt-10">
          <a 
            href="https://youtube.com/@chastflash?si=XHy7taOhQFG25iiD" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-2 font-mono text-[10px] tracking-wider text-neutral-500 hover:text-white transition-colors duration-300 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-neutral-700 group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 rotate-45" />
            <span>Launch YouTube Interface</span>
            <span className="text-neutral-700 group-hover:text-white group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Area 2: Research Reports */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Research Reports</h2>
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, idx) => (
            <motion.a
              key={idx}
              href={report.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01, margin: "100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="group relative flex flex-col p-6 rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300 overflow-hidden h-full hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/30"
            >
              {/* Mathematical Grid Background */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-text-secondary">{report.date}</span>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono tracking-widest text-bullish">
                    {report.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 leading-tight">
                  {report.title}
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                  {report.abstract}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${report.platform === 'Substack' ? 'bg-orange-500' : 'bg-white'}`}></span>
                    <span className="text-xs font-medium text-white/80">{report.label}</span>
                  </div>
                  <span className="text-xs font-mono text-text-secondary flex items-center gap-1">
                    {report.readingTime}
                    <ExternalLink className="w-3 h-3 ml-1 group-hover:text-bullish transition-colors" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Substack & Medium Gateways */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Substack Gateway Card */}
          <a href="https://substack.com/@pedsanalysis" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-gradient-to-b from-neutral-900/30 to-neutral-950/60 border border-neutral-800/60 flex flex-col justify-between hover:border-orange-500/20 hover:shadow-[0_0_30px_rgba(249,115,22,0.02)] transition-all duration-500">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500">
                <span>STRAT_WRITING // 01</span>
                <span className="text-orange-400 bg-orange-950/20 px-2 py-0.5 rounded border border-orange-500/10 tracking-wider">SUBSTACK</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">PedsAnalysis Macro Letters ↗</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Analisis berkala mengenai pergeseran geopolitik global, pelacakan likuiditas, dan dampaknya terhadap arsitektur makroekonomi.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300">
              <span className="font-mono text-[9px] tracking-widest uppercase">Subscribe to Letters</span>
              <span className="text-sm transform group-hover:translate-x-1 transition-transform duration-300 text-orange-500/70 group-hover:text-orange-400">→</span>
            </div>
          </a>

          {/* Medium Gateway Card */}
          <a href="https://medium.com/@devianwahyu137" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-gradient-to-b from-neutral-900/30 to-neutral-950/60 border border-neutral-800/60 flex flex-col justify-between hover:border-neutral-400 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500">
                <span>TECH_REPORTS // 02</span>
                <span className="text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 tracking-wider">MEDIUM</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-neutral-300 transition-colors">ChastFlash Publications ↗</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Dokumentasi riset kuantitatif, analisis komparatif protokol desentralisasi, serta catatan teknis mengenai mekanisme pasar keuangan.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300">
              <span className="font-mono text-[9px] tracking-widest uppercase">Open Research Archive</span>
              <span className="text-sm transform group-hover:translate-x-1 transition-transform duration-300 text-neutral-400">→</span>
            </div>
          </a>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
                onClick={() => setActiveVideo(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
