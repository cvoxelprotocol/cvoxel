import { FC, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { CeramicProps } from "@/interfaces/ceramic";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { useUserCeramicAcount } from "@/hooks/useCeramicAcount";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import CVoxelsPresenter from "@/components/CVoxel/CVoxelsPresenter";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { CommonLoading } from "@/components/common/CommonLoading";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { NamePlate } from "@/components/common/NamePlate";

export const ProfileContainer: FC<CeramicProps> = ({ did }) => {
  const { name, avator, profileRecord } = useUserCeramicAcount(did);
  const CVoxelsRecords = useCVoxelsRecord(did);

  const CVoxelsPresenterMemo = useMemo(
    () => (
      <CVoxelsPresenter>
        {CVoxelsRecords.isLoading && <CommonLoading />}
        {!CVoxelsRecords.isLoading &&
          CVoxelsRecords.content?.WorkCredentials &&
          CVoxelsRecords.content.WorkCredentials.map((item) => {
            return <VoxelListItem key={item.id} item={item} />;
          })}
        {!CVoxelsRecords.isLoading && !CVoxelsRecords.content && (
          <div className="mx-auto">
            <NoItemPresenter text="No C-Voxels yet..." />
          </div>
        )}
      </CVoxelsPresenter>
    ),
    [CVoxelsRecords.isLoading, CVoxelsRecords.content, did]
  );

  const VisualizerPresenterMemo = useMemo(() => {
    // avoid warning "useLayoutEffect does nothing on the server"
    if (typeof window === undefined) return <></>;
    return (
      <Canvas shadows>
        <VisualizerPresenter
          ids={
            CVoxelsRecords.content
              ? CVoxelsRecords.content.WorkCredentials.map((vox) => vox.id)
              : []
          }
        />
      </Canvas>
    );
  }, [CVoxelsRecords.content, process.browser]);

  return (
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
        <div className="flex w-full items-center justify-center h-[450px] relative max-w-[720px]">
          {VisualizerPresenterMemo}
        </div>
        <div className="flex-none mb-12 w-fit">
          <NamePlate size="lg" did={did} />
        </div>
        {CVoxelsPresenterMemo}
      </div>
    </main>
  );
};
