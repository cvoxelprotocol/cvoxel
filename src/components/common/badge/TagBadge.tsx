import { FC } from "react";

type TagBadgeProps = {
  text: string;
};
export const TagBadge: FC<TagBadgeProps> = ({ text }) => {
  return (
    <span className="inline-flex items-center justify-center px-3 py-1 my-0.5 mx-[4px] text-sm leading-none rounded-full text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container font-medium">
      {text}
    </span>
  );
};
