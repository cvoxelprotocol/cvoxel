import { DeliverableItem } from "@/__generated__/types/WorkCredential";

export type CVoxel = {
  to: string; // payee address. maybe contract address
  from: string; // payer address. maybe contract address
  isPayer: boolean; // whether owner is payer or not
  summary: string; // work summary
  detail?: string; // work detail
  deliverables?: DeliverableItem[]; // deliberable link
  value: string; // reward value
  tokenSymbol: string; // eth, usdc, etc
  tokenDecimal: number; // token decimals
  fiatValue?: string; //reward value as USD
  fiatSymbol?: string; // currently only USD supported
  networkId: number; // eth mainnet = 1 | polygon mainnet = 137
  issuedTimestamp: string; //block timestamp
  txHash?: string; // transfer tx hash
  jobType?: "FullTime" | "PartTime" | "OneTime"; // default=OneTime
  genre?: string; // main genre
  tags?: string[]; //tags
  toSig?: string; // sig of payee
  fromSig?: string; // sig of payer
  toSigner?: string; // who signed this cvoxel as payee actually. Only EOA supported
  fromSigner?: string; // who signed this cvoxel as payer actually. Only EOA supported
  startTimestamp?: string; //timestamp to start work
  endTimestamp?: string; //timestamp to end work
  relatedAddresses: string[]; // all addresses related to this cvoxel. may contain both EOA and contract address
  relatedTxHashes?: string[]; //tx releated work
  deliverableHash?: string; // hash value of all work descriptions(summary, detail, deliverables)
  platform?: string; // a transaction platform if exists e.g, gitcoin
  createdAt?: string; //timestamp to be created
  updatedAt?: string; //timestamp to be updated
};

export type CVoxelMetaDraft = CVoxel & {
  potencialPayer?: string[]; // in case of multisig wallet
  potencialPayee?: string[]; // in case of multisig wallet
  completed?: boolean; // whether or not work is completed (only in case of LanC., it might be false)
  id?: string;
};

export type CVoxelItem = {
  id: string;
  txHash?: string; // transfer tx hash
  isPayer: boolean;
  summary: string;
  deliverables?: DeliverableItem[]; // deliberable link
  fiatValue?: string;
  genre?: string; // main genre
  deliverableHash?: string; // hash value of all work descriptions(summary, detail, deliverables)
  platform?: string; // a transaction platform if exists e.g, gitcoin
  isVerified?: boolean;
  issuedTimestamp: string;
};

export type CVoxels = {
  WorkCredentials: CVoxelItem[];
};

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
