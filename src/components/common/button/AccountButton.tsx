import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import { DropButton } from "grommet";
import { useContext, useState,useEffect } from "react";
import { DisplayAvatar } from "../DisplayAvatar";
import { IconAvatar } from "../IconAvatar";
import { NamePlate } from "@/components/common/NamePlate";
import { Button } from "@/components/common/button/Button";
import { useRouter } from "next/router";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { DIDContext } from "@/context/DIDContext";
import { useDework } from "@/hooks/useDework";
import { formatDID } from "@/utils/ceramicUtils";
import { useSocialAccount } from "@/hooks/useSocialAccount";

type MenuButtonProps = {
  label: string;
  onClick: () => void;
};

const PROXY_DID = "did:pkh:eip155:1:0x1Cd36a9e09575d7ca3660763990F082D3A7e4919"
const ADMIN_DID = "did:pkh:eip155:1:0xdE695CBb6ec0CF3f4C9564070bAeB032552C5111"

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
  const {did, account, connection} = useContext(DIDContext)
  const {socialProfile} = useSocialAccount(did);
  const { connectWallet, disconnectWallet } = useWalletAccount();
  const [isMenuOpen, setMenuOpen] = useState(false);
  
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
  const connect = async () => {
    try {
      await connectWallet();
      setIsConnect(true);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (isConnect && !!account && router.asPath==="/") {
      router.push(`/${account}`);
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
      <MenuButton label="Disconnect" onClick={() => disconnectWallet()} />
    </>

    const content = (
      <div className="border-gray-200 rounded-lg w-64 mt-12 p-4 text-primary bg-gray-100 dark:bg-card dark:text-oncard">
        <div className="space-y-4 text-center p-2">
          <div className="flex items-center justify-center">
            {socialProfile.avatarSrc ? (
              <IconAvatar src={socialProfile.avatarSrc} size={"lg"} />
            ) : (
              <AvatarPlaceholder did={did} size={60} />
            )}
          </div>
          <p className="font-bold text-sm">
            {socialProfile.displayName}
          </p>
        </div>
        <div className="rounded-lg space-y-2">{buttons}</div>
      </div>
    );

    return (
      <>
        <DropButton
          dropAlign={{ top: "bottom", right: "right" }}
          dropContent={content}
          dropProps={{ plain: true }}
          onClose={() => {
            setMenuOpen(false);
          }}
          onOpen={() => {
            setMenuOpen(true);
          }}
          open={isMenuOpen}
        >
          <div className="hidden md:block">
            <NamePlate did={did} isMe size="lg" />
          </div>
          <div className="block md:hidden">
            <NamePlate did={did} isMe iconOnly />
          </div>
        </DropButton>
        
      </>
    );
  }

  return connection?.status === "connecting" ? (
    <DisplayAvatar label="Connecting..." loading hiddenLabelOnSp={true} />
  ) : (
    <Button text="Connect Wallet" onClick={() => connect()} color="primary" />
  );
}
