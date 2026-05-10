import React from 'react';
import { MonitorPlay, MessageSquareText, LineChart, FileText, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContentEcosystem() {
  const research = [
    {
      platform: "Substack",
      title: "The Macro Playbook",
      description: "In-depth market thesis & geopolitical analysis.",
      icon: <FileText className="w-6 h-6 text-white" />,
      color: "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
      link: "https://substack.com/@pedsanalysis?r=399xyt&utm_campaign=profile&utm_medium=profile-page"
    },
    {
      platform: "Medium",
      title: "Management & Fintech",
      description: "Reflections on business logic, AI, and the NEMOS ecosystem.",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      color: "hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
      link: "https://medium.com/@devianwahyu137"
    }
  ];

  const pulse = [
    {
      platform: "YouTube",
      title: "Trading 101 Series",
      icon: <MonitorPlay className="w-6 h-6 text-white" />,
      color: "hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      link: "https://youtube.com/@chastflash?si=iCLJkT1lHcjVJQXS"
    },
    {
      platform: "X (Twitter)",
      title: "Real-time Alpha & Sentiment",
      icon: <MessageSquareText className="w-6 h-6 text-white" />,
      color: "hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]",
      link: "https://x.com/chastflash?s=21"
    },
    {
      platform: "TikTok",
      title: "Daily Market Bits",
      icon: <LineChart className="w-6 h-6 text-white" />,
      color: "hover:border-bullish/50 hover:shadow-[0_0_20px_rgba(80,250,123,0.15)]",
      link: "https://www.tiktok.com/@devianwn?_r=1&_t=ZS-94ofxUMRHBI"
    }
  ];

  return (
    <section className="relative space-y-16">
      {/* Institutional Research */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Institutional Research</h2>
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {research.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`glass-card p-8 group flex items-start gap-6 transition-all duration-300 ${item.color}`}
            >
              <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-mono text-text-secondary mb-1 uppercase tracking-wider">{item.platform}</h3>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Digital Pulse */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Digital Pulse</h2>
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pulse.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`glass-card p-6 group flex flex-col items-center text-center transition-all duration-300 ${item.color}`}
            >
              <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-sm font-mono text-text-secondary mb-2 uppercase tracking-wider">{item.platform}</h3>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
