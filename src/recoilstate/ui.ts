import { atom, useRecoilState } from "recoil";
import {
  CVoxelItem as ICVoxelItem,
  CVoxelMetaDraft,
  CVoxelThree,
} from "@/interfaces";

//loading
export const rGlobalLoading = atom({
  key: "rGlobalLoading",
  default: false,
});

export const useStateGlobalLoading = () => useRecoilState(rGlobalLoading);

//toast
export const rGlobalToast = atom<{
  isShow: boolean;
  message: string;
  voxel?: CVoxelThree;
}>({
  key: "rGlobalToast",
  default: {
    isShow: false,
    message: "",
    voxel: undefined,
  },
});

export const useStateGlobalToast = () => useRecoilState(rGlobalToast);

//tab
export const rManageTab = atom<"cvoxels" | "transactions" | "signatures">({
  key: "rManageTab",
  default: "cvoxels",
});

export const useStateManageTab = () => useRecoilState(rManageTab);

// force update
const rForceUpdate = atom<boolean>({
  key: "rForceUpdate",
  default: false,
});

export const useStateForceUpdate = () => useRecoilState(rForceUpdate);

// CVoxel detail box
const rCVoxelDetailBox = atom<
  | {
      item: ICVoxelItem;
      offchainItems?: CVoxelMetaDraft[];
    }
  | undefined
>({ key: "rCVoxelDetailBox", default: undefined });

export const useStateCVoxelDetailBox = () => useRecoilState(rCVoxelDetailBox);
