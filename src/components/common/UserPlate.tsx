import { FC, useMemo } from "react";
import clsx from "clsx";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import { IconAvatar } from "@/components/common/IconAvatar";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import SearchIcon from "@/components/common/search/search.svg";
import { Client } from "@/__generated__/types/WorkCredential";
import { useProfileInfo } from "@/hooks/useProfileInfo";

type Props = {
  client?: Client;
  size?: "sm" | "md" | "lg";
  isMe?: boolean;
  hasBackgroundColor?: boolean;
  onClick?: () => void;
  iconOnly?: boolean;
  withoutIcon?: boolean;
  withSearchIcon?: boolean;
};

export const UserPlate: FC<Props> = ({
  client,
  size = "md",
  isMe = false,
  hasBackgroundColor = false,
  onClick,
  iconOnly = false,
  withoutIcon = false,
  withSearchIcon = false,
}) => {

  const {profile, isLoading} = useProfileInfo(client)

  const textSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "text-label-sm";
      case "md":
        return "text-label-lg";
      case "lg":
        return "text-[1.375rem]";
    }
  }, [size]);

  const badgeTextSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "text-[0.6875em]";
      case "md":
        return "text-sm";
      case "lg":
        return "text-base py-0.5";
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

  const OrganizationContent = () => {
    return (
      <div className="flex items-center space-x-0.5">
        {isLoading ? (
          <CommonSpinner size="sm" />
        ) : (
          <div
            className={clsx(
              "text-light-primary dark:text-dark-primary",
              textSize
            )}
          >
            {profile?.displayName}
          </div>
        )}
      </div>
    );
  };

  const DidContent = () => (
    <div className="flex items-center space-x-0.5">
      <div
        className={clsx(
          "rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-medium px-1 text-xs",
          badgeTextSize
        )}
      >
        did:
      </div>
      <div
        className={clsx("text-light-primary dark:text-dark-primary", textSize)}
      >
        {profile?.displayName?.replace("did:", "")}
      </div>
    </div>
  );

  return (
    <div
      className={clsx(
        "flex rounded-full border border-light-primary dark:border-dark-primary items-center overflow-hidden px-3",
        bg,
        size == "lg" ? "py-1.5" : "py-0.5",
        !!onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {withSearchIcon && (
        <div
          className={clsx(
            " text-light-secondary dark:text-dark-secondary mr-2",
            size == "lg" ? "w-8 h-8" : "w-6 h-6"
          )}
        >
          <SearchIcon />
        </div>
      )}
      {!withoutIcon && (
        <div className="md:mr-2">
          {!!profile ? (
            <>
              {profile.avatarSrc ? (
                <IconAvatar
                  size={avatarSize}
                  src={profile.avatarSrc}
                  flex={false}
                />
              ) : (
                <AvatarPlaceholder did={client?.value} size={avatarSizePixel} />
              )}
            </>
          ) : (
            <CommonSpinner />
          )}
        </div>
      )}

      {!iconOnly && <>{client?.format==="DID" ? <DidContent /> : <OrganizationContent />}</>}
    </div>
  );
};
