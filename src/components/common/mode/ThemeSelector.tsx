import React, { FC, useContext, useMemo } from "react";
import Light from "@/components/common/mode/light.svg";
import Dark from "@/components/common/mode/dark.svg";
import { useThemeMode } from "@/hooks/useThemeMode";
import { ShareButton } from "../button/shareButton/ShareButton";
import { DIDContext } from "@/context/DIDContext";
import { useRouter } from "next/router";

type Props = {};
export const ThemeModeSelector: FC<Props> = () => {
  const {did} = useContext(DIDContext)
  const router = useRouter()
  const { setLightMode, setDarkMode } = useThemeMode();

  const isOwner = useMemo(() => {
    if(!did) return false
    return router.asPath.includes(did)
  },[did,router])

  return (
    <div className="w-10 h-24 bg-light-surface-1 dark:bg-dark-surface-1 dark:border-dark-primary dark:border rounded-full relative">
      <div className="dark:hidden absolute top-2 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container">
        <button onClick={setDarkMode}>
          <Light />
        </button>
      </div>

      <div className=" hidden absolute top-2 left-1 w-8 h-8 dark:flex items-center justify-center rounded-full bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container">
        <button onClick={setLightMode}>
          <Dark />
        </button>
      </div>
      <div className="absolute bottom-2 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container">
        <ShareButton valiant="icon" isOwner={isOwner} displayAt={"right"}/>
      </div>
    </div>
  );
};
