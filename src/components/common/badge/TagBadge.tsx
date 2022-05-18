import { FC } from "react";

type TagBadgeProps = {
  text: string;
};
export const TagBadge: FC<TagBadgeProps> = ({ text }) => {
  return (
    <span
      className={
        "inline-flex items-center justify-center px-2 py-0.5 my-0.5 mx-[3px] text-xs leading-none rounded-full bg-opacity-40 bg-gray-300 text-primary"
      }
    >
      {text}
    </span>
  );
};
