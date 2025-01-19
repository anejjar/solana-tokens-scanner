'use client';

import { useEffect, useState } from 'react';
import TokenCard from '@/components/TokenCard';
import { Token } from '@/types/token';

const REFRESH_INTERVAL = 1000000; // TODO change to 10 seconds
const API_URL = 'https://api.rugcheck.xyz/v1/stats/new_tokens';

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewTokens = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch tokens');
      }
      const data = await response.json();
      setTokens(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewTokens();
    const interval = setInterval(fetchNewTokens, REFRESH_INTERVAL);
    
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">New Solana Tokens</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tokens.map((token) => (
              <TokenCard key={token.mint} token={token} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}