import { FC, useMemo, useState } from "react";
import {
  CVoxelItem,
  CVoxelMetaDraft,
  TransactionLogWithChainId,
} from "@/interfaces";
import { Button } from "../common/button/Button";
import { CommonSpinner } from "../common/CommonSpinner";
import { InternalTransactionContainer } from "./InternalTransactionContainer";
import { useInternalTransactions } from "@/hooks/useInternalTransactions";
import { GenreList } from "./GenreList";
import { getGenre } from "@/utils/genreUtil";
import { GenreBadge } from "../common/badge/GenreBadge";
import { useStateSelectedGenre } from "@/recoilstate/genre";
import { TagBadge } from "../common/badge/TagBadge";
import { TagForm } from "./TagForm";

type TransactionDetailProps = {
  tx: TransactionLogWithChainId;
  offchainItem: CVoxelMetaDraft;
  connectionStatus: "disconnected" | "connecting" | "failed" | "connected";
  onClaim: (
    tx: TransactionLogWithChainId,
    offchainItem: CVoxelMetaDraft
  ) => void;
  reClaim: (
    tx: TransactionLogWithChainId,
    offchainItem: CVoxelMetaDraft
  ) => void;
  account?: string;
  cvoxels?: CVoxelItem[];
};
export const TransactionDetail: FC<TransactionDetailProps> = ({
  account,
  tx,
  offchainItem,
  connectionStatus,
  cvoxels,
  onClaim,
  reClaim,
}) => {
  const { internalTxs, internalTxLoading } = useInternalTransactions(tx);
  const [selectedGenre, selectGenre] = useStateSelectedGenre();
  const [newTags, setNewTags] = useState<string[]>([]);
  const [noGenreError, setNoGenreError] = useState<string>();

  const genre = useMemo(() => {
    return getGenre(offchainItem.genre);
  }, [offchainItem.genre]);

  const claimable = useMemo(() => {
    if (!account) return false;
    return (
      (account === offchainItem.from.toLowerCase() &&
        (!offchainItem.fromSig || offchainItem.fromSig === "")) ||
      (account === offchainItem.to.toLowerCase() &&
        (!offchainItem.toSig || offchainItem.toSig === ""))
    );
  }, [account, offchainItem.txHash]);

  const reclaimable = useMemo(() => {
    if (!account) return false;
    if (
      cvoxels &&
      !cvoxels.find(
        (cv) => cv.txHash.toLowerCase() === offchainItem.txHash.toLowerCase()
      )
    )
      return true;
    return false;
  }, [account, offchainItem.txHash, cvoxels]);

  const handleReclaim = () => {
    if (offchainItem.genre) {
      reClaim(tx, offchainItem);
      return;
    }
    if (!offchainItem.genre && !selectedGenre) {
      setNoGenreError("Please select genre");
      return;
    }
    setNoGenreError("");
    const offchainItemWithGenre: CVoxelMetaDraft = {
      ...offchainItem,
      genre: selectedGenre?.value,
      tags: newTags,
    };
    reClaim(tx, offchainItemWithGenre);
  };

  return (
    <div className="w-full h-fit bg-white text-left shadow-lg p-5 mb-4">
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Title</p>
      </div>
      <div className="mb-3">
        <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">
          {offchainItem.summary}
        </p>
      </div>

      {/* detail */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Description(optional)</p>
      </div>
      <div className="mb-3">
        <textarea
          className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm"
          rows={3}
          readOnly
          value={offchainItem.detail || "No Description"}
        />
      </div>

      {/* GenreList */}
      {genre ? (
        <>
          <div className="flex flex-wrap items-center">
            <p className="font-semibold">Genre</p>
          </div>
          <div className="mb-3 w-full">
            <GenreBadge
              text={genre.label}
              baseColor={genre.bgColor}
              isSelected={true}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center">
            <p className="font-semibold">
              Genre
              {noGenreError && (
                <span className="cols-span-1 px-3 text-xs text-red-600">
                  {noGenreError}
                </span>
              )}
            </p>
          </div>
          <div className="mb-3 w-full">
            <GenreList
              handleGenre={(g) => selectGenre(g)}
              genre={selectedGenre?.label}
            />
          </div>
          <div className="flex flex-wrap items-center">
            <p className="font-semibold">Tags</p>
          </div>
          <div className="mb-3 w-full">
            <TagForm handleTags={(tags) => setNewTags(tags)} tags={newTags} />
          </div>
        </>
      )}

      {/* tags */}
      {offchainItem.tags && offchainItem.tags.length > 0 && (
        <>
          <div className="flex flex-wrap items-center">
            <p className="font-semibold">Tags</p>
          </div>
          <div className="mb-3 w-full">
            <>
              {offchainItem.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
            </>
          </div>
        </>
      )}

      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Deliverable link(optional)</p>
      </div>
      <div className="mb-3">
        <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">
          {offchainItem.deliverable || "No Deliverable"}
        </p>
      </div>
      {claimable && (
        <div className="text-right py-4 space-x-4 flex justify-end items-center">
          {connectionStatus === "connecting" && <CommonSpinner />}
          <Button
            text={
              connectionStatus === "connected"
                ? "Create"
                : connectionStatus === "connecting"
                ? "Connecitng..."
                : "Connect DID for Create"
            }
            buttonType={"button"}
            onClick={() => onClaim(tx, offchainItem)}
            color={connectionStatus === "connected" ? "grad-blue" : "grad-red"}
          />
        </div>
      )}
      {!claimable && reclaimable && (
        <div className="text-right py-4 space-x-4 flex justify-end items-center">
          {connectionStatus === "connecting" && <CommonSpinner />}
          <Button
            text={
              connectionStatus === "connected"
                ? "Re-Create"
                : connectionStatus === "connecting"
                ? "Connecitng..."
                : "Connect DID for Re-Create"
            }
            buttonType={"button"}
            onClick={() => handleReclaim()}
            color={connectionStatus === "connected" ? "grad-blue" : "grad-red"}
          />
        </div>
      )}
      <InternalTransactionContainer
        tx={tx}
        internalTxLoading={internalTxLoading}
        internalTxs={internalTxs}
      />
    </div>
  );
};
