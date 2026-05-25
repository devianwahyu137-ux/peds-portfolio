import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, MessageSquareText, LineChart, FileText, BookOpen, ArrowUpRight } from 'lucide-react';

export default function SocialHub() {
  const socials = [
    {
      name: "LinkedIn",
      handle: "Devian Wahyu Nugroho",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
      link: "https://www.linkedin.com/in/devianwahyu77",
      containerHover: "hover:border-blue-600/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]",
      textHover: "group-hover:text-blue-600"
    },
    {
      name: "X (Twitter)",
      handle: "@ChastFlash",
      icon: <MessageSquareText className="w-5 h-5" />,
      link: "https://x.com/chastflash?s=21",
      containerHover: "hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]",
      textHover: "group-hover:text-blue-400"
    },
    {
      name: "TikTok",
      handle: "@devianwn",
      icon: <LineChart className="w-5 h-5" />,
      link: "https://www.tiktok.com/@devianwn?_r=1&_t=ZS-94ofxUMRHBI",
      containerHover: "hover:border-bullish/50 hover:shadow-[0_0_30px_rgba(80,250,123,0.3)]",
      textHover: "group-hover:text-bullish"
    },
    {
      name: "YouTube",
      handle: "@ChastFlash",
      icon: <MonitorPlay className="w-5 h-5" />,
      link: "https://youtube.com/@chastflash?si=iCLJkT1lHcjVJQXS",
      containerHover: "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]",
      textHover: "group-hover:text-red-500"
    },
    {
      name: "Substack",
      handle: "@pedsanalysis",
      icon: <FileText className="w-5 h-5" />,
      link: "https://substack.com/@pedsanalysis?r=399xyt&utm_campaign=profile&utm_medium=profile-page",
      containerHover: "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      textHover: "group-hover:text-orange-500"
    },
    {
      name: "Medium",
      handle: "@devianwahyu137",
      icon: <BookOpen className="w-5 h-5" />,
      link: "https://medium.com/@devianwahyu137",
      containerHover: "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
      textHover: "group-hover:text-white"
    }
  ];

  return (
    <section id="social-hub" className="relative w-full overflow-visible isolate py-12 scroll-mt-20" style={{ willChange: 'transform, opacity' }}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight mb-2">Digital Ecosystem</h2>
          <div className="w-20 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 -m-6 relative overflow-visible isolate">
        {socials.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01, margin: "100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className={`group relative z-10 transform-gpu will-change-transform flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#1A1A1A]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300 hover:z-50 hover:scale-[1.02] ${social.containerHover}`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-text-secondary transition-colors duration-300 ${social.textHover}`}>
                {social.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-none mb-1">{social.name}</span>
                <span className="text-xs font-mono text-text-secondary leading-none">{social.handle}</span>
              </div>
            </div>
            
            <ArrowUpRight className={`w-4 h-4 text-text-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${social.textHover}`} />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
