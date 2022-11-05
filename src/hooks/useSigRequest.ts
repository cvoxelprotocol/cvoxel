import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";
import { WorkCredentialWithId } from "vess-sdk";
import { useQuery } from "react-query";
import { getSigRequestList } from "@/lib/firebase/store/meta";

export function useSigRequest() {
  const { account } = useContext(DIDContext);

  const {
    data: sigRequestList,
    isLoading: isLoading,
    refetch: updateMetaList,
  } = useQuery<WorkCredentialWithId[]>(
    ["getSigRequestList", account],
    () => getSigRequestList(account),
    {
      enabled: !!account,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  return { sigRequestList, updateMetaList, isLoading };
}
