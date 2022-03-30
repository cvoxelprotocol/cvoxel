export const getExploreLink = (hash: string, chainId: number = 1): string => {
  if (chainId === 137) {
    return `https://polygonscan.com/tx/${hash}`;
  }
  return chainId === 1
    ? `https://etherscan.io/tx/${hash}`
    : `https://rinkeby.etherscan.io/tx/${hash}`;
};
