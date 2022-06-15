import { atom, useRecoilState } from "recoil";
import {
  CVoxelItem as ICVoxelItem,
  CVoxelMetaDraft,
  CVoxelThree,
  TabKey,
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
export const rManageTab = atom<TabKey>({
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

//drawer
export const rShowDrawer = atom<boolean>({
  key: "rShowDrawer",
  default: false,
});

export const useStateShowDrawer = () => useRecoilState(rShowDrawer);

// CVoxel detail box
const rCVoxelDetailBox = atom<
  | {
      item: ICVoxelItem;
      offchainItems?: CVoxelMetaDraft[];
    }
  | undefined
>({ key: "rCVoxelDetailBox", default: undefined });

export const useStateCVoxelDetailBox = () => useRecoilState(rCVoxelDetailBox);
