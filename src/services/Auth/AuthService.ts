import { Web3Provider } from "@ethersproject/providers";
import { getLoginToken } from "@/lib/firebase/functions/auth";

export class AuthService {
  provider = undefined as Web3Provider | undefined;
  token = undefined as string | undefined;

  constructor(provider?: Web3Provider, token?: string) {
    this.provider = provider;
    if (token) {
      this.token = token;
    }
  }

  setProvider(provider?: Web3Provider) {
    this.provider = provider;
  }

  getLoginToken = async (address: string, did: string): Promise<string> =>
    new Promise(async (resolve, reject) => {
      try {
        const token = await getLoginToken(address, did);
        resolve(token);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
}

let authService: AuthService;

export const getAuthService = (): AuthService => {
  if (authService) {
    return authService;
  }
  authService = new AuthService();
  return authService;
};
