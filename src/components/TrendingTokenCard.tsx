import { TrendingToken } from '@/types/token';

interface TrendingTokenCardProps {
  token: TrendingToken;
}

const TrendingTokenCard = ({ token }: TrendingTokenCardProps) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 break-all text-sm">
            <span className="font-medium">Mint: </span>
            {token.mint.slice(0, 16)}...
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              👍 {token.up_count}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Total: {token.vote_count}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <a
            href={`https://solscan.io/token/${token.mint}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
            aria-label={`View token on Solscan`}
            tabIndex={0}
          >
            View on Solscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrendingTokenCard;