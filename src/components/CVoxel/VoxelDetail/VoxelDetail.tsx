import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OneVoxelVisualizerPresenter } from "../OneVoxelVisualizerPresenter";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { getExploreLink } from "@/utils/etherscanUtils";
import { ShareButton } from "@/components/common/button/shareButton/ShareButton";
import { formatBigNumber } from "@/utils/ethersUtil";
import { getAddressFromPkhDID } from "@/utils/ceramicUtils";
import { DIDContext } from "@/context/DIDContext";
import { CopyRequestURLButton } from "./CopyRequestURLButton";
import { useWorkCredential, useWorkCredentialRecord } from "@/hooks/useWorkCredential";
import { WorkCredentialWithId } from "@/interfaces";
import { WorkCredential } from "@/__generated__/types/WorkCredential";
import { useOffchainItem } from "@/hooks/useOffchainList";

type Props = {
  itemId: string;
  offchainItems?: WorkCredentialWithId[];
  notifyUpdated?: () => void;
  isOwner: boolean;
};

export const VoxelDetail: FC<Props> = ({
  itemId,
  offchainItems,
  notifyUpdated,
  isOwner,
}) => {
  // item detail
  const item = useWorkCredentialRecord(itemId);
  const { update } = useWorkCredential();
  
  const detailItem = useMemo(() => {
    return item.content || null;
  }, [item.content, item]);

  const {getOffchainItem} = useOffchainItem()

  const [offchainItem, setOffchainItem] = useState<WorkCredentialWithId | null>(null)

  useEffect(() => {
    const fetch = async(id:string) => {
      const existed = offchainItems?.find((offchain) => offchain.subject.tx?.txHash === detailItem?.subject.tx?.txHash)
      if(existed){
        setOffchainItem(existed)
        return
      }
      const offchain = await getOffchainItem(id)
      setOffchainItem(offchain)
    }
    if(!offchainItem && detailItem){
      fetch(itemId)
    }
  },[detailItem])

  // update
  const updatable = useMemo(() => {
    if (!(detailItem && offchainItem)) return false;
    const {signature} = detailItem
    return !signature?.partnerSig && !signature?.agentSig && (!!offchainItem.signature?.partnerSig || !!offchainItem.signature?.agentSig)
  }, [offchainItem, detailItem]);


  // user is the owner but offchainItem doesn't have sigs of both payer and payee
  const isSemiCRDL = useMemo(() => {
    if(!offchainItem) return false
    const {signature} = offchainItem
    return signature?.holderSig && !signature?.partnerSig
  },[offchainItem])

  const handleUpdate = async () => {
    if (!(offchainItem && detailItem)) return false;
    if (updatable) {
      let newItem: WorkCredential = {...detailItem}
      if(offchainItem.signature?.partnerSigner && offchainItem.signature?.partnerSig){
        newItem.signature = {...detailItem.signature, partnerSigner: offchainItem.signature?.partnerSigner,partnerSig: offchainItem.signature?.partnerSig }
      }
      if(offchainItem.signature?.agentSigner && offchainItem.signature?.agentSig){
        newItem.signature = {...detailItem.signature, agentSigner: offchainItem.signature?.agentSigner,agentSig: offchainItem.signature?.agentSig }
      }

      await update(itemId, newItem);
      if (notifyUpdated) {
        notifyUpdated();
      }
    }
  };

  const exploreLink = useMemo(() => {
    if (!detailItem || !detailItem.subject.tx?.txHash) return;
    return getExploreLink(detailItem.subject.tx?.txHash, detailItem.subject.tx?.networkId);
  }, [detailItem?.subject.tx?.txHash, detailItem?.subject.tx?.networkId]);

  const {did: myDid} = useContext(DIDContext)

  const holderDID = useMemo(() => {
    if(!detailItem) return ""
    return detailItem?.subject.work?.id
  },[detailItem])

  const partnerDID = useMemo(() => {
    if(!detailItem) return ""
    return detailItem.subject.client?.value
  },[detailItem])

  const isPayer = useMemo(() => {
    return detailItem?.subject.tx ? detailItem?.subject.tx?.isPayer : false
  },[detailItem?.subject.tx])

  // component
  const PcDirection = () => {
    return <div className="flex items-center space-x-3">
      <NamePlate
        did={holderDID}
        isMe={holderDID == myDid}
        hasBackgroundColor
      />
      {isPayer ? (
        <RightArrow />
      ): (
        <LeftArrow />
      )}
      <NamePlate did={partnerDID} address={partnerDID ? getAddressFromPkhDID(partnerDID) : ""}/>
  </div>
  };

  const SpDirection = () => {
    return <div className="flex items-center space-x-3">
        <NamePlate
          did={holderDID}
          isMe={holderDID == myDid}
          hasBackgroundColor
          withoutIcon
        />
        {isPayer ? (
          <RightArrow />
        ): (
          <LeftArrow />
        )}
        <NamePlate did={partnerDID} address={partnerDID ? getAddressFromPkhDID(partnerDID) : ""} withoutIcon />
    </div>
  };

  return (
    <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-2xl overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
      <div className="lg:flex w-full">
        <div className="flex-initial w-full lg:w-52 h-52 relative bg-light-surface dark:bg-dark-surface rounded-br-2xl rounded-bl-2xl lg:rounded-bl-none">
          {detailItem && (
            <Canvas>
              <OneVoxelVisualizerPresenter zoom={6} disableHover workCredential={{...detailItem, backupId:itemId}} />
            </Canvas>
          )}

          <div className="absolute right-4 bottom-4">
            <ShareButton valiant="icon" voxelID={itemId} isOwner={isOwner}/>
          </div>
        </div>

        <div className="text-left w-full mx-3 sm:mx-8 py-3 lg:py-8 lg:border-b-2 border-b-light-inverse-primary dark:border-b-dark-inverse-primary">
          {detailItem?.createdAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-base">
              {convertTimestampToDateStr(detailItem.createdAt)}
            </div>
          )}

          {detailItem?.subject.work?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium line-clamp-3">
              {detailItem?.subject.work?.summary}
            </div>
          )}

          <div className="flex mt-2 flex-wrap">
            {detailItem?.subject.work?.genre ? (
              <div className="mr-2">
                <GenreBadge
                  text={detailItem.subject.work?.genre || "Other"}
                  baseColor={
                    getGenre(detailItem.subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                  }
                  isSelected={true}
                />
              </div>
            ) : (
              <></>
            )}
            {detailItem?.subject.work?.tags &&
              detailItem?.subject.work?.tags.map((tag) => {
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

        {detailItem?.subject.deliverables && detailItem.subject.deliverables.length > 0 && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DELIVERABLES
            </p>

            {detailItem?.subject.deliverables.map((deliverable) =>
            <a
              className="flex items-center flex-wrap"
              href={`${deliverable.format==="url" ? deliverable.value : `https://dweb.link/ipfs/${deliverable.value}`}`}
              target="_blank"
              rel="noreferrer"
              key={deliverable.value}
            >
              <p className="text-light-secondary dark:text-dark-secondary text-md">
                {deliverable.format==="url" ? deliverable.value : shortenStr(deliverable.value)}
              </p>
            </a>
            )}
          </div>
        )}

        {detailItem?.subject.work?.detail && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DESCRIPTION
            </p>

            <div className="text-light-on-surface dark:text-dark-on-surface font-medium">
              {detailItem?.subject.work?.detail}
            </div>
          </div>
        )}
        <div className="w-full flex items-center justify-end space-x-1 pt-7">
          {(isSemiCRDL && offchainItem && offchainItem.backupId) && (
            <div className="text-right">
              <CopyRequestURLButton id={offchainItem.backupId} />
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
      </div>

      <div className="bg-light-outline dark:bg-dark-outline h-[1px] w-full" />

      <div className="lg:flex w-full px-3 sm:px-8 py-6 space-y-3 lg:space-y-0 lg:space-x-6">
          {detailItem?.subject.work?.value && (
            <a
              className="flex items-center flex-wrap"
              href={exploreLink}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex-initial flex lg:block">
                <div className="text-lg font-medium">
                  {formatBigNumber(
                    detailItem?.subject.tx?.value || detailItem?.subject.work?.value,
                    8,
                    detailItem?.subject.tx?.value ? detailItem?.subject.tx?.tokenDecimal?.toString(): "6"
                  )}{" "}
                  {detailItem.subject.tx?.tokenSymbol || detailItem.subject.tx?.networkId}
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

          {detailItem?.subject.tx?.txHash && (
            <div className="flex-auto text-left">
              <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
                Tx Hash
              </div>
              <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
                {shortenStr(detailItem?.subject.tx?.txHash, 30)}
              </div>
            </div>
          )}

          {detailItem?.subject.tx?.issuedTimestamp && (
            <div className="flex-auto text-left">
              <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
                Timestamp
              </div>
              <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
                {convertTimestampToDateStrLocaleUS(detailItem?.subject.tx?.issuedTimestamp)}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
