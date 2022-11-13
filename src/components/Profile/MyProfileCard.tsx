import { FC, useContext, useMemo } from "react";
import { DisplayAvatar } from "../common/DisplayAvatar";
import { DIDContext } from "@/context/DIDContext";
import { useSocialAccount } from "@/hooks/useSocialAccount";

type MyProfileCardProps = {
  handleClick?: () => void;
};
export const MyProfileCard: FC<MyProfileCardProps> = ({ handleClick }) => {
  const {did, account, connection} = useContext(DIDContext)
  const { profile } = useSocialAccount(did);
  const getLabel = useMemo(() => {
    if (profile.displayName !== "") return profile.displayName;
    return account || "No DID Found";
  }, [name, did, account]);

  if (connection === "connecting") {
    return <DisplayAvatar label="Loading..." loading />;
  }

  return (
    <div
      className={
        "flex h-auto justify-center items-center self-center rounded-full border w-fit py-1 px-2.5 border-secondary mx-auto " +
        (did ? "cursor-pointer" : "")
      }
      onClick={handleClick}
    >
      <DisplayAvatar did={did} label={getLabel} src={profile.avatarSrc} />
    </div>
  );
};
