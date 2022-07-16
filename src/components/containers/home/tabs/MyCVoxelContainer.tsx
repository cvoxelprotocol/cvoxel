import { useTab } from "@/hooks/useTab";
import { FC, useMemo, useState, memo } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import { CVoxelItem } from "../../../CVoxel/CVoxelItem";
import CVoxelsPresenter from "../../../CVoxel/CVoxelsPresenter";
import type {
  CVoxelItem as ICVoxelItem,
  CVoxelMetaDraft,
} from "@/interfaces";
import { useStateForceUpdate } from "@/recoilstate";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { CommonLoading } from "../../../common/CommonLoading";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem";
import { Search } from "@/components/common/search/Search";

type CVoxelItemProp = {
  item: ICVoxelItem;
  did: string;
  offchainItems?: CVoxelMetaDraft[];
};

export const MyCVoxelContainer: FC = () => {
  const { did, account } = useMyCeramicAcount();
  const { offchainMetaList, txLoading } = useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const { setTabState } = useTab();

  // TODO: This is temporary solution because of useTileDoc bug
  const [forceUpdateCVoxelList, setForceUpdateCVoxelList] =
    useStateForceUpdate();

  const forceReload = () => {
    setForceUpdateCVoxelList(true);
  };

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.cVoxels.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords.content]);

  // eslint-disable-next-line react/display-name
  const CVoxelItemMemo = memo<CVoxelItemProp>(
    ({ item, offchainItems, did }) => (
      <CVoxelItem
        did={did}
        item={item}
        offchainItems={offchainItems}
        isOwner={true}
        notifyUpdated={forceReload}
      />
    )
  );

  const CVoxelPresenterMemo = useMemo(
    () => (
      <>
        <div className="flex mx-6 mt-6 space-x-3 items-center">
          <div className="text-light-on-surface dark:text-dark-on-surface text-3xl font-medium">
            Voxels
          </div>
          {/* TODO: add search handler */}
          <Search onSubmit={() => {}} />
        </div>

        <CVoxelsPresenter>
          {!txLoading && (!sortCVoxels || sortCVoxels.length === 0) && (
            <div className="mx-auto">
              <NoItemPresenter text="No C-Voxels yet..." />
              {account && (
                <button
                  onClick={() => setTabState("transactions")}
                  className="text-white rounded-full bg-gradient-to-r from-border_l to-border_r py-2 px-5"
                >
                  Create C-Voxel
                </button>
              )}
            </div>
          )}
          {txLoading && <CommonLoading />}
          {!txLoading &&
            sortCVoxels &&
            sortCVoxels.map((item) => {
              return (
                // <CVoxelItemMemo
                //   key={item.id}
                //   item={item}
                //   did={did}
                //   offchainItems={offchainMetaList}
                // />
                <VoxelListItem key={item.id} item={item} />
              );
            })}
        </CVoxelsPresenter>
      </>
    ),
    [
      txLoading,
      sortCVoxels,
      account,
      offchainMetaList,
      did,
      forceUpdateCVoxelList,
    ]
  );

  return CVoxelPresenterMemo;
};
