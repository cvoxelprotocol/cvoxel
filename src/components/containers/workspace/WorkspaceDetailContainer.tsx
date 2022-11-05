import { Button } from "@/components/common/button/Button";
import { CreateMembershipCard } from "@/components/workspace/CreateMembershipCard";
import { CreateMembershipSubjectCard } from "@/components/workspace/CreateMembershipSubjectCard";
import { EventItem } from "@/components/workspace/EventItem";
import { IssueEventCard } from "@/components/workspace/IssueEventCard";
import { MembershipItem } from "@/components/workspace/MembershipItem";
import { MembershipSubjectItem } from "@/components/workspace/MembershipSubjectItem";
import { WorkspaceModal } from "@/components/workspace/WorkspaceModal";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import { useMembership } from "@/hooks/useMembership";
import { useMembershipSubject } from "@/hooks/useMembershipSubject";
import { useOrganization } from "@/hooks/useOrganization";
import { EventWithId, MembershipSubjectWithId,removeCeramicPrefix } from "vess-sdk";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
    orgId?: string;
};

export const WorkspaceDetailContainer:FC<Props> =({orgId}) => {
    const {organization} = useOrganization(orgId)
    const {createdMembershipsOfOrg,setShowModal, showModal} = useMembership(orgId)
    const {IssuedMembershipSubjects, setShowSubjectModal, showSubjectModal} = useMembershipSubject(orgId)
    const {issuedEvent, showEventModal, setShowEventModal} = useEventAttendance(orgId)
    const router = useRouter()

    const goToUserPage = (item: MembershipSubjectWithId) => {
        router.push(`/${item.credentialSubject.id}`)
    }

    const goToEventPage = (item: EventWithId) => {
        router.push(`/event/admin/${removeCeramicPrefix(item.ceramicId)}`)
    }

    if(!organization) {
        return (
            <main className="text-center">
                <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto pt-24 px-4">
                    <p className="text-3xl">No Workspace</p>
                </div>
            </main>
        )
    }

    return (
        <main className="text-center">
            <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto pt-24 px-4">
                <div className="sm:flex items-center justify-between space-x-4">
                    <div className="flex items-center">
                        <div className={clsx("rounded-r-lg w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] relative bg-light-surface dark:bg-dark-surface")}>
                            <div className="relative">
                                {organization.icon ? (
                                    <img src={organization.icon} alt={organization.name} className="h-full"/>
                                ): (
                                    <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                                )}
                            </div>
                        </div>
                        <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-4xl font-medium">
                            {organization.name} 
                        </div>  
                    </div>
                    <div className="py-4 flex space-x-4">
                        <Button
                            text={"Create Membership"}
                            color={"secondary"}
                            onClick={() => setShowModal(true)}
                        />
                        <Button
                            text={"Add Member"}
                            color={"secondary"}
                            onClick={() => setShowSubjectModal(true)}
                        />
                        <Button
                            text={"Issue Event"}
                            color={"secondary"}
                            onClick={() => setShowEventModal(true)}
                        />
                    </div>
                </div>
                <div className="p-4 w-full text-left">
                    <div className="text-light-on-surface dark:text-dark-on-surface font-medium text-lg">
                        {organization.desc}
                    </div>
                </div>
                <div className="w-full pt-4">
                    <div className="w-full flex items-center space-x-2 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll hidden-scrollbar">
                            {createdMembershipsOfOrg && createdMembershipsOfOrg.map(item => {
                                return (
                                    <div key={item.ceramicId} >
                                        <MembershipItem item={item} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="w-full pt-4">
                    <div className="w-full relative space-y-2 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll hidden-scrollbar">
                        <p className="text-left text-lg font-bold text-light-on-surface dark:text-dark-on-surface">Members</p>
                            {IssuedMembershipSubjects && IssuedMembershipSubjects.map(item => {
                                return (
                                    <div key={item.ceramicId} className="cursor-pointer" onClick={() => goToUserPage(item)}>
                                        <MembershipSubjectItem item={item} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="w-full pt-4">
                    <div className="w-full relative space-y-2 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll hidden-scrollbar">
                        <p className="text-left text-lg font-bold text-light-on-surface dark:text-dark-on-surface">Event</p>
                            {issuedEvent && issuedEvent.map(item => {
                                return (
                                    <div key={item.ceramicId} className="cursor-pointer" onClick={() => goToEventPage(item)}>
                                        <EventItem item={item} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
            {(showModal && orgId) && (
                <WorkspaceModal>
                    <CreateMembershipCard orgId={orgId} />
                </WorkspaceModal>
            )}
            {(showSubjectModal && orgId) && (
                <WorkspaceModal>
                    <CreateMembershipSubjectCard org={organization} memberships={createdMembershipsOfOrg}/>
                </WorkspaceModal>
            )}
            {(showEventModal && orgId) && (
                <WorkspaceModal>
                    <IssueEventCard orgId={orgId}/>
                </WorkspaceModal>
            )}
        </main>
    )
}