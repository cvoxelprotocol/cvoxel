import { useMyPageScreen, useTab } from "@/hooks/useTab";
import { FC, useCallback, useContext, useMemo } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import type { CVoxelMetaDraft } from "@/interfaces";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { useSigRequest } from "@/hooks/useSigRequest";
import { SigRequestListItem } from "@/components/SigRequest/SigRequestListItem/SigRequestListItem";
import { useRouter } from "next/router";
import { NavBar } from "@/components/SigRequest/NavBar/NavBar";
import { SigRequestDetail } from "@/components/SigRequest/SigRequestDetail/SigRequestDetail";
import { useStateForceUpdate } from "@/recoilstate";
import { DIDContext } from "@/context/DIDContext";

export const MyNotificationContainer: FC = () => {
  const {did, account} = useContext(DIDContext)
  const { offchainMetaList } = useCVoxelList();
  const {setScreenState} = useMyPageScreen()
  const { verifyWithCeramic } = useSigRequest();
  // TODO: This is temporary solution because of useTileDoc bug
  const [_, setForceUpdateCVoxelList] = useStateForceUpdate();

  const handleVerify = useCallback(
    async (tx: CVoxelMetaDraft) => {
      const result = await verifyWithCeramic(tx);
        if (result) {
          setForceUpdateCVoxelList(v => !v);
          setScreenState("info")
          router.push(`/${did}/?voxel=${result}`)
        }
    },
    [did, verifyWithCeramic]
  );

  const sigRequestCVoxels = useMemo(() => {
    if (!(account && offchainMetaList)) return [];
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

  const router = useRouter();

  const currentTxHash = useMemo(() => {
    if (typeof router.query["tx"] == "string") {
      return router.query["tx"];
    }
  }, [router.query]);

  const currentTx = useMemo(
    () => sigRequestCVoxels?.find((item) => item.txHash == currentTxHash),
    [currentTxHash, sigRequestCVoxels]
  );

  const handleClickNavBackButton = useCallback(() => {
    router.push(router.asPath.split("?")[0]);
  }, [router]);

  return useMemo(
    () => (
      <>
        <NavBar
          handleClickBackButton={handleClickNavBackButton}
          currentTxHash={currentTxHash}
        />

        {!!currentTx ? (
          <div className="mt-6 sm:px-6">
            <SigRequestDetail
              offchainItem={currentTx}
              onVerify={handleVerify}
            />
          </div>
        ) : (
          <div className="w-full max-w-[820px] lg:h-[calc(100vh-5rem-2.5rem-3rem)] text-center mx-auto cursor-pointer h-screen overflow-y-scroll py-6 sm:px-6 space-y-6">
            {(!sigRequestCVoxels || sigRequestCVoxels.length === 0) && (
              <NoItemPresenter text="No Sig Requests yet..." />
            )}
            {sigRequestCVoxels &&
              sigRequestCVoxels.length > 0 &&
              sigRequestCVoxels.map((tx) => {
                return (
                  <div key={tx.txHash}>
                    <SigRequestListItem offchainItem={tx} />
                  </div>
                );
              })}
          </div>
        )}
      </>
    ),
    [sigRequestCVoxels, account, handleVerify]
  );
};
