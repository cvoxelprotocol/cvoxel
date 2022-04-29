import { FC, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CeramicProps } from "@/interfaces/ceramic";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { useUserCeramicAcount } from "@/hooks/useCeramicAcount";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import CVoxelsPresenter from "@/components/CVoxel/CVoxelsPresenter";
import { CVoxelItem } from "@/components/CVoxel/CVoxelItem";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";
import { ProfileCard } from "@/components/Profile/ProfileCard";

export const ProfileContainer: FC<CeramicProps> = ({ did }) => {

  const {name, avator, setUserProfile,profileRecord } = useUserCeramicAcount(did)
  const CVoxelsRecords = useCVoxelsRecord(did);

  useEffect(() => {
    let isMounted = true
    if(did && isMounted) {
      setUserProfile(did)
    }
    return () => {
      isMounted = false
    }
  },[did, setUserProfile])

  return (
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
      <div className="flex w-full items-center justify-center h-[450px] relative max-w-[720px]">
          <Canvas shadows>
            <VisualizerPresenter
              ids={CVoxelsRecords.content ? CVoxelsRecords.content.cVoxels.map((vox) => vox.id): []}
            />
          </Canvas>
        </div>
        <div className="flex-none mb-12 w-full max-w-[720px]">
          <ProfileCard did={did} name={name} avator={avator} isLoading={profileRecord.isLoading} />
        </div>
        <CVoxelsPresenter>
          {CVoxelsRecords.content?.cVoxels &&
            CVoxelsRecords.content.cVoxels.map((item) => {
              return <CVoxelItem did={did} holder={name} item={item} key={item.id} isOwner={false} />;
            })}
          {!CVoxelsRecords.content && (
            <div className="mx-auto">
              <NoItemPresenter text="No C-Voxels yet..." />
          </div>
          )}
        </CVoxelsPresenter>
      </div>
    </main>
  );
};
