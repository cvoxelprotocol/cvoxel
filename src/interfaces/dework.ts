export type DeworkUser = {
  id: string;
  name: string;
  address: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  status: string;
  dueDate?: string;
  createdAt: string;
  doneAt: string;
  deletedAt?: string;
  workspaceId: string;
  workspace: Workspace;
  number: number;
  gating: string;
  openToBids: boolean;
  submissionCount: number;
  applicationCount: number;
  tags: Tag[];
  skills: Skill[];
  assignees: User[];
  owners: User[];
  creator: User;
  rewards: Reward[];
  review?: Review[] | null;
  reactions: Reaction[];
};

type Review = {
  id: string;
  message: string;
  rating: string;
};

type Reaction = {
  id: string;
  userId: string;
  reaction: string;
};

type Reward = {
  id: string;
  amount: string;
  peggedToUsd: boolean;
  fundingSessionId?: any;
  token: Token;
  tokenId: string;
  payments: any[];
};

type Token = {
  id: string;
  exp: number;
  type: string;
  name: string;
  symbol: string;
  address: string;
  identifier?: any;
  usdPrice: number;
  networkId: string;
  visibility: string;
  imageUrl: string;

  network: Network;
};

type Network = {
  id: string;
  slug: string;
  name: string;
  type: string;
  config: Config;
  sortKey: string;
};

type Config = {
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  gnosisSafe: GnosisSafe;
};

type GnosisSafe = {
  serviceUrl: string;
  addressPrefix: string;
  safeUrlPrefix: string;
};

type User = {
  id: string;
  username: string;
};

type Skill = {
  id: string;
  name: string;
  emoji: string;
};

type Tag = {
  id: string;
  label: string;
};

type Workspace = {
  id: string;
  slug: string;
  name: string;
  status: string;
  deletedAt?: any;
  organizationId: string;
  permalink: string;

  organization: Organization;
};

type Organization = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  permalink: string;
};
