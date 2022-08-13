import { FC, useContext, useMemo } from "react";
import { DisplayAvatar } from "../common/DisplayAvatar";
import { formatDID } from "@self.id/framework";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { DIDContext } from "@/context/DIDContext";

type MyProfileCardProps = {
  handleClick?: () => void;
};
export const MyProfileCard: FC<MyProfileCardProps> = ({ handleClick }) => {
  const { name, avator } = useMyCeramicAcount();
  const {did, account, connection} = useContext(DIDContext)
  const getLabel = useMemo(() => {
    if (name && name !== "") return name;
    if (did) return formatDID(did, 12);
    return account || "No DID Found";
  }, [name, did, account]);

  if (connection?.status === "connecting") {
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
      <DisplayAvatar did={did} label={getLabel} src={avator} />
    </div>
  );
};
