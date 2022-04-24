import { useWalletAccount } from "@/hooks/useWalletAccount";
import { TransactionLogWithChainId } from "@/interfaces";
import { getExploreLink } from "@/utils/etherscanUtils";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FC, useMemo, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { CommonSpinner } from "../common/CommonSpinner";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { NetworkChip } from "./NetworkChip";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { selectTxType } from "../containers/home";
import { useENS } from "@/hooks/useENS";

type TransactionItemProps = {
    index: number
    tx: TransactionLogWithChainId
    account?: string | null
    selectedTx: selectTxType | null
    onClickTx: (tx:selectTxType | null) => void
}

export const TransactionItem:FC<TransactionItemProps> = ({tx,index, account, onClickTx, selectedTx}) => {

    const {chainId} = useWalletAccount()
    const {ens, ensLoading, setAddress} = useENS()

    useEffect(() => {
        async function init() {
            await getENS()
        }
        if(tx) {
            init()
        }
    },[tx])

    const isPayee = useMemo(() => {
        return account?.toLowerCase()===tx.to.toLowerCase()
    },[account, tx])



    const exploreLink = useMemo(() => {
        return getExploreLink(tx.hash, tx.chainId)
    },[tx,chainId])

    const isSelecting = useMemo(() => {
        return !!selectedTx && selectedTx.tx.hash===tx.hash
    },[selectedTx, tx.hash])


    const getENS = useCallback(async () => {
        setAddress(isPayee ? tx.from: tx.to)
    },[tx, isPayee, setAddress])

    const handleClick = () => {
        if(isSelecting) {
            onClickTx(null)
        } else {
            onClickTx({tx, index})
        }
    }


    return (
        <div className="w-full h-fit sm:max-h-[90px] rounded-lg shadow-lg bg-white dark:bg-card sm:flex justify-between items-center text-xs sm:text-sm text-black dark:text-white break-words flex-wrap py-2 px-4 border-b border-b-gray-200" >
            <div className="text-center sm:flex sm:justify-evenly sm:items-center">
                <div className="flex justify-evenly items-center pb-2 sm:pb-0">
                    <div className="max-w-[90px] sm:max-w-[120px] px-2">
                        <p className="text-md font-bold">
                        {formatBigNumber(tx.value, 6, tx.tokenDecimal)} {tx.tokenSymbol || (getNetworkSymbol(tx.chainId))}
                        </p>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                    <div className="max-w-[90px] sm:max-w-[120px] px-2 text-center">
                        <p className="text-gray-500">{isPayee ? "from": "to"}</p>
                        {ensLoading ? (
                            <CommonSpinner size="sm"/>
                        ): (
                            <p className="break-words flex-wrap">{ens}</p>
                        )}
                    </div>
                    <div className="hidden sm:block w-[0.5px] bg-black border-black h-[40px]"></div>
                </div>
                <div className="flex justify-evenly items-center">
                    <div className="max-w-[90px] sm:max-w-[120px] px-2 text-center space-y-1">
                        <NetworkChip chainId={tx.chainId} />
                        <p>{convertTimestampToDateStr(tx.timeStamp)}</p>
                    </div>
                    <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
                    <div className="max-w-[90px] sm:max-w-[120px] px-2">
                        <p className="text-gray-500">Tx Hash</p>
                        <p className="break-words flex-wrap">{shortHash(tx.hash, 8)}</p>
                        <a className="flex items-center justify-center" href={exploreLink} target="_blank" rel="noreferrer">
                            <p className="text-xs text-gray-500">explorer</p>
                            <FontAwesomeIcon className="w-2 h-2 ml-1" icon={faExternalLink} color={'gray'}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end">
                {isSelecting ? (
                    <button onClick={()=> handleClick()} className="text-primary-300 rounded-full bg-white border border-primary-300 py-1.5 px-4">
                        {"Close"}
                    </button>
                ): (
                    <button onClick={()=> handleClick()} className="text-white rounded-full bg-primary-300 py-1.5 px-4">
                        {"Create"}
                    </button>
                )}
             </div>
        </div>
    )
}