import { EtherscanResult, TransactionLog } from "@/interfaces/explore";

export const etherscanTxListFetcher = (
  chainId?: number,
  address?: string
): Promise<TransactionLog[]> => {
  return typeof address === "undefined" || typeof chainId === "undefined"
    ? Promise.reject(new Error("Invalid address"))
    : fetchAll(address, chainId.toString());
};

const fetchAll = async (
  address: string,
  chainId: string
): Promise<TransactionLog[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const resultArray = await Promise.all([
        fetchTokenTransfer(address, chainId),
        fetchUsualTransfer(address, chainId),
      ]);
      const results = resultArray[0].concat(resultArray[1]);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

const fetchTokenTransfer = (
  address: string,
  chainId: string
): Promise<TransactionLog[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const dataJson: EtherscanResult = await fetch(
        `/api/etherscan?action=tokentx&address=${address}&chainId=${chainId}`
      ).then((r) => r.json());
      resolve(dataJson.status === "1" ? dataJson.result : []);
    } catch (error) {
      reject(error);
    }
  });

const fetchUsualTransfer = (
  address: string,
  chainId: string
): Promise<TransactionLog[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const dataJson: EtherscanResult = await fetch(
        `/api/etherscan?action=txlist&address=${address}&chainId=${chainId}`
      ).then((r) => r.json());
      resolve(dataJson.status === "1" ? dataJson.result : []);
    } catch (error) {
      reject(error);
    }
  });
