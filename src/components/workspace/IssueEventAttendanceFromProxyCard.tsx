import { useEventAttendance } from "@/hooks/useEventAttendance";
import { EventWithId} from "vess-sdk";
import CloseIcon from "@/components/common/button/close.svg";
import PlusIcon from "@/components/common/button/plus.svg";
import MinusIcon from "@/components/common/button/minus.svg";

import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../common/button/Button";

type Props = {
    event: EventWithId,
}
interface EventAttendanceInput {
    "did": string
}

interface EventAttendanceForm {
    "dids": EventAttendanceInput[]
}
export const IssueEventAttendanceFromProxyCard:FC<Props> = ({event}) => {
    const {issueFromProxy, setShowEventAttendanceFromProxyModal} = useEventAttendance()

    const {
        register,
        handleSubmit,
        setError,
        control,
      } = useForm({defaultValues: {"dids": [{"did": ""}]}});

      const { fields, append, remove } = useFieldArray<EventAttendanceForm, "dids", "did">({
        name: "dids",
        control,
      });

      const onClickSubmit = async(data: EventAttendanceForm) => {
        const dids = data.dids.map(d => d.did)
        if(!dids || dids.length===0) return
        const res = await issueFromProxy(event, dids)
        if(res.status === "ok"){
            setShowEventAttendanceFromProxyModal(false)
        } else {
            setError("dids", {message: "failed to create"})
        }
      };

      const addRow = () => {
        append({did: ""})
      }
    
      const removeRow = (index: number) => {
        remove(index);
      }

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100 dark:bg-card rounded-lg">
            <div className="relative w-full sm:w-[512px] text-primary bg-gray-100 dark:bg-card dark:text-oncard">
                <div className="absolute top-2 right-2">
                    <button  onClick={() => setShowEventAttendanceFromProxyModal(false)}>
                        <CloseIcon className="w-5 h-5 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
                    </button>
                </div>
                <h2 className="text-center text-2xl font-bold">Issue Event Attendance From Proxy</h2>
                <form className="w-full" onSubmit={handleSubmit(onClickSubmit)}>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                            DIDs(pkh)
                        </p>
                    </div>
                    {fields.map((field, index) => (
                        <div className="mb-3 flex items-center w-full" key={field.did}>
                            <input
                                className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                                placeholder={"member's pkh DID"}
                                {...register(`dids.${index}.did`)} 
                            />
                            {index !== 0 && (
                                <button  onClick={() => removeRow(index)} type={"button"} className={"w-6 h-6 bg-light-on-surface dark:bg-dark-on-surface rounded-full flex items-center justify-center"}>
                                    <MinusIcon className="w-5 h-5 text-dark-on-surface-variant dark:text-light-on-surface-variant" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button  onClick={() => addRow()} type={"button"} className={"w-6 h-6 bg-light-on-surface dark:bg-dark-on-surface rounded-full flex items-center justify-center"}>
                        <PlusIcon className="w-5 h-5 text-dark-on-surface-variant dark:text-light-on-surface-variant" />
                    </button>
                    
                    
                    <div className="grid grid-cols-2 items-center">
                        <div className="cols-span-1"></div>
                        <div className="cols-span-1 text-right py-4 space-x-4 flex justify-end items-center">
                            <Button
                                text={"Create"}
                                buttonType={"submit"}
                                color={"secondary"}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}