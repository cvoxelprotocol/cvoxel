import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { CVoxels } from "@/interfaces";
import { Canvas } from "@react-three/fiber";
import { FC, useMemo } from "react";

type props = {
    content?: CVoxels | null
}
export const CVoxelsContainer:FC<props> = ({content}) => {
    const { did, name, avator, account } = useMyCeramicAcount();

    const VisualizerPresenterMemo = useMemo(
        () => (
          <Canvas shadows>
            <VisualizerPresenter
              ids={content?.cVoxels.map((vox) => vox.id)}
            />
          </Canvas>
        ),
        [content]
      );

    const ProfileCardMemo = useMemo(
        () => (
          <>
            {account && !did && <ProfileCard name={account} />}
            {account && did && name && (
              <ProfileCard name={name} avator={avator} did={did} />
            )}
          </>
        ),
        [account, did, name, avator]
      );

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen pb-12">
            <div className="flex w-full items-center justify-center h-[300px] sm:h-[450px] relative max-w-[720px]">
                {VisualizerPresenterMemo}
            </div>
            <div className="flex-none mt-12 w-full max-w-[720px]">
                {ProfileCardMemo}
            </div>
        </div>
    )
}