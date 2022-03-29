import { functions } from "../app";
import { httpsCallable } from "firebase/functions";

export const sendMail = (
  address: string,
  templateId: string,
  link: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    const sendMailViaSg = httpsCallable<
      { [x: string]: string },
      { [x: string]: string }
    >(functions, "sendMailViaSg");
    sendMailViaSg({ address: address, templateId: templateId, link: link })
      .then((result) => {
        resolve(result.data.status);
      })
      .catch((error) => {
        reject(error);
      });
  });
