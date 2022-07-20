import { FC, useMemo, MouseEvent } from "react";
import Image from "next/image";
import { useTab } from "@/hooks/useTab";
import clsx from "clsx";
import { TabKey, TAB_NAME } from "@/interfaces";
import { useStateShowDrawer } from "@/recoilstate";
import { useRouter } from "next/router";

type TabListItemProps = {
  type: TabKey;
};

export const TabListItem: FC<TabListItemProps> = ({ type }) => {
  const { tabState, setTabState } = useTab();
  const [open, setOpen] = useStateShowDrawer();

  const title = useMemo(() => {
    return TAB_NAME[type];
  }, [type]);

  const icon = useMemo(() => {
    return `/icon/header/${type}.svg`;
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
          "text-primary text-base md:text-2xl leading-normal flex items-center space-x-1 py-3 px-2",
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
          <Image src={icon} alt={title} width={26} height={26} className="text-light-on-surface-variant dark:text-dark-on-surface-variant" />
        </div>
        <span className="ml-2 sm:hidden md:block text-light-on-surface-variant dark:text-dark-on-surface-variant">
          {title}
        </span>
      </a>
    </li>
  );
};
