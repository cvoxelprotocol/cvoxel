import { CVoxelMetaDraft } from "@/interfaces";
import { useQuery } from "react-query";
import { getOffchainData } from "@/lib/firebase/store/meta";

export const useOffchainItem = (id?: string) => {
  const { data: offchainitem, isLoading } = useQuery<CVoxelMetaDraft>(
    ["offchainItem", id],
    () => getOffchainData(id),
    {
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  return {
    isLoading,
    offchainitem,
  };
};
