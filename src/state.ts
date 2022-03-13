import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import type { EditionState, CVoxel } from "./interfaces/cVoxelType";

export const draftCVoxelAtom = atomWithReset<CVoxel>({
  to: "to",
  from: "from",
  summary: "",
  detail: "",
  deliverable: "",
  value: "1.0",
  tokenSymbol: "eth",
  tokenDecimal: 18,
  networkId: 4,
  issuedTimestamp: "12345678",
  txHash: "hgeohgoehgoehgoehgeogheohgoegh",
  jobType: "OneTime",
  tags: [],
  toSig: "",
  fromSig: "",
});

export const editionStateAtom = atom<EditionState>({ status: "pending" });
