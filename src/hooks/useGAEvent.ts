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
    putEvent("login", { content_id: did });
    putFBLogEvent("login", { content_id: did });
  };

  return {
    connectEvent,
  };
};
