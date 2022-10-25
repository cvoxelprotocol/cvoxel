import { functions } from "../app";
import { httpsCallable } from "firebase/functions";

export const getFiat = (
  value: string,
  tokenSymbol: string,
  tokenDecimal: string,
  issuedTimestamp: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    const getFiatFunc = httpsCallable<
      { [x: string]: string },
      { [x: string]: string }
    >(functions, "getFiat");
    getFiatFunc({
      value: value,
      tokenSymbol: tokenSymbol,
      tokenDecimal: tokenDecimal,
      issuedTimestamp: issuedTimestamp,
    })
      .then((result) => {
        resolve(result.data.fiat);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const setFiat = (networkId: string, txHash: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const setFiatFunc = httpsCallable<
      { [x: string]: string },
      { [x: string]: string }
    >(functions, "setFiat");
    setFiatFunc({
      networkId: networkId,
      txHash: txHash,
    })
      .then((result) => {
        resolve(result.data.fiat);
      })
      .catch((error) => {
        reject(error);
      });
  });
