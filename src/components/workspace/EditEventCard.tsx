import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useEventAttendance } from "@/hooks/useEventAttendance";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import CloseIcon from "@/components/common/button/close.svg";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Event, EventWithId } from "vess-sdk";
import { Button } from "../common/button/Button";

type Props = {
    event: EventWithId
}

type EventInput = {
    desc?: string;
    url?: string;
    eventDate: string
}
export const EditEventCard:FC<Props> = ({event}) => {
    const {editEvent, setShowEventModal} = useEventAttendance()
    const {did} = useDIDAccount()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<EventInput>({defaultValues: {desc: event.desc, url: event.url, eventDate: event.startDate}});

      const onClickSubmit = async(data: any) => {
        const {desc, url, eventDate } = data
        if (!did || !url) return;

        // const eventDateData = new Date('25 October 2022 18:00 UTC');
        const eventDateData = new Date(eventDate)

        const newItem:Event = {
            name:event.name,
            desc: desc || event.desc,
            icon: event.icon,
            url: url || event.url,
            organizationId: event.organizationId,
            startDate: eventDateData.toISOString(),
            endDate: eventDateData.toISOString(),
            tags: [],
            updatedAt: convertDateToTimestampStr(new Date())
        }
        const res = await editEvent({id:event.ceramicId, event: newItem})


        if(res){
            setShowEventModal(false)
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
                <h2 className="text-center text-2xl font-bold">Update Event</h2>
                <form className="w-full" onSubmit={handleSubmit(onClickSubmit)}>
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
                        className="w-full resize-y my-1 py-2 px-6 border rounded-xl text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        rows={6}
                        placeholder={"Write workspace description here..."}
                        {...register("desc")}
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                        Link
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.url?.message}
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
                        Date
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.eventDate?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        placeholder={"26 November 2022 09:00 UTC"}
                        {...register("eventDate", { required: "enter event date" })}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <div className="cols-span-1"></div>
                        <div className="cols-span-1 text-right py-4 space-x-4 flex justify-end items-center">
                            <Button
                                text={"Update"}
                                buttonType={"submit"}
                                color={"secondary"}
                                disabled={!did}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}