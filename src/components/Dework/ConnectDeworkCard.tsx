import { useDework } from "@/hooks/useDework";
import { useStateDeworkConnectModal } from "@/recoilstate";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../common/button/Button";

type DeworkInput = {
    name: string
}
export const ConnectDeworkCard:FC = () => {
    const [_, setDeworkConnectOpen] = useStateDeworkConnectModal();
    const {execDeworkAuth,getDeworkTasksFromId} = useDework()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<DeworkInput>();

      const onClickSubmit = async(data: any) => {
        const {name} = data
        if (!name) return;
        const auth = await execDeworkAuth(name)
        if(auth){
            const tasks = await getDeworkTasksFromId(auth.id)
            console.log({ tasks });
        }
      };

    return (
        <div className="relative w-full sm:w-[512px] text-primary bg-gray-100 dark:bg-card dark:text-oncard">
            <div className="absolute top-2 right-2">
                <button  onClick={() => setDeworkConnectOpen(false)}>
                <FontAwesomeIcon
                    className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                    icon={faClose}
                />
                </button>
            </div>
            <h2 className="text-center">Connect Dework</h2>
            <form className="w-full" onSubmit={handleSubmit(onClickSubmit)}>
                <div className="flex flex-wrap items-center">
                    <p className="font-semibold">
                    User Name
                    <span className="cols-span-1 px-3 text-xs text-red-600">
                        {errors.name?.message}
                    </span>
                    </p>
                </div>
                <div className="mb-3">
                    <input
                    className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                    placeholder={"your dework user name"}
                    {...register("name", { required: "enter your dework user name" })}
                    />
                </div>
                <div className="text-right py-4 space-x-4 flex justify-end items-center">
                    <Button
                        text={"connect"}
                        buttonType={"submit"}
                        color={"secondary"}
                    />
                </div>
            </form>
        </div>
    )
}