import { functions } from "../app";
import { httpsCallable } from "firebase/functions";
import { CVoxelMetaDraft } from "@/interfaces";

export const createDraftWighVerify = (
  address: string,
  draft: CVoxelMetaDraft
): Promise<string> =>
  new Promise((resolve, reject) => {
    const createDraftWighVerifyFunc = httpsCallable<
      { [x: string]: string | CVoxelMetaDraft },
      { [x: string]: string }
    >(functions, "createDraftWighVerify");
    createDraftWighVerifyFunc({
      address: address,
      draft: draft,
    })
      .then((result) => {
        resolve(result.data.status);
      })
      .catch((error) => {
        // const code = error.code;
        // const message = error.message;
        // const details = error.details;
        reject(error);
      });
  });

export const updateDraftWighVerify = (
  signature: string,
  hash: string,
  address: string,
  networkId: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    const updateDraftWighVerifyFunc = httpsCallable<
      { [x: string]: string },
      { [x: string]: string }
    >(functions, "updateDraftWighVerify");
    updateDraftWighVerifyFunc({
      address: address,
      signature: signature,
      hash: hash,
      networkId: networkId,
    })
      .then((result) => {
        resolve(result.data.status);
      })
      .catch((error) => {
        // const code = error.code;
        // const message = error.message;
        // const details = error.details;
        reject(error);
      });
  });
