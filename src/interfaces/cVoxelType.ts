export type CCubeType = CVoxelVisType[][][];

import type { ModelTypeAliases } from "@glazed/types";
import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { AlsoKnownAs } from "@datamodels/identity-accounts-web";
import { CryptoAccountLinks } from "@datamodels/identity-accounts-crypto";

export type EditionState =
  | { status: "pending" }
  | { status: "loading" }
  | { status: "failed"; error?: unknown }
  | { status: "done"; cVoxelPage: string };

export type CVoxel = {
  to: string; // payee address
  from: string; // payer address
  summary: string; // work summary
  detail?: string; // work detail
  deliverable?: string; // deliberable link
  value: string; // reward value
  tokenSymbol: string; // eth, usdc, etc
  tokenDecimal: number;
  networkId: number; // eth mainnet = 1
  issuedTimestamp: string; //block timestamp
  txHash: string; // transfer tx hash
  relatedTxHashes?: string[]; //tx releated work
  tags: string[]; //tags
  genre?: string; // main genre
  jobType: "FullTime" | "PartTime" | "OneTime"; // default=OneTime
  toSig: string;
  fromSig: string;
};

export type CVoxelWithId = CVoxel & {
  id: string;
};

export type CVoxelMetaDraft = CVoxel & {
  potencialPayer?: string[]; // in case of multisig wallet
  relatedAddresses: string[];
  completed?: boolean; // whether or not work is completed (only in case of LanC., it might be false)
};

export type CVoxelDraftAndMeta = {
  meta: CVoxel;
  draft: CVoxelMetaDraft;
};

export type CVoxelItem = {
  id: string;
  summary: string;
  issuedTimestamp: string;
};

export type CVoxels = {
  cVoxels: CVoxelItem[];
};

export type ModelTypes = ModelTypeAliases<
  {
    AlsoKnownAs: AlsoKnownAs;
    BasicProfile: BasicProfile;
    CryptoAccounts: CryptoAccountLinks;
    CVoxel: CVoxel;
    CVoxels: CVoxels;
  },
  {
    alsoKnownAs: "AlsoKnownAs";
    basicProfile: "BasicProfile";
    cryptoAccounts: "CryptoAccounts";
    cVoxels: "CVoxels";
  },
  { PlaceHodlerCVoxels: "CVoxel" }
>;

export type CVoxelVisType = {
  color: string;
  opacity: number;
  lattice: boolean;
  scale?: number;
};

export type CVoxelThree = CVoxelVisType & {
  position: THREE.Vector3;
  offset?: THREE.Vector3;
};

export const cVoxelTest: CVoxelVisType[] = [
  {
    color: "hsl(330, 70%, 50%)",
    opacity: 1,
    lattice: true,
    scale: 1,
  },
];
