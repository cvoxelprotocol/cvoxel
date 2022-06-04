import { CVoxelItem, TransactionLogWithChainId } from "@/interfaces";
import { getExploreLink } from "@/utils/etherscanUtils";
import { formatBigNumber } from "@/utils/ethersUtil";
import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faAngleDown,
  faAngleUp,
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
    <div className="w-full h-fit sm:max-h-[90px] rounded-lg shadow-lg bg-white dark:bg-card justify-between items-start text-xs sm:text-sm text-black dark:text-white break-words flex-wrap py-2 px-10 border-b border-b-gray-200 sm:grid grid-cols-12 gap-2">
      {/*address and value*/}
      <div className="flex col-span-3 h-full">
        {/*content*/}
        <div className="flex flex-col items-start w-full flex-auto">
          <div className="h-full">
            <div className="text-xs text-primary">From</div>
            <div></div>
          </div>
          <div className="flex-initial text-lg text-primary font-medium">
            {ensLoading ? (
              <CommonSpinner size="sm" />
            ) : (
              <p className="break-words flex-wrap">{ens}</p>
            )}
          </div>
          <div className="text-xl font-medium flex-auto flex flex-col justify-center">
            <p className="text-md font-semibold">
              {formatBigNumber(tx.value, 1, tx.tokenDecimal)}{" "}
              {tx.tokenSymbol || getNetworkSymbol(tx.chainId)}
            </p>
          </div>
        </div>
        {/*border*/}
        <div className="w-0.5 bg-gray-200 flex-initial" />
      </div>

      {/*transaction*/}
      <div className="text-left col-span-7 flex items-center">
        <div className="mr-4 flex-auto overflow-hidden">
          {/*hash*/}
          <div>
            <div className="text-2xs text-gray-500 font-semibold">Tx Hash</div>
            <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {tx.hash}
            </div>
          </div>

          {/*timestamp*/}
          <div className="text-2xs text-gray-500 font-semibold mt-2">
            Timestamp
          </div>
          <div className="text-sm font-medium">
            <p>{convertTimestampToDateStr(tx.timeStamp)}</p>
          </div>
        </div>

        {/*external link*/}
        <div>
          <a
            className="flex items-center justify-center"
            href={exploreLink}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              className="w-4 h-4 ml-1 text-gray-400 hover:text-gray-300"
              icon={faExternalLink}
            />
          </a>
        </div>
      </div>

      {/*spacer for grid*/}
      <div className="col-span-1" />

      <div className="flex items-center justify-end col-span-1 h-full">
        <button onClick={() => handleClick()}>
          <div className="flex items-center p-4">
            <FontAwesomeIcon
              className="w-5 h-5 mr-1 text-primary hover:text-secondary"
              icon={isSelecting ? faAngleUp : faAngleDown}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
