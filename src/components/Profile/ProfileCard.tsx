import { FC } from "react";
import Router from "next/router"
import { DisplayAvatar } from "../common/DisplayAvatar";

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
      <DisplayAvatar
        did={did}
        label={name || "No DID Found"}
        loading={isLoading}
        src={avator}
      />
    </div>
  );
};
