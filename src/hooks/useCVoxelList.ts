import { TransactionLogWithChainId } from "@/interfaces/explore";
import { offchainCVoxelMetaFetcher } from "@/services/fetcher/CVoxelMetaFetcher";
import { etherscanTxListFetcher } from "@/services/fetcher/EtherscanFetcher";
import { CVoxelMetaDraft } from "@/interfaces";
import { useMemo, useContext } from "react";
import { useQuery } from "react-query";
import { uniqueList } from "@/utils/etherscanUtils";
import { DIDContext } from "@/context/DIDContext";

export const useCVoxelList = () => {
  const { chainId, account } = useContext(DIDContext);

  const { data: txes, isLoading: txLoading } = useQuery<
    TransactionLogWithChainId[]
  >(["etherscan", account], () => etherscanTxListFetcher(chainId, account), {
    enabled: !!account,
    staleTime: Infinity,
    cacheTime: 3000000,
  });
  const { data: offchainMetaList, isLoading: offchainLoading } = useQuery<
    CVoxelMetaDraft[]
  >(["offchainCVoxelMeta", account], () => offchainCVoxelMetaFetcher(account), {
    enabled: !!account,
    staleTime: Infinity,
    cacheTime: 3000000,
  });

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
  };
};
