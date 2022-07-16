import { FC, useCallback, useMemo } from "react";
import { CommonLoading } from "../common/CommonLoading";
import { NoItemPresenter } from "../common/NoItemPresenter";
import { TransactionDetail } from "./TransactionDetail";
import { TransactionForm } from "./TransactionForm";
import { TransactionItem } from "./TransactionItem";
import { useTab } from "@/hooks/useTab";
import type {CVoxelMetaDraft, TransactionLogWithChainId,DeliverableItem,WorkCredentialForm } from "@/interfaces";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useStateForceUpdate, useStateSelectedTx } from "@/recoilstate";

type TransactionListContainerProps = {
    txList: TransactionLogWithChainId[]
    offchainLoading: boolean
    offchainMetaList?: CVoxelMetaDraft[]
}
export const TransactionListContainer:FC<TransactionListContainerProps> = ({txList,offchainLoading,offchainMetaList}) => {
    const { connection, did, account } =
    useMyCeramicAcount();
    const CVoxelsRecords = useCVoxelsRecord(did);
  const [selectedTx, selectTx] = useStateSelectedTx()
  const {  setTabState } = useTab();
  const draft = useDraftCVoxel();
  const {resetUploadStatus} = useFileUpload()
  // TODO: This is temporary solution because of useTileDoc bug
  const [_, setForceUpdateCVoxelList] =
    useStateForceUpdate();

  const onPublish = (data: any) => {
    publish(data);
  };

  const handleClickTx = (tx: TransactionLogWithChainId | null) => {
    selectTx(tx);
  };

  const publish = useCallback(
    async (data: WorkCredentialForm) => {
      if (!(selectedTx && account)) return;
      const { summary, detail, deliverableLink,deliverableCID, relatedAddresses, genre, tags } =
          data;
          let deliverables:DeliverableItem[] = []
          if(deliverableLink) deliverables.push({format: "url", value: deliverableLink})
          if(deliverableCID) deliverables.push({format: "cid", value: deliverableCID})
        const result = await draft.publish(
          account,
          selectedTx,
          summary,
          detail,
          deliverables,
          relatedAddresses,
          genre,
          tags
        );
        if (result) {
          selectTx(null);
          resetUploadStatus()
          setTabState("cvoxels");
          setForceUpdateCVoxelList(true);
        }
    },
    [draft]
  );

  const publishFromExistedCVoxel = async (
    tx: TransactionLogWithChainId,
    offchainItem: CVoxelMetaDraft
  ) => {
    if (!(tx && account && offchainItem)) return;
    const { summary, detail, deliverables, relatedAddresses, genre, tags } =
        offchainItem;
      const result = await draft.publish(
        account,
        tx,
        summary,
        detail,
        deliverables,
        relatedAddresses,
        genre,
        tags,
        offchainItem
      );
      if (result) {
        selectTx(null);
        setTabState("cvoxels");
      }
  };

  const reClaimCVoxel = async (
    tx: TransactionLogWithChainId,
    offchainItem: CVoxelMetaDraft
  ) => {
    if (!(tx && account && offchainItem)) return;
    const { summary, detail, deliverables, relatedAddresses, genre, tags } =
        offchainItem;
      const result = await draft.reClaim(
        account,
        tx,
        summary,
        detail,
        deliverables,
        relatedAddresses,
        genre,
        tags,
        offchainItem
      );
      if (result) {
        selectTx(null);
        setTabState("cvoxels");
      }
  };

  const selectedOffchainItem = useMemo(() => {
    if (!selectedTx) return null;
    return offchainMetaList?.find((meta) => meta.txHash === selectedTx.hash);
  }, [selectedTx, offchainMetaList]);

  const TransactionMemo = useMemo(
    () => (
      <div className="w-full max-w-[720px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll">
        <p className="text-primary font-medium text-xs pt-2 pb-4 sm:text-right">{`Supported Networks: Ethereum & Polygon`}</p>
        {!offchainLoading &&
          (!txList || txList.length === 0) && (
            <NoItemPresenter text="No Tx Found..." />
          )}
        {offchainLoading && <CommonLoading />}
        {!offchainLoading &&
          txList.length > 0 &&
          txList.map((tx, index) => (
            <div key={`${tx.hash}_${index}`} className="mb-4">
              <TransactionItem
                tx={tx}
                index={index}
                account={account}
                onClickTx={handleClickTx}
                selectedTx={selectedTx}
                cVoxels={CVoxelsRecords.content?.WorkCredentials}
              />
              {selectedTx && selectedTx?.hash === tx.hash && (
                <>
                  {selectedOffchainItem ? (
                    <TransactionDetail
                      key={`${tx.hash}_detail`}
                      account={account?.toLowerCase()}
                      tx={tx}
                      offchainItem={selectedOffchainItem}
                      connectionState={connection}
                      onClaim={publishFromExistedCVoxel}
                      reClaim={reClaimCVoxel}
                      cvoxels={CVoxelsRecords.content?.WorkCredentials}
                    />
                  ) : (
                    <div key={`${tx.hash}_form_container`} className="mb-4">
                      <div
                        key={`${tx.hash}_form`}
                        className="w-full h-fit bg-white shadow-lg p-5 mb-4"
                      >
                        <TransactionForm
                          tx={tx}
                          connectionState={connection}
                          onSubmit={onPublish}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    ),
    [
      offchainLoading,
      txList,
      account,
      selectedOffchainItem,
      connection.status,
      selectedTx,
      connection,
      CVoxelsRecords.content?.WorkCredentials,
    ]
  );

    return TransactionMemo
}