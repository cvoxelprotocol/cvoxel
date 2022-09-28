import { FC, LegacyRef, useCallback, useMemo, useRef, useState } from "react";
import { NoItemPresenter } from "../../common/NoItemPresenter";
import CVoxelsPresenter from "../../CVoxel/CVoxelsPresenter";
import { CommonLoading } from "../../common/CommonLoading";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { useOffchainList } from "@/hooks/useOffchainList";
import { useStateForceUpdate } from "@/recoilstate";
import { useWorkCredentials } from "@/hooks/useWorkCredential";
import { useIsTabletOrMobile } from "@/hooks/useIsTabletOrMobile";
import { useVirtualizer } from "@tanstack/react-virtual";

type UserCVoxelContainerProps = {
  did: string;
  currentVoxelID?: string;
};
export const UserCVoxelContainer: FC<UserCVoxelContainerProps> = ({
  did,
  currentVoxelID,
}) => {
  const {workCredentials, isLoading} = useWorkCredentials(did)

  const sortCredentials = useMemo(() => {
    if (!workCredentials) return [];
    return workCredentials.sort((a, b) => {
      return Number(a.updatedAt) > Number(b.updatedAt) ? -1 : 1;
    });
  }, [workCredentials]);

  const currentVoxel = useMemo(
    () => sortCredentials.find((crdl) => crdl.backupId == currentVoxelID),
    [currentVoxelID, sortCredentials]
  );

  const { offchainMetaList } = useOffchainList();

  // TODO: This is temporary solution because of useTileDoc bug
  const [forceUpdateCVoxelList, setForceUpdateCVoxelList] =
    useStateForceUpdate();
  const forceReload = () => {
    setForceUpdateCVoxelList((v) => !v);
  };

  const parentRef: LegacyRef<any> = useRef();

  const { isTabletOrMobile } = useIsTabletOrMobile();

  const rowVirtualizer = useVirtualizer({
    count: sortCredentials.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ((isTabletOrMobile ? 15 : 13) + 1) * 16, // NOTE: (item + margin) * rem
  });

  return useMemo(
    () => (
      <div className="max-w-[820px] mx-auto">
        {!!currentVoxelID ? (
          <div className="mt-6 px-2 sm:px-6">
            <VoxelDetail
              itemId={currentVoxelID}
              offchainItems={offchainMetaList}
              isOwner={false}
              notifyUpdated={forceReload}
            />
          </div>
        ) : did == "" ? (
          <div className="mx-auto min-h-screen">
            <NoItemPresenter text="Not searched yet" />
          </div>
        ) : (
          <CVoxelsPresenter>
            {isLoading && <CommonLoading />}
            {!isLoading && !sortCredentials && (
              <div className="mx-auto">
                <NoItemPresenter text="No Voxels yet" />
              </div>
            )}
            {/* {!isLoading &&
              sortCredentials &&
              sortCredentials.map((item) => {
                return <VoxelListItem key={item.backupId} workCredential={item} />;
              })} */}

            {!isLoading && sortCredentials && (
              <div ref={parentRef} className={"overflow-auto h-full w-full"}>
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize() / 16}rem`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer
                    .getVirtualItems()
                    .map((virtualItem, index) => (
                      <div
                        key={virtualItem.index}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${virtualItem.size / 16}rem`,
                          transform: `translateY(${virtualItem.start / 16}rem)`,
                        }}
                      >
                        {/*<div className="h-40">{virtualItem.index}</div>*/}
                        <VoxelListItem
                          key={sortCredentials[virtualItem.index].id}
                          workCredential={sortCredentials[virtualItem.index]}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CVoxelsPresenter>
        )}
      </div>
    ),
    [
      currentVoxelID,
      offchainMetaList,
      isLoading,
      sortCredentials,
      did,
      forceUpdateCVoxelList,
      forceReload,
      rowVirtualizer
    ]
  );
};
