import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Target, 
  ShieldCheck, 
  ExternalLink, 
  Zap, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  Briefcase, 
  Layers, 
  Lightbulb 
} from 'lucide-react';

const timelineData = [
  {
    year: '2026',
    quarter: 'ACTIVE // 2026',
    milestones: [
      {
        badge: 'FINTECH_INNOVATION // NATIONAL_AWARD',
        title: 'Top 4 National Finalist - PIDI Digdaya Hackathon 2026',
        issuer: 'Bank Indonesia x Kemenperin (FEKDI x IFSE)',
        description: 'Secured Top 4 national standing out of 800+ proposals at FEKDI x IFSE 2026 Grand Final. Architected NEMOS, an AI-powered alternative revenue-based financing platform delivering automated credit assessment, cash flow deconstruction, and capital liquidity for underserved MSMEs.',
        icon: Zap,
        tags: ['#Fintech', '#AI/ML Architecture', '#Revenue-Based Financing', '#Bank Indonesia'],
        status: 'TOP 4 FINALIST',
        statusColor: 'emerald'
      },
      {
        badge: 'MARKET_SIMULATION // VERIFIED',
        title: 'Silver Medalist - National Trading Competition',
        issuer: 'TRACTION OU Festival 11',
        description: 'Secured the Silver Medal in high-stakes market simulation across multi-asset instruments. Demonstrated strict adherence to quantitative risk rules, tight drawdown control (-3.2% max), and disciplined technical execution.',
        icon: Trophy,
        tags: ['#Forex', '#Risk Budgeting', '#Technical Alpha'],
        status: 'MEDALIST',
        statusColor: 'emerald'
      },
      {
        badge: 'VENTURE_STRATEGY // SCHOLARSHIP',
        title: 'National Finalist & MEM UC Scholarship Recipient',
        issuer: 'Universitas Ciputra Surabaya',
        description: 'Advanced to the national finals and secured the MEM UC venture scholarship award for architecting an algorithmic business model with robust unit economics, market expansion roadmap, and financial feasibility modeling.',
        icon: Award,
        tags: ['#Venture Logic', '#Financial Feasibility', '#Scholarship'],
        status: 'SCHOLAR',
        statusColor: 'sky'
      },
      {
        badge: 'BUSINESS_INNOVATION // FINALIST',
        title: 'Top 10 National Finalist - BizClash 3.0 Business Competition',
        issuer: 'Kasir Pintar',
        description: 'Ranked among the Top 10 national teams in an intensive corporate challenge, formulating high-impact go-to-market strategies, operational risk mitigations, and commercial scalability frameworks.',
        icon: Target,
        tags: ['#Corporate Strategy', '#GoToMarket', '#Business Scalability'],
        status: 'TOP 10',
        statusColor: 'emerald'
      },
      {
        badge: 'ARTIFICIAL_INTELLIGENCE // INNOVATION',
        title: 'Top 20 National Finalist - AI Innovation Challenge (COMPFEST)',
        issuer: 'Fasilkom Universitas Indonesia',
        description: 'Advanced as a Top 20 national finalist at Universitas Indonesia, engineering an AI-driven decision engine designed to solve systemic data inefficiencies and structured information verification.',
        icon: Cpu,
        tags: ['#AI Innovation', '#NLP', '#Decision Engine', '#COMPFEST UI'],
        status: 'TOP 20',
        statusColor: 'emerald'
      },
      {
        badge: 'STRATEGIC_SOLUTIONS // CASE_COMP',
        title: 'Top 20 National Team - Business Case Competition',
        issuer: 'DreamCareer Indonesia',
        description: 'Placed in the Top 20 nationally by deconstructing complex corporate market bottlenecks, designing comprehensive market expansion roadmaps, and quantifying expected return on investment (ROI).',
        icon: TrendingUp,
        tags: ['#Business Case', '#Corporate Expansion', '#ROI Modeling'],
        status: 'TOP 20',
        statusColor: 'emerald'
      },
      {
        badge: 'BUSINESS_PLAN // NATIONAL',
        title: 'National Grand Finalist - Business Plan Competition #2',
        issuer: 'Ikut Lomba & National Network',
        description: 'Recognized as a national grand finalist for building an end-to-end commercial business plan, integrating discounted cash flow projections, supply chain logistics, and market sensitivity modeling.',
        icon: Briefcase,
        tags: ['#Business Planning', '#Cashflow Forecast', '#Risk Modeling'],
        status: 'GRAND FINALIST',
        statusColor: 'emerald'
      },
      {
        badge: 'BMC_FRAMEWORK // NATIONAL',
        title: 'National Finalist - B-PRENEURSHIP BMC Competition',
        issuer: 'Universitas Jenderal Soedirman',
        description: 'Achieved national finalist standing at Universitas Jenderal Soedirman for presenting a lean, highly validated business model canvas centered on digital capital accessibility and ecosystem synergy.',
        icon: Layers,
        tags: ['#Business Model Canvas', '#Unsoed', '#Lean Startup'],
        status: 'FINALIST',
        statusColor: 'emerald'
      },
      {
        badge: 'VENTURE_IDEATION // FINALIST',
        title: 'National Finalist - National BMC Competition',
        issuer: 'Halo Mentor Indonesia',
        description: 'Earned national finalist honors by modeling scalable value propositions, cost structure optimizations, and institutional monetization channels for early-stage enterprise ventures.',
        icon: Lightbulb,
        tags: ['#Venture Ideation', '#Value Proposition', '#Cost Architecture'],
        status: 'FINALIST',
        statusColor: 'emerald'
      },
      {
        badge: 'QUANT_CAPITAL // PROP_TRADING',
        title: 'Phase 1 Evaluation Cleared - Proprietary Trading',
        issuer: 'FundingPips Evaluation Program',
        description: 'Successfully cleared institutional trading evaluation with an 8% profit target under strict drawdown limits, utilizing rule-based systematic risk management and volatility regime modeling.',
        icon: ShieldCheck,
        tags: ['#Prop Trading', '#Quantitative Risk', '#Capital Preservation'],
        status: 'PASSED',
        statusColor: 'emerald'
      }
    ]
  },
  {
    year: '2025',
    quarter: 'Q3-Q4',
    milestones: [
      {
        badge: 'BUSINESS_STRATEGY // 1ST_PLACE',
        title: '1st Place Winner - Business Model Canvas Competition',
        issuer: 'BEM FK-KMK Universitas Gadjah Mada',
        description: 'Awarded first place champion for developing an exhaustive business feasibility framework, excelling in strategic value proposition mapping, cashflow sustainability, and institutional stakeholder alignment.',
        icon: Sparkles,
        tags: ['#Business Modeling', '#Value Mapping', '#FEB UGM'],
        status: '1ST PLACE',
        statusColor: 'emerald'
      },
      {
        badge: 'INSTITUTIONAL // EXECUTION',
        title: 'Analyst & Quantitative Market Strategist',
        issuer: 'Traders Family & Proprietary Research',
        description: 'Spearheaded quantitative market research, formulating macroeconomic scenario models and publishing over 20+ analytical research papers covering currency regimes, liquidity flow, and crypto dynamics.',
        icon: Target,
        tags: ['#Macroeconomics', '#Order Flow', '#Substack Research'],
        status: 'ACTIVE',
        statusColor: 'emerald'
      }
    ]
  }
];

