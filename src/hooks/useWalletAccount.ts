import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";

export const useWalletAccount = () => {
  const { connectDID, disConnectDID } = useContext(DIDContext);

  const connect = async () => {
    if (!connectDID) return;
    try {
      await connectDID();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const disconnect = async () => {
    if (!disConnectDID) return;
    await disConnectDID();
  };
  return {
    connect,
    disconnect,
  };
};
