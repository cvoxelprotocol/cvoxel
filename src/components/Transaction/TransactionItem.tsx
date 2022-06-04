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
    <div className="w-full sm:h-fit relative sm:max-h-[90px] rounded-lg border sm:border-none border-secondary sm:shadow-lg bg-white dark:bg-card justify-between items-start text-xs sm:text-sm text-black dark:text-white break-words flex-wrap py-2 px-4 sm:px-10 sm:border-b sm:border-b-gray-200 grid grid-flow-col grid-rows-[2.5rem_2rem_0.5rem] grid-cols-1 sm:grid-rows-1 sm:grid-flow-row sm:grid-cols-12 gap-2">
      {/*address and value*/}
      <div className="flex sm:col-span-3 h-full">
        {/*content*/}
        <div className="flex sm:flex-col items-start w-full flex-auto">
          <div className="flex-1 sm:flex-initial text-left">
            <div>
              <div className="text-xs text-primary">From</div>
              <div></div>
            </div>

            <div className="text-lg text-primary font-medium">
              {ensLoading ? (
                <CommonSpinner size="sm" />
              ) : (
                <p className="break-words flex-wrap">{ens}</p>
              )}
            </div>
          </div>

          <div className="flex-1 sm:flex-none text-xl font-medium flex-auto flex flex-col justify-center text-left sm:text-center h-full sm:h-fit">
            <div className="flex sm:block">
              <p className="text-md font-semibold">
                {formatBigNumber(tx.value, 1, tx.tokenDecimal)}{" "}
                {tx.tokenSymbol || getNetworkSymbol(tx.chainId)}
              </p>
            </div>
          </div>
        </div>
        {/*border*/}
        <div className="w-0.5 bg-gray-200 flex-initial hidden sm:block" />
      </div>

      {/*transaction*/}
      <div className="text-left sm:col-span-7 flex items-center">
        <div className="flex sm:block mr-4 flex-auto overflow-hidden">
          {/*hash*/}
          <div className="flex-1 overflow-hidden">
            <div className="text-2xs text-gray-500 font-semibold">Tx Hash</div>
            <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {tx.hash}
            </div>
          </div>

          {/*timestamp*/}
          <div className="flex-1 sm:mt-2 overflow-hidden ml-2 sm:ml-0">
            <div className="text-2xs text-gray-500 font-semibold">
              Timestamp
            </div>
            <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {convertTimestampToDateStr(tx.timeStamp)}
            </div>
          </div>
        </div>

        {/*external link*/}
        <div className="hidden sm:block">
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
      <div className="col-span-1 hidden sm:block" />

      {/*expand*/}
      <div className="flex items-center justify-center sm:justify-end col-span-1 h-full">
        <button onClick={() => handleClick()}>
          <div className="flex items-center p-4">
            <FontAwesomeIcon
              className="w-5 h-5 mr-1 text-primary hover:text-secondary"
              icon={isSelecting ? faAngleUp : faAngleDown}
            />
          </div>
        </button>
      </div>

      {/*external link for sp*/}
      <div className="sm:hidden absolute top-5 right-10">
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
  );
};
