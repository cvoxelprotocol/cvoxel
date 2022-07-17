import { HomeSPHeader } from "@/components/HomeTab/HomeSPHeader";
import { HomeTabsHeader } from "@/components/HomeTab/HomeTabsHeader";
import { MyCVoxelContainer } from "@/components/containers/home/tabs/MyCVoxelContainer";
import { useTab } from "@/hooks/useTab";
import { CVoxels } from "@/interfaces";
import { FC } from "react";
import { MyTxContainer } from "./tabs/MyTxContainer";
import { MyNotificationContainer } from "./tabs/MyNotificationContainer";

type props = {
    content?: CVoxels | null
}
export const MyPageContainer:FC<props> = ({content}) => {
    const { tabState } = useTab();

    return (
        <div className="relative w-full max-w-5xl min-h-screen border-t border-secondary mx-auto">
          <div className="sm:flex sm:grid-cols-2">
            <div className="sm:hidden w-full">
              <HomeSPHeader />
            </div>
          <div className="hidden sm:block md:w-[280px] col-span-1">
            <HomeTabsHeader />
          </div>
          <div className="flex-none w-full sm:w-[calc(100%-95px)] md:w-[calc(100%-280px)] max-w-[744px] col-span-1">
            <div
              className={tabState === "cvoxels" ? "block" : "hidden"}
              id="cvoxels"
            >
              <MyCVoxelContainer />
            </div>
            <div
              className={tabState === "transactions" ? "block" : "hidden"}
              id="transactions"
            >
              <MyTxContainer />
            </div>
            <div
              className={tabState === "notifications" ? "block" : "hidden"}
              id="notifications"
            >
              <MyNotificationContainer />
            </div>
          </div>
          </div>
        </div>
    )
}