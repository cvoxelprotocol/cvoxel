import { FC } from "react";

type NoItemPresenterProps = {
  text: string;
};
export const NoItemPresenter: FC<NoItemPresenterProps> = ({ text }) => {
  return (
    <div className="w-full text-center py-6 px-1 break-words">
      <p className="text-xs md:text-lg text-light-on-surface-variant dark:text-dark-on-surface-variant font-medium">
        {text}
      </p>
    </div>
  );
};
