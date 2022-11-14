import { FC, RefObject, useCallback, useMemo } from "react";
import { HomeTabsHeader } from "./HomeTabsHeader";
import { useStateShowDrawer } from "@/recoilstate";
import { Drawer } from "../common/Drawer";
import { useTab } from "@/hooks/useTab";
import { TAB_NAME } from "@/interfaces";
import { useRouter } from "next/router";
import LeftArrow from "@/components/CVoxel/NavBar/left-arrow.svg";
import { Arrow } from "@/components/common/arrow/Arrow";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import dynamic from "next/dynamic";

const NamePlate = dynamic(
  () => import("@/components/common/NamePlate"),
  {
    ssr: false,
  }
);

type Props = {
  visualContainerRef: RefObject<HTMLDivElement>;
};

export const HomeSPHeader: FC<Props> = ({ visualContainerRef }) => {
  const [_, setOpen] = useStateShowDrawer();
  const { tabState } = useTab();
  const {did} = useDIDAccount()

  const title = useMemo(() => {
    return TAB_NAME[tabState];
  }, [tabState]);

  const router = useRouter();
  const isVoxelDetail = useMemo(() => {
    if (!router.isReady) {
      return false;
    }

    return router.pathname == "/[did]" && !!router.query["voxel"];
  }, [router.isReady, router.pathname, router.query]);

  const isSigRequestDetail = useMemo(() => {
    if (!router.isReady) {
      return false;
    }

    return router.pathname == "/[did]" && !!router.query["crdl"];
  }, [router.isReady, router.pathname, router.query]);

  const handleClickNavBackButton = useCallback(() => {
    router.push(router.asPath.split("?")[0]);
  }, [router]);

  const scrollToVisual = () => {
    visualContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul
      className={
        "w-full items-center justify-around grid-cols-6 bg-light-surface-1 dark:bg-dark-surface-1 px-4 py-2 flex"
      }
      role="tablist"
    >
      {isVoxelDetail || isSigRequestDetail ? (
        <button onClick={handleClickNavBackButton}>
          <LeftArrow className="w-6 h-6 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
        </button>
      ) : (
        <li className="w-[20%] flex" onClick={() => setOpen(true)}>
          <NamePlate did={did} isMe iconOnly hasBackgroundColor />
        </li>
      )}

      <li className="grow w-[60%] text-light-on-primary-container dark:text-dark-on-primary-container text-[1.375rem]">
        {title}
      </li>
      <li className="w-[20%]">
        <button onClick={scrollToVisual}>
          <Arrow size="sm" direction="up" />
        </button>
      </li>
      <Drawer>
        <div className="w-[250px]">
          <HomeTabsHeader />
        </div>
      </Drawer>
    </ul>
  );
};
