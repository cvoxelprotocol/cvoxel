import { TransactionLogWithChainId } from "@/interfaces/explore";
import { getEtherService } from "@/services/Ether/EtherService";
import { internalTxListFetcher } from "@/services/fetcher/EtherscanFetcher";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useWalletAccount } from "./useWalletAccount";

export const useInternalTransactions = (tx: TransactionLogWithChainId) => {
  const etherService = getEtherService();
  const { account } = useWalletAccount();

  const isPayee = useMemo(() => {
    if (!account || !tx) return null;
    return account?.toLowerCase() === tx.to.toLowerCase();
  }, [account, tx]);

  const { data: isContract, isLoading: isContractLoading } = useQuery<boolean>(
    ["isContract", tx.hash],
    () => etherService.isContract(isPayee ? tx.from : tx.to),
    {
      enabled: !!isPayee && !!tx,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const { data: internalTxs, isLoading: internalTxLoading } = useQuery<
    TransactionLogWithChainId[]
  >(
    ["internal", tx.hash],
    () => internalTxListFetcher(tx.hash, tx.chainId.toString()),
    {
      enabled: !!tx && isContract && !isContractLoading,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  return {
    internalTxs,
    internalTxLoading,
  };
};
