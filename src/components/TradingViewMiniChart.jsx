import React, { useEffect, useRef } from 'react';

export default function TradingViewMiniChart({ symbol, containerId }) {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      widgetDiv.style.height = '100%';
      widgetDiv.style.width = '100%';
      container.current.appendChild(widgetDiv);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": symbol,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "dark",
        "isTransparent": true,
        "autosize": true,
        "largeChartUrl": "",
        "chartOnly": false,
        "noTimeScale": false,
        "showSymbolLogo": true
      });
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-[250px] md:h-64 w-full relative z-10" id={containerId} ref={container}>
    </div>
  );
}
