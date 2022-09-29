import { firestore } from "../app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { CVoxelMetaDraft } from "@/interfaces/cVoxelType";
import { DeliverableItemsFromStr } from "@/utils/workCredentialUtil";
import { WorkCredentialWithId } from "@/interfaces";
import { convertV1DataToCRDL } from "@/utils/workCredentialUtil";
import { getPkhDIDFromAddress } from "@/utils/ceramicUtils";

export const getSigRequestList = async (
  address?: string
): Promise<WorkCredentialWithId[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await Promise.all([
        getV2SigRequestList(address),
        getV1SigRequestList(address),
      ]);
      resolve(res[0].concat(res[1]));
    } catch (error) {
      reject(error);
    }
  });

const getV2SigRequestList = (
  address?: string
): Promise<WorkCredentialWithId[]> =>
  new Promise((resolve, reject) => {
    if (!address) return [];
    const q = query(
      collection(firestore, "credentials").withConverter(crdlConverter),
      where("holderDid", "!=", getPkhDIDFromAddress(address)),
      where("potentialSigners", "array-contains", address.toLowerCase())
    );
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs
              .map((doc) => {
                return doc.data() as WorkCredentialWithId;
              })
              .filter(
                (d) =>
                  !d.signature?.partnerSig || d.signature?.partnerSig === ""
              );
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

const getV1SigRequestList = (
  address?: string
): Promise<WorkCredentialWithId[]> =>
  new Promise((resolve, reject) => {
    if (!address) return [];
    const q = query(
      collection(firestore, "cvoxels").withConverter(converter),
      where("relatedAddresses", "array-contains", address.toLowerCase())
    );
    getDocs(q)
      .then((result) => {
        let crdls: WorkCredentialWithId[] = [];
        result.docs.forEach((doc) => {
          const d = doc.data() as CVoxelMetaDraft;
          if (d.fromSigner !== address && d.toSigner !== address) {
            const crdl = convertV1DataToCRDL(d, address);
            if (crdl) crdls.push({ ...crdl, backupId: doc.id });
          }
        });
        resolve(crdls);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getOffchainDataList = async (
  address?: string
): Promise<WorkCredentialWithId[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await Promise.all([
        getBackupList(address),
        getV1DataList(address),
      ]);
      resolve(res[0].concat(res[1]));
    } catch (error) {
      reject(error);
    }
  });

export const getBackupList = (
  address?: string
): Promise<WorkCredentialWithId[]> =>
  new Promise((resolve, reject) => {
    const q = address
      ? query(
          collection(firestore, "credentials").withConverter(crdlConverter),
          where("holderDid", "==", getPkhDIDFromAddress(address))
        )
      : query(
          collection(firestore, "credentials").withConverter(crdlConverter)
        );
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              return doc.data() as WorkCredentialWithId;
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

const getV1DataList = (address?: string): Promise<WorkCredentialWithId[]> =>
  new Promise((resolve, reject) => {
    if (!address) return [];
    const q = query(
      collection(firestore, "cvoxels").withConverter(converter),
      where("relatedAddresses", "array-contains", address.toLowerCase())
    );
    getDocs(q)
      .then((result) => {
        let crdls: WorkCredentialWithId[] = [];
        result.docs.forEach((doc) => {
          const d = doc.data() as CVoxelMetaDraft;
          const crdl = convertV1DataToCRDL(d, address);
          if (crdl) crdls.push({ ...crdl, backupId: doc.id });
        });
        resolve(crdls);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getOffchainData = (id?: string): Promise<WorkCredentialWithId> =>
  new Promise((resolve, reject) => {
    if (!id) {
      reject("No Id");
      return;
    }
    getDoc(doc(firestore, "credentials", id).withConverter(crdlConverter))
      .then((result) => {
        const d = result.data() as WorkCredentialWithId;
        resolve(d);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateSignature = (
  id: string | undefined,
  isPayer: boolean,
  signer: string,
  sig: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!id) {
      reject("No Id");
      return;
    }
    const sigObj = isPayer
      ? {
          fromSig: sig,
          fromSigner: signer,
        }
      : {
          toSig: sig,
          toSigner: signer,
        };
    updateDoc(doc(firestore, "cvoxels", id).withConverter(converter), sigObj)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

const crdlConverter = {
  toFirestore(tx: WorkCredentialWithId): DocumentData {
    return { ...tx };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): WorkCredentialWithId {
    let data = snapshot.data();
    if (data.deliverable) {
      data.deliverables = DeliverableItemsFromStr(data.deliverable);
    }
    if (!isValidCRDL(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const converter = {
  toFirestore(tx: CVoxelMetaDraft): DocumentData {
    return { ...tx };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): CVoxelMetaDraft {
    let data = snapshot.data();
    if (data.deliverable) {
      data.deliverables = DeliverableItemsFromStr(data.deliverable);
    }
    if (!isValid(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const isValidCRDL = (data: any): data is WorkCredentialWithId => {
  return !!data.subject;
};

const isValid = (data: any): data is CVoxelMetaDraft => {
  return !!data.txHash;
};
