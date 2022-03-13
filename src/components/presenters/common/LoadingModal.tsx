import { FC } from 'react'

type Props = {
    text?: string
}
export const LoadingModal:FC<Props> = ({text}) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-ground opacity-90 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center">
                <div
                    className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"
                ></div>
            </div>
            <p className="text-white text-sm md:text-lg pt-4 px-4">{text ? text : ""}</p>
        </div>
    )
}