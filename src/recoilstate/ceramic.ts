import { DIDSession } from "did-session";
import { atom, useRecoilState } from "recoil";

export const mySession = atom<DIDSession | null>({
  key: "mySession",
  default: null,
});

export const useStateMySession = () => useRecoilState(mySession);
