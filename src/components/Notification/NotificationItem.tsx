import { FC } from "react";
import KeyIcon from "@/components/Notification/key.svg";

type Props = {};

export const NotificationItem: FC<Props> = () => {
  return (
    <div className="flex rounded-lg overflow-hidden shadow-lg bg-white w-full">
      <div className="bg-accent_l w-12 flex justify-center items-center">
        <KeyIcon className="w-7 h-8" />
      </div>
      <div className="text-left px-4 py-2">
        <div className="flex items-center">
          <div className="text-primary font-semibold text-sm">Anne Taylor</div>
          <div className="ml-2 text-gray-500 font-semibold text-xs">1 minute ago</div>
          <div className="ml-2 rounded-full bg-red-600 w-1.5 h-1.5"/>
        </div>
        <div className="font-medium text-lg">Development of smart contract with Solidity</div>
        <div className="text-gray-500">I programmed a DEX protocol with Solidity</div>
      </div>
    </div>
  );
};
