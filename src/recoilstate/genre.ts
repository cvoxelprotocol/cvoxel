import { Genre } from "@/constants/genre";
import { atom, useRecoilState } from "recoil";

export const selectedGenre = atom<Genre | undefined>({
  key: "selectedGenre",
  default: undefined,
});

export const useStateSelectedGenre = () => useRecoilState(selectedGenre);
