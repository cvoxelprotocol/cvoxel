import { getEtherService } from "@/services/Ether/EtherService";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { useDework } from "@/hooks/useDework";
import { getWeb3ModalService } from "@/services/Ether/Web3ModalService";
import {
  useSetStateAccount,
  useSetStateChainId,
  useSetStateConnectionStatus,
  useSetStateMyDid,
  useSetStateOriginalAddress,
} from "@/recoilstate/account";
import { useToast } from "@/hooks/useToast";
import { useGAEvent } from "@/hooks/useGAEvent";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";
import { useMigrationFromDB } from "./useMigrationFromDB";

export const useConnectDID = () => {
  const setMyDid = useSetStateMyDid();
  const setAccount = useSetStateAccount();
  const setOriginalAddress = useSetStateOriginalAddress();
  const setChainId = useSetStateChainId();
  const setConnectionStatus = useSetStateConnectionStatus();
  const etherService = getEtherService();
  const deworkService = getDeworkService();
  const web3ModalService = getWeb3ModalService();
  const { loginDework } = useDework();
  const { lancError } = useToast();
  const { connectEvent } = useGAEvent();
  const { issueHeldEventFromDB, issueHeldMembershipFromDB, migrateHeldEvent } =
    useMigrationFromDB();
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");

  // clear all state
  const clearState = (): void => {
    setMyDid(undefined);
    setAccount(undefined);
    setOriginalAddress(undefined);
    setChainId(undefined);
    localStorage.removeItem("didsession");
    setConnectionStatus("disconnected");
  };

  const connectDID = async (): Promise<void> => {
    setConnectionStatus("connecting");
    try {
      const { account, provider } = await web3ModalService.connectWallet();
      if (account && provider) {
        // connect vess sdk
        const env = CERAMIC_NETWORK == "mainnet" ? "mainnet" : "testnet-clay";
        const { session } = await vess.connect(provider.provider, env);
        setMyDid(session.did.parent);
        setAccount(account);
        setOriginalAddress(web3ModalService.originalAddress);
        setChainId(web3ModalService.chainId);
        etherService.setProvider(provider);
        deworkService.setProvider(provider);
        setConnectionStatus("connected");
        connectEvent(session.id);
        loginDework(account);

        // migration
        // await migrateAccount(
        //   session.did.parent,
        //   web3ModalService.originalAddress
        // );
        await migrateHeldEvent(
          session.did.parent,
          web3ModalService.originalAddress
        );
        // issue credentials from DB
        await issueHeldEventFromDB(session.did.parent);
        await issueHeldMembershipFromDB(session.did.parent);
      } else {
        setConnectionStatus("disconnected");
      }
    } catch (error) {
      console.log(error);
      await disConnectDID();
      clearState();
      if (error instanceof Error) {
        lancError(error.message);
      }
    }
  };

  const disConnectDID = async (): Promise<void> => {
    await web3ModalService.disconnectWallet();
    vess.disconnect();
    clearState();
  };
  return {
    connectDID,
    disConnectDID,
  };
};
