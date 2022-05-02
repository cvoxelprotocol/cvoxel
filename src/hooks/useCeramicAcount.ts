import { core } from "@/lib/ceramic/server";
import {
  useConnection,
  useViewerID,
  usePublicRecord,
  BasicProfile,
  PublicRecord,
} from "@self.id/framework";
import { useEffect, useCallback, useMemo } from "react";
import { getProfileInfo } from "@/utils/ceramicUtils";
import { useWalletAccount } from "./useWalletAccount";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { ModelTypes } from "@/interfaces";
import { useDID } from "@/recoilstate";

export function useProfile(
  id: string
): PublicRecord<BasicProfile | null | undefined> {
  return usePublicRecord("basicProfile", id);
}

export const useMyCeramicAcount = () => {
  const [connection, connect, disconnect] = useConnection<ModelTypes>();
  const { connectWallet, disconnectWallet, account, chainId, active } =
    useWalletAccount();
  const [did, setDid] = useDID();
  const viewerID = useViewerID<ModelTypes>();
  const profileRecord = useProfile(did);

  useEffect(() => {
    let isMounted = true;
    async function reConnectWalletAuto() {
      if (viewerID && isMounted && !active) {
        await connectWallet();
        setDid(viewerID.id);
      }
    }
    reConnectWalletAuto();

    return () => {
      isMounted = false;
    };
  }, [viewerID, connectWallet]);

  const displayProfile = useMemo(() => {
    return getProfileInfo(did, profileRecord.content);
  }, [profileRecord.content, did]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getTempDID();
    }
    return () => {
      isMounted = false;
    };
  }, [account]);

  const getTempDID = useCallback(async () => {
    if (account && !did) {
      try {
        const accountLink = await Caip10Link.fromAccount(
          core.ceramic,
          `${account}@eip155:${chainId}`
        );
        if (accountLink.did) {
          setDid(accountLink.did);
        }
      } catch (error) {
        console.log("getTempDIDProfile ERROR: ", error);
      }
    }
  }, [account]);

  const connectCeramic = async () => {
    const id = await connect();
    await connectWallet();
  };
  const connectWalletOnly = async () => {
    await connectWallet();
  };
  const disconnectCeramic = () => {
    disconnect();
    disconnectWallet();
  };

  return {
    connectCeramic,
    disconnectCeramic,
    connection,
    viewerID,
    did,
    account,
    name: displayProfile.displayName,
    avator: displayProfile.avatarSrc,
    description: displayProfile.bio,
    connectWalletOnly,
  };
};

export const useUserCeramicAcount = (did: string) => {
  const profileRecord = useProfile(did);

  const displayProfile = useMemo(() => {
    return getProfileInfo(did, profileRecord.content);
  }, [profileRecord.content, did]);

  return {
    profileRecord,
    name: displayProfile.displayName,
    avator: displayProfile.avatarSrc,
    description: displayProfile.bio,
  };
};
