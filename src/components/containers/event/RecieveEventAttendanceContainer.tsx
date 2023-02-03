import { useEventAttendance } from "@/hooks/useEventAttendance";
import Image from "next/image";
import { FC, useMemo } from "react";
import { shortenStr } from "@/utils/objectUtil";
import { useHeldEventAttendances } from "@/hooks/useHeldEventAttendances";
import Router from "next/router";
import { CommonLoading } from "@/components/common/CommonLoading";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useOrganization } from "@/hooks/useOrganization";
import dynamic from "next/dynamic";
import LinkIcon from "@/components/common/button/shareButton/link.svg";
import { DefaultButton } from "@/components/common/button/DefaultButton";
import { useVESSApi } from "@/hooks/useVESSApi";
import { IssueEventAttendanceWithKMSType } from "@/interfaces/backend";

const AccountButton = dynamic(
    () => import("@/components/common/button/AccountButton"),
    {
      ssr: false,
    }
  );

// const EVENT_1025_CRYPTOBASE = "kjzl6cwe1jw148tidx4xe1cxh9vtwo1tn9cfbt0i6t38i7703yo8z107gfjnfpo"
// const EVENT_1025_SUPERLOCAL = "ceramic://kjzl6cwe1jw148904dvpnhwxhu3nps59702ufd4tpz9v6l0mfphgqn1df24op09"

type Props = {
    eventId?: string;
    vcType?:"kms" | "wallet"
};

export const RecieveEventAttendanceContainer:FC<Props> =({eventId, vcType = "wallet"}) => {
    const {eventDetail, isLoadingEventDetail,claimEventAttendance} = useEventAttendance(eventId)
    const {organization} = useOrganization(eventDetail?.organizationId)
    const {did} = useDIDAccount()
    const {HeldEventAttendances,setHeldEventAttendances } = useHeldEventAttendances(did)
    const {recieveEventAttendances} = useVESSApi(did)
    

    const handleClickAttendance = async () => {
        console.log({organization})
        if(vcType === "kms"){
            if(!did || !eventDetail || !organization || !organization.admin.ethereumAddress) return
            const param:IssueEventAttendanceWithKMSType = {
                content: eventDetail,
                issuerAddress: organization.admin.ethereumAddress,
                holderDid: did
            }
            await recieveEventAttendances(param)
        } else {
            if(!did || !eventDetail) return
            const vcs = await claimEventAttendance(eventDetail, [did])
        if(vcs && vcs.length>0) {
            await setHeldEventAttendances(vcs)
        } else {
            console.log("Error: No vcs")
        }
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


    if(!isLoadingEventDetail && !eventDetail) {
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
            <div className="relative w-full max-w-5xl min-h-screen h-full mx-auto py-20 px-4 overflow-y-scroll">
                {isLoadingEventDetail ? (
                    <CommonLoading />
                ): (
                    <>
                    {!eventDetail ? (
                        <p className="text-3xl pt-12">No Event</p>
                    ): (
                        <>
                            <div className="w-full text-center pb-4 pt-4">
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
                                        <DefaultButton
                                            text={"Claim"}
                                            onClick={() => handleClickAttendance()}
                                        />
                                    ): (
                                        <div className="w-full flex-none space-y-1">
                                            <div>
                                                <DefaultButton
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
                            <div className="w-full max-w-[460px] mx-auto bg-light-surface-1 dark:bg-dark-surface-1 text-left rounded-lg">
                                <div className="w-full pt-4 px-4 pb-2 sm:pt-8 sm:px-8 sm:pb-4 border-b-2 border-b-light-surface-variant dark:border-b-dark-surface-variant">
                                    <div className="text-light-on-surface dark:text-dark-on-surface text-2xl font-semibold">
                                        {eventDetail.name} 
                                    </div>
                                    {organization && (
                                        <div className="flex items-center pt-1">
                                            <div className={"w-[24px] h-[24px] relative "}>
                                                {organization.icon ? (
                                                    <img src={organization.icon} alt={organization.name} className="h-full rounded-full"/>
                                                ): (
                                                    <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                                                )}
                                            </div>
                                            <p className="ml-2 text-sm text-light-on-surface dark:text-dark-on-surface">{organization.name}</p>
                                        </div>
                                    )}
                                    <div className="flex items-center pt-1">
                                        <div className="w-[24px] h-[24px] flex items-center justify-center">
                                            <LinkIcon className="w-[16px] h-[16px] text-light-on-surface-variant dark:text-dark-on-surface-variant" />
                                        </div>
                                        <a
                                            className="flex items-center flex-wrap"
                                            href={`${eventDetail.url}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            >
                                            <p className="ml-2 text-sm text-light-primary dark:text-dark-primary">
                                                {shortenStr(eventDetail.url, 30)}
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <div className="py-4 px-8 w-full">
                                    <p className="text-sm font-normal text-light-on-surface dark:text-dark-on-surface whitespace-pre-wrap text-ellipsis break-words">{eventDetail.desc}</p>
                                    <div className="py-8 flex items-center justify-center">
                                        {!did ? (
                                            <AccountButton />
                                        ): (
                                            <>
                                                {isClaimable && (
                                                    <DefaultButton
                                                        text={"Claim"}
                                                        onClick={() => handleClickAttendance()}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    </>
                )}
            </div>
        </main>
    )
}