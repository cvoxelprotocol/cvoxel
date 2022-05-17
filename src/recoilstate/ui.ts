import { atom, useRecoilState } from "recoil";

//loading
export const rGlobalLoading = atom({
  key: "rGlobalLoading",
  default: false,
});

export const useStateGlobalLoading = () => useRecoilState(rGlobalLoading);

//toast
export const rGlobalToast = atom({
  key: "rGlobalToast",
  default: false,
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
