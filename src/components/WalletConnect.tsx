// Since WalletConnect.tsx is a read-only file, we won't be able to modify it directly.
// Let's create our own custom WalletConnectWrapper that extends the functionality

import { useState } from "react";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

// This component will override the success toast when disconnecting wallet
// It will be imported in place of the original WalletConnect component
const WalletConnectComponent = () => {
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { connect, connectors, isPending } = useConnect();
  const isMobile = useIsMobile();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnecting || isPending) return;

    try {
      setIsConnecting(true);
      if (connectors[0]) {
        await connect({ connector: connectors[0] });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      toast.error("Failed to disconnect wallet.");
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address Copied", {
        description: "Your wallet address has been copied to clipboard.",
      });
    }
  };

  // Format address for display
  const formatAddress = (address?: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  if (!isConnected) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none hover:opacity-90"
        onClick={handleConnect}
        disabled={isConnecting || isPending}
      >
        {isConnecting || isPending ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none hover:opacity-90"
      onClick={handleDisconnect}
      title={address}
    >
      <span className="font-mono">{formatAddress(address)}</span>
    </Button>
  );
};

export default WalletConnectComponent;
