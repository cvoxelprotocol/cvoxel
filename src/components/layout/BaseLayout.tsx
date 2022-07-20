import React, { ReactNode, useEffect } from "react";
import styles from "@/styles/Layout.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useModal } from "@/hooks/useModal";
import { LoadingModal } from "@/components/common/LoadingModal";
import { Toaster } from "react-hot-toast";
import { Meta } from "./parts/Meta";
import { useRouter } from "next/dist/client/router";
import { Toast } from "@/components/common/toast/Toast";
import { CVoxelDetailBox } from "@/components/CVoxel/CVoxelDetailBox";
import { ThemeModeSelector } from "@/components/common/mode/ThemeSelector";
import { useIsClient } from "@/hooks/useIsClient";
import { useThemeMode } from "@/hooks/useThemeMode";

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
      <div className={"text-sm " + styles.background_base}>
        {router.pathname.startsWith("/intro") ? (
          <div className="bg-white">{children}</div>
        ) : (
          <div className="relative">
            <Header />
            <div className="mx-auto px-4 w-full min-h-screen overflow-y-scroll bg-white dark:bg-darkgray break-words">
              {children}
            </div>
            <Footer />

            <div className="absolute top-0 bottom-0 left-4 items-center hidden lg:flex">
              <ThemeModeSelector />
            </div>
          </div>
        )}
      </div>
      {isLoading && <LoadingModal />}
      <Toast />
      <Toaster />
      <CVoxelDetailBox />
    </div>
  );
};
