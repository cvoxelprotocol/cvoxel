import { FC, useCallback } from "react";
import { useRouter } from "next/router";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { WorkCredentialWithId } from "vess-sdk";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";
import { CommonLoading } from "@/components/common/CommonLoading";
import { useMyPageScreen } from "@/hooks/useTab";
import { useWorkCredential } from "@/hooks/useWorkCredential";
import { useOffchainItem } from "@/hooks/useOffchainList";
import dynamic from "next/dynamic";

const SigRequestDetail = dynamic(
  () => import("@/components/SigRequest/SigRequestDetail/SigRequestDetail"),
  {
    ssr: false,
  }
);
type Props = {
  txId?: string;
};

export const SigRequestContainer: FC<Props> = ({ txId }) => {
  const {did} = useDIDAccount()
  const {isInitialLoading, offchainItem} = useOffchainItem(txId)
  const {signCredential} = useWorkCredential()
  const router = useRouter()
  const {setScreenState} = useMyPageScreen()

  const handleVerify = useCallback(
    async (crdl: WorkCredentialWithId) => {
      if(!crdl.ceramicId || !did) return
      const result = await signCredential(crdl.ceramicId, crdl, did)
        if (result) {
          setScreenState("info")
          router.push(`/${did}`)
        }
      },
    [did, router,setScreenState, signCredential]
  );

  return (
    <main className="text-center ">
      <div
        className="md:pt-12 md:overflow-hidden w-full">
        <div className="max-w-[820px] mx-auto mt-20 px-4">
            {isInitialLoading ? (<CommonLoading />): (
              <>
                {offchainItem ? (
                  <div className="mt-6 sm:px-6">
                    <div className="w-full mt-3 mb-7">
                      <h2 className="text-center font-bold text-xl text-light-primary dark:text-dark-primary">{`You have received a work credential signature request. Please connect a wallet and sign it.`}</h2>
                    </div>
                    <SigRequestDetail
                      offchainItem={offchainItem}
                      onVerify={handleVerify}
                      isSinglePageForVerify={true}
                    />
                  </div>
                ): (
                  <div className="mx-auto min-h-screen">
                    <NoItemPresenter text="No Item Found" />
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </main>
  );
};
