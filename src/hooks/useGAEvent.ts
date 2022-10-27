import { useCallback } from "react";
import { analytics } from "@/lib/firebase/app";
import { logEvent } from "firebase/analytics";

export const useGAEvent = () => {
  const putEvent = useCallback(
    (eventName: Gtag.EventNames, params: Gtag.EventParams) => {
      if (!window) return;
      window.gtag("event", eventName, params);
    },
    []
  );

  const putFBLogEvent = useCallback(
    (eventName: string, params: Gtag.EventParams) => {
      if (!analytics) return;
      logEvent<typeof eventName>(analytics, eventName, params);
    },
    []
  );

  const connectEvent = (did: string) => {
    putEvent("connect_did", { did: did, content_id: did });
    putFBLogEvent("connect_did", { did: did, content_id: did });
  };
  const disConnectEvent = (did: string) => {
    putEvent("disconnect_did", { did: did, content_id: did });
    putFBLogEvent("disconnect_did", { did: did, content_id: did });
  };

  const selectDetailBoxEvent = (id?: string) => {
    putEvent("select_item", { content_id: id });
  };

  const connectDeworkEvent = (did: string) => {
    putEvent("begin_connect_dework", { did: did, content_id: did });
  };
  const fetchDeworkTaskEvent = (did: string) => {
    putEvent("begin_fetch_dework_tasks", { did: did, content_id: did });
  };

  const issueCRDLEvent = (did?: string) => {
    putEvent("begin_issue_credential", { content_id: did, did: did });
  };

  const issuingCRDLEvent = (did?: string) => {
    putEvent("progress_issue_credential", { content_id: did, did: did });
  };

  const issuedCRDLEvent = (did?: string) => {
    putEvent("complete_issue_credential", { content_id: did, did: did });
  };

  return {
    connectEvent,
    disConnectEvent,
    selectDetailBoxEvent,
    connectDeworkEvent,
    fetchDeworkTaskEvent,
    issueCRDLEvent,
    issuingCRDLEvent,
    issuedCRDLEvent,
  };
};
