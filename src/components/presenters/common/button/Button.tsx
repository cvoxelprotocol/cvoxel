/**
 *  @file   Button Component
 *  @author KoukiMinamoto <tomatomusicstudio@gmail.com>
 *
 *  <Button size variant type color />
 *  Props:
 *      size    : "small" | "medium" | "large"
 *      variant : "contained" | "outline" | "disable"
 *      type    : "default"
 *      color   : "primary" | "secondary"
 */

import { FC, useEffect, useState } from "react";

type Props = {
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outline" | "disable" | "focus";
  type?: "default";
  color?: "primary" | "secondary";
  text: string;
  buttonType?: "button" | "submit" | "reset"
  onClick?: () => void;
};

const Button: FC<Props> = ({
  size = "medium",
  variant = "contained",
  type = "default",
  color = "primary",
  buttonType = "button",
  text,
  onClick,
}) => {
  const [style, setStyle] = useState<string>("inline-block");

  const buttonStyle = (): string => {
    // Set Style to Button.
    let style = `inline-block w-fit m-0 font-sans rounded-full transition-colors cursor-pointer text-xs md:text-base`;

    // Set "type" parameter.
    if (type == "default")
      style +=
        ` ` +
        (color == "primary"
          ? `hover:bg-primary hover:text-white`
          : `hover:bg-secondary hover:text-white`);

    // Set "size" parameter.
    if (size == "medium") style += " " + "px-3 py-1 md:px-6 md:py-2 tracking-wide";
    else if (size == "small") style += " ";
    else if (size == "large") style += " ";

    // Set "variant" parameter.
    if (variant == "contained")
      style +=
        ` ` +
        (color == "primary"
          ? `text-white bg-primary`
          : `text-white bg-secondary`);
    else if (variant == "outline")
      style +=
        ` ` +
        (color == "primary"
          ? `border border-primary-light text-primary-light`
          : `border border-secondary-light text-secondary-light`);
    else if (variant == "disable")
      style += " " + "border border-gray-600 text-gray-600";
    else if (variant == "focus")
      style += (color == "primary" 
                  ? " border border-primary-light text-primary-light ring-2 ring-primary-light ring-offset-4 ring-offset-ground"
                  : " border border-secondary-light text-secondary-light ring-2 ring-secondary-light ring-offset-4 ring-offset-ground");

    return style;
  };

  useEffect(() => {
    setStyle(buttonStyle());
  }, [size, variant, type, color, text]);

  return <button className={style} type={buttonType} onClick={onClick}>{text}</button>;
};

export default Button;
