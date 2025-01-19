'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TokenSearchForm = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!tokenAddress) {
      setError('Please enter a token address');
      setIsLoading(false);
      return;
    }

    // Validate Solana address format (basic check)
    if (tokenAddress.length !== 44) {
      setError('Invalid Solana token address');
      setIsLoading(false);
      return;
    }

    router.push(`/token/${tokenAddress}`);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="tokenAddress" className="text-lg font-medium text-gray-700">
            Enter Token Contract Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="tokenAddress"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter Solana token address..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Checking...' : 'Check Token'}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default TokenSearchForm;