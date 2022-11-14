import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MembershipSubjectWithId } from "vess-sdk";
import { useEffect } from "react";
import { getHeldMembershipSubjectsFromDB } from "@/lib/firebase/store/workspace";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";

export const useHeldMembershipSubject = (did?: string) => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { did: myDid } = useDIDAccount();

  const { mutateAsync: setHeldMembershipSubjects } = useMutation<
    void,
    unknown,
    string[]
  >((param) => vess.setHeldMembershipSubjects(param), {
    onSuccess() {
      console.log("mirgate succeeded");
    },
    onError(error) {
      console.log("error", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["HeldMembershipSubjects"]);
    },
  });

  const {
    data: HeldMembershipSubjects,
    isLoading: isFetchingHeldMembershipSubjects,
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
    isLoading: isLoadingHeldSubjectsFromDB,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["heldMembershipSubjectsFromDB", did],
    () => getHeldMembershipSubjectsFromDB(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  // set held data from DB
  useEffect(() => {
    async function migrate() {
      if (shouldStartToDataMigrationOnCeramic()) {
        const existedSubjects = HeldMembershipSubjects?.map((s) => s.ceramicId);
        const targetIds = heldMembershipSubjectsFromDB
          ?.map((m) => m.ceramicId)
          .filter((id) => !existedSubjects?.includes(id));
        if (targetIds) {
          await setHeldMembershipSubjects(targetIds);
        }
      }
    }
    if (myDid && myDid === did) {
      migrate();
    }
  }, [HeldMembershipSubjects, heldMembershipSubjectsFromDB, myDid, did]);

  const shouldStartToDataMigrationOnCeramic = () => {
    if (
      !heldMembershipSubjectsFromDB ||
      heldMembershipSubjectsFromDB.length === 0
    )
      return false;
    if (!HeldMembershipSubjects) return false;
    return heldMembershipSubjectsFromDB.length > HeldMembershipSubjects.length;
  };

  return {
    heldMembershipSubjectsFromDB,
    HeldMembershipSubjects,
    isFetchingHeldMembershipSubjects,
    isLoadingHeldSubjectsFromDB,
  };
};
