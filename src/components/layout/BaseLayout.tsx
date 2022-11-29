import React, { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { useModal } from "@/hooks/useModal";
import { Toaster } from "react-hot-toast";
import { Meta } from "./parts/Meta";
import { CVoxelDetailBox } from "@/components/CVoxel/CVoxelDetailBox";
import { useIsClient } from "@/hooks/useIsClient";
import { useThemeMode } from "@/hooks/useThemeMode";
import { ThemeModeSelector } from "@/components/common/mode/ThemeSelector";
import { DeworkModal } from "../Dework/DeworkModal";
import { ConnectDeworkCard } from "../Dework/ConnectDeworkCard";
import { DeworkTaskList } from "../Dework/DeworkTaskList";
import { useDework } from "@/hooks/useDework";
import dynamic from "next/dynamic";

const LoadingModal = dynamic(
  () => import("@/components/common/LoadingModal"),
);

const Toast = dynamic(
  () => import("@/components/common/toast/Toast"),
  {
    ssr: false,
  }
);

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export const BaseLayout = ({ children }: Props) => {
  const { isLoading } = useModal();
  const { isClient } = useIsClient();
  const { setThemeMode } = useThemeMode();
  const {isDeworkConnectOpen,isDeworkTaskListOpen } = useDework()

  useEffect(() => {
    setThemeMode();
  }, [isClient]);

  return (
    <div className="flex">
      <Meta />
      <div className="text-sm bg-light-background dark:bg-dark-background relative w-screen h-screen overflow-y-scroll overflow-x-hidden">
        <div className="relative snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
            <Header />
            <CVoxelDetailBox />
            <div className="mx-auto -m-[72px] md:px-4 w-full break-words">
              {children}
            </div>

            <div className="absolute top-0 bottom-0 left-4 items-center hidden lg:flex">
             <ThemeModeSelector />
            </div>
          </div>
      </div>
      {isLoading && <LoadingModal />}
      <Toast />
      <Toaster />
      {isDeworkConnectOpen && (
          <DeworkModal>
            <ConnectDeworkCard />
          </DeworkModal>
        )}
        {isDeworkTaskListOpen && (
          <DeworkModal>
            <DeworkTaskList />
        </DeworkModal>
        )}
    </div>
  );
};
