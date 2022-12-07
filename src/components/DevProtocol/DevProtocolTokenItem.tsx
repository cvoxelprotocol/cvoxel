import { FC } from "react";
import { WorkSubjectFromERC721 } from "@/interfaces";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import ExternalLinkIcon from "@/components/common/button/externalLink.svg";
import clsx from "clsx";

type Props = {
  item: WorkSubjectFromERC721;
  issued?: boolean;
};

export const DevProtocolTokenItem: FC<Props> = ({ item, issued = false }) => {
  return (
    <div
      className={clsx(
        "p-2 w-full relative sm:flex items-center rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant justify-between text-xs lg:text-sm text-black dark:text-white break-words  bg-light-surface-2 dark:bg-dark-surface-2",
        issued &&
          "border-light-primary bg-light-surface-5 dark:border-dark-primary dark:bg-dark-surface-5"
      )}
    >
      <div className="space-y-2">
        <div className="lg:col-span-4 h-full space-y-1">
          <div className="flex items-center space-x-4 p-1 sm:p-0 justify-between">
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-2xl font-medium">
              {item.work?.summary}
            </div>

            {issued && <div className="text-lg rounded-lg border border-light-on-surface-variant dark:border-dark-on-surface-variant px-2">Issued</div>}
          </div>
        </div>

        {item?.work?.value && (
          <div className="text-light-on-surface dark:text-dark-on-surface text-lg">
            {item?.work?.value} DEV
          </div>
        )}

        {item?.work?.detail && (
          <div className="text-light-on-surface dark:text-dark-on-surface text-xs">
            {item?.work?.detail}
          </div>
        )}

        {item.tx?.from && (
          <a
            className="flex items-center flex-wrap"
            href={`https://stakes.social/user/${item.tx?.from}#supporting`}
            target="_blank"
            rel="noreferrer"
            key={item.tx?.from}
          >
            <ExternalLinkIcon className="w-3 h-3 mr-1 text-light-secondary dark:text-dark-secondary" />
            <span className="text-light-secondary dark:text-dark-secondary text-md text-left">
              stake.social
            </span>
          </a>
        )}

        <div className="flex flex-wrap py-1 sm:py-0">
          <div className="mr-2">
            <GenreBadge
              text={item.work?.genre || "Other"}
              baseColor={getGenre(item.work?.genre)?.bgColor || "bg-[#b7b7b7]"}
              isSelected={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
