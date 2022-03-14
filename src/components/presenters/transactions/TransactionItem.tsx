import { TransactionLog } from "@/interfaces";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FC, useMemo } from "react";

type TransactionItemProps = {
    tx: TransactionLog
    account?: string | null
    selectedTx: TransactionLog | null
    onClickTx: (tx:TransactionLog | null) => void
}

export const TransactionItem:FC<TransactionItemProps> = ({tx, account, onClickTx, selectedTx}) => {

    const isPayee = useMemo(() => {
        return account?.toLowerCase()===tx.to.toLowerCase()
    },[account, tx])

    const shouldShowClaim = useMemo(() => {
        return selectedTx && selectedTx.hash===tx.hash ? "Close" : "Claim Career Detail"
    },[selectedTx, tx.hash])

    const handleClick = () => {
        if(selectedTx) {
            onClickTx(null)
        } else {
            onClickTx(tx)
        }
    }


    return (
        <div key={tx.hash} className="max-h-[90px] rounded-lg shadow-lg bg-white dark:bg-card flex justify-between items-center text-sm text-black dark:text-white break-words flex-wrap py-2 px-4 border-b border-b-gray-200" >
            <div className="flex justify-evenly items-center">
                <div className="max-w-[120px] px-2">
                    <p className="text-md font-bold">
                    {formatBigNumber(tx.value, 6)} {tx.tokenSymbol ? tx.tokenSymbol: "ETH"}
                    </p>
                </div>
                <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                <div className="max-w-[120px] px-2 text-center space-y-1">
                    <span
                        className="block self-center mx-auto px-1 py-0.5 content-center text-xs rounded-full text-[#53B15C] bg-green-200 font-semibold w-max transition duration-300 ease">
                        Success
                    </span>
                    <p>{tx.timeStamp}</p>
                </div>
                <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                <div className="max-w-[120px] px-4">
                    <p className="text-gray-500">Tx Hash</p>
                    <p className="break-words flex-wrap">{shortHash(tx.hash, 13)}</p>
                </div>
                <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                <div className="max-w-[120px] px-4">
                <p className="text-gray-500">{isPayee ? "from": "to"}</p>
                    <p className="break-words flex-wrap">{isPayee ? shortHash(tx.from, 13) : shortHash(tx.to, 13)}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button onClick={()=>handleClick()} className="text-primary border-none hover:border-none">{shouldShowClaim}</button>
             </div>
        </div>
    )
}