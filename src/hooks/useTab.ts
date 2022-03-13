import { useStateManageTab } from "@/recoilstate";

export const useTab = () => {
  const [tabState, setTabState] = useStateManageTab();

  return {
    tabState,
    setTabState,
  };
};
