import { EtherscanResult, TransactionLog } from "@/interfaces/explore";
import { offchainCVoxelMetaFetcher } from "@/services/fetcher/CVoxelMetaFetcher";
import { etherscanTxListFetcher } from "@/services/fetcher/EtherscanFetcher";
import { CVoxelMetaDraft } from "@/interfaces";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useWalletAccount } from "./useWalletAccount";

export const useCVoxelList = () => {
  const [address, setAddress] = useState<string>();
  const { account, chainId } = useWalletAccount();
  const [potentialTxes, setPotentialTxes] = useState<TransactionLog[]>([]);
  const { data: txes, isLoading: txLoading } = useQuery<TransactionLog[]>(
    ["etherscan", address],
    () => etherscanTxListFetcher(chainId, address),
    {
      enabled: !!address,
      staleTime: Infinity,
    }
  );
  const { data: offchainMetaList, isLoading: offchainLoading } = useQuery<
    CVoxelMetaDraft[]
  >(["offchainCVoxelMeta", address], () => offchainCVoxelMetaFetcher(address), {
    enabled: !!address,
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log("cv list account", account);
    if (account && !address) {
      setAddress(account);
    }
  }, [account]);

  useEffect(() => {
    if (txes) {
      setPotentialTxes(filterTxes(txes));
      // setPotentialTxes(txes);
    }
  }, [txes]);

  useEffect(() => {
    console.log("offchainMetaList", offchainMetaList);
  }, [offchainMetaList]);

  const filterTxes = (txes: TransactionLog[]): TransactionLog[] => {
    return txes.filter((tx) => Number(tx.value) > 0);
  };

  return {
    setAddress,
    address,
    txLoading,
    offchainLoading,
    potentialTxes,
    offchainMetaList,
  };
};
