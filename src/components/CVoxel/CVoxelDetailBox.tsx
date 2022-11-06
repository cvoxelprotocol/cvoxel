import { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { shortenStr } from "@/utils/objectUtil";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { useStateCredentialDetailBox } from "@/recoilstate";
import clsx from "clsx";
import { ShareButton } from "@/components/common/button/shareButton/ShareButton";
import { CredentialDirection } from "../common/CredentialDirection";
import { DIDContext } from "@/context/DIDContext";
import { useFetchWorkCredential } from "@/hooks/useWorkCredential";
import dynamic from "next/dynamic";

const OneVoxelVisualizerPresenterWrapper = dynamic(
  () => import("@/components/CVoxel/OneVoxelVisualizerPresenterWrapper"),
  {
    ssr: false,
  }
);

export const CVoxelDetailBox: FC<{}> = () => {
  const [box] = useStateCredentialDetailBox();
  const { account } = useContext(DIDContext);

  const {workCredential} = useFetchWorkCredential(box?.item.backupId)


  const isOwner = useMemo(() => {
    if(!account) return false
    if(!workCredential) return false
    const {tx} = workCredential.subject
    return tx?.from?.toLowerCase() === account.toLowerCase() || tx?.to?.toLowerCase() === account.toLowerCase()
  },[account,workCredential])

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
          "bg-light-surface-1 dark:bg-dark-surface-1 top-6 sm:top-24 right-0 absolute border rounded-l-2xl border-y-light-outline border-l-light-outline dark:border-y-dark-outline dark:border-l-dark-outline z-10 w-72 sm:w-96 max-h-screen overflow-scroll",
          !isMount && "hidden",
          isShow ? "animate-slide-from-right" : "animate-slide-to-right hidden"
        )}
        ref={boxRef}
      >
        <div className="px-8 relative bg-light-background dark:bg-dark-background">
          {/*share button*/}
          <div className="absolute top-4 right-4">
            <ShareButton voxelID={box?.item.id ?? ""} valiant="icon" isOwner={isOwner}/>
          </div>

          <div className="absolute top-4 left-4">
            <button  onClick={handleClose}>
              <FontAwesomeIcon
                className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant"
                icon={faClose}
                // color={"#A66497"}
              />
            </button>
          </div>

          <div className="h-52">
            {(box && box.item.id && workCredential) &&  (
              <OneVoxelVisualizerPresenterWrapper
                workCredential={{...workCredential, backupId:box.item.id}}
                zoom={5}
                disableHover
              />
            )}
          </div>

          <div className="absolute bottom-2 right-0 left-0 flex justify-center">
          <CredentialDirection
              holder={workCredential?.subject.work?.id}
              client={workCredential?.subject.client}
            />
          </div>
        </div>

        <div className="px-8 py-6 space-y-3">
          <div className="text-left w-full py-3 dark:border-b-dark-inverse-primary">
            {workCredential?.createdAt && (
              <div className="text-light-on-surface dark:text-dark-on-surface text-base">
                {convertTimestampToDateStr(workCredential.createdAt)}
              </div>
            )}

            {workCredential?.subject.work?.summary && (
              <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium line-clamp-3">
                {workCredential?.subject.work?.summary}
              </div>
            )}

            <div className="flex mt-2">
              {workCredential?.subject.work?.genre ? (
                <div className="mr-2">
                  <GenreBadge
                    text={workCredential.subject.work?.genre || "Other"}
                    baseColor={
                      getGenre(workCredential.subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                    }
                    isSelected={true}
                  />
                </div>
              ) : (
                <></>
              )}
              {workCredential?.subject.work?.tags &&
                workCredential.subject.work?.tags.map((tag) => {
                  return <TagBadge key={tag} text={tag} />;
                })}
            </div>
          </div>

          {/*deliverables*/}
          {workCredential?.subject.deliverables && workCredential.subject.deliverables.length > 0 && (
            <div>
              <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
                DELIVERABLES
              </p>

              {workCredential?.subject.deliverables.map((deliverable) =>
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

          {/*description*/}
          {workCredential?.subject.work?.detail && (
            <div>
              <p className="mb-2 text-light-on-surface-variant dark:text-light-on-surface-variant font-medium">
                DESCRIPTION
              </p>

              <div className="text-light-on-surface dark:text-dark-on-surface font-medium">
                {workCredential?.subject.work?.detail}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
