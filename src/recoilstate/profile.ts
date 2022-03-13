import { CVoxelWithId } from "@/interfaces/cVoxelType";
import { atom, useRecoilState } from "recoil";

export const selectedItem = atom<CVoxelWithId | null>({
  key: "selectedItem",
  default: null,
});

export const useStateSelectedItem = () => useRecoilState(selectedItem);
