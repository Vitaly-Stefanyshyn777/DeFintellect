// src/lib/chains.ts
export const iotaTestnet = {
  id: 97,
  name: "BNB Smart Chain Testnet",
  network: "bsc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-testnet-rpc.publicnode.com"],
    },
    public: {
      http: ["https://bsc-testnet-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.evm.testnet.shimmer.network",
    },
  },
};
