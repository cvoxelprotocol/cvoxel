import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EventAttendanceWithId } from "@/interfaces";
import { useContext, useEffect } from "react";
import { DIDContext } from "@/context/DIDContext";
import { getHeldEventAttendanceFromDB } from "@/lib/firebase/store/event";

export const useHeldEventAttendances = (did?: string) => {
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();
  const { did: myDid } = useContext(DIDContext);

  const { mutateAsync: setHeldEventAttendances } = useMutation<
    void,
    unknown,
    string[]
  >(
    (param) =>
      workCredentialService.setHeldEventAttendanceVerifiableCredentials(param),
    {
      onSuccess() {
        console.log("event attendance mirgate succeeded");
      },
      onError(error) {
        console.log("error", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("HeldEventAttendances");
      },
    }
  );

  const {
    data: HeldEventAttendances,
    isLoading: isFetchingHeldEventAttendances,
  } = useQuery<EventAttendanceWithId[] | null>(
    ["HeldEventAttendances", did],
    () =>
      workCredentialService.fetchHeldEventAttendanceVerifiableCredentials(did),
    {
      enabled: !!did,
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const { data: HeldEventAttendancesFromDB } = useQuery<
    EventAttendanceWithId[] | null
  >(
    ["HeldEventAttendancesFromDB", did],
    () => getHeldEventAttendanceFromDB(did),
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
        const existedSubjects = HeldEventAttendances?.map((s) => s.ceramicId);
        const targetIds = HeldEventAttendancesFromDB?.map(
          (m) => m.ceramicId
        ).filter((id) => !existedSubjects?.includes(id));
        if (targetIds) {
          console.log("event attendance migrates started");
          await setHeldEventAttendances(targetIds);
          console.log("event attendance migrates done");
        }
      }
    }
    if (myDid && myDid === did) {
      migrate();
    }
  }, [HeldEventAttendances, HeldEventAttendancesFromDB, myDid, did]);

  const shouldStartToDataMigrationOnCeramic = () => {
    if (!HeldEventAttendancesFromDB || HeldEventAttendancesFromDB.length === 0)
      return false;
    if (!HeldEventAttendances) return false;
    return HeldEventAttendancesFromDB.length > HeldEventAttendances.length;
  };

  return {
    HeldEventAttendances,
    isFetchingHeldEventAttendances,
  };
};
