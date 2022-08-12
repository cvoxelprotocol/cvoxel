;import { EthereumAuthProvider, SelfID, useViewerConnection, useViewerID, ViewerConnectionState } from "@self.id/framework";
import { useEffect, useCallback, useMemo, createContext, useState, ReactNode, FC } from "react";

import { ModelTypes } from "@/interfaces";
import { Web3Provider } from "@ethersproject/providers";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useDID } from "@/recoilstate";

export interface UserContextState {
    loggedIn: boolean;
    connection: ViewerConnectionState<ModelTypes> | undefined
    account: string | undefined;
    did: string | undefined
  }
  
  const startingState: UserContextState = {
    loggedIn: false,
    connection: undefined,
    account: undefined,
    did: undefined
  };

export const DIDContext = createContext(startingState);

export const DIDContextProvider = ({ children }: { children: any }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [connection, connect, disconnect] = useViewerConnection<ModelTypes>();
    const [mySelfID, setMySelfID] = useStateMySelfID();
    const [did, setDid] = useDID();
  
    // Use onboard to control the current provider/wallets
    const { disconnectWallet, account, library } = useWalletAccount();
    const [address, setAddress] = useState<string>();
    const [signer, setSigner] = useState<Web3Provider | undefined>();
  
    // clear all state
    const clearState = (): void => {
      setAddress(undefined);
      setSigner(undefined);
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
          // user refused to connect to ceramic -- disconnect them
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
      did: did
    };
  
    return (
        <DIDContext.Provider value={providerProps}>{children}</DIDContext.Provider>
    )
  };