import { useTab } from "@/hooks/useTab";
import { FC, useMemo, useCallback } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import type {  CVoxelMetaDraft } from "@/interfaces";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { SigRequestItem } from "@/components/SigRequest/SigRequestItem";
import { useSigRequest } from "@/hooks/useSigRequest";


export const MyNotificationContainer:FC = () => {
    const { did, account } =
    useMyCeramicAcount();
    const { offchainMetaList } = useCVoxelList();
  const {  setTabState } = useTab();
  const { verifyWithCeramic, verifyWithoutCeramic } = useSigRequest();


  const verify = useCallback(
    async (tx: CVoxelMetaDraft) => {
      if (did) {
        const result = await verifyWithCeramic(tx);
        if (result) {
          setTabState("cvoxels");
        }
      } else {
        await verifyWithoutCeramic(tx);
      }
    },
    [did, verifyWithCeramic, verifyWithoutCeramic]
  );

  const sigRequestCVoxels = useMemo(() => {
    if (!(account && offchainMetaList)) return offchainMetaList;
    return offchainMetaList.filter(
      (tx) =>
        tx.relatedAddresses.includes(account?.toLowerCase()) &&
        !(
          tx.fromSig &&
          tx.fromSigner &&
          tx.fromSigner.toLowerCase() === account?.toLowerCase()
        ) &&
        !(
          tx.toSig &&
          tx.toSigner &&
          tx.toSigner.toLowerCase() === account?.toLowerCase()
        )
    );
  }, [offchainMetaList, account]);

  const sigRequestMemo = useMemo(
    () => (
      <div className="w-full max-w-[820px] text-center mx-auto cursor-pointer h-screen overflow-y-scroll space-y-2">
        {(!sigRequestCVoxels || sigRequestCVoxels.length === 0) && (
          <NoItemPresenter text="No Sig Requests yet..." />
        )}
        {sigRequestCVoxels &&
          sigRequestCVoxels.length > 0 &&
          sigRequestCVoxels.map((tx) => {
            return (
              <div key={tx.txHash}>
                <SigRequestItem
                  tx={tx}
                  account={account}
                  handleClick={() => verify(tx)}
                />
              </div>
            );
          })}
      </div>
    ),
    [sigRequestCVoxels, account, verify]
  );

    return sigRequestMemo
}