import { TransactionLogWithChainId } from "@/interfaces";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/objectUtil";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getNetworkSymbol } from "@/utils/networkUtil";

type TransactionItemProps = {
  tx: TransactionLogWithChainId;
  internalTx: TransactionLogWithChainId;
};

export const InternalTransactionItem: FC<TransactionItemProps> = ({
  tx,
  internalTx,
}) => {
  return (
    <div className="w-full h-fit bg-white dark:bg-card sm:flex justify-between items-center text-xs text-gray-500 dark:text-white break-words flex-wrap py-1 px-4 border-y border-y-gray-200">
      <div className="sm:flex flex-auto justify-evenly items-center">
        <div className="flex justify-evenly items-center">
          <div className="px-4 text-left">
            <p className="break-words flex-wrap">
              <span className="text-gray-500">From: </span>
              {shortHash(internalTx.from, 8)}
            </p>
          </div>
          <div>
            <FontAwesomeIcon
              className="w-3 h-3"
              icon={faArrowRight}
              color={"gray"}
            />
          </div>
          <div className="px-4 text-left">
            <p className="break-words flex-wrap">
              <span className="text-gray-500">To: </span>
              {shortHash(internalTx.to, 8)}
            </p>
          </div>
        </div>
        <div className="w-[0.5px] bg-black border-black h-0 sm:h-[30px]"></div>
        <div className="px-2 pt-1 sm:pt-0">
          <p className="break-words flex-wrap">
            <span className="text-gray-500">Value: </span>
            {formatBigNumber(tx.value, 6, tx.tokenDecimal)}{" "}
            {tx.tokenSymbol || getNetworkSymbol(tx.chainId)}
          </p>
        </div>
      </div>
    </div>
  );
};
