import {
  useStateManageScreen,
  useStateManageTab,
  useStateManageTxTab,
} from "@/recoilstate";

export const useTab = () => {
  const [tabState, setTabState] = useStateManageTab();

  return {
    tabState,
    setTabState,
  };
};

export const useTxTab = () => {
  const [tabState, setTabState] = useStateManageTxTab();

  return {
    tabState,
    setTabState,
  };
};

export const useMyPageScreen = () => {
  const [screenState, setScreenState] = useStateManageScreen();
  return {
    screenState,
    setScreenState,
  };
};
