import { useQuery } from "@tanstack/react-query";
import { getOrbisHelper, OrbisProfileDetail } from "@/services/OrbisHelper";
import { useMemo } from "react";
import { DisplayProfile } from "@/interfaces";
import { formatDID } from "vess-sdk";

export const useSocialAccount = (did?: string) => {
  const orbisHelper = getOrbisHelper();
  const { data: orbisProfile, isInitialLoading } =
    useQuery<OrbisProfileDetail | null>(
      ["fetchOrbisProfile", did],
      () => orbisHelper.fetchOrbisProfile(did),
      {
        enabled: !!did && did !== "",
        staleTime: Infinity,
        cacheTime: 1000000,
      }
    );

  const profile = useMemo<DisplayProfile>(() => {
    return {
      avatarSrc: orbisProfile?.pfp,
      displayName: orbisProfile?.username || (!!did ? formatDID(did, 12) : ""),
      bio: orbisProfile?.description ?? "",
    };
  }, [orbisProfile, did]);

  return {
    profile,
    isInitialLoading,
  };
};
