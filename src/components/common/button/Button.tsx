import { FC } from "react";
import Link from "next/link";

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
    buttonColor += " bg-gradient-to-tr from-[#A66497] to-[#D88F80] ";
  } else if (color == "grad-blue") {
    buttonColor += "bg-gradient-to-tr from-accent_l to-accent_r ";
  } else if (color == "primary") {
    buttonColor += "bg-primary ";
  } else if (color == "secondary") {
    buttonColor += "bg-secondary ";
  }

  /* Set button variant styles */
  if (variant == "contained") {
    buttonVariant =
      " text-lg text-text-white font-sans font-normal rounded-full  ";
  }

  /* Merge those styles */
  const buttonStyle = buttonVariant + buttonColor + className;

  return (
    <button
      className={"w-fit h-fit px-4 py-2 rounded-full " + buttonStyle}
      onClick={onClick}
      type={buttonType}
    >
      {!href ? text : <Link href={href}>{text}</Link>}
    </button>
  );
};
