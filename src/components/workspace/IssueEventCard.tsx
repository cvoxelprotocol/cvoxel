import { DIDContext } from "@/context/DIDContext";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import { useFileUpload } from "@/hooks/useFileUpload";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { Event } from "@/__generated__/types/Event";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../common/button/Button";
import { IconUploader } from "../Transaction/IconUploader";

type Props = {
    orgId: string
}

type EventInput = {
    name: string
    desc?: string;
    url?: string
}
export const IssueEventCard:FC<Props> = ({orgId}) => {
    const {issueEvent, setShowEventModal} = useEventAttendance()
    const {did} = useContext(DIDContext)
    const { icon, setIcon } = useFileUpload();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<EventInput>();

      const onClickSubmit = async(data: any) => {
        const {name, desc, url } = data
        if (!name || !did || !icon || !url) return;

        const eventDate = new Date('25 October 2022 18:00 UTC');

        const event:Event = {
            name,
            desc: desc || "",
            icon: icon,
            url: url,
            organizationId: orgId,
            startDate: eventDate.toISOString(),
            endDate: "",
            tags: [],
            createdAt: convertDateToTimestampStr(new Date())
        }
        const res = await issueEvent(event)


        if(res){
            setIcon(undefined)
            setShowEventModal(false)
        } else {
            setError("name", {message: "failed creation"})
        }
      };

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100 dark:bg-card rounded-lg">
            <div className="relative w-full sm:w-[512px] text-primary bg-gray-100 dark:bg-card dark:text-oncard">
                <div className="absolute top-2 right-2">
                    <button  onClick={() => setShowEventModal(false)}>
                    <FontAwesomeIcon
                        className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                        icon={faClose}
                    />
                    </button>
                </div>
                <h2 className="text-center text-2xl font-bold">Create Event</h2>
                <form className="w-full" onSubmit={handleSubmit(onClickSubmit)}>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Name
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.name?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        placeholder={"workspace name"}
                        {...register("name", { required: "enter workspace name" })}
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Description
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.desc?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                    <textarea
                        className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        rows={3}
                        placeholder={"Write workspace description here..."}
                        {...register("desc")}
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Link
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.name?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        placeholder={"event url"}
                        {...register("url", { required: "enter link" })}
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Icon
                        </p>
                    </div>
                    <div className="mb-3 w-32 h-32">
                        <IconUploader />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <div className="cols-span-1"></div>
                        <div className="cols-span-1 text-right py-4 space-x-4 flex justify-end items-center">
                            <Button
                                text={"Create"}
                                buttonType={"submit"}
                                color={"secondary"}
                                disabled={!did || !icon}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}