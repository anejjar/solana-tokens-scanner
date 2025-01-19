import { Token } from '@/types/token';
import { formatDistance } from 'date-fns';

interface TokenCardProps {
  token: Token;
}

const TokenCard = ({ token }: TokenCardProps) => {
  const timeAgo = formatDistance(new Date(token.createAt), new Date(), { addSuffix: true });

  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg truncate" title={token.symbol}>
            {token.symbol}
          </h3>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
        
        <div className="space-y-1 text-sm">
          <p className="text-gray-600 break-all">
            <span className="font-medium">Mint: </span>
            {token.mint}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Supply: </span>
            {token.supply.toLocaleString()}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Decimals: </span>
            {token.decimals}
          </p>
        </div>

        <div className="mt-2 flex gap-2">
          <a
            href={`https://solscan.io/token/${token.mint}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
            aria-label={`View ${token.symbol} on Solscan`}
            tabIndex={0}
          >
            View on Solscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;