import { TransactionLogWithChainId } from "@/interfaces/explore";
import { etherscanTxListFetcher } from "@/services/fetcher/EtherscanFetcher";
import { WorkCredentialWithId } from "vess-sdk";
import { useMemo, useCallback } from "react";
import { useQuery } from "react-query";
import { uniqueList } from "@/utils/etherscanUtils";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import {
  getOffchainData,
  getOffchainDataList,
} from "@/lib/firebase/store/meta";

export const useOffchainList = () => {
  const { chainId, account, originalAddress } = useDIDAccount();

  const { data: txes, isLoading: txLoading } = useQuery<
    TransactionLogWithChainId[]
  >(
    ["etherscan", originalAddress],
    () => etherscanTxListFetcher(chainId, originalAddress),
    {
      enabled: !!originalAddress,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const {
    data: offchainMetaList,
    isLoading: offchainLoading,
    refetch: refetchMeta,
  } = useQuery<WorkCredentialWithId[]>(
    ["offchainCVoxelMeta", account],
    () => getOffchainDataList(account?.toLowerCase()),
    {
      enabled: !!account,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const updateMetaList = useCallback(() => {
    if (!offchainLoading && offchainMetaList) {
      refetchMeta();
    }
  }, [refetchMeta, offchainLoading, offchainMetaList]);

  const sentTXList = useMemo(() => {
    if (!txes || txes.length === 0) return [];
    return uniqueList("sent", txes, account?.toLowerCase());
  }, [txes, account]);

  const recievedTXList = useMemo(() => {
    if (!txes || txes.length === 0) return [];
    return uniqueList("received", txes, account?.toLowerCase());
  }, [txes, account]);

  return {
    txLoading,
    offchainLoading,
    sentTXList,
    recievedTXList,
    offchainMetaList,
    updateMetaList,
  };
};

export const useOffchainItem = (id?: string) => {
  const { data: offchainItem, isLoading } = useQuery<WorkCredentialWithId>(
    ["offchainItem", id],
    () => getOffchainData(id),
    {
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const getOffchainItem = useCallback(
    async (offchainId: string): Promise<WorkCredentialWithId | null> => {
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
