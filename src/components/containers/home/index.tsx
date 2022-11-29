import { FC, useCallback, useEffect, useRef } from "react";
import { Arrow } from "@/components/common/arrow/Arrow";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { useMyPageScreen, useTab } from "@/hooks/useTab";
import { useWorkCredentials } from "@/hooks/useWorkCredential";
import dynamic from "next/dynamic";
import { useHeldEventAttendances } from "@/hooks/useHeldEventAttendances";

const CVoxelsContainer = dynamic(
  () => import("@/components/containers/home/CVoxelsContainer"),
  {
    ssr: false,
  }
);

const MyPageContainer = dynamic(
  () => import("@/components/containers/home/MyPageContainer"),
  {
    ssr: false,
  }
);

export const HomeContainer: FC = () => {
  const {did} = useDIDAccount()
  const {workCredentials, migrateAccount, isInitialLoading} = useWorkCredentials(did)
  const {HeldEventAttendances, migrateHeldEvent, isFetchingHeldEventAttendances} = useHeldEventAttendances(did)
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
    if(!isInitialLoading && (!workCredentials || workCredentials?.length===0) && did){
      migrateAccount()
    }
  },[workCredentials, did,isInitialLoading])

  useEffect(() => {
    if(!isFetchingHeldEventAttendances && (!HeldEventAttendances || HeldEventAttendances?.length===0) && did){
        migrateHeldEvent()
    }
  },[HeldEventAttendances, did,isFetchingHeldEventAttendances])

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
        <CVoxelsContainer did={did || ""} content={workCredentials || []} isLoading={isInitialLoading} isMe moveToCreateSection={handleCreateNewVoxel}>
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
