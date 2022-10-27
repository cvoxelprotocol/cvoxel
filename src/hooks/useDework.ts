import { DIDContext } from "@/context/DIDContext";
import { getDeworkAuth } from "@/lib/firebase/store/dework";
import {
  useStateDeworkConnectModal,
  useStateDeworkTaskListModal,
} from "@/recoilstate";
import { useStateDeworkAuth } from "@/recoilstate/dework";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { getPkhDIDFromAddress } from "@/utils/ceramicUtils";
import { useContext } from "react";
import { useGAEvent } from "./useGAEvent";
import { useModal } from "./useModal";

export const useDework = () => {
  const [isDeworkConnectOpen, setDeworkConnectOpen] =
    useStateDeworkConnectModal();
  const [isDeworkTaskListOpen, setDeworkTaskListOpen] =
    useStateDeworkTaskListModal();
  const { account } = useContext(DIDContext);
  const deworkService = getDeworkService();
  const { showLoading, closeLoading } = useModal();
  const [deworkAuth, setDeworkAuth] = useStateDeworkAuth();
  const { connectDeworkEvent, fetchDeworkTaskEvent } = useGAEvent();

  const loginDework = async (address: string) => {
    const auth = await getDeworkAuth(address);
    setDeworkAuth(auth);
  };

  const execDeworkAuth = async (name: string) => {
    if (!account) return null;
    connectDeworkEvent(getPkhDIDFromAddress(account));
    const nonce = Date.now().toString();
    const auth = await deworkService.exexAuth(name, nonce, account);
    setDeworkAuth(auth);
    return auth;
  };

  const getDeworkTasksFromId = async (id: string) => {
    if (!account) return null;
    fetchDeworkTaskEvent(getPkhDIDFromAddress(account));
    try {
      showLoading();
      const subjects = await deworkService.getDeworkTasks(account, id);
      return subjects;
    } catch (error) {
      closeLoading();
      return null;
    }
  };

  return {
    setDeworkConnectOpen,
    setDeworkTaskListOpen,
    isDeworkTaskListOpen,
    isDeworkConnectOpen,
    loginDework,
    deworkAuth,
    execDeworkAuth,
    getDeworkTasksFromId,
  };
};
