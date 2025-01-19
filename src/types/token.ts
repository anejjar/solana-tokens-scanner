export interface TokenMetadata {
    name: string;
    symbol: string;
    uri: string;
    updateAuthority: string;
    mutable: boolean;
  }
  
  export interface Token {
    mint: string;
    creator: string;
    decimals: number;
    freezeAuthority: string;
    mintAuthority: string;
    program: string;
    supply: number;
    symbol: string;
    createAt: string;
    updatedAt: string;
    events: TokenEvent[];
  }
  
  interface TokenEvent {
    createdAt: string;
    event: number;
    newValue: string;
    oldValue: string;
  }


export interface TrendingToken {
    mint: string;
    up_count: number;
    vote_count: number;
  }
  
  export interface VerifiedTokenLinks {
    provider: string;
    value: string;
  }
  
  export interface VerifiedToken {
    mint: string;
    name: string;
    symbol: string;
    description?: string; // Made optional
    jup_verified: boolean;
    payer: string;
    links?: VerifiedTokenLinks[]; // Made optional
  }


  export interface TokenCheck {
    mint: string;
    creator: string;
    token: string;
    tokenProgram: string;
    tokenType: string;
    score: number;
    rugged: boolean;
    risks: Risk[];
    markets: Market[];
    tokenMeta: TokenMetadata;
    verification?: VerifiedToken;
    detectedAt: string;
  }
  
  export interface Risk {
    name: string;
    description: string;
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    score: number;
    value: string;
  }
  
  export interface Market {
    pubkey: string;
    marketType: string;
    mintLP: string;
    mintA: string;
    mintB: string;
    mintAAccount: string;
    mintBAccount: string;
    liquidityA: string;
    liquidityB: string;
    liquidityAAccount: string;
    liquidityBAccount: string;
    mintLPAccount: string;
    lp?: MarketLP;
  }
  
  export interface MarketLP {
    lpMint: string;
    lpMaxSupply: number;
    lpTotalSupply: number;
    lpCurrentSupply: number;
    lpLocked: number;
    lpUnlocked: number;
    lpLockedPct: number;
    lpLockedUSD: number;
  }