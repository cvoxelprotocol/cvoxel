import { FC,useMemo } from "react";

type IconAvatarProps = {
    src: string
    size?: "sm" | "md" | "lg"
    flex?: boolean
}
export const IconAvatar:FC<IconAvatarProps> = ({src, size = "md", flex = false}) => {

    const iconSize = useMemo(() => {
        if(size==="sm") return "w-[32px] h-[32px]"
        if(size==="md") return "w-[40px] h-[40px]"
        return "w-[60px] h-[60px]"
    },[size])

    return (
        <div className={`${iconSize} ${flex ? " flex " : " "}`}>
            <img src={src}
                alt="Avatar"
                width={`${size}px`}
                height={`${size}px`}
            />
        </div>
    )

}