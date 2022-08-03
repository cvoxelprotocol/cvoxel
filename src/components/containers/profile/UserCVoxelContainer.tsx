import { FC, useCallback, useMemo, useState } from "react";
import { NoItemPresenter } from "../../common/NoItemPresenter";
import CVoxelsPresenter from "../../CVoxel/CVoxelsPresenter";
import type { CVoxelItem as ICVoxelItem } from "@/interfaces";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { CommonLoading } from "../../common/CommonLoading";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { useRouter } from "next/dist/client/router";
import { NavBar } from "@/components/CVoxel/NavBar/NavBar";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { SearchData } from "@/components/common/search/Search";

type UserCVoxelContainerProps = {
  did: string
  currentVoxelID?: string
}
export const UserCVoxelContainer: FC<UserCVoxelContainerProps> = ({did, currentVoxelID}) => {
  const CVoxelsRecords = useCVoxelsRecord(did);

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.WorkCredentials.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords.content]);

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
              did={did}
              item={currentVoxel}
              isOwner={false}
            />
          </div>
        ) : (
          <CVoxelsPresenter>
            {!CVoxelsRecords.isLoading && (!sortCVoxels || sortCVoxels.length === 0) && (
              <div className="mx-auto">
                <NoItemPresenter text="No C-Voxels yet..." />
              </div>
            )}
            {CVoxelsRecords.isLoading && <CommonLoading />}
            {!CVoxelsRecords.isLoading &&
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
      CVoxelsRecords.isLoading,
      sortCVoxels,
      did,
      currentVoxelID,
      keyword,
    ]
  );
};
