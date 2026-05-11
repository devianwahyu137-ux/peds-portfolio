import React from 'react';
import TradingViewMiniChart from './TradingViewMiniChart';
import { motion } from 'framer-motion';

export default function MarketTerminal() {
  const assets = [
    { name: "BTC/USDT", symbol: "BINANCE:BTCUSDT", id: "tv_chart_btc" },
    { name: "ETH/USDT", symbol: "BINANCE:ETHUSDT", id: "tv_chart_eth" },
    { name: "XAU/USD (Gold)", symbol: "OANDA:XAUUSD", id: "tv_chart_xau" },
  ];

  return (
    <section className="relative">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Market Intelligence</h2>
        <div className="w-20 h-1 bg-bullish rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset, idx) => (
          <motion.div
            key={asset.symbol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-card p-1 overflow-hidden"
          >
            <TradingViewMiniChart symbol={asset.symbol} containerId={asset.id} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
