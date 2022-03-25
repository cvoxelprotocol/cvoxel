import { useWalletAccount } from "@/hooks/useWalletAccount";
import { TransactionLog } from "@/interfaces";
import { getExploreLink } from "@/utils/etherscanUtils";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

type TransactionItemProps = {
    tx: TransactionLog
    account?: string | null
    selectedTx: TransactionLog | null
    onClickTx: (tx:TransactionLog | null) => void
}

export const TransactionItem:FC<TransactionItemProps> = ({tx, account, onClickTx, selectedTx}) => {

    const {chainId} = useWalletAccount()

    const isPayee = useMemo(() => {
        return account?.toLowerCase()===tx.to.toLowerCase()
    },[account, tx])

    const exploreLink = useMemo(() => {
        return getExploreLink(tx.hash, chainId)
    },[tx,chainId])

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
        <div key={tx.hash} className="w-full h-fit sm:max-h-[90px] rounded-lg shadow-lg bg-white dark:bg-card sm:flex justify-between items-center text-xs sm:text-sm text-black dark:text-white break-words flex-wrap py-2 px-4 border-b border-b-gray-200" >
            <div className="text-center sm:flex sm:justify-evenly sm:items-center">
                <div className="flex justify-evenly items-center pb-2 sm:pb-0">
                    <div className="max-w-[90px] sm:max-w-[120px] px-2">
                        <p className="text-md font-bold">
                        {formatBigNumber(tx.value, 6)} {tx.tokenSymbol ? tx.tokenSymbol: "ETH"}
                        </p>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                    <div className="max-w-[90px] sm:max-w-[120px] px-2 text-center space-y-1">
                        <span
                            className="block self-center mx-auto px-1 py-0.5 content-center text-xs rounded-full text-[#53B15C] bg-green-200 font-semibold w-max transition duration-300 ease">
                            Success
                        </span>
                        <p>{tx.timeStamp}</p>
                    </div>
                    <div className="hidden sm:block w-[0.5px] bg-black border-black h-[40px]"></div>
                </div>
                <div className="flex justify-evenly items-center">
                    <div className="max-w-[90px] sm:max-w-[120px] px-4">
                        <p className="text-gray-500">Tx Hash</p>
                        <p className="break-words flex-wrap">{shortHash(tx.hash, 8)}</p>
                        <a className="flex items-center justify-center" href={exploreLink} target="_blank" rel="noreferrer">
                            <p className="text-xs text-gray-500">explorer</p>
                            <FontAwesomeIcon className="w-2 h-2 ml-1" icon={faExternalLink} color={'gray'}/>
                        </a>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                    <div className="max-w-[90px] sm:max-w-[120px] px-4">
                        <p className="text-gray-500">{isPayee ? "from": "to"}</p>
                        <p className="break-words flex-wrap">{isPayee ? shortHash(tx.from, 13) : shortHash(tx.to, 13)}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end">
                <button onClick={()=>handleClick()} className="text-primary border-none hover:border-none p-2">{shouldShowClaim}</button>
             </div>
        </div>
    )
}