import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const rWalletModalOpen = atom({
  key: "rWalletModalOpen",
  default: false,
});

//loading
export const rGlobalLoading = atom({
  key: "rGlobalLoading",
  default: false,
});

export const rGlobalLoadingText = atom({
  key: "rGlobalLoadingText",
  default: "",
});

export const useSetWalletModalOpen = () => useSetRecoilState(rWalletModalOpen);

export const useStateGlobalLoading = () => useRecoilState(rGlobalLoading);

//tab
export const rManageTab = atom<"cvoxels" | "transactions" | "signatures">({
  key: "rManageTab",
  default: "cvoxels",
});

export const useStateManageTab = () => useRecoilState(rManageTab);

//login modal
export const rLoginModal = atom({
  key: "rLoginModal",
  default: false,
});
export const useRLoginModal = () => useRecoilState(rLoginModal);

//login modal path
export const rPathForLoginModal = atom({
  key: "rPathForLoginModal",
  default: "",
});
export const useRPathForLoginModal = () => useRecoilState(rPathForLoginModal);

//wallet modal
export const rWalletWidget = atom({
  key: "rWalletWidget",
  default: false,
});
export const useRWalletWidget = () => useRecoilState(rWalletWidget);

export const rGlobalTxLoadingModal = atom({
  key: "rGlobalTxLoadingModal",
  default: false,
});

export const useStateRGlobalTxLoadingModal = () =>
  useRecoilState(rGlobalTxLoadingModal);

export const rGlobalTxHash = atom({
  key: "rGlobalTxHash",
  default: "",
});

export const useStateRGlobalTxHash = () => useRecoilState(rGlobalTxHash);
