import { FC, useCallback, useMemo } from "react";
import { HomeTabsHeader } from "./HomeTabsHeader";
import { useStateShowDrawer } from "@/recoilstate";
import { Drawer } from "../common/Drawer";
import { useTab } from "@/hooks/useTab";
import { TAB_NAME } from "@/interfaces";
import { NamePlate } from "@/components/common/NamePlate";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useRouter } from "next/router";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";

export const HomeSPHeader: FC = () => {
  const [_, setOpen] = useStateShowDrawer();
  const { tabState, setTabState } = useTab();
  const { did } = useMyCeramicAcount();

  const title = useMemo(() => {
    return TAB_NAME[tabState];
  }, [tabState]);

  const router = useRouter();
  const isVoxelDetail = useMemo(() => {
    if (!router.isReady) {
      return false;
    }

    return router.pathname == "/[did]" && !!router.query["voxel"];
  }, [router.isReady, router.pathname, router.asPath]);

  const isSigRequestDetail = useMemo(() => {
    if (!router.isReady) {
      return false;
    }

    return router.pathname == "/[did]" && !!router.query["tx"];
  }, [router.isReady, router.pathname, router.asPath]);

  const handleClickNavBackButton = useCallback(() => {
    router.push(router.asPath.split("?")[0]);
  }, [router]);

  return (
    <ul
      className={"w-full grid items-center justify-around grid-cols-6 py-1"}
      role="tablist"
    >
      {isVoxelDetail || isSigRequestDetail ? (
        <button onClick={handleClickNavBackButton}>
          <LeftArrow className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
        </button>
      ) : (
        <li className="col-span-1 flex" onClick={() => setOpen(true)}>
          <NamePlate did={did} isMe iconOnly />
        </li>
      )}

      <li className="grow col-span-4 text-primary text-2xl font-bold">
        {title}
      </li>
      <li className="col-span-1 "></li>
      <Drawer>
        <div className="w-[250px]">
          <HomeTabsHeader />
        </div>
      </Drawer>
    </ul>
  );
};
