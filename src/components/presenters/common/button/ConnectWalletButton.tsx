import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export const ConnectWalletButton:FC = () => {
    const {connectWalletOnly} = useMyCeramicAcount()

    return (
        <>
            <button onClick={()=> connectWalletOnly()} className="text-white rounded-full bg-gradient-to-r from-border_l to-border_r py-2 px-5">
                Connect Wallet 
            </button>
            <div className="pt-2 font-medium text-xs text-gray-500 flex items-center justify-center">
                <FontAwesomeIcon className="w-5 h-5 mr-2" icon={faCircleExclamation} color={'#EFA9E0'}/>
                <div>
                <p className="w-full max-w-[450px] break-words">
                    Current Version is Alpha and Supports Only<br /><span className="font-bold px-1">Ethereum Mainnet for Wallet(Metamask)</span>and<span className="font-bold px-1">Ceramic Testnet for DID</span>
                </p>
                </div>
            </div>
        </>
    )
}