import { useCallback } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { useStateThemeMode } from "@/recoilstate";

export const useThemeMode = () => {
  const { isClient } = useIsClient();
  const [mode, setMode] = useStateThemeMode();

  const setLightMode = useCallback(() => {
    localStorage.removeItem("theme");
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
    setMode("light");
  }, []);

  const setDarkMode = useCallback(() => {
    localStorage.removeItem("theme");
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
    setMode("dark");
  }, []);

  const setThemeMode = useCallback(() => {
    if (!isClient) {
      return;
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setMode("light");
    }
  }, [isClient]);

  return { setLightMode, setDarkMode, setThemeMode, themeMode: mode };
};
