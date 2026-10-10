import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  MonitorPlay, 
  ArrowUpRight, 
  BookOpen, 
  Code2, 
  Sparkles
} from 'lucide-react';

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export default function SocialHub() {
  const platforms = [
    {
      id: 'linkedin',
      name: 'LinkedIn Professional',
      handle: 'Devian Wahyu Nugroho',
      title: 'Executive Network & Audited Pedigree',
      desc: 'Professional credentials, university affiliations (FEB UGM), institutional research endorsements, and executive business partnerships.',
      badge: 'FLAGSHIP EXECUTIVE NETWORK',
      icon: LinkedInIcon,
      link: 'https://www.linkedin.com/in/devianwahyu77',
      isFullWidth: true,
      accentColor: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.25)',
      borderHover: 'hover:border-sky-400/50',
      textAccent: 'text-sky-400',
      bgTag: 'bg-sky-500/10 border-sky-500/30'
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
      isFullWidth: false,
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
      isFullWidth: false,
      accentColor: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.25)',
      borderHover: 'hover:border-red-500/50',
      textAccent: 'text-red-400',
      bgTag: 'bg-red-500/10 border-red-500/30'
    },
    {
      id: 'substack',
      name: 'Substack Publication',
      handle: '@pedsanalysis',
      title: 'The Macro Playbook & Sovereign Axis',
      desc: 'Institutional geopolitical memos, foreign exchange dynamics, and global liquidity flows.',
      badge: 'RESEARCH MEMOS',
      icon: FileText,
      link: 'https://substack.com/@pedsanalysis?r=399xyt&utm_campaign=profile&utm_medium=profile-page',
      isFullWidth: false,
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      borderHover: 'hover:border-emerald-500/50',
      textAccent: 'text-emerald-400',
      bgTag: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'tiktok',
      name: 'TikTok Official',
      handle: '@devianwn',
      title: 'Short-Form Market Alpha',
      desc: 'Concise market dynamics reels, quantitative macro takeaways, and financial literacy videos.',
      badge: 'SHORT-FORM ALPHA',
      icon: TikTokIcon,
      link: 'https://www.tiktok.com/@devianwn',
      isFullWidth: false,
      accentColor: '#fe2c55',
      glowColor: 'rgba(254, 44, 85, 0.25)',
      borderHover: 'hover:border-[#fe2c55]/50',
      textAccent: 'text-[#fe2c55]',
      bgTag: 'bg-[#fe2c55]/10 border-[#fe2c55]/30'
    },
    {
      id: 'github',
      name: 'GitHub Repositories',
      handle: '@devianwahyu137-ux',
      title: 'Quantitative & FinTech Code',
      desc: 'Decision support platforms, algorithmic backtesters, and responsive web architectures.',
      badge: 'OPEN SOURCE',
      icon: Code2,
      link: 'https://github.com/devianwahyu137-ux',
      isFullWidth: false,
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
      isFullWidth: false,
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
              Digital Ecosystem • Multi-Platform Bento
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Institutional Network
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-neutral-400">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
            7 ECOSYSTEM NODES ACTIVE
          </span>
        </div>
      </div>

      {/* ── Mini Bento Grid (2-Column Mobile, 3-Column Desktop) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
        {platforms.map((p, idx) => {
          const Icon = p.icon;
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
              className={`group relative rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-7 bg-neutral-950/92 border border-white/10 transition-all duration-500 hover:-translate-y-1 ${p.isFullWidth ? 'col-span-2 md:col-span-3' : 'col-span-1'} ${p.borderHover} flex flex-col justify-between overflow-hidden shadow-lg`}
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
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold border ${p.bgTag} ${p.textAccent}`}>
                    {p.badge}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                    <span className="hidden sm:inline truncate max-w-[140px]">{p.handle}</span>
                    <ArrowUpRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${p.textAccent} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                  </div>
                </div>

                {/* Main Identity */}
                <div className="flex items-start gap-2.5 sm:gap-3.5 mb-1 sm:mb-2">
                  <div className={`p-1.5 sm:p-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/10 ${p.textAccent} group-hover:scale-105 transition-transform shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 
                      className="font-display font-bold text-xs sm:text-base md:text-xl text-white tracking-tight truncate"
                      style={{ color: '#FFFFFF' }}
                    >
                      {p.name}
                    </h3>
                    <p className={`font-mono text-[10px] sm:text-xs ${p.textAccent} font-medium mt-0.5 truncate`}>
                      {p.title}
                    </p>
                  </div>
                </div>

                {/* Description (Visible on sm+ or always visible on full-width highlight) */}
                <p 
                  className={`${p.isFullWidth ? 'block' : 'hidden sm:block'} text-xs sm:text-sm text-neutral-300 leading-relaxed font-body mt-2`}
                  style={{ color: '#CBD5E1' }}
                >
                  {p.desc}
                </p>
              </div>

              {/* Bottom Footer Chip */}
              <div className={`${p.isFullWidth ? 'flex' : 'hidden sm:flex'} pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-white/10 items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-300`}>
                <span className="uppercase tracking-wider">SECURE LINK DISPATCH</span>
                <span className={`${p.textAccent} font-semibold`}>CONNECT →</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
