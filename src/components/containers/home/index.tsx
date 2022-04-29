import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC, useCallback, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CVoxel,
  CVoxelMetaDraft,
} from "@/interfaces/cVoxelType";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useTab } from "@/hooks/useTab";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { TransactionLogWithChainId } from "@/interfaces/explore";
import { useForm, FormProvider } from "react-hook-form";
import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import { useSigRequest } from "@/hooks/useSigRequest";
import CVoxelsPresenter from "@/components/CVoxel/CVoxelsPresenter";
import { CVoxelItem } from "@/components/CVoxel/CVoxelItem";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { HomeTabsHeader } from "@/components/HomeTab/HomeTabsHeader";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";
import { CommonLoading } from "@/components/common/CommonLoading";
import { TransactionItem } from "@/components/Transaction/TransactionItem";
import { SigRequestItem } from "@/components/SigRequest/SigRequestItem";
import { TransactionDetail } from "@/components/Transaction/TransactionDetail";
import { TransactionForm } from "@/components/Transaction/TransactionForm";

export type selectTxType = {
  tx: TransactionLogWithChainId
  index: number
}
export const HomeContainer: FC = () => {
  const { connection, did, name, avator, account, connectCeramic } = useMyCeramicAcount();
  const { onlyPotentialCVoxels, offchainMetaList, txLoading, offchainLoading } =
    useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const [selectedTx, selectTx] = useState<selectTxType | null>(null);
  const { tabState, setTabState } = useTab();
  const draft = useDraftCVoxel();
  const {verifyWithCeramic, verifyWithoutCeramic} = useSigRequest()

  const methods = useForm<CVoxel>();
  const onSubmit = (data: any) => {
    publish(data);
  };

  const handleClickTx = (tx: selectTxType | null) => {
    selectTx(tx)
    if(tx && selectedTx && selectedTx?.tx.hash.toLowerCase() !== tx?.tx.hash.toLowerCase()) {
      methods.reset()
    }
  }

  const publish = useCallback(
    async (data: CVoxel) => {
      if (!(selectedTx && account)) return;
      if(connection.status==="connected") {
        const { summary, detail, deliverable, relatedAddresses, genre, tags } = data;
        const result = await draft.publish(account, selectedTx.tx, summary, detail, deliverable, relatedAddresses, genre, tags);
          if (result) {
            selectTx(null);
            methods.reset();
            setTabState("cvoxels");
          }
      } else {
        await connectCeramic()
      }
      
    },
    [draft]
  );

  const publishFromExistedCVoxel = async (tx:TransactionLogWithChainId, offchainItem: CVoxelMetaDraft) => {
    if (!(tx && account && offchainItem)) return;
    if(connection.status==="connected") {
      const { summary, detail, deliverable, relatedAddresses, genre, tags } = offchainItem;
      const result = await draft.publish(account, tx, summary, detail, deliverable, relatedAddresses, genre, tags, offchainItem);
        if (result) {
          selectTx(null);
          methods.reset();
          setTabState("cvoxels");
        }
    } else {
      await connectCeramic()
    }
  }

  const reClaimCVoxel = async (tx:TransactionLogWithChainId, offchainItem: CVoxelMetaDraft) => {
    if (!(tx && account && offchainItem)) return;
    if(connection.status==="connected") {
      const { summary, detail, deliverable, relatedAddresses, genre, tags } = offchainItem;
      const result = await draft.reClaim(account, tx, summary, detail, deliverable,relatedAddresses, genre, tags, offchainItem);
        if (result) {
          selectTx(null);
          methods.reset();
          setTabState("cvoxels");
        }
    } else {
      await connectCeramic()
    }
  }

  const verify = async (tx: CVoxelMetaDraft) => {
    if(did) {
      await verifyWithCeramic(tx)
    } else {
      await verifyWithoutCeramic(tx)
    }
  };

  const selectedOffchainItem = useMemo(() => {
    if (!selectedTx) return null;
    return offchainMetaList?.find((meta) => meta.txHash === selectedTx.tx.hash);
  }, [selectedTx, offchainMetaList]);

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.cVoxels.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords]);

  const sigRequestCVoxels = useMemo(() => {
    if(!(account && offchainMetaList)) return offchainMetaList
    return offchainMetaList.filter((tx) => (tx.relatedAddresses.includes(account?.toLowerCase()) && (!(tx.fromSig && tx.fromSigner && tx.fromSigner.toLowerCase() === account?.toLowerCase()) && !(tx.toSig && tx.toSigner && tx.toSigner.toLowerCase() === account?.toLowerCase()))))
  },[offchainMetaList,account])

  return (
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
        <div className="flex w-full items-center justify-center h-[300px] sm-h-[450px] relative max-w-[720px]">
          <Canvas shadows>
            <VisualizerPresenter
              ids={CVoxelsRecords.content?.cVoxels.map((vox) => vox.id)}
            />
          </Canvas>
        </div>
        <div className="flex-none mb-12 w-full max-w-[720px]">
          {account && !did && <ProfileCard name={account} />}
          {account && did && name && (
            <ProfileCard name={name} avator={avator} did={did}  />
          )}
        </div>
        <div className="flex-none w-full max-w-[720px]">
          <HomeTabsHeader />
        </div>
        
          <div className="flex-none w-full">
            <div className={tabState === "cvoxels" ? "block" : "hidden"} id="cvoxels">
                <CVoxelsPresenter>
                  {(!txLoading && (!CVoxelsRecords.content?.cVoxels || CVoxelsRecords.content?.cVoxels.length===0)) && (
                    <div className="mx-auto">
                      <NoItemPresenter text="No C-Voxels yet..." />
                          {account && (
                            <button onClick={()=> setTabState("transactions")} className="text-white rounded-full bg-gradient-to-r from-border_l to-border_r py-2 px-5">
                              Create C-Voxel
                          </button>
                          )}
                    </div>
                  )}
                  {txLoading && (
                    <CommonLoading />
                  )}
                  {(!txLoading && CVoxelsRecords.content?.cVoxels) && sortCVoxels.map(item => {
                      return (
                        <CVoxelItem
                            did={did}
                            holder={name}
                            item={item}
                            offchainItems={offchainMetaList}
                            key={item.id}
                            isOwner={true}
                          />
                      )
                  })}
                </CVoxelsPresenter>
              </div>
              <div className={tabState === "transactions" ? "block" : "hidden"} id="transactions">
                <div className="w-full max-w-[720px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll">
                  <p className="text-primary font-medium text-xs pt-2 pb-4 sm:text-right">{`Supported Networks: Ethereum & Polygon`}</p>
                  {(!offchainLoading && (!onlyPotentialCVoxels || onlyPotentialCVoxels.length===0)) && (
                    <NoItemPresenter text="No Tx Found..." />
                  )}
                  {offchainLoading && (
                    <CommonLoading />
                  )}
                  {(!offchainLoading && onlyPotentialCVoxels.length>0) &&  onlyPotentialCVoxels.map((tx,index) => (
                    <div key={`${tx.hash}_${index}`} className="mb-4">
                      <TransactionItem tx={tx} index={index} account={account} onClickTx={handleClickTx} selectedTx={selectedTx} cVoxels={sortCVoxels}/>
                      {(selectedTx && selectedTx?.tx.hash===tx.hash) && (
                          <>
                          {selectedOffchainItem ? (
                            <TransactionDetail key={`${tx.hash}_detail`} account={account?.toLowerCase()} tx={tx} offchainItem={selectedOffchainItem} connectionStatus={connection.status} onClaim={publishFromExistedCVoxel} reClaim={reClaimCVoxel} cvoxels={sortCVoxels} />
                          ): (
                            <div key={`${tx.hash}_form_container`} className="mb-4">
                              <div key={`${tx.hash}_form`} className="w-full h-fit bg-white shadow-lg p-5 mb-4">
                                <FormProvider {...methods}>
                                    <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
                                      <TransactionForm tx={tx} connectionStatus={connection.status} isFirstTime={sortCVoxels.length===0}/>
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
              </div>
              <div className={tabState === "signatures" ? "block" : "hidden"} id="signatures">
              <div className="w-full max-w-[820px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll space-y-2">
                  {(!sigRequestCVoxels || sigRequestCVoxels.length===0) && (
                    <NoItemPresenter text="No Sig Requests yet..." />
                  )}
                  {(sigRequestCVoxels && sigRequestCVoxels.length>0) && sigRequestCVoxels.map((tx) => {
                    return(
                      <div key={tx.txHash}>
                        <SigRequestItem tx={tx} account={account} handleClick={() => verify(tx)}/>
                      </div>
                    )
                  }) }
                </div>
              </div>
          </div>
        </div>
      </main>
    )

}
