import { FC, useMemo } from "react";
import KeyIcon from "@/components/Notification/key.svg";
import { CVoxelMetaDraft } from "@/interfaces";
import { useENS } from "@/hooks/useENS";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import { convertDateToTimeAgo } from "@/utils/dateUtil";

type Props = {
  tx: CVoxelMetaDraft;
  account?: string | null;
};

export const NotificationItem: FC<Props> = ({ tx, account }) => {
  const isPayee = useMemo(() => {
    return account?.toLowerCase() === tx.to.toLowerCase();
  }, [account, tx]);
  const { ens, ensLoading } = useENS(isPayee ? tx.from : tx.to);

  return (
    <div className="flex rounded-lg overflow-hidden shadow-lg bg-white w-full">
      <div className="bg-accent_l w-12 flex justify-center items-center">
        <KeyIcon className="w-7 h-8" />
      </div>
      <div className="text-left px-4 py-2">
        <div className="flex items-center">
          <div className="text-primary font-semibold text-sm">
            {" "}
            {ensLoading ? (
              <CommonSpinner size="sm" />
            ) : (
              <p className="break-words flex-wrap">{ens}</p>
            )}
          </div>
          {tx.createdAt && (
            <div className="ml-2 text-gray-500 font-semibold text-xs">
              {convertDateToTimeAgo(new Date(Number(tx.createdAt) * 1000))}
            </div>
          )}

          {/*TODO: Implementation of unread badges on the backend*/}
          {/*<div className="ml-2 rounded-full bg-red-600 w-1.5 h-1.5" />*/}
        </div>
        <div className="font-medium text-lg">{tx.summary}</div>
        <div className="text-gray-500">{tx.detail}</div>
      </div>
    </div>
  );
};
