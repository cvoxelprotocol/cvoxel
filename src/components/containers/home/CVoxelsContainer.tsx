import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useCVoxelDetailBox } from "@/hooks/useCVoxelDetailBox";
import { CVoxels } from "@/interfaces";
import { Canvas } from "@react-three/fiber";
import { FC, useMemo, ReactNode } from "react";
import { NamePlate } from "@/components/common/NamePlate";
import Router from "next/router";

type props = {
  did: string
  content?: CVoxels | null;
  children?: ReactNode;
};
export const CVoxelsContainer: FC<props> = ({ did, content, children }) => {
  // NOTE: Cannot be called by VisualPresenter, so call it here
  const { showDetailBox } = useCVoxelDetailBox();

  const VisualizerPresenterMemo = useMemo(
    () => (
      <Canvas shadows>
        <VisualizerPresenter
          ids={content?.WorkCredentials.map((vox) => vox.id)}
          showDetailBox={showDetailBox}
        />
      </Canvas>
    ),
    [content]
  );

  const handleClickNamePlate = () => {
    if (!did) return;
    Router.push(`/${did}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen pb-12">
      <div className="flex w-full items-center justify-center h-[300px] sm:h-[450px] relative max-w-[720px]">
        {VisualizerPresenterMemo}
      </div>
      <div className="flex-none mt-12 w-full max-w-[720px]">
        <div className="w-fit mx-auto">
          <NamePlate did={did} size="lg" onClick={handleClickNamePlate} isMe />
        </div>
      </div>
      {children}
    </div>
  );
};
