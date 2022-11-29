import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventAttendanceWithId } from "vess-sdk";
import { getHeldEventAttendanceFromDB } from "@/lib/firebase/store/event";
import { useToast } from "./useToast";
import { useModal } from "./useModal";
import {
  EVENT_ATTENDANCE_HELD_FAILED,
  EVENT_ATTENDANCE_HELD_SUCCEED,
} from "@/constants/toastMessage";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useEffect } from "react";
import { useStateIssuingFromDBLoading } from "@/recoilstate";
import { useRouter } from "next/router";

export const useHeldEventAttendances = (did?: string) => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();
  const { did: myDid, originalAddress } = useDIDAccount();
  const [isMigratingFromDB, setMigratingFromDB] =
    useStateIssuingFromDBLoading();
  const router = useRouter();

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

  const { mutateAsync: setHeldEventAttendancesSilently } = useMutation<
    void,
    unknown,
    string[]
  >((param) => vess.setHeldEventAttendanceVerifiableCredentials(param), {
    onSuccess() {
      closeLoading();
    },
    onError(error) {
      console.log("error", error);
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

  const {
    data: heldEventAttendanceFromDB,
    isInitialLoading: isLoadingHeldEventsFromDB,
  } = useQuery<EventAttendanceWithId[]>(
    ["heldEventAttendanceFromDB", myDid],
    () => getHeldEventAttendanceFromDB(myDid),
    {
      enabled: !!myDid && myDid !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const migrateHeldEvent = async (): Promise<void> => {
    console.log("migrateHeldEvent: check");
    if (myDid !== did || !originalAddress) return;
    if (HeldEventAttendances && HeldEventAttendances.length > 0) return;
    const oldDid = `did:pkh:eip155:1:${originalAddress}`;
    const oldCRDLs =
      await vess.getHeldEventAttendanceVerifiableCredentialStreamIds(oldDid);
    if (oldCRDLs.length > 0) {
      showLoading();
      console.log("migrateHeldEvent: execute");
      await vess.setHeldEventAttendanceVerifiableCredentials(oldCRDLs);
      closeLoading();
      queryClient.invalidateQueries(["HeldEventAttendances"]);
      console.log("migrateHeldEvent: end");
    }
  };
  // set held data from DB
  useEffect(() => {
    async function migrate() {
      if (shouldStartToDataMigrationOnCeramic()) {
        console.log("event issuing from DB start");
        setMigratingFromDB(true);
        const existedSubjects = HeldEventAttendances?.map((s) => s.ceramicId);
        const targetIds = heldEventAttendanceFromDB
          ?.map((m) => m.ceramicId)
          .filter((id) => !existedSubjects?.includes(id));
        if (targetIds) {
          await setHeldEventAttendancesSilently(targetIds);
        }
        setMigratingFromDB(false);
      }
    }
    if (myDid && myDid === did) {
      migrate();
    }
  }, [HeldEventAttendances, heldEventAttendanceFromDB, myDid, did]);

  const shouldStartToDataMigrationOnCeramic = () => {
    if (isMigratingFromDB) return false;
    if (!router.pathname.startsWith("/event/held/")) return false;
    if (!heldEventAttendanceFromDB || heldEventAttendanceFromDB.length === 0)
      return false;
    if (!HeldEventAttendances) return false;
    return heldEventAttendanceFromDB.length > HeldEventAttendances.length;
  };

  return {
    migrateHeldEvent,
    HeldEventAttendances,
    isFetchingHeldEventAttendances,
    setHeldEventAttendances,
  };
};
