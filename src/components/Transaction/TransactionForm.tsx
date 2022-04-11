import { useInternalTransactions } from "@/hooks/useInternalTransactions";
import { CVoxel, TransactionLogWithChainId } from "@/interfaces";
import { FC,useMemo, useEffect} from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../common/button/Button";
import { CommonSpinner } from "../common/CommonSpinner";
import { InternalTransactionContainer } from "./InternalTransactionContainer";

type TransactionFormProps = {
    tx: TransactionLogWithChainId
    connectionStatus: "disconnected" | "connecting" | "failed" | "connected"
}

export const TransactionForm:FC<TransactionFormProps> = ({tx,connectionStatus }) => {

    const {internalTxs, internalTxLoading} = useInternalTransactions(tx)

    const {
        register,
        setValue,
        formState: { errors },
      } = useFormContext<CVoxel>();

    const relatedAddress = useMemo(() => {
        let merged: string[] | null = tx.addressOfDuplicatedTx || null
        if(!internalTxs || internalTxs.length===0) return merged
        const to = internalTxs.map(tx => tx.to.toLowerCase())
        const from = internalTxs.map(tx => tx.from.toLowerCase())
        return merged ? merged.concat(from).concat(to) : from.concat(to)
    },[internalTxs,tx])

    useEffect(() => {
        if(relatedAddress && relatedAddress.length>0) {
            console.log("tx.hash", tx.hash)
            console.log("relatedAddress", relatedAddress)
            setValue("relatedAddresses", relatedAddress)
        }
    },[relatedAddress,tx])

    return (
        <>
            {/* title */}
            <div className="flex flex-wrap items-center">
                <p className="font-semibold">Title</p>
            </div>
            <div className="mb-3">
                <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter title..'} {...register("summary", {required:'Please enter a summary'})} />
                <div className="w-full grid grid-cols-2 mb-2">
                    <span className="cols-span-1 px-3 text-xs text-red-600">{errors.summary?.message}</span>
                </div>
            </div>

            {/* detail */}
            <div className="flex flex-wrap items-center">
            <p className="font-semibold">Description(optional)</p>
            </div>
            <div className="mb-3">
                <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} placeholder={'Enter detail..'} {...register("detail")} />
                <div className="w-full grid grid-cols-2 mb-2">
                    <span className="cols-span-1 px-3 text-xs text-red-600">{errors.detail?.message}</span>
                </div>
            </div>
                <div className="flex flex-wrap items-center">
                <p className="font-semibold">Deliverable link(optional)</p>
            </div>
            <div className="mb-3">
                <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter deliverable..'} {...register("deliverable")} />
                <div className="w-full grid grid-cols-2 mb-2">
                    <span className="cols-span-1 px-3 text-xs text-red-600">{errors.deliverable?.message}</span>
                </div>
            </div>
            <div className="text-right py-4 space-x-4 flex justify-end items-center">
                {connectionStatus ==="connecting" && (
                    <CommonSpinner />
                )}
                <Button text={connectionStatus==="connected"? "Claim" : connectionStatus ==="connecting" ? "Connecitng..." : "Connect DID"} buttonType={"submit"} color={connectionStatus==="connected" ? "grad-blue": "grad-red"}/>
            </div>
            <InternalTransactionContainer tx={tx} internalTxs={internalTxs} internalTxLoading={internalTxLoading}/>
        </>
    )

}