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
      // const uniq = Array.from(
      //   new Map(results.map((result) => [result.hash, result])).values()
      // );

      // const tokenTx = await fetchTokenTransfer(address);
      // const txlists = await fetchUsualTransfer(address);
      // console.log("tokenTx", tokenTx);
      // console.log("txlists", txlists);
      // const results = tokenTx.concat(txlists);
      // const uniq = Array.from(
      //   new Map(results.map((result) => [result.hash, result])).values()
      // );
      console.log("uniq count: ", results.length);
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
      console.log("tokentx dataJson.status", dataJson.status);
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
      console.log("txlist dataJson.status", dataJson.status);
      resolve(dataJson.status === "1" ? dataJson.result : []);
    } catch (error) {
      reject(error);
    }
  });
