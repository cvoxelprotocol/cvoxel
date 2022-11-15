import {
  useAccount,
  useChainId,
  useConnectionStatus,
  useMyDid,
  useOriginalAddress,
} from "@/recoilstate/account";

export const useDIDAccount = () => {
  const did = useMyDid();
  const account = useAccount();
  const originalAddress = useOriginalAddress();
  const chainId = useChainId();
  const connection = useConnectionStatus();

  return {
    did,
    account,
    originalAddress,
    connection,
    chainId,
  };
};
