import { FC } from "react";
import { Search, SearchProps } from "@/components/common/search/Search";
import { NamePlate } from "@/components/common/NamePlate";
import CloseIcon from "@/components/common/search/close.svg";
import clsx from "clsx";

type Props = {
  did: string;
  onClearUser: () => void;
  className?: string;
  size?: "lg" | "md";
} & SearchProps;

export const UserSearch: FC<Props> = ({
  did,
  onClearUser,
  onSubmit,
  placeholder,
  onClear,
  className,
  size = "lg",
}) => {
  return (
    <>
      {!!did ? (
        <div className={clsx("flex space-x-3 w-fit", className)}>
          <div className="w-fit">
            <NamePlate did={did} withSearchIcon size={size} />
          </div>
          <button onClick={onClearUser}>
            <div className="bg-light-surface-variant dark:bg-dark-surface-variant p-3 rounded-full">
              <CloseIcon />
            </div>
          </button>
        </div>
      ) : (
        <Search
          onSubmit={onSubmit}
          placeholder={placeholder}
          onClear={onClear}
        />
      )}
    </>
  );
};
