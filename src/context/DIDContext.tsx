import { createContext, useState } from "react";
import { useStateMySession } from "@/recoilstate/ceramic";
import { getEtherService } from "@/services/Ether/EtherService";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useDework } from "@/hooks/useDework";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { CERAMIC_URL } from "@/constants/common";
import { DIDSession } from 'did-session'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { getWeb3ModalService } from "@/services/Ether/Web3ModalService";
import type { AuthMethod } from '@didtools/cacao'
import { connectionStatusType, useStateConnectionStatus } from "@/recoilstate/account";
import { useToast } from "@/hooks/useToast";
import { useGAEvent } from "@/hooks/useGAEvent";

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
    const workCredentialService = getWorkCredentialService()
    const web3ModalService = getWeb3ModalService();
    const {loginDework} = useDework()
    const { lancError } = useToast();
    const {connectEvent,disConnectEvent} = useGAEvent()

  
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
        if (account && provider && !loggedIn && !mySession) {
            etherService.setProvider(web3ModalService.provider);
            deworkService.setProvider(web3ModalService.provider);
            const accountId = await getAccountId(provider.provider, account)
            const authMethod = await EthereumWebAuth.getAuthMethod(provider.provider, accountId)
            const session = await loadSession(authMethod)
            setMySession(session)
            const ceramic = new CeramicClient(CERAMIC_URL)
            ceramic.did = session.did
            workCredentialService.setProvider(session.did, provider, ceramic)
    
            setLoggedIn(true);
            setConnectionStatus("connected")
            connectEvent(session.id)
    
            //execute v1 data
            workCredentialService.executeMigration(account)
            //set dework user auth
            loginDework(account) 
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
      if(mySession?.id) {
        disConnectEvent(mySession.id)
      }
      await web3ModalService.disconnectWallet()
      clearState()
    }

    // useEffect(() => {
    //   const sessionStr = localStorage.getItem('didsession')
    //   if(sessionStr) {
    //     connectDID()
    //   }
    // },[])

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