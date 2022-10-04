import { useStateCredentialDetailBox } from "@/recoilstate";
import { useCallback } from "react";
import { WorkCredentialWithId } from "@/interfaces";

export const useWorkCredentialDetailBox = () => {
  const [_, setBox] = useStateCredentialDetailBox();

  const showDetailBox = useCallback(
    ({
      item,
      offchainItems,
    }: {
      item: WorkCredentialWithId;
      offchainItems?: WorkCredentialWithId[];
    }) => {
      setBox({ item: item, offchainItems: offchainItems });
    },
    [setBox]
  );

  return { showDetailBox };
};
