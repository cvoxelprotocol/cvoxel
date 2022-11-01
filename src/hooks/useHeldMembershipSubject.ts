import { useMutation, useQuery, useQueryClient } from "react-query";
import { MembershipSubjectWithId } from "@/interfaces";
import { useContext, useEffect } from "react";
import { getHeldMembershipSubjectsFromDB } from "@/lib/firebase/store/workspace";
import { DIDContext } from "@/context/DIDContext";
import { getVESS } from "vess-sdk";

export const useHeldMembershipSubject = (did?: string) => {
  // const vess = getVESS()
  const vess = getVESS(true);
  const queryClient = useQueryClient();
  const { did: myDid } = useContext(DIDContext);

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
      queryClient.invalidateQueries("HeldMembershipSubjects");
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
      cacheTime: 30000,
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
      cacheTime: 30000,
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
