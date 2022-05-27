import { FC } from "react";

type GenreBadgeProps = {
  text: string;
  baseColor: string;
  isSelected?: boolean;
};
export const GenreBadge: FC<GenreBadgeProps> = ({
  text,
  baseColor,
  isSelected,
}) => {
  return (
    <span
      className={
        "inline-flex items-center justify-center px-2 py-0.5 m-1 text-xs font-semibold leading-none rounded-sm bg-opacity-80 " +
        (isSelected ? `${baseColor} text-white` : "bg-gray-300 text-gray-500")
      }
    >
      {text}
    </span>
  );
};
