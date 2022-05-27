import { FC, useMemo } from "react";
import Image from "next/image";

type IconAvatarProps = {
  src: string;
  size?: "sm" | "md" | "lg";
  flex?: boolean;
};
export const IconAvatar: FC<IconAvatarProps> = ({
  src,
  size = "md",
  flex = false,
}) => {
  const iconSize = useMemo(() => {
    if (size === "sm") return "w-[32px] h-[32px]";
    if (size === "md") return "w-[40px] h-[40px]";
    return "w-[60px] h-[60px]";
  }, [size]);

  const imageSize = useMemo(() => {
    if (size === "sm") return "32px";
    if (size === "md") return "40px";
    return "60px";
  }, [size]);

  return (
    <div className={`${iconSize} ${flex ? " flex " : " "}`}>
      <Image
        src={src}
        alt="Avatar"
        width={`${imageSize}`}
        height={`${imageSize}`}
        className={"rounded-full"}
      />
    </div>
  );
};
