import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC, useCallback, useMemo, useState } from "react";
import { CVoxelItem } from "../CVoxel/CVoxelItem";
import CVoxelsPresenter from "../CVoxel/CVoxelsPresenter";
import { useConnection } from "@self.id/framework";
import { Canvas } from "@react-three/fiber";
import {
  CVoxel,
  CVoxelMetaDraft,
} from "@/interfaces/cVoxelType";
import VisualizerPresenter from "../CVoxel/visualizerPresenter";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import ProfileCardPresenter from "../profile/ProfileCardPresenter";
import { HomeTabsHeader } from "./parts/HomeTabsHeader";
import { useTab } from "@/hooks/useTab";
import { ConnectWalletButton } from "../common/button/ConnectWalletButton";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { NoItemPresenter } from "../common/NoItemPresenter";
import { TransactionLog } from "@/interfaces/explore";
import { useForm } from "react-hook-form";
import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import Button from "@/components/presenters/common/button/Button";
import { useVerifyCVoxel } from "@/hooks/useVerifyCVoxel";
import { CommonLoading } from "../common/CommonLoading";
import { ModelTypes } from "@datamodels/identity-profile-basic";
import { TransactionItem } from "../transactions/TransactionItem";
import { SigRequestItem } from "../requests/SigRequestItem";
import { SigButton } from "../common/button/SigButton";
import { Box, Spinner } from 'grommet'

export const HomePresenter: FC = () => {
  const { connection, did, name, avator, account } = useMyCeramicAcount();
  const connect = useConnection<ModelTypes>()[1];
  const { potentialTxes, offchainMetaList, txLoading, offchainLoading } =
    useCVoxelList();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const [selectedTx, selectTx] = useState<TransactionLog | null>(null);
  const { tabState, setTabState } = useTab();
  const draft = useDraftCVoxel();
  const { verifyCVoxel, createDraftWithVerify } = useVerifyCVoxel();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CVoxel>({ defaultValues: draft.defaultVal });
  const onSubmit = (data: any) => {
    publish(data);
  };

  const publish = useCallback(
    async (data: CVoxel) => {
      if (!(selectedTx && account)) return;
      if (account?.toLowerCase() === selectedTx.from.toLowerCase()) {
        // only create draft
        const result = await createDraftWithVerify(data, selectedTx, account);
        if (result) {
          selectTx(null);
        }
        return;
      } else {
        const result = await draft.publish(data, selectedTx, account);
        if (result) {
          selectTx(null);
          reset(draft.defaultVal);
          setTabState("cvoxels");
        }
      }
    },
    [draft]
  );

  const verify = async (tx: CVoxelMetaDraft) => {
    await verifyCVoxel(tx);
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

  const onlyPotentialCVoxels = useMemo(() => {
    if(!account) return potentialTxes
    return potentialTxes.filter(tx => tx.to.toLowerCase()===account.toLowerCase())
  },[potentialTxes])

  return (
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
        <div className="flex w-full items-center justify-center h-[450px] relative">
          <Canvas shadows>
            <VisualizerPresenter
              ids={CVoxelsRecords.content?.cVoxels.map((vox) => vox.id)}
              account={!!account}
            />
          </Canvas>
        </div>
        <div className="flex-none mb-12 w-full max-w-[720px]">
          {!account && <ConnectWalletButton />}
          {account && !did && <ProfileCardPresenter name={account} />}
          {account && did && name && (
            <ProfileCardPresenter name={name} avator={avator} />
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
                  {(!potentialTxes || onlyPotentialCVoxels.length===0) && (
                    <NoItemPresenter text="No Potential C-Voxels yet..." />
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
                            <div key={`${tx.hash}_detail`} className="w-full h-fit bg-white text-left shadow-lg p-5 mb-4">
                              <div className="flex flex-wrap items-center">
                              <p className="font-semibold">Title</p>
                              </div>
                              <div className="mb-3">
                                  <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">{selectedOffchainItem.summary}</p>
                              </div>

                              {/* detail */}
                              <div className="flex flex-wrap items-center">
                              <p className="font-semibold">Description(optional)</p>
                              </div>
                              <div className="mb-3">
                                  <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} readOnly value={selectedOffchainItem.detail || "No Description"} />
                              </div>
                                <div className="flex flex-wrap items-center">
                                <p className="font-semibold">Deliverable link(optional)</p>
                              </div>
                              <div className="mb-3">
                                  <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">{selectedOffchainItem.deliverable || "No Deliverable"}</p>
                              </div>
                            </div>
                          ): (
                            <div key={`${tx.hash}_form_container`} className="mb-4">
                              {selectedTx.from.toLowerCase() === account?.toLowerCase() && (
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
                                          <div className="text-right py-4 mx-2 md:mx-9 space-x-4">
                                            <SigButton text={"Claim"} type={"submit"}/>
                                          </div>
                                      </form>
                                </div>
                              )}
                              {selectedTx.to.toLowerCase() === account?.toLowerCase() && (
                                <>
                                  {connection.status==="connected" ? (
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
                                              <div className="text-right py-4 mx-2 md:mx-9 space-x-4">
                                                  <SigButton text={"Claim"} type={"submit"}/>
                                              </div>
                                          </form>
                                    </div>
                                  ): (
                                    <div className="w-full text-center py-4 shadow-lg bg-white  p-5 mb-4">
                                      <p className="text-xs md:text-lg text-primary font-bold">Please Connect Ceramic Account to Create CVoxel</p>
                                      <div className="w-full flex justify-center items-center py-4 ">
                                        {connection.status==="connecting" ? (
                                          <div className="md:w-60 rounded-full flex items-center space-x-2">
                                            <Box pad="xxsmall">
                                              <Spinner />
                                            </Box>
                                            <p className="text-primary dark:text-white text-sm hidden md:block">
                                                {"Connecting..."}
                                              </p>
                                            </div>
                                        ): (
                                          <Button
                                              size="medium"
                                              variant="contained"
                                              color="primary"
                                              text="Connect Ceramic"
                                              buttonType="button"
                                              onClick={() => connect()}
                                          />
                                        )}
                                        {connection.status==="failed" && (
                                          <div className="md:w-60 rounded-full flex items-center space-x-2">
                                          <p className="text-primary dark:text-white text-sm hidden md:block">
                                              {"Something Went Wrong..."}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
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
                  {(!offchainMetaList || offchainMetaList.filter((tx) => tx.from.toLowerCase() === account?.toLowerCase()).length===0) && (
                    <NoItemPresenter text="No Sig Requests yet..." />
                  )}
                  {(offchainMetaList && offchainMetaList.filter((tx) => tx.from.toLowerCase() === account?.toLowerCase()).length>0) && offchainMetaList.filter((tx) => tx.from.toLowerCase() === account?.toLowerCase()).map((tx) => {
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
