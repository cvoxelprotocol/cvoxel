import { TransactionLogWithChainId } from "@/interfaces/explore";
import { offchainCVoxelMetaFetcher } from "@/services/fetcher/CVoxelMetaFetcher";
import { etherscanTxListFetcher } from "@/services/fetcher/EtherscanFetcher";
import { CVoxelMetaDraft } from "@/interfaces";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useWalletAccount } from "./useWalletAccount";

export const useCVoxelList = () => {
  const [address, setAddress] = useState<string>();
  const { account, chainId } = useWalletAccount();
  const [potentialTxes, setPotentialTxes] = useState<
    TransactionLogWithChainId[]
  >([]);
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

  useEffect(() => {
    if (txes) {
      setPotentialTxes(filterTxes(txes));
    }
  }, [txes]);

  const onlyPotentialCVoxels = useMemo(() => {
    if (!account)
      return potentialTxes.sort((a, b) => {
        return Number(a.timeStamp) > Number(b.timeStamp) ? -1 : 1;
      });
    return potentialTxes.sort((a, b) => {
      return Number(a.timeStamp) > Number(b.timeStamp) ? -1 : 1;
    });
  }, [potentialTxes]);

  const filterTxes = (
    txes: TransactionLogWithChainId[]
  ): TransactionLogWithChainId[] => {
    if (!txes || txes.length === 0) return [];
    return txes.filter((tx) => Number(tx.value) > 0);
  };

  return {
    txLoading,
    offchainLoading,
    onlyPotentialCVoxels,
    offchainMetaList,
  };
};
