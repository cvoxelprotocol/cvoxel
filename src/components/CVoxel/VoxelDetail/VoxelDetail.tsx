import { FC, useEffect, useMemo, useState } from "react";
import {
  convertTimestampToDateStr,
  convertTimestampToDateStrLocaleUS,
} from "@/utils/dateUtil";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
import { shortenStr } from "@/utils/objectUtil";
import { Button } from "@/components/common/button/Button";

import { getExploreLink } from "@/utils/etherscanUtils";
import { ShareButton } from "@/components/common/button/shareButton/ShareButton";
import { formatBigNumber } from "@/utils/ethersUtil";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { CopyRequestURLButton } from "./CopyRequestURLButton";
import { useWorkCredential } from "@/hooks/useWorkCredential";
import { WorkCredentialWithId,WorkCredential } from "vess-sdk";
import { useOffchainItem } from "@/hooks/useOffchainList";
import ExternalLinkIcon from "@/components/common/button/externalLink.svg";
import dynamic from "next/dynamic";

const UserPlate = dynamic(
  () => import("@/components/common/UserPlate"),
  {
    ssr: false,
  }
);

const OneVoxelVisualizerPresenterWrapper = dynamic(
  () => import("@/components/CVoxel/OneVoxelVisualizerPresenterWrapper"),
  {
    ssr: false,
  }
);


type Props = {
  crdl?: WorkCredentialWithId;
  offchainItems?: WorkCredentialWithId[];
  notifyUpdated?: () => void;
  isOwner: boolean;
};

