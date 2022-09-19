;import { EthereumAuthProvider, useViewerConnection, ViewerConnectionState } from "@self.id/framework";
import { useEffect, createContext, useState } from "react";
import { ModelTypes } from "@/interfaces";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { getEtherService } from "@/services/Ether/EtherService";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";

export interface UserContextState {
    loggedIn: boolean;
    connection: ViewerConnectionState<ModelTypes> | undefined
    account: string | undefined;
    did: string | undefined
    chainId: number | undefined
  }
  
  const startingState: UserContextState = {
    loggedIn: false,
    connection: undefined,
    account: undefined,
    did: undefined,
    chainId: undefined
  };

export const DIDContext = createContext(startingState);

export const DIDContextProvider = ({ children }: { children: any }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [connection, connect, disconnect] = useViewerConnection<ModelTypes>();
    const [mySelfID, setMySelfID] = useStateMySelfID();
    const etherService = getEtherService();
    const deworkService = getDeworkService();
    const workCredentialService = getWorkCredentialService()
  
    const { disconnectWallet, account, library, chainId } = useWalletAccount();
  
    // clear all state
    const clearState = (): void => {
      setMySelfID(null);
      setLoggedIn(false)
      disconnect()
    };
  
    const connectDID = async (): Promise<void> => {
      if (account && library && !loggedIn && !mySelfID) {
        setLoggedIn(true);
        const authProvider = new EthereumAuthProvider(library.provider, account);
        const selfID = await connect(authProvider);
        setMySelfID(selfID);
        etherService.setProvider(library);
        deworkService.setProvider(library);
        if(selfID){
          workCredentialService.setProvider(selfID, library)
          //execute v1 data
          workCredentialService.executeMigration(account)
        }
      }
    };

    //TODO: Store session to local storage as a sample below
    // const loadSession = async (
    //   authProvider: EthereumAuthProvider
    // ): Promise<DIDSession> => {
    //   const sessionStr = localStorage.getItem("didsession");
    //   let session;
  
    //   if (sessionStr) {
    //     session = await DIDSession.fromSession(sessionStr);
    //   }
  
    //   if (!session || (session.hasSession && session.isExpired)) {
    //     session = await DIDSession.authorize(authProvider, {
    //       resources: [`ceramic://*`],
    //     });
    //     localStorage.setItem("didsession", session.serialize());
    //   }
  
    //   return session;
    // };
  
    // Update on wallet connect
    useEffect((): void => {
      if (!account) {
        clearState();
      } else {
        // Login to Ceramic
        connectDID();
      }
    }, [account]);
  
    useEffect((): void => {
      switch (connection.status) {
        case "failed": {
          disconnectWallet()
          console.log("failed to connect self id :(");
          break;
        }
        default:
          break;
      }
    }, [connection.status]);
  
    // use props as a way to pass configuration values
    const providerProps:UserContextState = {
      loggedIn,
      connection,
      account: account || undefined,
      did: mySelfID?.id,
      chainId
    };
  
    return (
        <DIDContext.Provider value={providerProps}>{children}</DIDContext.Provider>
    )
  };