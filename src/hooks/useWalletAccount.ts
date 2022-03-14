import { injected } from "@/lib/wallet/connector";
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import { isMobile } from "react-device-detect";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useEffect } from "react";
import { getAuthService } from "@/services/Auth/AuthService";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";

export const useWalletAccount = () => {
  const { library, account, active, activate, deactivate, chainId } =
    useWeb3React<Web3Provider>();
  const authService = getAuthService();
  const cVoxelService = getCVoxelService();
  const { closeLoading } = useModal();
  const { lancError } = useToast();

  useEffect(() => {
    if (library) {
      authService.setProvider(library);
      cVoxelService.setProvider(library);
    }
  }, [library]);

  const connectWallet = async () => {
    await activate(injected, async (error) => {
      closeLoading();
      if (error instanceof NoEthereumProviderError) {
        if (isMobile) {
          openMetamaskViaDeepLink();
        } else {
          lancError(
            "Error: Please install MetaMask on desktop or visit from a dApp browser on mobile."
          );
        }
      } else if (error instanceof UnsupportedChainIdError) {
        lancError("Error: You're connected to an unsupported network.");
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
    window.open("https://metamask.app.link/dapp/testnet.lanc.app/", "_blank");
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
