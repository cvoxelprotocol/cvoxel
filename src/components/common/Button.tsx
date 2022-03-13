import { FC } from "react";
import Link from "next/link";

type Props = {
  text: string;
  color: "grad-red";
  variant: "contained";
  onClick?: () => void;
  href?: string;
  className?: string;
};

const Button: FC<Props> = (Props) => {
  let buttonColor = "";
  let buttonVariant = "";

  /* Set button color styles */
  if (Props.color == "grad-red") {
    buttonColor =
      " bg-gradient-to-tr from-[#A66497] to-[#D88F80] text-text-white ";
  }

  /* Set button variant styles */
  if (Props.variant == "contained") {
    buttonVariant =
      " text-lg text-text-white font-sans font-normal rounded-full  ";
  }

  /* Merge those styles */
  const buttonStyle = buttonVariant + buttonColor + Props.className;

  return (
    <button
      className={"w-fit h-fit px-5 py-2 rounded-full " + buttonStyle}
      onClick={Props.onClick}
    >
      {Props.href == undefined ? (
        Props.text
      ) : (
        <Link href={Props.href}>{Props.text}</Link>
      )}
    </button>
  );
};

export default Button;