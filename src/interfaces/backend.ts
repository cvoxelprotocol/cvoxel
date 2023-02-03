import { EventWithId } from "vess-sdk";

export type IssueEventAttendanceWithKMSType = {
  content: EventWithId;
  issuerAddress: string;
  holderDid: string;
};
