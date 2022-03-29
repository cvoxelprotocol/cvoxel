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
import { TransactionLog } from "@/interfaces/explore";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/common/button/Button";
import { TransactionDetail } from "@/components/Transaction/TransactionDetail";
import { CommonSpinner } from "@/components/common/CommonSpinner";

export const HomeContainer: FC = () => {
  const { connection, did, name, avator, account, connectCeramic } = useMyCeramicAcount();
  const { onlyPotentialCVoxels, offchainMetaList, txLoading, offchainLoading } =
    useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const [selectedTx, selectTx] = useState<TransactionLog | null>(null);
  const { tabState, setTabState } = useTab();
  const draft = useDraftCVoxel();
  const {verifyWithCeramic, verifyWithoutCeramic} = useSigRequest()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CVoxel>();
  const onSubmit = (data: any) => {
    publish(data);
  };

  const publish = useCallback(
    async (data: CVoxel) => {
      if (!(selectedTx && account)) return;
      if(connection.status==="connected") {
        const { summary, detail, deliverable } = data;
        const result = await draft.publish(account, selectedTx, summary, detail, deliverable);
          if (result) {
            selectTx(null);
            reset();
            setTabState("cvoxels");
          }
      } else {
        await connectCeramic()
      }
      
    },
    [draft]
  );

  const publishFromExistedCVoxel = async (tx:TransactionLog, offchainItem: CVoxelMetaDraft) => {
    if (!(tx && account && offchainItem)) return;
    if(connection.status==="connected") {
      const { summary, detail, deliverable } = offchainItem;
      const result = await draft.publish(account, tx, summary, detail, deliverable, offchainItem);
        if (result) {
          selectTx(null);
          reset();
          setTabState("cvoxels");
        }
    } else {
      await connectCeramic()
    }
  }

  const reClaimCVoxel = async (tx:TransactionLog, offchainItem: CVoxelMetaDraft) => {
    if (!(tx && account && offchainItem)) return;
    if(connection.status==="connected") {
      const { summary, detail, deliverable } = offchainItem;
      const result = await draft.reClaim(account, tx, summary, detail, deliverable, offchainItem);
        if (result) {
          selectTx(null);
          reset();
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
    return offchainMetaList?.find((meta) => meta.txHash === selectedTx.hash);
  }, [selectedTx, offchainMetaList]);

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.cVoxels.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords]);

  const sigRequestCVoxels = useMemo(() => {
    if(!(account && offchainMetaList)) return offchainMetaList
    return offchainMetaList.filter((tx) => (tx.from.toLowerCase() === account?.toLowerCase() && !tx.fromSig))
  },[offchainMetaList])

  return (
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
        <div className="flex w-full items-center justify-center h-[300px] sm-h-[450px] relative">
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
                          />
                      )
                  })}
                </CVoxelsPresenter>
              </div>
              <div className={tabState === "transactions" ? "block" : "hidden"} id="transactions">
                <div className="w-full max-w-[720px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll">
                  {(!offchainLoading && (!onlyPotentialCVoxels || onlyPotentialCVoxels.length===0)) && (
                    <NoItemPresenter text="No Potential C-Voxels Found..." />
                  )}
                  {offchainLoading && (
                    <CommonLoading />
                  )}
                  {!offchainLoading && onlyPotentialCVoxels.map((tx) => (
                    <div key={tx.hash} className="mb-4">
                      <TransactionItem tx={tx} account={account} onClickTx={selectTx} selectedTx={selectedTx} />
                      {(selectedTx && selectedTx?.hash===tx.hash) && (
                          <>
                          {selectedOffchainItem ? (
                            <TransactionDetail key={`${tx.hash}_detail`} account={account?.toLowerCase()} tx={tx} offchainItem={selectedOffchainItem} connectionStatus={connection.status} onClaim={publishFromExistedCVoxel} reClaim={reClaimCVoxel} cvoxels={sortCVoxels} />
                          ): (
                            <div key={`${tx.hash}_form_container`} className="mb-4">
                              <div key={`${tx.hash}_form`} className="w-full h-fit bg-white shadow-lg p-5 mb-4">
                                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                        {/* title */}
                                        <div className="flex flex-wrap items-center">
                                            <p className="font-semibold">Title</p>
                                        </div>
                                        <div className="mb-3">
                                            <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter title..'} {...register("summary", {required:'Please enter a summary'})} />
                                            <div className="w-full grid grid-cols-2 mb-2">
                                                <span className="cols-span-1 px-3 text-xs text-red-600">{errors.summary?.message}</span>
                                            </div>
                                        </div>
    
                                        {/* detail */}
                                        <div className="flex flex-wrap items-center">
                                        <p className="font-semibold">Description(optional)</p>
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} placeholder={'Enter detail..'} {...register("detail")} />
                                            <div className="w-full grid grid-cols-2 mb-2">
                                                <span className="cols-span-1 px-3 text-xs text-red-600">{errors.detail?.message}</span>
                                            </div>
                                        </div>
                                          <div className="flex flex-wrap items-center">
                                          <p className="font-semibold">Deliverable link(optional)</p>
                                        </div>
                                        <div className="mb-3">
                                            <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter deliverable..'} {...register("deliverable")} />
                                            <div className="w-full grid grid-cols-2 mb-2">
                                                <span className="cols-span-1 px-3 text-xs text-red-600">{errors.deliverable?.message}</span>
                                            </div>
                                        </div>
                                          <div className="text-right py-4 space-x-4 flex justify-end items-center">
                                            {connection.status ==="connecting" && (
                                              <CommonSpinner />
                                            )}
                                            <Button text={connection.status==="connected"? "Claim" : connection.status ==="connecting" ? "Connecitng..." : "Connect DID"} buttonType={"submit"} color={connection.status==="connected" ? "grad-blue": "grad-red"}/>
                                          </div>
                                      </form>
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
