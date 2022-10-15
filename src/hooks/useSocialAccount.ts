import { useQuery, useQueryClient } from "react-query";
import {
  fetchOrbisProfile,
  OrbisProfileDetail,
} from "@/services/workCredential/OrbisHelper";

export const useSocialAccount = (did?: string) => {
  const queryClient = useQueryClient();

  const { data: orbisProfile, isLoading } = useQuery<
    OrbisProfileDetail | undefined
  >(["fetchOrbisProfile", did], () => fetchOrbisProfile(did), {
    enabled: !!did,
    staleTime: Infinity,
    cacheTime: 30000,
  });

  return {
    orbisProfile,
    isLoading,
  };
};
