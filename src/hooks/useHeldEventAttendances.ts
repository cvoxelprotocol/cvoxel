import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EventAttendanceWithId } from "@/interfaces";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";
import { getHeldEventAttendanceFromDB } from "@/lib/firebase/store/event";
import { useToast } from "./useToast";
import { useModal } from "./useModal";
import {
  EVENT_ATTENDANCE_HELD_FAILED,
  EVENT_ATTENDANCE_HELD_SUCCEED,
} from "@/constants/toastMessage";

export const useHeldEventAttendances = (did?: string, eventId?: string) => {
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();
  const { did: myDid } = useContext(DIDContext);
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();

  const { mutateAsync: setHeldEventAttendances } = useMutation<
    void,
    unknown,
    string[]
  >(
    (param) =>
      workCredentialService.setHeldEventAttendanceVerifiableCredentials(param),
    {
      onMutate() {
        showLoading();
      },
      onSuccess() {
        closeLoading();
        lancInfo(EVENT_ATTENDANCE_HELD_SUCCEED);
      },
      onError(error) {
        console.log("error", error);
        closeLoading();
        lancError(EVENT_ATTENDANCE_HELD_FAILED);
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
      enabled: !!did && did !== "",
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
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );
  return {
    HeldEventAttendances,
    isFetchingHeldEventAttendances,
    setHeldEventAttendances,
  };
};
