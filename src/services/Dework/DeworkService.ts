import { Web3Provider } from "@ethersproject/providers";
import { getDeworkConnectSignature } from "@/utils/providerUtils";
import {
  deworkAuth,
  getDeworkUserTasks,
  issueCRDLFromDework,
  reFetchDeworkUserTasks,
  updateGenreOfDeworkTask,
} from "@/lib/firebase/functions/dework";
import { DeworkUser } from "@/interfaces/dework";
import { WorkSubjectFromDework } from "@/interfaces";

export type updateGenreParam = {
  account: string;
  id: string;
  genre: string;
};

export type issueCRDLFromDeworkParam = {
  address: string;
  ids: string[];
  storeAll: boolean;
};

export class DeworkService {
  provider = undefined as Web3Provider | undefined;

  constructor(provider?: Web3Provider) {
    this.provider = provider;
  }

  setProvider(provider?: Web3Provider) {
    this.provider = provider;
  }

  getDeworkAuthMessageSig = async (nonce: string): Promise<string> =>
    new Promise(async (resolve, reject) => {
      try {
        const sig = await getDeworkConnectSignature(nonce, this.provider);
        resolve(sig);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  exexAuth = async (
    name: string,
    nonce: string,
    address: string
  ): Promise<DeworkUser | null> => {
    const sig = await this.getDeworkAuthMessageSig(nonce);
    return await deworkAuth(name, sig, nonce, address);
  };

  getDeworkTasks = async (
    address: string,
    id?: string
  ): Promise<WorkSubjectFromDework[] | null> => {
    return await getDeworkUserTasks(address, id);
  };

  refetchDeworkTasks = async (
    address: string,
    id?: string
  ): Promise<WorkSubjectFromDework[] | null> => {
    return await reFetchDeworkUserTasks(address, id);
  };

  updateDeworkTaskGenre = async (
    param: updateGenreParam
  ): Promise<WorkSubjectFromDework | null> => {
    const { account, id, genre } = param;
    return await updateGenreOfDeworkTask(account, id, genre);
  };

  issueCRDLs = async (
    param: issueCRDLFromDeworkParam
  ): Promise<string[] | null> => {
    const { address, ids, storeAll } = param;
    return await issueCRDLFromDework(address, ids, storeAll);
  };
}

let deworkService: DeworkService;

export const getDeworkService = (): DeworkService => {
  if (deworkService) {
    return deworkService;
  }
  deworkService = new DeworkService();
  return deworkService;
};
