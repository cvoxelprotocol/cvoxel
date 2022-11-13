export type ConnectNetwork = "mainnet" | "testnet-clay" | "dev-unstable";
export const CERAMIC_NETWORK: ConnectNetwork =
  process.env.NEXT_PUBLIC_CERAMIC_ENV === "mainnet"
    ? "mainnet"
    : "testnet-clay";
