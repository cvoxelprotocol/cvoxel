import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import { useState,useEffect } from "react";
import { DisplayAvatar } from "../DisplayAvatar";
import { IconAvatar } from "../IconAvatar";
import { Button } from "@/components/common/button/Button";
import { useRouter } from "next/router";
import { useDework } from "@/hooks/useDework";
import { useSocialAccount } from "@/hooks/useSocialAccount";
import { DropDown } from "../DropDown";
import { useConnectDID } from "@/hooks/useConnectDID";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import dynamic from "next/dynamic";
import { isMobile, isTablet } from "react-device-detect";

const NamePlate = dynamic(
  () => import("@/components/common/NamePlate"),
  {
    ssr: false,
  }
);
type MenuButtonProps = {
  label: string;
  onClick: () => void;
};

const PROXY_DID = "did:pkh:eip155:1:0x1cd36a9e09575d7ca3660763990f082d3a7e4919"
const ADMIN_DID = "did:pkh:eip155:1:0xde695cbb6ec0cf3f4c9564070baeb032552c5111"

function MenuButton({ label, ...props }: MenuButtonProps) {
  return (
    <div>
      <button className="text-sm" {...props}>
        <p className="text-sm">{label}</p>
      </button>
    </div>
  );
}

export default function AccountButton() {
  const {did, account, connection} = useDIDAccount()
  const {profile} = useSocialAccount(did);
  const { connectDID, disConnectDID } = useConnectDID();
  
  const router = useRouter();
  const {deworkAuth,setDeworkConnectOpen, setDeworkTaskListOpen} = useDework()

  const goToMypage = () => {
    if (!did && !account) return;
    router.push(`/${did ? did : account}`);
  };

  const goToWorkSpaceList = () => {
    if (!did && !account) return;
    router.push(`/workspace/list`);
  };

  const [isConnect, setIsConnect] = useState<boolean>(false);
  const handleConnect = async () => {
    try {
      await connectDID();
      setIsConnect(true);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (isConnect && !!account && router.asPath==="/") {
      router.push(`/${account.toLowerCase()}`);
    }
  }, [isConnect, account]);

  if (account) {
    const buttons =
    <>
      <MenuButton label="My Page" onClick={() => goToMypage()} />
      {deworkAuth ? (
        <MenuButton label="Dework TaskList" onClick={() => setDeworkTaskListOpen(true)} />
      ): (
        <MenuButton label="Connect Dework" onClick={() => setDeworkConnectOpen(true)} />
      )}
      {did && (did === PROXY_DID || did === ADMIN_DID) && (
        <MenuButton label="Workspace" onClick={() => goToWorkSpaceList()} />
      )}
      <MenuButton label="Disconnect" onClick={() => disConnectDID()} />
    </>

    const content = (
      <div className="border-gray-200 rounded-lg w-64 mt-2 p-4 text-primary bg-gray-100 dark:bg-card dark:text-oncard">
        <div className="space-y-4 text-center p-2">
          <div className="flex items-center justify-center">
            {profile.avatarSrc ? (
              <IconAvatar src={profile.avatarSrc} size={"lg"} />
            ) : (
              <AvatarPlaceholder did={did} size={60} />
            )}
          </div>
          <p className="font-bold text-sm">
            {profile.displayName}
          </p>
        </div>
        <div className="rounded-lg space-y-2 text-left">{buttons}</div>
      </div>
    );

    const btn = (
      <>
        <div className="hidden md:block">
            <NamePlate did={did} isMe size="lg" />
        </div>
        <div className="block md:hidden">
            <NamePlate did={did} isMe iconOnly />
        </div> 
      </>
    )

    return (
      <DropDown btnContent={btn} content={content} />
    );
  }

  return connection === "connecting" ? (
    <DisplayAvatar label="Connecting..." loading hiddenLabelOnSp={true} />
  ) : (
    <Button text={(isMobile || isTablet) ? "Connect" : "Connect Wallet"} onClick={() => handleConnect()} color="primary" />
  );
}
