import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC, useRef } from "react";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { CVoxelsContainer } from "./CVoxelsContainer";
import { MyPageContainer } from "./MyPageContainer";
import Image from "next/image";
import { Arrow } from "@/components/common/arrow/Arrow";

export const HomeContainer: FC = () => {
  const { did } = useMyCeramicAcount();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const myPageContainerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const scrollToInfo = () => {
    myPageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToVisual = () => {
    visualContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="text-center snap-y snap-mandatory h-screen">
      <div
        className="relative snap-start snap-always min-h-screen"
        ref={visualContainerRef}
      >
        <CVoxelsContainer content={CVoxelsRecords.content}>
          <div className="absolute bottom-0 pb-12">
            <div className="relative mx-auto cursor-pointer">
              <button onClick={() => scrollToInfo()}>
                <Arrow size="lg" direction="down" />
              </button>
            </div>
          </div>
        </CVoxelsContainer>
      </div>
      <div className="snap-start snap-always pt-12" ref={myPageContainerRef}>
        <MyPageContainer scrollToVisual={() => scrollToVisual()} />
      </div>
    </main>
  );
};
