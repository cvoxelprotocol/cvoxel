import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { formatDID } from "@self.id/framework";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import { DropButton } from "grommet";
import { useState } from "react";
import { DisplayAvatar } from "../DisplayAvatar";
import Router from "next/router";
import { IconAvatar } from "../IconAvatar";
import { NamePlate } from "@/components/common/NamePlate";
import { Button } from "@/components/common/button/Button";

type MenuButtonProps = {
  label: string;
  onClick: () => void;
};

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
  const {
    connection,
    disconnectCeramic,
    account,
    connectWalletOnly,
    did,
    name,
    avator,
  } = useMyCeramicAcount();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const goToMypage = () => {
    if (!did && !account) return;
    Router.push(`/${did ? did : account}`);
  };

  if (account) {
    const buttons =
      connection.status === "connected" ? (
        <>
          <MenuButton label="My Page" onClick={() => goToMypage()} />
          <MenuButton label="Disconnect" onClick={() => disconnectCeramic()} />
        </>
      ) : (
        <>
          <MenuButton label="My Page" onClick={() => goToMypage()} />
          <MenuButton
            label="Disconnect Wallet"
            onClick={() => disconnectCeramic()}
          />
        </>
      );

    const content = (
      <div className="border-gray-200 rounded-lg w-64 mt-12 p-4 text-primary bg-gray-100 dark:bg-card dark:text-oncard">
        <div className="space-y-4 text-center p-2">
          <div className="flex items-center justify-center">
            {avator ? (
              <IconAvatar src={avator} size={"lg"} />
            ) : (
              <AvatarPlaceholder did={did} size={60} />
            )}
          </div>
          <p className="font-bold text-sm">
            {name ? name : did ? formatDID(did, 12) : formatDID(account, 12)}
          </p>
        </div>
        <div className="rounded-lg space-y-2">{buttons}</div>
      </div>
    );

    return (
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
    );
  }

  return connection.status === "connecting" ? (
    <DisplayAvatar label="Connecting..." loading hiddenLabelOnSp={true} />
  ) : (
    <Button
      text="Connect Wallet"
      onClick={() => connectWalletOnly()}
      color="primary"
    />
  );
}
