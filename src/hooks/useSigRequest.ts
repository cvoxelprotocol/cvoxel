import { useMemo } from "react";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { WorkCredentialWithId } from "vess-sdk";
import { useQuery } from "@tanstack/react-query";
import { getSigRequestList } from "@/lib/firebase/store/meta";

export function useSigRequest() {
  const { account, did } = useDIDAccount();

  const {
    data: sigRequests,
    isLoading: isLoading,
    refetch: updateMetaList,
  } = useQuery<WorkCredentialWithId[]>(
    ["getSigRequestList", account],
    () => getSigRequestList(account?.toLowerCase()),
    {
      enabled: !!account,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const sigRequestList = useMemo(() => {
    if (!sigRequests) return [];
    return sigRequests.filter((s) => s.holderDid?.toLowerCase() !== did);
  }, [sigRequests, did]);

  return { sigRequestList, updateMetaList, isLoading };
}
