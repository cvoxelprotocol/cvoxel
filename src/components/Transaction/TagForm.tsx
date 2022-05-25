import {
  colourStyles,
  getTagOption,
  TagOption,
  TagOptions,
} from "@/constants/tags";
import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

type TagFormProps = {
  handleTags: (tags: string[]) => void;
  tags?: string[];
};

export const TagForm: FC<TagFormProps> = ({ handleTags, tags }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleChange = (
    newValue: OnChangeValue<TagOption, true>,
    actionMeta: ActionMeta<TagOption>
  ) => {
    handleTags(newValue.map((item) => item.value));
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    document.removeEventListener("click", handleClose);
  }, []);

  const handleOpen = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (!open) {
        setOpen(true);
        document.addEventListener("click", handleClose);
        event.stopPropagation();
      }
    },
    [open, handleClose]
  );

  const defaultVal = useMemo(() => {
    return !tags ? undefined : tags.map((v) => getTagOption(v));
  }, [tags]);

  const addButton = useMemo(
    () => (
      <button
        className={
          "w-fit h-fit p-1.5 rounded-full bg-gray-300 my-2 hover:bg-primary text-gray-800 hover:text-white"
        }
        onClick={handleOpen}
      >
        <FontAwesomeIcon className="w-4 h-4" icon={faPlus} />
      </button>
    ),
    [handleOpen]
  );

  return (
    <div>
      <CreatableSelect
        isMulti
        defaultValue={defaultVal}
        onChange={handleChange}
        options={TagOptions}
        styles={colourStyles}
        className={"border-none border-b-gray-400"}
        menuIsOpen={open}
        components={{ Input: () => addButton }}
      />
    </div>
  );
};
