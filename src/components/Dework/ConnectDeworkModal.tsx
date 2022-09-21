import { FC } from "react";
import { ConnectDeworkCard } from "./ConnectDeworkCard";

export const ConnectDeworkModal:FC = () => {

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white bg-opacity-50 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center p-5 bg-gray-100 dark:bg-card rounded-lg">
                <ConnectDeworkCard />
            </div>
        </div>
    )
}