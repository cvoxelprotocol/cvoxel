import { WorkCredentialWithId } from "@/interfaces";
import { removeCeramicPrefix } from "@/utils/workCredentialUtil";
import { httpsCallable } from "firebase/functions";
import { functions } from "../app";

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
