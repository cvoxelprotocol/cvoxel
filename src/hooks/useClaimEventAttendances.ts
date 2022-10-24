import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useQuery, useQueryClient } from "react-query";
import { EventAttendanceWithId } from "@/interfaces";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";

export const useClaimedEventAttendances = (attendanceId?: string) => {
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();
  const { did } = useContext(DIDContext);

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
