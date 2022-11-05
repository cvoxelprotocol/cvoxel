import { useQuery } from "react-query";
import { DisplayProfile } from "@/interfaces";
import { getVESS, Client } from "vess-sdk";
import { useSocialAccount } from "./useSocialAccount";
import { CERAMIC_NETWORK } from "@/constants/common";

export const useProfileInfo = (client?: Client) => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const { profile: socialProfile } = useSocialAccount(
    client?.format === "DID" ? client.value : undefined
  );

  const { data: profile, isLoading } = useQuery<DisplayProfile>(
    ["Client", client],
    () => fetchProfile(client),
    {
      enabled: !!client,
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const fetchProfile = async (client?: Client): Promise<DisplayProfile> => {
    if (client?.format === "DID") {
      return socialProfile;
    } else if (client?.format === "orgId") {
      const org = await vess.getOrganization(client.value);
      return {
        displayName: org?.name || "",
        bio: org?.desc || "",
        avatarSrc: org?.icon,
      };
    }
    return {
      displayName: "",
      bio: "",
    };
  };
  return {
    profile,
    isLoading,
  };
};
