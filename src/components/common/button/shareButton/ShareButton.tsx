import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import LinkIcon from "@/components/common/button/shareButton/link.svg";
import Twitter from "@/components/common/button/shareButton/twitter.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToolTip } from "@/components/common/ToolTip";
import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import Share from "@/components/CVoxel/VoxelDetail/share.svg";

type Props = {
  voxelID: string;
  isOwner?: boolean;
  valiant?: "button" | "icon";
};

export const ShareButton: FC<Props> = ({ voxelID, valiant = "button", isOwner = false }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  // Handling to close when clicking outside the area
  const ref = useRef<HTMLDivElement>(null);
  const documentClickHandler = useRef((e: MouseEvent) => {});
  const removeDocumentClickHandler = () => {
    document.removeEventListener("click", documentClickHandler.current);
  };
  useEffect(() => {
    documentClickHandler.current = (e) => {
      if (ref.current != null && ref.current.contains(e.target as Node)) return;

      setShowMenu(false);
      removeDocumentClickHandler();
    };
  }, []);

  const handleClickButton = useCallback(() => {
    if (!showMenu) {
      setShowMenu(true);
      document.addEventListener("click", documentClickHandler.current);
    } else {
      removeDocumentClickHandler();
      setShowMenu(false);
    }
  }, [showMenu]);

  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const toolTipDuration = 1000;
  const handleOnCopy = async () => {
    setShowToolTip(true);
    await new Promise((resolve) => setTimeout(resolve, toolTipDuration));
    setShowToolTip(false);
  };

  const shareUrl:string = useMemo(() => {
    if (typeof window !== 'undefined') {
      const { protocol, hostname, port } = window.location;
      const path = router.asPath;
      const u = new URL(
        `${protocol}//${hostname}${port ? ":" + port : ""}${path}`
      );

      // NOTE: When using voxel IDs
      u.searchParams.set("voxel", voxelID);

      return u.toString();
    }

    return "";
  },[voxelID,router.asPath])

  const makeTwitterURL = (): string => {
    const u = new URL("https://twitter.com/intent/tweet");
    u.searchParams.set("url", shareUrl);

    u.searchParams.set("text", isOwner ? "I made a new work credential on @vess_id !" : "The work credential on @vess_id ");
    u.searchParams.set("hashtags", "Vess,WorkCredential");

    return u.toString();
  };

  const shareTwitter = () => {
    window.open(makeTwitterURL(), "_blank")
  }

  return (
    <div ref={ref} className="relative">
      {valiant == "button" && (
        <button
          className="bg-primary-300 px-3 py-1.5 text-white rounded"
          onClick={handleClickButton}
        >
          Share
        </button>
      )}

      {valiant == "icon" && (
        <button onClick={handleClickButton}>
          <Share className="text-light-on-surface-variant dark:text-dark-on-surface-variant" />
        </button>
      )}

      <div
        className={clsx(
          "absolute bg-light-background dark:bg-dark-background dark:border-dark-outline dark:border shadow-lg rounded-lg right-0 p-4 min-w-max z-10",
          showMenu ? undefined : "opacity-0 pointer-events-none" // To control the animation of tooltips
        )}
      >
        <div className="flex items-center text-black hover:text-gray-500 relative">
          <LinkIcon className="mr-2 w-5 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
          <CopyToClipboard text={shareUrl} onCopy={handleOnCopy}>
            <button className="text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Copy link
            </button>
          </CopyToClipboard>
          <div
            className={clsx(
              "absolute left-0 right-0",
              showToolTip ? "animate-fade-in-fast" : "animate-fade-out-fast"
            )}
          >
            <ToolTip text="Copied!" />
          </div>
        </div>
        <div className="flex items-center mt-3 text-black hover:text-gray-500">
          <Twitter className="mr-2 w-5 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
          <button
              onClick={() => shareTwitter()}
              className="text-light-on-surface-variant dark:text-dark-on-surface-variant"
            >
              Share on Twitter
            </button>
        </div>
      </div>
    </div>
  );
};
