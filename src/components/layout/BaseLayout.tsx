import React, { ReactNode } from "react";
import styles from "@/styles/Layout.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useModal } from "@/hooks/useModal";
import { LoadingModal } from "@/components/presenters/common/LoadingModal"
import { Toaster } from "react-hot-toast";
import { Meta } from "./parts/Meta";
config.autoAddCss = false;

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export const BaseLayout = ({
  children
}: Props) => {

  const {isLoading} = useModal()
  
  return (
    <>
    <Meta />
      <div className={"text-sm " + styles.background_base}>
        <Header />
        <div className="mx-auto px-4 w-full min-h-screen overflow-y-scroll pt-16 md:pt-24 bg-white dark:bg-darkgray break-words">
          {children}
        </div>
        <Footer />
      </div>
      {isLoading && (
        <LoadingModal />
      )}
      <Toaster />
    </>
  );
}
