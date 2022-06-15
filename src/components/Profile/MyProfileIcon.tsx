import { FC } from "react";
import { AvatarPlaceholder } from "@self.id/ui";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { CommonSpinner } from "../common/CommonSpinner";
import { IconAvatar } from "../common/IconAvatar";

type MyProfileCardProps = {
  handleClick?: () => void
}
export const MyProfileIcon: FC<MyProfileCardProps> = ({handleClick}) => {
  const {
    connection,
    did,
    avator,
  } = useMyCeramicAcount();


  if (connection.status==="connecting") {
    return (
      <div className="w-fit h-fit">
        <CommonSpinner />
      </div>
    )
  }

  return (
    <div
      className={
        "flex h-auto justify-center items-center rounded-full border w-fit p-1 border-secondary cursor-pointer"} >
          {avator ? (
            <IconAvatar size={"md"} src={avator} flex={false} />
          ): (
            <AvatarPlaceholder did={did} size={40} />
          )}
      </div>
  );
};
