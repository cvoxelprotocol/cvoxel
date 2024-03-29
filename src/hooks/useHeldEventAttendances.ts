import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventAttendanceWithId } from "vess-sdk";
import { useToast } from "./useToast";
import { useModal } from "./useModal";
import {
  EVENT_ATTENDANCE_HELD_FAILED,
  EVENT_ATTENDANCE_HELD_SUCCEED,
} from "@/constants/toastMessage";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";

export const useHeldEventAttendances = (did?: string) => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();

  const { mutateAsync: setHeldEventAttendances } = useMutation<
    void,
    unknown,
    string[]
  >((param) => vess.setHeldEventAttendanceVerifiableCredentials(param), {
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
      queryClient.invalidateQueries(["HeldEventAttendances"]);
    },
  });

  const {
    data: HeldEventAttendances,
    isInitialLoading: isFetchingHeldEventAttendances,
  } = useQuery<EventAttendanceWithId[] | null>(
    ["HeldEventAttendances", did],
    () => vess.getHeldEventAttendanceVerifiableCredentials(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  return {
    HeldEventAttendances,
    isFetchingHeldEventAttendances,
    setHeldEventAttendances,
  };
};
