import { CVoxelMetaDraft } from "@/interfaces";
import { getExploreLink } from "@/utils/etherscanUtils";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../common/button/Button";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { shortenStr } from "@/utils/objectUtil";
import { TagBadge } from "../common/badge/TagBadge";
import { GenreBadge } from "../common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { VerifierContainer } from "../CVoxel/VerifierContainer";

type SigRequestItemProps = {
  tx: CVoxelMetaDraft;
  account?: string | null;
  handleClick: (tx: CVoxelMetaDraft) => void;
};

export const SigRequestItem: FC<SigRequestItemProps> = ({
  tx,
  account,
  handleClick,
}) => {
  const isPayee = useMemo(() => {
    return account?.toLowerCase() === tx.to.toLowerCase();
  }, [account, tx]);

  const exploreLink = useMemo(() => {
    return getExploreLink(tx.txHash, tx.networkId);
  }, [tx.txHash, tx.networkId]);

  return (
    <div className="rounded-lg shadow-lg bg-white dark:bg-card text-xs sm:text-sm text-black dark:text-white break-words flex-wrap font-medium">
      <div className="h-fit sm:max-h-[90px] sm:flex justify-between items-center py-2 px-2 sm:px-4 border-b border-b-gray-200">
        <div className="flex justify-evenly items-center pb-2 sm:pb-0">
          <div className="max-w-[120px] px-4">
            <VerifierContainer
              isPayer={!isPayee}
              address={!isPayee ? tx.to : tx.from}
            />
          </div>
          <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
          <div className="max-w-[120px] px-2 text-center space-y-1">
            <span className="block self-center mx-auto px-1 py-0.5 content-center text-xs rounded-full text-[#53B15C] bg-green-200 font-semibold w-max transition duration-300 ease">
              Success
            </span>
            <p>{convertTimestampToDateStr(tx.issuedTimestamp)}</p>
          </div>
          <div className="w-[0.5px] bg-black border-black h-[40px]"></div>
          <div className="max-w-[120px] px-4">
            <p className="text-gray-500">Tx Hash</p>
            <p className="break-words flex-wrap">{shortHash(tx.txHash, 8)}</p>
            <a
              className="flex items-center justify-center"
              href={exploreLink}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs text-gray-500">explorer</p>
              <FontAwesomeIcon
                className="w-2 h-2 ml-1"
                icon={faExternalLink}
                color={"gray"}
              />
            </a>
          </div>
          <div className="hidden sm:block w-[0.5px] bg-black border-black h-[40px]"></div>
        </div>
        <div className="max-w-full sm:max-w-[120px] px-2">
          <p className="text-lg sm:text-sm font-bold">
            {formatBigNumber(tx.value, 6)}{" "}
            {tx.tokenSymbol ? tx.tokenSymbol : "ETH"}
          </p>
        </div>
      </div>
      <div className="w-full h-fit bg-white p-5 text-left">
        <p className="font-bold text-xl">{tx.summary}</p>
        {tx?.genre && (
          <GenreBadge
            text={tx.genre}
            baseColor={getGenre(tx.genre)?.bgColor || "bg-[#b7b7b7]"}
            isSelected={true}
          />
        )}
        {tx.tags && tx.tags.length > 0 && (
          <>
            {tx.tags.map((tag) => {
              return <TagBadge key={tag} text={tag} />;
            })}
          </>
        )}
        <p className="py-2 text-md whitespace-pre-wrap">{tx.detail}</p>
        <div className="py-5">
          <p className="py-2 text-md">Deliverable</p>
          {tx?.deliverables && tx.deliverables.map(d => {
            return (
              <div key={d.value}>
                <a
                  className="flex items-center flex-wrap"
                  href={`${d.format==="url" ? d.value : `https://dweb.link/ipfs/${d.value}`}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs text-secondary">
                    {shortenStr(d.value)}
                  </p>
                  <FontAwesomeIcon
                    className="w-3 h-3 ml-2"
                    icon={faExternalLink}
                    color={"#EFA9E0"}
                  />
                </a>
              </div>
            )
          })}
        </div>
        <div className=" bg-gray-200 h-[1px] mx-auto w-11/12"></div>
        <div className="w-full flex items-center justify-end pt-4 pb-5 px-5">
          <Button
            text={"Verify"}
            color="grad-blue"
            onClick={() => handleClick(tx)}
          />
        </div>
      </div>
    </div>
  );
};
