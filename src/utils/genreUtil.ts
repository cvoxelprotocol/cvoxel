import { Genre, genreList } from "@/constants/genre";

export const getGenre = (genre?: string): Genre | undefined => {
  if (!genre || genre === "") return;
  return genreList.find((g) => g.value === genre);
};

export const getGenreColor = (genre?: string): string | undefined => {
  return getGenre(genre)?.colorCode || "#ff0080";
};
