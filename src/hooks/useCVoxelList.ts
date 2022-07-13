import { TransactionLogWithChainId } from "@/interfaces/explore";
import { offchainCVoxelMetaFetcher } from "@/services/fetcher/CVoxelMetaFetcher";
import { etherscanTxListFetcher } from "@/services/fetcher/EtherscanFetcher";
import { CVoxelMetaDraft } from "@/interfaces";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useWalletAccount } from "./useWalletAccount";
import { uniqueList } from "@/utils/etherscanUtils";

export const useCVoxelList = () => {
  const [address, setAddress] = useState<string>();
  const { account, chainId } = useWalletAccount();

  const { data: txes, isLoading: txLoading } = useQuery<
    TransactionLogWithChainId[]
  >(["etherscan", address], () => etherscanTxListFetcher(chainId, address), {
    enabled: !!address,
    staleTime: Infinity,
    cacheTime: 3000000,
  });
  const { data: offchainMetaList, isLoading: offchainLoading } = useQuery<
    CVoxelMetaDraft[]
  >(["offchainCVoxelMeta", address], () => offchainCVoxelMetaFetcher(address), {
    enabled: !!address,
    staleTime: Infinity,
    cacheTime: 3000000,
  });

  useEffect(() => {
    let isMounted = true;
    if (account && !address && isMounted) {
      setAddress(account);
    }
    return () => {
      isMounted = false;
    };
  }, [account]);

  const onlyPotentialCVoxels = useMemo(() => {
    if (!txes || txes.length === 0) return [];
    return uniqueList("none", txes, account?.toLowerCase());
  }, [txes, account]);

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
