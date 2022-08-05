import { FC } from "react";
import clsx from "clsx";

type Props = {
  text: string;
};

export const ToolTip: FC<Props> = ({ text }) => {
  return (
    <span
      className={clsx(
        "whitespace-nowrap",
        "rounded",
        "bg-black",
        "px-2",
        "py-1",
        "text-white",
        "absolute",
        "-top-12",
        "left-1/2",
        "-translate-x-1/2",
        "before:content-['']",
        "before:absolute",
        "before:-translate-x-1/2",
        "before:left-1/2",
        "before:top-full",
        "before:border-4",
        "before:border-transparent",
        "before:border-t-black"
      )}
    >
      {text}
    </span>
  );
};
