import { isEthereumAddress } from "@/utils/ceramicUtils";
import { ETH_CHAIN_ID } from "@/constants/common";
import { core } from "@/lib/ceramic/server";

export const getDIDFromAddress = async (
  address: string
): Promise<string | undefined> => {
  if (isEthereumAddress(address)) {
    const caip10 = `${ETH_CHAIN_ID}${address}`;
    try {
      return await core.getAccountDID(caip10);
    } catch (e) {
      return "";
    }
  } else {
    return "";
  }
};
