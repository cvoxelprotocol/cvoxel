import { FC, useEffect, useState } from "react";
import { IconAvatar } from "@/components/common/IconAvatar";
import { AvatarPlaceholder } from "@/components/common/avatar/AvatarPlaceholder";
import RightArrow from "@/components/CVoxel/VoxelListItem/right-arrow.svg";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import LeftArrow from "@/components/CVoxel/VoxelListItem/left-arrow.svg";
import { useENS } from "@/hooks/useENS";
import { getPkhDIDFromAddress } from "vess-sdk";
import { useSocialAccount } from "@/hooks/useSocialAccount";

type Props = {
  from?: string;
  to?: string;
  isPayer: boolean;
};

export const TxDirection: FC<Props> = ({ from, to, isPayer }) => {
  const { ens: fromEns, ensLoading: fromEnsLoading } = useENS(from);
  const { ens: toEns, ensLoading: toEnsLoading } = useENS(to);

  const [toDid, setToDid] = useState<string>();
  useEffect(() => {
    if (toDid == undefined && !!to) {
      setToDid(getPkhDIDFromAddress(to));
    }
  }, [to]);

  const [fromDid, setFromDid] = useState<string>();
  useEffect(() => {
    if (fromDid == undefined && !!from) {
      setFromDid(getPkhDIDFromAddress(from));
    }
  }, [from]);

  const {profile} = useSocialAccount(isPayer ? fromDid : toDid)

  return isPayer ? (
    <div className="flex items-center space-x-2">
      <div className="hidden lg:block">
        {!!profile ? (
          <>
            {profile.avatarSrc ? (
              <IconAvatar
                size={"sm"}
                src={profile.avatarSrc}
                flex={false}
              />
            ) : (
              <AvatarPlaceholder did={fromDid} size={32} />
            )}
          </>
        ) : (
          <CommonSpinner />
        )}
      </div>

      <RightArrow />
      <div className="rounded-full border border-light-primary dark:border-dark-primary bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary px-2 py-1 text-sm">
        {toEnsLoading ? (
          <CommonSpinner size="sm" />
        ) : (
          <p className="break-words flex-wrap">{toEns}</p>
        )}
      </div>
    </div>
  ) : (
    <div className="flex items-center space-x-2">
      <div className="hidden lg:block">
        {profile && profile.avatarSrc ? (
          <IconAvatar size={"sm"} src={profile.avatarSrc} flex={false} />
        ) : (
          <AvatarPlaceholder did={toDid} size={32} />
        )}
      </div>
      <LeftArrow />
      <div className="rounded-full border border-light-primary dark:border-dark-primary bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary px-2 py-1 text-sm">
        {fromEnsLoading ? (
          <CommonSpinner size="sm" />
        ) : (
          <p className="break-words flex-wrap">{fromEns}</p>
        )}
      </div>
    </div>
  );
};
