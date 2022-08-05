import { ConnectNetwork } from "@self.id/web";

export const CERAMIC_NETWORK: ConnectNetwork =
  process.env.NEXT_PUBLIC_CERAMIC_ENV === "mainnet"
    ? "mainnet"
    : "testnet-clay";
export const CERAMIC_URL =
  process.env.NEXT_PUBLIC_CERAMIC_URL || "http://localhost:7007/";

export const IPFS_URL = "https://ipfs.infura.io/ipfs/";

export const ETH_CHAIN_ID = `eip155:1:`;
