import type { RequestState } from "@self.id/framework";

export type CeramicSupport =
  | "invalid" // not a DID or CAIP-10
  | "unlinked" // supported CAIP-10 but no DID
  | "supported" // did:3 or did:key
  | "unsupported"; // other DID method, not supported by Ceramic node

export type CeramicProps = {
  did: string;
  state: RequestState;
  support: CeramicSupport;
};
