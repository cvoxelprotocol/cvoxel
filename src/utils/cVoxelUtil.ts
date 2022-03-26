import { CVoxel, CVoxelMetaDraft } from "@/interfaces";

export const extractCVoxel = (tx: CVoxelMetaDraft): CVoxel => {
  const {
    summary,
    detail,
    deliverable,
    jobType,
    from,
    to,
    isPayer,
    value,
    tokenSymbol,
    tokenDecimal,
    networkId,
    issuedTimestamp,
    txHash,
    relatedTxHashes,
    tags,
    toSig,
    fromSig,
  } = tx;
  return {
    summary,
    detail,
    deliverable,
    jobType,
    from,
    to,
    isPayer,
    value,
    tokenSymbol,
    tokenDecimal,
    networkId,
    issuedTimestamp,
    txHash,
    relatedTxHashes,
    tags,
    toSig,
    fromSig,
  };
};
