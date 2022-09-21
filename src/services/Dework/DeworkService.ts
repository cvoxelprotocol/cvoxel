import { Web3Provider } from "@ethersproject/providers";
import { getDeworkConnectSignature } from "@/utils/providerUtils";

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
}

let deworkService: DeworkService;

export const getDeworkService = (): DeworkService => {
  if (deworkService) {
    return deworkService;
  }
  deworkService = new DeworkService();
  return deworkService;
};
