import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { FC } from "react";

export const ConnectWalletButton:FC = () => {
    const {connectWalletOnly} = useMyCeramicAcount()

    return (
        <button onClick={()=> connectWalletOnly()} className="text-white rounded-full bg-gradient-to-r from-border_l to-border_r py-2 px-5">
            Connect Wallet 
        </button>
    )
}