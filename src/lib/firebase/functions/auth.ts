import { functions } from "../app";
import { httpsCallable } from "firebase/functions";

export const getNonce = (address: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const getNonceToSignFunc = httpsCallable<
      { [x: string]: string },
      { [x: string]: string }
    >(functions, "getNonceToSign");
    getNonceToSignFunc({ address: address })
      .then((result) => {
        resolve(result.data.nonce);
      })
      .catch((error) => {
        // const code = error.code;
        // const message = error.message;
        // const details = error.details;
        reject(error);
      });
  });

export const getLoginToken = (address: string, did: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const createAccountWithDIDFunc = httpsCallable<
      { [x: string]: string },
      { [x: string]: string }
    >(functions, "createAccountWithDID");
    createAccountWithDIDFunc({ address: address, did: did })
      .then((result) => {
        resolve(result.data.token);
      })
      .catch((error) => {
        // const code = error.code;
        // const message = error.message;
        // const details = error.details;
        reject(error);
      });
  });
