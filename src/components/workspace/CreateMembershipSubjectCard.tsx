import { useMembershipSubject } from "@/hooks/useMembershipSubject";
import { MembershipWithId, OrganizationWIthId } from "@/interfaces";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../common/button/Button";
import { MembershipList } from "./MembershipList";

type Props = {
    org: OrganizationWIthId,
    memberships?: MembershipWithId[]
}
type MembershipSubjectInput = {
    did: string
    membership: MembershipWithId;
}
export const CreateMembershipSubjectCard:FC<Props> = ({org,memberships}) => {
    const {issue, setShowSubjectModal} = useMembershipSubject(org.ceramicId)

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<MembershipSubjectInput>();

      const onClickSubmit = async(data: any) => {
        const {did, membership } = data
        if (!did) return;
        const res = await issue(org, membership, did)
        if(res){
            setShowSubjectModal(false)
        } else {
            setError("did", {message: "failed to create"})
        }
      };

      const onHandleMembership = (membership: MembershipWithId) => {
        setValue("membership", membership)
      }

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100 dark:bg-card rounded-lg">
            <div className="relative w-full sm:w-[512px] text-primary bg-gray-100 dark:bg-card dark:text-oncard">
                <div className="absolute top-2 right-2">
                    <button  onClick={() => setShowSubjectModal(false)}>
                    <FontAwesomeIcon
                        className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                        icon={faClose}
                    />
                    </button>
                </div>
                <h2 className="text-center text-2xl font-bold">Create Membership</h2>
                <form className="w-full" onSubmit={handleSubmit(onClickSubmit)}>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">
                            DID(pkh)
                        <span className="cols-span-1 px-3 text-xs text-red-600">
                            {errors.did?.message}
                        </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <input
                        className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
                        placeholder={"member's pkh DID"}
                        {...register("did", { required: "enter did" })}
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        <p className="font-semibold">Membership</p>
                    </div>
                    <div className="mb-3">
                        <MembershipList handleMembership={onHandleMembership} memberships={memberships} selected={getValues("membership")}/>
                    </div>
                    
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