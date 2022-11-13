import { FC } from "react";
import { MembershipSubjectWithId } from "vess-sdk";

type Props = {
    item: MembershipSubjectWithId
}
export const MembershipSubjectItem:FC<Props> = ({item}) => {


    return (
        <div className={"p-2 w-full relative sm:flex items-center rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant text-xs lg:text-sm text-black dark:text-white break-words  bg-light-surface-2 dark:bg-dark-surface-2"}>
            <div className="w-full flex items-center justify-between space-x-4">
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-sm sm:text-xl font-bold">
                    {item.credentialSubject.id} 
                </div>
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-sm sm:text-xl font-bold">
                    {item.credentialSubject.membershipName} 
                </div>
            </div>
        </div>
    )
}