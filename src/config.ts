import { defineChain } from 'viem';

// 1. Definición de la cadena para Viem (necesaria para contratos)
export const dogeosTestnet = defineChain({
  id: 6281971, // ID CRÍTICO de la Testnet [3]
  name: 'DogeOS Chikyū Testnet',
  network: 'dogeos-testnet',
  nativeCurrency: {
    decimals: 18, // DogeOS usa 18 decimales (estándar EVM), no como Doge L1 [4]
    name: 'Dogecoin',
    symbol: 'DOGE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.dogeos.com'], // Endpoint público de Ankr [4, 5]
    },
    public: {
      http: ['https://rpc-testnet.dogeos.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer-testnet.dogeos.com' },
  },
});

// 2. Configuración para el SDK de DogeOS (WalletConnect)
export const sdkConfig = {
  // En producción, obtén esto en el panel de desarrolladores. Para local usa un string cualquiera.
  clientId: "TU_CLIENT_ID_TEMPORAL", 
  
  chains: [
    {
      id: 6281971,
      name: 'DogeOS Testnet',
      rpcUrls: {
        default: { http: ['https://rpc-testnet.dogeos.com'] },
        public: { http: ['https://rpc-testnet.dogeos.com'] },
      },
      nativeCurrency: { 
        name: 'Dogecoin', 
        symbol: 'DOGE', 
        decimals: 18 
      },
    }
  ],
  walletConnectConfig: {
    projectId: "TU_PROJECT_ID_WC", // Consigue uno gratis en walletconnect.com si el default falla
    metadata: {
      name: "Mi Primera DogeOS dApp",
      description: "Probando el SDK",
      url: "http://localhost:5173",
      icons: ["https://avatars.githubusercontent.com/u/37784886"]
    }
  }
};