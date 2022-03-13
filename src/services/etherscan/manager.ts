const etherscanManager = (
  module: string,
  action: string,
  address: string,
  chainId: number,
  contractaddress?: string,
  page: number = 1,
  offset: number = 0
): string => {
  const etherscanUrl =
    chainId === 1
      ? "https://api.etherscan.io"
      : "https://api-rinkeby.etherscan.io";
  let baseUrl = `${etherscanUrl}/api?apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&module=${module}&action=${action}&address=${address}&sort=desc`;
  if (contractaddress)
    baseUrl = `${baseUrl}&contractaddress=${contractaddress}`;
  if (page && offset) baseUrl = `${baseUrl}&offset=${offset}&page=${page}`;

  return baseUrl;
};

export const getTransactionsFromExlore = (
  address: string,
  action: string,
  chainId: number,
  contractaddress?: string
): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("action", action);
      const url = etherscanManager(
        "account",
        action,
        address,
        chainId,
        contractaddress
      );
      const res = await fetch(url);
      resolve(res);
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
