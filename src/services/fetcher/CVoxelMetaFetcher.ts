import { getCVoxelList } from "@/lib/firebase/store/meta";
import { CVoxelMetaDraft } from "@/interfaces/cVoxelType";

export const getOffchainCVoxelMeta = async (
  address: string
): Promise<CVoxelMetaDraft[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const list = await getCVoxelList(address);
      resolve(list);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const offchainCVoxelMetaFetcher = (
  address?: string
): Promise<CVoxelMetaDraft[]> => {
  return typeof address === "undefined"
    ? Promise.reject(new Error("Invalid address"))
    : getOffchainCVoxelMeta(address);
};