export default function Milestones() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="milestones" ref={containerRef} className="relative w-full py-12 scroll-mt-24 overflow-visible">
      
      {/* ── Sticky Section Header ── */}
      <div className="sticky top-14 sm:top-16 md:top-20 z-20 py-2.5 sm:py-3 md:py-4 mb-4 sm:mb-6 md:mb-8 bg-neutral-950/85 backdrop-blur-md border-b border-emerald-500/10 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
                Aceternity Timeline Architecture
              </p>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Market Validation & Milestones
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.linkedin.com/in/devianwahyu77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[11px] sm:text-xs hover:bg-emerald-500 hover:text-black transition-all"
            >
              <span>Verify on LinkedIn</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Aceternity Vertical Timeline Track ── */}
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
        <div className="relative w-full">
          {/* Static Background Vertical Line */}
          <div className="absolute left-4 md:left-28 -translate-x-1/2 top-2 bottom-0 w-[2px] bg-white/10 pointer-events-none" />

          {/* Animated Glowing Emerald Vertical Beam */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-28 -translate-x-1/2 top-2 w-[2px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] origin-top z-10 pointer-events-none"
          />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {timelineData.map((epoch) => (
              <div key={epoch.year} className="relative flex flex-col md:flex-row items-start">
                {/* Year Stamp Indicator (Desktop side header) */}
                <div className="hidden md:flex w-28 shrink-0 flex-col text-right pr-8 pt-1">
                  <span className="font-display font-bold text-2xl text-white tracking-tight leading-none" style={{ color: '#FFFFFF' }}>
                    {epoch.year}
                  </span>
                  <span className="font-mono text-xs tracking-wider text-emerald-400 font-semibold mt-1.5" style={{ color: '#34D399' }}>
                    {epoch.quarter}
                  </span>
                </div>

                {/* Node Pill on Line (Centered exactly with line axis) */}
                <div className="absolute left-4 md:left-28 -translate-x-1/2 top-1 md:top-1.5 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-950 border-2 border-emerald-400 z-20 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-400" />
                  </span>
                </div>

                {/* Mobile Year Stamp Header */}
                <div className="md:hidden flex items-center gap-2 mb-3 pl-9 pt-0.5">
                  <span className="font-display font-bold text-lg text-white tracking-tight" style={{ color: '#FFFFFF' }}>{epoch.year}</span>
                  <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider" style={{ color: '#34D399' }}>({epoch.quarter})</span>
                </div>

                {/* Milestones inside this Epoch */}
                <div className="flex-1 w-full space-y-3 sm:space-y-4 md:space-y-6 pl-7 sm:pl-10 md:pl-8">
                  {epoch.milestones.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                        className="group relative p-3 sm:p-4.5 md:p-7 rounded-xl md:rounded-2xl bg-neutral-950/92 border border-white/10 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 overflow-hidden"
                      >
                        {/* Aceternity Subtle Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10 flex flex-col justify-between">
                          {/* Header Badge & Issuer */}
                          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-widest font-semibold uppercase">
                                {item.badge}
                              </span>
                              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 hidden sm:inline" style={{ color: '#94A3B8' }}>
                                {item.issuer}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[8px] sm:text-[9px] md:text-[10px] text-white" style={{ color: '#FFFFFF' }}>
                              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-emerald-400" />
                              <span style={{ color: '#FFFFFF' }}>{item.status}</span>
                            </div>
                          </div>

                          {/* Title with Icon */}
                          <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3 my-0.5">
                            <div className="p-1 sm:p-1.5 md:p-2 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-display font-bold text-xs sm:text-base md:text-xl text-white group-hover:text-emerald-300 transition-colors leading-snug" style={{ color: '#FFFFFF' }}>
                                {item.title}
                              </h3>
                              <p className="font-mono text-[9px] sm:text-xs text-neutral-400 sm:hidden mt-0.5 truncate" style={{ color: '#94A3B8' }}>
                                {item.issuer}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 leading-relaxed my-1.5 sm:my-2 md:my-3 font-body" style={{ color: '#CBD5E1' }}>
                            {item.description}
                          </p>

                          {/* Tech & Discipline Tags */}
                          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 pt-1.5 sm:pt-2 border-t border-white/5 font-mono text-[8px] sm:text-[9px] md:text-[10px]">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 group-hover:border-emerald-500/20 group-hover:text-emerald-300 transition-colors"
                                style={{ color: '#94A3B8' }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
