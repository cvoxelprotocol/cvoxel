import { CVoxelItem, TransactionLogWithChainId } from "@/interfaces";
import { getExploreLink } from "@/utils/etherscanUtils";
import { formatBigNumber } from "@/utils/ethersUtil";
import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CommonSpinner } from "../common/CommonSpinner";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { selectTxType } from "../containers/home";
import { useENS } from "@/hooks/useENS";

type TransactionItemProps = {
  index: number;
  tx: TransactionLogWithChainId;
  selectedTx: selectTxType | null;
  account?: string | null;
  cVoxels?: CVoxelItem[];
  onClickTx: (tx: selectTxType | null) => void;
};

export const TransactionItem: FC<TransactionItemProps> = ({
  tx,
  index,
  account,
  cVoxels,
  onClickTx,
  selectedTx,
}) => {
  const isPayee = useMemo(() => {
    return account?.toLowerCase() === tx.to.toLowerCase();
  }, [account, tx]);

  const isAlreadyCreated = useMemo(() => {
    return !cVoxels
      ? false
      : cVoxels?.some(
          (cv) => cv.txHash.toLowerCase() === tx.hash.toLowerCase()
        );
  }, [cVoxels, tx.hash]);

  const exploreLink = useMemo(() => {
    return getExploreLink(tx.hash, tx.chainId);
  }, [tx.hash, tx.chainId]);

  const isSelecting = useMemo(() => {
    return !!selectedTx && selectedTx.tx.hash === tx.hash;
  }, [selectedTx, tx.hash]);

  const { ens, ensLoading } = useENS(isPayee ? tx.from : tx.to);

  const handleClick = () => {
    if (isSelecting) {
      onClickTx(null);
    } else {
      onClickTx({ tx, index });
    }
  };

  return (
    <div className="w-full h-fit sm:max-h-[90px] rounded-lg shadow-lg bg-white dark:bg-card justify-between items-start text-xs sm:text-sm text-black dark:text-white break-words flex-wrap py-2 px-4 border-b border-b-gray-200 sm:grid grid-cols-12 gap-2">
      <div className="h-full">
        <div className="text-xs text-primary">From</div>
        <div className="rounded-full bg-gray-400 h-10 w-10 mx-auto"/>
      </div>

      <div className="flex flex-col items-start col-span-3 h-full">
        <div className="flex-initial text-md text-primary font-medium">
          {ensLoading ? (
            <CommonSpinner size="sm" />
          ) : (
            <p className="break-words flex-wrap">{ens}</p>
          )}
        </div>
        <div className="text-lg font-medium flex-auto flex flex-col justify-center">
          <p className="text-md font-semibold overflow-hidden whitespace-nowrap">
            {formatBigNumber(tx.value, 1, tx.tokenDecimal)}{" "}
            {tx.tokenSymbol || getNetworkSymbol(tx.chainId)}
          </p>
        </div>
      </div>

      <div className="text-left col-span-5 flex items-center">
        <div className="flex-initial flex flex-col mr-3">
          {/* TODO: duotone is only available in PRO and must be imported as an image. */}
          <FontAwesomeIcon
            className="w-3 h-3 ml-1 text-green-300"
            icon={faCircleCheck}
          />
        </div>

        <div className="mr-4 flex-auto overflow-hidden">
          <div>
            <div className="text-2xs text-gray-500 font-semibold">Tx Hash</div>
            <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {tx.hash}
            </div>
          </div>
          <div className="text-2xs text-gray-500 font-semibold">Timestamp</div>
          <div className="text-sm font-medium">
            <p>{convertTimestampToDateStr(tx.timeStamp)}</p>
          </div>
        </div>

        <div>
          <a
            className="flex items-center justify-center"
            href={exploreLink}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              className="w-4 h-4 ml-1 text-gray-400"
              icon={faExternalLink}
            />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-end col-span-3 h-full">
        {isSelecting ? (
          <button
            onClick={() => handleClick()}
            className="text-primary-300 rounded-full bg-white border border-primary-300 py-1.5 px-4"
          >
            <div className="flex items-center">
              <FontAwesomeIcon
                className="w-3 h-3 mr-1 text-primary"
                icon={faXmark}
              />
              <p>Close</p>
            </div>
          </button>
        ) : (
          <button
            onClick={() => handleClick()}
            className={
              "rounded-full py-1.5 px-4 " +
              (!isAlreadyCreated
                ? " text-white bg-primary-300 "
                : "text-primary-300 bg-white border border-primary-300")
            }
          >
            {isAlreadyCreated ? "Show Detail" : "Enter Context"}
          </button>
        )}
      </div>
    </div>
  );
};
