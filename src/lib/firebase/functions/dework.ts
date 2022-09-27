import { functions } from "../app";
import { httpsCallable } from "firebase/functions";
import { DeworkUser } from "@/interfaces/dework";
import { WorkSubjectFromDework } from "@/interfaces";

type DeworkAuthResults = {
  status: string;
  dework: DeworkUser;
};
type DeworkTasksResults = {
  status: string;
  subjects: WorkSubjectFromDework[];
};

type DeworkTaskUpdateResults = {
  status: string;
  subject: WorkSubjectFromDework;
};

type DeworkCRDLsResults = {
  status: string;
  streamIds: string[];
};

export const deworkAuth = (
  name: string,
  sig: string,
  nonce: string,
  address: string
): Promise<DeworkUser | null> =>
  new Promise((resolve, reject) => {
    const deworkAuthFunc = httpsCallable<
      { [x: string]: string },
      DeworkAuthResults
    >(functions, "deworkAuth");
    deworkAuthFunc({
      name: name,
      sig: sig,
      nonce: nonce,
      address: address,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.dework);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getDeworkUserTasks = (
  address: string,
  id?: string
): Promise<WorkSubjectFromDework[] | null> =>
  new Promise((resolve, reject) => {
    const getDeworkUserTasksFunc = httpsCallable<
      { [x: string]: string | undefined },
      DeworkTasksResults
    >(functions, "getDeworkUserTasks");
    getDeworkUserTasksFunc({
      address: address,
      id: id,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.subjects);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateGenreOfDeworkTask = (
  address: string,
  id: string,
  genre: string
): Promise<WorkSubjectFromDework | null> =>
  new Promise((resolve, reject) => {
    const getDeworkUserTasksFunc = httpsCallable<
      { [x: string]: string | undefined },
      DeworkTaskUpdateResults
    >(functions, "updateGenreOfDeworkTask");
    getDeworkUserTasksFunc({
      address: address,
      id: id,
      genre: genre,
    })
      .then((result) => {
        if (result.data.status === "ok") {
          resolve(result.data.subject);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const issueCRDLFromDework = (
  address: string,
  ids: string[],
  storeAll: boolean
): Promise<string[] | null> =>
  new Promise((resolve, reject) => {
    const issueCRDLFromDeworkFunc = httpsCallable<
      { [x: string]: string | string[] | boolean | undefined },
      DeworkCRDLsResults
    >(functions, "issueCRDLFromDework");
    issueCRDLFromDeworkFunc({
      address: address,
      ids: ids,
      storeAll: storeAll,
    })
      .then((result) => {
        console.log({ result });
        if (result.data.status === "ok") {
          resolve(result.data.streamIds);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
