import { useEffect, useRef } from 'react';

export default function PriceTicker() {
  const container = useRef(null);

  useEffect(() => {
    // Robust cleanup/initialization logic to prevent React strict mode race conditions
    if (container.current) {
      // Clear container first to handle hot-reloads properly
      container.current.innerHTML = '';
      
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      container.current.appendChild(widgetDiv);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          {"proName": "BITSTAMP:BTCUSD", "title": "BTC/USD"},
          {"proName": "BITSTAMP:ETHUSD", "title": "ETH/USD"},
          {"proName": "FX_IDC:XAUUSD", "title": "Gold"},
          {"proName": "FX:EURUSD", "title": "EUR/USD"},
          {"proName": "IDX:COMPOSITE", "title": "IHSG"}
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "en"
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full bg-transparent border-b border-white/10 overflow-hidden relative z-50">
      {/* Container with a fixed min-height to prevent layout collapse before script loads */}
      <div 
        id="tradingview-ticker-container" 
        className="tradingview-widget-container w-full min-h-[46px]" 
        ref={container}
      >
      </div>
    </div>
  );
}
