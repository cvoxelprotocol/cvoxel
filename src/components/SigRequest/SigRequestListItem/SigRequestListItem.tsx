import { FC, useEffect, useMemo } from "react";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { IconAvatar } from "@/components/common/IconAvatar";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import LeftArrow from "@/components/CVoxel/VoxelListItem/left-arrow.svg";
import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { CVoxelMetaDraft } from "@/interfaces";
import { shortenStr } from "@/utils/objectUtil";
import { Canvas } from "@react-three/fiber";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { useENS } from "@/hooks/useENS";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useVoxStyler } from "@/hooks/useVoxStyler";

type Props = {
  offchainItem: CVoxelMetaDraft;
};

export const SigRequestListItem: FC<Props> = ({ offchainItem }) => {
  const { did, avator } = useMyCeramicAcount();

  const Direction = () => {
    const { ens: fromEns, ensLoading: fromEnsLoading } = useENS(
      offchainItem?.from
    );
    const { ens: toEns, ensLoading: toEnsLoading } = useENS(offchainItem?.to);

    return offchainItem.isPayer ? (
      <div className="flex items-center space-x-2">
        <div className="hidden lg:block">
          {avator ? (
            <IconAvatar size={"sm"} src={avator} flex={false} />
          ) : (
            <AvatarPlaceholder did={did} size={32} />
          )}
        </div>

        <RightArrow />
        <div className="rounded-full border border-light-primary dark:border-dark-primary bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary px-2 py-1 text-sm">
          {toEnsLoading ? (
            <CommonSpinner size="sm" />
          ) : (
            <p className="break-words flex-wrap">{toEns}</p>
          )}
        </div>
      </div>
    ) : (
      <div className="flex items-center space-x-2">
        <div className="hidden lg:block">
          {avator ? (
            <IconAvatar size={"sm"} src={avator} flex={false} />
          ) : (
            <AvatarPlaceholder did={did} size={32} />
          )}
        </div>
        <LeftArrow />
        <div className="rounded-full border border-light-primary dark:border-dark-primary bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary px-2 py-1 text-sm">
          {fromEnsLoading ? (
            <CommonSpinner size="sm" />
          ) : (
            <p className="break-words flex-wrap">{fromEns}</p>
          )}
        </div>
      </div>
    );
  };

  const router = useRouter();

  // convert display
  const { cvoxelsForDisplay, convertCVoxelsForDisplay } = useVoxStyler([
    { ...offchainItem, id: "0" },
  ]);

  useEffect(() => {
    let isMounted = true;
    convertCVoxelsForDisplay();
    return () => {
      isMounted = false;
    };
  }, [offchainItem]);

  const PcContent = () => {
    return (
      <div className="flex h-44">
        {/* NOTE: if voxel state exist, add padding bottom*/}
        <div
          className={clsx(
            "rounded-r-lg w-40 relative bg-light-surface dark:bg-dark-surface",
            false && "pb-6"
          )}
        >
          <Canvas>
            <VisualizerPresenter
              zoom={6}
              disableHover
              voxelsForDisplay={cvoxelsForDisplay}
            />
          </Canvas>

          <div className="absolute bg-light-sig-request-layer dark:bg-dark-sig-request-layer top-0 bottom-0 left-0 right-0 opacity-70">
            <div className="h-full flex items-center p-3 justify-center">
              <p className="text-light-surface dark:text-dark-surface font-medium text-xl">
                Signature
                <br /> Request
              </p>
            </div>
          </div>

          {/* TODO: show voxel state */}
          {/*<div className="absolute bottom-2 left-0 right-0">*/}
          {/*  <div className="text-sm text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container inline-block px-2 py-0.5 rounded-full border border-light-secondary font-medium">*/}
          {/*    Portfolio*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className=" flex-auto text-left p-4 space-y-3">
          <div className="flex justify-between">
            <Direction />
            {offchainItem?.createdAt && (
              <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
                {convertTimestampToDateStr(offchainItem.createdAt)}
              </div>
            )}
          </div>

          <div>
            {offchainItem?.summary && (
              <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium">
                {offchainItem?.summary}
              </div>
            )}

            {offchainItem?.deliverables &&
              offchainItem.deliverables.length > 0 &&
              offchainItem?.deliverables.map((deliverable) =>
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

          <div className="flex">
            {offchainItem?.genre ? (
              <GenreBadge
                text={offchainItem.genre}
                baseColor={
                  getGenre(offchainItem.genre)?.bgColor || "bg-[#b7b7b7]"
                }
                isSelected={true}
              />
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
    );
  };

  const SpContent = () => {
    return (
      <div className="w-full">
        <div className="w-full h-32 relative bg-light-surface dark:bg-dark-surface rounded-b-lg">
          <Canvas>
            <VisualizerPresenter
              voxelsForDisplay={cvoxelsForDisplay}
              zoom={6}
              disableHover
            />
          </Canvas>

          {/* TODO: show voxel state */}
          {/*<div className="absolute top-2 left-2">*/}
          {/*  <div className="text-sm text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container inline-block px-2 py-0.5 rounded-full border border-light-secondary font-medium">*/}
          {/*    Portfolio*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="absolute right-2 top-2">
            <Direction />
          </div>
        </div>

        <div className="text-left px-8 py-3">
          {offchainItem?.createdAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
              {convertTimestampToDateStr(offchainItem.createdAt)}
            </div>
          )}

          {offchainItem?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-xl font-medium">
              {offchainItem?.summary}
            </div>
          )}

          {offchainItem?.deliverables &&
            offchainItem.deliverables.length > 0 &&
            offchainItem?.deliverables.map((deliverable) =>
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

          <div className="flex">
            {offchainItem?.genre ? (
              <GenreBadge
                text={offchainItem.genre}
                baseColor={
                  getGenre(offchainItem.genre)?.bgColor || "bg-[#b7b7b7]"
                }
                isSelected={true}
              />
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
    );
  };

  return (
    <Link href={`${router.asPath.split("?")[0]}?tx=${offchainItem.txHash}`}>
      <a className="w-full">
        <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-lg overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
          <div className="hidden lg:block w-full">
            <PcContent />
          </div>
          <div className="lg:hidden">
            <SpContent />
          </div>
        </div>
      </a>
    </Link>
  );
};
