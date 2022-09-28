import { useTab } from "@/hooks/useTab";
import {
  FC,
  LegacyRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import CVoxelsPresenter from "../../../CVoxel/CVoxelsPresenter";
import { useStateForceUpdate } from "@/recoilstate";;
import { CommonLoading } from "../../../common/CommonLoading";
import { useOffchainList } from "@/hooks/useOffchainList";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { useRouter } from "next/dist/client/router";
import { NavBar } from "@/components/CVoxel/NavBar/NavBar";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { SearchData } from "@/components/common/search/Search";
import { Button } from "@/components/common/button/Button";
import { DIDContext } from "@/context/DIDContext";
import { useWorkCredentials } from "@/hooks/useWorkCredential";
import Router from "next/router";
import { WorkCredential } from "@/__generated__/types/WorkCredential";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIsTabletOrMobile } from "@/hooks/useIsTabletOrMobile";

export const MyCVoxelContainer: FC = () => {
  const {did, account} = useContext(DIDContext)
  const { offchainMetaList, txLoading } = useOffchainList();
  const {workCredentials} = useWorkCredentials(did)
  const { setTabState } = useTab();

  // TODO: This is temporary solution because of useTileDoc bug
  const [forceUpdateCVoxelList, setForceUpdateCVoxelList] =
    useStateForceUpdate();

  const forceReload = () => {
    if(did) Router.push(`/${did}`)
  };

  const sortCredentials = useMemo(() => {
    if (!workCredentials) return [];
    return workCredentials.sort((a, b) => {
      return Number(a.updatedAt) > Number(b.updatedAt) ? -1 : 1;
    });
  }, [workCredentials,forceUpdateCVoxelList]);

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

  const filteredVoxels = useMemo(
    () =>
    sortCredentials.filter((voxel) =>
        !!keyword && keyword != "" ? isHitSearch(voxel) : true
      ),
    [isHitSearch, keyword, sortCredentials]
  );

  const parentRef: LegacyRef<any> = useRef();

  const { isTabletOrMobile } = useIsTabletOrMobile();

  const rowVirtualizer = useVirtualizer({
    count: filteredVoxels.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ((isTabletOrMobile ? 15 : 13) + 1) * 16, // NOTE: (item + margin) * rem
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

        {!!currentVoxelID ? (
          <div className="mt-6 px-2 sm:px-6">
            <VoxelDetail
              itemId={currentVoxelID}
              offchainItems={offchainMetaList}
              isOwner={true}
              notifyUpdated={forceReload}
            />
          </div>
        ) : (
          <CVoxelsPresenter>
            {!txLoading && (!sortCredentials || sortCredentials.length === 0) && (
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

            {txLoading && <CommonLoading />}
            {!txLoading && filteredVoxels && (
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
                        <VoxelListItem
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
      txLoading,
      filteredVoxels,
      account,
      offchainMetaList,
      did,
      forceUpdateCVoxelList,
      currentVoxelID,
      keyword,
      rowVirtualizer,
      isTabletOrMobile,
    ]
  );
};
