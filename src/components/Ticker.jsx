import { useEffect, useRef } from 'react';

export default function Ticker() {
  const container = useRef(null);

  useEffect(() => {
    if (container.current && container.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR/USD"
          },
          {
            "proName": "FX_IDC:GBPUSD",
            "title": "GBP/USD"
          },
          {
            "proName": "OANDA:XAUUSD",
            "title": "Gold"
          },
          {
            "proName": "TVC:USOIL",
            "title": "WTI Crude Oil"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          }
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
    <div className="w-full bg-base border-b border-border overflow-hidden relative z-50 py-1">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}
