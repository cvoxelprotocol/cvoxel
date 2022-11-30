import { atom, useRecoilState } from "recoil";
import {
  CVoxelThree,
  TabKey,
  TransactionLogWithChainId,
  TxTabKey,
} from "@/interfaces";
import { WorkCredentialWithId } from "vess-sdk";

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

//dework task list
export const rDeworkTaskListModal = atom({
  key: "rDeworkTaskListModal",
  default: false,
});

export const useStateDeworkTaskListModal = () =>
  useRecoilState(rDeworkTaskListModal);

//devprotocol token list
export const rDevProtocolListModal = atom({
  key: "rDevProtocolListModal",
  default: false,
});

export const useStateDevProtocolListModal = () =>
  useRecoilState(rDevProtocolListModal);

//workspace create
export const rWorkspaceCreateModal = atom({
  key: "rWorkspaceCreateModal",
  default: false,
});

export const useStateWorkspaceCreateModal = () =>
  useRecoilState(rWorkspaceCreateModal);

//MEMBERSHIP create
export const rMembershipCreateModal = atom({
  key: "rMembershipCreateModal",
  default: false,
});

export const useStateMembershipCreateModal = () =>
  useRecoilState(rMembershipCreateModal);

//MEMBERSHIP subject create
export const rMembershipSubjectCreateModal = atom({
  key: "rMembershipSubjectCreateModal",
  default: false,
});

export const useStateMembershipSubjectCreateModal = () =>
  useRecoilState(rMembershipSubjectCreateModal);

//event create
export const rIssueEventModal = atom({
  key: "rIssueEventModal",
  default: false,
});

export const useStateIssueEventModal = () => useRecoilState(rIssueEventModal);

//issue event attendance
export const rIssueEventAttendanceModal = atom({
  key: "rIssueEventAttendanceModal",
  default: false,
});

export const useStateIssueEventAttendanceModal = () =>
  useRecoilState(rIssueEventAttendanceModal);

//issue event attendance from proxy
export const rIssueEventAttendanceFromProxyModal = atom({
  key: "rIssueEventAttendanceFromProxyModal",
  default: false,
});

export const useStateIssueEventAttendanceFromProxyModal = () =>
  useRecoilState(rIssueEventAttendanceFromProxyModal);

export const issueStatus = atom<"completed" | "issuing" | "failed" | undefined>(
  {
    key: "issueStatus",
    default: undefined,
  }
);

export const useStateIssueStatus = () => useRecoilState(issueStatus);
