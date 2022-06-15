import { FC, useCallback, useEffect, useRef, useState } from "react";
import LinkIcon from "@/components/common/button/shareButton/link.svg";
import Twitter from "@/components/common/button/shareButton/twitter.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToolTip } from "@/components/common/ToolTip";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export const ShareButton: FC<{}> = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [url, setURL] = useState<string>("");

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

  const router = useRouter();

  const makeURL = (): string => {
    if (process.browser) {
      const { protocol, hostname, port } = window.location;
      const path = router.asPath;
      const u = new URL(
        `${protocol}//${hostname}${port ? ":" + port : ""}${path}`
      );

      // NOTE: When using voxel IDs
      // u.searchParams.set("voxelid","")

      return u.toString();
    }

    return "";
  };

  useEffect(() => {
    if (url == "") {
      setURL(makeURL());
    }
  }, [makeURL, router.isReady, url]);

  const makeTwitterURL = (): string => {
    const u = new URL("https://twitter.com/intent/tweet");
    u.searchParams.set("url", url);

    // NOTE: When using additional texts
    // u.searchParams.set("text", "");

    return u.toString();
  };

  return (
    <div ref={ref} className="relative">
      <button
        className="bg-primary-300 px-3 py-1.5 text-white rounded"
        onClick={handleClickButton}
      >
        Share
      </button>
      <div
        className={clsx(
          "absolute bg-white shadow-lg rounded-lg right-0 p-4 min-w-max z-10",
          showMenu ? undefined : "opacity-0 pointer-events-none" // To control the animation of tooltips
        )}
      >
        <div className="flex items-center text-black hover:text-gray-500 relative">
          <LinkIcon className="mr-2 w-5" />
          <CopyToClipboard text={url} onCopy={handleOnCopy}>
            <button>Copy link</button>
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
          <Twitter className="mr-2 w-5" />
          <Link href={makeTwitterURL()} passHref>
            <a target="_blank" rel="noreferrer">
              Share on Twitter
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
