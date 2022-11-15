import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { isMobile } from "react-device-detect";

export type connectWalletProps = {
  account?: string;
  chainId?: number;
  originalAddress?: string;
  provider?: Web3Provider;
};
export class Web3ModalService {
  provider = undefined as Web3Provider | undefined;
  account = undefined as string | undefined;
  originalAddress = undefined as string | undefined;
  chainId = undefined as number | undefined;
  web3Modal = undefined as Web3Modal | undefined;

  constructor() {}

  setProvider(
    provider?: Web3Provider,
    account?: string,
    chainId?: number,
    web3Modal?: Web3Modal
  ) {
    this.provider = provider;
    this.originalAddress = account;
    this.account = account?.toLowerCase();
    this.web3Modal = web3Modal;
    this.chainId = chainId;
  }

  async connectWallet(): Promise<connectWalletProps> {
    const validation = await this.validateNetwork();
    if (!validation) {
      throw new Error("Please choose ethereum mainnet");
    }
    if (!process.env.NEXT_PUBLIC_INFURA_KEY)
      throw new Error("Something went wrong..");

    if (this.provider && this.account && this.chainId && this.web3Modal) {
      return {
        account: this.account,
        originalAddress: this.originalAddress,
        chainId: this.chainId,
        provider: this.provider,
      };
    }

    try {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_KEY,
            chainId: 1,
            qrcodeModalOptions: {
              desktopLinks: [],
              mobileLinks: ["metamask"],
            },
          },
        },
      };

      this.web3Modal =
        this.web3Modal && this.web3Modal.cachedProvider
          ? this.web3Modal
          : new Web3Modal({
              network: "mainnet", // optional
              cacheProvider: false, // optional
              providerOptions: providerOptions,
              theme: "dark",
            });
      const instance = await this.web3Modal.connect();
      this.provider = new ethers.providers.Web3Provider(instance);
      const network = await this.provider.getNetwork();
      this.chainId = network.chainId;
      const signer = this.provider.getSigner();
      this.originalAddress = await signer.getAddress();
      this.account = this.originalAddress.toLowerCase();
      return {
        account: this.account,
        originalAddress: this.originalAddress,
        chainId: this.chainId,
        provider: this.provider,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Could not connect wallet...");
    }
  }

  async validateNetwork(): Promise<boolean> {
    if (isMobile) return true;
    if (
      (window as any).ethereum &&
      (window as any).ethereum.networkVersion !== 1
    ) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      throw new Error("Please Install Metamask or WalletConnect");
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      this.web3Modal?.clearCachedProvider();
      this.provider = undefined;
      this.account = undefined;
      this.chainId = undefined;
      this.web3Modal = undefined;
    } catch (error) {
      console.log("error", error);
      throw new Error("Something went wrong..");
    }
  }
}

let web3ModalService: Web3ModalService;

export const getWeb3ModalService = (): Web3ModalService => {
  if (web3ModalService) {
    return web3ModalService;
  }
  web3ModalService = new Web3ModalService();
  return web3ModalService;
};
