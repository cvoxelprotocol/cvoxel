import { FC} from "react";
import { useHeldMembershipSubject } from "@/hooks/useHeldMembershipSubject";
import { SubjectBadge } from "../common/badge/SubjectBadge";
import { AvatarPlaceholder } from "../common/avatar/AvatarPlaceholder";
import VoxelsIcon from "@/components/HomeTab/voxels-icon.svg";
import EventIcon from "@/components/HomeTab/event-attendance.svg";
import clsx from "clsx";
import Link from "next/link";
import { useSocialAccount } from "@/hooks/useSocialAccount";

type Props = {
  did?: string
  type?: "voxel" | "event"
  showNav?: boolean
}
export const MainProfileCard: FC<Props> = ({did, type = "voxel", showNav = true}) => {
  const {HeldMembershipSubjects} = useHeldMembershipSubject(did)
  const { profile } = useSocialAccount(did);


  return (
    <div className="flex items-center max-w-[380px]">
      <div
        className={clsx("bg-light-surface-1 dark:bg-dark-surface-1 border rounded-2xl overflow-hidden border-light-primary w-full", showNav && "min-h-[120px]")}>
          <div className={clsx("w-full h-full", showNav && "grid grid-cols-5")}>
            <div className={clsx("py-5 px-4 sm:px-6", showNav && "col-span-4 space-y-1")}>
              <div className="w-full flex items-center space-x-2">
                <div
                  className={"flex justify-center items-center rounded-full border w-[32px] h-[32px] border-secondary"}>
                  {profile?.avatarSrc ? (
                    <img src={profile.avatarSrc} alt={profile?.displayName} className={"rounded-full w-full"}/>
                  ) : (
                    <AvatarPlaceholder did={did} size={32} />
                  )}
                </div>
                <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-2xl font-medium line-clamp-3">
                  {profile?.displayName}
                </div>
              </div>
              <div className="w-full dark:border-b-dark-inverse-primary px-1">
                {/*description*/}
                {profile && profile.bio &&  (
                  <div>
                    <div className=" text-light-on-surface dark:text-dark-on-surface font-normal text-ellipsis whitespace-nowrap text-sm">
                      {profile.bio}
                    </div>
                  </div>
                )}

                <div className="flex mt-2 space-x-1 items-center">
                  {/* {HeldMembershipSubjects &&
                    HeldMembershipSubjects.sort((a,b) => a.credentialSubject.membershipName > b.credentialSubject.membershipName ? -1 : 1).map((subject) => {
                      return <SubjectBadge item={subject} key={subject.ceramicId}/>
                    })} */}
                    {(HeldMembershipSubjects && HeldMembershipSubjects.length>0) &&  (
                      <SubjectBadge item={HeldMembershipSubjects.sort((a,b) => a.credentialSubject.membershipName > b.credentialSubject.membershipName ? -1 : 1)[0]} key={HeldMembershipSubjects.sort((a,b) => a.credentialSubject.membershipName > b.credentialSubject.membershipName ? -1 : 1)[0].ceramicId}/>
                    )}
                </div>
              </div>
          </div>
          {showNav && (
            <div className={clsx("col-span-1 bg-light-surface-3 dark:bg-dark-surface-3 flex flex-col items-center justify-center space-y-2", showNav && "min-h-[120px]")}>
              <Link href={`/${did}`}>
                <div className={clsx("p-2 flex items-center justify-center w-11 h-11 rounded-full", type==="voxel" ? "bg-light-primary dark:bg-dark-primary" : "bg-transparent")}>
                    <div
                        className={clsx("rounded-full w-[26px] h-[26px]", type==="event" ? "text-light-primary dark:text-dark-primary" : "text-light-on-primary dark:text-dark-on-primary")}
                      >
                        <VoxelsIcon />
                      </div>
                </div>
              </Link>
              <Link href={`/event/held/${did}`}>
                <div className={clsx("p-2 flex items-center justify-center w-11 h-11 rounded-full", type==="event" ? "bg-light-primary dark:bg-dark-primary" : "bg-transparent")}>
                  <div
                      className={clsx("rounded-full w-[26px] h-[26px] text-light-primary dark:text-dark-primary",type==="event" && "text-light-on-primary dark:text-dark-on-primary")}
                    >
                      <EventIcon />
                    </div>
                </div>
              </Link>
            </div>
          )}
          </div>
      </div>
    </div>
  );
};
