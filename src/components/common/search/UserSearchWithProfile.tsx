import { FC } from "react";
import { Search, SearchProps } from "@/components/common/search/Search";
import CloseIcon from "@/components/common/search/close.svg";
import clsx from "clsx";
import dynamic from "next/dynamic";

const MainProfileCard = dynamic(
  () => import("@/components/Profile/MainProfileCard"),
  {
    ssr: false,
  }
);

type Props = {
  did: string;
  onClearUser: () => void;
  className?: string;
  size?: "lg" | "md";
} & SearchProps;

export const UserSearchWithProfile: FC<Props> = ({
  did,
  onClearUser,
  onSubmit,
  placeholder,
  onClear,
  className,
}) => {
  return (
    <>
      {!!did ? (
        <div className={clsx("relative sm:flex space-x-3 w-fit", className)}>
          <div className="w-fit relative">
            <MainProfileCard did={did} />
          </div>
          <button onClick={onClearUser} className="absolute -right-1.5 -top-1.5">
            <div className="bg-light-surface-variant dark:bg-dark-surface-variant p-2 rounded-full">
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
