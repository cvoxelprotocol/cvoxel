import { atom, useRecoilState, useRecoilValue } from "recoil";
import type { SelfID } from "@self.id/web";
import { ModelTypes } from "@/interfaces/cVoxelType";

export const selfID = atom<SelfID<ModelTypes> | null>({
  key: "rSelfID",
  default: null,
});

export const useStateSelfID = () => useRecoilState(selfID);
export const useSelfID = () => useRecoilValue(selfID);
