import { FC, memo, useMemo } from "react";
import { GenreBadge } from "@/components/common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "@/components/common/badge/TagBadge";
import { shortenStr } from "@/utils/objectUtil";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { WorkCredentialWithId } from "vess-sdk";
import dynamic from "next/dynamic";

const CredentialDirection = dynamic(
  () => import("@/components/common/CredentialDirection"),
  {
    ssr: false,
  }
);
const OneVoxelVisualizerPresenterWrapper = dynamic(
  () => import("@/components/CVoxel/OneVoxelVisualizerPresenterWrapper"),
  {
    ssr: false,
  }
);

type Props = {
  workCredential: WorkCredentialWithId;
};

const VoxelListItem: FC<Props> = ({ workCredential }) => {
  // item detail
  const detailItem = useMemo(() => {
    return workCredential || null;
  }, [workCredential]);

  const subject = useMemo(() => {
    return detailItem?.subject
  },[detailItem])

  const router = useRouter();

  const PcContent = () => {
    return (
      <div className="flex h-48 overflow-y-scroll">
        {/* NOTE: if voxel state exist, add padding bottom*/}
        <div
          className={"rounded-r-lg w-40 relative bg-light-surface dark:bg-dark-surface"}
        >
          {detailItem && (
            <OneVoxelVisualizerPresenterWrapper zoom={6} disableHover workCredential={workCredential} />
          )}
          
          {/* TODO: show voxel state */}
          {/*<div className="absolute bottom-2 left-0 right-0">*/}
          {/*  <div className="text-sm text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container inline-block px-2 py-0.5 rounded-full border border-light-secondary font-medium">*/}
          {/*    Portfolio*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="w-full text-left p-4 space-y-3">
          <div className="flex justify-between items-center">
            <CredentialDirection
              holder={subject.work?.id}
              client={subject.client}
            />
            {subject?.work?.issuedAt && (
              <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
                {convertTimestampToDateStr(subject?.work?.issuedAt)}
              </div>
            )}
          </div>

          {subject?.work?.summary && (
              <div className="text-light-on-primary-container dark:text-dark-on-error-container text-2xl font-medium text-ellipsis whitespace-nowrap overflow-x-hidden flex-nowrap max-w-[550px]">
                {subject?.work?.summary}
              </div>
            )}
            {(subject?.deliverables &&
              subject.deliverables.length > 0) &&
              subject?.deliverables.map((deliverable) =>
              <a
                className="flex items-center flex-wrap"
                href={`${deliverable.format==="url" ? deliverable.value : `https://dweb.link/ipfs/${deliverable.value}`}`}
                target="_blank"
                rel="noreferrer"
                key={deliverable.value}
              >
                <span className="text-light-secondary dark:text-dark-secondary text-md text-left">
                  {shortenStr(deliverable.value, 60)}
                </span>
              </a>
              )}

          <div className="flex overflow-x-scroll items-center">
            {subject?.work?.genre && (
              <div className="mr-2">
                <GenreBadge
                  text={subject.work?.genre || "Other"}
                  baseColor={
                    getGenre(subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                  }
                  isSelected={true}
                />
              </div>
            )}
            {subject?.work?.tags &&
              subject?.work?.tags.map((tag) => {
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
        {detailItem && (
          <OneVoxelVisualizerPresenterWrapper zoom={6} disableHover workCredential={workCredential} />
          )}
          <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>

          {/* TODO: show voxel state */}
          {/*<div className="absolute top-2 left-2">*/}
          {/*  <div className="text-sm text-light-on-primary-container dark:text-dark-on-primary-container bg-light-primary-container dark:bg-dark-primary-container inline-block px-2 py-0.5 rounded-full border border-light-secondary font-medium">*/}
          {/*    Portfolio*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="absolute right-2 top-2">
            <CredentialDirection
              holder={subject.work?.id}
              client={subject.client}
            />
          </div>
        </div>

        <div className="text-left px-8 pt-3 h-[120px]">
          {subject?.work?.issuedAt && (
            <div className="text-light-on-surface dark:text-dark-on-surface text-sm">
              {convertTimestampToDateStr(subject?.work?.issuedAt)}
            </div>
          )}

          {subject?.work?.summary && (
            <div className="text-light-on-primary-container dark:text-dark-on-error-container text-lg sm:text-xl font-medium text-ellipsis whitespace-nowrap overflow-hidden">
              {subject?.work?.summary}
            </div>
          )}
          {subject?.deliverables &&
            subject.deliverables.length > 0 &&
            subject?.deliverables.map((deliverable) =>
              <a
                className="flex items-center flex-wrap"
                href={`${
                  deliverable.format === "url"
                    ? deliverable.value
                    : `https://dweb.link/ipfs/${deliverable.value}`
                }`}
                target="_blank"
                rel="noreferrer"
                key={deliverable.value}
              >
                <p className="text-light-secondary dark:text-dark-secondary text-md text-left">
                  {shortenStr(deliverable.value, 30)}
                </p>
              </a>
            )}

          <div className="flex overflow-x-scroll items-center">
            {subject?.work?.genre && (
              <div className="mr-2">
              <GenreBadge
                text={subject.work?.genre || "Other"}
                baseColor={
                  getGenre(subject.work?.genre)?.bgColor || "bg-[#b7b7b7]"
                }
                isSelected={true}
              />
              </div>
            )}
            {subject?.work?.tags &&
              subject.work?.tags.map((tag) => {
                return <TagBadge key={tag} text={tag} />;
              })}
          </div>
        </div>
      </div>
    );
  };

  if (!detailItem) return <></>;
  return (
    <Link href={`${router.asPath.split("?")[0]}?voxel=${workCredential.backupId}`}>
      <div className="w-full">
        <div className="w-full border border-light-on-primary-container dark:border-dark-on-primary-container rounded-lg overflow-hidden bg-light-surface-1 dark:bg-dark-surface-1">
          <div className="hidden lg:block w-full">
            <PcContent />
          </div>
          <div className="lg:hidden">
            <SpContent />
              </div>
            </div>
          </div>
        </Link>
      );
};

export const VoxelListItemMemo = memo(VoxelListItem)