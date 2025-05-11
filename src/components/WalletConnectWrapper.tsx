import { useAccount } from "wagmi";
import WalletConnectComponent from "./WalletConnect";

const WalletConnectWrapper = () => {
  const { isConnected } = useAccount();

  return <WalletConnectComponent />;
};

export default WalletConnectWrapper;
