import { FC, useCallback, useContext, useEffect, useMemo } from "react";
import { CVoxelMetaDraft } from "@/interfaces";
import { Canvas } from "@react-three/fiber";
import { OneVoxelVisualizerPresenter } from "@/components/CVoxel/OneVoxelVisualizerPresenter";
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
import { formatBigNumber } from "@/utils/ethersUtil";
import { useVoxStyler } from "@/hooks/useVoxStyler";
import { DIDContext } from "@/context/DIDContext";
import { useWalletAccount } from "@/hooks/useWalletAccount";

type Props = {
  offchainItem: CVoxelMetaDraft;
  onVerify: (tx: CVoxelMetaDraft) => void;
  isSinglePageForVerify?: boolean
};

export const SigRequestDetail: FC<Props> = ({
  offchainItem,
  onVerify,
  isSinglePageForVerify = false
}) => {
  const {did, account} = useContext(DIDContext)
  const { connectWallet } = useWalletAccount();
  const isPayer = useMemo(() => {
    return account?.toLowerCase() === offchainItem.from.toLowerCase();
  }, [account, offchainItem]);

  const isEligibleToVerify = useMemo(() => {
    if(!(account)) return false
    return (!offchainItem.toSig && offchainItem.to.toLowerCase()===account.toLowerCase()) || (!offchainItem.fromSig && offchainItem.from.toLowerCase()===account.toLowerCase())
  },[account, offchainItem])

  const isYourRequest = useMemo(() => {
    if(!(account)) return false
    return (offchainItem.toSig && offchainItem.to.toLowerCase()===account.toLowerCase()) || (offchainItem.fromSig && offchainItem.from.toLowerCase()===account.toLowerCase())
  },[account, offchainItem])

  const isMe = useCallback((address: string) => {
    if(!account) return false
    return address.toLowerCase() === account.toLowerCase()
  },[account])

  const exploreLink = useMemo(() => {
    if (!offchainItem || !offchainItem.txHash) return;
    return getExploreLink(offchainItem.txHash, offchainItem.networkId);
  }, [offchainItem?.txHash, offchainItem?.networkId]);

  const connect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.log("error:", error);
    }
  };


  // convert display
  const { displayVoxel, setVoxelForDisplay } = useVoxStyler();

  useEffect(() => {
    let isMounted = true;
    setVoxelForDisplay({ ...offchainItem, id: "0" });
    return () => {
      isMounted = false;
    };
  }, [offchainItem]);

  // verify
  const handleVerify = useCallback(() => {
    onVerify(offchainItem);
  }, [onVerify, offchainItem]);

  // component
  const PcDirection = () => {
    return isPayer ? (
      <div className="flex items-center space-x-3">
        <NamePlate address={offchainItem?.from ?? ""} isMe={isMe(offchainItem.from)} hasBackgroundColor />
        <RightArrow />
        <NamePlate address={offchainItem?.to ?? ""} />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <NamePlate address={offchainItem?.to ?? ""} isMe={isMe(offchainItem.to)} hasBackgroundColor />
        <LeftArrow />
        <NamePlate address={offchainItem?.from ?? ""} />
      </div>
    );
  };

  const SpDirection = () => {
    return isPayer ? (
      <div className="flex items-center space-x-3">
        <NamePlate did={did} isMe hasBackgroundColor withoutIcon />
        <RightArrow />
        <NamePlate address={offchainItem?.to ?? ""} withoutIcon />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <NamePlate did={did} isMe hasBackgroundColor withoutIcon />
        <LeftArrow />
        <NamePlate address={offchainItem?.from ?? ""} withoutIcon />
      </div>
    );
  };

  return (
    <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-2xl overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
      <div className="lg:flex w-full">
        <div className="flex-initial w-full lg:w-52 h-52 relative bg-light-surface dark:bg-dark-surface rounded-br-2xl rounded-bl-2xl lg:rounded-bl-none">
          <Canvas>
            <OneVoxelVisualizerPresenter
              zoom={6}
              disableHover
              voxelForDisplay={displayVoxel}
            />
          </Canvas>

          <div className="absolute bg-light-sig-request-layer dark:bg-dark-sig-request-layer top-0 bottom-0 left-0 right-0 opacity-70">
            <div className="h-full flex items-center p-3 justify-center">
              <p className="text-light-surface dark:text-dark-surface font-medium text-2xl">
                Signature
                <br /> Request
              </p>
            </div>
          </div>
        </div>

        <div className="text-left w-full mx-3 sm:mx-8 py-3 lg:py-8 lg:border-b-2 border-b-light-inverse-primary dark:border-b-dark-inverse-primary">
          {offchainItem?.createdAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
              {convertTimestampToDateStr(offchainItem.createdAt)}
            </div>
          )}

          {offchainItem?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium line-clamp-3">
              {offchainItem?.summary}
            </div>
          )}

          <div className="flex mt-2">
            {offchainItem?.genre ? (
              <div className="mr-2">
                <GenreBadge
                  text={offchainItem.genre}
                  baseColor={
                    getGenre(offchainItem.genre)?.bgColor || "bg-[#b7b7b7]"
                  }
                  isSelected={true}
                />
              </div>
            ) : (
              <></>
            )}
            {offchainItem?.tags &&
              offchainItem.tags.map((tag) => {
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

        {offchainItem?.deliverables && offchainItem.deliverables.length > 0 && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DELIVERABLES
            </p>

            {offchainItem?.deliverables.map((deliverable) =>
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

        {offchainItem?.detail && (
          <div>
            <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
              DESCRIPTION
            </p>

            <div className="text-light-on-surface dark:text-dark-on-surface font-medium">
              {offchainItem?.detail}
            </div>
          </div>
        )}
        <div className="text-right">
          {isSinglePageForVerify ? (
            <>
              {!account ? (
                <Button
                  text="Connect Wallet"
                  color="primary"
                  buttonType="button"
                  onClick={connect}
                />
            ): (
              <>
                {isEligibleToVerify ? (
                  <Button
                    text="Verify"
                    color="primary"
                    buttonType="button"
                    onClick={handleVerify}
                  />
                ): (
                  <Button
                    text={isYourRequest ? "Your Request" : "Not Eligible"}
                    color="gray"
                    buttonType="button"
                    disabled={true}
                  />
                )}
              </>
            )}
            </>
          ): (
            <Button
              text="Verify"
              color="primary"
              buttonType="button"
              onClick={handleVerify}
            />
          )}
        </div>
      </div>

      <div className="bg-light-outline dark:bg-dark-outline h-[1px] w-full" />

      <div className="lg:flex w-full px-3 sm:px-8 py-6 space-y-3 lg:space-y-0 lg:space-x-6">
        {offchainItem?.value && (
          <a
            className="flex items-center flex-wrap"
            href={exploreLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex-initial flex lg:block">
              <div className="text-lg font-medium">
                {formatBigNumber(
                  offchainItem?.value,
                  4,
                  offchainItem?.tokenDecimal.toString()
                )}{" "}
                {offchainItem.tokenSymbol || offchainItem.networkId}
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

        {offchainItem?.txHash && (
          <div className="flex-auto text-left">
            <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
              Tx Hash
            </div>
            <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
              {shortenStr(offchainItem?.txHash, 8)}
            </div>
          </div>
        )}

        {offchainItem?.issuedTimestamp && (
          <div className="flex-auto text-left">
            <div className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
              Timestamp
            </div>
            <div className="bg-light-surface dark:bg-dark-surface px-2 py-1 rounded-lg font-medium">
              {convertTimestampToDateStrLocaleUS(offchainItem?.issuedTimestamp)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
