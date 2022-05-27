import { shortHash } from "@/utils/tools";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";

export class EtherService {
  provider = undefined as Web3Provider | undefined;
  web3 = undefined as Web3 | undefined;

  constructor(provider?: Web3Provider, token?: string) {
    this.provider = provider;
  }

  setProvider(provider?: Web3Provider) {
    this.provider = provider;
    this.web3 = new Web3(Web3.givenProvider);
  }

  async getDisplayENS(address?: string, count: number = 8): Promise<string> {
    if (!address) return "";
    if (!this.provider) return shortHash(address, count);
    const ens = await this.getENSFromAddress(address);
    return ens || shortHash(address, count);
  }

  async getENSFromAddress(address: string): Promise<string | null> {
    if (!this.provider) return null;
    const ens = await this.provider.lookupAddress(address);
    return ens;
  }

  async isContract(address?: string): Promise<boolean> {
    if (!address) return false;
    try {
      const code = await this.web3?.eth.getCode(address);
      return code !== "0x" && code !== "0x0";
    } catch (error) {
      console.log("error", error);
      return false;
    }
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
