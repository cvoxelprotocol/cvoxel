import { FC, useMemo, MouseEvent } from "react";
import Image from "next/image"
import { useTab } from "@/hooks/useTab";
import clsx from 'clsx';
import { TabKey, TAB_NAME } from "@/interfaces";
import { useStateShowDrawer } from "@/recoilstate";

type TabListItemProps = {
    type: TabKey
    clickTab: () => void
}


export const TabListItem:FC<TabListItemProps> = ({type, clickTab}) => {
    const { tabState, setTabState } = useTab();
    const [open, setOpen] = useStateShowDrawer()

    const title = useMemo(() => {
        return TAB_NAME[type]
    },[type])

    const icon = useMemo(() => {
        return `/icon/header/${type}.svg`
    },[type])

    const switchTab = (e:MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setTabState(type);
      if(open) setOpen(false)
    }

    return (
        <li className="w-full py-3">
            <a
              className={clsx("text-primary text-base md:text-2xl leading-normal flex items-center space-x-1",tabState === type ? " font-bold " : " font-medium ")}
              onClick={switchTab}
              data-toggle="tab"
              href="#cvoxels"
              role="tablist"
            >
              <div className={clsx("w-[36px] h-[29px] flex items-center justify-center sm:mx-auto md:mx-0",tabState === type && "bg-[url('/icon/header/bg-icon.svg')]  bg-no-repeat")}>
                <Image src={icon} alt={title} width={26} height={26}/>
              </div>
              <span className="ml-2 sm:hidden md:block">{title}</span>
            </a>
        </li>
    )
}