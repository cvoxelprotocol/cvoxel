import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  text: string;
  color?: "grad-red" | "grad-blue" | "primary" | "secondary";
  variant?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  buttonType?: "button" | "submit" | "reset";
};

export const Button: FC<Props> = ({
  text,
  color = "grad-red",
  variant = "contained",
  onClick,
  href,
  className,
  buttonType = "button",
}) => {
  let buttonColor = "text-white ";
  let buttonVariant = "";

  /* Set button color styles */
  if (color == "grad-red") {
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
  }

  /* Set button variant styles */
  if (variant == "contained") {
    buttonVariant =
      "text-md text-light-surface dark:text-dark-surface font-sans font-normal rounded-full font-medium";
  }

  /* Merge those styles */
  const buttonStyle = clsx(buttonVariant, buttonColor, className);

  return (
    <button
      className={clsx("w-fit h-fit px-6 py-3 rounded-full", buttonStyle)}
      onClick={onClick}
      type={buttonType}
    >
      {!href ? text : <Link href={href}>{text}</Link>}
    </button>
  );
};
