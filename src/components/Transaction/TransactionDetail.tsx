import { FC, useMemo, useState } from "react";
import {TransactionLogWithChainId} from "@/interfaces";
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
import { getPkhDIDFromAddress,WorkCredentialWithId } from "vess-sdk";
import { connectionStatusType } from "@/recoilstate/account";

type TransactionDetailProps = {
  tx: TransactionLogWithChainId;
  offchainItem: WorkCredentialWithId;
  connectionState?: connectionStatusType;
  onClaim: (
    tx: TransactionLogWithChainId,
    offchainItem: WorkCredentialWithId
  ) => void;
  reClaim: (
    tx: TransactionLogWithChainId,
    offchainItem: WorkCredentialWithId
  ) => void;
  account?: string;
  credentials?: WorkCredentialWithId[];
};
export const TransactionDetail: FC<TransactionDetailProps> = ({
  account,
  tx,
  offchainItem,
  connectionState,
  credentials,
  onClaim,
  reClaim,
}) => {
  const { internalTxs, internalTxLoading } = useInternalTransactions(tx);
  const [selectedGenre, selectGenre] = useStateSelectedGenre();
  const [newTags, setNewTags] = useState<string[]>([]);
  const [noGenreError, setNoGenreError] = useState<string>();

  const genre = useMemo(() => {
    return getGenre(offchainItem.subject.work?.genre);
  }, [offchainItem.subject.work?.genre]);

  const claimable = useMemo(() => {
    if (!account || !offchainItem.subject.tx) return false;
    const myDID = getPkhDIDFromAddress(account.toLowerCase())
    return myDID != offchainItem.subject.work?.id && (account.toLowerCase() === offchainItem.subject.tx.from?.toLowerCase() || account.toLowerCase() === offchainItem.subject.tx.to?.toLowerCase())
      
  }, [account, offchainItem.subject.tx]);

  const reclaimable = useMemo(() => {
    if (!account) return false;
    if (
      credentials &&
      !credentials.find(
        (crdl) => crdl.subject.tx?.txHash?.toLowerCase() === offchainItem.subject.tx?.txHash.toLowerCase()
      )
    )
      return true;
    return false;
  }, [account, offchainItem.subject.tx?.txHash, credentials]);

  const handleReclaim = () => {
    if (offchainItem.subject.work?.genre) {
      reClaim(tx, offchainItem);
      return;
    }
    if (!offchainItem.subject.work?.genre && !selectedGenre) {
      setNoGenreError("Please select genre");
      return;
    }
    setNoGenreError("");
    let offchainItemWithGenre: WorkCredentialWithId = offchainItem
    if(!offchainItemWithGenre.subject.work) {
      return;
    }
    offchainItemWithGenre.subject.work.genre = selectedGenre?.value
    offchainItemWithGenre.subject.work.tags = newTags
    reClaim(tx, offchainItemWithGenre);
  };

  return (
    <div className="w-full h-fit text-left shadow-lg p-5 mb-4 bg-light-surface-2 dark:bg-dark-surface-2 border border-light-on-surface-variant dark:border-dark-on-surface-variant border-t-0 rounded-b-lg">
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Title</p>
      </div>
      <div className="mb-3">
        <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm bg-light-surface-variant dark:bg-dark-surface-variant">
          {offchainItem.subject.work?.summary}
        </p>
      </div>

      {/* detail */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Description(optional)</p>
      </div>
      <div className="mb-3">
        <textarea
          className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm bg-light-surface-variant dark:bg-dark-surface-variant"
          rows={3}
          readOnly
          value={offchainItem.subject.work?.detail || "No Description"}
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
      {offchainItem.subject.work?.tags && offchainItem.subject.work?.tags.length > 0 && (
        <>
          <div className="flex flex-wrap items-center">
            <p className="font-semibold">Tags</p>
          </div>
          <div className="mb-3 w-full">
            <>
              {offchainItem.subject.work?.tags.map((tag) => {
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
        {offchainItem.subject.deliverables &&
          offchainItem.subject.deliverables?.length > 0 &&
          offchainItem.subject.deliverables?.map((d) => {
            return (
              <p
                key={d.value}
                className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm"
              >
                {d.value}
              </p>
            );
          })}
        {!offchainItem.subject.deliverables ||
          (offchainItem.subject.deliverables.length === 0 && (
            <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">
              No Deliverable
            </p>
          ))}
      </div>
      {claimable && (
        <div className="text-right py-4 space-x-4 flex justify-end items-center">
          {connectionState === "connecting" && <CommonSpinner />}
          <Button
            text={
              connectionState === "connected"
                ? "Create"
                : connectionState === "connecting"
                ? "Connecitng..."
                : "Connect DID for Create"
            }
            buttonType={"button"}
            onClick={() => onClaim(tx, offchainItem)}
            color={
              connectionState === "connected" ? "primary" : "secondary"
            }
          />
        </div>
      )}
      {!claimable && reclaimable && (
        <div className="text-right py-4 space-x-4 flex justify-end items-center">
          {connectionState === "connecting" && <CommonSpinner />}
          <Button
            text={
              connectionState === "connected"
                ? "Re-Create"
                : connectionState === "connecting"
                ? "Connecitng..."
                : "Connect DID for Re-Create"
            }
            buttonType={"button"}
            onClick={() => handleReclaim()}
            color={
              connectionState === "connected" ? "primary" : "secondary"
            }
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
