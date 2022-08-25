;import { EthereumAuthProvider, useViewerConnection, ViewerConnectionState } from "@self.id/framework";
import { useEffect, createContext, useState } from "react";
import { ModelTypes } from "@/interfaces";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useDID } from "@/recoilstate";
import { getCeramicService } from "@/services/Ceramic/CeramicService";

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
    const [did, setDid] = useDID();
    const ceramicService = getCeramicService()
  
    const { disconnectWallet, account, library, chainId } = useWalletAccount();
  
    // clear all state
    const clearState = (): void => {
      setMySelfID(null);
      setDid(undefined)
      setLoggedIn(false)
      disconnect()
    };
  
    const connectDID = async (): Promise<void> => {
      if (account && library && !loggedIn && !mySelfID) {
        setLoggedIn(true);
        const authProvider = new EthereumAuthProvider(library.provider, account);
        const selfID = await connect(authProvider);
        setMySelfID(selfID);
        setDid(selfID?.id)
        ceramicService.setSelfID(selfID || undefined)
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
      did: did,
      chainId
    };
  
    return (
        <DIDContext.Provider value={providerProps}>{children}</DIDContext.Provider>
    )
  };