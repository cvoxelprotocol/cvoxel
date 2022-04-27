import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Layout.module.css";
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes';

const AccountButton = dynamic(() => import('@/components/common/button/AccountButton'), {
  ssr: false,
})
export const Header = () => {
  const {theme } = useTheme()
  return (
    <>
      <nav className={ (theme === 'dark' ? styles.appbar_dark : styles.appbar ) + " py-1 px-3 md:px-14 "}>
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
            <div className="hidden sm:flex items-center cursor-pointer mr-4">
              <Link href="/intro" passHref>
                <a className="mr-1 p-2 text-base  text-primary" target="_blank" rel="noreferrer">
                  About
                </a>
              </Link>
              <a className="mx-1 p-2 text-base  text-primary" href="https://docs.cvoxel.xyz/" target="_blank" rel="noreferrer">
                Doc
              </a>
              <a className="mx-1 p-2 text-base text-primary" href="https://discord.gg/TBJFmJv6uZ" target="_blank" rel="noreferrer">
                Discord
              </a>
            </div>
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
