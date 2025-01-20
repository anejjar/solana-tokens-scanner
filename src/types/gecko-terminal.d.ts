interface GeckoTerminalElement extends HTMLElement {
    'chart-id': string;
    theme: 'light' | 'dark';
    height: string;
    currency: string;
  }
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        'gecko-terminal': Partial<GeckoTerminalElement>;
      }
    }
  }
  
  declare namespace JSX {
    interface IntrinsicElements {
      'gecko-terminal': {
        'chart-id': string;
        theme: string;
        height: string;
        currency: string;
      }
    }
  }
  
  export {};