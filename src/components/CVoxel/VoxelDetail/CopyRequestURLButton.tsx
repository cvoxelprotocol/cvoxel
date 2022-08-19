import { Button } from "@/components/common/button/Button";
import { ToolTip } from "@/components/common/ToolTip";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
    id: string
}
export const CopyRequestURLButton:FC<Props> = ({id}) => {

    const [showToolTip, setShowToolTip] = useState<boolean>(false);
    const toolTipDuration = 1500;
    const handleOnCopy = async () => {
        setShowToolTip(true);
        await new Promise((resolve) => setTimeout(resolve, toolTipDuration));
        setShowToolTip(false);
    };

    const requestUrl = useMemo(() => {
        if (typeof window !== 'undefined') {
            const { protocol, hostname, port } = window.location;
            const u = new URL(
              `${protocol}//${hostname}${port ? ":" + port : ""}/tx/${id}`
            );
            return u.toString();
          }
        return ""
    },[id])

    return (
        <div className="relative w-fit">
            <div
                className={clsx(
                "absolute left-0 right-0 top-6",
                showToolTip ? "animate-fade-in-fast" : "animate-fade-out-fast"
                )}
                >
                <ToolTip text="Copied Request URL" bgColor={"bg-light-primary dark:bg-dark-primary"}/>
            </div>
            <CopyToClipboard text={requestUrl} onCopy={handleOnCopy}>
                <button className="text-light-primary dark:text-dark-primary text-sm px-6 py-3">
                    Ask for signature
                </button>
            </CopyToClipboard>
      </div>
    )
}