import React, { FC } from "react";
import Light from "@/components/common/mode/light.svg";
import Dark from "@/components/common/mode/dark.svg";
import { useThemeMode } from "@/hooks/useThemeMode";

type Props = {};
export const ThemeModeSelector: FC<Props> = () => {
  const { setLightMode, setDarkMode } = useThemeMode();

  return (
    <div className="w-10 h-24 bg-light-surface-1 dark:bg-dark-surface-1 dark:border-dark-primary dark:border rounded-full relative">
      <div className="dark:hidden absolute top-2 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container">
        <button onClick={setDarkMode}>
          <Light />
        </button>
      </div>

      <div className=" hidden dark:block absolute bottom-2 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container">
        <button onClick={setLightMode}>
          <Dark />
        </button>
      </div>
    </div>
  );
};
