import { ModelTypes } from "@/interfaces";
import { SelfID } from "@self.id/web";
import { atom, useRecoilState } from "recoil";

export const mySelfID = atom<SelfID<ModelTypes> | null>({
  key: "mySelfID",
  default: null,
});

export const useStateMySelfID = () => useRecoilState(mySelfID);
