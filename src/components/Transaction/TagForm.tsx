import {
  colourStyles,
  getTagOption,
  TagOption,
  TagOptions,
} from "@/constants/tags";
import {FC, useMemo} from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { useThemeMode } from "@/hooks/useThemeMode";

type TagFormProps = {
  handleTags: (tags: string[]) => void;
  tags?: string[];
};

export const TagForm: FC<TagFormProps> = ({ handleTags, tags }) => {
  const handleChange = (
    newValue: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>
  ) => {
    handleTags(newValue.map((item) => item.value));
  };

  const defaultVal = useMemo(() => {
    return !tags ? undefined : tags.map((v) => getTagOption(v));
  }, [tags]);

  const { themeMode } = useThemeMode();
  const isDarkMode = useMemo(() => themeMode == "dark", [themeMode]);

  return (
    <CreatableSelect
      isMulti
      defaultValue={defaultVal}
      onChange={handleChange}
      options={TagOptions}
      styles={colourStyles(isDarkMode)}
      placeholder={"Enter tags as you like.."}
      className={"border-none border-b-gray-400"}
    />
  );
};
