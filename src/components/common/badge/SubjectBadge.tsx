

import { MembershipSubjectWithId } from "@/interfaces";
import Image from "next/image";
import { FC } from "react";

type Props = {
  item: MembershipSubjectWithId;
};
export const SubjectBadge: FC<Props> = ({ item }) => {
  return (
      <div className="flex space-x-1 items-center rounded-full justify-center px-1.5 py-0.5 my-0.5 border-2 text-light-on-primary-container dark:text-dark-on-primary-container border-light-primary-container dark:border-dark-primary-container font-medium">
        <div className={"rounded-r-lg w-[30px] h-[30px] relative "}>
            <div className="relative">
                {item.credentialSubject?.organizationIcon ? (
                    <img src={item.credentialSubject?.organizationIcon} alt={item.credentialSubject.organizationName} className="h-full"/>
                ): (
                    <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                )}
            </div>
        </div>
        <div className="text-light-on-primary-container dark:text-dark-on-error-container text-md">
            {item.credentialSubject.organizationName} | {item.credentialSubject.membershipName} 
        </div>
      </div>
  );
};
