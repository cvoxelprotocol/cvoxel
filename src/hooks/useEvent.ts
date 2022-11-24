import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import {
  EVENT_CREATION_FAILED,
  EVENT_CREATION_SUCCEED,
  EVENT_UPDATE_FAILED,
  EVENT_UPDATE_SUCCEED,
} from "@/constants/toastMessage";
import { useModal } from "./useModal";
import { useStateIssueEventModal } from "@/recoilstate";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import {
  EventWithId,
  CustomResponse,
  Event,
  getVESS,
  BaseResponse,
} from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";
import { useMemo } from "react";

export const useEvent = (orgId?: string) => {
  const { did } = useDIDAccount();
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();
  const [showEventModal, setShowEventModal] = useStateIssueEventModal();

  const { mutateAsync: issueEvent } = useMutation<
    CustomResponse<{ streamId: string | undefined }>,
    unknown,
    Event
  >((param) => vess.createEvent(param), {
    onMutate() {
      showLoading();
    },
    onSuccess(data) {
      if (data.streamId) {
        closeLoading();
        lancInfo(EVENT_CREATION_SUCCEED);
      } else {
        closeLoading();
        lancError(`${EVENT_CREATION_FAILED}: ${data.error}`);
      }
    },
    onError(error) {
      console.log("error", error);
      closeLoading();
      lancError(EVENT_CREATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["issuedEvent"]);
    },
  });

  const { mutateAsync: editEvent } = useMutation<
    BaseResponse,
    unknown,
    { id: string; event: Event }
  >((param) => vess.updateEvent(param.id, param.event), {
    onMutate() {
      showLoading();
    },
    onSuccess(data) {
      if (data.status === 200) {
        closeLoading();
        lancInfo(EVENT_UPDATE_SUCCEED);
      } else {
        closeLoading();
        lancError(`${EVENT_UPDATE_FAILED}: ${data.error}`);
      }
    },
    onError(error) {
      console.log("error", error);
      closeLoading();
      lancError(EVENT_CREATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["issuedEvent"]);
      queryClient.invalidateQueries(["eventDetail"]);
    },
  });

  const { data: issuedEvent, isInitialLoading } = useQuery<
    EventWithId[] | null
  >(["issuedEvent", did], () => vess.getIssuedEvents(did), {
    enabled: !!did && did !== "",
    staleTime: Infinity,
    cacheTime: 300000,
  });

  const issuedEventByOrg = useMemo(() => {
    if (!issuedEvent) return [];
    if (!orgId) return issuedEvent;
    return issuedEvent.filter((e) => e.organizationId === orgId);
  }, [issuedEvent, orgId]);

  return {
    isInitialLoading,
    setShowEventModal,
    showEventModal,
    issueEvent,
    issuedEventByOrg,
    editEvent,
  };
};
