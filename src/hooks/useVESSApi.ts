import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useToast } from "./useToast";
import {
  EVENT_ATTENDANCE_CREATION_SUCCEED,
  EVENT_ATTENDANCE_CREATION_FAILED,
} from "@/constants/toastMessage";
import { issueEventAttendance } from "@/lib/kms";
import { useModal } from "./useModal";
import { IssueEventAttendanceWithKMSType } from "@/interfaces/backend";
import { useHeldEventAttendances } from "@/hooks/useHeldEventAttendances";
import { EventAttendanceWithId } from "vess-sdk";

export type IssueEventAttendanceParam = {
  ceramicId: string;
  body: IssueEventAttendanceWithKMSType;
};

export const useVESSApi = (did?: string) => {
  const { showLoading, closeLoading } = useModal();
  const { lancInfo, lancError } = useToast();
  const router = useRouter();
  const { setHeldEventAttendances } = useHeldEventAttendances(did);

  const { mutateAsync: recieveEventAttendances } = useMutation<
    EventAttendanceWithId[],
    unknown,
    IssueEventAttendanceParam
  >((param) => issueEventAttendance(param.ceramicId, param.body), {
    onMutate() {
      showLoading();
    },
    onSuccess(res) {
      if (res.length > 0) {
        setHeldEventAttendances(res.map((r) => r.ceramicId));
        closeLoading();
        lancInfo(EVENT_ATTENDANCE_CREATION_SUCCEED);
      } else {
        closeLoading();
        lancError(EVENT_ATTENDANCE_CREATION_FAILED);
      }
    },
    onError(error) {
      console.error("error", error);
      closeLoading();
      lancError(EVENT_ATTENDANCE_CREATION_FAILED);
    },
  });

  return {
    recieveEventAttendances,
  };
};
