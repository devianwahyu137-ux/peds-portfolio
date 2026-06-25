import { Briefcase, TrendingUp, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackRecord() {
  const credentials = [
    {
      icon: <Briefcase className="w-6 h-6 text-market" />,
      title: "Analyst @ Traders Family",
      subtitle: "Institutional-Grade Market Analysis",
      description: "Executing data-driven market strategies and providing institutional insights."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-bullish" />,
      title: "3+ Years Experience",
      subtitle: "Forex, Crypto, & Stock",
      description: "Navigating cross-asset volatility with disciplined risk management."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: "Devian Wahyu Nugroho - Management FEB UGM",
      subtitle: "Management FEB UGM (6th Semester)",
      description: "Bridging academic financial theory with real-market execution."
    }
  ];

  return (
    <section className="relative">
      <div className="mb-12">
        <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Professional Track Record</h2>
        <div className="w-20 h-1 bg-market rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {credentials.map((cred, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-card p-8 group"
          >
            <div className="p-3 bg-white/5 rounded-lg inline-block mb-6 group-hover:scale-110 transition-transform">
              {cred.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{cred.title}</h3>
            <h4 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">{cred.subtitle}</h4>
            <p className="text-text-secondary leading-relaxed text-sm">
              {cred.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
