import { useDework } from "@/hooks/useDework";
import { useModal } from "@/hooks/useModal";
import CloseIcon from "@/components/common/button/close.svg";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../common/button/Button";

type DeworkInput = {
    name: string
}
export const ConnectDeworkCard:FC = () => {
    const {execDeworkAuth,getDeworkTasksFromId, setDeworkTaskListOpen, setDeworkConnectOpen} = useDework()
    const {showLoading, closeLoading} = useModal()

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
      } = useForm<DeworkInput>();

      const onClickSubmit = async(data: any) => {
        const {name} = data
        if (!name) return;

        showLoading()
        const auth = await execDeworkAuth(name)
        if(auth){
            await getDeworkTasksFromId(auth.id)
            closeLoading()
            setDeworkConnectOpen(false)
            setDeworkTaskListOpen(true)
        } else {
            closeLoading()
            setError("name", {message: "invalid name"})
        }
      };

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100 dark:bg-card rounded-lg">
            <div className="relative w-full sm:w-[512px] text-primary bg-gray-100 dark:bg-card dark:text-oncard">
                <div className="absolute top-2 right-2">
                    <button  onClick={() => setDeworkConnectOpen(false)}>
                        <CloseIcon className="w-5 h-5 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
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
                    <div className="grid grid-cols-2 items-center">
                        <div className="cols-span-1">
                            <a className="text-sm" href="https://doc.vess.id/tutorials/dework-integration" target={"_blank"} rel="noreferrer">
                                <p className="text-sm underline">How to Connect?</p>
                            </a>
                        </div>
                        <div className="cols-span-1 text-right py-4 space-x-4 flex justify-end items-center">
                            <Button
                                text={"connect"}
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