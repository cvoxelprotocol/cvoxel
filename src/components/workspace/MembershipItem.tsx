import { FC } from "react";
import { MembershipWithId } from "vess-sdk";

type Props = {
    item: MembershipWithId
}
export const MembershipItem:FC<Props> = ({item}) => {


    return (
        <div className={"p-2 space-x-4 w-fit relative sm:flex items-center rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant text-xs lg:text-sm text-black dark:text-white break-words  bg-light-surface-2 dark:bg-dark-surface-2"}>
            <div className="flex">
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-2xl font-bold">
                    {item.name} 
                </div>
            </div>
        </div>
    )
}