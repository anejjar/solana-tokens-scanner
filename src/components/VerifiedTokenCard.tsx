import { VerifiedToken } from '@/types/token';

interface VerifiedTokenCardProps {
  token: VerifiedToken;
}

const VerifiedTokenCard = ({ token }: VerifiedTokenCardProps) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all bg-white shadow-sm hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg truncate" title={token.symbol}>
            {token.symbol}
          </h3>
          {token.jup_verified && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Jupiter Verified ✓
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2" title={token.description}>
          {token.description || 'No description available'}
        </p>
        
        <div className="space-y-1 text-sm">
          <p className="text-gray-600 break-all">
            <span className="font-medium">Mint: </span>
            {token.mint.slice(0, 16)}...
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {token.links && token.links.length > 0 && token.links.map((link, index) => (
            <a
              key={index}
              href={link.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={`View on ${link.provider}`}
              tabIndex={0}
            >
              {link.provider}
            </a>
          ))}
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

export default VerifiedTokenCard;