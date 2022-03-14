import { CVoxelMetaDraft } from "@/interfaces";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FC, useMemo } from "react";
import { SigButton } from "../common/button/SigButton";

type SigRequestItemProps = {
    tx: CVoxelMetaDraft
    account?: string | null
    handleClick:(tx:CVoxelMetaDraft) => void
}

export const SigRequestItem:FC<SigRequestItemProps> = ({tx, account, handleClick}) => {

    const isPayee = useMemo(() => {
        return account?.toLowerCase()===tx.to.toLowerCase()
    },[account, tx])


    return (
        <div className="rounded-lg shadow-lg bg-white dark:bg-card text-sm text-black dark:text-white break-words flex-wrap font-medium">
            <div className="max-h-[90px]  flex justify-between items-center  py-2 px-4 border-b border-b-gray-200" >
                <div className="flex justify-evenly items-center">
                    <div className="max-w-[120px] px-4">
                        <p className="text-gray-500">{isPayee ? "from": "to"}</p>
                        <p className="break-words flex-wrap">{isPayee ? shortHash(tx.from, 13) : shortHash(tx.to, 13)}</p>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                    <div className="max-w-[120px] px-2 text-center space-y-1">
                        <span
                            className="block self-center mx-auto px-1 py-0.5 content-center text-xs rounded-full text-[#53B15C] bg-green-200 font-semibold w-max transition duration-300 ease">
                            Success
                        </span>
                        <p>{tx.issuedTimestamp}</p>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                    <div className="max-w-[120px] px-4">
                        <p className="text-gray-500">Tx Hash</p>
                        <p className="break-words flex-wrap">{shortHash(tx.txHash, 13)}</p>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                </div>
                <div className="max-w-[120px] px-2">
                    <p className="text-md font-bold">
                        {formatBigNumber(tx.value, 6)} {tx.tokenSymbol ? tx.tokenSymbol: "ETH"}
                    </p>
                </div>
            </div>
            <div className="w-full h-fit bg-white p-5 text-left">
                <p className="font-bold text-xl">{tx.summary}</p>
                <p className="py-2 text-md">{tx.detail}</p>
                <div className="py-5">
                    <p className="py-2 text-md">Deliverable</p>
                    <p className="text-secondary">{tx.deliverable}</p>
                </div>
                <div className=" bg-gray-200 h-[1px] mx-auto w-11/12"></div>
                <div className="w-full flex items-center justify-end pt-4 pb-5 px-5">
                    {(tx.fromSig) ? (
                                <p className="text-lg text-primary">Already Verified</p>
                          ): (
                            <SigButton text={"Verify"} handleClick={() => handleClick(tx)}/>
                        )}
                    
                </div>
            </div>
        </div>
    )
}