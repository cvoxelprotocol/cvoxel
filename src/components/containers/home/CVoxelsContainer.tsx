import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { useWorkCredentialDetailBox } from "@/hooks/useCVoxelDetailBox";
import { Canvas } from "@react-three/fiber";
import { FC, useMemo, ReactNode } from "react";
import { NamePlate } from "@/components/common/NamePlate";
import Router from "next/router";
import { SearchData } from "@/components/common/search/Search";
import { UserSearch } from "@/components/common/search/UserSearch";
import { NoCRDLItem } from "./NoCRDLItem";
import { Button } from "@/components/common/button/Button";
import { WorkCredentialWithId } from "@/interfaces";

type props = {
  did: string;
  content?: WorkCredentialWithId[] | null;
  children?: ReactNode;
  mode?: "nameplate" | "search";
  isMe?: boolean
  onClearUser?: () => void;
  moveToCreateSection?: () => void
};
export const CVoxelsContainer: FC<props> = ({
  did,
  content,
  children,
  mode = "nameplate",
  isMe = false,
  onClearUser,
  moveToCreateSection
}) => {
  // NOTE: Cannot be called by VisualPresenter, so call it here
  const { showDetailBox } = useWorkCredentialDetailBox();

  const VisualizerPresenterMemo = useMemo(
    () => (
      <Canvas shadows>
        <VisualizerPresenter
          workCredentials={content}
          showDetailBox={showDetailBox}
        />
      </Canvas>
    ),
    [content,showDetailBox]
  );

  const handleClickNamePlate = () => {
    if (!did) return;
    Router.push(`/${did}`);
  };

  const handleSearch = (data: SearchData) => {
    if (!data.value) return;
    const link = data.value;
    Router.push(`/${link}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen md:pb-12">
      <div className="flex w-full items-center justify-center h-[300px] sm:h-[450px] relative max-w-[720px]">
        {isMe && (!content || content.length===0) ? (
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
      </div>
      {mode == "nameplate" && (
        <div className="flex-none mt-12 w-full max-w-[720px]">
          <div className="w-fit mx-auto">
            <NamePlate
              did={did}
              size="lg"
              onClick={handleClickNamePlate}
              isMe
            />
          </div>
        </div>
      )}
      {mode == "search" && did != undefined && onClearUser != undefined && (
        <div className="w-[320px] sm:w-[500px] mt-24">
          <div className="hidden md:block">
            <UserSearch
              onSubmit={handleSearch}
              did={did}
              onClearUser={onClearUser}
              className="mx-auto"
            />
          </div>
          <div className="md:hidden">
            <UserSearch
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
