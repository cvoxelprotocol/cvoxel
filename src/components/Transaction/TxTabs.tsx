import { FC, MouseEvent } from "react";
import { useTxTab } from "@/hooks/useTab";
import clsx from "clsx";
import { TX_TAB_NAME } from "@/interfaces";

export const TxTabs: FC = () => {
  const { tabState, setTabState } = useTxTab();

  const receivedTab = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTabState("received");
  };

  const sentTab = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTabState("sent");
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="w-full text-center border-b border-light-outline dark:border-dark-outline sm:mx-6 sm:h-20 flex flex-col justify-between items-start">
        <div className="text-light-on-surface dark:text-dark-on-surface text-2xl font-medium px-2 py-1 hidden sm:block">
          Transactions
        </div>
        <ul className="w-full flex items-center space-x-4 pt-4 sm:pt-0" role="txTablist">
          <li className="">
            <a
              className={clsx(
                "text-light-on-surface dark:text-dark-on-surface text-xl leading-normal flex items-center px-2",
                tabState === "received"
                  ? " font-bold border-b-4 border-light-primary dark:border-dark-primary"
                  : "pb-[4px]"
              )}
              onClick={receivedTab}
              data-toggle="tab"
              href="#recieved"
              role="txTablist"
            >
              <span className="">{TX_TAB_NAME["received"]}</span>
            </a>
          </li>
          <li className="">
            <a
              className={clsx(
                "text-light-on-surface dark:text-dark-on-surface text-xl leading-normal flex items-center px-2",
                tabState === "sent"
                  ? " font-bold border-b-4 border-light-primary dark:border-dark-primary "
                  : "pb-[4px]"
              )}
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
    </div>
  );
};
