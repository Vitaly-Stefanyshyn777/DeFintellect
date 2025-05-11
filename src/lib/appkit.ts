// src/lib/appkit.ts
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  createAppKit,
  useAppKit,
  useAppKitAccount,
  useAppKitEvents,
  useAppKitNetwork,
  useAppKitState,
  useAppKitTheme,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit/react";

// Define our own AppKitNetwork type since it's not exported from @reown/appkit
type AppKitNetwork = {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
    public: {
      http: string[];
    };
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
    };
  };
};

// Define BNB Smart Chain Testnet
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

// Get Project ID from environment variables
// Use a function to safely access environment variables
const getProjectId = () => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Try to get from import.meta.env (Vite)
    if (import.meta.env && import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID) {
      return import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
    }

    // Check if it's available in window.ENV (if you set it that way)
    if ((window as any).ENV && (window as any).ENV.WALLET_CONNECT_PROJECT_ID) {
      return (window as any).ENV.WALLET_CONNECT_PROJECT_ID;
    }
  }

  // Fallback for development or if env var is missing
  return "bd6092ab8640390c85790de8a3451a21";
};

// Get the project ID
export const projectId = getProjectId();

// Log the project ID (masked for security)
if (typeof window !== "undefined") {
  const maskedId = projectId
    ? `${projectId.substring(0, 4)}...${projectId.substring(
        projectId.length - 4
      )}`
    : "undefined";
  console.log("Using WalletConnect Project ID:", maskedId);
}

// Setup wagmi adapter with correct type handling
export const wagmiAdapter = new WagmiAdapter({
  networks: [iotaTestnet] as AppKitNetwork[],
  projectId,
  options: {
    walletConnectParameters: {
      projectId,
      metadata: {
        name: "AToIoTA",
        description: "AI-Powered Portfolio Allocation",
        url:
          typeof window !== "undefined"
            ? window.location.origin
            : "https://atoiota.xyz",
        icons: ["https://img.icons8.com/3d-fluency/94/globe-africa.png"],
      },
      showQrModal: true,
    },
  },
});

// Create modal with proper type handling
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [iotaTestnet] as unknown as [AppKitNetwork, ...AppKitNetwork[]],
  metadata: {
    name: "AToIoTA",
    description: "AI-Powered Portfolio Allocation",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://atoiota.xyz",
    icons: ["https://img.icons8.com/3d-fluency/94/globe-africa.png"],
  },
  projectId,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#8B5CF6",
  },
  features: {
    analytics: true,
  },
});

// Re-export hooks from @reown/appkit/react
export {
  useAppKit,
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useAppKitNetwork,
  useWalletInfo,
  useDisconnect,
};
