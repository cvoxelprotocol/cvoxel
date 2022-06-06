import { CVoxel, CVoxelMetaDraft, DeliverableItem } from "@/interfaces";

export const extractCVoxel = (tx: CVoxelMetaDraft): CVoxel => {
  const {
    summary,
    detail,
    deliverables,
    jobType,
    from,
    to,
    isPayer,
    value,
    tokenSymbol,
    tokenDecimal,
    fiatValue,
    fiatSymbol,
    networkId,
    issuedTimestamp,
    txHash,
    relatedTxHashes,
    genre,
    tags,
    toSig,
    fromSig,
    toSigner,
    fromSigner,
    relatedAddresses,
    startTimestamp,
    endTimestamp,
    createdAt,
    updatedAt,
  } = tx;
  return {
    summary,
    detail,
    deliverables,
    jobType,
    from,
    to,
    isPayer,
    value,
    tokenSymbol,
    tokenDecimal,
    fiatValue,
    fiatSymbol,
    networkId,
    issuedTimestamp,
    txHash,
    relatedTxHashes,
    genre,
    tags: tags || [],
    toSig: toSig || "",
    fromSig: fromSig || "",
    toSigner: toSigner || "",
    fromSigner: fromSigner || "",
    relatedAddresses,
    startTimestamp: startTimestamp || "",
    endTimestamp: endTimestamp || "",
    createdAt: createdAt || "",
    updatedAt: updatedAt || "",
  };
};

export const DeliverableItemsFromStr = (
  deliverable?: string
): DeliverableItem[] => {
  if (!deliverable) return [];
  const deliverables: DeliverableItem[] = deliverable.split(",").map((d) => {
    return d.startsWith("https://")
      ? {
          format: "url",
          value: d,
        }
      : {
          format: "cid",
          value: d,
        };
  });
  return deliverables;
};
