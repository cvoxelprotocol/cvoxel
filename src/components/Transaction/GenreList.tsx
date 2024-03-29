import { FC, useMemo } from "react";
import { Genre, genreColorStyle,genreListV2 } from "@/constants/genre";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { getGenre } from "@/utils/genreUtil";

type GenreListProps = {
  handleGenre: (g: Genre) => void;
  genre?: string;
};

export const GenreList: FC<GenreListProps> = ({ handleGenre, genre }) => {
  const handleChange = (
    newValue: OnChangeValue<Genre, false>,
    actionMeta: ActionMeta<Genre>
  ) => {
    if (!newValue) return;
    handleGenre(newValue);
  };

  const defaultVal = useMemo(() => {
    return !genre ? undefined : getGenre(genre);
  }, [genre]);

  return (
    <div className="w-[240px]">
      <Select
        defaultValue={defaultVal}
        onChange={handleChange}
        isMulti={false}
        options={genreListV2}
        styles={genreColorStyle}
        placeholder={"Select Genre"}
        className={
          "border-none border-b-gray-400 bg-light-surface-variant dark:bg-dark-surface-variant"
        }
      />
    </div>
  );
};
