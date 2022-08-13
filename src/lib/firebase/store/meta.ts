import { firestore } from "../app";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { CVoxelMetaDraft } from "@/interfaces/cVoxelType";
import { DeliverableItemsFromStr } from "@/utils/cVoxelUtil";

export const getCVoxelList = (address?: string): Promise<CVoxelMetaDraft[]> =>
  new Promise((resolve, reject) => {
    const q = address
      ? query(
          collection(firestore, "cvoxels").withConverter(converter),
          where("relatedAddresses", "array-contains", address.toLowerCase())
        )
      : query(collection(firestore, "cvoxels").withConverter(converter));
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              const d = doc.data();
              return { ...doc.data() } as CVoxelMetaDraft;
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

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

const isValid = (data: any): data is CVoxelMetaDraft => {
  return !!data.txHash;
};
