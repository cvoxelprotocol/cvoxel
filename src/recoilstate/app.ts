import { User } from "@/interfaces";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export const rWalletAddress = atom<string | null>({
  key: "rWalletAddress",
  default: null,
});

export const useStateWalletAddress = () => useRecoilState(rWalletAddress);

export const userAuth = atom<User | null>({
  key: "rUserAuth",
  default: null,
});

export const useStateUserAuth = () => useRecoilState(userAuth);
export const useUserAuth = () => useRecoilValue(userAuth);

export const balanceOnContract = atom<number>({
  key: "rWalanceOnContract",
  default: 0,
});

export const useStateBalanceOnContract = () =>
  useRecoilState(balanceOnContract);

export const useBalanceOnContract = () => useRecoilValue(balanceOnContract);

export const rTokenBalanceOnContract = atom<{ [x: string]: number } | null>({
  key: "rTokenBalanceOnContract",
  default: null,
});

export const useStateTokenBalanceOnContract = () =>
  useRecoilState(rTokenBalanceOnContract);

export const useTokenBalanceOnContract = () =>
  useRecoilValue(rTokenBalanceOnContract);

export const walletBalance = atom<number>({
  key: "walletBalance",
  default: 0,
});

export const useStaterWalletBalance = () => useRecoilState(walletBalance);

export const useWalletBalance = () => useRecoilValue(walletBalance);

export const rConnectTried = atom({
  key: "rConnectTried",
  default: false,
});

export const useStateRConnectTried = () => useRecoilState(rConnectTried);
