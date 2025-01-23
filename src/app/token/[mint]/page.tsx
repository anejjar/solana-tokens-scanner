'use client';

import { useEffect, useState, use } from 'react';
import { TokenCheck } from '@/types/token';
import TradingViewChart from '@/components/TradingViewChart';


interface TokenReportProps {
  params: Promise<{
    mint: string;
  }>;
}

export default function TokenReport({ params }: TokenReportProps) {
  const { mint } = use(params);
  const [tokenData, setTokenData] = useState<TokenCheck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenReport = async () => {
      try {
        const response = await fetch(
          `https://api.rugcheck.xyz/v1/tokens/${mint}/report`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch token report');
        }

        const data = await response.json();
        setTokenData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch token report');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenReport();
  }, [mint]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500 p-4">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  if (!tokenData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-500 p-4">
            No data found for this token
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {tokenData.tokenMeta?.symbol || 'Unknown Token'}
                </h1>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${tokenData.rugged 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'}`}>
                    {tokenData.rugged ? 'RUGGED' : 'SAFE'}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Score: {tokenData.score}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Token Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Token Information</h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Mint Address: </span>
                    {tokenData.mint}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Creator: </span>
                    {tokenData.creator}
                  </p>
                  {tokenData.tokenMeta && (
                    <>
                      <p className="text-sm">
                        <span className="font-medium">Name: </span>
                        {tokenData.tokenMeta.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Symbol: </span>
                        {tokenData.tokenMeta.symbol}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Risks Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Risk Analysis</h2>
                <div className="space-y-2">
                  {tokenData.risks && tokenData.risks.map((risk, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg ${
                        risk.level === 'HIGH' ? 'bg-red-50' :
                        risk.level === 'MEDIUM' ? 'bg-yellow-50' :
                        'bg-green-50'
                      }`}
                    >
                      <p className="font-medium text-sm">{risk.name}</p>
                      <p className="text-sm">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Data */}
            {tokenData.markets && tokenData.markets.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Market Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tokenData.markets.map((market, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <p className="text-sm font-medium">{market.marketType}</p>
                      <p className="text-sm">LP Token: {market.mintLP}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tokenData && (
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Price Chart</h2>
                <div className="w-full bg-white rounded-lg overflow-hidden">
                  <TradingViewChart address={tokenData.mint} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}