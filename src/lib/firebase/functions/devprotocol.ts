import { httpsCallable } from "firebase/functions";
import { functions } from "../app";
import { WorkSubjectFromERC721 } from "@/interfaces";

type GetResults = {
  status: string;
  subjects: WorkSubjectFromERC721[];
};

type IssueResults = {
  status: string;
  streamIds: string[];
};

export const getDevProtocolTokens = (
  address: string,
  chainId: number
): Promise<WorkSubjectFromERC721[] | undefined> =>
  new Promise((resolve, reject) => {
    const getDevProtocolTokensFunc = httpsCallable<
      { [x: string]: string | number | undefined },
      GetResults
    >(functions, "getDevProtocolTokens");
    getDevProtocolTokensFunc({
      // NOTE: Please send it without converting it to lower case, because the devprotocol side uses an address that includes a checksum.
      address: address,
      chainId: chainId,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.subjects);
        } else {
          resolve(undefined);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const issueCRDLFromDevProtocol = (
  address: string,
  hashes: string[],
  storeAll: boolean
): Promise<string[] | null> =>
  new Promise((resolve, reject) => {
    const issueCRDLFromDeworkFunc = httpsCallable<
      { [x: string]: string | string[] | boolean | undefined },
      IssueResults
    >(functions, "issueCRDLFromDevProtocol");
    issueCRDLFromDeworkFunc({
      address: address.toLowerCase(),
      hashes: hashes,
      storeAll: storeAll,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.streamIds);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
