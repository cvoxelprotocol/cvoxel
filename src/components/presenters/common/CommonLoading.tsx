import { FC } from "react";

export const CommonLoading:FC = () => {
    return (
        <div className="flex justify-center items-center w-full py-4">
            <div
                className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"
            ></div>
        </div>
    )
}