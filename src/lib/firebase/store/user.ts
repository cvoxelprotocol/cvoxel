import { firestore } from "../app";
import {
  collection,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { User } from "@/interfaces";

export const getUser = (address: string): Promise<User> =>
  new Promise(async (resolve, reject) => {
    getDoc(doc(firestore, "users", address).withConverter(converter))
      .then(async (result) => {
        if (result.exists()) {
          const user = result.data() as User;
          resolve(user);
        } else {
          const newUser = await createUserObj(address);
          setDoc(
            doc(firestore, "users", address).withConverter(converter),
            newUser
          ).then(() => {
            resolve(newUser);
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getManyUsers = (ids: string[]): Promise<User[]> =>
  new Promise(async (resolve, reject) => {
    const q = query(
      collection(firestore, "users").withConverter(converter),
      where("address", "in", ids)
    );
    getDocs(q)
      .then(async (result) => {
        if (!result.empty) {
          const users = result.docs.map((doc) => doc.data() as User);
          resolve(users);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateUserEMail = (
  address: string,
  email: string
): Promise<User> =>
  new Promise(async (resolve, reject) => {
    await updateDoc(doc(firestore, "users", address).withConverter(converter), {
      email,
    }).catch((error) => {
      reject(error);
    });
    getUser(address)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });

const createUserObj = async (address: string): Promise<User> => {
  const snap = await getDocs(collection(firestore, "users"));
  const allUserSize = snap.empty ? 0 : snap.size;
  const rand = Math.floor(Math.random() * allUserSize + 1);
  return {
    address: address,
    name: address,
    rand: rand,
    email: null,
    genre: [],
    bio: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const converter = {
  toFirestore(user: User): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    let data = snapshot.data();
    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();
    if (!isValid(data)) {
      console.error(data);
      throw new Error("invalid data");
    }
    return { ...data };
  },
};

const isValid = (data: any): data is User => {
  return !!data.address;
};
