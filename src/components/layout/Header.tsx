import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const AccountButton = dynamic(
  () => import("@/components/common/button/AccountButton"),
  {
    ssr: false,
  }
);
export const Header = () => {
  return (
    <nav className="py-1 px-3 md:px-14 flex justify-between items-center z-40 w-full h-[72px] bg-light-background dark:bg-dark-background relative">
      <div className="w-full grid grid-cols-3 mx-auto items-center justify-evenly">
        <div className="flex justify-center items-center col-span-1 col-start-2 cursor-pointer w-full">
          <Link href="/" passHref>
            <div className="text-center flex">
              <Image
                src="/vess-logo.png"
                alt="VESS"
                objectFit="cover"
                width="55px"
                height="50px"
              />
            </div>
          </Link>
        </div>
        <div className="col-span-1 flex items-center justify-end w-full">
          <div className="relative">
            <div className="md:flex items-center justify-end w-full text-right">
              <AccountButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
