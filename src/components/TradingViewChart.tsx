'use client';

import { useEffect, useState } from 'react';

export default function GeckoTerminalChart({ address }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Inject the GeckoTerminal iframe after the component mounts
    const iframeContainer = document.getElementById('geckoterminal-embed-container');
    if (iframeContainer && !iframeLoaded) {
      iframeContainer.innerHTML = `
        <iframe
          id="geckoterminal-iframe"
          src="https://www.geckoterminal.com/solana/pools/${address}?embed=1&info=0&swaps=0&grayscale=1"
          width="100%"
          height="400"
          frameBorder="0"
          allowTransparency
          scrolling="no"
        />
      `;
    }
  }, [address, iframeLoaded]);


  return (
    <div className="geckoterminal-chart w-full min-h-[400px] bg-white rounded-lg">
      <div id="geckoterminal-embed-container">
        {/* Chart will be injected here by useEffect */}
      </div>
    </div>
  );
}