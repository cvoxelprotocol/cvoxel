import { firestore } from "../app";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { MembershipSubjectWithId } from "vess-sdk";

export const getMembershipSUbjectsFromDB = (
  orgId?: string
): Promise<MembershipSubjectWithId[]> =>
  new Promise((resolve, reject) => {
    if (!orgId) return [];
    const q = query(
      collection(firestore, "membershipsubjects"),
      where("organizationId", "==", orgId)
    ).withConverter(converter);
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              const d = doc.data() as MembershipSubjectWithId;
              return { ...d, ceramicId: doc.id };
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getHeldMembershipSubjectsFromDB = (
  did?: string
): Promise<MembershipSubjectWithId[]> =>
  new Promise((resolve, reject) => {
    if (!did) return [];
    const q = query(
      collection(firestore, "membershipsubjects"),
      where("credentialSubject.id", "==", did)
    ).withConverter(converter);
    getDocs(q)
      .then((result) => {
        const docs = result.empty
          ? []
          : result.docs.map((doc) => {
              const d = doc.data() as MembershipSubjectWithId;
              return d;
            });
        resolve(docs);
      })
      .catch((error) => {
        reject(error);
      });
  });

const converter = {
  toFirestore(item: MembershipSubjectWithId): DocumentData {
    return { ...item };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): MembershipSubjectWithId {
    let data = snapshot.data();
    if (!isValid(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const isValid = (data: any): data is MembershipSubjectWithId => {
  return !!data;
};
