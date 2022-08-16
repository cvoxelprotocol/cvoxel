import { useTab } from "@/hooks/useTab";
import { FC, useCallback, useContext, useMemo, useState } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import CVoxelsPresenter from "../../../CVoxel/CVoxelsPresenter";
import type { CVoxelItem as ICVoxelItem } from "@/interfaces";
import { useStateForceUpdate } from "@/recoilstate";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { CommonLoading } from "../../../common/CommonLoading";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { useRouter } from "next/dist/client/router";
import { NavBar } from "@/components/CVoxel/NavBar/NavBar";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { SearchData } from "@/components/common/search/Search";
import { Button } from "@/components/common/button/Button";
import { DIDContext } from "@/context/DIDContext";

export const MyCVoxelContainer: FC = () => {
  const {did, account} = useContext(DIDContext)
  const { offchainMetaList, txLoading } = useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did || "");
  const { setTabState } = useTab();

  // TODO: This is temporary solution because of useTileDoc bug
  const [forceUpdateCVoxelList, setForceUpdateCVoxelList] =
    useStateForceUpdate();

  const forceReload = () => {
    setForceUpdateCVoxelList(v => !v);
  };

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.WorkCredentials.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords.content, CVoxelsRecords.content?.WorkCredentials]);

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
  const isHitSearch = (voxel: ICVoxelItem) => {
    if (!keyword) {
      return false;
    }
    if (voxel.summary.toLowerCase().match(keyword.toLowerCase())) {
      return true;
    }
    if (voxel.genre?.toLowerCase().match(keyword.toLowerCase())) {
      return true;
    }
    return false;
  };

  const currentVoxelID = useMemo(() => {
    if (typeof router.query["voxel"] == "string") {
      return router.query["voxel"];
    }
  }, [router.query]);

  const currentVoxel = useMemo(
    () => sortCVoxels.find((voxel) => voxel.id == currentVoxelID),
    [currentVoxelID, sortCVoxels]
  );

  return useMemo(
    () => (
      <>
        <NavBar
          handleClickBackButton={handleClickNavBackButton}
          currentVoxelID={currentVoxelID}
          onSubmit={handleSearchSubmit}
          onClear={handleSearchClear}
        />

        {!!currentVoxel ? (
          <div className="mt-6 sm:px-6">
            <VoxelDetail
              item={currentVoxel}
              offchainItems={offchainMetaList}
              isOwner={true}
              notifyUpdated={forceReload}
            />
          </div>
        ) : (
          <CVoxelsPresenter>
            {!txLoading && (!sortCVoxels || sortCVoxels.length === 0) && (
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
            {!txLoading &&
              sortCVoxels &&
              sortCVoxels
                .filter((voxel) =>
                  !!keyword && keyword != "" ? isHitSearch(voxel) : true
                )
                .map((item) => {
                  return <VoxelListItem key={item.id} item={item} />;
                })}
          </CVoxelsPresenter>
        )}
      </>
    ),
    [
      txLoading,
      sortCVoxels,
      account,
      offchainMetaList,
      did,
      forceUpdateCVoxelList,
      currentVoxelID,
      keyword,
    ]
  );
};
