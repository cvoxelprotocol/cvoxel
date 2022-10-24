

import { MembershipSubjectWithId } from "@/interfaces";
import Image from "next/image";
import { FC } from "react";

type Props = {
  item: MembershipSubjectWithId;
};
export const SubjectBadge: FC<Props> = ({ item }) => {
  return (
      <div className="relative items-center font-medium w-fit">
        <div className={"absolute -top-1.5 -left-0.5 rounded-r-lg w-[30px] h-[32px]"}>
            <div className="relative">
                {item.credentialSubject?.organizationIcon ? (
                    <img src={item.credentialSubject?.organizationIcon} alt={item.credentialSubject.organizationName} className="h-full"/>
                ): (
                    <Image src={"/org_icon.png"} alt="org icon" objectFit="contain"  layout="fill"/>
                )}
            </div>
        </div>
        <div className="pl-7 pr-2 rounded-full text-light-on-primary-container dark:text-dark-on-primary-container dark:bg-light-on-primary-container bg-dark-on-primary-container text-xs sm:text-sm">
            {item.credentialSubject.organizationName} | {item.credentialSubject.membershipName} 
        </div>
      </div>
  );
};
