import { ETH_CHAIN_ID } from "@/constants/common";
import { networks } from "@/constants/network";

export const getNetworkName = (chainId?: number): string => {
  if (!chainId) return "No Connection";
  return networks[chainId] ? networks[chainId].name : "Unsupported Network";
};

export const getNetworkSymbol = (chainId?: number): "ETH" | "MATIC" => {
  if (!chainId) return "ETH";
  return networks[chainId] ? networks[chainId].symbol : "ETH";
};
