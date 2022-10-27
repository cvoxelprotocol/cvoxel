import { useStateCredentialDetailBox } from "@/recoilstate";
import { useCallback } from "react";
import { WorkCredentialWithId } from "@/interfaces";
import { useGAEvent } from "./useGAEvent";

export const useWorkCredentialDetailBox = () => {
  const [_, setBox] = useStateCredentialDetailBox();
  const { selectDetailBoxEvent } = useGAEvent();
  const showDetailBox = useCallback(
    ({
      item,
      offchainItems,
    }: {
      item: WorkCredentialWithId;
      offchainItems?: WorkCredentialWithId[];
    }) => {
      setBox({ item: item, offchainItems: offchainItems });
      selectDetailBoxEvent(item.backupId);
    },
    [setBox]
  );

  return { showDetailBox };
};
