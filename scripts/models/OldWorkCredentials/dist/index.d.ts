import type { ModelTypeAliases, EncodedManagedModel } from "@glazed/types";
export type { WorkCredential, WorkCredentials } from "../types/WorkCredentials";
export declare type ModelTypes = ModelTypeAliases<
  {
    OldWorkCredential: WorkCredential;
    OldWorkCredentials: WorkCredentials;
  },
  {
    OldWorkCredential: "OldWorkCredential";
    OldWorkCredentials: "OldWorkCredentials";
  }
>;
export declare const model: EncodedManagedModel;
