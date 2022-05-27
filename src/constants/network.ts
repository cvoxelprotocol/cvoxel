export type networksType = {
  [chainId: number]: { name: string; symbol: "ETH" | "MATIC" };
};

export const networks: networksType = {
  1: {
    name: "Ethereum",
    symbol: "ETH",
  },
  137: {
    name: "Polygon",
    symbol: "MATIC",
  },
};
