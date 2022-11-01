import { createContext, useState } from "react";
import { useStateMySession } from "@/recoilstate/ceramic";
import { getEtherService } from "@/services/Ether/EtherService";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { useDework } from "@/hooks/useDework";
import { DIDSession } from 'did-session'
import { getWeb3ModalService } from "@/services/Ether/Web3ModalService";
import type { AuthMethod } from '@didtools/cacao'
import { connectionStatusType, useStateConnectionStatus } from "@/recoilstate/account";
import { useToast } from "@/hooks/useToast";
import { useGAEvent } from "@/hooks/useGAEvent";
import { getVESS} from "vess-sdk"

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
    const [mySession, setMySession] = useStateMySession();
    const [connectionStatus, setConnectionStatus] = useStateConnectionStatus()
    const etherService = getEtherService();
    const deworkService = getDeworkService();
    const web3ModalService = getWeb3ModalService();
    const {loginDework} = useDework()
    const { lancError } = useToast();
    const {connectEvent} = useGAEvent()
    // const vess = getVESS()
    const vess = getVESS(true)

  
    // clear all state
    const clearState = (): void => {
      setMySession(null);
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
            const session = await vess.connect(provider.provider, "testnet-clay")
            console.log({session})
            setMySession(session)
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
      clearState()
    }

    const loadSession = async(authMethod: AuthMethod):Promise<DIDSession> => {
      const sessionStr = localStorage.getItem('didsession')
      let session
    
      if (sessionStr) {
        session = await DIDSession.fromSession(sessionStr)
      }
    
      if (!session || (session.hasSession && session.isExpired)) {
        session = await DIDSession.authorize(authMethod, {resources: ["ceramic://*"]})
        localStorage.setItem('didsession', session.serialize())
      }
      return session
    }
  
    // use props as a way to pass configuration values
    const providerProps:UserContextState = {
      loggedIn,
      connection: connectionStatus,
      account: web3ModalService.account,
      did: mySession?.id,
      chainId: web3ModalService.chainId,
      connectDID: connectDID,
      disConnectDID: disConnectDID
    };
  
    return (
        <DIDContext.Provider value={providerProps}>{children}</DIDContext.Provider>
    )
  };