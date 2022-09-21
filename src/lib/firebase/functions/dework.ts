import { functions } from "../app";
import { httpsCallable } from "firebase/functions";
import { DeworkUser, Task } from "@/interfaces/dework";

type DeworkAuthResults = {
  status: string;
  dework: DeworkUser;
};
type DeworkTasksResults = {
  status: string;
  tasks: Task[];
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
): Promise<Task[] | null> =>
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
          resolve(result.data.tasks);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
