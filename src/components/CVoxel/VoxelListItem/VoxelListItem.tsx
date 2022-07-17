import { FC, useMemo } from "react";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { IconAvatar } from "@/components/common/IconAvatar";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import LeftArrow from "@/components/CVoxel/VoxelListItem/left-arrow.svg";
import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { CVoxelItem as ICVoxelItem } from "@/interfaces";
import { shortenStr } from "@/utils/objectUtil";
import { Canvas } from "@react-three/fiber";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { useCVoxelRecord } from "@/hooks/useCVoxel";
import { useENS } from "@/hooks/useENS";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

type Props = {
  item: ICVoxelItem;
};

export const VoxelListItem: FC<Props> = ({ item }) => {
  const { did, avator } = useMyCeramicAcount();

  // item detail
  const cVoxelItem = useCVoxelRecord(item.id);
  const detailItem = useMemo(() => {
    return cVoxelItem.content || null;
  }, [cVoxelItem.content, cVoxelItem]);

  const Direction = () => {
    const { ens: fromEns, ensLoading: fromEnsLoading } = useENS(
      detailItem?.from
    );
    const { ens: toEns, ensLoading: toEnsLoading } = useENS(detailItem?.to);

    return item.isPayer ? (
      <div className="flex items-center space-x-2">
        {avator ? (
          <IconAvatar size={"sm"} src={avator} flex={false} />
        ) : (
          <AvatarPlaceholder did={did} size={32} />
        )}
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
        {avator ? (
          <IconAvatar size={"sm"} src={avator} flex={false} />
        ) : (
          <AvatarPlaceholder did={did} size={32} />
        )}
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

  return (
    <Link href={`${router.asPath.split("?")[0]}?voxel=${item.id}`}>
      <a className="w-full">
        <div className="w-full h-40 border border-light-on-primary-container dark:border-dark-on-primary-container rounded-lg flex overflow-hidden min-h-44 bg-light-surface-1 dark:bg-dark-surface-1">
          {/* NOTE: if voxel state exist, add padding bottom*/}
          <div
            className={clsx(
              "rounded-r-lg w-40 relative bg-light-surface dark:bg-dark-surface",
              false && "pb-6"
            )}
          >
            <Canvas>
              <VisualizerPresenter ids={[item.id]} zoom={6} disableHover />
            </Canvas>

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
              {detailItem?.createdAt && (
                <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
                  {convertTimestampToDateStr(detailItem.createdAt)}
                </div>
              )}
            </div>

            <div>
              {detailItem?.summary && (
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium">
                  {detailItem?.summary}
                </div>
              )}

              {detailItem?.deliverables &&
                detailItem.deliverables.length > 0 &&
                detailItem?.deliverables.map((deliverable) =>
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
      </a>
    </Link>
  );
};
