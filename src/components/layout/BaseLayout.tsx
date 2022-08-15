import React, { ReactNode, useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Header } from "./Header";
import { useModal } from "@/hooks/useModal";
import { LoadingModal } from "@/components/common/LoadingModal";
import { Toaster } from "react-hot-toast";
import { Meta } from "./parts/Meta";
import { useRouter } from "next/dist/client/router";
import { Toast } from "@/components/common/toast/Toast";
import { CVoxelDetailBox } from "@/components/CVoxel/CVoxelDetailBox";
import { useIsClient } from "@/hooks/useIsClient";
import { useThemeMode } from "@/hooks/useThemeMode";
import { ThemeModeSelector } from "@/components/common/mode/ThemeSelector";

config.autoAddCss = false;

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export const BaseLayout = ({ children }: Props) => {
  const router = useRouter();
  const { isLoading } = useModal();

  const { isClient } = useIsClient();
  const { setThemeMode } = useThemeMode();

  useEffect(() => {
    setThemeMode();
  }, [isClient]);

  return (
    <div className="flex">
      <Meta />
      <div className="text-sm bg-light-background dark:bg-dark-background relative w-screen h-screen overflow-y-scroll overflow-x-hidden">
        {router.pathname.startsWith("/intro") ? (
          <div className="bg-white">{children}</div>
        ) : (
          <div className="relative snap-y snap-mandatory h-screen overflow-auto">
            <Header />
            <CVoxelDetailBox />
            <div className="mx-auto -m-[72px] md:px-4 w-full break-words">
              {children}
            </div>

            <div className="absolute top-0 bottom-0 left-4 items-center hidden lg:flex">
             <ThemeModeSelector />
            </div>
          </div>
        )}
      </div>
      {isLoading && <LoadingModal />}
      <Toast />
      <Toaster />
    </div>
  );
};
