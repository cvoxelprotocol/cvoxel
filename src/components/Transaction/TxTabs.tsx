import { FC,MouseEvent } from "react";
import { useTxTab } from "@/hooks/useTab";
import clsx from 'clsx';
import { TX_TAB_NAME } from "@/interfaces";

export const TxTabs: FC = () => {
  const { tabState, setTabState } = useTxTab();

  const receivedTab = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTabState("received")
  }

  const sentTab = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTabState("sent")
  }

  return (
    <>
      <div className="w-full text-center border-b border-secondary">
        <ul
          className={ "w-full flex items-center pt-4 pb-1 px-4 space-x-4"}
          role="txTablist"
        >
          <li className="">
            <a
              className={clsx("text-primary text-base md:text-2xl leading-normal flex items-center space-x-1",tabState === "received" ? " font-bold " : "")}
              onClick={receivedTab}
              data-toggle="tab"
              href="#recieved"
              role="txTablist"
            >
              <span className="ml-2 ">{TX_TAB_NAME["received"]}</span>
            </a>
        </li>
        <li className="">
            <a
              className={clsx("text-primary text-base md:text-2xl leading-normal flex items-center space-x-1",tabState === "sent" ? " font-bold " : "")}
              onClick={sentTab}
              data-toggle="tab"
              href="#sent"
              role="txTablist"
            >
              <span className="ml-2 ">{TX_TAB_NAME["sent"]}</span>
            </a>
        </li>
        </ul>
      </div>
    </>
  );
};
