import { createContext, useState } from "react";
import { getEtherService } from "@/services/Ether/EtherService";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { useDework } from "@/hooks/useDework";
import { getWeb3ModalService } from "@/services/Ether/Web3ModalService";
import { connectionStatusType, useStateConnectionStatus,useStateMyDid } from "@/recoilstate/account";
import { useToast } from "@/hooks/useToast";
import { useGAEvent } from "@/hooks/useGAEvent";
import { getVESS} from "vess-sdk"
import { CERAMIC_NETWORK } from "@/constants/common";

export interface UserContextState {
    loggedIn: boolean;
    connection: connectionStatusType,
    account: string | undefined;
    did: string | undefined
    chainId: number | undefined
    connectDID: (() => Promise<void>) | undefined
    disConnectDID: (() => Promise<void>) | undefined
  }
  
  const startingState: UserContextState = {
    loggedIn: false,
    connection: "disconnected",
    account: undefined,
    did: undefined,
    chainId: undefined,
    connectDID: undefined,
    disConnectDID: undefined
  };

export const DIDContext = createContext(startingState);

export const DIDContextProvider = ({ children }: { children: any }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [myDid, setMyDid] = useStateMyDid();
    const [connectionStatus, setConnectionStatus] = useStateConnectionStatus()
    const etherService = getEtherService();
    const deworkService = getDeworkService();
    const web3ModalService = getWeb3ModalService();
    const {loginDework} = useDework()
    const { lancError } = useToast();
    const {connectEvent} = useGAEvent()
    // const vess = getVESS()
    const vess = getVESS(CERAMIC_NETWORK !== "mainnet")

  
    // clear all state
    const clearState = (): void => {
      setMyDid(undefined);
      setLoggedIn(false)
      localStorage.removeItem('didsession')
      setConnectionStatus("disconnected")
    };
  
    const connectDID = async (): Promise<void> => {
      setConnectionStatus("connecting")
      try {
        const {account, provider} = await web3ModalService.connectWallet()
        if (account && provider && !loggedIn) {
            // connect vess sdk
            const env = CERAMIC_NETWORK == "mainnet" ? "mainnet" : "testnet-clay"
            const session = await vess.connect(provider.provider, env)
            setMyDid(session.did.parent)
            etherService.setProvider(provider);
            deworkService.setProvider(provider);
            setLoggedIn(true);
            setConnectionStatus("connected")
            connectEvent(session.id)
            loginDework(account) 
            //execute v1 data
            // workCredentialService.executeMigration(account)
            //set dework user auth
        } else {
          setConnectionStatus("disconnected")
        }
      } catch (error) {
        console.log(error);
        await disConnectDID()
        clearState()
        if (error instanceof Error) {
          lancError(error.message);
        }
      }
      
    };

    const disConnectDID = async ():Promise<void> => {
      await web3ModalService.disconnectWallet()
      vess.disconnect()
      clearState()
    }
  
    // use props as a way to pass configuration values
    const providerProps:UserContextState = {
      loggedIn,
      connection: connectionStatus,
      account: web3ModalService.account,
      did: myDid,
      chainId: web3ModalService.chainId,
      connectDID: connectDID,
      disConnectDID: disConnectDID
    };
  
    return (
        <DIDContext.Provider value={providerProps}>{children}</DIDContext.Provider>
    )
  };