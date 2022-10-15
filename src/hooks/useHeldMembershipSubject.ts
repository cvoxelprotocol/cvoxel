import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MembershipSubjectWithId } from "@/interfaces";
import { useEffect } from "react";
import { getHeldMembershipSubjectsFromDB } from "@/lib/firebase/store/workspace";
import { useSocialAccount } from "./useSocialAccount";

export const useHeldMembershipSubject = (did?: string) => {
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();
  const { orbisProfile } = useSocialAccount(did);

  const { mutateAsync: setHeldMembershipSubjects } = useMutation<
    void,
    unknown,
    string[]
  >((param) => workCredentialService.setHeldMembershipSubjects(param), {
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
    () => workCredentialService.fetchHeldMembershipSubjects(),
    {
      enabled: !!did,
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
      enabled: !!did,
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
    migrate();
  }, [HeldMembershipSubjects, heldMembershipSubjectsFromDB]);

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
    orbisProfile,
  };
};
