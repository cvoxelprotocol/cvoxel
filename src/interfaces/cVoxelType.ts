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
  to: string; // payee address. maybe contract address
  from: string; // payer address. maybe contract address
  isPayer: boolean; // whether owner is payer or not
  summary: string; // work summary
  detail?: string; // work detail
  deliverable?: string; // deliberable link
  value: string; // reward value
  tokenSymbol: string; // eth, usdc, etc
  tokenDecimal: number;
  fiatValue?: string; //reward value as USD
  fiatSymbol?: string; // currently only USD supported
  networkId: number; // eth mainnet = 1 | polygon mainnet = 137
  issuedTimestamp: string; //block timestamp
  txHash: string; // transfer tx hash
  relatedTxHashes?: string[]; //tx releated work
  tags: string[]; //tags
  genre?: string; // main genre
  jobType: "FullTime" | "PartTime" | "OneTime"; // default=OneTime
  toSig: string; // sig of payee
  fromSig: string; // sig of payer
  toSigner: string; // who signed this cvoxel as payee actually. Only EOA supported
  fromSigner: string; // who signed this cvoxel as payer actually. Only EOA supported
  relatedAddresses: string[]; // all addresses related to this cvoxel. may contain both EOA and contract address
};

export type CVoxelWithId = CVoxel & {
  id: string;
};

export type CVoxelMetaDraft = CVoxel & {
  potencialPayer?: string[]; // in case of multisig wallet
  potencialPayee?: string[]; // in case of multisig wallet
  completed?: boolean; // whether or not work is completed (only in case of LanC., it might be false)
};

export type CVoxelDraftAndMeta = {
  meta: CVoxel;
  draft: CVoxelMetaDraft;
};

export type CVoxelItem = {
  id: string;
  txHash: string; // transfer tx hash
  isPayer: boolean;
  summary: string;
  deliverable?: string; // deliberable link
  fiatValue?: string;
  genre?: string; // main genre
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
