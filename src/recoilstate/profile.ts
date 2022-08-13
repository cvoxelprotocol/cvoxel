import { DisplayProfile } from "@/interfaces";
import { CVoxelWithId } from "@/interfaces/cVoxelType";
import { atom, useRecoilState } from "recoil";

export const selectedItem = atom<CVoxelWithId | null>({
  key: "selectedItem",
  default: null,
});

export const useStateSelectedItem = () => useRecoilState(selectedItem);

export const did = atom<string | undefined>({
  key: "did",
  default: undefined,
});

export const useDID = () => useRecoilState(did);

export const displayProfile = atom<DisplayProfile | null>({
  key: "displayProfile",
  default: null,
});

export const useDisplayProfile = () => useRecoilState(displayProfile);
