import { FC, useContext } from "react";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { CommonSpinner } from "../common/CommonSpinner";
import { IconAvatar } from "../common/IconAvatar";
import { DIDContext } from "@/context/DIDContext";

type MyProfileCardProps = {
  handleClick?: () => void;
};
export const MyProfileIcon: FC<MyProfileCardProps> = ({ handleClick }) => {
  const { avator } = useMyCeramicAcount();
  const {did, connection} = useContext(DIDContext)

  if (connection?.status === "connecting") {
    return (
      <div className="w-fit h-fit">
        <CommonSpinner />
      </div>
    );
  }

  return (
    <div
      className={
        "flex h-auto justify-center items-center rounded-full border w-fit p-1 border-secondary cursor-pointer"
      }
    >
      {avator ? (
        <IconAvatar size={"md"} src={avator} flex={false} />
      ) : (
        <AvatarPlaceholder did={did} size={40} />
      )}
    </div>
  );
};
