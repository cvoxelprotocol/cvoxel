import { FC } from "react";
import { useUserCeramicAcount } from "@/hooks/useCeramicAcount";
import { Avatar } from "grommet";
import { AvatarPlaceholder } from "@self.id/ui";

type Props = {
  did:string
}
export const ProfileCard:FC<Props> = ({did}) => {
  const {name, avator} = useUserCeramicAcount(did)

  return (
    <>
      <div className="flex h-auto justify-center items-center self-center rounded-full space-x-2 border w-fit py-1 px-2.5 border-secondary mx-auto">
        <div className="w-[40px] h-[40px] rounded-full bg-onglass-weak overflow-hidden">
          {avator ? (
            <Avatar size="40px" src={avator} flex={false} />
          ): (
            <AvatarPlaceholder size={40} />
          )}
        </div>
        <div className="w-fit mt-2 mb-1 text-xs md:text-sm font-bold text-primary dark:text-secondary text-center">
          {name}
        </div>
      </div>
    </>
  );
};