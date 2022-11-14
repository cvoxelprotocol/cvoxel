import { IconAvatar } from "@/components/common/IconAvatar";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import { useProfileInfo } from "@/hooks/useProfileInfo";
import { Client } from "vess-sdk";
import { useSocialAccount } from "@/hooks/useSocialAccount";

type Props = {
  holder?: string;
  client?: Client;
};

export default function CredentialDirection ({ holder, client }:Props) {

  const {profile, isLoading} = useSocialAccount(holder)
  const {profile: clientProfile, isLoading: isLoadingClient} = useProfileInfo(client)

  return (
    <div className="flex items-center space-x-2">
      <div className="hidden lg:block">
      {isLoading ? (
          <CommonSpinner size="sm" />
        ) : (
          <>
            {profile?.avatarSrc ? (
              <IconAvatar
                size={"sm"}
                src={profile.avatarSrc}
                flex={false}
              />
            ) : (
              <AvatarPlaceholder did={profile?.displayName} size={32} />
            )}
          </>
        )}
      </div>
      <RightArrow />
      <div className="flex items-center space-x-1 rounded-full border border-light-primary dark:border-dark-primary bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary px-2 py-1 text-sm">
        {isLoadingClient ? (
          <CommonSpinner size="sm" />
        ) : (
          <>
            {clientProfile?.avatarSrc ? (
              <IconAvatar
                size={"sm"}
                src={clientProfile.avatarSrc}
                flex={false}
              />
            ) : (
              <AvatarPlaceholder did={clientProfile?.displayName} size={32} />
            )}
            <p className="hidden sm:block break-words flex-wrap">{clientProfile?.displayName}</p>
          </>
        )}
      </div>
    </div>
  );
};
