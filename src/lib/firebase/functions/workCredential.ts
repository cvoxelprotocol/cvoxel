import {
  EventAttendanceWithId,
  EventWithId,
  MembershipSubjectWithId,
  MembershipWithId,
  OrganizationWIthId,
  WorkCredentialWithId,
} from "@/interfaces";
import { removeCeramicPrefix } from "@/utils/workCredentialUtil";
import { httpsCallable } from "firebase/functions";
import { functions } from "../app";

export type issueEventAttendancesParam = {
  event: EventWithId;
  dids: string[];
};

export const uploadCRDL = (
  crdl: WorkCredentialWithId
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadDraftFunc = httpsCallable<
      { [x: string]: WorkCredentialWithId },
      { [x: string]: string }
    >(functions, "uploadCRDL");
    uploadDraftFunc({
      crdl: {
        ...crdl,
        backupId: removeCeramicPrefix(crdl.backupId),
        holderDid: crdl.subject.work?.id,
        potentialSigners: crdl.subject.tx?.relatedAddresses,
      },
    })
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });

export const uploadOrg = (
  param: OrganizationWIthId
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadFunc = httpsCallable<
      { [x: string]: OrganizationWIthId },
      { [x: string]: string }
    >(functions, "uploadOrg");
    uploadFunc({
      org: param,
    })
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });

export const uploadMembership = (
  param: MembershipWithId
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadFunc = httpsCallable<
      { [x: string]: MembershipWithId },
      { [x: string]: string }
    >(functions, "uploadMembership");
    uploadFunc({
      membership: param,
    })
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });

export const uploadMembershipSubject = (
  param: MembershipSubjectWithId
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadFunc = httpsCallable<
      { [x: string]: MembershipSubjectWithId },
      { [x: string]: string }
    >(functions, "uploadMembershipSubject");
    uploadFunc({
      subject: param,
    })
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });

export const uploadEvent = (
  param: EventWithId
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadFunc = httpsCallable<
      { [x: string]: EventWithId },
      { [x: string]: string }
    >(functions, "uploadEvent");
    uploadFunc({
      event: param,
    })
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });

export const uploadEventAttendance = (
  param: EventAttendanceWithId
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadFunc = httpsCallable<
      { [x: string]: EventAttendanceWithId },
      { [x: string]: string }
    >(functions, "uploadEventAttendance");
    uploadFunc({
      event: param,
    })
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });

export const issueEventAttendancesFromProxy = (
  param: issueEventAttendancesParam
): Promise<{ [x: string]: string }> =>
  new Promise((resolve, reject) => {
    const uploadFunc = httpsCallable<
      issueEventAttendancesParam,
      { [x: string]: string }
    >(functions, "issueEventAttendances");
    uploadFunc(param)
      .then((result) => {
        const { status } = result.data;
        resolve({ status: status });
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });
