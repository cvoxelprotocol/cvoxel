import { useTab } from "@/hooks/useTab";
import { FC, useMemo, useState, useCallback } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import type { CVoxel, CVoxelMetaDraft, TransactionLogWithChainId } from "@/interfaces";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { CommonLoading } from "../../../common/CommonLoading";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { TransactionItem } from "@/components/Transaction/TransactionItem";
import { useForm, FormProvider } from "react-hook-form";
import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import { TransactionDetail } from "@/components/Transaction/TransactionDetail";
import { TransactionForm } from "@/components/Transaction/TransactionForm";


export const MyTxContainer:FC = () => {
    const { connection, did, account, connectCeramic } =
    useMyCeramicAcount();
    const { onlyPotentialCVoxels, offchainMetaList, offchainLoading } = useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const [selectedTx, selectTx] = useState<TransactionLogWithChainId | null>(null);
  const {  setTabState } = useTab();
  const draft = useDraftCVoxel();

  const methods = useForm<CVoxel>();
  const onSubmit = (data: any) => {
    publish(data);
  };

  const handleClickTx = (tx: TransactionLogWithChainId | null) => {
    selectTx(tx);
    if (
      tx &&
      selectedTx &&
      selectedTx?.hash.toLowerCase() !== tx?.hash.toLowerCase()
    ) {
      methods.reset();
    }
  };

  const publish = useCallback(
    async (data: CVoxel) => {
      if (!(selectedTx && account)) return;
      if (connection.status === "connected") {
        const { summary, detail, deliverable, relatedAddresses, genre, tags } =
          data;
        const result = await draft.publish(
          account,
          selectedTx,
          summary,
          detail,
          deliverable,
          relatedAddresses,
          genre,
          tags
        );
        if (result) {
          selectTx(null);
          methods.reset();
          setTabState("cvoxels");
        }
      } else {
        await connectCeramic();
      }
    },
    [draft]
  );

  const publishFromExistedCVoxel = async (
    tx: TransactionLogWithChainId,
    offchainItem: CVoxelMetaDraft
  ) => {
    if (!(tx && account && offchainItem)) return;
    if (connection.status === "connected") {
      const { summary, detail, deliverable, relatedAddresses, genre, tags } =
        offchainItem;
      const result = await draft.publish(
        account,
        tx,
        summary,
        detail,
        deliverable,
        relatedAddresses,
        genre,
        tags,
        offchainItem
      );
      if (result) {
        selectTx(null);
        methods.reset();
        setTabState("cvoxels");
      }
    } else {
      await connectCeramic();
    }
  };

  const reClaimCVoxel = async (
    tx: TransactionLogWithChainId,
    offchainItem: CVoxelMetaDraft
  ) => {
    if (!(tx && account && offchainItem)) return;
    if (connection.status === "connected") {
      const { summary, detail, deliverable, relatedAddresses, genre, tags } =
        offchainItem;
      const result = await draft.reClaim(
        account,
        tx,
        summary,
        detail,
        deliverable,
        relatedAddresses,
        genre,
        tags,
        offchainItem
      );
      if (result) {
        selectTx(null);
        methods.reset();
        setTabState("cvoxels");
      }
    } else {
      await connectCeramic();
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
                cVoxels={CVoxelsRecords.content?.cVoxels}
              />
              {selectedTx && selectedTx?.hash === tx.hash && (
                <>
                  {selectedOffchainItem ? (
                    <TransactionDetail
                      key={`${tx.hash}_detail`}
                      account={account?.toLowerCase()}
                      tx={tx}
                      offchainItem={selectedOffchainItem}
                      connectionStatus={connection.status}
                      onClaim={publishFromExistedCVoxel}
                      reClaim={reClaimCVoxel}
                      cvoxels={CVoxelsRecords.content?.cVoxels}
                    />
                  ) : (
                    <div key={`${tx.hash}_form_container`} className="mb-4">
                      <div
                        key={`${tx.hash}_form`}
                        className="w-full h-fit bg-white shadow-lg p-5 mb-4"
                      >
                        <FormProvider {...methods}>
                          <form
                            className="w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                          >
                            <TransactionForm
                              tx={tx}
                              connectionStatus={connection.status}
                              isFirstTime={CVoxelsRecords.content?.cVoxels.length === 0}
                            />
                          </form>
                        </FormProvider>
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
      methods,
      selectedTx,
      CVoxelsRecords.content?.cVoxels,
    ]
  );

    return TransactionMemo
}