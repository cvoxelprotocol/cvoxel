import { useStateCVoxelDetailBox } from "@/recoilstate";
import { useCallback } from "react";
import { CVoxelItem as ICVoxelItem, CVoxelMetaDraft } from "@/interfaces";

export const useCVoxelDetailBox = () => {
  const [_, setBox] = useStateCVoxelDetailBox();

  const showDetailBox = useCallback(
    ({
      item,
      offchainItems,
    }: {
      item: ICVoxelItem;
      offchainItems?: CVoxelMetaDraft[];
    }) => {
      setBox({ item: item, offchainItems: offchainItems });
    },
    [setBox]
  );

  return { showDetailBox };
};
