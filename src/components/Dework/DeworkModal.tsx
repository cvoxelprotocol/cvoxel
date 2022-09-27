import { FC, ReactNode } from "react";

type DeworkModalProps = {
    children: ReactNode
}
export const DeworkModal:FC<DeworkModalProps> = ({children}) => {

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-40 overflow-hidden bg-white bg-opacity-50 flex flex-col items-center justify-center">
            {children}
        </div>
    )
}