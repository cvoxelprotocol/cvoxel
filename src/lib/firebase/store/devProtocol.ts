import { WorkSubjectFromERC721 } from "@/interfaces";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore/lite";
import { firestore } from "../app";

const isValid = (data: any): data is WorkSubjectFromERC721 => {
  return !!data;
};

const converter = {
  toFirestore(item: WorkSubjectFromERC721): DocumentData {
    return { ...item };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): WorkSubjectFromERC721 {
    let data = snapshot.data();
    if (!isValid(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

export const getDevProtocolTokenListFromFB = (
  address?: string
): Promise<WorkSubjectFromERC721[]> =>
  new Promise((resolve, reject) => {
    if (!address) return [];
    const q = query(
      collection(firestore, "devProtocolTokens", address.toLowerCase(), "tokens"),
      where("streamId", "!=", null)
    ).withConverter(converter);
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              return doc.data() as WorkSubjectFromERC721;
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });
