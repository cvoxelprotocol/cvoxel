import { FC, useContext, useMemo } from "react";
import { CommonLoading } from "../common/CommonLoading";
import { NoItemPresenter } from "../common/NoItemPresenter";
import { TransactionDetail } from "./TransactionDetail";
import { TransactionForm } from "./TransactionForm";
import { TransactionItem } from "./TransactionItem";
import { useMyPageScreen, useTab } from "@/hooks/useTab";
import type {
  TransactionLogWithChainId,
  WorkCredentialForm,
} from "@/interfaces";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useStateForceUpdate, useStateSelectedTx } from "@/recoilstate";
import { useThemeMode } from "@/hooks/useThemeMode";
import { DIDContext } from "@/context/DIDContext";
import { useRouter } from "next/router";
import { useWorkCredential, useWorkCredentials } from "@/hooks/useWorkCredential";
import { DeliverableItem, WorkCredentialWithId } from "vess-sdk";

type TransactionListContainerProps = {
  txList: TransactionLogWithChainId[];
  offchainLoading: boolean;
  offchainMetaList?: WorkCredentialWithId[];
};
export const TransactionListContainer: FC<TransactionListContainerProps> = ({
  txList,
  offchainLoading,
  offchainMetaList,
}) => {
  const {did, account, connection} = useContext(DIDContext)
  const {workCredentials, refetch} = useWorkCredentials(did)
  const [selectedTx, selectTx] = useStateSelectedTx();
  const { setTabState } = useTab();
  const {publish} = useWorkCredential();
  const { resetUploadStatus } = useFileUpload();
  // TODO: This is temporary solution because of useTileDoc bug
  const [_, setForceUpdateCVoxelList] = useStateForceUpdate();
  const router = useRouter();
  const {setScreenState} = useMyPageScreen()

  const onPublish = async (data: WorkCredentialForm) => {
    if (!(selectedTx && account)) return;
      const {
        summary,
        detail,
        deliverableLink,
        deliverableCID,
        relatedAddresses,
        genre,
        tags,
      } = data;
      let deliverables: DeliverableItem[] = [];
      if (deliverableLink)
        deliverables.push({ format: "url", value: deliverableLink });
      if (deliverableCID)
        deliverables.push({ format: "cid", value: deliverableCID });
      const result = await publish(
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
        resetUploadStatus();
        setTabState("cvoxels");
        setScreenState("info")
        router.push(`/${did}/?voxel=${result}`)
      }
  };

  const handleClickTx = (tx: TransactionLogWithChainId | null) => {
    selectTx(tx);
  };

  const publishFromExistedCVoxel = async (
    tx: TransactionLogWithChainId,
    offchainItem: WorkCredentialWithId
  ) => {
    if (!(tx && account && offchainItem)) return;
    const { work, deliverables } = offchainItem.subject;
    if(!work) return
    const { summary, detail, genre, tags } = work;
    const result = await publish(
      account,
      tx,
      summary,
      detail,
      deliverables,
      offchainItem.subject.tx?.relatedAddresses,
      genre,
      tags,
      offchainItem
    );
    if (result) {
      selectTx(null);
      setTabState("cvoxels");
      setScreenState("info")
      setForceUpdateCVoxelList(v => !v);
      refetch()
      router.push(`/${did}/?voxel=${result}`)
    }
  };

  const reClaimCVoxel = async (
    tx: TransactionLogWithChainId,
    offchainItem: WorkCredentialWithId
  ) => {
    if (!(tx && account && offchainItem)) return;
    const { work, deliverables } = offchainItem.subject;
    if(!work) return
    const { summary, detail, genre, tags } = work;
    const result = await publish(
      account,
      tx,
      summary,
      detail,
      deliverables,
      offchainItem.subject.tx?.relatedAddresses,
      genre,
      tags,
      offchainItem
    );
    if (result) {
      selectTx(null);
      setTabState("cvoxels");
      setScreenState("info")
      setForceUpdateCVoxelList(v => !v);
      refetch()
      router.push(`/${did}/?voxel=${result}`)
    }
  };

  const selectedOffchainItem = useMemo(() => {
    if (!selectedTx) return null;
    return offchainMetaList?.find((meta) => meta.subject.tx?.txHash === selectedTx.hash);
  }, [selectedTx, offchainMetaList]);

  const { themeMode } = useThemeMode();

  const TransactionMemo = useMemo(
    () => (
      <div className="w-full max-w-[820px] lg:h-[calc(100vh-5rem-2.5rem-3rem)] text-center mx-auto cursor-pointer h-screen overflow-y-scroll sm:px-6 space-y-6">
        <p className="text-light-on-surface dark:text-dark-on-surface font-medium text-xs pt-2 pb-4 sm:text-right">{`Supported Networks: Ethereum & Polygon`}</p>
        {!offchainLoading && (!txList || txList.length === 0) && (
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
              />
              {selectedTx && selectedTx?.hash === tx.hash && (
                <>
                  {selectedOffchainItem ? (
                    <TransactionDetail
                      key={`${tx.hash}_detail`}
                      account={account}
                      tx={tx}
                      offchainItem={selectedOffchainItem}
                      connectionState={connection}
                      onClaim={publishFromExistedCVoxel}
                      reClaim={reClaimCVoxel}
                      credentials={workCredentials || []}
                    />
                  ) : (
                    <div key={`${tx.hash}_form_container`} className="mb-4">
                      <div
                        key={`${tx.hash}_form`}
                        className="w-full h-fit p-5 mb-4 bg-light-surface-2 dark:bg-dark-surface-2 border border-light-on-surface-variant dark:border-dark-on-surface-variant border-t-0 rounded-b-lg"
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
      connection,
      selectedTx,
      connection,
      workCredentials,
      themeMode,
    ]
  );

  return TransactionMemo;
};
