import { Button } from "@/components/common/button/Button";
import { CreateWorkspaceCard } from "@/components/workspace/CreateWorkspaceCard";
import { WorkspaceItem } from "@/components/workspace/WorkspaceItem";
import { WorkspaceModal } from "@/components/workspace/WorkspaceModal";
import { useOrganization } from "@/hooks/useOrganization";
import { OrganizationWIthId } from "@/interfaces";
import { removeCeramicPrefix } from "@/utils/workCredentialUtil";
import { useRouter } from "next/router";
import { FC } from "react";

export const WorkspaceListContainer:FC =() => {
    const {createdOrganizations,showCreateModal, setShowCreateModal} = useOrganization()
    const router = useRouter()

    const goToWorkspace = (item: OrganizationWIthId) => {
        router.push(`/workspace/${removeCeramicPrefix(item.ceramicId)}`)
    }

    return (
        <main className="text-center">
            <div className="relative w-full max-w-5xl min-h-screen lg:min-h-screen mx-auto md:pt-24">
                <Button
                    text={"Create Workspace"}
                    color={"secondary"}
                    onClick={() => setShowCreateModal(true)}
                />
                <div className="w-full pt-4">
                    <div className="w-full relative space-y-2 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll hidden-scrollbar bg-light-surface-1 dark:bg-dark-surface-1">
                            {createdOrganizations && createdOrganizations.map(item => {
                                return (
                                    <div key={item.ceramicId} className="cursor-pointer" onClick={() => goToWorkspace(item)}>
                                        <WorkspaceItem item={item} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>



            {showCreateModal && (
                <WorkspaceModal>
                    <CreateWorkspaceCard />
                </WorkspaceModal>
            )}
        </main>
    )
}