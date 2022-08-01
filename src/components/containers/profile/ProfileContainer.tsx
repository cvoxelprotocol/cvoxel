import { FC, useEffect, useMemo, useRef } from "react";
import { CeramicProps } from "@/interfaces/ceramic";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { NamePlate } from "@/components/common/NamePlate";
import { CVoxelsContainer } from "../home/CVoxelsContainer";
import { Arrow } from "@/components/common/arrow/Arrow";
import { UserCVoxelContainer } from "./UserCVoxelContainer";
import { useRouter } from "next/router";

export const ProfileContainer: FC<CeramicProps> = ({ did }) => {
  const myPageContainerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const CVoxelsRecords = useCVoxelsRecord(did);
  const router = useRouter();

  const currentVoxelID = useMemo(() => {
    if (typeof router.query["voxel"] == "string") {
      return router.query["voxel"];
    }
  }, [router.query]);

  useEffect(() => {
    if(currentVoxelID){
      scrollToInfo()
    }
  },[])

  const scrollToInfo = () => {
    myPageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToVisual = () => {
    visualContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="text-black dark:text-white text-center snap-y snap-mandatory h-screen overflow-scroll">
      <div
        className="relative snap-start snap-always min-h-screen"
        ref={visualContainerRef}
      >
        <CVoxelsContainer did={did} content={CVoxelsRecords.content}>
          <div className="absolute bottom-0 pb-12">
            <div className="relative mx-auto w-28 h-16 cursor-pointer">
              <button onClick={() => scrollToInfo()}>
                <Arrow size="lg" direction="down" />
              </button>
            </div>
          </div>
        </CVoxelsContainer>
      </div>
      <div className="snap-start snap-always min-h-screen pt-24" ref={myPageContainerRef}>
          <div className="mx-auto w-28 h-16 cursor-pointer">
              <button onClick={() => scrollToVisual()}>
                <Arrow size="lg" direction="up" />
              </button>
            </div>
        <div className="flex-none mb-6 w-fit mx-auto">
          <NamePlate size="lg" did={did} />
        </div>
        <div className="mx-auto flex-none w-full sm:w-[calc(100%-95px)] md:w-[calc(100%-280px)] max-w-[744px] col-span-1 ">
          <UserCVoxelContainer did={did} currentVoxelID={currentVoxelID}/>
        </div>
      </div>
    </main>
  );
};
