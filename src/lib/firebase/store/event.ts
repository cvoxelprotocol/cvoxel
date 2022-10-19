import { firestore } from "../app";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { EventAttendanceWithId } from "@/interfaces";

export const getHeldEventAttendanceFromDB = (
  did?: string
): Promise<EventAttendanceWithId[]> =>
  new Promise((resolve, reject) => {
    if (!did) return [];
    const q = query(
      collection(firestore, "eventattendances"),
      where("credentialSubject.id", "==", did)
    ).withConverter(converter);
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              const d = doc.data() as EventAttendanceWithId;
              return d;
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

const converter = {
  toFirestore(item: EventAttendanceWithId): DocumentData {
    return { ...item };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): EventAttendanceWithId {
    let data = snapshot.data();
    if (!isValid(data)) {
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const isValid = (data: any): data is EventAttendanceWithId => {
  return !!data;
};
