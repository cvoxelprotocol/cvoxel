import { CVoxel, CVoxelItem, ModelTypes } from "@/interfaces";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { useConnection } from "@self.id/framework";
import { useViewerRecord } from "@self.id/react";
import { useCVoxelRecord } from "./useCVoxel";
import { useToast } from "./useToast";

export const useUpdateCVoxel = (id: string) => {
  const connect = useConnection<ModelTypes>()[1];
  const cVoxelItem = useCVoxelRecord(id);

  const update = async (newItem: CVoxel) => {
    try {
      const selfID = await connect();
      if (selfID == null) {
        return false;
      }
      const nowTimestamp = convertDateToTimestampStr(new Date());
      await selfID.client.tileLoader.update(id, {
        ...newItem,
        updatedAt: nowTimestamp,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    cVoxelItem,
    update,
  };
};

export const useUpdateCVoxels = () => {
  const cVoxelsRecord = useViewerRecord<ModelTypes, "cVoxels">("cVoxels");
  const { lancInfo, lancError } = useToast();

  const updateCvoxels = async (id: string, newItem: CVoxel) => {
    if (!cVoxelsRecord.isLoadable) {
      lancError();
      return false;
    }

    try {
      const cVoxels = cVoxelsRecord.content?.cVoxels ?? [];
      const target = cVoxels.find((cv) => cv.id === id);
      if (!target) return;

      const updatedCVoxel: CVoxelItem = { ...target, genre: newItem.genre };
      const updatedCVoxels: CVoxelItem[] = cVoxels.filter((cv) => cv.id !== id);
      updatedCVoxels.push(updatedCVoxel);

      await cVoxelsRecord.set({
        cVoxels: [...updatedCVoxels],
      });
      lancInfo("Updated Successfully");
    } catch (error) {
      console.log("Error", error);
      lancError();
    }
  };

  return { updateCvoxels };
};
