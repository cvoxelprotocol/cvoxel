import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import { useFileUpload } from "@/hooks/useFileUpload";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import CloseIcon from "@/components/common/button/close.svg";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Event } from "vess-sdk";
import { Button } from "../common/button/Button";
import { IconUploader } from "../Transaction/IconUploader";

type Props = {
    orgId: string
}

type EventInput = {
    name: string
    desc?: string;
    url?: string
    eventStartDate?: string
    eventEndDate?: string
}
export const IssueEventCard:FC<Props> = ({orgId}) => {
    const {issueEvent, setShowEventModal} = useEventAttendance()
    const {did} = useDIDAccount()
    const { icon, setIcon } = useFileUpload();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<EventInput>();

      const onClickSubmit = async(data: any) => {
        const {name, desc, url, eventStartDate, eventEndDate } = data
        if (!name || !did || !icon || !url) return;

        const defaultEventDate = new Date('1 January 2022 18:00 UTC');

        const event:Event = {
            name,
            desc: desc || "",
            icon: icon,
            url: url,
            organizationId: orgId,
            startDate: eventStartDate ? new Date(eventStartDate).toISOString() : defaultEventDate.toISOString(),
            endDate: eventEndDate ? new Date(eventEndDate).toISOString() : defaultEventDate.toISOString(),
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
                        <CloseIcon className="w-5 h-5 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
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
                        Start Date
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.eventStartDate?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        placeholder={"26 November 2022 09:00 UTC"}
                        {...register("eventStartDate", { required: "enter event start date" })}
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        End Date
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.eventEndDate?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        placeholder={"26 November 2022 09:00 UTC"}
                        {...register("eventEndDate", { required: "enter event end date" })}
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