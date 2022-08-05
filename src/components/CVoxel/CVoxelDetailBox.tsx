import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { shortenStr } from "@/utils/objectUtil";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
// import { formatBigNumber } from "@/utils/ethersUtil";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { useCVoxelRecord } from "@/hooks/useCVoxel";
import { useStateCVoxelDetailBox } from "@/recoilstate";
import { Canvas } from "@react-three/fiber";
// import { useENS } from "@/hooks/useENS";
// import { CommonSpinner } from "@/components/common/CommonSpinner";
import clsx from "clsx";
import { ShareButton } from "@/components/common/button/shareButton/ShareButton";
import { TxDirection } from "@/components/common/TxDirection";
// import { NamePlate } from "@/components/common/NamePlate";
// import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
// import LeftArrow from "@/components/CVoxel/VoxelListItem/left-arrow.svg";
import { useWalletAccount } from "@/hooks/useWalletAccount";

export const CVoxelDetailBox: FC<{}> = () => {
  const [box] = useStateCVoxelDetailBox();
  const { account } = useWalletAccount();

  const cVoxelItem = useCVoxelRecord(box?.item.id);

  const detailItem = useMemo(() => {
    if (cVoxelItem.isError) {
      return null;
    }
    return cVoxelItem.content || null;
  }, [cVoxelItem.content, cVoxelItem]);

  const isOwner = useMemo(() => {
    if(!account) return false
    return detailItem?.from.toLowerCase() === account.toLowerCase() || detailItem?.to.toLowerCase() === account.toLowerCase()
  },[account,detailItem])

  // const { ens: fromEns, ensLoading: fromEnsLoading } = useENS(detailItem?.from);
  // const { ens: toEns, ensLoading: toEnsLoading } = useENS(detailItem?.to);

  // const offchainItem = useMemo(() => {
  //   return box?.offchainItems?.find(
  //     (offchain) => offchain.txHash === box?.item.txHash
  //   );
  // }, [box?.offchainItems, box?.item]);

  // const fiatVal = useMemo(() => {
  //   if (detailItem && detailItem.fiatValue) {
  //     return detailItem.fiatValue;
  //   } else if (offchainItem && offchainItem.fiatValue) {
  //     return offchainItem.fiatValue;
  //   }
  //   return null;
  // }, [detailItem, offchainItem]);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    // NOTE: Prevent fade out in the initial display and display nothing
    if (isShow) {
      setIsMount(true);
    }
  }, [isShow]);

  const handleClose = useCallback(() => {
    setIsShow(false);
    removeDocumentClickHandler();
  }, []);

  // Handling to close when clicking outside the area
  const boxRef = useRef<HTMLDivElement>(null);
  const documentClickHandler = useRef((e: MouseEvent) => {});
  const removeDocumentClickHandler = () => {
    document.removeEventListener("click", documentClickHandler.current);
  };
  useEffect(() => {
    documentClickHandler.current = (e) => {
      const dom = e.target as Node;
      // keep showing detail when a user clicks the detail card or other voxels.
      if (
        boxRef.current != null &&
        (boxRef.current.contains(dom) || dom.nodeName === "CANVAS")
      )
        return;

      setIsShow(false);
      removeDocumentClickHandler();
    };
  }, []);
  useEffect(() => {
    (async () => {
      if (box != undefined) {
        setIsShow(true);
        // sleep 0.3s
        await new Promise((resolve) => setTimeout(resolve, 300));

        document.addEventListener("click", documentClickHandler.current);
      }
    })();
  }, [box]);

  return (
    <div className="relative">
      <div
        className={clsx(
          "bg-light-surface-1 dark:bg-dark-surface-1 top-24 right-0 absolute border rounded-l-2xl border-y-light-outline border-l-light-outline dark:border-y-dark-outline dark:border-l-dark-outline z-10 w-72 sm:w-96 max-h-screen overflow-scroll",
          !isMount && "hidden",
          isShow ? "animate-slide-from-right" : "animate-slide-to-right"
        )}
        ref={boxRef}
      >
        <div className="px-8 relative bg-light-background dark:bg-dark-background">
          {/*share button*/}
          <div className="absolute top-4 right-4">
            <ShareButton voxelID={box?.item.id ?? ""} valiant="icon" isOwner={isOwner}/>
          </div>

          <div className="absolute top-4 left-4">
            <button className="sm:opacity-0" onClick={handleClose}>
              <FontAwesomeIcon
                className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                icon={faClose}
                // color={"#A66497"}
              />
            </button>
          </div>

          {/*c-voxel*/}
          <div className="h-52">
            {box && box.item.id && (
              <Canvas>
                <VisualizerPresenter
                  ids={box ? [box.item.id] : undefined}
                  zoom={5}
                  disableHover
                />
              </Canvas>
            )}
          </div>

          <div className="absolute bottom-2 right-0 left-0 flex justify-center">
            <TxDirection
              isPayer={box?.item.isPayer ?? false}
              from={detailItem?.from}
              to={detailItem?.to}
            />
          </div>
        </div>

        <div className="px-8 py-6 space-y-3">
          <div className="text-left w-full space-y-3 py-3 dark:border-b-dark-inverse-primary">
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

          {/*deliverables*/}
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
                    key={deliverable.value}
                  >
                    <p className="text-light-secondary dark:text-dark-secondary text-md">
                      {deliverable.value}
                    </p>
                  </a>
                ) : (
                  <p className="text-md text-secondary" key={deliverable.value}>
                    {shortenStr(deliverable.value)}
                  </p>
                )
              )}
            </div>
          )}

          {/*description*/}
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
        </div>
      </div>
    </div>
  );
};
