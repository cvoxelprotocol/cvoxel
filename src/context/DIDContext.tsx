;import { EthereumAuthProvider, useViewerConnection, ViewerConnectionState } from "@self.id/framework";
import { useEffect, createContext, useState } from "react";
import { ModelTypes } from "@/interfaces";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useDID } from "@/recoilstate";

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
  
    const { disconnectWallet, account, library, chainId } = useWalletAccount();
    const [address, setAddress] = useState<string>();
  
    // clear all state
    const clearState = (): void => {
      setAddress(undefined);
      setMySelfID(null);
      setDid(undefined)
      disconnect()
    };
  
    const connectDID = async (): Promise<void> => {
      if (account && library && !loggedIn && !mySelfID) {
        setLoggedIn(true);
        const authProvider = new EthereumAuthProvider(library.provider, account);
        const selfID = await connect(authProvider);
        setMySelfID(selfID);
        console.log("selfID", selfID);
        setDid(selfID?.id)
      }
    };
  
    // Update on wallet connect
    useEffect((): void => {
      if (!account) {
        clearState();
      } else {
        setAddress(account);
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
      account: address,
      did: did,
      chainId
    };
  
    return (
        <DIDContext.Provider value={providerProps}>{children}</DIDContext.Provider>
    )
  };