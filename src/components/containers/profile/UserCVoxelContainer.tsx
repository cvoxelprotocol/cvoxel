import { FC, LegacyRef, useMemo, useRef } from "react";
import { NoItemPresenter } from "../../common/NoItemPresenter";
import CVoxelsPresenter from "../../CVoxel/CVoxelsPresenter";
import { CommonLoading } from "../../common/CommonLoading";
import { VoxelListItemMemo } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { useOffchainList } from "@/hooks/useOffchainList";
import { useWorkCredentials } from "@/hooks/useWorkCredential";
import { useVirtualizer } from "@tanstack/react-virtual";
import { isMobile, isTablet } from "react-device-detect";

type UserCVoxelContainerProps = {
  did: string;
  currentVoxelID?: string;
};
export const UserCVoxelContainer: FC<UserCVoxelContainerProps> = ({
  did,
  currentVoxelID,
}) => {
  const {workCredentials, isInitialLoading} = useWorkCredentials(did)
  const { offchainMetaList } = useOffchainList();

  const sortCredentials = useMemo(() => {
    if (!workCredentials) return [];
    return workCredentials.sort((a, b) => {
      return Number(a.updatedAt) > Number(b.updatedAt) ? -1 : 1;
    });
  }, [workCredentials]);

  const currentCredential = useMemo(
    () => sortCredentials.find((crdl) => crdl.ceramicId == currentVoxelID),
    [currentVoxelID, sortCredentials]
  );

  const parentRef: LegacyRef<any> = useRef();

  const rowVirtualizer = useVirtualizer({
    count: sortCredentials.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (((isMobile || isTablet) ? 15 : 12) + 1) * 16, // NOTE: (item + margin) * rem
  });

  return useMemo(
    () => (
      <div className="max-w-[820px] mx-auto">
        {!!currentCredential ? (
          <div className="mt-6 px-2 sm:px-6">
            <VoxelDetail
              crdl={currentCredential}
              offchainItems={offchainMetaList}
              isOwner={false}
            />
          </div>
        ) : did == "" ? (
          <div className="mx-auto min-h-screen">
            <NoItemPresenter text="Not searched yet" />
          </div>
        ) : (
          <CVoxelsPresenter>
            {!isInitialLoading && (!sortCredentials || sortCredentials.length === 0) && (
              <div className="mx-auto">
                <NoItemPresenter text="No Voxels yet" />
              </div>
            )}

            {isInitialLoading && <CommonLoading />}
            {!isInitialLoading && sortCredentials && (
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
                    .map((virtualItem) => (
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
                        <VoxelListItemMemo
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
      isInitialLoading,
      sortCredentials,
      did,
      rowVirtualizer.getVirtualItems(),
      isMobile,
      isTablet
    ]
  );
};
