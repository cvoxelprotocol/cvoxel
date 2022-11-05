import { atom, useRecoilState } from "recoil";

export type connectionStatusType = "connecting" | "connected" | "disconnected";

export const connectionStatus = atom<connectionStatusType>({
  key: "connectionStatus",
  default: "disconnected",
});

export const useStateConnectionStatus = () => useRecoilState(connectionStatus);

export const myDid = atom<string | undefined>({
  key: "myDid",
  default: undefined,
});

export const useStateMyDid = () => useRecoilState(myDid);
