import { AvatarPlaceholder } from "@self.id/framework";
import { FC } from "react";
import { CommonSpinner } from "./CommonSpinner";
import { IconAvatar } from "./IconAvatar";

type Props = {
  did?: string;
  label: string;
  loading?: boolean;
  src?: string | null;
  hiddenLabelOnSp?: boolean;
};

export const DisplayAvatar: FC<Props> = ({
  did,
  label,
  loading,
  src,
  hiddenLabelOnSp,
}) => {
  const avatar = loading ? (
    <div className="w-fit h-fit">
      <CommonSpinner />
    </div>
  ) : src ? (
    <IconAvatar size={"sm"} src={src} flex={false} />
  ) : (
    <AvatarPlaceholder did={did} size={32} />
  );

  return (
    <div className="w-fit rounded-full flex items-center space-x-2">
      {avatar}
      <p
        className={
          "text-primary dark:text-white text-sm font-semibold " +
          (hiddenLabelOnSp ? "hidden md:block" : "block")
        }
      >
        {label}
      </p>
    </div>
  );
};
