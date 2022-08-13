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
    deliverableHash,
    platform,
    subtasks,
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
    detail: detail || "",
    deliverables: deliverables || [],
    jobType: jobType || "OneTime",
    from,
    to,
    isPayer,
    value,
    tokenSymbol,
    tokenDecimal,
    fiatValue: fiatValue || "",
    fiatSymbol: fiatSymbol || "USD",
    networkId,
    issuedTimestamp,
    txHash: txHash || "",
    deliverableHash: deliverableHash || "",
    platform: platform || "",
    subtasks: subtasks || [],
    relatedTxHashes: relatedTxHashes || [],
    genre: genre || "",
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
