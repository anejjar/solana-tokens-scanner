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