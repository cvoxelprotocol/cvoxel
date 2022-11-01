import { useQuery } from "react-query";
import { EventAttendanceWithId } from "@/interfaces";
import { getVESS } from "vess-sdk";

export const useClaimedEventAttendances = (attendanceId?: string) => {
  // const vess = getVESS()
  const vess = getVESS(true);

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
