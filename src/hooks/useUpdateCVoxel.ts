import { CVoxel } from "@/interfaces";
import { useCVoxelRecord } from "./useCVoxel";

export const useUpdateCVoxel = (id: string) => {
  const cVoxelItem = useCVoxelRecord(id);

  const update = async (newItem: CVoxel) => {
    try {
      await cVoxelItem.update(newItem);
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    cVoxelItem,
    update,
  };
};
