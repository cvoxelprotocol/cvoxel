import { useQuery } from "@tanstack/react-query";
import { MembershipSubjectWithId } from "vess-sdk";
import { getHeldMembershipSubjectsFromDB } from "@/lib/firebase/store/workspace";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";

export const useHeldMembershipSubject = (did?: string) => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const { did: myDid } = useDIDAccount();

  const {
    data: HeldMembershipSubjects,
    isInitialLoading: isFetchingHeldMembershipSubjects,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["HeldMembershipSubjects", did],
    () => vess.getHeldMembershipSubjects(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const {
    data: heldMembershipSubjectsFromDB,
    isInitialLoading: isLoadingHeldSubjectsFromDB,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["heldMembershipSubjectsFromDB", myDid],
    () => getHeldMembershipSubjectsFromDB(myDid),
    {
      enabled: !!myDid && myDid !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  return {
    heldMembershipSubjectsFromDB,
    HeldMembershipSubjects,
    isFetchingHeldMembershipSubjects,
    isLoadingHeldSubjectsFromDB,
  };
};
