import { DeworkUser } from "@/interfaces/dework";
import { atom, useRecoilState } from "recoil";

export const deworkAuth = atom<DeworkUser | null>({
  key: "deworkAuth",
  default: null,
});

export const useStateDeworkAuth = () => useRecoilState(deworkAuth);

export const deworkTargetIds = atom<string[]>({
  key: "deworkTargetIds",
  default: [],
});

export const useStateDeworkTargetIds = () => useRecoilState(deworkTargetIds);
