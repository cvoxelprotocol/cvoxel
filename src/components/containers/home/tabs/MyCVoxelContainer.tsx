import { useTab } from "@/hooks/useTab";
import {
  FC,
  LegacyRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import CVoxelsPresenter from "../../../CVoxel/CVoxelsPresenter";
import { CommonLoading } from "../../../common/CommonLoading";
import { useOffchainList } from "@/hooks/useOffchainList";
import { VoxelListItemMemo } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { useRouter } from "next/dist/client/router";
import { NavBar } from "@/components/CVoxel/NavBar/NavBar";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { SearchData } from "@/components/common/search/Search";
import { Button } from "@/components/common/button/Button";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useWorkCredentials } from "@/hooks/useWorkCredential";
import Router from "next/router";

import { useVirtualizer } from "@tanstack/react-virtual";
import { WorkCredential } from "vess-sdk";
import { isMobile, isTablet } from "react-device-detect";

export const MyCVoxelContainer: FC = () => {
  const {did, account} = useDIDAccount()
  const { offchainMetaList } = useOffchainList();
  const {workCredentials, isInitialLoading} = useWorkCredentials(did)
  const { setTabState } = useTab();

  const forceReload = () => {
    if(did) Router.push(`/${did}`)
  };

  const sortCredentials = useMemo(() => {
    if (!workCredentials) return [];
    return workCredentials.sort((a, b) => {
      return Number(a.updatedAt) > Number(b.updatedAt) ? -1 : 1;
    });
  }, [workCredentials]);

  const router = useRouter();
  const handleClickNavBackButton = useCallback(() => {
    router.push(router.asPath.split("?")[0]);
  }, [router]);

  // search
  const [keyword, setKeyword] = useState<string>();
  const handleSearchSubmit = (data: SearchData) => {
    if (!data.value) return;
    const keyword = data.value;
    setKeyword(keyword);
  };

  const handleSearchClear = () => {
    setKeyword("");
  };

  // TODO: improvement search logic
  const isHitSearch = (voxel: WorkCredential) => {
    if (!keyword) {
      return false;
    }
    if (voxel.subject.work?.summary?.toLowerCase().match(keyword.toLowerCase())) {
      return true;
    }
    if (voxel.subject.work?.genre?.toLowerCase().match(keyword.toLowerCase())) {
      return true;
    }
    return false;
  };

  const currentVoxelID = useMemo(() => {
    if (typeof router.query["voxel"] == "string") {
      return router.query["voxel"];
    }
  }, [router.query]);

  const currentCredential = useMemo(
    () => sortCredentials.find((crdl) => crdl.backupId == currentVoxelID),
    [currentVoxelID, sortCredentials]
  );

  const filteredVoxels = useMemo(
    () =>
    sortCredentials.filter((voxel) =>
        !!keyword && keyword != "" ? isHitSearch(voxel) : true
      ),
    [isHitSearch, keyword, sortCredentials]
  );

  const parentRef: LegacyRef<any> = useRef();

  const rowVirtualizer = useVirtualizer({
    count: filteredVoxels.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (((isMobile || isTablet) ? 15 : 12) + 1) * 16, // NOTE: (item + margin) * rem
  });

  return useMemo(
    () => (
      <>
        <NavBar
          handleClickBackButton={handleClickNavBackButton}
          currentVoxelID={currentVoxelID}
          onSubmit={handleSearchSubmit}
          onClear={handleSearchClear}
        />

        {!!currentCredential ? (
          <div className="mt-6 px-2 sm:px-6">
            <VoxelDetail
              crdl={currentCredential}
              offchainItems={offchainMetaList}
              isOwner={true}
              notifyUpdated={forceReload}
            />
          </div>
        ) : (
          <CVoxelsPresenter>
            {!isInitialLoading && (!sortCredentials || sortCredentials.length === 0) && (
              <div className="mx-auto">
                <NoItemPresenter text="No Voxels yet" />
                {account && (
                  <Button
                    text="Create New Voxel"
                    onClick={() => setTabState("transactions")}
                    color="primary"
                  />
                )}
              </div>
            )}

            {isInitialLoading && <CommonLoading />}
            {!isInitialLoading && filteredVoxels && (
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
                        <VoxelListItemMemo
                          key={filteredVoxels[virtualItem.index].id}
                          workCredential={filteredVoxels[virtualItem.index]}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CVoxelsPresenter>
        )}
      </>
    ),
    [
      isInitialLoading,
      filteredVoxels,
      account,
      offchainMetaList,
      did,
      currentCredential,
      keyword,
      rowVirtualizer,
      isMobile,
      isTablet
    ]
  );
};
