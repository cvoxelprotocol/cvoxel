import { FC, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { CVoxelsContainer } from "@/components/containers/home/CVoxelsContainer";
import { Arrow } from "@/components/common/arrow/Arrow";
import { SearchData } from "@/components/common/search/Search";
import { Button } from "@/components/common/button/Button";
import { useRouter } from "next/router";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";
import { UserSearch } from "@/components/common/search/UserSearch";
import { UserCVoxelContainer } from "@/components/containers/profile/UserCVoxelContainer";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { DIDContext } from "@/context/DIDContext";
import Image from "next/image";
import { useWorkCredentials } from "@/hooks/useWorkCredential";

type Props = {
  did: string;
};

export const ProfileContainer: FC<Props> = ({ did }) => {
  const {workCredentials} = useWorkCredentials(did)
  const router = useRouter();

  const isTopPage = useMemo(() => {
    return router.asPath==="/"
  },[router.asPath])

  const currentVoxelID = useMemo(() => {
    if (typeof router.query["voxel"] == "string") {
      return router.query["voxel"];
    }
  }, [router.query]);

  useEffect(() => {
    if (currentVoxelID) {
      scrollToInfo();
    }
  }, []);

  const myPageContainerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const scrollToInfo = () => {
    myPageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToVisual = () => {
    visualContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {did:myDid, account} = useContext(DIDContext)
  const { connect } = useWalletAccount();

  const handleSearch = (data: SearchData) => {
    if (!data.value) return;
    const link = data.value;
    router.push(`/${link}`);
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
          content={workCredentials}
          did={did}
          onClearUser={handleClearUser}
        >
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
        {isTopPage && (
          <div className="absolute z-0 w-full max-w-[720px] h-[300px] sm:h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 flex items-center justify-center bg-white dark:bg-opacity-0 bg-opacity-50">
            <div className="w-[240px] sm:w-[320px] h-[64px] sm:h-[120px] relative mx-auto">
                <Image src={"/vess_logo_full.png"} alt="no item" objectFit="contain"  layout="fill" />
            </div>
          </div>
        )}
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

            <div className="sm:w-[700px] px-2 sm:px-0 pt-12 mx-auto">
              <div className="flex items-center w-full space-x-1 sm:space-x-4 pb-3 border-b border-light-outline dark:border-dark-outline">
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
                      text="Mypage"
                      href={`/${myDid || account}`}
                      color="primary"
                      className="text-sm sm:text-base"
                    />
                  ) : (
                    <Button
                      text="Connect"
                      onClick={() => connect()}
                      color="primary"
                      className="text-sm sm:text-base"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <UserCVoxelContainer did={did} currentVoxelID={currentVoxelID} />
        </div>
      </div>
    </main>
  );
};
