import { functions } from "../app";
import { httpsCallable } from "firebase/functions";

export const sendWorkStartNotify = async (
  address: string,
  escrowId: number
): Promise<string> => {
  const mailData = {
    address: address,
    templateId: "d-abacdcfc681a4fe5856693aee2ee50d7",
    link: `http://localhost:3000/work/detail/${escrowId}`,
  };

  return await sendMail(mailData.address, mailData.templateId, mailData.link);
};

export const sendFinishEscrowNotify = async (
  address: string,
  escrowId: number
): Promise<string> => {
  const mailData = {
    address: address,
    templateId: "d-a626b6a484654bc288099a4f2c95d7e2",
    link: `http://localhost:3000/work/detail/${escrowId}`,
  };

  return await sendMail(mailData.address, mailData.templateId, mailData.link);
};

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
