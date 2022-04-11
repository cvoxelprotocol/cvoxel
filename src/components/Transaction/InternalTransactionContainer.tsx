import { TransactionLogWithChainId } from "@/interfaces";
import { FC } from "react";
import { CommonSpinner } from "../common/CommonSpinner";
import { InternalTransactionItem } from "./InternalTransactionItem";

type InternalTransactionContainerProps = {
    tx: TransactionLogWithChainId
    internalTxLoading: boolean
    internalTxs?: TransactionLogWithChainId[]
}

export const InternalTransactionContainer:FC<InternalTransactionContainerProps> = ({tx, internalTxs,internalTxLoading }) => {

    return (
        <>
            {internalTxLoading && (
                <CommonSpinner />
            )}
            {!internalTxLoading && internalTxs && internalTxs.length>0 && (
                <div className="mt-2 mb-3">
                    <h3 className="font-semibold text-gray-500 text-left mb-2">Internal Transactions</h3>
                    {internalTxs.map((internal, index) => {
                        return (
                            <InternalTransactionItem key={`${tx.hash}_${index}`} tx={tx} internalTx={internal} />
                        )
                    })}
                </div>
            )}
        </>
    )

}