import { CVoxel, CVoxelMetaDraft } from "@/interfaces";
import {
  Client,
  DeliverableItem,
  Signatures,
  Transaction,
  Work,
  WorkCredential,
  WorkSubject,
  WorkCredentialWithId,
  TypedData,
  DELIVERABLES_EIP712_TYPE,
  WORK_EIP712_TYPE,
  TX_EIP712_TYPE,
  CLIENT_EIP712_TYPE,
  getPkhDIDFromAddress,
} from "vess-sdk";
import { removeUndefined } from "./objectUtil";

export const convertV1DataToCRDL = (
  v1: CVoxelMetaDraft,
  address: string
): WorkCredentialWithId | null => {
  if (
    address.toLowerCase() !== v1.to.toLowerCase() &&
    address.toLowerCase() !== v1.from.toLowerCase()
  ) {
    return null;
  }
  const isPayee = address.toLowerCase() === v1.to.toLowerCase();
  const holderSig = isPayee ? v1.toSig || "" : v1.fromSig || "";
  const partnerSig = isPayee ? v1.fromSig || "" : v1.toSig || "";
  const partnerSigner = isPayee ? v1.fromSigner || "" : v1.toSigner || "";

  const client: Client = {
    format: "DID",
    value: isPayee
      ? getPkhDIDFromAddress(v1.from)
      : getPkhDIDFromAddress(v1.to),
  };

  const tx: Transaction = removeUndefined<Transaction>({
    txHash: v1.txHash || "",
    to: v1.to,
    from: v1.from,
    isPayer: v1.isPayer,
    value: v1.value,
    tokenSymbol: v1.tokenSymbol,
    tokenDecimal: v1.tokenDecimal,
    fiatValue: v1.fiatValue || "0",
    fiatSymbol: v1.fiatSymbol || "USD",
    networkId: v1.networkId,
    issuedTimestamp: v1.issuedTimestamp,
    relatedAddresses: v1.relatedAddresses,
    relatedTxHashes: v1.relatedTxHashes || [],
  });

  const work: Work = removeUndefined<Work>({
    id: getPkhDIDFromAddress(address),
    value: v1.fiatValue || v1.value,
    tax: "0",
    summary: v1.summary,
    detail: v1.detail,
    jobType: v1.jobType,
    genre: v1.genre,
    tags: v1.tags,
    startTimestamp: v1.startTimestamp,
    endTimestamp: v1.endTimestamp,
    platform: v1.platform,
    deliverableHash: v1.deliverableHash,
    organization: "",
    issuedAt: v1.createdAt || "",
  });

  const subject: WorkSubject = removeUndefined<WorkSubject>({
    work: work,
    client: client,
    tx: tx,
    deliverables: v1.deliverables,
  });

  const sig: Signatures = removeUndefined<Signatures>({
    holderSig: holderSig,
    partnerSigner: partnerSigner,
    partnerSig: partnerSig,
    agentSig: "",
    agentSigner: "",
  });
  const crdl: WorkCredentialWithId = removeUndefined<WorkCredentialWithId>({
    id: work.id,
    subject: subject,
    signature: sig,
    createdAt: v1.createdAt,
    updatedAt: v1.updatedAt,
    potentialSigners: v1.relatedAddresses,
    holderDid: work.id,
  });
  return crdl;
};

export const convertV1DataToCRDLOnCeramic = (
  v1: CVoxel,
  address: string
): WorkCredential | null => {
  if (
    address.toLowerCase() !== v1.to.toLowerCase() &&
    address.toLowerCase() !== v1.from.toLowerCase()
  ) {
    return null;
  }
  const isPayee = address.toLowerCase() === v1.to.toLowerCase();
  const holderSig = isPayee ? v1.toSig || "" : v1.fromSig || "";
  const partnerSig = isPayee ? v1.fromSig || "" : v1.toSig || "";
  const partnerSigner = isPayee
    ? v1.fromSigner?.toLowerCase() || ""
    : v1.toSigner?.toLowerCase() || "";

  if (!holderSig) return null;

  const client: Client = {
    format: "DID",
    value: isPayee
      ? getPkhDIDFromAddress(v1.from)
      : getPkhDIDFromAddress(v1.to),
  };

  const tx: Transaction = removeUndefined<Transaction>({
    txHash: v1.txHash || "",
    to: v1.to,
    from: v1.from,
    isPayer: v1.isPayer,
    value: v1.value,
    tokenSymbol: v1.tokenSymbol,
    tokenDecimal: v1.tokenDecimal,
    fiatValue: v1.fiatValue || "",
    fiatSymbol: v1.fiatSymbol || "",
    networkId: v1.networkId,
    issuedTimestamp: v1.issuedTimestamp,
    relatedAddresses: v1.relatedAddresses,
    relatedTxHashes: v1.relatedTxHashes || [],
  });

  const work: Work = removeUndefined<Work>({
    id: getPkhDIDFromAddress(address),
    value: v1.fiatValue || v1.value,
    tax: "0",
    summary: v1.summary,
    detail: v1.detail,
    jobType: v1.jobType,
    genre: v1.genre,
    tags: v1.tags,
    startTimestamp: v1.startTimestamp || "",
    endTimestamp: v1.endTimestamp || "",
    platform: v1.platform,
    deliverableHash: v1.deliverableHash,
    organization: "",
    issuedAt: v1.createdAt || "",
  });

  const subject: WorkSubject = convertValidworkSubjectTypedData(
    removeUndefined<WorkSubject>({
      work: work,
      client: client,
      tx: tx,
      deliverables: v1.deliverables || [],
    })
  );

  const sig: Signatures = removeUndefined<Signatures>({
    holderSig: holderSig,
    partnerSigner: partnerSigner || "",
    partnerSig: partnerSig || "",
    agentSig: "",
    agentSigner: "",
  });

  const crdl: WorkCredentialWithId = removeUndefined<WorkCredentialWithId>({
    id: work.id,
    subject: subject,
    signature: sig,
    createdAt: v1.createdAt || "",
    updatedAt: v1.updatedAt || "",
  });
  return crdl;
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

export const convertValidworkSubjectTypedData = (
  subject: WorkSubject
): WorkSubject => {
  const deliverables: DeliverableItem[] = subject.deliverables
    ? subject.deliverables?.map((v) => {
        return castUndifined2DefaultValue(v, DELIVERABLES_EIP712_TYPE);
      })
    : [];

  return {
    work: castUndifined2DefaultValue(subject.work, WORK_EIP712_TYPE),
    tx: castUndifined2DefaultValue(subject.tx, TX_EIP712_TYPE),
    client: castUndifined2DefaultValue(subject.client, CLIENT_EIP712_TYPE),
    deliverables: deliverables,
  };
};

export const castUndifined2DefaultValue = <T extends Record<string, any>>(
  obj: T | undefined,
  typeFormat: TypedData[]
): T => {
  if (obj === undefined) return {} as T;
  const entries = Object.entries(obj);
  let newEntries: [string, any][] = [];
  for (const t of typeFormat) {
    const e = entries.find(([k, v]) => k === t.name);
    if (e) {
      newEntries.push(e);
    } else {
      let val;
      if (t.type === "string") {
        val = "";
      } else if (t.type === "string[]") {
        val = [];
      } else if (t.type === "uint256") {
        val = 0;
      } else if (t.type === "bool") {
        val = false;
      } else {
        val = "";
      }
      newEntries.push([t.name, val]);
    }
  }
  return Object.fromEntries(newEntries) as T;
};
