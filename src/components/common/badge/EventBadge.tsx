

import { shortenStrWithEndDots } from "@/utils/objectUtil";
import Image from "next/image";
import { FC } from "react";
import { EventAttendanceWithId } from "vess-sdk";

type Props = {
  item: EventAttendanceWithId;
};
export const EventBadge: FC<Props> = ({ item }) => {
  return (
      <div className="flex space-x-1 items-center rounded-full justify-center px-1.5 py-0.5 my-0.5 border-2 text-light-on-primary-container dark:text-dark-on-primary-container border-light-primary-container dark:border-dark-primary-container font-medium">
        <div className={"rounded-r-lg w-[30px] h-[30px] relative "}>
            <div className="relative">
                {item.credentialSubject?.eventIcon ? (
                    <img src={item.credentialSubject?.eventIcon} alt={item.credentialSubject.eventName} className="h-full rounded-full"/>
                ): (
                    <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                )}
            </div>
        </div>
        <div className="text-light-on-primary-container dark:text-dark-on-error-container text-xs sm:text-md">
            {shortenStrWithEndDots(item.credentialSubject.eventName, 20)}
        </div>
      </div>
  );
};
