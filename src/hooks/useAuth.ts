import { auth } from "@/lib/firebase/app";
import { getUser } from "@/lib/firebase/store/user";
import { useStateUserAuth } from "@/recoilstate";
import { getAuthService } from "@/services/Auth/AuthService";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import type { User } from "@/interfaces";
import { useWalletAccount } from "./useWalletAccount";

export const useAuth = () => {
  const [userAuth, setUserAuth] = useStateUserAuth();
  const authService = getAuthService();
  const { showLoading, closeLoading } = useModal();
  const { lancError, lancInfo } = useToast();
  const { disconnectWallet } = useWalletAccount();

  const login = async (address: string, did: string): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        showLoading();
        const authToken = await authService.getLoginToken(address, did);
        signInWithCustomToken(auth, authToken).then(async (credential) => {
          const user = await getUser(credential.user.uid);
          setUserAuth(user);
          closeLoading();
          lancInfo("Login Success!");
          resolve(user);
        });
      } catch (error) {
        lancError();
        reject(error);
      }
    });

  const logout = async () => {
    showLoading();
    signOut(auth)
      .then(() => {
        setUserAuth(null);
        disconnectWallet();
        closeLoading();
        lancInfo("See you next time!");
      })
      .catch(() => {
        closeLoading();
        lancError("something went wrong to logout...");
      });
  };

  return {
    login,
    logout,
    userAuth,
    setUserAuth,
  };
};
