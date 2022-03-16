export const getExploreLink = (hash: string, chainId: number = 1): string => {
  return chainId === 1
    ? `https://etherscan.io/tx/${hash}`
    : `https://rinkeby.etherscan.io/tx/${hash}`;
};
