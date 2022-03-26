import { shortHash } from "@/utils/tools";
import { Web3Provider } from "@ethersproject/providers";

export class EtherService {
  provider = undefined as Web3Provider | undefined;

  constructor(provider?: Web3Provider, token?: string) {
    this.provider = provider;
  }

  setProvider(provider?: Web3Provider) {
    this.provider = provider;
  }

  async getDisplayENS(address: string, count: number = 8): Promise<string> {
    if (!this.provider) return shortHash(address, count);
    const ens = await this.getENSFromAddress(address);
    return ens || shortHash(address, count);
  }

  async getENSFromAddress(address: string): Promise<string | null> {
    if (!this.provider) return null;
    const ens = await this.provider.lookupAddress(address);
    console.log(address, ens);
    return ens;
  }
}

let etherService: EtherService;

export const getEtherService = (): EtherService => {
  if (etherService) {
    return etherService;
  }
  etherService = new EtherService();
  return etherService;
};
