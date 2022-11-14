import { FC, useCallback, useContext, useEffect, useRef } from "react";
import { CVoxelsContainer } from "./CVoxelsContainer";
import { MyPageContainer } from "./MyPageContainer";
import { Arrow } from "@/components/common/arrow/Arrow";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useMyPageScreen, useTab } from "@/hooks/useTab";
import { useWorkCredentials } from "@/hooks/useWorkCredential";

export const HomeContainer: FC = () => {
  const {did} = useDIDAccount()
  const {workCredentials, migrateAccount, isLoading} = useWorkCredentials(did)
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

  useEffect(() => {
    if(workCredentials?.length===0 && did){
      migrateAccount()
    }
  },[workCredentials, did])

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
        <CVoxelsContainer did={did || ""} content={workCredentials || []} isLoading={isLoading} isMe moveToCreateSection={handleCreateNewVoxel}>
          <div className="absolute bottom-10 pb-12">
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
