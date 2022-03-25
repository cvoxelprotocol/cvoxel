import { FC , useEffect,useMemo } from "react";
import { CVoxelMetaDraft, TransactionLog } from "@/interfaces";
import { Button } from "../common/button/Button";
import { CommonSpinner } from "../common/CommonSpinner";

type TransactionDetailProps = {
    tx: TransactionLog
    offchainItem: CVoxelMetaDraft
    connectionStatus: "disconnected" | "connecting" | "failed" | "connected"
    onClaim: (tx:TransactionLog, offchainItem: CVoxelMetaDraft) => void
    account?: string
}
export const TransactionDetail:FC<TransactionDetailProps> = ({account, tx, offchainItem, connectionStatus, onClaim}) => {

    const claimable = useMemo(() => {
        if(!account) return false
        return (account === offchainItem.from.toLowerCase() && (!offchainItem.fromSig || offchainItem.fromSig === "")) || (account === offchainItem.to.toLowerCase() && (!offchainItem.toSig || offchainItem.toSig === ""))
    },[account, offchainItem.txHash])
    

    return (
        <div className="w-full h-fit bg-white text-left shadow-lg p-5 mb-4">
            <div className="flex flex-wrap items-center">
            <p className="font-semibold">Title</p>
            </div>
            <div className="mb-3">
                <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">{offchainItem.summary}</p>
            </div>

            {/* detail */}
            <div className="flex flex-wrap items-center">
            <p className="font-semibold">Description(optional)</p>
            </div>
            <div className="mb-3">
                <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} readOnly value={offchainItem.detail || "No Description"} />
            </div>
            <div className="flex flex-wrap items-center">
            <p className="font-semibold">Deliverable link(optional)</p>
            </div>
            <div className="mb-3">
                <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">{offchainItem.deliverable || "No Deliverable"}</p>
            </div>
            {claimable && (
                <div className="text-right py-4 space-x-4 flex justify-end items-center">
                    {connectionStatus ==="connecting" && (
                        <CommonSpinner />
                    )}
                    <Button text={connectionStatus==="connected"? "Claim" : connectionStatus ==="connecting" ? "Connecitng..." : "Connect DID"} buttonType={"button"} onClick={() => onClaim(tx, offchainItem)} color="grad-blue"/>
                </div>
            )}
        </div>
    )

}