import React, { ReactNode } from "react";
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

  return (
    <>
      <Meta />
      <div className={"text-sm " + styles.background_base}>
        {router.pathname.startsWith("/intro") ? (
          <div className="bg-white">{children}</div>
        ) : (
          <>
            <Header />
            <div className="mx-auto px-4 w-full min-h-screen overflow-y-scroll bg-white dark:bg-darkgray break-words">
              {children}
            </div>
            <Footer />
          </>
        )}
      </div>
      {isLoading && <LoadingModal />}
      <Toast />
      <Toaster />
      <CVoxelDetailBox />
    </>
  );
};
