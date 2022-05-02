import { CERAMIC_NETWORK } from "@/constants/common";
import type { ModelTypes } from "@/interfaces/cVoxelType";
import type { ModelTypesToAliases } from "@glazed/types";
import devModel from "../../model_dev.json";
import prodModel from "../../model_prod.json";

export const cVoxelModel: ModelTypesToAliases<ModelTypes> =
  CERAMIC_NETWORK === "mainnet" ? prodModel : devModel;
