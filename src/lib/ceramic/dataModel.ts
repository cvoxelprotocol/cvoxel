import { CERAMIC_NETWORK } from "@/constants/common";
import type { ModelTypes } from "@/interfaces";
import type { ModelTypesToAliases } from "@glazed/types";
import { aliases as devModelAliases } from "../../__generated__/aliases_dev";
import { aliases as prodModelAliases } from "../../__generated__/aliases";

export const dataModel: ModelTypesToAliases<ModelTypes> =
  CERAMIC_NETWORK === "mainnet" ? prodModelAliases : devModelAliases;
