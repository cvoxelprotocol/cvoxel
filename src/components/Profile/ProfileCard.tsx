import { FC } from "react";
import { AvatarPlaceholder } from '@self.id/framework'
import Router from "next/router"
import { DisplayAvatar } from "../common/DisplayAvatar";
import { IconAvatar } from "../common/IconAvatar";

type Props = {
  name?: string
  avator?: string
  did?: string
  isLoading?:boolean
};

export const ProfileCard: FC<Props> = ({name, avator, did, isLoading}) => {

  const goToDIDPage = () => {
    if(!did) return
    Router.push(`/${did}`)
  }

  if(isLoading) {
    return (
      <DisplayAvatar label="Loading..." loading />
    )
  }

  return (
    <div className={"flex h-auto justify-center items-center self-center rounded-full space-x-2 border w-fit py-1 px-2.5 border-secondary mx-auto " + (did ? "cursor-pointer": "")} onClick={goToDIDPage}>
      <div className="w-[40px] h-[40px] rounded-full bg-onglass-weak overflow-hidden">
        {avator ? (
          <IconAvatar src={avator} flex={false} />
        ): (
          <AvatarPlaceholder size={40} />
        )}
      </div>
      <div className="w-fit mt-2 mb-1 text-xs md:text-sm font-bold text-primary dark:text-secondary text-center">
        {name}
      </div>
    </div>
  );
};
