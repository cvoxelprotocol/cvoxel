import { useWorkCredentialDetailBox } from "@/hooks/useCVoxelDetailBox";
import { FC, useMemo, ReactNode } from "react";
import Router from "next/router";
import { SearchData } from "@/components/common/search/Search";
import { NoCRDLItem } from "./NoCRDLItem";
import { Button } from "@/components/common/button/Button";
import { WorkCredentialWithId } from "vess-sdk";
import { UserSearchWithProfile } from "@/components/common/search/UserSearchWithProfile";
import { CommonLoading } from "@/components/common/CommonLoading";
import dynamic from "next/dynamic";

const MainProfileCard = dynamic(
  () => import("@/components/Profile/MainProfileCard"),
  {
    ssr: false,
  }
);
const VisualizerPresenterWrapper = dynamic(
  () => import("@/components/CVoxel/VisualizerPresenterWrapper"),
  {
    ssr: false,
  }
);

type props = {
  did: string;
  isLoading: boolean
  content: WorkCredentialWithId[]
  children?: ReactNode;
  mode?: "nameplate" | "search";
  isMe?: boolean
  onClearUser?: () => void;
  moveToCreateSection?: () => void
};
export default function CVoxelsContainer({
  did,
  isLoading = false,
  content,
  children,
  mode = "nameplate",
  isMe = false,
  onClearUser,
  moveToCreateSection
}:props) {
  // NOTE: Cannot be called by VisualPresenter, so call it here
  const { showDetailBox } = useWorkCredentialDetailBox();

  const VisualizerPresenterMemo = useMemo(
    () => (
      <VisualizerPresenterWrapper content={content} showDetailBox={showDetailBox} />
    ),
    [content,showDetailBox]
  );

  const handleSearch = (data: SearchData) => {
    if (!data.value) return;
    const link = data.value;
    Router.push(`/${link}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen md:pb-12">
      <div className="flex w-full items-center justify-center h-[350px] sm:h-[450px] relative max-w-[280px] sm:max-w-[720px] ">
        {(isLoading) ? (
          <CommonLoading />
        ): (
          <>
            {isMe && content.length===0 ? (
              <div className="w-full">
                <NoCRDLItem />
                  <Button
                    text="Create New Voxel"
                    color="primary"
                    onClick={moveToCreateSection}
                  />
              </div>
            ): (
              <>
                {VisualizerPresenterMemo}
              </>
            )}
          </>
        )}
      </div>
      {mode == "nameplate" && (
        <div className="flex-none mt-6 w-full max-w-[720px] mb-14">
          <div className="w-fit mx-auto">
            <MainProfileCard did={did} />
          </div>
        </div>
      )}
      {mode == "search" && did != undefined && onClearUser != undefined && (
        <div className="w-[320px] sm:w-[500px] sm:mt-24">
          <div className="hidden md:block">
            <UserSearchWithProfile
              onSubmit={handleSearch}
              did={did}
              onClearUser={onClearUser}
              className="mx-auto"
            />
          </div>
          <div className="md:hidden">
            <UserSearchWithProfile
              onSubmit={handleSearch}
              did={did}
              onClearUser={onClearUser}
              className="mx-auto"
              size="md"
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
