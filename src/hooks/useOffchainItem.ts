import { CVoxelMetaDraft } from "@/interfaces";
import { useQuery } from "react-query";
import { getOffchainData } from "@/lib/firebase/store/meta";
import { useCallback } from "react";

export const useOffchainItem = (id?: string) => {
  const { data: offchainItem, isLoading } = useQuery<CVoxelMetaDraft>(
    ["offchainItem", id],
    () => getOffchainData(id),
    {
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const getOffchainItem = useCallback(
    async (offchainId: string): Promise<CVoxelMetaDraft | null> => {
      try {
        const item = await getOffchainData(offchainId);
        return item;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    []
  );

  return {
    isLoading,
    offchainItem,
    getOffchainItem,
  };
};
