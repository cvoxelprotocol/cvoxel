import { useTxTab } from "@/hooks/useTab";
import { FC, useEffect } from "react";
import { useOffchainList } from "@/hooks/useOffchainList";
import { TxTabs } from "@/components/Transaction/TxTabs";
import { TransactionListContainer } from "@/components/Transaction/TransactionListContainer";
import { useStateForceUpdate } from "@/recoilstate";


export const MyTxContainer:FC = () => {
    const { sentTXList, recievedTXList, offchainMetaList, offchainLoading,updateMetaList } = useOffchainList();
    const [forceUpdateCVoxelList, _] = useStateForceUpdate();
    const {tabState} = useTxTab()

    useEffect(() => {
      updateMetaList()
    },[forceUpdateCVoxelList])
  
    return (
      <>
        <TxTabs />
        <div
          className={tabState === "received" ? "block" : "hidden"}
          id="received"
        >
          <TransactionListContainer txList={recievedTXList} offchainLoading={offchainLoading} offchainMetaList={offchainMetaList} />
        </div>
        <div
          className={tabState === "sent" ? "block" : "hidden"}
          id="sent"
        >
          <TransactionListContainer txList={sentTXList} offchainLoading={offchainLoading} offchainMetaList={offchainMetaList} />
        </div>
      </>
    )
}