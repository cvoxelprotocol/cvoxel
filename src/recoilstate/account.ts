import { atom, useRecoilState } from "recoil";

export type connectionStatusType = "connecting" | "connected" | "disconnected";

export const connectionStatus = atom<connectionStatusType>({
  key: "connectionStatus",
  default: "disconnected",
});

export const useStateConnectionStatus = () => useRecoilState(connectionStatus);
