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
