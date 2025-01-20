'use client';

import { useEffect, useRef,useState } from 'react';

interface TradingViewChartProps {
  symbol: string;
}

let tvScriptLoadingPromise: Promise<void>;

export default function TradingViewChart({ symbol }: TradingViewChartProps) {
    console.log(symbol);
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById('tradingview-widget') && 'TradingView' in window) {
        try {
          new (window as any).TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview-widget",
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            backgroundColor: "rgba(255, 255, 255, 1)",
            gridColor: "rgba(240, 243, 250, 1)",
            width: "100%",
            height: "400",
            onNoDataAvailable: () => {
              setError('No chart data available for this token');
            },
            loading_screen: { backgroundColor: "rgba(255, 255, 255, 1)" }
          });
        } catch (err) {
          setError('Failed to load chart');
        }
      }
    }
  }, [symbol]);

  if (error) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-widget" className="h-[400px]" />
    </div>
  );
}
