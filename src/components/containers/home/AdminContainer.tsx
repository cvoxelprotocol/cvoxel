import CVoxelsPresenter from "@/components/CVoxel/CVoxelsPresenter";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { HomeTabsHeader } from "@/components/HomeTab/HomeTabsHeader";
import { MyCVoxelContainer } from "@/components/HomeTab/MyCVoxelContainer";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useTab } from "@/hooks/useTab";
import { CVoxels } from "@/interfaces";
import { Canvas } from "@react-three/fiber";
import { FC, useMemo } from "react";

type props = {
    content?: CVoxels | null
}
export const AdminContainer:FC<props> = ({content}) => {
    const { did, name, avator, account } = useMyCeramicAcount();
    const { tabState, setTabState } = useTab();

    

    return (
        <>
        <div className="flex-none w-full max-w-[720px] mx-auto">
          <HomeTabsHeader />
        </div>
        <div className="flex-none w-full">
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
            {/* {TransactionMemo} */}
          </div>
          <div
            className={tabState === "signatures" ? "block" : "hidden"}
            id="signatures"
          >
            {/* {sigRequestMemo} */}
          </div>
        </div>
        </>
    )
}