import { FC } from "react";
import Image from "next/image";
import { EventWithId } from "vess-sdk";

type WorkspaceItemProps = {
    item: EventWithId
}
export const EventItem:FC<WorkspaceItemProps> = ({item}) => {


    return (
        <div className={"p-2 space-x-4 w-full relative sm:flex items-center rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant text-xs lg:text-sm text-black dark:text-white break-words  bg-light-surface-2 dark:bg-dark-surface-2"}>
            <div className="flex items-center">
                <div className={"rounded-r-lg w-[80px] h-[80px] relative bg-light-surface dark:bg-dark-surface"}>
                    <div className="relative">
                        {item.icon ? (
                            <img src={item.icon} alt={item.name} className="h-full"/>
                        ): (
                            <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-sm sm:text-lg font-medium text-ellipsis whitespace-nowrap">
                    {item.name} 
                </div>
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-xs sm:text-sm font-medium">
                    {item.url} 
                </div>
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-2xl font-medium">
                    {item.desc} 
                </div>
            </div>
            
        </div>
    )
}