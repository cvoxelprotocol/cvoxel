import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export type connectionStatusType = "connecting" | "connected" | "disconnected";

export const connectionStatus = atom<connectionStatusType>({
  key: "connectionStatus",
  default: "disconnected",
});

export const useStateConnectionStatus = () => useRecoilState(connectionStatus);
export const useSetStateConnectionStatus = () =>
  useSetRecoilState(connectionStatus);
export const useConnectionStatus = () => useRecoilValue(connectionStatus);

export const myDid = atom<string | undefined>({
  key: "myDid",
  default: undefined,
});

export const useStateMyDid = () => useRecoilState(myDid);
export const useSetStateMyDid = () => useSetRecoilState(myDid);
export const useMyDid = () => useRecoilValue(myDid);

export const account = atom<string | undefined>({
  key: "account",
  default: undefined,
});

export const useStateAccount = () => useRecoilState(account);
export const useSetStateAccount = () => useSetRecoilState(account);
export const useAccount = () => useRecoilValue(account);

export const originalAddress = atom<string | undefined>({
  key: "originalAddress",
  default: undefined,
});

export const useStateOriginalAddress = () => useRecoilState(originalAddress);
export const useSetStateOriginalAddress = () =>
  useSetRecoilState(originalAddress);
export const useOriginalAddress = () => useRecoilValue(originalAddress);

export const chainId = atom<number | undefined>({
  key: "chainId",
  default: undefined,
});

export const useStateChainId = () => useRecoilState(chainId);
export const useSetStateChainId = () => useSetRecoilState(chainId);
export const useChainId = () => useRecoilValue(chainId);
