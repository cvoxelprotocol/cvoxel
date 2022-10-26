import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";

export const useWalletAccount = () => {
  const { connectDID, disConnectDID } = useContext(DIDContext);

  const connectWallet = async () => {
    if (!connectDID) return;
    await connectDID();
  };

  const disconnectWallet = async () => {
    if (!disConnectDID) return;
    await disConnectDID();
  };
  return {
    connectWallet,
    disconnectWallet,
  };
};
