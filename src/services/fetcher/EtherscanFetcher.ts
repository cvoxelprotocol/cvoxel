import { TransactionLogWithChainId } from "@/interfaces/explore";
import { getTransactions } from "@/lib/firebase/functions/transactions";

export const etherscanTxListFetcher = async (
  chainId?: number,
  address?: string
): Promise<TransactionLogWithChainId[]> => {
  return typeof address === "undefined" || typeof chainId === "undefined"
    ? Promise.reject(new Error("Invalid address"))
    : await getTransactions(address);
};
