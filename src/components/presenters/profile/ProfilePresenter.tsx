import { ProfileCard } from "@/components/containers/profile/ProfileCard";
import Image from "next/image";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC } from "react";
import { CVoxelItem } from "../CVoxel/CVoxelItem";
import CVoxelsPresenter from "../CVoxel/CVoxelsPresenter";
import type { RequestState } from "@self.id/framework";
import { Canvas } from "@react-three/fiber";
import { CVoxelItem as ICVoxelItem } from "@/interfaces/cVoxelType";
import VisualizerPresenter from "../CVoxel/visualizerPresenter";
type Props = {
  did: string;
  state: RequestState;
};

export const ProfilePresenter: FC<Props> = ({ did }) => {
  const CVoxelsRecords = useCVoxelsRecord(did);

  const handleClick = (item: ICVoxelItem) => {
    console.log(item);
  };

  return (
    <main className="h-screen text-white">
      <div className="flex flex-col items-center w-full h-full mt-20 md:mt-0 pb-12">
        <div className="flex w-full items-center justify-center pb-8">
          {/* <div className="relative flex justify-center items-center w-24 h-24 md:w-48 md:h-48">
                <Image src="/voxels.png"layout="fill" alt="voxel"/>
              </div> */}
          <Canvas shadows>
            <VisualizerPresenter
              did={CVoxelsRecords.content?.cVoxels.map((vox) => vox.id)}
            />
          </Canvas>
        </div>
        <div className="flex-none mb-12 w-full max-w-[720px]">
          <ProfileCard did={did} />
        </div>
        <CVoxelsPresenter>
          {CVoxelsRecords.content?.cVoxels &&
            CVoxelsRecords.content.cVoxels.map((item) => {
              return <CVoxelItem did={did} item={item} key={item.id} />;
            })}
        </CVoxelsPresenter>
      </div>
    </main>
  );
};
