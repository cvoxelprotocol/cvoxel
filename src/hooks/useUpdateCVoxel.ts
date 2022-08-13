import {
  CVOXEL_UPDATE_FAILED,
  CVOXEL_UPDATE_SUCCEED,
} from "@/constants/toastMessage";
import { CVoxel } from "@/interfaces";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { useCVoxelRecord } from "./useCVoxel";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import { useWalletAccount } from "./useWalletAccount";

export const useUpdateCVoxel = (id: string) => {
  const cVoxelItem = useCVoxelRecord(id);
  const { showLoading, closeLoading } = useModal();
  const { lancInfo, lancError } = useToast();
  const { connectWallet } = useWalletAccount();
  const [mySelfID, _] = useStateMySelfID();

  const update = async (newItem: CVoxel) => {
    try {
      if (mySelfID == null) {
        await connectWallet();
        lancError();
        return false;
      }

      showLoading();

      const nowTimestamp = convertDateToTimestampStr(new Date());
      await mySelfID.client.tileLoader.update(id, {
        ...newItem,
        updatedAt: nowTimestamp,
      });

      closeLoading();
      lancInfo(CVOXEL_UPDATE_SUCCEED);
      return true;
    } catch (error) {
      console.log("error", error);
      closeLoading();
      lancError(CVOXEL_UPDATE_FAILED);
      return false;
    }
  };
  return {
    cVoxelItem,
    update,
  };
};

// export const useUpdateCVoxels = () => {
//   const cVoxelsRecord = useViewerRecord<ModelTypes, "cVoxels">("cVoxels");
//   const { lancInfo, lancError } = useToast();

//   const updateCvoxels = async (id: string, newItem: CVoxel) => {
//     if (!cVoxelsRecord.isLoadable) {
//       lancError();
//       return false;
//     }

//     try {
//       const cVoxels = cVoxelsRecord.content?.cVoxels ?? [];
//       const target = cVoxels.find((cv) => cv.id === id);
//       if (!target) return;

//       const updatedCVoxel: CVoxelItem = { ...target, genre: newItem.genre };
//       const updatedCVoxels: CVoxelItem[] = cVoxels.filter((cv) => cv.id !== id);
//       updatedCVoxels.push(updatedCVoxel);

//       await cVoxelsRecord.set({
//         cVoxels: [...updatedCVoxels],
//       });
//       lancInfo("Updated Successfully");
//     } catch (error) {
//       console.log("Error", error);
//       lancError();
//     }
//   };

//   return { updateCvoxels };
// };
