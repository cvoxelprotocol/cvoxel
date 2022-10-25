import { Button } from "@/components/common/button/Button";
import { EventAttendanceItem } from "@/components/workspace/EventAttendanceItem";
import { IssueEventAttendanceCard } from "@/components/workspace/IssueEventAttendanceCard";
import { IssueEventAttendanceFromProxyCard } from "@/components/workspace/IssueEventAttendanceFromProxyCard";
import { WorkspaceModal } from "@/components/workspace/WorkspaceModal";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import { EventAttendanceWithId } from "@/interfaces";
import { verifyEventAttendanceCredential } from "@/utils/providerUtils";
import { removeCeramicPrefix } from "@/utils/workCredentialUtil";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo } from "react";

const PROXY_WORKSPACE = "ceramic://kjzl6cwe1jw148904dvpnhwxhu3nps59702ufd4tpz9v6l0mfphgqn1df24op09"

type Props = {
    eventId?: string;
};

export const EventDetailContainer:FC<Props> =({eventId}) => {
    const {eventDetail, showEventAttendanceModal, setShowEventAttendanceModal,showEventAttendanceFromProxyModal,setShowEventAttendanceFromProxyModal,IssuedEventAttendanceVerifiableCredentials} = useEventAttendance(eventId)

    const eventAttendances = useMemo(() => {
        if(!IssuedEventAttendanceVerifiableCredentials || IssuedEventAttendanceVerifiableCredentials.length ===0) return []
        return IssuedEventAttendanceVerifiableCredentials.filter(crdl => crdl.credentialSubject.eventId===eventId)
    },[eventId, IssuedEventAttendanceVerifiableCredentials])

    const handleClickAttendance = async (item: EventAttendanceWithId) => {
        const res = await verifyEventAttendanceCredential(item)
        console.log({item})
        console.log({res})
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
            <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto pt-24 px-4">
                <div className="sm:flex items-center justify-between space-x-4">
                    <div className="grid grid-cols-6 items-center">
                        <div className={"col-span-1 rounded-r-lg w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] bg-light-surface dark:bg-dark-surface"}>
                            {eventDetail.icon ? (
                                <img src={eventDetail.icon} alt={eventDetail.name} className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] object-cover"/>
                            ): (
                                <div className="relative">
                                    <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                                </div>
                            )}
                        </div>
                        <div className="col-span-5 text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-2xl font-medium">
                            {eventDetail.name} 
                        </div>  
                    </div>
                </div>
                <div className="p-4 w-full text-left">
                    <div className="text-light-on-surface dark:text-dark-on-surface font-medium text-lg">
                        {eventDetail.url}
                    </div>
                </div>
                <div className="p-4 w-full text-left">
                    <div className="text-light-on-surface dark:text-dark-on-surface font-medium text-lg">
                        {eventDetail.desc}
                    </div>
                </div>
                <div className="py-4 flex space-x-4">
                    <Button
                        text={"Issue Event Attendance"}
                        color={"secondary"}
                        onClick={() => setShowEventAttendanceModal(true)}
                    />
                    {eventDetail.organizationId === PROXY_WORKSPACE && (
                        <Button
                            text={"Issue Event Attendance from proxy"}
                            color={"secondary"}
                            onClick={() => setShowEventAttendanceFromProxyModal(true)}
                        />
                    )}
                    <Link href={`/event/recieve/${removeCeramicPrefix(eventDetail.ceramicId)}`} >
                        <Button
                            text={"Event Attendance Issurance page"}
                            color={"secondary"}
                        />
                    </Link>
                </div>
                <div className="w-full pt-4">
                    <div className="w-full relative space-y-2 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll hidden-scrollbar">
                        <p className="text-left text-lg font-bold text-light-on-surface dark:text-dark-on-surface">Issued Attendance</p>
                            {eventAttendances && eventAttendances.map(item => {
                                return (
                                    <div key={item.ceramicId} className="cursor-pointer" onClick={() => handleClickAttendance(item)}>
                                        <EventAttendanceItem item={item} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
            {(showEventAttendanceModal && eventDetail) && (
                <WorkspaceModal>
                    <IssueEventAttendanceCard event={eventDetail}/>
                </WorkspaceModal>
            )}
            {(showEventAttendanceFromProxyModal && eventDetail) && (
                <WorkspaceModal>
                    <IssueEventAttendanceFromProxyCard event={eventDetail}/>
                </WorkspaceModal>
            )}
        </main>
    )
}