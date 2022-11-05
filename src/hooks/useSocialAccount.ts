import { useQuery } from "react-query";
import { fetchOrbisProfile, OrbisProfileDetail } from "@/services/OrbisHelper";
import { useMemo } from "react";
import { DisplayProfile } from "@/interfaces";
import { formatDID } from "vess-sdk";

export const useSocialAccount = (did?: string) => {
  const { data: orbisProfile, isLoading } = useQuery<
    OrbisProfileDetail | undefined
  >(["fetchOrbisProfile", did], () => fetchOrbisProfile(did), {
    enabled: !!did && did !== "",
    staleTime: Infinity,
    cacheTime: 30000,
  });

  const profile = useMemo<DisplayProfile>(() => {
    return {
      avatarSrc: orbisProfile?.pfp,
      displayName: orbisProfile?.username || (!!did ? formatDID(did, 12) : ""),
      bio: orbisProfile?.description ?? "",
    };
  }, [orbisProfile, did]);

  return {
    profile,
    isLoading,
  };
};
