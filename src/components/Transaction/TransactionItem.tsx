import { TransactionLogWithChainId } from "@/interfaces";
import { getExploreLink } from "@/utils/etherscanUtils";
import { formatBigNumber } from "@/utils/ethersUtil";
import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { convertTimestampToDateStrLocaleUS } from "@/utils/dateUtil";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { Arrow } from "@/components/common/arrow/Arrow";
import clsx from "clsx";
import dynamic from "next/dynamic";

const TxDirection = dynamic(
  () => import("@/components/common/TxDirection"),
  {
    ssr: false,
  }
);

type TransactionItemProps = {
  index: number;
  tx: TransactionLogWithChainId;
  selectedTx: TransactionLogWithChainId | null;
  account?: string | null;
  onClickTx: (tx: TransactionLogWithChainId | null) => void;
};

export const TransactionItem: FC<TransactionItemProps> = ({
  tx,
  account,
  onClickTx,
  selectedTx,
}) => {
  const isPayer = useMemo(() => {
    return account?.toLowerCase() === tx.from.toLowerCase();
  }, [account, tx]);

  const exploreLink = useMemo(() => {
    return getExploreLink(tx.hash, tx.chainId);
  }, [tx.hash, tx.chainId]);

  const isSelecting = useMemo(() => {
    return !!selectedTx && selectedTx.hash === tx.hash;
  }, [selectedTx, tx.hash]);

  const handleClick = () => {
    if (isSelecting) {
      onClickTx(null);
    } else {
      onClickTx(tx);
    }
  };

  return (
    <div
      className={clsx(
        "w-full h-36 lg:h-32 overflow-hidden relative rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant justify-between items-start text-xs lg:text-sm text-black dark:text-white break-words flex-wrap grid grid-flow-col grid-rows-[2.5rem_2rem_0.5rem] grid-cols-1 lg:grid-rows-1 lg:grid-flow-row lg:grid-cols-12 gap-y-2 gap-x-0 lg:gap-x-2 lg:gap-y-0 bg-light-surface-2 dark:bg-dark-surface-2",
        isSelecting && "border-b-0 rounded-b-none"
      )}
    >
      {/*address and value*/}
      <div className="flex lg:col-span-4 h-full">
        {/*content*/}
        <div className="flex lg:flex-col items-start lg:justify-center lg:pl-8 w-full flex-auto overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1 lg:rounded-r-2xl lg:space-y-3">
          <div className="w-1/2 lg:w-full lg:flex-none flex justify-center items-center lg:block h-full lg:h-fit">
            <TxDirection from={tx.from} to={tx.to} isPayer={isPayer} />
          </div>

          <div className="w-1/2 lg:w-full lg:flex-none text-xl font-medium flex-auto flex flex-col justify-center text-left lg:text-center h-full lg:h-fit overflow-hidden">
            <div className="flex lg:block overflow-hidden items-end space-x-1 text-start">
              <span className="text-light-on-secondary-container dark:text-light-on-secondary-container font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-left">
                {formatBigNumber(tx.value, 6, tx.tokenDecimal)}{" "}
              </span>
              <span className="text-light-on-secondary-container dark:text-light-on-secondary-container text-sm">
                {tx.tokenSymbol || getNetworkSymbol(tx.chainId)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*transaction*/}
      <div className="text-left lg:col-span-6 flex items-center h-full px-2">
        <div className="flex lg:flex-col lg:justify-center lg:mr-4 flex-auto overflow-hidden">
          {/*hash*/}
          <div className="flex-1 overflow-hidden">
            <div className="text-xs text-gray-500 font-semibold">Tx Hash</div>
            <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full bg-light-surface dark:bg-dark-surface px-2 py-0.5 rounded-lg">
              {tx.hash}
            </div>
          </div>

          {/*timestamp*/}
          <div className="flex-1 lg:mt-2 overflow-hidden ml-2 lg:ml-0">
            <div className="text-xs text-gray-500 font-semibold">Timestamp</div>
            <div className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap w-full bg-light-surface dark:bg-dark-surface px-2 py-0.5 rounded-lg">
              {convertTimestampToDateStrLocaleUS(tx.timeStamp)}
            </div>
          </div>
        </div>

        {/*external link*/}
      </div>

      {/*expand*/}
      <div className="flex flex-col items-center lg:items-end justify-between lg:col-span-2 h-full pr-8 py-3">
        <div className="hidden lg:block">
          <a
            className="flex items-center justify-center"
            href={exploreLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center px-2 py-0.5 text-light-on-surface-variant dark:text-dark-on-surface-variant">
              <div>Explorer</div>
              <FontAwesomeIcon
                className="w-4 h-4 ml-1"
                icon={faExternalLink}
              />
            </div>
          </a>
        </div>

        <button onClick={() => handleClick()}>
          <div className="flex items-center p-4">
            {isSelecting ? (
              <Arrow size="sm" direction="up" />
            ) : (
              <Arrow size="sm" direction="down" />
            )}
          </div>
        </button>
      </div>

      {/*external link for sp*/}
      <div className="lg:hidden absolute top-3 right-10">
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
