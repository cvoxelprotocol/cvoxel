import { useQuery } from "react-query";
import { getProfileInfo } from "@/utils/ceramicUtils";
import { Client } from "@/__generated__/types/WorkCredential";
import { DisplayProfile } from "@/interfaces";
import { getVESS } from "vess-sdk";

export const useProfileInfo = (client?: Client) => {
  // const vess = getVESS()
  const vess = getVESS(true);

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
      return getProfileInfo(client.value);
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
