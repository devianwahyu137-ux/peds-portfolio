import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  MonitorPlay, 
  ArrowUpRight, 
  BookOpen, 
  Code2, 
  Globe2, 
  Sparkles,
  Share2
} from 'lucide-react';

export default function SocialHub() {
  const platforms = [
    {
      id: 'substack',
      name: 'Substack Publication',
      handle: '@pedsanalysis',
      title: 'The Macro Playbook & Sovereign Axis',
      desc: 'Institutional geopolitical memos, foreign exchange dynamics, and global liquidity flows.',
      badge: 'FLAGSHIP PUBLICATION',
      icon: FileText,
      link: 'https://substack.com/@pedsanalysis?r=399xyt&utm_campaign=profile&utm_medium=profile-page',
      colSpan: 'md:col-span-2',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      borderHover: 'hover:border-emerald-500/50',
      textAccent: 'text-emerald-400',
      bgTag: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'x',
      name: 'X (Formerly Twitter)',
      handle: '@ChastFlash',
      title: 'Real-Time Market Sentiment',
      desc: 'Rapid tactical observations, economic data releases, and intermarket alpha.',
      badge: 'ALPHA RADAR',
      icon: MessageSquare,
      link: 'https://x.com/chastflash?s=21',
      colSpan: 'col-span-1',
      accentColor: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.25)',
      borderHover: 'hover:border-sky-400/50',
      textAccent: 'text-sky-400',
      bgTag: 'bg-sky-500/10 border-sky-500/30'
    },
    {
      id: 'youtube',
      name: 'YouTube Intelligence',
      handle: '@ChastFlash',
      title: 'ChastFlash Video Dispatches',
      desc: 'Deep-dive trading essentials, institutional order flow breakdowns, and market anatomy.',
      badge: 'VIDEO DISPATCHES',
      icon: MonitorPlay,
      link: 'https://youtube.com/@chastflash?si=iCLJkT1lHcjVJQXS',
      colSpan: 'col-span-1',
      accentColor: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.25)',
      borderHover: 'hover:border-red-500/50',
      textAccent: 'text-red-400',
      bgTag: 'bg-red-500/10 border-red-500/30'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Professional',
      handle: 'Devian Wahyu Nugroho',
      title: 'Executive Network & Verification',
      desc: 'Professional credentials, university affiliations (FEB UGM), and strategic partnerships.',
      badge: 'VERIFIED NETWORK',
      icon: Globe2,
      link: 'https://www.linkedin.com/in/devianwahyu77',
      colSpan: 'col-span-1',
      accentColor: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.25)',
      borderHover: 'hover:border-blue-500/50',
      textAccent: 'text-blue-400',
      bgTag: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      id: 'github',
      name: 'GitHub Repositories',
      handle: '@devianwahyu137-ux',
      title: 'Quantitative & FinTech Source Code',
      desc: 'Decision support platforms, algorithmic backtesters, and responsive web architectures.',
      badge: 'OPEN SOURCE',
      icon: Code2,
      link: 'https://github.com/devianwahyu137-ux',
      colSpan: 'col-span-1',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.22)',
      borderHover: 'hover:border-emerald-500/50',
      textAccent: 'text-emerald-400',
      bgTag: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'medium',
      name: 'Medium Publications',
      handle: '@devianwahyu137',
      title: 'Indonesian Economic Perspectives',
      desc: 'Bahasa Indonesia essays on local currency pressure, macroeconomic policy, and tech disruption.',
      badge: 'REGIONAL ESSAYS',
      icon: BookOpen,
      link: 'https://medium.com/@devianwahyu137',
      colSpan: 'col-span-1',
      accentColor: '#e2e8f0',
      glowColor: 'rgba(255, 255, 255, 0.2)',
      borderHover: 'hover:border-white/50',
      textAccent: 'text-white',
      bgTag: 'bg-white/10 border-white/20'
    }
  ];

  return (
    <section id="social-hub" className="relative w-full py-12 scroll-mt-24">
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.25em]">
              Digital Ecosystem • Multi-Platform Bento
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Institutional Network
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
            6 ECOSYSTEM NODES ACTIVE
          </span>
        </div>
      </div>

      {/* ── Mini Bento Grid (2-Column Mobile, 3-Column Desktop) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
        {platforms.map((p, idx) => {
          const Icon = p.icon;
          const isFullWidthMobile = p.id === 'substack';
          return (
            <motion.a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`group relative rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-7 bg-neutral-950/92 border border-white/10 transition-all duration-500 hover:-translate-y-1 ${isFullWidthMobile ? 'col-span-2 md:col-span-2' : 'col-span-1'} ${p.borderHover} flex flex-col justify-between overflow-hidden shadow-lg`}
              style={{
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 35px ${p.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Dynamic Color Ambilight Glow */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: p.glowColor }}
              />

              <div>
                {/* Top Badge & Handle */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold border ${p.bgTag} ${p.textAccent}`}>
                    {p.badge}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                    <span className="hidden sm:inline truncate max-w-[120px]">{p.handle}</span>
                    <ArrowUpRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${p.textAccent} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                  </div>
                </div>

                {/* Main Identity */}
                <div className="flex items-start gap-2.5 sm:gap-3.5 mb-1 sm:mb-2">
                  <div className={`p-1.5 sm:p-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/10 ${p.textAccent} group-hover:scale-105 transition-transform shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-xs sm:text-base md:text-xl text-white group-hover:text-white transition-colors truncate">
                      {p.name}
                    </h3>
                    <p className={`font-mono text-[10px] sm:text-xs ${p.textAccent} font-medium mt-0.5 truncate`}>
                      {p.title}
                    </p>
                  </div>
                </div>

                {/* Description (Visible on sm+) */}
                <p className="hidden sm:block text-xs sm:text-sm text-neutral-300 leading-relaxed font-body mt-2">
                  {p.desc}
                </p>
              </div>

              {/* Bottom Footer Chip (Visible on sm+) */}
              <div className="hidden sm:flex pt-3 mt-3 border-t border-white/5 items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-400">
                <span className="uppercase tracking-wider">SECURE LINK DISPATCH</span>
                <span className={`group-hover:${p.textAccent} transition-colors font-semibold`}>CONNECT →</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
