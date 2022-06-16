import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Layout.module.css";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const AccountButton = dynamic(
  () => import("@/components/common/button/AccountButton"),
  {
    ssr: false,
  }
);
export const Header = () => {
  const { theme } = useTheme();
  return (
    <>
      <nav
        className={
          (theme === "dark" ? styles.appbar_dark : styles.appbar) +
          " py-1 px-3 md:px-14 "
        }
      >
        <div className="w-full grid grid-cols-3 mx-auto items-center justify-evenly">
          <div className="flex justify-center items-center col-span-1 col-start-2 cursor-pointer w-full">
            <Link href="/" passHref>
              <div className="text-center flex">
                <Image
                  src="/cvoxel_logo_icon.png"
                  alt="LanC"
                  objectFit="cover"
                  width="48px"
                  height="40px"
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
    </>
  );
};
