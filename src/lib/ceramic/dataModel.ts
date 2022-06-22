import { CERAMIC_NETWORK } from "@/constants/common";
import type { ModelTypes } from "@/interfaces/cVoxelType";
import type { ModelTypesToAliases } from "@glazed/types";
// import prodModel from "../../model_prod.json";
import { aliases as devModelAliases } from "../../__generated__/aliases";

export const cVoxelModel: ModelTypesToAliases<ModelTypes> =
  CERAMIC_NETWORK === "mainnet" ? devModelAliases : devModelAliases;
