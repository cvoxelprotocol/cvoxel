import { FC } from "react";
import Image from "next/image";
import { EventAttendanceWithId } from "@/interfaces";

type WorkspaceItemProps = {
    item: EventAttendanceWithId
}
export const EventAttendanceBadge:FC<WorkspaceItemProps> = ({item}) => {


    return (
        <div className={"flex items-center justify-center rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] bg-light-surface dark:bg-dark-surface"}>
            <div className="relative w-full">
                {item.credentialSubject.eventIcon ? (
                    <img src={item.credentialSubject.eventIcon} alt={item.credentialSubject.eventName} className="rounded-full object-contain"/>
                ): (
                    <Image src={"/event-icon.png"} alt="event icon" objectFit="contain"  layout="fill"/>
                )}
            </div>
        </div>
    )
}