import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  text: string;
  color?: "grad-red" | "grad-blue" | "primary" | "secondary" | "gray"
  variant?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean
};

export const Button: FC<Props> = ({
  text,
  color = "grad-red",
  variant = "contained",
  onClick,
  href,
  className,
  buttonType = "button",
  disabled = false
}) => {
  let buttonColor = "text-white ";
  let buttonVariant = "";

  /* Set button color styles */
  if(disabled) {
    buttonColor = clsx(
      "bg-gray-300 dark:bg-gray-400 text-dark-surface",
      buttonColor
    );
  } else if (color == "grad-red") {
    buttonColor = clsx(
      "bg-gradient-to-tr from-[#A66497] to-[#D88F80]",
      buttonColor
    );
  } else if (color == "grad-blue") {
    buttonColor = clsx(
      "bg-gradient-to-tr from-accent_l to-accent_r",
      buttonColor
    );
  } else if (color == "primary") {
    buttonColor = clsx("bg-light-primary dark:bg-dark-primary", buttonColor);
  } else if (color == "secondary") {
    buttonColor = clsx(
      "bg-light-secondary dark:bg-dark-secondary",
      buttonColor
    );
  } else if (color == "gray") {
    buttonColor = clsx(
      "bg-gray-300 dark:bg-gray-400",
      buttonColor
    );
  }

  /* Set button variant styles */
  if (variant == "contained") {
    buttonVariant =
      "sm:text-md text-light-surface dark:text-dark-surface font-sans font-normal rounded-full font-medium hover:opacity-20";
  }

  /* Merge those styles */
  const buttonStyle = clsx(buttonVariant, buttonColor, className);

  return (
    <button
      className={clsx("w-fit h-fit px-2 py-1.5 sm:px-6 sm:py-3 rounded-full ",  buttonStyle)}
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
    >
      {!href ? text : <Link href={href}>{text}</Link>}
    </button>
  );
};
