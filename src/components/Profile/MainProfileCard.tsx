import { FC} from "react";
import { useHeldMembershipSubject } from "@/hooks/useHeldMembershipSubject";
import { useUserCeramicAcount } from "@/hooks/useCeramicAcount";
import { SubjectBadge } from "../common/badge/SubjectBadge";
import { AvatarPlaceholder } from "../common/avatar/AvatarPlaceholder";
import { useHeldEventAttendances } from "@/hooks/useHeldEventAttendances";
import { EventBadge } from "../common/badge/EventBadge";

type Props = {
  did?: string
}
export const MainProfileCard: FC<Props> = ({did}) => {
  const {HeldMembershipSubjects, orbisProfile} = useHeldMembershipSubject(did)
  const {HeldEventAttendances} = useHeldEventAttendances(did)
  const { name } = useUserCeramicAcount(did || "");


  return (
    <div className="flex items-center space-x-0.5">
      <div
        className={"bg-light-surface-1 dark:bg-dark-surface-1 border rounded-2xl w-80 sm:w-96 max-h-screen overflow-scroll"}>


        <div className="px-4 py-4 space-y-3 text-center">
          <div className="w-full flex justify-center">
          <div
            className={"flex justify-center items-center rounded-full border w-[60px] h-[60px] border-secondary"}>
            {orbisProfile?.pfp ? (
              <img src={orbisProfile.pfp} alt={orbisProfile?.username} className={"rounded-full w-full"}/>
            ) : (
              <AvatarPlaceholder did={did} size={60} />
            )}
          </div>
          </div>
          <div className="w-full dark:border-b-dark-inverse-primary">
            {name && (
              <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium line-clamp-3">
                {orbisProfile?.username || name}
              </div>
            )}
            {/*description*/}
            {orbisProfile && (
              <div>
                <div className="text-light-on-surface dark:text-dark-on-surface font-medium">
                  {orbisProfile.description}
                </div>
              </div>
            )}

            <div className="flex mt-2 space-x-2">
              {HeldMembershipSubjects &&
                HeldMembershipSubjects.sort((a,b) => a.credentialSubject.membershipName > b.credentialSubject.membershipName ? -1 : 1).map((subject) => {
                  return <SubjectBadge item={subject} key={subject.ceramicId}/>
                })}
            </div>
            <div className="flex mt-2 space-x-2">
              {HeldEventAttendances &&
                HeldEventAttendances.sort((a,b) => a.credentialSubject.membershipName > b.credentialSubject.membershipName ? -1 : 1).map((subject) => {
                  return <EventBadge item={subject} key={subject.ceramicId}/>
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
