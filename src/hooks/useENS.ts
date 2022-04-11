import { useState } from "react";
import { useQuery } from "react-query";
import { getEtherService } from "@/services/Ether/EtherService";

export const useENS = () => {
  const [address, setAddress] = useState<string>();
  const etherService = getEtherService();

  const { data: ens, isLoading: ensLoading } = useQuery<string>(
    ["ENS", address],
    () => etherService.getDisplayENS(address),
    {
      enabled: !!address,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  return {
    ens,
    ensLoading,
    setAddress,
  };
};