export const VoxelDetail: FC<Props> = ({
  crdl,
  offchainItems,
  notifyUpdated,
  isOwner,
}) => {

  const { update } = useWorkCredential();

  const {getOffchainItem} = useOffchainItem()

  const [offchainItem, setOffchainItem] = useState<WorkCredentialWithId | null>(null)

  useEffect(() => {
    const fetch = async(id?:string) => {
      const existed = offchainItems?.find((offchain) => offchain.subject.tx?.txHash === crdl?.subject.tx?.txHash)
      if(existed){
        setOffchainItem(existed)
        return
      }
      if(!id) return
      const offchain = await getOffchainItem(id.replace("ceramic://", ""))
      setOffchainItem(offchain)
    }
    if(!offchainItem && crdl){
      fetch(crdl?.ceramicId)
    }
  },[crdl])

  // update
  const updatable = useMemo(() => {
    if (!(crdl && offchainItem)) return false;
    const {signature} = crdl
    return !signature?.partnerSig && !signature?.agentSig && (!!offchainItem.signature?.partnerSig || !!offchainItem.signature?.agentSig)
  }, [offchainItem, crdl]);


  // user is the owner but offchainItem doesn't have sigs of both payer and payee
  const isSemiCRDL = useMemo(() => {
    if(!offchainItem) return false
    const {signature} = offchainItem
    return signature?.holderSig && !signature?.partnerSig
  },[offchainItem])

  const handleUpdate = async () => {
    if (!(offchainItem && crdl && crdl.ceramicId)) return false;
    if (updatable) {
      let newItem: WorkCredential = {...crdl}
      if(offchainItem.signature?.partnerSigner && offchainItem.signature?.partnerSig){
        newItem.signature = {...crdl.signature, partnerSigner: offchainItem.signature?.partnerSigner,partnerSig: offchainItem.signature?.partnerSig }
      }
      if(offchainItem.signature?.agentSigner && offchainItem.signature?.agentSig){
        newItem.signature = {...crdl.signature, agentSigner: offchainItem.signature?.agentSigner,agentSig: offchainItem.signature?.agentSig }
      }

      await update(crdl.ceramicId, newItem);
      if (notifyUpdated) {
        notifyUpdated();
      }
    }
  };

  const exploreLink = useMemo(() => {
    if (!crdl || !crdl.subject.tx?.txHash) return;
    return getExploreLink(crdl.subject.tx?.txHash, crdl.subject.tx?.networkId);
  }, [crdl?.subject.tx?.txHash, crdl?.subject.tx?.networkId]);

  const {did: myDid} = useDIDAccount()

  const holderDID = useMemo(() => {
    if(!crdl) return ""
    return crdl?.subject.work?.id
  },[crdl])

  const client = useMemo(() => {
    if(!crdl) return
    return crdl.subject.client
  },[crdl])

  // component
  const PcDirection = () => {
    return <div className="flex items-center space-x-3">
      <UserPlate
        client={{format: "DID", value: holderDID}}
        isMe={holderDID == myDid}
        hasBackgroundColor
      />
      <RightArrow />
      <UserPlate
        client={client}
        hasBackgroundColor
      />
  </div>
  };

  const SpDirection = () => {
    return <div className="flex items-center space-x-3">
      <UserPlate
        client={{format: "DID", value: holderDID}}
        isMe={holderDID == myDid}
        hasBackgroundColor
        withoutIcon
      />
        <RightArrow />
        <UserPlate
        client={client}
        hasBackgroundColor
        withoutIcon
      />
    </div>
  };

  return (
    <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-2xl overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
      <div className="lg:flex w-full">
        <div className="flex-initial w-full lg:w-52 h-52 relative bg-light-surface dark:bg-dark-surface rounded-br-2xl rounded-bl-2xl lg:rounded-bl-none">
          {crdl && (
            <OneVoxelVisualizerPresenterWrapper zoom={6} disableHover workCredential={crdl} />
          )}

          <div className="absolute right-4 bottom-4">
            <ShareButton valiant="icon" voxelID={crdl?.ceramicId} isOwner={isOwner}/>
          </div>
        </div>

        <div className="text-left w-full mx-3 sm:mx-8 py-3 lg:py-8 lg:border-b-2 border-b-light-inverse-primary dark:border-b-dark-inverse-primary">
          {crdl?.createdAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-base">
              {convertTimestampToDateStr(crdl.createdAt)}
            </div>
          )}

          {crdl?.subject.work?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium line-clamp-3">
              {crdl?.subject.work?.summary}
            </div>
          )}

          <div className="flex mt-2 flex-wrap">
            {crdl?.subject.work?.genre ? (
              <div className="mr-2">
                <GenreBadge
                  text={crdl.subject.work?.genre || "Other"}
                  baseColor={
                    getGenre(crdl.subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                  }
                  isSelected={true}
                />
              </div>
            ) : (
              <></>
            )}
            {crdl?.subject.work?.tags &&
              crdl?.subject.work?.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-8 pb-3 lg:py-8 text-left space-y-8 relative">
        <div>
          <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
            HOLDER & CLIENT
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

        {crdl?.subject.deliverables && crdl.subject.deliverables.length > 0 && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DELIVERABLES
            </p>

            {crdl?.subject.deliverables.map((deliverable) =>
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

        {crdl?.subject.work?.detail && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DESCRIPTION
            </p>

            <div className="text-light-on-surface dark:text-dark-on-surface font-medium">
              {crdl?.subject.work?.detail}
            </div>
          </div>
        )}
        <div className="w-full flex items-center justify-end space-x-1 pt-7">
          {(isSemiCRDL && offchainItem && offchainItem.ceramicId) && (
            <div className="text-right">
              <CopyRequestURLButton id={offchainItem.ceramicId} />
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
        <div className="absolute bottom-0 right-0 px-4 pb-1">
            {crdl?.subject.work?.platform && (
              <p className="text-light-on-primary-container dark:text-dark-on-error-container text-base">Via: {crdl?.subject.work?.platform}</p>
            )}
          </div>
      </div>

      <div className="bg-light-outline dark:bg-dark-outline h-[1px] w-full" />

      <div className="lg:flex w-full px-3 sm:px-8 py-6 space-y-3 lg:space-y-0 lg:space-x-6">
          {crdl?.subject.work?.value && (
            <a
              className="flex items-center flex-wrap"
              href={exploreLink}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex-initial flex lg:block">
                <div className="text-lg font-medium">
                  {(crdl?.subject.tx?.value || crdl?.subject.work?.value) ? (
                    <>
                      {formatBigNumber(
                        crdl?.subject.tx?.value || crdl?.subject.work?.value,
                        8,
                        crdl?.subject.tx?.value ? crdl?.subject.tx?.tokenDecimal?.toString(): "6"
                      )}{" "}
                      {crdl.subject.tx?.tokenSymbol || ""}
                    </>
                  ): (
                    <>
                    {"-"}
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <div className="ml-2 lg:ml-0 text-xs text-light-on-surface-variant dark:text-dark-on-surface-variant">
                    Explorer
                  </div>
                  <ExternalLinkIcon className="w-3 h-3 ml-1 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
                </div>
              </div>
            </a>
          )}

          {crdl?.subject.tx?.txHash && (
            <div className="flex-auto text-left">
              <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
                Tx Hash
              </div>
              <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
                {shortenStr(crdl?.subject.tx?.txHash, 30)}
              </div>
            </div>
          )}

          {crdl?.subject.tx?.issuedTimestamp && (
            <div className="flex-auto text-left">
              <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
                Timestamp
              </div>
              <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
                {convertTimestampToDateStrLocaleUS(crdl?.subject.tx?.issuedTimestamp)}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
