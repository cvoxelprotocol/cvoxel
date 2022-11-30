import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {
    text: string;
    color?: string
    onClick?: () => void;
    href?: string;
    buttonType?: "button" | "submit" | "reset";
    disabled?: boolean,
}
export const DefaultButton:FC<Props> = ({text, color = "bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary",onClick, href, buttonType, disabled = false}) => {

    return (
        <button
            className={clsx("w-fit min-w-[220px] h-fit px-6 py-3 rounded-full ", !disabled ? color : "bg-gray-300 dark:bg-gray-400 text-dark-surface")}
            onClick={onClick}
            type={buttonType}
            disabled={disabled}
            >
            {!href ? text : <Link href={href}>{text}</Link>}
        </button>
    )

}