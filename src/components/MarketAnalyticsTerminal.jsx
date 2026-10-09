import { useEffect, useRef, useState, useMemo } from 'react';
import { createChart, CandlestickSeries, AreaSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import { Activity, TrendingUp, TrendingDown, BarChart2, Eye, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock historical data generator for realistic institutional assets
function generateHistoricalData(basePrice, volatility, count = 90) {
  const data = [];
  const volumeData = [];
  let currentPrice = basePrice;
  const now = new Date();
  
  for (let i = count; i >= 0; i--) {
    const timeDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = timeDate.toISOString().split('T')[0];

    const changePercent = (Math.random() - 0.48) * volatility;
    const open = currentPrice;
    const close = +(open * (1 + changePercent)).toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * (open * volatility * 0.7)).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * (open * volatility * 0.7)).toFixed(2);
    const volume = Math.floor(Math.random() * 8000 + 2000);

    data.push({
      time: dateStr,
      open,
      high,
      low,
      close,
    });

    volumeData.push({
      time: dateStr,
      value: volume,
      color: close >= open ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)',
    });

    currentPrice = close;
  }

  return { candleData: data, volumeData };
}

function calculateEMA(data, period) {
  if (data.length < period) return [];
  const k = 2 / (period + 1);
  let ema = data.slice(0, period).reduce((acc, val) => acc + val.close, 0) / period;
  const result = [{ time: data[period - 1].time, value: +ema.toFixed(2) }];

  for (let i = period; i < data.length; i++) {
    ema = data[i].close * k + ema * (1 - k);
    result.push({ time: data[i].time, value: +ema.toFixed(2) });
  }
  return result;
}

const ASSET_CONFIGS = {
  'BTC/USDT': {
    name: 'Bitcoin Core',
    category: 'Digital Gold / Momentum',
    basePrice: 94250,
    volatility: 0.028,
    unit: '$',
    sharpe: '2.42',
    correlation: '+0.18 vs SPX',
  },
  'ETH/USDT': {
    name: 'Ethereum Network',
    category: 'Smart Contract Settlement',
    basePrice: 3480,
    volatility: 0.035,
    unit: '$',
    sharpe: '2.15',
    correlation: '+0.82 vs BTC',
  },
  'XAU/USD': {
    name: 'Gold Spot',
    category: 'Macro Safe-Haven',
    basePrice: 2740,
    volatility: 0.012,
    unit: '$',
    sharpe: '1.92',
    correlation: '-0.34 vs DXY',
  },
  'US10Y': {
    name: 'US 10Y Treasury',
    category: 'Sovereign Benchmark Yield',
    basePrice: 4.38,
    volatility: 0.015,
    unit: '%',
    sharpe: '1.45',
    correlation: '+0.64 vs Term Premia',
  },
};

