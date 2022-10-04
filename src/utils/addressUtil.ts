import { isEthereumAddress } from "@/utils/ceramicUtils";
import { ETH_CHAIN_ID } from "@/constants/common";
import { core } from "@/lib/ceramic/server";

export const getPkhDIDFromAddress = async (
  address: string
): Promise<string | undefined> => {
  if (isEthereumAddress(address)) {
    return `did:pkh:${ETH_CHAIN_ID}${address}`;
  } else {
    return address;
  }
};
