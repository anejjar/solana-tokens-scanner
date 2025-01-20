
/// <reference path="../types/gecko-terminal.d.ts" />
'use client';'use client';

import { useEffect, useRef, useState } from 'react';

interface GeckoTerminalChartProps {
  address: string;
}

export default function GeckoTerminalChart({ address }: GeckoTerminalChartProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.geckoterminal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (error) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="gecko-terminal-chart">
      <gecko-terminal
        chart-id={`solana/${address}`}
        theme="light"
        height="400px"
        currency="usd"
      ></gecko-terminal>
    </div>
  );
}