import { DIDContext } from "@/context/DIDContext";
import {
  deworkAuth,
  getDeworkUserTasks,
} from "@/lib/firebase/functions/dework";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { useContext } from "react";

export const useDework = () => {
  const { account } = useContext(DIDContext);
  const deworkService = getDeworkService();

  const execDeworkAuth = async (name: string) => {
    if (!account) return;
    const nonce = Date.now().toString();
    const sig = await deworkService.getDeworkAuthMessageSig(nonce);
    const auth = await deworkAuth(name, sig, nonce, account);
    return auth;
  };

  const getDeworkTasksFromId = async (id: string) => {
    if (!account) return;
    const tasks = await getDeworkUserTasks(account, id);
    return tasks;
  };

  return { execDeworkAuth, getDeworkTasksFromId };
};
