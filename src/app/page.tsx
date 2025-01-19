'use client';

import { useEffect, useState } from 'react';
import TokenCard from '@/components/TokenCard';
import TrendingTokenCard from '@/components/TrendingTokenCard';
import VerifiedTokenCard from '@/components/VerifiedTokenCard';
import TokenSearchForm from '@/components/TokenSearchForm';

import { Token, TrendingToken, VerifiedToken } from '@/types/token';

const REFRESH_INTERVAL = 1000000; // 1 second
const API_BASE_URL = 'https://api.rugcheck.xyz/v1';

export default function Home() {
  const [newTokens, setNewTokens] = useState<Token[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([]);
  const [verifiedTokens, setVerifiedTokens] = useState<VerifiedToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [newTokensRes, trendingTokensRes, verifiedTokensRes] = await Promise.all([
        fetch(`${API_BASE_URL}/stats/new_tokens`),
        fetch(`${API_BASE_URL}/stats/trending`),
        fetch(`${API_BASE_URL}/stats/verified`)
      ]);

      if (!newTokensRes.ok || !trendingTokensRes.ok || !verifiedTokensRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [newTokensData, trendingTokensData, verifiedTokensData] = await Promise.all([
        newTokensRes.json(),
        trendingTokensRes.json(),
        verifiedTokensRes.json()
      ]);

      setNewTokens(newTokensData);
      setTrendingTokens(trendingTokensData);
      setVerifiedTokens(verifiedTokensData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, []);

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

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Solana Token Scanner</h1>
        <TokenSearchForm />
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <section>
              <h2 className="text-2xl font-semibold mb-4">New Tokens</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {newTokens.map((token) => (
                  <TokenCard key={token.mint} token={token} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Trending Tokens</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingTokens.map((token) => (
                  <TrendingTokenCard key={token.mint} token={token} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Verified Tokens</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {verifiedTokens.map((token) => (
                  <VerifiedTokenCard key={token.mint} token={token} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}