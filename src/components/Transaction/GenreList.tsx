import { FC, useMemo, useState } from "react";
import { Genre, genreList, getGenreColorStyle } from "@/constants/genre";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { getGenre } from "@/utils/genreUtil";

type GenreListProps = {
  handleGenre: (g: Genre) => void;
  genre?: string;
};

export const GenreList: FC<GenreListProps> = ({ handleGenre, genre }) => {
  const [activeValue, setActiveValue] = useState<Genre>();

  const handleChange = (
    newValue: OnChangeValue<Genre, false>,
    actionMeta: ActionMeta<Genre>
  ) => {
    if (!newValue) return;
    handleGenre(newValue);
    setActiveValue(newValue);
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
        options={genreList}
        styles={getGenreColorStyle(activeValue)}
        placeholder={"Select Genre"}
        className={"border-none border-b-gray-400"}
      />
    </div>
  );
};
