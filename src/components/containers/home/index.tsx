import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC, useRef } from "react";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import {CVoxelsContainer} from "./CVoxelsContainer"
import { MyPageContainer } from "./MyPageContainer";
import Image from "next/image"

export const HomeContainer: FC = () => {
  const { did } = useMyCeramicAcount();
  const CVoxelsRecords = useCVoxelsRecord(did);
  const MyPageContainerRef = useRef<HTMLDivElement>(null);
  const scrollToInfo = () => {
    MyPageContainerRef.current?.scrollIntoView({behavior: "smooth"})
  }

  return (
    <main className="text-black dark:text-white text-center snap-y snap-mandatory h-screen overflow-scroll">
      <div className="relative snap-start snap-always min-h-screen">
        <CVoxelsContainer content={CVoxelsRecords.content} >
          <div className="absolute bottom-0 pb-12">
            <div className="relative mx-auto w-28 h-16 cursor-pointer">
              <Image src={"/scrollInfoButton.svg"} alt="scroll info" layout={"fill"} onClick={() => scrollToInfo()}/>
            </div>
          </div>
        </CVoxelsContainer>
      </div>
      <div className="snap-start snap-always pt-32" ref={MyPageContainerRef}>
        <MyPageContainer />
      </div>
    </main>
  );
};
