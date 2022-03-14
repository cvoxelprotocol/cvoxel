import { FC } from "hoist-non-react-statics/node_modules/@types/react";
import { type } from "os";

type SigButtonProps = {
    text: string
    type?: "button" | "submit" | "reset"
    handleClick?: () => void
}
export const SigButton:FC<SigButtonProps> = ({text,handleClick, type = "button"}) => {
    
    return (
        <button onClick={handleClick} className="w-fit h-fit px-5 py-2 rounded-full bg-gradient-to-tr from-accent_l to-accent_r text-white " type={type}>
            {text}
        </button>
    )
}