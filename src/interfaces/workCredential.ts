import { Transaction, Work, WorkSubject } from "vess-sdk";

export type WorkCredentialForm = Work &
  Transaction & {
    deliverableLink?: string;
    deliverableCID?: string;
  };

export type WorkSubjectFromDework = WorkSubject & {
  streamId?: string;
  taskId?: string;
};

export type WorkSubjectFromERC721 = WorkSubject & {
  streamId?: string
  chainId: number;
  contractAddress: string;
  tokenId: number;
  tokenHash: string;
};
