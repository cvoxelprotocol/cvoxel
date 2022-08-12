import {
  usePublicRecord,
  BasicProfile,
  PublicRecord,
} from "@self.id/framework";
import { useMemo, useContext } from "react";
import { getProfileInfo } from "@/utils/ceramicUtils";
import { useWalletAccount } from "./useWalletAccount";
import { DIDContext } from "@/context/DIDContext";

export function useProfile(
  id: string
): PublicRecord<BasicProfile | null | undefined> {
  return usePublicRecord("basicProfile", id);
}

export const useMyCeramicAcount = () => {
  const { connectWallet, disconnectWallet } = useWalletAccount();
  const { loggedIn, connection, account, did } = useContext(DIDContext);
  const profileRecord = useProfile(did || "");

  const displayProfile = useMemo(() => {
    if (!did) return null;
    return getProfileInfo(did, profileRecord.content);
  }, [profileRecord.content, did]);

  return {
    did,
    account,
    name: displayProfile?.displayName,
    avator: displayProfile?.avatarSrc,
    description: displayProfile?.bio,
    connectWallet,
    disconnectWallet,
    loggedIn,
    connection,
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
