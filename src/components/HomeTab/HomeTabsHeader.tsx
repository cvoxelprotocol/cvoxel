import { FC, useCallback } from "react";
import { TabListItem } from "@/components/HomeTab/TabListItem";
import Link from "next/link";
import { NamePlate } from "@/components/common/NamePlate";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { Button } from "@/components/common/button/Button";
import { useTab } from "@/hooks/useTab";

export const HomeTabsHeader: FC = () => {
  const { did } = useMyCeramicAcount();
  const { setTabState } = useTab();

  const handleCreateNewVoxel = useCallback(() => {
    // TODO: open first tx
    setTabState("transactions");
  }, [setTabState]);

  return (
    <>
      <div className="w-full min-h-screen text-center bg-light-surface-1 dark:bg-dark-surface-1 rounded-r-2xl">
        <ul className={"w-full text-left p-4"} role="tablist">
          <li className="sm:hidden md:block text-center pt-8 pb-4 mb-4">
            <NamePlate did={did} size="lg" isMe hasBackgroundColor />
          </li>
          <li className="hidden sm:flex md:hidden justify-center pt-8 pb-4">
            <NamePlate did={did} isMe iconOnly hasBackgroundColor />
          </li>

          <TabListItem type="cvoxels" />
          <TabListItem type="transactions" />
          <TabListItem type="notifications" />
        </ul>

        <div className="hidden md:block">
          <Button
            text="Create New Voxel"
            color="primary"
            onClick={handleCreateNewVoxel}
          />
        </div>

        <div className="h-[2px] w-10/12 bg-light-primary mx-auto md:mt-12" />

        <ul className="w-full text-left py-4 px-5">
          <li className="py-3">
            <Link href="/intro" passHref>
              <a
                className="text-base md:text-2xl text-light-on-surface-variant dark:text-dark-on-surface-variant"
                target="_blank"
                rel="noreferrer"
              >
                About
              </a>
            </Link>
          </li>
          <li className="py-3">
            <a
              className="text-base md:text-2xl text-light-on-surface-variant dark:text-dark-on-surface-variant"
              href="https://docs.cvoxel.xyz/"
              target="_blank"
              rel="noreferrer"
            >
              Doc
            </a>
          </li>
          <li className="py-3">
            <a
              className="text-base md:text-2xl text-light-on-surface-variant dark:text-dark-on-surface-variant"
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
