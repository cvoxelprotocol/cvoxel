import { FC, useCallback, useMemo, useRef } from "react";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import CVoxelsPresenter from "@/components/CVoxel/CVoxelsPresenter";
import { NoItemPresenter } from "@/components/common/NoItemPresenter";
import { CommonLoading } from "@/components/common/CommonLoading";
import { VoxelListItem } from "@/components/CVoxel/VoxelListItem/VoxelListItem";
import { CVoxelsContainer } from "@/components/containers/home/CVoxelsContainer";
import { Arrow } from "@/components/common/arrow/Arrow";
import { SearchData } from "@/components/common/search/Search";
import { Button } from "@/components/common/button/Button";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import Router from "next/router";
import { useRouter } from "next/router";
import { VoxelDetail } from "@/components/CVoxel/VoxelDetail/VoxelDetail";
import { useCVoxelList } from "@/hooks/useCVoxelList";
import { useStateForceUpdate } from "@/recoilstate";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";
import { UserSearch } from "@/components/common/search/UserSearch";

type Props = {
  did: string;
};

export const ProfileContainer: FC<Props> = ({ did }) => {
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

  const CVoxelsPresenterMemo = useMemo(
    () =>
      did == "" ? (
        <div className="mx-auto">
          <NoItemPresenter text="Not searched yet" />
        </div>
      ) : (
        <CVoxelsPresenter>
          {CVoxelsRecords.isLoading && <CommonLoading />}
          {!CVoxelsRecords.isLoading &&
            CVoxelsRecords.content?.WorkCredentials &&
            CVoxelsRecords.content.WorkCredentials.map((item) => {
              return <VoxelListItem key={item.id} item={item} />;
            })}
          {!CVoxelsRecords.isLoading && !CVoxelsRecords.content && (
            <div className="mx-auto">
              <NoItemPresenter text="No Voxels yet" />
            </div>
          )}
        </CVoxelsPresenter>
      ),
    [CVoxelsRecords.isLoading, CVoxelsRecords.content, did]
  );

  const myPageContainerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const scrollToInfo = () => {
    myPageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToVisual = () => {
    visualContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { account, connectWalletOnly } = useMyCeramicAcount();

  const handleSearch = (data: SearchData) => {
    if (!data.value) return;
    const link = data.value;
    Router.push(`/${link}`);
  };

  const connect = async () => {
    try {
      await connectWalletOnly();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const sortCVoxels = useMemo(() => {
    if (!CVoxelsRecords.content) return [];
    return CVoxelsRecords.content.WorkCredentials.sort((a, b) => {
      return Number(a.issuedTimestamp) > Number(b.issuedTimestamp) ? -1 : 1;
    });
  }, [CVoxelsRecords.content]);

  const router = useRouter();

  const currentVoxelID = useMemo(() => {
    if (typeof router.query["voxel"] == "string") {
      return router.query["voxel"];
    }
  }, [router.query]);

  const currentVoxel = useMemo(
    () => sortCVoxels.find((voxel) => voxel.id == currentVoxelID),
    [currentVoxelID, sortCVoxels]
  );

  const { offchainMetaList } = useCVoxelList();

  // TODO: This is temporary solution because of useTileDoc bug
  const [forceUpdateCVoxelList, setForceUpdateCVoxelList] =
    useStateForceUpdate();
  const forceReload = () => {
    setForceUpdateCVoxelList(true);
  };

  const handleClickNavBackButton = useCallback(() => {
    router.push(router.asPath.split("?")[0]);
  }, [router]);

  const handleClearUser = () => {
    router.push("/");
  };

  return (
    <main className="text-center ">
      <div
        className="relative snap-start snap-always min-h-screen"
        ref={visualContainerRef}
      >
        <CVoxelsContainer
          mode="search"
          content={{ ...CVoxelsRecords.content, WorkCredentials: sortCVoxels }}
          did={did}
          onClearUser={handleClearUser}
        >
          <div className="absolute bottom-0 pb-12">
            <div className="relative mx-auto cursor-pointer">
              <button onClick={() => scrollToInfo()}>
                <Arrow size="lg" direction="down" />
              </button>
            </div>
          </div>
        </CVoxelsContainer>
      </div>

      <div
        className="snap-start snap-always md:pt-12 md:h-[calc(100vh-3rem)] md:overflow-hidden"
        ref={myPageContainerRef}
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative lg:min-h-max">
            <div className="absolute top-2 left-0 right-0 hidden lg:block">
              <div className="mx-auto inline-block">
                <button onClick={scrollToVisual}>
                  <Arrow size="lg" direction="up" />
                </button>
              </div>
            </div>

            <div className="sm:w-[700px] pt-12 mx-auto">
              <div className="flex w-full space-x-4 pb-3 border-b border-light-outline dark:border-dark-outline">
                {!!currentVoxelID && (
                  <button onClick={handleClickNavBackButton}>
                    <LeftArrow className="text-light-on-surface-variant dark:text-dark-on-surface-variant " />
                  </button>
                )}
                <div className="hidden md:block flex-auto">
                  <UserSearch
                    onSubmit={handleSearch}
                    did={did}
                    onClearUser={handleClearUser}
                  />
                </div>
                <div className="md:hidden flex-auto">
                  <UserSearch
                    onSubmit={handleSearch}
                    did={did}
                    onClearUser={handleClearUser}
                    size="md"
                  />
                </div>
                <div className="flex-initial">
                  {account ? (
                    <Button
                      text="Go To Mypage"
                      href={`/${did || account}`}
                      color="primary"
                    />
                  ) : (
                    <Button
                      text="Connect Wallet"
                      onClick={() => connect()}
                      color="primary"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[820px] mx-auto">
            {!!currentVoxel ? (
              <div className="mt-6 sm:px-6">
                <VoxelDetail
                  item={currentVoxel}
                  offchainItems={offchainMetaList}
                  isOwner={true}
                  notifyUpdated={forceReload}
                />
              </div>
            ) : (
              CVoxelsPresenterMemo
            )}
          </div>
        </div>
      </div>
    </main>
  );

          {/*return (*/}
          {/*<main className="text-black dark:text-white text-center snap-y snap-mandatory h-screen overflow-scroll">*/}
          {/*  <div*/}
          {/*    className="relative snap-start snap-always min-h-screen"*/}
          {/*    ref={visualContainerRef}*/}
          {/*  >*/}
          {/*    <CVoxelsContainer did={did} content={CVoxelsRecords.content}>*/}
          {/*      <div className="absolute bottom-0 pb-12">*/}
          {/*        <div className="relative mx-auto w-28 h-16 cursor-pointer">*/}
          {/*          <button onClick={() => scrollToInfo()}>*/}
          {/*            <Arrow size="lg" direction="down" />*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </CVoxelsContainer>*/}
          {/*  </div>*/}
          {/*  <div className="snap-start snap-always min-h-screen pt-24" ref={myPageContainerRef}>*/}
          {/*    <div className="mx-auto w-28 h-16 cursor-pointer">*/}
          {/*      <button onClick={() => scrollToVisual()}>*/}
          {/*        <Arrow size="lg" direction="up" />*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*    <div className="flex-none mb-6 w-fit mx-auto">*/}
          {/*      <NamePlate size="lg" did={did} />*/}
          {/*    </div>*/}
          {/*    <div className="mx-auto flex-none w-full sm:w-[calc(100%-95px)] md:w-[calc(100%-280px)] max-w-[744px] col-span-1 ">*/}
          {/*      <UserCVoxelContainer did={did} currentVoxelID={currentVoxelID}/>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</main>*/}
          {/*);*/}
};
