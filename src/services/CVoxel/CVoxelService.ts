import { Web3Provider } from "@ethersproject/providers";
import { getCVoxelSignature } from "@/utils/providerUtils";

export class CVoxelService {
  provider = undefined as Web3Provider | undefined;

  constructor(provider?: Web3Provider) {
    this.provider = provider;
  }

  setProvider(provider?: Web3Provider) {
    this.provider = provider;
  }

  getMessageHash = async (
    tx: string,
    address: string,
    summary: string,
    description?: string,
    deliverable?: string
  ): Promise<{ [x: string]: any }> =>
    new Promise(async (resolve, reject) => {
      try {
        const { signature, hash } = await getCVoxelSignature(
          tx,
          address,
          summary,
          description,
          deliverable,
          this.provider
        );
        resolve({ signature, hash });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
}

let cVoxelService: CVoxelService;

export const getCVoxelService = (): CVoxelService => {
  if (cVoxelService) {
    return cVoxelService;
  }
  cVoxelService = new CVoxelService();
  return cVoxelService;
};
