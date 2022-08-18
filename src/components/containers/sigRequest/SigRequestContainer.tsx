import { FC, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { DIDContext } from "@/context/DIDContext";
import { useSigRequest } from "@/hooks/useSigRequest";
import { useOffchainItem } from "@/hooks/useOffchainItem";
import { CVoxelMetaDraft } from "@/interfaces";
import { useStateForceUpdate } from "@/recoilstate";
import { SigRequestDetail } from "@/components/SigRequest/SigRequestDetail/SigRequestDetail";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";
import { CommonLoading } from "@/components/common/CommonLoading";
import { useMyPageScreen, useTab } from "@/hooks/useTab";

type Props = {
  txId?: string;
};

export const SigRequestContainer: FC<Props> = ({ txId }) => {
  const {did, account} = useContext(DIDContext)
  const {isLoading, offchainitem} = useOffchainItem(txId)
  const {verifyWithCeramic} = useSigRequest()
  const [_, setForceUpdateCVoxelList] = useStateForceUpdate();
  const router = useRouter()
  const {setScreenState} = useMyPageScreen()

  const handleVerify = useCallback(
    async (tx: CVoxelMetaDraft) => {
      const result = await verifyWithCeramic(tx);
        if (result) {
          setForceUpdateCVoxelList(v => !v);
          setScreenState("info")
          router.push(`/${did}/?voxel=${result}`)
        }
      },
    [did, router, setForceUpdateCVoxelList,setScreenState, verifyWithCeramic]
  );

  return (
    <main className="text-center ">
      <div
        className="md:pt-12 md:overflow-hidden w-full">
        <div className="max-w-[820px] mx-auto mt-20 px-4">
            {isLoading ? (<CommonLoading />): (
              <>
                {offchainitem ? (
                  <div className="mt-6 sm:px-6">
                    <SigRequestDetail
                      offchainItem={offchainitem}
                      onVerify={handleVerify}
                      isVeriftSinglePage={true}
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
