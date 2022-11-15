import clsx from "clsx";
import { FC } from "react";

type Props = {
  did?: string;
  size: string | number;
};

export const AvatarPlaceholder: FC<Props> = ({ size }) => {
  return (
    <div className="rounded-full overflow-hidden">
      <div className={clsx("bg-gradient-to-tr from-accent_l to-accent_r", `w-[${size}px] h-[${size}px]`)}></div>
    </div>
  );
};
