import { WorkSubjectFromDework } from "@/interfaces";
import { getGenre } from "@/utils/genreUtil";
import { shortenStr } from "@/utils/objectUtil";
import { FC, useMemo, useState } from "react";
import { GenreBadge } from "../common/badge/GenreBadge";
import { TagBadge } from "../common/badge/TagBadge";
import { GenreList } from "../Transaction/GenreList";
import clsx from "clsx";
import { useStateDeworkTargetIds } from "@/recoilstate/dework";
import { useDeworkTask } from "@/hooks/useDeworkTask";
import { CommonSpinner } from "../common/CommonSpinner";
import dynamic from "next/dynamic";

const UserPlate = dynamic(
  () => import("@/components/common/UserPlate"),
  {
    ssr: false,
  }
);

type DeworkTaskItemProps = {
    item: WorkSubjectFromDework
}
export const DeworkTaskItem:FC<DeworkTaskItemProps> = ({item}) => {
    const [selectedGenre, selectGenre] = useState("");
    const [targetIds, setDeworkTargetIds] = useStateDeworkTargetIds()
    const {updateGenre,isUpdatingGenre} = useDeworkTask()


    const onCheckUploadTarget = () => {
        if(!item.taskId) return
        if(targetIds.find(v => v === item.taskId)) {
            setDeworkTargetIds(targetIds.filter(v => v !== item.taskId))
        } else {
            setDeworkTargetIds([...targetIds, item.taskId])
        }
    }

    const isChecked = useMemo(() => {
        return targetIds.some(id => id===item.taskId)
    },[targetIds])

    const update = async(genre: string) => {
        if(!item.taskId) return
        updateGenre(item.taskId, genre)
        selectGenre(genre)
    }


    return (
        <div className={"p-2 w-full relative sm:flex items-center rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant justify-between text-xs lg:text-sm text-black dark:text-white break-words  bg-light-surface-2 dark:bg-dark-surface-2"}>
            <div>
                <div className="lg:col-span-4 h-full space-y-1">
                    <div className="flex items-center space-x-4 p-1 sm:p-0">
                        <UserPlate
                            client={item.client}
                            hasBackgroundColor
                        />
                        <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-2xl font-medium">
                            {item.work?.summary} 
                        </div>
                    </div>
                    {(item?.deliverables &&
                        item.deliverables.length > 0) ?
                        item?.deliverables.map((deliverable) =>
                        <a
                            className="flex items-center flex-wrap"
                            href={`${deliverable.format==="url" ? deliverable.value : `https://dweb.link/ipfs/${deliverable.value}`}`}
                            target="_blank"
                            rel="noreferrer"
                            key={deliverable.value}
                        >
                            <span className="text-light-secondary dark:text-dark-secondary text-md text-left">
                            {deliverable.format==="url" ? deliverable.value : shortenStr(deliverable.value)}
                            </span>
                        </a>
                        ): (
                            <span>No Deliverable</span>
                        )}
                </div>
                <div className="flex flex-wrap py-1 sm:py-0">
                    {item?.work?.genre && (
                        <div className="mr-2">
                        <GenreBadge
                            text={item.work?.genre || "Other"}
                            baseColor={
                            getGenre(item.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                            }
                            isSelected={true}
                        />
                        </div>
                    )}
                    {item?.work?.tags &&
                        item?.work?.tags.map((tag) => {
                        return <TagBadge key={tag} text={tag} />;
                        })}
                </div>
            </div>
            <div>
                <div className="flex">
                    {!!item.work?.genre ? (
                        <div className="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onCheckUploadTarget}>
                            <span className={clsx("absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer", isChecked ? "right-0 bg-primary-300": "right-1/2")}/>
                            <label className="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    ): (
                        <div className="mr-2 flex items-center">
                            {isUpdatingGenre && (
                                <CommonSpinner size="sm" />
                            )}
                            <GenreList
                                handleGenre={(g) => update(g.value)}
                                genre={selectedGenre}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}