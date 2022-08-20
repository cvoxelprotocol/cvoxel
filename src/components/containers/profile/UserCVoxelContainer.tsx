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
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { useStateForceUpdate } from "@/recoilstate";

type UserCVoxelContainerProps = {
  did: string;
  currentVoxelID?: string;
};
export const UserCVoxelContainer: FC<UserCVoxelContainerProps> = ({
  did,
  currentVoxelID,
}) => {
  const CVoxelsRecords = useCVoxelsRecord(did);

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.WorkCredentials.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords.content]);

  const currentVoxel = useMemo(
    () => sortCVoxels.find((voxel) => voxel.id == currentVoxelID),
    [currentVoxelID, sortCVoxels]
  );

  const { offchainMetaList } = useCVoxelList();

  // TODO: This is temporary solution because of useTileDoc bug
  const [forceUpdateCVoxelList, setForceUpdateCVoxelList] =
    useStateForceUpdate();
  const forceReload = () => {
    setForceUpdateCVoxelList(v => !v);
  };

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
            {CVoxelsRecords.isLoading && <CommonLoading />}
            {!CVoxelsRecords.isLoading &&
              sortCVoxels &&
              sortCVoxels.map((item) => {
                return <VoxelListItem key={item.id} item={item} />;
              })}
            {!CVoxelsRecords.isLoading && !CVoxelsRecords.content && (
              <div className="mx-auto">
                <NoItemPresenter text="No Voxels yet" />
              </div>
            )}
          </CVoxelsPresenter>
        )}
      </div>
    ),
    [
      currentVoxel,
      offchainMetaList,
      CVoxelsRecords.isLoading,
      CVoxelsRecords.content,
      did,
      forceUpdateCVoxelList,
    ]
  );
};
