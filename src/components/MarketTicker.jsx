import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const TICKER_ITEMS = [
  { label: 'ETH-USD Sentinel', value: 'ACTIVE [Regime: Low-Vol]', type: 'pulse' },
  { label: 'Sharpe Ratio', value: '2.14 | Profit Factor: 2.14', type: 'stat' },
  { label: 'SBN Sovereign Yield', value: '6.82% Baseline', type: 'yield' },
  { label: 'Institutional Research', value: '20 Papers Published', type: 'paper' },
  { label: 'BTC Core Momentum', value: '+3.42% 24H [Regime: Expansion]', type: 'trend' },
  { label: 'Order Execution', value: '<4ms Latency • Audited PnL', type: 'pulse' },
  { label: 'Max Drawdown', value: '-4.2% Peak-to-Trough', type: 'stat' },
];

export default function MarketTicker() {
  // Duplicated array to create an infinite, seamless loop
  const duplicatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950/80 border-b border-white/5 backdrop-blur-md py-2 select-none z-30">
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-neutral-400 group">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span className="text-neutral-400 uppercase tracking-wider text-[10px] font-semibold">
                {item.label}:
              </span>
              <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                {item.value}
              </span>
              <span className="text-neutral-500 ml-4">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
