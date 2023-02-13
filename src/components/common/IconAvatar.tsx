import { FC, useMemo } from "react";

type IconAvatarProps = {
  src: string;
  size?: "xs" | "sm" | "md" | "lg";
  flex?: boolean;
};
export const IconAvatar: FC<IconAvatarProps> = ({
  src,
  size = "md",
  flex = false,
}) => {
  const iconSize = useMemo(() => {
    if (size === "xs") return "w-[24px] h-[24px]";
    if (size === "sm") return "w-[32px] h-[32px]";
    if (size === "md") return "w-[40px] h-[40px]";
    return "w-[60px] h-[60px]";
  }, [size]);

  const imageSize = useMemo(() => {
    if (size === "xs") return "24px";
    if (size === "sm") return "32px";
    if (size === "md") return "40px";
    return "60px";
  }, [size]);

  return (
    <div className={`${iconSize} ${flex ? " flex " : " "}`}>
      <img
        src={src}
        alt="Avatar"
        width={`${imageSize}`}
        height={`${imageSize}`}
        className={"rounded-full"}
      />
    </div>
  );
};
