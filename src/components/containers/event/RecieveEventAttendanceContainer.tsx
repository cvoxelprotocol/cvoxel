import { Button } from "@/components/common/button/Button";
import { DIDContext } from "@/context/DIDContext";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import Image from "next/image";
import { FC, useContext, useMemo } from "react";
import { shortenStr } from "@/utils/objectUtil";
import AccountButton from "@/components/common/button/AccountButton";
import { useHeldEventAttendances } from "@/hooks/useHeldEventAttendances";
import Router from "next/router";


// const EVENT_1025_CRYPTOBASE = "kjzl6cwe1jw148tidx4xe1cxh9vtwo1tn9cfbt0i6t38i7703yo8z107gfjnfpo"
// const EVENT_1025_SUPERLOCAL = "ceramic://kjzl6cwe1jw148904dvpnhwxhu3nps59702ufd4tpz9v6l0mfphgqn1df24op09"

type Props = {
    eventId?: string;
};

export const RecieveEventAttendanceContainer:FC<Props> =({eventId}) => {
    const {eventDetail} = useEventAttendance(eventId)
    const {did} = useContext(DIDContext)
    const {claimEventAttendance} = useEventAttendance()
    const {HeldEventAttendances,setHeldEventAttendances } = useHeldEventAttendances(did)
    

    const handleClickAttendance = async () => {
        if(!did || !eventDetail) return
        const vcs = await claimEventAttendance(eventDetail, [did])
        if(vcs && vcs.length>0) {
            setHeldEventAttendances(vcs)
        } else {
            console.log("Error: No vcs")
        }
    }

    const isClaimable = useMemo(() => {
        if(!did || !eventDetail) return false
        return !HeldEventAttendances?.some(a => a.credentialSubject.eventId === eventDetail.ceramicId )
    },[HeldEventAttendances,did])

    const goToMyPage = () => {
        if(!did) return
        Router.push(`/event/held/${did}`)
    }


    if(!eventDetail) {
        return (
            <main className="text-center">
                <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto pt-24 px-4">
                    <p className="text-3xl">No Event</p>
                </div>
            </main>
        )
    }


    return (
        <main className="text-center">
            <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto pt-20 sm:pt-32 px-4">
                <div className="w-full text-center pb-4">
                    <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl sm:text-4xl font-bold">
                    {eventDetail.name} 
                    </div>  
                </div>
                <div className={"rounded-full w-[280px] h-[280px] sm:w-[280px] sm:h-[280px] bg-light-surface dark:bg-dark-surface mx-auto"}>
                    {eventDetail.icon ? (
                        <img src={eventDetail.icon} alt={eventDetail.name} className="w-[280px] h-[280px] sm:w-[280px] sm:h-[280px] object-cover"/>
                    ): (
                        <div className="relative">
                            <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                        </div>
                    )}
                </div>
                <div className="py-8 flex items-center justify-center">
                    {!did ? (
                        <AccountButton />
                    ): (
                        <>
                        {isClaimable ? (
                            <Button
                                text={"Claim Event Attendance"}
                                color={"secondary"}
                                onClick={() => handleClickAttendance()}
                            />
                        ): (
                            <div className="w-full flex-none space-y-1">
                                <div>
                                    <Button
                                        text={"Already Claimed"}
                                        disabled
                                        color="gray"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={() => goToMyPage()}
                                        className="text-light-on-surface-variant dark:text-dark-on-surface-variant underline"
                                        >
                                        go to my page
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        </>
                    )}
                </div>
                <div className="py-2 px-4 w-full text-left">
                    <div className="text-light-on-surface dark:text-dark-on-surface font-medium text-sm sm:text-base">
                        {eventDetail.desc}
                    </div>
                    <div className="py-2 cursor-pointer">
                        {eventDetail.url && (
                            <a
                                className="flex items-center flex-wrap"
                                href={`${eventDetail.url}`}
                                target="_blank"
                                rel="noreferrer"
                                >
                                <p className="text-light-secondary dark:text-dark-secondary text-sm sm:text-base">
                                    {shortenStr(eventDetail.url, 30)}
                                </p>
                            </a>
                        )}
                    </div>
                </div>
                
            </div>
        </main>
    )
}