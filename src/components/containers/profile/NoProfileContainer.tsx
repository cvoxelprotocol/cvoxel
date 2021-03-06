import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { AvatarPlaceholder } from "@self.id/ui";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import CVoxelsPresenter from "@/components/CVoxel/CVoxelsPresenter";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";

export const NoProfileContainer: FC = () => {
  return (
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
        <div className="flex w-full items-center justify-center h-[450px] relative">
          <Canvas shadows>
            <VisualizerPresenter />
          </Canvas>
        </div>
        <div className="flex-none mb-12 w-full max-w-[720px]">
          <div className="flex h-auto justify-center items-center self-center rounded-full space-x-2 border w-fit py-1 px-2.5 border-secondary mx-auto">
            <div className="w-[40px] h-[40px] rounded-full bg-onglass-weak overflow-hidden">
              <AvatarPlaceholder size={40} />
            </div>
            <div className="w-fit mt-2 mb-1 text-xs md:text-sm font-bold text-primary dark:text-secondary text-center">
              No DID Found
            </div>
          </div>
        </div>
        <CVoxelsPresenter>
          <div className="mx-auto">
            <NoItemPresenter text="No C-Voxels yet..." />
          </div>
        </CVoxelsPresenter>
      </div>
    </main>
  );
};
