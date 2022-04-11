import { functions } from "../app";
import { httpsCallable } from "firebase/functions";
import { TransactionLogWithChainId } from "@/interfaces";

type getTransactionsResults = {
  status: string;
  tx: TransactionLogWithChainId[];
};
export const getTransactions = (
  address: string
): Promise<TransactionLogWithChainId[]> =>
  new Promise((resolve, reject) => {
    const getTransactionsFunc = httpsCallable<
      { [x: string]: string },
      getTransactionsResults
    >(functions, "getTransactions");
    getTransactionsFunc({
      address: address,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.tx);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getInternalTransactions = (
  txHash: string,
  chainId: string
): Promise<TransactionLogWithChainId[]> =>
  new Promise((resolve, reject) => {
    const getInternalTransactionsFunc = httpsCallable<
      { [x: string]: string },
      getTransactionsResults
    >(functions, "getInternalTransactions");
    getInternalTransactionsFunc({
      txHash: txHash,
      chainId: chainId,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.tx);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
