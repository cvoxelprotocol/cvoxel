import { FC } from "react";
import { MyProfileCard } from "../Profile/MyProfileCard";
import {TabListItem} from "@/components/HomeTab/TabListItem"
import { MyProfileIcon } from "../Profile/MyProfileIcon";
import Link from "next/link";

export const HomeTabsHeader: FC = () => {

  return (
    <>
      <div className="w-full min-h-screen text-center border-r border-secondary">
        <ul
          className={ "w-full text-left p-4"}
          role="tablist"
        >
          <li className="sm:hidden md:block text-center pt-8 pb-4">
            <MyProfileCard />
          </li>
          <li className="hidden sm:flex md:hidden justify-center pt-8 pb-4">
            <MyProfileIcon />
          </li>
          <TabListItem type="cvoxels" clickTab={() => console.log("hoge")} />
          <TabListItem type="transactions" clickTab={() => console.log("hoge")} />
          <TabListItem type="notifications" clickTab={() => console.log("hoge")} />
        </ul>
        <ul className="w-full text-left border-t border-secondary py-4 px-5">
          <li className="py-3">
              <Link href="/intro" passHref>
                  <a
                    className="text-primary text-base md:text-2xl"
                    target="_blank"
                    rel="noreferrer"
                  >
                    About
                  </a>
                </Link>
            </li>
            <li className="py-3">
              <a
                className="text-primary text-base md:text-2xl"
                href="https://docs.cvoxel.xyz/"
                target="_blank"
                rel="noreferrer"
              >
                Doc
              </a>
            </li>
            <li className="py-3">
              <a
                className="text-primary text-base md:text-2xl"
                href="https://discord.gg/TBJFmJv6uZ"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </li>
        </ul>
      </div>
    </>
  );
};
