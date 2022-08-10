import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCVoxelsRecord } from "@/hooks/useCVoxel";
import { CVoxelsContainer } from "@/components/containers/home/CVoxelsContainer";
import { Arrow } from "@/components/common/arrow/Arrow";
import { SearchData } from "@/components/common/search/Search";
import { Button } from "@/components/common/button/Button";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useRouter } from "next/router";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";
import { UserSearch } from "@/components/common/search/UserSearch";
import { UserCVoxelContainer } from "@/components/containers/profile/UserCVoxelContainer";

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

  const { account, connectWalletOnly, did: myDid } = useMyCeramicAcount();

  const handleSearch = (data: SearchData) => {
    if (!data.value) return;
    const link = data.value;
    router.push(`/${link}`);
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
              <div className="flex items-center w-full space-x-4 pb-3 border-b border-light-outline dark:border-dark-outline">
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
                      href={`/${myDid || account}`}
                      color="primary"
                      className="text-xs sm:text-base"
                    />
                  ) : (
                    <Button
                      text="Connect Wallet"
                      onClick={() => connect()}
                      color="primary"
                      className="text-xs sm:text-base"
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
