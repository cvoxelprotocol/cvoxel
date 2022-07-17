import { FC } from "react";
import { TabListItem } from "@/components/HomeTab/TabListItem";
import Link from "next/link";
import { NamePlate } from "@/components/common/NamePlate";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";

export const HomeTabsHeader: FC = () => {
  const { did } = useMyCeramicAcount();

  return (
    <>
      <div className="w-full min-h-screen text-center border-r border-secondary">
        <ul className={"w-full text-left p-4"} role="tablist">
          <li className="hidden md:block text-center pt-8 pb-4">
            <NamePlate did={did} size="lg" isMe />
          </li>
          <li className="block md:hidden justify-center pt-8 pb-4">
            <NamePlate did={did} isMe iconOnly />
          </li>
          <TabListItem type="cvoxels" clickTab={() => console.log("hoge")} />
          <TabListItem
            type="transactions"
            clickTab={() => console.log("hoge")}
          />
          <TabListItem
            type="notifications"
            clickTab={() => console.log("hoge")}
          />
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
