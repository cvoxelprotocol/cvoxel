import { atom, useRecoilState } from "recoil";
import {
  CVoxelThree,
  TabKey,
  TransactionLogWithChainId,
  TxTabKey,
  WorkCredentialWithId,
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

//tx tab
export const rManageTxTab = atom<TxTabKey>({
  key: "rManageTxTab",
  default: "received",
});

export const useStateManageTxTab = () => useRecoilState(rManageTxTab);

//my page screen
export const rMyPageScreen = atom<"visual" | "info">({
  key: "rMyPageScreen",
  default: "visual",
});

export const useStateManageScreen = () => useRecoilState(rMyPageScreen);

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
const rCredentialDetailBox = atom<
  | {
      item: WorkCredentialWithId;
      offchainItems?: WorkCredentialWithId[];
    }
  | undefined
>({ key: "rCredentialDetailBox", default: undefined });

export const useStateCredentialDetailBox = () =>
  useRecoilState(rCredentialDetailBox);

export const selectedTx = atom<TransactionLogWithChainId | null>({
  key: "selectedTx",
  default: null,
});

export const useStateSelectedTx = () => useRecoilState(selectedTx);

export const themeMode = atom<"light" | "dark">({
  key: "themeMode",
  default: "light",
});

export const useStateThemeMode = () => useRecoilState(themeMode);

//dework connect
export const rDeworkConnectModal = atom({
  key: "rDeworkConnectModal",
  default: false,
});

export const useStateDeworkConnectModal = () =>
  useRecoilState(rDeworkConnectModal);

export const issueStatus = atom<"completed" | "issuing" | "failed" | undefined>(
  {
    key: "issueStatus",
    default: undefined,
  }
);

export const useStateIssueStatus = () => useRecoilState(issueStatus);
