import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { shortenStr } from "@/utils/objectUtil";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { formatBigNumber } from "@/utils/ethersUtil";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { useCVoxelRecord } from "@/hooks/useCVoxel";
import { useStateCVoxelDetailBox } from "@/recoilstate";
import { Canvas } from "@react-three/fiber";
import { useENS } from "@/hooks/useENS";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import clsx from "clsx";
import { ShareButton } from "@/components/common/button/shareButton/ShareButton";

export const CVoxelDetailBox: FC<{}> = () => {
  const [box] = useStateCVoxelDetailBox();

  const cVoxelItem = useCVoxelRecord(box?.item.id);

  const detailItem = useMemo(() => {
    if (cVoxelItem.isError) {
      return null;
    }
    return cVoxelItem.content || null;
  }, [cVoxelItem.content, cVoxelItem]);

  const { ens: fromEns, ensLoading: fromEnsLoading } = useENS(detailItem?.from);
  const { ens: toEns, ensLoading: toEnsLoading } = useENS(detailItem?.to);

  const offchainItem = useMemo(() => {
    return box?.offchainItems?.find(
      (offchain) => offchain.txHash === box?.item.txHash
    );
  }, [box?.offchainItems, box?.item]);

  const fiatVal = useMemo(() => {
    if (detailItem && detailItem.fiatValue) {
      return detailItem.fiatValue;
    } else if (offchainItem && offchainItem.fiatValue) {
      return offchainItem.fiatValue;
    }
    return null;
  }, [detailItem, offchainItem]);

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
          "top-24 right-0 absolute bg-white border rounded-l-2xl border-y-secondary border-l-secondary p-10 z-10 w-72 sm:w-96 max-h-screen overflow-scroll",
          !isMount && "hidden",
          isShow ? "animate-slide-from-right" : "animate-slide-to-right"
        )}
        ref={boxRef}
      >
        {/*share button*/}
        <div className="flex justify-between">
          <button className="sm:opacity-0" onClick={handleClose}>
            <FontAwesomeIcon
              className="w-6 h-6 mr-4"
              icon={faClose}
              color={"#A66497"}
            />
          </button>
          <ShareButton />
        </div>

        {/*c-voxel*/}
        <div className="mt-2">
          {box && box.item.id && (
            <Canvas>
              <VisualizerPresenter
                ids={box ? [box.item.id] : undefined}
                zoom={6}
                disableHover
              />
            </Canvas>
          )}
        </div>

        {/*address*/}
        <div className="mt-2">
          {detailItem && (
            <>
              <div className="border rounded-full border-secondary px-3 py-1 text-primary font-medium text-xl mr-4 inline-block">
                {fromEnsLoading ? (
                  <CommonSpinner size="sm" />
                ) : (
                  <p className="break-words flex-wrap">{fromEns}</p>
                )}
              </div>
              <div className="flex items-center justify-end mt-2">
                <FontAwesomeIcon
                  className="w-6 h-6 mr-4"
                  icon={faArrowRight}
                  color={"#A66497"}
                />
                <div className="border rounded-full border-gray-300 px-3 py-1 text-primary font-medium text-xl">
                  {toEnsLoading ? (
                    <CommonSpinner size="sm" />
                  ) : (
                    <p className="break-words flex-wrap">{toEns}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/*date*/}
        <div className="mt-4 text-primary">
          {box && convertTimestampToDateStr(box.item.issuedTimestamp)}
        </div>

        {/*title*/}
        <div className="mt-1 text-xl font-medium">
          {detailItem ? detailItem.summary : box?.item.summary ?? ""}
        </div>

        {/*value*/}
        <div className="mt-1">
          {detailItem && (
            <>
              <p className="font-medium text-lg">
                {formatBigNumber(detailItem?.value, 8, detailItem?.tokenDecimal.toString())}{" "}
                {detailItem.tokenSymbol || detailItem.networkId}
              </p>
              {fiatVal && (
                <p className="text-gray-400 text-xs">
                  {`(${Number(fiatVal).toFixed(2)} ${
                    detailItem.fiatSymbol || "USD"
                  })`}
                </p>
              )}
            </>
          )}
        </div>

        {/*genre and tags*/}
        <div className="flex mt-2 items-center">
          {detailItem?.genre ? (
            <GenreBadge
              text={detailItem.genre}
              baseColor={getGenre(detailItem.genre)?.bgColor || "bg-[#b7b7b7]"}
              isSelected={true}
            />
          ) : (
            <></>
          )}
          <div className="ml-2 flex items-center flex-wrap">
            {detailItem?.tags &&
              detailItem.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
          </div>
        </div>

        {/*deliverables*/}
        {detailItem?.deliverables && (
          <div className="mt-2">
            <div className="text-lg font-medium">Deliverables</div>
            <div>
            {detailItem?.deliverables && detailItem.deliverables.map(d => {
                return (
                  <div key={d.value}>
                    <Link href={`${d.format==="url" ? d.value : `https://dweb.link/ipfs/${d.value}`}`} passHref>
                      <a
                        className="text-xs text-secondary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortenStr(d.value)}
                      </a>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/*description*/}
        <div className="mt-2 whitespace-pre-wrap">{detailItem?.detail}</div>
      </div>
    </div>
  );
};
