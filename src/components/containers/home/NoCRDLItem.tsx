import Image from "next/image";
import { FC } from "react";

export const NoCRDLItem:FC = () => {
    return (
        <>
            <div className="hidden sm:block max-w-[640px] w-full mx-auto">
                <div className="w-full h-[200px] relative">
                    <Image src={"/no_crdl_img.png"} alt="no item" objectFit="contain"  layout="fill" />
                </div>
            </div>
            <div className="sm:hidden w-full mx-auto mb-5">
                <div className="w-full h-[120px] relative">
                    <Image src={"/no_crdl_img_sp.png"} alt="no item" objectFit="contain"  layout="fill" />
                </div>
            </div>
        </>
    )
}