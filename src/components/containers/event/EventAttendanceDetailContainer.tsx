
import { Button } from "@/components/common/button/Button";
import { CommonLoading } from "@/components/common/CommonLoading";
import { useClaimedEventAttendances } from "@/hooks/useClaimEventAttendances";
import { removeCeramicPrefix } from "vess-sdk";
import Image from "next/image";
import { FC } from "react";
import dynamic from "next/dynamic";

const MainProfileCard = dynamic(
  () => import("@/components/Profile/MainProfileCard"),
  {
    ssr: false,
  }
);
type Props = {
    attendanceId?: string;
};

export const EventAttendanceDetailContainer:FC<Props> =({attendanceId}) => {
    const {eventAttendance, isInitialLoading} = useClaimedEventAttendances(attendanceId)

    const goToCerscan = () => {
        if(!eventAttendance) return
        window.open(`https://cerscan.com/mainnet/stream/${removeCeramicPrefix(eventAttendance.ceramicId)}`, "_blank");
    }

    return (
        <main className="text-center">
            <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto pt-20 sm:pt-32 px-4">
                {isInitialLoading ? (
                    <CommonLoading />
                ): (
                    <>
                        {!eventAttendance ? (
                            <p className="text-3xl">No Event Attendance</p>
                        ): (
                            <>
                                <div className={"rounded-full w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] bg-light-surface dark:bg-dark-surface mx-auto"}>
                                    {eventAttendance.credentialSubject.eventIcon ? (
                                        <img src={eventAttendance.credentialSubject.eventIcon} alt={eventAttendance.credentialSubject.eventName} className="w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] object-cover"/>
                                    ): (
                                        <div className="relative">
                                            <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center">
                                    <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-3xl font-bold">
                                        {eventAttendance.credentialSubject.eventName} 
                                    </div>  
                                </div>
                                <div className="py-10 w-full flex items-center justify-center">
                                    <MainProfileCard did={eventAttendance.credentialSubject.id} showNav={false}/>
                                </div>
                                <div className="py-6 flex items-center justify-center">
                                    <Button
                                        text={"See Credentail Detail"}
                                        color={"secondary"}
                                        onClick={() => goToCerscan()}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
                
            </div>
        </main>
    )
}