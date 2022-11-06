import { FC } from "react";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { WorkCredentialWithId } from "vess-sdk";
import { shortenStr } from "@/utils/objectUtil";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useVoxelStyler } from "@/hooks/useVoxStyler";
import { TxDirection } from "@/components/common/TxDirection";
import dynamic from "next/dynamic";

const OneVoxelVisualizerPresenterWrapper = dynamic(
  () => import("@/components/CVoxel/OneVoxelVisualizerPresenterWrapper"),
  {
    ssr: false,
  }
);

type Props = {
  item: WorkCredentialWithId;
};

export const SigRequestListItem: FC<Props> = ({ item }) => {
  const router = useRouter();

  // convert display
  const { displayVoxel } = useVoxelStyler(item);

  const PcContent = () => {
    return (
      <div className="flex h-48">
        {/* NOTE: if voxel state exist, add padding bottom*/}
        <div
          className={clsx(
            "rounded-r-lg w-40 relative bg-light-surface dark:bg-dark-surface",
            false && "pb-6"
          )}
        >
          <OneVoxelVisualizerPresenterWrapper
              zoom={6}
              disableHover
              voxelForDisplay={displayVoxel}
          />

          <div className="absolute bg-light-sig-request-layer dark:bg-dark-sig-request-layer top-0 bottom-0 left-0 right-0 opacity-70">
            <div className="h-full flex items-center p-3 justify-center">
              <p className="text-light-surface dark:text-dark-surface font-medium text-xl">
                Signature
                <br /> Request
              </p>
            </div>
          </div>

          {/* TODO: show voxel state */}
          {/*<div className="absolute bottom-2 left-0 right-0">*/}
          {/*  <div className="text-sm text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container inline-block px-2 py-0.5 rounded-full border border-light-secondary font-medium">*/}
          {/*    Portfolio*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className=" flex-auto text-left p-4 space-y-3">
          <div className="flex justify-between">
            <TxDirection
              from={item.subject.tx?.from}
              to={item.subject.tx?.to}
              isPayer={item.subject.tx?.isPayer || false}
            />
            {item.createdAt && (
              <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
                {convertTimestampToDateStr(item.createdAt)}
              </div>
            )}
          </div>

          <div>
            {item.subject.work?.summary && (
              <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium">
                {item.subject.work?.summary}
              </div>
            )}

            {item.subject.deliverables &&
              item.subject.deliverables.length > 0 &&
              item.subject.deliverables.map((deliverable) =>
                <a
                  className="flex items-center flex-wrap"
                  href={`${deliverable.format==="url" ? deliverable.value : `https://dweb.link/ipfs/${deliverable.value}`}`}
                  target="_blank"
                  rel="noreferrer"
                  key={deliverable.value}
                >
                  <p className="text-light-secondary dark:text-dark-secondary text-md text-left">
                    {deliverable.format==="url" ? deliverable.value : shortenStr(deliverable.value)}
                  </p>
                </a>
              )}
          </div>

          <div className="flex">
            {item.subject.work?.genre ? (
              <div className="mr-2">
              <GenreBadge
                text={item.subject.work?.genre || "Other"}
                baseColor={
                  getGenre(item.subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                }
                isSelected={true}
              />
              </div>
            ) : (
              <></>
            )}
            {item.subject.work?.tags &&
              item.subject.work?.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
          </div>
        </div>
      </div>
    );
  };

  const SpContent = () => {
    return (
      <div className="w-full">
        <div className="w-full h-32 relative bg-light-surface dark:bg-dark-surface rounded-b-lg">
          <OneVoxelVisualizerPresenterWrapper
            zoom={6}
            disableHover
            voxelForDisplay={displayVoxel}
          />

          {/* TODO: show voxel state */}
          {/*<div className="absolute top-2 left-2">*/}
          {/*  <div className="text-sm text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container inline-block px-2 py-0.5 rounded-full border border-light-secondary font-medium">*/}
          {/*    Portfolio*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="absolute bg-light-sig-request-layer dark:bg-dark-sig-request-layer top-0 bottom-0 left-0 right-0 opacity-70">
            <div className="h-full flex items-center p-3 justify-center">
              <p className="text-light-surface dark:text-dark-surface font-medium text-xl">
                Signature
                <br /> Request
              </p>
            </div>
          </div>

          <div className="absolute right-2 top-2">
            <TxDirection
              from={item.subject.tx?.from}
              to={item.subject.tx?.to}
              isPayer={item.subject.tx?.isPayer || false}
            />
          </div>
        </div>

        <div className="text-left px-8 py-3">
          {item.createdAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
              {convertTimestampToDateStr(item.createdAt)}
            </div>
          )}

          {item.subject.work?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-xl font-medium">
              {item.subject.work?.summary}
            </div>
          )}

          {item.subject?.deliverables &&
            item.subject.deliverables.length > 0 &&
            item.subject?.deliverables.map((deliverable) =>
              <a
                className="flex items-center flex-wrap"
                href={`${deliverable.format==="url" ? deliverable.value : `https://dweb.link/ipfs/${deliverable.value}`}`}
                target="_blank"
                rel="noreferrer"
                key={deliverable.value}
              >
                <p className="text-light-secondary dark:text-dark-secondary text-md">
                  {deliverable.format==="url" ? deliverable.value : shortenStr(deliverable.value)}
                </p>
              </a>
            )}

          <div className="flex">
            {item.subject.work?.genre ? (
              <div className="mr-2">
              <GenreBadge
                text={item.subject.work?.genre || "Other"}
                baseColor={
                  getGenre(item.subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                }
                isSelected={true}
              />
              </div>
            ) : (
              <></>
            )}
            {item.subject.work?.tags &&
              item.subject.work?.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Link href={`${router.asPath.split("?")[0]}?crdl=${item.backupId}`}>
      <a className="w-full">
        <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-lg overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
          <div className="hidden lg:block w-full">
            <PcContent />
          </div>
          <div className="lg:hidden">
            <SpContent />
          </div>
        </div>
      </a>
    </Link>
  );
};
