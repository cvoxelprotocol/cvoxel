import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useQuery } from "react-query";
import { EventAttendanceWithId } from "@/interfaces";

export const useClaimedEventAttendances = (attendanceId?: string) => {
  const workCredentialService = getWorkCredentialService();

  const { data: eventAttendance, isLoading } = useQuery<
    EventAttendanceWithId | undefined
  >(
    ["EventAttendance", attendanceId],
    () => workCredentialService.fetchEventAttendance(attendanceId),
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
