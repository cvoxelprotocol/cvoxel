import { useMyPageScreen } from "@/hooks/useTab";
import { FC, useCallback, useMemo } from "react";
import { NoItemPresenter } from "../../../common/NoItemPresenter";
import { WorkCredentialWithId,removeCeramicPrefix } from "vess-sdk";
import { useSigRequest } from "@/hooks/useSigRequest";
import { SigRequestListItem } from "@/components/SigRequest/SigRequestListItem/SigRequestListItem";
import { useRouter } from "next/router";
import { NavBar } from "@/components/SigRequest/NavBar/NavBar";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useWorkCredential } from "@/hooks/useWorkCredential";
import { CommonLoading } from "@/components/common/CommonLoading";
import dynamic from "next/dynamic";

const SigRequestDetail = dynamic(
  () => import("@/components/SigRequest/SigRequestDetail/SigRequestDetail"),
  {
    ssr: false,
  }
);

export const MyNotificationContainer: FC = () => {
  const {did, account} = useDIDAccount()
  const {setScreenState} = useMyPageScreen()
  const { sigRequestList, isLoading, updateMetaList } = useSigRequest();
  const {signCredential} = useWorkCredential()

  const handleVerify = useCallback(
    async (crdl: WorkCredentialWithId) => {
      if(!crdl.backupId || !did) return
      const result = await signCredential(crdl.backupId, crdl, did)
        if (result) {
          updateMetaList()
          setScreenState("info")
          router.push(`/${did}`)
        }
    },
    [did,signCredential,updateMetaList,setScreenState]
  );

  const router = useRouter();

  const currentId = useMemo(() => {
    if (typeof router.query["crdl"] == "string") {
      return router.query["crdl"];
    }
  }, [router.query]);

  const currentCRDL = useMemo(() =>{
    if(!sigRequestList) return
    return sigRequestList.find((item) => item.backupId == removeCeramicPrefix(currentId))
  } ,[currentId, sigRequestList]);

  const handleClickNavBackButton = useCallback(() => {
    router.push(router.asPath.split("?")[0]);
  }, [router]);

  return useMemo(
    () => (
      <>
        <NavBar
          handleClickBackButton={handleClickNavBackButton}
          currentTxHash={currentId}
        />

        {!!currentCRDL ? (
          <div className="mt-6 sm:px-6">
            <SigRequestDetail
              offchainItem={currentCRDL}
              onVerify={handleVerify}
            />
          </div>
        ) : (
          <div className="w-full max-w-[820px] lg:h-[calc(100vh-5rem-2.5rem-3rem)] text-center mx-auto cursor-pointer h-screen overflow-y-scroll py-6 sm:px-6 space-y-6">
            {isLoading ? (
              <CommonLoading />
            ): (
              <>
                {(!sigRequestList || sigRequestList.length === 0) && (
                  <NoItemPresenter text="No Sig Requests yet..." />
                )}
                {sigRequestList &&
                  sigRequestList.length > 0 &&
                  sigRequestList.map((crdl) => {
                    return (
                      <div key={crdl.subject.tx?.txHash}>
                        <SigRequestListItem item={crdl} />
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        )}
      </>
    ),
    [sigRequestList, account, handleVerify, currentCRDL,isLoading]
  );
};
