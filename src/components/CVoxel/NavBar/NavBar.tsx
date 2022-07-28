import { FC } from "react";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";
import { Search, SearchData } from "@/components/common/search/Search";
import { SubmitHandler } from "react-hook-form";

type Props = {
  handleClickBackButton: () => void;
  currentVoxelID?: string;
  onSubmit: SubmitHandler<SearchData>;
  onClear?: () => void;
};

export const NavBar: FC<Props> = ({
  handleClickBackButton,
  currentVoxelID,
  onSubmit,
  onClear,
}) => {
  return (
    <div className="hidden sm:flex mx-6 h-20 space-x-3 items-center border border-x-0 border-t-0 border-b-light-outline dark:border-b-dark-outline">
      {!!currentVoxelID && (
        <button onClick={handleClickBackButton}>
          <LeftArrow className="text-light-on-surface-variant dark:text-dark-on-surface-variant " />
        </button>
      )}
      <div className="text-light-on-surface dark:text-dark-on-surface text-2xl font-medium">
        Voxels
      </div>
      {currentVoxelID == undefined && (
        <div className="hidden lg:block w-full">
          <Search
            onSubmit={onSubmit}
            onClear={onClear}
            placeholder="Search your voxels"
          />
        </div>
      )}
    </div>
  );
};
