import {
  usePublicRecord,
  BasicProfile,
  PublicRecord,
} from "@self.id/framework";
import { useMemo, useContext } from "react";
import { getProfileInfo } from "@/utils/ceramicUtils";
import { DIDContext } from "@/context/DIDContext";

export function useProfile(
  id: string
): PublicRecord<BasicProfile | null | undefined> {
  return usePublicRecord("basicProfile", id);
}

export const useMyCeramicAcount = () => {
  const { did } = useContext(DIDContext);
  const profileRecord = useProfile(did || "");

  const displayProfile = useMemo(() => {
    if (!did) return null;
    return getProfileInfo(did, profileRecord.content);
  }, [profileRecord.content, did]);

  return {
    name: displayProfile?.displayName,
    avator: displayProfile?.avatarSrc,
    description: displayProfile?.bio,
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
