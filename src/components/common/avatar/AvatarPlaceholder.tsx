import { FC } from "react";
import { AvatarPlaceholder as SelfIDAvatarPlaceholder } from "@self.id/ui";

type Props = {
  did?: string;
  size: string | number;
};

export const AvatarPlaceholder: FC<Props> = ({ did, size }) => {
  return (
    <div className="rounded-full overflow-hidden">
      <SelfIDAvatarPlaceholder did={did} size={size} />
    </div>
  );
};
