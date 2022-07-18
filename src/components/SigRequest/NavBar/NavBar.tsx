import { FC } from "react";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";

type Props = {
  handleClickBackButton: () => void;
  currentTxHash?: string;
};

export const NavBar: FC<Props> = ({ handleClickBackButton, currentTxHash }) => {
  return (
    <div className="hidden sm:flex mx-6 h-20 space-x-3 items-center border border-x-0 border-t-0 border-b-light-outline dark:border-b-dark-outline">
      {!!currentTxHash && (
        <button onClick={handleClickBackButton}>
          <LeftArrow className="text-light-on-surface-variant dark:text-dark-on-surface-variant " />
        </button>
      )}
      <div className="text-light-on-surface dark:text-dark-on-surface text-3xl font-medium">
        Notifications
      </div>
    </div>
  );
};
