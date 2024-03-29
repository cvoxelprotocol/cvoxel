import { useDIDAccount } from "@/hooks/useDIDAccount";
import { getDeworkAuth } from "@/lib/firebase/store/dework";
import {
  useStateDeworkConnectModal,
  useStateDeworkTaskListModal,
} from "@/recoilstate";
import { useStateDeworkAuth } from "@/recoilstate/dework";
import { getDeworkService } from "@/services/Dework/DeworkService";
import { useModal } from "./useModal";

export const useDework = () => {
  const [isDeworkConnectOpen, setDeworkConnectOpen] =
    useStateDeworkConnectModal();
  const [isDeworkTaskListOpen, setDeworkTaskListOpen] =
    useStateDeworkTaskListModal();
  const { account } = useDIDAccount();
  const deworkService = getDeworkService();
  const { showLoading, closeLoading } = useModal();
  const [deworkAuth, setDeworkAuth] = useStateDeworkAuth();

  const loginDework = async (address: string) => {
    const auth = await getDeworkAuth(address?.toLowerCase());
    setDeworkAuth(auth);
  };

  const execDeworkAuth = async (name: string) => {
    if (!account) return null;
    const nonce = Date.now().toString();
    const auth = await deworkService.exexAuth(
      name,
      nonce,
      account.toLowerCase()
    );
    setDeworkAuth(auth);
    return auth;
  };

  const getDeworkTasksFromId = async (id: string) => {
    if (!account) return null;
    try {
      showLoading();
      const subjects = await deworkService.getDeworkTasks(
        account.toLowerCase(),
        id
      );
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
