import Image from "next/image"
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC, useCallback, useMemo, useState} from "react";
import { CVoxelItem } from "../CVoxel/CVoxelItem";
import CVoxelsPresenter from "../CVoxel/CVoxelsPresenter";
import { RequestState, useConnection } from '@self.id/framework'
import { Canvas } from "@react-three/fiber";
import { CVoxel, CVoxelItem as ICVoxelItem, CVoxelMetaDraft } from "@/interfaces/cVoxelType";
import VisualizerPresenter from "../CVoxel/visualizerPresenter";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import ProfileCardPresenter from "../profile/ProfileCardPresenter";
import { HomeTabsHeader } from "./parts/HomeTabsHeader";
import { useTab } from "@/hooks/useTab";
import { ConnectWalletButton } from "../common/button/ConnectWalletButton";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { NoItemPresenter } from "../common/NoItemPresenter";
import { formatBigNumber } from "@/utils/ethersUtil";
import { TransactionLog } from "@/interfaces/explore";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import Button from '@/components/presenters/common/button/Button'
import { useVerifyCVoxel } from "@/hooks/useVerifyCVoxel";
import { CommonLoading } from "../common/CommonLoading";
import { ModelTypes } from "@datamodels/identity-profile-basic";
import { useToast } from "@/hooks/useToast";

