import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { FC, useCallback, useContext, useEffect, useRef } from "react";
import { CVoxelsContainer } from "./CVoxelsContainer";
import { MyPageContainer } from "./MyPageContainer";
import { Arrow } from "@/components/common/arrow/Arrow";
import { DIDContext } from "@/context/DIDContext";
import { useMyPageScreen, useTab } from "@/hooks/useTab";

export const HomeContainer: FC = () => {
  const {did} = useContext(DIDContext)
  const CVoxelsRecords = useCVoxelsRecord(did || "");
  const myPageContainerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const { setTabState } = useTab();
  const {screenState, setScreenState} = useMyPageScreen()

  const scrollToInfo = () => {
    myPageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToVisual = () => {
    visualContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(screenState==="visual"){
      scrollToVisual()
      setScreenState("visual")
    }
  },[screenState])

  const handleCreateNewVoxel = useCallback(() => {
    scrollToInfo()
    setTabState("transactions");
  }, [setTabState]);

  return (
    <main className="text-center">
      <div
        className="relative snap-start snap-always min-h-screen"
        ref={visualContainerRef}
      >
        <CVoxelsContainer did={did || ""} content={CVoxelsRecords.content} isMe moveToCreateSection={handleCreateNewVoxel}>
          <div className="absolute bottom-0 pb-12">
            <div className="relative mx-auto cursor-pointer hidden sm:block">
              <button onClick={() => scrollToInfo()}>
                <Arrow size="lg" direction="down" />
              </button>
            </div>

            <div className="relative mx-auto cursor-pointer sm:hidden">
              <button onClick={() => scrollToInfo()}>
                <Arrow size="sm" direction="down" />
              </button>
            </div>
          </div>
        </CVoxelsContainer>
      </div>
      <div className="snap-start snap-always pt-12" ref={myPageContainerRef}>
        <MyPageContainer
          scrollToVisual={() => scrollToVisual()}
          visualContainerRef={visualContainerRef}
        />
      </div>
    </main>
  );
};
