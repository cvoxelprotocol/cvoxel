import { FC, useMemo } from "react";
import { MyProfileIcon } from "../Profile/MyProfileIcon";
import { HomeTabsHeader } from "./HomeTabsHeader";
import { useStateShowDrawer } from "@/recoilstate";
import { Drawer } from "../common/Drawer";
import { useTab } from "@/hooks/useTab";
import { TAB_NAME } from "@/interfaces";

export const HomeSPHeader: FC = () => {
  const [_, setOpen] = useStateShowDrawer() 
  const { tabState, setTabState } = useTab();

    const title = useMemo(() => {
        return TAB_NAME[tabState]
    },[tabState])

  return (
    <ul
      className={ "w-full grid items-center justify-around grid-cols-6 py-1"}
      role="tablist"
    >
      <li className="col-span-1 flex" onClick={()=>setOpen(true)}>
        <MyProfileIcon />
      </li>
      <li className="grow col-span-4 text-primary text-2xl font-bold">{title}</li>
      <li className="col-span-1 "></li>
      <Drawer>
        <div className="w-[250px]">
          <HomeTabsHeader />
        </div>
      </Drawer>
    </ul>
  );
};