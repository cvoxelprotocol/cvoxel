import { injected } from "@/lib/wallet/connector";
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useToast } from "./useToast";
import { isMobile } from "react-device-detect";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useEffect } from "react";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import { getEtherService } from "@/services/Ether/EtherService";
import web3 from "web3";

export const useWalletAccount = () => {
  const { library, account, active, activate, deactivate, chainId } =
    useWeb3React<Web3Provider>();
  const etherService = getEtherService();
  const cVoxelService = getCVoxelService();
  const { lancError } = useToast();

  useEffect(() => {
    if (library) {
      cVoxelService.setProvider(library);
      etherService.setProvider(library);
    }
  }, [library]);

  const connectWallet = async () => {
    await activate(injected, async (error) => {
      if (error instanceof NoEthereumProviderError) {
        if (isMobile) {
          openMetamaskViaDeepLink();
        } else {
          lancError(
            "Error: Please install MetaMask on desktop or visit from a dApp browser on mobile."
          );
        }
      } else if (error instanceof UnsupportedChainIdError) {
        if (
          (window as any).ethereum &&
          (window as any).ethereum.networkVersion !== chainId
        ) {
          try {
            await (window as any).ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: web3.utils.toHex(1) }],
            });
            await activate(injected, async (error) => {
              lancError("Error: Something wrong for connecting wallet...");
            });
          } catch (error) {
            lancError("Error: You're connected to an unsupported network.");
          }
        } else {
          lancError("Error: You're connected to an unsupported network.");
        }
      } else if (error instanceof UserRejectedRequestErrorInjected) {
        lancError(
          "Error: Please authorize this website to access your Ethereum account."
        );
      } else {
        lancError("Error: Something wrong for connecting wallet...");
      }
    });
  };

  const disconnectWallet = () => {
    deactivate();
  };

  const openMetamaskViaDeepLink = () => {
    //TODO: set url to env
    window.open("https://metamask.app.link/dapp/testnet.cvoxel.xyz/", "_blank");
  };

  return {
    connectWallet,
    disconnectWallet,
    active,
    chainId,
    injected,
    library,
    account,
  };
};
