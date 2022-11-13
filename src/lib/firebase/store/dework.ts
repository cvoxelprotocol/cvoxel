import { firestore } from "../app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { WorkSubjectFromDework } from "@/interfaces";
import { DeworkUser } from "@/interfaces/dework";

export const getDeworkAuth = (address?: string): Promise<DeworkUser> =>
  new Promise((resolve, reject) => {
    if (!address) return [];
    getDoc(
      doc(firestore, "connections", address?.toLowerCase()).withConverter(
        userConverter
      )
    )
      .then((result) => {
        const doc = result.data() as DeworkUser;
        resolve(doc);
      })
      .catch((error) => {
        reject(error);
      });
  });
export const getDeworkTaskListFromFB = (
  address?: string
): Promise<WorkSubjectFromDework[]> =>
  new Promise((resolve, reject) => {
    if (!address) return [];
    const q = query(
      collection(firestore, "deworkTasks", address?.toLowerCase(), "tasks"),
      where("streamId", "==", null)
    ).withConverter(converter);
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              const d = doc.data() as WorkSubjectFromDework;
              return { ...d, taskId: doc.id };
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

const converter = {
  toFirestore(item: WorkSubjectFromDework): DocumentData {
    return { ...item };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): WorkSubjectFromDework {
    let data = snapshot.data();
    if (!isValid(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const isValid = (data: any): data is WorkSubjectFromDework => {
  return !!data;
};

const userConverter = {
  toFirestore(item: DeworkUser): DocumentData {
    const usr: DeworkUser = { ...item, address: item.address.toLowerCase() };
    return { ...item };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): DeworkUser {
    let data = snapshot.data();
    data.address = data.address.toLowerCase();
    if (!isValiduser(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const isValiduser = (data: any): data is DeworkUser => {
  return !!data;
};
