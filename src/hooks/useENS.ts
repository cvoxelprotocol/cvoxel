import { useQuery } from "@tanstack/react-query";
import { getEtherService } from "@/services/Ether/EtherService";

export const useENS = (address?: string) => {
  const etherService = getEtherService();

  const { data: ens, isInitialLoading: ensLoading } = useQuery<string>(
    ["ENS", address],
    () => etherService.getDisplayENS(address?.toLowerCase()),
    {
      enabled: !!address,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  return {
    ens,
    ensLoading,
  };
};
