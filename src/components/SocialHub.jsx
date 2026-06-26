import { motion } from 'framer-motion';
import { MonitorPlay, MessageSquareText, LineChart, FileText, BookOpen, ArrowUpRight } from 'lucide-react';

export default function SocialHub() {
  const socials = [
    {
      name: "LinkedIn",
      handle: "Devian Wahyu Nugroho",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
      link: "https://www.linkedin.com/in/devianwahyu77",
      color: "group-hover:text-blue-500",
      bgHover: "group-hover:bg-blue-500/10",
      borderHover: "group-hover:border-blue-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    },
    {
      name: "X (Twitter)",
      handle: "@ChastFlash",
      icon: <MessageSquareText className="w-5 h-5" />,
      link: "https://x.com/chastflash?s=21",
      color: "group-hover:text-neutral-200",
      bgHover: "group-hover:bg-neutral-200/10",
      borderHover: "group-hover:border-neutral-200/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(229,229,229,0.15)]"
    },
    {
      name: "TikTok",
      handle: "@devianwn",
      icon: <LineChart className="w-5 h-5" />,
      link: "https://www.tiktok.com/@devianwn?_r=1&_t=ZS-94ofxUMRHBI",
      color: "group-hover:text-emerald-400",
      bgHover: "group-hover:bg-emerald-400/10",
      borderHover: "group-hover:border-emerald-400/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
    },
    {
      name: "YouTube",
      handle: "@ChastFlash",
      icon: <MonitorPlay className="w-5 h-5" />,
      link: "https://youtube.com/@chastflash?si=iCLJkT1lHcjVJQXS",
      color: "group-hover:text-red-500",
      bgHover: "group-hover:bg-red-500/10",
      borderHover: "group-hover:border-red-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
    },
    {
      name: "Substack",
      handle: "@pedsanalysis",
      icon: <FileText className="w-5 h-5" />,
      link: "https://substack.com/@pedsanalysis?r=399xyt&utm_campaign=profile&utm_medium=profile-page",
      color: "group-hover:text-orange-500",
      bgHover: "group-hover:bg-orange-500/10",
      borderHover: "group-hover:border-orange-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
    },
    {
      name: "Medium",
      handle: "@devianwahyu137",
      icon: <BookOpen className="w-5 h-5" />,
      link: "https://medium.com/@devianwahyu137",
      color: "group-hover:text-white",
      bgHover: "group-hover:bg-white/10",
      borderHover: "group-hover:border-white/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
    }
  ];

  return (
    <section id="social-hub" className="relative w-full isolate py-16 scroll-mt-20">
      
      {/* Header */}
      <div className="mb-10 flex flex-col items-start">
        <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Connect</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight relative pb-3 inline-block">
          Digital Ecosystem
          <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-emerald-500 rounded-full" />
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {socials.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
            className={`group relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-neutral-900/40 to-neutral-950/80 backdrop-blur-md border border-neutral-800/60 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:z-10 ${social.borderHover} ${social.shadowHover}`}
          >
            {/* Icon Container */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-800/50 border border-neutral-700/50 text-neutral-400 transition-colors duration-300 ${social.bgHover} ${social.color}`}>
              {social.icon}
            </div>
            
            {/* Text Info */}
            <div className="flex flex-col flex-grow">
              <span className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors mb-0.5">
                {social.name}
              </span>
              <span className="text-xs font-mono text-neutral-500 tracking-wide transition-colors group-hover:text-neutral-400">
                {social.handle}
              </span>
            </div>
            
            {/* Arrow Icon */}
            <div className={`opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ${social.color}`}>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