export const HomePresenter:FC = () => {
  const {connection, did, name, avator, account} = useMyCeramicAcount()
  const connect = useConnection<ModelTypes>()[1];
  const {potentialTxes, offchainMetaList, txLoading,offchainLoading } = useCVoxelList()
  const CVoxelsRecords = useCVoxelsRecord(did)
  const [selectedTx, selectTx] = useState<TransactionLog | null>(null)
  const {tabState, setTabState} = useTab()
  const draft = useDraftCVoxel()
  const {verifyCVoxel, createDraftWithVerify} = useVerifyCVoxel()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CVoxel>({defaultValues: draft.defaultVal});
      const onSubmit = (data:any) => {
          publish(data)
      }

    const publish = useCallback(async (data:CVoxel) => {
      if(!(selectedTx && account)) return
      if(account?.toLowerCase()===selectedTx.from.toLowerCase() ) {
        // only create draft
        const result = await createDraftWithVerify(data, selectedTx, account)
        if(result){
          selectTx(null)
        }
        return
      } else {
        const result = await draft.publish(data, selectedTx, account)
        if(result){
          selectTx(null)
          reset(draft.defaultVal)
          setTabState('cvoxels');
        }
      }
    }, [draft])

    const verify = async(tx:CVoxelMetaDraft) => {
      await verifyCVoxel(tx)
    }

    const updateCVoxel = (item: ICVoxelItem) => {
      console.log("Hi")
    }

    const selectedOffchainItem = useMemo(() => {
      if(!selectedTx) return null
      return offchainMetaList?.find(meta => meta.txHash===selectedTx.hash)
    },[selectedTx, offchainMetaList])

    const sortCVoxels = useMemo(() => {
      if(!CVoxelsRecords.content) return []
      return CVoxelsRecords.content.cVoxels.sort((a, b) => {
        return Number(a.issuedTimestamp) >
        Number(b.issuedTimestamp)
          ? -1
          : 1;
      });

    },[CVoxelsRecords])
    

    return (
      <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
        <div className="flex flex-col items-center w-full h-full pb-12">
          <div className="flex w-full items-center justify-center pb-8 h-1/4">
            <Canvas shadows>
              <VisualizerPresenter />
            </Canvas>
          </div>
          <div className="flex-none mb-12 w-full max-w-[720px]">
            {!account && (
              <ConnectWalletButton />
            )}
            {(account && !did) && (
              <ProfileCardPresenter name={account}/>
            )}
            {(account && did && name) && (
              <ProfileCardPresenter name={name} avator={avator}/>
            )}
          </div>
          <div className="flex-none w-full max-w-[720px]">
            <HomeTabsHeader />
          </div>
          <div className="flex-none w-full">
            <div className={tabState === "cvoxels" ? "block" : "hidden"} id="cvoxels">
                <CVoxelsPresenter>
                  {(!CVoxelsRecords.content?.cVoxels || CVoxelsRecords.content?.cVoxels.length===0) && (
                    <NoItemPresenter text="No C-Voxels yet..." />
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
                            onClickUpdate={updateCVoxel}
                          />
                      )
                  })}
                </CVoxelsPresenter>
              </div>
              <div className={tabState === "transactions" ? "block" : "hidden"} id="transactions">
                <div className="w-full max-w-[820px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll">
                  {(!potentialTxes || potentialTxes.length===0) && (
                    <NoItemPresenter text="No Potential C-Voxels yet..." />
                  )}
                  {offchainLoading && (
                    <CommonLoading />
                  )}
                  {!offchainLoading && potentialTxes.map((tx) => (
                    <>
                      <div key={tx.hash} className="rounded-lg shadow-lg bg-white mt-3" onClick={()=>selectTx(tx)}>
                        <p className="py-2 "> {account?.toLowerCase()===tx.from.toLowerCase() ? "You're payer" : "You're payee"}/ {formatBigNumber(tx.value, 8)} {tx.tokenSymbol ? tx.tokenSymbol: "ETH"} / {tx.hash} / {tx.from} </p>
                      </div>
                      {(selectedTx && selectedTx?.hash===tx.hash) && (
                          <>
                          {selectedOffchainItem ? (
                            <div key={`${tx.hash}_detail`} className="w-full h-fit bg-white text-left">
                              <div className="flex flex-wrap items-center">
                                <p>title</p>
                              </div>
                              <div className="mx-2 md:mx-9">
                                  <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">{selectedOffchainItem.summary}</p>
                              </div>

                              {/* detail */}
                              <div className="flex flex-wrap items-center">
                                <p>description</p>
                              </div>
                              <div className="mx-2 md:mx-9">
                                  <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} readOnly value={selectedOffchainItem.detail || "No Description"} />
                              </div>
                                <div className="flex flex-wrap items-center">
                                  <p>Deliverable link</p>
                              </div>
                              <div className="mx-2 md:mx-9">
                                  <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm">{selectedOffchainItem.deliverable || "No Deliverable"}</p>
                              </div>
                                <div className="text-right py-4 mx-2 md:mx-9 space-x-4">
                                    <Button
                                            size="medium"
                                            variant="contained"
                                            color="secondary"
                                            text="Close"
                                            buttonType="button"
                                            onClick={() => selectTx(null)}
                                        />
                                </div>
                            </div>
                          ): (
                            <div key={`${tx.hash}_form_container`}>
                              {selectedTx.from.toLowerCase() === account?.toLowerCase() && (
                                <div key={`${tx.hash}_form`} className="w-full h-fit bg-white">
                                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                        {/* title */}
                                        <div className="flex flex-wrap items-center">
                                            <p>title</p>
                                        </div>
                                        <div className="mx-2 md:mx-9">
                                            <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter title..'} {...register("summary", {required:'Please enter a summary'})} />
                                            <div className="w-full grid grid-cols-2 mb-2">
                                                <span className="cols-span-1 px-3 text-xs text-red-600">{errors.summary?.message}</span>
                                            </div>
                                        </div>
    
                                        {/* detail */}
                                        <div className="flex flex-wrap items-center">
                                          <p>description</p>
                                        </div>
                                        <div className="mx-2 md:mx-9">
                                            <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} placeholder={'Enter detail..'} {...register("detail")} />
                                            <div className="w-full grid grid-cols-2 mb-2">
                                                <span className="cols-span-1 px-3 text-xs text-red-600">{errors.detail?.message}</span>
                                            </div>
                                        </div>
                                          <div className="flex flex-wrap items-center">
                                            <p>Deliverable link</p>
                                        </div>
                                        <div className="mx-2 md:mx-9">
                                            <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter deliverable..'} {...register("deliverable")} />
                                            <div className="w-full grid grid-cols-2 mb-2">
                                                <span className="cols-span-1 px-3 text-xs text-red-600">{errors.deliverable?.message}</span>
                                            </div>
                                        </div>
                                          <div className="text-right py-4 mx-2 md:mx-9 space-x-4">
                                              <Button
                                                      size="medium"
                                                      variant="contained"
                                                      color="primary"
                                                      text={"Claim"}
                                                      buttonType="submit"
                                                  />
                                              <Button
                                                      size="medium"
                                                      variant="contained"
                                                      color="secondary"
                                                      text="Close"
                                                      buttonType="button"
                                                      onClick={() => selectTx(null)}
                                                  />
                                          </div>
                                      </form>
                                </div>
                              )}
                              {selectedTx.to.toLowerCase() === account?.toLowerCase() && (
                                <>
                                  {connection.status==="connected" ? (
                                    <div key={`${tx.hash}_form`} className="w-full h-fit bg-white">
                                      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                            {/* title */}
                                            <div className="flex flex-wrap items-center">
                                                <p>title</p>
                                            </div>
                                            <div className="mx-2 md:mx-9">
                                                <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter title..'} {...register("summary", {required:'Please enter a summary'})} />
                                                <div className="w-full grid grid-cols-2 mb-2">
                                                    <span className="cols-span-1 px-3 text-xs text-red-600">{errors.summary?.message}</span>
                                                </div>
                                            </div>
        
                                            {/* detail */}
                                            <div className="flex flex-wrap items-center">
                                              <p>description</p>
                                            </div>
                                            <div className="mx-2 md:mx-9">
                                                <textarea className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm" rows={3} placeholder={'Enter detail..'} {...register("detail")} />
                                                <div className="w-full grid grid-cols-2 mb-2">
                                                    <span className="cols-span-1 px-3 text-xs text-red-600">{errors.detail?.message}</span>
                                                </div>
                                            </div>
                                              <div className="flex flex-wrap items-center">
                                                <p>Deliverable link</p>
                                            </div>
                                            <div className="mx-2 md:mx-9">
                                                <input className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm" placeholder={'Enter deliverable..'} {...register("deliverable")} />
                                                <div className="w-full grid grid-cols-2 mb-2">
                                                    <span className="cols-span-1 px-3 text-xs text-red-600">{errors.deliverable?.message}</span>
                                                </div>
                                            </div>
                                              <div className="text-right py-4 mx-2 md:mx-9 space-x-4">
                                                  <Button
                                                          size="medium"
                                                          variant="contained"
                                                          color="primary"
                                                          text={connection.status==="connected" ? "Claim": "Connect Ceramic"}
                                                          buttonType="submit"
                                                      />
                                                  <Button
                                                          size="medium"
                                                          variant="contained"
                                                          color="secondary"
                                                          text="Close"
                                                          buttonType="button"
                                                          onClick={() => selectTx(null)}
                                                      />
                                              </div>
                                          </form>
                                    </div>
                                  ): (
                                    <div className="w-full text-center py-4 shadow-lg bg-white">
                                      <p className="text-xs md:text-lg text-primary font-bold">Please Connect Ceramic Account to Create CVoxel</p>
                                      <div className="w-full flex justify-center items-center py-4 ">
                                      <Button
                                          size="medium"
                                          variant="contained"
                                          color="primary"
                                          text="Connect Ceramic"
                                          buttonType="button"
                                          onClick={() => connect()}
                                      />
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                          </>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className={tabState === "signatures" ? "block" : "hidden"} id="signatures">
              <div className="w-full max-w-[820px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll">
                  {(!offchainMetaList || offchainMetaList.filter((tx) => tx.from.toLowerCase() === account?.toLowerCase()).length===0) && (
                    <NoItemPresenter text="No Sig Requests yet..." />
                  )}
                  {(offchainMetaList && offchainMetaList.filter((tx) => tx.from.toLowerCase() === account?.toLowerCase()).length>0) && offchainMetaList.filter((tx) => tx.from.toLowerCase() === account?.toLowerCase()).map((tx) => {
                    return(
                      <div key={tx.txHash} className="rounded-lg shadow-lg bg-white mt-3 py-2">
                        <p className="py-2 "> {formatBigNumber(tx.value, 8)} {tx.tokenSymbol ? tx.tokenSymbol: "ETH"} / {tx.txHash} / {tx.from} </p>
                        {(tx.fromSig && tx.fromSig !== "") ? (
                                <Button
                                  size="medium"
                                  variant="contained"
                                  color="primary"
                                  text="Already Verified"
                                  buttonType="button"
                            />
                          ): (
                          <Button
                              size="medium"
                              variant="contained"
                              color="primary"
                              text="Accept"
                              buttonType="button"
                              onClick={() => verify(tx)}
                          />
                        )}
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