export default function MarketAnalyticsTerminal() {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const areaSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const ema20SeriesRef = useRef(null);
  const ema50SeriesRef = useRef(null);

  const [selectedAsset, setSelectedAsset] = useState('BTC/USDT');
  const [chartType, setChartType] = useState('candlestick'); // 'candlestick' | 'area'
  const [showEMA, setShowEMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [currentHoverPrice, setCurrentHoverPrice] = useState(null);

  // Suspend simulator when chart is off-screen to preserve CPU cycles
  useEffect(() => {
    const el = chartContainerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsChartVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsChartVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cached asset datasets
  const dataset = useMemo(() => {
    const config = ASSET_CONFIGS[selectedAsset];
    const { candleData, volumeData } = generateHistoricalData(config.basePrice, config.volatility, 100);
    const ema20 = calculateEMA(candleData, 20);
    const ema50 = calculateEMA(candleData, 50);
    const last = candleData[candleData.length - 1];
    const prev = candleData[candleData.length - 2];
    const change = +(((last.close - prev.close) / prev.close) * 100).toFixed(2);

    return {
      candleData,
      volumeData,
      ema20,
      ema50,
      lastCandle: last,
      change,
    };
  }, [selectedAsset]);

  // Initializing TradingView Lightweight Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean previous chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
    }

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 380,
      layout: {
        background: { color: 'transparent' },
        textColor: '#A0AEC0',
        fontFamily: "'Inter', monospace, sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.04)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.04)' },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: '#10b981',
          width: 1,
          style: 3,
          labelBackgroundColor: '#0D0D0D',
        },
        horzLine: {
          color: '#10b981',
          width: 1,
          style: 3,
          labelBackgroundColor: '#0D0D0D',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        scaleMargins: {
          top: 0.12,
          bottom: 0.22,
        },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    chartInstanceRef.current = chart;

    // Volume Series
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '', // overlay
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    volumeSeries.setData(dataset.volumeData);
    volumeSeriesRef.current = volumeSeries;

    // Main Series
    if (chartType === 'candlestick') {
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderUpColor: '#10b981',
        borderDownColor: '#ef4444',
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });
      candleSeries.setData(dataset.candleData);
      candleSeriesRef.current = candleSeries;
      areaSeriesRef.current = null;
    } else {
      const areaSeries = chart.addSeries(AreaSeries, {
        topColor: 'rgba(16, 185, 129, 0.35)',
        bottomColor: 'rgba(16, 185, 129, 0.0)',
        lineColor: '#10b981',
        lineWidth: 2,
      });
      areaSeries.setData(
        dataset.candleData.map((d) => ({ time: d.time, value: d.close }))
      );
      areaSeriesRef.current = areaSeries;
      candleSeriesRef.current = null;
    }

    // EMA Series
    if (showEMA) {
      const ema20 = chart.addSeries(LineSeries, {
        color: '#38bdf8',
        lineWidth: 1.5,
        title: 'EMA 20',
      });
      ema20.setData(dataset.ema20);
      ema20SeriesRef.current = ema20;

      const ema50 = chart.addSeries(LineSeries, {
        color: '#10b981',
        lineWidth: 1.5,
        title: 'EMA 50',
      });
      ema50.setData(dataset.ema50);
      ema50SeriesRef.current = ema50;
    }

    // Crosshair tooltip tracking
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const seriesData = param.seriesData;
        const mainSeries = candleSeriesRef.current || areaSeriesRef.current;
        if (mainSeries && seriesData.has(mainSeries)) {
          const val = seriesData.get(mainSeries);
          setCurrentHoverPrice(val.close ?? val.value);
        }
      } else {
        setCurrentHoverPrice(null);
      }
    });

    chart.timeScale().fitContent();

    // Auto resize listener
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0 || !entries[0].contentRect) return;
      const { width } = entries[0].contentRect;
      chart.applyOptions({ width });
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartInstanceRef.current = null;
    };
  }, [selectedAsset, chartType, showEMA, dataset]);

  // Live Micro-Tick Simulation (simulates institutional live socket ticks only when in viewport)
  useEffect(() => {
    if (!isLiveStreaming || !isChartVisible) return;

    const interval = setInterval(() => {
      if (!chartInstanceRef.current) return;
      const mainSeries = candleSeriesRef.current || areaSeriesRef.current;
      if (!mainSeries) return;

      const last = { ...dataset.lastCandle };
      const microShift = (Math.random() - 0.49) * (last.close * 0.001);
      last.close = +(last.close + microShift).toFixed(2);
      last.high = +(Math.max(last.high, last.close)).toFixed(2);
      last.low = +(Math.min(last.low, last.close)).toFixed(2);

      if (chartType === 'candlestick' && candleSeriesRef.current) {
        candleSeriesRef.current.update(last);
      } else if (chartType === 'area' && areaSeriesRef.current) {
        areaSeriesRef.current.update({ time: last.time, value: last.close });
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveStreaming, isChartVisible, chartType, dataset]);

  const activePrice = currentHoverPrice || dataset.lastCandle.close;
  const isPositive = dataset.change >= 0;
  const config = ASSET_CONFIGS[selectedAsset];

  return (
    <div className="w-full glass-card border-white/10 overflow-hidden relative group">
      {/* ── Terminal Ambient Glow ── */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-emerald-500/10 blur-[100px] pointer-events-none" />

      {/* ── Institutional Top Bar ── */}
      <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        {/* Left: Asset Switcher & Metadata */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 md:pb-0 max-w-full">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 flex-shrink-0">
            {Object.keys(ASSET_CONFIGS).map((pair) => (
              <button
                key={pair}
                onClick={() => setSelectedAsset(pair)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
                  selectedAsset === pair
                    ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {pair}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-semibold text-white">{config.name}</span>
            <span className="font-mono text-[10px] text-neutral-400">{config.category}</span>
          </div>
        </div>

        {/* Center / Stats Preview & Right Controls */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-4 font-mono w-full md:w-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              {config.unit === '$' && '$'}
              {activePrice.toLocaleString()}
              {config.unit === '%' && '%'}
            </span>
            <span
              className={`text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-md ${
                isPositive
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  : 'text-red-400 bg-red-500/10 border border-red-500/20'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? '+' : ''}
              {dataset.change}%
            </span>
          </div>

          {/* Right: Controls & Tools */}
          <div className="flex items-center gap-2">
            {/* Chart Type Toggle */}
            <div className="flex items-center bg-black/50 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setChartType('candlestick')}
                title="Candlestick View"
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  chartType === 'candlestick' ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType('area')}
                title="Area Gradient View"
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  chartType === 'area' ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* EMA Overlay Toggle */}
            <button
              onClick={() => setShowEMA((prev) => !prev)}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                showEMA
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                  : 'border-white/10 text-neutral-500 hover:text-neutral-300'
              }`}
            >
              EMA 20/50
            </button>

            {/* Live Tick Status Toggle */}
            <button
              onClick={() => setIsLiveStreaming((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                isLiveStreaming
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/10 text-neutral-500'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLiveStreaming ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'
                }`}
              />
              <span className="hidden sm:inline">{isLiveStreaming ? 'LIVE FEED' : 'PAUSED'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Subheader Indicator Legend ── */}
      <div className="px-3 sm:px-5 py-2 bg-neutral-950/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-400">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-[#38bdf8] rounded-full" />
            EMA 20 (Cyan)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-[#10b981] rounded-full" />
            EMA 50 (Emerald)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest hidden sm:inline">
            TradingView Lightweight Charts™ v5 Engine
          </span>
        </div>
      </div>

      {/* ── Chart Canvas Container ── */}
      <div className="relative w-full h-[380px] p-2 bg-[#080808]/80">
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>

      {/* ── Footer Stats Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 bg-black/60 divide-x divide-white/5 font-mono text-xs">
        <div className="p-3 px-5 flex flex-col">
          <span className="text-[10px] text-neutral-400 uppercase">24H High</span>
          <span className="text-white font-semibold">
            {config.unit === '$' && '$'}
            {Math.max(...dataset.candleData.slice(-20).map((d) => d.high)).toLocaleString()}
          </span>
        </div>
        <div className="p-3 px-5 flex flex-col">
          <span className="text-[10px] text-neutral-400 uppercase">24H Low</span>
          <span className="text-white font-semibold">
            {config.unit === '$' && '$'}
            {Math.min(...dataset.candleData.slice(-20).map((d) => d.low)).toLocaleString()}
          </span>
        </div>
        <div className="p-3 px-5 flex flex-col">
          <span className="text-[10px] text-neutral-400 uppercase">Est. Volatility (30D)</span>
          <span className="text-emerald-400 font-semibold">{(config.volatility * 100).toFixed(2)}%</span>
        </div>
        <div className="p-3 px-5 flex flex-col">
          <span className="text-[10px] text-neutral-400 uppercase">Risk Metric</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Audit Verified
          </span>
        </div>
      </div>
    </div>
  );
}
