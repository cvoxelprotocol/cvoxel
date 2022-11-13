import { CERAMIC_NETWORK } from "@/constants/common";
import { useQuery } from "react-query";
import { EventAttendanceWithId } from "vess-sdk";
import { getVESS } from "vess-sdk";

export const useClaimedEventAttendances = (attendanceId?: string) => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");

  const { data: eventAttendance, isLoading } = useQuery<
    EventAttendanceWithId | undefined
  >(
    ["EventAttendance", attendanceId],
    () => vess.getEventAttendance(attendanceId),
    {
      enabled: !!attendanceId,
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  return {
    eventAttendance,
    isLoading,
  };
};
