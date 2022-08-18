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
    const toolTipDuration = 1000;
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
        <>
            <CopyToClipboard text={requestUrl} onCopy={handleOnCopy}>
                <Button
                    text="Copy Request URL"
                    color="secondary"
                    buttonType="button"
                />
            </CopyToClipboard>
            <div
                className={clsx(
                "absolute left-0 right-0",
                showToolTip ? "animate-fade-in-fast" : "animate-fade-out-fast"
                )}
            >
            <ToolTip text="Copied!" />
        </div>
      </>
    )
}