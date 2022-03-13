import { EtherscanResult } from "@/interfaces/explore";
import { getTransactionsFromExlore } from "@/services/etherscan/manager";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default function getTransactions(
  req: NextApiRequest,
  res: NextApiResponse<EtherscanResult>
): void {
  const address = req.query.address as string;
  const action = req.query.action as string;
  const chainId = req.query.chainId as string;
  getTransactionsFromExlore(address, action, Number(chainId))
    .then((res) => res.json() as EtherscanResult)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(405).end();
    });
}
