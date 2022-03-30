import { getNetworkName } from "@/utils/networkUtil";
import { FC } from "react";

type NetworkChipProps = {
    chainId: number
}

export const NetworkChip:FC<NetworkChipProps> = ({chainId}) => {

    return (
        <span
            className={"block self-center mx-auto px-1 py-0.5 content-center text-xs rounded-full font-semibold w-max transition duration-300 ease " + (chainId===137 ? "bg-purple-200 text-purple-500" : "text-gray-500 bg-gray-200 ")}>
            {getNetworkName(chainId)}
        </span>
    )

}