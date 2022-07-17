import { FC, useMemo } from "react";
import clsx from "clsx";
import { useENS } from "@/hooks/useENS";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import { useProfile } from "@/hooks/useCeramicAcount";
import { IconAvatar } from "@/components/common/IconAvatar";
import { shortenStr } from "@/utils/objectUtil";
import { getProfileInfo } from "@/utils/ceramicUtils";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";

type Props = {
  address?: string;
  did?: string;
  size?: "sm" | "md" | "lg";
  isMe?: boolean;
  hasBackgroundColor?: boolean;
  onClick?: () => void;
  iconOnly?: boolean;
  withoutIcon?: boolean;
};

export const NamePlate: FC<Props> = ({
  address,
  did,
  size = "md",
  isMe = false,
  hasBackgroundColor = false,
  onClick,
  iconOnly = false,
  withoutIcon = false,
}) => {
  const { ens, ensLoading } = useENS(address);

  const textSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "text-label-sm";
      case "md":
        return "text-label-lg";
      case "lg":
        return "text-title-lg";
    }
  }, [size]);

  const bg = useMemo(() => {
    if (!isMe) {
      return "bg-light-surface dark:bg-dark-surface";
    } else {
      if (hasBackgroundColor) {
        return "bg-light-surface-3 dark:bg-dark-surface-3";
      } else {
        return "bg-light-surface-1 dark:bg-dark-surface-1";
      }
    }
  }, [isMe, hasBackgroundColor]);

  const { avatarSize, avatarSizePixel } = useMemo<{
    avatarSize: "sm" | "xs";
    avatarSizePixel: number;
  }>(() => {
    switch (size) {
      case "lg":
      case "md":
        return { avatarSize: "sm", avatarSizePixel: 32 };
      case "sm":
        return { avatarSize: "xs", avatarSizePixel: 24 };
    }
  }, [size]);

  const isENS = useMemo(() => ens?.endsWith(".eth"), [ens]);

  const AddressContent = () => {
    return (
      <>
        {!isENS && (
          <div
            className={clsx(
              "rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-medium px-1 text-xs",
              textSize
            )}
          >
            0x
          </div>
        )}
        {ensLoading ? (
          <CommonSpinner size="sm" />
        ) : (
          <div
            className={clsx(
              "text-light-primary dark:text-dark-primary font-medium",
              textSize
            )}
          >
            {isENS ? ens?.replace(".eth", "") : ens}
          </div>
        )}
        {isENS && (
          <div
            className={clsx(
              "rounded bg-light-primary-container dark:bg-dark-primary-container text-light-on-secondary-container dark:text-dark-on-secondary-container font-medium text-xs px-1",
              textSize
            )}
          >
            .eth
          </div>
        )}
      </>
    );
  };

  const DidContent = () => (
    <>
      <div
        className={clsx(
          "rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-medium px-1 text-xs",
          textSize
        )}
      >
        did:
      </div>
      <div
        className={clsx(
          "text-light-primary dark:text-dark-primary font-medium",
          textSize
        )}
      >
        {shortenStr(did?.replace("did:", ""), 8)}
      </div>
    </>
  );

  const profileRecord = useProfile(did ?? "");
  const displayProfile = useMemo(() => {
    return getProfileInfo(did ?? "", profileRecord.content);
  }, [profileRecord.content, did]);

  return (
    <div
      className={clsx(
        "flex rounded-full border border-light-primary dark:border-dark-primary items-center space-x-2 overflow-hidden px-3",
        bg,
        size == "lg" ? "py-1.5" : "py-0.5",
        !!onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {!withoutIcon && (
        <>
          {displayProfile.avatarSrc ? (
            <IconAvatar
              size={avatarSize}
              src={displayProfile.avatarSrc}
              flex={false}
            />
          ) : (
            <AvatarPlaceholder did={did} size={avatarSizePixel} />
          )}
        </>
      )}

      {!iconOnly && <>{!!did ? <DidContent /> : <AddressContent />}</>}
    </div>
  );
};
