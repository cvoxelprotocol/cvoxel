import { FC, useMemo } from "react";
import { NoItemPresenter } from "../../common/NoItemPresenter";
import CVoxelsPresenter from "../../CVoxel/CVoxelsPresenter";
import { CommonLoading } from "../../common/CommonLoading";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { useOffchainList } from "@/hooks/useOffchainList";
import { useStateForceUpdate } from "@/recoilstate";
import { useWorkCredentials } from "@/hooks/useWorkCredential";

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
            {isLoading && <CommonLoading />}
            {!isLoading &&
              sortCredentials &&
              sortCredentials.map((item) => {
                return <VoxelListItem key={item.backupId} workCredential={item} />;
              })}
            {!isLoading && !sortCredentials && (
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
      isLoading,
      sortCredentials,
      did,
      forceUpdateCVoxelList,
    ]
  );
};
