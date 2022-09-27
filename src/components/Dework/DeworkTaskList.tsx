import { CVOXEL_CREATION_SUCCEED } from "@/constants/toastMessage";
import { useDework } from "@/hooks/useDework";
import { useDeworkTask } from "@/hooks/useDeworkTask";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { useStateDeworkTargetIds } from "@/recoilstate/dework";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { Button } from "../common/button/Button";
import { DeworkTaskItem } from "./DeworkTaskItem";

export type FormProps = {
    ids: string[]
}
export const DeworkTaskList:FC = () => {
    const {data, issueCRDLs} = useDeworkTask()
     const [targetIds, setDeworkTargetIds] = useStateDeworkTargetIds()
     const [isSelectedAll, selectAll] = useState(false)
     const {setDeworkTaskListOpen} = useDework()
     const {showLoading, closeLoading} = useModal()
     const {lancInfo,lancError} = useToast()

      const onUpload = async () => {
        try {
            showLoading()
            await issueCRDLs(targetIds, isSelectedAll)
            setDeworkTaskListOpen(false)
            closeLoading()
            lancInfo(CVOXEL_CREATION_SUCCEED)
        } catch (error) {
            closeLoading()
            console.log(error);
            lancError(JSON.stringify(error))
        } 
      };

      const targetIdsNum = useMemo(() => {
        return targetIds.length
      },[targetIds])

      const sortedTasks = useMemo(() => {
        return data?.sort((a,b) => {
            return a.work?.genre && !b.work?.genre ? 1 : -1
        })
      },[data])

      const onlyTasksWithGenre = useMemo(() => {
        return data?.filter(d => !!d.work?.genre) || []
      },[data])

      const storeAll = () => {
        if(!onlyTasksWithGenre) return
        if(!isSelectedAll) {
            const alTask = onlyTasksWithGenre.map(d => d.taskId).filter(d => !!d) as string[]
            setDeworkTargetIds(alTask)
        } else {
            setDeworkTargetIds([])
        }
        selectAll(v => !v)
      }

    return (
        <div className="w-3/4 h-2/3 relative p-4 bg-gray-100 dark:bg-card">
            <div className="p-2 flex items-center justify-between">
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-3xl font-bold">
                    Your Tasks from Dework
                </div>
                <div className="flex space-x-4 items-center justify-end">
                    <div className="flex items-center">
                        <div className="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in" onClick={() => storeAll()}>
                            <span className={clsx("absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer", isSelectedAll ? "right-0 bg-primary-300": "right-1/2")}/>
                            <label className="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                        <span className="font-bold">Store All</span>
                    </div>
                    <div className="flex items-center">
                        <p className="font-bold text-xl">{`${targetIdsNum} / ${onlyTasksWithGenre.length}`}</p>
                    </div>
                    <div>
                        <Button
                            text="Issue Credential"
                            color={targetIds.length===0 ? "gray" : "primary"}
                            buttonType="button"
                            onClick={onUpload}
                            disabled={targetIds.length===0}
                        />
                    </div>
                    <div>
                    <button  onClick={() => setDeworkTaskListOpen(false)}>
                        <FontAwesomeIcon
                            className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                            icon={faClose}
                        />
                    </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-full space-y-1 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll bg-light-surface-1 dark:bg-dark-surface-1">
                    {sortedTasks && sortedTasks.map(item => {
                        return (
                            <DeworkTaskItem item={item} key={item.taskId} />
                        )
                    })}
            </div>
        </div>
    )
}