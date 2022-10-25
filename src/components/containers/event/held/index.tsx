import { FC } from "react";
import AttendanceIcon from "@/components/common/event/attendance-icon.svg"
import { MainProfileCard } from "@/components/Profile/MainProfileCard";
import { useHeldEventAttendances } from "@/hooks/useHeldEventAttendances";
import { EventAttendanceBadge } from "@/components/Event/EventAttendanceBadge";
import { removeCeramicPrefix } from "@/utils/workCredentialUtil";
import { EventAttendanceWithId } from "@/interfaces";
import { useRouter } from "next/router";

type HeldEventContainerProps = {
    did: string
}
export const HeldEventContainer: FC<HeldEventContainerProps> = ({did}) => {
  const {HeldEventAttendances} = useHeldEventAttendances(did)
  const router = useRouter()

  const goToAttendancePage = (item:EventAttendanceWithId) => {
    router.push(`/event/attendance/${removeCeramicPrefix(item.ceramicId)}`)
  }

  return (
    <main className="text-center">
      <div className="relative snap-start snap-always min-h-screen">
        <div className="flex flex-col items-center justify-center w-full h-screen md:pb-12">
            <div className="flex w-full items-center justify-center h-[300px] sm:h-[450px] relative max-w-[720px]">
                {!HeldEventAttendances || HeldEventAttendances.length===0 ? (
                <div className="w-full text-center flex flex-col items-center">
                    <AttendanceIcon />
                    <p className="py-2 font-bold text-xl">Your Event Attendance Credentials</p>
                </div>
                ): (
                <div className="w-full flex justify-center flex-wrap">
                    {HeldEventAttendances.map((item) => {
                        return (
                            <div className="cursor-pointer mx-3" key={item.ceramicId} onClick={() => goToAttendancePage(item)}>
                                <EventAttendanceBadge  item={item} />
                            </div>
                        )
                    })}
                </div>
                )}
            </div>
            {did && (
                <div className="flex-none mt-12 w-full max-w-[720px]">
                    <div className="w-fit mx-auto">
                        <MainProfileCard did={did} type="event"/>
                    </div>
                </div>    
            )}
            </div>
      </div>
    </main>
  );
};
