import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "./useToast";
import {
  EVENT_ATTENDANCE_CREATION_FAILED,
  EVENT_ATTENDANCE_CREATION_SUCCEED,
  EVENT_CREATION_FAILED,
  EVENT_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { useModal } from "./useModal";
import {
  useStateIssueEventAttendanceFromProxyModal,
  useStateIssueEventAttendanceModal,
  useStateIssueEventModal,
} from "@/recoilstate";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";
import {
  EventAttendanceWithId,
  EventWithId,
  CustomResponse,
  Event,
  EventAttendance,
  getVESS,
  issueEventAttendancesParam,
} from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";

type issueEventAttendanceFromProxyProps = {
  param: issueEventAttendancesParam;
  isBackground: boolean;
};

export const useEventAttendance = (eventId?: string) => {
  const { did } = useContext(DIDContext);
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();
  const [showEventModal, setShowEventModal] = useStateIssueEventModal();
  const [showEventAttendanceModal, setShowEventAttendanceModal] =
    useStateIssueEventAttendanceModal();
  const [
    showEventAttendanceFromProxyModal,
    setShowEventAttendanceFromProxyModal,
  ] = useStateIssueEventAttendanceFromProxyModal();

  const { mutateAsync: issueEvent, isLoading: isIssuingEvent } = useMutation<
    CustomResponse<{ streamId: string | undefined }>,
    unknown,
    Event
  >((param) => vess.createEvent(param), {
    onMutate() {
      showLoading();
    },
    onSuccess(data) {
      if (data) {
        closeLoading();
        lancInfo(EVENT_CREATION_SUCCEED);
      } else {
        closeLoading();
        lancError(EVENT_CREATION_FAILED);
      }
    },
    onError(error) {
      console.log("error", error);
      closeLoading();
      lancError(EVENT_CREATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries("issuedEvent");
    },
  });

  const { data: issuedEvent, isLoading } = useQuery<EventWithId[] | null>(
    ["issuedEvent", did],
    () => vess.getIssuedEvents(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const {
    mutateAsync: issueEventAttendanceCredential,
    isLoading: isCreatingSubject,
  } = useMutation<
    CustomResponse<{ streamId: string | undefined }>,
    unknown,
    EventAttendance
  >((param) => vess.issueEventAttendanceCredential(param), {
    onMutate() {
      showLoading();
    },
    onSuccess(data) {
      if (data) {
        closeLoading();
        lancInfo(EVENT_ATTENDANCE_CREATION_SUCCEED);
      } else {
        closeLoading();
        lancError(EVENT_ATTENDANCE_CREATION_FAILED);
      }
    },
    onError(error) {
      console.log("error", error);
      closeLoading();
      lancError(EVENT_ATTENDANCE_CREATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries(
        "IssuedEventAttendanceVerifiableCredentials"
      );
    },
  });

  const {
    data: IssuedEventAttendanceVerifiableCredentials,
    isLoading: isLoadingIssuedEventAttendance,
  } = useQuery<EventAttendanceWithId[] | null>(
    ["IssuedEventAttendanceVerifiableCredentials", did],
    () => vess.getIssuedEventAttendanceVerifiableCredentials(),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const {
    data: HeldEventAttendanceVerifiableCredentials,
    isLoading: isFetchingHeldMembershipSubjects,
  } = useQuery<EventAttendanceWithId[] | null>(
    ["HeldEventAttendanceVerifiableCredentials", did],
    () => vess.getHeldEventAttendanceVerifiableCredentials(),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const issueEventAttendance = async (event: EventWithId, did: string) => {
    const content: EventAttendance = {
      id: did,
      eventId: event.ceramicId,
      eventName: event.name,
      eventIcon: event.icon,
    };

    console.log({ content });

    //issue
    const res = await issueEventAttendanceCredential(content);
    console.log({ res });

    return res;
  };

  const {
    mutateAsync: issueEventAttendanceFromProxy,
    isLoading: isIssuingFromProxy,
  } = useMutation<
    { [x: string]: string | string[] },
    unknown,
    issueEventAttendanceFromProxyProps
  >((param) => vess.issueEventAttendancesFromProxy(param.param), {
    onMutate() {
      showLoading();
    },
    onSuccess(data, param) {
      if (data.vcs) {
        closeLoading();
        if (!param.isBackground) {
          lancInfo(EVENT_ATTENDANCE_CREATION_SUCCEED);
        }
      } else {
        closeLoading();
        if (!param.isBackground) {
          lancError(EVENT_ATTENDANCE_CREATION_FAILED);
        }
      }
    },
    onError(error) {
      console.log("error", error);
      closeLoading();
      lancError(EVENT_ATTENDANCE_CREATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries(
        "IssuedEventAttendanceVerifiableCredentials"
      );
    },
  });

  const issueFromProxy = async (event: EventWithId, dids: string[]) => {
    const param: issueEventAttendancesParam = {
      event,
      dids,
    };
    const paramForProxy: issueEventAttendanceFromProxyProps = {
      param,
      isBackground: false,
    };

    //issue
    return await issueEventAttendanceFromProxy(paramForProxy);
  };

  const claimEventAttendance = async (
    event: EventWithId,
    dids: string[]
  ): Promise<string[] | null> => {
    const param: issueEventAttendancesParam = {
      event,
      dids,
    };

    const paramForProxy: issueEventAttendanceFromProxyProps = {
      param,
      isBackground: true,
    };

    //issue
    const res = await issueEventAttendanceFromProxy(paramForProxy);
    return res.vcs as string[];
  };

  const { data: eventDetail, isLoading: isLoadingEventDetail } = useQuery<
    EventWithId | undefined
  >(["eventDetail", eventId], () => vess.getEvent(eventId), {
    enabled: !!eventId,
    staleTime: Infinity,
    cacheTime: 30000,
  });

  return {
    IssuedEventAttendanceVerifiableCredentials,
    isLoading,
    issueEventAttendance,
    isCreatingSubject,
    setShowEventModal,
    showEventModal,
    issueEvent,
    issuedEvent,
    HeldEventAttendanceVerifiableCredentials,
    isFetchingHeldMembershipSubjects,
    eventDetail,
    isLoadingEventDetail,
    showEventAttendanceModal,
    setShowEventAttendanceModal,
    issueFromProxy,
    setShowEventAttendanceFromProxyModal,
    showEventAttendanceFromProxyModal,
    claimEventAttendance,
  };
};
