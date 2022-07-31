import { FC, useEffect, useMemo, useState } from "react";
import {
  CVoxel,
  CVoxelItem as ICVoxelItem,
  CVoxelMetaDraft,
} from "@/interfaces";
import { Canvas } from "@react-three/fiber";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import {
  convertTimestampToDateStr,
  convertTimestampToDateStrLocaleUS,
} from "@/utils/dateUtil";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { NamePlate } from "@/components/common/NamePlate";
import LeftArrow from "@/components/CVoxel/VoxelListItem/left-arrow.svg";
import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
import { shortenStr } from "@/utils/objectUtil";
import { Button } from "@/components/common/button/Button";
import { useUpdateCVoxel } from "@/hooks/useUpdateCVoxel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { getExploreLink } from "@/utils/etherscanUtils";
import { ShareButton } from "@/components/common/button/shareButton/ShareButton";
import { formatBigNumber } from "@/utils/ethersUtil";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { getDIDFromAddress } from "@/utils/addressUtil";

type Props = {
  item: ICVoxelItem;
  offchainItems?: CVoxelMetaDraft[];
  notifyUpdated?: () => void;
  isOwner: boolean;
};

export const VoxelDetail: FC<Props> = ({
  item,
  offchainItems,
  notifyUpdated,
  isOwner,
}) => {
  // item detail
  const { cVoxelItem, update } = useUpdateCVoxel(item.id);
  const detailItem = useMemo(() => {
    return cVoxelItem.content || null;
  }, [cVoxelItem.content, cVoxelItem]);

  // update
  const updatable = useMemo(() => {
    if (!detailItem) return false;
    if (detailItem && detailItem.toSig && detailItem.fromSig) return false;
    const item = offchainItems?.find(
      (item) => item.txHash?.toLowerCase() === detailItem.txHash?.toLowerCase()
    );
    if (!item) return false;
    return (
      (detailItem.isPayer && !detailItem.toSig && item.toSig) ||
      (!detailItem.isPayer && !detailItem.fromSig && item.fromSig)
    );
  }, [offchainItems, detailItem]);

  const offchainItem = useMemo(() => {
    return offchainItems?.find((offchain) => offchain.txHash === item.txHash);
  }, [offchainItems, item]);

  const handleUpdate = async () => {
    if (!(offchainItem && detailItem)) return false;
    if (updatable) {
      const newCVoxel: CVoxel = detailItem.isPayer
        ? {
            ...detailItem,
            toSig: offchainItem.toSig,
            toSigner: offchainItem.toSigner,
          }
        : {
            ...detailItem,
            fromSig: offchainItem.fromSig,
            fromSigner: offchainItem.fromSigner,
          };
      await update(newCVoxel);
      if (notifyUpdated) {
        notifyUpdated();
      }
    }
  };

  const exploreLink = useMemo(() => {
    if (!detailItem || !detailItem.txHash) return;
    return getExploreLink(detailItem.txHash, detailItem.networkId);
  }, [detailItem?.txHash, detailItem?.networkId]);

  const { did: myDid } = useMyCeramicAcount();

  const [toDid, setToDid] = useState<string>();
  useEffect(() => {
    if (toDid == undefined && !!detailItem?.to) {
      const f = async () => {
        const did = await getDIDFromAddress(detailItem?.to);
        setToDid(did);
      };
      f();
    }
  }, [detailItem?.to]);

  const [fromDid, setFromDid] = useState<string>();
  useEffect(() => {
    if (fromDid == undefined && !!detailItem?.from) {
      const f = async () => {
        const did = await getDIDFromAddress(detailItem?.from);
        setFromDid(did);
      };
      f();
    }
  }, [detailItem?.from]);

  // component
  const PcDirection = () => {
    return item.isPayer ? (
      <div className="flex items-center space-x-3">
        <NamePlate did={fromDid} address={detailItem?.from ?? ""} isMe={fromDid == myDid} hasBackgroundColor />
        <RightArrow />
        <NamePlate address={detailItem?.to ?? ""} />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <NamePlate did={toDid} address={detailItem?.to ?? ""} isMe={toDid == myDid} hasBackgroundColor />
        <LeftArrow />
        <NamePlate address={detailItem?.from ?? ""} />
      </div>
    );
  };

  const SpDirection = () => {
    return item.isPayer ? (
      <div className="flex items-center space-x-3">
        <NamePlate did={myDid} isMe hasBackgroundColor withoutIcon />
        <RightArrow />
        <NamePlate address={detailItem?.to ?? ""} withoutIcon />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <NamePlate did={myDid} isMe hasBackgroundColor withoutIcon />
        <LeftArrow />
        <NamePlate address={detailItem?.from ?? ""} withoutIcon />
      </div>
    );
  };

  return (
    <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-2xl overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
      <div className="lg:flex w-full">
        <div className="flex-initial w-full lg:w-52 h-52 relative bg-light-surface dark:bg-dark-surface rounded-br-2xl rounded-bl-2xl lg:rounded-bl-none">
          <Canvas>
            <VisualizerPresenter ids={[item.id]} zoom={6} disableHover />
          </Canvas>

          <div className="absolute right-4 bottom-4">
            <ShareButton valiant="icon" voxelID={item.id} />
          </div>
        </div>

        <div className="text-left w-full space-y-3 mx-3 sm:mx-8 py-3 lg:py-8 lg:border-b-2 border-b-light-inverse-primary dark:border-b-dark-inverse-primary">
          {detailItem?.createdAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
              {convertTimestampToDateStr(detailItem.createdAt)}
            </div>
          )}

          {detailItem?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium line-clamp-3">
              {detailItem?.summary}
            </div>
          )}

          <div className="flex">
            {detailItem?.genre ? (
              <GenreBadge
                text={detailItem.genre}
                baseColor={
                  getGenre(detailItem.genre)?.bgColor || "bg-[#b7b7b7]"
                }
                isSelected={true}
              />
            ) : (
              <></>
            )}
            {detailItem?.tags &&
              detailItem.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-8 pb-3 lg:py-8 text-left space-y-8">
        <div>
          <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
            PAYER & PAYEE
          </p>
          <div className="hidden lg:block">
            <PcDirection />
          </div>
          <div className="lg:hidden">
            <SpDirection />
          </div>
        </div>

        {/* TODO: status implement */}
        {/*<div>*/}
        {/*  <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">*/}
        {/*    STATUS*/}
        {/*  </p>*/}
        {/*</div>*/}

        {detailItem?.deliverables && detailItem.deliverables.length > 0 && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DELIVERABLES
            </p>

            {detailItem?.deliverables.map((deliverable) =>
              deliverable.value.startsWith("http") ? (
                <a
                  className="flex items-center flex-wrap"
                  href={`${deliverable.value}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-light-secondary dark:text-dark-secondary text-md">
                    {deliverable.value}
                  </p>
                </a>
              ) : (
                <p className="text-md text-secondary">
                  {shortenStr(deliverable.value)}
                </p>
              )
            )}
          </div>
        )}

        {detailItem?.detail && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DESCRIPTION
            </p>

            <div className="text-light-on-surface dark:text-dark-on-surface font-medium">
              {detailItem?.detail}
            </div>
          </div>
        )}

        {updatable && isOwner && (
          <div className="text-right">
            <Button
              text="Update"
              color="primary"
              buttonType="button"
              onClick={handleUpdate}
            />
          </div>
        )}
      </div>

      <div className="bg-light-outline dark:bg-dark-outline h-[1px] w-full" />

      <div className="lg:flex w-full px-3 sm:px-8 py-6 space-y-3 lg:space-y-0 lg:space-x-6">
        {detailItem?.value && (
          <a
            className="flex items-center flex-wrap"
            href={exploreLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex-initial flex lg:block">
              <div className="text-lg font-medium">
                {formatBigNumber(
                  detailItem?.value,
                  8,
                  detailItem?.tokenDecimal.toString()
                )}{" "}
                {detailItem.tokenSymbol || detailItem.networkId}
              </div>
              <div className="flex items-center justify-center">
                <div className="ml-2 lg:ml-0 text-xs text-light-on-surface-variant dark:text-dark-on-surface-variant">
                  Explorer
                </div>
                <FontAwesomeIcon
                  className="w-3 h-3 ml-1 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                  icon={faExternalLink}
                />
              </div>
            </div>
          </a>
        )}

        {detailItem?.txHash && (
          <div className="flex-auto text-left">
            <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
              Tx Hash
            </div>
            <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
              {shortenStr(detailItem?.txHash, 30)}
            </div>
          </div>
        )}

        {detailItem?.issuedTimestamp && (
          <div className="flex-auto text-left">
            <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
              Timestamp
            </div>
            <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
              {convertTimestampToDateStrLocaleUS(detailItem?.issuedTimestamp)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
