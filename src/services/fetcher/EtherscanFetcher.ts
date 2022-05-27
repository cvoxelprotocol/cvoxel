import { TransactionLogWithChainId } from "@/interfaces/explore";
import {
  getInternalTransactions,
  getTransactions,
} from "@/lib/firebase/functions/transactions";

export const etherscanTxListFetcher = async (
  chainId?: number,
  address?: string
): Promise<TransactionLogWithChainId[]> => {
  return typeof address === "undefined" || typeof chainId === "undefined"
    ? Promise.reject(new Error("Invalid address"))
    : await getTransactions(address);
};

export const internalTxListFetcher = async (
  txHash?: string,
  chainId?: string
): Promise<TransactionLogWithChainId[]> => {
  return typeof txHash === "undefined" || typeof chainId === "undefined"
    ? Promise.reject(new Error("Invalid address"))
    : await getInternalTransactions(txHash, chainId);
};
