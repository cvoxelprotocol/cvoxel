import { useTab } from "@/hooks/useTab";
import { FC, useMemo, useState, useCallback } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import type {CVoxelMetaDraft, TransactionLogWithChainId,DeliverableItem,WorkCredentialForm } from "@/interfaces";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { CommonLoading } from "../../../common/CommonLoading";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { TransactionItem } from "@/components/Transaction/TransactionItem";
import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import { TransactionDetail } from "@/components/Transaction/TransactionDetail";
import { TransactionForm } from "@/components/Transaction/TransactionForm";
import { useFileUpload } from "@/hooks/useFileUpload";


export const MyTxContainer:FC = () => {
    const { connection, did, account, connectCeramic } =
    useMyCeramicAcount();
    const { onlyPotentialCVoxels, offchainMetaList, offchainLoading } = useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const [selectedTx, selectTx] = useState<TransactionLogWithChainId | null>(null);
  const {  setTabState } = useTab();
  const draft = useDraftCVoxel();
  const {resetUploadStatus} = useFileUpload()

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
          (!onlyPotentialCVoxels || onlyPotentialCVoxels.length === 0) && (
            <NoItemPresenter text="No Tx Found..." />
          )}
        {offchainLoading && <CommonLoading />}
        {!offchainLoading &&
          onlyPotentialCVoxels.length > 0 &&
          onlyPotentialCVoxels.map((tx, index) => (
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
                          isFirstTime={CVoxelsRecords.content?.WorkCredentials.length === 0}
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
      onlyPotentialCVoxels,
      account,
      selectedOffchainItem,
      connection.status,
      selectedTx,
      CVoxelsRecords.content?.WorkCredentials,
    ]
  );

    return TransactionMemo
}