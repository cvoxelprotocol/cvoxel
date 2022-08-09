import { FC, useMemo, MouseEvent } from "react";
import Image from "next/image";
import { useTab } from "@/hooks/useTab";
import clsx from "clsx";
import { TabKey, TAB_NAME } from "@/interfaces";
import { useStateShowDrawer } from "@/recoilstate";
import { useRouter } from "next/router";
import VoxelsIcon from "@/components/HomeTab/voxels-icon.svg";
import TransactionIcon from "@/components/HomeTab/transaction-icon.svg";
import SearchIcon from "@/components/HomeTab/search-icon.svg";
import NotificationIcon from "@/components/HomeTab/notification-icon.svg";

type TabListItemProps = {
  type: TabKey;
};

export const TabListItem: FC<TabListItemProps> = ({ type }) => {
  const { tabState, setTabState } = useTab();
  const [open, setOpen] = useStateShowDrawer();

  const title = useMemo(() => {
    return TAB_NAME[type];
  }, [type]);

  const Icon = useMemo(() => {
    switch (type) {
      case "cvoxels":
        return <VoxelsIcon />;
      case "transactions":
        return <TransactionIcon />;
      case "search":
        return <SearchIcon />;
      case "notifications":
        return <NotificationIcon />;
    }
  }, [type]);

  const router = useRouter();
  const switchTab = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTabState(type);
    if (open) setOpen(false);
    if (!!router.asPath.split("?")[1]) {
      router.push(router.asPath.split("?")[0]);
    }
  };

  return (
    <li className="w-full ">
      <a
        className={clsx(
          "text-light-on-surface-variant dark:text-dark-on-surface-variant text-base md:text-lg leading-normal flex items-center space-x-1 py-3 my-1 px-2",
          tabState === type &&
            "bg-light-secondary-container dark:bg-dark-secondary-container rounded-full"
        )}
        onClick={switchTab}
        data-toggle="tab"
        href="#cvoxels"
        role="tablist"
      >
        <div
          className={clsx(
            "w-[36px] h-[29px] flex items-center justify-center sm:mx-auto md:mx-0"
          )}
        >
          <div
            className={clsx(
              "text-light-on-surface-variant dark:text-dark-on-surface-variant w-[26px] h-[26px]",
              tabState === type &&
                "text-light-on-secondary-container dark:text-dark-on-secondary-container"
            )}
          >
            {Icon}
          </div>
        </div>
        <span
          className={clsx(
            "ml-2 sm:hidden md:block text-light-on-surface-variant dark:text-dark-on-surface-variant",
            tabState === type &&
              "text-light-on-secondary-container dark:text-dark-on-secondary-container"
          )}
        >
          {title}
        </span>
      </a>
    </li>
  );
};
