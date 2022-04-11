import { EXCLUDE_CONTRACT_ADDRESS_LIST } from "@/constants/contractAddress";
import { TransactionLogWithChainId } from "@/interfaces";
import { BigNumber } from "@ethersproject/bignumber";

export const getExploreLink = (hash: string, chainId: number = 1): string => {
  if (chainId === 137) {
    return `https://polygonscan.com/tx/${hash}`;
  }
  return chainId === 1
    ? `https://etherscan.io/tx/${hash}`
    : `https://rinkeby.etherscan.io/tx/${hash}`;
};

export const uniqueList = (
  lists: TransactionLogWithChainId[],
  address?: string
): TransactionLogWithChainId[] => {
  const l = removeNotTransferTx(lists);
  const sorted = l.sort((a, b) => {
    return Number(a.hash) > Number(b.hash) ? -1 : 1;
  });
  const result: TransactionLogWithChainId[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      result.push(sorted[i]);
    } else if (
      sorted[i - 1].hash.toLowerCase() !== sorted[i].hash.toLowerCase()
    ) {
      result.push(sorted[i]);
    } else if (
      sorted[i - 1].hash.toLowerCase() === sorted[i].hash.toLowerCase()
    ) {
      if (isSwap(sorted[i - 1], sorted[i], address)) {
      } else if (
        isSameTxButDifferentPayees(sorted[i - 1], sorted[i], address)
      ) {
        const merged = mergeMultiTxs(sorted[i - 1], sorted[i], "payee");
        result.pop();
        result.push(merged);
      } else {
        result.push(sorted[i]);
      }
    }
  }
  return result.sort((a, b) => {
    return Number(a.timeStamp) > Number(b.timeStamp) ? -1 : 1;
  });
};

const isSwap = (
  a: TransactionLogWithChainId,
  b: TransactionLogWithChainId,
  address?: string
) => {
  return (
    a.tokenSymbol !== b.tokenSymbol &&
    (address === a.from.toLowerCase() || address === b.from.toLowerCase()) &&
    a.from.toLowerCase() === b.to.toLowerCase() &&
    b.from.toLowerCase() === a.to.toLowerCase()
  );
};

const removeNotTransferTx = (
  lists: TransactionLogWithChainId[]
): TransactionLogWithChainId[] => {
  return lists.filter((tx) => {
    return !isExcludeContractAddress(tx) && Number(tx.value) > 0;
  });
};

const isExcludeContractAddress = (tx: TransactionLogWithChainId) => {
  return EXCLUDE_CONTRACT_ADDRESS_LIST.includes(tx.to.toLowerCase());
};

const isSameTxButDifferentPayees = (
  a: TransactionLogWithChainId,
  b: TransactionLogWithChainId,
  address?: string
) => {
  return (
    a.from.toLowerCase() === b.from.toLowerCase() &&
    address?.toLowerCase() === b.from.toLowerCase() &&
    a.value !== "0" &&
    b.value !== "0"
  );
};

const mergeMultiTxs = (
  a: TransactionLogWithChainId,
  b: TransactionLogWithChainId,
  mergeTarget: "payer" | "payee"
): TransactionLogWithChainId => {
  const val = BigNumber.from(a.value).add(BigNumber.from(b.value)).toString();
  const merged =
    mergeTarget === "payee"
      ? { ...a, value: val, addressOfDuplicatedTx: [a.to, b.to] }
      : { ...a, value: val, addressOfDuplicatedTx: [a.from, b.from] };
  return merged;
};
