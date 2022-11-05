import { DIDContext } from "@/context/DIDContext";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useOrganization } from "@/hooks/useOrganization";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { Organization } from "vess-sdk";
import { Button } from "../common/button/Button";
import { IconUploader } from "../Transaction/IconUploader";

type OrganizationInput = {
    name: string
    desc?: string;
}
export const CreateWorkspaceCard:FC = () => {
    const {createOrganization, setShowCreateModal} = useOrganization()
    const {did} = useContext(DIDContext)
    const { icon, setIcon } = useFileUpload();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<OrganizationInput>();

      const onClickSubmit = async(data: any) => {
        const {name, desc } = data
        if (!name || !did || !icon) return;

        const org:Organization = {
            admin: did,
            name,
            desc: desc || "",
            icon: icon,
            orbisSocialGroupId: "",
            createdAt: convertDateToTimestampStr(new Date())
        }
        const res = await createOrganization(org)


        if(res){
            setIcon(undefined)
            setShowCreateModal(false)
        } else {
            setError("name", {message: "failed creation"})
        }
      };

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100 dark:bg-card rounded-lg">
            <div className="relative w-full sm:w-[512px] text-primary bg-gray-100 dark:bg-card dark:text-oncard">
                <div className="absolute top-2 right-2">
                    <button  onClick={() => setShowCreateModal(false)}>
                    <FontAwesomeIcon
                        className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                        icon={faClose}
                    />
                    </button>
                </div>
                <h2 className="text-center text-2xl font-bold">Create Workspace</h2>
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
                        placeholder={"your dework user name"}
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
                        placeholder={"Write your description here..."}
                        {...register("desc")}
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